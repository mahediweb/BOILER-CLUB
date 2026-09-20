import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className,
  size = 'md',
  showBorder = true 
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const finalClass = className || sizeClasses[size];

  if (!imgError) {
    return (
      <img
        src="/logo.png"
        alt="বাংলাদেশ বয়লার পরিচারক পরিষদ লোগো"
        className={`${finalClass} object-contain rounded-full ${showBorder ? 'border-2 border-[#d4af37] shadow-sm bg-white' : ''}`}
        onError={() => setImgError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback SVG representation matching official circular emblem
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${finalClass} ${showBorder ? 'border-2 border-[#d4af37] rounded-full shadow-sm' : ''}`}
    >
      {/* Outer Green Ring */}
      <circle cx="100" cy="100" r="96" fill="#ffffff" stroke="#15803d" strokeWidth="8" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="#15803d" strokeWidth="2" strokeDasharray="4 2" />

      {/* Curved Text Paths */}
      <defs>
        <path id="top-curve" d="M 24,100 A 76,76 0 1,1 176,100" fill="none" />
        <path id="bottom-curve" d="M 176,100 A 76,76 0 0,1 24,100" fill="none" />
      </defs>

      {/* Top Text: বাংলাদেশ বয়লার পরিচারক পরিষদ */}
      <text fill="#0f172a" fontSize="12.5" fontWeight="bold" letterSpacing="0.5">
        <textPath href="#top-curve" startOffset="50%" textAnchor="middle">
          বাংলাদেশ বয়লার পরিচারক পরিষদ
        </textPath>
      </text>

      {/* Bottom Text: পরিবর্তনে অঙ্গীকারবদ্ধ */}
      <text fill="#15803d" fontSize="11" fontWeight="bold">
        <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">
          ★ ★ পরিবর্তনে অঙ্গীকারবদ্ধ ★ ★
        </textPath>
      </text>

      {/* Center Boiler Illustration */}
      <g transform="translate(42, 62) scale(0.58)">
        {/* Boiler Main Body */}
        <rect x="25" y="30" width="150" height="75" rx="37.5" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
        {/* Front Door */}
        <ellipse cx="40" cy="67.5" rx="15" ry="37.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
        {/* Burner */}
        <rect x="10" y="55" width="22" height="25" rx="4" fill="#dc2626" />
        <circle cx="21" cy="67" r="5" fill="#fef08a" />
        {/* Valves & Stack */}
        <rect x="75" y="12" width="12" height="20" fill="#1e293b" />
        <rect x="71" y="8" width="20" height="5" fill="#475569" />
        <rect x="130" y="15" width="10" height="16" fill="#0284c7" />
        <circle cx="135" cy="15" r="7" fill="#38bdf8" />
        {/* Control Box */}
        <rect x="110" y="45" width="40" height="40" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
        <rect x="116" y="52" width="12" height="8" fill="#1e293b" />
        <circle cx="138" cy="56" r="3" fill="#22c55e" />
        <circle cx="138" cy="64" r="3" fill="#ef4444" />
        {/* Base Mounts */}
        <rect x="50" y="105" width="20" height="15" fill="#64748b" />
        <rect x="130" y="105" width="20" height="15" fill="#64748b" />
      </g>

      {/* Establishment Date */}
      <text 
        x="100" 
        y="148" 
        textAnchor="middle" 
        fontSize="8.5" 
        fontWeight="bold" 
        fill="#0f172a"
        fontFamily="sans-serif"
      >
        স্থাপিত: ০১ জানুয়ারি ২০২২ খ্রি:
      </text>
    </svg>
  );
};
