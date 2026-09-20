import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Box, ShieldCheck, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

/**
 * High-Craft Animated Architectural Vector Visualizer for Pentagram Consultation
 * Features:
 * - Sweeping dual-axis laser scan with real-time coordinate ticking
 * - Pulsing 3D isometric room wireframe with holographic lighting
 * - Live dimension callouts and precision badges
 * - Interactive and auto-cycling creative architectural stages
 */

export const AnimatedArchitecturalVisualizer: React.FC<{
  className?: string;
  activeStage?: 'laser' | 'blueprint' | 'boq' | 'materials';
  onStageChange?: (stage: 'laser' | 'blueprint' | 'boq' | 'materials') => void;
}> = ({ className = 'w-full', activeStage: controlledStage, onStageChange }) => {
  const [internalStage, setInternalStage] = useState<'laser' | 'blueprint' | 'boq' | 'materials'>('laser');
  const [measurementTicker, setMeasurementTicker] = useState('14\' 8.5"');
  const [activeX, setActiveX] = useState(148);
  const [activeY, setActiveY] = useState(62);

  const stage = controlledStage || internalStage;
  const setStage = (st: 'laser' | 'blueprint' | 'boq' | 'materials') => {
    if (onStageChange) {
      onStageChange(st);
    } else {
      setInternalStage(st);
    }
  };

  // Live laser scan coordinate ticking animation
  useEffect(() => {
    const interval = setInterval(() => {
      const inches = (Math.random() * 0.8 + 8.1).toFixed(1);
      setMeasurementTicker(`14' ${inches}"`);
      setActiveX(Math.floor(130 + Math.random() * 40));
      setActiveY(Math.floor(45 + Math.random() * 35));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
      {/* Visual Canvas Container */}
      <div className="relative w-full h-48 sm:h-52 bg-gradient-to-br from-[#181415] via-[#221B1D] to-[#141011] rounded-2xl border border-[#3E3335] overflow-hidden shadow-2xl p-2.5 flex items-center justify-center group">
        {/* Ambient Glows */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C7244E]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C69255]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic Canvas by Stage */}
        <AnimatePresence mode="wait">
          {stage === 'laser' && (
            <motion.div
              key="laser"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <svg viewBox="0 0 280 150" fill="none" className="w-full h-full">
                {/* 3D Perspective Isometric Grid */}
                <defs>
                  <linearGradient id="laserBeamGrad" x1="45" y1="120" x2={activeX} y2={activeY} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E11D48" stopOpacity="0.9" />
                    <stop offset="0.8" stopColor="#FB7185" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                  <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#E11D48" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Perspective Floor */}
                <polygon points="40,125 140,145 240,125 140,105" fill="#1F191B" stroke="#3D3234" strokeWidth="1" />
                
                {/* Back Wall Left */}
                <polygon points="40,35 140,55 140,105 40,85" fill="#241E20" stroke="#3D3234" strokeWidth="1" />
                {/* Back Wall Right */}
                <polygon points="140,55 240,35 240,85 140,105" fill="#282124" stroke="#3D3234" strokeWidth="1" />

                {/* Perspective Grid Lines */}
                <line x1="65" y1="40" x2="65" y2="90" stroke="#C69255" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="90" y1="45" x2="90" y2="95" stroke="#C69255" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="115" y1="50" x2="115" y2="100" stroke="#C69255" strokeOpacity="0.25" strokeDasharray="3 3" />
                
                <line x1="165" y1="50" x2="165" y2="100" stroke="#C69255" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="190" y1="45" x2="190" y2="95" stroke="#C69255" strokeOpacity="0.25" strokeDasharray="3 3" />
                <line x1="215" y1="40" x2="215" y2="90" stroke="#C69255" strokeOpacity="0.25" strokeDasharray="3 3" />

                {/* Horizontal Architectural Datum Lines */}
                <line x1="40" y1="60" x2="140" y2="80" stroke="#C69255" strokeOpacity="0.3" strokeDasharray="2 2" />
                <line x1="140" y1="80" x2="240" y2="60" stroke="#C69255" strokeOpacity="0.3" strokeDasharray="2 2" />

                {/* Laser Measuring Unit on Tripod */}
                <circle cx="45" cy="115" r="7" fill="#C7244E" stroke="#FFF" strokeWidth="1" />
                <line x1="45" y1="122" x2="38" y2="135" stroke="#8A7B7E" strokeWidth="2" />
                <line x1="45" y1="122" x2="45" y2="137" stroke="#8A7B7E" strokeWidth="2" />
                <line x1="45" y1="122" x2="52" y2="135" stroke="#8A7B7E" strokeWidth="2" />

                {/* Sweeping Laser Beam (Dynamic Target) */}
                <line
                  x1="45"
                  y1="115"
                  x2={activeX}
                  y2={activeY}
                  stroke="url(#laserBeamGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="animate-pulse"
                />

                {/* Pulsing Target Reticle */}
                <circle cx={activeX} cy={activeY} r="18" fill="url(#targetGlow)" className="animate-ping" opacity="0.6" />
                <circle cx={activeX} cy={activeY} r="6" stroke="#FB7185" strokeWidth="1.5" fill="none" />
                <circle cx={activeX} cy={activeY} r="2" fill="#FFFFFF" />
                <line x1={activeX - 9} y1={activeY} x2={activeX + 9} y2={activeY} stroke="#FB7185" strokeWidth="1" />
                <line x1={activeX} y1={activeY - 9} x2={activeX} y2={activeY + 9} stroke="#FB7185" strokeWidth="1" />

                {/* Floating Real-time HUD Measurement Pill */}
                <g transform={`translate(${activeX > 170 ? activeX - 75 : activeX + 12}, ${activeY - 14})`}>
                  <rect width="68" height="22" rx="6" fill="#181415" stroke="#E11D48" strokeWidth="1.2" />
                  <text x="34" y="15" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    {measurementTicker}
                  </text>
                </g>

                {/* Corner Precision Badge */}
                <g transform="translate(10, 10)">
                  <rect width="84" height="18" rx="5" fill="#C7244E" />
                  <text x="42" y="12.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.6">
                    ±1mm LASER SCAN
                  </text>
                </g>

                {/* Bottom Room Dimensions HUD */}
                <g transform="translate(170, 122)">
                  <rect width="98" height="20" rx="5" fill="#181415" stroke="#3D3234" strokeWidth="1" />
                  <text x="49" y="14" fill="#C69255" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    X:4482mm • Y:3210mm
                  </text>
                </g>
              </svg>
            </motion.div>
          )}

          {stage === 'blueprint' && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <svg viewBox="0 0 280 150" fill="none" className="w-full h-full">
                {/* Blueprint Background Grid */}
                <g stroke="#382E30" strokeWidth="0.75" strokeDasharray="3 3">
                  <line x1="20" y1="20" x2="260" y2="20" />
                  <line x1="20" y1="50" x2="260" y2="50" />
                  <line x1="20" y1="80" x2="260" y2="80" />
                  <line x1="20" y1="110" x2="260" y2="110" />
                  <line x1="20" y1="140" x2="260" y2="140" />

                  <line x1="50" y1="10" x2="50" y2="145" />
                  <line x1="100" y1="10" x2="100" y2="145" />
                  <line x1="150" y1="10" x2="150" y2="145" />
                  <line x1="200" y1="10" x2="200" y2="145" />
                  <line x1="250" y1="10" x2="250" y2="145" />
                </g>

                {/* Isometric 3D Living & Kitchen Cad Blueprint */}
                <g stroke="#C69255" strokeWidth="1.5">
                  <polygon points="140,35 225,75 140,118 55,75" fill="#1C1718" fillOpacity="0.9" />
                  <line x1="55" y1="75" x2="55" y2="48" stroke="#C7244E" strokeWidth="2" />
                  <line x1="140" y1="118" x2="140" y2="90" stroke="#C7244E" strokeWidth="2" />
                  <line x1="225" y1="75" x2="225" y2="48" stroke="#C7244E" strokeWidth="2" />

                  <line x1="55" y1="48" x2="140" y2="90" stroke="#C7244E" strokeDasharray="2 2" />
                  <line x1="140" y1="90" x2="225" y2="48" stroke="#C7244E" strokeDasharray="2 2" />
                </g>

                {/* 3D Modular Furniture Units */}
                {/* L-Sofa */}
                <polygon points="90,70 125,86 112,92 78,76" fill="#D4A366" opacity="0.9" />
                {/* Coffee Table */}
                <polygon points="135,82 155,91 146,95 126,86" fill="#FFFFFF" opacity="0.8" />
                {/* TV Console Back Wall */}
                <polygon points="175,56 215,75 215,62 175,44" fill="#C7244E" opacity="0.85" />

                {/* VR Camera View Angle Cone */}
                <circle cx="195" cy="35" r="14" fill="#C7244E" opacity="0.2" className="animate-ping" />
                <circle cx="195" cy="35" r="6" fill="#C7244E" />
                <path d="M195 35 L140 85 L180 102 Z" fill="#C7244E" opacity="0.15" />

                {/* Badge */}
                <g transform="translate(10, 10)">
                  <rect width="90" height="18" rx="5" fill="#C69255" />
                  <text x="45" y="12.5" fill="#181415" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.6">
                    3D CAD BLUEPRINT
                  </text>
                </g>

                <g transform="translate(170, 122)">
                  <rect width="98" height="20" rx="5" fill="#181415" stroke="#C69255" strokeWidth="1" />
                  <text x="49" y="14" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    WALKTHROUGH READY
                  </text>
                </g>
              </svg>
            </motion.div>
          )}

          {stage === 'boq' && (
            <motion.div
              key="boq"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <svg viewBox="0 0 280 150" fill="none" className="w-full h-full">
                {/* BOQ Paper Canvas */}
                <rect x="25" y="15" width="150" height="120" rx="8" fill="#1C1718" stroke="#3D3234" strokeWidth="1.2" />

                {/* Header */}
                <rect x="38" y="28" width="60" height="6" rx="2" fill="#FFFFFF" />
                <rect x="105" y="28" width="45" height="6" rx="2" fill="#C69255" />
                <line x1="38" y1="40" x2="162" y2="40" stroke="#3D3234" strokeWidth="1" />

                {/* Itemized Line Items */}
                <g transform="translate(38, 48)">
                  <circle cx="4" cy="4" r="3" fill="#10B981" />
                  <rect x="12" y="2" width="70" height="4" rx="2" fill="#E5E5E5" />
                  <rect x="95" y="2" width="22" height="4" rx="2" fill="#C69255" />

                  <circle cx="4" cy="18" r="3" fill="#10B981" />
                  <rect x="12" y="16" width="60" height="4" rx="2" fill="#A3A3A3" />
                  <rect x="95" y="16" width="22" height="4" rx="2" fill="#C69255" />

                  <circle cx="4" cy="32" r="3" fill="#10B981" />
                  <rect x="12" y="30" width="68" height="4" rx="2" fill="#E5E5E5" />
                  <rect x="95" y="30" width="22" height="4" rx="2" fill="#C69255" />

                  <circle cx="4" cy="46" r="3" fill="#10B981" />
                  <rect x="12" y="44" width="55" height="4" rx="2" fill="#A3A3A3" />
                  <rect x="95" y="44" width="22" height="4" rx="2" fill="#C69255" />
                </g>

                {/* Guaranteed Seal / 0% Overrun Shield */}
                <g transform="translate(195, 30)">
                  <circle cx="35" cy="35" r="34" fill="#C7244E" opacity="0.2" className="animate-pulse" />
                  <circle cx="35" cy="35" r="30" fill="#9C2542" />
                  <circle cx="35" cy="35" r="25" fill="#1C1718" stroke="#C69255" strokeWidth="1.5" />

                  {/* Lock Graphic */}
                  <rect x="26" y="32" width="18" height="15" rx="3" fill="#C69255" />
                  <path d="M29 32 V25 C29 21 41 21 41 25 V32" stroke="#C69255" strokeWidth="2.5" fill="none" />
                  <circle cx="35" cy="39" r="2" fill="#1C1718" />

                  <text x="35" y="58" fill="#C69255" fontSize="7" fontWeight="bold" textAnchor="middle">
                    0% OVERRUN
                  </text>
                </g>

                {/* Badge */}
                <g transform="translate(10, 10)">
                  <rect width="90" height="18" rx="5" fill="#10B981" />
                  <text x="45" y="12.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.6">
                    PRICE-LOCK BOQ
                  </text>
                </g>
              </svg>
            </motion.div>
          )}

          {stage === 'materials' && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <svg viewBox="0 0 280 150" fill="none" className="w-full h-full">
                {/* Material Briefcase */}
                <rect x="35" y="30" width="210" height="95" rx="10" fill="#1C1718" stroke="#C69255" strokeWidth="1.5" />
                <path d="M115 30 V20 C115 17 165 17 165 20 V30" stroke="#C69255" strokeWidth="2.5" fill="none" />

                {/* Swatches */}
                {/* BWP Marine Ply */}
                <g transform="translate(50, 45)">
                  <rect width="38" height="65" rx="4" fill="#C29B38" stroke="#8C6A1D" strokeWidth="1" />
                  <line x1="5" y1="10" x2="33" y2="25" stroke="#8C6A1D" strokeWidth="0.8" />
                  <line x1="5" y1="35" x2="33" y2="50" stroke="#8C6A1D" strokeWidth="0.8" />
                  <text x="19" y="60" fill="#2E1C05" fontSize="7" fontWeight="bold" textAnchor="middle">
                    BWP PLY
                  </text>
                </g>

                {/* Acrylic */}
                <g transform="translate(98, 45)">
                  <rect width="38" height="65" rx="4" fill="#C7244E" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="19" y="60" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
                    ACRYLIC
                  </text>
                </g>

                {/* Quartz */}
                <g transform="translate(146, 45)">
                  <rect width="38" height="65" rx="4" fill="#EAE0D5" stroke="#B3A393" strokeWidth="1" />
                  <circle cx="10" cy="15" r="1.5" fill="#786B5E" />
                  <circle cx="28" cy="25" r="2" fill="#786B5E" />
                  <circle cx="15" cy="45" r="1.5" fill="#786B5E" />
                  <text x="19" y="60" fill="#3D322B" fontSize="7" fontWeight="bold" textAnchor="middle">
                    QUARTZ
                  </text>
                </g>

                {/* Hardware */}
                <g transform="translate(194, 45)">
                  <rect width="38" height="65" rx="4" fill="#2B2224" stroke="#C69255" strokeWidth="1" />
                  <circle cx="19" cy="25" r="7" fill="#C69255" />
                  <rect x="15" y="38" width="8" height="15" rx="1.5" fill="#FFFFFF" />
                  <text x="19" y="60" fill="#C69255" fontSize="7" fontWeight="bold" textAnchor="middle">
                    BLUM
                  </text>
                </g>

                {/* Badge */}
                <g transform="translate(10, 10)">
                  <rect width="90" height="18" rx="5" fill="#C69255" />
                  <text x="45" y="12.5" fill="#181415" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.6">
                    DOORSTEP SAMPLES
                  </text>
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modern Creative Vector Navigation Stage Selector */}
      <div className="grid grid-cols-4 gap-1.5">
        <button
          type="button"
          onClick={() => setStage('laser')}
          className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
            stage === 'laser'
              ? 'bg-[#C7244E] text-white shadow-md ring-1 ring-rose-400/50'
              : 'bg-[#251D1F] text-neutral-400 hover:text-white hover:bg-[#2F2628]'
          }`}
        >
          <Scan className="w-3 h-3" />
          <span>1. Laser Scan</span>
        </button>

        <button
          type="button"
          onClick={() => setStage('blueprint')}
          className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
            stage === 'blueprint'
              ? 'bg-[#C7244E] text-white shadow-md ring-1 ring-rose-400/50'
              : 'bg-[#251D1F] text-neutral-400 hover:text-white hover:bg-[#2F2628]'
          }`}
        >
          <Box className="w-3 h-3" />
          <span>2. 3D Plan</span>
        </button>

        <button
          type="button"
          onClick={() => setStage('boq')}
          className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
            stage === 'boq'
              ? 'bg-[#C7244E] text-white shadow-md ring-1 ring-rose-400/50'
              : 'bg-[#251D1F] text-neutral-400 hover:text-white hover:bg-[#2F2628]'
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          <span>3. 0% Overrun</span>
        </button>

        <button
          type="button"
          onClick={() => setStage('materials')}
          className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
            stage === 'materials'
              ? 'bg-[#C7244E] text-white shadow-md ring-1 ring-rose-400/50'
              : 'bg-[#251D1F] text-neutral-400 hover:text-white hover:bg-[#2F2628]'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>4. Samples</span>
        </button>
      </div>
    </div>
  );
};

