import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
  Phone,
  PhoneCall,
  MessageSquare,
  Lock,
  Calendar,
  Check,
  Building,
  RotateCcw,
  Sliders,
  ChevronRight,
  AlertCircle,
  X,
  FileText,
  BadgePercent,
  CheckCircle,
  Hammer,
  Clock,
  Home,
  UserCheck,
  Zap,
  MapPin,
  Flame,
  Gift,
} from 'lucide-react';
import { ServiceableCity, SERVICEABLE_CITIES } from '../types';
import {
  InteriorPackage,
  PropertyType,
  RequirementType,
  KitchenDesignShape,
  TVUnitSize,
  CalculatorState,
  LeadData,
} from '../calculator/types';
import {
  PRICING_CONFIG,
  CAMPAIGN_CONFIG,
  PENTAGRAM_WHATSAPP_CONFIG,
  calculateInteriorEstimate,
  formatIndianCurrency,
  trackEvent,
  PACKAGE_SPECIFICATIONS,
} from '../calculator/pricingEngine';
import { submitLeadToCrm } from '../services/crmService';

interface DesignOSEstimatorProps {
  initialCity?: ServiceableCity;
  onOpenConsultation: (details?: string) => void;
}

// Preset standard carpet areas for property types (user can edit anytime)
const DEFAULT_AREA_BY_PROPERTY: Record<PropertyType, number> = {
  '1 BHK': 650,
  '2 BHK': 1100,
  '3 BHK': 1750,
  '4 BHK': 2600,
  'Independent Home': 3200,
  'Villa': 4500,
};

