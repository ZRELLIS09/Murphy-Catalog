// FrontMatter.jsx
// Front cover and table of contents.
// The cover doesn't use PageChrome — it has its own full-bleed design.

import React from 'react';
import { MurphyLogo } from './Icons';
import { PageChrome } from './PageChrome';
import { COMPANY } from './Config';

export const FrontCover = ({ catalogYear = COMPANY.catalogYear, subtitle = 'PRODUCT CATALOG' }) => (
  <div className="page cover">
    <div className="cover-bg" />
    <div className="cover-inner">
      <div className="cover-logo">
        <MurphyLogo size="large" tagline={false} />
      </div>
      <div className="cover-tag">{COMPANY.microTagline}</div>
      <div className="cover-spacer" />
      <h1 className="cover-title">{subtitle}</h1>
      <div className="cover-year">{catalogYear}</div>
      <div className="cover-rule" />
      <div className="cover-contact">
        {COMPANY.phone} &middot; {COMPANY.url} &middot; {COMPANY.city}
      </div>
    </div>
  </div>
);

export const TableOfContents = ({ entries = [], pageNumber = '2' }) => (
  <PageChrome
    section="TABLE OF CONTENTS"
    breadcrumb={['Murphy Catalog', '2026', 'Contents']}
    pageNumber={pageNumber}
    footerCenterText="TABLE OF CONTENTS"
  >
    <div className="toc">
      <h1 className="title">Table of Contents</h1>
      <div className="subtitle">2026 PRODUCT CATALOG &middot; SECTIONS &amp; PAGE INDEX</div>

      <div className="toc-list">
        {entries.map((entry) => (
          <div key={entry.id} className="toc-row">
            <div className="toc-section">{entry.section}</div>
            <div className="toc-leader" aria-hidden="true" />
            <div className="toc-pages">{entry.pageRange || entry.pageNumber}</div>
          </div>
        ))}
      </div>
    </div>
  </PageChrome>
);

// Inside front cover (or facing page) — short company intro.
// Optional; include only if your flipbook has a 2-page spread for the front.
export const FrontIntro = ({ pageNumber = '1' }) => (
  <PageChrome
    section="WELCOME"
    breadcrumb={['Murphy', 'About', 'Welcome']}
    pageNumber={pageNumber}
    footerCenterText="WELCOME"
  >
    <div className="intro">
      <h1 className="title">Welcome to Murphy</h1>
      <div className="subtitle">
        RIGGING &middot; LIFTING &middot; LOAD SECUREMENT &middot; SAME-DAY SHIPPING FROM HOUSTON
      </div>
      <p className="intro-copy">
        Murphy Industrial Products supplies the lifting and rigging tools that
        keep work moving — from common stocked items to fully custom assemblies.
        Whatever you're rigging, lifting, pulling, or tying down, we've built our
        catalog around making the answer easy to find and the order easy to place.
      </p>
      <p className="intro-copy">
        Most orders ship the same day. Free shipping on orders over $50.
        Custom configurations are our specialty — if you don't see it here, call.
      </p>
    </div>
  </PageChrome>
);
