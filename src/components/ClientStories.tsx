import React, { useState } from 'react';
import { ShieldCheck, Clock, CheckCircle2, Star, Quote, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { CLIENT_STORIES } from '../data/mockData';
import { ClientStory, ServiceableCity } from '../types';

interface ClientStoriesProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
}

export const ClientStories: React.FC<ClientStoriesProps> = ({
  selectedCity,
  onOpenConsultation,
}) => {
  const [activeStoryId, setActiveStoryId] = useState<string>(CLIENT_STORIES[0].id);
  const [activeViewMode, setActiveViewMode] = useState<'after' | 'before'>('after');

  const currentStory = CLIENT_STORIES.find((s) => s.id === activeStoryId) || CLIENT_STORIES[0];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0] border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE0D5] text-xs font-bold text-[#9C2542] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Editorial Client Journeys</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            Our Stories: Turning Delhi NCR Flats into Forever Homes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Real families, real timelines, and zero contractor friction. Discover how Pentagram Design OS and stage-wise
            milestone payments protected their budget and delivered on time.
          </p>
        </div>

        {/* Story Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-8">
          {CLIENT_STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => {
                setActiveStoryId(story.id);
                setActiveViewMode('after');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                activeStoryId === story.id
                  ? 'bg-[#9C2542] text-white border-[#9C2542] shadow-md'
                  : 'bg-white text-[#201B1C] border-[#EAE0D5] hover:border-neutral-400'
              }`}
            >
              <div className="font-serif font-bold">{story.homeowner}</div>
              <div className="text-[10px] opacity-80">{story.societyAndCity.split(',')[0]}</div>
            </button>
          ))}
        </div>

        {/* Active Story Card */}
        <div className="bg-white rounded-3xl border border-[#EAE0D5] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Visual Before/After Comparison */}
          <div className="lg:col-span-7 bg-[#201B1C] p-6 sm:p-8 flex flex-col justify-between text-white relative">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#C69255] font-semibold">
                <MapPin className="w-4 h-4 text-[#9C2542]" />
                <span>{currentStory.societyAndCity}</span>
              </div>

              {/* View Toggle */}
              <div className="bg-[#181415] p-1 rounded-lg border border-[#3b3234] flex items-center gap-1">
                <button
                  onClick={() => setActiveViewMode('before')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    activeViewMode === 'before'
                      ? 'bg-[#9C2542] text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Raw Site (Before)
                </button>
                <button
                  onClick={() => setActiveViewMode('after')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    activeViewMode === 'after'
                      ? 'bg-[#9C2542] text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Pentagram Handover (After)
                </button>
              </div>
            </div>

            {/* Main Interactive Photo */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6">
              <img
                src={activeViewMode === 'after' ? currentStory.afterImage : currentStory.beforeImage}
                alt={`${currentStory.title} - ${activeViewMode}`}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#201B1C]/90 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {activeViewMode === 'after' ? '✓ Finished Space' : '⚠ Raw Site Condition'}
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-3 text-center border-t border-[#3b3234] pt-4">
              <div className="p-2 bg-[#181415] rounded-xl border border-[#2e2627]">
                <div className="text-[10px] text-neutral-400 uppercase">Turnaround</div>
                <div className="font-serif text-base font-bold text-white flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C69255]" />
                  <span>{currentStory.turnaroundDays} Days</span>
                </div>
              </div>

              <div className="p-2 bg-[#181415] rounded-xl border border-[#2e2627]">
                <div className="text-[10px] text-neutral-400 uppercase">Final Budget</div>
                <div className="font-serif text-base font-bold text-emerald-400">{currentStory.budgetActual}</div>
              </div>

              <div className="p-2 bg-[#181415] rounded-xl border border-[#2e2627]">
                <div className="text-[10px] text-neutral-400 uppercase">Stage Approval</div>
                <div className="font-serif text-base font-bold text-[#C69255] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentStory.milestonesMet} Stages Approved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Client Quote */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#9C2542] uppercase tracking-wider">
                  Case Study Dossier
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201B1C] mt-1 leading-snug">
                  {currentStory.title}
                </h3>
                <div className="text-xs text-neutral-500 font-medium mt-1">
                  Homeowner: {currentStory.homeowner} • {currentStory.bhkType}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {currentStory.narrative}
              </p>

              {/* Design Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#EAE0D5]">
                <div className="text-xs font-bold text-[#201B1C] uppercase tracking-wider">
                  Key Scope Execution:
                </div>
                {currentStory.designHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#9C2542] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote Box */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] relative space-y-2">
              <Quote className="w-6 h-6 text-[#9C2542]/30 absolute top-3 right-3" />
              <p className="text-xs italic text-neutral-800 leading-relaxed font-serif">
                {currentStory.clientQuote}
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] font-bold text-[#201B1C]">{currentStory.homeowner}</div>
                <div className="flex items-center gap-0.5 text-[#C69255]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#C69255]" />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenConsultation}
              className="w-full py-3 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Free Site Consultation for Your Society</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
