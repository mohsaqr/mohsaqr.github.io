---
layout: post
title: "Rohy: A Virtual Patient Simulator for Medical Education"
date: 2026-03-06 12:00:00
description: An open-source medical simulation platform with realistic patient monitoring, AI-driven patient conversations, 695 laboratory tests, and scenario-based clinical deterioration.
tags: medical-education simulation AI virtual-patient
categories: software
thumbnail: assets/img/rohy/ai-chat.png
---

As a medical doctor and consultant neurologist who turned to computer science, I have spent years at the intersection of two fields that rarely speak the same language. Simulation could have bridged that gap, but the tools available were either prohibitively expensive or too simplistic to capture what actually matters: the pressure of time, the ambiguity of incomplete data, and the emotional weight of making decisions that carry consequences. Rohy is the result of that long-standing ambition: a simulator built by someone who has stood on both sides of the problem, who knows what it feels like to auscultate a chest at three in the morning and also knows how to write the code that generates the sounds.

## Rohy

Clinical reasoning in emergencies is a process that unfolds under time pressure, with incomplete information, while the patient's condition changes. A clinician facing a deteriorating patient must gather data, form hypotheses, order investigations, and act --- all within minutes, all while managing their own stress and the demands of the people around them. Yet most virtual patient platforms treat clinical reasoning as if time does not matter. They present stable patients, allow unlimited deliberation, and follow linear branching paths where the student clicks through options at their own pace. In an actual emergency, the patient does not wait.

Virtual patients have proven their value across medical, dental, and nursing education --- multiple reviews and meta-analyses confirm their effectiveness for building knowledge and clinical reasoning skills. But the current implementations are predominantly self-paced and static. They do not simulate the urgency that defines emergency medicine: the narrowing window for intervention, the vital signs that shift while you are still thinking, the moment when a compensating patient tips into decompensation. We lack both the high-fidelity simulation tools needed for emergency training and the evidence base for understanding how clinical decision-making develops in these time-critical situations.

Rohy combines the diagnostic depth of virtual patients with the time pressure of educational escape rooms into a single platform. The patient can be diagnosed and treated, but only if the student works fast enough and in the right order. It is an open-source simulator where the patient evolves in real time, deteriorates if untreated, and responds to both the student's actions and inactions. The platform brings together realistic patient monitoring, AI-powered interactions across multiple roles, a comprehensive laboratory and investigation system, and scenario-based clinical progression --- all designed to capture the temporal, dynamic nature of clinical reasoning as it actually happens at the bedside. The entire system is free, self-hosted, and designed so that a single instructor can set up a case in minutes and run it with a class of students.

