import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use | Trust-Way Hospital',
  description: 'Terms and conditions for using the Trust-Way Hospital website and services.',
};

export default function TermsOfUse() {
  return (
    <div>
      {/* Hero */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '12px' }}>Terms of Use</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>Last updated: July 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.97rem' }}>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
              <p>By accessing or using the Trust-Way Hospital website, you agree to these Terms of Use. If you do not agree, please do not use this website.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>2. Purpose of This Website</h2>
              <p>This website is provided for general information about the Hospital's services, departments, and facilities. It also allows patients to book appointments and submit enquiries. It is not a substitute for professional medical advice, diagnosis, or treatment.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>3. Medical Disclaimer</h2>
              <p>Information on this website is for general awareness only. Always consult a qualified healthcare professional for medical concerns. In an emergency, go directly to the Emergency Department or call our hotline immediately.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>4. Appointments & Online Bookings</h2>
              <p>Appointment requests made through the patient portal are subject to availability and confirmation by hospital staff. A booking request does not guarantee an appointment until confirmed. Please arrive at least 30 minutes before your scheduled time.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>5. Account Responsibility</h2>
              <p>If you create a patient portal account, you are responsible for keeping your login credentials secure. Do not share your account with others. The Hospital is not liable for any unauthorised access resulting from your failure to secure your credentials.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>6. Intellectual Property</h2>
              <p>All content on this website — including text, images, and logos — belongs to Trust-Way Hospital or its licensors. You may not reproduce or use any content without written permission.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>7. Changes to These Terms</h2>
              <p>We may update these terms from time to time. Continued use of the website after changes are posted means you accept the updated terms.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>8. Contact</h2>
              <div style={{ marginTop: '12px', padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <p style={{ margin: 0 }}><strong>Trust-Way Hospital</strong><br />
                Main Hospital Road, Agogo, Ashanti Region, Ghana<br />
                P.O. Box 27, Agogo<br />
                Email: info@trustwayhospital.com</p>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
            <Link href="/privacy" style={{ marginLeft: '16px', fontSize: '0.9rem', color: 'var(--primary)' }}>View Privacy Policy →</Link>
          </div>

        </div>
      </section>
    </div>
  );
}