// BHK Architectural Glyph for Form Selector
export const VectorBHKGlyph: React.FC<{ bhk: string; selected?: boolean }> = ({ bhk, selected }) => {
  const accent = selected ? '#C7244E' : '#78716C';
  const fill = selected ? '#FFE4E6' : '#F5F5F4';

  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 shrink-0">
      <rect x="3" y="3" width="26" height="26" rx="6" fill={fill} stroke={accent} strokeWidth="1.5" />
      {bhk.includes('1') && (
        <rect x="8" y="8" width="16" height="16" rx="3" stroke={accent} strokeWidth="1.5" />
      )}
      {bhk.includes('2') && (
        <>
          <rect x="7" y="7" width="8" height="18" rx="2" stroke={accent} strokeWidth="1.2" />
          <rect x="17" y="7" width="8" height="18" rx="2" stroke={accent} strokeWidth="1.2" />
        </>
      )}
      {bhk.includes('3') && (
        <>
          <rect x="6" y="7" width="8" height="8" rx="2" stroke={accent} strokeWidth="1.2" />
          <rect x="18" y="7" width="8" height="8" rx="2" stroke={accent} strokeWidth="1.2" />
          <rect x="6" y="17" width="20" height="8" rx="2" stroke={accent} strokeWidth="1.2" />
        </>
      )}
      {(bhk.includes('4') || bhk.includes('Villa')) && (
        <>
          <rect x="6" y="6" width="9" height="9" rx="2" stroke={accent} strokeWidth="1.2" />
          <rect x="17" y="6" width="9" height="9" rx="2" stroke={accent} strokeWidth="1.2" />
          <rect x="6" y="17" width="9" height="9" rx="2" stroke={accent} strokeWidth="1.2" />
          <rect x="17" y="17" width="9" height="9" rx="2" stroke={accent} strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
};

// Project Scope Glyph for Form Selector
export const VectorScopeGlyph: React.FC<{ type: 'full' | 'modular' | 'renovation'; selected?: boolean }> = ({
  type,
  selected,
}) => {
  const accent = selected ? '#C7244E' : '#78716C';
  const fill = selected ? '#FFE4E6' : '#F5F5F4';

  if (type === 'modular') {
    return (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 shrink-0">
        <rect x="4" y="6" width="24" height="20" rx="4" fill={fill} stroke={accent} strokeWidth="1.5" />
        <line x1="4" y1="14" x2="28" y2="14" stroke={accent} strokeWidth="1.2" />
        <line x1="16" y1="14" x2="16" y2="26" stroke={accent} strokeWidth="1.2" />
        <circle cx="10" cy="20" r="1.5" fill={accent} />
        <circle cx="22" cy="20" r="1.5" fill={accent} />
      </svg>
    );
  }

  if (type === 'renovation') {
    return (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 shrink-0">
        <rect x="4" y="4" width="24" height="24" rx="5" fill={fill} stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M10 16 L16 10 L22 16" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="11" x2="16" y2="23" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Full home
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 shrink-0">
      <path d="M16 5 L27 14 V26 C27 27 26 28 25 28 H7 C6 28 5 27 5 26 V14 L16 5 Z" fill={fill} stroke={accent} strokeWidth="1.5" />
      <rect x="12" y="18" width="8" height="10" rx="1.5" stroke={accent} strokeWidth="1.2" />
    </svg>
  );
};
