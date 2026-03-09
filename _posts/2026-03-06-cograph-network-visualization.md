---
layout: post
title: "cograph: Complex Network Analysis and Visualization"
date: 2026-03-06 10:00:00
description: A modern R package for the analysis, visualization, and manipulation of dynamical, social, and complex networks --- with simple syntax and publication-ready output.
tags: networks visualization R-packages cograph
categories: software
thumbnail: assets/img/cograph/mcml.png
---

[cograph](https://sonsoleslp.github.io/cograph/) is my latest methodological work, offering a powerful toolset for network analysis. The package supports analysis, visualization, and manipulation of dynamical, social, and complex networks — designed to be simple, powerful, and modern. Filtering follows a clean, predictable syntax, and cograph accepts all major network formats out of the box: plot them using its beautiful graphics, compute network measures and communities, or convert between types.

What makes cograph distinctive is its plotting engine, and especially `splot` — a function with an extensive list of arguments built around an easy-to-predict grammar. Beyond standard networks, cograph provides flexible support for heterogeneous, multi-layer, and hierarchical structures, all through the same simple syntax. It also works directly with raw formats, whether that's a matrix, a `tna` object, an `igraph` graph, or a data frame.

For a comprehensive overview of all functions and parameters, see the [full cograph reference](/cograph/) and the [plotting reference](/cograph/splot-reference.html).

<figure>
  <img src="/assets/img/cograph/tna-basic.png" alt="Basic TNA network plot with cograph" style="width:100%; border-radius:6px;">
  <figcaption>One function call: <code>splot(model)</code>. Edge width encodes transition probability. Donut rings show initial state distribution. Every example in this post uses the <code>group_regulation</code> dataset from the <a href="https://sonsoles.me/tna/">tna package</a>.</figcaption>
</figure>

## 1. Universal Network Import

Cograph works with your data as it is. Matrices, edge lists, `igraph` objects, `statnet` networks, `qgraph` objects, and `tna` models are all accepted natively — no preprocessing, no format negotiation, no boilerplate before the actual analysis begins. Directionality is inferred automatically from matrix symmetry or the source object, with a simple `directed = TRUE/FALSE` override for cases that require it.

Switching between representations is just as frictionless. The conversion functions `to_igraph()`, `to_matrix()`, `to_network()`, `to_data_frame()`, and `as_tna()` cover all pairwise transformations across the six supported types, meaning cograph fits into any existing R pipeline without forcing you to reorganize around it. Bring your data in any format, analyze it in cograph, and send it back out in whatever form your downstream tools expect.


## 2. Fully Compatible with tna

cograph is built to work seamlessly with the [tna package](https://sonsoles.me/tna/). Pass any tna object directly to `splot()` and get a publication-ready network plot --- no conversion, no extra arguments. The same applies to group models: `splot(group_model)` plots all groups in a grid, or use `splot(group_model, i = "Treatment")` to plot a single group. Bootstrap results from `tna::bootstrap()` render with solid edges for significant transitions and dashed edges for non-significant ones. Permutation test results from `tna::permutation_test()` are plotted with color-coded edges showing which group has stronger transitions. `plot_compare()` produces difference networks between groups. Every tna object type --- `tna`, `group_tna`, `tna_bootstrap`, `tna_permutation`, `group_tna_permutation` --- is recognized and plotted with appropriate defaults.

```r
library(tna)
model <- tna(group_regulation)

# Plot a tna model directly
splot(model)

# Plot bootstrap results
splot(bootstrap(model, iter = 1000))
```

## 3. Pipe-Friendly Network Utilities

The entire workflow chains with R's native pipe. Getters like `get_nodes()`, `get_edges()`, `get_layout()`, and `get_groups()` extract network structure. Setters like `set_nodes()`, `set_groups()`, and the `sn_*` family --- `sn_nodes()`, `sn_edges()`, `sn_layout()`, `sn_theme()`, `sn_palette()` --- modify it. Every function returns the network object, so you build incrementally: set layout, style nodes, adjust edges, pick a palette, render. No intermediate variables, no juggling objects between packages.

## 4. Filter and Select

cograph makes subsetting networks as intuitive as subsetting a data frame:

```r
# Filter: keep only edges with weight above 0.3
filter_edges(net, weight > 0.3)

# Select: keep the top 5 nodes by PageRank
select_nodes(net, top = 5, by = "pagerank")
```

Every function returns a cograph object, so filtering, selecting, and plotting chain together seamlessly. You think in terms of what you want to keep, and the syntax follows.

## 5. Centrality and Network Properties

One call to `centrality(x)` computes 25 measures and returns a tidy data frame. Or use individual functions like `centrality_degree(x)`, `centrality_betweenness(x)`, or `centrality_pagerank(x)` for a named vector. Each function has its own focused help page --- no digging through irrelevant parameters. The full list covers degree, strength, closeness, harmonic, betweenness, eigenvector, hub, authority, PageRank, eccentricity, coreness, constraint, laplacian, leverage, power, percolation, subgraph, diffusion, voterank, k-reach, transitivity, and current flow variants. Network-level properties --- density, diameter, efficiency, small-world coefficient, rich-club coefficient, bridge detection --- are equally accessible through `network_summary()` and individual functions.

## 6. Community Detection

Eleven algorithms through a single interface: Louvain, Leiden, Infomap, walktrap, fast greedy, label propagation, edge betweenness, leading eigenvector, spinglass, optimal, and fluid communities --- plus consensus clustering for robustness. Each returns a community object with membership vector, modularity score, and a built-in `plot()` method. Compare partitions with VI, NMI, Rand, or adjusted Rand. Assess quality with modularity, silhouette, and Dunn index. Test significance with permutation-based p-values.

## 7. Rich Plotting

`splot(mat)` --- that is it. One function, any format, publication-ready output. Customize with 80+ parameters for nodes, edges, labels, donuts, pies, and more. `soplot()` provides the same interface via grid/ggplot2 for layered composition. The range of what cograph draws and how little you need to ask for is what makes it stand out.

### Node Shapes, Pies, and Donuts

Ten node shapes are available out of the box: circle, square, triangle, diamond, pentagon, hexagon, ellipse, heart, star, and cross. Beyond shapes, nodes can carry data. Pie charts encode category compositions inside the node. Donut rings show proportions around it. You can stack up to three data layers --- outer donut, inner donut, and pie core --- to encode multiple variables per node, which is particularly useful for representing multidimensional data at a glance.

<figure>
  <img src="/assets/img/cograph/shapes.png" alt="Ten node shapes" style="width:100%; border-radius:6px;">
  <figcaption>All ten node shapes arranged in an oval layout with weighted directed edges.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/donut-pie.png" alt="Donut and pie chart nodes" style="width:100%; border-radius:6px;">
  <figcaption>Donut rings with embedded pie charts. Each node carries two layers of categorical data simultaneously.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/triple-layer.png" alt="Triple-layer nodes" style="width:100%; border-radius:6px;">
  <figcaption>Three data layers per node: outer donut for one set of proportions, inner donut for another, and a pie core for a third variable.</figcaption>
</figure>

### Visualizing Statistical Data on Networks

Network plots often live in one world and statistical results in another --- tables of coefficients, separate forest plots, lists of p-values. cograph brings them together. Confidence intervals render as semi-transparent bands along the edges. P-values map to significance stars directly on the edge labels. The edge label template system lets you compose estimates, CI bounds, and stars in any combination, so regression coefficients, bootstrap intervals, or effect sizes sit on the network itself rather than in a separate table.

Bootstrap analysis results can be plotted directly: edges that survive resampling appear solid, those that do not appear dashed, with significance stars on the labels. Permutation tests between groups receive the same visual treatment --- color-coded by which group shows a stronger edge, with non-significant edges suppressed. The package also supports side-by-side group comparison plots, difference networks, and network overlay views, giving you multiple ways to present the same statistical story depending on the audience and the question.

<figure>
  <img src="/assets/img/cograph/ci-pvalues.png" alt="Confidence intervals and p-values on edges" style="width:100%; border-radius:6px;">
  <figcaption>Edge labels showing estimates with confidence interval bands and significance stars. Statistical results are part of the network, not a separate output.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/bootstrap.png" alt="Bootstrap results on network" style="width:100%; border-radius:6px;">
  <figcaption>Bootstrap results rendered directly on the network: solid edges are statistically significant, dashed edges are not.</figcaption>
</figure>

### Heatmaps, Chord Diagrams, and Flow Plots

When the node-and-edge view gets too dense, cograph offers alternative representations. `plot_heatmap()` renders the adjacency or transition matrix as a color-coded grid with optional value overlays. `plot_chord()` draws circular flow diagrams that emphasize the volume and direction of transitions between states. `plot_alluvial()` traces how states flow across time points in aggregate, while `plot_trajectories()` draws each individual as a separate line --- useful for seeing whether a group trend actually reflects individual paths or masks divergent behavior. All of these are rendered in base R with no JavaScript dependencies.

<figure>
  <img src="/assets/img/cograph/heatmap.png" alt="Heatmap" style="width:100%; border-radius:6px;">
  <figcaption>Transition matrix as a heatmap with values overlaid.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/chord.png" alt="Chord diagram" style="width:100%; border-radius:6px;">
  <figcaption>Chord diagram showing transition flows between regulatory states.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/alluvial.png" alt="Alluvial diagram" style="width:100%; border-radius:6px;">
  <figcaption>Alluvial diagram tracing aggregate state transitions across time points.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/trajectories.png" alt="Individual trajectories" style="width:100%; border-radius:6px;">
  <figcaption>Individual trajectories colored by starting state. Each line is one person's path through the system.</figcaption>
</figure>

### Multi-Cluster Networks for Multidimensional Analysis

Networks often have internal structure --- nodes that group into clusters representing different dimensions, levels, or categories. `plot_mcml()` facilitates multidimensional network analysis by showing both levels simultaneously: individual nodes arranged inside colored cluster shells on the detail layer, with cluster-level aggregate transitions on the summary layer above. This makes it possible to see micro-level connections and macro-level patterns at the same time, which is essential when studying systems where behavior operates across multiple dimensions such as social, emotional, cognitive, and regulatory processes.

<figure>
  <img src="/assets/img/cograph/mcml.png" alt="Multi-cluster multi-level network" style="width:100%; border-radius:6px;">
  <figcaption>Five clusters (Social, Emotional, Planning, Monitoring, Synthesis) shown at both the node level and the aggregate cluster level.</figcaption>
</figure>

### Multilayer and Heterogeneous Networks

When your network has natural layers --- different interaction types, time periods, or modalities --- `plot_mlna()` stacks them in a 3D perspective view with cross-layer connections visible. When you have multiple node types, such as students and teachers or proteins and genes, `plot_htna()` arranges them in grouped layouts that respect the categorical structure.

<figure>
  <img src="/assets/img/cograph/multilayer.png" alt="Multilayer network" style="width:100%; border-radius:6px;">
  <figcaption>Multilayer network with five layers in horizontal perspective, showing within-layer and cross-layer connections.</figcaption>
</figure>

<figure>
  <img src="/assets/img/cograph/htna.png" alt="Heterogeneous network" style="width:100%; border-radius:6px;">
  <figcaption>Heterogeneous network with two node types (Students and Teachers) in a grouped layout.</figcaption>
</figure>

### Mixed Networks

Some networks combine symmetric and asymmetric relationships --- co-occurrence alongside directed influence, or undirected social ties alongside directed information flow. `plot_mixed_network()` renders both in one plot with distinct visual styles, so the nature of each relationship is immediately clear.

<figure>
  <img src="/assets/img/cograph/mixed.png" alt="Mixed network" style="width:100%; border-radius:6px;">
  <figcaption>Mixed network combining undirected and directed edges in an oval layout.</figcaption>
</figure>

## Getting Started

```r
install.packages("cograph")
# or
remotes::install_github("sonsoleslp/cograph")
```

cograph provides a unified environment for network analysis and visualization --- from importing and converting network data, through computing centrality and detecting communities, to producing publication-ready plots that carry statistical annotations. The goal is simple: write one line, get a result you can put in a paper. For a full reference of all functions, parameters, and examples, read the [cograph introduction](/cograph/).

cograph is primarily conceptualized and developed by Mohammed Saqr, Professor of Computer Science at the University of Eastern Finland, and co-developed by [Sonsoles López-Pernas](https://sonsoles.me), Academy Fellow at the University of Eastern Finland.

[GitHub](https://github.com/sonsoleslp/cograph) | [Documentation](https://sonsoleslp.github.io/cograph/) | [Full Reference](/cograph/) | [Plotting Reference](/cograph/splot-reference.html)
