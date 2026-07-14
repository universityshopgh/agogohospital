import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Agogo Presbyterian Hospital',
  description: 'How Agogo Presbyterian Hospital collects, uses, and protects your personal and medical information.',
};

export default function PrivacyPolicy() {
  return (
    <div>
      {/* Hero */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '12px' }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>Last updated: July 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container" style={{ maxWidth: '780px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.97rem' }}>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>1. About This Policy</h2>
              <p>Agogo Presbyterian Hospital ("the Hospital") is committed to protecting your privacy. This policy explains how we handle personal and medical information collected through our website and hospital services.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>2. Information We Collect</h2>
              <p>We may collect the following when you use our website or register as a patient:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Full name, phone number, and email address</li>
                <li>NHIS card number and insurance details</li>
                <li>Appointment and consultation records</li>
                <li>Any information you submit through our enquiry or appointment forms</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>3. How We Use Your Information</h2>
              <p>Your information is used to:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Register and manage your patient profile</li>
                <li>Schedule and confirm appointments</li>
                <li>Process NHIS and billing transactions</li>
                <li>Respond to enquiries submitted through our contact form</li>
                <li>Improve the quality of our services</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>4. Patient Confidentiality</h2>
              <p>All medical and personal records are treated as strictly confidential in accordance with Ghana's healthcare regulations and the Presbyterian Church of Ghana's ethical standards. Your records will not be shared with third parties without your written consent, except where required by law or for emergency medical treatment.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>5. Data Security</h2>
              <p>We take reasonable steps to protect your information from unauthorised access, loss, or disclosure. Our online patient portal uses secure authentication and encrypted connections.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>6. Your Rights</h2>
              <p>You have the right to access, correct, or request deletion of your personal information held by the Hospital. To make such a request, contact us at the address below or visit the Records Office.</p>
            </div>

            <div>
              <h2 style={{ color: 'var(--text-color)', fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>7. Contact</h2>
              <p>For privacy-related enquiries, contact us:</p>
              <div style={{ marginTop: '12px', padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <p style={{ margin: 0 }}><strong>Agogo Presbyterian Hospital</strong><br />
                Main Hospital Road, Agogo, Ashanti Region, Ghana<br />
                P.O. Box 27, Agogo<br />
                Email: info@agogopresbyhospital.org</p>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
            <Link href="/terms" style={{ marginLeft: '16px', fontSize: '0.9rem', color: 'var(--primary)' }}>View Terms of Use →</Link>
          </div>

        </div>
      </section>
    </div>
  );
}
