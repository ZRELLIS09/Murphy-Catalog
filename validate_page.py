#!/usr/bin/env python3
"""
Murphy Catalog Page Validator

Runs the full quality checklist against a rendered PDF.
Returns 0 if all hard-rule checks pass, 1 otherwise.

Usage:
    python validate_page.py /path/to/page.pdf
"""
import sys
import subprocess
from pathlib import Path


def check_pages(pdf_path):
    """Must be exactly 1 page."""
    result = subprocess.run(
        ["pdfinfo", str(pdf_path)], capture_output=True, text=True
    )
    for line in result.stdout.splitlines():
        if line.startswith("Pages:"):
            n = int(line.split()[1])
            return (n == 1, f"Pages: {n} (expected 1)")
    return (False, "Could not determine page count")


def check_page_size(pdf_path):
    """Must be US Letter 612 × 792 pt."""
    result = subprocess.run(
        ["pdfinfo", str(pdf_path)], capture_output=True, text=True
    )
    for line in result.stdout.splitlines():
        if line.startswith("Page size:"):
            ok = "612 x 792" in line
            return (ok, line.strip())
    return (False, "Could not determine page size")


def check_type3_fonts(pdf_path):
    """Zero Type 3 fonts (synthetic bold)."""
    result = subprocess.run(
        ["pdffonts", str(pdf_path)], capture_output=True, text=True
    )
    type3_count = sum(1 for line in result.stdout.splitlines() if "Type 3" in line)
    return (type3_count == 0, f"Type 3 fonts: {type3_count} (expected 0)")


def check_fonts_embedded(pdf_path):
    """All fonts must be embedded."""
    result = subprocess.run(
        ["pdffonts", str(pdf_path)], capture_output=True, text=True
    )
    lines = result.stdout.splitlines()
    # Skip the header rows
    data_lines = [l for l in lines if l and not l.startswith(('name', '----'))]
    if not data_lines:
        return (False, "No fonts found in PDF")
    not_embedded = []
    for line in data_lines:
        parts = line.split()
        if len(parts) >= 6:
            # Layout: name type encoding emb sub uni objectID
            # 'emb' is typically the 4th-from-left column
            # Find 'yes'/'no' in the embedded column
            if "no" in parts[3:6]:
                not_embedded.append(parts[0])
    if not_embedded:
        return (False, f"Fonts not embedded: {', '.join(not_embedded)}")
    return (True, f"All fonts embedded ({len(data_lines)} fonts)")


def check_balance_gap(pdf_path):
    """Gap between content and tagline must be 5–15pt."""
    try:
        import pdfplumber
    except ImportError:
        return (None, "pdfplumber not installed — skipping balance check")

    try:
        with pdfplumber.open(pdf_path) as pdf:
            page = pdf.pages[0]
            words = page.extract_words()

            # Heuristics: last features bullet often ends with words like
            # 'damaged', 'service', 'eyes', 'request', 'tons', etc.
            feature_keywords = {
                "damaged", "service", "request", "eyes",
                "tons", "available", "configuration", "use",
            }
            feature_bottoms = [
                w["bottom"]
                for w in words
                if w["text"].lower().strip(".,").strip() in feature_keywords
            ]

            # Tagline starts with "FROM COMMON TO CUSTOM"
            tagline_top = next(
                (w["top"] for w in words if w["text"] == "COMMON"), None
            )

            if not feature_bottoms or tagline_top is None:
                return (
                    None,
                    "Could not locate feature/tagline anchors — manual check needed",
                )

            gap = tagline_top - max(feature_bottoms)
            ok = 5 <= gap <= 15
            status = (
                "OK"
                if ok
                else f"OUT OF RANGE (target 5–15pt; tune density per 07-spec-tables.md)"
            )
            return (ok, f"Balance gap: {gap:.1f}pt — {status}")
    except Exception as e:
        return (None, f"Balance check failed: {e}")


def main():
    if len(sys.argv) != 2:
        print("Usage: validate_page.py /path/to/page.pdf")
        sys.exit(2)

    pdf_path = Path(sys.argv[1])
    if not pdf_path.exists():
        print(f"File not found: {pdf_path}")
        sys.exit(2)

    print(f"Validating: {pdf_path}\n")

    checks = [
        ("1. Single page", check_pages),
        ("2. Page size", check_page_size),
        ("3. Type 3 fonts", check_type3_fonts),
        ("4. Fonts embedded", check_fonts_embedded),
        ("5. Page balance", check_balance_gap),
    ]

    all_pass = True
    for label, fn in checks:
        ok, msg = fn(pdf_path)
        symbol = "✓" if ok is True else ("✗" if ok is False else "?")
        print(f"  {symbol} {label}: {msg}")
        if ok is False:
            all_pass = False

    print()
    if all_pass:
        print("✓ All hard-rule checks passed. Ready to ship.")
        sys.exit(0)
    else:
        print("✗ Validation failed. Fix the issues above before shipping.")
        sys.exit(1)


if __name__ == "__main__":
    main()
