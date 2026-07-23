import citiesData from '../data/cities.json';
import servicesData from '../data/services.json';

// Distance calculation using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 1. Get Nearest Cities
export function getRelatedCities(currentCitySlug: string, count: number = 5) {
  const currentCity = citiesData.find(c => c.slug === currentCitySlug);
  if (!currentCity) return [];
  
  const currentLat = parseFloat(currentCity.coordinates.lat);
  const currentLng = parseFloat(currentCity.coordinates.lng);

  return citiesData
    .filter(c => c.slug !== currentCitySlug)
    .map(c => {
      const dist = calculateDistance(currentLat, currentLng, parseFloat(c.coordinates.lat), parseFloat(c.coordinates.lng));
      return { ...c, distance: dist };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}

// 2. Get Complementary Services
export function getRelatedServices(currentServiceSlug: string) {
  return servicesData.filter(s => s.slug !== currentServiceSlug);
}

// 3. Get Top Industries for City
export function getRelatedIndustries(citySlug: string): string[] {
  const city = citiesData.find(c => c.slug === citySlug);
  return city ? city.top_industries : ["Retail", "Service", "Real Estate"];
}

// 4. Generate proper City Service URL
export function getCityServiceUrl(serviceSlug: string, citySlug: string): string {
  return `/${serviceSlug}-agency-${citySlug}/`;
}

// 5. Get Cities within 100km
export function getNearbyLinks(citySlug: string, count: number = 5) {
  const currentCity = citiesData.find(c => c.slug === citySlug);
  if (!currentCity) return [];
  
  const currentLat = parseFloat(currentCity.coordinates.lat);
  const currentLng = parseFloat(currentCity.coordinates.lng);

  return citiesData
    .filter(c => c.slug !== citySlug)
    .map(c => {
      const dist = calculateDistance(currentLat, currentLng, parseFloat(c.coordinates.lat), parseFloat(c.coordinates.lng));
      return { ...c, distance: dist };
    })
    .filter(c => c.distance <= 100) // Within 100km limit
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}
