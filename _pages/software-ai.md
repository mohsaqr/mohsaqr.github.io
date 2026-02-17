---
layout: page
permalink: /works/ai-software/
title: "AI Software"
description: AI-powered tools for education, clinical simulation, and data science.
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
AI-powered tools designed for education, clinical training, and research data science. These platforms integrate large language models with domain-specific workflows to support teaching, learning, medical simulation, and qualitative analysis.
</p>

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
