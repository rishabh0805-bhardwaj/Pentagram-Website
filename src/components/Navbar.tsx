import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Menu,
  X,
  Calculator,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_OFFERINGS, ROOM_ELEMENT_TYPES, BRAND_DETAILS } from '../data/mockData';
import { NavigationPage, ServiceableCity } from '../types';
import { PentagramLogo } from './PentagramLogo';

interface NavbarProps {
  activePage: NavigationPage;
  onNavigate?: (page: NavigationPage) => void;
  setActivePage?: (page: NavigationPage) => void;
  selectedCity: ServiceableCity;
  onSelectCity?: (city: ServiceableCity) => void;
  setSelectedCity?: (city: ServiceableCity) => void;
  onOpenConsultation: () => void;
  onOpenEstimator?: () => void;
  onSelectMatrixItem?: (room: string, city: ServiceableCity) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  setActivePage,
  selectedCity,
  onSelectCity,
  setSelectedCity,
  onOpenConsultation,
  onOpenEstimator,
  onSelectMatrixItem,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [offeringsDropdownOpen, setOfferingsDropdownOpen] = useState(false);
  const [designIdeasDropdownOpen, setDesignIdeasDropdownOpen] = useState(false);

  const navigate = (page: NavigationPage) => {
    if (onNavigate) onNavigate(page);
    else if (setActivePage) setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EAE0D5] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Official Uploaded Pentagram Emblem */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none shrink-0"
            id="brand-logo-btn"
            title="Pentagram: Your Home Expert"
          >
            <PentagramLogo size="md" variant="horizontal" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#C7244E] bg-white font-bold shadow-2xs'
                  : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
            >
              Home
            </button>

