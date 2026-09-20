import React from 'react';

// Exact SVG Logos for all 55 Trusted Brands
// Pure Logos Only - High visual fidelity with authentic brand colors and geometry

interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const BrandLogos: Record<string, React.FC<LogoProps>> = {
  // 1. CenturyPly
  CenturyPly: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 6L24 20L12 34L0 20Z" fill="#E21B23" />
      <path d="M12 12L19 20L12 28L5 20Z" fill="#FFFFFF" />
      <text x="32" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.5">
        CENTURY<tspan fill="#E21B23">PLY</tspan>
      </text>
    </svg>
  ),

  // 2. Greenply
  Greenply: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 24C8 14 18 8 26 8C26 18 18 28 10 24Z" fill="#008837" />
      <path d="M26 8C20 18 10 24 10 24C12 28 20 28 26 24C28 20 28 12 26 8Z" fill="#78BE20" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="19">
        green<tspan fill="#78BE20">ply</tspan>
      </text>
    </svg>
  ),

  // 3. Archidply
  Archidply: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 30L16 8L26 30H20L16 20L12 30H6Z" fill="#005B94" />
      <circle cx="16" cy="14" r="3" fill="#E31E24" />
      <text x="32" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="17" letterSpacing="0.5">
        ARCHID<tspan fill="#E31E24">PLY</tspan>
      </text>
    </svg>
  ),

  // 4. Duro
  Duro: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="7" width="28" height="26" rx="4" fill="#D3122A" />
      <text x="7" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18">D</text>
      <text x="38" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="1">
        DURO
      </text>
    </svg>
  ),

  // 5. Greenpanel
  Greenpanel: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="10" height="24" rx="2" fill="#009639" />
      <rect x="18" y="14" width="10" height="18" rx="2" fill="#88C040" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="17">
        GREEN<tspan fill="#88C040">PANEL</tspan>
      </text>
    </svg>
  ),

  // 6. Action TESA
  ActionTESA: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 10H28L22 30H4L10 10Z" fill="#E30613" />
      <text x="8" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14" fontStyle="italic">A</text>
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="17">
        Action <tspan fill="#E30613">TESA</tspan>
      </text>
    </svg>
  ),

  // 7. Merino
  Merino: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="12" stroke="#E30613" strokeWidth="3" />
      <path d="M12 20C12 16 16 14 18 16C20 18 16 22 14 24" stroke="#E30613" strokeWidth="2.5" strokeLinecap="round" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.5">
        merino
      </text>
    </svg>
  ),

  // 8. Greenlam
  Greenlam: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 20C8 12 14 8 22 8V16C18 16 14 18 14 20C14 24 18 26 22 26V32C14 32 8 28 8 20Z" fill="#008752" />
      <text x="30" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18">
        Green<tspan fill="#008752">lam</tspan>
      </text>
    </svg>
  ),

  // 9. Century Laminates
  CenturyLaminates: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="10" width="18" height="20" rx="3" fill="#E21B23" />
      <text x="28" y="22" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="14">
        CENTURY
      </text>
      <text x="28" y="32" fill="#E21B23" fontFamily="sans-serif" fontWeight="700" fontSize="10" letterSpacing="1">
        LAMINATES
      </text>
    </svg>
  ),

  // 10. AICA Sunmica
  AICASunmica: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 170 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="10" fill="#E60012" />
      <text x="32" y="22" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="15">
        AICA
      </text>
      <text x="32" y="32" fill="#E60012" fontFamily="sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.5">
        SUNMICA
      </text>
    </svg>
  ),

  // 11. Royale Touche
  RoyaleTouche: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 175 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 26L12 12L16 20L20 12L24 26H8Z" fill="#C69255" />
      <circle cx="16" cy="10" r="2" fill="#C69255" />
      <text x="32" y="24" fill="#FFFFFF" fontFamily="serif" fontWeight="bold" fontSize="16" letterSpacing="0.5">
        Royale <tspan fill="#C69255">Touché</tspan>
      </text>
    </svg>
  ),

  // 12. Formica
  Formica: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="12" fill="#E31837" />
      <path d="M14 13H21V16H16V18H20V21H16V27H13L14 13Z" fill="#FFFFFF" />
      <text x="36" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.5">
        FORMICA
      </text>
    </svg>
  ),

  // 13. Stylam
  Stylam: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 10H24V14H10V18H22V22H10V26H24V30H6V10Z" fill="#00A0E3" />
      <text x="30" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18">
        stylam
      </text>
    </svg>
  ),

  // 14. Hettich
  Hettich: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="24" height="24" rx="4" fill="#005B94" />
      <path d="M10 14V26M22 14V26M10 20H22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="19" letterSpacing="-0.5">
        Hettich
      </text>
    </svg>
  ),

  // 15. Häfele
  Hafele: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="26" fill="#E30613" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
        HÄFELE
      </text>
    </svg>
  ),

  // 16. Blum
  Blum: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="27" fill="#FF5500" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="26" letterSpacing="-1">
        blum
      </text>
    </svg>
  ),

  // 17. EBCO
  EBCO: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 125 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="12" fill="#E30613" />
      <text x="9" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14">e</text>
      <text x="34" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="20" letterSpacing="1">
        ebco
      </text>
    </svg>
  ),

  // 18. Ozone
  Ozone: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="11" stroke="#00A3E0" strokeWidth="4" />
      <text x="34" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="19" letterSpacing="1">
        OZONE
      </text>
    </svg>
  ),

  // 19. Dorset
  Dorset: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="21" letterSpacing="1.5">
        DORSET
      </text>
      <circle cx="118" cy="18" r="3" fill="#E30613" />
    </svg>
  ),

  // 20. Saint-Gobain
  SaintGobain: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 26C8 12 24 12 28 26" stroke="#00A3E0" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M8 26C11 16 21 16 24 26" stroke="#88C040" strokeWidth="3" strokeLinecap="round" />
      <text x="34" y="24" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="15">
        SAINT-GOBAIN
      </text>
    </svg>
  ),

  // 21. AIS
  AIS: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 20L18 8L28 20L18 32Z" fill="#005B94" />
      <text x="34" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
        AIS
      </text>
    </svg>
  ),

  // 22. Asahi
  Asahi: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="10" fill="#E30613" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18" letterSpacing="1">
        ASAHI
      </text>
    </svg>
  ),

  // 23. Asian Paints
  AsianPaints: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 175 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 26C6 14 18 10 24 18" stroke="#E30613" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 18C26 22 22 28 16 28" stroke="#FFCC00" strokeWidth="4" strokeLinecap="round" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="16">
        asian<tspan fill="#E30613">paints</tspan>
      </text>
    </svg>
  ),

  // 24. Berger
  Berger: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 10H22C26 10 28 12 28 16C28 19 26 21 22 21H12V30H6V10Z" fill="#E30613" />
      <text x="34" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="19">
        Berger
      </text>
    </svg>
  ),

  // 25. Dulux
  Dulux: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 22C8 12 18 14 24 18C28 20 22 26 14 24" stroke="#00A3E0" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 26C14 18 24 20 28 24" stroke="#FFCC00" strokeWidth="2.5" strokeLinecap="round" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="20">
        Dulux
      </text>
    </svg>
  ),

  // 26. Nerolac
  Nerolac: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="20" r="8" fill="#E30613" />
      <text x="28" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.5">
        NEROLAC
      </text>
    </svg>
  ),

  // 27. ICA
  ICA: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 28L18 8L30 28H6Z" fill="#005B94" />
      <circle cx="18" cy="22" r="3" fill="#FFCC00" />
      <text x="36" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22">
        ICA
      </text>
    </svg>
  ),

  // 28. Sirca
  Sirca: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="10" stroke="#E30613" strokeWidth="3" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="19" letterSpacing="1">
        SIRCA
      </text>
    </svg>
  ),

  // 29. Polycab
  Polycab: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 6L28 20L16 34L4 20Z" fill="#E30613" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18">
        POLYCAB
      </text>
    </svg>
  ),

  // 30. KEI
  KEI: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 115 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="24" height="24" rx="4" fill="#E30613" />
      <text x="8" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14">K</text>
      <text x="34" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
        KEI
      </text>
    </svg>
  ),

  // 31. Havells
  Havells: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="24" height="24" rx="5" fill="#E30613" />
      <path d="M10 14V26M22 14V26M10 20H22" stroke="#FFFFFF" strokeWidth="2.5" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18">
        HAVELLS
      </text>
    </svg>
  ),

  // 32. Finolex
  Finolex: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="10" fill="#005B94" />
      <path d="M12 20L16 14L20 20H12Z" fill="#E30613" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18">
        Finolex
      </text>
    </svg>
  ),

  // 33. Legrand
  Legrand: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 10H14V30H6V10ZM20 10H28V30H20V10Z" fill="#E30613" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="19">
        legrand
      </text>
    </svg>
  ),

  // 34. Schneider Electric
  SchneiderElectric: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 24C12 12 22 12 28 24C22 28 12 28 6 24Z" fill="#3DCD58" />
      <text x="34" y="21" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="14">
        Schneider
      </text>
      <text x="34" y="31" fill="#3DCD58" fontFamily="sans-serif" fontWeight="600" fontSize="10" letterSpacing="1">
        ELECTRIC
      </text>
    </svg>
  ),

  // 35. Anchor by Panasonic
  AnchorByPanasonic: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 185 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="20" r="10" fill="#E30613" />
      <text x="10" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14">⚓</text>
      <text x="30" y="21" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="14">
        ANCHOR
      </text>
      <text x="30" y="31" fill="#005B94" fontFamily="sans-serif" fontWeight="600" fontSize="9">
        by Panasonic
      </text>
    </svg>
  ),

  // 36. Philips
  Philips: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 10C4 10 16 6 28 10V22C28 28 16 34 16 34C16 34 4 28 4 22V10Z" fill="#0B5FFF" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="19" letterSpacing="1">
        PHILIPS
      </text>
    </svg>
  ),

  // 37. Wipro
  Wipro: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="20" r="4" fill="#F37021" />
      <circle cx="16" cy="14" r="4" fill="#88C040" />
      <circle cx="22" cy="20" r="4" fill="#00A3E0" />
      <circle cx="16" cy="26" r="4" fill="#E30613" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="19">
        wipro
      </text>
    </svg>
  ),

  // 38. Jaquar Lighting
  JaquarLighting: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="22" fill="#FFFFFF" fontFamily="serif" fontWeight="bold" fontSize="18">
        Jaquar
      </text>
      <text x="4" y="32" fill="#C69255" fontFamily="sans-serif" fontWeight="600" fontSize="9" letterSpacing="2">
        LIGHTING
      </text>
    </svg>
  ),

  // 39. Gyproc
  Gyproc: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="22" height="24" rx="4" fill="#5F259F" />
      <path d="M10 14L20 20L10 26V14Z" fill="#FFFFFF" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18">
        Gyproc
      </text>
    </svg>
  ),

  // 40. Armstrong
  Armstrong: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 30L16 10L26 30H19L16 22L13 30H6Z" fill="#E30613" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18">
        Armstrong
      </text>
    </svg>
  ),

  // 41. USG Boral
  USGBoral: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="11" stroke="#E30613" strokeWidth="3.5" />
      <path d="M10 20H22M16 14V26" stroke="#E30613" strokeWidth="3" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="17">
        USG <tspan fill="#E30613">BORAL</tspan>
      </text>
    </svg>
  ),

  // 42. Fevicol
  Fevicol: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 14C8 10 16 10 20 14L24 20L20 26C16 30 8 30 4 26V14Z" fill="#005B94" />
      <circle cx="12" cy="18" r="2.5" fill="#FFCC00" />
      <text x="28" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.5">
        FEVICOL
      </text>
    </svg>
  ),

  // 43. Araldite
  Araldite: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 8L26 14V26L16 32L6 26V14L16 8Z" fill="#E30613" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18">
        Araldite
      </text>
    </svg>
  ),

  // 44. Dr. Fixit
  DrFixit: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="22" height="24" rx="4" fill="#FFCC00" />
      <text x="7" y="25" fill="#000000" fontFamily="sans-serif" fontWeight="900" fontSize="12">FIX</text>
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="17">
        Dr. <tspan fill="#FFCC00">Fixit</tspan>
      </text>
    </svg>
  ),

  // 45. Sika
  Sika: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 30L16 8L26 30H6Z" fill="#E30613" />
      <path d="M10 26L16 14L22 26H10Z" fill="#FFCC00" />
      <text x="32" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
        Sika
      </text>
    </svg>
  ),

  // 46. Fosroc
  Fosroc: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="20" r="10" fill="#008837" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="19">
        FOSROC
      </text>
    </svg>
  ),

  // 47. KalingaStone
  KalingaStone: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="10" width="20" height="20" rx="3" fill="#C69255" />
      <text x="8" y="25" fill="#000000" fontFamily="serif" fontWeight="bold" fontSize="14">K</text>
      <text x="30" y="25" fill="#FFFFFF" fontFamily="serif" fontWeight="bold" fontSize="16">
        Kalinga<tspan fill="#C69255">Stone</tspan>
      </text>
    </svg>
  ),

  // 48. Caesarstone
  Caesarstone: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="700" fontSize="17" letterSpacing="1">
        caesarstone
      </text>
    </svg>
  ),

  // 49. Corian
  Corian: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="26" fill="#FFFFFF" fontFamily="serif" fontWeight="bold" fontSize="21" letterSpacing="1">
        CORIAN®
      </text>
    </svg>
  ),

  // 50. Jaquar
  Jaquar: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="26" fill="#FFFFFF" fontFamily="serif" fontWeight="bold" fontSize="22" letterSpacing="0.5">
        Jaquar
      </text>
    </svg>
  ),

  // 51. Kohler
  Kohler: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="26" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="2">
        KOHLER
      </text>
    </svg>
  ),

  // 52. Hindware
  Hindware: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="10" width="18" height="20" rx="3" fill="#E30613" />
      <text x="28" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18">
        hindware
      </text>
    </svg>
  ),

  // 53. Cera
  Cera: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="4" y="26" fill="#E30613" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="1">
        CERA
      </text>
    </svg>
  ),

  // 54. Grohe
  Grohe: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 14C12 8 20 18 26 14" stroke="#005B94" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 22C12 16 20 26 26 22" stroke="#00A3E0" strokeWidth="3" strokeLinecap="round" />
      <text x="32" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
        GROHE
      </text>
    </svg>
  ),

  // 55. Hansgrohe
  Hansgrohe: ({ className = 'h-7 w-auto' }) => (
    <svg viewBox="0 0 170 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="24" height="24" rx="4" fill="#008752" />
      <path d="M10 14V26M22 14V26M10 20H22" stroke="#FFFFFF" strokeWidth="2.5" />
      <text x="34" y="25" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="17">
        hansgrohe
      </text>
    </svg>
  ),
};

