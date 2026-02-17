#!/usr/bin/env python3
"""Extract authors and countries from publication YAML frontmatter.

Reads all _publications/*.md files, parses YAML frontmatter, and produces:
  - paper_authors.csv: paper_id, year, title, authors
  - paper_countries.csv: paper_id, year, title, countries, affiliations_raw
"""

import csv
import os
import re
import sys
import yaml

PUBLICATIONS_DIR = os.path.join(os.path.dirname(__file__), "..", "_publications")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..")

# Lookup for affiliations that have no comma (just a university name)
UNIVERSITY_COUNTRY = {
    "University of Eastern Finland": "Finland",
    "Technical University of Madrid": "Spain",
    "Qassim University": "Saudi Arabia",
    "KTH Royal Institute of Technology": "Sweden",
    "University of Turku": "Finland",
    "Stockholm University": "Sweden",
    "University of Bergen": "Norway",
    "Luleå University of Technology": "Sweden",
    "University of Limerick": "Ireland",
    "University of Oulu": "Finland",
    "Aalto University": "Finland",
}


def parse_frontmatter(filepath):
    """Extract YAML frontmatter from a markdown file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return None
    return yaml.safe_load(match.group(1))


def extract_authors(author_list):
    """Convert list of {family, given} dicts to 'Given Family, ...' string."""
    if not author_list:
        return ""
    names = []
    for a in author_list:
        given = a.get("given", "")
        family = a.get("family", "")
        names.append(f"{given} {family}".strip())
    return ", ".join(names)


def extract_countries(affiliations_str):
    """Extract unique countries from semicolon-separated affiliation string."""
    if not affiliations_str:
        return ""
    segments = affiliations_str.split(";")
    countries = []
    for seg in segments:
        seg = seg.strip()
        if not seg:
            continue
        if "," in seg:
            # Take last comma-separated part
            candidate = seg.rsplit(",", 1)[1].strip()
            countries.append(candidate)
        else:
            # No comma — look up in university table
            found = UNIVERSITY_COUNTRY.get(seg)
            if found:
                countries.append(found)
            else:
                countries.append(f"UNKNOWN({seg})")
    # Deduplicate while preserving order
    seen = set()
    unique = []
    for c in countries:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return "; ".join(unique)


def paper_id_from_filename(filename):
    """Extract paper ID from filename by removing .md extension."""
    return os.path.splitext(filename)[0]


def main():
    pub_dir = os.path.abspath(PUBLICATIONS_DIR)
    out_dir = os.path.abspath(OUTPUT_DIR)

    md_files = sorted(f for f in os.listdir(pub_dir) if f.endswith(".md"))
    print(f"Found {len(md_files)} publication files")

    authors_rows = []
    countries_rows = []
    unknown_countries = []

    for filename in md_files:
        filepath = os.path.join(pub_dir, filename)
        meta = parse_frontmatter(filepath)
        if meta is None:
            print(f"  WARNING: No frontmatter in {filename}", file=sys.stderr)
            continue

        paper_id = paper_id_from_filename(filename)
        year = meta.get("year", "")
        title = meta.get("title", "")

        # Authors
        author_str = extract_authors(meta.get("authors"))
        authors_rows.append({
            "paper_id": paper_id,
            "year": year,
            "title": title,
            "authors": author_str,
        })

        # Countries (only if affiliations exist)
        affiliations_raw = meta.get("affiliations", "")
        if affiliations_raw:
            countries_str = extract_countries(affiliations_raw)
            countries_rows.append({
                "paper_id": paper_id,
                "year": year,
                "title": title,
                "countries": countries_str,
                "affiliations_raw": affiliations_raw,
            })
            if "UNKNOWN" in countries_str:
                unknown_countries.append((paper_id, countries_str, affiliations_raw))

    # Write paper_authors.csv
    authors_path = os.path.join(out_dir, "paper_authors.csv")
    with open(authors_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["paper_id", "year", "title", "authors"])
        writer.writeheader()
        writer.writerows(authors_rows)
    print(f"Wrote {len(authors_rows)} rows to paper_authors.csv")

    # Write paper_countries.csv
    countries_path = os.path.join(out_dir, "paper_countries.csv")
    with open(countries_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["paper_id", "year", "title", "countries", "affiliations_raw"]
        )
        writer.writeheader()
        writer.writerows(countries_rows)
    print(f"Wrote {len(countries_rows)} rows to paper_countries.csv")

    # Report unknowns
    if unknown_countries:
        print(f"\n--- {len(unknown_countries)} papers with UNKNOWN countries ---")
        for pid, countries, raw in unknown_countries:
            print(f"  {pid}: {countries}")
            print(f"    Raw: {raw}")
    else:
        print("\nNo UNKNOWN countries found.")

    # Summary stats
    all_countries = []
    for row in countries_rows:
        all_countries.extend(c.strip() for c in row["countries"].split(";"))
    country_counts = {}
    for c in all_countries:
        country_counts[c] = country_counts.get(c, 0) + 1
    print(f"\n--- Country summary ({len(country_counts)} unique countries) ---")
    for country, count in sorted(country_counts.items(), key=lambda x: -x[1]):
        print(f"  {country}: {count} papers")


if __name__ == "__main__":
    main()
