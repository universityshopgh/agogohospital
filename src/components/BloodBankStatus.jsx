'use client';

import React from 'react';
import Link from 'next/link';

export default function BloodBankStatus() {
  return (
    <div className="blood-bank-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '4px', color: 'var(--primary)', fontWeight: '800' }}>
            Blood Bank Status
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            Check current blood availability and help save lives.
          </p>
        </div>
        <Link href="/patient-info" className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '10px 20px', borderRadius: '20px' }}>
          Donate Blood
        </Link>
      </div>
    </div>
  );
}
