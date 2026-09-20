import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  Building,
  CheckCircle2,
  Copy,
  ExternalLink,
  Printer,
  Scale,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TERMS_AND_CONDITIONS_DATA } from '../data/termsAndConditionsData';
import { PentagramLogo } from './PentagramLogo';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClauseId?: string;
}

export const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isOpen,
  onClose,
  defaultClauseId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(defaultClauseId || null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filteredClauses = TERMS_AND_CONDITIONS_DATA.clauses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyDetails = () => {
    const text = `${TERMS_AND_CONDITIONS_DATA.title}\nEntity: ${TERMS_AND_CONDITIONS_DATA.legalEntity} (CIN: ${TERMS_AND_CONDITIONS_DATA.cin}, GSTIN: ${TERMS_AND_CONDITIONS_DATA.gstin})\nStudio: ${TERMS_AND_CONDITIONS_DATA.registeredStudio}\nJurisdiction: ${TERMS_AND_CONDITIONS_DATA.jurisdiction}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#EAE0D5] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#201B1C] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#362f30]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C7244E]/30 text-[#FF8DA3] border border-[#C7244E]/50 text-[10px] font-bold uppercase tracking-wider">
                Official Legal Policies
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                CIN: {TERMS_AND_CONDITIONS_DATA.cin}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              Terms & Conditions (T&C) & Service Agreement
            </h2>
            <p className="text-xs text-neutral-300">
              Contractual governance backed by <strong className="text-white">{TERMS_AND_CONDITIONS_DATA.legalEntity}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print T&C"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legal Identity Strip */}
        <div className="bg-[#FAF6F0] p-4 border-b border-[#EAE0D5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-700">
            <Scale className="w-4 h-4 text-[#C69255] shrink-0" />
            <span>
              <strong>Registered Studio:</strong> {TERMS_AND_CONDITIONS_DATA.registeredStudio}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDetails}
              className="text-[11px] font-semibold text-[#C7244E] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Entity Details Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Corporate Credentials</span>
                </>
              )}
            </button>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 font-mono text-[11px]">
              Jurisdiction: {TERMS_AND_CONDITIONS_DATA.jurisdiction}
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-[#EAE0D5] bg-white flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clauses (e.g. milestone payments, warranty, delay penalty, materials)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl focus:outline-none focus:border-[#C7244E] text-[#201B1C]"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-neutral-500 hover:text-neutral-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Clauses Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-neutral-100 flex-1">
          {filteredClauses.map((clause) => {
            const isExpanded = expandedClauseId === clause.id || searchQuery.length > 0;
            return (
              <div key={clause.id} className="pt-4 first:pt-0">
                <button
                  onClick={() => setExpandedClauseId(isExpanded && !searchQuery ? null : clause.id)}
                  className="w-full flex items-start justify-between text-left gap-4 p-3 rounded-2xl hover:bg-[#FAF6F0] transition-colors cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C69255] bg-neutral-100 px-2 py-0.5 rounded">
                        Clause {clause.number}
                      </span>
                      {clause.badge && (
                        <span className="text-[10px] font-bold text-[#C7244E] uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          {clause.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#201B1C] group-hover:text-[#C7244E] transition-colors">
                      {clause.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {clause.summary}
                    </p>
                  </div>

                  <div className="text-neutral-400 group-hover:text-[#C7244E] shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-2 pl-5 pr-3 pb-3 space-y-2 text-xs text-neutral-700 bg-[#FAF6F0]/60 rounded-xl p-4 border border-[#EAE0D5]/70">
                    {clause.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#C7244E] font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filteredClauses.length === 0 && (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No matching clause found for "{searchQuery}". Try searching for "payments", "warranty", or "timeline".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF6F0] border-t border-[#EAE0D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-600">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Every clause is legally binding in client contracts issued under Verdoire Interiors & Furnishings Pvt. Ltd.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-[#201B1C] hover:bg-black text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
