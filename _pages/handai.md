---
layout: page
permalink: /handai/
title: "Handai: AI Collaborator and Automation Software for Data Processing, Synthesis, and Qualitative Analysis"
description: A free, open-source suite of ten integrated tools for qualitative coding, data transformation, systematic review screening, and AI-powered research workflows.
nav: false
---

<figure>
  <img src="/assets/img/handai/ai-coder.png" alt="Handai AI Coder interface with qualitative coding workspace" style="width:100%; border-radius:6px;">
  <figcaption>The AI Coder: row-by-row qualitative coding with AI-suggested codes, confidence scores, and color-coded labels. The sidebar shows all ten tools across Data Processing, Qualitative Analysis, and System sections.</figcaption>
</figure>

Qualitative research involves careful, sustained attention to text. Coding interview transcripts, screening abstracts for systematic reviews, extracting structured information from documents, classifying survey responses --- this work demands expertise and judgment. It also demands time, often far more than the analysis itself.

Handai --- a ***handy*** AI --- is a free, open-source suite of ten integrated tools designed to support researchers, educators, and analysts in exactly this kind of work. It runs entirely in your browser. There is nothing to install, no programming required, and no data leaves your machine unless you choose a cloud-based provider. Every tool follows the same interaction pattern: upload your data, configure your task, preview a small sample, then process the full dataset.

The suite is organized into three sections: Data Processing, Qualitative Analysis, and System. Each tool is self-contained but shares a consistent interface. You bring your data and your research questions. Handai applies your instructions at scale.

Ten providers are supported, including OpenAI, Anthropic, Google Gemini, Groq, Together AI, Azure OpenAI, and OpenRouter. For complete data privacy, you can also run models locally on your own hardware through Ollama or LM Studio. Switching between providers is a single click in Settings. Every tool includes built-in sample datasets drawn from realistic research domains --- healthcare worker interviews, product reviews, customer support tickets, employee exit interviews, student learning surveys, and stakeholder feedback --- so you can explore any feature immediately without preparing your own files first.

## The Ten Tools

**Transform Data** applies a single instruction to every row of a spreadsheet. Upload a CSV or Excel file, describe what you need --- classify sentiment, extract topics, rate urgency, summarize, detect language --- and a new column appears with the results. Seven ready-made templates cover common use cases. A re-transform button feeds results back as new input for chaining multiple rounds. Row-level filtering lets you select specific rows by checkbox or apply column-based conditions so only the subset you care about gets processed.

**General Automator** extends this into multi-step workflows. Each step in a pipeline reads from the original data or from a previous step's output, applies its own instructions, and writes new fields. A three-step pipeline might extract named entities, classify their roles, and generate a per-row summary --- all in one run. Pipelines are defined once and reused.

**Generate Data** creates realistic synthetic datasets on demand. Choose from six domain-specific templates --- customer reviews, job postings, survey responses, support tickets, research interviews, student feedback --- or describe your own schema. Set the number of rows and the desired degree of variation. The result downloads as a CSV ready for coursework, pilot testing, or demonstrations.

**Process Documents** converts unstructured files into structured spreadsheets. Drag and drop PDFs, Word documents, or text files. Define the fields you want extracted, or select from five templates covering key points, meeting minutes, research summaries, invoices, and contracts. Fifty research papers become a single spreadsheet of methods, findings, and conclusions. File encoding is handled automatically, including UTF-8, Windows-1252, and byte-order mark detection.

**Qualitative Coder** is designed for thematic analysis at scale. Upload your text data, define a codebook with codes, descriptions, and examples, and process the entire dataset. Each row receives one or more codes according to your codebook. Six sample codebooks are included, covering product reviews (Positive, Negative, Quality Issue, Value for Money, and others), healthcare interviews (Burnout, Resilience, Team Support, Resource Shortage), support tickets (Bug Report, Feature Request, Billing Issue), learning experiences, exit interviews, and mixed stakeholder feedback. The codebook editor supports inline editing, CSV import and export, and an inject toggle that appends your codes directly into the processing instructions.

