import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Award,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  FileText,
  Clock,
  Building,
  HelpCircle,
  Scale,
  Search,
  ChevronDown,
  ChevronUp,
  Printer,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { BRAND_DETAILS } from '../data/mockData';
import { ServiceableCity } from '../types';
import { TERMS_AND_CONDITIONS_DATA } from '../data/termsAndConditionsData';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';

interface TrustCenterSectionProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
  defaultTab?: 'payments' | 'warranty' | 'handover' | 'materials' | 'grievance' | 'terms';
}

export const TrustCenterSection: React.FC<TrustCenterSectionProps> = ({
  selectedCity,
  onOpenConsultation,
  defaultTab = 'payments',
}) => {
  const [activePolicyTab, setActivePolicyTab] = useState<
    'payments' | 'warranty' | 'handover' | 'materials' | 'grievance' | 'terms'
  >(defaultTab);
  const [termsSearchQuery, setTermsSearchQuery] = useState('');
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#EAE0D5] text-xs font-bold text-[#9C2542] mb-3">
            <Lock className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Official Pentagram Trust Centre</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            Policies, Warranties & Quality Safeguards
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Transparent governance backed by Verdoire Interiors & Furnishings Pvt. Ltd. Every promise is contractually
            enforceable under Indian law.
          </p>
        </div>

        {/* Live Policy Link Banner */}
        <div className="mb-10 p-4 sm:p-5 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE0D5] flex items-center justify-center text-[#9C2542] shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#C69255]" />
            </div>
            <div className="text-left">
              <h4 className="font-serif font-bold text-sm text-[#201B1C]">Dedicated Online Policies Portal Live</h4>
              <p className="text-xs text-neutral-600">
                Review complete legal terms, service level agreements, and warranty documentation at our verified portal.
              </p>
            </div>
          </div>

          <a
            href={BRAND_DETAILS.trustCenterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Visit pentagram.expert/policies</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs font-semibold">
          {[
            { id: 'payments', label: 'Stage-Wise Payment Milestones' },
            { id: 'warranty', label: '10-Year Warranty Terms' },
            { id: 'handover', label: '45-Day Handover Guarantee' },
            { id: 'materials', label: 'Raw Material Authentication' },
            { id: 'grievance', label: 'Grievance & Redressal Matrix' },
            { id: 'terms', label: 'Terms & Conditions (T&C)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePolicyTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border cursor-pointer ${
                activePolicyTab === tab.id
                  ? 'bg-[#201B1C] text-white border-[#201B1C] shadow-xs'
                  : 'bg-[#FAF6F0] text-neutral-700 border-[#EAE0D5] hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#EAE0D5] text-left">
          {activePolicyTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9C2542] uppercase tracking-wider block mb-1">
                  Financial Protection Protocol
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                  Transparent Stage-Wise Milestone Payments
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                  In typical Indian interior setups, contractors demand 50% to 70% upfront payment before carpentry
                  begins, leaving homeowners powerless if delays or substandard materials occur. Pentagram completely
                  inverts this risk profile through our structured milestone payments — pay only as physical checkpoints
                  are completed and verified by you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-[#EAE0D5] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#9C2542] text-white font-serif font-bold text-sm flex items-center justify-center">
                    15%
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#201B1C]">Stage 1: Design Sign-Off</h4>
                  <p className="text-xs text-neutral-600">
                    Paid upon completion of 3D architectural renders, laser site measurements, and final approved BOQ.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#EAE0D5] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#9C2542] text-white font-serif font-bold text-sm flex items-center justify-center">
                    35%
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#201B1C]">Stage 2: Factory Production</h4>
                  <p className="text-xs text-neutral-600">
                    Paid when raw material cutting begins and QR tracking codes are generated in our modular factory.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#EAE0D5] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#9C2542] text-white font-serif font-bold text-sm flex items-center justify-center">
                    35%
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#201B1C]">Stage 3: On-Site Delivery</h4>
                  <p className="text-xs text-neutral-600">
                    Paid when finished flat-pack modules arrive at your society and pass homeowner visual pre-check.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-[#EAE0D5] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#9C2542] text-white font-serif font-bold text-sm flex items-center justify-center">
                    15%
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#201B1C]">Stage 4: Handover Clearance</h4>
                  <p className="text-xs text-neutral-600">
                    Paid solely after complete punch-list rectification, professional deep clean, and 10-year warranty sign-off.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePolicyTab === 'warranty' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9C2542] uppercase tracking-wider block mb-1">
                  10-Year Long-Term Peace of Mind
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                  Pentagram 10-Year Modular Warranty Scope
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                  Our comprehensive warranty covers all factory-manufactured woodwork against delamination, termite
                  infestation, and structural warping under normal domestic usage across Delhi NCR.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-[#EAE0D5] space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#201B1C] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> What is 100% Covered:
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    <li>• Carcass integrity of all kitchen and wardrobe units.</li>
                    <li>• Termite and borer damage on high quality raw materials and plywood cores.</li>
                    <li>• Factory edge-banding delamination under normal interior temperatures.</li>
                    <li>• European hardware failure (Blum / Hettich soft-close hinges and drawer channels).</li>
                    <li>• Free bi-annual maintenance checkup in the first 12 months after handover.</li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-[#EAE0D5] space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#201B1C] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Exclusions & Limits:
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    <li>• Physical chipping, knife impact, or abrasive chemical cleaners on acrylic/laminates.</li>
                    <li>• Prolonged external structural water leakage through builder building walls or ceiling slabs.</li>
                    <li>• Unauthorized modifications, carpentry alterations, or third-party electrical repairs.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activePolicyTab === 'handover' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9C2542] uppercase tracking-wider block mb-1">
                  Contractual Timeline Assurance
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                  45-Day Handover Guarantee with Daily Penalty
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                  We value your rent and loan EMIs. We commit to a strict 45-day move-in timeline starting from the date
                  of final design sign-off and site readiness in Gurgaon, Noida, Greater Noida, Faridabad, Delhi, or New
                  Delhi.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#EAE0D5] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                    ₹
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#201B1C]">
                      Contractual Delay Compensation: ₹1,000 / Day
                    </h4>
                    <p className="text-xs text-neutral-600">
                      If we exceed our signed 45-day completion deadline without an approved force majeure event,
                      Pentagram pays ₹1,000 for every single day of delay directly credited against your final milestone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePolicyTab === 'materials' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9C2542] uppercase tracking-wider block mb-1">
                  Zero Adulteration Guarantee
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                  Raw Material Authentication & QR Traceability
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                  Many interior contractors mix low-grade commercial board or cheap particle board into hidden carcass
                  corners. Pentagram enforces 100% genuine high quality raw materials with QR batch validation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D5] space-y-1">
                  <strong className="text-[#201B1C] block">High Quality Raw Materials</strong>
                  <p className="text-neutral-600">72-hour boiling water resistant Phenol Formaldehyde resin bonding.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D5] space-y-1">
                  <strong className="text-[#201B1C] block">Anti-Termite Treatment</strong>
                  <p className="text-neutral-600">Vacuum-pressure impregnated borate salts preventing borer attacks.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#EAE0D5] space-y-1">
                  <strong className="text-[#201B1C] block">QR Code on Every Panel</strong>
                  <p className="text-neutral-600">Scan to inspect factory batch date, thickness calibration, and test certificate.</p>
                </div>
              </div>
            </div>
          )}

          {activePolicyTab === 'grievance' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9C2542] uppercase tracking-wider block mb-1">
                  Customer Rights & Escalation
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                  Grievance Redressal & Executive Oversight
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                  Every project has an assigned Senior PM. In the rare event of an unresolved dispute, you have direct
                  recourse to senior management at Verdoire Interiors & Furnishings Pvt. Ltd.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-5 bg-white rounded-2xl border border-[#EAE0D5] space-y-2">
                  <span className="text-[10px] font-bold text-[#9C2542] uppercase">Level 1 Redressal</span>
                  <div className="font-bold text-[#201B1C]">Dedicated Senior Project Manager</div>
                  <p className="text-neutral-600">24-hour turnaround on on-site material replacements or schedule adjustments.</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-[#EAE0D5] space-y-2">
                  <span className="text-[10px] font-bold text-[#9C2542] uppercase">Level 2 Redressal</span>
                  <div className="font-bold text-[#201B1C]">Verdoire Corporate Grievance Officer</div>
                  <p className="text-neutral-600">Direct escalation via email: care@pentagram.expert / grievance@pentagram.expert.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Official Terms & Conditions (T&C) & Service Policies */}
          {activePolicyTab === 'terms' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE0D5] pb-5">
                <div>
                  <span className="text-xs font-bold text-[#9C2542] uppercase tracking-wider block mb-1">
                    Contractual Service Governance
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                    Terms & Conditions (T&C) & Service Agreement
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
                    Legally enforceable terms governing all interior design, manufacturing, and turnkey fitout contracts
                    under <strong className="text-[#201B1C]">{TERMS_AND_CONDITIONS_DATA.legalEntity}</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2.5 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Expand Full Contract (Modal)</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-[#EAE0D5] rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Print T&C"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Corporate Credentials Box */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE0D5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Contracting Entity</span>
                  <span className="font-semibold text-[#201B1C]">{TERMS_AND_CONDITIONS_DATA.legalEntity}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">CIN & GSTIN</span>
                  <span className="font-mono text-neutral-700">{TERMS_AND_CONDITIONS_DATA.cin}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Studio Address</span>
                  <span className="text-neutral-700">{TERMS_AND_CONDITIONS_DATA.registeredStudio}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Jurisdiction</span>
                  <span className="text-[#9C2542] font-semibold">{TERMS_AND_CONDITIONS_DATA.jurisdiction}</span>
                </div>
              </div>

              {/* Search Clauses */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={termsSearchQuery}
                  onChange={(e) => setTermsSearchQuery(e.target.value)}
                  placeholder="Filter clauses (milestones, 45-day delay penalty, 10-year warranty, materials, privacy)..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#EAE0D5] rounded-xl focus:outline-none focus:border-[#9C2542] text-[#201B1C]"
                />
              </div>

              {/* Policy Clauses List */}
              <div className="space-y-3">
                {TERMS_AND_CONDITIONS_DATA.clauses
                  .filter(
                    (c) =>
                      c.title.toLowerCase().includes(termsSearchQuery.toLowerCase()) ||
                      c.summary.toLowerCase().includes(termsSearchQuery.toLowerCase()) ||
                      c.details.some((d) => d.toLowerCase().includes(termsSearchQuery.toLowerCase()))
                  )
                  .map((clause) => {
                    const isExpanded = expandedClauseId === clause.id || termsSearchQuery.length > 0;
                    return (
                      <div
                        key={clause.id}
                        className="bg-white rounded-2xl border border-[#EAE0D5] overflow-hidden transition-all hover:border-[#9C2542]/40"
                      >
                        <button
                          onClick={() => setExpandedClauseId(isExpanded && !termsSearchQuery ? null : clause.id)}
                          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#C69255] bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#EAE0D5]">
                                Clause {clause.number}
                              </span>
                              {clause.badge && (
                                <span className="text-[10px] font-bold text-[#9C2542] uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                  {clause.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="font-serif text-base font-bold text-[#201B1C]">
                              {clause.title}
                            </h4>
                            <p className="text-xs text-neutral-600">{clause.summary}</p>
                          </div>

                          <div className="text-neutral-400 shrink-0 mt-1">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 pt-1 border-t border-neutral-100 bg-[#FAF6F0]/40 space-y-2 text-xs text-neutral-700">
                            {clause.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-[#9C2542] font-bold mt-0.5">•</span>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Modal T&C */}
      <TermsAndConditionsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </section>
  );
};
