import React from 'react';
import { BRAND_ROW_1, BRAND_ROW_2 } from './BrandLogos';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface BrandsWeTrustTickerProps {
  className?: string;
  showTitle?: boolean;
}

export const BrandsWeTrustTicker: React.FC<BrandsWeTrustTickerProps> = ({
  className = '',
  showTitle = true,
}) => {
  // Duplicate arrays to ensure seamless loop without any gap
  const row1Repeated = [...BRAND_ROW_1, ...BRAND_ROW_1, ...BRAND_ROW_1];
  const row2Repeated = [...BRAND_ROW_2, ...BRAND_ROW_2, ...BRAND_ROW_2];

  return (
    <div
      id="brands-we-trust-broadcast-ticker"
      className={`relative w-full overflow-hidden bg-[#141011] text-white border-y border-[#342729] shadow-2xl py-6 sm:py-8 ${className}`}
    >
      {/* Dynamic News Channel Ambient Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(199,36,78,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Header Banner (News Broadcast Style) */}
      {showTitle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2C2123]">
            <div className="flex items-center gap-3">
              {/* News Channel "LIVE" Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C7244E] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                <span>OEM LIVE TICKER</span>
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Brands That We Trust</span>
                  <Sparkles className="w-4 h-4 text-[#C69255]" />
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-normal">
                  100% Genuine Materials Directly Procured From Certified Manufacturers
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Counterfeit Guarantee</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-600" />
              <div className="text-[#C69255] font-semibold">55+ Verified Brand Partners</div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Keyframes for High-Speed Dual-Direction Marquee */}
      <style>{`
        @keyframes ticker-l-to-r {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes ticker-r-to-l {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-ticker-l-to-r {
          animation: ticker-l-to-r 42s linear infinite;
        }

        .animate-ticker-r-to-l {
          animation: ticker-r-to-l 42s linear infinite;
        }

        .animate-ticker-l-to-r:hover,
        .animate-ticker-r-to-l:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Edge Gradient Fades for Broadcast News Aesthetic */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#141011] via-[#141011]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#141011] via-[#141011]/90 to-transparent z-20 pointer-events-none" />

      {/* TRACK 1: LEFT TO RIGHT (28 BRANDS) */}
      <div className="relative w-full overflow-hidden py-2.5 sm:py-3 border-b border-[#251B1D]">
        <div className="flex w-max items-center animate-ticker-l-to-r">
          {row1Repeated.map((brand, idx) => (
            <div
              key={`row1-${brand.id}-${idx}`}
              className="flex items-center justify-center mx-6 sm:mx-8 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
              title={brand.name}
            >
              <brand.Component className="h-7 sm:h-8 md:h-9 w-auto opacity-90 hover:opacity-100 drop-shadow-md" />
            </div>
          ))}
        </div>
      </div>

      {/* TRACK 2: RIGHT TO LEFT (27 BRANDS) */}
      <div className="relative w-full overflow-hidden py-2.5 sm:py-3 pt-3.5 sm:pt-4">
        <div className="flex w-max items-center animate-ticker-r-to-l">
          {row2Repeated.map((brand, idx) => (
            <div
              key={`row2-${brand.id}-${idx}`}
              className="flex items-center justify-center mx-6 sm:mx-8 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
              title={brand.name}
            >
              <brand.Component className="h-7 sm:h-8 md:h-9 w-auto opacity-90 hover:opacity-100 drop-shadow-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ticker Tagline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-3 border-t border-[#251B1D] flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Procured in factory-sealed packaging with manufacturer QR codes and barcode verification.</span>
        </div>
        <span className="text-[#C69255] font-semibold mt-1 sm:mt-0">
          Raw Materials • German Hardware • Premium Surfaces • Electricals • Luxury Bath
        </span>
      </div>
    </div>
  );
};
