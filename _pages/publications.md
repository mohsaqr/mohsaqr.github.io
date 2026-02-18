---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->

<style>
.chord-container {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  position: relative;
}

.chord-container svg {
  width: 100%;
  height: auto;
  display: block;
  animation: chordFadeIn 0.6s ease-in;
}

@keyframes chordFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.chord-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--global-text-color);
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.85;
}

.chord-ribbon {
  fill-opacity: 0.6;
  transition: fill-opacity 0.25s;
  cursor: pointer;
}

.chord-ribbon.dimmed {
  fill-opacity: 0.06;
}

.chord-ribbon.highlighted {
  fill-opacity: 0.85;
}

.chord-arc {
  cursor: pointer;
  transition: opacity 0.25s;
}

.chord-arc.dimmed {
  opacity: 0.25;
}

.chord-arc-label {
  fill: var(--global-text-color);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
  transition: opacity 0.25s;
}

.chord-arc-label.dimmed {
  opacity: 0.2;
}

.chord-tooltip {
  position: fixed;
  background: var(--global-bg-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  font-size: 0.82rem;
  max-width: 280px;
  line-height: 1.45;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 50;
}

.chord-tooltip strong {
  display: block;
  margin-bottom: 0.15rem;
}

.chord-tooltip .tt-detail {
  color: var(--global-text-color);
  opacity: 0.7;
}

.chord-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1.2rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
}

.chord-legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--global-text-color);
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.chord-legend-item:hover {
  opacity: 0.7;
}

.chord-legend-swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.chord-note {
  text-align: center;
  margin-top: 1.2rem;
  font-size: 0.8rem;
  color: var(--global-text-color);
  opacity: 0.5;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .chord-container { max-width: 100%; }
  .chord-arc-label { font-size: 10px; }
  .chord-legend { gap: 0.35rem 0.8rem; }
  .chord-legend-item { font-size: 0.75rem; }
}
</style>

<div id="chord-diagram" class="chord-container"></div>
<div id="chord-tooltip" class="chord-tooltip"></div>
<div id="chord-legend" class="chord-legend"></div>

<p class="chord-intro">
This chord diagram maps the overlap between <strong>8 research interest areas</strong> derived from keyword metadata across {{ site.publications | size }} publications. Each arc around the circle represents one interest area — its angular width reflects the number of publications tagged to that area. Ribbons connecting two arcs show papers that belong to both areas simultaneously; thicker ribbons indicate stronger topical overlap. Hover over any ribbon for the exact co-occurrence count, or click an arc to navigate to that interest area's page.
</p>

<script>
window.pubKeywords = [
{% for pub in site.publications %}{% if pub.keywords %}{{ pub.keywords | jsonify }}{% unless forloop.last %},{% endunless %}
{% endif %}{% endfor %}];
</script>

<script src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js" integrity="sha256-1rA678n2xEx7x4cTZ5x4wpUCj6kUMZEZ5cxLSVSFWxw=" crossorigin="anonymous"></script>

