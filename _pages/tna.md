---
layout: page
permalink: /works/tna/
title: "Transition Network Analysis"
description: "A validated framework for temporal modeling from sequence data — with four layers of statistical rigor."
nav: false
---

<style>
.tna-intro { font-size: 1.05rem; line-height: 1.75; text-align: justify; margin-bottom: 2rem; }
.tna-img { text-align: center; margin: 1.5rem 0 2rem; }
.tna-img img { max-width: 650px; width: 100%; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
.tna-img figcaption { font-size: 0.85rem; color: var(--global-text-color-light); margin-top: 0.5rem; }
.tna-section { margin-top: 2.2rem; }
.tna-section h2 { color: var(--global-theme-color); border-bottom: 2px solid var(--global-theme-color); padding-bottom: 0.3rem; }
.tna-body { font-size: 0.98rem; line-height: 1.75; text-align: justify; }
.tna-body strong { color: var(--global-theme-color); }
.eco-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.2rem; margin-top: 1rem; }
.eco-card { padding: 1.1rem 1.3rem; border-radius: 8px; border: 1px solid var(--global-divider-color); background: var(--global-bg-color); transition: box-shadow 0.25s; }
.eco-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
.eco-card h4 { margin: 0 0 0.4rem 0; }
.eco-card h4 a { color: var(--global-theme-color); text-decoration: none; }
.eco-card h4 a:hover { text-decoration: underline; }
.eco-card p { margin: 0; font-size: 0.88rem; line-height: 1.6; color: var(--global-text-color); }
.res-list { column-count: 2; column-gap: 2rem; margin-top: 0.5rem; }
.res-list li { margin-bottom: 0.4rem; font-size: 0.92rem; break-inside: avoid; }
@media (max-width: 600px) { .res-list { column-count: 1; } }
</style>

<div class="tna-intro" markdown="1">

Process mining, Markov models, and network analysis each offer partial views of sequential behavior. Process mining produces transition graphs with no statistical tests on edges. Markov models estimate transition probabilities but lack the network-analytic toolkit to characterize node importance or meso-level structure. Network analysis methods typically assume static, undirected graphs and do not account for the stochastic, directed nature of sequential processes.

