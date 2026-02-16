/**
 * pubfilter.js — Word cloud, keyword filtering, and text search for /research/
 */
(function () {
  "use strict";

  var cards = document.querySelectorAll(".pub-card");
  var yearGroups = document.querySelectorAll(".pub-year-group");
  var searchInput = document.getElementById("pub-search");
  var activeFilterEl = document.getElementById("active-filter");
  var activeKeywordLabel = document.getElementById("active-keyword-label");
  var filterCountEl = document.getElementById("filter-count");
  var cloudContainer = document.getElementById("keyword-cloud");
  var chipsContainer = document.getElementById("keyword-chips-inner");

  var activeKeyword = null;
  var searchTerm = "";

  /** Read ?keyword= from URL */
  function getKeywordFromURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get("keyword") || null;
  }

  /** Update URL without reload */
  function setKeywordInURL(keyword) {
    var url = new URL(window.location);
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.history.replaceState({}, "", url);
  }

  /** Toggle keyword filter */
  function setFilter(keyword) {
    activeKeyword = (activeKeyword === keyword) ? null : keyword;
    setKeywordInURL(activeKeyword);
    applyFilters();
  }

  /** Apply filters: show/hide cards and year groups */
  function applyFilters() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var matchesKeyword = true;
      var matchesSearch = true;

      if (activeKeyword) {
        var cardKeywords = (card.getAttribute("data-keywords") || "").split(" ");
        matchesKeyword = cardKeywords.indexOf(activeKeyword) !== -1;
        // Also match keyword text in title/abstract
        if (!matchesKeyword) {
          var searchable = card.getAttribute("data-searchable") || "";
          var keywordText = activeKeyword.replace(/-/g, " ");
          matchesKeyword = searchable.indexOf(keywordText) !== -1;
        }
      }

      if (searchTerm) {
        var searchable = card.getAttribute("data-searchable") || "";
        matchesSearch = searchable.indexOf(searchTerm) !== -1;
      }

      if (matchesKeyword && matchesSearch) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Hide year groups with no visible cards
    yearGroups.forEach(function (group) {
      var hasVisible = false;
      group.querySelectorAll(".pub-card").forEach(function (c) {
        if (c.style.display !== "none") hasVisible = true;
      });
      group.style.display = hasVisible ? "" : "none";
    });

    // Highlight active chips (browse-all + per-card)
    document.querySelectorAll(".keyword-chip").forEach(function (chip) {
      chip.classList.toggle("active", chip.getAttribute("data-keyword") === activeKeyword);
    });

    // Update active filter display
    if (activeKeyword) {
      activeFilterEl.style.display = "";
      activeKeywordLabel.textContent = activeKeyword.replace(/-/g, " ");
      filterCountEl.textContent = visibleCount + " publication" + (visibleCount !== 1 ? "s" : "");
    } else {
      activeFilterEl.style.display = "none";
    }
  }

  /** Build keyword chips in the Browse All section */
  function buildChips() {
    if (!chipsContainer || !window.keywordData) return;
    chipsContainer.innerHTML = window.keywordData.map(function (d) {
      return '<a href="?keyword=' + d[2] + '" class="keyword-chip badge rounded-pill" data-keyword="' + d[2] + '">' +
        d[0] + ' <span class="text-muted" style="font-size:0.8em">(' + d[1] + ')</span></a>';
    }).join(" ");
  }

  /** Attach click handlers to all .keyword-chip elements */
  function attachChipHandlers() {
    document.querySelectorAll(".keyword-chip").forEach(function (chip) {
      chip.addEventListener("click", function (e) {
        e.preventDefault();
        setFilter(this.getAttribute("data-keyword"));
      });
    });
  }

  /** Umbrella keyword slugs — these are kept in the cloud */
  var umbrellaSlugs = new Set([
    "network-methods", "sequence-process-methods",
    "artificial-intelligence", "bibliometrics-scientometrics"
  ]);

  /** Umbrella member keywords — shown in Browse All but hidden from word cloud */
  var umbrellaMembers = new Set([
    // Network methods members
    "social-network-analysis", "network-analysis", "transition-network-analysis",
    "network-science", "epistemic-network-analysis", "psychological-networks",
    "temporal-networks", "idiographic-network-analysis", "partial-correlation-networks",
    "semantic-networks", "social-networks", "social-networking", "social-networking-sites",
    "community-detection", "network-configurations", "graphical-gaussian-models",
    "graphical-vector-autoregression", "siena", "tergm", "quantitative-ethnography",
    "information-exchange-metrics", "social-capital", "centrality-measures",
    "interaction-analysis", "epistemic-networks", "panel-var",
    // Sequence & process methods members
    "sequence-analysis", "sequence-mining", "process-mining",
    "stochastic-process-mining", "multichannel-sequence-analysis",
    "multi-channel-longitudinal-analysis", "multi-channel-clustering",
    "markov-models", "hidden-markov-models", "mixture-markov-models",
    "recurrence-quantification-analysis", "bupaverse", "pattern-analysis",
    "survival-analysis", "strategy-transition",
    // Artificial Intelligence members
    "machine-learning", "generative-ai",
    "large-language-models", "chatgpt", "explainable-ai", "dalex", "lime", "shap",
    "bert", "natural-language-processing", "automated-machine-learning",
    "human-ai-interaction", "conversational-agent", "chatbot", "prompt-engineering",
    "retrieval-augmented-generation-rag", "generative-ai-impact", "lm-studio",
    "classification", "predictive-modeling", "predictive-learning-analytics",
    "automated-feedback", "automated-assessment", "synthetic-data",
    "synthetic-data-generation", "voice-assistant", "educational-data-mining",
    "machine-learning-in-education", "artificial-intelligence-feedback",
    "teaching-augmentation", "human-feedback", "early-predictions", "predictive",
    // Bibliometrics & scientometrics members
    "science-mapping", "altmetrics",
    "impact-factor", "publication-trends", "citations", "country-productivity",
    "structured-topic-modeling", "open-access", "scientific-collaboration",
    "scientometric-analysis"
  ]);

  /** Color palette for the word cloud */
  var cloudColors = [
    "#2698BA", "#E07A5F", "#3D8B37", "#7B68AD",
    "#D4A843", "#4A6FA5", "#C05746", "#6B9080"
  ];

  /** Simple string hash for consistent color assignment */
  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  /** Initialize word cloud with wordcloud2.js */
  function initWordCloud() {
    if (!cloudContainer || typeof WordCloud === "undefined" || !window.keywordData) return;

    // Remove loading message
    var loading = document.getElementById("keyword-cloud-loading");
    if (loading) loading.remove();

    // Filter: count >= 2 AND not an umbrella member (umbrella itself stays)
    var filtered = window.keywordData.filter(function (d) {
      return d[1] >= 2 && !umbrellaMembers.has(d[2]);
    });
    // Deduplicate by slug: sum counts, keep name of highest-count entry
    var slugMap = {};
    filtered.forEach(function (d) {
      if (!slugMap[d[2]]) {
        slugMap[d[2]] = [d[0], d[1], d[2]];
      } else {
        slugMap[d[2]][1] += d[1];
        if (d[0].length > slugMap[d[2]][0].length) {
          slugMap[d[2]][0] = d[0];
        }
      }
    });
    var data = Object.values(slugMap);
    data.sort(function (a, b) { return b[1] - a[1]; });
    if (data.length === 0) return;

    var maxCount = data[0][1];
    var width = cloudContainer.offsetWidth || 800;

    var maxFont = width > 600 ? 56 : 38;
    var minFont = 13;

    WordCloud(cloudContainer, {
      list: data,
      gridSize: Math.round(8 * width / 1024),
      weightFactor: function (size) {
        var scaled = Math.pow(size / maxCount, 0.4);
        return Math.max(minFont, scaled * maxFont);
      },
      color: function (word) {
        return cloudColors[hashStr(word) % cloudColors.length];
      },
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      rotateRatio: 0,
      shuffle: false,
      backgroundColor: "transparent",
      click: function (item) {
        if (item) setFilter(item[2]);
      },
      hover: function (item) {
        cloudContainer.style.cursor = item ? "pointer" : "default";
      }
    });
  }

  // --- Initialize ---
  buildChips();
  attachChipHandlers();

  // Load wordcloud2.js from CDN, then render
  var wcScript = document.createElement("script");
  wcScript.src = "https://cdn.jsdelivr.net/npm/wordcloud@1.2.2/src/wordcloud2.js";
  wcScript.onload = initWordCloud;
  wcScript.onerror = function () {
    var loading = document.getElementById("keyword-cloud-loading");
    if (loading) loading.textContent = "";
    cloudContainer.style.height = "0";
  };
  document.head.appendChild(wcScript);

  // Apply initial filter from URL
  activeKeyword = getKeywordFromURL();
  if (activeKeyword) applyFilters();

  // Search handler
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Clear filter handler
  var clearBtn = document.getElementById("clear-filter");
  if (clearBtn) {
    clearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      activeKeyword = null;
      setKeywordInURL(null);
      applyFilters();
    });
  }
})();
