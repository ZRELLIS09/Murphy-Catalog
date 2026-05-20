// PageChrome.jsx
// Murphy page wrapper. Every catalog page wraps its content in <PageChrome>
// to get the consistent beige + green header bands and the pinned footer
// (tagline + contact line + dark-green footer bar).
//
// Layout matches the print PDF design system:
//   beige-band       (height 31.5pt)   logo + section mark + page no.
//   green-band       (height 15.1pt)   breadcrumb + murphylift.com
//   content          (fills remaining space)
//   footer-tag       (pinned, "FROM COMMON TO CUSTOM — WE DO IT ALL")
//   footer-contact   (pinned, contact line)
//   footer-bar       (pinned, dark green, company / section / catalog year)

import React from 'react';
import { MurphyLogo } from './Icons';
import { COMPANY } from './Config';

export const PageChrome = ({
  section,           // string — e.g. "CRANES & HOISTS"
  breadcrumb,        // string[] — e.g. ["Cranes & Hoists", "Mini Hoists", "M & L Series"]
  pageNumber,        // string|number — "XX" while unset, or e.g. "13"
  footerCenterText,  // optional override for the dark-green center cell; defaults to `section`
  className = '',
  children,
}) => (
  <div className={`page ${className}`}>

    {/* Top beige band: logo · section mark · page number */}
    <div className="beige-band">
      <MurphyLogo size="medium" />
      <div className="section-mark">{section}</div>
      <div className="pageno">PAGE&nbsp;{pageNumber || 'XX'}</div>
    </div>

    {/* Green breadcrumb band: breadcrumb · murphylift.com (orange) */}
    <div className="green-band">
      <Breadcrumb items={breadcrumb} />
      <div className="url">{COMPANY.url}</div>
    </div>

    {/* Content area */}
    <div className="content">{children}</div>

    {/* Pinned footer block */}
    <div className="footer-tag">{COMPANY.tagline}</div>
    <div className="footer-contact">{COMPANY.contactLine}</div>
    <div className="footer-bar">
      <div className="l">
        {COMPANY.name.toUpperCase()} &middot; {COMPANY.city.toUpperCase()}
      </div>
      <div className="c">{footerCenterText || section}</div>
      <div className="r">
        {COMPANY.catalogYear}&nbsp;CATALOG &middot; PAGE&nbsp;{pageNumber || 'XX'}
      </div>
    </div>

  </div>
);

const Breadcrumb = ({ items = [] }) => (
  <div className="crumbs">
    {items.map((item, i) => (
      <React.Fragment key={`${item}-${i}`}>
        {i > 0 && <span className="sep">&rsaquo;</span>}
        <span className="crumb">{item}</span>
      </React.Fragment>
    ))}
  </div>
);

// Section head used inside page content. Renders an orange square bullet
// followed by the heading text — NO trailing horizontal rule line (the
// bullet+rule combination reads as a "flag" and was explicitly removed).
export const SectionHead = ({ children }) => (
  <div className="section-head">
    <span className="section-head-bullet" aria-hidden="true" />
    <span className="section-head-text">{children}</span>
  </div>
);
