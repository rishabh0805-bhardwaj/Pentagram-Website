import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Tag,
  CheckCircle2,
  Pause,
  Play,
  Flame,
  Layers,
  FileCheck2,
  Glasses,
  Home,
  Sliders,
  Cpu,
  HeartHandshake,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import diwaliBg from '../assets/images/diwali_home_interior_1789403215659.jpg';
import navratriBg from '../assets/images/navratri_kitchen_interior_1789403235537.jpg';
import vrBg from '../assets/images/vr_3d_home_tour_1789403252786.jpg';

interface FestiveOffersBannerProps {
  onClaimOffer: (offerCode: string, offerTitle: string) => void;
}

interface CreativeSlide {
  id: string;
  theme: 'dark' | 'light';
  badgeCategory: string;
  badgeStyle: string;
  eyebrow: string;
  title: string;
  highlightTag?: string;
  subtitle: string;
  features: { icon: React.ReactNode; text: string; sub?: string }[];
  couponCode: string;
  couponLabel?: string;
  ctaText: string;
  calligraphyNote?: string;
  accentCircleBadge?: { title: string; subtitle?: string };
  roomTags?: string[];
  footerTagline: string;
  bgImage: string;
  bgOverlay: string;
  accentColor: string;
}

const CREATIVE_BANNERS: CreativeSlide[] = [
  // 1. DIWALI 45-DAY MOVE-IN BANNER
  {
    id: 'diwali-celebration',
    theme: 'dark',
    badgeCategory: 'THIS DIWALI',
    badgeStyle: 'text-[#D4AF37] font-serif tracking-[0.2em] text-xs font-semibold uppercase',
    eyebrow: 'THIS DIWALI —',
    title: 'Celebrate Diwali in Your New Dream Home',
    highlightTag: '• 45-DAY MOVE-IN •',
    subtitle:
      'Avoid last-minute contractor delays. Confirm your design now and host Diwali festivities with family and friends on time.',
    features: [
      {
        icon: <FileCheck2 className="w-4 h-4 text-[#D4AF37]" />,
        text: 'Fixed Handover Date stamped on stamp paper agreement',
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />,
        text: 'Zero-advance risk: pay milestone by milestone after inspection',
      },
      {
        icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" />,
        text: 'Complimentary Designer False Ceiling & Ambient LED Cove Lighting',
      },
    ],
    couponCode: 'DIWALIHOME',
    couponLabel: 'USE COUPON CODE',
    ctaText: 'Claim This Offer',
    accentCircleBadge: {
      title: 'Make this Diwali',
      subtitle: 'Extra Special at Home',
    },
    footerTagline: 'BETTER SPACES • HAPPIER PEOPLE • BRIGHTER TOMORROWS',
    bgImage: diwaliBg,
    bgOverlay: 'from-[#170E08]/92 via-[#22150D]/85 to-[#2A190F]/70',
    accentColor: '#D4AF37',
  },

  // 2. PRE-NAVRATRI ITALIAN QUARTZ SPECIAL
  {
    id: 'navratri-quartz',
    theme: 'light',
    badgeCategory: 'Pre-Navratri Special',
    badgeStyle: 'bg-rose-50 text-[#C7244E] border border-rose-200/80 px-3 py-1 rounded-full text-xs font-semibold',
    eyebrow: 'Pre-Navratri Special',
    title: 'Free Italian Quartz Countertop Upgrade',
    subtitle:
      'Prepare your dream home for festive celebrations. Turnkey interior fitouts with German robotic factory precision.',
    features: [
      {
        icon: <Layers className="w-4 h-4 text-[#C7244E]" />,
        text: 'Complimentary Seamless Italian Quartz Slab for Modular Kitchen',
      },
      {
        icon: <Cpu className="w-4 h-4 text-[#C7244E]" />,
        text: 'German Soft-Close Tandem Drawers Included on Every Cabinet',
      },
      {
        icon: <HeartHandshake className="w-4 h-4 text-[#C7244E]" />,
        text: 'Transparent Stage Payments — Pay strictly as milestones complete',
      },
    ],
    couponCode: 'NAVRATRI10',
    couponLabel: 'USE COUPON CODE',
    ctaText: 'Claim This Offer',
    calligraphyNote: 'A More Beautiful Festive Beginning',
    accentCircleBadge: {
      title: 'GOOD FOOD',
      subtitle: 'HAPPIER HOMES',
    },
    footerTagline: 'SPACES • PEOPLE • BETTER TOMORROWS',
    bgImage: navratriBg,
    bgOverlay: 'from-[#FFFDFB]/95 via-[#FAF6F0]/90 to-[#F5ECE0]/80',
    accentColor: '#C7244E',
  },

  // 3. NEW FLAT POSSESSION SHAGUN (VR TOUR)
  {
    id: 'possession-shagun',
    theme: 'dark',
    badgeCategory: 'NEW HOMEOWNER SHAGUN SPECIAL',
    badgeStyle: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 px-3.5 py-1 rounded-full text-xs font-semibold',
    eyebrow: 'NEW HOMEOWNER SHAGUN SPECIAL',
    title: 'New Flat Possession Shagun: Free 3D Architectural VR Tour',
    subtitle:
      'Get possession in Gurgaon, Noida, Greater Noida, Faridabad, or Delhi? Walk through your home in hyper-realistic 3D before making a single payment.',
    features: [
      {
        icon: <Glasses className="w-4 h-4 text-emerald-400" />,
        text: 'Complete Room-by-Room 3D Visuals & Millimeter Cut-List',
      },
      {
        icon: <Sliders className="w-4 h-4 text-emerald-400" />,
        text: 'Flexible Zero-Cost EMI options available with leading banks',
      },
      {
        icon: <Cpu className="w-4 h-4 text-emerald-400" />,
        text: 'In-House German CNC manufacturing with QR-code genuine ply',
      },
    ],
    couponCode: 'SHAGUN2026',
    couponLabel: 'USE COUPON CODE',
    ctaText: 'Claim This Offer',
    calligraphyNote: 'See Your Tomorrow Today',
    roomTags: ['Living Room', 'Kitchen', 'Master Bedroom', 'Kids Room', 'Dining'],
    footerTagline: 'SPACES • PEOPLE • BETTER TOMORROWS',
    bgImage: vrBg,
    bgOverlay: 'from-[#0D1612]/92 via-[#112019]/86 to-[#152B21]/70',
    accentColor: '#10B981',
  },
];

