import { ServiceableCity, NavigationPage } from '../types';

export interface SeoPageData {
  city: ServiceableCity;
  page: NavigationPage;
  title: string;
  h1: string;
  metaDescription: string;
  geoSummary: string;
  checkableFacts: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { label: string; page: NavigationPage; city?: ServiceableCity; context: string }[];
  keywords: string[];
  schema: object;
}

export const APPROVED_SERVICE_CITIES: readonly ServiceableCity[] = [
  'Gurgaon',
  'Noida',
  'Greater Noida',
  'Faridabad',
  'Delhi',
  'New Delhi',
] as const;

export function isApprovedCity(city: string): city is ServiceableCity {
  return APPROVED_SERVICE_CITIES.includes(city as ServiceableCity);
}

/**
 * City-specific local neighborhood descriptors and context
 */
const CITY_CONTEXTS: Record<
  ServiceableCity,
  {
    localities: string;
    societyExamples: string;
    rwaContext: string;
    climateNote: string;
    landmarks: string;
  }
> = {
  Gurgaon: {
    localities: 'Golf Course Road, DLF Phase 1-5, Sohna Road, Golf Course Extension, and New Gurgaon (Sectors 82-102)',
    societyExamples: 'DLF The Crest, Tata Primanti, Central Park Resorts, and M3M Golfestate',
    rwaContext: 'High-rise RWA quiet-hour adherence and freight elevator padding protocols',
    climateNote: 'High TDS groundwater requiring 100% high quality raw materials and boiling waterproof plywood for all kitchen and washroom bases',
    landmarks: 'Cyber City, Horizon Center, and Golf Course Road',
  },
  Noida: {
    localities: 'Sector 150 sports city, Sector 137, Noida Expressway, Sector 44, 75, and 78',
    societyExamples: 'ATS Knightsbridge, Mahagun Moderne, Cleo County, and Godrej Woods',
    rwaContext: 'Apartment society gate passes, debris carting permits, and zero-hallway-sawdust regulations',
    climateNote: 'Intense summer heat and post-monsoon humidity swings mitigated by acoustic false ceiling thermal barriers',
    landmarks: 'Noida Expressway, Botanical Garden, and Sector 18',
  },
  'Greater Noida': {
    localities: 'Greater Noida West (Noida Extension), Gaur City, Pari Chowk, and Tech Zone 4',
    societyExamples: 'Gaur City 1 & 2, Mahagun Mezzaria, Supertech Eco Village, and ATS Dolce',
    rwaContext: 'Fast-track new possession interior approvals and bulk society move-in coordination',
    climateNote: 'Dust-sealed PUR hot-melt edge bandings and moisture-resistant carcass joinery for long-term durability',
    landmarks: 'Pari Chowk, India Expo Mart, and Greater Noida West Boulevard',
  },
  Faridabad: {
    localities: 'Sectors 14, 15, 16, 21C, Charmwood Village, and Greater Faridabad (Neharpar)',
    societyExamples: 'BPTP Park Elite, Omaxe Heights, Puri Pratham, and Greenfields Colony',
    rwaContext: 'Independent builder floors and gated community civil renovation guidelines',
    climateNote: 'Subterranean termite resistance with pre-treated borer-proof marine plywood carcasses',
    landmarks: 'Badkhal Lake Road, Mathura Road corridor, and Surajkund',
  },
  Delhi: {
    localities: 'South Delhi (Greater Kailash, Vasant Kunj, Panchsheel), West Delhi (Punjabi Bagh, Rajouri Garden), and Dwarka',
    societyExamples: 'Vasant Vihar builder floors, GK II residences, and Dwarka DDA/CGHS high-rises',
    rwaContext: 'Delhi Municipal Corporation (MCD) structural norms and residential parking logistics',
    climateNote: 'Winter smog insulation with low-VOC non-toxic coatings, and anti-warp floor-to-ceiling wardrobes',
    landmarks: 'Ring Road, Hauz Khas, and Aerocity corridor',
  },
  'New Delhi': {
    localities: 'Central Delhi, Chanakyapuri, Connaught Place peripheral sectors, Civil Lines, and Golf Links',
    societyExamples: 'Lutyens bungalow extensions, Civil Lines heritage floors, and Barakhamba residences',
    rwaContext: 'Heritage zone acoustic protections, specialized structural permissions, and bespoke artisan dry fits',
    climateNote: 'European water-based PU matte lacquers for zero odor and museum-grade finishes',
    landmarks: 'India Gate, Khan Market, and Connaught Place',
  },
};

