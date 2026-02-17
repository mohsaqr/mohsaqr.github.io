---
layout: page
permalink: /explore/
title: Explore
description: Interactive map of all pages on this site.
nav: true
nav_order: 9
---

<style>
.network-container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
}

.network-container svg {
  width: 100%;
  height: auto;
  display: block;
  animation: netFadeIn 0.6s ease-in;
}

@keyframes netFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes centerPulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.8; }
}

.guide-ring {
  fill: none;
  stroke: var(--global-divider-color);
  stroke-width: 1;
  stroke-dasharray: 5 10;
  opacity: 0.4;
}

.network-edge {
  fill: none;
  stroke: var(--global-theme-color);
  opacity: 0.18;
  transition: opacity 0.3s, stroke-width 0.3s;
}

.network-edge.hub-edge {
  stroke-width: 2;
  opacity: 0.22;
}

.network-edge.child-edge {
  stroke-width: 1.2;
}

.network-edge.highlighted {
  opacity: 0.7;
  stroke-width: 2.5;
}

.node-ring {
  fill: none;
  stroke: var(--global-theme-color);
  stroke-width: 2;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.node-ring.hub-ring {
  stroke-dasharray: 4 3;
}

.node-fill {
  fill: var(--global-theme-color);
  transition: filter 0.3s;
}

.node-fill.center-fill {
  filter: drop-shadow(0 0 8px var(--global-theme-color));
}

.center-glow {
  fill: var(--global-theme-color);
  opacity: 0.4;
  animation: centerPulse 4s ease-in-out infinite;
}

.node-icon {
  fill: var(--global-bg-color);
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  text-anchor: middle;
  dominant-baseline: central;
  pointer-events: none;
}

.node-label {
  fill: var(--global-text-color);
  text-anchor: middle;
  font-family: inherit;
  pointer-events: none;
  transition: opacity 0.3s;
}

.node-label.center-label {
  font-weight: 700;
}

.node-group {
  cursor: pointer;
}

.node-group.no-link {
  cursor: default;
}

.node-group:hover .node-ring {
  opacity: 1;
}

.node-group:hover .node-fill {
  filter: brightness(1.2) drop-shadow(0 0 10px var(--global-theme-color));
}

.network-tooltip {
  position: fixed;
  background: var(--global-bg-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 10px;
  padding: 0.7rem 1rem;
  font-size: 0.85rem;
  max-width: 240px;
  line-height: 1.4;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 50;
}

.network-tooltip strong {
  display: block;
  margin-bottom: 0.2rem;
  color: var(--global-theme-color);
}

.network-tooltip .tt-desc {
  color: var(--global-text-color);
  opacity: 0.75;
}

@media (max-width: 600px) {
  .network-container { max-width: 100%; }
}
</style>

<div id="network-graph" class="network-container"></div>
<div id="network-tooltip" class="network-tooltip"></div>

<script src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js" integrity="sha256-1rA678n2xEx7x4cTZ5x4wpUCj6kUMZEZ5cxLSVSFWxw=" crossorigin="anonymous"></script>

<script>
(function() {

  var tooltip = document.getElementById("network-tooltip");

  // --- Data ---
  var nodes = [
    { id: "home", label: "Saqr", link: "/", ring: 0, icon: "\uf015",
      desc: "Main landing page" },

    { id: "publications", label: "Publications", link: "/publications/", ring: 1, icon: "\uf02d",
      desc: "Research papers and academic publications" },
    { id: "research", label: "Research", link: "/research/", ring: 1, icon: "\uf0c3",
      desc: "Current research projects and focus areas" },
    { id: "works", label: "Works", link: null, ring: 1, icon: "\uf0b1",
      desc: "Books, software, and major projects" },
    { id: "tutorials", label: "Tutorials", link: "/tutorials/", ring: 1, icon: "\uf19d",
      desc: "Step-by-step guides for analytics methods" },
    { id: "interests", label: "Interests", link: null, ring: 1, icon: "\uf0eb",
      desc: "Research interests and specializations" },
    { id: "teaching", label: "Teaching", link: null, ring: 1, icon: "\uf51c",
      desc: "Courses, philosophy, and teaching materials" },
    { id: "cv", label: "CV", link: "/cv/", ring: 1, icon: "\uf15c",
      desc: "Academic curriculum vitae" },
    { id: "contact", label: "Get in Touch", link: "/get-in-touch/", ring: 1, icon: "\uf0e0",
      desc: "Contact information and social links" },

    { id: "la-methods", label: "LA Methods Book", link: "/works/lamethods/", ring: 2, parent: "works",
      desc: "Learning Analytics Methods and Tutorials textbook" },
    { id: "advanced-la", label: "Advanced LA Book", link: "/works/advanced-la/", ring: 2, parent: "works",
      desc: "Advanced Learning Analytics textbook" },
    { id: "cer", label: "Computing Education", link: "/works/cer/", ring: 2, parent: "works",
      desc: "Computing education research" },
    { id: "software", label: "Methods Software", link: "/software/", ring: 2, parent: "works",
      desc: "Research software and analytical tools" },
    { id: "ai-software", label: "AI Software", link: "/works/ai-software/", ring: 2, parent: "works",
      desc: "AI-powered software tools" },

    { id: "precision-xai", label: "Precision XAI", link: "/interests/precision-xai/", ring: 2, parent: "interests",
      desc: "Explainable AI for precision education" },
    { id: "temporal-net", label: "Temporal Networks", link: "/interests/temporal-networks/", ring: 2, parent: "interests",
      desc: "Temporal network analysis methods" },
    { id: "sequence", label: "Sequence Analytics", link: "/interests/sequence-analytics/", ring: 2, parent: "interests",
      desc: "Sequence and process mining in education" },
    { id: "psych-net", label: "Psych. Networks", link: "/interests/psychological-networks/", ring: 2, parent: "interests",
      desc: "Psychological network analysis" },
    { id: "network-sci", label: "Network Science", link: "/interests/network-science/", ring: 2, parent: "interests",
      desc: "Network science and complex networks" },
    { id: "sci-of-sci", label: "Science of Science", link: "/interests/science-of-science/", ring: 2, parent: "interests",
      desc: "Scientometrics and research analytics" },
    { id: "complex-sys", label: "Complex Systems", link: "/interests/complex-systems/", ring: 2, parent: "interests",
      desc: "Complex systems and emergence" },

    { id: "teach-phil", label: "Teaching Philosophy", link: "/teaching/", ring: 2, parent: "teaching",
      desc: "Teaching philosophy and pedagogical approach" },
    { id: "summer", label: "Summer Course", link: "/teaching/summer-course/", ring: 2, parent: "teaching",
      desc: "Summer school courses" },
    { id: "teach-la", label: "Learning Analytics", link: "/teaching/learning-analytics/", ring: 2, parent: "teaching",
      desc: "Learning analytics course" },
    { id: "teach-sna", label: "Social Network Analysis", link: "/teaching/social-network-analysis/", ring: 2, parent: "teaching",
      desc: "Social network analysis course" }
  ];

  // Build edges
  var edges = [];
  var innerNodes = nodes.filter(function(n) { return n.ring === 1; });
  var outerNodes = nodes.filter(function(n) { return n.ring === 2; });

  innerNodes.forEach(function(n) {
    edges.push({ source: "home", target: n.id, type: "hub" });
  });
  outerNodes.forEach(function(n) {
    edges.push({ source: n.parent, target: n.id, type: "child" });
  });

  // --- Layout constants ---
  var width = 1080, height = 1080;
  var cx = width / 2, cy = height / 2;
  var innerRadius = 225, outerRadius = 440;

  var centerFillR = 36, centerRingR = 44, centerGlowR = 52;
  var innerFillR = 25,  innerRingR = 31;
  var outerFillR = 16,  outerRingR = 20;

  var centerFontSize = 20, innerFontSize = 14;
  var centerLabelSize = 16, innerLabelSize = 13, outerLabelSize = 11;

  // Place inner ring evenly
  innerNodes.forEach(function(n, i) {
    var angle = (2 * Math.PI * i / innerNodes.length) - Math.PI / 2;
    n.x = cx + innerRadius * Math.cos(angle);
    n.y = cy + innerRadius * Math.sin(angle);
    n.angle = angle;
  });

  // Place outer ring children around their parent
  var parentGroups = {};
  outerNodes.forEach(function(n) {
    if (!parentGroups[n.parent]) parentGroups[n.parent] = [];
    parentGroups[n.parent].push(n);
  });

  Object.keys(parentGroups).forEach(function(pid) {
    var parent = nodes.find(function(n) { return n.id === pid; });
    var children = parentGroups[pid];
    var spread = Math.PI * 0.32;
    if (children.length > 5) spread = Math.PI * 0.52;
    var startAngle = parent.angle - spread / 2;
    var step = children.length > 1 ? spread / (children.length - 1) : 0;
    children.forEach(function(c, i) {
      var a = startAngle + step * i;
      c.x = cx + outerRadius * Math.cos(a);
      c.y = cy + outerRadius * Math.sin(a);
      c.angle = a;
    });
  });

  // Center
  nodes[0].x = cx;
  nodes[0].y = cy;

  // Initialize rotated positions
  nodes.forEach(function(n) { n.rx = n.x; n.ry = n.y; });

  // Node lookup
  var nodeMap = {};
  nodes.forEach(function(n) { nodeMap[n.id] = n; });

  // --- SVG ---
  var svg = d3.select("#network-graph")
    .append("svg")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet");

  var g = svg.append("g");

  // Orbital guide rings
  g.append("circle").attr("class", "guide-ring")
    .attr("cx", cx).attr("cy", cy).attr("r", innerRadius);
  g.append("circle").attr("class", "guide-ring")
    .attr("cx", cx).attr("cy", cy).attr("r", outerRadius);

  // Rotation state
  var rotationAngle = 0;
  var rotationSpeed = 0.000015;
  var paused = false;

  // --- Edges ---
  var edgeEls = g.selectAll(".network-edge")
    .data(edges).enter().append("path")
    .attr("class", function(d) {
      return "network-edge " + (d.type === "hub" ? "hub-edge" : "child-edge");
    });

  function computeEdgePath(e) {
    var s = nodeMap[e.source], t = nodeMap[e.target];
    var sx = s.rx, sy = s.ry, tx = t.rx, ty = t.ry;
    if (e.type === "hub") {
      var mx = (sx + tx) / 2, my = (sy + ty) / 2;
      var dx = tx - sx, dy = ty - sy;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      mx += (-dy / len) * 35;
      my += ( dx / len) * 35;
      return "M" + sx + "," + sy + " Q" + mx + "," + my + " " + tx + "," + ty;
    }
    return "M" + sx + "," + sy + " L" + tx + "," + ty;
  }

  edgeEls.attr("d", computeEdgePath);

  // --- Node groups ---
  var nodeGroups = g.selectAll(".node-group")
    .data(nodes).enter().append("g")
    .attr("class", function(d) {
      return "node-group" + (d.link ? "" : " no-link");
    })
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  // Center glow
  nodeGroups.filter(function(d) { return d.ring === 0; })
    .append("circle")
    .attr("class", "center-glow")
    .attr("r", centerGlowR);

  // Outer ring (decorative border)
  nodeGroups.append("circle")
    .attr("class", function(d) {
      return "node-ring" + (!d.link ? " hub-ring" : "");
    })
    .attr("r", function(d) {
      if (d.ring === 0) return centerRingR;
      if (d.ring === 1) return innerRingR;
      return outerRingR;
    });

  // Inner fill
  nodeGroups.append("circle")
    .attr("class", function(d) {
      return "node-fill" + (d.ring === 0 ? " center-fill" : "");
    })
    .attr("r", function(d) {
      if (d.ring === 0) return centerFillR;
      if (d.ring === 1) return innerFillR;
      return outerFillR;
    });

  // Icons (center + inner ring only)
  nodeGroups.filter(function(d) { return d.ring <= 1 && d.icon; })
    .append("text")
    .attr("class", "node-icon")
    .attr("font-size", function(d) { return d.ring === 0 ? centerFontSize : innerFontSize; })
    .attr("dy", "0.05em")
    .text(function(d) { return d.icon; });

  // Labels
  nodeGroups.append("text")
    .attr("class", function(d) {
      return "node-label" + (d.ring === 0 ? " center-label" : "");
    })
    .attr("y", function(d) {
      if (d.ring === 0) return centerRingR + 20;
      if (d.ring === 1) return innerRingR + 18;
      return outerRingR + 15;
    })
    .attr("font-size", function(d) {
      if (d.ring === 0) return centerLabelSize;
      if (d.ring === 1) return innerLabelSize;
      return outerLabelSize;
    })
    .text(function(d) { return d.label; });

  // --- Interaction ---
  function showTooltip(event, d) {
    tooltip.innerHTML = "<strong>" + d.label + "</strong>" +
      (d.desc ? "<span class='tt-desc'>" + d.desc + "</span>" : "");
    tooltip.style.opacity = "1";
    tooltip.style.left = (event.clientX + 16) + "px";
    tooltip.style.top = (event.clientY - 12) + "px";
  }

  function hideTooltip() {
    tooltip.style.opacity = "0";
  }

  nodeGroups.on("mouseenter", function(event, d) {
    paused = true;
    var connected = new Set();
    edges.forEach(function(e) {
      if (e.source === d.id || e.target === d.id) {
        connected.add(e.source);
        connected.add(e.target);
      }
    });
    edgeEls.classed("highlighted", function(e) {
      return e.source === d.id || e.target === d.id;
    });
    nodeGroups.style("opacity", function(n) {
      return connected.has(n.id) || n.id === d.id ? 1 : 0.2;
    });
    showTooltip(event, d);
  });

  nodeGroups.on("mousemove", function(event) {
    tooltip.style.left = (event.clientX + 16) + "px";
    tooltip.style.top = (event.clientY - 12) + "px";
  });

  nodeGroups.on("mouseleave", function() {
    paused = false;
    edgeEls.classed("highlighted", false);
    nodeGroups.style("opacity", 1);
    hideTooltip();
  });

  nodeGroups.on("click", function(event, d) {
    if (d.link) window.location.href = d.link;
  });

  // --- Orbital animation ---
  var lastTime = null;
  function animate(time) {
    if (lastTime !== null && !paused) {
      var dt = time - lastTime;
      rotationAngle += rotationSpeed * dt;

      nodes.forEach(function(n) {
        if (n.ring === 0) return;
        var a = n.angle + rotationAngle * (n.ring === 1 ? 1 : 1.15);
        var r = n.ring === 1 ? innerRadius : outerRadius;
        n.rx = cx + r * Math.cos(a);
        n.ry = cy + r * Math.sin(a);
      });

      nodeGroups.attr("transform", function(d) {
        return "translate(" + d.rx + "," + d.ry + ")";
      });

      edgeEls.attr("d", computeEdgePath);
    }
    lastTime = time;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

})();
</script>
