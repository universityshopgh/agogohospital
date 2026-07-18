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
      <footer style={{ backgroundColor: '#0f172a', borderTop: '1px solid #1e293b', paddingTop: '56px', paddingBottom: '0' }}>
        <div className="container">

          {/* Top Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', paddingBottom: '48px', borderBottom: '1px solid #1e293b' }}>

            {/* Col 1: About */}
            <div>
              <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.1rem', marginBottom: '6px' }}>Trust-Way Hospital</h4>
              <p style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700', marginBottom: '16px' }}>Asante Akim North · Ashanti Region</p>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.7' }}>
                Providing compassionate, quality healthcare to our community since 1931.
              </p>
              <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '12px' }}>
                NHIS Accredited · Quality Healthcare Facility
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', marginBottom: '18px' }}>Navigation</h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Departments & Services', href: '/departments' },
                  { label: 'Patient Information', href: '/patient-info' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#ffffff'}
                      onMouseLeave={e => e.target.style.color = '#94a3b8'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', marginBottom: '18px' }}>Contact</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '3px' }}>Emergency (24/7)</span>
                  <a href="tel:+2335438494737" style={{ color: '#f87171', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>+233 543 849 4737</a>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '3px' }}>Reception</span>
                  <a href="tel:+2335438494737" style={{ color: '#94a3b8', fontSize: '0.88rem', textDecoration: 'none' }}>+233 543 849 4737</a>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '3px' }}>Email</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>info@trustwayhospital.com</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '3px' }}>Address</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Main Hospital Road, Agogo, Ghana</span>
                </div>
              </div>
            </div>

            {/* Col 4: Hours */}
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700', marginBottom: '18px' }}>Opening Hours</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Emergency', hours: '24 Hours, 7 Days' },
                  { label: 'OPD Clinic', hours: 'Mon – Fri: 8AM – 5PM' },
                  { label: 'Laboratory', hours: 'Daily (Outpatient: 7AM–7PM)' },
                  { label: 'Administration', hours: 'Mon – Fri: 8AM – 4:30PM' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <span style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '2px' }}>{item.label}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '20px 0', fontSize: '0.8rem', color: '#475569' }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Trust-Way Hospital · Asante Akim North, Ashanti Region, Ghana</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/privacy" style={{ color: '#475569', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#94a3b8'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#475569', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#94a3b8'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >Terms of Use</Link>
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
