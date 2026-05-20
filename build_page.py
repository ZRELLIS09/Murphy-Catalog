#!/usr/bin/env python3
"""
Murphy Catalog Page Builder

Renders an HTML page to PDF via WeasyPrint, then runs the validator.

Usage:
    python build_page.py input.html output.pdf
"""
import sys
import subprocess
from pathlib import Path


def main():
    if len(sys.argv) != 3:
        print("Usage: build_page.py input.html output.pdf")
        sys.exit(2)

    html_path = Path(sys.argv[1])
    pdf_path = Path(sys.argv[2])

    if not html_path.exists():
        print(f"HTML not found: {html_path}")
        sys.exit(2)

    print(f"Rendering: {html_path} → {pdf_path}")

    try:
        from weasyprint import HTML

        HTML(str(html_path)).write_pdf(str(pdf_path))
        print(f"✓ Rendered: {pdf_path.stat().st_size:,} bytes\n")
    except ImportError:
        print("✗ WeasyPrint not installed. Run: pip install weasyprint --break-system-packages")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Render failed: {e}")
        sys.exit(1)

    # Run the validator
    validator = Path(__file__).parent / "validate_page.py"
    if validator.exists():
        result = subprocess.run([sys.executable, str(validator), str(pdf_path)])
        sys.exit(result.returncode)
    else:
        print("? Validator not found — PDF rendered but not validated")
        sys.exit(0)


if __name__ == "__main__":
    main()
