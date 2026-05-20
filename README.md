# Murphy Catalog — Flipbook Components (Reference)

Eight React component files that match the Murphy print PDF design system.
These are **reference implementations** — written without sight of your
actual `styles.css` or `data/products.js`, so classnames and the data
shape may need to be remapped to match what you've already built.

## Files

| File              | Purpose                                                                                            |
|-------------------|----------------------------------------------------------------------------------------------------|
| `Config.jsx`      | Brand tokens (colors, fonts), page geometry, company info, section name family.                    |
| `Icons.jsx`       | SVG icon components (chevrons, search, menu, download, close, zoom-in, bullet, Murphy wordmark).   |
| `PageChrome.jsx`  | Murphy page wrapper — beige + green header bands, pinned footer. Also exports `<SectionHead>`.     |
| `ProductPage.jsx` | Standard product detail page. Title, hero (photos + features), drawings band, spec table, footnotes. |
| `FrontMatter.jsx` | Front cover, table of contents, optional welcome intro.                                            |
| `BackMatter.jsx`  | Back cover, optional contact page.                                                                 |
| `Pages.jsx`       | Page registry / sequence builder. Groups products by section, orders the spread.                   |
| `Flipbook.jsx`    | Main flipbook container. Wraps `react-pageflip`; adds keyboard nav, search overlay, progress bar.  |

## Dependencies

```bash
npm install react-pageflip
```

Other than that, just React 18+. No state library, no router required.

## Data shape

`ProductPage` consumes a product object matching the shape used in
`mini-chain-hoists-data.json`:

```js
{
  page: {
    sectionMark: 'CRANES & HOISTS',
    breadcrumb: ['Cranes & Hoists', 'Mini Hoists', 'M & L Series'],
    title: 'Mini Chain Hoists',
    subtitle: '...',
    pageNumber: '13',  // optional — Pages.jsx assigns if missing
  },
  imageAssets: {
    heroPhotos: [{ id, filename, displayLabel, displaySublabel, altText }, ...],
    drawings:   [{ id, filename, displayLabel, displaySublabel, altText, appliesTo }, ...],
  },
  features: ['Bullet one', 'Bullet two', ...],
  howToSpecify: [{ title, exampleCode, exampleDescription, format: [...], appliesTo: [...] }, ...],
  specTable: {
    title: '...',
    columns: [{ key, label, unit?, type }, ...],
    columnGroups: [{ label, columnKeys: [...] }, ...],
    rows: [{ model, ...values }, ...],
    tableNote: '...',
  },
  footnotes: [{ marker, text }, ...],
  safetyNote: { label, text },
}
```

Your `products.js` likely uses different keys — the easiest path is to add
a thin adapter that maps your product objects into this shape, or to
rename the fields inside `ProductPage.jsx`. Both are mechanical.

## Classnames

The components use semantic classnames that mirror the print PDF CSS:

```
.page                     .beige-band           .green-band
.content                  .title-bar            .title  .subtitle
.hero                     .hero-left            .hero-photos  .hero-photo-card
.feat-head                .feat-cols  .col
.section-head             .section-head-bullet  .section-head-text
.dr-band                  .dr-col               .imgwrap  .cap  .howto
.spec  .hn  .hu  .mdl     .alt                  .table-note
.footnote                 .footnote.safety
.footer-tag               .footer-contact       .footer-bar
.flipbook-shell           .flipbook-stage       .flipbook
.navbtn                   .search-overlay       .progress-bar
```

If your `styles.css` uses different names, do a find/replace through the
JSX files. If the names match, you're already done.

## Usage

```jsx
import { Flipbook } from './components/Flipbook';
import { buildPages } from './components/Pages';
import products from './data/products';

export default function App() {
  const pages = buildPages(products);
  return <Flipbook pages={pages} initialPage={0} />;
}
```

## What's intentional

- **Murphy wordmark is rendered as Bebas Neue text + an orange tick, never
  as an `<img>`.** The print catalog uses this convention; broken `<img>`
  logos were a defect signature on legacy pages.
- **Section heads are orange-square bullet + heading text only.** No trailing
  horizontal rule — that bullet+rule combination reads as a "flag" and was
  explicitly removed from the print design system.
- **Page geometry constants in `Config.jsx` mirror US Letter (612 × 792 pt).**
  The flipbook scales these via `react-pageflip`'s `size="stretch"`; you can
  override `minWidth` / `maxWidth` if you want a different display ratio.
- **`buildPages` orders by section family.** Sections appear in the same
  order they do in the print catalog (Wire Rope → Lifting Accessories →
  Rigging Hardware → Cranes & Hoists → Chain → Load Securement → Synthetic
  Slings).

## What's stubbed

- **`react-pageflip` is one of several possible flipbook libraries.** If your
  existing app uses a different one, swap `HTMLFlipBook` for whatever you have
  — the rest of the component is library-agnostic.
- **Search uses a basic substring match** across title, breadcrumb, and model
  variants. Replace with Fuse.js, MiniSearch, or whatever your app uses if
  you want fuzzy matching.
- **Keyboard shortcuts are minimal** (arrows, home/end, `/` to search, esc to
  close). Extend as needed.
- **No deep linking / URL routing.** Wire up `react-router` or `next/router`
  in your app shell if you want shareable page URLs.

## If you find your real components

If your eight JSX files exist somewhere (e.g., in an unseen subfolder of the
GitHub repo), use those — they'll match your `styles.css` better than these
will. These are a fallback so the digital-creator session isn't blocked.
