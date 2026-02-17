#!/usr/bin/env python3
"""Extract authors, institutions, and countries from publication YAML frontmatter.

Reads all _publications/*.md files, parses YAML frontmatter, and produces:
  - paper_authors.csv:      paper_id, year, title, authors
  - paper_countries.csv:    paper_id, year, title, countries, affiliations_raw
  - author_summary.csv:     canonical_name, paper_count, raw_variants
  - institution_summary.csv: canonical_institution, country, paper_count, raw_variants
"""

import csv
import os
import re
import sys
import unicodedata
import yaml

PUBLICATIONS_DIR = os.path.join(os.path.dirname(__file__), "..", "_publications")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..")

# ============================================================
# COUNTRY EXTRACTION
# ============================================================

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

# ============================================================
# AUTHOR NAME CANONICALIZATION
# ============================================================

# Explicit mapping: raw "Given Family" → canonical name
# Covers encoding issues, typos, abbreviations, and variant forms
AUTHOR_CANON = {
    # Encoding corruption / accent variants
    "Sonsoles LÃ\u00b3pez-Pernas": "Sonsoles López-Pernas",
    "Sonsoles Lopez-Pernas": "Sonsoles López-Pernas",
    "Sonosles López-Pernas": "Sonsoles López-Pernas",
    # Mohammed Saqr variants
    "Mohamed Saqr": "Mohammed Saqr",
    "M. Saqr": "Mohammed Saqr",
    # Miguel Conde variants
    "Miguel A. Conde": "Miguel Ángel Conde",
    "Miguel Á. Conde": "Miguel Ángel Conde",
    "Miguel Ángel Conde-González": "Miguel Ángel Conde",
    "Miguel Ángel Conde González": "Miguel Ángel Conde",
    "Miguel Angel Conde": "Miguel Ángel Conde",
    # Jelena Jovanovic
    "Jelena Jovanovic": "Jelena Jovanović",
    # Miroslava Raspopovic Milic
    "Miroslava Raspopovic Milic": "Miroslava Raspopović Milić",
    # Leonie Vogelsmeier spacing
    "Leonie V. D. E. Vogelsmeier": "Leonie V.D.E. Vogelsmeier",
    # Fitsum Deriba
    "Fitsum Gizachew Deriba": "Fitsum G. Deriba",
    # Emorie Beck
    "Emorie D Beck": "Emorie Beck",
    # Olga Pavlovic
    "Olga Pavlovic": "Olga Pavlović",
    # Crina Damsa
    "Crina Damsa": "Crina Damşa",
    # Ward Peeters typo
    "Ward Peteers": "Ward Peeters",
    # Nicolas/Nicholas Pope
    "Nicholas Pope": "Nicolas Pope",
    # Angel Hernández-García variants
    "Angel Hernández-García": "Ángel Hernández-García",
    "Ángel Hernández García": "Ángel Hernández-García",
    # Solomon Oyelere
    "Solomon sunday Oyelere": "Solomon Oyelere",
    # Erkko Sointu
    "Erkko Tapio Sointu": "Erkko Sointu",
    # Mikko Apiola typo
    "Mikko Apioia": "Mikko Apiola",
    # Yazid Albadarin
    "Yazid AlBadarin": "Yazid Albadarin",
    # Abbreviated names
    "A. Kleingeld": "Ad Kleingeld",
    "C. Snijders": "Chris Snijders",
    "U. Matzat": "Uwe Matzat",
    "S. Heikkinen": "Sami Heikkinen",
    "T.S. Cristea": "Tudor Cristea",
    "R. Conijn": "R. Conijn",  # no full form available, keep as-is
    # Elitsa Peltekova
    "Elitsa V. Peltekova": "Elitsa Peltekova",
    # Eduardo Oliveira
    "Eduardo Araujo Oliveira": "Eduardo Oliveira",
    # Srećko Joksimović — keep canonical form
    "Srećko Joksimović": "Srećko Joksimović",
}