Rohy is developed within the [CRETIC project](https://uefconnect.uef.fi/en/cretic-optimizing-clinical-reasoning-in-time-critical-scenarios-a-data-driven-multimodal-approach/) (Optimizing Clinical Reasoning in Time-Critical Scenarios), led by [Sonsoles López-Pernas](https://sonsoles.me) and funded by the Research Council of Finland. The project aims to optimize clinical reasoning and decision-making in time-critical scenarios through multimodal learning analytics and gamified virtual patients. Rohy is the simulation platform at the heart of that effort.

The name Rohy comes from the Egyptian Arabic word for soul or spirit. A patient simulator without personality is just a dashboard of numbers. The ambition behind Rohy is to give the simulated patient something closer to presence --- a coherent history, emotional responses to questions, and behavior that changes as the clinical situation evolves.

<figure>
  <img src="/assets/img/rohy/ai-chat.png" alt="Rohy AI patient conversation alongside the patient monitor" style="width:100%; border-radius:6px;">
  <figcaption>A student interviews Jennifer Walsh about her symptoms while the monitor displays real-time vitals and ECG. The AI patient responds in character, grounded in the clinical scenario.</figcaption>
</figure>

## AI at the Center

The most distinctive aspect of Rohy is how deeply AI is woven into the simulation. This is not a monitor with a chatbot attached. AI drives multiple roles within the same case, each with its own persona, knowledge, and communication style.

The patient is the primary AI character. Connected to a large language model --- OpenAI, a local LM Studio instance, or Ollama --- the patient knows their history, symptoms, medications, and emotional state. Ask about chest pain and you get a description consistent with the case. Ask about allergies and the answer matches what the instructor configured. If the patient is deteriorating, the responses reflect increasing distress --- shorter sentences, confusion, expressions of fear. If treatment has been administered, the patient may report improvement. The conversation adapts to the evolving clinical situation in real time.

But the patient is not the only AI character in the room. Rohy supports multiple AI roles within a single simulation. An AI nurse can provide handover information, relay observations, and answer questions about what happened before the student arrived. An AI expert --- a consultant or senior physician --- can be called for advice, offering guidance calibrated to the student's level without giving away the diagnosis. An AI family member can be present, asking anxious questions, providing collateral history, or complicating the interaction the way real families do at the bedside. Each role has a distinct prompt, personality, and knowledge boundary. The nurse knows the chart but not the diagnosis. The family member knows the patient's daily life but not the medical details. The expert knows everything but only shares what is clinically appropriate.

This matters because clinical practice is never a one-on-one exchange between a doctor and a disease. It is a web of conversations --- with the patient, the family, the nursing staff, the specialist on the phone. Training students in isolated history-taking misses the complexity of real ward work. By giving AI multiple roles, Rohy lets students practice the full communicative range of clinical care: gathering information from different sources, managing worried relatives, negotiating with colleagues, and synthesizing contradictory accounts into a coherent clinical picture.

## The Patient Monitor

<figure>
  <img src="/assets/img/rohy/monitor-lab.png" alt="Patient monitor with laboratory ordering panel" style="width:100%; border-radius:6px;">
  <figcaption>The patient monitor displays ECG, plethysmography, and respiratory waveforms alongside vital signs. Below, the order entry panel shows laboratory tests available for the current case.</figcaption>
</figure>

The centerpiece of Rohy is a patient monitor that behaves like the real thing. Heart rate, blood pressure, oxygen saturation, respiratory rate, temperature, and end-tidal CO2 update continuously on screen. The ECG is not a static image or a looping animation --- it is generated in real time from configurable waveform parameters, producing clinically accurate tracings for normal sinus rhythm, atrial fibrillation, ventricular tachycardia, STEMI with ST elevation, NSTEMI with ST depression, bradycardia, and several other patterns. ST segment deviations follow realistic scaling: zero for isoelectric baseline, 1 mm for early ischemia, 2 mm or more for acute MI. An instructor can switch the ECG pattern mid-simulation to represent a sudden arrhythmia or a response to treatment.

The alarm system mirrors clinical monitors. Thresholds are configurable per vital sign --- high and low limits for heart rate, blood pressure, oxygen saturation, and the rest. When a value crosses a threshold, the display flashes red and an audio alarm sounds through the browser. Students can acknowledge individual alarms or mute all audio, which opens the door to teaching about alarm fatigue, a genuine clinical safety concern. Every alarm trigger, acknowledgment, and silence is logged with a timestamp.

## Physical Examination

<figure>
  <img src="/assets/img/rohy/physical-exam.png" alt="Physical examination interface with body map and auscultation" style="width:100%; border-radius:6px;">
  <figcaption>The physical examination panel: click on a body region, choose an examination technique (inspection, palpation, percussion, auscultation), and receive findings with playable heart and lung sounds.</figcaption>
</figure>

Rohy includes a physical examination system where students click on body regions --- chest, abdomen, extremities --- and select examination techniques: inspection, palpation, percussion, or auscultation. Each region returns findings configured by the instructor for the specific case. Auscultation points produce playable audio of heart and lung sounds. A patient with pneumonia has crackles in the right lower lobe. A patient in heart failure has an S3 gallop at the apex. The findings are consistent with the clinical scenario and change as the patient's condition evolves.

## Ordering Investigations

<figure>
  <img src="/assets/img/rohy/radiology.png" alt="Radiology ordering interface" style="width:100%; border-radius:6px;">
  <figcaption>The radiology panel: order imaging studies, wait for turnaround time, and view results with interpretation and findings.</figcaption>
</figure>

The laboratory system draws from a database of 695 real-world tests spanning endocrinology, hematology, chemistry, cardiac markers, immunology, toxicology, and more. Each test carries gender-specific normal ranges, units, and sample ranges for generating realistic values. When an instructor designs a case, they search and select which tests to make available, set values for the pathological findings they want students to discover, and leave the rest at normal. A patient presenting with chest pain might have an elevated troponin and abnormal CK-MB, while the CBC and metabolic panel come back unremarkable --- just as they would in real life.

Students order tests the way they would in a clinical setting. They search by name or browse by category, select what they want, and submit the order. Results are not instant. Each test has a configurable turnaround time --- 30 minutes for a basic metabolic panel, 45 for troponin, 60 for a chest X-ray. Countdown timers show when results will be available. This delay is deliberate. In real practice, clinical decisions must often be made before lab results return, and students need to experience that pressure rather than having every answer available on demand.

Radiology works the same way. Chest X-rays, abdominal films, and other imaging studies can be ordered, each with its own turnaround time. Results include the image, a structured findings list, and a radiologist interpretation. Instructors can edit lab values in real time during a running simulation to represent disease progression or treatment response --- a troponin that rises over serial draws, or a lactate that normalizes after fluid resuscitation.

## Treatments and Interventions

<figure>
  <img src="/assets/img/rohy/treatments.png" alt="Treatment ordering interface with medications, IV fluids, oxygen, and nursing orders" style="width:100%; border-radius:6px;">
  <figcaption>The treatment panel: order medications, IV fluids, oxygen therapy, and nursing interventions. Each category has its own searchable interface.</figcaption>
</figure>

Beyond diagnosis, students can act. The treatment panel provides searchable lists of medications, IV fluids, oxygen delivery methods, and nursing interventions. Order albuterol for bronchospasm, amiodarone for a tachyarrhythmia, or atropine for bradycardia. Each order is logged and timestamped. When combined with the scenario system and instructor override, treatments become part of the clinical narrative --- the instructor can adjust vitals in response to appropriate interventions, reinforcing the connection between decision and outcome.

## Scenarios That Evolve

Static cases teach recognition. Dynamic cases teach decision-making under time pressure. This is where Rohy departs most sharply from traditional case-based learning: the patient does not wait for the student to finish thinking. If a condition goes untreated, the patient deteriorates according to the pathophysiological trajectory of the disease, following the same principles that govern real emergency medicine --- airway compromise leads to desaturation, untreated sepsis progresses to shock, an unrecognized STEMI evolves into cardiogenic arrest.

The scenario engine uses algorithmic models grounded in clinical physiology to simulate how vital signs change over time in the absence of intervention. A STEMI case begins with mild chest pain and borderline vitals. At five minutes, ST elevation appears and the heart rate climbs. By ten minutes, blood pressure drops and PVCs emerge. At twenty minutes without treatment, the patient is in cardiogenic shock. These are not arbitrary numbers on a timer --- the trajectories are modeled on established emergency medicine principles and clinical deterioration patterns, with vital sign parameters that co-vary the way they do in real patients. Heart rate rises as blood pressure falls. Oxygen saturation drops as respiratory rate increases. The relationships between parameters are physiologically coherent, not independent.

Machine learning algorithms further refine the simulation by modeling the complex, nonlinear interactions between physiological variables. Rather than relying solely on linear interpolation between keyframes, the system can generate realistic vital sign trajectories that capture the irregular, sometimes abrupt transitions seen in actual clinical deterioration --- the sudden drop in blood pressure that follows a period of compensated shock, the moment when tachycardia gives way to bradycardia as the heart begins to fail. The result is a simulation that feels unpredictable in the way real patients are unpredictable, even when the underlying scenario is scripted.

Six pre-built scenarios ship with the system: STEMI progression, septic shock, respiratory failure, hypertensive crisis, anaphylactic shock, and post-resuscitation recovery. Each follows a clinically validated deterioration pathway. Instructors can create their own, store them in a shared repository, and attach them to any case. Scenarios can auto-start when a case loads or be triggered manually, giving the instructor control over pacing during a teaching session.

The instructor has full override authority at all times. If a student makes the right call and administers the appropriate treatment, the instructor can manually adjust vitals to reflect improvement, turning the scenario into a responsive teaching moment rather than a predetermined script. The combination of algorithmic deterioration and human override creates a simulation that is both realistic in its natural progression and flexible in its pedagogical use.

## Process-Oriented Learning Analytics

Most simulation platforms tell you whether a student got the right answer. Rohy tells you how they got there. Every significant event during a simulation is recorded with a timestamp: vital sign changes, alarm triggers and acknowledgments, scenario step transitions, lab orders, treatment decisions, ECG pattern changes, AI conversations, physical examination actions, and configuration modifications. This is not a simple event log --- it is a process-oriented learning analytics system that captures the entire sequence of clinical reasoning as it unfolds.

The analytics dashboard lets instructors reconstruct a student's decision-making process step by step. When did they first notice the SpO2 dropping? How long after the alarm did they order the chest X-ray? Did they check the ECG before or after ordering troponin? What questions did they ask the patient, and in what order? How much time elapsed between recognizing deterioration and initiating treatment? These process measures reveal far more about clinical competence than outcome measures alone. Two students can arrive at the same diagnosis through radically different reasoning paths --- one systematic and efficient, the other haphazard and delayed --- and the analytics capture that difference.

The event stream can be filtered by category, searched, and exported to CSV for further analysis. For instructors, it turns debriefing sessions from subjective recall into evidence-based discussion. For researchers, it provides granular sequential behavioral data on clinical decision-making --- the kind of data that is nearly impossible to collect in live simulation settings, where an observer can only watch one student at a time and cannot capture the precise timing of every action.

## Running It

Rohy is a web application. The frontend is React with Vite, the backend is Node.js with Express, and the database is SQLite. There is nothing to install beyond Node.js. Clone the repository, run `npm install`, copy the environment file, start the development server, and open a browser. The first user to register becomes the administrator. From there, configure the LLM connection, create a case, and start a simulation. Students connect through their browsers --- no software installation, no plugins, no app store.

The system supports multiple concurrent users with role-based access. Administrators create and manage cases, configure lab values, control scenarios during simulation, and access analytics. Students start sessions, interact with the patient, order tests, and monitor vitals. JWT authentication handles sessions, and batch user creation is available for setting up a class.

## Why Open Source

Commercial medical simulation platforms are expensive and opaque. When an institution buys a proprietary system, it gets a product designed for a general market, not for its specific curriculum. Cases cannot be shared across platforms. The underlying logic is hidden. Customization is limited to what the vendor anticipated.

Rohy takes the opposite approach. The code is on [GitHub](https://github.com/mohsaqr/rohySimulator) under the MIT license. An instructor who wants a case about a rare tropical disease can build one. A researcher studying clinical reasoning can modify the logging system to capture exactly the variables they need. A department that wants to integrate Rohy with their learning management system can write the integration. The barrier to entry is a laptop and a willingness to run a few terminal commands.

Medical education does not lack ideas about how to train better clinicians. It lacks affordable, flexible tools to put those ideas into practice at scale. Rohy is one step toward closing that gap.

[GitHub](https://github.com/mohsaqr/rohySimulator)
