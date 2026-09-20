import React from 'react';

/**
 * High-craft SVG vector illustrations for Why Pentagram USPs
 * Designed with bespoke gradients, architectural motifs, and crisp line work.
 */

// 1. Pentagram Design OS - Isometric 3D CAD blueprint, algorithmic nodes & star compass
export const VectorDesignOS: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="dosBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF6F0" />
        <stop offset="1" stopColor="#F3ECE0" />
      </linearGradient>
      <linearGradient id="dosRose" x1="60" y1="40" x2="220" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C1405D" />
        <stop offset="1" stopColor="#871A34" />
      </linearGradient>
      <linearGradient id="dosGold" x1="120" y1="20" x2="200" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4A366" />
        <stop offset="1" stopColor="#A87738" />
      </linearGradient>
      <linearGradient id="dosGlass" x1="40" y1="40" x2="240" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="1" stopColor="#F8F3EA" stopOpacity="0.4" />
      </linearGradient>
      <filter id="dosShadow" x="30" y="40" width="220" height="120" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#201B1C" floodOpacity="0.08" />
      </filter>
    </defs>

    {/* Canvas Background Rounded Plate */}
    <rect width="280" height="180" rx="16" fill="url(#dosBg)" />

    {/* Isometric Grid Background Pattern */}
    <g stroke="#E4D7C7" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.85">
      <path d="M20 90 L140 30 L260 90 L140 150 Z" />
      <path d="M20 90 L140 150" />
      <path d="M140 30 L140 150" />
      <path d="M260 90 L140 150" />
      <path d="M60 70 L180 130" />
      <path d="M100 50 L220 110" />
      <path d="M180 50 L60 110" />
      <path d="M220 70 L100 130" />
    </g>

    {/* 3D Isometric Floating Blueprint Layers */}
    {/* Base Layer Plate */}
    <g filter="url(#dosShadow)">
      <polygon points="140,46 230,91 140,136 50,91" fill="url(#dosGlass)" stroke="#C69255" strokeWidth="1.5" />
    </g>

    {/* Architectural Room Floorplan Lines */}
    <path
      d="M80 84 L140 54 L200 84 L140 114 Z"
      fill="#FFFFFF"
      fillOpacity="0.6"
      stroke="#C1405D"
      strokeWidth="1.2"
    />
    <path d="M110 69 L170 99" stroke="#C1405D" strokeWidth="1.2" strokeDasharray="2 2" />
    <path d="M140 54 L140 114" stroke="#C1405D" strokeWidth="1.2" />

    {/* Extruded Isometric Walls */}
    <polygon points="140,54 140,30 200,60 200,84" fill="#C1405D" fillOpacity="0.25" stroke="#C1405D" strokeWidth="1.2" />
    <polygon points="140,54 140,30 80,60 80,84" fill="#871A34" fillOpacity="0.35" stroke="#871A34" strokeWidth="1.2" />

    {/* Precision CAD Dimension Indicator */}
    <g stroke="#A87738" strokeWidth="1">
      <line x1="42" y1="84" x2="42" y2="128" />
      <line x1="38" y1="84" x2="46" y2="84" />
      <line x1="38" y1="128" x2="46" y2="128" />
      <circle cx="42" cy="106" r="2" fill="#D4A366" />
    </g>

    {/* Floating Coordinate Nodes */}
    <g className="transition-transform duration-700 ease-out group-hover:translate-y-[-3px]">
      <circle cx="140" cy="30" r="4.5" fill="#C1405D" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="200" cy="60" r="4" fill="#D4A366" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="80" cy="60" r="4" fill="#201B1C" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="140" cy="114" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
    </g>

    {/* Signature Pentagram Compass Badge */}
    <g transform="translate(140, 75)" className="transition-transform duration-700 ease-out group-hover:rotate-45">
      <circle cx="0" cy="0" r="16" fill="url(#dosRose)" stroke="#FFFFFF" strokeWidth="2" />
      <polygon
        points="0,-10 3,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -3,-3"
        fill="#FFFFFF"
      />
    </g>

    {/* Metric Badge: ±0.2mm */}
    <g transform="translate(195, 24)">
      <rect width="68" height="22" rx="6" fill="#201B1C" />
      <text x="34" y="15" fill="#D4A366" fontSize="9" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        ±0.2mm CAD
      </text>
    </g>

    {/* Data Flow Laser Beam */}
    <path d="M70 142 L140 107 L210 142" stroke="url(#dosRose)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
  </svg>
);

