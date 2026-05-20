# Page Templates

The Murphy catalog has four page archetypes. Each has a master HTML template in `assets/templates/`. Start from the template — never start from a blank file. The templates have been pre-validated for layout balance, font embedding, and Type 3 fonts.

## Archetypes

| Archetype | When to use | Master template |
|---|---|---|
| **Cover page** | The first page of the catalog (or a chapter cover) | `assets/templates/cover-page.html` |
| **Product detail page** (BC/BCD-style) | Hard-goods like beam clamps, gantry cranes, rail clamps, hoist rings — products with a hero photo + 3 spec callouts above a drawing + spec table | `assets/templates/product-detail-page.html` |
| **Sling page** | Wire rope, chain, synthetic, round slings — products with a vertical-format hero photo/schematic + warning + body + 3 hitch callouts + 20-row spec table | `assets/templates/sling-page.html` |
| **Section divider** | Chapter/section opener page (e.g., "Wire Rope Slings" full-page intro) | (not yet templated; see "Section divider" below) |

## Common structure across all product pages

Every product page has the same outer shell (bands + footer). Only the content zone changes by archetype.

```html
<div class="page">
  <!-- ===== TOP HEADER BAND (beige, 31.5pt) ===== -->
  <div class="beige-band">
    <div class="logo">
      <span class="tick"></span><span class="word">MURPHY</span>
      <span class="tag">LIFT. PULL. TIE DOWN.</span>
    </div>
    <div class="section-mark">{SECTION NAME}</div>
    <div class="pageno">PAGE XX</div>
  </div>

  <!-- ===== BREADCRUMB BAND (green, 15.1pt) ===== -->
  <div class="green-band">
    <div class="crumbs">
      {Category} <span class="sep">&#8250;</span> {Subcategory} <span class="sep">&#8250;</span> {Page name}
    </div>
    <div class="url">murphylift.com</div>
  </div>

  <!-- ===== CONTENT ZONE ===== -->
  <div class="content">
    <!-- title-bar, hero, section-head, table, footnote, three-col -->
  </div>

  <!-- ===== TAGLINE, CONTACT, FOOTER BAR ===== -->
  <div class="tagline">FROM COMMON TO CUSTOM &mdash; WE DO IT ALL</div>
  <div class="contact-line">866-848-2032 &middot; murphylift.com &middot; 80% of orders ship same day &middot; Free shipping on orders $50+</div>
  <div class="footer-bar">
    <div class="left">MURPHY INDUSTRIAL PRODUCTS, INC. &middot; HOUSTON, TX</div>
    <div class="center">{SECTION NAME}</div>
    <div class="right">2026 CATALOG &middot; PAGE XX</div>
  </div>
</div>
```

## Cover page

The cover is the catalog's identity statement. Three approved variants exist:

### Variant 1: Full-bleed hook photo + cream content zone (v8)
- Full-bleed dark hook photo at top (~440pt tall)
- White MURPHY wordmark on photo (no halo)
- "2026" big in orange, top-right
- Stacked headline: `RIGGING.` / `LIFTING.` (orange) / `CARGO CONTROL.`
- Orange stat strip: `80% SAME DAY · 10,000+ SLINGS IN STOCK · FREE SHIPPING $50+`
- Cream content zone below with tagline + category bullets + 3-col contact
- Dark green footer bar with `MURPHYLIFT.COM` orange + tagline

### Variant 2: Editorial / magazine (Option A)
- Paper background throughout
- Top thin breadcrumb (company name · location · 2026 Edition)
- Dark logo on paper (no halo)
- "2026" stamp top-right
- Massive editorial headline: `EVERYTHING YOU NEED / TO LIFT, PULL, / OR TIE DOWN.` (middle line in orange)
- Square hook photo bottom-left (220pt × 220pt)
- Pull-quote alongside photo + stat tiles
- 4-col category index (20 product families)
- Dark green contact bar at bottom

### Variant 3: Industrial poster (Option B)
- Dark green-black background
- Left column: full-height yellow hook photo (230pt wide)
- Right column: massive stacked verbs `LIFT.` / `PULL.` (orange) / `TIE DOWN.` with 01/02/03 markers
- Stats row with orange left bars
- Contact corner overlaid on photo column (lower-left)
- Category panel + orange URL strip at bottom