export const FestiveOffersBanner: React.FC<FestiveOffersBannerProps> = ({ onClaimOffer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000; // 6 seconds
  const PROGRESS_STEP = 50; // update progress every 50ms

  // Interval timer with pause handling
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection('right');
          setCurrentIndex((curr) => (curr + 1) % CREATIVE_BANNERS.length);
          return 0;
        }
        return prev + (PROGRESS_STEP / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_STEP);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setDirection('right');
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % CREATIVE_BANNERS.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + CREATIVE_BANNERS.length) % CREATIVE_BANNERS.length);
  };

  const handleSelectSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 'right' : 'left');
    setProgress(0);
    setCurrentIndex(idx);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const currentSlide = CREATIVE_BANNERS[currentIndex];

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -80 : 80,
      opacity: 0,
    }),
  };

  const isDark = currentSlide.theme === 'dark';

  return (
    <div
      id="festive-offers-carousel"
      className="relative w-full overflow-hidden rounded-3xl border border-[#EAE0D5] shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container with Photographic Depth */}
      <div className="relative min-h-[460px] sm:min-h-[440px] lg:min-h-[420px] flex flex-col justify-between overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
        />

        {/* Ambient Gradient Overlay Layer */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgOverlay} backdrop-blur-[1px]`} />

        {/* Subtitle subtle glow */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main Content Area */}
        <div className="relative z-10 p-5 sm:p-7 md:p-9 flex-1 flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left & Middle Column: Typography, Badges & Highlights */}
              <div className="lg:col-span-8 space-y-4">
                {/* Header Row: Eyebrow + Calligraphy */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {currentSlide.id === 'diwali-celebration' ? (
                      <span className="text-[#E5C158] font-serif tracking-[0.25em] text-xs font-semibold uppercase flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 fill-[#E5C158]" />
                        <span>THIS DIWALI —</span>
                      </span>
                    ) : (
                      <span className={currentSlide.badgeStyle}>
                        {currentSlide.badgeCategory}
                      </span>
                    )}

                    {currentSlide.highlightTag && (
                      <span className="px-3 py-1 rounded-full bg-amber-400/20 text-[#E5C158] border border-[#E5C158]/40 text-xs font-bold tracking-wider">
                        {currentSlide.highlightTag}
                      </span>
                    )}
                  </div>

                  {currentSlide.calligraphyNote && (
                    <span
                      className={`font-serif italic text-sm ${
                        isDark ? 'text-emerald-300/90' : 'text-[#C7244E]'
                      } hidden sm:inline`}
                    >
                      {currentSlide.calligraphyNote}
                    </span>
                  )}
                </div>

                {/* Main Headline */}
                <h2
                  className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.2] ${
                    isDark ? 'text-white' : 'text-[#201B1C]'
                  }`}
                >
                  {currentSlide.title}
                </h2>

                {/* Subtitle / Promise */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                  }`}
                >
                  {currentSlide.subtitle}
                </p>

                {/* 3 Core Value Pillars (Matching exact image creative layouts) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {currentSlide.features.map((feat, i) => (
                    <div
                      key={i}
                      className={`p-2.5 sm:p-3 rounded-2xl backdrop-blur-md border transition-all flex items-start gap-2.5 ${
                        isDark
                          ? 'bg-black/35 border-white/10 text-neutral-200'
                          : 'bg-white/85 border-[#EAE0D5] text-neutral-800 shadow-2xs'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">{feat.icon}</div>
                      <span className="text-[11px] leading-tight font-medium">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Special Room Visual Pills for VR Tour Banner */}
                {currentSlide.roomTags && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 mr-1">
                      Walkthrough Spaces:
                    </span>
                    {currentSlide.roomTags.map((room, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-200 font-mono"
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Circular Festive Badge & Coupon Claim Block */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-4">
                {/* Golden Diya / Decorative Circle Badge */}
                {currentSlide.accentCircleBadge && (
                  <div
                    className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border flex flex-col items-center justify-center text-center p-2 shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                      isDark
                        ? 'border-[#D4AF37]/50 bg-gradient-to-b from-[#D4AF37]/20 to-black/60 shadow-lg text-amber-200'
                        : 'border-rose-300 bg-rose-50/90 text-[#C7244E] shadow-xs'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-[#D4AF37] mb-1 fill-[#D4AF37]" />
                    <span className="font-serif italic text-xs leading-tight">
                      {currentSlide.accentCircleBadge.title}
                    </span>
                    {currentSlide.accentCircleBadge.subtitle && (
                      <span className="font-serif text-[11px] font-bold tracking-tight leading-tight mt-0.5">
                        {currentSlide.accentCircleBadge.subtitle}
                      </span>
                    )}
                  </div>
                )}

                {/* Coupon Code Block & Action Button */}
                <div className="flex flex-col items-center lg:items-end gap-2.5 w-full sm:w-auto">
                  <div
                    className={`w-full sm:w-56 px-4 py-2.5 rounded-2xl border text-center backdrop-blur-md shadow-md ${
                      isDark
                        ? 'bg-[#FFF8E7] text-[#201B1C] border-[#D4AF37]'
                        : 'bg-white text-[#201B1C] border-rose-200'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider flex items-center justify-center gap-1">
                      <Tag className="w-3 h-3 text-[#C7244E]" />
                      <span>{currentSlide.couponLabel || 'USE COUPON CODE'}</span>
                    </div>
                    <div className="font-mono text-lg font-extrabold text-[#C7244E] tracking-widest mt-0.5">
                      {currentSlide.couponCode}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onClaimOffer(currentSlide.couponCode, currentSlide.title)
                    }
                    className="w-full sm:w-56 px-5 py-3 bg-[#9E1B3E] hover:bg-[#7D122F] text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Sub-Bar with Tagline, Progress Bar & PAUSE BUTTON */}
          <div className="pt-4 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Tagline from Creatives */}
            <div
              className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              {currentSlide.footerTagline}
            </div>

            {/* Carousel Interactive Controls (Pause Button, Indicators, Prev/Next) */}
            <div className="flex items-center gap-3">
              {/* PAUSE / PLAY BUTTON (Prominent & Accessible) */}
              <button
                onClick={togglePause}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer shadow-xs ${
                  isPaused
                    ? 'bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300'
                    : isDark
                    ? 'bg-white/15 hover:bg-white/25 text-white'
                    : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200'
                }`}
                title={isPaused ? 'Resume move-in animations' : 'Pause move-in animations'}
                aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[11px]">Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[11px]">Pause</span>
                  </>
                )}
              </button>

              {/* Slide Indicators with Animated Fill */}
              <div className="flex items-center gap-1.5">
                {CREATIVE_BANNERS.map((slide, idx) => {
                  const isActive = currentIndex === idx;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => handleSelectSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer relative overflow-hidden ${
                        isActive ? 'w-8 bg-neutral-600/40' : 'w-2 bg-neutral-400/40 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      {isActive && (
                        <div
                          className="absolute inset-0 bg-[#C7244E] transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-white/80 hover:bg-white text-neutral-800 border border-neutral-200 shadow-2xs'
                  }`}
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span
                  className={`text-[11px] font-mono px-1 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  {currentIndex + 1} / {CREATIVE_BANNERS.length}
                </span>
                <button
                  onClick={handleNext}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-white/80 hover:bg-white text-neutral-800 border border-neutral-200 shadow-2xs'
                  }`}
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
