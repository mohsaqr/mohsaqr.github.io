---
layout: page
permalink: /research/institution-network/
title: "Institutional Collaboration"
description: "Interactive institutional collaboration network colored by country"
nav: false
---

This network visualizes collaboration between **39 institutions** across **18 countries**, connected by **110 co-publication links**. Each node represents a university or research institute — larger nodes have contributed more papers. Edge thickness and opacity reflect the number of jointly authored publications between two institutions. Nodes are colored by country, with a legend bar at the bottom. Only institutions with at least two publications are included. Scroll to zoom, drag to pan, and hover over a node for details.

<style>
.network-wrap { position: relative; width: calc(100% + 2rem); margin: 0 -1rem; height: 80vh; min-height: 500px; }
.network-wrap iframe { width: 100%; height: 100%; border: none; border-radius: 8px; }
</style>

<div class="network-wrap">
  <iframe src="{{ '/assets/networks/network_institutions.html' | relative_url }}" loading="lazy"></iframe>
</div>