**Transition Network Analysis (TNA)** integrates probabilistic transition modeling with directed weighted network analysis and wraps both in a layered statistical validation framework (Saqr, Lopez-Pernas, & Tikka, [2025](https://doi.org/10.1145/3706468.3706513)). The method operates on sequence data and constructs directed weighted networks where nodes are states and edge weights encode transition frequencies or probabilities. The distinguishing feature is the statistical infrastructure: split-half model reliability, bootstrap validation of individual edges, case-dropping stability of centrality measures, and permutation-based group comparison with effect sizes. A comprehensive [tutorial](https://sonsoles.me/posts/tna-tutorial/) covers the full pipeline.

</div>

<figure class="tna-img">
  <img src="/assets/img/tna-group-regulation.png" alt="TNA network of the group_regulation dataset">
  <figcaption>TNA model of the <code>group_regulation</code> dataset, pruned to retain significant transitions. Edge widths and opacity encode transition probabilities.</figcaption>
</figure>

```r
library(tna)
data(group_regulation)
model <- tna(group_regulation)
pruned <- prune(model)
plot(pruned)
```

<div class="tna-section">
<h2>Model Types</h2>
<div class="tna-body" markdown="1">

The same sequence data can be represented as different types of networks. **TNA** constructs a standard first-order Markov model with row-normalized transition probabilities. **FTNA** retains raw transition counts without normalization &mdash; suited for descriptive analysis when sequence lengths vary ([online tutorial](https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html)). **CTNA** builds an undirected network from state co-occurrence within sequences. **ATNA** applies exponential decay based on the gap between states, with forward, backward, and bidirectional variants ([vignette](https://sonsoles.me/tna/articles/atna.html)). **WTNA** adjusts for sequence length by inversely weighting transitions. Each model encodes different assumptions. The choice is substantive, not computational.

</div>
</div>

<div class="tna-section">
<h2>Four Layers of Validation</h2>
<div class="tna-body" markdown="1">

The methodological core of TNA is validation at four levels &mdash; model, edges, nodes, and networks &mdash; described in the [TNA primer](https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html) and formalized in the [R package paper](https://doi.org/10.1177/01466216251348840).

**Model reliability** comes first. The `reliability()` function performs split-half validation: the sequence data is randomly divided into two halves, a TNA model is estimated from each, and the two networks are compared over many iterations (default 1,000). Four metrics quantify agreement: Pearson correlation between edge weights, mean and median absolute difference, and Bray-Curtis dissimilarity. On the `group_regulation` dataset, split-half Pearson correlations average 0.993 &mdash; the model structure is highly reproducible. If reliability is low, no downstream analysis can rescue the findings.

**Edge validation** uses bootstrap pruning or disparity filtering. Bootstrap pruning resamples sequences with replacement, estimates a model from each sample, and retains edges that appear consistently &mdash; yielding a p-value and confidence interval per edge. The disparity filter retains edges whose weights are significant relative to a null model of uniform distribution.

**Node validation** addresses centrality stability. TNA computes nine centrality measures: InStrength, OutStrength, Closeness (In/Out/combined), Betweenness, random-walk Betweenness, Diffusion, and Clustering coefficient. Case-dropping stability analysis removes increasing proportions of sequences and tracks correlation with original centralities. If correlations hold above 0.7 when half the data is removed, the estimates are reliable.

**Network validation** uses permutation testing for group comparison. Sequences from both groups are pooled, group labels shuffled, and a test statistic computed for each permutation to obtain a p-value and effect size at the edge or network level. The [group analysis tutorial](https://sonsoles.me/posts/tna-group/) and [comparison guide](https://sonsoles.me/posts/tna-compare/) demonstrate this with worked examples.

The four layers form a chain where each guards against a different source of error. Every claim &mdash; this transition is significant, this state is central, these groups differ &mdash; has been tested against a null hypothesis. The analysis is replicable because validation is built into the method, not left to the analyst's judgment.

</div>
</div>

<div class="tna-section">
<h2>Structure and Metrics</h2>
<div class="tna-body" markdown="1">

Community detection partitions the network into subsets of states with denser internal connections ([vignette](https://sonsoles.me/tna/articles/communities_and_cliques.html)). Clique detection identifies maximally connected subgraphs. Sequence-level clustering groups individuals by edit distance, Hamming distance, or longest common subsequence into behaviorally distinct subgroups ([clustering tutorial](https://sonsoles.me/posts/tna-clustering/); [book chapter](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html)). Network-level metrics &mdash; density, reciprocity, mean distance, centralization, degree distribution &mdash; provide a quantitative fingerprint for comparison across conditions or time periods.

</div>
</div>

<div class="tna-section">
<h2>Software Ecosystem</h2>

<div class="eco-grid">
  <div class="eco-card">
    <h4><a href="https://cran.r-project.org/package=tna">tna for R</a></h4>
    <p>The reference implementation on CRAN. Full pipeline: five model types, nine centrality measures, three pruning methods, community detection, clustering, permutation testing, stability analysis, and plotting. <a href="https://sonsoles.me/tna/">Documentation</a> &middot; <a href="https://github.com/sonsoleslp/tna">GitHub</a></p>
  </div>
  <div class="eco-card">
    <h4><a href="https://pypi.org/project/tnapy/">tnapy for Python</a></h4>
    <p>Model building, centralities, validation, and visualization for the Python stack. <a href="https://sonsoles.me/extra/tna-py.html">Tutorial</a></p>
  </div>
  <div class="eco-card">
    <h4><a href="https://github.com/sonsoleslp/jTNA">jTNA for Jamovi</a></h4>
    <p>Point-and-click TNA through Jamovi's graphical interface. Bootstrap, centralities, community detection &mdash; no code required.</p>
  </div>
  <div class="eco-card">
    <h4><a href="https://sonsoleslp.shinyapps.io/tna-app/">TNA Shiny App</a></h4>
    <p>Browser-based, zero-install. Upload data, build models, run bootstrap pruning, export results.</p>
  </div>
</div>
</div>

<div class="tna-section">
<h2>Resources</h2>

<h4>Tutorials</h4>
<ul class="res-list">
  <li><a href="https://sonsoles.me/posts/tna-tutorial/">Comprehensive TNA Tutorial</a></li>
  <li><a href="https://sonsoles.me/posts/tna-data/">Data Preparation Guide</a></li>
  <li><a href="https://sonsoles.me/posts/tna-clustering/">Clustering Tutorial</a></li>
  <li><a href="https://sonsoles.me/posts/tna-group/">Group Analysis Tutorial</a></li>
  <li><a href="https://sonsoles.me/posts/tna-compare/">Model Comparison Guide</a></li>
  <li><a href="https://sonsoles.me/extra/tna-py.html">Python Tutorial</a></li>
</ul>

<h4>Package Vignettes</h4>
<ul class="res-list">
  <li><a href="https://sonsoles.me/tna/articles/tna.html">Getting Started</a></li>
  <li><a href="https://sonsoles.me/tna/articles/complete_tutorial.html">Complete Tutorial</a></li>
  <li><a href="https://sonsoles.me/tna/articles/prepare_data.html">Data Preparation</a></li>
  <li><a href="https://sonsoles.me/tna/articles/ftna.html">Frequency TNA (FTNA)</a></li>
  <li><a href="https://sonsoles.me/tna/articles/atna.html">Attention TNA (ATNA)</a></li>
  <li><a href="https://sonsoles.me/tna/articles/communities_and_cliques.html">Communities and Cliques</a></li>
  <li><a href="https://sonsoles.me/tna/articles/grouped_sequences.html">Grouped Sequences</a></li>
</ul>

<h4>Book Chapters (Springer, 2025)</h4>
<ul>
  <li><a href="https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html">Ch. 15 &mdash; TNA Primer and Tutorial</a> (<a href="https://doi.org/10.1007/978-3-031-95365-1_15">DOI</a>)</li>
  <li><a href="https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html">Ch. 16 &mdash; Frequency TNA</a> (<a href="https://doi.org/10.1007/978-3-031-95365-1_16">DOI</a>)</li>
  <li><a href="https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html">Ch. 17 &mdash; TNA Clusters</a> (<a href="https://doi.org/10.1007/978-3-031-95365-1_17">DOI</a>)</li>
</ul>

<h4>Publications</h4>
<ul>
  <li>Saqr, M., Lopez-Pernas, S., Tikka, S., et al. (2025). Transition Network Analysis. <em>LAK '25</em>. <a href="https://doi.org/10.1145/3706468.3706513">DOI</a> &middot; <a href="https://arxiv.org/abs/2411.15486">arXiv</a></li>
  <li>Tikka, S., Lopez-Pernas, S., & Saqr, M. (2025). tna: An R Package for TNA. <em>Applied Psychological Measurement</em>. <a href="https://doi.org/10.1177/01466216251348840">DOI</a></li>
  <li>Lopez-Pernas, S., et al. (2025). <em>IEEE Transactions on Learning Technologies</em>. <a href="https://doi.org/10.1109/tlt.2025.3568599">DOI</a></li>
  <li>T&ouml;rm&auml;nen, T., et al. (2025). <em>Learning and Instruction</em>. <a href="https://doi.org/10.1016/j.learninstruc.2025.102188">DOI</a></li>
</ul>
</div>
