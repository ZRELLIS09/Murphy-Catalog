# Grid & Spacing

The Murphy catalog uses a vertical structure of fixed-position bands plus an internal grid for the content zone. This isn't a 12-column InDesign grid — it's an HTML/CSS grid driven by absolute positioning at the page level and flex/grid at the content level. The result behaves like a magazine spread.

## Page structure (US Letter, 612 × 792 pt)

```
┌────────────────────────────────────────────────────┐  0
│  BEIGE HEADER BAND (31.5pt tall)                  │
│  - Murphy logo + tick + tagline      | section    │
│  - Section name (centered)          | PAGE XX     │
│  Border-bottom: 1pt orange                        │ 31.5
├────────────────────────────────────────────────────┤
│  GREEN BREADCRUMB BAND (15.1pt tall)              │
│  Wire Rope Slings › Eye & Eye › Single Leg | URL  │
│  Border-bottom: 1pt orange                        │ 46.6
├────────────────────────────────────────────────────┤  47.6
│  CONTENT ZONE                                     │
│  Padding: 0 25.2pt                                │
│  Top: 47.6pt                                      │
│  Bottom: 90pt (reserved for tagline/contact/footer)│
│                                                   │
│  [Title bar — 6pt top margin]                     │
│  [Hero block — title-bar bottom border to ~190pt] │
│  [Section header — 10pt top margin]               │
│  [Spec table — variable height by row count]      │
│  [Footnote — 5pt top padding]                     │
│  [3-col features — 8pt top margin]                │
│                                                   │
│  ↓ All content must fit above the tagline zone    │ 702
├────────────────────────────────────────────────────┤
│  TAGLINE                                           │ 715  (bottom: 65pt)
│  FROM COMMON TO CUSTOM — WE DO IT ALL             │
│                                                   │
│  CONTACT LINE                                     │ 733  (bottom: 47pt)
│  866-848-2032 · murphylift.com · ...              │
│                                                   │
├────────────────────────────────────────────────────┤  745  (bottom: 25.5pt + 20.6pt height)
│  FOOTER BAR — Dark green                          │
│  MURPHY INDUSTRIAL PRODUCTS, INC. · HOUSTON, TX   │
│  [Section name in orange] | 2026 CATALOG · PAGE XX│
└────────────────────────────────────────────────────┘  792
```

## Fixed measurements (use these exact values)

| Element | Position | Size |
|---|---|---|
| **Beige header band** | `top: 0`, `left: 0`, `right: 0` | `height: 31.5pt`, padding `0 25.2pt`, border-bottom 1pt `--orange` |
| **Green breadcrumb band** | `top: 31.5pt`, `left: 0`, `right: 0` | `height: 15.1pt`, padding `0 25.2pt`, border-bottom 1pt `--orange` |
| **Content zone** | `top: 47.6pt`, `left: 25.2pt`, `right: 25.2pt`, `bottom: 90pt` | (flow-based, no fixed height) |
| **Tagline** | `bottom: 65pt`, `left: 0`, `right: 0` | centered |
| **Contact line** | `bottom: 47pt`, `left: 0`, `right: 0` | centered |
| **Footer bar** | `bottom: 25.5pt`, `left: 0`, `right: 0` | `height: 20.6pt`, padding `0 25.2pt`, dark green |

## Hero block (the most-iterated zone)

For BC/BCD-style product pages and sling pages, the hero is a two-column layout:

```
.hero {
  position: relative;
  margin-top: 6pt;
  min-height: <varies by archetype>;
}

/* LEFT — product image / schematic */
.hero-photo {
  position: absolute;
  top: 2pt;
  left: 0;
  width: 172.8pt;
  height: <varies — see "Hero photo height" below>;
}

/* RIGHT — warning + body + 3 callouts */
.hero-right {
  margin-left: 182.8pt;   /* photo width + 10pt gap */
  display: flex;
  flex-direction: column;
  gap: 4pt;
}
```

### Hero photo height — depends on row count of the spec table

| Spec table row count | Hero photo height | min-height of .hero |
|---|---|---|
| ≤8 rows | 210pt (large) | 220pt |
| 8–15 rows | 180pt | 190pt |
| 15–25 rows | 162pt | 168pt |
| 25–40 rows | 130pt | 140pt |

### Drawings (for BC/BCD-style) horizontal alignment

When a product page has 3 spec callouts above the drawings (BC/BCD layout), the drawings must align with the right column — NOT centered in full content width.

```css
.drawings {
  margin-left: 182.8pt;   /* same as .hero-right */
  /* drawings sit centered under the 3 callouts above */
  display: flex;
  justify-content: center;
}
```

The center of the drawings group lands at x ≈ 397.4pt (the midpoint of the right column).

## Callouts row (3-up)

```css
.callouts {
  display: flex;
  gap: 5pt;
  margin-top: 3pt;
}
.callout {
  flex: 1;
  background: var(--beige-row);
  border-top: 1.5pt solid var(--orange);
  height: <76pt for icon callouts, 39.3pt for text-only callouts>;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5pt 4pt 4pt;
}
```

## Spec table

Full content width inside the content zone. `border-collapse: collapse`, `table-layout: fixed`. Column widths set via `<colgroup>`.

Typical column distribution for a 9-col sling table at 561.6pt available width:
- Dia / key column: 50pt
- Capacity columns (×3): 53pt each = 159pt
- Eye Hook: 50pt
- W: 50pt
- L: 50pt
- Min length: 88pt (wider, descriptive)
- Total: 447pt (leaves room for slight per-column adjustment)

## 3-col features section

```css
.three-col {
  display: flex;
  margin-top: 8pt;
  gap: 14pt;
}
.three-col .col { flex: 1; }
```

H4 in Bebas Neue 9pt green, bullets in Source Sans 3 6.5pt with orange • markers.

## Spacing rhythm

The catalog uses a roughly 4pt vertical rhythm. Margins and gaps:

| Between | Distance |
|---|---|
| Title and subtitle | 6.5pt |
| Subtitle bottom border to hero | 8pt |
| Hero bottom to section header | 10pt |
| Section header to spec table | 4pt |
| Spec table to footnote | 5pt |
| Footnote to 3-col features | 8pt |
| Last feature row to tagline | **5–15pt** (THE BALANCE CHECK) |

## The page balance check (mandatory)

After every render, measure the gap between the bottom of the 3-col features and the top of the tagline. Target: 5–15pt.

- **>30pt:** Page is under-filled. Scale up hero photo, table row heights, capacity sub-header height, features font size, add more bullets per column.
- **<0pt:** Content is overflowing into the tagline. Compress per `07-spec-tables.md`.
- **15–30pt:** Acceptable but not ideal. Consider one bump up in density.

Measurement script (paste into a Python cell):

```python
import pdfplumber
with pdfplumber.open("output.pdf") as pdf:
    page = pdf.pages[0]
    words = page.extract_words()
    feature_bottoms = [w['bottom'] for w in words if w['text'] in ('damaged', 'service', 'eyes', 'request')]
    tagline_top = next((w['top'] for w in words if w['text'] == 'COMMON'), None)
    if feature_bottoms and tagline_top:
        gap = tagline_top - max(feature_bottoms)
        print(f"Gap: {gap:.1f}pt — {'OK' if 5 <= gap <= 15 else 'TUNE'}")
```
