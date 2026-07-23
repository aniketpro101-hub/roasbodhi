/**
 * Complete Structured JSON-LD Schema Markup System
 */

export interface CityType {
  name: string;
  slug: string;
  state: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  tier?: number;
}

export interface ServiceType {
  id: string;
  name: string;
  short_name: string;
  description: string;
  slug: string;
}

export interface PostType {
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
    updateDate?: Date;
    author: string;
    image: string;
    imageAlt: string;
  };
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  author: string;
  text: string;
  rating?: number;
}

const siteUrl = 'https://roasbodhi.in';

// 1. Organization Schema
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RoasBodhi",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.svg`,
    "description": "Premium performance marketing and website design agency delivering high ROAS for Indian SMB models.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Navi Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-90825-43992",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://facebook.com/roasbodhi",
      "https://instagram.com/roasbodhi",
      "https://linkedin.com/company/roasbodhi"
    ]
  };
}

// 2. LocalBusiness Schema
export function localBusinessSchema(city: CityType) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `RoasBodhi™ ${city.name}`,
    "image": `${siteUrl}/images/roasbodhi-og.jpg`,
    "url": `${siteUrl}/locations/${city.slug}/`,
    "telephone": "+919082543992",
    "priceRange": "₹7999 - ₹89999",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.state,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": parseFloat(city.coordinates.lat),
      "longitude": parseFloat(city.coordinates.lng)
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": city.name
    }
  };
}

// 3. Service Schema
export function serviceSchema(service: ServiceType, city?: CityType) {
  const targetArea = city ? city.name : "India";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} in ${targetArea}`,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": `RoasBodhi™ ${targetArea}`
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": targetArea
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "7999"
    }
  };
}

// 4. Article Schema
export function articleSchema(post: PostType) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.data.title,
    "description": post.data.description,
    "image": post.data.image.startsWith('http') ? post.data.image : `${siteUrl}${post.data.image}`,
    "datePublished": post.data.publishDate.toISOString(),
    "dateModified": post.data.updateDate ? post.data.updateDate.toISOString() : post.data.publishDate.toISOString(),
    "author": {
      "@type": "Person",
      "name": post.data.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "RoasBodhi",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/favicon.svg`
      }
    },
    "mainEntityOfPage": `${siteUrl}/blog/${post.slug}/`
  };
}

// 5. Breadcrumb Schema
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href.startsWith('http') ? item.href : `${siteUrl}${item.href}`
    }))
  };
}

// 6. FAQ Schema
export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '') // Strip HTML tags
      }
    }))
  };
}

// 7. WebSite Schema
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RoasBodhi",
    "url": siteUrl
  };
}

// 8. Review Schema
export function reviewSchema(testimonials: TestimonialItem[]) {
  const ratings = testimonials.filter(t => t && t.rating);
  if (ratings.length === 0) return null;
  
  const avgRating = (ratings.reduce((acc, t) => acc + (t.rating || 5), 0) / ratings.length).toFixed(1);
    
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "RoasBodhi Digital Marketing Services",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "reviewCount": ratings.length
    }
  };
}

// Backwards compatibility wrappers
export function generateLocalBusinessSchema(city: CityType, service?: ServiceType) {
  return localBusinessSchema(city);
}

export function generateServiceSchema(service: ServiceType, city: CityType) {
  return serviceSchema(service, city);
}

export function generateFAQSchema(faqs: FaqItem[]) {
  return faqSchema(faqs);
}

export function generateOrganizationSchema() {
  return organizationSchema();
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return breadcrumbSchema(items);
}
