'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import Carousel from '@/components/Carousel';
import BloodBankStatus from '@/components/BloodBankStatus';

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { num: "1931", label: "Year Founded" },
    { num: "16", label: "Clinical Departments" },
    { num: "9,000+", label: "Annual Patient Visits" },
    { num: "250", label: "Inpatient Beds" },
    { num: "24/7", label: "Emergency Care" },
    { num: "100%", label: "NHIS Accredited" }
  ];

  const news = [
    { date: "15–20 July", tag: "Campaign", title: "Polio Vaccination", desc: "Free vaccination for children under five." },
    { date: "June 2026", tag: "Outreach", title: "Community Screening", desc: "450+ residents screened for diabetes and hypertension." },
    { date: "Monthly", tag: "Notice", title: "Blood Donation", desc: "Donate every last Saturday of the month." }
  ];

  const quickAccessList = [
    { title: 'Emergency', link: 'tel:+233241234567', isExternal: true },
    { title: 'Appointments', link: '/portal', isExternal: false },
    { title: 'Departments', link: '/departments', isExternal: false },
    { title: 'Patient Info', link: '/patient-info', isExternal: false },
    { title: 'Laboratory', link: '/departments#laboratory', isExternal: false },
    { title: 'Visiting Hours', link: '/patient-info#visiting-hours', isExternal: false },
    { title: 'Contact', link: '/contact', isExternal: false }
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel />

      {/* Quick Access Grid */}
      <section className="container" style={{ position: 'relative', marginTop: '-40px', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {quickAccessList.map((card, idx) => (
            card.isExternal ? (
              <a key={idx} href={card.link} className="quick-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '54px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', background: 'var(--white)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', transition: 'var(--transition-fast)' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-color)', fontSize: '0.9rem', textAlign: 'center' }}>{card.title}</span>
              </a>
            ) : (
              <Link key={idx} href={card.link} className="quick-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '54px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', background: 'var(--white)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', transition: 'var(--transition-fast)' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-color)', fontSize: '0.9rem', textAlign: 'center' }}>{card.title}</span>
              </Link>
            )
          ))}
        </div>
      </section>

      {/* Live Blood Bank Status */}
      <section className="section">
        <div className="container">
          <BloodBankStatus />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <div className="section-tag">About Us</div>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Serving Our Community Since 1931</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '24px', lineHeight: '1.7' }}>
                Trust-Way Hospital is a leading referral healthcare provider committed to delivering quality, compassionate, and patient-centered medical services to our community.
              </p>
              <Link href="/patient-info" className="btn btn-primary">Learn More</Link>
            </div>

            {/* Mission, Vision, Core Values */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '12px', borderLeft: '4px solid var(--primary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '1.25rem' }}>Mission</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>To provide high-quality, affordable, and holistic healthcare with compassion, focusing on the poor and vulnerable.</p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '12px', borderLeft: '4px solid var(--secondary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '12px', fontSize: '1.25rem' }}>Vision</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>To be a leading healthcare institution of excellence in Ghana, providing patient-centered care and clinical training.</p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '12px', borderLeft: '4px solid var(--accent)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '1.25rem' }}>Core Values</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Compassion, Integrity, Excellence, and Patient Safety — the principles that guide every decision we make.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Hospital at a Glance</span>
            <h2 className="section-title">Our Impact</h2>
          </div>
          <div className="highlights-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Clinical Departments</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Comprehensive clinical care across multiple medical specialties.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {[
              { name: "Emergency Department", desc: "24/7 critical trauma response and acute emergency treatment." },
              { name: "Outpatient Department (OPD)", desc: "General consultations, routine screenings, and specialist referrals." },
              { name: "Surgery & Theatre", desc: "Elective and emergency surgical procedures by consultant surgeons." },
              { name: "Maternity & Neonatal", desc: "Pregnancy care, childbirth delivery, and neonatal support." }
            ].map((dept, idx) => (
              <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <div>
                  <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{dept.name}</h3>
                  <p className="card-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{dept.desc}</p>
                </div>
                <Link href="/departments" style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                  View All Services →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/departments" className="btn btn-primary">View All Departments</Link>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Updates</span>
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-subtitle">Upcoming outreach campaigns and public health notices.</p>
          </div>

          <div className="card-grid">
            {news.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{item.date}</span>
                  <span style={{
                    fontSize: '0.725rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: item.tag === 'Campaign' ? 'var(--primary)' : item.tag === 'Outreach' ? '#0e7490' : '#b45309',
                    backgroundColor: item.tag === 'Campaign' ? 'rgba(15,108,189,0.08)' : item.tag === 'Outreach' ? 'rgba(14,116,144,0.08)' : 'rgba(217,119,6,0.08)',
                    padding: '4px 10px', borderRadius: '20px'
                  }}>{item.tag}</span>
                </div>
                <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h3>
                <p className="card-text" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-tag">Location</span>
              <h2 className="section-title">Visit Our Hospital</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px', fontSize: '1.05rem' }}>
                Located in Agogo, Ashanti Region — easily accessible by road and public transport from across the district.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://maps.app.goo.gl/tftZX67eY3cytqWU7" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
                <Link href="/contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </div>

            <div style={{ height: '350px', borderRadius: 'var(--border-radius)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <iframe
                title="Trust-Way Hospital Location"
                src="https://maps.google.com/maps?q=Trust-Way%20Hospital&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
