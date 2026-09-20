/**
 * Pentagram: Your Space Expert - Core Static Data
 * Dedicated exclusively to Gurgaon, Noida, Greater Noida, Faridabad, Delhi, and New Delhi.
 */

import {
  ServiceableCity,
  ServiceOffering,
  ProjectPortfolioItem,
  ClientStory,
  MagazineArticle,
  RoomCityMatrixItem,
} from '../types';

export const BRAND_DETAILS = {
  name: 'PENTAGRAM: YOUR HOME EXPERT',
  shortName: 'Pentagram',
  tagline: 'Your Home Expert',
  legalEntity: 'Verdoire Interiors & Furnishings Pvt. Ltd.',
  legalNote: 'Pentagram: Your Home Expert is a registered trading brand of Verdoire Interiors & Furnishings Pvt. Ltd.',
  cin: 'U74999DL2021PTC389421',
  gstin: '06AAACV4912P1ZR',
  udyam: 'UDYAM-HR-05-0048912',
  phone: '+91 9217983737',
  formattedPhone: '+91-9217983737',
  email: 'care@pentagram.expert',
  whatsappNumber: '919217983737',
  whatsappUrl: 'https://wa.me/919217983737?text=Hi%20Pentagram,%20I%20would%20like%20to%20consult%20for%20my%20home%20in%20Delhi%20NCR',
  facebookUrl: 'https://www.facebook.com/pentagramexpert',
  instagramUrl: 'https://www.instagram.com/pentagram.expert',
  instagramHandle: 'pentagram.expert',
  domain: 'pentagram.expert',
  trustCenterUrl: 'https://pentagram.expert/policies',
  termsUrl: 'https://pentagram.expert/policies/terms-and-conditions',
  experienceCenter: {
    address: 'Pentagram, Opp DLF Alameda, Sector 73, Gurugram, Haryana',
    shortAddress: 'Pentagram, Opp DLF Alameda, Sector 73, Gurugram Haryana',
    noidaStudio: 'Design Suite 402, Sector 62, Noida, Uttar Pradesh 201309',
    hours: 'Tuesday – Sunday, 09:00 AM – 07:00 PM IST (Monday Closed)',
    googleMapsUrl: 'https://maps.google.com/?q=Pentagram,+Opp+DLF+Alameda,+Sector+73,+Gurugram+Haryana',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Pentagram,+Opp+DLF+Alameda,+Sector+73,+Gurugram+Haryana',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Pentagram%2C%20Opp%20DLF%20Alameda%2C%20Sector%2073%2C%20Gurugram%20Haryana&t=&z=15&ie=UTF8&iwloc=&output=embed',
    coordinates: {
      latitude: 28.4115,
      longitude: 77.0142,
    },
  },
  metrics: {
    homesDelivered: 1240,
    googleRating: 4.93,
    totalReviews: 1240,
    onTimeDeliveryRate: '98.6%',
    warrantyYears: 10,
    handoverDays: 45,
    automationRatio: '70% Automated Precision + 30% Master Craft',
  },
};