def canonicalize_author(given, family):
    """Return canonical author name from given+family."""
    raw = f"{given} {family}".strip()
    if not raw:
        return ""
    return AUTHOR_CANON.get(raw, raw)


# ============================================================
# INSTITUTION NORMALIZATION
# ============================================================

# Ordered list of (pattern, canonical_name, country)
# Patterns are matched against the full affiliation string (case-insensitive)
INSTITUTION_PATTERNS = [
    # Finland
    (r"university of eastern finland", "University of Eastern Finland", "Finland"),
    (r"university of jyväskylä|jyväskylä", "University of Jyväskylä", "Finland"),
    (r"aalto university", "Aalto University", "Finland"),
    (r"university of turku", "University of Turku", "Finland"),
    (r"university of oulu|learning and educational technology research unit.*oulu|educational sciences.*teacher education.*oulu", "University of Oulu", "Finland"),
    (r"university of helsinki", "University of Helsinki", "Finland"),
    (r"university of lapland", "University of Lapland", "Finland"),
    (r"lab university of applied sciences", "LAB University of Applied Sciences", "Finland"),
    (r"valamis group", "Valamis Group", "Finland"),
    # Spain
    (r"universidad polit[eé]cnica de madrid|polytechnic university of madrid|univerisidad polit|technical university of madrid", "Universidad Politécnica de Madrid", "Spain"),
    (r"universidad de salamanca|escuela polit.*zamora.*salamanca", "Universidad de Salamanca", "Spain"),
    (r"universidad? de le[oó]n|university of le[oó]n", "University of León", "Spain"),
    (r"universidad internacional de la rioja", "Universidad Internacional de la Rioja", "Spain"),
    (r"university of alicante", "University of Alicante", "Spain"),
    (r"university of zaragoza", "University of Zaragoza", "Spain"),
    (r"universidad de burgos|university of burgos", "University of Burgos", "Spain"),
    (r"la salle.*ramon llull", "La Salle-Universitat Ramon Llull", "Spain"),
    # Sweden
    (r"kth royal institute of technology", "KTH Royal Institute of Technology", "Sweden"),
    (r"stockholm university", "Stockholm University", "Sweden"),
    (r"lule[åa] university of technology", "Luleå University of Technology", "Sweden"),
    (r"uppsala university", "Uppsala University", "Sweden"),
    # Norway
    (r"university of bergen", "University of Bergen", "Norway"),
    (r"university of oslo", "University of Oslo", "Norway"),
    # Germany
    (r"fernuniversit[aä]t|university of hagen", "FernUniversität in Hagen", "Germany"),
    (r"university of kassel", "University of Kassel", "Germany"),
    (r"university of osnabr[uü]ck", "University of Osnabrück", "Germany"),
    (r"university of siegen", "University of Siegen", "Germany"),
    (r"university of g[oö]ttingen", "University of Göttingen", "Germany"),
    (r"tu darmstadt", "TU Darmstadt", "Germany"),
    (r"german aerospace center", "German Aerospace Center", "Germany"),
    # Australia
    (r"university of south australia", "University of South Australia", "Australia"),
    (r"university of melbourne", "University of Melbourne", "Australia"),
    (r"monash university", "Monash University", "Australia"),
    # Serbia
    (r"belgrade metropolitan university", "Belgrade Metropolitan University", "Serbia"),
    (r"university of belgrade", "University of Belgrade", "Serbia"),
    (r"union university.*belgrade|school of computing.*union.*belgrade", "Union University", "Serbia"),
    # Saudi Arabia
    (r"qassim university", "Qassim University", "Saudi Arabia"),
    (r"king abdulaziz university", "King Abdulaziz University", "Saudi Arabia"),
    # Netherlands
    (r"tilburg university", "Tilburg University", "Netherlands"),
    (r"eindhoven university of technology", "Eindhoven University of Technology", "Netherlands"),
    (r"university of groningen", "University of Groningen", "Netherlands"),
    (r"maastricht university", "Maastricht University", "Netherlands"),
    # Ireland
    (r"maynooth university", "Maynooth University", "Ireland"),
    (r"university of limerick", "University of Limerick", "Ireland"),
    (r"university college dublin", "University College Dublin", "Ireland"),
    (r"tu dublin", "TU Dublin", "Ireland"),
    (r"ulster university", "Ulster University", "Ireland"),
    # China
    (r"beijing normal university", "Beijing Normal University", "China"),
    (r"peking university", "Peking University", "China"),
    (r"chengdu university of technology", "Chengdu University of Technology", "China"),
    (r"northwest university.*xi.an", "Northwest University", "China"),
    # Japan
    (r"kanda university", "Kanda University of International Studies", "Japan"),
    (r"kumamoto university", "Kumamoto University", "Japan"),
    # Switzerland
    (r"university of geneva", "University of Geneva", "Switzerland"),
    (r"university of st\.?\s*gallen", "University of St. Gallen", "Switzerland"),
    # Belgium
    (r"ku leuven", "KU Leuven", "Belgium"),
    (r"university of antwerp", "University of Antwerp", "Belgium"),
    # United Kingdom
    (r"durham university", "Durham University", "United Kingdom"),
    (r"university of edinburgh", "University of Edinburgh", "United Kingdom"),
    (r"university of glasgow", "University of Glasgow", "United Kingdom"),
    (r"swansea university", "Swansea University", "United Kingdom"),
    (r"university of cambridge", "University of Cambridge", "United Kingdom"),
    # France
    (r"universit[eé] de montpellier", "Université de Montpellier", "France"),
    (r"universit[eé].*compi[eè]gne|UTC.*Compi", "Université de Technologie de Compiègne", "France"),
    (r"center for research and interdisciplinarity.*paris|university of paris", "Université de Paris", "France"),
    # Bulgaria
    (r"sofia university", "Sofia University", "Bulgaria"),
    # Turkey
    (r"hacettepe university", "Hacettepe University", "Turkey"),
    (r"middle east technical university", "Middle East Technical University", "Turkey"),
    (r"ankara university", "Ankara University", "Turkey"),
    (r"inonu university", "Inonu University", "Turkey"),
    # Denmark
    (r"copenhagen business school", "Copenhagen Business School", "Denmark"),
    (r"university of copenhagen", "University of Copenhagen", "Denmark"),
    # Greece
    (r"university of macedonia", "University of Macedonia", "Greece"),
    (r"national technical university of athens", "National Technical University of Athens", "Greece"),
    # Palestine
    (r"an-najah national university", "An-Najah National University", "Palestine"),
    # United States
    (r"university of florida", "University of Florida", "United States"),
    (r"university of minnesota", "University of Minnesota", "United States"),
    (r"stanford university", "Stanford University", "United States"),
    (r"university of nevada", "University of Nevada", "United States"),
    (r"temple university", "Temple University", "United States"),
    (r"university of north texas", "University of North Texas", "United States"),
    (r"uc davis|university of california.*davis", "UC Davis", "United States"),
    (r"university of utah", "University of Utah", "United States"),
    (r"university of south carolina", "University of South Carolina", "United States"),
    (r"university of washington", "University of Washington", "United States"),
    (r"virginia tech", "Virginia Tech", "United States"),
    (r"willamette university", "Willamette University", "United States"),
    (r"ryerson university", "Ryerson University", "Canada"),
    # Other countries
    (r"university of luxembourg", "University of Luxembourg", "Luxembourg"),
    (r"university of nicosia", "University of Nicosia", "Cyprus"),
    (r"zagreb university", "Zagreb University of Applied Sciences", "Croatia"),
    (r"indira gandhi.*open university", "Indira Gandhi National Open University", "India"),
    (r"universit[aà].*perugia", "Università degli Studi di Perugia", "Italy"),
    (r"ibn sina hospital", "Ibn Sina Hospital", "Kuwait"),
    (r"vilnius university", "Vilnius University", "Lithuania"),
    (r"city university of macau", "City University of Macau", "Macao"),
    (r"universiti teknologi mara", "Universiti Teknologi MARA", "Malaysia"),
    (r"tecnologico de monterrey", "Tecnológico de Monterrey", "Mexico"),
    (r"university of namibia", "University of Namibia", "Namibia"),
    (r"pontifical catholic university of peru", "Pontifical Catholic University of Peru", "Peru"),
    (r"university of coimbra", "University of Coimbra", "Portugal"),
    (r"university of porto", "University of Porto", "Portugal"),
    (r"prince of songkla university", "Prince of Songkla University", "Thailand"),
    (r"american university in cairo", "American University in Cairo", "Egypt"),
]


