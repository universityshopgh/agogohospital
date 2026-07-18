'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: 'General Administration',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'

  const activeContent = {
    heroTitle: "We're Here to Help",
    heroSubtitle: "Reach our staff, book appointments, or contact emergency services.",
    emergencyTitle: "Essential Contacts",
    hotline: "Emergency Hotline (24/7)",
    ambulance: "Ambulance Dispatch",
    reception: "Main Reception",
    appointments: "Appointments Desk",
    pharmacy: "Pharmacy Services",
    laboratory: "Laboratory Services",
    administration: "Hospital Administration",
    hoursTitle: "Service Operating Hours",
    opdClinic: "Outpatient Clinic",
    emergencyDept: "Emergency Trauma Unit (24/7)",
    labHours: "Diagnostic Laboratory",
    pharmacyHours: "Prescription Pharmacy",
    adminHours: "Hospital Administration",
    alwaysOpen: "24 Hours / 7 Days (Always Open)",
    opdSchedule: "Mon - Fri: 8:00 AM - 5:00 PM",
    labSchedule: "24 Hours (Outpatient: 7AM - 7PM)",
    pharmacySchedule: "24 Hours (Outpatient: 7AM - 9PM)",
    adminSchedule: "Mon - Fri: 8:00 AM - 4:30 PM",
    formTitle: "Submit a General Enquiry",
    formSubtitle: "Fill in the form below and our team will respond within 24–48 hours.",
    fieldName: "Full Name",
    fieldEmail: "Email Address",
    fieldPhone: "Phone Number",
    fieldSubject: "Subject",
    fieldDept: "Target Department",
    fieldMessage: "Your Message",
    submitBtn: "Send Enquiry",
    submittingBtn: "Sending...",
    successMsg: "Thank you! Your enquiry has been submitted successfully. A hospital representative will review your message shortly.",
    errorMsg: "Failed to submit enquiry. Please check your network connection and try again.",
    instructionsTitle: "Emergency Arrival Protocols",
    whenAmbulance: "When to Call an Ambulance",
    whenAmbulanceDesc: "Call immediately for heavy chest pains, sudden breathing difficulties, deep trauma injuries, heavy bleeding, loss of consciousness, or signs of stroke.",
    entrance: "Emergency Entrance Location",
    entranceDesc: "Located on the South wing (Block A). Follow the red 'EMERGENCY / ACCIDENT' signs. Ambulances have a dedicated direct lane and ramp.",
    expect: "What to Expect Upon Arrival",
    expectDesc: "Patients are assessed immediately using the South African Triage Scale (SATS). Red/orange cases are rushed directly to resus rooms. Lower-acuity cases will wait in turn.",
    whatToBring: "What to Bring (If Possible)",
    whatToBringDesc: "National ID card, NHIS insurance card, active medical files, and list of current drugs. Do not delay emergency travel to search for documents."
  };

  // Form Validation
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email address";
    }
    
    if (!formData.message.trim()) formErrors.message = "Message is required";
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          department: 'General Administration',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--primary)';
    e.target.style.boxShadow = '0 0 0 3px rgba(15, 108, 189, 0.15), inset 0 1px 2px rgba(0,0,0,0.02)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--border-color)';
    e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)';
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35)), url("/contact_div.jpeg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%', 
          color: '#FFFFFF', 
          padding: '140px 0', 
          textAlign: 'center' 
        }}
      >
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>{activeContent.heroTitle}</h1>
          <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>{activeContent.heroSubtitle}</p>
        </div>
      </section>



      {/* Directory Details and Service Working Hours */}
      <section className="section" style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="about-grid">
            
            {/* Contact details */}
            <div>
              <span className="section-tag" style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '700' }}>Contact Info</span>
              <h2 className="section-title" style={{ marginBottom: '24px', marginTop: '8px' }}>Trust-Way Hospital</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <strong>Physical Address:</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Main Hospital Road, Agogo Town, Ashanti Region, Ghana</span>
                </div>

                <div>
                  <strong>Postal Address:</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>P.O. Box 27, Agogo, Ashanti Region, Ghana</span>
                </div>

                <div>
                  <strong>Email Address:</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>info@trustwayhospital.com</span>
                </div>

              </div>
            </div>

            {/* Working Hours */}
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '32px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>{activeContent.hoursTitle}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <strong>{activeContent.emergencyDept}</strong><br/>
                  <span style={{ color: 'var(--error)', fontWeight: 'bold', fontSize: '0.85rem' }}>{activeContent.alwaysOpen}</span>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <strong>{activeContent.opdClinic}</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{activeContent.opdSchedule}</span>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <strong>{activeContent.labHours}</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{activeContent.labSchedule}</span>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <strong>{activeContent.pharmacyHours}</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{activeContent.pharmacySchedule}</span>
                </div>
                <div>
                  <strong>{activeContent.adminHours}</strong><br/>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{activeContent.adminSchedule}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Form and Emergency Instructions */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            
            {/* Contact Form */}
            <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{activeContent.formTitle}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>{activeContent.formSubtitle}</p>

              {submitStatus === 'success' && (
                <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderLeft: '4px solid var(--success)', color: 'var(--success)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                  {activeContent.successMsg}
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                  {activeContent.errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem' }}>{activeContent.fieldName} *</label>
                  <input 
                    type="text" 
                    name="name" 
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="form-error" style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem' }}>{activeContent.fieldEmail} *</label>
                    <input 
                      type="email" 
                      name="email" 
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="form-error" style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem' }}>{activeContent.fieldPhone}</label>
                    <input 
                      type="text" 
                      name="phone" 
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem' }}>{activeContent.fieldSubject}</label>
                    <input 
                      type="text" 
                      name="subject" 
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem' }}>{activeContent.fieldDept}</label>
                    <select 
                      name="department" 
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      value={formData.department}
                      onChange={handleInputChange}
                    >
                      <option value="General Administration">General Administration</option>
                      <option value="Outpatient Services">Outpatient Services (OPD)</option>
                      <option value="Billing & NHIS Accounts">Billing & NHIS Accounts</option>
                      <option value="Careers & Employment">Careers & HR Desk</option>
                      <option value="Feedback & Concerns">Complaints & Feedback</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label" style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '0.9rem' }}>{activeContent.fieldMessage} *</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && <span className="form-error" style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                  style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: '600', boxShadow: '0 4px 6px rgba(15, 108, 189, 0.15)' }}
                >
                  {isSubmitting ? activeContent.submittingBtn : activeContent.submitBtn}
                </button>
              </form>
            </div>

            {/* Emergency Contacts Card */}
            <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', alignSelf: 'start' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--error)', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px', marginBottom: '24px' }}>
                Emergency Contacts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Emergency Hotline (24/7)</span>
                  <a href="tel:+2335438494737" style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--error)', textDecoration: 'none' }}>+233 543 849 4737</a>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Ambulance Dispatch</span>
                  <a href="tel:+2335438494737" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)', textDecoration: 'none' }}>+233 543 849 4737</a>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Main Reception</span>
                  <a href="tel:+2335438494737" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)', textDecoration: 'none' }}>+233 543 849 4737</a>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Email</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-color)' }}>info@trustwayhospital.com</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