// 2. Stage-Wise Milestone Payments - Verified 4-Stage Escrow Timeline & Protected Vault
export const VectorMilestonePayments: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="smpBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF6F0" />
        <stop offset="1" stopColor="#F5ECE0" />
      </linearGradient>
      <linearGradient id="smpShield" x1="100" y1="20" x2="180" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#FDF8F2" />
      </linearGradient>
      <linearGradient id="smpGreen" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="smpGold" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#D4A366" />
        <stop offset="1" stopColor="#A87738" />
      </linearGradient>
      <filter id="smpShadow" x="40" y="20" width="200" height="150" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#201B1C" floodOpacity="0.07" />
      </filter>
    </defs>

    {/* Canvas Background Rounded Plate */}
    <rect width="280" height="180" rx="16" fill="url(#smpBg)" />

    {/* Milestone Progress Pathway */}
    <g transform="translate(30, 134)">
      <line x1="20" y1="10" x2="200" y2="10" stroke="#E2D4C3" strokeWidth="4" strokeLinecap="round" />
      <line x1="20" y1="10" x2="155" y2="10" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />

      {/* Stage Nodes 1, 2, 3, 4 */}
      {/* Step 1 */}
      <circle cx="20" cy="10" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M17 10 L19 12 L24 7" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="20" y="28" fill="#524849" fontSize="8" fontWeight="700" textAnchor="middle">Stage 1</text>

      {/* Step 2 */}
      <circle cx="75" cy="10" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M72 10 L74 12 L79 7" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="75" y="28" fill="#524849" fontSize="8" fontWeight="700" textAnchor="middle">Stage 2</text>

      {/* Step 3 */}
      <circle cx="135" cy="10" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M132 10 L134 12 L139 7" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="135" y="28" fill="#524849" fontSize="8" fontWeight="700" textAnchor="middle">Stage 3</text>

      {/* Step 4 Handover */}
      <circle cx="195" cy="10" r="10" fill="#FFFFFF" stroke="#C1405D" strokeWidth="2.5" />
      <text x="195" y="13.5" fill="#C1405D" fontSize="9" fontWeight="800" textAnchor="middle">4</text>
      <text x="195" y="28" fill="#C1405D" fontSize="8" fontWeight="700" textAnchor="middle">Handover</text>
    </g>

    {/* Central Protected Escrow Shield & Vault Crest */}
    <g filter="url(#smpShadow)">
      <path
        d="M140 22 C170 22 195 28 195 56 C195 94 140 118 140 118 C140 118 85 94 85 56 C85 28 110 22 140 22 Z"
        fill="url(#smpShield)"
        stroke="#D4A366"
        strokeWidth="2"
      />
      <path
        d="M140 28 C164 28 185 33 185 58 C185 89 140 110 140 110 C140 110 95 89 95 58 C95 33 116 28 140 28 Z"
        fill="#FFFFFF"
        stroke="#EFE5D8"
        strokeWidth="1"
      />
    </g>

    {/* Golden Escrow Padlock in Shield */}
    <g transform="translate(140, 64)">
      {/* Shackle */}
      <path
        d="M-12 -6 C-12 -18 12 -18 12 -6 L12 0 L-12 0 Z"
        fill="none"
        stroke="#C69255"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Body */}
      <rect x="-18" y="0" width="36" height="28" rx="7" fill="#C1405D" stroke="#871A34" strokeWidth="1.5" />
      {/* Keyhole */}
      <circle cx="0" cy="11" r="3.5" fill="#FFFFFF" />
      <polygon points="-2,12 2,12 3,19 -3,19" fill="#FFFFFF" />
      {/* Highlight Shine */}
      <rect x="-14" y="4" width="8" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.4" />
    </g>

    {/* Verified Stamp Badge: 0% Advance Risk */}
    <g transform="translate(192, 38)">
      <rect width="66" height="22" rx="6" fill="#10B981" />
      <text x="33" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">
        0% ADVANCE RISK
      </text>
    </g>
  </svg>
);

