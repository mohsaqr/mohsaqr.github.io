---
layout: page
permalink: /research/author-network/
title: "Collaboration Network"
description: "Interactive collaboration network showing co-authorship communities"
nav: false
---

This network maps **87 co-authors** across **484 collaboration links**, built from shared publications. Node size reflects the number of papers an author has contributed — larger nodes indicate more prolific collaborators. Edge thickness and opacity scale with the number of co-authored papers between two researchers, so the thickest, darkest lines mark the strongest partnerships. Colors represent **9 communities** detected by the Louvain algorithm, grouping authors who co-publish most frequently with each other. Only authors with at least two publications are included. Scroll to zoom, drag to pan, and hover over a node for details.

<style>
.network-wrap { position: relative; width: calc(100% + 2rem); margin: 0 -1rem; height: 80vh; min-height: 500px; }
.network-wrap iframe { width: 100%; height: 100%; border: none; border-radius: 8px; }
</style>

<div class="network-wrap">
  <iframe src="{{ '/assets/networks/network_authors.html' | relative_url }}" loading="lazy"></iframe>
</div>
