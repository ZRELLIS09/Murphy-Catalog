# Quality Checklist

Run every item before declaring a page done. These are not nice-to-haves — these are pre-flight checks that prevent the page from being silently broken.

## Technical validation (mandatory, automate via scripts/validate_page.py)

### 1. Single page
```bash
pdfinfo /mnt/user-data/outputs/your-page.pdf | grep "Pages"
# Must read: Pages: 1
```
If >1, content is overflowing — apply compression moves from `07-spec-tables.md`.

### 2. Zero Type 3 fonts
```bash
pdffonts /mnt/user-data/outputs/your-page.pdf | grep -c "Type 3"
# Must read: 0
```
If >0, find the offending element. Almost always Bebas Neue with `font-weight: 700`. Change to `font-weight: 400`.

### 3. Correct page size
```bash
pdfinfo /mnt/user-data/outputs/your-page.pdf | grep "Page size"
# Must read: 612 x 792 pts (letter)
```

### 4. All fonts embedded
```bash
pdffonts /mnt/user-data/outputs/your-page.pdf
# Every row must show 'yes' under 'emb' column
```

### 5. Page balance gap
```python
import pdfplumber
with pdfplumber.open("output.pdf") as pdf:
    page = pdf.pages[0]
    words = page.extract_words()
    # Find bottom of last features bullet
    feature_bottoms = [w['bottom'] for w in words
                       if w['text'] in ('damaged','service','request','eyes','tons')]
    # Find top of tagline
    tagline = next((w['top'] for w in words if w['text']=='COMMON'), None)
    gap = tagline - max(feature_bottoms)
    assert 5 <= gap <= 15, f"Balance gap is {gap:.1f}pt (target 5–15pt)"
```

## Brand validation (visual review by Claude)

### 6. Color tokens — no inline values

Scan the HTML for color hex values. Every color should be `var(--token)`. Inline values like `#3E6B38` or `#fff` are a tell that someone bypassed the system.

Exception: SVG content (icons, illustrations) may use inline hex because SVG doesn't always pick up CSS variables in WeasyPrint. The hex should match a token value.

### 7. Logo correctness

- Header band: uses Bebas Neue `MURPHY` text + tagline, NOT a `<img>` of the logo
- Cover hero: uses one of the three logo PNG variants, no halo unless intentional
- Footer: uses Bebas Neue text, NOT a logo image

### 8. Canonical contact strings

Verify these appear unchanged:
- `Murphy Industrial Products, Inc.`
- `1430 N Post Oak Rd`
- `Houston, Texas 77055`
- `866-848-2032`
- `713-868-1032`
- `sameday@murphylift.com`
- `Monday — Friday`
- `7:45 AM — 5:30 PM CT`

### 9. Tagline and brand promise

- Tagline: `FROM COMMON TO CUSTOM — WE DO IT ALL` (em-dash, not hyphen)
- Brand promise: `LIFT. PULL. TIE DOWN.` (periods after each verb)
- Edition: `2026 Edition · Vol. 41` (interpunct, not asterisk or pipe)

### 10. Footer URL

`MURPHYLIFT.COM` in Bebas Neue, color `--orange`, in the dark green footer bar.

## Content validation

### 11. Data preserved verbatim

Compare the spec table values to the source data. Numbers, units, sizes, fractions — all must match exactly. No paraphrasing. No normalizing fractions (e.g., 1-1/2" stays as 1-1/2", not 1.5"). No correcting apparent typos in the source without user permission.

### 12. Em-dashes for blank cells

Empty cells should contain `&mdash;`, not blank, not `N/A`, not `-`.

### 13. Page number placeholder

`PAGE XX` (uppercase, with space) in both the top-right header and the bottom-right footer. Real page numbers come during final catalog assembly.

### 14. Hitch capacity factors (sling pages)

- Vertical: `100% Rated Cap.`
- Choker: `~75% Rated Cap.`
- Basket: `2× Vertical Cap.*`
- The asterisk on Basket links to the footnote about D/d ratio

### 15. Standard rigging footnote (sling pages)

Verify the standard 5-clause footnote appears:
1. Basket capacities based on D/d ratio of 25
2. All capacities in tons (2,000 lbs)
3. Pin diameter rule (no larger than natural eye width)
4. Horizontal sling angles less than 30° prohibited
5. Choker capacities apply at choke angles ≥120°
6. ASME B30.9 stamping requirement

## Visual validation (render at 200 DPI and inspect)

### 16. Render preview
```bash
pdftoppm -png -r 200 output.pdf preview -f 1 -l 1
# Check preview-1.png
```

### 17. Hero photo inspection

- Photo is sharp at intended print size (no obvious pixelation)
- Subject is properly framed (not cropped through critical features)
- Background is consistent with the rest of the catalog
- If schematic: dimensions are readable, extension lines have proper gaps, arrowheads point inward

### 18. Spec table inspection

- Alt rows clearly visible (#F7F5F2 has enough contrast against white)
- Orange left rule on key column is continuous (no gaps between rows)
- All numbers center-aligned in their cells
- Header row text is not cropped (size 6.4pt at row height 24pt should not overflow)
- Group headers visually distinct from sub-headers (darker green, orange bottom border)

### 19. Hitch callouts inspection (sling pages)

- Three callouts visible: Vertical, Choker, Basket
- Each shows hook + sling + LOAD clearly
- Vertical has rectangular load; Choker and Basket have round loads
- Capacity factors readable below each illustration
- Orange top border on each callout

### 20. Bottom-of-page elements

- Tagline centered, full visual weight (12pt Bebas Neue green)
- Contact line readable below tagline
- Footer bar dark green, three sections visible: company/city, section name in orange, edition/page
- No content from above is overlapping any of these

## Process validation

### 21. File location
- HTML scratch at `/home/claude/*.html`
- Final PDF at `/mnt/user-data/outputs/<page-name>.pdf`
- Lowercase filename with hyphens, no spaces

### 22. Surface with present_files
After validating, surface the PDF to the user via `present_files`. Don't make them ask.

### 23. Short, factual summary message
Tell the user what was built and what was preserved verbatim. Don't oversell. If there's a known limitation (e.g., source photo is low resolution), say so plainly.

## When something fails

Do not ship a page that fails any of #1–5 (technical validation). Those are hard blocks. Fix or escalate.

For #6–23, use judgment. If item #15 (footnote) is missing because the source data didn't include it, ask the user before silently adding standard text. If item #11 (verbatim data) seems to require correcting a typo in the source, ask before correcting.

## Standing rule: if you find yourself iterating more than twice on the same page

Stop and ask the user what specifically is wrong, with specific options:
- Drawing type? (photo vs schematic)
- Position of element X? (top/bottom/left/right)
- Sizing/proportions? (too big/too small)
- Color or weight? (lighter/heavier)
- Something else entirely?

Iterating blindly burns trust and time. Asking is better than guessing.
