# Product Data Conventions

How product information should appear in the catalog. These conventions ensure consistency across hundreds of SKUs and prevent the most common authoring slips.

## Units

| Use | Convention |
|---|---|
| Working Load Limit / Rated Capacity | **tons** (2,000 lbs) — written as `5T`, `1-1/2T`, etc. when in cell. Spelled "tons" in headers and footnotes. |
| Diameter (rope, chain, pin) | **inches** as fractions: `1/4"`, `3/8"`, `9/16"`, `1-3/8"`. Use straight quote, not curly. |
| Length (sling, chain) | **feet-inches** with hyphen separator: `5'-6"`, `12'-0"`. Always show inches even if zero. |
| Weight | **lbs** for ≤500, **lbs** still for larger but consider showing tons too |
| Dimensions on drawings | **inches**, sometimes with decimals: `3.5"`, `4-1/2"` |

## Fractions

| Display | When to use |
|---|---|
| `1/4"`, `3/8"`, `1/2"` | Standard rigging fractions — always slash format |
| `1-1/2"`, `2-3/4"` | Compound fractions — hyphen-separated, all on one line |
| Never use: `0.25"`, `1.5"` | Decimal in catalog is unusual; only on engineering specs |

## Em-dash, en-dash, hyphen — when to use which

- **Em-dash (—)** for range punctuation in headlines and prose: `From Common to Custom — We Do It All`
- **En-dash (–)** for numeric ranges: `0.65 – 77 tons`
- **Hyphen (-)** for compound words and within fraction strings: `EIPS-IWRC`, `1-1/2"`

For HTML entity references: `&mdash;` (—), `&ndash;` (–), `&#8722;` (−, minus sign).

## Interpunct vs middot vs bullet

- **Interpunct (·)** for inline list separators: `7/19 SS · Type 302/304 · Vinyl Coated`. HTML: `&middot;`
- **Bullet (•)** for vertical list bullets: `• Mechanical Flemish Eye splice`. HTML: `&bull;`
- The orange bullet markers in features lists are CSS-generated, not character bullets.

## Product naming

| Pattern | Example | Notes |
|---|---|---|
| Standard generic | `Standard Eye & Eye Wire Rope Slings` | Title case, & not "and" |
| Model series | `Grippa GRC-1.5 Rail Lifting Clamps` | Brand · model · description |
| Construction spec subtitle | `EIPS-IWRC · MECHANICAL SPLICE · FLEMISH EYE · SINGLE LEG · DESIGN FACTOR 5:1` | All-caps, interpunct separators, ends without period |

## Item numbers / SKUs

**Always omit supplier item numbers from spec tables.** Murphy uses its own catalog identifiers. Even if the source data has columns like "Item No." or "Part No." from a manufacturer's spec sheet, drop them — they're noise on a Murphy-branded page.

## Branding from upstream sources

When sourcing data from manufacturer PDFs (e.g., Lexco for wire rope spec, supplier catalogs for cable cross-sections), strip the original branding:
- Remove logos, company names, "Made by X" callouts
- Use only the technical data
- Reformat to Murphy's color scheme and typography

The exception: industry-standard references (ASME B30.9, ASTM A153, ISO 2408) — those get cited verbatim in footnotes as compliance signals.

## Product-specific naming conventions

| Category | Subtitle elements expected |
|---|---|
| Wire rope sling pages | Construction (`EIPS-IWRC`, `EEIP-IWRC`), splice (`Mechanical Splice`, `Flemish Eye`), config (`Single Leg`, `2-Leg Bridle`), design factor |
| Chain sling pages | Grade (`Grade 80`, `Grade 100`, `Grade 120`), config (`Single Leg`, `2-Leg`, etc.), reach |
| Synthetic sling pages | Material (`Polyester`, `Nylon`), web width, ply count |
| Shackle pages | Type (`Screw Pin`, `Bolt Type`, `Round Pin`), shape (`Anchor`, `Chain`), grade |
| Hoist pages | Type (`Hand Chain`, `Lever`, `Electric`), capacity range, lift height range |

## Verbatim data preservation

When transferring data from a source spec sheet to the spec table:

1. Numbers stay exactly as the source has them. `0.65` stays `0.65`, not `0.7`.
2. Units stay as the source has them. `T` stays `T`, not converted to "tons" inline.
3. Fractions stay in the source format. `1-1/2"` stays `1-1/2"`, not converted to `1.5"`.
4. Anomalies in the source stay unless the user authorizes correction. If row 12 has `15T` for hook and row 13 has `15T` for the next size up, leave both — that's the manufacturer's stocking spec, not an error to "fix".

## Capacity column conventions

For sling pages, capacity columns in this order:
1. **Vertical** (the reference, 100%)
2. **Choker** (~75% of vertical)
3. **Basket** or **Vertical Basket** (2× vertical at D/d 25)

For other product types, capacity columns go in order of typical usage:
- Eye bolts: working load (in-line), working load (at angle)
- Shackles: working load only (single column)
- Hoists: rated capacity (lift), often single column

## "Special construction" badge convention

Some sling pages need to flag rows with special construction. Examples:
- Pages with mixed 302/304 vs 316 stainless: use small color-coded SS-type badges per row
- Pages with mixed vinyl coatings: consolidate MBS into side-by-side columns

This is rare. Don't invent the badge system on a new page — refer to the 7×7 SS Vinyl Coated and 7×19 Vinyl Coated reference pages.

## When in doubt

Defer to consistency with already-shipped pages over what "would be cleaner." A new page that mixes conventions with the rest of the catalog hurts more than slight imperfections within one page.
