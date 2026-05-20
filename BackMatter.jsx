// BackMatter.jsx
// Back cover and contact card.

import React from 'react';
import { MurphyLogo } from './Icons';
import { PageChrome } from './PageChrome';
import { COMPANY } from './Config';

export const BackCover = () => (
  <div className="page cover back-cover">
    <div className="cover-bg" />
    <div className="cover-inner">
      <div className="cover-logo">
        <MurphyLogo size="large" tagline={false} />
      </div>
      <div className="cover-tag">{COMPANY.microTagline}</div>
      <div className="cover-spacer" />
      <h1 className="cover-title">{COMPANY.tagline}</h1>
      <div className="cover-rule" />
      <div className="back-contact-block">
        <div className="back-contact-row">
          <span className="lbl">Phone</span>
          <span className="val">{COMPANY.phone}</span>
        </div>
        <div className="back-contact-row">
          <span className="lbl">Web</span>
          <span className="val">{COMPANY.url}</span>
        </div>
        <div className="back-contact-row">
          <span className="lbl">HQ</span>
          <span className="val">{COMPANY.city}</span>
        </div>
      </div>
      <div className="back-shipping">{COMPANY.shipmentMessage}</div>
    </div>
  </div>
);

// Optional contact / customer-service page near the back of the catalog.
export const ContactPage = ({ pageNumber = '99' }) => (
  <PageChrome
    section="CONTACT"
    breadcrumb={['Murphy', 'Contact']}
    pageNumber={pageNumber}
    footerCenterText="CONTACT"
  >
    <div className="contact">
      <h1 className="title">Get in Touch</h1>
      <div className="subtitle">QUOTES &middot; CUSTOM ORDERS &middot; SAME-DAY SHIPPING &middot; HOUSTON, TX</div>

      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-card-label">Phone</div>
          <div className="contact-card-value">{COMPANY.phone}</div>
        </div>
        <div className="contact-card">
          <div className="contact-card-label">Online</div>
          <div className="contact-card-value">{COMPANY.url}</div>
        </div>
        <div className="contact-card">
          <div className="contact-card-label">Location</div>
          <div className="contact-card-value">{COMPANY.city}</div>
        </div>
      </div>

      <div className="contact-cta">
        {COMPANY.tagline}
      </div>
    </div>
  </PageChrome>
);
