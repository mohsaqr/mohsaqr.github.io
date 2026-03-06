---
layout: page
permalink: /laila/
title: "LAILA: A Multi-Agent AI Learning Management System"
description: An open-source learning management system built around multi-agent AI tutoring, with seven pedagogical agents, a student agent builder, browser-based R labs, and process-level learning analytics.
nav: false
---

<figure>
  <img src="/assets/img/laila/laila-thumb.png" alt="LAILA course catalog with three courses" style="width:100%; border-radius:6px;">
  <figcaption>The LAILA course catalog: courses with level badges, instructor names, and enrollment counts. The sidebar provides access to courses, labs, quizzes, AI tutors, surveys, forums, certificates, gradebook, calendar, and AI tools.</figcaption>
</figure>

Most learning management systems treat AI as an add-on --- a chatbot bolted onto a course page, answering questions in the same flat, helpful tone regardless of context, subject, or pedagogical intent. LAILA takes a fundamentally different approach. AI is not a feature of the system; it is the architecture. Every layer of the platform --- tutoring, content generation, assessment, lab execution, forum participation, and analytics --- is designed around the premise that different learning situations call for different kinds of AI interaction, and that students themselves should be able to design and build the AI agents they learn with.

LAILA stands for Learn with AI and Learning Analytics. It is a full learning management system --- courses, modules, lectures, assignments, forums, grades, enrollment, the works --- but one where AI agents are first-class citizens rather than peripheral utilities.

## AI Agents with Distinct Personalities

A student who is frustrated and considering giving up needs a different interlocutor than one who is intellectually restless and wants their assumptions challenged. A student debugging a project at midnight needs different support than one preparing for a conceptual exam. LAILA addresses this by maintaining an ensemble of seven AI agents, each with a distinct personality, pedagogical philosophy, and communication style --- not slight variations on the same helpful assistant, but genuinely different characters that approach learning from different angles.

The Socratic Guide never gives direct answers. When a student asks "What is recursion?", it does not define it. Instead, it might ask: "Have you ever placed two mirrors facing each other? What happens to the reflections?" It builds on whatever the student already knows, guiding them through a sequence of questions that leads to the concept rather than delivering it. Its behavioral rules explicitly prohibit lecturing without interaction, rushing to conclusions, or making the student feel wrong for an incorrect answer. It operates at a temperature of 0.7 --- creative enough to formulate diverse questions across conversations, grounded enough to stay pedagogically relevant.

The Helpful Guide is the opposite: direct, clear, and comprehensive. When the same student asks "What is recursion?", the Helpful Guide defines it, provides a simple example, walks through the base case and recursive case, and finishes by asking whether the explanation made sense. Its temperature of 0.6 reflects the need for precision in explanatory content --- there is less room for creative improvisation when the goal is accurate instruction.

The Project Coach is the most practically oriented agent. It approaches learning as applied work: projects, assignments, code, deliverables. When a student says "I need to build a web application for my final project and I don't know where to start," the Project Coach asks about requirements, suggests a structured plan, helps prioritize, and focuses on the immediate next step. It debugs systematically rather than guessing. Its temperature of 0.5 is the lowest in the ensemble --- precision matters most in actionable project advice.

Then there are the peer personas, and this is where LAILA departs most sharply from conventional AI tutoring. Rather than simulating experts, these agents simulate classmates who have been through similar material and can offer hints, emotional support, and intellectual companionship --- but not authoritative instruction. Research suggests that students engage differently with peers than with authority figures, and that peer-like interactions can reduce anxiety and increase willingness to ask questions.

Carmen is a fellow student who took the course last semester. She is not a tutor, not an expert --- she is a classmate who remembers struggling with the same material and is willing to chat about it. Her language is casual: "yeah," "honestly," "tbh," "like." She gives hints and nudges, not complete answers: "I remember the key thing was something about..." and "Have you tried looking at..." When she is not sure, she says so: "I think it's something like... but double-check that." Her high temperature of 0.8 generates the conversational variability that makes her feel like a real person --- less predictable, more spontaneous, occasionally going on small tangents the way a real classmate would.

Laila is the intellectual provocateur. She loves a good discussion and is not afraid to push back on ideas --- respectfully, warmly, but genuinely. When a student presents a position, Laila does not simply validate it. She challenges it: "Hmm, I'm not sure I agree with that... here's what I'm thinking." She plays devil's advocate motivated by genuine curiosity rather than competitiveness. She frames disagreements as joint exploration: "Let's think about this together..." She acknowledges strong points before introducing counterarguments. And critically, she does not back down just to be nice. If she disagrees, she says so --- kindly, but honestly. The pedagogical theory is cognitive conflict as a driver of learning: when ideas are challenged gently by someone who clearly cares, the student is forced to articulate and defend their reasoning, which deepens understanding.

