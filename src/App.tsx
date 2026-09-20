import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowUp,
  MapPin,
  Shield,
  ChevronRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceableCity, NavigationPage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HappyHomeSection } from './components/HappyHomeSection';
import { CategoryTiles } from './components/CategoryTiles';
import { DesignOSEstimator } from './components/DesignOSEstimator';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ClientStories } from './components/ClientStories';
import { WhyUsSection } from './components/WhyUsSection';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { MagazineHub } from './components/MagazineHub';
import { DesignIdeasMatrix } from './components/DesignIdeasMatrix';
import { PentagramTVSection } from './components/PentagramTVSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutUsSection } from './components/AboutUsSection';
import { TrustCenterSection } from './components/TrustCenterSection';
import { SeoGeoContentBlock } from './components/SeoGeoContentBlock';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<ServiceableCity>('Gurgaon');
  const [activePage, setActivePage] = useState<NavigationPage>('home');
  const [matrixInitialRoom, setMatrixInitialRoom] = useState<string>('Modular Kitchen');
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationPrefill, setConsultationPrefill] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Track scroll position for "Back to top"
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenConsultation = (prefill: string = '') => {
    setConsultationPrefill(prefill);
    setIsConsultationOpen(true);
  };

  const handleNavigate = (page: NavigationPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMatrixItem = (room: string, city: ServiceableCity) => {
    setMatrixInitialRoom(room);
    setSelectedCity(city);
    setActivePage('design-ideas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#201B1C] flex flex-col font-sans selection:bg-[#C7244E] selection:text-white">
      {/* Top Notification Bar for Strict Delhi NCR Scope */}
      <div className="bg-[#201B1C] text-[#FAF6F0] text-[11px] py-1.5 px-4 border-b border-[#362f30] flex flex-wrap items-center justify-center gap-2 max-w-7xl mx-auto w-full text-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Exclusively Servicing <strong>Delhi NCR</strong> (Gurgaon, Noida, Greater Noida, Faridabad, Delhi & New Delhi).
          </span>
          <span className="hidden md:inline text-neutral-400">|</span>
          <span className="hidden md:inline text-[#C69255] font-semibold">
            45-Day Handover Guaranteed • 10-Yr Warranty
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation(`Consultation inquiry for ${selectedCity}`)}
      />

      {/* Page Routing / Views with Motion Animation */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* HOME VIEW: Pure Joyful, Uplifting, Happy Home */}
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Free Site Visit in ${selectedCity}`)}
                onOpenEstimator={() => handleNavigate('estimator')}
                onNavigateToProjects={() => handleNavigate('projects')}
              />

              <HappyHomeSection
                selectedCity={selectedCity}
                onNavigate={handleNavigate}
                onOpenConsultation={() => handleOpenConsultation(`Joyful Home Consultation in ${selectedCity}`)}
                onOpenEstimator={() => handleNavigate('estimator')}
                onSelectMatrixItem={handleSelectMatrixItem}
              />
            </motion.div>
          )}

          {/* STANDALONE CATEGORIES VIEW */}
          {activePage === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <CategoryTiles
                selectedCity={selectedCity}
                onSelectService={(service) => {
                  handleOpenConsultation(`Inquiry for ${service.name} in ${selectedCity}`);
                }}
                onOpenConsultation={() => handleOpenConsultation(`Category consultation in ${selectedCity}`)}
                onSelectMatrixItem={handleSelectMatrixItem}
              />
              <DesignIdeasMatrix
                initialRoom={matrixInitialRoom}
                initialCity={selectedCity}
                onOpenConsultation={handleOpenConsultation}
                onOpenEstimator={() => handleNavigate('estimator')}
              />
            </motion.div>
          )}

          {/* STANDALONE PROJECTS GALLERY VIEW */}
          {activePage === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <ProjectsGallery selectedCity={selectedCity} onOpenConsultation={handleOpenConsultation} />
            </motion.div>
          )}

          {/* STANDALONE CLIENT STORIES VIEW */}
          {activePage === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <ClientStories
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Client story consultation in ${selectedCity}`)}
              />
            </motion.div>
          )}

          {/* STANDALONE WHY US VIEW */}
          {activePage === 'why-us' && (
            <motion.div
              key="why-us"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <WhyUsSection
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Why Pentagram in ${selectedCity}`)}
                onOpenEstimator={() => handleNavigate('estimator')}
              />
            </motion.div>
          )}

          {/* STANDALONE HOW IT WORKS VIEW (WORKING STAGE) */}
          {activePage === 'how-it-works' && (
            <motion.div
              key="how-it-works"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <HowItWorksSection
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`How It Works enquiry in ${selectedCity}`)}
                onOpenEstimator={() => handleNavigate('estimator')}
                onNavigateToProjects={() => handleNavigate('projects')}
              />
            </motion.div>
          )}

          {/* STANDALONE SPECIALITIES VIEW */}
          {activePage === 'specialities' && (
            <motion.div
              key="specialities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <SpecialitiesSection
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Speciality enquiry in ${selectedCity}`)}
                onOpenEstimator={() => handleNavigate('estimator')}
              />
            </motion.div>
          )}

          {/* STANDALONE DESIGN OS ESTIMATOR VIEW */}
          {activePage === 'estimator' && (
            <motion.div
              key="estimator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <DesignOSEstimator initialCity={selectedCity} onOpenConsultation={handleOpenConsultation} />
            </motion.div>
          )}

          {/* STANDALONE MAGAZINE VIEW (LIVE WITH LIVE SEARCH & EXPANDED GUIDES) */}
          {activePage === 'magazine' && (
            <motion.div
              key="magazine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <MagazineHub
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Magazine inquiry in ${selectedCity}`)}
                onSelectMatrixItem={handleSelectMatrixItem}
              />
            </motion.div>
          )}

          {/* STANDALONE DESIGN IDEAS MATRIX VIEW */}
          {activePage === 'design-ideas' && (
            <motion.div
              key="design-ideas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <DesignIdeasMatrix
                initialRoom={matrixInitialRoom}
                initialCity={selectedCity}
                onOpenConsultation={handleOpenConsultation}
                onOpenEstimator={() => handleNavigate('estimator')}
              />
            </motion.div>
          )}

          {/* STANDALONE PENTAGRAM TV VIEW */}
          {activePage === 'pentagram-tv' && (
            <motion.div
              key="pentagram-tv"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <PentagramTVSection
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Video consultation in ${selectedCity}`)}
              />
            </motion.div>
          )}

          {/* STANDALONE ABOUT US VIEW */}
          {activePage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <AboutUsSection
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`About Verdoire enquiry in ${selectedCity}`)}
                onOpenEstimator={() => handleNavigate('estimator')}
              />
            </motion.div>
          )}

          {/* STANDALONE TRUST CENTRE VIEW */}
          {activePage === 'trust-centre' && (
            <motion.div
              key="trust-centre"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              <TrustCenterSection
                selectedCity={selectedCity}
                onOpenConsultation={() => handleOpenConsultation(`Policy enquiry in ${selectedCity}`)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Automated SEO & GEO Regional Content Generator with Schema.org & 6 City FAQs */}
      <SeoGeoContentBlock
        activePage={activePage}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Persistent Mega-Menu Footer with full navigation links */}
      <Footer
        setActivePage={handleNavigate}
        onSelectMatrixItem={handleSelectMatrixItem}
        onOpenConsultation={() => handleOpenConsultation(`Footer consultation in ${selectedCity}`)}
        onOpenEstimator={() => handleNavigate('estimator')}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* Floating Interactive WhatsApp Widget with Quick Chats */}
      <FloatingWhatsApp selectedCity={selectedCity} />

      {/* Floating Back-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-24 right-5 z-30 w-10 h-10 rounded-full bg-white text-[#201B1C] shadow-lg border border-[#EAE0D5] hover:bg-[#FAF6F0] flex items-center justify-center transition-all cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 text-[#C7244E]" />
        </button>
      )}

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultCity={selectedCity}
        prefilledScope={consultationPrefill}
      />
    </div>
  );
}
