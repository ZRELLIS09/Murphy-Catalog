// Flipbook.jsx
// Main flipbook container. Uses react-pageflip for the page-flip animation.
//   npm install react-pageflip
//
// Usage:
//   import { buildPages } from './Pages';
//   import { Flipbook } from './Flipbook';
//   import products from '../data/products';
//
//   const pages = buildPages(products);
//   <Flipbook pages={pages} initialPage={0} />

import React, { useRef, useState, useEffect, useMemo, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { PAGE, FLIPBOOK, COMPANY } from './Config';
import { ChevronLeft, ChevronRight, SearchIcon, MenuIcon, DownloadIcon } from './Icons';

// react-pageflip requires each child to forward a ref. PageWrapper handles that
// and provides the page-edge shadow / paper effect.
const PageWrapper = forwardRef(({ children, kind }, ref) => (
  <div className={`page-wrapper kind-${kind || 'product'}`} ref={ref}>
    {children}
  </div>
));
PageWrapper.displayName = 'PageWrapper';

export const Flipbook = ({
  pages = [],
  initialPage = 0,
  onPageChange,
  showControls = true,
  showProgress = true,
}) => {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(pages.length);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keep totalPages in sync if `pages` prop changes
  useEffect(() => setTotalPages(pages.length), [pages.length]);

  // Keyboard navigation: arrow keys, home/end
  useEffect(() => {
    if (!FLIPBOOK.enableKeyboardNav) return;
    const handler = (e) => {
      if (!bookRef.current?.pageFlip) return;
      const flip = bookRef.current.pageFlip();
      if (e.key === 'ArrowLeft')   { flip.flipPrev(); }
      if (e.key === 'ArrowRight')  { flip.flipNext(); }
      if (e.key === 'Home')        { flip.turnToPage(0); }
      if (e.key === 'End')         { flip.turnToPage(pages.length - 1); }
      if (e.key === '/')           { e.preventDefault(); setSearchOpen((o) => !o); }
      if (e.key === 'Escape')      { setSearchOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pages.length]);

  const handleFlip = (e) => {
    setCurrentPage(e.data);
    onPageChange?.(e.data, pages[e.data]);
  };

  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goToPage = (i) => bookRef.current?.pageFlip()?.turnToPage(i);

  // Search: filter pages whose title / breadcrumb / model variants match
  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return pages
      .map((p, idx) => ({ p, idx }))
      .filter(({ p }) => {
        const d = p.element?.props?.data;
        if (!d) return false;
        const hay = [
          d.page?.title,
          d.page?.subtitle,
          ...(d.page?.breadcrumb || []),
          ...(d.modelVariants || []).map((v) => v.model),
        ].filter(Boolean).join(' ').toLowerCase();
        return hay.includes(q);
      });
  }, [searchQuery, pages]);

  return (
    <div className="flipbook-shell">

      {showControls && (
        <header className="flipbook-topbar">
          <div className="brand">
            <span className="brand-name">{COMPANY.shortName}</span>
            <span className="brand-sep">/</span>
            <span className="brand-cat">{COMPANY.catalogYear} Catalog</span>
          </div>
          <div className="topbar-actions">
            <button className="iconbtn" onClick={() => setSearchOpen((o) => !o)} aria-label="Search">
              <SearchIcon />
            </button>
            <button className="iconbtn" onClick={() => window.print()} aria-label="Print / Download">
              <DownloadIcon />
            </button>
            <button className="iconbtn" aria-label="Menu">
              <MenuIcon />
            </button>
          </div>
        </header>
      )}

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              className="search-input"
              placeholder="Search the catalog…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-results">
              {searchMatches.map(({ p, idx }) => (
                <button
                  key={p.id}
                  className="search-result"
                  onClick={() => { goToPage(idx); setSearchOpen(false); }}
                >
                  <span className="result-title">
                    {p.element?.props?.data?.page?.title || p.id}
                  </span>
                  <span className="result-page">p.{idx + 1}</span>
                </button>
              ))}
              {searchQuery && searchMatches.length === 0 && (
                <div className="search-empty">No matches</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flipbook-stage">
        <button className="navbtn navbtn-prev" onClick={goPrev} aria-label="Previous page">
          <ChevronLeft size={32} />
        </button>

        <HTMLFlipBook
          ref={bookRef}
          width={PAGE.widthPt}
          height={PAGE.heightPt}
          size="stretch"
          minWidth={300}
          minHeight={400}
          maxWidth={PAGE.widthPt}
          maxHeight={PAGE.heightPt}
          maxShadowOpacity={FLIPBOOK.showPageShadows ? 0.5 : 0}
          showCover={true}
          mobileScrollSupport={true}
          flippingTime={FLIPBOOK.flipDurationMs}
          usePortrait={true}
          startPage={initialPage}
          onFlip={handleFlip}
          className="flipbook"
        >
          {pages.map((p) => (
            <PageWrapper key={p.id} kind={p.kind}>
              {p.element}
            </PageWrapper>
          ))}
        </HTMLFlipBook>

        <button className="navbtn navbtn-next" onClick={goNext} aria-label="Next page">
          <ChevronRight size={32} />
        </button>
      </div>

      {showProgress && (
        <footer className="flipbook-progress">
          <div className="progress-text">
            Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>
        </footer>
      )}
    </div>
  );
};
