import React, { useState } from 'react';
import {
  Play,
  Eye,
  Clock,
  Sparkles,
  X,
  ArrowRight,
  Video,
  Film,
  Tv,
  Bell,
  Radio,
  Zap,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PENTAGRAM_TV_EPISODES } from '../data/mockData';
import { ServiceableCity } from '../types';

interface PentagramTVSectionProps {
  selectedCity: ServiceableCity;
  onOpenConsultation: () => void;
}

export const PentagramTVSection: React.FC<PentagramTVSectionProps> = ({
  selectedCity,
  onOpenConsultation,
}) => {
  const [activeEpisode, setActiveEpisode] = useState<(typeof PENTAGRAM_TV_EPISODES)[0] | null>(null);
  const [notified, setNotified] = useState(false);

  const handleNotifyOnWhatsApp = (episodeTitle?: string) => {
    const text = `Hi Pentagram, I want early VIP access and alerts for *Pentagram TV Original Series* [Premiere Coming Soon]! Please notify me on WhatsApp when ${episodeTitle ? `"${episodeTitle}"` : 'episodes'} air in ${selectedCity}.`;
    const url = `https://wa.me/919217983737?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setNotified(true);
    setTimeout(() => setNotified(false), 5000);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#141011] text-white border-b border-[#2E2426] relative overflow-hidden">
      
      {/* Dynamic Animated Ambient Spotlights */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#C7244E]/25 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#C69255]/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Animated Filmstrip Background Silhouette */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-col justify-between">
        <div className="h-6 w-full border-b border-dashed border-white/40 flex justify-around">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-3 h-4 bg-white/20 rounded-xs inline-block my-1" />
          ))}
        </div>
        <div className="h-6 w-full border-t border-dashed border-white/40 flex justify-around">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-3 h-4 bg-white/20 rounded-xs inline-block my-1" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ULTRA-ANIMATED "COMING SOON" HERO STAGE */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#20181A] via-[#2A1D20] to-[#1C1416] border-2 border-[#C69255]/40 p-6 sm:p-10 mb-14 shadow-2xl">
          
          {/* Animated Glowing Gradient Accent Bar at Top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C7244E] via-[#F59E0B] via-[#C7244E] to-[#C69255] animate-pulse" />

          {/* Background Vector Stage: Cinema Clapperboard & Broadcast Antenna */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Tv className="w-80 h-80 text-white" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Theatrical Animated Coming Soon Announcement */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Animated Live Indicator & Floating Star */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Pulsing Red "COMING SOON" Radar Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7244E]/20 border border-[#C7244E]/60 text-white text-xs font-black uppercase tracking-widest shadow-lg animate-bounce">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C7244E]"></span>
                  </span>
                  <span>PREMIERE COMING SOON</span>
                </div>

                {/* Animated Equalizer Soundwaves */}
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] text-[#C69255]">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#C69255]" />
                  <span className="font-mono font-bold">4K HDR BROADCAST</span>
                  <div className="flex items-end gap-0.5 h-3 ml-1">
                    <span className="w-1 bg-[#C69255] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                    <span className="w-1 bg-[#C7244E] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                    <span className="w-1 bg-[#C69255] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-1.5" />
                    <span className="w-1 bg-white rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-2.5" />
                  </div>
                </div>
              </div>

              {/* Animated Main Headline */}
              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Pentagram TV{' '}
                  <span className="inline-block relative">
                    <span className="bg-gradient-to-r from-[#FF7E95] via-[#F9D49E] to-[#FF7E95] bg-clip-text text-transparent underline decoration-[#C69255] decoration-wavy decoration-2">
                      Coming Soon
                    </span>
                    <Sparkles className="w-6 h-6 text-[#F9D49E] absolute -top-3 -right-6 animate-spin duration-3000 inline" />
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                  The first architectural docuseries unmasking Delhi NCR interior designs. Real 4K home tours across
                  Gurgaon & Noida luxury societies, factory stress tests of boil-proof BWP ply, and unfiltered Design OS budget breakdowns.
                </p>
              </div>

              {/* Animated Feature Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#C69255]" />
                  4K Unfiltered Condominium Tours
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Laboratory Ply & Acrylic Burn Tests
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" />
                  Season 1 Releasing Shortly
                </span>
              </div>
            </div>

            {/* Right Col: Animated VIP Early Access Card */}
            <div className="lg:col-span-4 bg-black/60 backdrop-blur-md rounded-2xl border border-[#C69255]/30 p-5 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C7244E] to-[#8C1432] text-white flex items-center justify-center mx-auto shadow-xl ring-4 ring-[#C7244E]/30 animate-pulse">
                <Bell className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C69255] tracking-wider">
                  VIP Early Access
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  Get Notified When Episode 1 Drops
                </h4>
                <p className="text-xs text-neutral-400">
                  Be the first to watch our premier DLF The Crest home walkthrough and get exclusive architect floor plan downloads.
                </p>
              </div>

              <button
                onClick={() => handleNotifyOnWhatsApp()}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Bell className="w-3.5 h-3.5 fill-white" />
                <span>Notify Me on WhatsApp</span>
              </button>

              {notified && (
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>VIP Access Registered! Check your WhatsApp.</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* SECTION HEADER & CONSULTATION BUTTON */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20181A] border border-[#3E2E31] text-xs font-bold text-[#C69255]">
              <Video className="w-3.5 h-3.5 text-[#C69255]" />
              <span>Season 1 Episode Previews • Premiering Soon</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
              Upcoming Pentagram Studio Episodes
            </h3>
          </div>

          <button
            onClick={onOpenConsultation}
            className="self-start md:self-auto text-xs font-semibold text-[#C69255] hover:text-[#e4b278] flex items-center gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-colors"
          >
            <span>Book On-Site Laser Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* EPISODE CARDS WITH ANIMATED "COMING SOON" SHIMMER BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PENTAGRAM_TV_EPISODES.map((episode) => (
            <div
              key={episode.id}
              onClick={() => setActiveEpisode(episode)}
              className="group bg-[#1C1618] rounded-3xl border border-[#3A2C2F] hover:border-[#C69255] shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col cursor-pointer text-left relative"
            >
              {/* ANIMATED DIAGONAL "COMING SOON" RIBBON OVER EACH VIDEO */}
              <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#C7244E] to-[#9C2542] text-white text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 border border-rose-400/40 animate-pulse">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Coming Soon</span>
                </div>
              </div>

              {/* Thumbnail with Cinematic Overlay */}
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1618] via-black/40 to-transparent" />

                {/* Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#C7244E] text-white flex items-center justify-center shadow-2xl group-hover:scale-115 transition-all ring-4 ring-[#C7244E]/40">
                    <Play className="w-7 h-7 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 bg-black/80 text-[#C69255] border border-[#C69255]/40 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  {episode.tag}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/90 text-white px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#C69255]" />
                  <span>{episode.duration}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="text-[#C69255] font-bold">{episode.city}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Eye className="w-3 h-3" /> {episode.views} Registered Viewers
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#F9D49E] transition-colors leading-snug">
                    {episode.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {episode.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#C7244E] group-hover:text-rose-400 flex items-center gap-1.5 transition-colors">
                    <span>Preview Trailer & Notify Me</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-neutral-500 text-[11px]">Pentagram TV • Original 4K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE "PREMIERE COMING SOON" TRAILER PREVIEW MODAL */}
      <AnimatePresence>
        {activeEpisode && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C1618] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-2 border-[#C69255]/40 relative text-white"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-[#36292C] flex items-center justify-between bg-[#141011]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C7244E]/20 text-[#FF7E95] border border-[#C7244E]/40 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Premiere Coming Soon • {activeEpisode.city}</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-xl font-bold truncate max-w-lg text-white">
                    {activeEpisode.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveEpisode(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player / Coming Soon Stage */}
              <div className="relative aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeEpisode.thumbnail}
                  alt={activeEpisode.title}
                  className="w-full h-full object-cover opacity-40 blur-xs"
                />
                
                {/* Animated Coming Soon Center Screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col items-center justify-center p-6 text-center space-y-3">
                  
                  {/* Glowing Animated Clapperboard Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#C7244E] text-white flex items-center justify-center shadow-2xl ring-8 ring-[#C7244E]/30 animate-pulse">
                    <Play className="w-7 h-7 fill-white ml-0.5" />
                  </div>

                  <div className="space-y-1 max-w-md">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#C69255] font-bold">
                      • FULL EPISODE IN POST-PRODUCTION •
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Premiere Drops on Pentagram TV
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Filmed in 4K HDR across luxury societies in {activeEpisode.city}. Features real material lab tests, structural civil transitions, and Design OS BOQ insights.
                    </p>
                  </div>

                  {/* WhatsApp Notification CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleNotifyOnWhatsApp(activeEpisode.title)}
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Bell className="w-4 h-4 fill-white" />
                      <span>Notify Me on WhatsApp When Live</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 bg-[#141011] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-300 max-w-md">
                  {activeEpisode.description}
                </div>
                <button
                  onClick={() => {
                    setActiveEpisode(null);
                    onOpenConsultation();
                  }}
                  className="px-5 py-2.5 bg-[#C7244E] hover:bg-[#a81c40] text-white text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Book In-Person Site Visit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
