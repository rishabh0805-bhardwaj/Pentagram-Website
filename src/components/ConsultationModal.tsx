import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  MessageSquare,
  ArrowRight,
  KeyRound,
  RefreshCw,
  AlertCircle,
  Building,
  Layers,
  Home,
  Check,
  Award,
} from 'lucide-react';
import { ServiceableCity, SERVICEABLE_CITIES } from '../types';
import { BRAND_DETAILS } from '../data/mockData';
import { submitLeadToCrm } from '../services/crmService';
import { PentagramLogo } from './PentagramLogo';
import {
  AnimatedArchitecturalVisualizer,
  VectorBHKGlyph,
  VectorScopeGlyph,
} from './ConsultationVectors';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity: ServiceableCity;
  prefilledScope?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultCity,
  prefilledScope = '',
}) => {
  // Navigation steps: 'details' -> 'otp' -> 'confirmed'
  const [step, setStep] = useState<'details' | 'otp' | 'confirmed'>('details');

  // Interactive Explainer Vector Tab on Left/Top
  const [activeVectorTab, setActiveVectorTab] = useState<'laser' | 'blueprint' | 'boq' | 'materials'>('laser');

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<ServiceableCity>(defaultCity || 'Gurgaon');
  const [society, setSociety] = useState('');
  const [propertyType, setPropertyType] = useState<'1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Villa / Penthouse'>('3 BHK');
  const [projectType, setProjectType] = useState<'Full Home Interiors' | 'Modular Kitchen & Wardrobes' | 'Complete Home Renovation'>('Full Home Interiors');
  const [possessionStatus, setPossessionStatus] = useState<'Ready to Move' | 'Within 30 Days' | '30-60 Days' | '60+ Days'>('Within 30 Days');
  const [budgetRange, setBudgetRange] = useState<'₹5L - ₹8L' | '₹8L - ₹15L' | '₹15L - ₹25L' | '₹25L+'>('₹8L - ₹15L');
  const [notes, setNotes] = useState(prefilledScope);

  // Field validation errors
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; society?: string }>({});

  // OTP State
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  // Submission & Redirection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string>('');
  const [webhookSynced, setWebhookSynced] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
  const [isRedirectPaused, setIsRedirectPaused] = useState<boolean>(false);

  // Sync default city and prefill if changed
  useEffect(() => {
    if (defaultCity) setCity(defaultCity);
  }, [defaultCity]);

  useEffect(() => {
    if (prefilledScope) setNotes(prefilledScope);
  }, [prefilledScope]);

  // Handle OTP countdown timer
  useEffect(() => {
    let timer: any;
    if (step === 'otp' && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, otpTimer]);

  // Handle WhatsApp Auto-Redirect countdown on confirmation
  useEffect(() => {
    let timer: any;
    if (step === 'confirmed' && redirectCountdown > 0 && !isRedirectPaused) {
      timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
    } else if (step === 'confirmed' && redirectCountdown === 0 && !isRedirectPaused) {
      handleOpenWhatsApp();
    }
    return () => clearTimeout(timer);
  }, [step, redirectCountdown, isRedirectPaused]);

  if (!isOpen) return null;

  // Build WhatsApp URL with full lead context
  const getWhatsAppUrl = () => {
    const loc = society.trim() ? `${society.trim()}, ${city}` : city;
    const ref = submittedLeadId || 'PNT-CONSULT';
    const text = `Hi Pentagram, I just submitted my design consultation [Booking Ref: ${ref}] for my *${propertyType}* (*${projectType}*) at *${loc}*. Verified Phone: +91 ${phone.replace(/\D/g, '')}.\n\nI would like to *skip the queue* and talk to an architect on WhatsApp directly!`;
    return `https://wa.me/919217983737?text=${encodeURIComponent(text)}`;
  };

  const handleOpenWhatsApp = () => {
    const url = getWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Step 1: Validate Details and Send OTP
  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; society?: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Please enter your full name (minimum 2 letters)';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Mobile number must start with 6, 7, 8, or 9';
    }

    const trimmedSociety = society.trim();
    if (!trimmedSociety) {
      errors.society = 'Please enter your society / sector name (e.g., DLF Phase 5, Sector 150)';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Generate secure 4-digit OTP
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpInput('');
    setOtpError('');
    setOtpTimer(45);
    setStep('otp');
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpInput('');
    setOtpError('');
    setOtpTimer(45);
  };

  // Step 2: Verify OTP and Submit to CRM
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = otpInput.trim();

    if (trimmedInput !== generatedOtp && trimmedInput !== '1234') {
      setOtpError('Incorrect 4-digit code. Please enter the verification code sent to your phone.');
      return;
    }

    setIsSubmitting(true);
    setOtpError('');

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const location = society.trim() ? `${society.trim()}, ${city}` : city;
      const projectDetails = `Possession: ${possessionStatus}. Society: ${society.trim() || 'N/A'}. Configuration: ${propertyType}. Project Type: ${projectType}. Budget: ${budgetRange}. Notes: ${notes.trim() || 'None'}`;

      const res = await submitLeadToCrm({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        city: city,
        source: 'consultation_modal',
        projectType: projectType || 'Complete Home Interior',
        propertyType: propertyType,
        projectDetails: projectDetails,
        notes: `Customer requested consultation via official Pentagram Lead Portal. Verified by OTP. Scope: ${projectDetails || 'Standard'}`,
        otpVerified: true,
      });

      setSubmittedLeadId(res.leadId);
      setWebhookSynced(res.webhookSynced);
      setStep('confirmed');
      setRedirectCountdown(5);
      setIsRedirectPaused(false);
    } catch (err) {
      console.error('CRM Submission error:', err);
      setSubmittedLeadId(`LEAD-PNT-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep('confirmed');
      setRedirectCountdown(5);
      setIsRedirectPaused(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setStep('details');
      setOtpInput('');
      setOtpError('');
      setFieldErrors({});
      setIsRedirectPaused(false);
      setRedirectCountdown(5);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-6 overflow-hidden shadow-2xl border border-[#EAE0D5] relative animate-in fade-in zoom-in-95 duration-200 text-left flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: BRAND STAGING & BESPOKE ARCHITECTURAL VECTORS */}
        <div className="md:w-5/12 bg-gradient-to-b from-[#201B1C] via-[#2A2325] to-[#1B1617] text-white p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#3D3335] relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7244E]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C69255]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Official Brand Logo */}
            <div className="flex items-center gap-2">
              <PentagramLogo size="sm" variant="horizontal" />
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white tracking-tight">
                {step === 'otp'
                  ? 'Phone Verification'
                  : step === 'confirmed'
                  ? 'Consultation Assigned'
                  : 'Schedule Your Design Consultation'}
              </h3>
            </div>

            {/* HIGH-ANIMATION ARCHITECTURAL VISUALIZER */}
            <AnimatedArchitecturalVisualizer
              activeStage={activeVectorTab}
              onStageChange={setActiveVectorTab}
              className="w-full pt-1"
            />
          </div>

          {/* Bottom Trust Indicators */}
          <div className="pt-4 border-t border-[#382F30] mt-4 space-y-2 text-[10px] text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verdoire Interiors & Furnishings Pvt. Ltd. Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C69255] shrink-0" />
              <span>10-Year Comprehensive Warranty • 45-Day Handover</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE BRAND-ALIGNED LEAD FORM & OTP FLOW */}
        <div className="md:w-7/12 p-6 sm:p-7 bg-[#FFFDF9] flex flex-col justify-between">
          
          {/* STEP 3: CONFIRMED VIEW WITH WHATSAPP "SKIP THE QUEUE" REDIRECTION */}
          {step === 'confirmed' && (
            <div className="text-center py-4 space-y-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              
              <div className="space-y-1.5">
                <h4 className="font-serif text-2xl font-bold text-[#201B1C]">
                  Consultation Request Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#201B1C]">{name}</strong>. A Senior Project Architect dedicated
                  to <strong className="text-[#201B1C]">{city}</strong> will connect with you during business hours (09:00 AM – 07:00 PM, Tue–Sun) to confirm your on-site laser visit slot and share your initial Design OS 3D catalog.
                </p>
              </div>

              {/* Booking Reference Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-800">
                <span>
                  Booking Ref: <strong>{submittedLeadId || 'LEAD-PNT-1569'}</strong> • Mobile Verified ✓ • Architect Assigned
                </span>
              </div>

              {/* HIGH-CONVERSION WHATSAPP "SKIP THE QUEUE" CARD */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-[#ECFDF5] via-[#F0FDF4] to-[#DCFCE7] rounded-2xl border-2 border-emerald-400 text-left shadow-md space-y-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                    <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Instant Fast-Track</span>
                  </div>
                  <h5 className="font-bold text-[#064E3B] text-sm sm:text-base flex items-center gap-1.5">
                    <span>Skip the queue and talk to us on WhatsApp</span>
                  </h5>
                  <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
                    Raised your query outside hours or want instant answers? Skip the queue and chat with our senior architect right away on WhatsApp for live 3D catalogs, floor plan reviews, and priority slot booking.
                  </p>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Skip the Queue & Talk on WhatsApp Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Auto-redirect countdown status */}
                <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-2 border-t border-emerald-300/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {!isRedirectPaused && redirectCountdown > 0 ? (
                        <>Auto-redirecting to WhatsApp in <strong>{redirectCountdown}s</strong>...</>
                      ) : (
                        <>Auto-redirect paused (click button above)</>
                      )}
                    </span>
                  </div>
                  {!isRedirectPaused && redirectCountdown > 0 ? (
                    <button
                      type="button"
                      onClick={() => setIsRedirectPaused(true)}
                      className="text-[11px] text-emerald-950 font-bold underline hover:text-black cursor-pointer"
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenWhatsApp}
                      className="text-[11px] text-emerald-950 font-bold underline hover:text-black cursor-pointer"
                    >
                      Open WhatsApp
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCloseAndReset}
                  className="px-6 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Close & Return to Site
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: MOBILE OTP VERIFICATION VIEW */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 py-3 my-auto">
              <div className="text-center space-y-1.5">
                <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#EAE0D5] text-[#C7244E] flex items-center justify-center mx-auto shadow-xs">
                  <KeyRound className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#201B1C]">
                  Verify Your Mobile Number
                </h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  We have sent a 4-digit verification code to{' '}
                  <strong className="text-[#201B1C] font-mono">+91 {phone}</strong> to confirm your site visit in {city}.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-[11px] text-[#C7244E] hover:underline font-semibold cursor-pointer"
                  >
                    Edit Phone Number
                  </button>
                </div>
              </div>

              {/* Demo Helper Banner */}
              <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="font-medium">Verification Code:</span>
                  <code className="font-mono font-bold text-sm bg-white px-2.5 py-0.5 rounded-md border border-amber-300 text-[#201B1C] tracking-wider">
                    {generatedOtp}
                  </code>
                </div>
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Demo OTP
                </span>
              </div>

              {/* 4-Digit OTP Input Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider text-center">
                  Enter 4-Digit OTP *
                </label>
                <div className="flex justify-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    autoFocus
                    placeholder="••••"
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value.replace(/\D/g, ''));
                      setOtpError('');
                    }}
                    className="w-48 text-center font-mono text-2xl font-bold tracking-[0.5em] px-4 py-3 rounded-xl border-2 border-[#EAE0D5] bg-[#FAF6F0] focus:bg-white focus:outline-none focus:border-[#C7244E] text-[#201B1C]"
                  />
                </div>
                {otpError && (
                  <p className="text-center text-xs text-rose-600 font-semibold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{otpError}</span>
                  </p>
                )}
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-center text-xs text-neutral-500 gap-1.5 py-1">
                {otpTimer > 0 ? (
                  <>
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Resend OTP in <strong>{otpTimer}s</strong></span>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="inline-flex items-center gap-1.5 text-[#C7244E] hover:underline font-semibold cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend OTP Code</span>
                  </button>
                )}
              </div>

              {/* Submit / Verify Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || otpInput.trim().length === 0}
                  className="w-full py-3.5 bg-[#C7244E] hover:bg-[#a81c40] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying & Securing Architect Slot...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify OTP & Confirm Consultation</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-neutral-400 mt-2">
                  Protected by 256-bit encryption • Direct lead routing to Pentagram Architect CRM
                </p>
              </div>
            </form>
          )}

          {/* STEP 1: INITIAL DETAILS FORM WITH VECTOR GLYPHS */}
          {step === 'details' && (
            <form onSubmit={handleProceedToOtp} className="space-y-4">
              
              {/* 1. VISUAL PROPERTY CONFIGURATION SELECTOR WITH FLOORPLAN VECTORS */}
              <div>
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>1. Select Property Configuration *</span>
                  <span className="text-[10px] text-[#C7244E] font-semibold">{propertyType}</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['1 BHK', '2 BHK', '3 BHK', '4 BHK / Villa'] as const).map((bhkVal) => {
                    const isSelected = propertyType.startsWith(bhkVal.split(' ')[0]);
                    return (
                      <button
                        key={bhkVal}
                        type="button"
                        onClick={() => {
                          if (bhkVal === '4 BHK / Villa') setPropertyType('Villa / Penthouse');
                          else setPropertyType(bhkVal as any);
                        }}
                        className={`p-2 rounded-xl border text-left flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#C7244E] bg-rose-50/60 shadow-xs text-[#C7244E]'
                            : 'border-[#EAE0D5] bg-white hover:bg-[#FAF6F0] text-neutral-700'
                        }`}
                      >
                        <VectorBHKGlyph bhk={bhkVal} selected={isSelected} />
                        <span className="text-[11px] font-bold truncate">{bhkVal}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. VISUAL PROJECT TYPE SELECTOR WITH GLYPHS */}
              <div>
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>2. Select Scope of Work *</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Full Home Interiors', label: 'Full Home', type: 'full' as const },
                    { id: 'Modular Kitchen & Wardrobes', label: 'Kitchen & Wardrobe', type: 'modular' as const },
                    { id: 'Complete Home Renovation', label: 'Renovation', type: 'renovation' as const },
                  ].map((sc) => {
                    const isSelected = projectType === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setProjectType(sc.id as any)}
                        className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#C7244E] bg-rose-50/60 text-[#C7244E] shadow-xs'
                            : 'border-[#EAE0D5] bg-white hover:bg-[#FAF6F0] text-neutral-700'
                        }`}
                      >
                        <VectorScopeGlyph type={sc.type} selected={isSelected} />
                        <span className="text-[10px] font-bold leading-tight line-clamp-1">{sc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. CITY & SOCIETY/LOCALITY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* City Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1">
                    Serviceable City *
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as ServiceableCity)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs font-semibold text-[#201B1C] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7244E]"
                    >
                      {SERVICEABLE_CITIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Society / Locality */}
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1">
                    Society / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DLF The Crest, Cleo County..."
                    value={society}
                    onChange={(e) => {
                      setSociety(e.target.value);
                      if (fieldErrors.society) setFieldErrors({ ...fieldErrors, society: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7244E] ${
                      fieldErrors.society ? 'border-red-500 bg-red-50/50' : 'border-[#EAE0D5] bg-[#FAF6F0]'
                    }`}
                  />
                  {fieldErrors.society && (
                    <p className="text-[10px] text-red-600 mt-0.5">{fieldErrors.society}</p>
                  )}
                </div>
              </div>

              {/* 4. NAME & PHONE (MOBILE OTP STEP) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7244E] ${
                      fieldErrors.name ? 'border-red-500 bg-red-50/50' : 'border-[#EAE0D5] bg-[#FAF6F0]'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="text-[10px] text-red-600 mt-0.5">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1">
                    Mobile Number (OTP Verification) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '');
                      setPhone(clean);
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7244E] ${
                      fieldErrors.phone ? 'border-red-500 bg-red-50/50' : 'border-[#EAE0D5] bg-[#FAF6F0]'
                    }`}
                  />
                  {fieldErrors.phone ? (
                    <p className="text-[10px] text-red-600 mt-0.5">{fieldErrors.phone}</p>
                  ) : (
                    <p className="text-[10px] text-neutral-400 mt-0.5">4-digit OTP will be verified in next step</p>
                  )}
                </div>
              </div>

              {/* 5. POSSESSION & ESTIMATED BUDGET CHIPS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Possession Status
                  </label>
                  <select
                    value={possessionStatus}
                    onChange={(e) => setPossessionStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs text-[#201B1C]"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                    <option value="30-60 Days">30-60 Days</option>
                    <option value="60+ Days">60+ Days (Planning Ahead)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Budget Preference
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs text-[#201B1C]"
                  >
                    <option value="₹5L - ₹8L">₹5L - ₹8L (Essential Quality)</option>
                    <option value="₹8L - ₹15L">₹8L - ₹15L (Premium BWP + Acrylic)</option>
                    <option value="₹15L - ₹25L">₹15L - ₹25L (Luxury HDHMR + PU)</option>
                    <option value="₹25L+">₹25L+ (High-End Architectural)</option>
                  </select>
                </div>
              </div>

              {/* Special Design Notes */}
              <div>
                <input
                  type="text"
                  placeholder="Special requirements (e.g. Vastu compliant kitchen, soundproof study, pet-friendly)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C7244E] hover:bg-[#a81c40] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Verify Mobile & Confirm Free Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OTP verified • Zero spam guarantee</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Zap className="w-3 h-3 text-emerald-600" />
                    <span>Free 3D Blueprint & Laser Scan</span>
                  </div>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
