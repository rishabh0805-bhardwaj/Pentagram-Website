import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Building,
  CheckCircle2,
  MapPin,
  Sparkles,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { BRAND_DETAILS } from '../data/mockData';
import { SERVICEABLE_CITIES, ServiceableCity } from '../types';

interface AboutUsSectionProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
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
            <Building className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Corporate Identity & Craftsmanship</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            About Pentagram: Your Space Expert
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Founded under Verdoire Interiors & Furnishings Pvt. Ltd., we represent the fusion of algorithmic precision
            and master architectural execution exclusively across Delhi NCR.
          </p>
        </div>

        {/* Company Story & Legal Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE0D5] shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-bold text-[#9C2542] uppercase tracking-wider">
              Legal Identity & Heritage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#201B1C] leading-snug">
              Verdoire Interiors & Furnishings Pvt. Ltd.
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              <strong>PENTAGRAM: YOUR SPACE EXPERT</strong> is the primary operating and trading brand of Verdoire
              Interiors & Furnishings Pvt. Ltd. (CIN: {BRAND_DETAILS.cin}). Established with a mission to bring
              accountability, financial safety, and manufacturing transparency to the chaotic Indian home interior
              market, Pentagram operates on three non-negotiables:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                <ShieldCheck className="w-5 h-5 text-[#9C2542] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#201B1C] block font-semibold">Stage-Wise Milestone Financial Safety</strong>
                  <span>We never ask for large contractor advances. Payments are structured stage-by-stage and released milestone by milestone after inspection.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                <Award className="w-5 h-5 text-[#9C2542] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#201B1C] block font-semibold">In-House Manufacturing with QR Traceability</strong>
                  <span>We do not outsource to unverified small-scale workshops. Every modular unit is cut with German precision tools.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                <CheckCircle2 className="w-5 h-5 text-[#9C2542] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#201B1C] block font-semibold">Contractual 45-Day Handover & 10-Year Warranty</strong>
                  <span>Our commitment to timely delivery is backed by real daily financial delay compensation clauses.</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={BRAND_DETAILS.trustCenterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9C2542] hover:underline"
              >
                <span>Read Full Policies at Pentagram Trust Centre</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Legal Compliance Box */}
          <div className="lg:col-span-5 bg-[#FAF6F0] p-6 rounded-2xl border border-[#EAE0D5] space-y-4 text-xs">
            <div className="font-serif text-base font-bold text-[#201B1C] border-b border-[#EAE0D5] pb-2">
              Statutory Credentials (E-E-A-T)
            </div>

            <div className="space-y-2 text-neutral-700 font-mono text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#EAE0D5]/60">
                <span className="text-neutral-500 font-sans">Trading Brand:</span>
                <span className="font-bold text-[#201B1C]">PENTAGRAM: YOUR SPACE EXPERT</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE0D5]/60">
                <span className="text-neutral-500 font-sans">Incorporation Entity:</span>
                <span className="font-semibold text-[#201B1C]">Verdoire Interiors & Furnishings Pvt. Ltd.</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE0D5]/60">
                <span className="text-neutral-500 font-sans">Corporate CIN:</span>
                <span className="font-bold text-[#9C2542]">{BRAND_DETAILS.cin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE0D5]/60">
                <span className="text-neutral-500 font-sans">GST Registration:</span>
                <span className="font-bold text-[#9C2542]">{BRAND_DETAILS.gstin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE0D5]/60">
                <span className="text-neutral-500 font-sans">MSME Udyam:</span>
                <span className="font-bold text-[#9C2542]">{BRAND_DETAILS.udyam}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500 font-sans">Official Domain:</span>
                <span className="text-[#201B1C]">{BRAND_DETAILS.domain}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EAE0D5] text-[11px] text-neutral-600">
              <strong className="text-[#201B1C] block mb-1">NCR Experience Center:</strong>
              {BRAND_DETAILS.experienceCenter.address}
            </div>
          </div>
        </div>

        {/* Service Area Map & Strict 6 Cities Scope */}
        <div className="bg-[#201B1C] text-white rounded-3xl p-6 sm:p-10 border border-[#362f30] shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#C69255] uppercase tracking-wider block mb-1">
              Geographic Service Commitment
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Exclusively Servicing 6 Delhi NCR Cities
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300">
              To ensure strict quality control and rapid 45-day handovers, we do not stretch our operations pan-India.
              Our dedicated fleet and Senior Project Managers focus solely on these 6 cities:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICEABLE_CITIES.map((city) => (
              <div
                key={city.id}
                className="p-4 bg-[#181415] rounded-2xl border border-[#2e2627] flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#9C2542] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C69255]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{city.name}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{city.tag}</p>
                  <div className="text-[10px] text-[#C69255] mt-1">Active Projects & 48-Hr Site Visits</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#2e2627] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <span>Notice: Pentagram does NOT service tier-2 cities or southern/western India at this time.</span>
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 bg-[#9C2542] hover:bg-[#801c34] text-white font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Book Free Site Visit in Your City
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
