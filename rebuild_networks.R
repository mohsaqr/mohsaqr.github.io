# rebuild_networks.R
# Unified script to rebuild co-authorship and institutional collaboration networks.
# Reads _publications/*.md YAML frontmatter directly — no CSV pre-processing needed.
# Run: Rscript rebuild_networks.R (from repo root)

library(yaml)
library(igraph)
library(plotly)
library(htmlwidgets)
library(htmltools)

# ---- Config ----
site_dir <- getwd()
pub_dir  <- file.path(site_dir, "_publications")
out_dir  <- file.path(site_dir, "assets", "networks")
inst_csv <- file.path(site_dir, "institution_summary.csv")

stopifnot(
  dir.exists(pub_dir),
  dir.exists(out_dir),
  file.exists(inst_csv)
)

# Author name normalization map: variant -> canonical
# Fixes typos, diacritics, encoding issues, and name format inconsistencies
author_norm <- c(
  # Encoding issues (mojibake)
  "Sonsoles L\u00c3\u00b3pez-Pernas"    = "Sonsoles L\u00f3pez-Pernas",
  # Typos
  "Ward Peteers"                          = "Ward Peeters",
  "Mikko Apioia"                          = "Mikko Apiola",
  "Sonosles L\u00f3pez-Pernas"           = "Sonsoles L\u00f3pez-Pernas",
  "Sonsoles Lopez-Pernas"                = "Sonsoles L\u00f3pez-Pernas",
  # Missing diacritics
  "Jelena Jovanovic"                      = "Jelena Jovanovi\u0107",
  "Olga Pavlovic"                         = "Olga Pavlovi\u0107",
  "Crina Damsa"                           = "Crina Dam\u015fa",
  # Conde family name variants -> single canonical form
  "Miguel \u00c1ngel Conde Gonz\u00e1lez"  = "Miguel \u00c1ngel Conde",
  "Miguel \u00c1ngel Conde-Gonz\u00e1lez" = "Miguel \u00c1ngel Conde",
  "Miguel \u00c1. Conde"                   = "Miguel \u00c1ngel Conde",
  "Miguel A. Conde"                        = "Miguel \u00c1ngel Conde",
  "Miguel Angel Conde"                     = "Miguel \u00c1ngel Conde",
  # Raspopovic variants
  "Miroslava Raspopovic Milic"            = "Miroslava Raspopovi\u0107 Mili\u0107",
  # Vogelsmeier spacing
  "Leonie V. D. E. Vogelsmeier"          = "Leonie V.D.E. Vogelsmeier",
  # Oliveira middle name
  "Eduardo Araujo Oliveira"               = "Eduardo Oliveira",
  # Deriba middle name
  "Fitsum Gizachew Deriba"                = "Fitsum G. Deriba",
  # Pope spelling (Nicolas is the author's preferred form)
  "Nicholas Pope"                          = "Nicolas Pope",
  # Saqr spelling variant
  "Mohamed Saqr"                           = "Mohammed Saqr",
  # Oyelere middle name
  "Solomon sunday Oyelere"                 = "Solomon Oyelere",
  # Beck middle initial
  "Emorie D Beck"                          = "Emorie Beck",
  # Heikkinen initial
  "S. Heikkinen"                           = "Sami Heikkinen",
  # Sointu full name
  "Erkko Tapio Sointu"                     = "Erkko Sointu",
  # Cristea initial
  "T.S. Cristea"                           = "Teodora S. Cristea",
  # Kleingeld initial
  "A. Kleingeld"                           = "Ad Kleingeld",
  # Snijders initial
  "C. Snijders"                            = "Chris Snijders",
  # Matzat initial
  "U. Matzat"                              = "Uwe Matzat",
  # Hernandez-Garcia accent
  "Angel Hern\u00e1ndez-Garc\u00eda"      = "\u00c1ngel Hern\u00e1ndez-Garc\u00eda",
  "\u00c1ngel Hern\u00e1ndez Garc\u00eda" = "\u00c1ngel Hern\u00e1ndez-Garc\u00eda",
  # Elitsa Peltekova (variant of Katina Pancheva if same person, otherwise keep)
  # Gao given name
  "Zhizezhang Gao"                         = "Zhizezhang Gao",
  # Albadarin given name
  "Yazid AlBadarin"                        = "Yazid Albadarin",
  # M. Saqr abbreviation
  "M. Saqr"                                = "Mohammed Saqr"
)

