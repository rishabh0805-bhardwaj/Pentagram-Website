import React, { useEffect } from 'react';
import { ServiceableCity, NavigationPage } from '../types';
import { generateSeoPageData } from '../seo/pageGenerator';

interface SeoGeoContentBlockProps {
  activePage: NavigationPage;
  selectedCity: ServiceableCity;
  onSelectCity?: (city: ServiceableCity) => void;
  onNavigate?: (page: NavigationPage) => void;
  onOpenConsultation?: (note: string) => void;
}

/**
 * Headless SEO & GEO Schema Engine
 * Keeps all technical SEO, Meta tags, and Schema.org JSON-LD hidden from human visitors,
 * injecting them directly into document.head for search crawlers and AI bots.
 */
export const SeoGeoContentBlock: React.FC<SeoGeoContentBlockProps> = ({
  activePage,
  selectedCity,
}) => {
  // Synchronize SEO & Schema in document.head behind the scenes
  useEffect(() => {
    try {
      const data = generateSeoPageData(activePage, selectedCity);

      // 1. Update Document Title Tag
      document.title = data.title;

      // 2. Update Meta Description in head
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', data.metaDescription);

      // 3. Inject / Update Dynamic JSON-LD Schema in Document Head
      let schemaScript = document.getElementById('pentagram-dynamic-schema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'pentagram-dynamic-schema';
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(data.schema, null, 2);
    } catch (err) {
      console.error('SEO Page Generator Error:', err);
    }
  }, [activePage, selectedCity]);

  // Completely hidden from the visual UI as requested by user
  return null;
};

