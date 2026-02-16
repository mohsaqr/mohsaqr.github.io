// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-research",
          title: "Research",
          description: "Browse publications by keyword, search by title or author.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-tutorials",
          title: "Tutorials",
          description: "Hands-on tutorials for transition network analysis, sequence analytics, and learning analytics methods in R.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/tutorials/";
          },
        },{id: "nav-get-in-touch",
          title: "Get in Touch",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/get-in-touch/";
          },
        },{id: "nav-software",
          title: "Software",
          description: "Scientific software for transition network analysis, learning analytics, AI-powered education, and data science.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/software/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: ".",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-interests",
          title: "Interests",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/Interests/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "As an academic, teaching and learning are central to everyday job. From teaching formal courses, to supervision tasks to mentoring students. Here, I describe my teaching and assessment philosophy. I also list my courses and how you can enrol in them. If you are looking for a PhD supervision please reach out by email.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "news-transition-network-analysis-is-released",
          title: 'Transition Network Analysis is released',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-ramy-defended-his-thesis-in-learning-analytics",
          title: 'Ramy defended his thesis in learning analytics',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "news-just-got-a-turkish-chapter-published-and-it-feels-great-having-my-research-in-other-languages",
          title: 'Just got a Turkish chapter published and it feels great having my research...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "publications-shall-migraine-be-considered-a-simple-benign-headache-disorder",
          title: 'Shall Migraine be Considered a Simple Benign Headache Disorder?',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2008-saqr-shall-migraine-considered-simple-benign/";
            },},{id: "publications-blended-learning-in-orthopedics-course-an-evaluation-study",
          title: 'Blended learning in orthopedics course: an evaluation study.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2011-amin-blended-learning-orthopedics-course-evaluation/";
            },},{id: "publications-learning-analytic-and-medical-education",
          title: 'Learning Analytic and Medical Education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2015-saqr-learning-analytic-medical-education/";
            },},{id: "publications-assessment-analytics-the-missing-step",
          title: 'Assessment analytics: The missing step.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2017-saqr-assessment-analytics-missing-step/";
            },},{id: "publications-big-data-and-the-emerging-ethical-challenges",
          title: 'Big data and the emerging ethical challenges.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2017-saqr-big-data-emerging-ethical-challenges/";
            },},{id: "publications-how-learning-analytics-can-early-predict-under-achieving-students-in-a-blended-medical-education-course",
          title: 'How learning analytics can early predict under-achieving students in a blended medical education...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2017-saqr-learning-analytics-early-predict-under/";
            },},{id: "publications-a-literature-review-of-empirical-research-on-learning-analytics-in-medical-education",
          title: 'A literature review of empirical research on learning analytics in medical education.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2018-saqr-literature-review-empirical-research-learning/";
            },},{id: "publications-how-social-network-analysis-can-be-used-to-monitor-online-collaborative-learning-and-guide-an-informed-intervention",
          title: 'How social network analysis can be used to monitor online collaborative learning and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2018-saqr-social-network-analysis-used-monitor/";
            },},{id: "publications-how-the-study-of-online-collaborative-learning-can-guide-teachers-and-predict-students-performance-in-a-medical-course",
          title: 'How the study of online collaborative learning can guide teachers and predict students’...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2018-saqr-study-online-collaborative-learning-guide/";
            },},{id: "publications-temporality-matters-a-learning-analytics-study-of-the-patterns-of-interactions-and-its-relation-to-performance",
          title: 'TEMPORALITY MATTERS. A LEARNING ANALYTICS STUDY OF THE PATTERNS OF INTERACTIONS AND ITS...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2018-saqr-temporality-matters-learning-analytics-study/";
            },},{id: "publications-using-social-network-analysis-to-understand-online-problem-based-learning-and-predict-performance",
          title: 'Using social network analysis to understand online Problem-Based Learning and predict performance',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2018-saqr-using-social-network-analysis-understand/";
            },},{id: "publications-what-shapes-the-communities-of-learners-in-a-medical-school",
          title: 'WHAT SHAPES THE COMMUNITIES OF LEARNERS IN A MEDICAL SCHOOL',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2018-saqr-what-shapes-communities-learners-medical/";
            },},{id: "publications-research-education-in-an-undergraduate-curriculum-students-perspective",
          title: 'Research education in an undergraduate curriculum: Students perspective.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-alsuhaibani-research-education-undergraduate-curriculum-students/";
            },},{id: "publications-bachelor-thesis-analytics-using-machine-learning-to-predict-dropout-and-identify-performance-factors",
          title: 'Bachelor Thesis Analytics: Using Machine Learning to Predict Dropout and Identify Performance Factors...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-nouri-bachelor-thesis-analytics-using-machine/";
            },},{id: "publications-efforts-in-europe-for-data-driven-improvement-of-education-a-review-of-learning-analytics-research-in-seven-countries",
          title: 'Efforts in Europe for Data-Driven Improvement of Education – A Review of Learning...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-nouri-efforts-europe-data-driven-improvement/";
            },},{id: "publications-identifying-factors-for-master-thesis-completion-and-non-completion-through-learning-analytics-and-machine-learning",
          title: 'Identifying Factors for Master Thesis Completion and Non-completion Through Learning Analytics and Machine...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-nouri-identifying-factors-master-thesis-completion/";
            },},{id: "publications-predicting-performance-of-students-in-a-flipped-classroom-using-machine-learning-towards-automated-data-driven-formative-feedback",
          title: 'Predicting performance of students in a flipped classroom using machine learning: Towards automated...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-nouri-predicting-performance-students-flipped-classroom/";
            },},{id: "publications-a-learning-analytics-study-of-the-effect-of-group-size-on-social-dynamics-and-performance-in-online-collaborative-learning",
          title: 'A Learning Analytics Study of the Effect of Group Size on Social Dynamics...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-saqr-learning-analytics-study-effect-group/";
            },},{id: "publications-the-role-of-social-network-analysis-as-a-learning-analytics-tool-in-online-problem-based-learning",
          title: 'The role of social network analysis as a learning analytics tool in online...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-saqr-role-social-network-analysis-learning/";
            },},{id: "publications-should-we-teach-computational-thinking-and-big-data-principles-to-medical-students",
          title: 'Should we teach computational thinking and big data principles to medical students?',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-saqr-should-teach-computational-thinking-big/";
            },},{id: "publications-time-to-focus-on-the-temporal-dimension-of-learning-a-learning-analytics-study-of-the-temporal-patterns-of-students-39-interactions-and-self-regulation",
          title: 'Time to focus on the temporal dimension of learning: a learning analytics study...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-saqr-time-focus-temporal-dimension-learning-2/";
            },},{id: "publications-time-to-focus-on-the-temporal-dimension-of-learning-a-learning-analytics-study-of-the-temporal-patterns-of-students-39-interactions-and-self-regulation",
          title: 'Time to focus on the temporal dimension of learning: a learning analytics study...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-saqr-time-focus-temporal-dimension-learning/";
            },},{id: "publications-towards-group-aware-learning-analytics-using-social-network-analysis-and-machine-learning-to-monitor-and-predict-performance-in-collaborative-learning",
          title: 'TOWARDS GROUP-AWARE LEARNING ANALYTICS: USING SOCIAL NETWORK ANALYSIS AND MACHINE LEARNING TO MONITOR...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-saqr-towards-group-aware-learning-analytics/";
            },},{id: "publications-a-research-agenda-for-the-why-what-and-how-of-gamification-designs-outcomes-of-an-ecis-2019-panel",
          title: 'A Research Agenda for the Why, What, and How of Gamification Designs: Outcomes...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2019-schobel-research-agenda-why-what-gamification/";
            },},{id: "publications-learning-analytics-for-blended-learning-a-systematic-review-of-theory-methodology-and-ethical-considerations",
          title: 'Learning Analytics for Blended Learning: A Systematic Review of Theory, Methodology, and Ethical...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-bergdahl-learning-analytics-blended-learning-systematic/";
            },},{id: "publications-applying-learning-analytics-to-map-students-39-self-regulated-learning-tactics-in-an-academic-writing-course",
          title: 'Applying learning analytics to map students&amp;#39; self-regulated learning tactics in an academic writing...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-peeters-applying-learning-analytics-map-students/";
            },},{id: "publications-capturing-the-participation-and-social-dimensions-of-computer-supported-collaborative-learning-through-social-network-analysis-which-method-and-measures-matter",
          title: 'Capturing the participation and social dimensions of computer-supported collaborative learning through social network...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-capturing-participation-social-dimensions-computer/";
            },},{id: "publications-covid-19-lost-opportunities-and-lessons-for-the-future",
          title: 'COVID-19: Lost opportunities and lessons for the future.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-covid-lost-opportunities-lessons-future/";
            },},{id: "publications-high-resolution-temporal-network-analysis-to-understand-and-improve-collaborative-learning",
          title: 'High resolution temporal network analysis to understand and improve collaborative learning',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-high-resolution-temporal-network-analysis/";
            },},{id: "publications-learning-and-social-networks-similarities-differences-and-impact",
          title: 'Learning and Social Networks - Similarities, Differences and Impact',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-learning-social-networks-similarities-differences/";
            },},{id: "publications-multimodal-temporal-network-analysis-to-improve-learner-support-and-teaching",
          title: 'Multimodal temporal network analysis to improve learner support and teaching',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-multimodal-temporal-network-analysis-improve/";
            },},{id: "publications-robustness-and-rich-clubs-in-collaborative-learning-groups-a-learning-analytics-study-using-network-science",
          title: 'Robustness and rich clubs in collaborative learning groups: a learning analytics study using...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-robustness-rich-clubs-collaborative-learning/";
            },},{id: "publications-tear-down-the-walls-disseminating-open-access-research-for-a-global-impact",
          title: 'Tear down the walls: Disseminating open access research for a global impact.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-tear-down-walls-disseminating-open/";
            },},{id: "publications-using-diffusion-network-analytics-to-examine-and-support-knowledge-construction-in-cscl-settings",
          title: 'Using Diffusion Network Analytics to Examine and Support Knowledge Construction in CSCL Settings...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-using-diffusion-network-analytics-examine/";
            },},{id: "publications-what-makes-an-online-problem-based-group-successful-a-learning-analytics-study-using-social-network-analysis",
          title: 'What makes an online problem-based group successful? A learning analytics study using social...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2020-saqr-what-makes-online-problem-based/";
            },},{id: "publications-a-scientometric-journey-through-the-fie-bookshelf-1982-2020",
          title: 'A Scientometric Journey Through the FIE Bookshelf: 1982-2020',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-apiola-scientometric-journey-through-fie-bookshelf/";
            },},{id: "publications-utility-of-spect-functional-neuroimaging-of-pain",
          title: 'Utility of SPECT Functional Neuroimaging of Pain',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-bermo-utility-spect-functional-neuroimaging-pain/";
            },},{id: "publications-students-matter-the-most-in-learning-analytics-the-effects-of-internal-and-instructional-conditions-in-predicting-academic-success",
          title: 'Students matter the most in learning analytics: The effects of internal and instructional...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-jovanovic-students-matter-most-learning-analytics/";
            },},{id: "publications-bringing-synchrony-and-clarity-to-complex-multi-channel-data-a-learning-analytics-study-in-programming-education",
          title: 'Bringing Synchrony and Clarity to Complex Multi-Channel Data: A Learning Analytics Study in...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-lopezpernas-bringing-synchrony-clarity-complex-multi/";
            },},{id: "publications-putting-it-all-together-combining-learning-analytics-methods-and-data-sources-to-understand-students-approaches-to-learning-programming",
          title: 'Putting It All Together: Combining Learning Analytics Methods and Data Sources to Understand...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-lopezpernas-putting-all-together-combining-learning-2/";
            },},{id: "publications-putting-it-all-together-combining-learning-analytics-methods-and-data-sources-to-understand-students-approaches-to-learning-programming",
          title: 'Putting It All Together: Combining Learning Analytics Methods and Data Sources to Understand...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-lopezpernas-putting-all-together-combining-learning/";
            },},{id: "publications-recommendations-for-network-research-in-learning-analytics-to-open-a-conversation",
          title: 'Recommendations for network research in learning analytics: To open a conversation',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-poquet-recommendations-network-research-learning-analytics/";
            },},{id: "publications-using-network-science-in-learning-analytics-building-bridges-towards-a-common-agenda",
          title: 'Using network science in learning analytics: Building bridges towards a common agenda',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-poquet-using-network-science-learning-analytics/";
            },},{id: "publications-the-dire-cost-of-early-disengagement-a-four-year-learning-analytics-study-over-a-full-program",
          title: 'The Dire Cost of Early Disengagement: A Four-Year Learning Analytics Study over a...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-dire-cost-early-disengagement-four/";
            },},{id: "publications-idiographic-learning-analytics-a-definition-and-a-case-study",
          title: 'Idiographic learning analytics: A definition and a case study',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-idiographic-learning-analytics-definition-case/";
            },},{id: "publications-idiographic-learning-analytics-a-single-student-n-1-approach-using-psychological-networks",
          title: 'Idiographic learning analytics: A single student (N=1) approach using psychological networks',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-idiographic-learning-analytics-single-student/";
            },},{id: "publications-the-longitudinal-trajectories-of-online-engagement-over-a-full-program",
          title: 'The longitudinal trajectories of online engagement over a full program',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-longitudinal-trajectories-online-engagement-over/";
            },},{id: "publications-modelling-diffusion-in-computer-supported-collaborative-learning-a-large-scale-learning-analytics-study",
          title: 'Modelling diffusion in computer-supported collaborative learning: a large scale learning analytics study',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-modelling-diffusion-computer-supported-collaborative/";
            },},{id: "publications-how-networking-and-social-capital-influence-performance-the-role-of-long-term-ties",
          title: 'How Networking and Social Capital Influence Performance: The Role of Long-Term Ties',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-networking-social-capital-influence-performance/";
            },},{id: "publications-people-ideas-milestones-a-scientometric-study-of-computational-thinking",
          title: 'People, Ideas, Milestones: A Scientometric Study of Computational Thinking',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-people-ideas-milestones-scientometric-study/";
            },},{id: "publications-the-relational-co-temporal-contemporaneous-and-longitudinal-dynamics-of-self-regulation-for-academic-writing",
          title: 'The relational, co-temporal, contemporaneous, and longitudinal dynamics of self-regulation for academic writing',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-relational-temporal-contemporaneous-longitudinal-dynamics/";
            },},{id: "publications-toward-self-big-data",
          title: 'Toward self big data.',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-toward-self-big-data/";
            },},{id: "publications-the-trajectory-of-early-disengagement-a-longitudinal-learning-analytics-study-over-a-full-program",
          title: 'The trajectory of early disengagement: A longitudinal learning analytics study over a full...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-trajectory-early-disengagement-longitudinal-learning-2/";
            },},{id: "publications-the-trajectory-of-early-disengagement-a-longitudinal-learning-analytics-study-over-a-full-program",
          title: 'The trajectory of early disengagement: A longitudinal learning analytics study over a full...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-trajectory-early-disengagement-longitudinal-learning/";
            },},{id: "publications-using-psychological-networks-to-reveal-the-interplay-between-foreign-language-students-39-self-regulated-learning-tactics",
          title: 'Using psychological networks to reveal the interplay between foreign language students&amp;#39; self-regulated learning...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-saqr-using-psychological-networks-reveal-interplay/";
            },},{id: "publications-two-decades-of-game-concepts-in-digital-learning-environments-a-bibliometric-study-and-research-agenda",
          title: 'Two decades of game concepts in digital learning environments – A bibliometric study...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2021-schobel-two-decades-game-concepts-digital/";
            },},{id: "publications-computing-education-research-compiled-keyword-trends-building-blocks-creators-and-dissemination",
          title: 'Computing Education Research Compiled: Keyword Trends, Building Blocks, Creators, and Dissemination',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-apiola-computing-education-research-compiled-keyword/";
            },},{id: "publications-the-evolving-themes-of-computing-education-research-trends-topic-models-and-emerging-research",
          title: 'The Evolving Themes of Computing Education Research: Trends, Topic Models, and Emerging Research...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-apiola-evolving-themes-computing-education-research/";
            },},{id: "publications-hands-authors-and-collaboration",
          title: 'Hands: Authors and Collaboration',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-apiola-hands-authors-collaboration/";
            },},{id: "publications-from-a-national-meeting-to-an-international-conference-a-scientometric-case-study-of-a-finnish-computing-education-conference",
          title: 'From a National Meeting to an International Conference: A Scientometric Case Study of...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-apiola-national-meeting-international-conference-scientometric/";
            },},{id: "publications-addressing-the-complexity-of-online-education-a-learning-analytics-and-big-data-perspective",
          title: 'Addressing the complexity of online education: A learning analytics and big data perspective...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-conde-addressing-complexity-online-education-learning/";
            },},{id: "publications-how-social-interactions-kindle-productive-online-problem-based-learning-an-exploratory-study-of-the-temporal-dynamics",
          title: 'How social interactions kindle productive online problem-based learning: An exploratory study of the...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-elmoazen-social-interactions-kindle-productive-online/";
            },},{id: "publications-a-systematic-literature-review-of-empirical-research-on-epistemic-network-analysis-in-education",
          title: 'A Systematic Literature Review of Empirical Research on Epistemic Network Analysis in Education...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-elmoazen-systematic-literature-review-empirical-research/";
            },},{id: "publications-how-do-business-students-self-regulate-their-project-management-learning-a-sequence-mining-study",
          title: 'How do business students self-regulate their project management learning? A sequence mining study...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-heikkinen-business-students-self-regulate-their/";
            },},{id: "publications-supporting-self-regulated-learning-with-learning-analytics-interventions-a-systematic-literature-review",
          title: 'Supporting self-regulated learning with learning analytics interventions – a systematic literature review',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-heikkinen-supporting-self-regulated-learning-learning/";
            },},{id: "publications-bridging-education-learning-analytics-and-ai-challenges-of-the-present-and-thoughts-for-the-future",
          title: 'Bridging Education Learning Analytics and AI: Challenges of the Present and Thoughts for...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-hirsto-bridging-education-learning-analytics-challenges-2/";
            },},{id: "publications-bridging-education-learning-analytics-and-ai-challenges-of-the-present-and-thoughts-for-the-future",
          title: 'Bridging Education Learning Analytics and AI: Challenges of the Present and Thoughts for...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-hirsto-bridging-education-learning-analytics-challenges/";
            },},{id: "publications-a-systematic-narrative-review-of-learning-analytics-research-in-k-12-and-schools",
          title: 'A systematic narrative review of learning analytics research in K-12 and schools',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-hirsto-systematic-narrative-review-learning-analytics/";
            },},{id: "publications-a-quantitative-synthesis-of-eight-decades-of-global-multiple-sclerosis-research-using-bibliometrics",
          title: 'A Quantitative Synthesis of Eight Decades of Global Multiple Sclerosis Research Using Bibliometrics...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-ismail-quantitative-synthesis-eight-decades-global/";
            },},{id: "publications-a-scientometric-perspective-on-the-evolution-of-the-sigcse-technical-symposium-1970-2021",
          title: 'A Scientometric Perspective on the Evolution of the SIGCSE Technical Symposium: 1970-2021',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-lopezpernas-scientometric-perspective-evolution-sigcse-technical/";
            },},{id: "publications-scientometrics-a-concise-introduction-and-a-detailed-methodology-for-the-mapping-of-the-scientific-field-of-computing-education",
          title: 'Scientometrics: A Concise Introduction and a Detailed Methodology for the Mapping of the...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-lopezpernas-scientometrics-concise-introduction-detailed-methodology/";
            },},{id: "publications-modeling-the-complex-interplay-between-monitoring-events-for-regulated-learning-with-psychological-networks",
          title: 'Modeling the Complex Interplay Between Monitoring Events for Regulated Learning with Psychological Networks...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-malmberg-modeling-complex-interplay-between-monitoring/";
            },},{id: "publications-how-the-monitoring-events-of-individual-students-are-associated-with-phases-of-regulation",
          title: 'How the Monitoring Events of Individual Students Are Associated With Phases of Regulation...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-malmberg-monitoring-events-individual-students-associated/";
            },},{id: "publications-to-opt-in-or-to-opt-out-predicting-student-preference-for-learning-analytics-based-formative-feedback",
          title: 'To Opt in or to Opt Out? Predicting Student Preference for Learning Analytics-Based...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-merikko-opt-opt-out-predicting-student/";
            },},{id: "publications-how-assessment-analytics-can-help-to-improve-reliability-efficiency-and-fairness-of-entrance-examinations",
          title: 'How assessment analytics can help to improve reliability, efficiency, and fairness of entrance...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-nissinen-assessment-analytics-help-improve-reliability/";
            },},{id: "publications-computing-education-research-in-social-media-news-blogs-patents-and-blogs-capturing-the-impact-and-the-chatter-with-altmetrics",
          title: 'Computing Education Research in Social Media, News, Blogs, Patents And Blogs: Capturing The...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-computing-education-research-social-media/";
            },},{id: "publications-concluding-remarks-of-the-netscila22-workshop",
          title: 'Concluding remarks of the NetSciLA22 Workshop',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-concluding-remarks-netscila22-workshop/";
            },},{id: "publications-how-cscl-roles-emerge-persist-transition-and-evolve-over-time-a-four-year-longitudinal-study",
          title: 'How CSCL roles emerge, persist, transition, and evolve over time: A four-year longitudinal...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-cscl-roles-emerge-persist-transition/";
            },},{id: "publications-the-curious-case-of-centrality-measures-a-large-scale-empirical-investigation",
          title: 'The Curious Case of Centrality Measures: A Large-Scale Empirical Investigation',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-curious-case-centrality-measures-large/";
            },},{id: "publications-is-gdpr-failing-a-tale-of-the-many-challenges-in-interpretations-applications-and-enforcement",
          title: 'Is GDPR failing? a tale of the many challenges in interpretations, applications, and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-gdpr-failing-tale-many-challenges/";
            },},{id: "publications-instant-or-distant-a-temporal-network-tale-of-two-interaction-platforms-and-their-influence-on-collaboration",
          title: 'Instant or Distant: A Temporal Network Tale of Two Interaction Platforms and Their...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-instant-distant-temporal-network-tale/";
            },},{id: "publications-networks-in-education-a-travelogue-through-five-decades",
          title: 'Networks in Education: A Travelogue Through Five Decades',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-networks-education-travelogue-through-five/";
            },},{id: "publications-networks-and-learning-analytics-addressing-educational-challenges",
          title: 'Networks and Learning Analytics: Addressing Educational Challenges',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-networks-learning-analytics-addressing-educational/";
            },},{id: "publications-teachers-learning-profiles-in-learning-programming-the-big-picture",
          title: 'Teachers’ Learning Profiles in Learning Programming: The Big Picture!',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-teachers-learning-profiles-learning-programming/";
            },},{id: "publications-temporal-networks-in-collaborative-learning-a-case-study",
          title: 'Temporal networks in collaborative learning: A case study',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-temporal-networks-collaborative-learning-case/";
            },},{id: "publications-is-there-order-in-the-mess-a-single-paper-meta-analysis-approach-to-identification-of-predictors-of-success-in-learning-analytics",
          title: 'Is there order in the mess? A single paper meta-analysis approach to identification...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-there-order-mess-single-paper/";
            },},{id: "publications-how-well-centrality-measures-capture-student-achievement-in-computer-supported-collaborative-learning-a-systematic-review-and-meta-analysis",
          title: 'How well centrality measures capture student achievement in computer-supported collaborative learning? – A...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-well-centrality-measures-capture-student/";
            },},{id: "publications-the-why-the-what-and-the-how-to-model-a-dynamic-relational-learning-process-with-temporal-networks",
          title: 'The Why, the What and the How to Model a Dynamic Relational Learning...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-saqr-why-what-model-dynamic-relational/";
            },},{id: "publications-learning-analytics-and-flipped-learning-in-online-teaching-for-supporting-preservice-teachers-learning-of-quantitative-research-methods",
          title: 'Learning analytics and flipped learning in online teaching for supporting preservice teachers’ learning...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-sointu-learning-analytics-flipped-learning-online/";
            },},{id: "publications-a-person-centered-approach-to-study-students-socio-emotional-interaction-profiles-and-regulation-of-collaborative-learning",
          title: 'A Person-Centered Approach to Study Students’ Socio-Emotional Interaction Profiles and Regulation of Collaborative...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-tormanen-person-centered-approach-study-students/";
            },},{id: "publications-games-and-rewards-a-scientometric-study-of-rewards-in-educational-and-serious-games",
          title: 'Games and Rewards: A Scientometric Study of Rewards in Educational and Serious Games...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-tyni-games-rewards-scientometric-study-rewards/";
            },},{id: "publications-the-nature-and-building-blocks-of-educational-technology-research",
          title: 'The nature and building blocks of educational technology research',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-valtonen-nature-building-blocks-educational-technology/";
            },},{id: "publications-mapping-students-39-temporal-pathways-in-a-computational-thinking-escape-room",
          title: 'Mapping students&amp;#39; temporal pathways in a computational thinking escape room',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-vartiainen-mapping-students-temporal-pathways-computational/";
            },},{id: "publications-exploring-students-expectations-of-learning-analytics-a-person-centered-approach",
          title: 'Exploring students’ expectations of learning analytics: A person-centered approach',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2022-viberg-exploring-students-expectations-learning-analytics/";
            },},{id: "publications-computing-education-research-in-the-global-south",
          title: 'Computing Education Research in the Global South',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-agbo-computing-education-research-global-south/";
            },},{id: "publications-a-systematic-literature-review-of-empirical-research-on-chatgpt-in-education",
          title: 'A Systematic Literature Review of Empirical Research on ChatGPT in Education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-albadarin-systematic-literature-review-empirical-research/";
            },},{id: "publications-the-evolving-themes-of-computing-education-research-trends-topic-models-and-emerging-research",
          title: 'The Evolving Themes of Computing Education Research: Trends, Topic Models, and Emerging Research...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-apiola-evolving-themes-computing-education-research/";
            },},{id: "publications-exploring-the-past-present-and-future-of-computing-education-research-an-introduction",
          title: 'Exploring the Past, Present and Future of Computing Education Research: An Introduction',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-apiola-exploring-past-present-future-computing/";
            },},{id: "publications-the-hands-that-made-computing-education-research-top-authors-networks-collaboration-and-newcomers",
          title: 'The Hands that Made Computing Education Research: Top Authors, Networks, Collaboration and Newcomers...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-apiola-hands-made-computing-education-research/";
            },},{id: "publications-past-present-and-future-of-computing-education-research",
          title: 'Past, Present and Future of Computing Education Research',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-apiola-past-present-future-computing-education/";
            },},{id: "publications-preface",
          title: 'Preface',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-apiola-preface/";
            },},{id: "publications-the-venues-that-shaped-computing-education-research-dissemination-under-the-lens",
          title: 'The Venues that Shaped Computing Education Research: Dissemination Under the Lens',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-apiola-venues-shaped-computing-education-research/";
            },},{id: "publications-computing-education-research-in-the-uk-amp-amp-ireland",
          title: 'Computing Education Research in the UK &amp;amp;amp; Ireland',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-becker-computing-education-research-amp-ireland/";
            },},{id: "publications-definition-of-a-learning-analytics-ecosystem-for-the-ileda-project-piloting",
          title: 'Definition of a Learning Analytics Ecosystem for the ILEDA Project Piloting',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-conde-definition-learning-analytics-ecosystem-ileda/";
            },},{id: "publications-multi-stakeholder-perspective-on-the-gap-between-existing-realities-and-new-requirements-for-online-and-blended-learning-an-exploratory-study",
          title: 'Multi-stakeholder Perspective on the Gap Between Existing Realities and New Requirements for Online...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-conde-multi-stakeholder-perspective-gap-between/";
            },},{id: "publications-computing-education-research-in-schools",
          title: 'Computing Education Research in Schools',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-dagiene-computing-education-research-schools/";
            },},{id: "publications-exploring-barriers-and-challenges-to-accessibility-in-virtual-laboratories-a-preliminary-review",
          title: 'Exploring Barriers and Challenges to Accessibility in Virtual Laboratories: A Preliminary Review',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-deriba-exploring-barriers-challenges-accessibility-virtual/";
            },},{id: "publications-learning-analytics-in-virtual-laboratories-a-systematic-literature-review-of-empirical-research",
          title: 'Learning analytics in virtual laboratories: a systematic literature review of empirical research',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-elmoazen-learning-analytics-virtual-laboratories-systematic/";
            },},{id: "publications-reflections-on-technology-enhanced-learning-in-laboratories-barriers-and-opportunities",
          title: 'Reflections on Technology-enhanced Learning in Laboratories: Barriers and Opportunities',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-elmoazen-reflections-technology-enhanced-learning-laboratories/";
            },},{id: "publications-supporting-self-regulated-learning-with-learning-analytics-interventions-a-systematic-literature-review",
          title: 'Supporting self-regulated learning with learning analytics interventions – a systematic literature review',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-heikkinen-supporting-self-regulated-learning-learning/";
            },},{id: "publications-a-modern-approach-to-transition-analysis-and-process-mining-with-markov-models-a-tutorial-with-r",
          title: 'A modern approach to transition analysis and process mining with Markov models: A...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-helske-modern-approach-transition-analysis-process/";
            },},{id: "publications-examining-the-development-of-k-12-students-39-cognitive-presence-over-time",
          title: 'Examining the Development of K-12 Students&amp;#39; Cognitive Presence Over Time',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-hrastinski-examining-development-students-cognitive-presence/";
            },},{id: "publications-have-learning-analytics-dashboards-lived-up-to-the-hype-a-systematic-review-of-impact-on-students-39-achievement-motivation-participation-and-attitude",
          title: 'Have Learning Analytics Dashboards Lived Up to the Hype? A Systematic Review of...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-kaliisa-learning-analytics-dashboards-lived-hype/";
            },},{id: "publications-learning-analytics-to-explore-the-motivational-profiles-of-non-traditional-practical-nurse-students-a-mixed-methods-approach",
          title: 'Learning analytics to explore the motivational profiles of non-traditional practical nurse students: a...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-kleimola-learning-analytics-explore-motivational-profiles/";
            },},{id: "publications-a-learning-analytics-perspective-on-educational-escape-rooms",
          title: 'A learning analytics perspective on educational escape rooms',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-lopezpernas-learning-analytics-perspective-educational-escape/";
            },},{id: "publications-a-scientometric-perspective-on-the-evolution-of-the-sigcse-technical-symposium-1970-2021",
          title: 'A Scientometric Perspective on the Evolution of the SIGCSE Technical Symposium: 1970–2021',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-lopezpernas-scientometric-perspective-evolution-sigcse-technical/";
            },},{id: "publications-scientometrics-a-concise-introduction-and-a-detailed-methodology-for-mapping-the-scientific-field-of-computing-education-research",
          title: 'Scientometrics: A Concise Introduction and a Detailed Methodology for Mapping the Scientific Field...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-lopezpernas-scientometrics-concise-introduction-detailed-methodology/";
            },},{id: "publications-from-variables-to-states-to-trajectories-vasstra-a-method-for-modelling-the-longitudinal-dynamics-of-learning-and-behaviour",
          title: 'From Variables to States to Trajectories (VaSSTra): A Method for Modelling the Longitudinal...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-lopezpernas-variables-states-trajectories-vasstra-method/";
            },},{id: "publications-international-online-team-based-learning-in-higher-education-of-biomedicine-evaluation-by-learning-analytics",
          title: 'International Online Team-Based Learning in Higher Education of Biomedicine - Evaluation by Learning...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-mairinoja-international-online-team-based-learning/";
            },},{id: "publications-capturing-the-impact-and-the-chatter-around-computing-education-research-beyond-academia-in-social-media-patents-and-blogs",
          title: 'Capturing the Impact and the Chatter Around Computing Education Research Beyond Academia in...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-capturing-impact-chatter-around-computing/";
            },},{id: "publications-the-critical-challenges-of-artificial-intelligence-in-education",
          title: 'The Critical Challenges of Artificial Intelligence in Education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-critical-challenges-artificial-intelligence-education/";
            },},{id: "publications-the-features-learning-analytics-students-want-the-most-help-them-learn-over-all-else",
          title: 'The Features Learning Analytics Students Want the Most: Help Them Learn Over All...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-features-learning-analytics-students-want/";
            },},{id: "publications-intense-turbulent-or-wallowing-in-the-mire-a-longitudinal-study-of-cross-course-online-tactics-strategies-and-trajectories",
          title: 'Intense, turbulent, or wallowing in the mire: A longitudinal study of cross-course online...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-intense-turbulent-wallowing-mire-longitudinal/";
            },},{id: "publications-the-longitudinal-association-between-engagement-and-achievement-varies-by-time-students-profiles-and-achievement-state-a-full-program-study",
          title: 'The longitudinal association between engagement and achievement varies by time, students’ profiles, and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-longitudinal-association-between-engagement-achievement/";
            },},{id: "publications-modelling-within-person-idiographic-variance-could-help-explain-and-individualize-learning",
          title: 'Modelling within‐person idiographic variance could help explain and individualize learning',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-modelling-within-person-idiographic-variance/";
            },},{id: "publications-the-temporal-dynamics-of-online-problem-based-learning-why-and-when-sequence-matters",
          title: 'The temporal dynamics of online problem-based learning: Why and when sequence matters',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-temporal-dynamics-online-problem-based/";
            },},{id: "publications-temporal-network-analysis-introduction-methods-and-detailed-tutorial-with-r",
          title: 'Temporal network analysis: Introduction, methods and detailed tutorial with R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-temporal-network-analysis-introduction-methods/";
            },},{id: "publications-transferring-effective-learning-strategies-across-learning-contexts-matters-a-study-in-problem-based-learning",
          title: 'Transferring effective learning strategies across learning contexts matters: A study in problem-based learning...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-transferring-effective-learning-strategies-across/";
            },},{id: "publications-when-how-and-for-whom-changes-in-engagement-happen-a-transition-analysis-of-instructional-variables",
          title: 'When, how and for whom changes in engagement happen: A transition analysis of...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-saqr-when-whom-changes-engagement-happen/";
            },},{id: "publications-an-introduction-and-tutorial-to-model-based-clustering-in-education-via-gaussian-mixture-modelling",
          title: 'An introduction and tutorial to model-based clustering in education via Gaussian mixture modelling...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-scrucca-introduction-tutorial-model-based-clustering/";
            },},{id: "publications-site-spotlight-article-understanding-emotional-behavior-with-learning-analytics-to-support-pre-service-teachers-learning-in-challenging-content-area",
          title: 'SITE SPOTLIGHT ARTICLE: Understanding Emotional Behavior with Learning Analytics to Support Pre-service Teachers’...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-sointu-site-spotlight-article-understanding-emotional/";
            },},{id: "publications-affective-states-and-regulation-of-learning-during-socio-emotional-interactions-in-secondary-school-collaborative-groups",
          title: 'Affective states and regulation of learning during socio‐emotional interactions in secondary school collaborative...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2023-tormanen-affective-states-regulation-learning-during/";
            },},{id: "publications-how-a-learning-analytics-dashboard-intervention-influences-the-dynamics-of-students-learning-behavior",
          title: 'How a Learning Analytics Dashboard Intervention Influences the Dynamics of Students’ Learning Behavior...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-akcapinar-learning-analytics-dashboard-intervention-influences/";
            },},{id: "publications-a-systematic-literature-review-of-empirical-research-on-chatgpt-in-education",
          title: 'A systematic literature review of empirical research on ChatGPT in education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-albadarin-systematic-literature-review-empirical-research/";
            },},{id: "publications-trends-on-communication-educational-assessment-educational-innovation-identity-smart-learning-and-doctoral-consortium-at-teem-2023",
          title: 'Trends on Communication, Educational Assessment, Educational Innovation, Identity, Smart Learning, and Doctoral Consortium...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-amofilva-trends-communication-educational-assessment-educational/";
            },},{id: "publications-prospects-in-the-field-of-learning-and-individual-differences-examining-the-past-to-forecast-the-future-using-bibliometrics",
          title: 'Prospects in the field of learning and individual differences: Examining the past to...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-bobrowicz-prospects-field-learning-individual-differences/";
            },},{id: "publications-the-temporal-dynamics-of-procrastination-and-its-impact-on-academic-performance-the-case-of-a-task-oriented-programming-course",
          title: 'The Temporal Dynamics of Procrastination and its Impact on Academic Performance: The Case...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-conde-temporal-dynamics-procrastination-impact-academic/";
            },},{id: "publications-assessment-of-accessibility-in-virtual-laboratories-a-systematic-review",
          title: 'Assessment of accessibility in virtual laboratories: a systematic review',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-deriba-assessment-accessibility-virtual-laboratories-systematic/";
            },},{id: "publications-capturing-the-sequential-pattern-of-students-interactions-in-computer-supported-collaborative-learning",
          title: 'Capturing the Sequential Pattern of Students’ Interactions in Computer-Supported Collaborative Learning',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-elmoazen-capturing-sequential-pattern-students-interactions/";
            },},{id: "publications-sequence-analysis-and-process-mining-perspectives-to-goal-setting-what-distinguishes-business-students-with-high-and-low-self-efficacy-beliefs",
          title: 'Sequence analysis and process mining perspectives to goal setting: What distinguishes business students...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-heikkinen-sequence-analysis-process-mining-perspectives/";
            },},{id: "publications-a-modern-approach-to-transition-analysis-and-process-mining-with-markov-models-in-education",
          title: 'A Modern Approach to Transition Analysis and Process Mining with Markov Models in...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-helske-modern-approach-transition-analysis-process/";
            },},{id: "publications-community-detection-in-learning-networks-using-r",
          title: 'Community Detection in Learning Networks Using R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-hernandezgarcia-community-detection-learning-networks-using/";
            },},{id: "publications-mapping-the-topics-trends-and-themes-of-education-technology-in-legal-education-with-topic-modeling-and-network-analysis",
          title: 'Mapping the Topics, Trends, and Themes of Education Technology in Legal Education with...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-huhta-mapping-topics-trends-themes-education/";
            },},{id: "publications-a-scoping-review-of-idiographic-research-in-education-too-little-but-not-too-late",
          title: 'A Scoping Review of Idiographic Research in Education: Too Little, But Not Too...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-ito-scoping-review-idiographic-research-education/";
            },},{id: "publications-structural-equation-modeling-with-r-for-education-scientists",
          title: 'Structural Equation Modeling with R for Education Scientists',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-jongerling-structural-equation-modeling-education-scientists/";
            },},{id: "publications-predictive-modelling-in-learning-analytics-a-machine-learning-approach-in-r",
          title: 'Predictive Modelling in Learning Analytics: A Machine Learning Approach in R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-jovanovic-predictive-modelling-learning-analytics-machine/";
            },},{id: "publications-exploring-the-dynamics-and-trends-of-knowledge-exchange-a-structured-topic-modeling-approach-of-the-cscl-conference-proceedings",
          title: 'Exploring the Dynamics and Trends of Knowledge Exchange: A Structured Topic Modeling Approach...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-kaliisa-exploring-dynamics-trends-knowledge-exchange/";
            },},{id: "publications-have-learning-analytics-dashboards-lived-up-to-the-hype-a-systematic-review-of-impact-on-students-39-achievement-motivation-participation-and-attitude",
          title: 'Have Learning Analytics Dashboards Lived Up to the Hype? A Systematic Review of...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-kaliisa-learning-analytics-dashboards-lived-hype/";
            },},{id: "publications-editorial-diversity-in-the-social-sciences-researching-digital-education-in-and-for-the-global-south",
          title: 'Editorial: Diversity in the social sciences: researching digital education in and for the...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-kilanioti-editorial-diversity-social-sciences-researching/";
            },},{id: "publications-large-language-models-in-higher-education-perspectives-opportunities-and-limitations",
          title: 'Large Language Models in Higher Education - Perspectives, Opportunities and Limitations',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-kisic-large-language-models-higher-education/";
            },},{id: "publications-an-r-approach-to-data-cleaning-and-wrangling-for-education-research",
          title: 'An R Approach to Data Cleaning and Wrangling for Education Research',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-kopra-approach-data-cleaning-wrangling-education/";
            },},{id: "publications-augmenting-ai-with-curated-learning-analytics-literature-building-and-initial-exploration-of-a-local-rag-for-supporting-teachers-larag",
          title: 'Augmenting AI with Curated Learning Analytics Literature: Building and Initial Exploration of a...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-augmenting-curated-learning-analytics-literature/";
            },},{id: "publications-a-broad-collection-of-datasets-for-educational-research-training-and-application",
          title: 'A Broad Collection of Datasets for Educational Research Training and Application',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-broad-collection-datasets-educational-research/";
            },},{id: "publications-capturing-the-wealth-and-diversity-of-learning-processes-with-learning-analytics-methods",
          title: 'Capturing the Wealth and Diversity of Learning Processes with Learning Analytics Methods',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-capturing-wealth-diversity-learning-processes/";
            },},{id: "publications-how-the-dynamics-of-engagement-explain-the-momentum-of-achievement-and-the-inertia-of-disengagement-a-complex-systems-theory-approach",
          title: 'How the dynamics of engagement explain the momentum of achievement and the inertia...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-dynamics-engagement-explain-momentum-achievement/";
            },},{id: "publications-the-dynamics-of-students-playing-profiles-in-a-programming-educational-escape-room",
          title: 'The Dynamics of Students’ Playing Profiles in a Programming Educational Escape Room',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-dynamics-students-playing-profiles-programming/";
            },},{id: "publications-modeling-the-dynamics-of-longitudinal-processes-in-education-a-tutorial-with-r-for-the-vasstra-method",
          title: 'Modeling the Dynamics of Longitudinal Processes in Education. A Tutorial with R for...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-modeling-dynamics-longitudinal-processes-education/";
            },},{id: "publications-multi-channel-sequence-analysis-in-educational-research-an-introduction-and-tutorial-with-r",
          title: 'Multi-Channel Sequence Analysis in Educational Research: An Introduction and Tutorial with R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-multi-channel-sequence-analysis-educational/";
            },},{id: "publications-tracking-students-progress-in-educational-escape-rooms-through-a-sequence-analysis-inspired-dashboard",
          title: 'Tracking Students’ Progress in Educational Escape Rooms Through a Sequence Analysis Inspired Dashboard...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-tracking-students-progress-educational-escape/";
            },},{id: "publications-visualizing-and-reporting-educational-data-with-r",
          title: 'Visualizing and Reporting Educational Data with R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-visualizing-reporting-educational-data/";
            },},{id: "publications-the-why-the-how-and-the-when-of-educational-process-mining-in-r",
          title: 'The Why, the How and the When of Educational Process Mining in R...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-lopezpernas-why-when-educational-process-mining/";
            },},{id: "publications-digital-natives-in-the-scientific-literature-a-topic-modeling-approach",
          title: 'Digital natives in the scientific literature: A topic modeling approach',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-mertala-digital-natives-scientific-literature-topic/";
            },},{id: "publications-dissimilarity-based-cluster-analysis-of-educational-data-a-comparative-tutorial-using-r",
          title: 'Dissimilarity-Based Cluster Analysis of Educational Data: A Comparative Tutorial Using R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-murphy-dissimilarity-based-cluster-analysis-educational/";
            },},{id: "publications-a-systematic-review-of-literature-reviews-on-artificial-intelligence-in-education-aied-a-roadmap-to-a-future-research-agenda",
          title: 'A systematic review of literature reviews on artificial intelligence in education (AIED): a...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-mustafa-systematic-review-literature-reviews-artificial/";
            },},{id: "publications-an-xai-social-media-platform-for-teaching-k-12-students-ai-driven-profiling-clustering-and-engagement-based-recommending",
          title: 'An XAI Social Media Platform for Teaching K-12 Students AI-Driven Profiling, Clustering, and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-pope-xai-social-media-platform-teaching/";
            },},{id: "publications-more-data-is-not-always-better-data-an-exploratory-learning-analytics-study-in-early-prediction",
          title: 'More Data is not Always Better Data: An Exploratory Learning Analytics Study in...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-rai-more-data-always-better-data/";
            },},{id: "publications-capturing-where-the-learning-process-takes-place-a-person-specific-and-person-centered-primer",
          title: 'Capturing where the learning process takes place: A person-specific and person-centered primer',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-capturing-where-learning-process-takes/";
            },},{id: "publications-complex-dynamic-systems-in-education-beyond-the-static-the-linear-and-the-causal-reductionism",
          title: 'Complex Dynamic Systems in Education: Beyond the Static, the Linear and the Causal...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-complex-dynamic-systems-education-beyond/";
            },},{id: "publications-group-level-analysis-of-engagement-poorly-reflects-individual-students-processes-why-we-need-idiographic-learning-analytics",
          title: 'Group-level analysis of engagement poorly reflects individual students’ processes: Why we need idiographic...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-group-level-analysis-engagement-poorly/";
            },},{id: "publications-how-group-structure-members-39-interactions-and-teacher-facilitation-explain-the-emergence-of-roles-in-collaborative-learning",
          title: 'How group structure, members&amp;#39; interactions and teacher facilitation explain the emergence of roles...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-group-structure-members-interactions-teacher/";
            },},{id: "publications-idiographic-artificial-intelligence-to-explain-students-39-self-regulation-toward-precision-education",
          title: 'Idiographic artificial intelligence to explain students&amp;#39; self-regulation: Toward precision education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-idiographic-artificial-intelligence-explain-students/";
            },},{id: "publications-learning-analytics-methods-and-tutorials",
          title: 'Learning Analytics Methods and Tutorials',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-learning-analytics-methods-tutorials/";
            },},{id: "publications-mapping-the-self-in-self-regulation-using-complex-dynamic-systems-approach",
          title: 'Mapping the self in self‐regulation using complex dynamic systems approach',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-mapping-self-self-regulation-using/";
            },},{id: "publications-momentary-emotions-emerge-and-evolve-differently-yet-are-surprisingly-stable-within-students",
          title: 'Momentary emotions emerge and evolve differently, yet are surprisingly stable within students',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-momentary-emotions-emerge-evolve-differently/";
            },},{id: "publications-a-multimethod-synthesis-of-covid-19-education-research-the-tightrope-between-covidization-and-meaningfulness",
          title: 'A multimethod synthesis of Covid-19 education research: the tightrope between covidization and meaningfulness...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-multimethod-synthesis-covid-education-research/";
            },},{id: "publications-preface",
          title: 'Preface',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-preface/";
            },},{id: "publications-psychological-networks-a-modern-approach-to-analysis-of-learning-and-complex-learning-processes",
          title: 'Psychological Networks: A Modern Approach to Analysis of Learning and Complex Learning Processes...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-psychological-networks-modern-approach-analysis/";
            },},{id: "publications-sequence-analysis-in-education-principles-technique-and-tutorial-with-r",
          title: 'Sequence Analysis in Education: Principles, Technique, and Tutorial with R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-sequence-analysis-education-principles-technique/";
            },},{id: "publications-social-network-analysis-a-primer-a-guide-and-a-tutorial-in-r",
          title: 'Social Network Analysis: A Primer, a Guide and a Tutorial in R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-social-network-analysis-primer-guide/";
            },},{id: "publications-temporal-network-analysis-introduction-methods-and-analysis-with-r",
          title: 'Temporal Network Analysis: Introduction, Methods and Analysis with R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-temporal-network-analysis-introduction-methods/";
            },},{id: "publications-transition-network-analysis-a-novel-framework-for-modeling-visualizing-and-identifying-the-temporal-patterns-of-learners-and-learning-processes",
          title: 'Transition Network Analysis: A Novel Framework for Modeling, Visualizing, and Identifying the Temporal...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-transition-network-analysis-novel-framework/";
            },},{id: "publications-why-educational-research-needs-a-complex-system-revolution-that-embraces-individual-differences-heterogeneity-and-uncertainty",
          title: 'Why Educational Research Needs a Complex System Revolution that Embraces Individual Differences, Heterogeneity,...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-why-educational-research-needs-complex/";
            },},{id: "publications-why-explainable-ai-may-not-be-enough-predictions-and-mispredictions-in-decision-making-in-education",
          title: 'Why explainable AI may not be enough: predictions and mispredictions in decision making...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-why-explainable-may-enough-predictions/";
            },},{id: "publications-why-learning-and-teaching-learning-analytics-is-hard-an-experience-from-a-real-life-la-course-using-la-methods",
          title: 'Why Learning and Teaching Learning Analytics is Hard: An Experience from a Real-Life...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-saqr-why-learning-teaching-learning-analytics/";
            },},{id: "publications-charting-the-evolution-and-future-of-conversational-agents-a-research-agenda-along-five-waves-and-new-frontiers",
          title: 'Charting the Evolution and Future of Conversational Agents: A Research Agenda Along Five...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-schobel-charting-evolution-future-conversational-agents/";
            },},{id: "publications-an-introduction-and-r-tutorial-to-model-based-clustering-in-education-via-latent-profile-analysis",
          title: 'An Introduction and R Tutorial to Model-Based Clustering in Education via Latent Profile...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-scrucca-introduction-tutorial-model-based-clustering/";
            },},{id: "publications-creatively-opening-the-constraints-of-learning-analytics-in-inclusive-elementary-school-level-steam-education",
          title: 'Creatively Opening the Constraints of Learning Analytics in Inclusive, Elementary School-Level STEAM Education...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-sointu-creatively-opening-constraints-learning-analytics/";
            },},{id: "publications-getting-started-with-r-for-education-research",
          title: 'Getting Started with R for Education Research',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-tikka-getting-started-education-research/";
            },},{id: "publications-introductory-statistics-with-r-for-educational-researchers",
          title: 'Introductory Statistics with R for Educational Researchers',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-tikka-introductory-statistics-educational-researchers/";
            },},{id: "publications-factor-analysis-in-education-research-using-r",
          title: 'Factor Analysis in Education Research Using R',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2024-vogelsmeier-factor-analysis-education-research-using/";
            },},{id: "publications-user-centric-evaluation-of-genai-alignment-and-recommendations-based-on-predictive-learning-analytics",
          title: 'User-centric Evaluation of GenAI Alignment and Recommendations based on Predictive Learning Analytics',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-ahmed-user-centric-evaluation-genai-alignment/";
            },},{id: "publications-dynamics-of-self-regulated-learning-the-effectiveness-of-students-strategies-across-course-periods",
          title: 'Dynamics of self-regulated learning: The effectiveness of students’ strategies across course periods',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-cristea-dynamics-self-regulated-learning-effectiveness/";
            },},{id: "publications-exploring-the-role-of-ai-in-enhancing-accessibility-in-user-interface-design-a-qualitative-study-of-student-experiences",
          title: 'Exploring the Role of AI in Enhancing Accessibility in User Interface Design: A...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-deriba-exploring-role-enhancing-accessibility-user/";
            },},{id: "publications-capturing-temporal-pathways-of-collaborative-roles-a-multilayered-analytical-approach-using-community-of-inquiry",
          title: 'Capturing temporal pathways of collaborative roles: A multilayered analytical approach using community of...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-elmoazen-capturing-temporal-pathways-collaborative-roles/";
            },},{id: "publications-the-interplay-of-engagement-and-learning-regulation-in-online-learning",
          title: 'The Interplay of Engagement and Learning Regulation in Online Learning',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-heikkinen-interplay-engagement-learning-regulation-online/";
            },},{id: "publications-a-longitudinal-study-of-interplay-between-student-engagement-and-self-regulation",
          title: 'A longitudinal study of interplay between student engagement and self-regulation',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-heikkinen-longitudinal-study-interplay-between-student/";
            },},{id: "publications-a-typology-of-metagamers-identifying-player-types-based-on-beyond-the-game-activities",
          title: 'A Typology of Metagamers: Identifying Player Types Based on Beyond the Game Activities...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-kahila-typology-metagamers-identifying-player-types/";
            },},{id: "publications-a-topical-review-of-research-in-computer-supported-collaborative-learning-questions-and-possibilities",
          title: 'A Topical Review of Research in Computer-Supported Collaborative Learning: Questions and Possibilities',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-kaliisa-topical-review-research-computer-supported/";
            },},{id: "publications-behavioural-transitions-in-team-teaching",
          title: 'Behavioural transitions in team teaching',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-liu-behavioural-transitions-team-teaching/";
            },},{id: "publications-capturing-the-process-of-students-39-ai-interactions-when-creating-and-learning-complex-network-structures",
          title: 'Capturing the Process of Students&amp;#39; AI Interactions When Creating and Learning Complex Network...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-lopezpernas-capturing-process-students-interactions-when/";
            },},{id: "publications-chatgptscraper-a-tool-for-retrieving-student-ai-interactions",
          title: 'chatgptscrapeR: A Tool for Retrieving Student-AI Interactions',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-lopezpernas-chatgptscraper-tool-retrieving-student-interactions/";
            },},{id: "publications-the-dynamics-of-the-self-regulation-process-in-student-ai-interactions",
          title: 'The dynamics of the self-regulation process in student-AI interactions',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-lopezpernas-dynamics-self-regulation-process-student/";
            },},{id: "publications-frequencies-and-averages-miss-the-point-of-srl-evolution-a-complex-dynamic-systems-approach",
          title: 'Frequencies and Averages Miss the Point of SRL Evolution: A Complex Dynamic Systems...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-lopezpernas-frequencies-averages-miss-point-srl/";
            },},{id: "publications-mapping-computer-engineering-education-research-a-topic-analysis",
          title: 'Mapping Computer Engineering Education Research: A Topic Analysis',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-lopezpernas-mapping-computer-engineering-education-research/";
            },},{id: "publications-three-shades-of-self-regulation-with-unique-complex-dynamics-drivers-and-targets-for-intervention",
          title: 'Three shades of self‐regulation with unique complex dynamics, drivers and targets for intervention...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-lopezpernas-three-shades-self-regulation-unique/";
            },},{id: "publications-learning-together-modeling-the-process-of-student-ai-interactions-when-generating-learning-resources",
          title: 'Learning Together: Modeling the Process of Student-AI Interactions When Generating Learning Resources',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-misiejuk-learning-together-modeling-process-student/";
            },},{id: "publications-mapping-the-landscape-of-generative-artificial-intelligence-in-learning-analytics",
          title: 'Mapping the Landscape of Generative Artificial Intelligence in Learning Analytics',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-misiejuk-mapping-landscape-generative-artificial-intelligence/";
            },},{id: "publications-human-ai-collaboration-or-academic-misconduct-measuring-ai-use-in-student-writing-through-stylometric-evidence",
          title: 'Human-AI Collaboration or Academic Misconduct? Measuring AI Use in Student Writing Through Stylometric...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-oliveira-human-collaboration-academic-misconduct-measuring/";
            },},{id: "publications-participatory-design-of-educational-escape-room-video-games-a-media-literacy-case-study",
          title: 'Participatory Design of Educational Escape Room Video Games: A Media Literacy Case Study...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-participatory-design-educational-escape-room/";
            },},{id: "publications-an-xai-social-media-platform-for-teaching-k-12-students-ai-driven-profiling-clustering-and-engagement-based-recommending",
          title: 'An XAI Social Media Platform for Teaching K-12 Students AI-Driven Profiling, Clustering, and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-pope-xai-social-media-platform-teaching/";
            },},{id: "publications-changes-in-online-engagement-at-the-within-person-level-profiles-dynamics-and-association-with-achievement",
          title: 'Changes in online engagement at the within-person level, profiles, dynamics and association with...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-saqr-changes-online-engagement-within-person/";
            },},{id: "publications-frequency-transition-network-analysis-ftna",
          title: 'Frequency Transition Network Analysis (FTNA)',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-saqr-frequency-transition-network-analysis-ftna/";
            },},{id: "publications-human-ai-collaboration-or-obedient-and-often-clueless-ai-in-instruct-serve-repeat-dynamics",
          title: 'Human-AI collaboration or obedient and often clueless AI in instruct, serve, repeat dynamics?...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-saqr-human-collaboration-obedient-often-clueless/";
            },},{id: "publications-preface",
          title: 'Preface',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-saqr-preface/";
            },},{id: "publications-transition-network-analysis-a-novel-framework-for-modeling-visualizing-and-identifying-the-temporal-patterns-of-learners-and-learning-processes",
          title: 'Transition Network Analysis: A Novel Framework for Modeling, Visualizing, and Identifying the Temporal...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-saqr-transition-network-analysis-novel-framework/";
            },},{id: "publications-tna-an-r-package-for-transition-network-analysis",
          title: 'tna: An R Package for Transition Network Analysis',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-tikka-tna-package-transition-network-analysis/";
            },},{id: "publications-emotional-dynamics-and-regulation-in-collaborative-learning",
          title: 'Emotional dynamics and regulation in collaborative learning',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-tormanen-emotional-dynamics-regulation-collaborative-learning/";
            },},{id: "publications-elementary-and-secondary-school-teachers-perceptions-of-learning-analytics-a-qualitative-approach",
          title: 'Elementary and Secondary School Teachers’ Perceptions of Learning Analytics: A Qualitative Approach',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-valtonen-elementary-secondary-school-teachers-perceptions/";
            },},{id: "publications-delving-into-the-psychology-of-machines-exploring-the-structure-of-self-regulated-learning-via-llm-generated-survey-responses",
          title: 'Delving into the psychology of Machines: Exploring the structure of self-regulated learning via...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-vdevogelsmeier-delving-into-psychology-machines-exploring/";
            },},{id: "publications-delving-into-the-psychology-of-machines-exploring-the-structure-of-self-regulated-learning-via-llm-generated-survey-responses",
          title: 'Delving Into the Psychology of Machines: Exploring the Structure of Self-Regulated Learning via...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-vogelsmeier-delving-into-psychology-machines-exploring/";
            },},{id: "publications-unlocking-the-potential-of-artificial-intelligence-in-improving-learning-achievement-in-blended-learning-a-meta-analysis",
          title: 'Unlocking the potential of artificial intelligence in improving learning achievement in blended learning:...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-wu-unlocking-potential-artificial-intelligence-improving/";
            },},{id: "publications-capturing-the-temporal-dynamics-of-learner-interactions-in-moocs-a-comprehensive-approach-with-longitudinal-and-inferential-network-analysis",
          title: 'Capturing The Temporal Dynamics of Learner Interactions In Moocs: A Comprehensive Approach With...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-xiang-capturing-temporal-dynamics-learner-interactions/";
            },},{id: "publications-mapping-soft-skills-and-further-research-directions-for-higher-education-a-bibliometric-approach-with-structural-topic-modelling",
          title: 'Mapping soft skills and further research directions for higher education: a bibliometric approach...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2025-zahn-mapping-soft-skills-further-research/";
            },},{id: "publications-does-the-impact-of-genai-persist-in-learning-comparing-ai-and-instructor-feedback-on-accessibility",
          title: 'Does the impact of GenAI persist in learning? comparing AI and instructor feedback...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-deriba-impact-genai-persist-learning-comparing/";
            },},{id: "publications-a-complex-system-approach-to-decode-different-learning-patterns-in-programming-between-majors-score-engagement-and-problem-solving-efficiency",
          title: 'A complex system approach to decode different learning patterns in programming between majors:...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-gao-complex-system-approach-decode-different/";
            },},{id: "publications-how-does-artificial-intelligence-compare-to-human-feedback-a-meta-analysis-of-performance-feedback-perception-and-learning-dispositions",
          title: 'How does artificial intelligence compare to human feedback? A meta-analysis of performance, feedback...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-kaliisa-artificial-intelligence-compare-human-feedback/";
            },},{id: "publications-ai-explainable-ai-and-evaluative-ai-informed-data-driven-decision-making-in-education",
          title: 'AI, Explainable AI and Evaluative AI: Informed Data-Driven Decision-Making in Education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-explainable-evaluative-informed-data-driven/";
            },},{id: "publications-llms-for-explainable-artificial-intelligence-automating-natural-language-explanations-of-predictive-analytics-models",
          title: 'LLMs for Explainable Artificial Intelligence: Automating Natural Language Explanations of Predictive Analytics Models...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-llms-explainable-artificial-intelligence-automating/";
            },},{id: "publications-mining-patterns-and-clusters-with-transition-network-analysis-a-heterogeneity-approach",
          title: 'Mining Patterns and Clusters with Transition Network Analysis: A Heterogeneity Approach',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-mining-patterns-clusters-transition-network/";
            },},{id: "publications-from-play-to-pedagogy-a-structured-topic-modeling-analysis-of-escape-rooms-research",
          title: 'From Play to Pedagogy: A Structured Topic Modeling Analysis of Escape Rooms Research...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-play-pedagogy-structured-topic-modeling/";
            },},{id: "publications-the-three-levels-of-analysis-variable-centered-person-centered-and-person-specific-analysis-in-education",
          title: 'The Three Levels of Analysis: Variable-centered, Person-centered and Person-specific Analysis in Education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-three-levels-analysis-variable-centered/";
            },},{id: "publications-unpacking-learning-in-the-age-of-ai-bridging-ai-complexity-and-precision-education",
          title: 'Unpacking Learning in the Age of AI: Bridging AI, Complexity, and Precision Education...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-unpacking-learning-age-bridging-complexity/";
            },},{id: "publications-using-bert-like-language-models-for-automated-discourse-coding-a-primer-and-tutorial",
          title: 'Using BERT-like Language Models for Automated Discourse Coding: A Primer and Tutorial',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-lopezpernas-using-bert-like-language-models/";
            },},{id: "publications-topical-analysis-of-programming-education-research-literature",
          title: 'Topical Analysis of Programming Education Research Literature',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-malmi-topical-analysis-programming-education-research/";
            },},{id: "publications-expanding-the-quantitative-ethnography-toolkit-with-transition-network-analysis-exploring-methodological-synergies-and-boundaries",
          title: 'Expanding the Quantitative Ethnography Toolkit with Transition Network Analysis: Exploring Methodological Synergies and...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-misiejuk-expanding-quantitative-ethnography-toolkit-transition/";
            },},{id: "publications-an-introduction-to-large-language-models-in-education",
          title: 'An Introduction to Large Language Models in Education',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-oliveira-introduction-large-language-models-education/";
            },},{id: "publications-advanced-learning-analytics-methods",
          title: 'Advanced Learning Analytics Methods',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-advanced-learning-analytics-methods/";
            },},{id: "publications-artificial-intelligence-using-machine-learning-to-classify-students-and-predict-low-achievers",
          title: 'Artificial Intelligence: Using Machine Learning to Classify Students and Predict Low Achievers',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-artificial-intelligence-using-machine-learning-2/";
            },},{id: "publications-artificial-intelligence-using-machine-learning-to-predict-students-performance",
          title: 'Artificial Intelligence: Using Machine Learning to Predict Students’ Performance',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-artificial-intelligence-using-machine-learning/";
            },},{id: "publications-automating-individualized-machine-learning-and-ai-prediction-using-automl-the-case-of-idiographic-predictions",
          title: 'Automating Individualized Machine Learning and AI Prediction Using AutoML: The Case of Idiographic...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-automating-individualized-machine-learning-prediction/";
            },},{id: "publications-capturing-the-breadth-and-dynamics-of-the-temporal-processes-with-frequency-transition-network-analysis-a-primer-and-tutorial",
          title: 'Capturing the Breadth and Dynamics of the Temporal Processes with Frequency Transition Network...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-capturing-breadth-dynamics-temporal-processes/";
            },},{id: "publications-complex-dynamic-systems-in-education-beyond-the-static-the-linear-and-the-causal-reductionism",
          title: 'Complex Dynamic Systems in Education: Beyond the Static, the Linear and the Causal...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-complex-dynamic-systems-education-beyond/";
            },},{id: "publications-explainable-artificial-intelligence-in-education-a-tutorial-for-identifying-the-variables-that-matter",
          title: 'Explainable Artificial Intelligence in Education: A Tutorial for Identifying the Variables that Matter...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-explainable-artificial-intelligence-education-tutorial/";
            },},{id: "publications-idiographic-networks-a-tutorial-on-graphical-vector-autoregression-and-unified-structural-equation-modeling",
          title: 'Idiographic Networks: A Tutorial on Graphical Vector Autoregression and Unified Structural Equation Modeling...',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-idiographic-networks-tutorial-graphical-vector/";
            },},{id: "publications-individualized-analytics-within-person-and-idiographic-analysis",
          title: 'Individualized Analytics: Within-Person and Idiographic Analysis',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-individualized-analytics-within-person-idiographic/";
            },},{id: "publications-individualized-explainable-artificial-intelligence-a-tutorial-for-identifying-local-and-individual-predictions",
          title: 'Individualized Explainable Artificial Intelligence: A Tutorial For Identifying Local and Individual Predictions',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-individualized-explainable-artificial-intelligence-tutorial/";
            },},{id: "publications-mapping-relational-dynamics-with-transition-network-analysis-a-primer-and-tutorial",
          title: 'Mapping Relational Dynamics with Transition Network Analysis: A Primer and Tutorial',
          description: "",
          section: "Publications",handler: () => {
              window.location.href = "/publication/2026-saqr-mapping-relational-dynamics-transition-network/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6D%6F%68%61%6D%6D%65%64.%73%61%71%72@%75%65%66.%66%69", "_blank");
        },
      },{
        id: 'social-acm',
        title: 'ACM DL',
        section: 'Socials',
        handler: () => {
          window.open("https://dl.acm.org/profile/99659510490/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=U-O6R7YAAAAJ", "_blank");
        },
      },{
        id: 'social-dblp',
        title: 'DBLP',
        section: 'Socials',
        handler: () => {
          window.open("https://dblp.org/pid/248/4721.html", "_blank");
        },
      },{
        id: 'social-ieee',
        title: 'IEEE Xplore',
        section: 'Socials',
        handler: () => {
          window.open("https://ieeexplore.ieee.org/author/37088456911/", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/esaqr", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0001-5881-3109", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Mohammed-Saqr/", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=57193957679", "_blank");
        },
      },{
        id: 'social-semanticscholar',
        title: 'Semantic Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://www.semanticscholar.org/author/9637182", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/mohsaqr", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
