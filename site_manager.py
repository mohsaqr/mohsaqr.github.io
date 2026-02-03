#!/usr/bin/env python3
"""
Site Manager - A simple backend for managing your Jekyll GitHub Pages site.
Run: python site_manager.py
"""

import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# Try to import yaml, provide helpful message if missing
try:
    import yaml
except ImportError:
    print("Error: PyYAML is required. Install it with: pip install pyyaml")
    sys.exit(1)

# Configuration
SITE_DIR = Path(__file__).parent
POSTS_DIR = SITE_DIR / "_posts"
NEWS_DIR = SITE_DIR / "_news"
PAGES_DIR = SITE_DIR / "_pages"
PROJECTS_DIR = SITE_DIR / "_projects"
ABOUT_FILE = PAGES_DIR / "about.md"

# Available homepage sections
AVAILABLE_SECTIONS = [
    "profile",         # Profile image and contact info
    "content",         # Main bio text
    "news",            # News announcements
    "contact_note",    # Contact message
    "books",           # Books section
    "newsletter",      # Newsletter signup
    "latest_posts",    # Recent blog posts
    "selected_papers", # Selected publications
    "social",          # Social media icons
]

DEFAULT_SECTION_ORDER = [
    "profile",
    "content",
    "news",
    "contact_note",
    "books",
    "newsletter",
    "latest_posts",
    "selected_papers",
    "social",
]

# Default content templates
DEFAULT_POST_CONTENT = """<!-- Write your post content here -->

## Introduction

Start writing your post here...
"""

DEFAULT_PAGE_CONTENT = """<!-- Write your page content here -->

Start writing your page content here...
"""

# Colors for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.END}")
    print(f"{Colors.HEADER}{Colors.BOLD}  {text}{Colors.END}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.END}\n")

def print_success(text):
    print(f"{Colors.GREEN}✓ {text}{Colors.END}")

def print_error(text):
    print(f"{Colors.FAIL}✗ {text}{Colors.END}")

def print_info(text):
    print(f"{Colors.CYAN}→ {text}{Colors.END}")

def run_command(cmd, capture=False):
    """Run a shell command."""
    try:
        if capture:
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=SITE_DIR)
            return result.stdout.strip()
        else:
            subprocess.run(cmd, shell=True, check=True, cwd=SITE_DIR)
            return True
    except subprocess.CalledProcessError as e:
        print_error(f"Command failed: {e}")
        return False

def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text

def get_input(prompt, default=None, required=True):
    """Get user input with optional default."""
    if default:
        display = f"{prompt} [{default}]: "
    else:
        display = f"{prompt}: "

    value = input(display).strip()

    if not value and default:
        return default
    if not value and required:
        print_error("This field is required.")
        return get_input(prompt, default, required)
    return value

def get_multiline_input(prompt):
    """Get multiline input from user."""
    print(f"{prompt} (type 'END' on a new line when done):")
    lines = []
    while True:
        line = input()
        if line.strip().upper() == 'END':
            break
        lines.append(line)
    return '\n'.join(lines)

def open_in_editor(filepath):
    """Open file in default editor."""
    editor = os.environ.get('EDITOR', 'nano')
    # Try common editors
    editors = ['code', 'subl', 'atom', 'nano', 'vim', 'vi']

    for ed in [editor] + editors:
        try:
            subprocess.run([ed, str(filepath)], check=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            continue

    print_info(f"Could not open editor. File created at: {filepath}")
    return False

# ============================================================================
# YAML Front Matter Parsing
# ============================================================================

def parse_front_matter(filepath):
    """Parse YAML front matter from a markdown file.

    Returns:
        tuple: (front_matter_dict, content_after_front_matter, raw_front_matter_text)
    """
    content = filepath.read_text()

    # Match front matter between --- markers
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)', content, re.DOTALL)
    if not match:
        return {}, content, ""

    front_matter_text = match.group(1)
    body_content = match.group(2)

    try:
        front_matter = yaml.safe_load(front_matter_text) or {}
    except yaml.YAMLError as e:
        print_error(f"Error parsing YAML: {e}")
        return {}, content, front_matter_text

    return front_matter, body_content, front_matter_text

def write_front_matter(filepath, front_matter, body_content):
    """Write front matter and content back to a markdown file."""
    # Custom YAML dump to preserve formatting
    yaml_content = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True, sort_keys=False)

    new_content = f"---\n{yaml_content}---\n{body_content}"
    filepath.write_text(new_content)

