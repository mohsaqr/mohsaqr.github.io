# Site Manager

A simple backend tool for managing your Jekyll GitHub Pages site.

## Quick Start

```bash
./manage
```

## Features

| Option | Description |
|--------|-------------|
| 1 | Quick Blog Post |
| 2 | Quick News |
| 3 | Create Blog Post (detailed) |
| 4 | Edit Blog Post |
| 5 | List Blog Posts |
| 6 | Create News |
| 7 | List News |
| 8 | Create Page |
| 9 | Edit Page |
| 10 | List Pages |
| 11 | Reorder Homepage Sections |
| 12 | Commit & Push All Changes |
| 13 | Git Status |
| 14 | Pull Latest |
| 15 | Preview Site Locally |

## Homepage Section Ordering

Option 11 lets you reorder sections on the homepage.

### Available Sections

| Section | Description |
|---------|-------------|
| `profile` | Profile image and contact info |
| `content` | Main bio text |
| `news` | News announcements |
| `contact_note` | Contact message |
| `books` | Books section |
| `newsletter` | Newsletter signup |
| `latest_posts` | Recent blog posts |
| `selected_papers` | Selected publications |
| `social` | Social media icons |

### Reorder Commands

| Command | Description | Example |
|---------|-------------|---------|
| `m <from> <to>` | Move section | `m 3 1` moves item 3 to position 1 |
| `s <a> <b>` | Swap sections | `s 2 5` swaps items 2 and 5 |
| `a <section>` | Add section | `a newsletter` |
| `r <num>` | Remove section | `r 3` |
| `reset` | Reset to default order | |
| `d` | Done (save and exit) | |
| `q` | Quit without saving | |

## Requirements

- Python 3
- PyYAML (`pip install pyyaml`)

## Local Preview

To preview the site locally:

```bash
bundle exec jekyll serve --livereload
```

Then open http://localhost:4000