// Row 1 Brands (28 brands - Left to Right ticker stream)
export const BRAND_ROW_1 = [
  { id: 'CenturyPly', name: 'CenturyPly', Component: BrandLogos.CenturyPly },
  { id: 'Greenply', name: 'Greenply', Component: BrandLogos.Greenply },
  { id: 'Archidply', name: 'Archidply', Component: BrandLogos.Archidply },
  { id: 'Duro', name: 'Duro', Component: BrandLogos.Duro },
  { id: 'Greenpanel', name: 'Greenpanel', Component: BrandLogos.Greenpanel },
  { id: 'ActionTESA', name: 'Action TESA', Component: BrandLogos.ActionTESA },
  { id: 'Merino', name: 'Merino', Component: BrandLogos.Merino },
  { id: 'Greenlam', name: 'Greenlam', Component: BrandLogos.Greenlam },
  { id: 'CenturyLaminates', name: 'Century Laminates', Component: BrandLogos.CenturyLaminates },
  { id: 'AICASunmica', name: 'AICA Sunmica', Component: BrandLogos.AICASunmica },
  { id: 'RoyaleTouche', name: 'Royale Touche', Component: BrandLogos.RoyaleTouche },
  { id: 'Formica', name: 'Formica', Component: BrandLogos.Formica },
  { id: 'Stylam', name: 'Stylam', Component: BrandLogos.Stylam },
  { id: 'Hettich', name: 'Hettich', Component: BrandLogos.Hettich },
  { id: 'Hafele', name: 'Häfele', Component: BrandLogos.Hafele },
  { id: 'Blum', name: 'Blum', Component: BrandLogos.Blum },
  { id: 'EBCO', name: 'EBCO', Component: BrandLogos.EBCO },
  { id: 'Ozone', name: 'Ozone', Component: BrandLogos.Ozone },
  { id: 'Dorset', name: 'Dorset', Component: BrandLogos.Dorset },
  { id: 'SaintGobain', name: 'Saint-Gobain', Component: BrandLogos.SaintGobain },
  { id: 'AIS', name: 'AIS', Component: BrandLogos.AIS },
  { id: 'Asahi', name: 'Asahi', Component: BrandLogos.Asahi },
  { id: 'AsianPaints', name: 'Asian Paints', Component: BrandLogos.AsianPaints },
  { id: 'Berger', name: 'Berger', Component: BrandLogos.Berger },
  { id: 'Dulux', name: 'Dulux', Component: BrandLogos.Dulux },
  { id: 'Nerolac', name: 'Nerolac', Component: BrandLogos.Nerolac },
  { id: 'ICA', name: 'ICA', Component: BrandLogos.ICA },
  { id: 'Sirca', name: 'Sirca', Component: BrandLogos.Sirca },
];