Beatrice is the emotional anchor. She is an incredibly kind, patient, and endlessly encouraging fellow student who genuinely believes everyone can learn. Before tackling any academic content, she acknowledges the student's emotional state: "I totally get why that's confusing." She normalizes struggle: "This topic is tough for everyone, you're not alone." She celebrates small wins: "That's great that you got that part!" When a student is frustrated, she addresses the feelings first, then the problem --- recognizing that emotional barriers to learning must be removed before cognitive engagement is possible. Like the other peer agents, she does not give complete answers. She wants the student to have the victory of figuring it out.

The Study Buddy is the most general peer persona: a friendly fellow student who approaches learning as a collaborative activity. Unlike Carmen, the Study Buddy learns alongside the student, using phrases like "I think..." and "Let's figure this out together." It frames studying as a conversation with a friend rather than a transaction with an expert.

Every agent carries explicit behavioral constraints --- lists of required and prohibited behaviors that encode pedagogical commitments at a granularity the system prompt alone cannot achieve. Without them, all agents would gradually converge on the same generic helpful behavior. All agents produce short responses of two to three sentences, enforcing a conversational rhythm that prevents verbose, essay-like output and maintains the illusion of real dialogue.

## Agents Everywhere, Not Just in a Chat Window

AI agents in LAILA are not confined to a single chat interface. The same persona appears across five distinct interaction surfaces within the LMS, each adapted to the specific pedagogical purpose of that surface.

Global tutoring provides a persistent AI assistant accessible from anywhere in the system, where all routing modes are active. Course-level tutors are scoped to a specific course --- an instructor teaching machine learning can take the Helpful Guide and turn it into an ML-specific tutor by adding a custom system prompt that references course terminology and common misconceptions, while retaining the agent's warm, patient personality. The agent's global definition remains untouched; the instructor's customization is merged at runtime.

Forum AI participation places agents directly into discussion threads. When a student invokes Carmen in a forum, the system retrieves the entire thread history --- including author names, timestamps, and whether previous posts were human or AI --- so the agent responds in awareness of the full discussion. The response is public, visible to every student in the course, and marked as AI-generated. A student might invoke Carmen for a peer-like perspective, or the Socratic Guide to raise a challenging counterpoint that pushes the entire class's thinking forward.

Lecture-embedded chatbots sit within the flow of a specific lesson. A lecture on sorting algorithms might include a chatbot section titled "Practice Explaining Merge Sort" with a system prompt that specifically challenges the student to explain the algorithm step by step. The lecture AI helper offers two modes: Explain mode provides direct explanations of the lecture content, while Discuss mode adopts a Socratic approach, asking probing questions: "Why do you think the author emphasizes this point?" "How does this connect to what we covered last week?" Both modes construct their knowledge base by extracting text from lecture sections, AI-generated content, and PDF attachments.

A student who has developed a relationship with Carmen --- who finds her casual hints helpful --- can encounter Carmen in the tutoring chat, in a forum discussion, or assigned as a course-level tutor, each time with the same personality but grounded in the specific context of that interaction.

## Students as Agent Designers

The most distinctive feature of LAILA is that students are not just consumers of AI agents --- they are designers. The Student Agent Builder provides an interface for students to create their own AI tutoring agents as a graded learning activity.

Ten pedagogical role templates serve as starting points: Peer Tutor, Socratic Guide, Writing Coach, Debate Partner, Code Helper, Research Assistant, Language Partner, Exam Prep Coach, Creative Collaborator, and Problem-Solving Coach. Each template ships with a complete default configuration: a multi-paragraph system prompt, recommended do's and don'ts, a suggested personality, and an example welcome message. Seven personality presets (Friendly, Professional, Socratic, Encouraging, Academic, Casual, Custom) operate independently from roles --- a student designing a Debate Partner might select "professional" for a formal exchange, or "casual" for something resembling a late-night dorm room argument. Thirty-eight modular prompt building blocks across six categories (Persona, Tone and Style, Behaviors, Constraints, Response Format, Knowledge Bounds) let students compose system prompts by clicking tiles rather than writing raw text.

