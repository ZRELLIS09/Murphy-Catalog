# Hitch Illustrations

Wire rope sling and chain sling pages show the three standard rigging hitch types as callouts. The illustration style follows ASME B30.9 and matches what Crosby, Mazzella, and other major rigging suppliers use in their catalogs. Treating these as decorative icons (vague rope shapes, no load shown) produces beginner output. The standard convention shows hook + sling + load, and the difference between the three hitch types must be readable at the callout size.

## The three standard hitch types

### Vertical Hitch
- Single sling leg between hook and load
- Sling oriented vertically
- Rated capacity: **100%** of vertical sling capacity (the reference for the other ratings)
- Load shown as a **rectangle** (no preferred load geometry, but vertical lifts often use rigid attached loads)

### Choker Hitch
- Sling threads through its own end eye to wrap the load (a tightening "noose")
- Rated capacity: **~75%** of vertical (varies with choke angle; rated at ≥120° choke angle per ASME B30.9)
- Load shown as a **circle/cylinder** (choking is most common around cylindrical loads)
- Key visual: the small choke loop where the sling self-cinches

### Basket Hitch
- BOTH sling eyes attach to the same hook; the sling cradles the load in a U-shape underneath
- Rated capacity: **2× vertical** (at minimum D/d ratio of 25, per ASME B30.9)
- Load shown as a **circle/cylinder** in the cradle
- Key visual: the V/U shape with both ends going up to the hook

## SVG patterns

Each illustration uses a `viewBox="0 0 60 90"` (3:4.5 portrait). Stroke width 1.6, stroke color `--green-deeper`, load fill `--green-deeper` with white text label.

### Vertical hitch

```svg
<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1F3A1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Hoist line + hook -->
    <line x1="30" y1="0" x2="30" y2="3"/>
    <circle cx="30" cy="6" r="2.5"/>
    <line x1="30" y1="8.5" x2="30" y2="14"/>
    <path d="M 30 14 Q 30 23 24 23 Q 21 23 21 19"/>
    <!-- Top sling eye looped on hook -->
    <ellipse cx="27" cy="27" rx="4.5" ry="3.5"/>
    <!-- Sling body -->
    <line x1="27" y1="30.5" x2="27" y2="62"/>
    <!-- Bottom sling eye -->
    <ellipse cx="27" cy="65.5" rx="4.5" ry="3.5"/>
    <!-- Attachment shackle pin into load -->
    <line x1="27" y1="69" x2="27" y2="71"/>
  </g>
  <!-- Load rectangle -->
  <rect x="13" y="71" width="28" height="15" fill="#1F3A1B" rx="1"/>
  <text x="27" y="81" text-anchor="middle"
        font-family="Source Sans 3" font-size="5.5" font-weight="700"
        fill="#fff" letter-spacing="0.5">LOAD</text>
</svg>
```

### Choker hitch

```svg
<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1F3A1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Hoist + hook -->
    <line x1="30" y1="0" x2="30" y2="3"/>
    <circle cx="30" cy="6" r="2.5"/>
    <line x1="30" y1="8.5" x2="30" y2="14"/>
    <path d="M 30 14 Q 30 23 24 23 Q 21 23 21 19"/>
    <!-- Top sling eye on hook -->
    <ellipse cx="27" cy="27" rx="4.5" ry="3.5"/>
    <!-- Sling drops to choke point -->
    <line x1="27" y1="30.5" x2="27" y2="50"/>
  </g>
  <!-- Round load behind/below choke point -->
  <circle cx="30" cy="70" r="14" fill="#1F3A1B"/>
  <text x="30" y="73" text-anchor="middle"
        font-family="Source Sans 3" font-size="5.5" font-weight="700"
        fill="#fff" letter-spacing="0.5">LOAD</text>
  <g fill="none" stroke="#1F3A1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Choke eye — small loop where sling self-threads (use beige-row fill so it reads on top of the load) -->
    <ellipse cx="22" cy="54" rx="5.5" ry="3.2" transform="rotate(-12 22 54)" fill="#F7F5F2"/>
    <!-- Sling exits choke eye and wraps load -->
    <path d="M 26 56 Q 36 56 41 64" stroke-width="1.5"/>
  </g>
  <!-- Sling wrapping behind load (dashed to indicate "behind") -->
  <path d="M 41 64 Q 44 74 38 82" fill="none" stroke="#1F3A1B"
        stroke-width="1.3" stroke-dasharray="1.5 1.2" stroke-linecap="round"/>
</svg>
```

### Basket hitch

```svg
<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1F3A1B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <!-- Hoist + hook -->
    <line x1="30" y1="0" x2="30" y2="3"/>
    <circle cx="30" cy="6" r="2.5"/>
    <line x1="30" y1="8.5" x2="30" y2="14"/>
    <path d="M 30 14 Q 30 23 24 23 Q 21 23 21 19"/>
    <!-- TWO sling eyes both on the hook (basket) -->
    <ellipse cx="24" cy="27" rx="3.5" ry="3" transform="rotate(-22 24 27)"/>
    <ellipse cx="30" cy="27" rx="3.5" ry="3" transform="rotate(22 30 27)"/>
    <!-- Two legs descending around the load -->
    <path d="M 22 30 Q 14 50 14 62"/>
    <path d="M 33 30 Q 42 50 42 62"/>
    <!-- Cradle under the load -->
    <path d="M 14 62 Q 14 80 28 82 Q 42 80 42 62"/>
  </g>
  <!-- Round load nestled in cradle -->
  <circle cx="28" cy="68" r="13" fill="#1F3A1B"/>
  <text x="28" y="71" text-anchor="middle"
        font-family="Source Sans 3" font-size="5.5" font-weight="700"
        fill="#fff" letter-spacing="0.5">LOAD</text>
</svg>
```

## Callout structure (the container that holds each SVG)

```html
<div class="callout">
  <div class="illo">
    <svg viewBox="0 0 60 90" ...>...</svg>
  </div>
  <div>
    <div class="name">Vertical</div>          <!-- Bebas Neue 9.5pt -->
    <div class="factor">100% Rated Cap.</div>  <!-- Source Sans 6pt -->
  </div>
</div>
```

```css
.callout {
  flex: 1;
  background: var(--beige-row);
  border-top: 1.5pt solid var(--orange);
  height: 76pt;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5pt 4pt 4pt;
}
.callout .illo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.callout .illo svg { height: 48pt; width: auto; }
```

## Capacity factor labels (exact strings)

| Hitch | Factor label |
|---|---|
| Vertical | `100% Rated Cap.` |
| Choker | `~75% Rated Cap.` |
| Basket | `2× Vertical Cap.*` |

The asterisk on Basket points to the footnote: "Basket hitch capacities based on D/d ratio of 25 (mechanically spliced, single-part slings)."

## Standard rigging footnote (paste at end of spec table)

```
*Basket hitch capacities based on D/d ratio of 25 (mechanically spliced,
single-part slings). All capacities in tons (2,000 lbs). Pin diameter must
be no larger than natural eye width and no less than nominal sling diameter.
Horizontal sling angles less than 30° shall not be used. Choker hitch
capacities apply at choke angles of 120° or greater — reduce capacity for
tighter chokes. Slings stamped with rated capacity, diameter, and
manufacturer identification per ASME B30.9.
```

## Why this matters

A rigger looking at the Murphy catalog has seen the Crosby catalog. If our hitch icons look like icons from a stock library — generic ropes with no load, no hook context — the rigger will assume the rest of the catalog is similarly amateur. The Vertical/Choker/Basket trio with hook + sling + load shown in context is the industry's visual shorthand for "we know what we're doing."
