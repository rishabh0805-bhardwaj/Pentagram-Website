/**
 * Pentagram: Your Space Expert - Core Type Definitions
 * Strictly scoped to the 6 serviceable Delhi NCR cities.
 */

export type ServiceableCity = 
  | 'Gurgaon' 
  | 'Noida' 
  | 'Greater Noida' 
  | 'Faridabad' 
  | 'Delhi' 
  | 'New Delhi';

export const SERVICEABLE_CITIES: { id: ServiceableCity; name: string; altNames: string[]; tag: string }[] = [
  { id: 'Gurgaon', name: 'Gurgaon (Gurugram)', altNames: ['Gurgaon', 'Gurugram', 'Cyber City', 'Golf Course Road', 'DLF Phase 1-5'], tag: 'Golf Course Rd, Sohna Rd & New Gurgaon' },
  { id: 'Noida', name: 'Noida', altNames: ['Noida', 'Sector 62', 'Sector 137', 'Sector 150', 'Expressway'], tag: 'Noida Expressway & Central Sectors' },
  { id: 'Greater Noida', name: 'Greater Noida', altNames: ['Greater Noida', 'Greater Noida West', 'Noida Extension', 'Pari Chowk'], tag: 'Greater Noida West & Pari Chowk' },
  { id: 'Faridabad', name: 'Faridabad', altNames: ['Faridabad', 'Neharpar', 'Sector 14-16', 'Greenfield'], tag: 'Greater Faridabad & Sectors 14-21' },
  { id: 'Delhi', name: 'Delhi', altNames: ['Delhi', 'South Delhi', 'Dwarka', 'Vasant Kunj', 'Punjabi Bagh'], tag: 'South Delhi, West Delhi & Dwarka' },
  { id: 'New Delhi', name: 'New Delhi', altNames: ['New Delhi', 'Central Delhi', 'Chanakyapuri', 'Civil Lines'], tag: 'Central Delhi & Lutyens Belt' }
];

export type NavigationPage = 
  | 'home' 
  | 'about' 
  | 'stories' 
  | 'why-us' 
  | 'how-it-works'
  | 'offerings' 
  | 'categories'
  | 'projects' 
  | 'specialities' 
  | 'magazine' 
  | 'pentagram-tv' 
  | 'design-ideas' 
  | 'reviews' 
  | 'estimator'
  | 'policies'
  | 'trust-centre';

export interface ServiceOffering {
  id: string;
  name: string;
  category: 'Interiors' | 'Furnishings' | 'Turnkey';
  tagline: string;
  description: string;
  startingPrice: string;
  warranty: string;
  image: string;
  popularFeatures: string[];
  materials: string[];
  popularInCities: ServiceableCity[];
}

export interface ProjectPortfolioItem {
  id: string;
  title: string;
  client: string;
  society: string;
  city: ServiceableCity;
  roomType: string;
  bhk: string;
  budgetRange: string;
  timelineDays: number;
  featuredImage: string;
  gallery: string[];
  highlights: string[];
  testimonial: {
    quote: string;
    author: string;
    verifiedFlat: string;
  };
}

export interface ClientStory {
  id: string;
  title: string;
  homeowner: string;
  societyAndCity: string;
  city: ServiceableCity;
  bhkType: string;
  turnaroundDays: number;
  budgetActual: string;
  milestonesMet: number;
  beforeImage: string;
  afterImage: string;
  narrative: string;
  designHighlights: string[];
  clientQuote: string;
}

export interface MagazineArticle {
  id: string;
  slug: string;
  title: string;
  category: 
    | 'Kitchen Design Ideas'
    | 'Wardrobe & Storage Solutions'
    | 'Full Home Interior Guides'
    | 'False Ceiling & Lighting'
    | 'Budget & Cost Guides'
    | 'City Guides'
    | 'Vastu & Space Planning'
    | 'Before/After Transformations';
  targetCity?: ServiceableCity;
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    experience: string;
    verifiedBadge: string;
  };
  tldr: string[]; // GEO citable summary points
  citableDataPoints: { label: string; value: string }[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  faqList: {
    question: string;
    answer: string;
  }[];
  heroImage: string;
  likes?: number;
}

export interface RoomCityMatrixItem {
  roomType: string;
  city: ServiceableCity;
  slug: string;
  pageTitle: string;
  h1: string;
  metaDescription: string;
  pricePerSqFtRange: string;
  averageTimelineDays: string;
  localIntro: string;
  heroImage: string;
  designStyles: string[];
  popularSocieties: string[];
  faqs: { question: string; answer: string }[];
}

export interface CostEstimatorState {
  bhk: '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Villa';
  city: ServiceableCity;
  scope: {
    modularKitchen: boolean;
    wardrobes: number; // count
    falseCeiling: boolean;
    wallTreatments: boolean;
    lightingAndElectrical: boolean;
    furnishingAndDecor: boolean;
    bathroomVanities: boolean;
  };
  materialFinish: 'Essential (Commercial Ply + Laminate)' | 'Premium (BWP Marine Ply + Acrylic)' | 'Luxury (HDHMR + PU Lacquer / Veneer)';
  kitchenLayout: 'L-Shape' | 'Straight' | 'Parallel' | 'U-Shape' | 'Island';
}