export const CORE_USPS = [
  {
    id: 'design-os',
    title: 'Proprietary Pentagram Design OS',
    subtitle: 'AI-Assisted Precision & Quoting',
    description:
      'Our proprietary platform automates 70% of production cut-lists, zero-waste panel nesting, and precision material quoting — eliminating surprise cost escalations and human calculation errors.',
    icon: 'Cpu',
    tag: '70% Tech + 30% Craft',
  },
  {
    id: 'milestone-payments',
    title: 'Stage-Wise Milestone Payments',
    subtitle: 'Zero Contractor Advance Risk',
    description:
      'Transparent stage payments. Your funds remain under your control and are released stage-by-stage only after you physically inspect and approve each quality checkpoint and on-site delivery.',
    icon: 'ShieldCheck',
    tag: '100% Financial Safety',
  },
  {
    id: 'in-house-manufacturing',
    title: 'In-House Factory with QR Tracking',
    subtitle: 'Zero Middlemen, Flawless Edge-Banding',
    description:
      'Engineered with German edge-banding and laser-cut CNC accuracy in our own facility. Every modular cabinet carries a scannable QR code tracking batch, warranty, and material grade.',
    icon: 'Factory',
    tag: 'German Edge Precision',
  },
  {
    id: 'warranty-handover',
    title: '10-Year Warranty & 45-Day Move-in',
    subtitle: 'Contractually Guaranteed Timelines',
    description:
      'Enjoy complete peace of mind with our 10-year warranty on modular plywood and hardware, backed by a strict 45-day handover guarantee with daily delay penalty commitments.',
    icon: 'Award',
    tag: '45-Day Handover Guarantee',
  },
  {
    id: 'dedicated-pm',
    title: 'Single Point of Contact (PM Model)',
    subtitle: 'No Juggling Carpenters or Electricians',
    description:
      'One dedicated Senior Project Manager coordinates civil, electrical, plumbing, carpentry, and deep cleaning with daily photo check-ins via your private project dashboard.',
    icon: 'Users',
    tag: 'Zero Stress Execution',
  },
  {
    id: 'ncr-climate-engineering',
    title: 'Delhi NCR Weather-Engineered Materials',
    subtitle: 'Resistant to Humidity, Termites & Smog',
    description:
      'Specially calibrated high quality raw materials, boiling waterproof protection, anti-termite core treatments, and low-VOC finishes that survive extreme Delhi heat and seasonal monsoon humidity.',
    icon: 'Sparkles',
    tag: 'High Quality Raw Materials',
  },
];

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: 'modular-kitchen',
    name: 'Modular Kitchens',
    category: 'Interiors',
    tagline: 'Ergonomic, heat-resistant & clutter-free culinary spaces',
    description:
      'Designed with the golden kitchen work triangle, German soft-close BLUM/Hettich hinges, quartz/granite worktops, and waterproof high quality raw materials cabinetry built for Indian deep frying and spice storage.',
    startingPrice: '₹1.75 Lakhs',
    warranty: '10-Year Warranty',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Tandem drawers & spice pull-outs',
      'Hydraulic lift-up overhead shutters',
      'Built-in appliance garages',
      'Heat-resistant backsplashes',
    ],
    materials: ['High Quality Raw Materials', 'High-Gloss Acrylic', 'Anti-Fingerprint Matte PU', 'Italian Quartz'],
    popularInCities: ['Gurgaon', 'Noida', 'Delhi', 'Greater Noida', 'Faridabad', 'New Delhi'],
  },
  {
    id: 'wardrobes',
    name: 'Modular & Walk-In Wardrobes',
    category: 'Interiors',
    tagline: 'Custom floor-to-ceiling storage tailored to your wardrobe needs',
    description:
      'Floor-to-ceiling sliding, hinged, and walk-in wardrobe designs optimized for Delhi NCR ceiling heights (9.5 to 11 ft), featuring integrated warm LED profiling, jewelry drawers, and digital lockers.',
    startingPrice: '₹85,000',
    warranty: '10-Year Warranty',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Floor-to-ceiling sliding track systems',
      'Tinted fluted glass doors with sensor LEDs',
      'Velvet-lined accessories & watch trays',
      'Hidden biometric lockers',
    ],
    materials: ['Action TESA HDHMR', 'Anti-Scratch Laminate', 'Tinted Mirror & Fluted Glass', 'Soft-Close Hardware'],
    popularInCities: ['Gurgaon', 'Noida', 'Delhi', 'New Delhi', 'Faridabad', 'Greater Noida'],
  },
  {
    id: 'full-home',
    name: 'Full Home Interiors (Turnkey)',
    category: 'Turnkey',
    tagline: 'End-to-end transformation from bare shell to move-in ready home',
    description:
      'Comprehensive interior execution covering design blueprint, 3D visualization, electrical rework, false ceiling, modular cabinetry, wall panelling, flooring, and bespoke furniture within 45 days.',
    startingPrice: '₹4.5 Lakhs (2BHK) / ₹7.5 Lakhs (3BHK)',
    warranty: '10-Year Modular Warranty + 1-Year Service',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Complete 3D visual walkthroughs & VR previews',
      'Turnkey civil, plumbing, electrical & AC ducting',
      'Custom wall paneling & fluted wooden claddings',
      'Deep cleaning & ready-to-move staging',
    ],
    materials: ['BWP Plywood', 'PU Lacquer & Veneer', 'Italian Marble Flooring', 'Saint-Gobain Gypsum'],
    popularInCities: ['Gurgaon', 'Noida', 'Greater Noida', 'Delhi', 'New Delhi', 'Faridabad'],
  },
  {
    id: 'false-ceiling',
    name: 'False Ceilings & Architectural Lighting',
    category: 'Interiors',
    tagline: 'Cove lighting, acoustic insulation & thermal regulation',
    description:
      'Engineered with moisture-resistant Saint-Gobain gypsum boards and galvanized steel framework. Regulates indoor temperature during peak Delhi summers while framing cove and magnetic track lights.',
    startingPrice: '₹110 / sq.ft',
    warranty: '5-Year Crack-Free Guarantee',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Magnetic track lights & concealed COB spotlights',
      'Curved perimeter coves with indirect ambient LEDs',
      'Acoustic insulation pads for high-rise flats',
      'Seamless laser-aligned joint finishing',
    ],
    materials: ['Saint-Gobain Gyproc', 'G.I. Heavy Gauge Channel', 'Warm 3000K Philips Hue/CRI 90+ LEDs'],
    popularInCities: ['Gurgaon', 'Noida', 'Greater Noida', 'Faridabad', 'Delhi', 'New Delhi'],
  },
  {
    id: 'pooja-room',
    name: 'Mandir & Pooja Room Design',
    category: 'Interiors',
    tagline: 'Sacred spaces designed strictly following Vastu Shastra principles',
    description:
      'Bespoke Mandirs with CNC brass jali patterns, backlit Corian / onyx marble, sacred geometry, bell engravings, and concealed brass storage for incenses, pooja thalis, and sacred scriptures.',
    startingPrice: '₹45,000',
    warranty: '10-Year Warranty',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Vastu-compliant Ishanya (North-East) zoning',
      'Backlit translucent alabaster / onyx stone',
      'Solid teakwood and brass bell inlays',
      'Smoke-resistant ceiling vents & LED spotlights',
    ],
    materials: ['DuPont Corian', 'Solid Burma Teak', 'Gold Leaf Inlay', 'Laser Cut Brass Jali'],
    popularInCities: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Greater Noida', 'New Delhi'],
  },
  {
    id: 'furnishings',
    name: 'Soft Furnishings & Decor',
    category: 'Furnishings',
    tagline: 'Curated textiles, custom upholstery & blackout drapes',
    description:
      'Handpicked fabrics, dual-track motorized sheer and blackout curtains, stain-resistant sofa upholstery, ergonomic beds with custom headboards, and acoustic rugs matched to your color scheme.',
    startingPrice: '₹60,000',
    warranty: '2-Year Craftsmanship Warranty',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Motorized smart curtains (Alexa / Google Home)',
      '100% blackout fabrics for master bedrooms',
      'Pet-friendly and stain-resistant velvets & linens',
      'Custom handcrafted tufted headboards',
    ],
    materials: ['Belgian Linen', 'High-GSM Velvet', 'Silk-Poly Blends', 'High-Density Foam'],
    popularInCities: ['Gurgaon', 'Delhi', 'Noida', 'New Delhi', 'Greater Noida', 'Faridabad'],
  },
  {
    id: 'bathrooms',
    name: 'Luxury Bathrooms & Vanities',
    category: 'Interiors',
    tagline: 'Spa-like sanctuaries with waterproof cabinetry and vanity mirrors',
    description:
      'Floating HDHMR vanities, anti-fog touch LED mirrors, concealed cisterns, anti-skid vitrified tiles, and Grohe/Kohler sanitary fittings with precision plumbing slopes.',
    startingPrice: '₹75,000 / bathroom',
    warranty: '5-Year Leak-Proof Warranty',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Water-impervious floating drawer vanities',
      'Smart defogger mirrors with temperature & time',
      'Glass shower enclosures with hydrophobic nano-coating',
      'Concealed niche shelving with warm strip lights',
    ],
    materials: ['Action TESA Boilo HDHMR', 'Anti-Skid Matte Porcelain', 'Toughened 10mm Glass'],
    popularInCities: ['Gurgaon', 'Noida', 'Delhi', 'New Delhi', 'Faridabad', 'Greater Noida'],
  },
  {
    id: 'civil-renovation',
    name: 'Civil Work & Structural Renovations',
    category: 'Turnkey',
    tagline: 'Demolition, wall alignment, tiling, waterproofing & plumbing',
    description:
      'From transforming 15-year-old DDA flats in South Delhi to modernizing builder floors in Gurgaon and Faridabad — complete civil overhaul with structural integrity certifications.',
    startingPrice: 'Custom Quote via Design OS',
    warranty: '5-Year Structural & Waterproofing Warranty',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    popularFeatures: [
      'Wall knocking & open-layout conversions',
      'Polymer-modified chemical waterproofing',
      'Complete electrical rewiring with Havells/Polycab conduit',
      'Debris disposal & society NOC compliance assistance',
    ],
    materials: ['Dr. Fixit Waterproofing', 'Ultratech Cement', 'Finolex CPVC Pipes', 'Polycab FRLS Wires'],
    popularInCities: ['Delhi', 'Gurgaon', 'Faridabad', 'Noida', 'New Delhi', 'Greater Noida'],
  },
];

export const ROOM_ELEMENT_TYPES = [
  'Modular Kitchen',
  'L-Shape Kitchen',
  'U-Shape Kitchen',
  'Island Kitchen',
  'Open Kitchen',
  'Parallel Kitchen',
  'Kitchen Cabinet Design',
  'Bedroom False Ceiling',
  'Living Room False Ceiling',
  'Sliding Wardrobe',
  'Walk-in Wardrobe',
  'Mirror Wardrobe',
  'Mandir/Pooja Room Design',
  'Small Bathroom Design',
  'Kids\' Bedroom Design',
  'Kitchen Tile Design',
  'Bedroom Tile Design',
  'Bathroom Tile Design',
  'Living Room Tile Design',
  'Wallpaper Design',
  'Wall Paint Ideas',
  'Bedroom Wall Design',
];

