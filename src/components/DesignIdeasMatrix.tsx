import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Calculator,
  Calendar,
  Layers,
  Building,
} from 'lucide-react';
import { ROOM_ELEMENT_TYPES, getRoomCityMatrixData } from '../data/mockData';
import { ServiceableCity, SERVICEABLE_CITIES } from '../types';

interface DesignIdeasMatrixProps {
  initialRoom?: string;
  initialCity?: ServiceableCity;
  onOpenConsultation: (details?: string) => void;
  onOpenEstimator: () => void;
}

export const DesignIdeasMatrix: React.FC<DesignIdeasMatrixProps> = ({
  initialRoom = 'Modular Kitchen',
  initialCity = 'Gurgaon',
  onOpenConsultation,
  onOpenEstimator,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string>(initialRoom);
  const [selectedCity, setSelectedCity] = useState<ServiceableCity>(initialCity);

  const landingData = getRoomCityMatrixData(selectedRoom, selectedCity);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F0] border-b border-[#EAE0D5] scroll-mt-16" id="design-ideas-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Meta Bar */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE0D5] text-xs font-bold text-[#9C2542] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Room & City Design Matrix</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            Design Ideas & Price Matrix for Delhi NCR
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Explore 132 dedicated combinations across 22 interior elements and our 6 exclusive service cities.
          </p>
        </div>

        {/* Matrix Selectors Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EAE0D5] shadow-xs mb-10 space-y-4">
          {/* City Selection Bar */}
          <div>
            <span className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-2">
              Step 1: Select Your City (Delhi NCR only)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {SERVICEABLE_CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCity(c.id)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    selectedCity === c.id
                      ? 'bg-[#9C2542] text-white border-[#9C2542] shadow-xs'
                      : 'bg-[#FAF6F0] text-[#201B1C] border-[#EAE0D5] hover:bg-neutral-100'
                  }`}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>

          {/* Room / Element Selection Carousel / Grid */}
          <div>
            <span className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-2">
              Step 2: Select Room or Design Element ({ROOM_ELEMENT_TYPES.length} Available)
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
              {ROOM_ELEMENT_TYPES.map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all border cursor-pointer ${
                    selectedRoom === room
                      ? 'bg-[#201B1C] text-white border-[#201B1C]'
                      : 'bg-[#FAF6F0] text-neutral-700 border-[#EAE0D5] hover:bg-neutral-100'
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated SEO Landing Page View for [Room] in [City] */}
        <div className="bg-white rounded-3xl border border-[#EAE0D5] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Localized Visual & Stats */}
          <div className="lg:col-span-6 bg-[#201B1C] p-6 sm:p-10 flex flex-col justify-between text-white space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181415] border border-[#3b3234] text-xs text-[#C69255] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#9C2542]" />
                <span>Dedicated {selectedCity} Hub</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                {landingData.h1}
              </h3>

              {/* Price & Timeline Ribbon */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#181415] rounded-xl border border-[#2e2627]">
                  <span className="text-[10px] uppercase text-neutral-400 block font-medium">Estimated Pricing</span>
                  <span className="font-serif text-sm font-bold text-white mt-0.5 block">
                    {landingData.pricePerSqFtRange}
                  </span>
                </div>

                <div className="p-3.5 bg-[#181415] rounded-xl border border-[#2e2627]">
                  <span className="text-[10px] uppercase text-neutral-400 block font-medium">Handover Timeline</span>
                  <span className="font-serif text-sm font-bold text-[#C69255] mt-0.5 block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{landingData.averageTimelineDays}</span>
                  </span>
                </div>
              </div>

              {/* Visual Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-800 border border-white/10 shadow-lg">
                <img
                  src={landingData.heroImage}
                  alt={`${selectedRoom} design in ${selectedCity} - Pentagram`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#201B1C]/90 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                  {selectedRoom} • {selectedCity}
                </div>
              </div>
            </div>

            {/* Popular Societies Serviced */}
            <div className="pt-4 border-t border-[#3b3234] space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block">
                Popular Condominiums & Sectors in {selectedCity}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {landingData.popularSocieties.map((soc, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[#181415] text-neutral-300 border border-[#2e2627]"
                  >
                    {soc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Localized SEO Intro, Styles & FAQ Block */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold text-[#9C2542] uppercase tracking-wider">
                  Verified Local Specifications
                </span>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed font-normal">
                  {landingData.localIntro}
                </p>
              </div>

              {/* Design Styles */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#201B1C] uppercase tracking-wider block">
                  Available Aesthetics & Finishes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {landingData.designStyles.map((style, stIdx) => (
                    <span
                      key={stIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF6F0] text-neutral-800 border border-[#EAE0D5] font-medium"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quality & Safety Checkpoints */}
              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] space-y-2 text-xs">
                <div className="font-bold text-[#201B1C] uppercase tracking-wider text-[11px]">
                  Pentagram Guarantee for {selectedCity}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#9C2542]" /> 10-Year Modular Warranty
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#9C2542]" /> Stage-Wise Milestone Payments
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#9C2542]" /> High Quality Raw Materials
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#9C2542]" /> QR-Tracked Factory Panels
                  </div>
                </div>
              </div>

              {/* FAQ Block (Schema FAQPage Compliant) */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-base font-bold text-[#201B1C] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#9C2542]" />
                  <span>{selectedRoom} FAQs in {selectedCity}</span>
                </h4>
                <div className="space-y-2">
                  {landingData.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] text-xs">
                      <div className="font-semibold text-[#201B1C]">{faq.question}</div>
                      <p className="mt-1 text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#EAE0D5] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenConsultation(`${selectedRoom} in ${selectedCity}`)}
                className="w-full sm:w-auto px-5 py-3 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free Site Visit for {selectedCity}</span>
              </button>

              <button
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-[#FAF6F0] text-[#201B1C] border border-[#EAE0D5] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-[#9C2542]" />
                <span>Calculate Itemized Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
