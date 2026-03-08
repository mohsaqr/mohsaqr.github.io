---
layout: post
title: "Human–AI Interaction: A Transition Network Analysis with cograph"
date: 2026-03-08 10:00:00
description: Sequential analysis of 13,002 turns across 429 sessions of human–AI coding collaboration, using TNA and cograph to map the transition structure of the dialogue.
tags: tna cograph human-ai-interaction networks
categories: research
thumbnail: assets/img/human-ai-tna/unnamed-chunk-1-1.png
---

Most evaluations of AI coding assistants — Copilot, Cursor, Claude Code — measure productivity: lines generated, bugs caught, time saved. The sequential patterns of the conversation itself rarely get examined: the repair cycles, the steering moves, the moments where the developer corrects, interrupts, or argues. This post does that.

I applied Transition Network Analysis (TNA) to 13,002 interleaved turns of my own interactions with an AI coding assistant — 6,175 from me, 6,827 from the AI — across 429 sessions, 34 projects, and 32 days of software engineering work: statistical libraries, desktop applications, visualization tools, R packages, web platforms. Both sides of every conversation are coded, giving a complete sequential record of the exchange.

TNA is a method I developed for modelling sequential patterns in process data (Saqr et al., 2025a; Saqr et al., 2025b). The analysis uses two R packages: [`tna`](https://cran.r-project.org/package=tna) ([sonsoles.me/tna](https://sonsoles.me/tna/)) for Markov chain estimation, bootstrap inference, and centrality computation; and [`cograph`](https://cran.r-project.org/package=cograph) for network visualization, including the Multi-Cluster Multi-Level (MCML) network plots shown below — which cluster fine-grained codes into higher-order groups and display transitions at both levels simultaneously.

## The taxonomy

I built a three-level hierarchical coding scheme. Human messages were coded automatically by an LLM reading the full conversation text. AI responses were coded heuristically from the JSONL transcript structure — tool-use blocks identify action types; text patterns identify communicative function. Multi-coding was permitted. After expansion: **19,347 coded events**.

**Human** — 15 fine codes, 9 categories, 3 super-categories:

| Super-category | Categories | Fine codes |
|---|---|---|
| Directive (49%) | Command, Request, Specify | Command, Direct, Request, Specification, Context |
| Evaluative (30%) | Refine, Correct, Verify, Frustrate | Refinement, Correction, Reject, Verification, Frustration, Arguing |
| Metacognitive (21%) | Inquire, Interrupt | Ask, Thinking, Interrupt, Accept |

**AI** — 18 fine codes, 8 categories, 3 super-categories:

| Super-category | Categories | Fine codes |
|---|---|---|
| Action (68%) | Execute, Investigate, Delegate | Execute, Comply, Retry, Investigate, Diagnose, Delegate |
| Repair (23%) | Plan, Repair | Plan, Scaffold, Suggest, Apologize, Hedge, Warn, Refuse, Escape |
| Communication (9%) | Explain, Report, Ask | Explain, Report, Acknowledge, Ask |

Less than half of what I did was directive. Thirty percent was evaluation: refining, correcting, verifying, arguing, expressing frustration. Twenty-one percent was metacognitive: asking questions, thinking out loud, interrupting. More time went to assessing and steering than ordering.

On the AI side, nearly a quarter of its behaviour is repair — planning, suggesting, apologizing, hedging, warning. It plans extensively (18.7%) and investigates heavily (26.5%). Ask and Report barely register.

I rejected proposals 2.6% of the time, argued 2.7%, interrupted mid-generation 7.9%, and expressed frustration 6.0%.

## Multi-Cluster Multi-Level networks

MCML plots cluster fine codes into super-categories and render transitions at both levels: summary edges between clusters show the macro flow; internal edges show micro-dynamics within each cluster.

<figure>
  <img src="/assets/img/human-ai-tna/unnamed-chunk-1-1.png" alt="Human MCML network">
  <figcaption>Human MCML — Fine codes clustered into Directive, Evaluative, and Metacognitive.</figcaption>
</figure>

The evaluative cluster is internally dense. Refinement, Correction, Frustration, and Verification form tight loops before returning to Directive. Within Metacognitive, Interrupt flows directly to Command — halting the AI is immediately followed by redirection. Within Directive, Specification → Command dominates.

<figure>
  <img src="/assets/img/human-ai-tna/unnamed-chunk-2-1.png" alt="AI MCML network">
  <figcaption>AI MCML — Fine codes clustered into Action, Repair, and Communication.</figcaption>
</figure>

The AI network is dominated by Execute ↔ Investigate — alternating between writing and reading code. Plan feeds Execute. After acknowledging an error, the AI retries rather than asking for guidance. Communication sits at the periphery.

## Category frequencies

<figure>
  <img src="/assets/img/human-ai-tna/unnamed-chunk-3-1.png" alt="Category frequencies for human and AI">
  <figcaption>Category frequencies for human (left) and AI (right), ordered by proportion.</figcaption>
</figure>

Specify and Command lead on the human side — but Frustrate outranks Verify. Dissatisfaction was expressed more often than results were checked. Execute and Investigate dominate the AI distribution; Ask and Report are negligible.

## Bootstrap transition networks

Bootstrap filtering retains only transitions that appear consistently across resamples. The figures below show filtered networks rendered with `cograph::splot()`.

<figure>
  <img src="/assets/img/human-ai-tna/unnamed-chunk-4-1.png" alt="Human bootstrap TNA">
  <figcaption>Human bootstrap TNA (consistency range 0.75–1.5), visualized with <code>cograph::splot()</code>.</figcaption>
</figure>

<figure>
  <img src="/assets/img/human-ai-tna/unnamed-chunk-5-1.png" alt="AI bootstrap TNA">
  <figcaption>AI bootstrap TNA (consistency range 0.75–1.5), visualized with <code>cograph::splot()</code>.</figcaption>
</figure>

The Refine ↔ Specify loop is iterative tuning — each adjustment requires new parameters, which trigger further adjustments. Verify feeds into Refine and Correct; checking output almost always triggers more work. Inquire leads to Specify. Interrupt flows to Command.

The AI network is sparser. Execute ↔ Investigate ↔ Plan is the core triangle. After errors, the AI retries (Repair → Execute) rather than asking. Explanation is brief — Explain → Execute. Ask barely appears.

## What the data shows

Directive turns account for less than half the human side. The rest is evaluation, argument, correction, and metacognitive steering. The AI spends a quarter of its turns in repair — planning, hedging, apologizing, retrying. Verification triggered more work. Frustration triggered redirection. Interruption triggered new commands. Direction–evaluation–correction, repeated thousands of times across the corpus.

## Codebook

### Human — 15 fine codes

| Code | Description | Examples |
|---|---|---|
| Command | Direct action instruction | *"commit this"*, *"push it"* |
| Direct | Structured directive with plan | *"Implement the following plan:"* |
| Request | Asking for something new | *"add legends"*, *"write a report"* |
| Specification | Precise parameters | *"port 8000"*, *"tolerance 1e-12"* |
| Context | Pasting errors, logs | *[stack trace]*, *[error output]* |
| Refinement | Iterative adjustment | *"less"*, *"also add counts"* |
| Correction | Fixing misunderstanding | *"No I mean the full demo"* |
| Reject | Refusing AI proposal | *[escape from plan]* |
| Verification | Checking output | *"show me"*, *"open it"* |
| Frustration | Dissatisfaction | *"ugly and crowded"*, *"pathetic"* |
| Arguing | Pushing back | *"You only tried with 100?"* |
| Ask | Posing a question | *"Have we implemented graphicalvar?"* |
| Thinking | Brainstorming | *"what do you think?"* |
| Interrupt | Escape key, redirect | *[Ctrl+C]* |
| Accept | Accepting proposal | *"yes, do it"* |

### AI — 18 fine codes

| Code | Description |
|---|---|
| Execute | Writing code, running commands |
| Comply | Carrying out without elaboration |
| Retry | Re-attempting after failure |
| Investigate | Reading files, searching code |
| Diagnose | Analyzing errors, debugging |
| Delegate | Spawning sub-agents |
| Plan | Proposing strategies |
| Scaffold | Breaking into sub-steps |
| Suggest | Offering alternatives |
| Apologize | Acknowledging errors |
| Hedge | Expressing uncertainty |
| Warn | Flagging risks |
| Refuse | Declining a request |
| Escape | Safety refusal |
| Explain | Describing what was done |
| Report | Presenting results |
| Acknowledge | Confirming receipt |
| Ask | Requesting clarification |

---

### References

Saqr, M., López-Pernas, S., Helske, S., Murphy, K., Tikka, S., & Scrucca, L. (2025a). Sequence analysis in education: Principles, technique, and tutorial with R. In M. Saqr & S. López-Pernas (Eds.), *Advanced methods in learning analytics* (pp. 1–28). Springer.

Saqr, M., López-Pernas, S., Törmänen, T., Kaliisa, R., Misiejuk, K., & Tikka, S. (2025b). Transition Network Analysis: A novel framework for modeling, visualizing, and identifying the temporal patterns of learners and learning processes. *Proceedings of the 15th International Learning Analytics and Knowledge Conference (LAK '25)*. <https://doi.org/10.48550/arXiv.2411.15486>

Tikka, S., López-Pernas, S., & Saqr, M. (2025). tna: An R package for Transition Network Analysis. *Applied Psychological Measurement*. <https://doi.org/10.1177/01466216251348840>

Saqr, M. (2025). *cograph: Complex Network Analysis and Visualization*. R package. <https://cran.r-project.org/package=cograph>

---

*13,002 turns · 429 sessions · 34 projects · 32 days · Feb 5 – Mar 8, 2026*
*Analysis: [`tna`](https://cran.r-project.org/package=tna), [`cograph`](https://cran.r-project.org/package=cograph), `codyna` R packages*
