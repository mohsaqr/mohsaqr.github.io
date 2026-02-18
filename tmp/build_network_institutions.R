library(igraph)
library(plotly)
library(htmlwidgets)
library(htmltools)

inst_csv <- file.path(dirname(getwd()), "institution_summary.csv")
inst_summary <- read.csv(inst_csv, stringsAsFactors = FALSE)

countries_csv <- file.path(dirname(getwd()), "paper_countries.csv")
country_data <- read.csv(countries_csv, stringsAsFactors = FALSE)

inst_lookup <- list()
for (i in seq_len(nrow(inst_summary))) {
  variants <- trimws(strsplit(inst_summary$raw_variants[i], "\\|")[[1]])
  for (v in variants) {
    if (nchar(v) > 0) inst_lookup[[v]] <- inst_summary$canonical_institution[i]
  }
}

paper_institutions <- lapply(seq_len(nrow(country_data)), function(i) {
  segs <- trimws(strsplit(country_data$affiliations_raw[i], ";")[[1]])
  segs <- segs[nchar(segs) > 0]
  insts <- vapply(segs, function(s) {
    m <- inst_lookup[[s]]
    if (is.null(m)) s else m
  }, character(1))
  unique(insts)
})

edge_list <- do.call(rbind, lapply(paper_institutions, function(insts) {
  if (length(insts) < 2) return(NULL)
  pairs <- t(combn(sort(insts), 2))
  data.frame(from = pairs[, 1], to = pairs[, 2], stringsAsFactors = FALSE)
}))

edge_weights <- aggregate(list(weight = rep(1, nrow(edge_list))),
                          by = list(from = edge_list$from, to = edge_list$to),
                          FUN = sum)

node_data <- inst_summary[, c("canonical_institution", "country", "paper_count")]
names(node_data) <- c("name", "country", "papers")

keep <- node_data$name[node_data$papers >= 2]
edge_weights <- edge_weights[edge_weights$from %in% keep & edge_weights$to %in% keep, ]
node_data <- node_data[node_data$name %in% keep, ]

g <- graph_from_data_frame(edge_weights[, c("from", "to")], directed = FALSE,
                           vertices = node_data$name)
E(g)$weight <- edge_weights$weight

country_colors <- c(
  "Finland" = "#4A90D9", "Spain" = "#E8556D", "Sweden" = "#FFB347",
  "Germany" = "#2ECC71", "Norway" = "#9B59B6", "Australia" = "#1ABC9C",
  "Serbia" = "#E67E22", "Saudi Arabia" = "#16A085", "Netherlands" = "#F39C12",
  "United States" = "#3498DB", "Ireland" = "#50C878", "China" = "#E74C3C",
  "Japan" = "#D35400", "Switzerland" = "#C0392B", "Belgium" = "#8E44AD",
  "United Kingdom" = "#27AE60", "France" = "#2980B9", "Bulgaria" = "#F1C40F",
  "Turkey" = "#7F8C8D", "Denmark" = "#34495E"
)

country_flags <- c(
  "Finland" = "\U0001F1EB\U0001F1EE", "Spain" = "\U0001F1EA\U0001F1F8",
  "Sweden" = "\U0001F1F8\U0001F1EA", "Germany" = "\U0001F1E9\U0001F1EA",
  "Norway" = "\U0001F1F3\U0001F1F4", "Australia" = "\U0001F1E6\U0001F1FA",
  "Serbia" = "\U0001F1F7\U0001F1F8", "Saudi Arabia" = "\U0001F1F8\U0001F1E6",
  "United States" = "\U0001F1FA\U0001F1F8", "Netherlands" = "\U0001F1F3\U0001F1F1",
  "Ireland" = "\U0001F1EE\U0001F1EA", "China" = "\U0001F1E8\U0001F1F3",
  "Japan" = "\U0001F1EF\U0001F1F5", "Switzerland" = "\U0001F1E8\U0001F1ED",
  "Belgium" = "\U0001F1E7\U0001F1EA", "United Kingdom" = "\U0001F1EC\U0001F1E7",
  "France" = "\U0001F1EB\U0001F1F7", "Bulgaria" = "\U0001F1E7\U0001F1EC",
  "Turkey" = "\U0001F1F9\U0001F1F7", "Denmark" = "\U0001F1E9\U0001F1F0"
)

set.seed(42)
lay <- layout_with_fr(g)
coords <- as.data.frame(lay)
names(coords) <- c("x", "y")

# Normalize coords to [0,1] then scale to 16:10 aspect ratio
coords$x <- (coords$x - min(coords$x)) / diff(range(coords$x))
coords$y <- (coords$y - min(coords$y)) / diff(range(coords$y))
coords$x <- coords$x * 1.6
coords$y <- coords$y * 1.0