// 3. QR-Tracked Modular Factory - German CNC Laser Fabrication & Authenticated QR Code
export const VectorModularFactory: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="qrfBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF6F0" />
        <stop offset="1" stopColor="#F5EEE2" />
      </linearGradient>
      <linearGradient id="qrfLaser" x1="140" y1="36" x2="140" y2="108" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C1405D" stopOpacity="0.9" />
        <stop offset="1" stopColor="#E11D48" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="qrfPanel" x1="50" y1="90" x2="230" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F7E6D0" />
        <stop offset="1" stopColor="#D9B78C" />
      </linearGradient>
      <filter id="qrfShadow" x="30" y="80" width="220" height="80" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#201B1C" floodOpacity="0.08" />
      </filter>
    </defs>

    {/* Canvas Background Rounded Plate */}
    <rect width="280" height="180" rx="16" fill="url(#qrfBg)" />

    {/* Industrial German CNC Gantry Beam (Top) */}
    <rect x="30" y="24" width="220" height="14" rx="4" fill="#201B1C" stroke="#362F30" strokeWidth="1" />
    <line x1="40" y1="31" x2="240" y2="31" stroke="#D4A366" strokeWidth="1" strokeDasharray="6 4" />

    {/* CNC Tool Head Carriage (Moving) */}
    <g transform="translate(122, 22)">
      <rect x="0" y="0" width="36" height="28" rx="4" fill="#C1405D" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Precision Lens Nozzle */}
      <polygon points="12,28 24,28 20,38 16,38" fill="#201B1C" />
      <circle cx="18" cy="14" r="5" fill="#FFFFFF" fillOpacity="0.3" />
      <circle cx="18" cy="14" r="2" fill="#FFFFFF" />
    </g>

    {/* Precision Cutting Laser Beam */}
    <polygon points="138,60 142,60 146,104 134,104" fill="url(#qrfLaser)" />
    <line x1="140" y1="60" x2="140" y2="105" stroke="#FF0040" strokeWidth="2" />
    {/* Laser Spark Particles */}
    <circle cx="140" cy="105" r="4" fill="#FFE066" />
    <circle cx="136" cy="102" r="1.5" fill="#FF4D4D" />
    <circle cx="144" cy="101" r="1.5" fill="#FF9900" />
    <circle cx="141" cy="98" r="1.2" fill="#FFFFFF" />

    {/* Multi-Layered Marine Plywood Board on CNC Bed */}
    <g filter="url(#qrfShadow)">
      {/* Base core panel */}
      <polygon points="40,105 210,105 240,140 70,140" fill="url(#qrfPanel)" stroke="#B38A5A" strokeWidth="1.5" />
      {/* Precision edge-banded side */}
      <polygon points="70,140 240,140 240,148 70,148" fill="#C1405D" stroke="#871A34" strokeWidth="1" />
      <polygon points="40,105 70,140 70,148 40,113" fill="#871A34" stroke="#871A34" strokeWidth="1" />
    </g>

    {/* Laser Cut Kerf Line on Board */}
    <line x1="140" y1="105" x2="155" y2="140" stroke="#871A34" strokeWidth="2" strokeDasharray="3 2" />

    {/* Real QR Code Authentication Plate */}
    <g transform="translate(180, 80)">
      <rect width="52" height="52" rx="8" fill="#FFFFFF" stroke="#201B1C" strokeWidth="2" />
      {/* QR Code Matrix Elements */}
      {/* Top Left Finder */}
      <rect x="6" y="6" width="14" height="14" rx="2" fill="#201B1C" />
      <rect x="9" y="9" width="8" height="8" rx="1" fill="#FFFFFF" />
      <rect x="11" y="11" width="4" height="4" fill="#201B1C" />

      {/* Top Right Finder */}
      <rect x="32" y="6" width="14" height="14" rx="2" fill="#201B1C" />
      <rect x="35" y="9" width="8" height="8" rx="1" fill="#FFFFFF" />
      <rect x="37" y="11" width="4" height="4" fill="#201B1C" />

      {/* Bottom Left Finder */}
      <rect x="6" y="32" width="14" height="14" rx="2" fill="#201B1C" />
      <rect x="9" y="35" width="8" height="8" rx="1" fill="#FFFFFF" />
      <rect x="11" y="37" width="4" height="4" fill="#201B1C" />

      {/* Internal QR Data Bits */}
      <rect x="23" y="8" width="4" height="4" fill="#C1405D" />
      <rect x="23" y="16" width="4" height="6" fill="#201B1C" />
      <rect x="23" y="26" width="6" height="4" fill="#201B1C" />
      <rect x="34" y="24" width="6" height="4" fill="#C1405D" />
      <rect x="34" y="34" width="8" height="4" fill="#201B1C" />
      <rect x="23" y="38" width="5" height="5" fill="#201B1C" />

      {/* Verified QR Scanner Badge */}
      <circle cx="26" cy="26" r="4" fill="#10B981" />
    </g>

    {/* Metric Badge: In-House Plant */}
    <g transform="translate(30, 48)">
      <rect width="66" height="20" rx="5" fill="#201B1C" />
      <text x="33" y="14" fill="#D4A366" fontSize="8" fontWeight="700" textAnchor="middle">
        GERMAN CNC
      </text>
    </g>
  </svg>
);

