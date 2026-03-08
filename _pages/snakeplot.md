---
layout: page
permalink: /snakeplot/
title: snakeplot
description: Serpentine visualizations for sequential data — surveys, timelines, activity logs, and state sequences — using base R graphics with zero dependencies.
nav: false
---

<style>
.sp-hero {
  font-size: 1.08em;
  line-height: 1.75;
  margin-bottom: 1.5rem;
  text-align: justify;
}
.sp-section-title {
  color: var(--global-theme-color);
  border-bottom: 2px solid var(--global-theme-color);
  padding-bottom: 0.3rem;
  margin-top: 2.5rem;
  margin-bottom: 0.4rem;
}
.sp-caption {
  font-size: 0.92em;
  line-height: 1.65;
  color: var(--global-text-color);
  margin-bottom: 1.8rem;
  text-align: justify;
}
.sp-install {
  background: var(--global-code-bg-color);
  border-left: 4px solid var(--global-theme-color);
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  margin: 1rem 0 1.5rem 0;
  font-family: monospace;
  font-size: 0.95em;
}
.sp-img {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 0.6rem;
}
.sp-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1.5rem;
  margin: 1rem 0 1.5rem 0;
  font-size: 0.95em;
}
.sp-features div::before {
  content: "→ ";
  color: var(--global-theme-color);
  font-weight: 700;
}
@media (max-width: 600px) {
  .sp-features { grid-template-columns: 1fr; }
}
</style>

<p class="sp-hero">
Sequential data tells a story&mdash;survey items build on each other, career phases unfold over time, learning activities chain into patterns. Conventional plots break these sequences into disconnected bars or points, losing the thread that connects them. A long sequence plotted as a single horizontal strip forces the reader to scroll or squint at a compressed axis; a vertical list wastes space and hides adjacency. <strong>snakeplot</strong> solves this by winding data through a serpentine layout where each row flows into the next through U-turn arcs, keeping the full sequence visible, connected, and compact in a single figure&mdash;much like reading lines of text on a page.
</p>

<div class="sp-install">
devtools::install_github("mohsaqr/snakeplot")
</div>

<div class="sp-features">
  <div>8 plotting functions</div>
  <div>10 built-in palettes</div>
  <div>Zero external dependencies</div>
  <div>Base R graphics only</div>
  <div>3 bundled EMA datasets</div>
  <div>Dark mode &amp; custom theming</div>
</div>

<h2 class="sp-section-title">Timeline: A career in one glance</h2>

<p class="sp-caption">
A 10-year career plotted as a conventional horizontal timeline either stretches too wide to fit on a page or compresses short phases into unreadable slivers. The serpentine layout folds the timeline into stacked bands&mdash;each band covers roughly two years, and the eye simply reads left-to-right, then right-to-left on the next row, like text. Transitions are labeled at the exact month they occur, year markers sit below each band, and a sequential palette darkens with seniority&mdash;so the entire career arc is visible in one compact figure. <code>timeline_snake()</code> takes a simple 3-column data.frame (role, start, end) and handles all the date arithmetic automatically.
</p>

```r
career <- data.frame(
  role  = c("Intern", "Junior Dev", "Mid Dev",
            "Senior Dev", "Tech Lead", "Architect"),
  start = c("2015-01", "2015-07", "2017-01",
            "2019-07", "2022-07", "2024-01"),
  end   = c("2015-06", "2016-12", "2019-06",
            "2022-06", "2023-12", "2024-12")
)
timeline_snake(career,
               title = "Software Engineer — Career Path (2015-2024)")
```

<img src="/assets/img/snakeplot/timeline.png" class="sp-img" alt="Timeline snake plot showing a software engineer career from Intern through Architect">

<h2 class="sp-section-title">State sequences: 75 events as a continuous path</h2>

<p class="sp-caption">
A 75-step sequence plotted as a single row of colored blocks would stretch far beyond screen width, forcing scrolling and making it impossible to see the overall pattern. Stacking the same data as vertical bars loses the left-to-right reading order that makes sequences intuitive. The serpentine layout solves both problems: it folds the sequence into readable bands connected by U-turn arcs, so the full path stays visible in one figure. Runs of the same state are visually immediate as colored stretches; transitions pop out as color boundaries. No information is lost, no order is scrambled&mdash;the reader traces the path exactly as the events unfolded.
</p>

```r
sequence_snake(seq75, title = "75-step learning sequence")
```

<img src="/assets/img/snakeplot/sequence.png" class="sp-img" alt="Sequence snake plot showing 75 learning activity steps with 8 color-coded verbs">

<h2 class="sp-section-title">Surveys: Inter-item correlations at U-turns</h2>

