import React from 'react';

export default function Logo({ size = 36 }) {
  return (
    <div className="logo-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Outer Emblem Badge */}
        <rect width="100" height="100" rx="22" fill="#3D2817" />
        
        {/* Rising Horizon Arc & Sun Rays */}
        <path
          d="M20 66C20 49.4315 33.4315 36 50 36C66.5685 36 80 49.4315 80 66"
          stroke="#FAF7F2"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="52" r="10" fill="#FAF7F2" />
        <path d="M50 22V28" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 30L31 35" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 30L69 35" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="66" x2="84" y2="66" stroke="#E6DED6" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.0625rem',
          fontWeight: 800,
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          letterSpacing: '0.06em'
        }}>
          GRAYMARK HORIZON
        </span>
        <span style={{
          fontSize: '0.71875rem',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          letterSpacing: '0.02em',
          marginTop: '0.1rem'
        }}>
          Degree & Career Evolution Platform
        </span>
      </div>
    </div>
  );
}