A live testing environment lets students converse with their agent during the design process, iterating on the configuration until the agent behaves the way they intend. Each test session records a full snapshot of the configuration, creating a versioned history. The system tracks total iterations, total design time, and number of test conversations --- metrics that serve both as grading signals and as research data about the design process.

The pedagogical logic is that designing an AI tutor is itself a deep learning activity. To build an effective Socratic Guide for organic chemistry, a student must understand both the subject matter and the pedagogical principles well enough to encode them into prompts. The design process makes learning visible: every configuration change, every test conversation, every iteration is logged. Instructors review submissions through an interface that shows the final configuration, the full history of test conversations (tagged with the configuration version active at the time), the chronological trail of changes with before-and-after snapshots, and the student's reflections.

## AI-Powered Content Generation

AI extends beyond tutoring into content creation. The MCQ generator produces quiz questions from lecture content at configurable difficulty levels, with three to five options and auto-generated explanations for each answer. Students can generate their own practice questions from any lecture, turning passive reading into active retrieval practice. A survey generator creates five types of instruments --- general feedback, course evaluation, Likert scales, learning strategies, and custom --- for instructors who need to gather student perspectives without designing every item from scratch.

## Browser-Based R Labs

LAILA integrates WebR --- a WebAssembly build of R --- directly into the browser, giving students a fully functional R environment without any server-side installation. The Monaco editor provides syntax highlighting, autocompletion, and inline error messages. Ten pre-built lab types cover transition network analysis, statistics, network analysis, sequence analysis, data visualization, regression, clustering, time series, text analysis, and a custom template. Each lab type ships with starter code, sample data, and guided exercises. Students write, run, and iterate on R code entirely within the LMS, removing the friction of configuring local environments --- a friction that disproportionately affects students with less technical background.

## Multi-Provider LLM Infrastructure

LAILA supports OpenAI, Anthropic, Google Gemini, Ollama, LM Studio, Groq, and any OpenAI-compatible endpoint. Over fifty configuration parameters per provider allow fine-tuning of model selection, temperature, token limits, system prompts, and safety settings. Health checking monitors provider availability. Usage statistics track token consumption across agents, courses, and students. Provider fallback ensures that if one service goes down, the system switches to an alternative without interrupting the student's session. For institutions concerned about data sovereignty, Ollama and LM Studio support means LAILA can run entirely on local infrastructure with no data leaving the institution's network.

## Learning Analytics

Every interaction generates structured analytics data. Per-message logging captures the full conversation between each student and each agent across all five deployment surfaces. A unified xAPI-inspired activity logging system records events as actor-verb-object triples. The Emotional Pulse system provides a lightweight affective signal: at configurable intervals, students self-report their state from seven options --- productive, stimulated, frustrated, learning, enjoying, bored, or quitting. Client-side behavioral analytics add scroll depth tracking, time-on-page, and interaction patterns. All data exports to CSV, JSON, and Excel.

For the Student Agent Builder, a separate analytics layer captures the design process itself: every configuration change, every test conversation, every iteration is timestamped and versioned. This design process data lets researchers study not just how students use AI, but how they think about AI as a pedagogical tool.

## Course Management

Beneath the AI layer, LAILA is a complete LMS. Courses contain modules, modules contain lectures, lectures contain rich content sections. Student enrollment, progress tracking, assignment submissions, and grading work as expected. Discussion forums support threaded conversations with AI participation as an optional feature. A teaching dashboard gives instructors visibility into student activity, assignment completion, agent usage patterns, and learning analytics summaries. The assessment engine supports multiple question types with time limits, attempt limits, shuffling, auto-grading, and auto-save. LAILA ships with four languages --- English, Finnish, Arabic with full RTL support, and Spanish --- and supports dark and light themes with PWA installation.

## Running It

The stack is React 18 with TypeScript and Vite on the frontend, Express.js with TypeScript and Prisma ORM on the backend, and PostgreSQL for the database. Clone the repository, install dependencies, configure the environment file with a database URL and at least one AI provider key, run the Prisma migrations, seed the database, and start. Demo accounts for admin, instructor, and student roles are created by the seed script. The test suite includes over 900 tests. Free under the MIT license.

LAILA is primarily conceptualized and developed by Mohammed Saqr, Professor of Computer Science at the University of Eastern Finland, and co-developed by [Sonsoles López-Pernas](https://sonsoles.me), Academy Fellow at the University of Eastern Finland.

[GitHub](https://github.com/mohsaqr/LAILA-v3)
