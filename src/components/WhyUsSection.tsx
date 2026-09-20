import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  ExternalLink,
  FileText,
  Lock,
  Scale,
  Award,
  Clock,
  Building,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { BRAND_DETAILS } from '../data/mockData';
import { ServiceableCity } from '../types';
import {
  VectorDesignOS,
  VectorMilestonePayments,
  VectorModularFactory,
  VectorProjectManager,
  VectorWarrantyHandover,
  VectorLegalEntity,
} from './WhyUsVectors';
import { TrustCenterSection } from './TrustCenterSection';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { TERMS_AND_CONDITIONS_DATA } from '../data/termsAndConditionsData';

interface WhyUsSectionProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  initialTab?: 'why-us' | 'trust' | 'terms';
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({
  selectedCity,
  onOpenConsultation,
  onOpenEstimator,
  initialTab = 'why-us',
}) => {
  const [activeTab, setActiveTab] = useState<'why-us' | 'trust' | 'terms'>(initialTab);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [trustDefaultTab, setTrustDefaultTab] = useState<
    'payments' | 'warranty' | 'handover' | 'materials' | 'grievance' | 'terms'
  >('payments');

  const handleGoToTrustTab = (tab: 'payments' | 'warranty' | 'handover' | 'materials' | 'grievance' | 'terms') => {
    setTrustDefaultTab(tab);
    setActiveTab(tab === 'terms' ? 'terms' : 'trust');
  };

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-[#EAE0D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF6F0] border border-[#EAE0D5] text-xs font-bold text-[#9C2542] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Why Delhi NCR Homeowners Choose Pentagram</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            The Architecture of Complete Peace of Mind
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            We built Pentagram to eliminate contractor delays, hidden costs, and shoddy on-site carpentry across{' '}
            <strong className="text-[#201B1C]">{selectedCity}</strong> and the entire NCR region.
          </p>
        </div>

        {/* Top-Level Hub Navigation Tabs: Why Us vs Trust Centre vs Terms & Conditions */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('why-us')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'why-us'
                ? 'bg-[#201B1C] text-white border-[#201B1C] shadow-md'
                : 'bg-[#FAF6F0] text-neutral-700 border-[#EAE0D5] hover:bg-neutral-100'
            }`}
          >
            <Cpu className={`w-4 h-4 ${activeTab === 'why-us' ? 'text-[#C69255]' : 'text-neutral-500'}`} />
            <span>Why Us & The 70/30 Principle</span>
          </button>

          <button
            onClick={() => {
              setTrustDefaultTab('payments');
              setActiveTab('trust');
            }}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'trust'
                ? 'bg-[#201B1C] text-white border-[#201B1C] shadow-md'
                : 'bg-[#FAF6F0] text-neutral-700 border-[#EAE0D5] hover:bg-neutral-100'
            }`}
          >
            <Lock className={`w-4 h-4 ${activeTab === 'trust' ? 'text-[#C69255]' : 'text-neutral-500'}`} />
            <span>Trust Centre & Guarantees</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === 'terms'
                ? 'bg-[#201B1C] text-white border-[#201B1C] shadow-md'
                : 'bg-[#FAF6F0] text-neutral-700 border-[#EAE0D5] hover:bg-neutral-100'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'terms' ? 'text-[#C69255]' : 'text-neutral-500'}`} />
            <span>Terms & Conditions (T&C)</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#9C2542] text-white text-[9px] font-mono">
              Policies
            </span>
          </button>
        </div>

        {/* View 1: Why Us & The 70/30 Principle */}
        {activeTab === 'why-us' && (
          <div>
            {/* The 70/30 Principle Spotlight Banner */}
            <div className="mb-14 bg-[#201B1C] rounded-3xl p-6 sm:p-10 text-[#FAF6F0] border border-[#362f30] relative overflow-hidden shadow-xl">
              <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#9C2542]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C69255] uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <span>Our Core Philosophy: The 70/30 Principle</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    70% Automated Precision + 30% Master Human Craft
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                    Unlike traditional carpenters who hand-cut plywood on your dusty floor, or generic apps that blindly
                    outsource labor, <strong className="text-white">Pentagram Design OS</strong> automates 70% of the
                    precision process — algorithmic cut-lists, zero-waste nesting, laser edge-banding, and stage-wise milestone
                    tracking. The remaining 30% is dedicated to high-touch human craft: bespoke architectural planning,
                    handpicked veneers, and meticulous site supervision.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                    <div className="p-3 bg-[#181415] rounded-xl border border-[#2e2627]">
                      <span className="font-bold text-[#C69255] block text-base font-serif">±0.2mm</span>
                      <span className="text-neutral-400">German CNC Laser Accuracy</span>
                    </div>
                    <div className="p-3 bg-[#181415] rounded-xl border border-[#2e2627]">
                      <span className="font-bold text-emerald-400 block text-base font-serif">0% Cost Overrun</span>
                      <span className="text-neutral-400">Fixed Quotation via Design OS</span>
                    </div>
                    <div className="p-3 bg-[#181415] rounded-xl border border-[#2e2627]">
                      <span className="font-bold text-white block text-base font-serif">45 Days Handover</span>
                      <span className="text-neutral-400">Guaranteed Move-In Timeline</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end space-y-3">
                  <button
                    onClick={onOpenEstimator}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Test Pentagram Design OS</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('terms')}
                    className="text-xs text-neutral-400 hover:text-[#C69255] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official Terms & Conditions (T&C)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 6 Core USPS Detailed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1: Design OS */}
              <div
                onClick={onOpenEstimator}
                className="group p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#C1405D]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                <div className="w-full flex items-center justify-center mb-5">
                  <VectorDesignOS className="w-full max-w-[280px] h-40 sm:h-44" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C] transition-all duration-300 ease-out transform group-hover:text-[#C1405D] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    Pentagram Design OS
                  </h4>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-gradient-to-r from-[#C1405D] to-[#C69255] mx-auto mt-2.5 transition-all duration-300 rounded-full" />
                </div>
              </div>

              {/* Card 2: Stage-Wise Milestone Payments */}
              <div
                onClick={() => handleGoToTrustTab('payments')}
                className="group p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#C1405D]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                <div className="w-full flex items-center justify-center mb-5">
                  <VectorMilestonePayments className="w-full max-w-[280px] h-40 sm:h-44" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C] transition-all duration-300 ease-out transform group-hover:text-[#C1405D] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    Stage-Wise Milestone Payments
                  </h4>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-gradient-to-r from-[#C1405D] to-[#C69255] mx-auto mt-2.5 transition-all duration-300 rounded-full" />
                </div>
              </div>

              {/* Card 3: In-House Factory & QR Tracking */}
              <div
                onClick={() => handleGoToTrustTab('materials')}
                className="group p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#C1405D]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                <div className="w-full flex items-center justify-center mb-5">
                  <VectorModularFactory className="w-full max-w-[280px] h-40 sm:h-44" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C] transition-all duration-300 ease-out transform group-hover:text-[#C1405D] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    QR-Tracked Modular Factory
                  </h4>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-gradient-to-r from-[#C1405D] to-[#C69255] mx-auto mt-2.5 transition-all duration-300 rounded-full" />
                </div>
              </div>

              {/* Card 4: Single Point of Contact PM */}
              <div
                onClick={() => handleGoToTrustTab('grievance')}
                className="group p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#C1405D]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                <div className="w-full flex items-center justify-center mb-5">
                  <VectorProjectManager className="w-full max-w-[280px] h-40 sm:h-44" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C] transition-all duration-300 ease-out transform group-hover:text-[#C1405D] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    Dedicated Senior Project Manager
                  </h4>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-gradient-to-r from-[#C1405D] to-[#C69255] mx-auto mt-2.5 transition-all duration-300 rounded-full" />
                </div>
              </div>

              {/* Card 5: 10-Year Warranty & Handover */}
              <div
                onClick={() => handleGoToTrustTab('warranty')}
                className="group p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#C1405D]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                <div className="w-full flex items-center justify-center mb-5">
                  <VectorWarrantyHandover className="w-full max-w-[280px] h-40 sm:h-44" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C] transition-all duration-300 ease-out transform group-hover:text-[#C1405D] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    10-Yr Warranty & Move-In Date
                  </h4>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-gradient-to-r from-[#C1405D] to-[#C69255] mx-auto mt-2.5 transition-all duration-300 rounded-full" />
                </div>
              </div>

              {/* Card 6: Corporate Legal Identity */}
              <div
                onClick={() => setActiveTab('terms')}
                className="group p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D5] hover:border-[#C1405D]/60 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                <div className="w-full flex items-center justify-center mb-5">
                  <VectorLegalEntity className="w-full max-w-[280px] h-40 sm:h-44" />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C] transition-all duration-300 ease-out transform group-hover:text-[#C1405D] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    Verdoire Interiors Entity (T&C)
                  </h4>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-gradient-to-r from-[#C1405D] to-[#C69255] mx-auto mt-2.5 transition-all duration-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Quick Policy & T&C Safeguards Strip */}
            <div className="mt-14 p-6 sm:p-8 bg-[#FAF6F0] rounded-3xl border border-[#EAE0D5] flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-[#9C2542] uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-[#C69255]" />
                  <span>Governing Legal Framework & Policies</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#201B1C]">
                  Official Terms & Conditions (T&C) & Trust Policies
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
                  Every contract is issued under <strong className="text-[#201B1C]">{BRAND_DETAILS.legalEntity}</strong> (CIN: {BRAND_DETAILS.cin}, GSTIN: {BRAND_DETAILS.gstin}), backed by our registered studio at {TERMS_AND_CONDITIONS_DATA.registeredStudio}.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveTab('terms')}
                  className="px-5 py-3 rounded-xl bg-[#201B1C] hover:bg-black text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-[#C69255]" />
                  <span>Browse Full T&C Clauses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 text-[#9C2542] border border-[#EAE0D5] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <span>Open T&C Modal</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Trust Centre & Guarantees */}
        {activeTab === 'trust' && (
          <div>
            <TrustCenterSection
              selectedCity={selectedCity}
              onOpenConsultation={onOpenConsultation}
              defaultTab={trustDefaultTab}
            />
          </div>
        )}

        {/* View 3: Official Terms & Conditions (T&C) & Policies */}
        {activeTab === 'terms' && (
          <div>
            <TrustCenterSection
              selectedCity={selectedCity}
              onOpenConsultation={onOpenConsultation}
              defaultTab="terms"
            />
          </div>
        )}
      </div>

      {/* Contractual Terms & Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </section>
  );
};

