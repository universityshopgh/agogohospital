'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import Carousel from '@/components/Carousel';
import BloodBankStatus from '@/components/BloodBankStatus';

export default function Home() {
  const { locale, t } = useLanguage();

  // Localized Content Dictionary
  const content = {
    en: {
      aboutTitle: "About Us",
      aboutSubtitle: "Serving our community with faith, love, and medical excellence since 1931.",
      historyTitle: "Our History",
      historyText: "Founded in 1931 by the Basel Mission, Agogo Presbyterian Hospital has grown from a small clinic to a leading 250-bed referral hospital. Together with the Ministry of Health and the Presbyterian Church of Ghana, we serve as the primary healthcare hub for the Asante Akim North district.",
      missionTitle: "Mission",
      missionText: "To provide high-quality, affordable, and holistic healthcare with Christian love and compassion, focusing on the poor and vulnerable.",
      visionTitle: "Vision",
      visionText: "To be a leading Christian healthcare institution of excellence in Ghana, providing patient-centered care and clinical training.",
      valuesTitle: "Core Values",
      values: ["Christian Love & Compassion", "Professional Integrity", "Patient Safety & Dignity", "Accountability & Excellence", "Community Partnership"],
      
      quickAccessTitle: "Quick Access",
      highlightsTitle: "Our Impact",
      highlightsSubtitle: "Hospital at a Glance",
      
      stats: [
        { num: "38", label: "Years of Service" },
        { num: "16", label: "Clinical Departments" },
        { num: "9,000+", label: "Annual Patient Visits" },
        { num: "250", label: "Inpatient Beds" },
        { num: "24/7", label: "Emergency Trauma Care" },
        { num: "100%", label: "NHIS Accredited" }
      ],
      
      deptPreviewTitle: "Featured Services",
      deptPreviewSubtitle: "Comprehensive clinical care across multiple medical specialties.",
      viewAllDepts: "View All Services",
      
      facilitiesTitle: "Hospital Facilities",
      facilitiesSubtitle: "Modern and clean medical environments tailored for patient comfort.",
      facilities: [
        { title: "Emergency Unit", desc: "24/7 emergency medical care." },
        { title: "Operating Theatre", desc: "Safe and modern surgical services." },
        { title: "Laboratory", desc: "Fast and accurate diagnostic testing." },
        { title: "Maternity", desc: "Quality maternal and newborn care." },
        { title: "Pediatric Ward", desc: "Healthcare designed for children." },
        { title: "Outpatient Clinic", desc: "Daily consultations and specialist clinics." }
      ],
      
      newsTitle: "Latest Updates",
      newsSubtitle: "Stay informed about our upcoming outreach campaigns and public health notices.",
      news: [
        { date: "15–20 July", tag: "Campaign", title: "Polio Vaccination", desc: "Free vaccination for children under five." },
        { date: "June 2026", tag: "Outreach", title: "Community Screening", desc: "450+ residents screened for diabetes and hypertension." },
        { date: "Monthly", tag: "Notice", title: "Blood Donation", desc: "Donate every last Saturday of the month." }
      ],
      
      whyChooseTitle: "Why Choose Us?",
      whyChooseSubtitle: "A combination of historical trust, state accreditation, and patient-first protocols.",
      reasons: [
        { title: "Affordable Care", desc: "" },
        { title: "Experienced Professionals", desc: "" },
        { title: "24/7 Emergency", desc: "" },
        { title: "Modern Diagnostics", desc: "" },
        { title: "Patient First", desc: "" },
        { title: "Safe & Clean Environment", desc: "" }
      ],
      
      testimonialsTitle: "What Patients Say",
      testimonials: [
        { text: "Professional staff and excellent maternity care.", author: "Mary Mensah" },
        { text: "Quick emergency response saved my father's life.", author: "Kofi Owusu" },
        { text: "Clean environment and smooth NHIS service.", author: "Amina Ibrahim" }
      ],
      
      findUsTitle: "Visit Our Hospital",
      findUsText: "Find us in Agogo, Ashanti Region, with easy access by road and public transport."
    }
  };

  const activeContent = content['en'];

  // Quick Access Card clicks
  const quickAccessList = [
    { title: 'Emergency', link: 'tel:+233241234567', isExternal: true },
    { title: 'Appointments', link: '/portal', isExternal: false },
    { title: 'Departments', link: '/departments', isExternal: false },
    { title: 'Patient Info', link: '/patient-info', isExternal: false },
    { title: 'Laboratory', link: '/departments#laboratory', isExternal: false },
    { title: 'Pharmacy', link: '/departments#pharmacy', isExternal: false },
    { title: 'Visiting Hours', link: '/patient-info#visiting-hours', isExternal: false },
    { title: 'Contact', link: '/contact', isExternal: false }
  ];

  return (
    <div>
      {/* Hero Section Carousel */}
      <Carousel />

      {/* Quick Access Grid overlaying carousel */}
      <section className="container" style={{ position: 'relative', marginTop: '-40px', zIndex: 10 }}>
        <div className="quick-access-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {quickAccessList.map((card, idx) => (
            card.isExternal ? (
              <a key={idx} href={card.link} className="quick-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '54px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', background: 'var(--white)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', transition: 'var(--transition-fast)' }}>
                <span className="quick-card-title" style={{ fontWeight: '600', color: 'var(--text-color)', fontSize: '0.9rem', textAlign: 'center' }}>{card.title}</span>
              </a>
            ) : (
              <Link key={idx} href={card.link} className="quick-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '54px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', background: 'var(--white)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', transition: 'var(--transition-fast)' }}>
                <span className="quick-card-title" style={{ fontWeight: '600', color: 'var(--text-color)', fontSize: '0.9rem', textAlign: 'center' }}>{card.title}</span>
              </Link>
            )
          ))}
        </div>
      </section>

      {/* Live Blood Bank Stock Widget */}
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
                Founded by the Basel Mission, Agogo Presbyterian Hospital has grown into a leading referral hospital, providing quality healthcare with compassion and excellence.
              </p>
              <Link href="/patient-info" className="btn btn-primary">
                Learn More
              </Link>
            </div>

            {/* Mission, Vision, Core Values Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '12px', borderLeft: '4px solid var(--primary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '1.25rem' }}>Mission</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Providing quality, affordable healthcare with compassion.</p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '12px', borderLeft: '4px solid var(--secondary)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: 'var(--secondary)', marginBottom: '12px', fontSize: '1.25rem' }}>Vision</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>To be a leading Christian healthcare institution in Ghana.</p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '30px', borderRadius: '12px', borderLeft: '4px solid var(--accent)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '1.25rem' }}>Core Values</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { label: '✝ Christian Love', color: '#0f6cbd', bg: 'rgba(15,108,189,0.08)' },
                    { label: '🤝 Compassion',     color: '#0e7490', bg: 'rgba(14,116,144,0.08)' },
                    { label: '🛡 Integrity',       color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
                    { label: '⭐ Excellence',      color: '#b45309', bg: 'rgba(180,83,9,0.08)'  },
                    { label: '❤ Patient Safety',  color: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
                  ].map((v, i) => (
                    <span key={i} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      color: v.color,
                      backgroundColor: v.bg,
                      border: `1px solid ${v.color}22`,
                      letterSpacing: '0.01em',
                    }}>{v.label}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Highlights Stats Section */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Our Impact</span>
            <h2 className="section-title">{activeContent.highlightsTitle}</h2>
            <p className="section-subtitle">{activeContent.highlightsSubtitle}</p>
          </div>

          <div className="highlights-grid">
            {activeContent.stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services (Departments Preview) */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Clinical Departments</span>
            <h2 className="section-title">Featured Services</h2>
            <p className="section-subtitle">Comprehensive clinical care across multiple medical specialties.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {[
              { name: "Emergency Department", desc: "Critical trauma response and acute medical emergency treatment." },
              { name: "Outpatient Department (OPD)", desc: "General medical consultations, routine screenings, and specialist referrals." },
              { name: "Surgery & Theatre", desc: "Elective and emergency surgical procedures managed by consultant surgeons." },
              { name: "Maternity & Neonatal", desc: "Compassionate pregnancy care, childbirth delivery, and neonatal intensive support." }
            ].map((dept, idx) => (
              <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <div>
                  <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{dept.name}</h3>
                  <p className="card-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{dept.desc}</p>
                </div>
                <Link href={`/departments#${dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/departments" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Hospital Layout</span>
            <h2 className="section-title">{activeContent.facilitiesTitle}</h2>
            <p className="section-subtitle">{activeContent.facilitiesSubtitle}</p>
          </div>

          <div className="facilities-grid">
            {activeContent.facilities.map((fac, idx) => (
              <div key={idx} className="facility-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '5px', background: 'linear-gradient(90deg, var(--primary) 0%, #1e88e5 100%)' }} />
                <div className="facility-body" style={{ padding: '24px' }}>
                  <h3 className="facility-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{fac.title}</h3>
                  <p className="facility-desc" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Public Health Alerts */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Updates</span>
            <h2 className="section-title">{activeContent.newsTitle}</h2>
            <p className="section-subtitle">{activeContent.newsSubtitle}</p>
          </div>

          <div className="card-grid">
            {activeContent.news.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{item.date}</span>
                  <span style={{
                    fontSize: '0.725rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: item.tag === 'Campaign' ? 'var(--primary)' : item.tag === 'Outreach' ? '#0e7490' : '#b45309',
                    backgroundColor: item.tag === 'Campaign' ? 'rgba(15, 108, 189, 0.08)' : item.tag === 'Outreach' ? 'rgba(14, 116, 144, 0.08)' : 'rgba(217, 119, 6, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{item.title}</h3>
                <p className="card-text" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Hospital */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Public Trust</span>
            <h2 className="section-title">Why Choose Us?</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px', 
            marginBottom: '40px' 
          }}>
            {[
              "Affordable Care",
              "Experienced Professionals",
              "24/7 Emergency",
              "Modern Diagnostics",
              "Patient First",
              "Safe & Clean Environment"
            ].map((title, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-color)' }}>{title}</strong>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--primary)' }}>
              Delivering quality healthcare with compassion and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Feedback</span>
            <h2 className="section-title">{activeContent.testimonialsTitle}</h2>
          </div>

          <div className="card-grid">
            {activeContent.testimonials.map((tst, idx) => (
              <div key={idx} className="card" style={{ fontStyle: 'italic', position: 'relative', paddingTop: '48px' }}>
                <span style={{ position: 'absolute', top: '16px', left: '20px', fontSize: '3rem', color: 'var(--accent)', lineHeight: 1, fontFamily: 'serif' }}>“</span>
                <p className="card-text" style={{ marginBottom: '16px' }}>{tst.text}</p>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-color)', fontStyle: 'normal' }}>— {tst.author}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Direction Section */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-tag">Contact</span>
              <h2 className="section-title">{activeContent.findUsTitle}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px', fontSize: '1.1rem' }}>
                {activeContent.findUsText}
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a 
                  href="https://maps.app.goo.gl/tftZX67eY3cytqWU7" 
                  className="btn btn-primary"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
                <Link href="/contact" className="btn btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Live Interactive Map Frame */}
            <div style={{
              height: '350px',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--card-shadow)',
              position: 'relative'
            }}>
              <iframe
                title="Agogo Presbyterian Hospital Location Map"
                src="https://maps.google.com/maps?q=Agogo%20Presbyterian%20Hospital&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