export const PROJECT_PORTFOLIO: ProjectPortfolioItem[] = [
  {
    id: 'dlf-crest-gurgaon',
    title: 'Minimalist Warm Luxury at DLF The Crest',
    client: 'Aditya & Neha Singhal',
    society: 'DLF The Crest, Sector 54',
    city: 'Gurgaon',
    roomType: 'Full 4BHK Home Interior',
    bhk: '4BHK Apartment',
    budgetRange: '₹28 - ₹32 Lakhs',
    timelineDays: 42,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Italian quartz parallel modular kitchen with built-in wine cooler',
      'Acoustic fluted wooden panels in living room with hidden door to powder room',
      'Master bedroom with tinted glass walk-in wardrobe and smart vanity',
      'Delivered in 42 days with zero budget overrun via Pentagram Design OS',
    ],
    testimonial: {
      quote:
        'The transparent stage-wise payments gave us 100% confidence. Pentagram Design OS calculated everything to the exact millimeter, and their factory edge-banding is miles ahead of traditional carpenters.',
      author: 'Aditya Singhal',
      verifiedFlat: 'Tower 3, DLF The Crest, Gurugram',
    },
  },
  {
    id: 'ats-knightsbridge-noida',
    title: 'Contemporary Monolith at ATS Knightsbridge',
    client: 'Karan & Ritika Mehra',
    society: 'ATS Knightsbridge, Sector 124',
    city: 'Noida',
    roomType: 'Luxury 4BHK Fitout',
    bhk: '4BHK Penthouse',
    budgetRange: '₹34 - ₹38 Lakhs',
    timelineDays: 44,
    featuredImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Matte PU lacquer island kitchen with automated sensor shutters',
      'Curved plaster false ceiling with magnetic track lighting',
      'Bespoke Mandir with backlit white onyx stone and brass inlays',
      'Delivered in 44 days with complete warranty documentation',
    ],
    testimonial: {
      quote:
        'We were worried about managing contractors while working corporate jobs. Pentagram assigned a single PM who gave us daily WhatsApp drone & photo updates. Handover happened 1 day early!',
      author: 'Ritika Mehra',
      verifiedFlat: 'Tower A, ATS Knightsbridge, Noida',
    },
  },
  {
    id: 'cleo-county-noida',
    title: 'Modern Scandinavian 3BHK at Cleo County',
    client: 'Saurabh & Priya Verma',
    society: 'Cleo County, Sector 121',
    city: 'Noida',
    roomType: '3BHK Modular Interiors',
    bhk: '3BHK Flat',
    budgetRange: '₹14 - ₹17 Lakhs',
    timelineDays: 39,
    featuredImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'High-gloss acrylic L-shape kitchen with wicker baskets & spice rack',
      'Master bedroom sliding wardrobe with full-length vanity mirror',
      'Space-saving kids bedroom with study station and bunk storage',
      'Full delivery achieved in 39 working days',
    ],
    testimonial: {
      quote:
        'Every single panel arrived packed in protective foam with individual QR codes. You can scan the QR and verify the Marine ply grade and warranty immediately. True German engineering!',
      author: 'Saurabh Verma',
      verifiedFlat: 'Tower Egyptian, Cleo County, Noida',
    },
  },
  {
    id: 'mahagun-mezzaria-sector-78',
    title: 'Warm Earthy 3BHK in Greater Noida West',
    client: 'Rohan & Tanvi Gupta',
    society: 'Mahagun Mezzaria, Sector 78',
    city: 'Greater Noida',
    roomType: 'Full Home + Modular Kitchen',
    bhk: '3BHK Luxury',
    budgetRange: '₹18 - ₹22 Lakhs',
    timelineDays: 41,
    featuredImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Biophilic living space with textured lime-wash accents and fluted oak dividers',
      'Parallel modular kitchen with Blum tip-on mechanical opening',
      'Custom pooja alcove facing northeast with warm bell bells',
      'Completed in 41 days with zero contractor headaches',
    ],
    testimonial: {
      quote:
        'Greater Noida contractors usually drag projects for 6 months. Pentagram promised 45 days and handed over keys on day 41. Verdoire Interiors legal registration and stage payments gave us complete trust.',
      author: 'Rohan Gupta',
      verifiedFlat: 'Tower 4, Mahagun Mezzaria, Greater Noida',
    },
  },
  {
    id: 'greenfield-faridabad',
    title: 'Classic Luxury Independent Floor in Faridabad',
    client: 'Col. Rajesh Sharma (Retd.)',
    society: 'Greenfields Colony, Sector 43',
    city: 'Faridabad',
    roomType: 'Independent Floor Interior & Civil',
    bhk: '4BHK Floor',
    budgetRange: '₹22 - ₹26 Lakhs',
    timelineDays: 45,
    featuredImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Heavy-duty BWP marine plywood kitchen built for joint family cooking',
      'Solid wood trim moldings and false ceiling with dual warm coves',
      'Complete bathroom waterproofing with polymer coatings and anti-skid tiles',
      'Delivered strictly in 45 days with 10-year warranty certificate',
    ],
    testimonial: {
      quote:
        'Being a defense veteran, punctuality and structural integrity are paramount to me. Pentagram lived up to every word of their contract. The stage-wise milestone payment system is a revolution for Indian homeowners.',
      author: 'Col. Rajesh Sharma',
      verifiedFlat: 'Block B, Greenfields Colony, Faridabad',
    },
  },
  {
    id: 'vasant-vihar-south-delhi',
    title: 'Contemporary Heritage Residence in Vasant Vihar',
    client: 'Vikram & Radhika Sethi',
    society: 'C-Block, Vasant Vihar',
    city: 'Delhi',
    roomType: 'Turnkey Luxury Renovation',
    bhk: '4BHK Builder Floor',
    budgetRange: '₹42 - ₹48 Lakhs',
    timelineDays: 45,
    featuredImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Custom open island kitchen with European quartz and built-in Bosch cooking range',
      'Veneer-clad master suite with hidden walk-in wardrobe and en-suite vanity',
      'Full restoration of South Delhi floor with thermal and acoustic false ceiling',
      'Delivered on time with strict safety protocols',
    ],
    testimonial: {
      quote:
        'Pentagram Design OS caught structural clashes before on-site work even started. They saved us at least ₹4 Lakhs in potential material waste. Hands down the most professional team in Delhi NCR.',
      author: 'Vikram Sethi',
      verifiedFlat: 'C-Block, Vasant Vihar, New Delhi',
    },
  },
  {
    id: 'golf-course-extension-gurugram',
    title: 'Neoclassical 3BHK at M3M Golfestate',
    client: 'Ananya & Abhimanyu Joshi',
    society: 'M3M Golfestate, Sector 65',
    city: 'Gurgaon',
    roomType: 'Full Home Interior & Furnishing',
    bhk: '3BHK + Servant',
    budgetRange: '₹24 - ₹29 Lakhs',
    timelineDays: 43,
    featuredImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Champagne gold metallic accents with charcoal velvet furnishings',
      'U-shape modular kitchen with quartz counter and ceramic anti-scratch splash',
      'Full motorized curtains and smart lighting automation',
      'Delivered in 43 days with zero defect sign-off',
    ],
    testimonial: {
      quote:
        'Their experience center on Golf Course Ext Rd showed us real materials, not just digital pictures. The finished home matches the 3D renders with 99% fidelity.',
      author: 'Ananya Joshi',
      verifiedFlat: 'Tower 9, M3M Golfestate, Gurugram',
    },
  },
  {
    id: 'dwarka-expressway-gurgaon',
    title: 'Smart Urban 2BHK at Shapoorji Pallonji Joyville',
    client: 'Deepak & Shreya Nair',
    society: 'Joyville, Sector 102, Dwarka Expressway',
    city: 'Gurgaon',
    roomType: 'Modular Kitchen & Wardrobes',
    bhk: '2BHK Apartment',
    budgetRange: '₹9 - ₹12 Lakhs',
    timelineDays: 37,
    featuredImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: [
      'Optimized compact kitchen with rolling shutter pantry and pull-out dining nook',
      'Two full height sliding wardrobes with loft extensions',
      'Warm indirect cove lighting in living area',
      'Handover completed in 37 days',
    ],
    testimonial: {
      quote:
        'As first-time homebuyers, our budget was strict. Pentagram Design OS gave us an itemized quotation down to the hardware screw. No hidden fees, no last-minute hikes.',
      author: 'Deepak Nair',
      verifiedFlat: 'Tower Palm, Joyville Gurugram',
    },
  },
];

