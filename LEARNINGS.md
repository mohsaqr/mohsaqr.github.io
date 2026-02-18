# Project Learnings

### 2026-02-18
- [author-names]: YAML frontmatter has ~20 author name inconsistencies across publications (typos, diacritics, encoding). `rebuild_networks.R` includes `author_norm` map to normalize these at build time. When adding new publications, check for name variants.
- [institution-lookup]: `institution_summary.csv` is the curated source for institution name normalization (raw affiliation string -> canonical name + country). 106 institutions, ~500 raw variants. When adding new affiliations, check if they need a new entry here.
- [publications-without-affiliations]: 23 of 247 publications lack `affiliations:` in YAML frontmatter (mostly older single-author papers). These are included in the author network but skipped for the institution network.
- [network-counts]: After name normalization: 87 authors / 484 edges / 9 communities (author network), 39 institutions / 110 edges / 18 countries (institution network).
- [csv-quoting]: R's `write.csv()` quotes all fields by default. The original CSVs used minimal quoting. Functionally identical but cosmetically different.
