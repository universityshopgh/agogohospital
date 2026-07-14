'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PatientInfo() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleDownloadAll = () => {
    const files = [
      { name: "Admission_Form.pdf", url: "/admission_form.pdf" },
      { name: "Medical_Records_Request_Form.pdf", url: "/medical_records_request_form.pdf" },
      { name: "Patient_Consent_Form.pdf", url: "/patient_consent_form.pdf" }
    ];
    
    files.forEach(file => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const checklistItems = [
    "Valid ID",
    "NHIS Card",
    "Referral Letter (if required)",
    "Medical Records",
    "Current Medications",
    "Emergency Contact Information"
  ];

  const visitingWards = [
    { name: "General Wards", hours: "Daily: 11:30 AM – 1:00 PM | 4:30 PM – 6:00 PM" },
    { name: "Maternity Ward", hours: "Daily: 11:30 AM – 1:00 PM" },
    { name: "Children's Ward", hours: "One parent or guardian may stay with the child." },
    { name: "Intensive Care Unit (ICU)", hours: "Daily: 12:00 PM – 1:00 PM" }
  ];

  const timelineSteps = [
    { step: "1", title: "Registration", desc: "Complete your registration and basic health checks." },
    { step: "2", title: "Consultation", desc: "Meet with a healthcare professional." },
    { step: "3", title: "Tests (If Required)", desc: "Complete any requested laboratory or imaging tests." },
    { step: "4", title: "Pharmacy", desc: "Collect prescribed medication." },
    { step: "5", title: "Admission or Discharge", desc: "Receive further care or return home with follow-up instructions." }
  ];

  const patientRights = [
    "Privacy and dignity",
    "Respectful care",
    "Clear medical information",
    "Informed consent",
    "Safe treatment"
  ];

  const patientResponsibilities = [
    "Providing accurate information",
    "Respecting staff and other patients",
    "Keeping appointments",
    "Following medical advice"
  ];

  const faqsList = [
    { q: "How do I register as a new patient?", a: "Visit the reception desk or use the online appointment system." },
    { q: "Does the hospital accept NHIS?", a: "Yes, NHIS is accepted for eligible services." },
    { q: "Where can visitors park?", a: "Free parking is available within the hospital premises." },
    { q: "How do I request my medical records?", a: "Visit the Records Office or submit a request through the hospital." },
    { q: "What should I do during an emergency?", a: "Proceed directly to the Emergency Department or call the emergency hotline." }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35)), url("/patient.jpeg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%', 
          color: '#FFFFFF', 
          padding: '140px 0', 
          textAlign: 'center' 
        }}
      >
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Patient Information
          </h1>
          <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            What to know before, during, and after your visit.
          </p>
        </div>
      </section>

      {/* Before Your Visit & What to Bring Checklist */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            
            {/* Guide Card */}
            <div>
              <span className="section-tag">Before Your Visit</span>
              <h2 className="section-title" style={{ marginBottom: '16px' }}>Appointment Guide</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.05rem' }}>
                Preparing for your visit is simple.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: "Book an Appointment", desc: "Schedule online or walk in. Emergencies are attended to immediately." },
                  { title: "Bring Your Documents", desc: "Valid ID and NHIS card (if applicable)." },
                  { title: "Referrals", desc: "Some specialist clinics require a referral from your doctor." },
                  { title: "Arrive Early", desc: "Arrive at least 30 minutes before your appointment." }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(15, 108, 189, 0.08)', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.95rem' }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist Card */}
            <div className="card" style={{ padding: '40px', alignSelf: 'start' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: '800' }}>
                What to Bring
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Bring the following when visiting:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
                {checklistItems.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Visiting Hours Section */}
      <section className="section" id="visiting-hours" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Schedules</span>
            <h2 className="section-title">Visiting Hours</h2>
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {visitingWards.map((ward, idx) => (
              <div key={idx} className="card" style={{ padding: '24px' }}>
                <h3 className="card-title" style={{ fontSize: '1.15rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
                  {ward.name}
                </h3>
                <p className="card-text" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{ward.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Journey Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Timeline</span>
            <h2 className="section-title">Admission Process</h2>
          </div>

          <div className="timeline">
            {timelineSteps.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-panel">
                  <div className="timeline-num">Step {item.step}</div>
                  <h3 className="timeline-title" style={{ fontWeight: '800' }}>{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Rights & Responsibilities Grid */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'start' }}>
            
            {/* Rights Card */}
            <div className="card" style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '24px', fontWeight: '800' }}>
                Your Rights
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Every patient has the right to:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
                {patientRights.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities Card */}
            <div className="card" style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '24px', fontWeight: '800' }}>
                Your Responsibilities
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Help us provide better care by:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
                {patientResponsibilities.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--primary)' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Information Desk</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqsList.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              >
                <button 
                  className="faq-header" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={activeFaq === idx}
                >
                  <span className="faq-question">{faq.q}</span>
                  <span className="faq-icon" style={{ fontSize: '0.8rem' }}>▼</span>
                </button>
                <div className="faq-body">
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Resources / Download Center */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span className="section-tag">Resource Centre</span>
            <h2 className="section-title">Patient Resources</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Download forms before your visit.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px', textAlign: 'left' }}>
              {[
                { name: "Admission Form", desc: "For admission registration.", url: "/admission_form.pdf" },
                { name: "Records Request", desc: "Request clinical files.", url: "/medical_records_request_form.pdf" },
                { name: "Consent Form", desc: "Information on procedures.", url: "/patient_consent_form.pdf" }
              ].map((form, idx) => (
                <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--primary)' }}>{form.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '16px' }}>{form.desc}</p>
                  </div>
                  <a href={form.url} download={form.name + '.pdf'} className="btn btn-sm btn-outline" style={{ display: 'inline-block', textAlign: 'center' }}>
                    Download Form
                  </a>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={handleDownloadAll}>
              Download Forms
            </button>
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
