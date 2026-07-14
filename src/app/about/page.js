'use client';

import React from 'react';
import Link from 'next/link';

export default function About() {
  const historyTimeline = [
    { year: "1931", title: "Founded by Basel Mission", desc: "Established as a clinic serving Asante Akim district." },
    { year: "1953", title: "Ward Expansion", desc: "First general wards built; bed capacity expanded for regional referrals." },
    { year: "1985", title: "Training Accreditation", desc: "Accredited training centre for nurses and midwives." },
    { year: "2010", title: "Diagnostic Block", desc: "Digital X-Ray, ultrasound, and CT scanning commissioned." },
    { year: "2026", title: "Digital Healthcare", desc: "Online appointments, blood bank alerts, and dialysis unit added." }
  ];

  const coreValues = [
    "Christian Love & Compassion",
    "Professional Integrity",
    "Patient Safety & Dignity",
    "Accountability & Excellence",
    "Community Partnership"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35)), url("/about.jpeg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%', 
          color: '#FFFFFF', 
          padding: '140px 0', 
          textAlign: 'center' 
        }}
      >
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            About Us
          </h1>
          <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            A legacy of compassionate healthcare, clinical excellence, and community service since 1931.
          </p>
        </div>
      </section>

      {/* Our History Section */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-tag">Our History</span>
              <h2 className="section-title">Serving the Community Since 1931</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Founded in 1931 by the Basel Mission, Agogo Presbyterian Hospital has grown into a leading 250-bed referral hospital, serving the Ashanti Region through emergency care, specialist clinics, diagnostics, maternity, and surgery.
              </p>
            </div>
            
            {/* Highlights Frame */}
            <div className="card" style={{ padding: '40px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: '800' }}>Hospital Highlights</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> 250-Bed Referral Capacity
                </li>
                <li style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> Accredited Training Institution
                </li>
                <li style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> Fully Automated Diagnostics Labs
                </li>
                <li style={{ fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> Ministry of Health Approved Provider
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: '800' }}>Our Mission</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                To provide high-quality, affordable, and holistic healthcare with Christian love and compassion, focusing on the poor and vulnerable.
              </p>
            </div>

            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: '800' }}>Our Vision</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                To be a leading Christian healthcare institution of excellence in Ghana, providing patient-centered care and clinical training.
              </p>
            </div>

            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: '800' }}>Core Values</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {coreValues.map((value, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--primary)' }}>•</span> {value}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">History</span>
            <h2 className="section-title">Key Milestones</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {historyTimeline.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', borderTop: '3px solid var(--primary)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '6px' }}>{item.year}</div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-color)' }}>{item.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Assistance CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '12px' }}>Need Help?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
            Contact us for appointments, admissions, or general enquiries.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
            <Link href="/portal" className="btn btn-outline">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