def update_section_order_in_file(filepath, new_order):
    """Update only the section_order in a file, preserving other formatting.

    This is more conservative than write_front_matter - it only modifies
    the section_order key while keeping everything else intact.
    """
    content = filepath.read_text()

    # Match front matter
    match = re.match(r'^(---\s*\n)(.*?)(\n---\s*\n?)(.*)', content, re.DOTALL)
    if not match:
        return False

    front_start = match.group(1)  # ---\n
    front_matter_text = match.group(2)
    front_end = match.group(3)  # \n---\n
    body = match.group(4)

    # Build the section_order YAML block
    order_yaml = "section_order:\n" + "\n".join(f"  - {s}" for s in new_order)

    # Check if section_order already exists
    section_order_pattern = r'section_order:\s*\n(?:[ \t]*-[^\n]*\n?)+'
    if re.search(section_order_pattern, front_matter_text):
        # Replace existing section_order
        new_front_matter = re.sub(section_order_pattern, order_yaml + "\n", front_matter_text)
    else:
        # Add section_order at the end of front matter
        new_front_matter = front_matter_text.rstrip() + "\n\n" + order_yaml + "\n"

    new_content = front_start + new_front_matter + front_end + body
    filepath.write_text(new_content)
    return True

def get_section_order():
    """Get the current section order from about.md."""
    if not ABOUT_FILE.exists():
        print_error(f"About file not found: {ABOUT_FILE}")
        return DEFAULT_SECTION_ORDER.copy()

    front_matter, _, _ = parse_front_matter(ABOUT_FILE)

    if 'section_order' in front_matter:
        return front_matter['section_order']

    return DEFAULT_SECTION_ORDER.copy()

def set_section_order(new_order):
    """Set the section order in about.md front matter."""
    if not ABOUT_FILE.exists():
        print_error(f"About file not found: {ABOUT_FILE}")
        return False

    return update_section_order_in_file(ABOUT_FILE, new_order)

# ============================================================================
# Homepage Section Reordering
# ============================================================================

def reorder_sections():
    """Interactive interface for reordering homepage sections."""
    print_header("Reorder Homepage Sections")

    current_order = get_section_order()

    print("Available sections:")
    for section in AVAILABLE_SECTIONS:
        desc = {
            "profile": "Profile image and contact info",
            "content": "Main bio text",
            "news": "News announcements",
            "contact_note": "Contact message",
            "books": "Books section",
            "newsletter": "Newsletter signup",
            "latest_posts": "Recent blog posts",
            "selected_papers": "Selected publications",
            "social": "Social media icons",
        }.get(section, "")
        print(f"  • {section}: {desc}")

    print()

    while True:
        print(f"\n{Colors.BOLD}Current order:{Colors.END}")
        for i, section in enumerate(current_order, 1):
            print(f"  {Colors.CYAN}{i:2}.{Colors.END} {section}")

        print(f"\n{Colors.BOLD}Commands:{Colors.END}")
        print("  m <from> <to>  - Move section (e.g., 'm 3 1' moves item 3 to position 1)")
        print("  s <a> <b>      - Swap sections (e.g., 's 2 5' swaps items 2 and 5)")
        print("  a <section>    - Add section (e.g., 'a newsletter')")
        print("  r <num>        - Remove section (e.g., 'r 3')")
        print("  reset          - Reset to default order")
        print("  d              - Done (save and exit)")
        print("  q              - Quit without saving")

        cmd = get_input("\nCommand", required=False)
        if not cmd:
            continue

        parts = cmd.strip().split()
        action = parts[0].lower()

        if action == 'd':
            # Save and exit
            if set_section_order(current_order):
                print_success("Section order saved!")
                commit = get_input("\nCommit and push changes? (y/n)", "y")
                if commit.lower() == 'y':
                    commit_and_push("Update homepage section order")
            break

        elif action == 'q':
            print_info("Changes discarded.")
            break

        elif action == 'reset':
            current_order = DEFAULT_SECTION_ORDER.copy()
            print_success("Reset to default order.")

        elif action == 'm' and len(parts) == 3:
            try:
                from_idx = int(parts[1]) - 1
                to_idx = int(parts[2]) - 1
                if 0 <= from_idx < len(current_order) and 0 <= to_idx < len(current_order):
                    item = current_order.pop(from_idx)
                    current_order.insert(to_idx, item)
                    print_success(f"Moved '{item}' to position {to_idx + 1}.")
                else:
                    print_error("Invalid position numbers.")
            except ValueError:
                print_error("Usage: m <from> <to> (e.g., 'm 3 1')")

        elif action == 's' and len(parts) == 3:
            try:
                idx_a = int(parts[1]) - 1
                idx_b = int(parts[2]) - 1
                if 0 <= idx_a < len(current_order) and 0 <= idx_b < len(current_order):
                    current_order[idx_a], current_order[idx_b] = current_order[idx_b], current_order[idx_a]
                    print_success(f"Swapped positions {idx_a + 1} and {idx_b + 1}.")
                else:
                    print_error("Invalid position numbers.")
            except ValueError:
                print_error("Usage: s <a> <b> (e.g., 's 2 5')")

        elif action == 'a' and len(parts) == 2:
            section = parts[1].lower()
            if section not in AVAILABLE_SECTIONS:
                print_error(f"Unknown section: {section}")
                print_info(f"Available: {', '.join(AVAILABLE_SECTIONS)}")
            elif section in current_order:
                print_error(f"Section '{section}' is already in the order.")
            else:
                current_order.append(section)
                print_success(f"Added '{section}' at the end.")

        elif action == 'r' and len(parts) == 2:
            try:
                idx = int(parts[1]) - 1
                if 0 <= idx < len(current_order):
                    removed = current_order.pop(idx)
                    print_success(f"Removed '{removed}'.")
                else:
                    print_error("Invalid position number.")
            except ValueError:
                print_error("Usage: r <num> (e.g., 'r 3')")

        else:
            print_error("Unknown command. Use 'm', 's', 'a', 'r', 'reset', 'd', or 'q'.")

