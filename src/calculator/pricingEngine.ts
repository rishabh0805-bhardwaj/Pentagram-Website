import {
  InteriorPackage,
  KitchenDesignShape,
  TVUnitSize,
  CalculatorState,
  CalculationResult,
  ItemEstimateBreakdown,
  PackageSpecification,
} from './types';

/**
 * MASTER CUSTOMER-FACING MRP MATRIX
 * Strictly defined according to Pentagram commercial specifications.
 * Calculation methodology remains internal and private.
 */
export const PRICING_CONFIG = {
  essential: {
    kitchen: 1952, // per sq.ft
    wardrobe: 1830, // per sq.ft
    tvStandard: 26840, // per unit
    tvLarge: 42700, // per unit
    storage: 1830, // per sq.ft
    falseCeiling: 170.80, // per sq.ft
    electrical: 146.40, // per sq.ft
    painting: 31, // per sq.ft
  },
  premium: {
    kitchen: 2100, // per sq.ft
    wardrobe: 1900, // per sq.ft
    tvStandard: 32000, // per unit
    tvLarge: 48700, // per unit
    storage: 1900, // per sq.ft
    falseCeiling: 170.80, // per sq.ft
    electrical: 165, // per sq.ft
    painting: 42.70, // per sq.ft
  },
  luxury: {
    kitchen: 2500, // per sq.ft
    wardrobe: 2200, // per sq.ft
    tvStandard: 52000, // per unit
    tvLarge: 68700, // per unit
    storage: 2200, // per sq.ft
    falseCeiling: 190, // per sq.ft
    electrical: 220, // per sq.ft
    painting: 48, // per sq.ft
  },
} as const;

/**
 * CAMPAIGN CONFIGURATION
 * Configurable marketing campaign discount. V1 default: 10%.
 */
export const CAMPAIGN_CONFIG = {
  name: 'Pentagram Special Offer',
  discountPercent: 10,
} as const;

/**
 * PENTAGRAM OFFICIAL WHATSAPP CONFIGURATION
 * Single source of truth across the application.
 */
export const PENTAGRAM_WHATSAPP_CONFIG = {
  number: '919217983737',
  phoneDisplay: '+91 9217983737',
} as const;

// -------------------------------------------------------------
// INDIVIDUAL COMPONENT CALCULATION FUNCTIONS
// -------------------------------------------------------------

/**
 * L-Shape Kitchen Calculation
 * Uses documented Pentagram methodology:
 * Normal area: (length1 + length2) * 5
 * Loft area: (length1 + length2) * 7
 * Internal formula: area * package rate
 */
export function calculateLShapeKitchen(
  pkg: InteriorPackage,
  length1: number,
  length2: number,
  loft: boolean
): { mrp: number; isAvailable: true } {
  const safeL1 = Math.max(0, Number(length1) || 0);
  const safeL2 = Math.max(0, Number(length2) || 0);
  const factor = loft ? 7 : 5;
  const internalArea = (safeL1 + safeL2) * factor;
  const rate = PRICING_CONFIG[pkg].kitchen;
  const mrp = Math.round(internalArea * rate);
  return { mrp, isAvailable: true };
}

/**
 * Straight Kitchen Calculation
 * Uses standard Pentagram modular calculation:
 * Normal area: length * 5
 * Loft area: length * 7
 */
export function calculateStraightKitchen(
  pkg: InteriorPackage,
  length: number,
  loft: boolean
): { mrp: number; isAvailable: true } {
  const safeL = Math.max(1, Number(length) || 0);
  const factor = loft ? 7 : 5;
  const internalArea = safeL * factor;
  const rate = PRICING_CONFIG[pkg].kitchen;
  const mrp = Math.round(internalArea * rate);
  return { mrp, isAvailable: true };
}

/**
 * Parallel Kitchen Calculation
 * Dual-counter calculation:
 * Normal area: (length1 + length2) * 5
 * Loft area: (length1 + length2) * 7
 */
export function calculateParallelKitchen(
  pkg: InteriorPackage,
  length1: number,
  length2: number,
  loft: boolean
): { mrp: number; isAvailable: true } {
  const safeL1 = Math.max(1, Number(length1) || 0);
  const safeL2 = Math.max(1, Number(length2) || 0);
  const factor = loft ? 7 : 5;
  const internalArea = (safeL1 + safeL2) * factor;
  const rate = PRICING_CONFIG[pkg].kitchen;
  const mrp = Math.round(internalArea * rate);
  return { mrp, isAvailable: true };
}

