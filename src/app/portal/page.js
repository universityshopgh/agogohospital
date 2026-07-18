'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function PatientPortal() {
  const { locale, t } = useLanguage();

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientInfo, setPatientInfo] = useState({ name: '', email: '', phone: '', folderNumber: '' });
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Login form values
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration form values
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Dashboard states
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'book', 'history', 'prescriptions'
  const [appointments, setAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);

  // Booking form states
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('');
  const [bookDept, setBookDept] = useState('Outpatient Department (OPD)');
  const [bookReason, setBookReason] = useState('');
  const [bookSuccess, setBookSuccess] = useState('');
  const [bookError, setBookError] = useState('');

  // Simulated Medical Records & Prescriptions
  const mockHistory = [];

  const mockPrescriptions = [];

  // Load appointments
  const fetchAppointments = async () => {
    setLoadingAppts(true);
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        // Filter appointments belonging to this patient email
        const userAppts = data.filter(appt => appt.email.toLowerCase() === patientInfo.email.toLowerCase());
        setAppointments(userAppts);
      }
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoadingAppts(false);
    }
  };

  // Check active session on mount using Firebase onAuthStateChanged and localStorage fallback
  useEffect(() => {
    // 1. Check local session fallback first for test stability and instant loading
    const savedLocalSession = localStorage.getItem('local_patient_session');
    if (savedLocalSession) {
      setPatientInfo(JSON.parse(savedLocalSession));
      setIsLoggedIn(true);
      return;
    }

    // 2. Check Firebase session
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'patients', user.uid);
          const docSnap = await getDoc(docRef);
          let profileData;
          if (docSnap.exists()) {
            profileData = docSnap.data();
          } else {
            // Fallback user values if Firestore doc doesn't exist yet
            profileData = {
              name: user.displayName || user.email.split('@')[0],
              email: user.email,
              phone: 'N/A',
              folderNumber: `APH-2026-${Math.floor(1000 + Math.random() * 9000)}`
            };
          }
          setPatientInfo(profileData);
          setIsLoggedIn(true);
          localStorage.setItem('local_patient_session', JSON.stringify(profileData));
        } catch (err) {
          console.error("Error retrieving user info:", err);
        }
      } else {
        // If we don't have a local session, ensure state is logged out
        if (!localStorage.getItem('local_patient_session')) {
          setIsLoggedIn(false);
          setPatientInfo({ name: '', email: '', phone: '', folderNumber: '' });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch appointments once user logged in
  useEffect(() => {
    if (isLoggedIn && patientInfo.email) {
      fetchAppointments();
    }
  }, [isLoggedIn, patientInfo.email]);

  // Auth Handlers using Firebase Auth with dynamic Console status fallbacks
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please fill in all fields');
      return;
    }
    setAuthError('');
    setAuthSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      // Load user profile from Firestore and cache it
      const docRef = doc(db, 'patients', user.uid);
      const docSnap = await getDoc(docRef);
      let profileData;
      if (docSnap.exists()) {
        profileData = docSnap.data();
      } else {
        profileData = {
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          phone: 'N/A',
          folderNumber: `APH-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
      }
      setPatientInfo(profileData);
      setIsLoggedIn(true);
      localStorage.setItem('local_patient_session', JSON.stringify(profileData));
    } catch (err) {
      console.error("Firebase Login Error", err);
      
      // If the email is the demo account, or if Email/Password auth is disabled in the Firebase Console
      if (
        loginEmail.toLowerCase() === 'patient@example.com' ||
        err.code === 'auth/operation-not-allowed' || 
        err.code === 'auth/configuration-not-found'
      ) {
        console.warn("Falling back to local authentication mode for testing.");
        const patientUser = {
          name: loginEmail.split('@')[0].toUpperCase().replace('.', ' '),
          email: loginEmail,
          phone: "+2335438494737",
          folderNumber: `APH-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
        setPatientInfo(patientUser);
        setIsLoggedIn(true);
        localStorage.setItem('local_patient_session', JSON.stringify(patientUser));
      } else {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          setAuthError('Account not found. Please check your email or create a new account.');
        } else if (err.code === 'auth/wrong-password') {
          setAuthError('Incorrect password. Please try again.');
        } else if (err.code === 'auth/invalid-email') {
          setAuthError('Please enter a valid email address.');
        } else if (err.code === 'auth/too-many-requests') {
          setAuthError('Too many failed attempts. Please wait a moment and try again.');
        } else if (err.code === 'auth/network-request-failed') {
          setAuthError('Network error. Please check your connection and try again.');
        } else {
          setAuthError('Something went wrong. Please try again later.');
        }
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword.trim()) {
      setAuthError('All fields are required');
      return;
    }
    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }
    setAuthError('');
    setAuthSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: regName });
      
      const patientUser = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        folderNumber: `APH-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };
      
      try {
        await setDoc(doc(db, 'patients', user.uid), patientUser);
        localStorage.setItem('local_patient_session', JSON.stringify(patientUser));
        setPatientInfo(patientUser);
        setIsLoggedIn(true);
      } catch (firestoreErr) {
        console.warn("Firestore write failed due to security rules or offline status. Falling back to local profile session storage:", firestoreErr);
        // Save to local storage session fallback so they can still log in and view portal dashboard!
        localStorage.setItem('local_patient_session', JSON.stringify(patientUser));
        setPatientInfo(patientUser);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Firebase Registration Error", err);
      
      // If Email/Password auth is disabled in the Firebase Console (auth/operation-not-allowed)
      if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/configuration-not-found') {
        console.warn("Email/Password auth is disabled in Firebase Console. Falling back to local authentication mode for testing.");
        const patientUser = {
          name: regName,
          email: regEmail,
          phone: regPhone,
          folderNumber: `APH-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
        setPatientInfo(patientUser);
        setIsLoggedIn(true);
        localStorage.setItem('local_patient_session', JSON.stringify(patientUser));
      } else {
        if (err.code === 'auth/email-already-in-use') {
          setAuthError('This email is already registered. Please login instead.');
        } else if (err.code === 'auth/invalid-email') {
          setAuthError('Please enter a valid email address.');
        } else if (err.code === 'auth/weak-password') {
          setAuthError('Password must be at least 6 characters.');
        } else {
          setAuthError(err.message.replace('Firebase: ', ''));
        }
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('local_patient_session');
      await signOut(auth);
      setIsLoggedIn(false);
      setPatientInfo({ name: '', email: '', phone: '', folderNumber: '' });
      setActiveTab('dashboard');
    } catch (err) {
      console.error("Firebase Logout Error", err);
    }
  };

  // Appointment Booking Submit
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookDate || !bookTime || !bookReason.trim()) {
      setBookError('Please fill in all fields');
      return;
    }

    setBookError('');
    setBookSuccess('');

    const newBooking = {
      patientName: patientInfo.name,
      email: patientInfo.email,
      phone: patientInfo.phone,
      date: bookDate,
      time: bookTime,
      department: bookDept
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });

      if (res.ok) {
        setBookSuccess('Appointment booked and confirmed successfully!');
        setBookDate('');
        setBookTime('');
        setBookReason('');
        fetchAppointments(); // Reload list
      } else {
        setBookError('Failed to record booking. Please try again.');
      }
    } catch (err) {
      setBookError('Network connection error.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.4)), url("/portal.jpeg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%', 
          color: '#FFFFFF', 
          padding: '140px 0', 
          textAlign: 'center' 
        }}
      >
        <div className="container">
          <h1 style={{ color: '#FFFFFF', fontSize: '2.75rem', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Trust-Way Patient Portal
          </h1>
          <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Access your medical file records, upcoming appointments, prescriptions, and direct clinical scheduling.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section">
        <div className="container">

          {!isLoggedIn ? (
            /* Authentication forms split-screen wrapper */
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                backgroundColor: 'var(--white)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.1)',
                border: '1px solid var(--border-color)',
                maxWidth: '1000px',
                margin: '0 auto'
              }}
              className="portal-login-split"
            >
              
              {/* Left Side: Premium Brand/Feature Hero */}
              <div 
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="portal-login-hero"
              >
                {/* Visual design background patterns */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

                <div>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '2px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '12px', display: 'inline-block', marginBottom: '24px' }}>
                    Trust-Way Hospital
                  </span>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: '1.2', color: '#FFFFFF', marginBottom: '16px' }}>
                    Access Your Patient Portal
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '380px' }}>
                    Sign in to check clinical reports, track appointments, view drug prescriptions, and consult directly with your doctor.
                  </p>
                </div>

                {/* Micro checklist items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Secure medical record storage</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Instant clinical booking updates</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Direct connection to Pharmacy wing</span>
                  </div>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                  Need support? Hotline: <strong>+2335438494737</strong>
                </div>
              </div>

              {/* Right Side: Form Container */}
              <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                
                {/* Tab selector */}
                <div 
                  style={{
                    display: 'flex',
                    backgroundColor: 'var(--bg-color)',
                    padding: '6px',
                    borderRadius: '30px',
                    marginBottom: '32px'
                  }}
                >
                  <button 
                    style={{
                      flex: 1,
                      border: 'none',
                      backgroundColor: authMode === 'login' ? 'var(--white)' : 'transparent',
                      color: authMode === 'login' ? 'var(--primary)' : 'var(--text-secondary)',
                      padding: '10px 16px',
                      borderRadius: '24px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      boxShadow: authMode === 'login' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none'
                    }}
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                  >
                    Patient Sign In
                  </button>
                  <button 
                    style={{
                      flex: 1,
                      border: 'none',
                      backgroundColor: authMode === 'register' ? 'var(--white)' : 'transparent',
                      color: authMode === 'register' ? 'var(--primary)' : 'var(--text-secondary)',
                      padding: '10px 16px',
                      borderRadius: '24px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      boxShadow: authMode === 'register' ? '0 4px 10px rgba(0,0,0,0.05)' : 'none'
                    }}
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                  >
                    Register File
                  </button>
                </div>

                {authError && (
                  <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.85rem', fontWeight: '500' }}>
                    ⚠️ {authError}
                  </div>
                )}

                {authMode === 'login' ? (
                  /* Login Form */
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. patient@example.com"
                        required
                        style={{ padding: '12px 16px', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '24px' }}>
                      <label className="form-label">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        style={{ padding: '12px 16px', borderRadius: '10px' }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '24px', fontWeight: '700' }} disabled={authSubmitting}>
                      {authSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>

                  </form>
                ) : (
                  /* Registration Form */
                  <form onSubmit={handleRegister}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. John K. Mensah"
                        required
                        style={{ padding: '12px 16px', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                        style={{ padding: '12px 16px', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +233 24 555 1234"
                        required
                        style={{ padding: '12px 16px', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '24px' }}>
                      <label className="form-label">Portal Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        required
                        style={{ padding: '12px 16px', borderRadius: '10px' }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '24px', fontWeight: '700' }} disabled={authSubmitting}>
                      {authSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>
                )}

              </div>

            </div>
          ) : (
            /* Logged in Dashboard panel */
            <div className="portal-dashboard-grid">
              
              {/* Sidebar Menu */}
              <div className="portal-sidebar">
                <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '800' }}>{patientInfo.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>📂 Folder: {patientInfo.folderNumber}</span>
                </div>
                
                <button 
                  className={`portal-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                  Dashboard Overview
                </button>
                
                <button 
                  className={`portal-menu-item ${activeTab === 'book' ? 'active' : ''}`}
                  onClick={() => setActiveTab('book')}
                >
                  <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Book Appointment
                </button>
                
                <button 
                  className={`portal-menu-item ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Medical & Lab History
                </button>
                
                <button 
                  className={`portal-menu-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('prescriptions')}
                >
                  <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 5h20c0-2-1-3.75-2.5-5"></path><path d="M12 2v10"></path><path d="m9 9 3 3 3-3"></path><rect x="3" y="12" width="18" height="4" rx="1"></rect></svg>
                  Prescription Logs
                </button>
                
                <button 
                  className="portal-menu-item" 
                  onClick={handleLogout}
                  style={{ color: 'var(--error)', borderTop: '1px solid var(--border-color)', marginTop: '24px', paddingTop: '16px' }}
                >
                  <svg className="icon-svg" style={{ marginRight: '8px', width: '18px', height: '18px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign Out
                </button>
              </div>

              {/* Central Panel content */}
              <div className="portal-content-box">
                
                {/* View 1: Dashboard overview */}
                {activeTab === 'dashboard' && (
                  <div>
                    <div className="portal-patient-header">
                      <h2>My Medical Dashboard</h2>
                      <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        Active Folder Check-in
                      </span>
                    </div>

                    {/* Stats overview */}
                    <div className="highlights-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '32px' }}>
                      <div className="stat-card">
                        <div className="stat-number">{appointments.length}</div>
                        <div className="stat-label">Scheduled Bookings</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">{mockPrescriptions.length}</div>
                        <div className="stat-label">Active Prescriptions</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-number">{mockHistory.length}</div>
                        <div className="stat-label">Lab Reports Ready</div>
                      </div>
                    </div>

                    {/* Upcoming appointments list */}
                    <h3>Upcoming Scheduled Appointments</h3>
                    <div style={{ marginTop: '16px' }}>
                      {loadingAppts ? (
                        <p>Loading appointments...</p>
                      ) : appointments.length > 0 ? (
                        <div className="data-table-wrapper">
                          <table className="data-table">
                            <thead>
                              <tr>
                                <th>Clinic / Department</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((appt) => (
                                <tr key={appt.id}>
                                  <td><strong>{appt.department}</strong></td>
                                  <td>{appt.date}</td>
                                  <td>{appt.time}</td>
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
                        <div style={{ backgroundColor: 'var(--bg-color)', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
                          <p style={{ color: 'var(--text-secondary)' }}>You have no upcoming appointments scheduled.</p>
                          <button className="btn btn-outline" style={{ marginTop: '12px', fontSize: '0.85rem' }} onClick={() => setActiveTab('book')}>
                            Schedule First Appointment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* View 2: Book appointment form */}
                {activeTab === 'book' && (
                  <div>
                    <div className="portal-patient-header">
                      <h2>Schedule a Consultation</h2>
                    </div>

                    {bookSuccess && (
                      <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderLeft: '4px solid var(--success)', color: 'var(--success)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                        ✓ {bookSuccess}
                      </div>
                    )}

                    {bookError && (
                      <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', borderLeft: '4px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                        ⚠️ {bookError}
                      </div>
                    )}

                    <form onSubmit={handleBooking}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label className="form-label">Preferred Date *</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            value={bookDate}
                            onChange={(e) => setBookDate(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Preferred Time *</label>
                          <input 
                            type="time" 
                            className="form-control" 
                            value={bookTime}
                            onChange={(e) => setBookTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Target Clinic / Specialty *</label>
                        <select 
                          className="form-control"
                          value={bookDept}
                          onChange={(e) => setBookDept(e.target.value)}
                        >
                          <option value="Outpatient Department (OPD)">Outpatient Department (OPD)</option>
                          <option value="Dental Clinic">Dental Clinic</option>
                          <option value="Eye Clinic (Ophthalmology)">Eye Clinic (Ophthalmology)</option>
                          <option value="Orthopedic Clinic">Orthopedic Clinic</option>
                          <option value="Maternity & Neonatal">Maternity & Neonatal</option>
                          <option value="Child Health (Pediatric)">Child Health (Pediatric)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Brief Reason for Appointment *</label>
                        <textarea 
                          rows="3" 
                          className="form-control"
                          value={bookReason}
                          onChange={(e) => setBookReason(e.target.value)}
                          placeholder="Please summarize your symptoms or concern..."
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                        Submit Appointment Request
                      </button>
                    </form>
                  </div>
                )}

                {/* View 3: Medical / Lab History */}
                {activeTab === 'history' && (
                  <div>
                    <div className="portal-patient-header">
                      <h2>My Medical Records</h2>
                    </div>

                    {mockHistory.length > 0 ? (
                      <div className="data-table-wrapper">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Date Completed</th>
                              <th>Test / Scan Name</th>
                              <th>Ordering Physician</th>
                              <th>Diagnoses Summary</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockHistory.map((rec, idx) => (
                              <tr key={idx}>
                                <td>{rec.date}</td>
                                <td><strong>{rec.test}</strong></td>
                                <td>{rec.doctor}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{rec.result}</td>
                                <td>
                                  <button 
                                    className="btn btn-outline" 
                                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                                    onClick={() => alert(`[Simulation] Downloading PDF Report for ${rec.test}.`)}
                                  >
                                    📥 PDF Report
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{ backgroundColor: 'var(--bg-color)', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
                        <svg style={{ width: '48px', height: '48px', color: 'var(--text-secondary)', marginBottom: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No lab reports or medical records found in your folder yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* View 4: Prescriptions */}
                {activeTab === 'prescriptions' && (
                  <div>
                    <div className="portal-patient-header">
                      <h2>Active Prescriptions</h2>
                    </div>

                    {mockPrescriptions.length > 0 ? (
                      <div className="data-table-wrapper">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Medication</th>
                              <th>Instructions / Dosage</th>
                              <th>Duration</th>
                              <th>Refills Left</th>
                              <th>Prescribed By</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockPrescriptions.map((pres, idx) => (
                              <tr key={idx}>
                                <td><strong>{pres.name}</strong></td>
                                <td>{pres.dosage}</td>
                                <td>{pres.duration}</td>
                                <td>{pres.refills}</td>
                                <td>{pres.doctor}</td>
                                <td>
                                  <span style={{
                                    backgroundColor: pres.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'var(--border-color)',
                                    color: pres.status === 'Active' ? 'var(--success)' : 'var(--text-secondary)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700'
                                  }}>
                                    {pres.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={{ backgroundColor: 'var(--bg-color)', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
                        <svg style={{ width: '48px', height: '48px', color: 'var(--text-secondary)', marginBottom: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 5h20c0-2-1-3.75-2.5-5"></path><path d="M12 2v10"></path><path d="m9 9 3 3 3-3"></path><rect x="3" y="12" width="18" height="4" rx="1"></rect></svg>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No active prescriptions logged in your folder yet.</p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
