'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: "Home",
    services: "Departments & Services",
    patientInfo: "Patient Information",
    contact: "Contact & Emergency",
    bookAppointment: "Book Appointment",
    emergency: "Emergency",
    emergencyCall: "Emergency Hotline",
    portal: "Patient Portal",
    admin: "Admin Console",
    
    announcements: [
      "Ministry of Health Accredited Government Facility",
      "24-Hour Emergency & Trauma Care Available",
      "Serving Our Community with Compassion & Quality Healthcare"
    ],
    
    // Accessibility Menu
    accessibilityTitle: "Accessibility Settings",
    textSizeLabel: "Text Size",
    contrastLabel: "Contrast Mode",
    fontLabel: "Dyslexia Friendly",
    normal: "Normal",
    large: "Large",
    extraLarge: "Extra Large",
    highContrast: "High Contrast",
    darkMode: "Dark Mode",
    enabled: "Enabled",
    disabled: "Disabled",
    
    // Footer
    workingHours: "Operating Hours",
    quickLinks: "Quick Links",
    emergencyContacts: "Emergency Contacts",
    govtLinks: "Government Healthcare",
    copyright: "© 2026 Agogo Government Hospital. An official ministry of health healthcare agency.",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    accessibilityStmt: "Accessibility Statement"
  }
};

export function LanguageProvider({ children }) {
  const [locale] = useState('en');

  const changeLanguage = (newLocale) => {
    // No-op: only English is supported
  };

  const t = (key) => {
    return translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t, dictionary: translations['en'] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