/**
 * U-Shape Kitchen Calculation
 * Three-wall counter calculation:
 * Normal area: (length1 + length2 + length3) * 5
 * Loft area: (length1 + length2 + length3) * 7
 */
export function calculateUShapeKitchen(
  pkg: InteriorPackage,
  length1: number,
  length2: number,
  length3: number,
  loft: boolean
): { mrp: number; isAvailable: true } {
  const safeL1 = Math.max(1, Number(length1) || 0);
  const safeL2 = Math.max(1, Number(length2) || 0);
  const safeL3 = Math.max(1, Number(length3) || 0);
  const factor = loft ? 7 : 5;
  const internalArea = (safeL1 + safeL2 + safeL3) * factor;
  const rate = PRICING_CONFIG[pkg].kitchen;
  const mrp = Math.round(internalArea * rate);
  return { mrp, isAvailable: true };
}

/**
 * Island Kitchen Calculation
 * Main counter (with optional loft) + Freestanding Island Counter (base cabinets + quartz top)
 */
export function calculateIslandKitchen(
  pkg: InteriorPackage,
  mainLength: number,
  islandLength: number,
  loft: boolean
): { mrp: number; isAvailable: true } {
  const safeMain = Math.max(1, Number(mainLength) || 0);
  const safeIsland = Math.max(1, Number(islandLength) || 0);
  const mainFactor = loft ? 7 : 5;
  // Island counter has dual-sided base units / breakfast counter factor = 5.5
  const internalArea = safeMain * mainFactor + safeIsland * 5.5;
  const rate = PRICING_CONFIG[pkg].kitchen;
  const mrp = Math.round(internalArea * rate);
  return { mrp, isAvailable: true };
}

/**
 * Wardrobes Calculation
 * Standard dimensions: Width 6 ft, Height 7 ft (without loft = 42 sq.ft; with loft = 54 sq.ft)
 */
export function calculateWardrobes(
  pkg: InteriorPackage,
  quantity: number,
  loft: boolean
): number {
  const safeQty = Math.max(0, Number(quantity) || 0);
  const internalAreaPerUnit = loft ? 6 * (7 + 2) : 6 * 7;
  const rate = PRICING_CONFIG[pkg].wardrobe;
  return Math.round(safeQty * internalAreaPerUnit * rate);
}

/**
 * TV Unit Calculation
 * Fixed package-specific MRP per unit (Standard or Large)
 */
export function calculateTVUnit(
  pkg: InteriorPackage,
  quantity: number,
  size: TVUnitSize
): number {
  const safeQty = Math.max(0, Number(quantity) || 0);
  const unitRate =
    size === 'large'
      ? PRICING_CONFIG[pkg].tvLarge
      : PRICING_CONFIG[pkg].tvStandard;
  return Math.round(safeQty * unitRate);
}

/**
 * Storage Calculation
 * Standard dimensions: 7 ft height * 3 ft width = 21 sq.ft per unit
 */
export function calculateStorage(
  pkg: InteriorPackage,
  quantity: number
): number {
  const safeQty = Math.max(0, Number(quantity) || 0);
  const internalAreaPerUnit = 7 * 3; // 21 sq.ft
  const rate = PRICING_CONFIG[pkg].storage;
  return Math.round(safeQty * internalAreaPerUnit * rate);
}

/**
 * False Ceiling Calculation
 * Internal: 75% of total property area * package rate
 */
export function calculateFalseCeiling(
  pkg: InteriorPackage,
  propertyArea: number
): number {
  const safeArea = Math.max(0, Number(propertyArea) || 0);
  const chargeableArea = safeArea * 0.75;
  const rate = PRICING_CONFIG[pkg].falseCeiling;
  return Math.round(chargeableArea * rate);
}

/**
 * Electrical & Lights Calculation
 * Internal: total property area * package rate
 */
export function calculateElectrical(
  pkg: InteriorPackage,
  propertyArea: number
): number {
  const safeArea = Math.max(0, Number(propertyArea) || 0);
  const rate = PRICING_CONFIG[pkg].electrical;
  return Math.round(safeArea * rate);
}

/**
 * Painting Calculation
 * Internal: property area * 2.5 * package rate
 */