normalize_author <- function(name) {
  # Strip empty/whitespace-only names
  name <- trimws(name)
  if (nchar(name) == 0) return(NA_character_)
  m <- author_norm[name]
  if (!is.na(m)) m else name
}

# ---- 1. Parse all publications ----
parse_frontmatter <- function(file_path) {
  lines <- readLines(file_path, warn = FALSE)
  delims <- which(lines == "---")
  if (length(delims) < 2) return(NULL)
  yaml_text <- paste(lines[(delims[1] + 1):(delims[2] - 1)], collapse = "\n")
  tryCatch(yaml::yaml.load(yaml_text), error = function(e) {
    warning(sprintf("YAML parse failed: %s (%s)", basename(file_path), e$message))
    NULL
  })
}

md_files <- list.files(pub_dir, pattern = "\\.md$", full.names = TRUE)
pubs <- lapply(md_files, function(f) {
  meta <- parse_frontmatter(f)
  if (is.null(meta)) return(NULL)
  authors <- if (!is.null(meta$authors)) {
    raw <- vapply(meta$authors, function(a) {
      paste(trimws(a$given), trimws(a$family))
    }, character(1))
    normed <- vapply(raw, normalize_author, character(1), USE.NAMES = FALSE)
    normed[!is.na(normed) & nchar(normed) > 1]
  } else {
    character(0)
  }
  aff <- meta$affiliations
  if (!is.null(aff) && nchar(trimws(aff)) == 0) aff <- NULL
  list(
    paper_id     = tools::file_path_sans_ext(basename(f)),
    year         = as.integer(meta$year),
    title        = if (is.null(meta$title)) "" else meta$title,
    authors      = authors,
    affiliations = aff
  )
})
pubs <- Filter(Negate(is.null), pubs)
cat(sprintf("Parsed %d publications\n", length(pubs)))

# ===========================================================================
# ---- 2. Build & save author network ----
# ===========================================================================

# Co-author edge list
author_edge_list <- do.call(rbind, lapply(pubs, function(p) {
  au <- p$authors
  if (length(au) < 2) return(NULL)
  pairs <- t(combn(au, 2))
  data.frame(from = pairs[, 1], to = pairs[, 2], stringsAsFactors = FALSE)
}))

author_edge_weights <- aggregate(
  list(weight = rep(1, nrow(author_edge_list))),
  by = list(from = author_edge_list$from, to = author_edge_list$to),
  FUN = sum
)

all_authors <- unlist(lapply(pubs, `[[`, "authors"))
author_counts <- as.data.frame(table(author = all_authors), stringsAsFactors = FALSE)
names(author_counts) <- c("name", "papers")

keep_auth <- author_counts$name[author_counts$papers >= 2]
author_edge_weights <- author_edge_weights[
  author_edge_weights$from %in% keep_auth & author_edge_weights$to %in% keep_auth, ]
author_counts <- author_counts[author_counts$name %in% keep_auth, ]

g_auth <- graph_from_data_frame(
  author_edge_weights[, c("from", "to")], directed = FALSE,
  vertices = author_counts$name
)
E(g_auth)$weight <- author_edge_weights$weight

comm <- cluster_louvain(g_auth)
mem <- membership(comm)
n_author_communities <- length(unique(mem))

set.seed(42)
lay <- layout_with_fr(g_auth)
coords <- as.data.frame(lay)
names(coords) <- c("x", "y")

