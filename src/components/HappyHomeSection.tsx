import React from 'react';
import {
  Heart,
  Smile,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  Star,
  Home,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceableCity, NavigationPage } from '../types';
import { AnimatedEstimatorTeaser } from './AnimatedEstimatorTeaser';

interface HappyHomeSectionProps {
  selectedCity: ServiceableCity;
  onNavigate: (page: NavigationPage) => void;
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  onSelectMatrixItem: (room: string, city: ServiceableCity) => void;
}

export const HappyHomeSection: React.FC<HappyHomeSectionProps> = ({
  selectedCity,
  onNavigate,
  onOpenConsultation,
  onOpenEstimator,
  onSelectMatrixItem,
}) => {
  const happyStories = [
    {
      name: 'Aditya & Megha Singhal',
      society: 'DLF The Crest, Sector 54, Gurgaon',
      handover: 'Handed over on Day 41 (4 days ahead of schedule)',
      quote:
        'Zero stress from day one. The transparent stage-wise payment schedule gave us complete peace of mind, and the German finish on our modular kitchen with Blum soft-close fittings is flawless.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 5,
      scope: '4BHK Turnkey Interior',
    },
    {
      name: 'Dr. Vivek & Ananya Sen',
      society: 'ATS Knightsbridge, Sector 124, Noida',
      handover: '100% on-time Diwali move-in',
      quote:
        'Unlike local contractors who quote low and double the bill later, Pentagram’s Design OS gave an exact quote that did not change by a single rupee. The German factory edge-banding is superb.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 5,
      scope: 'Luxury 3BHK Fitout',
    },
    {
      name: 'Priyanka & Kunal Kapoor',
      society: 'Cleo County, Sector 121, Noida',
      handover: '45-Day Handover Guaranteed',
      quote:
        'Our kids loved their custom study and wardrobe setup. Having a single Senior Project Manager to coordinate was an absolute blessing. We moved in right on the promised date.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      rating: 5,
      scope: 'Full Home Woodwork',
    },
  ];
  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Joyful Welcome Banner & The 4 Happy Pillars */}
      <section className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#C7244E]"
        >
          <Smile className="w-4 h-4 text-[#C7244E]" />
          <span>The Pentagram Joy Guarantee</span>
        </motion.div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#201B1C]">
          Designed for Joy. Engineered for Peace of Mind.
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
          Interior design should be one of the happiest milestones of your life. We eliminated contractor delays, hidden
          costs, and quality shortcuts with our 4-pillar happiness promise.
        </p>

        {/* 4 Happy Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 text-left">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-white rounded-3xl border border-[#EAE0D5] shadow-xs hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C7244E] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#201B1C] mb-1.5">Stage-wise Payments</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transparent stage payments. You pay milestone by milestone only after physical on-site inspection and approval.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-white rounded-3xl border border-[#EAE0D5] shadow-xs hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C69255] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#201B1C] mb-1.5">45-Day Handover</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Guaranteed move-in date backed by ₹1,000/day penalty compensation if we delay.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-white rounded-3xl border border-[#EAE0D5] shadow-xs hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#201B1C] mb-1.5">10-Year Warranty</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              100% high quality raw materials with zero termite, borer, or water damage vulnerability.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-white rounded-3xl border border-[#EAE0D5] shadow-xs hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C7244E] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#201B1C] mb-1.5">German CNC Precision</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Manufactured in our robotic facility with laser edge-banding and QR authentication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Joyful Cost Estimator Card (Animated Showcase - Prices Gated & Revealed After Details) */}
      <AnimatedEstimatorTeaser
        selectedCity={selectedCity}
        onOpenEstimator={onOpenEstimator}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 3. Verified Homeowner Stories */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-[#C7244E] uppercase tracking-wider">Verified NCR Homeowners</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#201B1C]">
              Real Families Across Delhi NCR
            </h3>
          </div>
          <button
            onClick={() => onNavigate('stories')}
            className="text-xs font-bold text-[#C7244E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Client Stories & Real Homes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {happyStories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-[#EAE0D5] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(story.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                    <span className="text-[11px] font-bold text-neutral-800 ml-1">5.0 Verified</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#C7244E]">
                    {story.scope}
                  </span>
                </div>
                <p className="text-xs text-neutral-700 italic leading-relaxed font-normal">"{story.quote}"</p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover border border-rose-200 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#201B1C]">{story.name}</div>
                  <div className="text-[11px] text-neutral-500">{story.society}</div>
                  <div className="text-[10px] font-semibold text-[#C7244E]">{story.handover}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Explore Gateways (Modular Kitchens, Wardrobes, Full Home) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#C7244E] uppercase tracking-wider">Explore What We Build</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#201B1C]">
              Popular Spaces for {selectedCity} Flats
            </h3>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-[#C7244E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => onSelectMatrixItem('Modular Kitchen', selectedCity)}
            className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer bg-white border border-[#EAE0D5]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
                alt="Modular Kitchens in Delhi NCR"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#201B1C] group-hover:text-[#C7244E] transition-colors">
                  Modular Kitchens
                </h4>
                <span className="text-xs font-bold text-[#C7244E] px-2.5 py-0.5 bg-rose-50 rounded-full">
                  Blum & Hettich Fitted
                </span>
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2">
                Boiling waterproof high quality raw materials, Blum soft-close tandem drawers, and quartz countertops.
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#C7244E]">
                <span>Explore Kitchens in {selectedCity}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onSelectMatrixItem('Master Bedroom Wardrobe', selectedCity)}
            className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer bg-white border border-[#EAE0D5]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
                alt="Floor-to-Ceiling Wardrobes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#201B1C] group-hover:text-[#C7244E] transition-colors">
                  Wardrobes & Closets
                </h4>
                <span className="text-xs font-bold text-[#C7244E] px-2.5 py-0.5 bg-rose-50 rounded-full">
                  Floor-to-Ceiling
                </span>
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2">
                Floor-to-ceiling sliding & walk-in wardrobes with sensor LED lighting and anti-warp aluminum profiles.
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#C7244E]">
                <span>Explore Wardrobes in {selectedCity}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('categories')}
            className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer bg-white border border-[#EAE0D5] sm:col-span-2 lg:col-span-1"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                alt="Complete Turnkey Home Interiors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#201B1C] group-hover:text-[#C7244E] transition-colors">
                  Complete Turnkey Interiors
                </h4>
                <span className="text-xs font-bold text-[#C7244E] px-2.5 py-0.5 bg-rose-50 rounded-full">
                  45-Day Handover
                </span>
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2">
                End-to-end 1BHK, 2BHK, 3BHK, and 4BHK fitouts. Civil, electrical, false ceiling, and bespoke furniture.
              </p>
              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#C7244E]">
                <span>Explore Full Home Packages</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
