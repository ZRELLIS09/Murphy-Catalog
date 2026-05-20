// ProductPage.jsx
// Standard product detail page. Consumes a product data object whose shape
// matches the JSON file used for Mini Chain Hoists (mini-chain-hoists-data.json).
//
// Expected `data` shape (all blocks optional except `page`):
//   {
//     page:        { sectionMark, breadcrumb, title, subtitle, pageNumber, footerCenterText? },
//     imageAssets: { heroPhotos: [...], drawings: [...] },
//     features:    string[],
//     howToSpecify:[{ title, exampleCode, exampleDescription, format: string[] }, ...],
//     specTable:   { title, columns, columnGroups, rows, tableNote },
//     footnotes:   [{ marker, text }],
//     safetyNote:  { label, text },
//   }

import React from 'react';
import { PageChrome, SectionHead } from './PageChrome';

export const ProductPage = ({ data }) => {
  if (!data || !data.page) return null;
  const { page, imageAssets, features, howToSpecify, specTable, footnotes, safetyNote } = data;

  return (
    <PageChrome
      section={page.sectionMark || (page.section && page.section.toUpperCase())}
      breadcrumb={page.breadcrumb}
      pageNumber={page.pageNumber}
      footerCenterText={page.footerCenterText}
    >
      <TitleBlock title={page.title} subtitle={page.subtitle || page.subtitleUppercase} />

      {(features || imageAssets?.heroPhotos) && (
        <HeroBlock features={features} heroPhotos={imageAssets?.heroPhotos} />
      )}

      {imageAssets?.drawings && (
        <>
          <SectionHead>Dimension Reference{howToSpecify ? ' & Model Codes' : ''}</SectionHead>
          <DrawingsBand drawings={imageAssets.drawings} howToSpecify={howToSpecify} />
        </>
      )}

      {specTable && (
        <>
          <SectionHead>{specTable.title || 'Specifications'}</SectionHead>
          <SpecTable table={specTable} />
        </>
      )}

      {footnotes?.length > 0 && <Footnotes notes={footnotes} />}
      {safetyNote && <SafetyNote note={safetyNote} />}
    </PageChrome>
  );
};

// ─── Title / Subtitle ────────────────────────────────────────────────────

const TitleBlock = ({ title, subtitle }) => (
  <div className="title-bar">
    <h1 className="title">{title}</h1>
    {subtitle && <div className="subtitle">{subtitle}</div>}
  </div>
);

// ─── Hero (photos + features) ────────────────────────────────────────────
// Layout: 2-column features on the left, hero photo(s) on the right.
// If multiple hero photos are provided, they're rendered side-by-side
// with their model labels below each.