# Normalize to [0,1] then scale to 16:10 aspect ratio
coords$x <- (coords$x - min(coords$x)) / diff(range(coords$x))
coords$y <- (coords$y - min(coords$y)) / diff(range(coords$y))
coords$x <- coords$x * 1.6
coords$y <- coords$y * 1.0

coords$name      <- V(g_auth)$name
coords$papers    <- author_counts$papers[match(coords$name, author_counts$name)]
coords$community <- as.factor(mem[coords$name])

comm_cols <- c(
  "#E8556D", "#4A90D9", "#50C878", "#FFB347", "#9B59B6",
  "#1ABC9C", "#E67E22", "#3498DB", "#E74C3C", "#2ECC71",
  "#F39C12", "#8E44AD", "#16A085", "#D35400", "#C0392B"
)
unique_comm <- sort(unique(as.integer(coords$community)))
col_map <- setNames(comm_cols[seq_along(unique_comm)], as.character(unique_comm))
coords$color <- col_map[as.character(coords$community)]

# "Mohammed Saqr" -> "M. Saqr"
shorten_name <- function(x) {
  parts <- strsplit(x, " ")[[1]]
  if (length(parts) < 2) return(x)
  paste0(substr(parts[1], 1, 1), ". ", paste(parts[-1], collapse = " "))
}
coords$short_name <- vapply(coords$name, shorten_name, character(1))

# Edge styling
max_w <- max(author_edge_weights$weight)
edge_widths    <- 0.5 + (author_edge_weights$weight / max_w) * 4.5
edge_opacities <- 0.25 + (author_edge_weights$weight / max_w) * 0.45

node_size <- 6 + sqrt(coords$papers) * 6

p_auth <- plot_ly()
for (i in seq_len(nrow(author_edge_weights))) {
  f  <- author_edge_weights$from[i]
  tt <- author_edge_weights$to[i]
  fi <- which(coords$name == f)
  ti <- which(coords$name == tt)
  p_auth <- p_auth |> add_trace(
    x = c(coords$x[fi], coords$x[ti]),
    y = c(coords$y[fi], coords$y[ti]),
    type = "scatter", mode = "lines",
    line = list(
      width = edge_widths[i],
      color = sprintf("rgba(80,80,80,%.2f)", edge_opacities[i])
    ),
    hoverinfo = "none", showlegend = FALSE
  )
}

p_auth <- p_auth |>
  add_trace(
    data = coords, x = ~x, y = ~y,
    type = "scatter", mode = "markers+text",
    marker = list(
      size = node_size, color = coords$color,
      line = list(width = 1.5, color = "#ffffff"), opacity = 0.9
    ),
    text = ifelse(coords$papers >= 3, coords$short_name, ""),
    textposition = "middle center",
    textfont = list(
      size = pmin(6 + sqrt(coords$papers) * 1.4, 15), color = "#2c3e50"
    ),
    hovertext = sprintf(
      "<b>%s</b><br>%d papers<br>Community %s",
      coords$name, coords$papers, coords$community
    ),
    hoverinfo = "text", showlegend = FALSE
  ) |>
  layout(
    xaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    yaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    plot_bgcolor  = "#fafafa",
    paper_bgcolor = "#fafafa",
    margin = list(l = 0, r = 0, t = 0, b = 0),
    hoverlabel = list(
      bgcolor = "white", font = list(size = 13, family = "Segoe UI")
    ),
    dragmode = "pan",
    autosize = TRUE
  ) |>
  config(
    displayModeBar = TRUE,
    modeBarButtonsToRemove = c("lasso2d", "select2d", "autoScale2d"),
    scrollZoom = TRUE,
    responsive = TRUE
  )

