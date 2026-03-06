---
layout: post
title: "Rohy: A Virtual Patient Simulator for Medical Education"
date: 2026-03-06 12:00:00
description: An open-source medical simulation platform with realistic patient monitoring, AI-driven patient conversations, 695 laboratory tests, and scenario-based clinical deterioration.
tags: medical-education simulation AI virtual-patient
categories: software
thumbnail: assets/img/rohy/chat-opioid.png
---

Rohy is an open-source virtual patient simulator where the patient evolves in real time, worsens if left untreated, and responds to both the student's actions and inactions. The scenario engine models clinical deterioration along physiologically coherent trajectories --- vital signs co-vary the way they do in real patients, and untreated conditions progress along established emergency medicine pathways. The platform combines a real-time patient monitor, AI-powered multi-role conversations, 695 laboratory tests, physical examination with playable sounds, radiology, treatments, configurable alarm systems, evolving scenarios, and a process-oriented learning analytics dashboard that captures the full sequence of clinical reasoning as it unfolds. Rohy is developed within the [CRETIC project](https://uefconnect.uef.fi/en/cretic-optimizing-clinical-reasoning-in-time-critical-scenarios-a-data-driven-multimodal-approach/), led by [Sonsoles López-Pernas](https://sonsoles.me) and funded by the Research Council of Finland.

<figure>
  <img src="/assets/img/rohy/chat-opioid.png" alt="Opioid overdose case with AI patient conversation and real-time monitor" style="width:100%; border-radius:6px;">
  <figcaption>An opioid overdose case: the AI patient responds with confusion and fragmented speech while the monitor shows bradycardia, desaturation, and hypotension.</figcaption>
</figure>

## AI-Powered Multi-Role Conversations

AI drives multiple characters within a single case, each with its own persona, knowledge boundaries, and communication style. The patient responds grounded in their history, symptoms, and emotional state --- and adapts as their condition changes. An AI nurse provides handover and relays observations. An AI expert offers calibrated guidance without giving away the diagnosis. An AI family member provides collateral history and complicates the interaction the way real families do at the bedside. Supports OpenAI, LM Studio, and Ollama.

## Real-Time Patient Monitor

Heart rate, blood pressure, SpO2, respiratory rate, temperature, and EtCO2 update continuously. The ECG is generated in real time with clinically accurate waveforms: normal sinus rhythm, atrial fibrillation, ventricular tachycardia, STEMI with configurable ST elevation, NSTEMI with ST depression, bradycardia, hyperkalemia, and more. ST segment deviations follow realistic scaling (0 mm isoelectric, 1 mm early ischemia, 2+ mm acute MI). Instructors can switch patterns mid-simulation. Monitor settings persist between sessions and can be exported and imported as JSON.

## Configurable Alarm System

Thresholds are configurable per vital sign with high and low limits. When a value crosses a threshold, the display flashes red and an audio alarm sounds through the browser. Students can acknowledge individual alarms or mute all audio --- opening the door to teaching about alarm fatigue. Every alarm trigger, acknowledgment, and silence is logged with a timestamp. Default thresholds are clinically realistic (HR 50--120, SpO2 < 90, BP systolic 90--180, temperature 36--38.5) and fully adjustable.

## Physical Examination

An interactive body map (anterior and posterior views) lets students click on regions --- chest, abdomen, extremities, head, back --- and choose examination techniques: inspection, palpation, percussion, or auscultation. Each region returns case-specific findings configured by the instructor. Auscultation produces playable audio at multiple anatomical points (aortic, pulmonic, Erb's point, tricuspid, mitral apex, lung fields). Findings change as the patient's condition evolves during the scenario.

## 695 Laboratory Tests

<figure>
  <img src="/assets/img/rohy/lab-stroke.png" alt="Acute stroke case with laboratory ordering panel and results" style="width:100%; border-radius:6px;">
  <figcaption>An acute left MCA stroke case within the tPA window: 17 lab tests ordered with results ready for review, quick-order buttons for common panels, and the monitor showing atrial fibrillation with hypertension.</figcaption>
</figure>

A database of 695 real-world tests with gender-specific normal ranges, spanning endocrinology, hematology, chemistry, cardiac markers, immunology, toxicology, and more. Students search by name or browse by category, order tests, and wait for results --- each test has a configurable turnaround time. Quick-order buttons for common panels (CBC, BMP, CMP, LFTs, coags, cardiac, lipids, TFTs). Results display in a professional report format with flags for abnormal and critical values. Instructors can edit values in real time during a simulation to represent disease progression or treatment response.

## Radiology

Chest X-rays, abdominal films, and other imaging studies with configurable turnaround times. Results include the image, structured findings, and a radiologist interpretation. Studies are ordered, waited for, and reviewed --- the same workflow as in a real clinical setting.

## Treatments and Interventions

Four categories of orders: medications, IV fluids, oxygen delivery, and nursing interventions. Each has its own searchable interface. Every order is logged and timestamped. When combined with the scenario system and instructor override, treatments close the loop --- the instructor adjusts vitals in response to appropriate interventions, reinforcing the connection between decision and outcome.

## Evolving Scenarios

The scenario engine defines timelines of vital sign changes that unfold over the course of a simulation. If untreated, the patient deteriorates along the pathophysiological trajectory of the disease: airway compromise leads to desaturation, untreated sepsis progresses to shock, an unrecognized STEMI evolves into cardiogenic arrest. Vital sign parameters co-vary coherently and machine learning algorithms model the nonlinear transitions seen in actual deterioration. Six pre-built scenarios: STEMI progression (40 min), septic shock (40 min), respiratory failure (30 min), hypertensive crisis (45 min), anaphylactic shock (10 min), and post-resuscitation recovery (30 min). Instructors can create custom scenarios, store them in a shared repository (public or private), and attach them to any case. Full instructor override at all times.

## Process-Oriented Learning Analytics

Every action is timestamped: vital sign changes, alarm responses, lab orders, treatment decisions, AI conversations, physical examination steps, ECG changes, scenario transitions. The analytics dashboard reconstructs the full sequence of clinical reasoning --- not just whether the student reached the right diagnosis, but how they got there, how long each step took, and where their reasoning stalled. Events can be filtered by category, searched, and exported to CSV for debriefing and research.

## Case Management

A built-in case wizard walks instructors through creating a case: patient demographics, clinical presentation, AI patient personality, scenario selection from the shared repository, laboratory test configuration, physical examination findings, and radiology. Cases can be exported and imported as JSON files, making it straightforward to share case libraries across institutions. The system ships with demo cases for immediate testing.

## Open Source

Free under the MIT license. Built with React, Node.js, Express, and SQLite. Nothing to install beyond Node.js. Clone, `npm install`, start, and open a browser.

Rohy is primarily conceptualized and developed by Mohammed Saqr, Professor of Computer Science at the University of Eastern Finland, and co-developed by [Sonsoles López-Pernas](https://sonsoles.me), Academy Fellow at the University of Eastern Finland.

[GitHub](https://github.com/mohsaqr/rohySimulator)
