---
layout: post
title: "What is Transition Network Analysis, and What Does JTNA Do?"
date: 2026-03-01 10:00:00
description: TNA brings statistical rigor to sequential behavioral analysis — p-values, effect sizes, and confidence intervals at the edge level — now available in jamovi through JTNA.
tags: tna learning-analytics jamovi network-analysis
categories: research
thumbnail: assets/img/tutorials/tna-tutorial.png
---

Transition Network Analysis (TNA) is a method for studying how people move through behavioral states over time. It was developed by [Mohammed Saqr](https://saqr.me), [Sonsoles López-Pernas](https://sonsoles.me), and [Santtu Tikka](https://arxiv.org/abs/2411.15486) to address a problem that anyone who works with sequential behavioral data will recognize: most methods can only read one kind of signal at a time. Process mining handles sequences and temporal ordering but has no native notion of centrality, community structure, or network-level metrics. Social network analysis captures relational patterns between states but discards the order in which they occur. TNA was designed to hold both simultaneously — modeling the temporal flow of behavior and the relational structure of that flow within a single, unified framework.

The method represents sequential data as a directed, weighted network. States become nodes; transitions between them become edges, with weights reflecting transition probabilities. From that network you can ask which states are pivotal — centrality measures identify the nodes through which behavioral flow passes most frequently. You can ask which states cluster into coherent patterns — community detection groups states that tend to co-occur or reinforce one another. And you can trace the actual sequences participants follow over time. A full theoretical introduction, grounded in stochastic process mining and Markov models, is in [Chapter 15](https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html) of *Advanced Learning Analytics Methods*. The method was first demonstrated on data from 191 students in collaborative self-regulated learning, where it mapped group regulatory dynamics, identified pivotal co-regulation events, and revealed behavioral communities that previous methods had not surfaced.

---

## What Sets TNA Apart: Statistical Rigor at Every Level

What distinguishes TNA from both process mining and conventional network analysis is not its visualizations or its network metrics — it is the depth of statistical validation applied to every element of the output. Most behavioral analysis methods describe patterns; TNA tests them.

Every edge in a TNA network is validated through bootstrap resampling. Hundreds or thousands of resampled datasets establish which transitions are stable across the sample and which are artifacts of the particular data collected. The result is a pruned, defensible network rather than a map of noise — and each retained edge carries a **p-value and confidence interval**. For group comparisons, permutation tests operate edge by edge, reporting both a p-value and an **effect size** for each individual transition. This means a researcher comparing two groups does not just learn that the groups differ overall; they learn exactly which behavioral links differ, in which direction, and by how much. Centrality measures are evaluated through a dedicated case-dropping procedure — the CS-coefficient measures how much centrality rankings shift as random subsets of participants are removed, giving a direct reliability estimate for each measure. As Saqr and López-Pernas state in their book chapter, this addresses "a critical gap in current process mining and network analysis approaches in education." Their LAK paper describes TNA as introducing significance tests that "go beyond either method and add rigor to the analysis."

No comparable framework offers edge-level validation with effect sizes, permutation-based group comparison with per-edge significance, and centrality stability testing — all within one integrated pipeline. The `tna` R package — documented at [sonsoles.me/tna/](https://sonsoles.me/tna/) and published in [*Applied Psychological Measurement*](https://pmc.ncbi.nlm.nih.gov/articles/PMC12141252/) — implements the full pipeline for R users. A [no-install Shiny web app](https://sonsoleslp.shinyapps.io/tna-app/) provides quick access without setup.

---

## TNA in Jamovi: JTNA

All of that is now available in [jamovi](https://www.jamovi.org) through **JTNA** — a free, point-and-click module requiring no code. If this level of statistical validation has been out of reach because it required R expertise, that barrier is gone.

The base **TNA module** takes behavioral data in long format — one row per event — and builds transition, frequency, or attention-weighted networks. Seven centrality measures are computed and statistically validated automatically. Communities are detected using any of seven algorithms. Every edge carries bootstrap confidence intervals and a p-value, and results can be filtered to show only statistically significant transitions. Sequence visualization shows individual behavioral trajectories, and pattern discovery via [codyna](https://sonsoles.me/posts/codyna-seq-tutorial/) surfaces recurring subsequences — n-grams, gapped patterns, within-person repeated patterns — alongside the network. [Getting started with tna](https://sonsoles.me/tna/articles/tna.html) is the quickest entry point; the [complete function showcase](https://sonsoles.me/tna/articles/complete_tutorial.html) and Sonsoles López-Pernas' [step-by-step tutorial](https://sonsoles.me/posts/tna-tutorial/) cover the full workflow.

**Group TNA** is for studies with pre-defined groups. Permutation tests report a p-value and effect size for every edge, a difference plot marks which transitions diverge between groups, and a subsequence comparison tests whether specific behavioral patterns occur at significantly different rates. The [group analysis tutorial](https://sonsoles.me/posts/tna-group/) and [model comparison guide](https://sonsoles.me/posts/tna-compare/) walk through interpretation. Frequency-based variants of the method are covered in [Chapter 16](https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html) of *Advanced Learning Analytics Methods* and the [ftna vignette](https://sonsoles.me/tna/articles/ftna.html).

**Cluster TNA** discovers behavioral profiles without a pre-existing group variable. It computes pairwise dissimilarities between sequences — six algorithms available, from Levenshtein edit distance to Jaccard set overlap — clusters participants, then builds and statistically compares a separate transition network per cluster. Validation is the same as in Group TNA: permutation tests with effect sizes, edge-level significance, and centrality stability. The [clustering tutorial](https://sonsoles.me/posts/tna-clustering/), [grouped sequences vignette](https://sonsoles.me/tna/articles/grouped_sequences.html), and [Chapter 17](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html) provide detailed walkthroughs.

Across all three modules, per-participant sequence indices — longitudinal entropy, Simpson diversity, self-loop tendency, transition rate, mean spell duration, and complexity — are available for downstream analyses. The attention model type weights recent transitions more heavily via a configurable decay parameter, covered in the [Attention TNA vignette](https://sonsoles.me/tna/articles/atna.html). Communities and cliques are documented in the [communities vignette](https://sonsoles.me/tna/articles/communities_and_cliques.html).

---

## Getting Started

Data should be in long format: one row per event, with **Action** as the required column, and **Actor**, **Time**, **Order**, and **Group** as optional extensions. A bundled sample dataset (`Regulation_long`) enables a complete analysis immediately after installing. The [data preparation guide](https://sonsoles.me/posts/tna-data/) and [prepare_data vignette](https://sonsoles.me/tna/articles/prepare_data.html) cover the full range of supported input formats.

JTNA is freely installable from the jamovi module library. Source code and releases at [github.com/mohsaqr/JTNA1.2](https://github.com/mohsaqr/JTNA1.2). For the broader TNA ecosystem — the R package, web app, book chapters, and active development — visit [sites.uef.fi/learning-analytics/tna](https://sites.uef.fi/learning-analytics/tna/).

---

## Tutorials

| Tutorial | Link |
|---|---|
| An Updated Comprehensive Tutorial on Transition Network Analysis (TNA) | [sonsoles.me/posts/tna-tutorial](https://sonsoles.me/posts/tna-tutorial/) |
| TNA Data Preparation: A Comprehensive Guide to prepare_data() | [sonsoles.me/posts/tna-data](https://sonsoles.me/posts/tna-data/) |
| TNA Group Analysis: Analysis and Comparison of Groups | [sonsoles.me/posts/tna-group](https://sonsoles.me/posts/tna-group/) |
| TNA Clustering: Discovering and Analysis of Clusters | [sonsoles.me/posts/tna-clustering](https://sonsoles.me/posts/tna-clustering/) |
| TNA Model Comparison: A Comprehensive Guide to Network Comparison | [sonsoles.me/posts/tna-compare](https://sonsoles.me/posts/tna-compare/) |
| Full reference guide on tna functions | [sonsoles.me/tna/tna.html](https://sonsoles.me/tna/tna.html) |
| Sequence Patterns, Outcomes, and Indices with codyna | [sonsoles.me/posts/codyna-seq-tutorial](https://sonsoles.me/posts/codyna-seq-tutorial/) |

---

## References

Saqr, M., López-Pernas, S., Törmänen, T., Kaliisa, R., Misiejuk, K., & Tikka, S. (2025). Transition Network Analysis: A Novel Framework for Modeling, Visualizing, and Identifying the Temporal Patterns of Learners and Learning Processes. In *Proceedings of the 15th International Learning Analytics and Knowledge Conference (LAK '25)* (pp. 351–361). ACM. [https://doi.org/10.1145/3706468.3706513](https://doi.org/10.1145/3706468.3706513)

Tikka, S., López-Pernas, S., & Saqr, M. (2025). tna: An R Package for Transition Network Analysis. *Applied Psychological Measurement*. [https://doi.org/10.1177/01466216251348840](https://doi.org/10.1177/01466216251348840)

Saqr, M., López-Pernas, S., & Tikka, S. (2025). Mapping Relational Dynamics with Transition Network Analysis: A Primer and Tutorial. In M. Saqr & S. López-Pernas (Eds.), *Advanced Learning Analytics Methods: AI, Precision and Complexity*. Springer. [https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html](https://lamethods.org/book2/chapters/ch15-tna/ch15-tna.html)

Saqr, M., López-Pernas, S., & Tikka, S. (2025). Capturing The Breadth and Dynamics of the Temporal Processes with Frequency Transition Network Analysis: A Primer and Tutorial. In M. Saqr & S. López-Pernas (Eds.), *Advanced Learning Analytics Methods: AI, Precision and Complexity*. Springer. [https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html](https://lamethods.org/book2/chapters/ch16-ftna/ch16-ftna.html)

López-Pernas, S., Tikka, S., & Saqr, M. (2025). Mining Patterns and Clusters with Transition Network Analysis: A Heterogeneity Approach. In M. Saqr & S. López-Pernas (Eds.), *Advanced Learning Analytics Methods: AI, Precision and Complexity*. Springer. [https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html)
