---
layout: page
permalink: /software/
title: Software
description: Scientific software for transition network analysis, learning analytics, AI-powered education, and data science.
nav: false
---

<style>
.sw-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.8rem;
  margin-top: 1.2rem;
}
.sw-card {
  display: flex;
  gap: 1.3rem;
  padding: 1.3rem 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--global-divider-color);
  background: var(--global-bg-color);
  transition: box-shadow 0.25s, transform 0.25s;
}
.sw-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.sw-icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: white;
  font-weight: 700;
  margin-top: 0.2rem;
}
.sw-body { flex-grow: 1; }
.sw-body h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1.15rem;
}
.sw-body h3 a {
  color: var(--global-theme-color);
  text-decoration: none;
}
.sw-body h3 a:hover { text-decoration: underline; }
.sw-body p {
  margin: 0;
  font-size: 0.93rem;
  line-height: 1.65;
  color: var(--global-text-color);
  text-align: justify;
}
.sw-meta {
  margin-top: 0.45rem;
  font-size: 0.8rem;
  color: var(--global-text-color-light);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}
.sw-badge {
  display: inline-block;
  padding: 0.12em 0.5em;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 500;
}
.sw-lang { background-color: #3D8B37; color: white; }
.sw-plat { background-color: #4A6FA5; color: white; }
.sw-cran { background-color: #1a6fb5; color: white; }
.sw-section-title {
  color: var(--global-theme-color);
  border-bottom: 2px solid var(--global-theme-color);
  padding-bottom: 0.3rem;
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
}
.sw-intro {
  font-size: 1.05em;
  line-height: 1.7;
  margin-bottom: 1rem;
  text-align: justify;
}
@media (max-width: 600px) {
  .sw-card { flex-direction: column; }
  .sw-icon { width: 48px; height: 48px; font-size: 1.2rem; }
}
</style>

<p class="sw-intro">
These are scientific software tools where I had the leading development role or co-developed with colleagues. They are designed for methodological innovation in learning analytics, transition network analysis, and AI-powered education &mdash; spanning R packages on CRAN, Python libraries, JavaScript modules, desktop applications, and full learning management systems.
</p>

<h2 class="sw-section-title">Transition Network Analysis &amp; Complex Dynamic Systems</h2>

<div class="sw-grid">

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #2166AC, #67A9CF);">tna</div>
    <div class="sw-body">
      <h3><a href="https://github.com/sonsoleslp/tna" target="_blank">tna &mdash; Transition Network Analysis for R</a></h3>
      <p>
        A rigorous framework for analyzing the dynamics of behavioral processes in learning and beyond. TNA offers a vast array of tools &mdash; from building and visualizing transition networks to computing nine centrality measures, detecting communities and cliques, discovering sequential patterns, and clustering learners by their process signatures. What sets it apart is its emphasis on statistical rigor at every level: bootstrapped significance testing verifies which edges and centralities are reliable, permutation tests assess whether group differences are genuine, and model comparison functions quantify structural similarity across conditions, time points, or populations. Published on CRAN and used across dozens of studies in learning analytics and education research.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">R</span>
        <span class="sw-badge sw-cran"><a href="https://cran.r-project.org/package=tna" target="_blank" style="color:white;text-decoration:none;">CRAN</a></span>
        &middot; M. Saqr, S. L&oacute;pez-Pernas &amp; S. Tikka
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #306998, #FFD43B); color: #306998; font-size: 1.3rem;">tnapy</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/tnapy" target="_blank">tnapy &mdash; Transition Network Analysis for Python</a></h3>
      <p>
        A full Python port of the TNA framework with exact numerical equivalence to the R package. Supports eight model types (relative, frequency, co-occurrence, reverse, n-gram, gap, window, and attention), nine centrality measures, bootstrap resampling, permutation tests, and over ten visualization functions including network plots, heatmaps, and centrality charts. Designed for researchers who work in the Python data science ecosystem.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">Python</span>
        <span class="sw-badge sw-plat">pip</span>
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #3178C6, #68DCFC); font-size: 1.2rem;">tnaj</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/tna-js" target="_blank">tnaj &mdash; Transition Network Analysis for JavaScript</a></h3>
      <p>
        A zero-dependency, pure TypeScript implementation of TNA that runs in Node.js, Deno, Bun, and the browser. Ported from the R and Python packages with numerical equivalence validated to machine epsilon (~1e-15). Covers the full API: model building, centrality analysis, pruning, community detection, clique discovery, sequence clustering, group models, and data preparation. Powers the <a href="https://saqr.me/tna-js/" target="_blank">live browser demo</a>.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">TypeScript</span>
        <span class="sw-badge sw-plat">npm</span>
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #7B68AD, #B39DDB);">J</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/JTNA1.2" target="_blank">JTNA &mdash; TNA for Jamovi</a></h3>
      <p>
        A comprehensive Jamovi module that brings the full power of transition network analysis to a point-and-click interface &mdash; no coding required. Includes three analysis modules: individual TNA with network plots and bootstrap, group TNA with pairwise permutation tests and network difference plots, and cluster TNA that automatically groups sequences and builds separate models per cluster. Supports relative, frequency, co-occurrence, and attention model types, seven community detection algorithms, and centrality stability analysis.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">R</span>
        <span class="sw-badge sw-plat">Jamovi</span>
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #E07A5F, #F4A582);">D</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/Dynalytics" target="_blank">Dynalytics &mdash; TNA Shiny Application</a></h3>
      <p>
        A comprehensive Shiny web application for interactive transition network analysis. Offers dedicated modules for individual TNA, group comparison, cluster analysis, co-occurrence networks, one-hot encoding, and social network analysis. Each module provides network visualization, centrality analysis, seven community detection algorithms, clique analysis, bootstrap and permutation testing, pattern discovery, and sequence analysis &mdash; all through an accessible browser interface.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">R</span>
        <span class="sw-badge sw-plat">Shiny</span>
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #E07A5F, #FFAB91); font-size: 1rem;">cdy</div>
    <div class="sw-body">
      <h3><a href="https://github.com/santikka/codyna" target="_blank">codyna &mdash; Complex Dynamic Systems in R</a></h3>
      <p>
        An R package for the analysis of complex dynamic systems with a focus on the temporal unfolding of patterns, changes, and state transitions in behavioral data. Supports both time-series and sequence data, providing tools for analyzing and visualizing complexity, identifying patterns, detecting trends and regime shifts, classifying sequence typologies, and computing early warning signals. Published on <a href="https://cran.r-project.org/package=codyna" target="_blank">CRAN</a>.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">R</span>
        <span class="sw-badge sw-cran"><a href="https://cran.r-project.org/package=codyna" target="_blank" style="color:white;text-decoration:none;">CRAN</a></span>
        &middot; M. Saqr, S. L&oacute;pez-Pernas &amp; S. Tikka
      </div>
    </div>
  </div>

</div>

<h2 class="sw-section-title">Network Visualization</h2>

<div class="sw-grid">

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #3D8B37, #81C784);">co</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/cograph" target="_blank">cograph &mdash; Modern Network Visualization for R</a></h3>
      <p>
        An R package for producing publication-quality network visualizations with first-class support for TNA models. The main function <code>splot()</code> works directly on <code>tna</code> model objects or raw matrices, offering multiple layout algorithms (oval, circle, Kamada-Kawai, Fruchterman-Reingold), rich node styling with five shape options, configurable edge curvature and arrow sizing, and a clean API that reduces a typical network plot to a single function call.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">R</span>
        <span class="sw-badge sw-cran">CRAN</span>
      </div>
    </div>
  </div>

</div>

<h2 class="sw-section-title">AI-Powered Education</h2>

<div class="sw-grid">

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #C05746, #EF9A9A); font-size: 1.1rem;">L</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/LAILA-v3" target="_blank">LAILA &mdash; AI-Powered Learning Management System</a></h3>
      <p>
        A full-featured learning management system built around multi-agent AI tutoring. Ships with seven built-in pedagogical agents (Socratic Guide, Project Coach, Study Buddy, and more), four routing modes including collaborative multi-agent orchestration, and a Student Agent Builder with ten role templates and 38 prompt building blocks. Integrates browser-based R execution via WebR for interactive labs, xAPI-inspired learning analytics with emotional pulse tracking, AI-generated assessments, and multi-provider LLM support (OpenAI, Anthropic, Gemini, Ollama, and others). Built with React, TypeScript, and PostgreSQL.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">TypeScript</span>
        <span class="sw-badge sw-plat">React</span>
        <span class="sw-badge sw-plat">PostgreSQL</span>
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #4A6FA5, #90CAF9); font-size: 1.1rem;">R</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/rohySimulator" target="_blank">Rohy &mdash; Virtual Patient Simulation System</a></h3>
      <p>
        A comprehensive medical simulation platform for clinical education. Features AI-powered patient interaction (OpenAI, LM Studio, Ollama), a real-time patient monitor with ECG waveform generation and alarm systems, a laboratory investigation module covering 77 tests with gender-specific reference ranges, and timeline-based clinical scenarios (STEMI, Sepsis, Respiratory Failure). Includes instructor tools for real-time editing, session recording, and analytics with multi-user role-based access.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">JavaScript</span>
        <span class="sw-badge sw-plat">Web</span>
      </div>
    </div>
  </div>

  <div class="sw-card">
    <div class="sw-icon" style="background: linear-gradient(135deg, #7B68AD, #CE93D8); font-size: 1.1rem;">H</div>
    <div class="sw-body">
      <h3><a href="https://github.com/mohsaqr/handai" target="_blank">Handai &mdash; AI-Powered Data Transformer</a></h3>
      <p>
        A versatile tool for AI-driven data transformation, synthetic data generation, and qualitative analysis. Supports document processing (PDF, Word), multi-step AI pipelines, qualitative coding with inter-rater reliability via a Consensus Coder mode (multiple models + Cohen&rsquo;s Kappa), codebook generation, and model comparison. Works with OpenAI, Anthropic, Gemini, Groq, Ollama, LM Studio, and any OpenAI-compatible API. Available as both a Streamlit web app and a Flet desktop application.
      </p>
      <div class="sw-meta">
        <span class="sw-badge sw-lang">Python</span>
        <span class="sw-badge sw-plat">Streamlit</span>
        <span class="sw-badge sw-plat">Flet</span>
      </div>
    </div>
  </div>

</div>
