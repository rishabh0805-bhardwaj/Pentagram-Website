import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Sliders,
  ShieldCheck,
  Layers,
  Home,
  Check,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceableCity } from '../types';

interface AnimatedEstimatorTeaserProps {
  selectedCity: ServiceableCity;
  onOpenEstimator: () => void;
  onOpenConsultation: () => void;
}

const STEPS_DATA = [
  {
    step: 1,
    title: 'Select Property Layout',
    desc: 'Choose from 1BHK to Luxury Villa and enter your approximate carpet area in sq.ft.',
    tag: 'Property & Area',
  },
  {
    step: 2,
    title: 'Pick Interior Requirements',
    desc: 'Tick your needed spaces: Modular Kitchen, Wardrobes, TV Units, Ceiling & Painting.',
    tag: 'Custom Rooms',
  },
  {
    step: 3,
    title: 'Choose Material Grade',
    desc: 'Compare Essential, Premium, or Luxury specifications with German CNC hardware.',
    tag: 'Material Tier',
  },
  {
    step: 4,
    title: 'Unlock Transparent Quote',
    desc: 'Provide your verified contact to calculate your itemized MRP and unlock an exclusive Showroom Spot-Booking voucher.',
    tag: 'Private Quote',
  },
];

export const AnimatedEstimatorTeaser: React.FC<AnimatedEstimatorTeaserProps> = ({
  selectedCity,
  onOpenEstimator,
  onOpenConsultation,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [previewBhk, setPreviewBhk] = useState<'2 BHK' | '3 BHK' | '4 BHK'>('3 BHK');
  const [previewTier, setPreviewTier] = useState<'Essential' | 'Premium' | 'Luxury'>('Premium');
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Modular Kitchen (L-Shape)',
    'Master Wardrobe (8x7 ft)',
    'Designer False Ceiling',
    'TV Entertainment Unit',
  ]);

  // Auto-cycle through the 4 steps every 4.5 seconds unless user manually interacts
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS_DATA.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== item));
      }
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF6F0] via-white to-rose-50/50 border border-rose-100/80 shadow-xl p-6 sm:p-10 lg:p-12">
      {/* Decorative background glow circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="relative z-10 max-w-3xl mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7244E]/10 border border-[#C7244E]/20 text-xs font-bold text-[#C7244E] mb-3"
        >
          <Zap className="w-3.5 h-3.5 fill-[#C7244E]" />
          <span>Interactive Cost Estimator • Built for Your Ease</span>
        </motion.div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#201B1C] tracking-tight">
          Estimate Your Home Interior in 30 Seconds
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mt-2 max-w-2xl">
          Skip generic guesswork and contractor inflation. Use our guided tool to configure your exact layout, choose
          your spaces, and unlock a transparent itemized quotation tailored to your home in{' '}
          <strong className="text-[#201B1C]">{selectedCity}</strong>.
        </p>
      </div>

      {/* Main Grid: Left = 4-Step Animated Process, Right = Live Interactive Simulator with Locked Pricing */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Animated Step Progression Tabs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            How It Works In 4 Simple Steps:
          </div>

          <div className="space-y-2.5">
            {STEPS_DATA.map((item, index) => {
              const isActive = activeStepIndex === index;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStepIndex(index)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                    isActive
                      ? 'bg-white border-[#C7244E] shadow-md ring-1 ring-[#C7244E]/20'
                      : 'bg-white/60 hover:bg-white border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  {/* Progress bar line for active step */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C7244E]"
                    />
                  )}

                  <div className="flex items-start gap-3.5 pl-1">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#C7244E] text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {item.step}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-xs sm:text-sm font-bold transition-colors ${
                            isActive ? 'text-[#C7244E]' : 'text-[#201B1C]'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-[#C7244E] border border-rose-100 shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Value Prop Badges */}
          <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-neutral-700">
            <div className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Spam Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-neutral-200">
              <ShieldCheck className="w-4 h-4 text-[#C7244E] shrink-0" />
              <span>10% Pentagram Special Offer</span>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Mockup with Pricing Strictly Locked */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl border border-rose-200 shadow-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden">
            {/* Top Interactive Status Bar */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-[#201B1C]">Interactive Preview</span>
              </div>
              <span className="text-[11px] font-medium text-neutral-500">
                Customizable for {selectedCity}
              </span>
            </div>

            {/* Quick Interactive Toggles (Showing ease of use without revealing prices) */}
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-neutral-600 block mb-1.5">
                  1. Try Selecting Your Property Layout:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['2 BHK', '3 BHK', '4 BHK'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setPreviewBhk(b)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                        previewBhk === b
                          ? 'bg-[#C7244E] text-white shadow-xs'
                          : 'bg-[#FAF6F0] text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-600 block mb-1.5">
                  2. Choose Material Quality Tier:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Essential', 'Premium', 'Luxury'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setPreviewTier(t)}
                      className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all cursor-pointer text-center ${
                        previewTier === t
                          ? 'bg-rose-50 text-[#C7244E] border border-[#C7244E] shadow-xs'
                          : 'bg-[#FAF6F0] text-neutral-700 hover:bg-neutral-100 border border-transparent'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-neutral-600">
                    3. Select Key Spaces to Include:
                  </label>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    {selectedItems.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Modular Kitchen (L-Shape)',
                    'Master Wardrobe (8x7 ft)',
                    'Designer False Ceiling',
                    'TV Entertainment Unit',
                  ].map((item) => {
                    const isSelected = selectedItems.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleItem(item)}
                        className={`p-2 rounded-xl text-[11px] text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
                          isSelected
                            ? 'bg-rose-50/70 border-rose-200 text-[#C7244E] font-semibold'
                            : 'bg-[#FAF6F0] border-transparent text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-md flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#C7244E] text-white' : 'bg-neutral-200'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="truncate">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price Guard / Gated Lock Box (Strictly no premature prices shown) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF6F0] via-rose-50/40 to-white border border-rose-200/80 shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#C7244E] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#201B1C]">Custom Estimate Locked</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C7244E]/10 text-[#C7244E] font-bold">
                      Privacy Protected
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    To maintain strict transparency, prices are computed only after receiving your specific dimensions and
                    room datasets in the calculator.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-rose-100/80 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
                  <span>Spot-Booking Discount at Showroom</span>
                </span>
                <span className="font-semibold text-neutral-700">Unlocked in Step 4</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={onOpenEstimator}
                className="w-full py-4 px-6 bg-[#C7244E] hover:bg-[#a81c40] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                id="homepage-open-detailed-estimator"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate My Interior Cost (30s)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-4 bg-transparent hover:bg-rose-50/50 text-neutral-600 hover:text-[#C7244E] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Or speak directly with our Senior Interior Designer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
