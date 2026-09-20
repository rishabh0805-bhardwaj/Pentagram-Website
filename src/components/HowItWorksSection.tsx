import React from 'react';
import {
  Compass,
  Wrench,
  Sparkles,
  ArrowRight,
  Calculator,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { ServiceableCity } from '../types';
import { PentagramLogo } from './PentagramLogo';

interface HowItWorksSectionProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  onNavigateToProjects: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  selectedCity,
  onOpenConsultation,
  onOpenEstimator,
  onNavigateToProjects,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F0] min-h-[80vh] border-b border-[#EAE0D5] relative overflow-hidden">
      {/* Architectural Compass & Drafting Grid Watermark */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
        <Compass className="w-96 h-96 text-[#201B1C]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* WORKING STAGE NOTICE BANNER */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          
          {/* Working Stage Animated Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            <Wrench className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Workflow Guide • Under Working Stage</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#201B1C] tracking-tight">
            How Pentagram Works?
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            We are configuring this interactive step-by-step section to show the exact homeowner journey from on-site 3D laser scanning to 45-day key handover. Custom walkthrough modules will be finalized here shortly.
          </p>

          <div className="p-4 rounded-2xl bg-white border border-[#EAE0D5] shadow-xs text-xs text-neutral-500 max-w-lg mx-auto flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#C69255] shrink-0" />
            <span>This section is currently under active working stage as requested.</span>
          </div>
        </div>

        {/* BLUEPRINT WIREFRAME PLACEHOLDER OF THE 5 PROPOSED PHASES */}
        <div className="mt-14 pt-8 border-t border-[#EAE0D5]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C7244E]">
                Blueprint Preview
              </span>
              <h3 className="font-serif text-lg font-bold text-[#201B1C]">
                Planned 5-Stage Architectural Pipeline
              </h3>
            </div>
            <span className="text-xs bg-neutral-200/80 text-neutral-700 px-2.5 py-1 rounded-md font-mono text-[11px]">
              Stage: In Review
            </span>
          </div>

          {/* 5 Wireframe Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'On-Site 3D Laser Scan',
                desc: '±1mm laser dimension capture and structural feasibility check at your flat.',
                badge: 'Laser Stage',
              },
              {
                step: '02',
                title: 'Design OS 3D Blueprint',
                desc: 'Photorealistic VR rendering, furniture layout, and custom electrical conduit map.',
                badge: 'CAD Stage',
              },
              {
                step: '03',
                title: 'Doorstep Material Box',
                desc: 'Touch and feel physical swatches: BWP marine ply, acrylics, and Blum hardware.',
                badge: 'Material Stage',
              },
              {
                step: '04',
                title: 'Precision Factory Build',
                desc: 'Computerized CNC cutting, zero-dust edge banding, and pre-fit modular assembly.',
                badge: 'Factory Stage',
              },
              {
                step: '05',
                title: '45-Day Handover & 10Y Care',
                desc: 'Snag-free move-in with guaranteed on-time handover and 10-year warranty certificate.',
                badge: 'Handover Stage',
              },
            ].map((st, i) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-white/80 border-2 border-dashed border-[#D5C7B8] hover:border-[#C7244E] transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C69255] bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#EAE0D5]">
                      Stage {st.step}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">WIP</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#201B1C] group-hover:text-[#C7244E] transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-dashed border-[#EAE0D5] flex items-center justify-between text-[10px] text-neutral-400">
                  <span>{st.badge}</span>
                  <Layers className="w-3 h-3 text-[#C69255]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS WHILE IN WORKING STAGE */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE0D5] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-[#201B1C]">
              Ready to explore your space while this page is finalized?
            </h4>
            <p className="text-xs text-neutral-600">
              Calculate realistic budgets via Pentagram Design OS or book an on-site laser visit today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onOpenEstimator}
              className="px-4 py-2.5 rounded-xl border border-[#C7244E] text-[#C7244E] hover:bg-rose-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Cost Calculator</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 rounded-xl bg-[#C7244E] hover:bg-[#a81c40] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Site Visit</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
