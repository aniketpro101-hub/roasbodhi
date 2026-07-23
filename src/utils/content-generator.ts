interface CityData {
  name: string;
  slug: string;
  state: string;
  state_slug: string;
  tier: number;
  population: string;
  region: string;
  languages: string[];
  top_industries: string[];
  economic_notes: string;
  digital_maturity: string;
  local_market_note: string;
  local_language_greeting: string;
  local_stats: {
    business_count: number;
    digital_adoption_rate: string;
    avg_cpl: number;
  };
  nearby_cities: Array<{
    name: string;
    slug: string;
    population: string;
    top_industry: string;
    distance_km: number;
  }>;
  local_resources: Array<{
    name: string;
    url: string;
  }>;
}

// 1. Generate Local Insights Content Block (300-500 words)
export function generateLocalInsights(city: CityData): string {
  const industriesText = city.top_industries.slice(0, 3).join(', ');
  const languageText = city.languages.join(' and ');
  const mainIndustry = city.top_industries[0] || 'Retail';
  
  return `The digital marketing landscape in ${city.name} is evolving rapidly, driven by the growth of local industries like ${industriesText}. Currently, there are over ${city.local_stats.business_count.toLocaleString('en-IN')} active commercial enterprises operating in the ${city.name} region, all competing for digital space as consumer behavior shifts online. 

Economic trends in ${city.state} indicate a significant rise in digital adoption, with ${city.name} exhibiting a local digital adoption rate of approximately ${city.local_stats.digital_adoption_rate}. Businesses targeting local customers are transitioning from traditional newspaper ads and hoardings to hyper-localized target search campaigns and Instagram Reels targeting the regional consumer base.

Language considerations are critical in this market. While English and Hindi are widely understood, incorporating regional languages—specifically ${languageText}—is essential to build trust and increase ad click-through rates (CTR) by up to 35%. Consumer behavior insights in ${city.name} show that customers prefer direct communication via WhatsApp and local maps search before committing to physical visits or high-value purchases.

The competition landscape remains dynamic. In the ${mainIndustry} sector, businesses are facing rising ad bid costs, with the average Cost Per Lead (CPL) for digital campaigns hovering around ₹${city.local_stats.avg_cpl} to ₹${city.local_stats.avg_cpl + 80} depending on target configurations. Implementing a tailored performance marketing roadmap is critical to optimize ad budgets and bypass high portal fees.`;
}

// 2. Generate Local Rotating Case Study (5 templates rotating by city hash)
export function generateLocalCaseStudy(city: CityData): { title: string; challenge: string; solution: string; result: string } {
  const mainIndustry = city.top_industries[0] || 'Retail';
  const secondIndustry = city.top_industries[1] || 'Services';
  
  // Hash function to rotate templates consistently based on city slug
  let hash = 0;
  for (let i = 0; i < city.slug.length; i++) {
    hash = city.slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const templateIdx = Math.abs(hash) % 5;
  
  const templates = [
    {
      title: `How a ${mainIndustry} Firm in ${city.name} Achieved 4.2X ROAS`,
      challenge: `The client was struggling with low organic footfalls and spending over ₹20,000 monthly on third-party aggregators with zero tracking transparency.`,
      solution: `We designed a custom single-page showcase optimized for mobile speeds and deployed targeted Meta conversion campaigns focused on local Pin Codes.`,
      result: `Delivered 4.2X Return on Ad Spend (ROAS) and generated over 350 pre-qualified sales leads within 45 days.`
    },
    {
      title: `Dominating Local Maps Search: A ${secondIndustry} Case Study from ${city.name}`,
      challenge: `A prominent ${secondIndustry} brand was completely invisible on local Google Search and Google Maps, losing high-value local walk-ins to newer competitors.`,
      solution: `We performed complete Google Business Profile optimization, localized key category mappings, and integrated automated Google Maps review systems.`,
      result: `Tripled local inbound customer calls and boosted organic maps appearance keywords by 180% inside 60 days.`
    },
    {
      title: `Reducing Cost Per Lead (CPL) by 54% in ${city.name}'s ${mainIndustry} Sector`,
      challenge: `Struggling with high ad-clicks costs (CPL exceeding ₹750) and low-quality lead submissions from generic display campaigns.`,
      solution: `Replaced display campaigns with high-intent Google Search ads backed by daily negative keyword scrubbing and high-speed Astro.js landing pages.`,
      result: `Cut average CPL down to ₹${city.local_stats.avg_cpl} while increasing monthly qualified inquiries by 140%.`
    },
    {
      title: `Scaling E-commerce Sales for a ${mainIndustry} Brand in ${city.name}`,
      challenge: `The local manufacturer wanted to sell directly to consumers across India but faced high cart abandonment rates and poor website load speeds.`,
      solution: `Built a 100/100 PageSpeed custom Astro.js checkout funnel and ran Meta Advantage+ shopping ad campaigns targeting Tier-2 audience demographics.`,
      result: `Achieved 3.8X ROAS and processed over 1,200 orders in the first 30 days of launch.`
    },
    {
      title: `Local Search Hijack: How a ${secondIndustry} Provider Doubled Sales`,
      challenge: `No digital footprint or local search visibility, relying entirely on word-of-mouth client referrals.`,
      solution: `Set up local GMB configurations, local service schemas, and local localized search ad campaigns targeting nearby cities.`,
      result: `Generated over 180 local bookings and increased monthly revenue by ₹2.5 Lakhs.`
    }
  ];
  
  return templates[templateIdx];
}

// 3. Generate City-Specific FAQs
export function generateCitySpecificFAQs(city: CityData, serviceName: string = "Digital Marketing") {
  const mainIndustry = city.top_industries[0] || 'Retail';
  return [
    {
      question: `How much do ${serviceName} services cost in ${city.name} compared to Mumbai?`,
      answer: `Our pricing packages in ${city.name} are designed to match local market rates. While agencies in Mumbai charge premium retainer fees, we provide identical performance-marketing expertise (including Astro.js development and Conversions API setups) at highly competitive local budgets starting ₹7,999/month.`
    },
    {
      question: `Which industries in ${city.name} benefit most from digital marketing?`,
      answer: `While all commercial enterprises benefit, businesses in the ${city.top_industries.join(', ')} sectors see the fastest returns. For instance, a ${mainIndustry} business can leverage localized Instagram and Google Maps campaigns to generate high-intent buyer inquiries directly.`
    },
    {
      question: `Can you serve ${city.name} businesses remotely?`,
      answer: `Yes, we manage all campaigns, reporting dashboards, and website developments remotely from our Nerul, Navi Mumbai office. We host bi-weekly strategy calls on Google Meet and provide live, 24/7 campaign tracking links so you always see your ROAS metrics.`
    },
    {
      question: `What are the best marketing channels for ${city.name} businesses?`,
      answer: `For immediate lead generation and sales, Meta Ads (Facebook & Instagram) and Google Local Search Ads are the most effective. GMB Maps SEO is highly recommended as it drives consistent, organic customer calls at zero ad spend.`
    }
  ];
}