def normalize_institution(affiliation_str):
    """Match an affiliation string to a canonical institution name and country."""
    lower = affiliation_str.lower()
    for pattern, canon, country in INSTITUTION_PATTERNS:
        if re.search(pattern, lower):
            return canon, country
    return affiliation_str.strip(), None


# ============================================================
# YAML PARSING
# ============================================================

def parse_frontmatter(filepath):
    """Extract YAML frontmatter from a markdown file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return None
    return yaml.safe_load(match.group(1))


def paper_id_from_filename(filename):
    """Extract paper ID from filename by removing .md extension."""
    return os.path.splitext(filename)[0]


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
            candidate = seg.rsplit(",", 1)[1].strip()
            countries.append(candidate)
        else:
            found = UNIVERSITY_COUNTRY.get(seg)
            if found:
                countries.append(found)
            else:
                countries.append(f"UNKNOWN({seg})")
    seen = set()
    unique = []
    for c in countries:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return "; ".join(unique)


# ============================================================
# MAIN
# ============================================================

def main():
    pub_dir = os.path.abspath(PUBLICATIONS_DIR)
    out_dir = os.path.abspath(OUTPUT_DIR)

    md_files = sorted(f for f in os.listdir(pub_dir) if f.endswith(".md"))
    print(f"Found {len(md_files)} publication files")

    # Accumulators
    authors_rows = []        # paper_id, year, title, authors (canonical)
    countries_rows = []      # paper_id, year, title, countries, affiliations_raw
    unknown_countries = []

    # For summary CSVs
    author_paper_map = {}    # canonical_name → set of paper_ids
    author_raw_map = {}      # canonical_name → set of raw name strings
    inst_paper_map = {}      # canonical_institution → set of paper_ids
    inst_raw_map = {}        # canonical_institution → set of raw affiliation strings
    inst_country_map = {}    # canonical_institution → country

    for filename in md_files:
        filepath = os.path.join(pub_dir, filename)
        meta = parse_frontmatter(filepath)
        if meta is None:
            print(f"  WARNING: No frontmatter in {filename}", file=sys.stderr)
            continue

        paper_id = paper_id_from_filename(filename)
        year = meta.get("year", "")
        title = meta.get("title", "")

        # --- Authors ---
        raw_authors = meta.get("authors") or []
        canonical_names = []
        for a in raw_authors:
            given = a.get("given", "") or ""
            family = a.get("family", "") or ""
            raw_name = f"{given} {family}".strip()
            canon = canonicalize_author(given, family)
            if not canon:
                continue
            canonical_names.append(canon)
            author_paper_map.setdefault(canon, set()).add(paper_id)
            if raw_name != canon:
                author_raw_map.setdefault(canon, set()).add(raw_name)

        authors_rows.append({
            "paper_id": paper_id,
            "year": year,
            "title": title,
            "authors": ", ".join(canonical_names),
        })

        # --- Countries ---
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

            # --- Institutions ---
            for seg in affiliations_raw.split(";"):
                seg = seg.strip()
                if not seg:
                    continue
                canon_inst, country = normalize_institution(seg)
                inst_paper_map.setdefault(canon_inst, set()).add(paper_id)
                inst_raw_map.setdefault(canon_inst, set()).add(seg)
                if country:
                    inst_country_map[canon_inst] = country

    # ---- Write paper_authors.csv ----
    authors_path = os.path.join(out_dir, "paper_authors.csv")
    with open(authors_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["paper_id", "year", "title", "authors"])
        writer.writeheader()
        writer.writerows(authors_rows)
    print(f"Wrote {len(authors_rows)} rows to paper_authors.csv")

    # ---- Write paper_countries.csv ----
    countries_path = os.path.join(out_dir, "paper_countries.csv")
    with open(countries_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["paper_id", "year", "title", "countries", "affiliations_raw"]
        )
        writer.writeheader()
        writer.writerows(countries_rows)
    print(f"Wrote {len(countries_rows)} rows to paper_countries.csv")

    # ---- Write author_summary.csv ----
    author_summary_path = os.path.join(out_dir, "author_summary.csv")
    author_rows = []
    for name, pids in sorted(author_paper_map.items(), key=lambda x: (-len(x[1]), x[0])):
        raw_variants = author_raw_map.get(name, set())
        author_rows.append({
            "canonical_name": name,
            "paper_count": len(pids),
            "raw_variants": "; ".join(sorted(raw_variants)) if raw_variants else "",
        })
    with open(author_summary_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["canonical_name", "paper_count", "raw_variants"])
        writer.writeheader()
        writer.writerows(author_rows)
    print(f"Wrote {len(author_rows)} rows to author_summary.csv")

    # ---- Write institution_summary.csv ----
    inst_summary_path = os.path.join(out_dir, "institution_summary.csv")
    inst_rows = []
    for inst, pids in sorted(inst_paper_map.items(), key=lambda x: (-len(x[1]), x[0])):
        raw_variants = inst_raw_map.get(inst, set())
        country = inst_country_map.get(inst, "")
        inst_rows.append({
            "canonical_institution": inst,
            "country": country,
            "paper_count": len(pids),
            "raw_variants_count": len(raw_variants),
            "raw_variants": " | ".join(sorted(raw_variants)),
        })
    with open(inst_summary_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["canonical_institution", "country", "paper_count",
                           "raw_variants_count", "raw_variants"]
        )
        writer.writeheader()
        writer.writerows(inst_rows)
    print(f"Wrote {len(inst_rows)} rows to institution_summary.csv")

    # ---- Reports ----
    if unknown_countries:
        print(f"\n--- {len(unknown_countries)} papers with UNKNOWN countries ---")
        for pid, ctrs, raw in unknown_countries:
            print(f"  {pid}: {ctrs}")
    else:
        print("\nNo UNKNOWN countries found.")

    # Author clustering report
    clustered = {k: v for k, v in author_raw_map.items() if v}
    print(f"\n--- Author name clustering: {len(clustered)} names had variants merged ---")
    for canon, variants in sorted(clustered.items(), key=lambda x: x[0]):
        print(f"  {canon} ← {', '.join(sorted(variants))}")

    # Institution normalization report
    multi_variant_insts = {k: v for k, v in inst_raw_map.items()
                           if len(v) > 1 and k in inst_country_map}
    print(f"\n--- Institution normalization: {len(multi_variant_insts)} institutions had multiple raw forms ---")
    for inst, variants in sorted(multi_variant_insts.items(), key=lambda x: (-len(x[1]), x[0])):
        print(f"  {inst} ({len(variants)} variants, {len(inst_paper_map[inst])} papers)")

    # Unmatched institutions (no pattern matched)
    unmatched = [inst for inst in inst_paper_map if inst not in inst_country_map]
    if unmatched:
        print(f"\n--- {len(unmatched)} unmatched institution strings (no pattern) ---")
        for inst in sorted(unmatched):
            print(f"  {inst} ({len(inst_paper_map[inst])} papers)")

    # Country summary
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
