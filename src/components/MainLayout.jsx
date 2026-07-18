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
                alt="Trust-Way Hospital Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }} 
              />
            </div>
            <div className="logo-text">
              <span className="logo-title" style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Trust-Way Hospital</span>
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



      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', borderTop: '1px solid #1e293b', padding: '40px 0 20px 0', color: '#94a3b8', fontSize: '0.9rem' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid #1e293b' }}>
            
            {/* Left info */}
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.2rem', marginBottom: '4px' }}>Trust-Way Hospital</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Providing compassionate, quality healthcare since 1931.</p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Emergency: <a href="tel:+2335438494737" style={{ color: '#f87171', fontWeight: '700', textDecoration: 'none' }}>+233 543 849 4737</a> &middot; Email: info@trustwayhospital.com
              </p>
            </div>

            {/* Right links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start', minWidth: '200px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Departments', href: '/departments' },
                  { label: 'Patient Info', href: '/patient-info' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#ffffff'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{link.label}</Link>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#475569' }}>
                <Link href="/privacy" style={{ color: '#475569', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#94a3b8'}
                  onMouseLeave={e => e.target.style.color = '#475569'}
                >Privacy Policy</Link>
                <span>&middot;</span>
                <Link href="/terms" style={{ color: '#475569', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#94a3b8'}
                  onMouseLeave={e => e.target.style.color = '#475569'}
                >Terms of Use</Link>
              </div>
            </div>

          </div>

          {/* Bottom copyright */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', fontSize: '0.8rem', color: '#475569' }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Trust-Way Hospital. NHIS Accredited Facility. Agogo, Ashanti Region, Ghana.</p>
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
