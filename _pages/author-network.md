---
layout: page
permalink: /research/author-network/
title: "Author Network"
description: "Interactive co-authorship network showing collaboration communities"
nav: false
---

<style>
.network-wrap { position: relative; width: 100%; padding-top: 65%; margin: 0 -1rem; }
.network-wrap iframe { position: absolute; top: 0; left: 0; width: calc(100% + 2rem); height: 100%; border: none; border-radius: 8px; }
</style>

<div class="network-wrap">
  <iframe src="{{ '/assets/networks/network_authors.html' | relative_url }}" loading="lazy"></iframe>
</div>
