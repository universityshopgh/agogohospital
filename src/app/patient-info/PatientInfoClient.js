'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PatientInfoClient() {
  const [activeFaq, setActiveFaq] = useState(null);

  const visitingWards = [
    { name: "General Wards", hours: "Daily: 11:30 AM – 1:00 PM and 4:30 PM – 6:00 PM" },
    { name: "Maternity Ward", hours: "Daily: 11:30 AM – 1:00 PM" },
    { name: "Children's Ward", hours: "One parent or guardian may stay with the child" },
    { name: "ICU", hours: "Daily: 12:00 PM – 1:00 PM" }
  ];

  const visitSteps = [
    { num: "1", title: "Registration", desc: "Register at the reception desk and present your ID and NHIS card." },
    { num: "2", title: "Consultation", desc: "See a doctor or nurse at the OPD." },
    { num: "3", title: "Tests", desc: "If required, go to the laboratory or imaging department." },
    { num: "4", title: "Pharmacy", desc: "Collect any prescribed medication." },
    { num: "5", title: "Discharge or Admission", desc: "Go home with instructions, or be admitted to a ward for further care." }
  ];

  const faqs = [
    { q: "How do I register as a new patient?", a: "Visit the reception desk with a valid ID. You can also book online through the patient portal." },
    { q: "Does the hospital accept NHIS?", a: "Yes. NHIS is accepted for all eligible services." },
    { q: "Where can visitors park?", a: "Free parking is available within the hospital compound." },
    { q: "How do I get my medical records?", a: "Visit the Records Office with a valid ID, or submit a written request." },
    { q: "What do I do in an emergency?", a: "Go directly to the Emergency Department or call our hotline. The emergency unit is open 24/7." }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="section" style={{
        backgroundImage: 'linear-gradient(rgba(15,23,42,0.4), rgba(15,23,42,0.4)), url("/patient.jpeg")',
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
        padding: '140px 0', textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Patient Information
          </h1>
          <p style={{ color: '#E2E8F0', maxWidth: '560px', margin: '0 auto', fontSize: '1.05rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            What to know before, during, and after your visit.
          </p>
        </div>
      </section>

      {/* Before Your Visit */}
      <section className="section">
        <div className="container">
          <div className="about-grid">

            <div>
              <span className="section-tag">Before You Come</span>
              <h2 className="section-title" style={{ marginBottom: '12px' }}>Preparing for Your Visit</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '24px' }}>
                {[
                  { num: "1", title: "Book an Appointment", desc: "Use the online portal or walk in. Emergencies are seen immediately." },
                  { num: "2", title: "Bring Your Documents", desc: "Valid ID and NHIS card (if applicable)." },
                  { num: "3", title: "Referral Letter", desc: "Required for some specialist clinics." },
                  { num: "4", title: "Arrive Early", desc: "At least 30 minutes before your appointment." }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(15,108,189,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
                      {item.num}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '700', marginBottom: '2px', fontSize: '0.97rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Bring */}
            <div className="card" style={{ padding: '36px', alignSelf: 'start' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px' }}>What to Bring</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {["Valid ID (National ID, Passport, or Voter's Card)", "NHIS Card", "Referral Letter (if applicable)", "Previous Medical Records", "List of Current Medications", "Emergency Contact Details"].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.93rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '800' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Visiting Hours */}
      <section className="section" id="visiting-hours" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Visiting</span>
            <h2 className="section-title">Visiting Hours</h2>
          </div>
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {visitingWards.map((ward, idx) => (
              <div key={idx} className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '700', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                  {ward.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ward.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How a Visit Works */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Your Visit</span>
            <h2 className="section-title">How a Visit Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {visitSteps.map((step, idx) => (
              <div key={idx} className="card" style={{ padding: '24px', textAlign: 'center', borderTop: '3px solid var(--primary)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '8px' }}>{step.num}</div>
                <h4 style={{ fontWeight: '700', marginBottom: '8px', fontSize: '0.97rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rights & Responsibilities */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'start' }}>

            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '16px' }}>Your Rights</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {["Privacy and dignity", "Respectful care", "Clear information about your condition", "Informed consent before any procedure", "Safe and clean treatment environment"].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.93rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '800' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '16px' }}>Your Responsibilities</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {["Provide accurate personal and medical information", "Respect hospital staff and fellow patients", "Keep your appointments or notify us if unable to", "Follow the treatment and medication advice given"].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.93rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '800' }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <button className="faq-header" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} aria-expanded={activeFaq === idx}>
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

      {/* Downloadable Forms */}
      <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Forms</span>
            <h2 className="section-title">Download Forms</h2>
            <p className="section-subtitle">Fill these out before your visit to save time.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {[
              { name: "Admission Form", desc: "For new admissions and registration.", url: "/admission_form.pdf" },
              { name: "Records Request", desc: "To request copies of your medical files.", url: "/medical_records_request_form.pdf" },
              { name: "Consent Form", desc: "Required before procedures or surgery.", url: "/patient_consent_form.pdf" }
            ].map((form, idx) => (
              <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontWeight: '700', marginBottom: '6px', color: 'var(--primary)' }}>{form.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{form.desc}</p>
                </div>
                <a href={form.url} download className="btn btn-sm btn-outline" style={{ textAlign: 'center' }}>
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '10px' }}>Still have questions?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '1rem' }}>
            Our team is here to help — contact us or book an appointment online.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
            <Link href="/portal" className="btn btn-outline">Book Appointment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