// 4. Dedicated Senior Project Manager - Site Architect, Blueprint Roll, & Milestone Oversight
export const VectorProjectManager: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="pmBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF6F0" />
        <stop offset="1" stopColor="#F5ECE0" />
      </linearGradient>
      <linearGradient id="pmSuit" x1="100" y1="70" x2="180" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#201B1C" />
        <stop offset="1" stopColor="#362F30" />
      </linearGradient>
      <linearGradient id="pmGold" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#D4A366" />
        <stop offset="1" stopColor="#A87738" />
      </linearGradient>
      <filter id="pmShadow" x="30" y="30" width="220" height="140" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#201B1C" floodOpacity="0.08" />
      </filter>
    </defs>

    {/* Canvas Background Rounded Plate */}
    <rect width="280" height="180" rx="16" fill="url(#pmBg)" />

    {/* Daily Site Checklist & Communication Card (Left Background) */}
    <g transform="translate(32, 42)" filter="url(#pmShadow)">
      <rect width="84" height="106" rx="8" fill="#FFFFFF" stroke="#E2D4C3" strokeWidth="1.5" />
      {/* Header bar */}
      <rect x="10" y="10" width="64" height="6" rx="3" fill="#C1405D" />

      {/* Checklist items */}
      <g transform="translate(10, 26)">
        <circle cx="5" cy="5" r="4" fill="#10B981" />
        <path d="M3 5 L4.5 6.5 L7 3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="5" x2="56" y2="5" stroke="#7A6E6F" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(10, 42)">
        <circle cx="5" cy="5" r="4" fill="#10B981" />
        <path d="M3 5 L4.5 6.5 L7 3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="5" x2="52" y2="5" stroke="#7A6E6F" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(10, 58)">
        <circle cx="5" cy="5" r="4" fill="#10B981" />
        <path d="M3 5 L4.5 6.5 L7 3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="5" x2="48" y2="5" stroke="#7A6E6F" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(10, 74)">
        <circle cx="5" cy="5" r="4" fill="#D4A366" />
        <path d="M3 5 L4.5 6.5 L7 3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="14" y1="5" x2="54" y2="5" stroke="#A87738" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Daily Photo Log Stamp */}
      <rect x="10" y="88" width="64" height="12" rx="3" fill="#FAF6F0" />
      <text x="42" y="97" fill="#C1405D" fontSize="7" fontWeight="700" textAnchor="middle">
        DAILY PHOTO LOGS
      </text>
    </g>

    {/* Architect / Senior PM Vector Figure (Center-Right) */}
    <g transform="translate(136, 32)">
      {/* Hardhat / Safety Helmet */}
      <path
        d="M20 28 C20 12 56 12 56 28 L62 33 L14 33 Z"
        fill="url(#pmGold)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <rect x="14" y="32" width="48" height="4" rx="2" fill="#A87738" />

      {/* Head */}
      <circle cx="38" cy="40" r="11" fill="#F7D8BA" />

      {/* Torso & Architect Suit */}
      <path
        d="M12 60 L64 60 L72 120 L4 120 Z"
        fill="url(#pmSuit)"
        stroke="#201B1C"
        strokeWidth="1.5"
      />

      {/* High-Vis Architectural Sash */}
      <polygon points="26,60 38,60 52,120 40,120" fill="#C1405D" />
      <polygon points="50,60 58,60 30,120 22,120" fill="#C1405D" fillOpacity="0.4" />

      {/* Rolled Architectural Blueprint in Arm */}
      <g transform="translate(46, 68) rotate(-25)">
        <rect x="0" y="0" width="16" height="56" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="4" y1="12" x2="12" y2="12" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="4" y1="20" x2="12" y2="20" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="4" y1="28" x2="12" y2="28" stroke="#0284C7" strokeWidth="1.5" />
        <line x1="4" y1="36" x2="12" y2="36" stroke="#0284C7" strokeWidth="1.5" />
        {/* Ribbon tied on rolled blueprint */}
        <rect x="-1" y="24" width="18" height="5" rx="1" fill="#C1405D" />
      </g>

      {/* Single Point of Contact Badge */}
      <g transform="translate(-18, 54)">
        <circle cx="16" cy="16" r="16" fill="#FFFFFF" stroke="#C1405D" strokeWidth="2" />
        <circle cx="16" cy="16" r="12" fill="#C1405D" />
        <text x="16" y="19" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">
          SPOC
        </text>
      </g>
    </g>

    {/* Verification Badge */}
    <g transform="translate(196, 28)">
      <rect width="66" height="22" rx="6" fill="#201B1C" />
      <text x="33" y="15" fill="#FFFFFF" fontSize="8.5" fontWeight="700" textAnchor="middle">
        1 SENIOR PM
      </text>
    </g>
  </svg>
);

