import { ServiceableCity, NavigationPage } from '../types';
import { generateSeoPageData, SeoPageData, isApprovedCity, APPROVED_SERVICE_CITIES } from './pageGenerator';

export interface RouteParams {
  city?: string;
  page?: string;
}

/**
 * Normalizes city string to valid ServiceableCity, defaulting to 'Gurgaon'
 */
export function parseCityFromParam(param?: string | null): ServiceableCity {
  if (!param) return 'Gurgaon';
  const cleanParam = decodeURIComponent(param).trim().toLowerCase();

  for (const approved of APPROVED_SERVICE_CITIES) {
    if (approved.toLowerCase() === cleanParam) {
      return approved;
    }
  }

  // Handle common variations
  if (cleanParam === 'gurugram') return 'Gurgaon';
  if (cleanParam === 'delhi-ncr') return 'Delhi';
  if (cleanParam.includes('greater noida')) return 'Greater Noida';
  if (cleanParam.includes('new delhi')) return 'New Delhi';
  if (cleanParam.includes('noida')) return 'Noida';
  if (cleanParam.includes('faridabad')) return 'Faridabad';
  if (cleanParam.includes('delhi')) return 'Delhi';

  return 'Gurgaon';
}

/**
 * Normalizes page string to valid NavigationPage, defaulting to 'home'
 */
export function parsePageFromParam(param?: string | null): NavigationPage {
  if (!param) return 'home';
  const cleanParam = decodeURIComponent(param).trim().toLowerCase().replace(/^\/+/, '');

  const validPages: NavigationPage[] = [
    'home',
    'about',
    'stories',
    'why-us',
    'how-it-works',
    'offerings',
    'categories',
    'projects',
    'specialities',
    'magazine',
    'pentagram-tv',
    'design-ideas',
    'reviews',
    'estimator',
    'policies',
    'trust-centre',
  ];

  for (const p of validPages) {
    if (p === cleanParam) {
      return p;
    }
  }

  if (cleanParam === 'cost-estimator' || cleanParam === 'calculator') return 'estimator';
  if (cleanParam === 'gallery' || cleanParam === 'portfolio') return 'projects';
  if (cleanParam === 'testimonials') return 'stories';
  if (cleanParam === 'services') return 'categories';

  return 'home';
}

/**
 * Reads current location from window URL (?city=...&page=... or /cities/:city/:page)
 */
export function getRouteParamsFromWindow(): { city: ServiceableCity; page: NavigationPage } {
  if (typeof window === 'undefined') {
    return { city: 'Gurgaon', page: 'home' };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const cityParam = searchParams.get('city') || searchParams.get('location');
  const pageParam = searchParams.get('page') || searchParams.get('view');

  // Also check path segments e.g. /city/noida/categories
  const pathname = window.location.pathname.replace(/^\/+/, '').split('/');
  let pathCity: string | undefined;
  let pathPage: string | undefined;

  if (pathname[0] === 'city' || pathname[0] === 'location') {
    pathCity = pathname[1];
    pathPage = pathname[2];
  }

  const city = parseCityFromParam(cityParam || pathCity);
  const page = parsePageFromParam(pageParam || pathPage);

  return { city, page };
}

/**
 * Syncs the browser URL and history without causing page reload
 */
export function updateRouteInWindow(city: ServiceableCity, page: NavigationPage): void {
  if (typeof window === 'undefined') return;

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('city', city);

  if (page === 'home') {
    currentUrl.searchParams.delete('page');
  } else {
    currentUrl.searchParams.set('page', page);
  }

  window.history.replaceState({ city, page }, '', currentUrl.toString());
}

/**
 * Applies route-specific SEO tags (Title, Meta Description, canonical URL)
 * and dynamically injects comprehensive Schema.org JSON-LD structured data into document.head
 */
export function applyRouteSeoAndSchema(page: NavigationPage, city: ServiceableCity): SeoPageData {
  const data = generateSeoPageData(page, city);

  if (typeof document === 'undefined') return data;

  // 1. Dynamic Page Title
  document.title = data.title;

  // 2. Dynamic Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', data.metaDescription);

  // 3. OpenGraph Tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', data.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', data.metaDescription);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', `https://pentagram.expert/?city=${encodeURIComponent(city)}&page=${page}`);

  // 4. Geo Meta Tags for Regional Local Search
  let geoRegion = document.querySelector('meta[name="geo.region"]');
  if (!geoRegion) {
    geoRegion = document.createElement('meta');
    geoRegion.setAttribute('name', 'geo.region');
    document.head.appendChild(geoRegion);
  }
  geoRegion.setAttribute('content', 'IN-DL');

  let geoPlacename = document.querySelector('meta[name="geo.placename"]');
  if (!geoPlacename) {
    geoPlacename = document.createElement('meta');
    geoPlacename.setAttribute('name', 'geo.placename');
    document.head.appendChild(geoPlacename);
  }
  geoPlacename.setAttribute('content', `${city}, Delhi NCR`);

  // 5. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute(
    'href',
    `https://pentagram.expert/?city=${encodeURIComponent(city)}${page === 'home' ? '' : `&page=${page}`}`
  );

  // 6. Dynamic JSON-LD Schema Script Tag
  const SCRIPT_ID = 'pentagram-route-schema';
  let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = SCRIPT_ID;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(data.schema, null, 2);

  return data;
}
