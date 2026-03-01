---
layout: post
title: "JTNA v1.6.1 — What's New"
date: 2026-03-01 10:00:00-0400
inline: false
related_posts: false
---

[JTNA](https://github.com/mohsaqr/JTNA1.2) is a free jamovi module for Transition Network Analysis — a method that models sequential behavioral data as directed networks and applies rigorous statistical validation (bootstrap p-values and confidence intervals per edge, permutation tests with effect sizes per group comparison, centrality stability coefficients) that has no equivalent in process mining or conventional network analysis. Version 1.4.0 included two modules: TNA for individual-level analysis, and Group TNA for comparing pre-defined groups. Version 1.6.1 adds the following.

**Cluster TNA** is a new module that discovers behavioral profiles from the data without requiring a pre-existing group variable. It computes pairwise dissimilarities between participants' sequences using your choice of six algorithms — Hamming, Levenshtein, Optimal String Alignment, Longest Common Subsequence, Jaccard, or Jaro-Winkler — clusters participants, and builds a separate transition network for each cluster. Group-level validation is identical to Group TNA: permutation tests with per-edge effect sizes, subsequence comparison, and network difference plots. See the [clustering tutorial](https://sonsoles.me/posts/tna-clustering/) and [Chapter 17](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html) of *Advanced Learning Analytics Methods*.

**Pattern Discovery**, powered by [codyna](https://sonsoles.me/posts/codyna-seq-tutorial/), finds recurring subsequences across participants: consecutive n-grams, gapped patterns that allow non-adjacent elements, and within-person repeated patterns. Filters by length, gap range, support threshold, and anchor states control what qualifies. Where the transition network shows probabilities, pattern discovery shows the actual sequences behind them.

**Centrality Stability Analysis** is now in all three modules. The CS-coefficient — produced by a case-dropping procedure that repeatedly removes random participant subsets and recomputes centrality rankings — tells you whether the centrality results would hold in a different sample. Values above 0.7 indicate stable rankings; below 0.5 suggests they are sensitive to sample composition.

**Sequence Indices** adds per-participant summary statistics: longitudinal entropy, Simpson diversity, mean spell duration, self-loop tendency, transition rate, and complexity index. These are immediately usable as outcome or predictor variables in downstream analyses.

**Attention model type**: a new model type weights recent transitions more heavily than distant ones via a configurable decay parameter λ, available in all three modules.

**Fourteen network layout algorithms**, up from two (circle and spring). New options include Kamada-Kawai, Fruchterman-Reingold, GEM, Sugiyama hierarchical, DRL, and others — different layouts can surface different structural properties of the same network.

Other changes: Group TNA adds subsequence comparison (statistical test of whether specific behavioral patterns occur at different rates across groups); community detection now outputs a table alongside the plot; bootstrap results tables support pagination and filtering to significant edges only; a sample dataset (`Regulation_long`) is bundled for immediate testing; references updated to four academic citations.

JTNA is installable from the jamovi module library at no cost. Source code: [github.com/mohsaqr/JTNA1.2](https://github.com/mohsaqr/JTNA1.2). Full documentation: [sites.uef.fi/learning-analytics/tna](https://sites.uef.fi/learning-analytics/tna/).
