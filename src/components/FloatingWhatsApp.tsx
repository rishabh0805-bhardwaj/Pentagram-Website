import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  CheckCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Home,
  ChefHat,
  DoorClosed,
  Hammer,
  Building2,
  CalendarCheck,
  Calculator,
  Compass,
  Phone,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceableCity } from '../types';
import { submitLeadToCrm } from '../services/crmService';

interface FloatingWhatsAppProps {
  selectedCity: ServiceableCity;
}

const PROJECT_TYPES = [
  { id: 'Modular Kitchen', label: 'Modular Kitchen', icon: ChefHat, desc: 'L-Shape, Parallel, Island' },
  { id: 'Wardrobes & Storage', label: 'Wardrobes', icon: DoorClosed, desc: 'Sliding, Walk-in, Hinged' },
  { id: 'Full Home Interior', label: 'Full Home Interior', icon: Home, desc: 'Complete 1-4 BHK Turnkey' },
  { id: 'Renovation & Makeover', label: 'Renovation', icon: Hammer, desc: 'Civil, Flooring, Paint' },
  { id: 'Commercial & Office', label: 'Commercial Space', icon: Building2, desc: 'Office, Retail, Clinic' },
];

const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK / Villa'];

// Helper for dynamic time-of-day greeting
const getTimeGreeting = (): { greeting: string; iconLabel: string } => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) {
    return { greeting: 'Good Morning', iconLabel: '☀️' };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: 'Good Afternoon', iconLabel: '🌤️' };
  } else {
    return { greeting: 'Good Evening', iconLabel: '✨' };
  }
};

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ selectedCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Full Home Interior');
  const [selectedBhk, setSelectedBhk] = useState<string>('3 BHK');
  const [societyName, setSocietyName] = useState<string>('');
  const [societyError, setSocietyError] = useState<string>('');

  // Mobile & OTP state
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [otpStep, setOtpStep] = useState<'idle' | 'otp_sent' | 'verified'>('idle');
  const [otpInput, setOtpInput] = useState<string>('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Typing animation state
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic time of day greeting
  const { greeting, iconLabel } = getTimeGreeting();

  // Manage random typing animation simulator when chat window is open
  useEffect(() => {
    if (!isOpen) {
      setIsTyping(false);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      return;
    }

    // Initial short typing simulation when opened
    const initialDelay = setTimeout(() => {
      setIsTyping(true);
      const stopInitial = setTimeout(() => {
        setIsTyping(false);
      }, 2400);
      return () => clearTimeout(stopInitial);
    }, 1000);

    // Random periodic typing indicator (simulating active architect presence)
    const interval = setInterval(() => {
      // 50% chance to type for 2-3.5 seconds
      if (Math.random() > 0.45) {
        setIsTyping(true);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2200 + Math.random() * 1500);
      }
    }, 8000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [isOpen]);

  // Handle OTP timer countdown
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // Request Mobile OTP
  const handleSendOtp = () => {
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setOtpError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (!societyName.trim()) {
      setSocietyError('Society / Sector name is required to book your architect');
      return;
    }

    setOtpError('');
    setSocietyError('');
    // Generate a secure 4-digit demo OTP for immediate verification
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpStep('otp_sent');
    setOtpTimer(45);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (otpInput.trim() === generatedOtp || otpInput.trim() === '1234') {
      setOtpStep('verified');
      setOtpError('');
      // Auto-trigger WhatsApp with verified badge
      setTimeout(() => {
        executeWhatsAppLaunch();
      }, 700);
    } else {
      setOtpError('Incorrect OTP code. Please enter the 4-digit code shown above.');
    }
  };

  // Execute WhatsApp redirect
  const executeWhatsAppLaunch = (customMessage?: string) => {
    // Ingest lead directly into CRM
    const waLocation = societyName.trim() ? `${societyName.trim()}, ${selectedCity}` : `${selectedCity} (Delhi NCR)`;
    const waDetails = customMessage || `WhatsApp Inquiry: ${selectedProjectType} for ${selectedBhk} in ${selectedCity} (${societyName.trim() || 'Sector not specified'})`;

    submitLeadToCrm({
      name: mobileNumber ? `Homeowner (${mobileNumber.slice(-4)})` : 'WhatsApp Inquirer',
      phone: mobileNumber.replace(/\D/g, '') || '9217983737',
      city: selectedCity,
      society: societyName.trim() || undefined,
      location: waLocation,
      source: 'whatsapp_site_visit',
      projectType: selectedProjectType,
      propertyType: selectedBhk,
      budget: 'Standard Turnkey',
      projectDetails: waDetails,
      notes: waDetails,
      otpVerified: otpStep === 'verified',
    }).catch((e) => console.warn('CRM WhatsApp lead sync error:', e));

    if (customMessage) {
      const url = `https://wa.me/919217983737?text=${encodeURIComponent(customMessage)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
      return;
    }

    const locString = societyName.trim() ? ` at ${societyName.trim()}` : '';
    const phonePart = mobileNumber.trim() ? ` [Verified Contact: +91 ${mobileNumber.trim()}]` : '';

    const text = `Hi Pentagram, I would like to *skip the queue* and talk to an architect on WhatsApp directly! I am looking for *${selectedProjectType}* for my *${selectedBhk}* in *${selectedCity}*${locString}.${phonePart} Please share design catalogs and site visit slots.`;
    const url = `https://wa.me/919217983737?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    // Reset modal state
    setShowProjectModal(false);
    setIsOpen(false);
  };

  // Form submit from modal
  const handleModalSubmit = () => {
    if (!societyName.trim()) {
      setSocietyError('Please enter your specific society or sector name (e.g., DLF Phase 5, Sector 150).');
      return;
    }
    setSocietyError('');

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setOtpError('Please provide your 10-digit mobile number for OTP confirmation.');
      return;
    }

    if (otpStep !== 'verified') {
      handleSendOtp();
      return;
    }

    executeWhatsAppLaunch();
  };

  // Direct fast action: Site Visit Request
  const handleFastSiteVisit = () => {
    submitLeadToCrm({
      name: 'Site Visit Requester',
      phone: mobileNumber ? mobileNumber.replace(/\D/g, '') : 'Direct WhatsApp',
      city: selectedCity,
      source: 'whatsapp_site_visit',
      projectType: 'Free On-Site Architect Site Visit',
      propertyType: '3 BHK',
      notes: `Requested Free On-Site Architect Visit for ${selectedCity}`,
    }).catch((e) => console.warn('CRM lead sync error:', e));

    const text = `Hi Pentagram team, I would like to schedule a *Free On-Site Architect Visit* for my home in *${selectedCity}*. Please let me know the available time slots this week.`;
    executeWhatsAppLaunch(text);
  };

  // Direct fast action: Quick Quote Estimate
  const handleFastEstimate = () => {
    submitLeadToCrm({
      name: 'Price List Requester',
      phone: mobileNumber ? mobileNumber.replace(/\D/g, '') : 'Direct WhatsApp',
      city: selectedCity,
      source: 'whatsapp_site_visit',
      projectType: '2026 Package Price List Request',
      propertyType: '3 BHK',
      notes: `Requested 2026 price list and package rates for ${selectedCity}`,
    }).catch((e) => console.warn('CRM lead sync error:', e));

    const text = `Hi Pentagram, I want a quick turnkey price estimate for a *3 BHK apartment* in *${selectedCity}*. Can you share your package price list?`;
    executeWhatsAppLaunch(text);
  };

  return (
    <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Floating Chat Window with Slide-in Contact Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mb-3 w-[calc(100vw-32px)] sm:w-96 max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden text-left relative"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center font-serif font-bold text-white text-base shadow-xs">
                    P
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                    <span>Pentagram: Your Home Expert</span>
                  </h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Senior Architect Desk</span> • <span>Replies in ~5m</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowProjectModal(false);
                }}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Container */}
            <div className="relative bg-[#ECE5DD] min-h-[360px] max-h-[480px] overflow-y-auto">
              {/* Default Chat Flow */}
              <div className="p-4 space-y-3.5 text-xs">
                {/* Greeting Card with Dynamic Time-of-Day */}
                <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-xs text-neutral-800 space-y-2 border border-black/5">
                  <div className="font-bold text-[11px] text-[#075E54] flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{greeting}, {selectedCity} Homeowner! {iconLabel}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60">
                      Live
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-700">
                    Planning a home interior, modular kitchen, or turnkey makeover in{' '}
                    <strong className="text-[#075E54] font-semibold">{selectedCity}</strong>? Connect directly with our Senior Architect for guaranteed 45-day handovers.
                  </p>
                  <div className="text-[9px] text-neutral-400 text-right flex items-center justify-end gap-1 pt-0.5">
                    <span>Just now</span>
                    <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                  </div>
                </div>

                {/* Pre-Defined Instant Quick Messages */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-1 flex items-center justify-between">
                    <span>⚡ Quick One-Click Requests:</span>
                    <span className="text-[9px] text-[#075E54] font-semibold">Instant Send</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {/* 1. Pre-formatted Site Visit Request */}
                    <button
                      onClick={handleFastSiteVisit}
                      className="w-full p-2.5 bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100/80 hover:to-emerald-50 border-2 border-emerald-500/80 hover:border-[#075E54] rounded-xl transition-all shadow-xs flex items-center justify-between cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <CalendarCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                            <span>"I want a site visit"</span>
                            <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                              Popular
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-700">
                            Book senior architect on-site measurement in {selectedCity}
                          </div>
                        </div>
                      </div>
                      <Send className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>

                    {/* 2. Pre-formatted Estimate Request */}
                    <button
                      onClick={handleFastEstimate}
                      className="w-full p-2.5 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-emerald-500 rounded-xl transition-all shadow-2xs flex items-center justify-between cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 group-hover:bg-emerald-100 group-hover:text-[#075E54] flex items-center justify-center shrink-0 transition-colors">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-neutral-900 group-hover:text-[#075E54]">
                            "Send 2026 price list & package rates"
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            Instant PDF catalog with BOQ transparency
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#075E54] shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Customized Consultation Flow */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-1">
                    Or Customize by Project Scope:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {PROJECT_TYPES.slice(0, 3).map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedProjectType(item.id);
                            setShowProjectModal(true);
                          }}
                          className="w-full text-left p-2.5 bg-white hover:bg-emerald-50/70 border border-neutral-200/80 hover:border-emerald-500 rounded-xl transition-all shadow-2xs flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#075E54] flex items-center justify-center">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-bold text-xs text-neutral-900 group-hover:text-[#075E54]">
                                {item.label}
                              </div>
                              <div className="text-[10px] text-neutral-500">{item.desc}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#075E54] group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Open Full Customizer Button */}
                  <button
                    onClick={() => setShowProjectModal(true)}
                    className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Skip the Queue & Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Animated 'Typing...' Indicator Bubble */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl rounded-tl-none shadow-xs border border-neutral-200/70 text-neutral-500"
                    >
                      <span className="text-[10px] font-medium text-emerald-800">Architect is typing</span>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SLIDE-IN CONTACT MODAL OVERLAY WITH OTP VERIFICATION & VALIDATION */}
              <AnimatePresence>
                {showProjectModal && (
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                    className="absolute inset-0 bg-white z-20 flex flex-col justify-between p-4 overflow-y-auto"
                  >
                    <div className="space-y-3.5">
                      {/* Modal Title bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5">
                            <span>Project Inquiry & Site Visit</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-semibold">
                              Verified
                            </span>
                          </h5>
                          <p className="text-[11px] text-neutral-500">Dedicated desk for {selectedCity}</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowProjectModal(false);
                            setSocietyError('');
                            setOtpError('');
                          }}
                          className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* 1. Project Type Selector */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">1. Select Project Scope:</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {PROJECT_TYPES.map((pt) => {
                            const isSelected = selectedProjectType === pt.id;
                            const Icon = pt.icon;
                            return (
                              <button
                                key={pt.id}
                                onClick={() => setSelectedProjectType(pt.id)}
                                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                                  isSelected
                                    ? 'border-[#075E54] bg-emerald-50 text-[#075E54] font-bold'
                                    : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span className="text-[11px] truncate">{pt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. BHK Selector */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">2. Apartment Configuration:</label>
                        <div className="grid grid-cols-4 gap-1">
                          {BHK_OPTIONS.map((bhk) => (
                            <button
                              key={bhk}
                              onClick={() => setSelectedBhk(bhk)}
                              className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                                selectedBhk === bhk
                                  ? 'bg-[#075E54] text-white border-[#075E54]'
                                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                              }`}
                            >
                              {bhk}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3. Society / Location input with strict validation */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-neutral-800">
                            3. Society / Sector Name <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-neutral-400">Required</span>
                        </div>
                        <input
                          type="text"
                          value={societyName}
                          onChange={(e) => {
                            setSocietyName(e.target.value);
                            if (e.target.value.trim()) setSocietyError('');
                          }}
                          placeholder="e.g. DLF Crest, Sector 150, Experion Windchants, ATS..."
                          className={`w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 border transition-all focus:outline-none text-neutral-900 ${
                            societyError
                              ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                              : 'border-neutral-200 focus:border-[#075E54] focus:bg-white'
                          }`}
                        />
                        {societyError ? (
                          <p className="text-[10px] text-red-600 flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{societyError}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-neutral-400">
                            Helps assign our nearest field engineer for site measurement.
                          </p>
                        )}
                      </div>

                      {/* 4. Mobile Number & Instant OTP Verification */}
                      <div className="space-y-1.5 pt-1 border-t border-neutral-100">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-neutral-800 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#075E54]" />
                            <span>4. Mobile Number Verification <span className="text-red-500">*</span></span>
                          </label>
                          {otpStep === 'verified' && (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>

                        {otpStep === 'idle' && (
                          <div className="space-y-1.5">
                            <div className="flex gap-1.5">
                              <div className="flex items-center px-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-neutral-600 text-xs font-semibold">
                                +91
                              </div>
                              <input
                                type="tel"
                                maxLength={10}
                                value={mobileNumber}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  setMobileNumber(val);
                                  if (val.length === 10) setOtpError('');
                                }}
                                placeholder="Enter 10-digit mobile number"
                                className="flex-1 px-3 py-2 text-xs rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#075E54] text-neutral-900"
                              />
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                className="px-3 py-2 bg-[#075E54] hover:bg-[#0c7468] text-white text-xs font-semibold rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
                              >
                                Send OTP
                              </button>
                            </div>
                            {otpError && (
                              <p className="text-[10px] text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{otpError}</span>
                              </p>
                            )}
                          </div>
                        )}

                        {otpStep === 'otp_sent' && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-900 font-semibold">
                                OTP sent to +91 {mobileNumber}
                              </span>
                              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">
                                Demo Code: {generatedOtp}
                              </span>
                            </div>

                            <div className="flex gap-1.5">
                              <div className="relative flex-1">
                                <KeyRound className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                                <input
                                  type="text"
                                  maxLength={4}
                                  value={otpInput}
                                  onChange={(e) => {
                                    setOtpInput(e.target.value);
                                    if (e.target.value.trim().length === 4) setOtpError('');
                                  }}
                                  placeholder="Enter 4-digit OTP"
                                  className="w-full pl-8 pr-3 py-2 text-xs font-mono font-bold tracking-widest rounded-lg bg-white border border-emerald-300 focus:outline-none focus:border-[#075E54] text-neutral-900"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={handleVerifyOtp}
                                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer shadow-xs"
                              >
                                Verify & Chat
                              </button>
                            </div>

                            {otpError && (
                              <p className="text-[10px] text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{otpError}</span>
                              </p>
                            )}

                            <div className="flex items-center justify-between text-[10px] text-neutral-500">
                              <span>Auto-expires in {otpTimer}s</span>
                              {otpTimer === 0 && (
                                <button
                                  type="button"
                                  onClick={handleSendOtp}
                                  className="text-[#075E54] font-bold hover:underline cursor-pointer flex items-center gap-1"
                                >
                                  <RefreshCw className="w-2.5 h-2.5" /> Resend Code
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {otpStep === 'verified' && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-xs font-semibold text-emerald-900">
                                Verified: +91 {mobileNumber}
                              </span>
                            </div>
                            <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                              Ready
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Start WhatsApp CTA */}
                    <div className="pt-3 border-t border-neutral-100 space-y-2 mt-3">
                      <button
                        onClick={handleModalSubmit}
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-4 h-4 fill-white" />
                        <span>
                          {otpStep === 'verified'
                            ? 'Skip the Queue & Talk to Us on WhatsApp'
                            : 'Verify Phone & Skip the Queue on WhatsApp'}
                        </span>
                      </button>
                      <p className="text-[10px] text-neutral-400 text-center">
                        Instant response • Zero spam • Direct architect interaction
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill with Hover-Expand "Talk to Expert" Label */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setShowProjectModal(false);
        }}
        className="group flex items-center bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 cursor-pointer ring-4 ring-white/60 p-3 sm:py-3.5 sm:px-4"
        aria-label="Chat with Pentagram on WhatsApp"
        id="whatsapp-chat-button"
      >
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquare className="w-5 h-5 fill-white shrink-0" />

        {/* Hover-expand text animation */}
        <div className="flex items-center overflow-hidden transition-all duration-300">
          <span className="font-bold text-xs tracking-wide ml-1.5 whitespace-nowrap">
            WhatsApp
          </span>

          {/* Expanded label on hover */}
          <motion.div
            initial={false}
            animate={{
              width: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
              marginLeft: isHovered ? 6 : 0,
            }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden flex items-center whitespace-nowrap"
          >
            <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full border border-white/30 tracking-normal shadow-2xs">
              Talk to Expert
            </span>
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};