export const CLIENT_STORIES: ClientStory[] = [
  {
    id: 'story-singhal-dlf',
    title: 'From Carpenter Chaos to 42-Day Move-In at DLF The Crest, Gurgaon',
    homeowner: 'Aditya & Neha Singhal',
    societyAndCity: 'DLF The Crest, Sector 54, Gurgaon',
    city: 'Gurgaon',
    bhkType: '4BHK Luxury Apartment (3,450 sq.ft)',
    turnaroundDays: 42,
    budgetActual: '₹29.4 Lakhs (Zero Escalation)',
    milestonesMet: 5,
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    narrative:
      'The Singhals had previously burnt their fingers with independent contractors on their first flat in 2019 — suffering a 7-month delay and 35% budget overrun. When moving into DLF The Crest, they demanded strict accountability. Through Pentagram Design OS, their layout was digitized, and all modular units were pre-manufactured in our factory. All payments were structured into transparent stages and released only upon quality check sign-offs.',
    designHighlights: [
      'Parallel Modular Kitchen with German Blum servo-drive drawers',
      'Acoustic wooden paneling in living room with concealed powder room door',
      'Wardrobe with QR-code tracked Action TESA HDHMR panels',
      'Handed over on Day 42 with deep clean and 10-year warranty dossier',
    ],
    clientQuote:
      '"Pentagram took away all the anxiety. The stage payment model meant our money was always protected, and seeing factory panels arrive with barcode labels made it clear this wasn\'t makeshift carpentry."',
  },
  {
    id: 'story-mehra-ats',
    title: 'Building a Corporate Couple\'s Dream Home at ATS Knightsbridge, Noida',
    homeowner: 'Karan & Ritika Mehra',
    societyAndCity: 'ATS Knightsbridge, Sector 124, Noida',
    city: 'Noida',
    bhkType: '4BHK Penthouse (4,200 sq.ft)',
    turnaroundDays: 44,
    budgetActual: '₹36.8 Lakhs',
    milestonesMet: 6,
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    narrative:
      'Working at multinational consultancies, Karan and Ritika had zero time to visit job sites during working hours. Pentagram\'s Single Point of Contact model meant their dedicated Senior Project Manager provided daily video logs, moisture meter readings, and milestone checklists. The entire apartment was delivered in 44 days with zero defects on the initial inspection punch list.',
    designHighlights: [
      'Island Kitchen in Matte PU with quartz waterfall edges',
      'Ceiling height sliding wardrobes with integrated sensor LED profiling',
      'Backlit translucent alabaster Mandir strictly following Vastu alignment',
      'All materials verified zero-VOC for child-safe indoor air quality',
    ],
    clientQuote:
      '"We only visited the flat 3 times during the entire 44 days. The single PM model actually works. Pentagram is the Tesla of interior execution in Delhi NCR."',
  },
  {
    id: 'story-verma-cleo',
    title: 'Scandinavian Warmth on an Honest Budget at Cleo County, Noida',
    homeowner: 'Saurabh & Priya Verma',
    societyAndCity: 'Cleo County, Sector 121, Noida',
    city: 'Noida',
    bhkType: '3BHK Flat (1,850 sq.ft)',
    turnaroundDays: 39,
    budgetActual: '₹15.2 Lakhs',
    milestonesMet: 4,
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    narrative:
      'Saurabh and Priya wanted a Scandinavian aesthetic with neutral tones, clean lines, and high functionality for their 4-year-old daughter. Pentagram Design OS optimized every sheet of plywood, reducing offcut waste from the industry average of 22% down to 4.8%, passing the direct cost savings to the homeowners.',
    designHighlights: [
      'L-Shape High-Gloss Kitchen with hydraulic overhead cabinets',
      'Clever storage bed with pneumatic lift in master bedroom',
      'Montessori-inspired study and wardrobe unit in kids room',
      'Delivered in 39 working days',
    ],
    clientQuote:
      '"Other designers quoted ₹20+ Lakhs for the exact same layout. Pentagram explained how their Design OS nesting software cut material costs without downgrading hardware. Real honesty."',
  },
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'modular-kitchen-cost-gurgaon-2026',
    slug: 'modular-kitchen-cost-in-gurgaon-2026',
    title: 'Modular Kitchen Cost in Gurgaon (2026): The Real Price Breakdown for Homeowners',
    category: 'Budget & Cost Guides',
    targetCity: 'Gurgaon',
    publishDate: 'September 2026',
    readTime: '6 min read',
    author: {
      name: 'Chhavi Bhardwaj',
      role: 'Principal Interior Architect',
      experience: '12+ Years in Delhi NCR Residential Design',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      'Standard modular kitchens in Gurgaon range between ₹1.75 Lakhs and ₹4.2 Lakhs for acrylic/laminate on high quality raw materials.',
      'Luxury kitchens in Golf Course Rd and DLF areas (PU lacquer, quartz, Blum servo-drive) range between ₹4.5 Lakhs and ₹9.5 Lakhs.',
      'Pentagram Design OS reduces material waste by ~16%, guaranteeing zero hidden cost escalations.',
      'Always insist on high quality raw materials due to Delhi NCR monsoon humidity and water hardness.',
    ],
    citableDataPoints: [
      { label: 'Average Gurgaon 2BHK Kitchen Cost', value: '₹1.75L – ₹2.85L' },
      { label: 'Average Gurgaon 3BHK/4BHK Kitchen Cost', value: '₹3.20L – ₹6.50L' },
      { label: 'Average Turnaround Timeline', value: '25 – 35 Days' },
      { label: 'Core Material Standard', value: 'High Quality Raw Materials' },
    ],
    contentSections: [
      {
        heading: '1. What Determines Modular Kitchen Pricing in Gurgaon?',
        paragraphs: [
          'Modular kitchen costs across Gurgaon and Delhi NCR depend primarily on four factors: carcass material (plywood grade), shutter finish, hardware mechanism, and countertop stone. Traditional contractors often quote low base prices with commercial moisture-resistant (MR) ply, only for cabinets to swell and degrade within two monsoon seasons.',
          'At Pentagram: Your Space Expert, all kitchen carcasses are constructed strictly with high quality raw materials and boiling waterproof protection. This ensures absolute protection against sink leaks, boiling water spills, and common termite attacks in high-rises along Golf Course Extension Road, Sohna Road, and New Gurgaon.',
        ],
        bulletPoints: [
          'Laminate Finish: ₹1,200 – ₹1,600 per sq.ft (Durable, scratch-resistant, budget-friendly)',
          'High-Gloss Acrylic: ₹1,700 – ₹2,400 per sq.ft (Seamless, reflective, modern look)',
          'Matte Anti-Fingerprint PU: ₹2,400 – ₹3,800 per sq.ft (Ultra-luxury, velvety smooth feel)',
          'Natural Veneer with Polyurethane Coating: ₹3,000 – ₹4,500 per sq.ft (Bespoke timber warmth)',
        ],
      },
      {
        heading: '2. Cost Comparison: Pentagram Design OS vs Traditional Carpenters',
        paragraphs: [
          'Traditional on-site carpentry in Gurgaon suffers from an average 22% material wastage due to manual cutting errors and rough estimations. Pentagram Design OS utilizes computer-aided panel nesting that maps every shelf and drawer onto master sheets, driving cutting precision to ±0.2mm and reducing waste below 5%.',
          'Furthermore, our transparent stage-wise payment schedule guarantees that you never advance 80% of project costs before seeing physical panels delivered to your home.',
        ],
      },
      {
        heading: '3. Hardware & Accessories: Where Quality Cannot Be Compromised',
        paragraphs: [
          'Delhi NCR cooking involves heavy cast-iron kadhais, pressure cookers, and dense spice containers. Standard local drawer channels sag after 12 months. Pentagram partners directly with German brands Blum and Hettich, specifying 30kg–65kg rated soft-close tandem boxes and anti-corrosion zinc hinges backed by a 10-year manufacturer warranty.',
        ],
      },
    ],
    faqList: [
      {
        question: 'How much does an L-shaped modular kitchen cost in Gurugram?',
        answer:
          'An L-shaped modular kitchen (approx. 10x8 ft) in Gurgaon costs between ₹1.9 Lakhs to ₹3.4 Lakhs in premium acrylic or laminate on high quality raw materials, inclusive of Blum/Hettich soft-close hardware.',
      },
      {
        question: 'Why should I avoid MDF or particle board for kitchen carcasses in Gurgaon?',
        answer:
          'Gurgaon experiences intense humidity shifts and hard tap water. Particle board and MDF absorb moisture rapidly near sinks and dishwashers, causing swelling. Pentagram only uses certified high quality raw materials for all base and sink units.',
      },
      {
        question: 'What is the installation timeline for a kitchen in Gurgaon?',
        answer:
          'With Pentagram Design OS, modular panels are fabricated in our factory in 20–25 days and assembled on-site in your Gurgaon home in just 3 to 4 days, with zero sawdust disruption.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'full-home-interior-cost-delhi-ncr',
    slug: 'full-home-interior-cost-delhi-ncr',
    title: 'Full Home Interior Cost in Delhi NCR: 2BHK, 3BHK & 4BHK Pricing Guide',
    category: 'Full Home Interior Guides',
    targetCity: 'Delhi',
    publishDate: 'August 2026',
    readTime: '8 min read',
    author: {
      name: 'Vikramaditya Roy',
      role: 'Lead Project Director',
      experience: '15+ Years in Delhi NCR Turnkey Execution',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      '2BHK turnkey interiors in Delhi NCR range from ₹4.5 Lakhs to ₹8.5 Lakhs depending on scope and finish.',
      '3BHK interiors range from ₹7.5 Lakhs to ₹16 Lakhs for premium modulars, false ceilings, and lighting.',
      '4BHK luxury residences in Gurgaon, Noida, and South Delhi range from ₹16 Lakhs to ₹35+ Lakhs.',
      'Pentagram guarantees fixed quotation pricing with stage milestone approvals and 45-day handover.',
    ],
    citableDataPoints: [
      { label: '2BHK Average Cost', value: '₹4.5L – ₹8.5L' },
      { label: '3BHK Average Cost', value: '₹7.5L – ₹16L' },
      { label: '4BHK Average Cost', value: '₹16L – ₹35L+' },
      { label: 'Move-in Guarantee', value: '45 Days' },
    ],
    contentSections: [
      {
        heading: '1. What Is Included in a Turnkey Interior Package?',
        paragraphs: [
          'A genuine turnkey interior package should cover everything needed to move into an empty apartment: modular kitchen, bedroom wardrobes, false ceiling with electrical wiring and LED cove lights, wall paint/wallpaper, bathroom vanities, and civil adjustments.',
          'Beware of deceptive quotes in the Delhi NCR market that exclude electrical switches, countertop stone, or transport charges. Pentagram Design OS produces an itemized bill of quantities (BOQ) with zero ambiguous lumpsum line items.',
        ],
      },
      {
        heading: '2. Average Cost Breakdown by Home Size in NCR',
        paragraphs: [
          'Here is the standard budget allocation for homes across Gurgaon, Noida, Greater Noida, Faridabad, Delhi, and New Delhi:',
        ],
        bulletPoints: [
          'Kitchen & Storage (45-50% of budget): Modular kitchen, master wardrobe, guest wardrobes, TV console',
          'False Ceiling & Lighting (15-20% of budget): Gypsum ceiling, concealed wiring, COB spots, magnetic tracks',
          'Wall Finishes & Painting (10-15% of budget): Premium washable emulsions, textured feature walls',
          'Civil, Plumbing & Bathrooms (10-15% of budget): Vanity cabinets, shower partitions, countertop slabs',
          'Soft Furnishings & Decor (Optional 10-15%): Curtains, custom upholstery, accent rugs',
        ],
      },
    ],
    faqList: [
      {
        question: 'How much does a 3BHK interior cost in Noida or Greater Noida?',
        answer:
          'In Noida and Greater Noida, a comprehensive 3BHK interior package by Pentagram ranges between ₹7.5 Lakhs (Essential) to ₹14.5 Lakhs (Premium), covering kitchen, 3 wardrobes, false ceilings, and painting.',
      },
      {
        question: 'What is the difference between Pentagram and platforms like Livspace or HomeLane?',
        answer:
          'Unlike aggregators that outsource work to unvetted sub-contractors, Pentagram manufactures all modular cabinetry in its own factory with QR code tracking, assigns a dedicated Senior PM, and structures payments stage-wise so you approve each milestone.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sliding-vs-walk-in-wardrobe-noida',
    slug: 'sliding-vs-walk-in-wardrobe-noida-apartments',
    title: 'Sliding vs Walk-In Wardrobes: Which Fits Noida High-Rise Apartments Better?',
    category: 'Wardrobe & Storage Solutions',
    targetCity: 'Noida',
    publishDate: 'August 2026',
    readTime: '5 min read',
    author: {
      name: 'Chhavi Bhardwaj',
      role: 'Principal Interior Architect',
      experience: '12+ Years in Delhi NCR Residential Design',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      'Sliding wardrobes save 8–12 sq.ft of floor clearance, making them ideal for standard 11x13 ft Noida bedrooms.',
      'Walk-in wardrobes require at least 6x6 ft dedicated space and are recommended for master suites in luxury societies.',
      'Floor-to-ceiling designs maximize vertical volume up to 10.5 ft ceiling heights common along Noida Expressway.',
      'Soft-close floor-bearing track systems ensure silent glide even with heavy 8-foot tinted mirror shutters.',
    ],
    citableDataPoints: [
      { label: 'Space Saved by Sliding Shutters', value: '8 – 12 sq.ft' },
      { label: 'Minimum Walk-In Wardrobe Footprint', value: '36 sq.ft (6x6 ft)' },
      { label: 'Average Wardrobe Warranty', value: '10 Years' },
    ],
    contentSections: [
      {
        heading: '1. Space Dynamics in Noida High-Rise Bedrooms',
        paragraphs: [
          'Most high-rise apartments along the Noida Expressway and Sector 7x/137/150 feature master bedrooms measuring 11x13 ft or 12x14 ft. Hinged wardrobe doors require 2.5 to 3 feet of swing radius, often colliding with bedside tables or balcony glass doors.',
          'Sliding wardrobes eliminate swing interference completely, sliding smoothly along heavy-duty dual tracks. For larger layouts in societies like ATS Knightsbridge or Gulshan Dynasty, a dedicated walk-in wardrobe section creates a private boutique dressing experience.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Do sliding wardrobe tracks accumulate dust in Delhi NCR?',
        answer:
          'Pentagram uses top-hung or sealed bottom tracks with high-density nylon dust-strips that prevent dust accumulation and keep rollers running noiselessly for years.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gypsum-vs-pop-false-ceiling-delhi',
    slug: 'gypsum-vs-pop-false-ceiling-delhi-ncr-summers',
    title: 'Gypsum vs POP False Ceiling: What Survives Delhi NCR Summers and Humidity Best?',
    category: 'False Ceiling & Lighting',
    targetCity: 'Delhi',
    publishDate: 'July 2026',
    readTime: '5 min read',
    author: {
      name: 'Vikramaditya Roy',
      role: 'Lead Project Director',
      experience: '15+ Years in Delhi NCR Turnkey Execution',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      'Saint-Gobain Gyproc false ceiling boards offer superior crack resistance and faster installation than wet POP.',
      'False ceilings reduce AC cooling loads by 18–24% during Delhi\'s 45°C summer peaks through thermal buffer pockets.',
      'Gypsum installs in 3–5 days with minimal water or mess, compared to 14 days of drying time required for POP.',
      'All Pentagram ceiling channels use zinc-galvanized G.I. framing to prevent rust and sagging.',
    ],
    citableDataPoints: [
      { label: 'AC Energy Load Reduction', value: '18% – 24%' },
      { label: 'Installation Time', value: '3 – 5 Days' },
      { label: 'Price Range', value: '₹110 – ₹160 / sq.ft' },
    ],
    contentSections: [
      {
        heading: '1. Why False Ceilings Are an Environmental Necessity in Delhi NCR',
        paragraphs: [
          'Top-floor apartments and builder floors across Delhi, Gurgaon, and Faridabad suffer from intense roof solar heat gain, with slab temperatures easily crossing 52°C in May and June. A 4 to 6-inch dropped false ceiling creates an air-insulation buffer pocket that noticeably cools living rooms.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Will a false ceiling reduce my ceiling height too much in Delhi?',
        answer:
          'Modern perimeter coves only drop 4 to 5 inches around the walls while leaving the central fan ceiling open, preserving maximum room volume while hiding AC copper piping and ambient cove lights.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'interior-design-trends-greater-noida',
    slug: 'interior-design-trends-greater-noida-west',
    title: 'Interior Design Trends for Greater Noida West Apartments: Max Space, Smart Budget',
    category: 'City Guides',
    targetCity: 'Greater Noida',
    publishDate: 'July 2026',
    readTime: '6 min read',
    author: {
      name: 'Chhavi Bhardwaj',
      role: 'Principal Interior Architect',
      experience: '12+ Years in Delhi NCR Residential Design',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      'Greater Noida West (Noida Extension) has over 150,000 newly possessed flats where smart storage is top priority.',
      'Open-plan kitchens with fluted glass breakfast counters are replacing heavy closed partition walls.',
      'Multi-functional study units and wall beds turn compact bedrooms into flexible work-from-home zones.',
      'Pentagram offers fast 35 to 40-day delivery packages tailored for Greater Noida societies.',
    ],
    citableDataPoints: [
      { label: 'Average Flat Size in Greater Noida', value: '950 – 1,600 sq.ft' },
      { label: 'Popular Layout', value: '2BHK & 3BHK Modulars' },
      { label: 'Turnaround Time', value: '35 – 40 Days' },
    ],
    contentSections: [
      {
        heading: '1. Transforming Compact Floorplans in Greater Noida Extension',
        paragraphs: [
          'Homeowners in Gaur City, Cherry County, Supertech Ecovillage, and Ace City often face narrow foyer passages and compact kitchen zones. Pentagram specializes in vertical storage optimization — extending wall units up to the ceiling lintel and using pocket sliding doors.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Does Pentagram service societies in Greater Noida West and Pari Chowk?',
        answer:
          'Yes! Pentagram actively services all sectors across Greater Noida West, Noida Extension, Alpha, Beta, Gamma, Omega, and Pari Chowk.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'vastu-shastra-rules-kitchen-mandir',
    slug: 'vastu-shastra-rules-kitchen-mandir-flats',
    title: 'Vastu Shastra for Modern Delhi NCR Flats: Kitchen & Mandir Placement Simplified',
    category: 'Vastu & Space Planning',
    publishDate: 'June 2026',
    readTime: '7 min read',
    author: {
      name: 'Vikramaditya Roy',
      role: 'Lead Project Director',
      experience: '15+ Years in Delhi NCR Turnkey Execution',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      'Kitchen hob should ideally face East in the Agni (South-East) zone to balance fire energy.',
      'Pooja room or Mandir should be situated in the Ishanya (North-East) corner for purity and tranquility.',
      'Never position the cooking hob directly adjacent to or under the water sink (fire and water clash).',
      'Pentagram integrates Vastu compliance seamlessly into modern contemporary layouts without awkward structural compromises.',
    ],
    citableDataPoints: [
      { label: 'Ideal Kitchen Direction', value: 'South-East (Agni)' },
      { label: 'Ideal Mandir Direction', value: 'North-East (Ishanya)' },
      { label: 'Master Bedroom Zone', value: 'South-West (Nairutya)' },
    ],
    contentSections: [
      {
        heading: '1. Aligning Apartment Architecture with Ancient Vastu Science',
        paragraphs: [
          'In modern high-rise apartments across Gurgaon and Noida, moving pre-cast concrete walls is often impossible. Pentagram works with directional balancing — utilizing copper and brass harmonic inlays, specific stone colors, and lighting positioning to create Vastu harmony without civil demolition.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Can Pentagram design a Vastu-compliant Mandir for a compact 2BHK flat?',
        answer:
          'Yes. We craft wall-mounted and alcove Mandirs with sacred geometry jali patterns and concealed storage specifically scaled for 2BHK and 3BHK layouts.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'before-after-42-day-renovation-dlf',
    slug: 'before-after-42-day-renovation-dlf-gurgaon',
    title: 'Before & After: 42-Day Complete Renovation of a 3BHK in Gurgaon',
    category: 'Before/After Transformations',
    targetCity: 'Gurgaon',
    publishDate: 'May 2026',
    readTime: '5 min read',
    author: {
      name: 'Chhavi Bhardwaj',
      role: 'Principal Interior Architect',
      experience: '12+ Years in Delhi NCR Residential Design',
      verifiedBadge: 'Verified Space Expert',
    },
    tldr: [
      'Step-by-step case study showing how a dark, 12-year-old Gurgaon flat was transformed into a sunlit luxury home.',
      'Demolished closed kitchen wall to create an open Italian quartz island connected to the dining hall.',
      'Installed QR-tracked modular wardrobes with zero-VOC German PU finish.',
      'Completed strictly within 42 days with zero budget creep.',
    ],
    citableDataPoints: [
      { label: 'Project Location', value: 'Sector 54, Golf Course Rd, Gurgaon' },
      { label: 'Execution Timeline', value: '42 Working Days' },
      { label: 'Budget Adherence', value: '100% On-Budget via Stage Payments' },
    ],
    contentSections: [
      {
        heading: '1. The Challenge: Outdated Dark Cabinets and Leaking Sink Base',
        paragraphs: [
          'The client purchased a resale 3BHK flat on Golf Course Road with swollen laminate cabinets and dingy yellow lighting. Pentagram stripped down the civil framework, applied double-coat polymer waterproofing, and installed our factory-built modular cabinetry.',
        ],
      },
    ],
    faqList: [
      {
        question: 'Do you handle society approvals and debris disposal in Gurgaon condominiums?',
        answer:
          'Yes. Pentagram manages society security gate passes, work hours compliance, elevator protective cladding, and debris carting in full adherence with RWA guidelines.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PENTAGRAM_TV_EPISODES = [
  {
    id: 'tv-dlf-crest-tour',
    title: 'Inside a ₹32 Lakh 4BHK at DLF The Crest, Gurgaon | Full Home Walkthrough',
    duration: '12:45',
    views: '48.2K',
    tag: 'Home Tour',
    city: 'Gurgaon',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Walk through this stunning minimalist warm luxury home featuring an Italian quartz island kitchen and hidden door to the powder room.',
  },
  {
    id: 'tv-modular-kitchen-stress-test',
    title: 'Waterproof Stress Test: BWP Marine Ply vs Particle Board in Delhi Monsoon',
    duration: '08:15',
    views: '92.4K',
    tag: 'Material Science',
    city: 'Delhi NCR',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Our lead material engineer boils sample panels for 72 hours in water. See why Pentagram insists on high quality raw materials.',
  },
  {
    id: 'tv-design-os-demo',
    title: 'How Pentagram Design OS Eliminates Quotation Errors & Carpenter Cheating',
    duration: '09:30',
    views: '64.1K',
    tag: 'Tech Innovation',
    city: 'Delhi NCR',
    thumbnail: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    description: 'A live demonstration of our proprietary AI-assisted platform generating zero-waste cut-lists and exact stage-wise budgets.',
  },
  {
    id: 'tv-ats-penthouse-noida',
    title: 'Modern Monolith: Penthouse Tour at ATS Knightsbridge, Noida Expressway',
    duration: '14:20',
    views: '51.8K',
    tag: 'Luxury Tour',
    city: 'Noida',
    thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    description: 'See the floor-to-ceiling sliding wardrobes, curved cove false ceiling, and bespoke backlit Mandir built for a busy corporate family.',
  },
];

export const SIGNATURE_SPECIALITIES = [
  {
    id: 'anti-termite-marine-ply',
    title: 'High Quality Raw Materials Core',
    subtitle: 'Boiling Waterproof & Termite-Impervious',
    description:
      'Delhi NCR soil and monsoon humidity are notoriously aggressive on timber. We build all wet and high-wear cabinetry exclusively with calibrated high quality raw materials soaked in proprietary anti-termite borate baths.',
    metric: '72-Hr Boiling Water Proof Test Certified',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'qr-code-tracking',
    title: 'QR-Code Panel Verification & Batch Tracking',
    subtitle: 'Absolute Transparency from Factory to Site',
    description:
      'Every panel leaving our factory carries a laser-etched QR code. Scan with any phone to view the exact plywood manufacturer, core thickness, edge-banding batch, and 10-year warranty certificate.',
    metric: '100% Traceable Components',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'stage-milestone-architecture',
    title: 'Stage-Wise Milestone Payment Safety',
    subtitle: 'Pay As Quality Is Approved',
    description:
      'Unlike unorganized contractors who take 70% advance and abandon the site, Pentagram works on clear transparent stages. Payments are released strictly after you sign off on design, factory delivery, civil completion, and final handover.',
    metric: '0% Contractor Advance Risk',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'zero-voc-finishes',
    title: 'Zero-VOC & Child-Safe Interior Finishes',
    subtitle: 'Healthy Indoor Air Quality for Delhi NCR',
    description:
      'Delhi NCR already struggles with winter smog. We ensure your home is a clean sanctuary by using low-VOC Italian waterborne PU lacquers, formaldehyde-free glues, and non-toxic wall primers.',
    metric: 'E0 / E1 European Formaldehyde Compliance',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * Generates rich localized SEO & GEO landing page data for any of the 22 Room/Element types × 6 cities.
 */
export function getRoomCityMatrixData(roomType: string, city: ServiceableCity): RoomCityMatrixItem {
  const cleanCity = city;
  const slug = `${roomType.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-in-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  const priceMap: Record<string, string> = {
    'Modular Kitchen': '₹1,400 – ₹2,800 / sq.ft (Total ₹1.8L – ₹5.5L)',
    'L-Shape Kitchen': '₹1,500 – ₹2,600 / sq.ft (Total ₹2.1L – ₹4.8L)',
    'U-Shape Kitchen': '₹1,600 – ₹2,900 / sq.ft (Total ₹2.8L – ₹6.2L)',
    'Island Kitchen': '₹2,200 – ₹3,800 / sq.ft (Total ₹3.5L – ₹9.0L)',
    'Open Kitchen': '₹1,800 – ₹3,200 / sq.ft (Total ₹2.5L – ₹5.8L)',
    'Parallel Kitchen': '₹1,500 – ₹2,700 / sq.ft (Total ₹2.2L – ₹4.9L)',
    'Kitchen Cabinet Design': '₹1,200 – ₹2,400 / sq.ft',
    'Bedroom False Ceiling': '₹110 – ₹160 / sq.ft (₹18,000 – ₹35,000 per room)',
    'Living Room False Ceiling': '₹125 – ₹185 / sq.ft (₹30,000 – ₹65,000 per hall)',
    'Sliding Wardrobe': '₹1,600 – ₹2,600 / sq.ft (₹85,000 – ₹2,20,000 per unit)',
    'Walk-in Wardrobe': '₹1,900 – ₹3,400 / sq.ft (₹1,50,000 – ₹4,00,000 per room)',
    'Mirror Wardrobe': '₹1,750 – ₹2,800 / sq.ft (₹95,000 – ₹2,40,000 per unit)',
    'Mandir/Pooja Room Design': '₹45,000 – ₹2,50,000 (Custom CNC & Onyx)',
    'Small Bathroom Design': '₹65,000 – ₹1,80,000 (Vanity, tiles, glass partition)',
    'Kids\' Bedroom Design': '₹1,20,000 – ₹2,80,000 (Beds, study, wardrobe)',
    'Kitchen Tile Design': '₹75 – ₹190 / sq.ft',
    'Bedroom Tile Design': '₹85 – ₹220 / sq.ft',
    'Bathroom Tile Design': '₹70 – ₹210 / sq.ft',
    'Living Room Tile Design': '₹110 – ₹350 / sq.ft',
    'Wallpaper Design': '₹60 – ₹180 / sq.ft',
    'Wall Paint Ideas': '₹28 – ₹65 / sq.ft',
    'Bedroom Wall Design': '₹140 – ₹320 / sq.ft',
  };

  const timelineMap: Record<string, string> = {
    'Modular Kitchen': '20 – 25 Days',
    'L-Shape Kitchen': '20 – 25 Days',
    'U-Shape Kitchen': '22 – 28 Days',
    'Island Kitchen': '25 – 30 Days',
    'Open Kitchen': '22 – 28 Days',
    'Parallel Kitchen': '20 – 25 Days',
    'Kitchen Cabinet Design': '15 – 20 Days',
    'Bedroom False Ceiling': '3 – 5 Days',
    'Living Room False Ceiling': '4 – 7 Days',
    'Sliding Wardrobe': '18 – 22 Days',
    'Walk-in Wardrobe': '20 – 28 Days',
    'Mirror Wardrobe': '18 – 22 Days',
    'Mandir/Pooja Room Design': '12 – 18 Days',
    'Small Bathroom Design': '10 – 14 Days',
    'Kids\' Bedroom Design': '20 – 25 Days',
    'Kitchen Tile Design': '4 – 6 Days',
    'Bedroom Tile Design': '5 – 8 Days',
    'Bathroom Tile Design': '5 – 7 Days',
    'Living Room Tile Design': '7 – 10 Days',
    'Wallpaper Design': '2 – 3 Days',
    'Wall Paint Ideas': '5 – 8 Days',
    'Bedroom Wall Design': '7 – 12 Days',
  };

  const imageMap: Record<string, string> = {
    'Modular Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'L-Shape Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'U-Shape Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'Island Kitchen': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'Open Kitchen': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'Parallel Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'Kitchen Cabinet Design': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'Bedroom False Ceiling': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    'Living Room False Ceiling': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    'Sliding Wardrobe': 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    'Walk-in Wardrobe': 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    'Mirror Wardrobe': 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    'Mandir/Pooja Room Design': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    'Small Bathroom Design': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    'Kids\' Bedroom Design': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    'Kitchen Tile Design': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'Bedroom Tile Design': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'Bathroom Tile Design': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    'Living Room Tile Design': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'Wallpaper Design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    'Wall Paint Ideas': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    'Bedroom Wall Design': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  };

  const citySocietiesMap: Record<ServiceableCity, string[]> = {
    Gurgaon: ['DLF Phase 1-5', 'Golf Course Ext Rd', 'Sohna Road', 'M3M Golfestate', 'Central Park Resort', 'Tata Primanti', 'Dwarka Expressway'],
    Noida: ['ATS Knightsbridge', 'Sector 128 Wish Town', 'Cleo County (Sec 121)', 'Sector 137 Expressway', 'Sector 150 Sports City', 'Sector 62'],
    'Greater Noida': ['Gaur City (Noida Ext)', 'Ace City', 'Cherry County', 'Pari Chowk', 'Jaypee Greens', 'Ecovillage'],
    Faridabad: ['Greenfields Colony', 'Sector 14 & 15', 'Omaxe Heights Neharpar', 'BPTP Park Elite', 'Sector 21C', 'Charmwood Village'],
    Delhi: ['Vasant Vihar', 'Greater Kailash (GK 1 & 2)', 'Dwarka Sectors 1-23', 'Punjabi Bagh', 'Hauz Khas', 'Panchsheel Park'],
    'New Delhi': ['Chanakyapuri', 'Jor Bagh', 'Golf Links', 'Sundar Nagar', 'Civil Lines', 'Barakhamba'],
  };

  const pageTitle = `${roomType} in ${cleanCity} | Pentagram: Your Space Expert`;
  const h1 = `${roomType} Design in ${cleanCity}`;
  const metaDescription = `Looking for ${roomType.toLowerCase()} in ${cleanCity}? Pentagram offers AI-engineered precision with Design OS, transparent stage payments & 10-year warranty. Book your free consultation today.`;

  const localIntro = `Transform your residential space with Pentagram's custom ${roomType.toLowerCase()} solutions in ${cleanCity}. Engineered specifically for local apartment layouts in prominent societies like ${citySocietiesMap[cleanCity].slice(0, 3).join(', ')}, our solutions blend 70% factory-automated precision with 30% master craft. Every unit is constructed with high quality raw materials and German soft-close hardware, backed by our transparent stage-wise payment schedule and strict 45-day move-in guarantee.`;

  const faqs = [
    {
      question: `How much does a ${roomType.toLowerCase()} typically cost in ${cleanCity}?`,
      answer: `In ${cleanCity}, our ${roomType.toLowerCase()} projects typically range from ${priceMap[roomType] || '₹1,200 to ₹2,800 per sq.ft'}, depending on carcass plywood grade, shutter finish (Acrylic, PU Lacquer, or Laminate), and German hardware selections.`,
    },
    {
      question: `What is the delivery timeline for ${roomType.toLowerCase()} in ${cleanCity}?`,
      answer: `From design sign-off, factory fabrication and installation takes approximately ${timelineMap[roomType] || '20 to 30 days'}, with fast on-site assembly to eliminate disruption in your home.`,
    },
    {
      question: `Why choose Pentagram for ${roomType.toLowerCase()} in ${cleanCity} over local contractors?`,
      answer: `Pentagram provides proprietary Design OS precision (zero cutting waste), 100% financial protection via stage-wise milestone payments, QR-code tracked factory panels, a 10-year warranty, and a dedicated Senior Project Manager throughout execution.`,
    },
    {
      question: `Do you service my specific society in ${cleanCity}?`,
      answer: `Yes! Pentagram actively services all major apartment complexes, condominiums, builder floors, and villas across ${cleanCity}, including ${citySocietiesMap[cleanCity].join(', ')}.`,
    },
  ];

  return {
    roomType,
    city: cleanCity,
    slug,
    pageTitle,
    h1,
    metaDescription,
    pricePerSqFtRange: priceMap[roomType] || '₹1,400 – ₹2,800 / sq.ft',
    averageTimelineDays: timelineMap[roomType] || '20 – 30 Days',
    localIntro,
    heroImage: imageMap[roomType] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    designStyles: ['Modern Minimalist', 'Scandinavian Warmth', 'Contemporary Luxury', 'Neoclassical', 'Japandi Harmony'],
    popularSocieties: citySocietiesMap[cleanCity],
    faqs,
  };
}