export function calculatePainting(
  pkg: InteriorPackage,
  propertyArea: number
): number {
  const safeArea = Math.max(0, Number(propertyArea) || 0);
  const internalPaintArea = safeArea * 2.5;
  const rate = PRICING_CONFIG[pkg].painting;
  return Math.round(internalPaintArea * rate);
}

// -------------------------------------------------------------
// MASTER CALCULATION ENGINE
// -------------------------------------------------------------

export function calculateInteriorEstimate(
  state: CalculatorState
): CalculationResult {
  const { package: pkg, propertyType, area, selectedRequirements } = state;
  const items: ItemEstimateBreakdown[] = [];
  let totalMRP = 0;
  let hasUnsupportedItems = false;

  // 1. Modular Kitchen
  if (selectedRequirements.includes('kitchen')) {
    if (state.kitchen.shape === 'L-Shape') {
      const res = calculateLShapeKitchen(
        pkg,
        state.kitchen.length1,
        state.kitchen.length2,
        state.kitchen.loft
      );
      items.push({
        id: 'kitchen',
        label: 'Modular Kitchen',
        subtitle: `L-Shape (${state.kitchen.length1} ft × ${state.kitchen.length2} ft${
          state.kitchen.loft ? ' + Loft' : ''
        })`,
        mrp: res.mrp,
        isAvailable: true,
      });
      totalMRP += res.mrp;
    } else if (state.kitchen.shape === 'Straight') {
      const res = calculateStraightKitchen(pkg, state.kitchen.length1, state.kitchen.loft);
      items.push({
        id: 'kitchen',
        label: 'Modular Kitchen',
        subtitle: `Straight Layout (${state.kitchen.length1} ft${
          state.kitchen.loft ? ' + Loft' : ''
        })`,
        mrp: res.mrp,
        isAvailable: true,
      });
      totalMRP += res.mrp;
    } else if (state.kitchen.shape === 'Parallel') {
      const res = calculateParallelKitchen(
        pkg,
        state.kitchen.length1,
        state.kitchen.length2,
        state.kitchen.loft
      );
      items.push({
        id: 'kitchen',
        label: 'Modular Kitchen',
        subtitle: `Parallel Layout (${state.kitchen.length1} ft × ${state.kitchen.length2} ft${
          state.kitchen.loft ? ' + Loft' : ''
        })`,
        mrp: res.mrp,
        isAvailable: true,
      });
      totalMRP += res.mrp;
    } else if (state.kitchen.shape === 'U-Shape') {
      const l3 = state.kitchen.length3 || state.kitchen.length1;
      const res = calculateUShapeKitchen(
        pkg,
        state.kitchen.length1,
        state.kitchen.length2,
        l3,
        state.kitchen.loft
      );
      items.push({
        id: 'kitchen',
        label: 'Modular Kitchen',
        subtitle: `U-Shape Layout (${state.kitchen.length1} ft × ${state.kitchen.length2} ft × ${l3} ft${
          state.kitchen.loft ? ' + Loft' : ''
        })`,
        mrp: res.mrp,
        isAvailable: true,
      });
      totalMRP += res.mrp;
    } else if (state.kitchen.shape === 'Island') {
      const islandLen = state.kitchen.length3 || 6;
      const res = calculateIslandKitchen(
        pkg,
        state.kitchen.length1,
        islandLen,
        state.kitchen.loft
      );
      items.push({
        id: 'kitchen',
        label: 'Modular Kitchen',
        subtitle: `Island Layout (Main: ${state.kitchen.length1} ft + Island: ${islandLen} ft${
          state.kitchen.loft ? ' + Loft' : ''
        })`,
        mrp: res.mrp,
        isAvailable: true,
      });
      totalMRP += res.mrp;
    }
  }

  // 2. Wardrobes
  if (selectedRequirements.includes('wardrobes')) {
    const qty = state.wardrobes.quantity;
    const mrp = calculateWardrobes(pkg, qty, state.wardrobes.loft);
    items.push({
      id: 'wardrobes',
      label: 'Wardrobes',
      subtitle: `${qty} Unit${qty > 1 ? 's' : ''}${
        state.wardrobes.loft ? ' (with Loft)' : ''
      }`,
      mrp,
      isAvailable: true,
    });
    totalMRP += mrp;
  }

  // 3. TV Unit
  if (selectedRequirements.includes('tvUnit')) {
    const qty = state.tvUnit.quantity;
    const sizeLabel = state.tvUnit.size === 'large' ? 'Large' : 'Standard';
    const mrp = calculateTVUnit(pkg, qty, state.tvUnit.size);
    items.push({
      id: 'tvUnit',
      label: 'TV Unit',
      subtitle: `${qty} Unit${qty > 1 ? 's' : ''} (${sizeLabel})`,
      mrp,
      isAvailable: true,
    });
    totalMRP += mrp;
  }

  // 4. Storage
  if (selectedRequirements.includes('storage')) {
    const qty = state.storage.quantity;
    const mrp = calculateStorage(pkg, qty);
    items.push({
      id: 'storage',
      label: 'Storage',
      subtitle: `${qty} Unit${qty > 1 ? 's' : ''} (3 ft × 7 ft)`,
      mrp,
      isAvailable: true,
    });
    totalMRP += mrp;
  }

  // 5. False Ceiling
  if (selectedRequirements.includes('falseCeiling')) {
    const mrp = calculateFalseCeiling(pkg, area);
    items.push({
      id: 'falseCeiling',
      label: 'False Ceiling',
      subtitle: 'POP Designer Coves & Perimeter Detailing',
      mrp,
      isAvailable: true,
    });
    totalMRP += mrp;
  }

  // 6. Painting
  if (selectedRequirements.includes('painting')) {
    const mrp = calculatePainting(pkg, area);
    items.push({
      id: 'painting',
      label: 'Painting',
      subtitle: 'Complete Internal Wall Emulsion & Putty',
      mrp,
      isAvailable: true,
    });
    totalMRP += mrp;
  }

  // 7. Electrical & Lights
  if (selectedRequirements.includes('electrical')) {
    const mrp = calculateElectrical(pkg, area);
    items.push({
      id: 'electrical',
      label: 'Electrical & Lights',
      subtitle: 'FR/FRLS Grade Conduiting & Point Wiring',
      mrp,
      isAvailable: true,
    });
    totalMRP += mrp;
  }

  // DISCOUNT ENGINE
  const discountPercent = CAMPAIGN_CONFIG.discountPercent;
  const discountAmount = Math.round(totalMRP * (discountPercent / 100));
  const offerPrice = Math.max(0, totalMRP - discountAmount);

  return {
    package: pkg,
    propertyType,
    area,
    totalMRP,
    discountPercent,
    discountAmount,
    offerPrice,
    items,
    hasUnsupportedItems,
  };
}

