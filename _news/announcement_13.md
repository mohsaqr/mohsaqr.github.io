---
layout: post
title: "JTNA v1.6.1 — Cluster TNA, Pattern Discovery, and Centrality Stability"
date: 2026-03-01 10:00:00-0400
inline: false
related_posts: false
---

JTNA v1.6.1 is out with three major additions and several smaller improvements.

The headline feature is **Cluster TNA**, a new analysis module that discovers behavioral profiles from the data rather than requiring a group variable. It computes pairwise dissimilarities between participants' sequences — six algorithms available, including Levenshtein, Jaccard, and Jaro-Winkler — clusters participants, and builds a separate transition network per cluster, with the same permutation tests and edge-level effect sizes available as in Group TNA. The [clustering tutorial](https://sonsoles.me/posts/tna-clustering/) walks through the full workflow, and [Chapter 17](https://lamethods.org/book2/chapters/ch17-tna-clusters/ch17-tna-clusters.html) of *Advanced Learning Analytics Methods* covers the method in depth.

**Pattern Discovery**, powered by the [codyna](https://sonsoles.me/posts/codyna-seq-tutorial/) package, is also new. It surfaces recurring subsequences — consecutive n-grams, gapped patterns, and within-person repeated patterns — with filters for length, gap size, support threshold, and anchor states. Where the transition network shows probabilities, pattern discovery shows the concrete sequences behind them.

**Centrality Stability Analysis** is now available in all three modules. The CS-coefficient, from a case-dropping procedure that repeatedly removes random participant subsets and recomputes centrality, tells you whether rankings would hold in a different sample. Values above 0.7 indicate reliable rankings; below 0.5 suggests sensitivity to sample composition. **Sequence Indices** adds per-participant statistics — longitudinal entropy, Simpson diversity, self-loop tendency, transition rate, mean spell duration, and complexity — usable directly in downstream analyses.

Smaller additions: an attention model type that weights recent transitions more heavily via a configurable decay parameter λ; network layout options expanded from 2 to 14 algorithms; community detection now outputs a table alongside the plot; bootstrap tables support pagination and filtering to significant edges only; and a sample dataset (`Regulation_long`) is bundled with the module. Full documentation and tutorials at [sites.uef.fi/learning-analytics/tna](https://sites.uef.fi/learning-analytics/tna/). Source code: [github.com/mohsaqr/JTNA1.2](https://github.com/mohsaqr/JTNA1.2).
