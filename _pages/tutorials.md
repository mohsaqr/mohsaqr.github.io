---
layout: page
permalink: /tutorials/
title: Tutorials
description: Hands-on tutorials for transition network analysis, sequence analytics, and learning analytics methods in R.
nav: true
nav_order: 3
---

<style>
.tutorial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}
.tutorial-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--global-divider-color);
  background: var(--global-bg-color);
  transition: box-shadow 0.25s, transform 0.25s;
}
.tutorial-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.tutorial-card img {
  width: 240px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.tutorial-card .tutorial-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tutorial-card .tutorial-body h3 {
  margin: 0 0 0.4rem 0;
  font-size: 1.15rem;
}
.tutorial-card .tutorial-body h3 a {
  color: var(--global-theme-color);
  text-decoration: none;
}
.tutorial-card .tutorial-body h3 a:hover {
  text-decoration: underline;
}
.tutorial-card .tutorial-body p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--global-text-color);
  text-align: justify;
}
.tutorial-card .tutorial-meta {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: var(--global-text-color-light);
}
.tutorial-card .tutorial-meta .badge-tut {
  display: inline-block;
  background-color: var(--global-theme-color);
  color: white;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  font-size: 0.78rem;
  margin-right: 0.3rem;
}
.tutorial-section-title {
  color: var(--global-theme-color);
  border-bottom: 2px solid var(--global-theme-color);
  padding-bottom: 0.3rem;
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
}
.tutorial-intro {
  font-size: 1.05em;
  line-height: 1.7;
  margin-bottom: 1rem;
  text-align: justify;
}
@media (max-width: 768px) {
  .tutorial-card {
    flex-direction: column;
  }
  .tutorial-card img {
    width: 100%;
    height: 200px;
  }
}
</style>

<p class="tutorial-intro">
These tutorials provide step-by-step, reproducible guides for applying advanced analytical methods in education research. Each tutorial uses real data, includes full R code, and is designed to be accessible to researchers and practitioners. They accompany the <a href="https://sonsoles.me/posts/labook/index.html" target="_blank">Learning Analytics Methods and Tutorials</a> book and the <a href="https://cran.r-project.org/package=tna" target="_blank">tna</a> R package.
</p>

<h2 class="tutorial-section-title">Transition Network Analysis (TNA)</h2>

<div class="tutorial-grid">

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/tna-tutorial.png' | relative_url }}" alt="TNA tutorial network visualization">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/tna-tutorial/index.html" target="_blank">An Updated Comprehensive Tutorial on Transition Network Analysis</a></h3>
      <p>
        The definitive guide to TNA &mdash; from building transition matrices to network visualization, centrality analysis, community detection, and bootstrapped significance testing. This tutorial walks through every step of modeling how learners move between behavioral states over time, using the <code>tna</code> R package with real educational data.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">R</span> <span class="badge-tut">tna</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; Feb 2026
      </div>
    </div>
  </div>

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/tna-data.png' | relative_url }}" alt="TNA data preparation">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/tna-data/index.html" target="_blank">TNA Data Preparation: A Comprehensive Guide to <code>prepare_data()</code></a></h3>
      <p>
        Before running any TNA analysis, raw event logs need to be reshaped into sequences. This companion tutorial covers the full data preparation pipeline &mdash; from importing raw timestamped data to defining states, handling missing values, setting sequence boundaries, and producing the structured input that <code>tna()</code> expects.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">R</span> <span class="badge-tut">tna</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; Feb 2026
      </div>
    </div>
  </div>

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/tna-clustering.png' | relative_url }}" alt="TNA clustering">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/tna-clustering/index.html" target="_blank">TNA Clustering: Discovering and Analysis of Clusters</a></h3>
      <p>
        Learners do not all follow the same behavioral sequences. This tutorial demonstrates data-driven clustering of temporal sequences to identify distinct groups of learners with similar process patterns. It covers dissimilarity computation, optimal cluster selection, cluster validation, and how to build and compare separate TNA models for each discovered cluster.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">R</span> <span class="badge-tut">tna</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; Feb 2026
      </div>
    </div>
  </div>

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/tna-group.png' | relative_url }}" alt="TNA group analysis">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/tna-group/index.html" target="_blank">TNA Group Analysis: Analysis and Comparison of Groups</a></h3>
      <p>
        When learners belong to pre-defined groups &mdash; high vs. low achievers, different courses, experimental conditions &mdash; you need rigorous methods to compare their behavioral processes. This tutorial covers group-level TNA construction, permutation testing for significant differences between transition networks, bootstrapped confidence intervals, and visual comparison of group networks.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">R</span> <span class="badge-tut">tna</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; Feb 2026
      </div>
    </div>
  </div>

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/tna-compare.png' | relative_url }}" alt="TNA model comparison">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/tna-compare/index.html" target="_blank">TNA Model Comparison: A Comprehensive Guide to Network Comparison</a></h3>
      <p>
        Comparing transition networks across conditions, time points, or populations requires more than visual inspection. This tutorial presents a methodologically rigorous framework for model comparison, including edge-level difference testing, network-level similarity metrics, heatmap visualizations of transition differences, and statistical tests that account for the dependency structure of network data.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">R</span> <span class="badge-tut">tna</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; Feb 2026
      </div>
    </div>
  </div>

</div>

<h2 class="tutorial-section-title">Sequence &amp; Process Analytics</h2>

<div class="tutorial-grid">

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/codyna.png' | relative_url }}" alt="Codyna sequence patterns">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/codyna-seq-tutorial/index.html" target="_blank">Sequence Patterns, Outcomes, and Indices with <code>codyna</code></a></h3>
      <p>
        Beyond transition networks, behavioral sequences contain rich information in their structure &mdash; entropy, complexity, turbulence, and recurrence. This tutorial introduces the <code>codyna</code> R package for computing sequence indices, detecting sequential patterns, linking sequence properties to learning outcomes, and visualizing the dynamics of behavior over time using real educational data.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">R</span> <span class="badge-tut">codyna</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; Feb 2026
      </div>
    </div>
  </div>

</div>

<h2 class="tutorial-section-title">Books</h2>

<div class="tutorial-grid">

  <div class="tutorial-card">
    <img src="{{ '/assets/img/tutorials/labook.jpeg' | relative_url }}" alt="Learning Analytics Methods and Tutorials book cover">
    <div class="tutorial-body">
      <h3><a href="https://sonsoles.me/posts/labook/index.html" target="_blank">Learning Analytics Methods and Tutorials: A Practical Guide Using R</a></h3>
      <p>
        This open-access Springer book is a comprehensive guide to learning analytics methods, covering everything from R programming basics and data wrangling to advanced techniques including network analysis, sequence mining, process mining, machine learning, and psychological networks. Each chapter pairs methodological explanation with reproducible R tutorials using real educational data. Co-edited with Sonsoles L&oacute;pez-Pernas.
      </p>
      <div class="tutorial-meta">
        <span class="badge-tut">Book</span> <span class="badge-tut">R</span> <span class="badge-tut">Springer</span>
        Mohammed Saqr &amp; Sonsoles L&oacute;pez-Pernas &middot; 2024
      </div>
    </div>
  </div>

</div>
