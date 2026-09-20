import React, { useState } from 'react';
import { MapPin, Clock, ShieldCheck, Star, ExternalLink, Filter, Sparkles, ChevronRight, X } from 'lucide-react';
import { PROJECT_PORTFOLIO } from '../data/mockData';
import { ProjectPortfolioItem, ServiceableCity, SERVICEABLE_CITIES } from '../types';

interface ProjectsGalleryProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: (society?: string) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  selectedCity,
  onOpenConsultation,
}) => {
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectPortfolioItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  const filteredProjects = PROJECT_PORTFOLIO.filter((proj) => {
    if (cityFilter === 'All') return true;
    return proj.city === cityFilter;
  });

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9C2542] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
              <span>Verified Portfolios Across Delhi NCR</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
              Real Homes Delivered by Pentagram
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Delivered within 45 days backed by QR-tracked modular panels and transparent stage-wise payments.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto bg-[#FAF6F0] p-1.5 rounded-xl border border-[#EAE0D5]">
            <button
              onClick={() => setCityFilter('All')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                cityFilter === 'All' ? 'bg-[#9C2542] text-white shadow-xs' : 'text-neutral-600 hover:text-black'
              }`}
            >
              All Cities
            </button>
            {SERVICEABLE_CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCityFilter(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  cityFilter === c.id ? 'bg-[#9C2542] text-white shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] hover:border-[#9C2542]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-left"
            >
              {/* Featured Image */}
              <div
                onClick={() => {
                  setActiveProject(project);
                  setActiveGalleryIndex(0);
                }}
                className="relative aspect-[16/11] overflow-hidden bg-neutral-100 cursor-pointer"
              >
                <img
                  src={project.featuredImage}
                  alt={`${project.title} - ${project.society}, ${project.city}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* City & Society Tag */}
                <div className="absolute top-3 left-3 bg-[#201B1C]/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C69255]" />
                  <span>{project.city}</span>
                </div>

                {/* Turnaround Badge */}
                <div className="absolute top-3 right-3 bg-white/95 text-[#9C2542] backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{project.timelineDays} Days</span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs text-neutral-300 font-medium">{project.society}</div>
                  <div className="font-serif text-sm font-bold truncate">{project.title}</div>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#9C2542] bg-white px-2 py-0.5 rounded border border-[#EAE0D5]">
                      {project.bhk}
                    </span>
                    <span className="font-bold text-[#201B1C]">{project.budgetRange}</span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights.slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="text-xs text-neutral-600 flex items-start gap-1.5">
                        <span className="text-[#9C2542] font-bold mt-0.5">•</span>
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <div className="p-2.5 bg-white rounded-xl border border-[#EAE0D5] text-[11px] italic text-neutral-700">
                    "{project.testimonial.quote.slice(0, 110)}..."
                    <div className="font-semibold not-italic text-[#201B1C] text-[10px] mt-1">
                      — {project.testimonial.author} ({project.testimonial.verifiedFlat})
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#EAE0D5] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveProject(project);
                      setActiveGalleryIndex(0);
                    }}
                    className="text-xs font-semibold text-[#201B1C] hover:text-[#9C2542] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Gallery ({project.gallery.length} Photos)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9C2542]" />
                  </button>

                  <button
                    onClick={() => onOpenConsultation(`Inspired by ${project.title} (${project.society})`)}
                    className="px-3 py-1.5 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Get Same Look
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-[#EAE0D5] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9C2542]">
                  {activeProject.society}, {activeProject.city}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C]">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Lightbox Photo */}
            <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden">
              <img
                src={activeProject.gallery[activeGalleryIndex]}
                alt={`${activeProject.title} photo ${activeGalleryIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="p-3 bg-neutral-100 flex items-center gap-2 overflow-x-auto">
              {activeProject.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeGalleryIndex === idx ? 'border-[#9C2542] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Modal Footer Info & CTA */}
            <div className="p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-600">
                <span className="font-semibold text-[#201B1C]">Execution Time:</span> {activeProject.timelineDays} Days •{' '}
                <span className="font-semibold text-[#201B1C]">Budget Range:</span> {activeProject.budgetRange}
              </div>

              <button
                onClick={() => {
                  const soc = activeProject.society;
                  setActiveProject(null);
                  onOpenConsultation(`Consultation for ${soc}`);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#9C2542] hover:bg-[#801c34] text-white font-semibold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Book Free Consultation for this Layout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
