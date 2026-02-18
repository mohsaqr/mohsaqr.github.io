library(igraph)
library(plotly)
library(htmlwidgets)
library(htmltools)

authors_csv <- file.path(dirname(getwd()), "paper_authors.csv")
papers <- read.csv(authors_csv, stringsAsFactors = FALSE)

paper_authors <- lapply(papers$authors, function(x) {
  a <- trimws(strsplit(x, ",")[[1]])
  a[nchar(a) > 0]
})

edge_list <- do.call(rbind, lapply(paper_authors, function(au) {
  if (length(au) < 2) return(NULL)
  pairs <- t(combn(au, 2))
  data.frame(from = pairs[, 1], to = pairs[, 2], stringsAsFactors = FALSE)
}))

edge_weights <- aggregate(list(weight = rep(1, nrow(edge_list))),
                          by = list(from = edge_list$from, to = edge_list$to),
                          FUN = sum)

all_authors <- unlist(paper_authors)
author_counts <- as.data.frame(table(author = all_authors), stringsAsFactors = FALSE)
names(author_counts) <- c("name", "papers")

keep <- author_counts$name[author_counts$papers >= 2]
edge_weights <- edge_weights[edge_weights$from %in% keep & edge_weights$to %in% keep, ]
author_counts <- author_counts[author_counts$name %in% keep, ]

g <- graph_from_data_frame(edge_weights[, c("from", "to")], directed = FALSE,
                           vertices = author_counts$name)
E(g)$weight <- edge_weights$weight

comm <- cluster_louvain(g)
mem <- membership(comm)

set.seed(42)
lay <- layout_with_fr(g)
coords <- as.data.frame(lay)
names(coords) <- c("x", "y")

# Normalize coords to [0,1] then scale to 16:10 aspect ratio
# so the graph fills the full horizontal space
coords$x <- (coords$x - min(coords$x)) / diff(range(coords$x))
coords$y <- (coords$y - min(coords$y)) / diff(range(coords$y))
coords$x <- coords$x * 1.6
coords$y <- coords$y * 1.0

coords$name <- V(g)$name
coords$papers <- author_counts$papers[match(coords$name, author_counts$name)]
coords$community <- as.factor(mem[coords$name])

comm_cols <- c("#E8556D", "#4A90D9", "#50C878", "#FFB347", "#9B59B6",
               "#1ABC9C", "#E67E22", "#3498DB", "#E74C3C", "#2ECC71",
               "#F39C12", "#8E44AD", "#16A085", "#D35400", "#C0392B")
unique_comm <- sort(unique(as.integer(coords$community)))
col_map <- setNames(comm_cols[seq_along(unique_comm)], as.character(unique_comm))
coords$color <- col_map[as.character(coords$community)]

# Abbreviate names: "Mohammed Saqr" → "M. Saqr"
shorten_name <- function(x) {
  parts <- strsplit(x, " ")[[1]]
  if (length(parts) < 2) return(x)
  paste0(substr(parts[1], 1, 1), ". ", paste(parts[-1], collapse = " "))
}
coords$short_name <- vapply(coords$name, shorten_name, character(1))

# Scale edge widths: 0.5 to 5 based on weight
max_w <- max(edge_weights$weight)
edge_widths <- 0.5 + (edge_weights$weight / max_w) * 4.5
# Darker opacity for stronger edges: 0.25 to 0.7
edge_opacities <- 0.25 + (edge_weights$weight / max_w) * 0.45

node_size <- 6 + sqrt(coords$papers) * 6

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
    textfont = list(size = pmin(6 + sqrt(coords$papers) * 1.4, 15), color = "#2c3e50"),
    hovertext = sprintf("<b>%s</b><br>%d papers<br>Community %s",
                        coords$name, coords$papers, coords$community),
    hoverinfo = "text", showlegend = FALSE
  ) |>
  layout(
    xaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    yaxis = list(visible = FALSE, showgrid = FALSE, zeroline = FALSE),
    plot_bgcolor = "#fafafa",
    paper_bgcolor = "#fafafa",
    margin = list(l = 0, r = 0, t = 0, b = 0),
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

# Inject CSS to make widget fill the full viewport
p <- prependContent(p, tags$style(HTML("
  html, body { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; background: #fafafa; }
  .html-widget, .plotly { width: 100vw !important; height: 100vh !important; }
  .textpoint text { font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 3px; stroke-linecap: round; stroke-linejoin: round; }
")))

# Override default sizing so widget fills browser viewport
p$sizingPolicy <- sizingPolicy(
  browser.fill = TRUE,
  viewer.fill = TRUE,
  browser.padding = 0,
  viewer.padding = 0
)

saveWidget(p, "network_authors.html", selfcontained = TRUE,
           title = "Co-authorship Network")

cat("Saved network_authors.html\n")