// -------------------------------------------------------------
// UTILITIES: INDIAN CURRENCY FORMATTER
// -------------------------------------------------------------

export function formatIndianCurrency(amount: number): string {
  const safeVal = Math.round(Number(amount) || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(safeVal);
}

// -------------------------------------------------------------
// ANALYTICS READY EVENT TRACKER
// -------------------------------------------------------------

export function trackEvent(
  eventName: string,
  payload?: Record<string, unknown>
): void {
  try {
    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: eventName, ...payload, timestamp: new Date().toISOString() });
      }
    }
  } catch {
    // Fail silently
  }
}

// -------------------------------------------------------------
// PACKAGE SPECIFICATIONS DATA (SECTIONS 22-29)
// -------------------------------------------------------------

export const PACKAGE_SPECIFICATIONS: Record<InteriorPackage, PackageSpecification> = {
  essential: {
    name: 'Essential',
    tagline: 'High Durability & Value Engineering',
    carcassMaterial: 'PL HDF-HMR',
    carcassThickness: '18 mm',
    shutterMaterial: 'PL HDF-HMR',
    shutterThickness: '18 mm',
    shutterFinish: 'Laminated',
    internalFinish: 'Laminated',
    edgeBand: 'Yes (2mm High-Pressure Hotmelt)',
    countertop: 'No (Available as add-on)',
    sink: 'No (Available as add-on)',
    hardware: 'Premium Imported Hardware',
    falseCeilingBrand: 'POP - SakarnI',
    electricalGrade: 'KEI - FR Grade Fire Resistant Wires',
    paintBrand: 'Asian Paint Tractor Emulsion',
    wardrobeFinish: 'Laminated with Soft-Close Hinges',
    tvUnitFinish: 'Laminated Shutter & Console',
    tvUnitMax: '6 ft Width × 1 ft Height',
    tvWallPanelling: 'Not Included in Base Package',
    storageFinish: 'Laminated Sturdy Framework',
    inclusions: [
      '18mm PL HDF-HMR moisture-resistant core',
      'German CNC precision ±0.2mm edge-cut',
      'Drawers, hinges & internal organizers',
      '10-Year Comprehensive Carcass Warranty',
      '4-Stage Milestone Payment Protection',
    ],
    exclusions: [
      'Kitchen appliances (chimney, hob, microwave)',
      'Loose wardrobe accessories & internal pull-outs',
      'TV unit decorative accessories & soundbars',
      'False ceiling lights & chandeliers',
      'Wallpaper & feature wall art',
    ],
  },
  premium: {
    name: 'Premium',
    tagline: 'Refined Living & German Hardware',
    carcassMaterial: 'Certified High Quality Raw Materials & Ply',
    carcassThickness: '18 mm',
    shutterMaterial: 'ISI Grade MR Ply',
    shutterThickness: '18 mm',
    shutterFinish: 'High-Gloss Acrylic / Fluted Glass',
    internalFinish: 'Laminated Anti-Bacterial Liner',
    edgeBand: 'Yes (Seamless Laser-Fused PUR)',
    countertop: 'No (Available as add-on)',
    sink: 'No (Available as add-on)',
    hardware: 'Hettich German Engineered Hardware',
    falseCeilingBrand: 'POP - SakarnI',
    electricalGrade: 'KEI - FRLS Grade Flame Retardant Low Smoke',
    paintBrand: 'Asian Paint Premium Emulsion',
    wardrobeFinish: 'Acrylic / Glass with Hettich Soft-Close',
    tvUnitFinish: 'Acrylic Finish with Accent Panelling',
    tvUnitMax: '7 ft Width × 1 ft Height',
    tvWallPanelling: 'Included in Base Package',
    storageFinish: 'Laminate + Fluted Tinted Glass',
    inclusions: [
      'Certified high quality raw materials & calibrated plywood',
      'Genuine Hettich Sensys soft-close hardware',
      'Seamless acrylic & fluted glass accents',
      '10-Year Comprehensive Warranty',
      '45-Day Guaranteed Handover',
    ],
    exclusions: [
      'Kitchen appliances (chimney, hob, built-in ovens)',
      'Loose wardrobe accessories',
      'TV unit soundbar & decorative decor',
      'Chandeliers & decorative pendant lighting',
      'Wallpaper & customized artwork',
    ],
  },
  luxury: {
    name: 'Luxury',
    tagline: 'Architectural Bespoke & Italian Finishes',
    carcassMaterial: '100% Certified High Quality Raw Materials & Boiling Waterproof Plywood',
    carcassThickness: '18 mm',
    shutterMaterial: 'Calibrated Plywood & Engineered Core',
    shutterThickness: '25 mm Heavy Duty',
    shutterFinish: 'Italian PU Lacquer Finish',
    internalFinish: 'Italian PU Lacquer Finish',
    edgeBand: 'NA (Seamless Seamless PU Coated Edges)',
    countertop: 'No (Available as add-on)',
    sink: 'No (Available as add-on)',
    hardware: 'Blum / Hettich Luxury Servo-Drive & Legrabox',
    falseCeilingBrand: 'POP - SakarnI Gold Premium',
    electricalGrade: 'Polycab - FRLS Grade Ultra-Safe',
    paintBrand: 'Asian Paint Royal Matt / Silk Sheen',
    wardrobeFinish: 'Full Italian PU Lacquer Finish',
    tvUnitFinish: 'Italian PU Finish with Integrated Louvers',
    tvUnitMax: '8 ft Width × 1.5 ft Height',
    tvWallPanelling: 'Included in Base Package',
    storageFinish: 'Italian PU + Profiled Tinted Glass',
    inclusions: [
      '100% Certified high quality raw materials with boiling water resistance',
      'Italian multi-coat PU lacquer finishes',
      'Blum / Hettich luxury motion hardware',
      'Full architectural wall panelling on TV unit',
      '10-Year Comprehensive Warranty & Dedicated Project Architect',
    ],
    exclusions: [
      'Kitchen built-in luxury appliances',
      'Loose wardrobe accessories',
      'TV unit decorative accessories',
      'Imported crystal chandeliers',
      'Handcrafted imported wallpapers',
    ],
  },
};