# ============================================================================
# Blog Post Management
# ============================================================================

def create_blog_post():
    """Create a new blog post."""
    print_header("Create New Blog Post")

    title = get_input("Post title")
    description = get_input("Short description", required=False)
    tags = get_input("Tags (space-separated)", "blog", required=False)
    categories = get_input("Categories (space-separated)", "general", required=False)

    # Generate filename
    date = datetime.now()
    date_str = date.strftime("%Y-%m-%d")
    time_str = date.strftime("%Y-%m-%d %H:%M:%S") + date.strftime("%z") or "-0400"
    slug = slugify(title)
    filename = f"{date_str}-{slug}.md"
    filepath = POSTS_DIR / filename

    # Check if file exists
    if filepath.exists():
        overwrite = get_input(f"File {filename} already exists. Overwrite? (y/n)", "n")
        if overwrite.lower() != 'y':
            print_info("Cancelled.")
            return

    # Ask for content method
    print("\nHow would you like to add content?")
    print("  1. Write here (simple text)")
    print("  2. Open in editor (recommended)")
    print("  3. Create empty post to fill later")
    choice = get_input("Choice", "2")

    content = ""
    if choice == "1":
        content = get_multiline_input("\nPost content (Markdown supported)")

    # Create front matter
    front_matter = f"""---
layout: post
title: {title}
date: {time_str}
description: {description or 'A new blog post'}
tags: {tags}
categories: {categories}
giscus_comments: true
related_posts: true
---

{content if content else DEFAULT_POST_CONTENT}
"""

    # Write file
    filepath.write_text(front_matter)
    print_success(f"Created: {filepath}")

    if choice == "2":
        open_in_editor(filepath)

    # Ask to commit
    commit = get_input("\nCommit and push now? (y/n)", "y")
    if commit.lower() == 'y':
        commit_and_push(f"Add blog post: {title}")

def list_blog_posts():
    """List all blog posts."""
    print_header("Blog Posts")

    posts = sorted(POSTS_DIR.glob("*.md"), reverse=True)
    if not posts:
        print_info("No blog posts found.")
        return

    for i, post in enumerate(posts[:20], 1):
        name = post.stem
        print(f"  {Colors.CYAN}{i:2}.{Colors.END} {name}")

    if len(posts) > 20:
        print(f"\n  ... and {len(posts) - 20} more posts")

def edit_blog_post():
    """Edit an existing blog post."""
    print_header("Edit Blog Post")

    posts = sorted(POSTS_DIR.glob("*.md"), reverse=True)
    if not posts:
        print_info("No blog posts found.")
        return

    for i, post in enumerate(posts[:20], 1):
        name = post.stem
        print(f"  {i:2}. {name}")

    choice = get_input("\nEnter number to edit (or 'q' to cancel)")
    if choice.lower() == 'q':
        return

    try:
        idx = int(choice) - 1
        if 0 <= idx < len(posts):
            open_in_editor(posts[idx])
            commit = get_input("\nCommit and push changes? (y/n)", "y")
            if commit.lower() == 'y':
                commit_and_push(f"Update blog post: {posts[idx].stem}")
    except ValueError:
        print_error("Invalid selection.")

