---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2025, 2024, 2023, 2022, 2021,2020, 2019, 2018, 2017, 2016, 2015]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">
A more updated list of publications can be found on 
<div>
  <a href="https://www.researchgate.net/profile/Mohammed-Saqr/">**Researchgate**</a>
  or
  <a href="https://scholar.google.com/citations?user=U-O6R7YAAAAJ">**Google Scholar**</a>
</div>
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