coords$name <- V(g)$name
coords$papers <- node_data$papers[match(coords$name, node_data$name)]
coords$country <- node_data$country[match(coords$name, node_data$name)]
coords$color <- vapply(coords$country, function(c) {
  if (c %in% names(country_colors)) country_colors[c] else "#95A5A6"
}, character(1))
coords$flag <- vapply(coords$country, function(c) {
  if (c %in% names(country_flags)) country_flags[c] else ""
}, character(1))

# Shorten institution names for display
shorten_inst <- function(x) {
  x <- gsub("University of ", "U ", x)
  x <- gsub("University", "U", x)
  x <- gsub("Institute of Technology", "Inst. Tech.", x)
  x <- gsub("Royal Institute", "Royal Inst.", x)
  x <- gsub("Applied Sciences", "Appl. Sci.", x)
  x <- gsub("Metropolitan", "Metro.", x)
  x <- gsub("Nacional de Educación a Distancia", "Dist.", x)
  x
}
coords$short_name <- shorten_inst(coords$name)

legend_countries <- names(sort(table(node_data$country), decreasing = TRUE))

# Scale edge widths: 0.5 to 5 based on weight
max_w <- max(edge_weights$weight)
edge_widths <- 0.5 + (edge_weights$weight / max_w) * 4.5
edge_opacities <- 0.25 + (edge_weights$weight / max_w) * 0.45

node_size <- 8 + sqrt(coords$papers) * 7

p <- plot_ly()

# Add each edge as separate trace for variable width
for (i in seq_len(nrow(edge_weights))) {
  f <- edge_weights$from[i]
  tt <- edge_weights$to[i]
  fi <- which(coords$name == f)
  ti <- which(coords$name == tt)
  p <- p |> add_trace(
    x = c(coords$x[fi], coords$x[ti]),
    y = c(coords$y[fi], coords$y[ti]),
    type = "scatter", mode = "lines",
    line = list(width = edge_widths[i],
                color = sprintf("rgba(80,80,80,%.2f)", edge_opacities[i])),
    hoverinfo = "none", showlegend = FALSE
  )
}

p <- p |>
  add_trace(
    data = coords, x = ~x, y = ~y,
    type = "scatter", mode = "markers+text",
    marker = list(size = node_size, color = coords$color,
                  line = list(width = 1.5, color = "#ffffff"), opacity = 0.9),
    text = ifelse(coords$papers >= 3, coords$short_name, ""),
    textposition = "middle center",
    textfont = list(size = pmin(7 + sqrt(coords$papers) * 1.2, 14), color = "#2c3e50"),
    hovertext = sprintf("<b>%s</b><br>%s %s<br>%d papers",
                        coords$name, coords$flag, coords$country, coords$papers),
    hoverinfo = "text", showlegend = FALSE
  ) |>
  layout(
    xaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    yaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    plot_bgcolor = "#fafafa",
    paper_bgcolor = "#fafafa",
    margin = list(l = 0, r = 0, t = 0, b = 40),
    hoverlabel = list(bgcolor = "white", font = list(size = 13, family = "Segoe UI")),
    dragmode = "pan",
    autosize = TRUE
  ) |>
  config(
    displayModeBar = TRUE,
    modeBarButtonsToRemove = c("lasso2d", "select2d", "autoScale2d"),
    scrollZoom = TRUE,
    responsive = TRUE
  )

# Build legend bar HTML
legend_html <- paste0(vapply(legend_countries, function(c) {
  col <- if (c %in% names(country_colors)) country_colors[c] else "#95A5A6"
  sprintf('<span style="display:inline-flex;align-items:center;gap:5px;white-space:nowrap"><span style="width:11px;height:11px;border-radius:50%%;background:%s;display:inline-block"></span>%s</span>', col, c)
}, character(1)), collapse = " &nbsp; ")

# Inject full-viewport CSS + legend bar
p <- prependContent(p, tags$style(HTML("
  html, body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; background: #fafafa; }
  .html-widget, .plotly { width: 100vw !important; height: calc(100vh - 38px) !important; }
  .textpoint text { font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 3px; stroke-linecap: round; stroke-linejoin: round; }
  #legend-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 38px; background: #fff; border-top: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; gap: 14px; padding: 0 20px; font-size: 12px; color: #555; font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: auto; }
")))
p <- appendContent(p, tags$div(id = "legend-bar", HTML(legend_html)))

# Override default sizing so widget fills browser viewport
p$sizingPolicy <- sizingPolicy(
  browser.fill = TRUE,
  viewer.fill = TRUE,
  browser.padding = 0,
  viewer.padding = 0
)

saveWidget(p, "network_institutions.html", selfcontained = TRUE,
           title = "Institution Collaboration Network")

cat("Saved network_institutions.html\n")