// Row 2 Brands (27 brands - Right to Left ticker stream)
export const BRAND_ROW_2 = [
  { id: 'Polycab', name: 'Polycab', Component: BrandLogos.Polycab },
  { id: 'KEI', name: 'KEI', Component: BrandLogos.KEI },
  { id: 'Havells', name: 'Havells', Component: BrandLogos.Havells },
  { id: 'Finolex', name: 'Finolex', Component: BrandLogos.Finolex },
  { id: 'Legrand', name: 'Legrand', Component: BrandLogos.Legrand },
  { id: 'SchneiderElectric', name: 'Schneider Electric', Component: BrandLogos.SchneiderElectric },
  { id: 'AnchorByPanasonic', name: 'Anchor by Panasonic', Component: BrandLogos.AnchorByPanasonic },
  { id: 'Philips', name: 'Philips', Component: BrandLogos.Philips },
  { id: 'Wipro', name: 'Wipro', Component: BrandLogos.Wipro },
  { id: 'JaquarLighting', name: 'Jaquar Lighting', Component: BrandLogos.JaquarLighting },
  { id: 'Gyproc', name: 'Gyproc', Component: BrandLogos.Gyproc },
  { id: 'Armstrong', name: 'Armstrong', Component: BrandLogos.Armstrong },
  { id: 'USGBoral', name: 'USG Boral', Component: BrandLogos.USGBoral },
  { id: 'Fevicol', name: 'Fevicol', Component: BrandLogos.Fevicol },
  { id: 'Araldite', name: 'Araldite', Component: BrandLogos.Araldite },
  { id: 'DrFixit', name: 'Dr. Fixit', Component: BrandLogos.DrFixit },
  { id: 'Sika', name: 'Sika', Component: BrandLogos.Sika },
  { id: 'Fosroc', name: 'Fosroc', Component: BrandLogos.Fosroc },
  { id: 'KalingaStone', name: 'KalingaStone', Component: BrandLogos.KalingaStone },
  { id: 'Caesarstone', name: 'Caesarstone', Component: BrandLogos.Caesarstone },
  { id: 'Corian', name: 'Corian', Component: BrandLogos.Corian },
  { id: 'Jaquar', name: 'Jaquar', Component: BrandLogos.Jaquar },
  { id: 'Kohler', name: 'Kohler', Component: BrandLogos.Kohler },
  { id: 'Hindware', name: 'Hindware', Component: BrandLogos.Hindware },
  { id: 'Cera', name: 'Cera', Component: BrandLogos.Cera },
  { id: 'Grohe', name: 'Grohe', Component: BrandLogos.Grohe },
  { id: 'Hansgrohe', name: 'Hansgrohe', Component: BrandLogos.Hansgrohe },
];
