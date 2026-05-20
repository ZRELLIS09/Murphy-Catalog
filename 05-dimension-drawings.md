# Dimension Drawings

This is the reference that prevents the wire rope sling page failures. Dimension callouts on Murphy product diagrams must follow ASME Y14.5 conventions adapted for catalog (not engineering shop) use. The conventions are simple but unforgiving — getting them wrong is what makes a diagram look amateur.

## The four elements of a dimension

Every dimension callout has four parts:

```
       ◀─── dimension line ───▶
       ↑                       ↑
extension                  extension
   line                       line
       ↑                       ↑
   feature                  feature
   edge                     edge
```

1. **Extension lines** — thin lines extending FROM the feature edge OUTWARD (perpendicular to the dimension being measured). Small visible gap between the feature and the start of the extension line (~1pt).
2. **Dimension line** — the line between the extension lines, parallel to the dimension being measured.
3. **Arrowheads** — at each end of the dimension line, pointing OUTWARD into the extension lines (or INWARD toward each other — both styles are valid; the catalog uses inward-pointing).
4. **Label** — the dimension value (or letter symbol like W, L, SL), placed either:
   - centered on the dimension line, with the dimension line interrupted around the label, OR
   - just above the dimension line (no interruption)
   - The catalog uses **inline interruption** for letter symbols (W, L) and **above-line** for numeric values.

## Standard widths and styles

```css
/* Extension lines */
stroke: var(--green-deeper);  /* dark, but not pure black */
stroke-width: 0.6;            /* thin */
stroke-linecap: round;

/* Dimension lines */
stroke: var(--green-deeper);
stroke-width: 0.8;            /* slightly heavier than extension lines */
stroke-linecap: round;

/* Arrowheads */
fill: var(--green-deeper);
/* polygon: 3pt long, 1.5pt wide */
```

For the **Sling Length (SL)** spanning dimension, use `--orange` instead of `--green-deeper` — it's the prominent "overall span" dimension and orange signals primary importance.

## The W (eye width) dimension

For wire rope sling pages, W marks the horizontal width of the EYE (outer-rope to outer-rope) at the widest point.

**Layout:**
- Extension lines extend UP from the eye's widest points
- Dimension line is HORIZONTAL, sitting above the eye
- Arrowheads at each end of the dim line, pointing INWARD toward the W label
- W label sits in a small filled box centered on the dim line (the dim line is interrupted around the box)

**SVG pattern:**

```svg
<!-- Eye top is at viewBox y ≈ 14, eye widest is at x = 81 to 115 -->

<!-- Extension lines (eye edges going UP) -->
<line x1="81" y1="14" x2="81" y2="2" stroke="var(--green-deeper)" stroke-width="0.6"/>
<line x1="115" y1="14" x2="115" y2="2" stroke="var(--green-deeper)" stroke-width="0.6"/>

<!-- Dimension line — INTERRUPTED around the W label -->
<line x1="81" y1="6" x2="92" y2="6" stroke="var(--green-deeper)" stroke-width="0.8"/>
<line x1="104" y1="6" x2="115" y2="6" stroke="var(--green-deeper)" stroke-width="0.8"/>

<!-- Arrowheads pointing inward -->
<polygon points="81,6 84,4.5 84,7.5" fill="var(--green-deeper)"/>
<polygon points="115,6 112,4.5 112,7.5" fill="var(--green-deeper)"/>

<!-- W label in filled box -->
<rect x="92" y="1.5" width="12" height="9" fill="#888" stroke="var(--green-deeper)" stroke-width="0.5"/>
<text x="98" y="8.5" text-anchor="middle"
      font-family="Source Sans 3" font-size="9" font-weight="700" fill="#FFFFFF">W</text>
```

## The L (eye length) dimension

L marks the vertical height of the EYE (from top of outer rope to bottom of outer rope where the eye joins the splice).

**Layout — L belongs on the LEFT side of the eye, NOT the right.** This is the convention shown in Mazzella, Crosby, and certifiedslings.com references.

- Extension lines extend LEFT from the eye's top and bottom
- Dimension line is VERTICAL, sitting just left of the eye
- Arrowheads at top and bottom of the dim line, pointing INWARD toward the L label (top arrow points down, bottom arrow points up)
- L label sits centered on the dim line, with the dim line interrupted around the L

**SVG pattern:**

```svg
<!-- Eye left edge sits at x ≈ 80, eye top y = 14, eye bottom y = 46 -->

<!-- Extension lines (eye top/bottom going LEFT) -->
<line x1="80" y1="14" x2="63" y2="14" stroke="var(--green-deeper)" stroke-width="0.6"/>
<line x1="80" y1="46" x2="63" y2="46" stroke="var(--green-deeper)" stroke-width="0.6"/>

<!-- Vertical dim line, INTERRUPTED around L label -->
<line x1="68" y1="14" x2="68" y2="25" stroke="var(--green-deeper)" stroke-width="0.8"/>
<line x1="68" y1="35" x2="68" y2="46" stroke="var(--green-deeper)" stroke-width="0.8"/>

<!-- Arrowheads (top points down, bottom points up) -->
<polygon points="68,14 66.5,17 69.5,17" fill="var(--green-deeper)"/>
<polygon points="68,46 66.5,43 69.5,43" fill="var(--green-deeper)"/>

<!-- Tick marks at extension line ends -->
<line x1="63" y1="12" x2="63" y2="16" stroke="var(--green-deeper)" stroke-width="0.6"/>
<line x1="63" y1="44" x2="63" y2="48" stroke="var(--green-deeper)" stroke-width="0.6"/>

<!-- L label centered between arrows -->
<text x="68" y="33" text-anchor="middle"
      font-family="Source Sans 3" font-size="11" font-weight="700"
      fill="var(--green-deeper)">L</text>
```