<script>
(function() {

  var tooltip = document.getElementById("chord-tooltip");

  // --- Categories ---
  var categories = [
    {
      name: "Precision\nExplainable AI",
      shortName: "Precision Explainable AI",
      slug: "precision-xai",
      link: "/interests/precision-xai/",
      color: "#e63946",
      patterns: [
        "artificial intelligence", "explainable ai", "machine learning",
        "idiographic", "person-centered", "person-specific", "within-person",
        "predictive", "generative ai", "large language model",
        "precision education", "shap", "dalex", "lime",
        "natural language processing", "chatgpt", "chatbot",
        "human-ai", "n = 1", "heterogeneity", "individual differences",
        "personalized", "bert", "prompt engineering",
        "retrieval-augmented", "lm studio", "conversational agent",
        "voice assistant", "automated machine learning", "automated feedback",
        "automated assessment", "synthetic data"
      ]
    },
    {
      name: "Transition Network\nAnalysis",
      shortName: "Transition Network Analysis",
      slug: "transition-network-analysis",
      link: "/interests/transition-network-analysis/",
      color: "#457b9d",
      patterns: [
        "transition network", "markov model", "stochastic process",
        "process mining", "hidden markov", "mixture markov", "bupaverse"
      ]
    },
    {
      name: "Network Analysis\nin Education",
      shortName: "Network Analysis in Education",
      slug: "network-analysis",
      link: "/interests/network-analysis/",
      color: "#2a9d8f",
      patterns: [
        "network method", "social network", "network analysis",
        "epistemic network", "graphical gaussian", "network science",
        "centrality measure", "community detection", "network configuration",
        "quantitative ethnography", "semantic network", "siena", "tergm"
      ]
    },
    {
      name: "Temporal\nNetworks",
      shortName: "Temporal Networks",
      slug: "temporal-networks",
      link: "/interests/temporal-networks/",
      color: "#e9c46a",
      patterns: [
        "temporal network", "diffusion"
      ]
    },
    {
      name: "Complex\nSystems",
      shortName: "Complex Systems",
      slug: "complex-systems",
      link: "/interests/complex-systems/",
      color: "#f4a261",
      patterns: [
        "complex system", "psychological network", "partial correlation",
        "graphical vector autoregression", "panel var",
        "recurrence quantification"
      ]
    },
    {
      name: "Temporal &\nSequence Methods",
      shortName: "Temporal & Sequence Methods",
      slug: "temporal-methods",
      link: "/interests/temporal-methods/",
      color: "#a8dadc",
      patterns: [
        "sequence", "longitudinal", "temporality",
        "latent class", "latent profile", "trajectories",
        "strategy transition", "survival analysis",
        "multi-channel", "multichannel", "dissimilarity"
      ]
    },
    {
      name: "Learning\nAnalytics",
      shortName: "Learning Analytics",
      slug: "learning-analytics",
      link: "/interests/learning-analytics/",
      color: "#6a4c93",
      patterns: [
        "learning analytics", "educational data mining",
        "self-regulated", "collaborative learning",
        "computer-supported", "online learning",
        "problem-based", "multimodal learning", "engagement",
        "flipped classroom", "blended learning",
        "moocs", "distance education", "assessment analytics",
        "game-based learning", "gamification",
        "learning strategies", "learning tactics",
        "co-regulation", "socially shared regulation",
        "learning outcome", "learning performance",
        "academic achievement", "emotion regulation",
        "educational escape"
      ]
    },
    {
      name: "Scientometrics",
      shortName: "Scientometrics & Bibliometrics",
      slug: "scientometrics",
      link: "/interests/scientometrics/",
      color: "#b5838d",
      patterns: [
        "bibliometric", "scientometric", "science of science",
        "altmetric", "citation", "science mapping",
        "topic model", "structured topic", "impact factor",
        "open access", "publication trend", "scientific collaboration",
        "country productivity"
      ]
    }
  ];

  // --- Map publications to categories ---
  var n = categories.length;
  var matrix = [];
  var catCounts = new Array(n).fill(0);
  var i, j;

  for (i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
  }

  function matchCategory(kw) {
    var lower = kw.toLowerCase();
    var matched = [];
    for (var c = 0; c < n; c++) {
      var patterns = categories[c].patterns;
      for (var p = 0; p < patterns.length; p++) {
        if (lower.indexOf(patterns[p]) !== -1) {
          matched.push(c);
          break;
        }
      }
    }
    return matched;
  }

  var pubs = window.pubKeywords || [];
  pubs.forEach(function(kwList) {
    var catSet = {};
    kwList.forEach(function(kw) {
      var matches = matchCategory(kw);
      matches.forEach(function(idx) { catSet[idx] = true; });
    });
    var cats = Object.keys(catSet).map(Number);
    cats.forEach(function(ci) { catCounts[ci]++; });
    for (i = 0; i < cats.length; i++) {
      for (j = i + 1; j < cats.length; j++) {
        matrix[cats[i]][cats[j]]++;
        matrix[cats[j]][cats[i]]++;
      }
    }
  });

  // Add small self-value so arcs appear even if a category has no connections
  for (i = 0; i < n; i++) {
    var rowSum = 0;
    for (j = 0; j < n; j++) rowSum += matrix[i][j];
    if (rowSum === 0) matrix[i][i] = 1;
  }

  // --- D3 Chord Layout ---
  var size = 700;
  var outerRadius = size / 2 - 80;
  var innerRadius = outerRadius - 20;

  var chord = d3.chord()
    .padAngle(0.04)
    .sortSubgroups(d3.descending);

  var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  var ribbon = d3.ribbon()
    .radius(innerRadius);

  var chords = chord(matrix);

  var svg = d3.select("#chord-diagram")
    .append("svg")
    .attr("viewBox", "0 0 " + size + " " + size)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + size / 2 + "," + size / 2 + ")");

  // --- Ribbons ---
  var ribbons = svg.append("g")
    .selectAll("path")
    .data(chords)
    .enter().append("path")
    .attr("class", "chord-ribbon")
    .attr("d", ribbon)
    .style("fill", function(d) { return categories[d.source.index].color; })
    .on("mouseenter", function(event, d) {
      highlightConnection(d.source.index, d.target.index);
      var si = d.source.index, ti = d.target.index;
      var count = matrix[si][ti];
      showTooltip(event,
        "<strong style='color:" + categories[si].color + "'>" +
        categories[si].shortName + " &harr; " + categories[ti].shortName + "</strong>" +
        "<span class='tt-detail'>" + count + " shared publication" + (count !== 1 ? "s" : "") + "</span>"
      );
    })
    .on("mousemove", moveTooltip)
    .on("mouseleave", function() {
      clearHighlight();
      hideTooltip();
    });

  // --- Arcs ---
  var arcs = svg.append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter().append("g");

  arcs.append("path")
    .attr("class", "chord-arc")
    .attr("d", arc)
    .style("fill", function(d) { return categories[d.index].color; })
    .style("stroke", function(d) { return d3.color(categories[d.index].color).darker(0.3); })
    .style("stroke-width", 1)
    .on("mouseenter", function(event, d) {
      highlightArc(d.index);
      var connected = [];
      chords.forEach(function(ch) {
        if (ch.source.index === d.index) connected.push(categories[ch.target.index].shortName + " (" + matrix[d.index][ch.target.index] + ")");
        else if (ch.target.index === d.index) connected.push(categories[ch.source.index].shortName + " (" + matrix[ch.source.index][d.index] + ")");
      });
      showTooltip(event,
        "<strong style='color:" + categories[d.index].color + "'>" + categories[d.index].shortName + "</strong>" +
        "<span class='tt-detail'>" + catCounts[d.index] + " publication" + (catCounts[d.index] !== 1 ? "s" : "") +
        (connected.length > 0 ? "<br>Connected to: " + connected.join(", ") : "") + "</span>"
      );
    })
    .on("mousemove", moveTooltip)
    .on("mouseleave", function() {
      clearHighlight();
      hideTooltip();
    })
    .on("click", function(event, d) {
      window.location.href = categories[d.index].link;
    });

  // --- Arc labels ---
  var labels = svg.append("g")
    .selectAll("text")
    .data(chords.groups)
    .enter().append("text")
    .attr("class", "chord-arc-label")
    .each(function(d) {
      d.angle = (d.startAngle + d.endAngle) / 2;
    })
    .attr("transform", function(d) {
      var a = d.angle * 180 / Math.PI - 90;
      var r = outerRadius + 12;
      return "rotate(" + a + ") translate(" + r + ",0)" +
        (d.angle > Math.PI ? " rotate(180)" : "");
    })
    .attr("text-anchor", function(d) {
      return d.angle > Math.PI ? "end" : "start";
    })
    .each(function(d) {
      var lines = categories[d.index].name.split("\n");
      var el = d3.select(this);
      lines.forEach(function(line, li) {
        el.append("tspan")
          .attr("x", 0)
          .attr("dy", li === 0 ? "0.35em" : "1.15em")
          .text(line);
      });
    });

  // --- Legend ---
  var legendDiv = document.getElementById("chord-legend");
  categories.forEach(function(cat) {
    var a = document.createElement("a");
    a.className = "chord-legend-item";
    a.href = cat.link;
    a.innerHTML = '<span class="chord-legend-swatch" style="background:' + cat.color + '"></span>' + cat.shortName;
    legendDiv.appendChild(a);
  });

  // --- Interactions ---
  function highlightArc(idx) {
    ribbons.classed("dimmed", function(d) {
      return d.source.index !== idx && d.target.index !== idx;
    }).classed("highlighted", function(d) {
      return d.source.index === idx || d.target.index === idx;
    });
    arcs.select("path").classed("dimmed", function(d) { return d.index !== idx; });
    labels.classed("dimmed", function(d) { return d.index !== idx; });
  }

  function highlightConnection(si, ti) {
    ribbons.classed("dimmed", function(d) {
      return !((d.source.index === si && d.target.index === ti) ||
               (d.source.index === ti && d.target.index === si));
    }).classed("highlighted", function(d) {
      return (d.source.index === si && d.target.index === ti) ||
             (d.source.index === ti && d.target.index === si);
    });
    arcs.select("path").classed("dimmed", function(d) {
      return d.index !== si && d.index !== ti;
    });
    labels.classed("dimmed", function(d) {
      return d.index !== si && d.index !== ti;
    });
  }

  function clearHighlight() {
    ribbons.classed("dimmed", false).classed("highlighted", false);
    arcs.select("path").classed("dimmed", false);
    labels.classed("dimmed", false);
  }

  function showTooltip(event, html) {
    tooltip.innerHTML = html;
    tooltip.style.opacity = "1";
    tooltip.style.left = (event.clientX + 16) + "px";
    tooltip.style.top = (event.clientY - 12) + "px";
  }

  function moveTooltip(event) {
    tooltip.style.left = (event.clientX + 16) + "px";
    tooltip.style.top = (event.clientY - 12) + "px";
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  // --- URL highlight parameter ---
  var params = new URLSearchParams(window.location.search);
  var hlSlug = params.get("highlight");
  if (hlSlug) {
    for (var h = 0; h < categories.length; h++) {
      if (categories[h].slug === hlSlug) {
        highlightArc(h);
        break;
      }
    }
  }

})();
</script>

<hr style="margin: 2rem 0;">

<div class="publications">
<p>A more updated list of publications can be found on
<a href="https://www.researchgate.net/profile/Mohammed-Saqr/">Researchgate</a> or
<a href="https://scholar.google.com/citations?user=U-O6R7YAAAAJ">Google Scholar</a>.</p>
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
