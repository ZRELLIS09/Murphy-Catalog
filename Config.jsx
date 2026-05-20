// Config.jsx
// Murphy Industrial Products digital catalog — brand tokens and settings.
// Constants here mirror the print PDF design system so the flipbook and the
// print catalog stay visually consistent.

export const COLORS = {
  green:       '#3E6B38',
  greenDark:   '#2D4F28',
  greenDeeper: '#1F3A1B',
  orange:      '#E8600A',
  logoOrange:  '#F7941D',
  beigeHeader: '#F0EDE8',
  beigeRow:    '#F7F5F2',
  grid:        '#E8E4DD',
  rule:        '#CCCCCC',
  footnote:    '#888888',
  subtitle:    '#6B7368',
  text:        '#1A1A1A',
  white:       '#FFFFFF',
};

export const FONTS = {
  display: '"Bebas Neue", Impact, sans-serif',
  body:    '"Source Sans 3", -apple-system, "Segoe UI", sans-serif',
};

// Page geometry mirrors the print PDFs (US Letter, 612 × 792 pt).
// In the flipbook these become a layout reference; the actual rendered size
// is determined by the viewport / container.
export const PAGE = {
  widthPt:           612,
  heightPt:          792,
  aspectRatio:       612 / 792,
  contentSidePadPt:  25.2,
  contentTopOffset:  47.6,    // below beige (31.5) + green (15.1) bands
  footerBottomOffset: 90,     // pinned footer block height
  bands: {
    beige: { heightPt: 31.5, fill: COLORS.beigeHeader },
    green: { heightPt: 15.1, fill: COLORS.green },
  },
};

export const FLIPBOOK = {
  flipDurationMs:    600,
  showPageShadows:   true,
  enableKeyboardNav: true,
  enableSwipe:       true,
  mobileBreakpoint:  768,
  defaultSpread:     true,  // show 2-page spreads on desktop
};

export const COMPANY = {
  name:            'Murphy Industrial Products, Inc.',
  shortName:       'Murphy',
  city:            'Houston, TX',
  phone:           '866-848-2032',
  url:             'murphylift.com',
  tagline:         'FROM COMMON TO CUSTOM — WE DO IT ALL',
  shipmentMessage: '80% of orders ship same day · Free shipping on orders $50+',
  contactLine:     '866-848-2032 · murphylift.com · 80% of orders ship same day · Free shipping on orders $50+',
  catalogYear:     2026,
  microTagline:    'LIFT.  PULL.  TIE DOWN.',
};

// Section name family used across the print catalog. Use these verbatim
// in the section mark (top-right of beige band) and in the dark-green
// center cell of the footer bar.
export const SECTIONS = {
  WIRE_ROPE:           'WIRE ROPE & WIRE ROPE SLINGS',
  LIFTING_ACCESSORIES: 'LIFTING ACCESSORIES',
  RIGGING_HARDWARE:    'RIGGING HARDWARE',
  CRANES_HOISTS:       'CRANES & HOISTS',
  CHAIN:               'CHAIN & CHAIN ACCESSORIES',
  LOAD_SECUREMENT:     'LOAD SECUREMENT',
  SYNTHETIC_SLINGS:    'SYNTHETIC & WEB SLINGS',
};
