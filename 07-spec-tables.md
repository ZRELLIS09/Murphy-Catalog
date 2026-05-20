# Spec Tables

The spec table is the heart of every product page. It's where the rigger actually finds the answer. Format it well and the page reads as professional. Format it poorly and the rest of the page can't save it.

## Row-count-appropriate density (commit to memory)

Every page sizes its own table rows based on row count. Do NOT carry forward compression from a different page — the density should match the table.

| Row count | Data row height | Header row height | Notes |
|---|---|---|---|
| ≤8 rows | **24pt** | 28pt | Spacious — small table earns the space |
| 8–15 rows | **18pt** | 24pt | Default density |
| 15–25 rows | **14pt** | 24pt | Standard for sling pages (20 rope sizes) |
| 25–40 rows | **10–12pt** | 20pt | Compact — only when forced |
| >40 rows | Consider splitting | — | Two pages is better than illegible |

The hero photo height and features density scale with row count too:

| Row count | Hero photo height | Bullets per features column |
|---|---|---|
| ≤8 | 210pt (large) | 6+ |
| 8–15 | 180pt | 5–6 |
| 15–25 | 162pt | 4–5 |
| 25–40 | 130pt | 3–4 |

## Column grouping convention

Tables with related-meaning columns use a two-row header: a group header above sub-columns. The pattern is:

```html
<thead>
  <tr>
    <th rowspan="2" class="group">Rope<br/>Dia.</th>
    <th colspan="3" class="group">EIPS Rated Capacities (tons)</th>
    <th rowspan="2" class="group">Eye<br/>Hook</th>
    <th colspan="2" class="group">Eye Dimensions (in.)</th>
    <th rowspan="2" class="group">Min. Eye &amp; Eye<br/>Sling Length</th>
  </tr>
  <tr>
    <th>Vertical</th>
    <th>Choker</th>
    <th>Basket*</th>
    <th>W</th>
    <th>L</th>
  </tr>
</thead>
```

CSS:

```css
.spec-table thead tr {
  background: var(--green);
  color: #fff;
  font-weight: 600;
  font-size: 6.4pt;
  letter-spacing: 0.5pt;
  text-transform: uppercase;
}
.spec-table thead th {
  padding: 3pt 3pt;
  text-align: center;
  vertical-align: middle;
  border-right: 0.5pt solid rgba(255,255,255,0.18);
  line-height: 1.2;
}
.spec-table thead th.group {
  background: var(--green-dk);
  border-bottom: 1.5pt solid var(--orange);
  font-size: 6.5pt;
  padding: 2pt 3pt;
}
```

## Alt-row striping

Every other row gets `--beige-row` (#F7F5F2). The first data row (under the header) is white; the second is beige; pattern alternates.

```html
<tr>          <td class="dia">1/4"</td>    <td>0.65</td> ...
<tr class="alt"><td class="dia">5/16"</td>  <td>1.0</td>  ...
<tr>          <td class="dia">3/8"</td>    <td>1.4</td>  ...
<tr class="alt"><td class="dia">7/16"</td>  <td>1.9</td>  ...
```

```css
.spec-table tbody td {
  padding: 0 3pt;
  text-align: center;
  vertical-align: middle;
  border-bottom: 0.5pt solid var(--grid);
  height: 14pt;       /* adjust per density table above */
  line-height: 1;
  font-size: 7pt;
}
.spec-table tbody tr.alt td { background: var(--beige-row); }
```

## The "key column" (diameter, model, etc.)

The leftmost column is the row identifier — rope diameter, model number, etc. It gets special treatment to anchor the eye:

```css
.spec-table tbody td.dia {
  text-align: left;
  padding-left: 5pt;
  font-weight: 700;
  color: var(--orange);
  border-left: 1.5pt solid var(--orange);
  letter-spacing: 0.2pt;
  font-size: 7.2pt;          /* slightly larger than data cells */
}
```

The 1.5pt orange left border runs the full height of each data row, creating a continuous orange rule that visually anchors the table's left edge.

## Column widths

Set via `<colgroup>`:

```html
<colgroup>
  <col class="col-dia"/>
  <col class="col-cap"/><col class="col-cap"/><col class="col-cap"/>
  <col class="col-hook"/>
  <col class="col-w"/><col class="col-l"/>
  <col class="col-min"/>
</colgroup>
```

```css
.col-dia  { width: 50pt; }
.col-cap  { width: 53pt; }
.col-hook { width: 50pt; }
.col-w    { width: 50pt; }
.col-l    { width: 50pt; }
.col-min  { width: 88pt; }
```

Available width inside content zone (612 - 25.2*2 = 561.6pt). Sum of column widths should be slightly less than that, with `table-layout: fixed` and the table itself at `width: 100%`.

## Reading order

Data flows left to right with a logical sequence:

1. **Key column** (size / model)
2. **Capacities** (the answer to "can this lift my load?")
3. **Mating hardware specs** (Eye Hook, recommended shackle, etc.)
4. **Geometry** (W, L, dimensions, weight)
5. **Length / scale** (min length, range)

If the user's data is in a different order, reorganize to this sequence. Riggers expect it.

## Em-dashes for non-applicable cells

When a row doesn't have a value for a column, use `&mdash;` (—) not `N/A`, not `-`, not blank:

```html
<tr><td class="dia">2-3/4"</td> ... <td>&mdash;</td> ...</tr>
```

## Footnote

Goes immediately under the table, full content width:

```css
.footnote {
  font-family: 'Source Sans 3';
  font-size: 6pt;
  color: var(--footnote);
  padding: 5pt 0 0;
  line-height: 1.5;
}
```

## Common compression moves (when the page won't balance)

If the page-balance check fails (content overflowing tagline), try in this order:

1. Reduce data row height by 1pt (14 → 13pt saves 1pt × row count)
2. Reduce header row height by 2pt
3. Shrink hero photo height by 10-15pt
4. Trim features bullets to one fewer per column
5. Tighten line-height on footnote (1.5 → 1.4)
6. Tighten subtitle padding-bottom (6.5pt → 4pt)
7. Last resort: drop font size on data cells from 7pt to 6.8pt

## Common expansion moves (when the page has too much white space)

If the balance check shows >30pt gap above the tagline:

1. Increase data row height by 1-2pt
2. Increase header row height by 2-4pt
3. Scale up hero photo by 10-20pt
4. Add 1-2 bullets to each features column
5. Increase features font size from 6.5pt to 7pt
6. Increase line-height on body block and warning
7. Increase subtitle padding-bottom (6.5pt → 10pt)