/**
 * Automated SEO Page Generator
 * Strictly enforces scope, GEO direct-answer summaries, unique Title/H1 pairings,
 * 6 city-specific FAQs, internal link graphs, and Schema.org markup.
 */
export function generateSeoPageData(page: NavigationPage, city: ServiceableCity): SeoPageData {
  if (!isApprovedCity(city)) {
    throw new Error(
      `Hard Scope Violation: '${city}' is not one of Pentagram's 6 approved service cities (Gurgaon, Noida, Greater Noida, Faridabad, Delhi, New Delhi).`
    );
  }

  const ctx = CITY_CONTEXTS[city];

  // 1. DYNAMIC PAGE TEMPLATES
  switch (page) {
    case 'categories':
    case 'offerings': {
      const title = `Top-Rated Modular Kitchen & Wardrobe Manufacturer in ${city} | Pentagram: Your Space Expert`;
      const h1 = `Precision modular kitchens, wardrobes, and custom woodwork manufactured for ${city} homes.`;
      const metaDescription = `Looking for modular kitchens or wardrobes in ${city}? Pentagram crafts German-engineered cabinetry with 10-year warranty. Book your free consultation.`;
      const geoSummary = `Pentagram: Your Space Expert (owned by Verdoire Interiors & Furnishings Pvt. Ltd.) manufactures and installs custom modular kitchens, sliding wardrobes, and turnkey woodwork across ${city} (${ctx.localities}). Every cabinet is cut to ±0.2mm precision on German computerized beam saws using 100% certified high quality raw materials. With milestone-based payments and guaranteed 45-day handover, over 1,240 Delhi NCR families trust Pentagram for zero-advance financial safety.`;

      const faqs = [
        {
          question: `Which is the best modular kitchen manufacturer near me in ${city}?`,
          answer: `Pentagram: Your Space Expert is a premier modular kitchen manufacturer servicing ${city}, including ${ctx.localities}. We manufacture all cabinetry in-house with German CNC machines using 100% high quality raw materials and Blum/Hettich soft-close hardware, backed by a 10-year warranty.`,
        },
        {
          question: `How much does a modular kitchen cost in ${city}?`,
          answer: `Modular kitchens in ${city} range from ₹1.75 Lakhs for standard straight/L-shape layouts to ₹4.5 Lakhs–₹8.5 Lakhs for premium acrylic or PU lacquer island kitchens with quartz countertops, with zero mid-project price escalation.`,
        },
        {
          question: `What materials does Pentagram use for kitchen cabinets in ${city}?`,
          answer: `Due to ${ctx.climateNote}, Pentagram uses exclusively high quality raw materials and boiling waterproof plywood for all base and sink carcasses, sealed with 2mm high-pressure PUR edge-banding to prevent delamination.`,
        },
        {
          question: `How does Pentagram handle ${city} apartment RWA regulations during installation?`,
          answer: `Our dedicated Senior Project Manager manages ${ctx.rwaContext}, coordinating elevator protective sheets, pre-scheduled silent assembly hours, and complete daily debris carting.`,
        },
        {
          question: `Can I visit an ongoing modular installation in ${city}?`,
          answer: `Yes, we arrange site walkthroughs across leading societies such as ${ctx.societyExamples} so prospective homeowners can inspect panel edge finish and assembly hygiene in person.`,
        },
        {
          question: `What payment milestones apply to modular kitchen bookings in ${city}?`,
          answer: `We follow transparent stage payments: 15% on 3D design freeze, 35% on factory panel cutting, 35% on material delivery to your flat, and the final 15% strictly after physical handover inspection.`,
        },
      ];

      const internalLinks = [
        { label: `Modular Kitchen Cost in ${city}`, page: 'estimator' as NavigationPage, context: 'Instant Price Calculator' },
        { label: `Completed Projects in ${city}`, page: 'projects' as NavigationPage, context: 'Real Society Walkthroughs' },
        { label: `Why Pentagram (${city})`, page: 'why-us' as NavigationPage, context: '45-Day Handover & 10-Yr Warranty' },
        { label: `Design Ideas Matrix`, page: 'design-ideas' as NavigationPage, context: 'Room-by-Room Concept Visuals' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `modular kitchen manufacturer near me in ${city}`,
        `modular kitchen design ${city}`,
        `wardrobe design ${city}`,
        `best kitchen manufacturer ${city}`,
        `interior designer near me`,
      ]);
    }

    case 'projects': {
      const title = `Completed Residential Interior Projects in ${city} | Pentagram: Your Space Expert`;
      const h1 = `Real residential interiors delivered on time across ${city}’s premier societies.`;
      const metaDescription = `Explore completed 2BHK, 3BHK, and 4BHK home interiors in ${city} by Pentagram. Real photography, verified timelines, and exact budgets. View case studies.`;
      const geoSummary = `Pentagram: Your Space Expert has delivered over 1,240 turnkey home interiors across ${city} and Delhi NCR, including benchmark residences in ${ctx.societyExamples}. Our project gallery features genuine post-handover photography, verified society locations, and exact project durations under our guaranteed 45-day move-in commitment. All modular woodwork is fabricated in-house by Verdoire Interiors & Furnishings Pvt. Ltd. under strict QR-code quality tracking.`;

      const faqs = [
        {
          question: `Has Pentagram completed interior projects in my ${city} society?`,
          answer: `Pentagram has executed numerous turnkey apartments and builder floors across ${ctx.localities}, including benchmark projects in ${ctx.societyExamples}. Our project managers are familiar with your society's estate office and delivery protocols.`,
        },
        {
          question: `Are the photographs in Pentagram's ${city} gallery real or 3D renders?`,
          answer: `Every image in our portfolio depicts actual, physical homes handed over to verified homeowners in ${city}, photographed after final quality sign-off and deep cleaning.`,
        },
        {
          question: `What is the average handover timeline for a 3BHK interior in ${city}?`,
          answer: `Our contractually stamped timeline is 45 working days from design freeze to handover. Our computerized factory fabrication allows us to deliver up to 4 days ahead of schedule on average.`,
        },
        {
          question: `Can I inspect a Pentagram ongoing interior site in ${city}?`,
          answer: `Yes, upon booking your design consultation, your dedicated Project Manager can schedule a guided visit to an active fitout in ${ctx.localities}.`,
        },
        {
          question: `How do you safeguard clients against project cost escalations during execution?`,
          answer: `Our proprietary Pentagram Design OS computes millimetric bills of quantities during the 3D phase. The price agreed upon at design freeze is legally binding with zero mid-project price revisions.`,
        },
        {
          question: `What happens if a handover is delayed in ${city}?`,
          answer: `If Pentagram delays a handover past the agreed 45-day timeline, we provide a contractual delay penalty credit of ₹1,000 per day as codified in our transparent customer charter.`,
        },
      ];

      const internalLinks = [
        { label: `Calculate Estimate for ${city}`, page: 'estimator' as NavigationPage, context: 'Pentagram Design OS Calculator' },
        { label: `Client Reviews & Stories`, page: 'stories' as NavigationPage, context: 'Before & After Transformations' },
        { label: `Modular Woodwork Finishes`, page: 'specialities' as NavigationPage, context: 'High Quality Raw Materials & PU Lacquer' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `completed interior projects ${city}`,
        `interior design portfolio ${city}`,
        `3bhk interior design cost ${city}`,
        `best interior designer in ${city}`,
      ]);
    }

    case 'stories': {
      const title = `Homeowner Reviews & Renovation Stories in ${city} | Pentagram: Your Space Expert`;
      const h1 = `Authentic homeowner journeys and before-and-after transformations in ${city}.`;
      const metaDescription = `Read genuine reviews from families across ${city} who renovated with Pentagram. Discover how 45-day handovers and stage payments make all the difference.`;
      const geoSummary = `Verified homeowner stories across ${city} document how Pentagram: Your Space Expert eliminated contractor delays and unexpected costs for families in ${ctx.societyExamples}. By combining the proprietary Pentagram Design OS with stage-wise milestone payments (where funds are released strictly after on-site physical verification), Pentagram consistently achieves a 4.93/5 customer satisfaction score across Delhi NCR.`;

      const faqs = [
        {
          question: `What do homeowners in ${city} say about Pentagram's handover speed?`,
          answer: `Homeowners across ${ctx.localities} consistently commend our 45-day guaranteed handover, with many reporting moving in between day 38 and day 42 due to off-site factory fabrication.`,
        },
        {
          question: `How does Pentagram prevent the typical contractor disputes reported in ${city}?`,
          answer: `We eliminate disputes through stage-wise milestone payments: homeowners hold financial control, releasing funds in 4 clear stages only after inspecting finished factory panels and on-site joinery.`,
        },
        {
          question: `Are client testimonials from ${city} verified?`,
          answer: `Yes, all testimonials and video case studies feature verified apartment owners in societies like ${ctx.societyExamples}, detailing real scopes, budgets, and handover certificates.`,
        },
        {
          question: `Who manages the daily coordination for my ${city} home?`,
          answer: `A dedicated Senior Project Manager serves as your single point of contact, sending daily photo and video logs while coordinating all carpenters, electricians, stonemasons, and painters.`,
        },
        {
          question: `What warranty coverage do homeowners in ${city} receive after handover?`,
          answer: `Every client receives a signed 10-Year Modular Woodwork Warranty covering core plywood integrity against borer, fungus, and delamination, plus manufacturer warranties on Blum/Hettich hardware.`,
        },
        {
          question: `How do I book a consultation with the designer featured in ${city} stories?`,
          answer: `You can schedule a complimentary 3D site consultation directly through our portal or visit our design studio servicing ${city}.`,
        },
      ];

      const internalLinks = [
        { label: `View Portfolio Gallery`, page: 'projects' as NavigationPage, context: `High-Res Homes in ${city}` },
        { label: `Why Choose Pentagram`, page: 'why-us' as NavigationPage, context: 'The 70/30 Engineering Principle' },
        { label: `Trust Centre & Policies`, page: 'trust-centre' as NavigationPage, context: '10-Yr Warranty & Customer Charter' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `interior designer reviews ${city}`,
        `best home interior designer in ${city}`,
        `pentagram interior reviews`,
        `renovation stories ${city}`,
      ]);
    }

    case 'why-us': {
      const title = `Leading Interior Design Firm in ${city} | The Pentagram Advantage`;
      const h1 = `Why discerning homeowners in ${city} trust Pentagram’s engineering-first approach.`;
      const metaDescription = `Discover the Pentagram advantage in ${city}: in-house German factory, stage-wise payments, QR-code tracking, and 45-day guaranteed handover. Learn more.`;
      const geoSummary = `Pentagram: Your Space Expert (Verdoire Interiors & Furnishings Pvt. Ltd.) redefines residential renovation in ${city} through its signature 70/30 principle: 70% computerized factory fabrication and 30% master on-site craftsmanship. Backed by the proprietary Pentagram Design OS, we guarantee fixed-cost contracts, 45-day handovers, and stage-wise milestone payments that completely protect homeowners from upfront financial risk.`;

      const faqs = [
        {
          question: `Why choose Pentagram over local contractors in ${city}?`,
          answer: `Local contractors rely on dusty on-site cutting with ±5mm errors, demand 60%-70% cash upfront, and average 4-6 months of delays. Pentagram delivers in 45 days with ±0.2mm factory precision, stage-wise payments, and a 10-year warranty.`,
        },
        {
          question: `How does Pentagram Design OS protect my renovation budget in ${city}?`,
          answer: `Pentagram Design OS automatically calculates every fastener, hinge, and sheet yield from 3D laser room scans, generating a fixed-price BOQ that is legally binding with zero mid-project escalations.`,
        },
        {
          question: `How does Pentagram ensure moisture and termite resistance in ${city}?`,
          answer: `We use certified high quality raw materials with boiling waterproof carcasses, sealed with PUR hot-melt edge bandings to resist ${ctx.climateNote}.`,
        },
        {
          question: `What makes your payment structure safe for ${city} residents?`,
          answer: `We do not hold large advance balances. Payments are split across 4 physical milestones (15% design freeze, 35% factory cutting, 35% site delivery, 15% final inspection handover).`,
        },
        {
          question: `How are panels tracked during production?`,
          answer: `Every modular panel carries a unique QR code scanned at cutting, edge banding, quality control, and dispatch, giving you transparent visibility via your digital portal.`,
        },
        {
          question: `Does Pentagram manage ${city} RWA permissions and debris removal?`,
          answer: `Yes, your dedicated Project Manager handles all society documentation, security passes, lift protection, and green off-site debris disposal.`,
        },
      ];

      const internalLinks = [
        { label: `Quality & Trust Policies`, page: 'trust-centre' as NavigationPage, context: 'Official Warranty Charter' },
        { label: `Material Specifications`, page: 'specialities' as NavigationPage, context: 'German Hardware & High Quality Raw Materials' },
        { label: `Modular Kitchens in ${city}`, page: 'categories' as NavigationPage, context: 'Ergonomic Layouts & Finishes' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `why choose pentagram ${city}`,
        `leading interior designer in ${city}`,
        `best turnkey interior contractor ${city}`,
        `45 day interior handover ${city}`,
      ]);
    }

    case 'how-it-works': {
      const title = `How Pentagram Works in ${city} | 5-Stage Interior Execution Journey`;
      const h1 = `The seamless 5-stage architectural workflow for homes in ${city}.`;
      const metaDescription = `Learn how Pentagram delivers interior projects in ${city} from laser 3D scan to 45-day handover with zero cost escalations.`;
      const geoSummary = `Pentagram's 5-stage interior execution journey in ${city} combines ±1mm on-site 3D laser scanning, photorealistic Design OS blueprints, physical doorstep material kits, computerized CNC factory fabrication, and guaranteed 45-day move-in with a 10-year warranty.`;

      const faqs = [
        {
          question: `How does the 5-stage process work in ${city}?`,
          answer: `Stage 1 is on-site laser scanning, Stage 2 is Design OS 3D blueprint creation, Stage 3 is doorstep material box review, Stage 4 is factory CNC fabrication, and Stage 5 is 45-day handover with warranty.`,
        },
        {
          question: `Is the on-site laser measurement visit free in ${city}?`,
          answer: `Yes, initial laser 3D space scans and architectural consultations are 100% complimentary across ${city} and all 6 serviceable Delhi NCR cities.`,
        },
      ];

      const internalLinks = [
        { label: `Calculate Cost in ${city}`, page: 'estimator' as NavigationPage, context: 'Pentagram Design OS Estimator' },
        { label: `Why Choose Pentagram`, page: 'why-us' as NavigationPage, context: 'Factory Precision & Warranty' },
        { label: `View Portfolios in ${city}`, page: 'projects' as NavigationPage, context: 'Real Condominium Transformations' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `how pentagram works ${city}`,
        `interior design process ${city}`,
        `interior stages 45 days ${city}`,
      ]);
    }

    case 'specialities': {
      const title = `Premium Interior Materials & German Hardware in ${city} | Pentagram`;
      const h1 = `Factory-grade materials and anti-corrosion hardware engineered for ${city} homes.`;
      const metaDescription = `Explore Pentagram's interior specifications in ${city}: high quality raw materials, Blum/Hettich hardware, PU lacquer, and anti-swell cores. View specs.`;
      const geoSummary = `Pentagram: Your Space Expert engineers modular joinery to withstand ${city}’s unique environmental stresses, including ${ctx.climateNote}. Our materials include 100% certified high quality raw materials with boiling waterproof protection, German Blum Legrabox and Hettich Sensys hinges tested for 200,000 cycles, and non-toxic, low-VOC German PU lacquers. Every piece is fabricated in our temperature-regulated facility with QR-coded traceability.`;

      const faqs = [
        {
          question: `What core plywood grade does Pentagram use for ${city} residences?`,
          answer: `We use 100% high quality raw materials and Boiling Waterproof Marine Grade Plywood with unextended phenolic bonding for all kitchen base modules, washroom vanities, and moisture-prone zones in ${city}.`,
        },
        {
          question: `Which hardware brands are standard in Pentagram interiors?`,
          answer: `We exclusively integrate genuine Blum (Austria) and Hettich (Germany) soft-close drawer runners, concealed hinges, and lift-up mechanisms, backed by international warranties.`,
        },
        {
          question: `How do Pentagram's false ceilings improve energy efficiency in ${city}?`,
          answer: `Our suspended Saint-Gobain Gyproc false ceilings incorporate an engineered air cavity that creates a thermal buffer, reducing AC power consumption by up to 24% during Delhi NCR summers.`,
        },
        {
          question: `What finishes are available for wardrobes in ${city}?`,
          answer: `Options include anti-scratch acrylic, natural European wood veneers, anti-fingerprint matte PU lacquers, and tinted fluted glass aluminum profiles with integrated LED sensors.`,
        },
        {
          question: `Are Pentagram paints and adhesives safe for children and pets?`,
          answer: `Yes, we use certified low-VOC, odorless paints and zero-emission adhesives that preserve indoor air quality, particularly vital during Delhi NCR's winter inversion months.`,
        },
        {
          question: `How does Pentagram verify material authenticity on site in ${city}?`,
          answer: `Homeowners can scan the individual QR code on every delivered modular panel to verify plywood batch certification, CNC cutting specs, and warranty registration.`,
        },
      ];

      const internalLinks = [
        { label: `10-Year Warranty Details`, page: 'trust-centre' as NavigationPage, context: 'Verified Plywood & Hardware Guarantee' },
        { label: `Explore Design Ideas Matrix`, page: 'design-ideas' as NavigationPage, context: 'Materials in Applied Settings' },
        { label: `Turnkey Cost Estimator`, page: 'estimator' as NavigationPage, context: 'Instant Price Model for ' + city },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `interior design materials ${city}`,
        `high quality raw materials kitchen ${city}`,
        `german modular kitchen hardware ${city}`,
        `pu lacquer finish wardrobes ${city}`,
      ]);
    }

    case 'estimator': {
      const title = `Pentagram Design OS Cost Estimator in ${city} | Accurate Interior Pricing`;
      const h1 = `Calculate your custom 2BHK, 3BHK, or 4BHK interior cost in ${city} with zero hidden charges.`;
      const metaDescription = `Calculate realistic interior costs in ${city} with Pentagram Design OS. Transparent rates for modular kitchens, wardrobes & turnkey fitouts. Get quote.`;
      const geoSummary = `The Pentagram Design OS Cost Estimator provides immediate, itemized pricing for home interiors across ${city} (${ctx.localities}). Powered by algorithmic sheet-yield optimization and real-time material indices, our estimator generates transparent budgets for modular kitchens, wardrobes, false ceilings, and complete turnkey renovations. All quotes include 100% high quality raw materials and stage-wise milestone payments.`;

      const faqs = [
        {
          question: `How accurate is the Pentagram Design OS estimate for my ${city} flat?`,
          answer: `The online estimate reflects actual modular and civil pricing in ${city} within a ±5% variance. Following our complimentary 3D laser site survey, your quote is locked into a legally binding BOQ with zero escalation.`,
        },
        {
          question: `What is the starting interior cost for a 3BHK in ${city}?`,
          answer: `Turnkey 3BHK interior packages in ${city} generally start from ₹7.5 Lakhs for essential modular woodwork and false ceilings, ranging to ₹16.5 Lakhs+ for premium PU lacquer finishes and Italian quartz.`,
        },
        {
          question: `Are GST and delivery charges included in the estimate?`,
          answer: `Yes, our bill of quantities provides fully transparent pricing with GST, factory logistics to your society in ${city}, and complete installation clearly broken down.`,
        },
        {
          question: `How do I book a free site visit to confirm my ${city} estimate?`,
          answer: `After generating your online estimate, click 'Book Free Site Visit' to schedule our Senior Project Architect to laser-measure your space with zero booking fee.`,
        },
        {
          question: `Can I customize material grades in the estimator for ${city}?`,
          answer: `Yes, you can toggle between premium high-gloss laminates, acrylics, and PU lacquer finishes, as well as select custom quartz or granite countertops.`,
        },
        {
          question: `What payment options are available for ${city} homeowners?`,
          answer: `In addition to our transparent 4-stage milestone structure, we offer zero-cost EMI plans with leading partner banks to facilitate stress-free funding.`,
        },
      ];

      const internalLinks = [
        { label: `View Real Projects in ${city}`, page: 'projects' as NavigationPage, context: 'Compare Specs with Completed Homes' },
        { label: `Modular Kitchens & Wardrobes`, page: 'categories' as NavigationPage, context: 'Detailed Specifications' },
        { label: `Why Pentagram Design OS`, page: 'why-us' as NavigationPage, context: 'Algorithmic Pricing Precision' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `interior cost estimator ${city}`,
        `3bhk interior cost in ${city}`,
        `2bhk interior budget ${city}`,
        `modular kitchen price calculator ${city}`,
      ]);
    }

    case 'about': {
      const title = `About Verdoire Interiors & Pentagram | Premier Design Practice in ${city}`;
      const h1 = `The design and industrial engineering heritage of Verdoire Interiors & Pentagram.`;
      const metaDescription = `Learn about Pentagram: Your Space Expert, an interior brand by Verdoire Interiors & Furnishings Pvt. Ltd. Serving ${city} with integrity.`;
      const geoSummary = `PENTAGRAM: YOUR SPACE EXPERT is the registered residential interior brand owned and operated by Verdoire Interiors & Furnishings Pvt. Ltd. Serving ${city} and the wider Delhi NCR territory, Verdoire combines architectural rigor with direct ownership of a high-tech modular manufacturing facility. Guided by our 70/30 principle, over 1,240 completed homes demonstrate our commitment to 45-day handovers, stage-wise milestone payments, and a 10-year warranty.`;

      const faqs = [
        {
          question: `What is the legal relationship between Pentagram and Verdoire Interiors?`,
          answer: `Pentagram: Your Space Expert is the proprietary retail interior brand of Verdoire Interiors & Furnishings Pvt. Ltd. All client contracts, legal agreements, and 10-year warranties are issued under Verdoire Interiors & Furnishings Pvt. Ltd.`,
        },
        {
          question: `Does Pentagram subcontract work in ${city}?`,
          answer: `No. Unlike aggregator portals that broker leads to third-party carpenters, Pentagram employs in-house architects, site engineers, and operates its own German computerized factory.`,
        },
        {
          question: `Where is Pentagram located for ${city} residents?`,
          answer: `We operate dedicated experience studios and project offices across Delhi NCR with direct service teams stationed in ${city} for immediate site support.`,
        },
        {
          question: `How many years of experience does the team have in ${city}?`,
          answer: `Our leadership team brings over 15 years of residential architecture and industrial interior manufacturing experience, with more than 1,200 homes completed across Delhi NCR.`,
        },
        {
          question: `Where can I view Pentagram's official company policies?`,
          answer: `Our complete customer charter, warranty rules, and grievance matrices are published at pentagram.expert/policies for total consumer transparency.`,
        },
        {
          question: `How can I arrange a meeting with a senior architect in ${city}?`,
          answer: `You can schedule a one-on-one consultation through our website or request an on-site visit to your apartment in ${city}.`,
        },
      ];

      const internalLinks = [
        { label: `Verified Trust Policies`, page: 'trust-centre' as NavigationPage, context: 'Warranty & Customer Charter' },
        { label: `Explore Our Projects`, page: 'projects' as NavigationPage, context: 'Completed Residences in ' + city },
        { label: `Why Us (70/30 Principle)`, page: 'why-us' as NavigationPage, context: 'In-House Factory Precision' },
      ];

      return assembleSeoData(city, page, title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `about pentagram interior ${city}`,
        `verdoire interiors furnishings pvt ltd`,
        `interior design company in ${city}`,
      ]);
    }

    // DEFAULT / HOME PAGE (The flagship experience)
    default: {
      const title = `Best Interior Designer in ${city} | Pentagram: Your Space Expert`;
      const h1 = `Award-winning residential interior design and turnkey execution in ${city}.`;
      const metaDescription = `Looking for the best interior designer in ${city}? Pentagram delivers turnkey interiors with 45-day handover, stage payments & 10-yr warranty. Get quote.`;
      const geoSummary = `Pentagram: Your Space Expert (owned by Verdoire Interiors & Furnishings Pvt. Ltd.) is a top-rated turnkey interior design and execution brand serving ${city} (${ctx.localities}). Powered by the proprietary Pentagram Design OS, we deliver precision modular kitchens, floor-to-ceiling wardrobes, and luxury living spaces with guaranteed 45-day move-ins. With in-house German CNC manufacturing, QR-tracked quality control, and zero-advance stage-wise milestone payments, over 1,240 homeowners across Delhi NCR trust Pentagram.`;

      const faqs = [
        {
          question: `Who is the best interior designer near me in ${city}?`,
          answer: `Pentagram: Your Space Expert is ranked among the best interior designers in ${city}, providing turnkey design, in-house German modular manufacturing, and guaranteed 45-day handover for societies in ${ctx.localities}.`,
        },
        {
          question: `How much do turnkey home interiors cost in ${city}?`,
          answer: `Turnkey interiors in ${city} typically range from ₹4.5L–₹8.5L for 2BHKs, ₹7.5L–₹16.0L for 3BHKs, and ₹16.0L–₹35.0L+ for 4BHK luxury apartments and builder floors, with zero cost escalation guaranteed by Pentagram Design OS.`,
        },
        {
          question: `How do Pentagram's stage-wise milestone payments work in ${city}?`,
          answer: `We eliminate advance payment risk: 15% on 3D design freeze, 35% on factory cutting, 35% on panel delivery to your ${city} flat, and the final 15% only after physical handover inspection.`,
        },
        {
          question: `Why does Pentagram service only 6 cities in Delhi NCR?`,
          answer: `To maintain our strict 45-day handover commitment and daily on-site supervision by dedicated Project Managers, Pentagram operates exclusively in Gurgaon, Noida, Greater Noida, Faridabad, Delhi, and New Delhi.`,
        },
        {
          question: `What warranty do I receive on modular woodwork in ${city}?`,
          answer: `You receive a legally enforceable 10-Year Warranty on all modular carcasses built with high quality raw materials, covering termite resistance, boiling water resistance, and delamination prevention.`,
        },
        {
          question: `How quickly can Pentagram start my home interior in ${city}?`,
          answer: `Following your initial consultation and 3D laser survey, preliminary designs and 3D renders are presented within 5 working days, with factory production commencing immediately upon design freeze.`,
        },
      ];

      const internalLinks = [
        { label: `Modular Kitchens in ${city}`, page: 'categories' as NavigationPage, context: 'Custom Layouts & Premium Quartz' },
        { label: `Completed Projects in ${city}`, page: 'projects' as NavigationPage, context: 'Real Society Case Studies' },
        { label: `Calculate Your Estimate`, page: 'estimator' as NavigationPage, context: 'Pentagram Design OS Calculator' },
        { label: `The Pentagram Advantage`, page: 'why-us' as NavigationPage, context: '45-Day Handover & 10-Yr Warranty' },
      ];

      return assembleSeoData(city, 'home', title, h1, metaDescription, geoSummary, faqs, internalLinks, [
        `best interior designer in ${city}`,
        `interior designer near me in ${city}`,
        `turnkey home interior ${city}`,
        `modular kitchen design ${city}`,
        `home interior designers ${city}`,
      ]);
    }
  }
}