# ============================================================================
# News Management
# ============================================================================

def create_news():
    """Create a new news announcement."""
    print_header("Create News Announcement")

    # Find next announcement number
    existing = list(NEWS_DIR.glob("announcement_*.md"))
    next_num = len(existing) + 1

    content = get_input("News content (one line, Markdown supported)")

    date = datetime.now()
    date_str = date.strftime("%Y-%m-%d %H:%M:%S-0400")

    front_matter = f"""---
layout: post
date: {date_str}
inline: true
related_posts: false
---

{content}
"""

    filename = f"announcement_{next_num}.md"
    filepath = NEWS_DIR / filename
    filepath.write_text(front_matter)

    print_success(f"Created: {filepath}")

    commit = get_input("\nCommit and push now? (y/n)", "y")
    if commit.lower() == 'y':
        commit_and_push(f"Add news: {content[:50]}...")

def list_news():
    """List all news items."""
    print_header("News Announcements")

    news = sorted(NEWS_DIR.glob("*.md"), reverse=True)
    if not news:
        print_info("No news items found.")
        return

    for item in news:
        content = item.read_text()
        # Extract the content after front matter
        parts = content.split('---')
        if len(parts) >= 3:
            text = parts[2].strip()[:80]
            print(f"  • {item.name}: {text}...")

# ============================================================================
# Page Management
# ============================================================================

def create_page():
    """Create a new page."""
    print_header("Create New Page")

    title = get_input("Page title")
    permalink = get_input("URL path (e.g., /mypage/)", f"/{slugify(title)}/")
    nav = get_input("Show in navigation? (y/n)", "y")
    nav_order = get_input("Navigation order (1-10)", "5") if nav.lower() == 'y' else None
    description = get_input("Page description", required=False)

    front_matter = f"""---
layout: page
title: {title}
permalink: {permalink}
description: {description or ''}
{"nav: true" if nav.lower() == 'y' else "nav: false"}
{"nav_order: " + nav_order if nav_order else ""}
---

<!-- Write your page content here -->

## {title}

Start writing your page content here...
"""

    filename = f"{slugify(title)}.md"
    filepath = PAGES_DIR / filename

    if filepath.exists():
        overwrite = get_input(f"File {filename} exists. Overwrite? (y/n)", "n")
        if overwrite.lower() != 'y':
            return

    filepath.write_text(front_matter)
    print_success(f"Created: {filepath}")

    edit = get_input("\nOpen in editor? (y/n)", "y")
    if edit.lower() == 'y':
        open_in_editor(filepath)

    commit = get_input("\nCommit and push now? (y/n)", "y")
    if commit.lower() == 'y':
        commit_and_push(f"Add page: {title}")

def list_pages():
    """List all pages."""
    print_header("Pages")

    pages = sorted(PAGES_DIR.glob("*.md"))
    for page in pages:
        print(f"  • {page.stem}")

def edit_page():
    """Edit an existing page."""
    print_header("Edit Page")

    pages = sorted(PAGES_DIR.glob("*.md"))
    if not pages:
        print_info("No pages found.")
        return

    for i, page in enumerate(pages, 1):
        print(f"  {i:2}. {page.stem}")

    choice = get_input("\nEnter number to edit (or 'q' to cancel)")
    if choice.lower() == 'q':
        return

    try:
        idx = int(choice) - 1
        if 0 <= idx < len(pages):
            open_in_editor(pages[idx])
            commit = get_input("\nCommit and push changes? (y/n)", "y")
            if commit.lower() == 'y':
                commit_and_push(f"Update page: {pages[idx].stem}")
    except ValueError:
        print_error("Invalid selection.")

# ============================================================================
# Git Operations
# ============================================================================

def git_status():
    """Show git status."""
    print_header("Git Status")
    run_command("git status")

def commit_and_push(message=None):
    """Commit all changes and push to GitHub."""
    print_header("Commit & Push")

    # Show status first
    status = run_command("git status --short", capture=True)
    if not status:
        print_info("No changes to commit.")
        return

    print("Changes to commit:")
    print(status)
    print()

    if not message:
        message = get_input("Commit message", f"Update site content - {datetime.now().strftime('%Y-%m-%d')}")

    print_info("Adding all changes...")
    if not run_command("git add -A"):
        return

    print_info("Committing...")
    if not run_command(f'git commit -m "{message}"'):
        return

    print_info("Pushing to GitHub...")
    if run_command("git push"):
        print_success("Successfully pushed to GitHub!")
        print_info("Your site will update in a few minutes at https://saqr.me")

