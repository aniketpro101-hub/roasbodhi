/**
 * SEO & Meta Generation Utility Functions
 */

interface TitleOptions {
  primary: string;
  secondary?: string;
  brand?: string;
  maxLength?: number;
}

interface MetaOptions {
  service: string;
  city?: string;
  benefit: string;
  cta?: string;
}

const siteUrl = 'https://roasbodhi.in';

// 1. Title Generator with smart truncation
export function titleGenerator({ primary, secondary, brand = "RoasBodhi", maxLength = 60 }: TitleOptions): string {
  let title = primary;
  
  if (secondary) {
    title += ` | ${secondary}`;
  }
  
  title += ` - ${brand}`;
  
  if (title.length <= maxLength) {
    return title;
  }
  
  // Truncate fallback
  const firstFallback = `${primary} - ${brand}`;
  if (firstFallback.length <= maxLength) {
    return firstFallback;
  }
  
  return primary.substring(0, maxLength - 3) + '...';
}

// 2. Meta Description Generator with High CTR Formula
export function metaDescriptionGenerator({ service, city, benefit, cta = "Get Free Audit!" }: MetaOptions): string {
  const targetLocation = city ? ` in ${city}` : " in India";
  const desc = `${service}${targetLocation}. ${benefit} Claim your free consultation report today. ${cta}`;
  
  if (desc.length <= 160) {
    return desc;
  }
  
  return desc.substring(0, 157) + '...';
}

// 3. Canonical URL Normalizer
export function canonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const trailingSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  
  if (trailingSlash === '//') {
    return `${siteUrl}/`;
  }
  return `${siteUrl}${trailingSlash}`;
}

// 4. Dynamic OG Image URL (Cloudflare Image Resizing / Custom OG template)
export function ogImageUrl(title: string): string {
  const cleanTitle = encodeURIComponent(title);
  return `${siteUrl}/cdn-cgi/image/width=1200,height=630,quality=85/images/roasbodhi-og.jpg?title=${cleanTitle}`;
}

// 5. Reading Time Calculator
export function readingTime(content: string): number {
  const wordsPerMinute = 225; // Average reading speed
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
  const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length;
  
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes > 0 ? minutes : 1;
}

// Keep older dynamic programmatic SEO helpers for backward compatibility
export function generateCityServiceTitle(service: string, city: string, state: string): string {
  return titleGenerator({ primary: `${service} Agency in ${city}`, secondary: `${service} Expert ${city}` });
}

export function generateCityServiceMeta(serviceId: string, city: string, state: string, industries: string[]): string {
  const industryText = industries && industries.length > 0 ? industries.slice(0, 2).join(' or ') : 'local businesses';
  return metaDescriptionGenerator({
    service: `${serviceId.replace('-', ' ')} agency`,
    city: city,
    benefit: `We build your funnels targeting ${industryText} sectors with 3.8X ROAS benchmarks.`
  });
}

export function generateCityServiceH1(serviceName: string, city: string): string {
  return `Best ${serviceName} Agency in ${city}`;
}
