import { ServiceableCity } from '../types';

export type InteriorPackage = 'essential' | 'premium' | 'luxury';

export type PropertyType =
  | '1 BHK'
  | '2 BHK'
  | '3 BHK'
  | '4 BHK'
  | 'Independent Home'
  | 'Villa';

export type RequirementType =
  | 'kitchen'
  | 'wardrobes'
  | 'tvUnit'
  | 'storage'
  | 'falseCeiling'
  | 'painting'
  | 'electrical';

export type KitchenDesignShape = 'L-Shape' | 'Straight' | 'Parallel' | 'U-Shape' | 'Island';

export type TVUnitSize = 'standard' | 'large';

export interface KitchenConfig {
  shape: KitchenDesignShape;
  length1: number; // in feet (e.g. 10)
  length2: number; // in feet (e.g. 6 or parallel counter)
  length3?: number; // in feet (e.g. 8 for U-shape 3rd wall or Island counter)
  loft: boolean;
}

export interface WardrobeConfig {
  quantity: number;
  loft: boolean;
}

export interface TVUnitConfig {
  quantity: number;
  size: TVUnitSize;
}

export interface StorageConfig {
  quantity: number;
}

export interface CalculatorState {
  package: InteriorPackage;
  propertyType: PropertyType;
  area: number; // in sq.ft, range 400 - 15000
  city: ServiceableCity;
  selectedRequirements: RequirementType[];
  kitchen: KitchenConfig;
  wardrobes: WardrobeConfig;
  tvUnit: TVUnitConfig;
  storage: StorageConfig;
}

export interface ItemEstimateBreakdown {
  id: RequirementType;
  label: string;
  subtitle: string;
  mrp: number;
  isAvailable: boolean;
  unsupportedMessage?: string;
}

export interface CalculationResult {
  package: InteriorPackage;
  propertyType: PropertyType;
  area: number;
  totalMRP: number;
  discountPercent: number;
  discountAmount: number;
  offerPrice: number;
  items: ItemEstimateBreakdown[];
  hasUnsupportedItems: boolean;
}

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  city: ServiceableCity;
  package: InteriorPackage;
  propertyType: PropertyType;
  bhk: string;
  area: number;
  selectedRequirements: string[];
  kitchen?: {
    shape: string;
    dimensions?: string;
    loft: boolean;
    mrp: number;
  };
  wardrobes?: {
    quantity: number;
    loft: boolean;
    mrp: number;
  };
  tvUnits?: {
    quantity: number;
    size: TVUnitSize;
    mrp: number;
  };
  storage?: {
    quantity: number;
    mrp: number;
  };
  falseCeiling?: {
    mrp: number;
  };
  painting?: {
    mrp: number;
  };
  electrical?: {
    mrp: number;
  };
  totalMRP: number;
  discountPercent: number;
  discountAmount: number;
  offerPrice: number;
  timestamp: string;
}

export interface PackageSpecification {
  name: string;
  tagline: string;
  carcassMaterial: string;
  carcassThickness: string;
  shutterMaterial: string;
  shutterThickness: string;
  shutterFinish: string;
  internalFinish: string;
  edgeBand: string;
  countertop: string;
  sink: string;
  hardware: string;
  falseCeilingBrand: string;
  electricalGrade: string;
  paintBrand: string;
  wardrobeFinish: string;
  tvUnitFinish: string;
  tvUnitMax: string;
  tvWallPanelling: string;
  storageFinish: string;
  inclusions: string[];
  exclusions: string[];
}