All three variants share the brand tokens, fonts, and contact info. Choice depends on positioning: Variant 1 = trusted supplier of record. Variant 2 = premium / Frontify-tier refined. Variant 3 = aggressive / action-oriented.

## Product detail page (BC/BCD-style)

For: beam clamps, eye beam clamps (EBC), rail lifting clamps (Grippa GRC), gantry cranes (AHA-TLC, FHA-ALO), and similar hard goods.

### Layout
```
[Header bands]
[Title block: Product name + subtitle]
[Hero zone — TWO COLUMNS]
  LEFT (172.8pt wide):
    - Product photo (vertically centered between orange rule above hero and section header below drawings)
    - Photo container has ≥40pt headroom above edge features (lifting eyes, hooks)
  RIGHT (margin-left: 182.8pt):
    - Warning panel (orange/red left border)
    - Body block (orange left border, beige fill)
    - 3-callout row (numbers/specs)
[Drawings row]
  - Horizontally aligned with the right column (margin-left: 182.8pt)
  - Centered under the 3 callouts above (center at x=397.4)
[Section header: "Specifications & Dimensions"]
[Spec table — row count varies by model count]
[Footnote]
[3-col features section]
[Tagline + contact + footer bar]
```

### Critical positioning rule (committed to memory):
> Hero photo is absolutely positioned, vertically centered between the orange rule above the hero block and the next section header below the drawings. Drawings are horizontally aligned with the right column (margin-left ≈ 182.8pt), NOT centered in full content width — drawings must sit centered under the 3 spec callouts above them.

## Sling page

For: wire rope slings (eye & eye, bridles, cable laid, braided), chain slings, synthetic web slings, round slings.

### Layout
```
[Header bands]
[Title block: Product name + subtitle with construction details · design factor]
[Hero zone — TWO COLUMNS]
  LEFT (172.8pt wide):
    - Vector schematic of the sling (eye-and-eye or appropriate config)
    - Dimension callouts: W (top of eye), L (left of eye), SL (far left, full sling)
      See 05-dimension-drawings.md for the exact SVG patterns
  RIGHT (margin-left: 182.8pt):
    - Warning panel: "Horizontal sling angles less than 30°..."
    - Body block: brief construction summary (Flemish Eye, EIPS-IWRC, etc.)
    - 3 hitch callouts (Vertical / Choker / Basket)
      See 06-hitch-illustrations.md for the exact SVG patterns
[Section header: "Rated Capacities & Dimensions"]
[Spec table — 20-ish rows, density 14pt]
[Standard rigging footnote — see 06-hitch-illustrations.md]
[3-col features: Construction / Specifications / Compliance & Use]
[Tagline + contact + footer bar]
```

### What makes a sling page work
- The schematic + dimensions on the left tell the dimensional story
- The 3 hitch callouts on the right tell the capacity story (with the spec table providing the numbers for each)
- Together they answer the rigger's two questions: "How big is the sling?" and "What can it lift in each configuration?"

## Section divider (not yet templated)

When the catalog needs a chapter intro page, it follows a different structure:
- Full-bleed section color (deep green or dark brand color)
- Massive Bebas Neue section name (e.g., "WIRE ROPE SLINGS" at 96pt)
- Subhead with category overview
- 6-up product family grid with thumbnails
- "In this section" page reference list

Build this when the first chapter divider is requested — codify the result as a template.

## How to start a new page

1. Identify the archetype (cover / product detail / sling / section divider)
2. Copy the master template from `assets/templates/{archetype}.html` to `/home/claude/<new-page>.html`
3. Read this file + `01-brand-tokens.md` + the archetype-specific references
4. Fill in:
   - Section name (top header band + footer bar center)
   - Breadcrumb crumbs
   - Title + subtitle
   - Hero content (photo or schematic)
   - Right-column content (warning + body + 3 callouts)
   - Spec table (with `<colgroup>` and row-count-appropriate density)
   - Footnote
   - 3-col features
5. Render: `python -c "from weasyprint import HTML; HTML('your-page.html').write_pdf('/mnt/user-data/outputs/your-page.pdf')"`
6. Run `scripts/validate_page.py /mnt/user-data/outputs/your-page.pdf`
7. Fix anything that fails validation
8. Use `present_files` to surface the PDF
