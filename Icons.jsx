// Icons.jsx
// SVG icons used across the catalog. All icons accept a `size` prop and
// inherit `currentColor` so they restyle from the parent's `color`.

import React from 'react';

const Icon = ({ size = 24, className = '', children, viewBox = '0 0 24 24', ...rest }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

export const ChevronLeft = (p) => (
  <Icon {...p} className={`icon icon-chevron-left ${p.className || ''}`}>
    <polyline points="15 18 9 12 15 6" />
  </Icon>
);

export const ChevronRight = (p) => (
  <Icon {...p} className={`icon icon-chevron-right ${p.className || ''}`}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);

export const SearchIcon = (p) => (
  <Icon {...p} size={p.size || 20} className={`icon icon-search ${p.className || ''}`}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

export const MenuIcon = (p) => (
  <Icon {...p} className={`icon icon-menu ${p.className || ''}`}>
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

export const DownloadIcon = (p) => (
  <Icon {...p} size={p.size || 20} className={`icon icon-download ${p.className || ''}`}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

export const CloseIcon = (p) => (
  <Icon {...p} size={p.size || 20} className={`icon icon-close ${p.className || ''}`}>
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </Icon>
);

export const ZoomInIcon = (p) => (
  <Icon {...p} size={p.size || 20} className={`icon icon-zoom-in ${p.className || ''}`}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8"  x2="11" y2="14" />
    <line x1="8"  y1="11" x2="14" y2="11" />
  </Icon>
);

// Decorative orange-square bullet used in section heads and feature lists.
// Renders an inline-block square. The visual color should live in styles.css
// (.bullet { background: var(--orange); }) but defaults inline for safety.
export const Bullet = ({ size = 4, color }) => (
  <span
    className="bullet"
    aria-hidden="true"
    style={{
      display: 'inline-block',
      flex: '0 0 auto',
      width:  size,
      height: size,
      background: color || '#E8600A',
    }}
  />
);

// Murphy wordmark — Bebas-Neue text + orange tick + tagline.
// Never use an <img> for the wordmark. Render as text so it stays crisp
// and the brand fonts apply.
export const MurphyLogo = ({ size = 'medium', tagline = true }) => (
  <div className={`logo logo-${size}`}>
    <span className="tick" aria-hidden="true" />
    <span className="word">MURPHY</span>
    {tagline && <span className="tag">LIFT.&nbsp;&nbsp;PULL.&nbsp;&nbsp;TIE DOWN.</span>}
  </div>
);