## The SL (Sling Length) dimension

SL spans the FULL sling, bearing-to-bearing of the two eyes. It sits on the FAR LEFT, in orange, with a stacked vertical text label.

**Layout:**
- Extension lines extend LEFT from the top of the upper eye and the bottom of the lower eye, all the way to the SL bracket position
- Vertical dim line spans the full sling height
- Arrowheads at top (pointing down) and bottom (pointing up)
- Label: "Length of Sling (SL)" stacked vertically (one word per line) on the far left

**SVG pattern:**

```svg
<!-- Upper eye top at y=14, lower eye bottom at y=152 -->

<!-- Extension lines from eye corners going LEFT to the SL bracket -->
<line x1="60" y1="14" x2="34" y2="14" stroke="var(--orange)" stroke-width="0.6"/>
<line x1="60" y1="152" x2="34" y2="152" stroke="var(--orange)" stroke-width="0.6"/>

<!-- Vertical dim line -->
<line x1="38" y1="14" x2="38" y2="152" stroke="var(--orange)" stroke-width="0.9"/>

<!-- Arrowheads -->
<polygon points="38,18 35.5,14 40.5,14" fill="var(--orange)"/>
<polygon points="38,148 35.5,152 40.5,152" fill="var(--orange)"/>

<!-- Tick marks at extension line ends -->
<line x1="34" y1="12" x2="34" y2="16" stroke="var(--orange)" stroke-width="0.6"/>
<line x1="34" y1="150" x2="34" y2="154" stroke="var(--orange)" stroke-width="0.6"/>

<!-- Stacked label: Length / of / Sling / (SL) -->
<g font-family="Source Sans 3" font-size="7.5" font-weight="700"
   fill="var(--orange)" text-anchor="middle">
  <text x="18" y="75">Length</text>
  <text x="18" y="84">of</text>
  <text x="18" y="93">Sling</text>
  <text x="18" y="102">(SL)</text>
</g>
```

## Why placement matters

In ASME Y14.5 convention, primary feature dimensions sit on the LEFT or TOP of the feature (the "ordinate origin" sides). Less-primary callouts sit on the right or bottom. For an eye-and-eye sling drawn vertically:

- W is the primary width → top of the eye ✓
- L is the primary height → left of the eye ✓ (not right — that's an amateur tell)
- SL is the overall span → far left, prominent color ✓

## How to know if your dimensions are placed correctly

After rendering:

1. **Open the PDF and zoom to 200%+.** Both W and L should be clearly readable, with extension lines visibly bridging from the feature edge to the dim line.
2. **The extension lines do NOT touch the feature.** There must be ~1pt visible gap. (If they overlap, the dim looks like it's drawing ON the part rather than measuring it.)
3. **Arrowheads point INWARD** toward the label, not outward into the extension lines.
4. **The L label is on the LEFT of the eye, not the right.**
5. **The SL bracket is on the FAR LEFT, in orange, spanning the full sling.**
6. **The "Length of Sling (SL)" text is stacked vertically**, not horizontal or rotated 90°.

## When the source photo is small (the trap)

If the product photo is <250px wide (which the embedded Murphy wire rope sling photo is — 126×289), you have two choices:

**Option A — Photo with overlay (acceptable for hero-photo width 70–90pt):**
- Eye in source photo will be ~25pt wide on the display
- Dimensions must be sized down proportionally (W box 8pt wide, L label 8pt)
- Acceptable but tight

**Option B — Replace photo with vector schematic (BETTER):**
- Draw the sling as inline SVG: two teardrop eyes + two ferrules + braided body
- Eye in schematic can be 34pt wide on display (much more room for dimensions)
- W box 12pt wide, L label 11pt — fully readable
- Vector renders crisp at any size

The Murphy sling page uses Option B (schematic). See `04-page-templates.md` § Sling Page for the full schematic SVG.

## When swapping schematic ↔ photo, update the container CSS

This is a footgun. The hero-photo container behaves differently for `<img>` vs inline `<svg>`:

**For `<img>`:**
```css
.hero-photo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-photo img { max-width: 82pt; max-height: 100%; object-fit: contain; }
```

**For inline `<svg>` (give it explicit dimensions):**
```css
.hero-photo {
  /* NO flex centering — SVG fills the container directly */
}
.hero-photo > svg {
  display: block;
  width: 172.8pt;
  height: <hero-photo height>pt;
}
```

Failure to update the CSS when swapping content types causes layout collapse (the SVG inflates, the absolute-positioned content reflows in the wrong order). This bug has bitten this catalog before. Don't repeat it.
