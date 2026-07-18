'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function AdminConsole() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('blood-bank'); // 'blood-bank', 'enquiries', 'appointments'
  
  // Admin Login States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminSubmitting, setAdminSubmitting] = useState(false);

  // Data lists
  const [bloodStock, setBloodStock] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  // States
  const [loading, setLoading] = useState(true);
  const [savingBlood, setSavingBlood] = useState(false);
  const [bloodSuccess, setBloodSuccess] = useState('');
  const [bloodError, setBloodError] = useState('');

  // Check persistent admin session on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin_session');
    if (savedAdmin === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Fetch all databases
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Blood stock
      const bsRes = await fetch('/api/blood-stock');
      if (bsRes.ok) {
        const bsData = await bsRes.json();
        setBloodStock(bsData);
      }

      // Enquiries
      const enRes = await fetch('/api/enquiries');
      if (enRes.ok) {
        const enData = await enRes.json();
        setEnquiries(enData);
      }

      // Appointments
      const apRes = await fetch('/api/appointments');
      if (apRes.ok) {
        const apData = await apRes.json();
        setAppointments(apData);
      }
    } catch (err) {
      console.error("Failed to load admin databases", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAllData();
    }
  }, [isAdminLoggedIn]);

  // Admin login handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminSubmitting(true);
    setTimeout(() => {
      if ((adminEmail === 'admin@trustwayhospital.com' || adminEmail === 'admin') && adminPassword === 'administrator') {
        setIsAdminLoggedIn(true);
        setLoginError('');
        localStorage.setItem('admin_session', 'true');
      } else {
        setLoginError('Incorrect Admin Email or Password.');
      }
      setAdminSubmitting(false);
    }, 700);
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('admin_session');
    setAdminEmail('');
    setAdminPassword('');
  };

  // Update a single blood group level or percentage in local state
  const handleBloodChange = (index, field, value) => {
    const updated = [...bloodStock];
    if (field === 'percentage') {
      const num = Math.min(100, Math.max(0, parseInt(value) || 0));
      updated[index][field] = num;
      // Auto-assign level based on percentage range for convenience
      if (num <= 15) updated[index]['level'] = 'Critical';
      else if (num <= 35) updated[index]['level'] = 'Low';
      else if (num <= 65) updated[index]['level'] = 'Medium';
      else updated[index]['level'] = 'High';
    } else {
      updated[index][field] = value;
    }
    setBloodStock(updated);
  };

  // Save blood stock data
  const handleSaveBlood = async () => {
    setSavingBlood(true);
    setBloodSuccess('');
    setBloodError('');
    try {
      const res = await fetch('/api/blood-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bloodStock)
      });
      if (res.ok) {
        setBloodSuccess('Live Blood Bank inventory levels updated successfully!');
      } else {
        setBloodError('Failed to save changes to the blood bank.');
      }
    } catch (err) {
      setBloodError('Network connection error.');
    } finally {
      setSavingBlood(false);
    }
  };

  // Gatekeeper: Render Login Screen if not authenticated
  if (!isAdminLoggedIn) {
    return (
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '400px', margin: '0 auto', padding: '40px', boxShadow: 'var(--card-shadow-hover)', border: '1px solid var(--border-color)', borderRadius: '16px', backgroundColor: 'var(--white)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-tag" style={{ marginBottom: '8px' }}>Administrative Console</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>Admin Login</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '8px' }}>Authorized Trust-Way Hospital personnel only.</p>
            </div>

            {loginError && (
              <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: '500' }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-control"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter admin email address"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '24px', fontWeight: '700' }} disabled={adminSubmitting}>
                {adminSubmitting ? 'Authenticating...' : 'Sign In to Console'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="section text-center">
        <div className="container">
          <p style={{ fontSize: '1.2rem' }}>Loading Admin Console Databases...</p>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.45)), url("/admin.jpeg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%', 
          color: '#FFFFFF', 
          padding: '140px 0', 
          textAlign: 'center' 
        }}
      >
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            ⚙️ Admin Console Dashboard
          </h1>
          <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Trust-Way Hospital internal administration dashboard. Manage submitted enquiries, view bookings, and update blood stocks.
          </p>
        </div>
      </section>

      {/* Main Console Layout */}
      <section className="section">
        <div className="container">
          
          <div className="portal-dashboard-grid">
            
            {/* Sidebar nav */}
            <div className="portal-sidebar">
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Admin Controls
              </h4>
              
              <button 
                className={`portal-menu-item ${activeTab === 'blood-bank' ? 'active' : ''}`}
                onClick={() => setActiveTab('blood-bank')}
              >
                <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                Blood Bank Stocks
              </button>

              <button 
                className={`portal-menu-item ${activeTab === 'enquiries' ? 'active' : ''}`}
                onClick={() => setActiveTab('enquiries')}
              >
                <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Enquiries ({enquiries.length})
              </button>

              <button 
                className={`portal-menu-item ${activeTab === 'appointments' ? 'active' : ''}`}
                onClick={() => setActiveTab('appointments')}
              >
                <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Patient Bookings ({appointments.length})
              </button>

              <button 
                className="portal-menu-item" 
                onClick={handleAdminLogout}
                style={{ color: 'var(--error)', borderTop: '1px solid var(--border-color)', marginTop: '24px', paddingTop: '16px' }}
              >
                <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sign Out
              </button>
            </div>

            {/* Central Panel Content */}
            <div className="portal-content-box" style={{ padding: '32px' }}>
              
              {/* Tab 1: Manage Blood Bank Stocks */}
              {activeTab === 'blood-bank' && (
                <div>
                  <div className="portal-patient-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <h2>Manage Live Blood Repository</h2>
                    <button 
                      className="btn btn-secondary" 
                      onClick={handleSaveBlood}
                      disabled={savingBlood}
                    >
                      {savingBlood ? 'Saving...' : '💾 Save Inventory Levels'}
                    </button>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                    Adjust the percentage sliders for each blood group. The level tags (High, Stable, Low, Critical) and warning alerts on the home page will update instantly once saved.
                  </p>

                  {bloodSuccess && (
                    <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderLeft: '4px solid var(--success)', color: 'var(--success)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                      ✓ {bloodSuccess}
                    </div>
                  )}

                  {bloodError && (
                    <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                      ⚠️ {bloodError}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {bloodStock.map((item, index) => (
                      <div 
                        key={item.group} 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '80px 180px 1fr',
                          alignItems: 'center',
                          gap: '24px',
                          borderBottom: '1px solid var(--border-color)',
                          paddingBottom: '16px'
                        }}
                      >
                        {/* Blood Type Label */}
                        <strong style={{ fontSize: '1.4rem', color: 'var(--error)' }}>{item.group}</strong>
                        
                        {/* Dropdown status */}
                        <div className="form-group" style={{ margin: 0 }}>
                          <select 
                            className="form-control"
                            value={item.level}
                            onChange={(e) => handleBloodChange(index, 'level', e.target.value)}
                            style={{ padding: '8px 12px' }}
                          >
                            <option value="High">High Stock</option>
                            <option value="Medium">Medium (Stable)</option>
                            <option value="Low">Low Stock</option>
                            <option value="Critical">CRITICAL ALERT</option>
                          </select>
                        </div>

                        {/* Slider / percentage */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={item.percentage}
                            onChange={(e) => handleBloodChange(index, 'percentage', e.target.value)}
                            style={{ flexGrow: 1, cursor: 'pointer', accentColor: 'var(--error)' }}
                          />
                          <span style={{ minWidth: '40px', fontWeight: 'bold', fontSize: '1rem', textAlign: 'right' }}>
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: General Enquiries list */}
              {activeTab === 'enquiries' && (
                <div>
                  <div className="portal-patient-header">
                    <h2>Enquiries & Feedback Messages</h2>
                  </div>

                  {enquiries.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {enquiries.map((enq) => (
                        <div 
                          key={enq.id} 
                          style={{
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '24px',
                            backgroundColor: 'var(--bg-color)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                              <strong style={{ fontSize: '1.1rem' }}>{enq.name}</strong>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}> ({enq.email})</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              📅 {new Date(enq.createdAt).toLocaleString()}
                            </span>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px', fontSize: '0.85rem' }}>
                            <div><strong>Subject:</strong> {enq.subject}</div>
                            <div><strong>Target Wing:</strong> {enq.department}</div>
                          </div>

                          <div style={{ backgroundColor: 'var(--white)', padding: '16px', borderRadius: '6px', borderLeft: '4px solid var(--primary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            {enq.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ backgroundColor: 'var(--bg-color)', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
                      <svg style={{ width: '48px', height: '48px', color: 'var(--text-secondary)', marginBottom: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>No general enquiries submitted yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Patient appointments list */}
              {activeTab === 'appointments' && (
                <div>
                  <div className="portal-patient-header">
                    <h2>Scheduled Clinical Appointments</h2>
                  </div>

                  {appointments.length > 0 ? (
                    <div className="data-table-wrapper">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Contact Info</th>
                            <th>Target Clinic</th>
                            <th>Date / Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appt) => (
                            <tr key={appt.id}>
                              <td><strong>{appt.patientName}</strong></td>
                              <td style={{ fontSize: '0.85rem' }}>
                                ✉️ {appt.email}<br/>
                                📞 {appt.phone}
                              </td>
                              <td>{appt.department}</td>
                              <td>
                                📅 {appt.date}<br/>
                                🕒 {appt.time}
                              </td>
                              <td>
                                <span style={{
                                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                  color: 'var(--success)',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '700'
                                }}>
                                  {appt.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: 'var(--bg-color)', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
                      <svg style={{ width: '48px', height: '48px', color: 'var(--text-secondary)', marginBottom: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>No patient portal appointments recorded yet.</p>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
