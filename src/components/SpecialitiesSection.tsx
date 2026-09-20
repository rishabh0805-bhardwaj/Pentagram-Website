import React from 'react';
import { Sparkles, Shield, QrCode, CheckCircle, ArrowRight, Award, Wind, Zap } from 'lucide-react';
import { SIGNATURE_SPECIALITIES } from '../data/mockData';
import { ServiceableCity } from '../types';

interface SpecialitiesSectionProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
}

export const SpecialitiesSection: React.FC<SpecialitiesSectionProps> = ({
  selectedCity,
  onOpenConsultation,
  onOpenEstimator,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F0] border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE0D5] text-xs font-bold text-[#9C2542] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Signature Engineering</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            Specialities That Set Pentagram Apart
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Engineered specifically to withstand Delhi NCR's intense summer heat, hard water, monsoon humidity, and
            air quality challenges.
          </p>
        </div>

        {/* 4 Speciality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {SIGNATURE_SPECIALITIES.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-3xl border border-[#EAE0D5] hover:border-[#9C2542]/40 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col sm:flex-row text-left"
            >
              <div className="sm:w-2/5 aspect-[16/10] sm:aspect-auto relative bg-neutral-100 overflow-hidden">
                <img
                  src={spec.image}
                  alt={`${spec.title} - Pentagram Speciality in ${selectedCity}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />
              </div>

              <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded bg-[#FAF6F0] text-[#9C2542] text-[10px] font-bold border border-[#EAE0D5] mb-2">
                    {spec.metric}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#201B1C] leading-snug">{spec.title}</h3>
                  <div className="text-xs font-semibold text-[#C69255] mt-0.5">{spec.subtitle}</div>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{spec.description}</p>
                </div>

                <div className="pt-3 border-t border-[#EAE0D5] flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-medium">Verified in {selectedCity}</span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-xs font-semibold text-[#9C2542] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Sample Spec</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hardware & Material Partnerships Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE0D5] shadow-xs text-center">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
            Direct Material & Hardware Partnerships
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm font-semibold text-neutral-700">
            <span className="flex items-center gap-1.5 hover:text-[#9C2542] transition-colors">
              <Award className="w-4 h-4 text-[#C69255]" /> BLUM Austria (Servo-Drive & Tandem)
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#9C2542] transition-colors">
              <Award className="w-4 h-4 text-[#C69255]" /> Hettich Germany (Sensys Soft-Close)
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#9C2542] transition-colors">
              <Award className="w-4 h-4 text-[#C69255]" /> Saint-Gobain Gyproc (Crack-Free Boards)
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#9C2542] transition-colors">
              <Award className="w-4 h-4 text-[#C69255]" /> Action TESA (Boilo HDHMR Water-Resistant)
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#9C2542] transition-colors">
              <Award className="w-4 h-4 text-[#C69255]" /> ICA Italy (Zero-VOC Polyurethane)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
