---
layout: post
title: "Transition Network Analysis: Validated Temporal Modeling from Sequence Data"
date: 2026-03-07 10:00:00
description: TNA integrates probabilistic transition modeling with network analysis and four layers of statistical validation — model reliability, edge significance, centrality stability, and permutation-based group comparison.
tags: tna learning-analytics network-analysis sequence-analysis
categories: research
thumbnail: assets/img/tna-group-regulation.png
---

Process mining, Markov models, and network analysis each offer partial views of sequential behavior. Process mining produces transition graphs with no statistical tests on edges. Markov models estimate transition probabilities but lack the network-analytic toolkit to characterize node importance or meso-level structure. Network analysis methods typically assume static, undirected graphs and do not account for the stochastic, directed nature of sequential processes.

Transition Network Analysis (TNA) integrates probabilistic transition modeling with directed weighted network analysis and wraps both in a layered statistical validation framework (Saqr, Lopez-Pernas, & Tikka, [2025](https://doi.org/10.1145/3706468.3706513)). The method operates on sequence data — ordered series of discrete states recorded from learners, patients, users, or any agents moving between activities — and constructs directed weighted networks where nodes are states and edge weights encode transition frequencies or probabilities. The distinguishing feature is not the network construction itself, which is standard, but the statistical infrastructure built around it: split-half model reliability, bootstrap validation of individual edges, case-dropping stability of centrality measures, and permutation-based group comparison with effect sizes. A comprehensive [tutorial](https://sonsoles.me/posts/tna-tutorial/) covers the full pipeline in detail. The figure below shows a TNA model built from the `group_regulation` dataset (Saqr et al., [2025](https://doi.org/10.1145/3706468.3706513)), after pruning with the default threshold. The nine nodes represent group regulation behaviors; edge widths and opacity encode transition probabilities.

![TNA network of the group_regulation dataset, pruned to retain significant transitions. Node sizes reflect in-strength centrality.](/assets/img/tna-group-regulation.png)

```r
library(tna)
data(group_regulation)
model <- tna(group_regulation)
pruned <- prune(model)
plot(pruned)
```

## Multiple Model Types

The same sequence data can be represented as different types of networks. **TNA** constructs a standard first-order Markov model with row-normalized transition probabilities. **FTNA** (Frequency TNA) retains raw transition counts without normalization — suited for descriptive analysis when sequence lengths vary or when the question is about volume rather than conditional probability (Lopez-Pernas, Saqr, & Tikka, [2025](https://doi.org/10.1007/978-3-031-95365-1_16); [online tutorial](https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html)). **CTNA** (Co-occurrence TNA) builds an undirected network from state co-occurrence within sequences. **ATNA** (Attention TNA) applies exponential decay based on the gap between states, with forward, backward, and bidirectional variants controlled by a beta parameter ([vignette](https://sonsoles.me/tna/articles/atna.html)). **WTNA** (Weighted TNA) adjusts for sequence length by inversely weighting transitions. Each model encodes different assumptions. The choice is substantive, not computational.

## Four Layers of Validation

The methodological core of TNA is validation at four levels — model, edges, nodes, and networks — described in the [TNA primer](https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html) (Lopez-Pernas & Saqr, [2025](https://doi.org/10.1007/978-3-031-95365-1_15)) and formalized in the R package paper (Tikka, Lopez-Pernas, & Saqr, [2025](https://doi.org/10.1177/01466216251348840)).

**Model reliability** comes first, before any downstream analysis. The `reliability()` function performs split-half validation: the sequence data is randomly divided into two halves, a TNA model is estimated from each half, and the two resulting networks are compared. This is repeated over many iterations (default 1,000). Four metrics quantify agreement across splits: Pearson correlation between the two sets of edge weights (values above 0.9 indicate strong reliability), mean and median absolute difference between corresponding edges, and Bray-Curtis dissimilarity (an ecological distance metric sensitive to compositional differences). On the `group_regulation` dataset, for instance, split-half Pearson correlations average 0.993 with a standard deviation of 0.002 — the model structure is highly reproducible across random halves of the data. If reliability is low, no amount of centrality analysis or group comparison can rescue the findings; the model itself is unstable. This check should precede all other validation steps.

**Edge validation** uses bootstrap pruning or disparity filtering. Bootstrap pruning resamples sequences with replacement (e.g., 1,000 iterations), estimates a model from each sample, and retains edges that appear consistently across samples — yielding a p-value and confidence interval per edge. The disparity filter (Serrano et al., 2009) retains edges whose weights are significant relative to a null model of uniform distribution, discarding edges below a specified alpha. Both methods replace arbitrary thresholding with statistically grounded edge selection.

**Node validation** addresses whether centrality values are stable. TNA computes nine centrality measures for directed weighted networks: InStrength, OutStrength, Closeness (In/Out/combined), Betweenness, random-walk Betweenness (BetweennessRSP), Diffusion, and Clustering coefficient. Case-dropping stability analysis then removes increasing proportions of sequences (10%–70%) and tracks the correlation between original and reduced-sample centralities. If correlations hold above 0.7 when half the data is removed, the centrality estimates are reliable. This technique, standard in psychometric networks (Epskamp et al., 2018), had not been previously applied to temporal process networks.

**Network validation** uses permutation testing for group comparison. Sequences from both groups are pooled, group labels shuffled (e.g., 5,000 permutations), and a test statistic computed for each. The observed difference is compared against this null distribution for a p-value and effect size, at either the edge or network level, with multiple-comparison correction. The [group analysis tutorial](https://sonsoles.me/posts/tna-group/) and [comparison guide](https://sonsoles.me/posts/tna-compare/) demonstrate this with worked examples.

## Structure Beyond Nodes and Edges

Community detection partitions the network into subsets of states with denser internal connections, revealing behavioral patterns or process phases (see the [communities and cliques vignette](https://sonsoles.me/tna/articles/communities_and_cliques.html)). Clique detection identifies maximally connected subgraphs. At the sequence level, clustering groups individual sequences by edit distance, Hamming distance, or longest common subsequence into behaviorally distinct subgroups (Lopez-Pernas, Saqr, & Tikka, [2025](https://doi.org/10.1007/978-3-031-95365-1_17); [clustering tutorial](https://sonsoles.me/posts/tna-clustering/); [online chapter](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html)). Network-level metrics — density, reciprocity, mean distance, centralization, degree distribution — provide a quantitative fingerprint for comparison across conditions or time periods.

## The Software Ecosystem

TNA is implemented across four platforms, each targeting a different audience:

**tna for R** ([CRAN](https://cran.r-project.org/package=tna), [GitHub](https://github.com/sonsoleslp/tna), [documentation](https://sonsoles.me/tna/)). The reference implementation. Full pipeline: [data preparation](https://sonsoles.me/tna/articles/prepare_data.html), all five model types, nine centrality measures, three pruning methods (threshold, disparity, bootstrap), community and clique detection, sequence clustering, permutation testing, case-dropping stability, and network plotting. Published in *Applied Psychological Measurement* (Tikka, Lopez-Pernas, & Saqr, [2025](https://doi.org/10.1177/01466216251348840)). A [complete tutorial vignette](https://sonsoles.me/tna/articles/complete_tutorial.html) walks through every feature.

**tnapy for Python** ([PyPI](https://pypi.org/project/tnapy/), [tutorial](https://sonsoles.me/extra/tna-py.html)). Covers model building, centralities, validation, and visualization for the Python scientific stack.

**jTNA for Jamovi** ([GitHub](https://github.com/sonsoleslp/jTNA)). A plugin for the Jamovi desktop application. Point-and-click TNA without writing code, including bootstrap validation and centrality computation.

**TNA Shiny App** ([web](https://sonsoleslp.shinyapps.io/tna-app/)). Browser-based, zero-install. Upload data, build models, compute centralities, run bootstrap pruning, export results. Documented in Lopez-Pernas, Tikka, Misiejuk, & Saqr (2026).

The four validation layers — model reliability, edge significance, centrality stability, group-level permutation — form a chain where each level guards against a different source of error. A model that fails split-half reliability is not interpreted. Edges that do not survive bootstrap resampling are pruned. Centrality rankings that collapse under case-dropping are flagged as sample-dependent. Group differences that fall within the permutation null distribution are not reported as findings. The result is that every claim published from a TNA analysis — this transition is significant, this state is central, these two groups differ — has been tested against a specific null hypothesis and survived. The analysis is replicable because the validation is built into the method, not left to the analyst's judgment. A second researcher, given the same sequence data, will obtain the same pruned network, the same stability coefficients, the same permutation p-values. Nothing in the pipeline depends on subjective thresholds or visual interpretation.

---

## Resources

### Tutorials and Guides

- [Comprehensive TNA Tutorial](https://sonsoles.me/posts/tna-tutorial/) — full walkthrough from data to interpretation
- [Data Preparation Guide](https://sonsoles.me/posts/tna-data/) — preparing sequence data for TNA
- [TNA Clustering Tutorial](https://sonsoles.me/posts/tna-clustering/) — discovering behavioral subgroups
- [Group Analysis Tutorial](https://sonsoles.me/posts/tna-group/) — comparing groups with TNA
- [Model Comparison Guide](https://sonsoles.me/posts/tna-compare/) — permutation-based model comparison
- [Python Tutorial](https://sonsoles.me/extra/tna-py.html) — getting started with tnapy

### Package Vignettes

- [Getting Started](https://sonsoles.me/tna/articles/tna.html)
- [Complete Tutorial](https://sonsoles.me/tna/articles/complete_tutorial.html)
- [Data Preparation](https://sonsoles.me/tna/articles/prepare_data.html)
- [Frequency TNA (FTNA)](https://sonsoles.me/tna/articles/ftna.html)
- [Attention TNA (ATNA)](https://sonsoles.me/tna/articles/atna.html)
- [Communities and Cliques](https://sonsoles.me/tna/articles/communities_and_cliques.html)
- [Grouped Sequences](https://sonsoles.me/tna/articles/grouped_sequences.html)

### Book Chapters (Springer, 2025)

- [Ch. 15 — TNA Primer and Tutorial](https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html) ([DOI](https://doi.org/10.1007/978-3-031-95365-1_15))
- [Ch. 16 — Frequency TNA](https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html) ([DOI](https://doi.org/10.1007/978-3-031-95365-1_16))
- [Ch. 17 — TNA Clusters](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html) ([DOI](https://doi.org/10.1007/978-3-031-95365-1_17))

### Software

- [tna for R — CRAN](https://cran.r-project.org/package=tna)
- [tna for R — GitHub](https://github.com/sonsoleslp/tna)
- [tna for R — Documentation](https://sonsoles.me/tna/)
- [tnapy for Python — PyPI](https://pypi.org/project/tnapy/)
- [jTNA for Jamovi — GitHub](https://github.com/sonsoleslp/jTNA)
- [TNA Shiny App — Web](https://sonsoleslp.shinyapps.io/tna-app/)

### Publications

- Saqr, M., Lopez-Pernas, S., Tikka, S., et al. (2025). Transition Network Analysis: A Novel Framework for Modeling, Visualizing, and Identifying the Temporal Patterns of Learners and Learning Processes. *LAK '25*. [DOI](https://doi.org/10.1145/3706468.3706513). [arXiv](https://arxiv.org/abs/2411.15486).
- Tikka, S., Lopez-Pernas, S., & Saqr, M. (2025). tna: An R Package for Transition Network Analysis. *Applied Psychological Measurement*. [DOI](https://doi.org/10.1177/01466216251348840).
- Lopez-Pernas, S., et al. (2025). *IEEE Transactions on Learning Technologies*. [DOI](https://doi.org/10.1109/tlt.2025.3568599).
- Tormanen, T., et al. (2025). *Learning and Instruction*. [DOI](https://doi.org/10.1016/j.learninstruc.2025.102188).
