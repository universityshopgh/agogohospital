'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DepartmentsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Fully aligned clinical data (16 departments)
  const departmentsData = [
    {
      name: "Emergency Department",
      type: "Emergency",
      desc: "24/7 emergency treatment for urgent and life-threatening conditions.",
      hours: "Open 24/7",
      location: "Block A",
      btnText: "Learn More",
      btnLink: "/contact"
    },
    {
      name: "Outpatient (OPD)",
      type: "Outpatient",
      desc: "General consultations, health screenings, and specialist referrals.",
      hours: "Mon–Fri, 8:00 AM–5:00 PM",
      location: "Block B",
      btnText: "Book Appointment",
      btnLink: "/portal"
    },
    {
      name: "Inpatient Wards",
      type: "Inpatient",
      desc: "Comprehensive medical care for admitted patients.",
      hours: "Open 24/7",
      location: "Blocks C & D",
      btnText: "Learn More",
      btnLink: "/patient-info"
    },
    {
      name: "Surgery",
      type: "Inpatient",
      desc: "General and specialized surgical procedures.",
      hours: "By appointment & emergency",
      location: "Block A",
      btnText: "Learn More",
      btnLink: "/contact"
    },
    {
      name: "Maternity",
      type: "Inpatient",
      desc: "Pregnancy, childbirth, and newborn care.",
      hours: "Open 24/7",
      location: "Maternity Block",
      btnText: "Learn More",
      btnLink: "/patient-info"
    },
    {
      name: "Child Health",
      type: "Clinics",
      desc: "Healthcare services for infants, children, and adolescents.",
      hours: "Mon–Fri",
      location: "Pediatric Wing",
      btnText: "Book Appointment",
      btnLink: "/portal"
    },
    {
      name: "Orthopedic Clinic",
      type: "Clinics",
      desc: "Diagnosis and treatment of bone and joint conditions.",
      hours: "Tue & Thu",
      location: "Outpatient Annex",
      btnText: "Learn More",
      btnLink: "/contact"
    },
    {
      name: "Dental Clinic",
      type: "Clinics",
      desc: "Preventive and restorative oral healthcare.",
      hours: "Mon–Fri",
      location: "Block B",
      btnText: "Book Appointment",
      btnLink: "/portal"
    },
    {
      name: "Eye Clinic",
      type: "Clinics",
      desc: "Comprehensive eye examinations and vision care.",
      hours: "Mon, Wed & Fri",
      location: "Outpatient Annex",
      btnText: "Book Appointment",
      btnLink: "/portal"
    },
    {
      name: "Laboratory",
      type: "Diagnostics",
      desc: "Fast and accurate diagnostic testing.",
      hours: "Daily",
      location: "Diagnostic Block",
      btnText: "View Services",
      btnLink: "#diagnostic-services"
    },
    {
      name: "Radiology",
      type: "Diagnostics",
      desc: "Advanced medical imaging and diagnostic scans.",
      hours: "Mon–Fri",
      location: "Diagnostic Block",
      btnText: "View Services",
      btnLink: "#diagnostic-services"
    },
    {
      name: "Physiotherapy",
      type: "Clinics",
      desc: "Rehabilitation and recovery through physical therapy.",
      hours: "Mon–Fri",
      location: "Block C",
      btnText: "Learn More",
      btnLink: "/contact"
    },
    {
      name: "Vaccination Centre",
      type: "Outpatient",
      desc: "Routine and public immunization services.",
      hours: "Mon–Fri",
      location: "Pediatric Annex",
      btnText: "Learn More",
      btnLink: "/patient-info"
    },
    {
      name: "Diabetes Clinic",
      type: "Clinics",
      desc: "Ongoing care for diabetes and hypertension.",
      hours: "Wednesdays",
      location: "Outpatient Clinic",
      btnText: "Book Appointment",
      btnLink: "/portal"
    },
    {
      name: "Dialysis Unit",
      type: "Diagnostics",
      desc: "Specialized kidney care and dialysis treatment.",
      hours: "Mon–Sat",
      location: "Dialysis Wing",
      btnText: "Learn More",
      btnLink: "/contact"
    },
    {
      name: "Intensive Care Unit (ICU)",
      type: "Emergency",
      desc: "Critical care for patients requiring continuous monitoring.",
      hours: "Open 24/7",
      location: "Block A",
      btnText: "Learn More",
      btnLink: "/contact"
    }
  ];

  // Category listing matching standard request filters
  const categories = ["All", "Emergency", "Outpatient", "Inpatient", "Clinics", "Diagnostics"];

  // Filter & Search Logic
  const filteredDepts = departmentsData.filter(dept => {
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeFilter === 'All' || dept.type === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35)), url("/service.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%', 
          color: '#FFFFFF', 
          padding: '140px 0', 
          textAlign: 'center' 
        }}
      >
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Departments & Services
          </h1>
          <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Browse our clinical departments and specialist services.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          
          {/* Search & Filter Component */}
          <div className="search-filter-box">
            <div className="search-input-wrapper">
              <input 
                type="text"
                placeholder="Search for a department or service..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-secondary)' }}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Filter Tags */}
            <div className="filter-tags">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`tag-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Department Cards Grid */}
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {filteredDepts.length > 0 ? (
              filteredDepts.map((dept, idx) => (
                <article 
                  key={idx} 
                  className="card" 
                  id={dept.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px' }}
                >
                  <div>
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span className="section-tag" style={{ margin: 0 }}>{dept.type}</span>
                    </header>
                    
                    <h3 className="card-title" style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px' }}>{dept.name}</h3>
                    <p className="card-text" style={{ fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>{dept.desc}</p>
                    
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px', lineHeight: '1.6' }}>
                      <strong>Hours:</strong> {dept.hours} <br/> 
                      <strong>Location:</strong> {dept.location}
                    </p>
                  </div>
                  
                  <footer style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-start' }}>
                    <Link href={dept.btnLink} className={`btn btn-sm ${dept.btnText === 'Book Appointment' ? 'btn-primary' : 'btn-outline'}`}>
                      {dept.btnText}
                    </Link>
                  </footer>
                </article>
              ))
            ) : (
              <div className="text-center" style={{ gridColumn: '1 / -1', padding: '48px' }}>
                <h3 style={{ marginTop: '16px' }}>
                  No Departments Found
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Try adjusting your search filters or typing another medical keyword.
                </p>
                <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} style={{ marginTop: '16px' }}>
                  Reset Search Filters
                </button>
              </div>
            )}
          </div>

          {/* Diagnostics and Specialized Clinics Section */}
          <section style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
            
            {/* Diagnostics & Imaging Card */}
            <article id="diagnostic-services" className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
                Diagnostic & Imaging
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                Laboratory and imaging services for accurate diagnosis.
              </p>
              
              <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', fontWeight: '700' }}>Available Services</h4>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', listStyle: 'none', padding: 0 }}>
                {["Blood Tests", "Urine & Stool Analysis", "X-Ray", "Ultrasound", "CT Scan", "ECG"].map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--primary)' }}>•</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '28px' }}>
                <Link href="/contact" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </article>

            {/* Specialist weekly clinics table */}
            <article className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px', color: 'var(--primary)' }}>
                Weekly Specialist Clinics
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                Scheduled clinics with specialist healthcare professionals.
              </p>

              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Clinic</th>
                      <th>Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Eye Clinic</strong></td>
                      <td style={{ color: 'var(--primary)', fontWeight: '600' }}>Mon, Wed & Fri</td>
                    </tr>
                    <tr>
                      <td><strong>Orthopedic Clinic</strong></td>
                      <td style={{ color: 'var(--primary)', fontWeight: '600' }}>Tue & Thu</td>
                    </tr>
                    <tr>
                      <td><strong>Diabetes Clinic</strong></td>
                      <td style={{ color: 'var(--primary)', fontWeight: '600' }}>Wednesdays</td>
                    </tr>
                    <tr>
                      <td><strong>Mental Health Clinic</strong></td>
                      <td style={{ color: 'var(--primary)', fontWeight: '600' }}>Mon & Thu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                Some clinics require a referral.
              </p>
            </article>

          </section>

          {/* Need Help CTA */}
          <section className="section" style={{ borderTop: '1px solid var(--border-color)', marginTop: '64px', paddingTop: '64px', textAlign: 'center' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '12px' }}>Not sure where to go?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
                Our team will guide you to the right service.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
                <a href="tel:2335438494737" className="btn btn-outline">
                  Call Hospital
                </a>
              </div>
            </div>
          </section>

        </div>
      </section>
    </div>
  );
}