def pull_latest():
    """Pull latest changes from GitHub."""
    print_header("Pull Latest")
    if run_command("git pull"):
        print_success("Pulled latest changes.")

def preview_site():
    """Preview site locally."""
    print_header("Preview Site")
    print_info("Starting local Jekyll server...")
    print_info("Press Ctrl+C to stop")
    print_info("Open http://localhost:4000 in your browser")
    print()
    try:
        run_command("bundle exec jekyll serve --livereload")
    except KeyboardInterrupt:
        print("\nServer stopped.")

# ============================================================================
# Quick Actions
# ============================================================================

def quick_post():
    """Quick blog post - minimal prompts."""
    print_header("Quick Blog Post")

    title = get_input("Title")
    content = get_multiline_input("\nContent (Markdown)")

    date = datetime.now()
    date_str = date.strftime("%Y-%m-%d")
    time_str = date.strftime("%Y-%m-%d %H:%M:%S-0400")
    slug = slugify(title)

    post = f"""---
layout: post
title: {title}
date: {time_str}
description:
tags: blog
categories: general
giscus_comments: true
---

{content}
"""

    filepath = POSTS_DIR / f"{date_str}-{slug}.md"
    filepath.write_text(post)
    print_success(f"Created: {filepath}")

    if get_input("Push to GitHub? (y/n)", "y").lower() == 'y':
        commit_and_push(f"Add post: {title}")

def quick_news():
    """Quick news - one line."""
    print_header("Quick News")

    content = get_input("News (one line)")

    existing = list(NEWS_DIR.glob("announcement_*.md"))
    next_num = len(existing) + 1
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S-0400")

    post = f"""---
layout: post
date: {date_str}
inline: true
related_posts: false
---

{content}
"""

    filepath = NEWS_DIR / f"announcement_{next_num}.md"
    filepath.write_text(post)
    print_success(f"Created: {filepath}")

    if get_input("Push to GitHub? (y/n)", "y").lower() == 'y':
        commit_and_push(f"Add news: {content[:30]}...")

# ============================================================================
# Main Menu
# ============================================================================

def main_menu():
    """Main menu loop."""
    while True:
        print_header("Site Manager - saqr.me")

        print(f"{Colors.BOLD}Quick Actions:{Colors.END}")
        print("  1. Quick Blog Post")
        print("  2. Quick News")
        print()
        print(f"{Colors.BOLD}Blog Posts:{Colors.END}")
        print("  3. Create Blog Post (detailed)")
        print("  4. Edit Blog Post")
        print("  5. List Blog Posts")
        print()
        print(f"{Colors.BOLD}News:{Colors.END}")
        print("  6. Create News")
        print("  7. List News")
        print()
        print(f"{Colors.BOLD}Pages:{Colors.END}")
        print("  8. Create Page")
        print("  9. Edit Page")
        print(" 10. List Pages")
        print()
        print(f"{Colors.BOLD}Homepage:{Colors.END}")
        print(" 11. Reorder Homepage Sections")
        print()
        print(f"{Colors.BOLD}Git & Deploy:{Colors.END}")
        print(" 12. Commit & Push All Changes")
        print(" 13. Git Status")
        print(" 14. Pull Latest")
        print(" 15. Preview Site Locally")
        print()
        print("  q. Quit")
        print()

        choice = get_input("Choose option", required=False)

        actions = {
            '1': quick_post,
            '2': quick_news,
            '3': create_blog_post,
            '4': edit_blog_post,
            '5': list_blog_posts,
            '6': create_news,
            '7': list_news,
            '8': create_page,
            '9': edit_page,
            '10': list_pages,
            '11': reorder_sections,
            '12': commit_and_push,
            '13': git_status,
            '14': pull_latest,
            '15': preview_site,
        }

        if choice.lower() == 'q':
            print_info("Goodbye!")
            break
        elif choice in actions:
            try:
                actions[choice]()
            except KeyboardInterrupt:
                print("\nCancelled.")
        else:
            print_error("Invalid option.")

        input(f"\n{Colors.CYAN}Press Enter to continue...{Colors.END}")

if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print("\n\nGoodbye!")
        sys.exit(0)
