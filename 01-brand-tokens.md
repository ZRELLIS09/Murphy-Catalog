# Brand Tokens

Murphy Industrial Products design tokens. These are the named variables that define every catalog asset. Use them by name; never inline a value that has a token.

## CSS variable declarations

Paste this block into every page's `<style>`:

```css
:root {
  /* Greens — primary palette */
  --green:           #3E6B38;   /* Default green (header bands, table headers) */
  --green-dk:        #2D4F28;   /* Darker green (sub-header rows) */
  --green-deeper:    #1F3A1B;   /* Deepest green (footer bar, body text on cream) */
  --green-black:     #142711;   /* For dark hero backgrounds */

  /* Oranges — accent palette */
  --orange:          #E8600A;   /* Primary accent (rules, bullets, highlights) */
  --logo-orange:     #F7941D;   /* Logo orange variant (slightly warmer) */
  --orange-dk:       #C44D00;   /* Darker orange for shadow/depth */

  /* Neutrals — paper & rule palette */
  --cream:           #F0EDE8;   /* Primary cream (logo background, hero panels) */
  --paper:           #FBFAF6;   /* Lighter paper (editorial-style page backgrounds) */
  --beige-header:    #F0EDE8;   /* Top header band */
  --beige-row:       #F7F5F2;   /* Alt-row stripe in spec tables */
  --grid:            #E8E4DD;   /* Cell borders, rules */
  --rule:            #CCCCCC;   /* Light separators */

  /* Functional colors */
  --warn-bg:         #FFF8F0;   /* Warning panel background */
  --warn-border:     #D43D3D;   /* Warning panel left border */
  --footnote:        #888888;   /* Footnote gray */
  --subtitle:        #6B7368;   /* Subtitle gray-green */
  --body:            #1A1A1A;   /* Body text on light backgrounds */

  /* Fonts */
  --font-display:    'Bebas Neue', Impact, sans-serif;
  --font-body:       'Source Sans 3', 'Segoe UI', sans-serif;
  --font-glyph:      'DejaVu Sans', sans-serif;   /* For ⚠ warning glyph */
}
```

## Color semantics — when to use what

| Token | Used for | Avoid for |
|---|---|---|
| `--green` | Section/page header band, spec table header row, breadcrumb bar | Body text (too low contrast on cream) |
| `--green-dk` | Spec table sub-header row, group-header borders | Large solid areas (too heavy) |
| `--green-deeper` | Footer bar background, body text on cream backgrounds, primary contact info text | Backgrounds for orange accents (orange disappears) |
| `--green-black` | Cover hero background only | Anywhere a printer's ink density limits matter |
| `--orange` | Bullets, rules, hover/highlight states, "CTA" stripes | Body text runs (illegible at small size) |
| `--logo-orange` | Logo orange tick + tagline text, secondary accents | Anywhere `--orange` is already in use (creates noise) |
| `--cream` | Logo background panels, hero info blocks | Below ~10% page area (visual weight imbalance) |
| `--paper` | Editorial-style page backgrounds, content zones below hero | Header/footer bands (too pale) |
| `--beige-row` | Alternating spec table rows | Anywhere `--cream` is dominant (loses contrast) |
| `--grid` | Cell borders, subtle dividers | Anywhere a strong visual break is needed |

## Logo system

Three variants. Choose by background.

| File | Use on | Contrast principle |
|---|---|---|
| `assets/logos/murphy_logo.png` | Light cream/beige backgrounds where the logo's native cream halo blends | Stamp / labeled element |
| `assets/logos/murphy_logo_dk.png` | Paper (`--paper`) or cream pages, **no halo** | Logo blends with page background |
| `assets/logos/murphy_logo_white.png` | Dark greens or photo backgrounds, **no halo** | Logo blends with dark background |

**Logo halo rule:** Use the halo only when the logo is placed on top of a dramatic photo or color block AND the user wants the logo to read as a labeled element (like a wine bottle's neck label). For natural integration into the page (header bands, paper pages, dark green hero columns), use the transparent variants and let the page background show through.

**Logo sizing:**
- Header band: ~145pt wide (Bebas Neue companion glyph at 18pt size; wordmark scaled to match)
- Cover prominent placement: 170–210pt wide
- Footer bar inline mention: not used — footer uses Bebas Neue "MURPHY" text instead
- DPI watch: source logo PNGs are ~254px wide. At 210pt rendered, that's ~91 DPI. Below 300. For higher quality, ask user for SVG or higher-res raster.

## Contact information (canonical strings)

Use these exact strings. Never paraphrase.

```
Murphy Industrial Products, Inc.
1430 N Post Oak Rd
Houston, Texas 77055

866-848-2032 (toll-free)
713-868-1032 (local)

sameday@murphylift.com

Monday — Friday
7:45 AM — 5:30 PM CT
```

## Catalog metadata strings

| Field | String |
|---|---|
| Tagline | `From Common to Custom — We Do It All` |
| Brand promise | `Lift. Pull. Tie Down.` |
| Edition (2026) | `2026 Edition · Vol. 41` |
| Catalog title | `2026 Product Catalog` |
| URL display | `murphylift.com` (lowercase, no scheme) |
| URL Bebas display | `MURPHYLIFT.COM` (uppercase, for orange Bebas footer strip) |

## Stat strip canonical values

Used on cover, hero panels, and CTA strips:

| Stat | String | Context |
|---|---|---|
| Same-day ship rate | `80% Same Day` | Generic; or `Orders ship same day` with `80%` numeric |
| Stock | `10,000+ Slings In Stock` or `10K+` | Use full phrase on hero, short form in stat tiles |
| Free shipping | `Free Shipping $50+` | |
| Trust | `4.8 Trustpilot · 700+ reviews` | Verify count is still current before shipping |

## Don't invent new tokens

If a design moment seems to need a color or font not in this list, stop. Talk to the user. Adding tokens is a brand decision, not a per-page design decision.
