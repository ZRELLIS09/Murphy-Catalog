// Pages.jsx
// Page registry — defines the order and components for every page in the
// catalog. The Flipbook reads from this list to render the spread sequence.
//
// Usage:
//   import { buildPages } from './Pages';
//   const pages = buildPages(products);  // `products` from data/products.js
//   <Flipbook pages={pages} />

import React from 'react';
import { ProductPage } from './ProductPage';
import { FrontCover, TableOfContents, FrontIntro } from './FrontMatter';
import { BackCover, ContactPage } from './BackMatter';

// Sort products into section groups, then return a flat ordered list of
// {id, element, kind, pageNumber} entries the Flipbook can render.
//
// `products` is expected to be either an array of product objects (each
// matching the data shape consumed by <ProductPage>) or a keyed object
// of the same; this helper handles both.
export const buildPages = (products, options = {}) => {
  const {
    includeFrontIntro = true,
    includeTOC        = true,
    includeContact    = true,
    sectionOrder      = [
      'WIRE ROPE & WIRE ROPE SLINGS',
      'LIFTING ACCESSORIES',
      'RIGGING HARDWARE',
      'CRANES & HOISTS',
      'CHAIN & CHAIN ACCESSORIES',
      'LOAD SECUREMENT',
      'SYNTHETIC & WEB SLINGS',
    ],
  } = options;

  const list = Array.isArray(products) ? products : Object.values(products || {});

  // Group products by section
  const bySection = {};
  list.forEach((p) => {
    const section = p.page?.sectionMark || 'UNCATEGORIZED';
    (bySection[section] = bySection[section] || []).push(p);
  });

  // Order sections per `sectionOrder`, then any not in the list
  const orderedSections = [
    ...sectionOrder.filter((s) => bySection[s]),
    ...Object.keys(bySection).filter((s) => !sectionOrder.includes(s)),
  ];

  const pages = [];
  let pageNo = 0;

  const push = (id, element, kind, withNumber = true) => {
    pageNo += 1;
    pages.push({
      id,
      element: withNumber
        ? React.cloneElement(element, { pageNumber: String(pageNo).padStart(2, '0') })
        : element,
      kind,
      pageNumber: withNumber ? pageNo : null,
    });
  };

  push('front-cover', <FrontCover />, 'cover', false);
  if (includeFrontIntro) push('intro', <FrontIntro />, 'intro');
  if (includeTOC) {
    const tocEntries = orderedSections.map((section) => {
      const sec = bySection[section];
      return {
        id: section,
        section,
        pageRange: `${sec[0]?.page?.pageNumber || '?'}–${sec[sec.length - 1]?.page?.pageNumber || '?'}`,
      };
    });
    push('toc', <TableOfContents entries={tocEntries} />, 'toc');
  }

  // Add product pages in section order
  orderedSections.forEach((section) => {
    bySection[section].forEach((product) => {
      push(
        product.page?.id || product.id || `page-${pageNo + 1}`,
        <ProductPage data={product} />,
        'product'
      );
    });
  });

  if (includeContact) push('contact', <ContactPage />, 'contact');
  push('back-cover', <BackCover />, 'cover', false);

  return pages;
};

// Convenience selector — find a page by id
export const findPage = (pages, id) => pages.find((p) => p.id === id);

// Convenience selector — find a page by product model number
export const findPageByModel = (pages, model) =>
  pages.find((p) => p.element?.props?.data?.modelVariants?.some((v) => v.model === model));
