# Typography

The Murphy catalog uses three fonts. The hierarchy below is non-negotiable — it has been calibrated for US Letter print at WeasyPrint's rendering and produces consistent visual weight across all page archetypes.

## Font stack

| Font | Weights available | Use |
|---|---|---|
| **Bebas Neue** | Regular only (400) | Display: titles, headers, footers, all-caps labels |
| **Source Sans 3** | Regular 400, SemiBold 600, Bold 700 | Body text, captions, table data, paragraph copy |
| **DejaVu Sans** | Bold 700 | Special-glyph fallback (⚠ warning glyph, ›‹‹ chevrons) |

## Bebas Neue is ALWAYS font-weight 400

This is the single most common bug. Bebas Neue ships only in Regular. If you write `font-weight: 700` or `font-weight: bold` on a Bebas Neue element, WeasyPrint synthesizes a fake bold, which becomes a Type 3 font in the output PDF. Type 3 fonts fail validation.

**For more visual weight in Bebas Neue:**
- Increase `font-size` (24pt vs 18pt)
- Increase `letter-spacing` (1pt, 1.5pt, 2pt)
- Set color to `--green` or `--orange` for chromatic weight
- Pair with a Source Sans 3 Bold sublabel below

Never use:
```css
font-family: 'Bebas Neue';
font-weight: 700;  /* WRONG — produces Type 3 */
```

Always:
```css
font-family: 'Bebas Neue';
font-weight: 400;  /* required */
```

## Type scale

The scale is opinionated — these are the only sizes that should appear in a catalog page. Deviating means you're either inventing a new tier (talk to the user first) or solving the wrong problem.

| Role | Font | Size | Weight | Letter-spacing | Color | Notes |
|---|---|---|---|---|---|---|
| **Page title** (e.g. "Standard Eye & Eye Wire Rope Slings") | Bebas Neue | 20pt | 400 | 0.5pt | `--green` | One per page |
| **Section header** (e.g. "Rated Capacities & Dimensions") | Bebas Neue | 11pt | 400 | 1pt | `--green-dk` | With 4pt orange square marker before |
| **Subtitle** (under page title, all-caps with `·` separators) | Source Sans 3 | 7.5pt | 600 | 1.6pt | `--subtitle` (#6B7368) | Border-bottom 1pt orange below |
| **Breadcrumb band** (green band) | Bebas Neue | 9pt | 400 | 1pt | white | Orange `›` separators at 8pt |
| **URL in breadcrumb** | Bebas Neue | 9pt | 400 | 1pt | `--orange` | |
| **Header band logo "MURPHY"** | Bebas Neue | 18pt | 400 | 0.5pt | `--green` | With 15.7pt × 3.46pt logo-orange tick before |
| **Header band tagline** ("LIFT. PULL. TIE DOWN.") | Source Sans 3 | 5pt | 600 | 0.4pt | `--green` | Below MURPHY wordmark |
| **Section mark** (center of header band) | Source Sans 3 | 7pt | 600 | 1.5pt | `--green` | All-caps |
| **Page number** ("PAGE XX") | Bebas Neue | 10pt | 400 | 1pt | `--green` | Always placeholder until final assembly |
| **Table header row** | Source Sans 3 | 6.4pt | 600 | 0.5pt | white | All-caps |
| **Table group header** (above sub-columns) | Source Sans 3 | 6.5pt | 600 | 0.5pt | white | All-caps, on `--green-dk` |
| **Table data cell** | Source Sans 3 | 7pt | 400 | 0 | `--body` | |
| **Table diameter/key column** | Source Sans 3 | 7.2pt | 700 | 0.2pt | `--orange` | With left-border 1.5pt `--orange` |
| **Warning panel text** | Source Sans 3 | 7pt | 600 | 0 | `#2A2A2A` | With ⚠ glyph in DejaVu Sans Bold |
| **Body block text** (hero right column intro) | Source Sans 3 | 7.5pt | 400 | 0 | `--body` | line-height 1.45 |
| **Callout name** ("Vertical", "Choker", "Basket") | Bebas Neue | 9.5pt | 400 | 1pt | `--green-deeper` | |
| **Callout factor** ("100% Rated Cap.") | Source Sans 3 | 5.8pt | 600 | 0.8pt | `--subtitle` | All-caps |
| **3-col features H4** | Bebas Neue | 9pt | 400 | 0.6pt | `--green` | |
| **3-col features bullets** | Source Sans 3 | 6.5pt | 400 | 0 | `--body` | line-height 1.4, orange • bullets |
| **Footnote** | Source Sans 3 | 6pt | 400 | 0 | `--footnote` | line-height 1.5 |
| **Tagline** ("FROM COMMON TO CUSTOM — WE DO IT ALL") | Bebas Neue | 12pt | 400 | 1.5pt | `--green` | All-caps, centered |
| **Contact line** | Source Sans 3 | 8pt | 400 | 0.5pt | `--subtitle` | Centered |
| **Footer bar — center** ("WIRE ROPE SLINGS") | Bebas Neue | 11pt | 400 | 2.5pt | `--orange` | All-caps |
| **Footer bar — flanks** | Source Sans 3 | 6.5pt | 400 | 1pt | rgba(255,255,255,0.85) | All-caps |

## Line-height

| Context | Value |
|---|---|
| Bebas Neue display (titles, headers) | 1.0 to 1.1 |
| Source Sans 3 body paragraphs | 1.45 to 1.5 |
| Source Sans 3 in tables | 1.2 to 1.3 (tight) |
| Source Sans 3 in bullets | 1.4 |
| Subtitle with `·` separators | 1.2 |

## Letter-spacing convention

Bebas Neue gets explicit letter-spacing because the typeface tracks tightly by default. Source Sans 3 generally gets 0 letter-spacing except in small-caps labels.

| Bebas Neue use | Letter-spacing |
|---|---|
| Large titles (20pt+) | 0.5pt to 1pt |
| Medium headers (10–14pt) | 1pt to 2pt |
| Small labels (5–8pt) | 1.5pt to 4pt (the smaller, the more spacing) |

| Source Sans 3 use | Letter-spacing |
|---|---|
| Body paragraphs | 0 |
| Subtitle bars (small all-caps with `·`) | 1.5pt to 3pt |
| Stat tile labels | 1pt to 2pt |

## Font loading (paste this exact block at top of `<style>`)

```css
@font-face {
  font-family: 'Bebas Neue';
  src: url('file:///home/claude/skills/murphy-catalog-design-system/assets/fonts/BebasNeue-Regular.ttf') format('truetype');
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: 'Source Sans 3';
  src: url('file:///home/claude/skills/murphy-catalog-design-system/assets/fonts/SourceSans3-Regular.ttf') format('truetype');
  font-weight: 400; font-style: normal;
}
@font-face {
  font-family: 'Source Sans 3';
  src: url('file:///home/claude/skills/murphy-catalog-design-system/assets/fonts/SourceSans3-SemiBold.ttf') format('truetype');
  font-weight: 600; font-style: normal;
}
@font-face {
  font-family: 'Source Sans 3';
  src: url('file:///home/claude/skills/murphy-catalog-design-system/assets/fonts/SourceSans3-Bold.ttf') format('truetype');
  font-weight: 700; font-style: normal;
}
@font-face {
  font-family: 'DejaVu Sans';
  src: url('file:///home/claude/skills/murphy-catalog-design-system/assets/fonts/DejaVuSans-Bold.ttf') format('truetype');
  font-weight: 700; font-style: normal;
}
```