const HeroBlock = ({ features = [], heroPhotos = [] }) => {
  const half = Math.ceil(features.length / 2);
  const col1 = features.slice(0, half);
  const col2 = features.slice(half);

  return (
    <div className="hero">
      <div className="hero-left">
        <div className="feat-head">
          <span className="section-head-bullet" aria-hidden="true" />
          <span>Features</span>
        </div>
        <div className="feat-cols">
          <ul className="col">{col1.map((b, i) => <li key={`a${i}`} dangerouslySetInnerHTML={{ __html: b }} />)}</ul>
          {col2.length > 0 && (
            <ul className="col">{col2.map((b, i) => <li key={`b${i}`} dangerouslySetInnerHTML={{ __html: b }} />)}</ul>
          )}
        </div>
      </div>

      {heroPhotos.length > 0 && (
        <div className={`hero-photos count-${heroPhotos.length}`}>
          {heroPhotos.map((photo) => (
            <figure key={photo.id} className="hero-photo-card">
              <img src={photo.filename} alt={photo.altText} />
              <figcaption className="lbl">
                {photo.displayLabel}
                {photo.displaySublabel && <span className="v">{photo.displaySublabel}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Drawings + How-to-Specify ───────────────────────────────────────────
// If `howToSpecify` is provided, drawings + callouts are paired by `appliesTo`
// (or matched 1:1 in order). Otherwise drawings render alone in a band.

const DrawingsBand = ({ drawings = [], howToSpecify }) => {
  const pairs = drawings.map((drawing, i) => {
    const howto = howToSpecify
      ? howToSpecify.find((h) => drawing.appliesTo?.some((m) => h.appliesTo?.includes(m))) || howToSpecify[i]
      : null;
    return { drawing, howto };
  });

  return (
    <div className="dr-band">
      {pairs.map(({ drawing, howto }) => (
        <div className="dr-col" key={drawing.id}>
          <div className="cap">
            {drawing.displayLabel}
            {drawing.displaySublabel && <span className="v"> &middot; {drawing.displaySublabel}</span>}
          </div>
          <div className="imgwrap">
            <img src={drawing.filename} alt={drawing.altText} />
          </div>
          {howto && <HowToSpecify howto={howto} />}
        </div>
      ))}
    </div>
  );
};

const HowToSpecify = ({ howto }) => (
  <div className="howto">
    <div className="hh">{howto.title}</div>
    {howto.exampleCode && <div className="ex">{howto.exampleCode}</div>}
    {howto.exampleDescription && <div className="sub">{howto.exampleDescription}</div>}
    {howto.format?.length > 0 && (
      <div className="fmt">
        {howto.format.map((seg, i) => <span key={i} className="seg">{seg}</span>)}
      </div>
    )}
  </div>
);

// ─── Spec table ──────────────────────────────────────────────────────────
// Supports grouped headers (e.g. "Working Load Limit (WLL)" spanning Max / Min).
// Reads from { columns, columnGroups, rows, tableNote }.

const SpecTable = ({ table }) => {
  const { columns = [], columnGroups = [], rows = [], tableNote } = table || {};
  const hasGroups = columnGroups.length > 0;

  // Build top-row header: each cell either spans group children or is a single
  // header with rowSpan=2.
  const groupedKeys = new Set(columnGroups.flatMap((g) => g.columnKeys));

  const topRow = [];
  const subRow = [];
  let i = 0;
  while (i < columns.length) {
    const col = columns[i];
    if (groupedKeys.has(col.key)) {
      const group = columnGroups.find((g) => g.columnKeys.includes(col.key));
      const groupCols = columns.filter((c) => group.columnKeys.includes(c.key));
      topRow.push(
        <th key={`grp-${group.label}`} colSpan={groupCols.length}>
          <span className="hn">{group.label}</span>
        </th>
      );
      groupCols.forEach((gc) => {
        subRow.push(
          <th key={`sub-${gc.key}`}>
            <span className="hn">{gc.label}</span>
            {gc.unit && <span className="hu">{gc.unit}</span>}
          </th>
        );
      });
      i += groupCols.length;
    } else {
      topRow.push(
        <th key={`col-${col.key}`} rowSpan={hasGroups ? 2 : 1}>
          <span className="hn">{col.label}</span>
          {col.unit && <span className="hu">{col.unit}</span>}
        </th>
      );
      i += 1;
    }
  }

  return (
    <>
      <table className="spec">
        <colgroup>
          {columns.map((c) => <col key={c.key} className={`c-${c.key}`} />)}
        </colgroup>
        <thead>
          <tr className="r1">{topRow}</tr>
          {hasGroups && <tr className="r2">{subRow}</tr>}
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.model || idx} className={idx % 2 ? 'alt' : ''}>
              {columns.map((c, ci) => (
                <td key={c.key} className={ci === 0 ? 'mdl' : ''}>
                  {formatCell(row[c.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {tableNote && <div className="table-note">{tableNote}</div>}
    </>
  );
};

const formatCell = (value) => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') {
    // structured value object { value, unit } — show display string
    return value.value !== undefined ? `${value.value} ${value.unit || ''}`.trim() : '—';
  }
  return value;
};

// ─── Footnotes / Safety ──────────────────────────────────────────────────

const Footnotes = ({ notes = [] }) => (
  <>
    {notes.map((n, i) => (
      <div key={i} className="footnote">
        {n.marker && <span className="mk">{n.marker}</span>} {n.text}
      </div>
    ))}
  </>
);

const SafetyNote = ({ note }) => (
  <div className="footnote safety">
    {note.label && <strong>{note.label}: </strong>}
    {note.text}
  </div>
);
