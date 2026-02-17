---
layout: page
permalink: /research/
title: Research
description: Browse publications by keyword, search by title or author.
nav: true
nav_order: 2
dropdown: true
children:
  - title: "Browse by Keyword"
    permalink: /research/
  - title: "Co-authorship Map"
    permalink: /research/coauthorship-map/
---

<style>
.keyword-chip {
  display: inline-block;
  background-color: var(--global-bg-color) !important;
  border: 1px solid var(--global-theme-color);
  color: var(--global-text-color) !important;
  margin: 0.15rem;
  padding: 0.35em 0.65em;
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9em;
}
.keyword-chip:hover {
  background-color: var(--global-theme-color);
  color: white !important;
  border-color: var(--global-theme-color);
  text-decoration: none;
}
.keyword-chip.active {
  background-color: var(--global-theme-color);
  color: white !important;
  border-color: var(--global-theme-color);
}
.pub-card .keyword-chip {
  font-size: 0.8em;
  padding: 0.2em 0.5em;
  border-color: var(--global-divider-color);
}
#keyword-cloud {
  margin-bottom: 1rem;
}
#keyword-details summary {
  user-select: none;
}
#keyword-chips-inner {
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem 0;
}
</style>

<!-- Build keyword frequency data for JS -->
{% assign all_keywords = "" | split: "" %}
{% for pub in site.publications %}
  {% if pub.keywords %}
    {% for kw in pub.keywords %}
      {% assign all_keywords = all_keywords | push: kw %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign sorted_keywords = all_keywords | sort | uniq %}

<script>
window.keywordData = [
{% for kw in sorted_keywords -%}
  {% assign kw_count = all_keywords | where_exp: "item", "item == kw" | size -%}
  ["{{ kw | replace: '"', '' }}",{{ kw_count }},"{{ kw | slugify }}"]{% unless forloop.last %},{% endunless %}
{% endfor -%}
];
</script>

<!-- Word Cloud -->
<div id="keyword-cloud" style="width: 100%; height: 450px;">
  <div id="keyword-cloud-loading" style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--global-text-color-light); font-size: 0.9em;">
    Loading word cloud...
  </div>
</div>

<!-- Browse all keywords (collapsed) -->
<details id="keyword-details" style="margin-bottom: 1.5rem;">
  <summary style="cursor: pointer; color: var(--global-theme-color); font-weight: 500; margin-bottom: 0.5rem;">
    Browse all {{ sorted_keywords.size }} keywords
  </summary>
  <div id="keyword-chips-inner"></div>
</details>

<!-- Search input -->
<div style="margin-bottom: 1.5rem;">
  <input type="text" id="pub-search" placeholder="Search titles, authors, abstracts..."
         class="form-control"
         style="max-width: 500px;">
</div>

<!-- Active filter display -->
<div id="active-filter" style="display: none; margin-bottom: 1rem;">
  <span class="badge rounded-pill" style="background-color: var(--global-theme-color); color: white; padding: 0.4em 0.8em; font-size: 0.95em;">
    <span id="active-keyword-label"></span>
    <a href="/research/" id="clear-filter" style="color: white; margin-left: 0.5em; text-decoration: none; font-weight: bold;">&times;</a>
  </span>
  <span id="filter-count" class="text-muted" style="margin-left: 0.5em;"></span>
</div>

<!-- Publications grouped by year -->
{% assign pubs_by_year = site.publications | sort: "year" | reverse | group_by: "year" %}
{% for year_group in pubs_by_year %}
  <div class="pub-year-group" data-year="{{ year_group.name }}">
    <h2 class="year" id="y{{ year_group.name }}">{{ year_group.name }}</h2>
    {% for pub in year_group.items %}
      <div class="pub-card"
           data-keywords="{% for kw in pub.keywords %}{{ kw | slugify }} {% endfor %}"
           data-searchable="{{ pub.title | downcase }} {{ pub.authors | map: 'family' | join: ' ' | downcase }} {{ pub.authors | map: 'given' | join: ' ' | downcase }} {{ pub.content | strip_html | downcase | truncatewords: 50 }} {% for kw in pub.keywords %}{{ kw | downcase }} {% endfor %}"
           style="margin-bottom: 1.2rem; padding: 0.8rem 0; border-bottom: 1px solid var(--global-divider-color);">
        <div style="display: flex; gap: 0.8rem; align-items: flex-start;">
          {% if pub.abbr and pub.abbr != "" %}
            <div style="flex-shrink: 0;">
              <abbr class="badge rounded" style="min-width: 60px; text-align: center; background-color: var(--global-theme-color); color: white;">{{ pub.abbr }}</abbr>
            </div>
          {% endif %}
          <div style="flex-grow: 1;">
            <div class="title" style="font-weight: 500;">
              <a href="{{ pub.url | relative_url }}">{{ pub.title }}</a>
            </div>
            <div class="author" style="font-size: 0.9em; color: var(--global-text-color-light);">
              {%- for author in pub.authors -%}
                {%- if forloop.first == false -%}
                  {%- if forloop.last %} and {% else %}, {% endif -%}
                {%- endif -%}
                {%- assign author_is_self = false -%}
                {%- if site.scholar.last_name contains author.family -%}
                  {%- if site.scholar.first_name contains author.given -%}
                    {%- assign author_is_self = true -%}
                  {%- endif -%}
                {%- endif -%}
                {%- if author_is_self -%}<em>{{ author.given }} {{ author.family }}</em>{%- else -%}{{ author.given }} {{ author.family }}{%- endif -%}
              {%- endfor -%}
            </div>
            <div class="periodical" style="font-size: 0.9em;">
              {%- if pub.journal -%}<em>{{ pub.journal }}</em>{%- endif -%}
              {%- if pub.year -%}, {{ pub.year }}{%- endif -%}
            </div>
            {% if pub.content and pub.content != "" %}
              <div class="abstract-snippet text-muted" style="font-size: 0.85em; margin-top: 0.3rem;">
                {{ pub.content | strip_html | truncatewords: 30 }}
              </div>
            {% endif %}
            {% if pub.keywords and pub.keywords.size > 0 %}
              <div style="margin-top: 0.3rem;">
                {% for kw in pub.keywords %}
                  <a href="?keyword={{ kw | slugify }}"
                     class="keyword-chip badge rounded-pill"
                     data-keyword="{{ kw | slugify }}">
                    {{ kw }}
                  </a>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
{% endfor %}

<script src="{{ '/assets/js/pubfilter.js' | relative_url }}"></script>