export const DesignOSEstimator: React.FC<DesignOSEstimatorProps> = ({
  initialCity = 'Gurgaon',
  onOpenConsultation,
}) => {
  // Step 1 = Package & Home
  // Step 2 = Requirements
  // Step 3 = Configure Details
  // Step 4 = Unlock Estimate (Lead Gate: Name, Phone, Email)
  // Step 5 = Estimate Result (Prices revealed!)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Core Calculator State
  const [selectedCity, setSelectedCity] = useState<ServiceableCity>(initialCity);
  const [selectedPackage, setSelectedPackage] = useState<InteriorPackage>('premium');
  const [propertyType, setPropertyType] = useState<PropertyType>('3 BHK');
  const [propertyArea, setPropertyArea] = useState<number>(1750);
  const [areaInputStr, setAreaInputStr] = useState<string>('1750');

  // Requirements (Wallpaper is strictly excluded)
  const [selectedRequirements, setSelectedRequirements] = useState<RequirementType[]>([
    'kitchen',
    'wardrobes',
    'tvUnit',
    'storage',
    'falseCeiling',
    'painting',
    'electrical',
  ]);

  // Requirement Configurations
  const [kitchenShape, setKitchenShape] = useState<KitchenDesignShape>('L-Shape');
  const [kitchenL1, setKitchenL1] = useState<number>(10);
  const [kitchenL2, setKitchenL2] = useState<number>(6);
  const [kitchenL3, setKitchenL3] = useState<number>(8);
  const [kitchenLoft, setKitchenLoft] = useState<boolean>(false);

  const [wardrobeCount, setWardrobeCount] = useState<number>(3);
  const [wardrobeLoft, setWardrobeLoft] = useState<boolean>(false);

  const [tvCount, setTvCount] = useState<number>(1);
  const [tvSize, setTvSize] = useState<TVUnitSize>('large');

  const [storageCount, setStorageCount] = useState<number>(1);

  // Lead Gate Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [isLeadUnlocked, setIsLeadUnlocked] = useState(false);

  // Very First Option: New Home or Renovation
  const [projectScope, setProjectScope] = useState<'new_home' | 'renovation'>('new_home');

  // Renovation Form States
  const [renovName, setRenovName] = useState('');
  const [renovPhone, setRenovPhone] = useState('');
  const [renovEmail, setRenovEmail] = useState('');
  const [renovCity, setRenovCity] = useState<ServiceableCity>(initialCity);
  const [renovPropertyType, setRenovPropertyType] = useState<string>('3 BHK Apartment');
  const [renovScopes, setRenovScopes] = useState<string[]>([
    'Modular Kitchen Overhaul',
    'Wardrobes & Woodwork',
  ]);
  const [renovAge, setRenovAge] = useState<string>('5 - 15 Years');
  const [renovCallTime, setRenovCallTime] = useState<string>('Morning (10 AM - 1 PM)');
  const [renovNotes, setRenovNotes] = useState('');
  const [renovSubmitted, setRenovSubmitted] = useState(false);
  const [renovErrors, setRenovErrors] = useState<{ name?: string; phone?: string }>({});

  const handleToggleRenovScope = (scope: string) => {
    setRenovScopes((prev) =>
      prev.includes(scope) ? (prev.length > 1 ? prev.filter((s) => s !== scope) : prev) : [...prev, scope]
    );
  };

  const handleRenovationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};
    if (!renovName.trim()) {
      errors.name = 'Please enter your full name';
    }
    const cleanPhone = renovPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (Object.keys(errors).length > 0) {
      setRenovErrors(errors);
      return;
    }

    setRenovErrors({});

    const leadData = {
      name: renovName.trim(),
      phone: cleanPhone,
      email: renovEmail.trim(),
      city: renovCity,
      propertyType: renovPropertyType,
      scopes: renovScopes,
      propertyAge: renovAge,
      callTime: renovCallTime,
      notes: renovNotes.trim(),
      type: 'Renovation & Remodeling',
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('pentagram_renovation_lead', JSON.stringify(leadData));
    } catch {
      // Ignore storage errors
    }

    // Direct CRM Ingestion
    submitLeadToCrm({
      name: leadData.name,
      phone: cleanPhone,
      email: leadData.email,
      city: leadData.city,
      location: `${leadData.city} (Delhi NCR)`,
      source: 'renovation_form',
      projectType: 'Renovation & Remodeling',
      propertyType: leadData.propertyType,
      budget: '₹8.0L - ₹15.0L (Custom Renovation)',
      budgetRange: '₹8.0L - ₹15.0L (Custom Renovation)',
      projectDetails: `Scopes: ${renovScopes.join(', ')}. Preferred Call Time: ${leadData.callTime}. Property Age: ${leadData.propertyAge}. Notes: ${leadData.notes || 'None'}`,
      notes: `Scopes: ${renovScopes.join(', ')}. Call Time: ${leadData.callTime}. Age: ${leadData.propertyAge}. Notes: ${leadData.notes || 'None'}`,
      otpVerified: true,
    }).catch((err) => console.warn('CRM renovation lead sync error:', err));

    trackEvent('renovation_lead_submitted', {
      name: leadData.name,
      phone: leadData.phone,
      city: leadData.city,
      propertyType: leadData.propertyType,
    });

    onOpenConsultation(
      `Home Renovation Request from ${leadData.name} (${cleanPhone}) in ${leadData.city} [${leadData.propertyType}]. Scope: ${renovScopes.join(', ')}. Call Time: ${leadData.callTime}`
    );

    setRenovSubmitted(true);
  };

  const generateRenovationWhatsAppUrl = () => {
    const scopesStr = renovScopes.join(', ');
    const msg =
      `Hi Pentagram,\n\n` +
      `I would like to discuss my Home Renovation project.\n\n` +
      `Name: ${renovName.trim() || 'Homeowner'}\n` +
      `Phone: ${renovPhone.trim()}\n` +
      `City: ${renovCity}\n` +
      `Property Layout: ${renovPropertyType}\n` +
      `Renovation Scope: ${scopesStr || 'Full Home'}\n` +
      `Property Age: ${renovAge}\n` +
      `Preferred Call Window: ${renovCallTime}\n` +
      (renovNotes.trim() ? `Notes: ${renovNotes.trim()}\n\n` : '\n') +
      `Please have your senior renovation architect call me for a detailed conversation.`;

    return `https://wa.me/${PENTAGRAM_WHATSAPP_CONFIG.number}?text=${encodeURIComponent(msg)}`;
  };

  // UI Modals / Drawers
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [siteVisitBooked, setSiteVisitBooked] = useState(false);

  // Sync city if initialCity changes
  useEffect(() => {
    if (initialCity) {
      setSelectedCity(initialCity);
      setRenovCity(initialCity);
    }
  }, [initialCity]);

  // Initial event track
  useEffect(() => {
    trackEvent('calculator_started', { city: selectedCity, package: selectedPackage });
  }, []);

  // Handle Property Type changes and adjust area default smoothly
  const handlePropertyTypeSelect = (type: PropertyType) => {
    setPropertyType(type);
    const defaultArea = DEFAULT_AREA_BY_PROPERTY[type];
    setPropertyArea(defaultArea);
    setAreaInputStr(defaultArea.toString());
    trackEvent('property_selected', { propertyType: type, area: defaultArea });
  };

  // Toggle Requirements
  const handleToggleRequirement = (req: RequirementType) => {
    setSelectedRequirements((prev) => {
      let updated: RequirementType[];
      if (prev.includes(req)) {
        if (prev.length === 1) return prev; // At least one requirement required
        updated = prev.filter((r) => r !== req);
      } else {
        updated = [...prev, req];
      }
      trackEvent('requirements_selected', { requirements: updated });
      return updated;
    });
  };

  // Build state for calculation engine
  const calculatorState: CalculatorState = useMemo(() => {
    return {
      package: selectedPackage,
      propertyType,
      area: propertyArea,
      city: selectedCity,
      selectedRequirements,
      kitchen: {
        shape: kitchenShape,
        length1: kitchenL1,
        length2: kitchenL2,
        length3: kitchenL3,
        loft: kitchenLoft,
      },
      wardrobes: {
        quantity: wardrobeCount,
        loft: wardrobeLoft,
      },
      tvUnit: {
        quantity: tvCount,
        size: tvSize,
      },
      storage: {
        quantity: storageCount,
      },
    };
  }, [
    selectedPackage,
    propertyType,
    propertyArea,
    selectedCity,
    selectedRequirements,
    kitchenShape,
    kitchenL1,
    kitchenL2,
    kitchenL3,
    kitchenLoft,
    wardrobeCount,
    wardrobeLoft,
    tvCount,
    tvSize,
    storageCount,
  ]);

  // Run calculation engine (Internal math strictly private)
  const estimateResult = useMemo(() => {
    return calculateInteriorEstimate(calculatorState);
  }, [calculatorState]);

  // Validate Lead Gate Form
  const validateLeadForm = (): boolean => {
    const errors: { name?: string; phone?: string; email?: string } = {};

    // Legit Name validation (at least 2 letters, only letters and spaces)
    const trimmedName = leadName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Please enter your full name (minimum 2 characters)';
    } else if (!/^[a-zA-Z\s.']{2,50}$/.test(trimmedName)) {
      errors.name = 'Please enter a valid name using letters only';
    } else if (/^(test|asdf|qwerty|none|abc|xyz)$/i.test(trimmedName)) {
      errors.name = 'Please enter a genuine name';
    }

    // Legit 10-digit Indian Mobile number validation
    const cleanPhone = leadPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      errors.phone = 'Please enter your 10-digit WhatsApp/mobile number';
    } else if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9)';
    }

    // Legit Email validation
    const trimmedEmail = leadEmail.trim().toLowerCase();
    if (!trimmedEmail) {
      errors.email = 'Please enter your email ID';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Lead & Unlock Prices
  const handleUnlockEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLeadForm()) return;

    const leadData: LeadData = {
      name: leadName.trim(),
      phone: leadPhone.replace(/\D/g, ''),
      email: leadEmail.trim().toLowerCase(),
      city: selectedCity,
      package: selectedPackage,
      propertyType,
      bhk: propertyType,
      area: propertyArea,
      selectedRequirements,
      kitchen: selectedRequirements.includes('kitchen')
        ? {
            shape: kitchenShape,
            dimensions:
              kitchenShape === 'Straight'
                ? `${kitchenL1} ft`
                : kitchenShape === 'Parallel'
                ? `Counter 1: ${kitchenL1} ft | Counter 2: ${kitchenL2} ft`
                : kitchenShape === 'U-Shape'
                ? `L1: ${kitchenL1} ft × L2: ${kitchenL2} ft × L3: ${kitchenL3} ft`
                : kitchenShape === 'Island'
                ? `Main: ${kitchenL1} ft | Island: ${kitchenL3} ft`
                : `${kitchenL1} ft × ${kitchenL2} ft`,
            loft: kitchenLoft,
            mrp: estimateResult.items.find((i) => i.id === 'kitchen')?.mrp || 0,
          }
        : undefined,
      wardrobes: selectedRequirements.includes('wardrobes')
        ? {
            quantity: wardrobeCount,
            loft: wardrobeLoft,
            mrp: estimateResult.items.find((i) => i.id === 'wardrobes')?.mrp || 0,
          }
        : undefined,
      tvUnits: selectedRequirements.includes('tvUnit')
        ? {
            quantity: tvCount,
            size: tvSize,
            mrp: estimateResult.items.find((i) => i.id === 'tvUnit')?.mrp || 0,
          }
        : undefined,
      storage: selectedRequirements.includes('storage')
        ? {
            quantity: storageCount,
            mrp: estimateResult.items.find((i) => i.id === 'storage')?.mrp || 0,
          }
        : undefined,
      falseCeiling: selectedRequirements.includes('falseCeiling')
        ? { mrp: estimateResult.items.find((i) => i.id === 'falseCeiling')?.mrp || 0 }
        : undefined,
      painting: selectedRequirements.includes('painting')
        ? { mrp: estimateResult.items.find((i) => i.id === 'painting')?.mrp || 0 }
        : undefined,
      electrical: selectedRequirements.includes('electrical')
        ? { mrp: estimateResult.items.find((i) => i.id === 'electrical')?.mrp || 0 }
        : undefined,
      totalMRP: estimateResult.totalMRP,
      discountPercent: estimateResult.discountPercent,
      discountAmount: estimateResult.discountAmount,
      offerPrice: estimateResult.offerPrice,
      timestamp: new Date().toISOString(),
    };

    // Store lead in client storage for persistence & analytics
    try {
      localStorage.setItem('pentagram_estimate_lead', JSON.stringify(leadData));
    } catch {
      // Ignore storage errors
    }

    // Direct CRM Lead Ingestion
    const estLocation = `${selectedCity} (Delhi NCR)`;
    const estBudget = `${formatIndianCurrency(estimateResult.offerPrice)}`;
    const estDetails = `Package: ${selectedPackage.toUpperCase()}. Carpet Area: ${propertyArea} sq.ft. Configuration: ${leadData.propertyType}. Scope: ${selectedRequirements.join(', ')}. Kitchen: ${kitchenShape} (${kitchenL1}x${kitchenL2}ft). Wardrobes: ${wardrobeCount} Units. Estimated MRP: ${formatIndianCurrency(estimateResult.totalMRP)}. Direct Offer: ${formatIndianCurrency(estimateResult.offerPrice)}.`;

    submitLeadToCrm({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      city: selectedCity,
      location: estLocation,
      source: 'design_os_estimator',
      projectType: `${selectedPackage.toUpperCase()} Turnkey Interior`,
      propertyType: leadData.propertyType,
      estimatedCost: estimateResult.offerPrice,
      budget: estBudget,
      budgetRange: `Offer: ${formatIndianCurrency(estimateResult.offerPrice)} (MRP: ${formatIndianCurrency(estimateResult.totalMRP)})`,
      projectDetails: estDetails,
      notes: `Requirements: ${selectedRequirements.join(', ')}. Kitchen: ${kitchenShape} (${kitchenL1}x${kitchenL2}ft). Wardrobes: ${wardrobeCount}. Carpet Area: ${propertyArea} sq.ft.`,
      specs: {
        package: selectedPackage,
        requirements: selectedRequirements,
        carpetArea: propertyArea,
        totalMRP: estimateResult.totalMRP,
        offerPrice: estimateResult.offerPrice,
        discountAmount: estimateResult.discountAmount,
      },
      otpVerified: true,
    }).catch((err) => console.warn('CRM estimate lead sync error:', err));

    trackEvent('lead_submitted', {
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      city: selectedCity,
      package: selectedPackage,
      propertyType,
      offerPrice: estimateResult.offerPrice,
    });

    trackEvent('calculation_completed', {
      totalMRP: estimateResult.totalMRP,
      offerPrice: estimateResult.offerPrice,
      package: selectedPackage,
    });

    setIsLeadUnlocked(true);
    setStep(5);

    // Scroll to top of calculator smoothly
    const elem = document.getElementById('estimator-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate WhatsApp Message for Showroom Spot-Booking Privilege
  const generateWhatsAppUrl = () => {
    const pkgName = selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1);
    const selectedListStr = estimateResult.items
      .filter((i) => i.isAvailable)
      .map((i) => `• ${i.label} (${i.subtitle})`)
      .join('\n');

    const msg =
      `Hi Pentagram,\n\n` +
      `I calculated my home interior estimate on your website and want to lock my *Spot Booking Showroom Visit* to avail the exclusive in-person discount!\n\n` +
      `• Package: ${pkgName}\n` +
      `• Property: ${propertyType} (${propertyArea.toLocaleString('en-IN')} sq.ft)\n` +
      `• City: ${selectedCity}\n\n` +
      `Selected Spaces:\n${selectedListStr}\n\n` +
      `• Standard Estimate MRP: ${formatIndianCurrency(estimateResult.totalMRP)}\n` +
      `• Locked Spot-Booking Discount: Up to ${formatIndianCurrency(estimateResult.discountAmount)} (${CAMPAIGN_CONFIG.discountPercent}% OFF)\n` +
      `• Post-Spot-Discount Price: ${formatIndianCurrency(estimateResult.offerPrice)}\n\n` +
      `Name: ${leadName.trim() || 'Homeowner'}\n` +
      `Mobile: +91 ${leadPhone}\n\n` +
      `Please reserve my priority showroom visit slot (Tue–Sun, 09:00 AM – 07:00 PM) at Pentagram, Sector 73, Gurugram!`;

    return `https://wa.me/${PENTAGRAM_WHATSAPP_CONFIG.number}?text=${encodeURIComponent(msg)}`;
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_clicked', {
      phone: leadPhone,
      mrp: estimateResult.totalMRP,
      spotDiscount: estimateResult.discountAmount,
      package: selectedPackage,
    });
    window.open(generateWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleSiteVisitClick = () => {
    trackEvent('site_visit_clicked', {
      name: leadName,
      phone: leadPhone,
      city: selectedCity,
      mrp: estimateResult.totalMRP,
      spotDiscount: estimateResult.discountAmount,
    });
    setSiteVisitBooked(true);
    onOpenConsultation(
      `Interior Estimate for ${leadName || 'Client'} (${propertyType}, ${propertyArea} sq.ft in ${selectedCity}). Standard MRP: ${formatIndianCurrency(
        estimateResult.totalMRP
      )}. Showroom Spot Discount Voucher: Up to ${formatIndianCurrency(estimateResult.discountAmount)} off.`
    );
  };

  // Current package specifications
  const activeSpec = PACKAGE_SPECIFICATIONS[selectedPackage];

  return (
    <section
      id="estimator-section"
      className="py-10 sm:py-16 bg-[#FAF6F0] border-b border-[#EAE0D5] scroll-mt-20 selection:bg-[#C1405D] selection:text-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Marketing & Brand Header (Points 1, 52) */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EAE0D5] text-xs font-bold text-[#C1405D] shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
            <span>Pentagram: Your Space Expert • Indicative MRP Engine</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#201B1C] tracking-tight">
            Calculate Your Home Interior Cost
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Get an indicative interior MRP for your home in under 30 seconds.
          </p>

          {/* Quick City Filter */}
          <div className="mt-4 inline-flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#EAE0D5] text-xs">
            <span className="text-neutral-500 pl-2 pr-1 font-medium hidden sm:inline">Servicing:</span>
            {SERVICEABLE_CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCity(c.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCity === c.id
                    ? 'bg-[#201B1C] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#201B1C]'
                }`}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* VERY FIRST OPTION: NEW HOME OR RENOVATION (CORE GATEWAY) */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl border border-[#EAE0D5] p-5 sm:p-6 shadow-xs mb-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#C1405D] uppercase tracking-wider block">
                Option 01 • Select Project Nature
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#201B1C]">
                Is this a New Home or a Renovation?
              </h2>
            </div>
            <span className="text-xs text-neutral-500 font-medium">
              {projectScope === 'new_home' ? 'Interactive 30s Cost Calculator' : 'Senior Renovation Expert Consultation'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Option 1: New Home */}
            <button
              type="button"
              onClick={() => {
                setProjectScope('new_home');
                trackEvent('project_nature_selected', { type: 'new_home' });
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                projectScope === 'new_home'
                  ? 'border-[#C1405D] bg-rose-50/40 ring-1 ring-[#C1405D] shadow-xs'
                  : 'border-[#EAE0D5] bg-white hover:border-neutral-300'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  projectScope === 'new_home' ? 'bg-[#C1405D] text-white shadow-xs' : 'bg-[#FAF6F0] text-neutral-700'
                }`}
              >
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-[#201B1C]">New Home Interiors</span>
                  {projectScope === 'new_home' ? (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#C1405D] text-white flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  ) : (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                      30s Calculator
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Newly purchased or possession-ready flat/villa. Bare shell modular interiors, wardrobes & turnkey design.
                </p>
              </div>
            </button>

            {/* Option 2: Renovation */}
            <button
              type="button"
              onClick={() => {
                setProjectScope('renovation');
                trackEvent('project_nature_selected', { type: 'renovation' });
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                projectScope === 'renovation'
                  ? 'border-[#C1405D] bg-rose-50/40 ring-1 ring-[#C1405D] shadow-xs'
                  : 'border-[#EAE0D5] bg-white hover:border-neutral-300'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  projectScope === 'renovation' ? 'bg-[#C1405D] text-white shadow-xs' : 'bg-[#FAF6F0] text-neutral-700'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-[#201B1C]">Renovation & Remodeling</span>
                  {projectScope === 'renovation' ? (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#C1405D] text-white flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected
                    </span>
                  ) : (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                      Expert Consultation
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Existing occupied or older home revamp. Kitchen/bath remodel, civil changes, tiling & structural revamps.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RENOVATION JOURNEY: FORM FILLING & EXPERT CALL SHOWCASE */}
        {/* ============================================================ */}
        {projectScope === 'renovation' && (
          <div className="space-y-6 animate-in fade-in duration-200 text-left">
            {/* Prominent Showcase: Our experts will call you for detailed conversations */}
            <div className="bg-gradient-to-br from-white via-rose-50/30 to-amber-50/40 rounded-2xl border border-[#EAE0D5] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C1405D] to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/90 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>Dedicated Engineering & Architectural Consultation</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201B1C]">
                    Our Senior Renovation Experts Will Call You for a Detailed Conversation
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                    Unlike bare-shell new apartments with standardized floor plans, home renovations involve structural feasibility, existing plumbing/electrical conduits, civil demolition, and personalized material transitions. To give you genuine advice and transparent pricing without hidden surprises, our senior renovation architects will call you directly to discuss your home in depth.
                  </p>
                </div>
              </div>

              {/* 3 Reassurance Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#EAE0D5]/70 text-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Detailed 1-on-1 Architectural Call</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary On-Site Structural Check</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Itemized BOQ with 0% Hidden Surcharges</span>
                </div>
              </div>
            </div>

            {/* Renovation Form or Submitted State */}
            {!renovSubmitted ? (
              <form
                onSubmit={handleRenovationSubmit}
                className="bg-white rounded-2xl border border-[#EAE0D5] p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#201B1C]">
                    Share Your Home Renovation Details
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Fill in your details below so our renovation architect can review your requirements before calling.
                  </p>
                </div>

                {/* Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                      Your Full Name <span className="text-[#C1405D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={renovName}
                      onChange={(e) => {
                        setRenovName(e.target.value);
                        if (renovErrors.name) setRenovErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C1405D]/20 ${
                        renovErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-[#EAE0D5] focus:border-[#C1405D]'
                      }`}
                    />
                    {renovErrors.name && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {renovErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                      WhatsApp / Mobile Number <span className="text-[#C1405D]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-neutral-500 font-semibold">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={renovPhone}
                        onChange={(e) => {
                          setRenovPhone(e.target.value.replace(/\D/g, ''));
                          if (renovErrors.phone) setRenovErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="9876543210"
                        className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C1405D]/20 ${
                          renovErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-[#EAE0D5] focus:border-[#C1405D]'
                        }`}
                      />
                    </div>
                    {renovErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {renovErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                      Email Address <span className="text-neutral-400 font-normal">(Optional, for formal proposal)</span>
                    </label>
                    <input
                      type="email"
                      value={renovEmail}
                      onChange={(e) => setRenovEmail(e.target.value)}
                      placeholder="e.g. vikram@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C1405D]/20 focus:border-[#C1405D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                      Project Location / City <span className="text-[#C1405D]">*</span>
                    </label>
                    <select
                      value={renovCity}
                      onChange={(e) => setRenovCity(e.target.value as ServiceableCity)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C1405D]/20 focus:border-[#C1405D]"
                    >
                      {SERVICEABLE_CITIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.id} ({c.tag})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Property Layout */}
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] mb-2">
                    Property Layout / Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa / House', 'Builder Floor'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setRenovPropertyType(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                          renovPropertyType === type
                            ? 'border-[#C1405D] bg-[#C1405D] text-white shadow-xs'
                            : 'border-[#EAE0D5] bg-[#FAF6F0]/60 text-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope of Renovation */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-[#201B1C]">
                      What areas do you want to renovate? <span className="text-neutral-400 font-normal">(Select all that apply)</span>
                    </label>
                    <span className="text-[11px] text-[#C1405D] font-semibold">{renovScopes.length} selected</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {[
                      { id: 'Modular Kitchen Overhaul', label: '🍳 Kitchen Overhaul & Cabinets' },
                      { id: 'Bathroom Modernization', label: '🚿 Bathrooms & Vanities' },
                      { id: 'Wardrobes & Woodwork', label: '🚪 Wardrobes & Woodwork' },
                      { id: 'Civil Work & Demolition', label: '🔨 Civil Work & Wall Demolition' },
                      { id: 'Flooring & Waterproofing', label: '🪵 Flooring, Tiling & Waterproofing' },
                      { id: 'False Ceiling & Electrical', label: '💡 False Ceiling & Architectural Lighting' },
                      { id: 'Full Home Transformation', label: '🏡 Complete Turnkey Full-Home Revamp' },
                    ].map((sc) => {
                      const isSel = renovScopes.includes(sc.id);
                      return (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => handleToggleRenovScope(sc.id)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSel
                              ? 'border-[#C1405D] bg-rose-50/50 text-[#C1405D] font-bold ring-1 ring-[#C1405D]'
                              : 'border-[#EAE0D5] bg-white text-neutral-700 hover:border-neutral-300'
                          }`}
                        >
                          <span>{sc.label}</span>
                          {isSel ? (
                            <Check className="w-3.5 h-3.5 text-[#C1405D]" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Age of Property & Preferred Call Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EAE0D5]">
                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                      Approximate Age of Property
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['< 5 Years', '5 - 15 Years', '15+ Years'].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setRenovAge(age)}
                          className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                            renovAge === age
                              ? 'border-[#C1405D] bg-rose-50/60 text-[#C1405D] font-bold'
                              : 'border-[#EAE0D5] bg-white text-neutral-700 hover:border-neutral-300'
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                      Convenient Time for Detailed Call
                    </label>
                    <select
                      value={renovCallTime}
                      onChange={(e) => setRenovCallTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C1405D]/20 focus:border-[#C1405D]"
                    >
                      <option value="Morning (09:00 AM - 1:00 PM)">Morning (09:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:30 PM)">Afternoon (1:00 PM - 4:30 PM)</option>
                      <option value="Evening (4:30 PM - 07:00 PM)">Evening (4:30 PM - 07:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] mb-1.5">
                    Any specific modifications or current challenges? <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={renovNotes}
                    onChange={(e) => setRenovNotes(e.target.value)}
                    placeholder="e.g. Need to remove kitchen partition wall, replace bathroom tiles, and install floor-to-ceiling sliding wardrobes."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C1405D]/20 focus:border-[#C1405D]"
                  />
                </div>

                {/* Submit & Switch Button */}
                <div className="pt-4 border-t border-[#EAE0D5] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setProjectScope('new_home')}
                    className="text-xs font-bold text-neutral-500 hover:text-[#C1405D] transition-colors flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Switch to New Home Cost Calculator</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#C1405D] hover:bg-[#a81c40] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Request Detailed Renovation Call</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero spam guarantee • 100% confidential discussion with verified senior architects</span>
                  </p>
                </div>
              </form>
            ) : (
              /* Success / Request Received State */
              <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Renovation Request Confirmed</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#201B1C]">
                    Thank You, {renovName || 'Homeowner'}!
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Our Senior Renovation Architect for <strong>{renovCity}</strong> has received your project details. We will call you at <strong>+91 {renovPhone}</strong> during your preferred window (<strong>{renovCallTime}</strong>) for a comprehensive consultation.
                  </p>
                </div>

                {/* Project Summary Card */}
                <div className="max-w-md mx-auto p-4 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Property Layout:</span>
                    <span className="font-bold text-[#201B1C]">{renovPropertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Selected Scopes:</span>
                    <span className="font-bold text-[#201B1C] text-right truncate max-w-[200px]">{renovScopes.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Property Age:</span>
                    <span className="font-bold text-[#201B1C]">{renovAge}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={generateRenovationWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat with Renovation Expert on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setProjectScope('new_home');
                      setRenovSubmitted(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#EAE0D5] bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Calculator className="w-4 h-4 text-[#C1405D]" />
                    <span>Need a New Home Estimate? Launch Calculator</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* NEW HOME JOURNEY: COST CALCULATOR PROGRESS STEPPER & STEPS */}
        {/* ============================================================ */}
        {projectScope === 'new_home' && (
          <>
            {/* Clean Mobile-First Progress Stepper (Section 38, 39) */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
                {[
                  { num: 1, title: 'Property', stepId: 1 },
                  { num: 2, title: 'Requirements', stepId: 2 },
                  { num: 3, title: 'Details', stepId: 3 },
                  { num: 4, title: 'Estimate', stepId: step >= 4 ? step : 4 },
                ].map((s) => {
                  const isActive = (s.stepId === 4 && step >= 4) || step === s.stepId;
                  const isCompleted = step > s.stepId || (s.stepId === 4 && step === 5);
                  return (
                    <button
                      key={s.num}
                      disabled={s.stepId > step && !isLeadUnlocked}
                      onClick={() => {
                        if (s.stepId <= step || isLeadUnlocked) {
                          setStep(s.stepId as 1 | 2 | 3 | 4 | 5);
                        }
                      }}
                      className={`flex flex-col items-center gap-1 pb-2 border-b-2 text-center transition-all ${
                        isActive
                          ? 'border-[#C1405D] text-[#C1405D]'
                          : isCompleted
                          ? 'border-emerald-600 text-emerald-700'
                          : 'border-[#EAE0D5] text-neutral-400'
                      } ${s.stepId <= step || isLeadUnlocked ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? 'bg-[#C1405D] text-white'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#EAE0D5] text-neutral-600'
                          }`}
                        >
                          {isCompleted && s.stepId < 4 ? <Check className="w-3 h-3" /> : s.num}
                        </span>
                        <span className="hidden sm:inline">{s.title}</span>
                      </div>
                      <span className="text-[10px] sm:hidden truncate font-medium">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

        {/* ============================================================ */}
        {/* STEP 1: PACKAGE & PROPERTY (Sections 6, 7, 52) */}
        {/* ============================================================ */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-[#EAE0D5] p-5 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-200 text-left">
            {/* Package Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider">
                  1. Choose Your Interior Package
                </label>
                <button
                  type="button"
                  onClick={() => setShowSpecModal(true)}
                  className="text-xs font-semibold text-[#C1405D] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Package Specifications</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    id: 'essential' as const,
                    name: 'Essential',
                    tag: 'Smart Economy',
                    desc: '18mm PL HDF-HMR, Laminated Finish & Premium Imported Hardware.',
                  },
                  {
                    id: 'premium' as const,
                    name: 'Premium',
                    tag: 'Most Popular',
                    desc: 'High quality raw materials, Acrylic/Glass Finish & German Hettich Hardware.',
                  },
                  {
                    id: 'luxury' as const,
                    name: 'Luxury',
                    tag: 'Bespoke Executive',
                    desc: 'Calibrated Plywood, Italian PU Lacquer Finish & Hettich / Blum Motion.',
                  },
                ].map((pkg) => {
                  const isSel = selectedPackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        trackEvent('package_selected', { package: pkg.id });
                      }}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                        isSel
                          ? 'border-[#C1405D] bg-[#C1405D]/5 ring-1 ring-[#C1405D]'
                          : 'border-[#EAE0D5] bg-[#FAF6F0]/50 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif font-bold text-base text-[#201B1C]">{pkg.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              isSel ? 'bg-[#C1405D] text-white' : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {pkg.tag}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">{pkg.desc}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#EAE0D5] flex items-center justify-between text-[11px]">
                        <span className="text-neutral-500 font-medium">Standard MRP Matrix</span>
                        {isSel ? (
                          <span className="text-[#C1405D] font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Selected
                          </span>
                        ) : (
                          <span className="text-neutral-400">Select</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Property Type Selection */}
            <div className="pt-6 border-t border-[#EAE0D5]">
              <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-3">
                2. Tell Us About Your Home (Property Type)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {(['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Independent Home', 'Villa'] as const).map((type) => {
                  const isSel = propertyType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handlePropertyTypeSelect(type)}
                      className={`min-h-[46px] py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center ${
                        isSel
                          ? 'bg-[#201B1C] text-white border-[#201B1C] shadow-xs'
                          : 'bg-[#FAF6F0] text-[#201B1C] border-[#EAE0D5] hover:bg-neutral-100'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Approximate Home Area Input (400 - 15,000 sq.ft) */}
            <div className="pt-6 border-t border-[#EAE0D5]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider">
                  3. Approximate Home Area (sq.ft)
                </label>
                <span className="text-xs text-neutral-500">
                  Allowed Range: 400 – 15,000 sq.ft
                </span>
              </div>

              <div className="relative max-w-sm">
                <input
                  type="number"
                  min={400}
                  max={15000}
                  value={areaInputStr}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setAreaInputStr(raw);
                    const val = Number(raw);
                    if (val && !isNaN(val)) {
                      setPropertyArea(val);
                    }
                  }}
                  onBlur={() => {
                    let num = Number(areaInputStr);
                    if (isNaN(num) || num < 400) num = 400;
                    if (num > 15000) num = 15000;
                    setPropertyArea(num);
                    setAreaInputStr(num.toString());
                  }}
                  className="w-full h-12 pl-4 pr-16 bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl text-base font-bold text-[#201B1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500 pointer-events-none">
                  sq.ft.
                </span>
              </div>

              {/* Area Quick Selector Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[11px] text-neutral-500">Quick presets:</span>
                {[650, 1100, 1450, 1750, 2200, 2800, 3500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setPropertyArea(preset);
                      setAreaInputStr(preset.toString());
                    }}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                      propertyArea === preset
                        ? 'bg-[#C1405D] text-white border-[#C1405D]'
                        : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                    }`}
                  >
                    {preset.toLocaleString('en-IN')} sq.ft
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#C1405D] hover:bg-[#a9334e] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: REQUIREMENTS SELECTION (Sections 8, 52) */}
        {/* ============================================================ */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#EAE0D5] p-5 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200 text-left">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-lg font-bold text-[#201B1C]">What Would You Like Us To Include?</h2>
                  <p className="text-xs text-neutral-600">
                    Select all rooms and interior components you require for your {propertyType}.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedRequirements([
                        'kitchen',
                        'wardrobes',
                        'tvUnit',
                        'storage',
                        'falseCeiling',
                        'painting',
                        'electrical',
                      ])
                    }
                    className="text-xs text-[#C1405D] font-semibold hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                </div>
              </div>
            </div>

            {/* 7 Requirement Cards (NO WALLPAPER) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                {
                  id: 'kitchen' as const,
                  title: 'Modular Kitchen',
                  desc: 'Base & wall cabinets, soft-close Blum/Hettich channels, drawer organizers.',
                },
                {
                  id: 'wardrobes' as const,
                  title: 'Wardrobes',
                  desc: 'Full-height bedroom wardrobes with soft-close hinges and internal drawers.',
                },
                {
                  id: 'tvUnit' as const,
                  title: 'TV Unit',
                  desc: 'Living room media console with accent wall panelling and cable conduits.',
                },
                {
                  id: 'storage' as const,
                  title: 'Storage Units',
                  desc: 'Foyer consoles, dining crockeries, book cases and utility cabinets.',
                },
                {
                  id: 'falseCeiling' as const,
                  title: 'False Ceiling',
                  desc: 'POP designer false ceiling with perimeter cove detailing across living & rooms.',
                },
                {
                  id: 'painting' as const,
                  title: 'Painting',
                  desc: 'Complete internal walls & ceilings with 2-coat primer, putty and premium emulsion.',
                },
                {
                  id: 'electrical' as const,
                  title: 'Electrical & Lights',
                  desc: 'FR/FRLS copper wiring, light point creation, switchboards and power points.',
                },
              ].map((req) => {
                const isChecked = selectedRequirements.includes(req.id);
                return (
                  <div
                    key={req.id}
                    onClick={() => handleToggleRequirement(req.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isChecked
                        ? 'border-[#C1405D] bg-[#C1405D]/5 ring-1 ring-[#C1405D]'
                        : 'border-[#EAE0D5] bg-[#FAF6F0]/40 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-[#201B1C]">{req.title}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isChecked ? 'bg-[#C1405D] text-white' : 'border border-neutral-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">{req.desc}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#EAE0D5]/70 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500">
                        {isChecked ? 'Included in calculation' : 'Click to add'}
                      </span>
                      <span className={`font-bold ${isChecked ? 'text-[#C1405D]' : 'text-neutral-400'}`}>
                        {isChecked ? 'Active' : 'Excluded'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-[#EAE0D5] text-xs font-semibold text-neutral-700 hover:bg-neutral-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Property</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#C1405D] hover:bg-[#a9334e] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Configure Selected Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: CONFIGURE REQUIREMENTS (PROGRESSIVE DISCLOSURE) */}
        {/* ============================================================ */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-[#EAE0D5] p-5 sm:p-8 shadow-xs space-y-8 animate-in fade-in duration-200 text-left">
            <div>
              <h2 className="text-lg font-bold text-[#201B1C]">Configure Your Selected Requirements</h2>
              <p className="text-xs text-neutral-600">
                Fine-tune dimensions and units. Only selected items are shown below.
              </p>
            </div>

            {/* 1. Modular Kitchen Configuration */}
            {selectedRequirements.includes('kitchen') && (
              <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#201B1C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C1405D]" />
                    Modular Kitchen Design
                  </span>
                  <span className="text-xs font-bold text-[#C1405D]">{selectedPackage.toUpperCase()} GRADE</span>
                </div>

                {/* Kitchen Shape Selector */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    Select Kitchen Design Shape:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(['L-Shape', 'Straight', 'Parallel', 'U-Shape', 'Island'] as const).map((shape) => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setKitchenShape(shape)}
                        className={`min-h-[44px] py-2 px-2.5 text-xs font-bold rounded-lg border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          kitchenShape === shape
                            ? 'bg-[#201B1C] text-white border-[#201B1C] shadow-sm'
                            : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                        }`}
                      >
                        <span>{shape}</span>
                        <span className={`text-[10px] font-normal ${kitchenShape === shape ? 'text-amber-200' : 'text-neutral-400'}`}>
                          {shape === 'L-Shape' && '2 Counters'}
                          {shape === 'Straight' && 'Single Wall'}
                          {shape === 'Parallel' && 'Dual Parallel'}
                          {shape === 'U-Shape' && '3 Walls'}
                          {shape === 'Island' && 'Counter + Island'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Dimensional Inputs based on selected Kitchen Shape */}
                <div className="space-y-4 pt-2">
                  {/* 1. L-Shape Inputs */}
                  {kitchenShape === 'L-Shape' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Counter 1 Length (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={30}
                            value={kitchenL1}
                            onChange={(e) => setKitchenL1(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Counter 2 Length (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={30}
                            value={kitchenL2}
                            onChange={(e) => setKitchenL2(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. Straight Layout Inputs */}
                  {kitchenShape === 'Straight' && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Single Wall Counter Length (ft):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min={4}
                          max={30}
                          value={kitchenL1}
                          onChange={(e) => setKitchenL1(Math.max(1, Number(e.target.value) || 0))}
                          className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                          ft
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Continuous straight linear counter running along a single structural wall.
                      </p>
                    </div>
                  )}

                  {/* 3. Parallel Layout Inputs */}
                  {kitchenShape === 'Parallel' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Counter 1 - Cooking Side (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={30}
                            value={kitchenL1}
                            onChange={(e) => setKitchenL1(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Counter 2 - Wet & Prep Side (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={30}
                            value={kitchenL2}
                            onChange={(e) => setKitchenL2(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. U-Shape Layout Inputs */}
                  {kitchenShape === 'U-Shape' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Left Counter (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={25}
                            value={kitchenL1}
                            onChange={(e) => setKitchenL1(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Center / Back Wall (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={25}
                            value={kitchenL2}
                            onChange={(e) => setKitchenL2(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Right Counter (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={25}
                            value={kitchenL3}
                            onChange={(e) => setKitchenL3(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. Island Layout Inputs */}
                  {kitchenShape === 'Island' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Main Wall Counter (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={4}
                            max={30}
                            value={kitchenL1}
                            onChange={(e) => setKitchenL1(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Freestanding Island (ft):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min={3}
                            max={16}
                            value={kitchenL3}
                            onChange={(e) => setKitchenL3(Math.max(1, Number(e.target.value) || 0))}
                            className="w-full h-11 px-3 bg-white border border-[#EAE0D5] rounded-lg text-sm font-bold text-[#201B1C] focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold">
                            ft
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Kitchen Loft Toggle for All Shapes */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#EAE0D5]">
                    <div>
                      <span className="block text-xs font-bold text-[#201B1C]">Do you require Kitchen Loft?</span>
                      <span className="text-[11px] text-neutral-500">
                        Adds upper ceiling storage modules for seasonal kitchenware & extra appliances.
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setKitchenLoft(false)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                          !kitchenLoft
                            ? 'bg-[#201B1C] text-white border-[#201B1C]'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                        }`}
                      >
                        NO
                      </button>
                      <button
                        type="button"
                        onClick={() => setKitchenLoft(true)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                          kitchenLoft
                            ? 'bg-[#C1405D] text-white border-[#C1405D]'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                        }`}
                      >
                        YES
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Wardrobes Configuration */}
            {selectedRequirements.includes('wardrobes') && (
              <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#201B1C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C1405D]" />
                    Wardrobes Configuration
                  </span>
                  <span className="text-xs font-bold text-[#C1405D]">{wardrobeCount} Units</span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-neutral-700">Number of Wardrobes:</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setWardrobeCount(num)}
                        className={`w-11 h-11 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          wardrobeCount === num
                            ? 'bg-[#201B1C] text-white border-[#201B1C]'
                            : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wardrobe Loft Toggle */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#EAE0D5]">
                  <div>
                    <span className="block text-xs font-bold text-[#201B1C]">Do you require Wardrobe Loft?</span>
                    <span className="text-[11px] text-neutral-500">
                      Standard height is 7 ft. Loft extends storage to full 9 ft ceiling height.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setWardrobeLoft(false)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                        !wardrobeLoft
                          ? 'bg-[#201B1C] text-white border-[#201B1C]'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      NO
                    </button>
                    <button
                      type="button"
                      onClick={() => setWardrobeLoft(true)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                        wardrobeLoft
                          ? 'bg-[#C1405D] text-white border-[#C1405D]'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      YES
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. TV Unit Configuration */}
            {selectedRequirements.includes('tvUnit') && (
              <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#201B1C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C1405D]" />
                    TV Unit Specifications
                  </span>
                  <span className="text-xs font-bold text-[#C1405D]">{tvCount} Unit ({tvSize.toUpperCase()})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">Number of TV Units:</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTvCount(num)}
                          className={`w-11 h-11 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                            tvCount === num
                              ? 'bg-[#201B1C] text-white border-[#201B1C]'
                              : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">Select TV Unit Size:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTvSize('standard')}
                        className={`min-h-[44px] py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          tvSize === 'standard'
                            ? 'bg-[#201B1C] text-white border-[#201B1C]'
                            : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                        }`}
                      >
                        STANDARD
                      </button>
                      <button
                        type="button"
                        onClick={() => setTvSize('large')}
                        className={`min-h-[44px] py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          tvSize === 'large'
                            ? 'bg-[#C1405D] text-white border-[#C1405D]'
                            : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                        }`}
                      >
                        LARGE (With Panelling)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Storage Configuration */}
            {selectedRequirements.includes('storage') && (
              <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#201B1C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C1405D]" />
                    Storage Units (Crockery, Shoe Rack, Foyer)
                  </span>
                  <span className="text-xs font-bold text-[#C1405D]">{storageCount} Units</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    Number of Storage Units (3 ft × 7 ft standard footprint):
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setStorageCount(num)}
                        className={`w-11 h-11 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          storageCount === num
                            ? 'bg-[#201B1C] text-white border-[#201B1C]'
                            : 'bg-white text-neutral-700 border-[#EAE0D5] hover:bg-neutral-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5, 6, 7. Automatic Area-Based Requirements Note */}
            {(selectedRequirements.includes('falseCeiling') ||
              selectedRequirements.includes('painting') ||
              selectedRequirements.includes('electrical')) && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Automated Area-Based Engineering:</span>
                  <p className="mt-0.5 text-emerald-800">
                    False Ceiling, Painting, and Electrical works are mathematically scaled to your{' '}
                    <strong>
                      {propertyArea.toLocaleString('en-IN')} sq.ft {propertyType}
                    </strong>{' '}
                    for complete turnkey coverage.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-[#EAE0D5] text-xs font-semibold text-neutral-700 hover:bg-neutral-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Requirements</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#C1405D] hover:bg-[#a9334e] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate & Unlock My Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: LEAD GATE (USER EXPLICIT REQUIREMENT) */}
        {/* "till the user entering his/her details we won't show them the result and we will ask them to fill the form with his details i.e. legit name, ph no and mail ID then the prices will be shown" */}
        {/* ============================================================ */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-[#EAE0D5] p-6 sm:p-10 shadow-lg space-y-6 animate-in fade-in duration-200 text-left max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#C1405D]/10 text-[#C1405D] flex items-center justify-center mx-auto mb-1">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#201B1C]">
                Where should we send your estimate?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                Your indicative MRP calculation is ready! Enter your contact details below to immediately unlock the full
                itemized price breakdown and your 10% Pentagram Special Offer.
              </p>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleUnlockEstimate} className="space-y-4 pt-2">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#C1405D]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Sharma"
                  value={leadName}
                  onChange={(e) => {
                    setLeadName(e.target.value);
                    if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full h-12 px-4 rounded-xl border bg-[#FAF6F0] text-sm text-[#201B1C] font-medium focus:bg-white focus:outline-none focus:ring-2 ${
                    formErrors.name
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-[#EAE0D5] focus:ring-[#C1405D]'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.name}
                  </p>
                )}
              </div>

              {/* WhatsApp / Phone */}
              <div>
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1.5">
                  WhatsApp / Phone Number <span className="text-[#C1405D]">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#EAE0D5] bg-neutral-100 text-xs font-bold text-[#201B1C]">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={leadPhone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setLeadPhone(val);
                      if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full h-12 px-4 rounded-r-xl border bg-[#FAF6F0] text-sm text-[#201B1C] font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 ${
                      formErrors.phone
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-[#EAE0D5] focus:ring-[#C1405D]'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1.5">
                  Email ID <span className="text-[#C1405D]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={leadEmail}
                  onChange={(e) => {
                    setLeadEmail(e.target.value);
                    if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full h-12 px-4 rounded-xl border bg-[#FAF6F0] text-sm text-[#201B1C] font-medium focus:bg-white focus:outline-none focus:ring-2 ${
                    formErrors.email
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-[#EAE0D5] focus:ring-[#C1405D]'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Selected City Confirmation */}
              <div>
                <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1.5">
                  Project City in Delhi NCR
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value as ServiceableCity)}
                  className="w-full h-12 px-4 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-sm text-[#201B1C] font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C1405D]"
                >
                  {SERVICEABLE_CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} (Strictly Delhi NCR Scope)
                    </option>
                  ))}
                </select>
              </div>

              {/* Trust & Privacy Guarantee */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>100% Privacy Protected:</strong> No continuous spam or cold calling. Your details are solely
                  used to deliver your customized Pentagram estimate and offer.
                </span>
              </div>

              {/* Submit & Reveal Button */}
              <button
                type="submit"
                id="unlock-estimate-btn"
                className="w-full min-h-[52px] py-3.5 px-6 bg-[#C1405D] hover:bg-[#a9334e] text-white text-base font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Unlock My Estimate & Instant MRP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer"
                >
                  ← Edit requirements before unlocking
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: YOUR ESTIMATE IS READY (RESULT SCREEN) */}
        {/* (Sections 31, 32, 35, 36, 48, 52) */}
        {/* ============================================================ */}
        {step === 5 && (
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {/* Top Congratulatory Ribbon */}
            <div className="bg-white rounded-2xl border border-[#EAE0D5] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Estimate Successfully Generated
                  </div>
                  <div className="text-sm font-bold text-[#201B1C]">
                    Prepared for {leadName || 'Valued Customer'} • {propertyType} ({propertyArea.toLocaleString('en-IN')}{' '}
                    sq.ft) in {selectedCity}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 rounded-lg border border-[#EAE0D5] text-xs font-semibold text-neutral-700 hover:bg-neutral-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recalculate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSpecModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF6F0] border border-[#EAE0D5] text-xs font-bold text-[#C1405D] hover:bg-[#C1405D]/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Specs</span>
                </button>
              </div>
            </div>

            {/* Result Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Big Hero Price & Offer Presentation */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-[#201B1C] text-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#3b3234] shadow-2xl relative overflow-hidden">
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C1405D]/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#3b3234]">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#C69255] font-bold block">
                        YOUR VERIFIED ESTIMATE
                      </span>
                      <span className="font-serif text-lg font-bold text-white capitalize">
                        {selectedPackage} Interior Package
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#34282a] border border-[#C69255]/50 text-[#C69255] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#C69255]" />
                      <span>SPOT DISCOUNT LOCKED</span>
                    </span>
                  </div>

                  {/* Standard Estimated Cost (Prominent Main Price - NO AUTO DISCOUNT) */}
                  <div className="mt-6">
                    <span className="text-xs uppercase tracking-wider text-neutral-300 block font-bold mb-1">
                      ESTIMATED STANDARD INTERIOR COST (MRP)
                    </span>
                    <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight text-[#FAF6F0]">
                      {formatIndianCurrency(estimateResult.totalMRP)}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Includes factory CNC precision, GST, branded hardware & installation in {selectedCity}</span>
                    </div>
                  </div>

                  {/* High Urgency FOMO Card: Spot-Booking Discount at Showroom */}
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#2a1d20] via-[#1f1618] to-[#171213] border-2 border-[#C1405D]/60 shadow-xl relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#3e2c30]">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#C1405D] uppercase tracking-wider">
                        <Flame className="w-4 h-4 fill-[#C1405D] text-[#C1405D] animate-bounce" />
                        <span>Exclusive Showroom Privilege</span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>2 of 5 Weekly Spot Vouchers Left</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-semibold text-neutral-200">
                          Spot-Booking Discount at Showroom:
                        </span>
                        <span className="font-mono text-base sm:text-lg font-bold text-emerald-400">
                          Save up to {formatIndianCurrency(estimateResult.discountAmount)} ({CAMPAIGN_CONFIG.discountPercent}% OFF)
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        <strong className="text-white">Discounts are NOT auto-applied online.</strong> To guarantee zero middlemen markups, this <strong className="text-emerald-400">{formatIndianCurrency(estimateResult.discountAmount)} saving</strong> is unlocked in-person exclusively when you visit our Flagship Experience Studio and book your project on the spot.
                      </p>

                      <div className="mt-3 pt-3 border-t border-[#3e2c30] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-neutral-400">Your In-Studio Spot Price:</span>
                        <span className="font-mono text-lg font-bold text-[#FAF6F0] bg-[#C1405D]/30 px-2.5 py-0.5 rounded-lg border border-[#C1405D]/50">
                          {formatIndianCurrency(estimateResult.offerPrice)}
                        </span>
                      </div>

                      <div className="pt-2 text-[10px] text-[#C69255] font-mono flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 shrink-0" />
                        <span>Voucher Ref: PENTA-SPOT-{leadPhone ? leadPhone.slice(-4) : '7392'} (Reserved for 48 Hours)</span>
                      </div>
                    </div>

                    {/* Showroom Address & Timings Banner */}
                    <div className="mt-4 p-3 rounded-xl bg-[#141011] border border-[#3e2c30] text-[11px] text-neutral-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <MapPin className="w-3.5 h-3.5 text-[#C1405D] shrink-0" />
                        <span>Flagship Experience Studio: Opp DLF Alameda, Sector 73, Gurugram</span>
                      </div>
                      <div className="text-neutral-400 pl-5 text-[10px]">
                        Timings: Tuesday – Sunday, 09:00 AM – 07:00 PM (Monday Closed)
                      </div>
                    </div>
                  </div>

                  {/* High Conversion CTAs */}
                  <div className="mt-6 space-y-3">
                    {/* Primary CTA: Visit Showroom to Avail Discount */}
                    <button
                      type="button"
                      onClick={handleSiteVisitClick}
                      id="book-site-visit-cta"
                      className="w-full min-h-[52px] py-3.5 px-6 bg-[#C1405D] hover:bg-[#a9334e] text-white text-sm sm:text-base font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <MapPin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      <span>Visit Showroom to Avail Spot Discount (Save {formatIndianCurrency(estimateResult.discountAmount)})</span>
                    </button>

                    {/* Secondary CTA: Skip the queue on WhatsApp */}
                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      id="whatsapp-estimate-cta"
                      className="w-full min-h-[48px] py-3 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Lock Spot-Booking Slot on WhatsApp</span>
                    </button>

                    {/* Third CTA: Talk to a Pentagram Expert */}
                    <a
                      href={`tel:${PENTAGRAM_WHATSAPP_CONFIG.phoneDisplay}`}
                      className="w-full min-h-[44px] py-2.5 px-4 bg-[#181415] hover:bg-[#251f21] border border-[#3b3234] text-neutral-300 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C69255]" />
                      <span>Call Studio ({PENTAGRAM_WHATSAPP_CONFIG.phoneDisplay}) • 09:00 AM – 07:00 PM (Tue–Sun)</span>
                    </a>
                  </div>
                </div>

                {/* Site Visit Confirmation Banner if triggered */}
                {siteVisitBooked && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">Site Visit Requested!</span>
                      <p className="mt-0.5 text-emerald-800">
                        Our Senior Interior Architect for {selectedCity} has received your estimate details. We will
                        reach out on WhatsApp at <strong>+91 {leadPhone}</strong> to confirm your exact laser 3D scan
                        slot.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Itemized Selected Requirements Breakdown (Section 32) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white rounded-3xl border border-[#EAE0D5] p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D5]">
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#201B1C]">YOUR SELECTED REQUIREMENTS</h3>
                      <p className="text-xs text-neutral-500">
                        Itemized component MRPs calculated for your home
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#C1405D] capitalize">
                      {selectedPackage} Specs
                    </span>
                  </div>

                  {/* Component Breakdown Table (NO FORMULAS SHOWN) */}
                  <div className="space-y-2.5">
                    {estimateResult.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] flex items-center justify-between text-xs"
                      >
                        <div className="pr-3">
                          <span className="font-bold text-[#201B1C] block text-sm">{item.label}</span>
                          <span className="text-[11px] text-neutral-500">{item.subtitle}</span>
                          {item.unsupportedMessage && (
                            <span className="text-[10px] text-amber-700 block mt-1">
                              * Custom site verification required
                            </span>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          {item.isAvailable ? (
                            <span className="font-mono text-sm font-bold text-[#201B1C]">
                              {formatIndianCurrency(item.mrp)}
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                              Site Verified
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Summary Breakdown */}
                  <div className="pt-3 border-t border-[#EAE0D5] space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-600">
                      <span>Total Estimated MRP:</span>
                      <span className="font-mono font-bold text-[#201B1C]">
                        {formatIndianCurrency(estimateResult.totalMRP)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-600">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#C1405D]" />
                        <span>Showroom Spot Privilege:</span>
                      </span>
                      <span className="font-mono text-emerald-700 font-bold">
                        Save {formatIndianCurrency(estimateResult.discountAmount)} at Studio
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-[#201B1C] pt-2 border-t border-[#EAE0D5]">
                      <span>Standard Online Estimate:</span>
                      <span className="font-mono text-[#201B1C]">
                        {formatIndianCurrency(estimateResult.totalMRP)}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500 italic text-right">
                      *Post spot-discount price: <strong className="text-emerald-700 font-mono">{formatIndianCurrency(estimateResult.offerPrice)}</strong> (avail in person upon spot booking)
                    </div>
                  </div>

                  {/* Material & Hardware Quick Summary */}
                  <div className="pt-3 border-t border-[#EAE0D5] text-[11px] text-neutral-600 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#201B1C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C1405D]" />
                      <span>{activeSpec.name} Specifications Standard:</span>
                    </div>
                    <p className="pl-5 text-neutral-500">
                      {activeSpec.carcassMaterial} • {activeSpec.hardware} • {activeSpec.paintBrand}
                    </p>
                  </div>
                </div>

                {/* Final Result Disclaimer (Section 48) */}
                <div className="p-4 bg-white rounded-2xl border border-[#EAE0D5] text-xs text-neutral-500 leading-relaxed space-y-1">
                  <span className="font-bold text-neutral-700 block">Pricing Disclaimer:</span>
                  <p>
                    Indicative MRP only. Final pricing may vary after site measurement, design finalisation, exact
                    quantities, material selection and site conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>

      {/* ============================================================ */}
      {/* PACKAGE SPECIFICATIONS MODAL (SECTIONS 22-29, 47) */}
      {/* ============================================================ */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl border border-[#EAE0D5] relative animate-in fade-in zoom-in-95 duration-200 text-left">
            {/* Modal Header */}
            <div className="bg-[#201B1C] text-white p-6 relative flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#C69255] uppercase tracking-wider block">
                  PENTAGRAM DESIGN SPECIFICATIONS
                </span>
                <h3 className="font-serif text-xl font-bold">{activeSpec.name} Package Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSpecModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Package Tabs */}
            <div className="flex border-b border-[#EAE0D5] bg-[#FAF6F0] p-1 gap-1">
              {(['essential', 'premium', 'luxury'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPackage(p)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                    selectedPackage === p
                      ? 'bg-white text-[#C1405D] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs text-[#201B1C]">
              {/* Raw Materials & Finishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] space-y-1">
                  <span className="text-neutral-500 font-semibold block text-[10px] uppercase">Carcass Material</span>
                  <span className="font-bold block">{activeSpec.carcassMaterial} ({activeSpec.carcassThickness})</span>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] space-y-1">
                  <span className="text-neutral-500 font-semibold block text-[10px] uppercase">Shutter Material & Finish</span>
                  <span className="font-bold block">{activeSpec.shutterMaterial} — {activeSpec.shutterFinish}</span>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] space-y-1">
                  <span className="text-neutral-500 font-semibold block text-[10px] uppercase">Hardware Mechanism</span>
                  <span className="font-bold block">{activeSpec.hardware}</span>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] space-y-1">
                  <span className="text-neutral-500 font-semibold block text-[10px] uppercase">False Ceiling & Paint</span>
                  <span className="font-bold block">{activeSpec.falseCeilingBrand} • {activeSpec.paintBrand}</span>
                </div>
              </div>

              {/* TV Unit Specifications */}
              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] space-y-1">
                <span className="text-neutral-500 font-semibold block text-[10px] uppercase">TV Unit Parameters</span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-700">
                  <span>Max Dimensions: {activeSpec.tvUnitMax}</span>
                  <span className="font-bold text-[#C1405D]">Wall Panelling: {activeSpec.tvWallPanelling}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block mb-2">
                  Key Inclusions in {activeSpec.name}:
                </span>
                <ul className="space-y-1.5 text-neutral-600 pl-1">
                  {activeSpec.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <span className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block mb-2">
                  Package Exclusions (Available as Custom Add-ons):
                </span>
                <ul className="space-y-1.5 text-neutral-500 pl-1">
                  {activeSpec.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-50 border-t border-[#EAE0D5] flex justify-end">
              <button
                type="button"
                onClick={() => setShowSpecModal(false)}
                className="px-6 py-2 bg-[#201B1C] hover:bg-neutral-800 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