p_auth <- prependContent(p_auth, tags$style(HTML("
  html, body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; background: #fafafa; }
  .html-widget, .plotly { width: 100vw !important; height: 100vh !important; }
  .textpoint text { font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 3px; stroke-linecap: round; stroke-linejoin: round; }
")))

p_auth$sizingPolicy <- sizingPolicy(
  browser.fill = TRUE, viewer.fill = TRUE,
  browser.padding = 0, viewer.padding = 0
)

saveWidget(
  p_auth, file.path(out_dir, "network_authors.html"),
  selfcontained = TRUE, title = "Co-authorship Network"
)

n_auth_nodes <- nrow(author_counts)
n_auth_edges <- nrow(author_edge_weights)
cat(sprintf(
  "Saved author network: %d nodes, %d edges, %d communities\n",
  n_auth_nodes, n_auth_edges, n_author_communities
))

# ===========================================================================
# ---- 3. Build & save institution network ----
# ===========================================================================

inst_summary <- read.csv(inst_csv, stringsAsFactors = FALSE)

# Build variant -> canonical lookup
inst_lookup <- list()
for (i in seq_len(nrow(inst_summary))) {
  variants <- trimws(strsplit(inst_summary$raw_variants[i], "\\|")[[1]])
  for (v in variants) {
    if (nchar(v) > 0) inst_lookup[[v]] <- inst_summary$canonical_institution[i]
  }
}
country_map <- setNames(inst_summary$country, inst_summary$canonical_institution)

pubs_with_aff <- Filter(function(p) !is.null(p$affiliations), pubs)

paper_institutions <- lapply(pubs_with_aff, function(p) {
  segs <- trimws(strsplit(p$affiliations, ";")[[1]])
  segs <- segs[nchar(segs) > 0]
  insts <- vapply(segs, function(s) {
    m <- inst_lookup[[s]]
    if (is.null(m)) s else m
  }, character(1))
  unique(insts)
})

inst_edge_list <- do.call(rbind, lapply(paper_institutions, function(insts) {
  if (length(insts) < 2) return(NULL)
  pairs <- t(combn(sort(insts), 2))
  data.frame(from = pairs[, 1], to = pairs[, 2], stringsAsFactors = FALSE)
}))

inst_edge_weights <- aggregate(
  list(weight = rep(1, nrow(inst_edge_list))),
  by = list(from = inst_edge_list$from, to = inst_edge_list$to),
  FUN = sum
)

# Count papers per institution
all_insts <- unlist(paper_institutions)
inst_counts <- as.data.frame(table(inst = all_insts), stringsAsFactors = FALSE)
names(inst_counts) <- c("name", "papers")
inst_counts$country <- vapply(inst_counts$name, function(n) {
  if (n %in% names(country_map)) country_map[[n]] else "Unknown"
}, character(1))

keep_inst <- inst_counts$name[inst_counts$papers >= 2]
inst_edge_weights <- inst_edge_weights[
  inst_edge_weights$from %in% keep_inst & inst_edge_weights$to %in% keep_inst, ]
inst_counts <- inst_counts[inst_counts$name %in% keep_inst, ]

g_inst <- graph_from_data_frame(
  inst_edge_weights[, c("from", "to")], directed = FALSE,
  vertices = inst_counts$name
)
E(g_inst)$weight <- inst_edge_weights$weight

country_colors <- c(
  "Finland"        = "#4A90D9", "Spain"          = "#E8556D",
  "Sweden"         = "#FFB347", "Germany"        = "#2ECC71",
  "Norway"         = "#9B59B6", "Australia"      = "#1ABC9C",
  "Serbia"         = "#E67E22", "Saudi Arabia"   = "#16A085",
  "Netherlands"    = "#F39C12", "United States"  = "#3498DB",
  "Ireland"        = "#50C878", "China"          = "#E74C3C",
  "Japan"          = "#D35400", "Switzerland"    = "#C0392B",
  "Belgium"        = "#8E44AD", "United Kingdom" = "#27AE60",
  "France"         = "#2980B9", "Bulgaria"       = "#F1C40F",
  "Turkey"         = "#7F8C8D", "Denmark"        = "#34495E"
)

country_flags <- c(
  "Finland"        = "\U0001F1EB\U0001F1EE",
  "Spain"          = "\U0001F1EA\U0001F1F8",
  "Sweden"         = "\U0001F1F8\U0001F1EA",
  "Germany"        = "\U0001F1E9\U0001F1EA",
  "Norway"         = "\U0001F1F3\U0001F1F4",
  "Australia"      = "\U0001F1E6\U0001F1FA",
  "Serbia"         = "\U0001F1F7\U0001F1F8",
  "Saudi Arabia"   = "\U0001F1F8\U0001F1E6",
  "United States"  = "\U0001F1FA\U0001F1F8",
  "Netherlands"    = "\U0001F1F3\U0001F1F1",
  "Ireland"        = "\U0001F1EE\U0001F1EA",
  "China"          = "\U0001F1E8\U0001F1F3",
  "Japan"          = "\U0001F1EF\U0001F1F5",
  "Switzerland"    = "\U0001F1E8\U0001F1ED",
  "Belgium"        = "\U0001F1E7\U0001F1EA",
  "United Kingdom" = "\U0001F1EC\U0001F1E7",
  "France"         = "\U0001F1EB\U0001F1F7",
  "Bulgaria"       = "\U0001F1E7\U0001F1EC",
  "Turkey"         = "\U0001F1F9\U0001F1F7",
  "Denmark"        = "\U0001F1E9\U0001F1F0"
)

set.seed(42)
lay_inst <- layout_with_fr(g_inst)
coords_inst <- as.data.frame(lay_inst)
names(coords_inst) <- c("x", "y")

coords_inst$x <- (coords_inst$x - min(coords_inst$x)) / diff(range(coords_inst$x))
coords_inst$y <- (coords_inst$y - min(coords_inst$y)) / diff(range(coords_inst$y))
coords_inst$x <- coords_inst$x * 1.6
coords_inst$y <- coords_inst$y * 1.0

coords_inst$name    <- V(g_inst)$name
coords_inst$papers  <- inst_counts$papers[match(coords_inst$name, inst_counts$name)]
coords_inst$country <- inst_counts$country[match(coords_inst$name, inst_counts$name)]
coords_inst$color <- vapply(coords_inst$country, function(c) {
  if (c %in% names(country_colors)) country_colors[c] else "#95A5A6"
}, character(1))
coords_inst$flag <- vapply(coords_inst$country, function(c) {
  if (c %in% names(country_flags)) country_flags[c] else ""
}, character(1))

shorten_inst <- function(x) {
  x <- gsub("University of ", "U ", x)
  x <- gsub("University", "U", x)
  x <- gsub("Institute of Technology", "Inst. Tech.", x)
  x <- gsub("Royal Institute", "Royal Inst.", x)
  x <- gsub("Applied Sciences", "Appl. Sci.", x)
  x <- gsub("Metropolitan", "Metro.", x)
  x <- gsub("Nacional de Educaci\u00f3n a Distancia", "Dist.", x)
  x
}
coords_inst$short_name <- shorten_inst(coords_inst$name)

legend_countries <- names(sort(table(inst_counts$country), decreasing = TRUE))

max_w_inst <- max(inst_edge_weights$weight)
edge_widths_inst    <- 0.5 + (inst_edge_weights$weight / max_w_inst) * 4.5
edge_opacities_inst <- 0.25 + (inst_edge_weights$weight / max_w_inst) * 0.45

node_size_inst <- 8 + sqrt(coords_inst$papers) * 7

p_inst <- plot_ly()
for (i in seq_len(nrow(inst_edge_weights))) {
  f  <- inst_edge_weights$from[i]
  tt <- inst_edge_weights$to[i]
  fi <- which(coords_inst$name == f)
  ti <- which(coords_inst$name == tt)
  p_inst <- p_inst |> add_trace(
    x = c(coords_inst$x[fi], coords_inst$x[ti]),
    y = c(coords_inst$y[fi], coords_inst$y[ti]),
    type = "scatter", mode = "lines",
    line = list(
      width = edge_widths_inst[i],
      color = sprintf("rgba(80,80,80,%.2f)", edge_opacities_inst[i])
    ),
    hoverinfo = "none", showlegend = FALSE
  )
}

p_inst <- p_inst |>
  add_trace(
    data = coords_inst, x = ~x, y = ~y,
    type = "scatter", mode = "markers+text",
    marker = list(
      size = node_size_inst, color = coords_inst$color,
      line = list(width = 1.5, color = "#ffffff"), opacity = 0.9
    ),
    text = ifelse(coords_inst$papers >= 3, coords_inst$short_name, ""),
    textposition = "middle center",
    textfont = list(
      size = pmin(7 + sqrt(coords_inst$papers) * 1.2, 14), color = "#2c3e50"
    ),
    hovertext = sprintf(
      "<b>%s</b><br>%s %s<br>%d papers",
      coords_inst$name, coords_inst$flag, coords_inst$country, coords_inst$papers
    ),
    hoverinfo = "text", showlegend = FALSE
  ) |>
  layout(
    xaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    yaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    plot_bgcolor  = "#fafafa",
    paper_bgcolor = "#fafafa",
    margin = list(l = 0, r = 0, t = 0, b = 40),
    hoverlabel = list(
      bgcolor = "white", font = list(size = 13, family = "Segoe UI")
    ),
    dragmode = "pan",
    autosize = TRUE
  ) |>
  config(
    displayModeBar = TRUE,
    modeBarButtonsToRemove = c("lasso2d", "select2d", "autoScale2d"),
    scrollZoom = TRUE,
    responsive = TRUE
  )

# Legend bar
legend_html <- paste0(vapply(legend_countries, function(c) {
  col <- if (c %in% names(country_colors)) country_colors[c] else "#95A5A6"
  sprintf(
    paste0(
      '<span style="display:inline-flex;align-items:center;gap:5px;',
      'white-space:nowrap"><span style="width:11px;height:11px;',
      'border-radius:50%%;background:%s;display:inline-block">',
      '</span>%s</span>'
    ),
    col, c
  )
}, character(1)), collapse = " &nbsp; ")

p_inst <- prependContent(p_inst, tags$style(HTML("
  html, body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; background: #fafafa; }
  .html-widget, .plotly { width: 100vw !important; height: calc(100vh - 38px) !important; }
  .textpoint text { font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 3px; stroke-linecap: round; stroke-linejoin: round; }
  #legend-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 38px; background: #fff; border-top: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; gap: 14px; padding: 0 20px; font-size: 12px; color: #555; font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: auto; }
")))
p_inst <- appendContent(p_inst, tags$div(id = "legend-bar", HTML(legend_html)))

p_inst$sizingPolicy <- sizingPolicy(
  browser.fill = TRUE, viewer.fill = TRUE,
  browser.padding = 0, viewer.padding = 0
)

saveWidget(
  p_inst, file.path(out_dir, "network_institutions.html"),
  selfcontained = TRUE, title = "Institution Collaboration Network"
)

n_inst_nodes <- nrow(inst_counts)
n_inst_edges <- nrow(inst_edge_weights)
n_countries  <- length(unique(inst_counts$country))
cat(sprintf(
  "Saved institution network: %d nodes, %d edges, %d countries\n",
  n_inst_nodes, n_inst_edges, n_countries
))

# ===========================================================================
# ---- 4. Update page descriptions ----
# ===========================================================================

update_page_description <- function(page_path, new_paragraph) {
  lines <- readLines(page_path, warn = FALSE)
  idx <- grep("^This network", lines)
  if (length(idx) != 1) {
    warning(sprintf("Could not find description paragraph in %s", page_path))
    return(invisible(NULL))
  }
  lines[idx] <- new_paragraph
  writeLines(lines, page_path)
  cat(sprintf("Updated %s\n", basename(page_path)))
}

auth_desc <- sprintf(
  paste0(
    "This network maps **%d co-authors** across **%d collaboration links**, ",
    "built from shared publications. Node size reflects the number of papers ",
    "an author has contributed \u2014 larger nodes indicate more prolific ",
    "collaborators. Edge thickness and opacity scale with the number of ",
    "co-authored papers between two researchers, so the thickest, darkest ",
    "lines mark the strongest partnerships. Colors represent **%d communities** ",
    "detected by the Louvain algorithm, grouping authors who co-publish most ",
    "frequently with each other. Only authors with at least two publications ",
    "are included. Scroll to zoom, drag to pan, and hover over a node for details."
  ),
  n_auth_nodes, n_auth_edges, n_author_communities
)
update_page_description(
  file.path(site_dir, "_pages", "author-network.md"), auth_desc
)

inst_desc <- sprintf(
  paste0(
    "This network visualizes collaboration between **%d institutions** across ",
    "**%d countries**, connected by **%d co-publication links**. Each node ",
    "represents a university or research institute \u2014 larger nodes have ",
    "contributed more papers. Edge thickness and opacity reflect the number of ",
    "jointly authored publications between two institutions. Nodes are colored ",
    "by country, with a legend bar at the bottom. Only institutions with at ",
    "least two publications are included. Scroll to zoom, drag to pan, and ",
    "hover over a node for details."
  ),
  n_inst_nodes, n_countries, n_inst_edges
)
update_page_description(
  file.path(site_dir, "_pages", "institution-network.md"), inst_desc
)

# ===========================================================================
# ---- 5. Refresh CSVs ----
# ===========================================================================

# paper_authors.csv — all publications
paper_authors_df <- data.frame(
  paper_id = vapply(pubs, `[[`, character(1), "paper_id"),
  year     = vapply(pubs, function(p) p$year, integer(1)),
  title    = vapply(pubs, `[[`, character(1), "title"),
  authors  = vapply(pubs, function(p) paste(p$authors, collapse = ", "), character(1)),
  stringsAsFactors = FALSE
)
write.csv(paper_authors_df, file.path(site_dir, "paper_authors.csv"), row.names = FALSE)
cat("Refreshed paper_authors.csv\n")

# paper_countries.csv — only publications with affiliations
paper_countries_df <- data.frame(
  paper_id = vapply(pubs_with_aff, `[[`, character(1), "paper_id"),
  year     = vapply(pubs_with_aff, function(p) p$year, integer(1)),
  title    = vapply(pubs_with_aff, `[[`, character(1), "title"),
  countries = vapply(pubs_with_aff, function(p) {
    segs <- trimws(strsplit(p$affiliations, ";")[[1]])
    segs <- segs[nchar(segs) > 0]
    ctrs <- vapply(segs, function(s) {
      m <- inst_lookup[[s]]
      if (!is.null(m) && m %in% names(country_map)) {
        country_map[[m]]
      } else {
        # Fallback: last comma-separated token is usually the country
        tokens <- trimws(strsplit(s, ",")[[1]])
        tokens[length(tokens)]
      }
    }, character(1))
    paste(unique(ctrs), collapse = "; ")
  }, character(1)),
  affiliations_raw = vapply(pubs_with_aff, `[[`, character(1), "affiliations"),
  stringsAsFactors = FALSE
)
write.csv(
  paper_countries_df, file.path(site_dir, "paper_countries.csv"), row.names = FALSE
)
cat("Refreshed paper_countries.csv\n")

# ---- Summary ----
cat(sprintf(
  "\nDone: %d authors, %d author-edges, %d institutions, %d inst-edges\n",
  n_auth_nodes, n_auth_edges, n_inst_nodes, n_inst_edges
))
