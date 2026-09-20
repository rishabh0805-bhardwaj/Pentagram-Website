import React from 'react';
import { ArrowRight, Shield, CheckCircle, Sparkles } from 'lucide-react';
import { SERVICE_OFFERINGS } from '../data/mockData';
import { ServiceOffering, ServiceableCity } from '../types';

interface CategoryTilesProps {
  selectedCity: ServiceableCity;
  onSelectService: (service: ServiceOffering) => void;
  onOpenConsultation: () => void;
  onSelectMatrixItem: (room: string, city: ServiceableCity) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  selectedCity,
  onSelectService,
  onOpenConsultation,
  onSelectMatrixItem,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9C2542] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Scope Capabilities</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
              What We Offer in {selectedCity}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              Manufactured with German machinery in our own factory, backed by stage-wise milestone payments and a 10-year
              warranty.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="self-start md:self-auto text-xs font-semibold text-[#9C2542] hover:text-[#801c34] flex items-center gap-1 group cursor-pointer"
          >
            <span>Custom Architecture & Renovation Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_OFFERINGS.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FAF6F0] rounded-2xl border border-[#EAE0D5] hover:border-[#9C2542]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden text-left"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src={service.image}
                  alt={`${service.name} in ${selectedCity} - Pentagram Your Space Expert`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#9C2542] shadow-xs">
                  {service.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#201B1C]/90 text-[#FAF6F0] backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#C69255]" /> {service.warranty}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-serif text-lg font-bold text-[#201B1C] group-hover:text-[#9C2542] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-3 pt-3 border-t border-[#EAE0D5]/70 space-y-1.5">
                    {service.popularFeatures.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                        <CheckCircle className="w-3 h-3 text-[#9C2542] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EAE0D5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase">Starting From</span>
                    <span className="text-xs font-bold text-[#201B1C]">{service.startingPrice}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (service.name.includes('Kitchen')) {
                        onSelectMatrixItem('Modular Kitchen', selectedCity);
                      } else if (service.name.includes('Wardrobe')) {
                        onSelectMatrixItem('Sliding Wardrobe', selectedCity);
                      } else if (service.name.includes('Ceiling')) {
                        onSelectMatrixItem('Living Room False Ceiling', selectedCity);
                      } else if (service.name.includes('Mandir') || service.name.includes('Pooja')) {
                        onSelectMatrixItem('Mandir/Pooja Room Design', selectedCity);
                      } else {
                        onSelectService(service);
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#9C2542] hover:text-white hover:bg-[#9C2542] border border-[#9C2542]/30 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