// 5. 10-Yr Warranty & Move-In Date - Golden Guarantee Crest, Calendar & Clock Handover
export const VectorWarrantyHandover: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="warBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF6F0" />
        <stop offset="1" stopColor="#F5ECE0" />
      </linearGradient>
      <linearGradient id="warGold" x1="70" y1="20" x2="150" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E5B876" />
        <stop offset="1" stopColor="#A87738" />
      </linearGradient>
      <linearGradient id="warRose" x1="160" y1="40" x2="240" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C1405D" />
        <stop offset="1" stopColor="#871A34" />
      </linearGradient>
      <filter id="warShadow" x="25" y="25" width="230" height="135" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#201B1C" floodOpacity="0.08" />
      </filter>
    </defs>

    {/* Canvas Background Rounded Plate */}
    <rect width="280" height="180" rx="16" fill="url(#warBg)" />

    {/* 45-Day Handover Guaranteed Calendar (Left) */}
    <g transform="translate(38, 38)" filter="url(#warShadow)">
      {/* Calendar back */}
      <rect width="90" height="100" rx="10" fill="#FFFFFF" stroke="#E2D4C3" strokeWidth="1.5" />

      {/* Calendar header bar */}
      <path d="M0 10 C0 4.5 4.5 0 10 0 L80 0 C85.5 0 90 4.5 90 10 L90 26 L0 26 Z" fill="#C1405D" />
      {/* Binder rings */}
      <rect x="18" y="-4" width="6" height="8" rx="3" fill="#201B1C" />
      <rect x="66" y="-4" width="6" height="8" rx="3" fill="#201B1C" />

      {/* Calendar Header Month */}
      <text x="45" y="18" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="1">
        GUARANTEED
      </text>

      {/* 45 Days Number */}
      <text x="45" y="66" fill="#201B1C" fontSize="34" fontWeight="800" fontFamily="serif" textAnchor="middle">
        45
      </text>
      <text x="45" y="82" fill="#C69255" fontSize="10" fontWeight="700" textAnchor="middle">
        DAYS MOVE-IN
      </text>

      {/* Handover Verified Checkmark Badge */}
      <circle cx="75" cy="85" r="10" fill="#10B981" />
      <path d="M71 85 L74 88 L80 82" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* 10-Year Golden Warranty Medal & Ribbon (Right) */}
    <g transform="translate(155, 30)" filter="url(#warShadow)">
      {/* Decorative Ribbon Tails */}
      <path d="M30 76 L15 130 L35 120 L55 130 L40 76 Z" fill="#871A34" />
      <path d="M55 76 L70 130 L50 120 L30 130 L45 76 Z" fill="#C1405D" />

      {/* Outer Golden Starburst Medal Seal */}
      <circle cx="45" cy="48" r="42" fill="url(#warGold)" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="45" cy="48" r="36" fill="#FAF6F0" stroke="#C69255" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="45" cy="48" r="30" fill="url(#warGold)" />

      {/* Central Medal Text: 10 YRS WARRANTY */}
      <text x="45" y="44" fill="#FFFFFF" fontSize="17" fontWeight="900" fontFamily="serif" textAnchor="middle">
        10
      </text>
      <text x="45" y="55" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">
        YEARS
      </text>
      <text x="45" y="65" fill="#201B1C" fontSize="6.5" fontWeight="800" textAnchor="middle" letterSpacing="0.5">
        WARRANTY
      </text>

      {/* Laurel Wreath Accents */}
      <path d="M22 46 C22 36 28 26 40 24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M68 46 C68 36 62 26 50 24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Delay Penalty Protection Tag */}
    <g transform="translate(152, 144)">
      <rect width="102" height="20" rx="5" fill="#201B1C" />
      <text x="51" y="14" fill="#D4A366" fontSize="7.5" fontWeight="700" textAnchor="middle">
        PENALTY COMMITMENT
      </text>
    </g>
  </svg>
);

