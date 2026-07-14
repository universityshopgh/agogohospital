'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageProvider, useLanguage } from './LanguageContext';

function LayoutShell({ children }) {
  const pathname = usePathname();
  const { t, locale, changeLanguage } = useLanguage();
  const [annIndex, setAnnIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for sticky header shrink
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Government announcement slider rotation
  useEffect(() => {
    const announcementsCount = t('announcements').length || 1;
    const interval = setInterval(() => {
      setAnnIndex((prev) => (prev + 1) % announcementsCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [t]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Government Announcement Bar */}
      <div className="announcement-bar" role="region" aria-label="Official Announcements">
        <div className="announcement-carousel">
          {t('announcements').map((ann, idx) => (
            <div 
              key={idx} 
              className={`announcement-slide ${idx === annIndex ? 'active' : ''}`}
            >
              <span style={{ marginRight: '8px' }}>📢</span>
              {ann}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Header & Sticky Navigation */}
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar" style={{ height: '100%' }}>
          
          {/* Brand Logo & Name */}
          <Link href="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              padding: '4px',
              border: '1px solid rgba(226, 232, 240, 0.8)'
            }}>
              <img 
                src="/logo.png" 
                alt="Agogo Presbyterian Hospital Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }} 
              />
            </div>
            <div className="logo-text">
              <span className="logo-title" style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Agogo Presbyterian</span>
              <span className="logo-sub" style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.05em' }}>Hospital</span>
            </div>
          </Link>

          {/* Hamburger Mobile Menu Icon */}
          <button 
            className="menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            style={{ color: 'var(--text-color)' }}
          >
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              {mobileMenuOpen ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              )}
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link 
                href="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/departments" 
                className={`nav-link ${isActive('/departments') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                href="/patient-info" 
                className={`nav-link ${isActive('/patient-info') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Patients
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            {/* Mobile-only Action Buttons — shown inside hamburger menu */}
            <li className="nav-mobile-actions">
              <Link href="/portal" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                Book Appointment
              </Link>
            </li>
            <li className="nav-mobile-actions">
              <a href="tel:+2335438494737" className="btn btn-emergency" style={{ width: '100%', justifyContent: 'center', animation: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                🚨 Emergency
              </a>
            </li>
          </nav>

          {/* Desktop Right Nav Buttons */}
          <div className="nav-actions" style={{ alignItems: 'center', gap: '12px' }}>
            <Link href="/portal" className="btn btn-sm btn-primary" style={{ boxShadow: '0 2px 4px rgba(15, 108, 189, 0.15)' }}>
              Book Appointment
            </Link>

            <a href="tel:+2335438494737" className="btn btn-sm btn-emergency" style={{ animation: 'none', boxShadow: '0 2px 4px rgba(220, 38, 38, 0.15)' }}>
              Emergency
            </a>
          </div>

        </div>
      </header>

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>



      {/* 3. Footer */}
      <footer className="footer" style={{ borderTop: '1px solid #1e293b', backgroundColor: '#0f172a' }}>
        <div className="container">
          <div className="footer-grid">
            
            {/* Col 1: Hospital Info */}
            <div className="footer-col">
              <div className="footer-logo" style={{ marginBottom: '16px' }}>
                <div>
                  <h4 className="footer-logo-title" style={{ fontSize: '1.3rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0, padding: 0 }}>Agogo Presbyterian</h4>
                  <span className="footer-logo-sub" style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Healthcare Service</span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#94a3b8', marginBottom: '16px' }}>
                Serving our community with compassionate healthcare since 1931.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                Agogo, Ashanti Region, Ghana
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="footer-col">
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Quick Links</h4>
              <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}><Link href="/departments" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '0.9rem' }}>Departments</Link></li>
                <li style={{ marginBottom: '10px' }}><Link href="/patient-info" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '0.9rem' }}>Patient Information</Link></li>
                <li style={{ marginBottom: '10px' }}><Link href="/portal" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '0.9rem' }}>Appointments</Link></li>
                <li style={{ marginBottom: '10px' }}><Link href="/contact" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '0.9rem' }}>Emergency</Link></li>
                <li style={{ marginBottom: '10px' }}><Link href="/contact" style={{ textDecoration: 'none', color: '#94a3b8', fontSize: '0.9rem' }}>Contact</Link></li>
              </ul>
            </div>

            {/* Col 3: Emergency Numbers */}
            <div className="footer-col">
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Emergency Numbers</h4>
              <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Hotline</span>
                  <a href="tel:+2335438494737" style={{ color: 'var(--error)', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>+233 543 849 4737</a>
                </li>
                <li>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Ambulance</span>
                  <a href="tel:+2335438494737" style={{ color: '#E2E8F0', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>+233 543 849 4737</a>
                </li>
                <li>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Reception</span>
                  <a href="tel:+2335438494737" style={{ color: '#E2E8F0', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>+233 543 849 4737</a>
                </li>
              </ul>
            </div>

            {/* Col 4: Opening Hours */}
            <div className="footer-col">
              <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>Opening Hours</h4>
              <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Emergency</span>
                  <span style={{ color: '#FFFFFF', fontWeight: '600', marginTop: '2px' }}>Emergency — 24/7</span>
                </li>
                <li style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Outpatient (OPD)</span>
                  <span style={{ color: '#FFFFFF', fontWeight: '600', marginTop: '2px' }}>OPD — Mon–Fri, 8:00 AM–5:00 PM</span>
                </li>
                <li style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Visiting Hours</span>
                  <span style={{ color: '#FFFFFF', fontWeight: '600', marginTop: '2px' }}>Visiting Hours — Daily</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom" style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#64748b' }}>
            <p style={{ margin: 0 }}>© 2026 Agogo Presbyterian Hospital. NHIS Accredited · Presbyterian Church of Ghana · Asante Akim North, Ashanti Region.</p>
            <div className="footer-legal-links" style={{ display: 'flex', gap: '20px' }}>
              <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Use</Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default function MainLayout({ children }) {
  return (
    <LanguageProvider>
      <LayoutShell>{children}</LayoutShell>
    </LanguageProvider>
  );
}