            {/* Offerings Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOfferingsDropdownOpen(true)}
              onMouseLeave={() => setOfferingsDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('categories')}
                className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg flex items-center gap-1 cursor-pointer ${
                  activePage === 'categories' || (activePage as any) === 'offerings'
                    ? 'text-[#C7244E] font-bold'
                    : 'text-[#201B1C] hover:text-[#C7244E]'
                }`}
              >
                What We Offer <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              <AnimatePresence>
                {offeringsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-[#EAE0D5] p-3 z-50"
                  >
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1.5">
                      Interiors & Turnkey
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {SERVICE_OFFERINGS.map((svc) => (
                        <button
                          key={svc.id}
                          onClick={() => {
                            navigate('categories');
                            setOfferingsDropdownOpen(false);
                          }}
                          className="text-left px-3 py-2 rounded-xl hover:bg-[#FAF6F0] group flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span className="text-xs font-semibold text-[#201B1C] group-hover:text-[#C7244E] transition-colors">
                            {svc.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#C7244E] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Design Ideas Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesignIdeasDropdownOpen(true)}
              onMouseLeave={() => setDesignIdeasDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('design-ideas')}
                className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg flex items-center gap-1 cursor-pointer ${
                  activePage === 'design-ideas' ? 'text-[#C7244E] font-bold' : 'text-[#201B1C] hover:text-[#C7244E]'
                }`}
              >
                Design Ideas <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              <AnimatePresence>
                {designIdeasDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-16 w-[520px] bg-white rounded-2xl shadow-2xl border border-[#EAE0D5] p-4 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                      <div>
                        <span className="text-xs font-bold text-[#C7244E] uppercase tracking-wider">
                          Design Ideas by Room
                        </span>
                        <p className="text-[11px] text-neutral-500">
                          Custom room layouts tailored for modern Delhi NCR apartments
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 max-h-72 overflow-y-auto pr-1">
                      {ROOM_ELEMENT_TYPES.map((room) => (
                        <button
                          key={room}
                          onClick={() => {
                            if (onSelectMatrixItem) {
                              onSelectMatrixItem(room, selectedCity);
                            } else {
                              navigate('design-ideas');
                            }
                            setDesignIdeasDropdownOpen(false);
                          }}
                          className="text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:text-[#C7244E] hover:bg-[#FAF6F0] transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{room}</span>
                          <span className="text-[10px] text-neutral-400">View →</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigate('projects')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer ${
                activePage === 'projects' ? 'text-[#C7244E] font-bold' : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
            >
              Our Projects
            </button>

            <button
              onClick={() => navigate('stories')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer ${
                activePage === 'stories' ? 'text-[#C7244E] font-bold' : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
            >
              Client Stories
            </button>

            <button
              onClick={() => navigate('why-us')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer ${
                activePage === 'why-us' ? 'text-[#C7244E] font-bold' : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
            >
              Why Us & Trust
            </button>

            {/* NEW: How It Works? (Working Stage) */}
            <button
              onClick={() => navigate('how-it-works')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer flex items-center gap-1 ${
                activePage === 'how-it-works' ? 'text-[#C7244E] font-bold bg-white shadow-2xs' : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
              title="How It Works? (Under Working Stage)"
            >
              <span>How It Works?</span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded-full">
                WIP
              </span>
            </button>

            <button
              onClick={() => navigate('magazine')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer relative ${
                activePage === 'magazine' ? 'text-[#C7244E] font-bold' : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
            >
              Magazine
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded-full">
                Live
              </span>
            </button>

            <button
              onClick={() => navigate('pentagram-tv')}
              className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-colors rounded-lg cursor-pointer flex items-center gap-1.5 ${
                activePage === 'pentagram-tv' ? 'text-[#C7244E] font-bold' : 'text-[#201B1C] hover:text-[#C7244E]'
              }`}
            >
              <span>Pentagram TV</span>
              <span className="px-1.5 py-0.5 bg-gradient-to-r from-[#C7244E] to-[#E11D48] text-white text-[9px] font-black uppercase tracking-wider rounded-full shadow-xs animate-pulse">
                Coming Soon
              </span>
            </button>
          </nav>

          {/* Action CTAs: Cost Calculator & Book Free Visit */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* 1. Cost Calculator Button (Requested) */}
            <button
              onClick={() => {
                if (onOpenEstimator) onOpenEstimator();
                else navigate('estimator');
              }}
              className="px-4 py-2.5 text-xs font-bold text-[#C7244E] bg-white border border-[#C7244E]/30 hover:border-[#C7244E] hover:bg-rose-50/50 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="Calculate estimated interior budget via Pentagram Design OS"
              id="nav-estimator-btn"
            >
              <Calculator className="w-4 h-4 text-[#C7244E]" />
              <span>Cost Calculator</span>
            </button>

            {/* 2. Book Free Visit CTA */}
            <button
              onClick={onOpenConsultation}
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#C7244E] hover:bg-[#a81c40] rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              id="nav-consultation-btn"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Visit</span>
            </button>
          </div>

          {/* Mobile Hamburger & Cost Calc Shortcut */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                if (onOpenEstimator) onOpenEstimator();
                else navigate('estimator');
              }}
              className="px-2.5 py-1.5 text-[11px] font-bold text-[#C7244E] bg-white border border-[#C7244E]/30 rounded-lg flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculator</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#EAE0D5] px-4 pt-3 pb-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => navigate('home')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left font-bold text-[#201B1C]"
              >
                Home
              </button>
              <button
                onClick={() => navigate('categories')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700"
              >
                What We Offer
              </button>
              <button
                onClick={() => navigate('projects')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700"
              >
                Our Projects
              </button>
              <button
                onClick={() => navigate('stories')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700"
              >
                Client Stories
              </button>
              <button
                onClick={() => navigate('design-ideas')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700"
              >
                Design Ideas
              </button>
              <button
                onClick={() => navigate('why-us')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700"
              >
                Why Us & Trust
              </button>
              <button
                onClick={() => navigate('how-it-works')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700 flex items-center justify-between"
              >
                <span>How It Works?</span>
                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded-full">
                  WIP
                </span>
              </button>
              <button
                onClick={() => navigate('magazine')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700"
              >
                Magazine (Live)
              </button>
              <button
                onClick={() => navigate('pentagram-tv')}
                className="p-2.5 rounded-xl bg-[#FAF6F0] text-left text-neutral-700 flex items-center justify-between"
              >
                <span>Pentagram TV</span>
                <span className="px-1.5 py-0.5 bg-[#C7244E] text-white text-[9px] font-bold rounded-full animate-pulse">
                  Coming Soon
                </span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  if (onOpenEstimator) onOpenEstimator();
                  else navigate('estimator');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-white text-[#C7244E] border border-[#C7244E] text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Interior Cost</span>
              </button>

              <button
                onClick={() => {
                  onOpenConsultation();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#C7244E] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Site Visit</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