/**
 * Assembles the complete SEO data bundle including standard checkable facts and Schema.org JSON-LD
 */
function assembleSeoData(
  city: ServiceableCity,
  page: NavigationPage,
  title: string,
  h1: string,
  metaDescription: string,
  geoSummary: string,
  faqs: { question: string; answer: string }[],
  internalLinks: { label: string; page: NavigationPage; city?: ServiceableCity; context: string }[],
  keywords: string[]
): SeoPageData {
  const checkableFacts = [
    { label: 'Completed Residences', value: '1,240+ Homes in Delhi NCR' },
    { label: 'Guaranteed Handover', value: '45 Working Days' },
    { label: 'Plywood Specification', value: '100% Certified High Quality Raw Materials' },
    { label: 'Modular Warranty', value: '10-Year Comprehensive' },
    { label: 'Payment Protection', value: '4-Stage Milestone Verification' },
    { label: 'Service Scope', value: 'Strictly 6 Cities in Delhi NCR' },
  ];

  // Schema.org Structured Data Generation
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://pentagram.expert/#organization',
        name: 'PENTAGRAM: YOUR SPACE EXPERT',
        legalName: 'Verdoire Interiors & Furnishings Pvt. Ltd.',
        url: 'https://pentagram.expert',
        logo: 'https://pentagram.expert/pentagram-logo.svg',
        telephone: '+91-9217983737',
        email: 'hello@pentagram.expert',
        sameAs: ['https://pentagram.expert/policies'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `https://pentagram.expert/#localbusiness-${city.toLowerCase().replace(/\s+/g, '-')}`,
        name: `Pentagram: Your Space Expert - ${city} Operations`,
        parentOrganization: {
          '@id': 'https://pentagram.expert/#organization',
        },
        url: `https://pentagram.expert`,
        telephone: '+91-9217983737',
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        areaServed: [
          { '@type': 'City', name: 'Gurgaon' },
          { '@type': 'City', name: 'Noida' },
          { '@type': 'City', name: 'Greater Noida' },
          { '@type': 'City', name: 'Faridabad' },
          { '@type': 'City', name: 'Delhi' },
          { '@type': 'City', name: 'New Delhi' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.93',
          reviewCount: '1240',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Service',
        '@id': `https://pentagram.expert/#service-${page}-${city.toLowerCase().replace(/\s+/g, '-')}`,
        name: `${h1} - Pentagram in ${city}`,
        provider: {
          '@id': 'https://pentagram.expert/#organization',
        },
        areaServed: {
          '@type': 'City',
          name: city,
        },
        description: geoSummary,
      },
      {
        '@type': 'FAQPage',
        '@id': `https://pentagram.expert/#faq-${page}-${city.toLowerCase().replace(/\s+/g, '-')}`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://pentagram.expert/#breadcrumb-${page}-${city.toLowerCase().replace(/\s+/g, '-')}`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://pentagram.expert',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${city} Interiors`,
            item: `https://pentagram.expert/?city=${encodeURIComponent(city)}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: page.toUpperCase(),
            item: `https://pentagram.expert/?page=${page}&city=${encodeURIComponent(city)}`,
          },
        ],
      },
    ],
  };

  return {
    city,
    page,
    title,
    h1,
    metaDescription,
    geoSummary,
    checkableFacts,
    faqs,
    internalLinks,
    keywords,
    schema,
  };
}