// 6. Verdoire Interiors Entity - Neoclassical Pillars, Legal Corporate Trust & Seal
export const VectorLegalEntity: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
  >
    <defs>
      <linearGradient id="legBg" x1="0" y1="0" x2="280" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAF6F0" />
        <stop offset="1" stopColor="#F5ECE0" />
      </linearGradient>
      <linearGradient id="legNavy" x1="50" y1="20" x2="230" y2="160" gradientUnits="userSpaceOnUse">
        <stop stopColor="#201B1C" />
        <stop offset="1" stopColor="#362F30" />
      </linearGradient>
      <linearGradient id="legGold" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#D4A366" />
        <stop offset="1" stopColor="#A87738" />
      </linearGradient>
      <linearGradient id="legRose" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#C1405D" />
        <stop offset="1" stopColor="#871A34" />
      </linearGradient>
      <filter id="legShadow" x="30" y="25" width="220" height="135" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#201B1C" floodOpacity="0.08" />
      </filter>
    </defs>

    {/* Canvas Background Rounded Plate */}
    <rect width="280" height="180" rx="16" fill="url(#legBg)" />

    {/* Classical Architectural Pediment / Institutional Bank Facade */}
    <g transform="translate(42, 28)" filter="url(#legShadow)">
      {/* Background Court / Trust Card */}
      <rect width="136" height="114" rx="8" fill="#FFFFFF" stroke="#E2D4C3" strokeWidth="1.5" />

      {/* Triangular Neoclassical Pediment (Top) */}
      <polygon points="68,10 130,32 6,32" fill="#201B1C" stroke="#D4A366" strokeWidth="1.5" />
      <polygon points="68,16 120,32 16,32" fill="#362F30" />
      {/* Central Pediment Star Emblem */}
      <circle cx="68" cy="25" r="4" fill="#D4A366" />

      {/* Pediment Architrave Beam */}
      <rect x="8" y="32" width="120" height="8" fill="#D4A366" stroke="#A87738" strokeWidth="1" />

      {/* Classical Columns (4 Pillars) */}
      {/* Pillar 1 */}
      <rect x="18" y="40" width="14" height="52" fill="#FAF6F0" stroke="#C69255" strokeWidth="1" />
      <line x1="25" y1="44" x2="25" y2="88" stroke="#D4A366" strokeWidth="1" strokeDasharray="3 2" />

      {/* Pillar 2 */}
      <rect x="46" y="40" width="14" height="52" fill="#FAF6F0" stroke="#C69255" strokeWidth="1" />
      <line x1="53" y1="44" x2="53" y2="88" stroke="#D4A366" strokeWidth="1" strokeDasharray="3 2" />

      {/* Pillar 3 */}
      <rect x="76" y="40" width="14" height="52" fill="#FAF6F0" stroke="#C69255" strokeWidth="1" />
      <line x1="83" y1="44" x2="83" y2="88" stroke="#D4A366" strokeWidth="1" strokeDasharray="3 2" />

      {/* Pillar 4 */}
      <rect x="104" y="40" width="14" height="52" fill="#FAF6F0" stroke="#C69255" strokeWidth="1" />
      <line x1="111" y1="44" x2="111" y2="88" stroke="#D4A366" strokeWidth="1" strokeDasharray="3 2" />

      {/* Base Plinth / Steps */}
      <rect x="6" y="92" width="124" height="6" fill="#D4A366" />
      <rect x="2" y="98" width="132" height="8" fill="#201B1C" rx="2" />
    </g>

    {/* Official Government Wax & Corporate Registration Seal (Right) */}
    <g transform="translate(176, 52)" filter="url(#legShadow)">
      {/* Ribbon Banner from Seal */}
      <path d="M24 40 L10 92 L28 84 L44 92 L32 40 Z" fill="#871A34" />
      <path d="M44 40 L58 92 L42 84 L26 92 L38 40 Z" fill="#C1405D" />

      {/* Official Circular Wax Seal */}
      <circle cx="34" cy="34" r="32" fill="url(#legRose)" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="34" cy="34" r="26" fill="#FAF6F0" stroke="#D4A366" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="34" cy="34" r="21" fill="url(#legRose)" />

      {/* Star / Verified Crest Inside Seal */}
      <path
        d="M34 20 L37 28 L46 28 L39 34 L42 42 L34 37 L26 42 L29 34 L22 28 L31 28 Z"
        fill="#FFFFFF"
      />
    </g>

    {/* Legal CIN & GST Certified Badge */}
    <g transform="translate(152, 142)">
      <rect width="108" height="22" rx="6" fill="#10B981" />
      <text x="54" y="15" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">
        AUDITED CIN & GST TRUST
      </text>
    </g>
  </svg>
);
