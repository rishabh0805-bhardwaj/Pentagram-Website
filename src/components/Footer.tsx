import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  Star,
  Clock,
  MessageSquare,
  ShieldCheck,
  Check,
  Copy,
  Map,
  Navigation,
} from 'lucide-react';
import { BRAND_DETAILS, ROOM_ELEMENT_TYPES } from '../data/mockData';
import { NavigationPage, SERVICEABLE_CITIES, ServiceableCity } from '../types';
import { PentagramLogo } from './PentagramLogo';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import { BrandsWeTrustTicker } from './BrandsWeTrustTicker';

interface FooterProps {
  setActivePage: (page: NavigationPage) => void;
  onSelectMatrixItem: (room: string, city: ServiceableCity) => void;
  onOpenConsultation: () => void;
  onOpenEstimator: () => void;
  selectedCity?: ServiceableCity;
  onSelectCity?: (city: ServiceableCity) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActivePage,
  onSelectMatrixItem,
  onOpenConsultation,
  onOpenEstimator,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [seoLinksExpanded, setSeoLinksExpanded] = useState(false);
  const [copiedCIN, setCopiedCIN] = useState(false);
  const [copiedGSTIN, setCopiedGSTIN] = useState(false);
  const [showMapEmbed, setShowMapEmbed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleCopy = (field: 'cin' | 'gstin', text: string) => {
    navigator.clipboard.writeText(text);
    if (field === 'cin') {
      setCopiedCIN(true);
      setTimeout(() => setCopiedCIN(false), 2500);
    } else {
      setCopiedGSTIN(true);
      setTimeout(() => setCopiedGSTIN(false), 2500);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#201B1C] text-[#FAF6F0] border-t border-[#362f30] relative overflow-hidden">
      {/* Brands That We Trust News Channel Ticker Strip */}
      <BrandsWeTrustTicker showTitle={true} />

      {/* Top Value Strip */}
      <div className="border-b border-[#362f30] bg-[#1a1617] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C7244E]/20 border border-[#C7244E] flex items-center justify-center text-[#C7244E]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Stage-Wise Milestones</div>
              <div className="text-xs text-neutral-400">Pay as work progresses</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C7244E]/20 border border-[#C7244E] flex items-center justify-center text-[#C7244E]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">45-Day Handover</div>
              <div className="text-xs text-neutral-400">Move-in delay penalty backed</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C7244E]/20 border border-[#C7244E] flex items-center justify-center text-[#C7244E]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">10-Year Warranty</div>
              <div className="text-xs text-neutral-400">High quality raw materials & ply</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C7244E]/20 border border-[#C7244E] flex items-center justify-center text-[#C69255]">
              <Star className="w-5 h-5 fill-[#C69255] text-[#C69255]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">4.93 / 5 Rating</div>
              <div className="text-xs text-neutral-400">1,240+ verified Delhi NCR homes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mega-Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="cursor-pointer" onClick={() => setActivePage('home')}>
              <PentagramLogo size="md" variant="horizontal" theme="dark" />
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              PENTAGRAM: YOUR HOME EXPERT is the flagship residential interior and modular design brand of{' '}
              <strong className="text-white font-semibold">Verdoire Interiors & Furnishings Pvt. Ltd.</strong> Delivering
              joyful, precision-engineered homes across Delhi NCR.
            </p>

            {/* Corporate Registration & Flagship Experience Studio */}
            <div className="bg-gradient-to-br from-[#1E181A] via-[#241B1E] to-[#181315] p-4 rounded-2xl border border-[#C69255]/40 hover:border-[#C69255]/80 transition-all duration-300 shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#C7244E]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Verified Entity Header */}
              <div className="border-b border-[#3b2e31] pb-2.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#C69255] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C69255] shrink-0" />
                  <span>Official Registered Corporate Entity</span>
                </div>
                <div className="font-serif text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
                  Verdoire Interiors & Furnishings Pvt. Ltd.
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  Govt. of India MCA Registered • Flagship Brand: Pentagram
                </div>
              </div>

              {/* Registration Identifiers (CIN & GSTIN) */}
              <div className="grid grid-cols-1 gap-1.5 text-[11px]">
                <div className="flex items-center justify-between bg-[#141011] px-2.5 py-1.5 rounded-xl border border-[#2d2325]">
                  <span className="text-neutral-400 text-[10px] font-medium">CIN:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-200 font-mono text-[10px] tracking-wider">{BRAND_DETAILS.cin}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('cin', BRAND_DETAILS.cin)}
                      className="text-neutral-400 hover:text-[#C69255] p-1 transition-colors cursor-pointer"
                      title="Copy CIN"
                    >
                      {copiedCIN ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#141011] px-2.5 py-1.5 rounded-xl border border-[#2d2325]">
                  <span className="text-neutral-400 text-[10px] font-medium">GSTIN:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-200 font-mono text-[10px] tracking-wider">{BRAND_DETAILS.gstin}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('gstin', BRAND_DETAILS.gstin)}
                      className="text-neutral-400 hover:text-[#C69255] p-1 transition-colors cursor-pointer"
                      title="Copy GSTIN"
                    >
                      {copiedGSTIN ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Studio Address */}
              <div className="space-y-1 pt-1 border-t border-[#3b2e31]">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#C69255] uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#C7244E] shrink-0" />
                  <span>Flagship Experience Studio</span>
                </div>
                <p className="text-xs text-neutral-200 leading-snug font-medium pl-5">
                  Pentagram, Opp DLF Alameda, Sector 73, Gurugram Haryana
                </p>
                <div className="pl-5 text-[10px] text-neutral-400">
                  Open Tue–Sun: 09:00 AM – 07:00 PM IST (Monday Closed)
                </div>
              </div>

              {/* Google Maps Actions & Embed Toggle */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pentagram,+Opp+DLF+Alameda,+Sector+73,+Gurugram+Haryana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#C7244E] hover:bg-[#A81B3F] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowMapEmbed(!showMapEmbed)}
                    className="px-2.5 py-2 rounded-xl bg-[#282022] hover:bg-[#342a2d] text-neutral-200 border border-[#3f3235] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title={showMapEmbed ? 'Hide interactive map' : 'Preview Google Maps location'}
                  >
                    <Map className="w-3.5 h-3.5 text-[#C69255]" />
                    <span>{showMapEmbed ? 'Hide Map' : 'Map View'}</span>
                  </button>
                </div>

                {/* Expandable Google Maps Embed */}
                {showMapEmbed && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#3f3235] bg-[#120e0f] shadow-inner">
                    <iframe
                      title="Pentagram Gurugram Studio - Opp DLF Alameda, Sector 73, Gurugram Haryana"
                      src="https://maps.google.com/maps?q=Pentagram%2C%20Opp%20DLF%20Alameda%2C%20Sector%2073%2C%20Gurugram%20Haryana&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="160"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full"
                    />
                    <div className="px-2.5 py-1.5 bg-[#171213] text-[10px] text-neutral-300 flex items-center justify-between">
                      <span className="truncate pr-2">Opp DLF Alameda, Sector 73</span>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Pentagram,+Opp+DLF+Alameda,+Sector+73,+Gurugram+Haryana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C69255] hover:underline flex items-center gap-0.5 shrink-0"
                      >
                        Directions
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-neutral-200">Connect on Social Media:</div>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND_DETAILS.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#181415] hover:bg-[#1877F2] text-xs text-white border border-[#2d2627] transition-all flex items-center gap-1.5"
                  title="Facebook: pentagramexpert"
                >
                  <span>Facebook</span>
                </a>
                <a
                  href={BRAND_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#181415] hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] text-xs text-white border border-[#2d2627] transition-all flex items-center gap-1.5"
                  title="Instagram: @pentagram.expert"
                >
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: What We Offer */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-[#362f30] pb-2">
              What We Offer
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => onSelectMatrixItem('Modular Kitchen', 'Gurgaon')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Modular Kitchens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectMatrixItem('Sliding Wardrobe', 'Noida')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Wardrobes & Storage
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('categories')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer font-medium text-white"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> View All Categories →
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectMatrixItem('Living Room False Ceiling', 'Delhi')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> False Ceiling & Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectMatrixItem('Mandir/Pooja Room Design', 'Delhi')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Mandir / Pooja Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectMatrixItem('Small Bathroom Design', 'Gurgaon')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Luxury Bathrooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectMatrixItem("Kids' Bedroom Design", 'Greater Noida')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Kids' Bedroom Concepts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectMatrixItem('L-Shape Kitchen', 'Faridabad')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> L-Shape & Island Kitchens
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore & Stories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-[#362f30] pb-2">
              Explore & Media
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => setActivePage('projects')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Our Projects Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('stories')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Client Stories (Before/After)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('magazine')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer font-medium text-emerald-300"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-400" /> Magazine & Guides (Live)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('pentagram-tv')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Pentagram TV (4K Video Tours)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('design-ideas')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Room × City Design Ideas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('estimator');
                    onOpenEstimator();
                  }}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 text-[#C69255] font-semibold cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Design OS Cost Calculator
                </button>
              </li>
            </ul>

            <div className="pt-2 text-xs text-neutral-400">
              <div className="text-neutral-300 font-semibold mb-1">Customer Reviews</div>
              <div className="flex items-center gap-1 text-[#C69255]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C69255]" />
                ))}
                <span className="text-white font-bold ml-1">4.93 / 5.0</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">1,240+ verified Google Reviews across Delhi NCR</p>
            </div>
          </div>

          {/* Column 4: Why Us & Trust */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-[#362f30] pb-2">
              Why Us & Trust
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => setActivePage('why-us')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Why Pentagram (70/30 Model)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('specialities')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Signature Specialities
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> About Us & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('trust-centre')}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Trust Centre & Policies
                </button>
              </li>
              <li>
                <a
                  href={BRAND_DETAILS.trustCenterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C69255] transition-colors flex items-center gap-1.5 text-neutral-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" />
                  <span>Official Policies (Live)</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_DETAILS.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C69255] transition-colors flex items-center gap-1.5 text-neutral-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" />
                  <span>Terms & Conditions</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="hover:text-[#C69255] transition-colors text-left flex items-center gap-1.5 cursor-pointer text-[#C7244E] font-semibold"
                >
                  <ChevronRight className="w-3 h-3 text-[#C7244E]" /> Book Free Design Session
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact, WhatsApp & Experience Studios */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase border-b border-[#362f30] pb-2">
              Get in Touch
            </h4>

            <div className="space-y-3 text-xs text-neutral-300">
              {/* WhatsApp Button */}
              <a
                href={BRAND_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C7244E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-neutral-400">Call Us (Delhi NCR):</div>
                  <a
                    href={`tel:${BRAND_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="text-white hover:text-[#C69255] font-bold text-sm"
                  >
                    {BRAND_DETAILS.formattedPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C7244E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-neutral-400">Email Us:</div>
                  <a
                    href={`mailto:${BRAND_DETAILS.email}`}
                    className="text-white hover:text-[#C69255] font-semibold"
                  >
                    {BRAND_DETAILS.email}
                  </a>
                </div>
              </div>

              {/* Experience Studios */}
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#C7244E] shrink-0 mt-0.5" />
                <div className="text-[11px] text-neutral-400 space-y-1.5">
                  <div>
                    <strong className="text-white">Gurugram Studio:</strong>
                    <div className="text-neutral-300">Pentagram, Opp DLF Alameda, Sector 73, Gurugram Haryana</div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Pentagram,+Opp+DLF+Alameda,+Sector+73,+Gurugram+Haryana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C69255] hover:underline text-[10px] inline-flex items-center gap-0.5 mt-0.5"
                    >
                      <span>Directions on Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div>
                    <strong className="text-white">Noida Studio:</strong> Sector 62, Expressway
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-neutral-300 mb-1.5">NCR Design Digest:</div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  className="bg-[#181415] border border-[#3b3233] text-xs text-white px-2.5 py-1.5 rounded-lg flex-1 focus:outline-none focus:border-[#C7244E]"
                />
                <button
                  type="submit"
                  className="bg-[#C7244E] hover:bg-[#a81c40] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
              {newsletterSuccess && (
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Subscribed!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4.5: Dense SEO Link Block (Room × 6 Serviceable Cities Matrix) */}
        <div className="mt-12 pt-8 border-t border-[#362f30]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                Delhi NCR Interior Design Directory — Popular Searches
              </h4>
              <p className="text-xs text-neutral-400">
                Explore dedicated landing pages across our 6 serviceable cities: Gurgaon, Noida, Greater Noida, Faridabad, Delhi, and New Delhi.
              </p>
            </div>
            <button
              onClick={() => setSeoLinksExpanded(!seoLinksExpanded)}
              className="text-xs font-semibold text-[#C69255] hover:underline self-start sm:self-auto cursor-pointer"
            >
              {seoLinksExpanded ? 'Show Less Links ▲' : 'Expand All 132 City Links ▼'}
            </button>
          </div>

          {/* Render matrix links */}
          <div
            className={`text-[11px] leading-relaxed text-neutral-400 space-x-1.5 transition-all overflow-hidden ${
              seoLinksExpanded ? 'max-h-none' : 'max-h-24'
            }`}
          >
            {ROOM_ELEMENT_TYPES.map((room) =>
              SERVICEABLE_CITIES.map((cityObj) => (
                <span key={`${room}-${cityObj.id}`} className="inline-block whitespace-nowrap mb-1">
                  <button
                    onClick={() => onSelectMatrixItem(room, cityObj.id)}
                    className="hover:text-[#FAF6F0] hover:underline text-neutral-400 transition-colors cursor-pointer"
                  >
                    {room} {cityObj.id}
                  </button>
                  <span className="text-neutral-600 ml-1.5">|</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* NAP & Legal Bottom Line */}
        <div className="mt-10 pt-6 border-t border-[#2d2627] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-medium">Verdoire Interiors & Furnishings Pvt. Ltd.</strong> All rights reserved. 
            <span className="block sm:inline sm:ml-2 text-neutral-500">
              PENTAGRAM: YOUR HOME EXPERT is a registered trading brand.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="text-neutral-500">Service Area: Gurgaon • Noida • Greater Noida • Faridabad • Delhi • New Delhi</span>
            <button
              onClick={() => setActivePage('why-us')}
              className="hover:text-white text-neutral-300 font-medium cursor-pointer transition-colors"
            >
              Why Us & Trust
            </button>
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-[#C69255] hover:text-[#e0ab6f] font-medium cursor-pointer transition-colors"
            >
              Terms & Policies (T&C)
            </button>
            <a
              href={BRAND_DETAILS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook
            </a>
            <a
              href={BRAND_DETAILS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram (@pentagram.expert)
            </a>
          </div>
        </div>
      </div>

      {/* Contractual Terms & Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </footer>
  );
};
