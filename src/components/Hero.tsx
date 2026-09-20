import React from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  Star,
  Clock,
  ArrowRight,
  Heart,
  Smile,
  Calculator,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_DETAILS } from '../data/mockData';
import { ServiceableCity } from '../types';
import { FestiveOffersBanner } from './FestiveOffersBanner';

interface HeroProps {
  selectedCity: ServiceableCity;
  onSelectCity?: (city: ServiceableCity) => void;
  onOpenConsultation: () => void;
  onOpenEstimator?: () => void;
  onClaimOffer?: (couponCode: string, offerTitle: string) => void;
  onNavigateToProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCity,
  onOpenConsultation,
  onOpenEstimator,
  onClaimOffer,
  onNavigateToProjects,
}) => {
  const cityHighlights: Record<
    ServiceableCity,
    { headlineArea: string; recentSociety: string; happyFamily: string }
  > = {
    Gurgaon: {
      headlineArea: 'Golf Course Road, DLF Phase 1-5, Sohna Rd & New Gurgaon',
      recentSociety: 'DLF The Crest (Sector 54)',
      happyFamily: 'The Sharma family moved in on Day 41 with zero cost overruns',
    },
    Noida: {
      headlineArea: 'Noida Expressway, Sector 150 & Central Sectors',
      recentSociety: 'ATS Knightsbridge & Cleo County',
      happyFamily: 'Dr. Verma celebrated Griha Pravesh in their dream home on schedule',
    },
    'Greater Noida': {
      headlineArea: 'Greater Noida West, Gaur City & Pari Chowk',
      recentSociety: 'Gaur City & Mahagun Mezzaria',
      happyFamily: 'Pooja & Rohan saved ₹1.8L through factory-direct precision',
    },
    Faridabad: {
      headlineArea: 'Greenfields Colony, Sectors 14-21 & Greater Faridabad',
      recentSociety: 'BPTP Park Elite & Greenfield Floors',
      happyFamily: 'The Guptas enjoyed transparent stage payments from day 1',
    },
    Delhi: {
      headlineArea: 'South Delhi, Dwarka, Vasant Vihar & Punjabi Bagh',
      recentSociety: 'Vasant Vihar Floors & GK Builder Homes',
      happyFamily: 'Modern heritage makeover completed with 10-year waterproof ply',
    },
    'New Delhi': {
      headlineArea: 'Central Delhi, Chanakyapuri & Civil Lines',
      recentSociety: 'Chanakyapuri & Civil Lines Residences',
      happyFamily: 'Luxury bespoke finishes and acoustic ceiling delivered seamlessly',
    },
  };

  const currentHighlight = cityHighlights[selectedCity] || cityHighlights.Gurgaon;

  const handleClaimFestiveOffer = (code: string, title: string) => {
    if (onClaimOffer) {
      onClaimOffer(code, title);
    } else {
      onOpenConsultation();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE0] pt-4 pb-14 lg:pt-6 lg:pb-20 border-b border-[#EAE0D5]">
      {/* Warm Uplifting Ambient Lighting Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8">
        {/* 1. MASTER VIEW ANIMATED FESTIVE OFFERS BANNER (Move-in Slider) */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FestiveOffersBanner onClaimOffer={handleClaimFestiveOffer} />
        </motion.div>

        {/* 2. MAIN HERO SECTION (Clean, harmonious, color-disciplined) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-2">
          {/* Left Column: Joyful Headline & Guarantees */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Happy Trust Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-rose-200/80 shadow-xs text-xs font-bold text-[#201B1C]"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-50 text-[#C7244E]">
                <Heart className="w-3 h-3 fill-[#C7244E]" />
              </span>
              <span>1,240+ Happy Homeowners in Delhi NCR</span>
              <span className="text-neutral-300">•</span>
              <span className="text-[#C7244E]">45-Day Handover Guaranteed</span>
            </motion.div>

            {/* Primary SEO H1 with Happy & Confident Tone */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#201B1C] tracking-tight leading-[1.18]"
            >
              Step Into Your <br className="hidden sm:block" />
              <span className="text-[#C7244E] italic font-serif">Happy Home</span> with Pentagram
            </motion.h1>

            {/* Factual, Trustworthy Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal"
            >
              Turnkey modular kitchens, wardrobes, and complete interiors across{' '}
              <strong className="text-[#201B1C] font-semibold">{currentHighlight.headlineArea}</strong>. Enjoy 100%
              peace of mind with{' '}
              <strong className="text-[#C7244E]">transparent stage-wise payments</strong> (pay only as milestones are approved),
              German factory precision, zero contractor runaround, and a{' '}
              <span className="text-[#201B1C] font-bold underline decoration-[#C7244E]/40">10-Year Warranty</span>.
            </motion.p>

            {/* 3 Happiness Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-rose-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C7244E] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#C7244E]" />
                  <span>Stage-wise Payments</span>
                </div>
                <div className="text-[11px] text-neutral-600">Pay milestone by milestone only after physical quality approval</div>
              </div>

              <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-rose-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C7244E] mb-1">
                  <Clock className="w-4 h-4 text-[#C69255]" />
                  <span>45-Day Handover</span>
                </div>
                <div className="text-[11px] text-neutral-600">Guaranteed move-in date with ₹1,000/day penalty compensation</div>
              </div>

              <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-rose-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C7244E] mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>German Precision</span>
                </div>
                <div className="text-[11px] text-neutral-600">In-house CNC factory with high quality raw materials</div>
              </div>
            </motion.div>

            {/* Clean Single Action Group */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#C7244E] hover:bg-[#a81c40] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                id="hero-consultation-cta"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Site Visit</span>
              </button>

              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#C1405D]/10 hover:bg-[#C1405D]/20 text-[#C1405D] font-bold border border-[#C1405D]/30 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  id="hero-calculator-cta"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Cost (30s)</span>
                </button>
              )}

              <button
                onClick={onNavigateToProjects}
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-[#FAF6F0] text-[#201B1C] font-bold border border-[#D4C5B9] hover:border-[#C7244E] rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Delivered Homes</span>
                <ArrowRight className="w-4 h-4 text-[#C7244E]" />
              </button>
            </motion.div>

            {/* Local Proof & Trust Stats */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-neutral-600 border-t border-[#EAE0D5]">
              <span className="flex items-center gap-1.5 font-semibold">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <strong className="text-[#201B1C]">4.93 / 5.0</strong> ({BRAND_DETAILS.metrics.totalReviews}+ Verified Reviews)
              </span>
              <span className="flex items-center gap-1 text-neutral-700">
                <Award className="w-4 h-4 text-[#C7244E]" />
                <span>High Quality Raw Materials</span>
              </span>
              <span className="text-neutral-500 text-[11px]">
                {currentHighlight.happyFamily}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Trust Badges */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Visual Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[14/11]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt={`Happy modern home interior and modular kitchen in ${selectedCity} by Pentagram: Your Home Expert`}
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Overlaid Society Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#C7244E] uppercase tracking-wider">
                      Joyful Handover in {selectedCity}
                    </div>
                    <div className="text-sm font-serif font-bold text-[#201B1C]">
                      {currentHighlight.recentSociety.split(' (')[0]}
                    </div>
                    <div className="text-xs text-neutral-500">Handed over in 42 Days • 10-Yr Warranty</div>
                  </div>
                  <button
                    onClick={onNavigateToProjects}
                    className="px-3.5 py-1.5 bg-[#C7244E] text-white text-xs font-bold rounded-xl hover:bg-[#a81c40] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Floating 10-Year Warranty Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-2.5 max-w-[220px] hidden sm:flex"
              >
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#C69255] shrink-0">
                  <Award className="w-5 h-5 text-[#C69255]" />
                </div>
                <div className="text-[11px] leading-tight">
                  <strong className="text-[#201B1C] block font-bold">10-Year Warranty</strong>
                  <span className="text-neutral-500 text-[10px]">High quality raw materials</span>
                </div>
              </motion.div>

              {/* Floating 45-Day Handover Badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-2.5 max-w-[220px] hidden sm:flex"
              >
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-[#C7244E] shrink-0">
                  <Smile className="w-5 h-5" />
                </div>
                <div className="text-[11px] leading-tight">
                  <strong className="text-[#201B1C] block font-bold">45-Day Handover</strong>
                  <span className="text-neutral-500 text-[10px]">Or ₹1,000/day delay penalty</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