<p class="sp-caption">
A survey with 15+ items sorted by mean creates a natural ranking, but standard bar charts show only summary statistics and strip charts show only raw responses&mdash;neither reveals how adjacent items relate to each other. The serpentine layout turns that adjacency into an asset: the U-turn arc connecting two neighboring items becomes a space to display their Pearson correlation, so you see both the item-level distributions and the inter-item structure in one figure. Brown arcs signal positive association, blue arcs signal negative&mdash;anomalous pairs stand out immediately without consulting a separate correlation matrix.
</p>

```r
survey_snake(ema_emotions, tick_shape = "line",
             arc_fill = "correlation", sort_by = "mean",
             colors = snake_palettes$ocean, level_labels = labs7,
             title = "Emotions — correlations at U-turns")
```

<img src="/assets/img/snakeplot/survey_corr.png" class="sp-img" alt="Survey snake plot with tick marks and correlation values displayed on U-turn arcs">

<h2 class="sp-section-title">Response distributions as stacked bars</h2>

<p class="sp-caption">
When the question shifts from &ldquo;how do individual responses scatter?&rdquo; to &ldquo;what is the overall distribution shape?&rdquo;, switching to <code>tick_shape = "bar"</code> renders each item as a 100% stacked bar. Sorting by mean turns the serpentine into a gradient&mdash;from the most negatively rated item to the most positive&mdash;so you can spot where the distribution shifts from skewed-low to skewed-high. Mean diamonds and median lines overlay summary statistics directly on the bars, replacing the need for a separate descriptive table.
</p>

```r
survey_snake(ema_emotions, tick_shape = "bar", sort_by = "mean",
             show_mean = TRUE, show_median = TRUE,
             colors = snake_palettes$ocean, level_labels = labs7,
             title = "Emotions — mean and median markers")
```

<img src="/assets/img/snakeplot/survey_bars.png" class="sp-img" alt="Survey snake plot with stacked response bars and mean/median markers">

<h2 class="sp-section-title">Daily EMA: 14 days of experience sampling</h2>

<p class="sp-caption">
Experience sampling studies generate beep-level data across many days&mdash;14 days of 5&ndash;10 beeps each produces 70&ndash;140 observations that need to be compared both within and across days. Faceted panels lose the day-to-day continuity; a single long axis compresses each day into a narrow slice. The serpentine layout gives each day its own full-width band, and the U-turn arcs connect consecutive days so you can trace how distributions shift from Monday to Sunday. Within-day patterns (morning dips, evening peaks) are visible within each band, while between-day trends emerge across bands.
</p>

```r
survey_snake(ema_beeps, var = "happy", day = "day",
             tick_shape = "bar", bar_reverse = TRUE,
             colors = snake_palettes$ocean, level_labels = labs7,
             title = "Happiness — 14 days, distribution bars")
```

<img src="/assets/img/snakeplot/daily_bars.png" class="sp-img" alt="Daily EMA happiness data shown as stacked bars across 14 days">

<h2 class="sp-section-title">Activity timeline: Events across the week</h2>

<p class="sp-caption">
Daily activity logs&mdash;app usage, study sessions, exercise bouts&mdash;are naturally continuous within a day but disconnected across days. Plotting seven days as separate 24-hour axes makes it hard to compare the same time slot across days; a single concatenated axis loses the day boundaries entirely. The serpentine layout gives each day a full-width 24-hour ribbon, with colored blocks showing event durations and rug ticks marking point events. Days flow into each other through the arcs, so weekly rhythms (weekday clusters vs. weekend gaps) become immediately visible.
</p>

```r
activity_snake(events, event_color = "#e09480",
               band_color = "#3d2518",
               title = "Weekly activity — duration blocks")
```

<img src="/assets/img/snakeplot/activity.png" class="sp-img" alt="Activity snake plot showing event blocks across a week on dark bands">

<h2 class="sp-section-title">Continuous signal: Line intensity</h2>

<p class="sp-caption">
Continuous signals recorded over multiple days&mdash;heart rate, screen time, sensor readings&mdash;pose a display dilemma: a single long axis compresses five days of minute-level data into an unreadable smear, while separate panels disconnect the end of one day from the start of the next. The serpentine layout threads the intensity curve through stacked bands connected by arcs, so the signal is literally continuous from band to band. Peaks and valleys are easy to trace across days, and the folded layout fits a week of high-resolution data into a single compact figure.
</p>

```r
line_snake(d_line, fill_color = "#e74c3c",
           title = "5-day intensity signal")
```

<img src="/assets/img/snakeplot/line.png" class="sp-img" alt="Line snake plot showing a continuous intensity signal over 5 days">

---

<div style="text-align:center; margin-top:2rem;">
  <p>
    <a href="https://github.com/mohsaqr/snakeplot" target="_blank" style="font-size:1.1em; font-weight:600;">
      GitHub Repository
    </a>
    &nbsp;&middot;&nbsp;
    <span style="color:var(--global-text-color-light);">
      Base R graphics &middot; Zero dependencies &middot; MIT License
    </span>
  </p>
</div>