**Consensus Coder** addresses inter-rater reliability. Each data row is sent to two or three independent models working from the same instructions. A separate judge reviews the independent outputs and synthesizes a final answer. The tool calculates Cohen's Kappa --- the standard measure of agreement between independent raters, accounting for chance --- and displays it alongside the results. This provides a reportable reliability coefficient directly, without manual calculation. Each worker can use a different provider, enabling cross-provider reliability assessment.

**AI Coder** provides an interactive, row-by-row coding workspace. You navigate through your data one entry at a time. For each row, the system suggests codes with confidence scores. Nothing is applied automatically --- you accept individual suggestions, click "Accept All" to approve the full set, or click "Dismiss" to clear them. Color-coded highlights indicate applied codes. Keyboard shortcuts allow rapid navigation. Sessions persist automatically across browser closures, and named sessions support multiple concurrent projects.

**Codebook Generator** automates the early stages of qualitative research through three stages: Discovery identifies themes and patterns across your data; Consolidation merges overlapping themes into coherent categories; Definition produces a formal entry for each code with inclusion criteria, exclusion criteria, and illustrative examples. The resulting codebook can be downloaded, edited, and used directly in the Qualitative Coder or included in a methods appendix.

**Abstract Screener** supports systematic review workflows. Upload your references with title, abstract, keywords, and journal fields. Define your inclusion and exclusion criteria. The system pre-screens every abstract, producing a decision (include or exclude), a confidence estimate, and a written rationale. You then review the recommendations one by one in a reading interface with word highlighting for key terms. Override any decision you disagree with. Export the full decision log --- with original data, recommendations, confidence scores, rationale, and your final decisions --- in a format suitable for PRISMA documentation.

**Model Comparison** runs identical instructions across multiple providers simultaneously and presents the results side by side. Each provider's output occupies its own column, making differences immediately visible. This is useful for methods research examining consistency, for selecting the most suitable provider for a task, or for confirming that findings are robust.

All past processing is recorded automatically in **Historical Runs** --- a searchable, filterable log of every batch, including the tool used, the provider, the configuration, processing time, row-level outcomes, and complete output. You can drill into individual rows, re-export any run, and maintain a continuous audit trail.

## Design Principles

Every tool offers three run modes --- Preview (3 rows), Test (10 rows), and Full --- so you never process a large dataset without first confirming the output on a small sample. You define the codes, the screening criteria, the extraction schema, the transformation logic; Handai applies your definitions consistently at scale.

Outputs are formatted for research use. Cohen's Kappa from the Consensus Coder, structured codebooks from the Codebook Generator, and decision logs from the Abstract Screener go directly into methods sections, appendices, and PRISMA flow diagrams without reformatting. Every results table supports global search, per-column filtering, sorting, and export in CSV, TSV, or JSON.

Session persistence in the AI Coder and Abstract Screener means you can close the browser mid-analysis and resume exactly where you stopped. Historical Runs maintains a full record of every batch for transparency and reproducibility.

## For Educators

Generate Data creates realistic datasets for classroom exercises in seconds. Model Comparison enables live demonstrations of how different systems interpret identical data --- a concrete way to teach reliability, validity, and methodological rigor. The Qualitative Coder with its sample datasets and pre-built codebooks provides a complete environment for introducing thematic analysis. The six built-in datasets cover healthcare, product reviews, customer support, education, employment, and civic engagement --- domains students recognize.

## Privacy

Handai runs in your browser. There is no central server collecting your data, configurations, or results. When you use a cloud provider, data travels directly from your browser to that provider. When you use a local provider, nothing leaves your machine. All settings and sessions are stored locally. The application is open source and available for inspection, modification, and self-hosting.

## Getting Started

Open Handai in your browser. Add a provider in Settings, or connect a local one. Choose any tool, click a sample dataset, click Preview. Your first result appears in under a minute.

Handai is developed by Mohammed Saqr, Professor of Computer Science at the University of Eastern Finland.

[GitHub](https://github.com/mohsaqr/handai)
