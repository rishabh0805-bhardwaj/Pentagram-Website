export interface PolicyClause {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  badge?: string;
}

export const TERMS_AND_CONDITIONS_DATA: {
  title: string;
  subtitle: string;
  effectiveDate: string;
  legalEntity: string;
  cin: string;
  gstin: string;
  registeredStudio: string;
  jurisdiction: string;
  clauses: PolicyClause[];
} = {
  title: 'Official Terms & Conditions (T&C) & Service Policies',
  subtitle: 'Contractual Interior Design, Fabrication & Turnkey Execution Agreement',
  effectiveDate: 'Valid for all active projects across Delhi NCR (2025–2026)',
  legalEntity: 'Verdoire Interiors & Furnishings Pvt. Ltd.',
  cin: 'U74999DL2021PTC389421',
  gstin: '06AAACV4912P1ZR',
  registeredStudio: 'Pentagram, Opp DLF Alameda, Sector 73, Gurugram Haryana',
  jurisdiction: 'Courts of Gurugram, Haryana, India',
  clauses: [
    {
      id: 'parties-entity',
      number: '01',
      title: 'Contracting Parties & Legal Entity',
      summary: 'Pentagram is the flagship residential brand operated by Verdoire Interiors & Furnishings Pvt. Ltd.',
      badge: 'Corporate Governance',
      details: [
        'All client proposals, quotations, tax invoices, and legal agreements are entered into with Verdoire Interiors & Furnishings Pvt. Ltd. (CIN: U74999DL2021PTC389421; GSTIN: 06AAACV4912P1ZR).',
        '“PENTAGRAM: YOUR SPACE EXPERT” and “PENTAGRAM: YOUR HOME EXPERT” are registered trading and brand names owned exclusively by Verdoire Interiors & Furnishings Pvt. Ltd.',
        'Registered Studio & Experience Centre: Pentagram, Opp DLF Alameda, Sector 73, Gurugram, Haryana.',
        'Serviceable Territory: Services are exclusively rendered within 6 defined cities: Gurgaon (Gurugram), Noida, Greater Noida, Faridabad, Delhi, and New Delhi.',
      ],
    },
    {
      id: 'scope-70-30',
      number: '02',
      title: 'Scope of Works & The 70/30 Principle',
      summary: '70% automated precision factory engineering combined with 30% master on-site human craftsmanship.',
      badge: 'Precision Standards',
      details: [
        '70% Automated Factory Fabrication: All modular carcasses, shutters, and shelving are cut using German computerized beam saws to ±0.2mm precision and finished with PUR laser edge-banding in our in-house manufacturing facility.',
        '30% Master On-Site Craft: Civil modifications, electrical raceway shifts, plumbing rough-ins, false ceilings, and surface painting are performed by certified site specialists under direct project management supervision.',
        'Zero Adulteration: Plywood cores are 100% genuine BWP/BWR boiling-water-resistant ply. Commercial particle boards or untreated MDF are never substituted for wet-area cabinetry.',
      ],
    },
    {
      id: 'payment-milestones',
      number: '03',
      title: 'Transparent Stage-Wise Milestone Payments',
      summary: 'Pay strictly as verified physical checkpoints are completed. No upfront carpentry advance.',
      badge: 'Financial Safety',
      details: [
        'Milestone 1 (15%): Due upon approval of 3D architectural renders, on-site 3D laser measurement verification, and finalized itemized Bill of Quantities (BOQ).',
        'Milestone 2 (35%): Due when raw material cut-lists are approved, and QR tracking codes are allocated at the modular manufacturing facility.',
        'Milestone 3 (35%): Due upon physical doorstep arrival and joint visual inspection of all flat-pack modules at the homeowner’s society.',
        'Milestone 4 (15%): Due solely after final snag-list rectification, professional post-fitout deep cleaning, and issuance of the 10-Year Warranty Certificate.',
        'Zero Price Escalation: The approved Design OS BOQ is fixed-cost. No mid-project price increases unless the homeowner explicitly requests scope additions in writing.',
      ],
    },
    {
      id: 'handover-guarantee',
      number: '04',
      title: '45-Day Move-In Guarantee & Delay Penalty',
      summary: 'Contractually committed 45 working days timeline backed by daily liquidated damages.',
      badge: 'Delivery Commitment',
      details: [
        'Timeline Clock: The 45-working-day clock commences upon: (a) 100% design freeze and sign-off, (b) completion of Milestone 1, and (c) site availability with uninterrupted power/water supply.',
        'Daily Delay Compensation: In the event of unexcused delays exceeding 45 working days, Pentagram automatically credits ₹1,000 per day of delay directly into the homeowner’s final milestone account.',
        'Force Majeure Exclusions: Timelines pause for society-imposed construction bans (e.g., GRAP air pollution guidelines in Delhi NCR), Diwali/national holiday restrictions, or client-initiated design changes.',
      ],
    },
    {
      id: 'warranty-coverage',
      number: '05',
      title: '10-Year Comprehensive Woodwork Warranty',
      summary: 'Robust structural coverage against delamination, termite infestation, and hardware failure.',
      badge: '10-Year Assurance',
      details: [
        'What is Covered: Carcass structural integrity, boiling-water-proof bonding, anti-termite core resistance, factory edge-banding adherence, and European hardware (Blum / Hettich hinges & soft-close channels).',
        'Complimentary Care: Two free preventative maintenance and hinge re-alignment visits during the first 12 months post-handover.',
        'Exclusions: Normal surface wear, scratches from knives or abrasive scourers, third-party structural seepage from external building walls, or alterations by third-party technicians.',
      ],
    },
    {
      id: 'design-freeze-variations',
      number: '06',
      title: 'Design Freeze, Variations & Change Orders',
      summary: 'Clarity in drafting, color approvals, and written change orders.',
      badge: 'Execution Protocol',
      details: [
        '3D & Material Freeze: Homeowners sign off on exact laminate swatches, quartz samples, and hardware models via our Doorstep Sample Kit before manufacturing initiates.',
        'Written Change Orders: Any modification requested post-Milestone 2 requires a formal Change Order detailing impact on cost and schedule before factory production re-aligns.',
      ],
    },
    {
      id: 'intellectual-property',
      number: '07',
      title: 'Intellectual Property & Design OS Assets',
      summary: 'Proprietary software, 3D VR renders, and technical manufacturing cut-lists.',
      badge: 'Proprietary Tech',
      details: [
        'All photorealistic 3D renders, VR walkthroughs, electrical layouts, and proprietary Design OS cut-list algorithms remain the intellectual property of Verdoire Interiors & Furnishings Pvt. Ltd.',
        'The client is granted perpetual personal use rights for their specific property upon full project completion.',
      ],
    },
    {
      id: 'privacy-data-protection',
      number: '08',
      title: 'Privacy Policy & Data Protection (IT Act 2000)',
      summary: 'Strict confidentiality regarding client phone numbers, floor plans, and society access.',
      badge: 'Privacy & Security',
      details: [
        'We adhere to the provisions of the Information Technology Act, 2000 and SPDI Rules.',
        'Client phone numbers and floor plans are never sold, traded, or shared with third-party telemarketers or contractors.',
        'Phone numbers provided via our Lead Consultation or OTP portals are strictly utilized for direct project coordination and automated milestone notifications.',
      ],
    },
    {
      id: 'dispute-resolution',
      number: '09',
      title: 'Dispute Redressal, Arbitration & Jurisdiction',
      summary: 'Tiered resolution with exclusive legal jurisdiction in Gurugram, Haryana.',
      badge: 'Legal Recourse',
      details: [
        'Tier 1: Senior Project Manager on-site resolution within 24 hours.',
        'Tier 2: Escalation to the Corporate Grievance Officer of Verdoire Interiors & Furnishings Pvt. Ltd. (care@pentagram.expert / grievance@pentagram.expert).',
        'Tier 3: Unresolved disputes shall be referred to sole arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996.',
        'Exclusive Jurisdiction: All legal proceedings and contracts shall be subject to the exclusive jurisdiction of the competent courts in Gurugram, Haryana.',
      ],
    },
  ],
};
