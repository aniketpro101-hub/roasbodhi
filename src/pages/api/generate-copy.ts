import type { APIRoute } from 'astro';
import { getFallbackTemplateData } from '../../utils/templates';

export const prerender = false; // Enable server-side handling

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { businessName, location, description, industry, phone, whatsapp } = body;

    if (!businessName) {
      return new Response(
        JSON.stringify({ error: 'Business name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    // If no API key is provided, return high-quality localized template data
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      const templateData = getFallbackTemplateData(
        businessName,
        location,
        industry,
        description,
        phone,
        whatsapp
      );
      return new Response(JSON.stringify(templateData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare Master Creative Director Prompt for Gemini API
    const prompt = `
You are a world-class Brand Strategist, Copywriter and UX Director who has built websites for premium brands like Zomato, Nykaa, Urban Company and 1000+ successful Indian local businesses.

BUSINESS BRIEF:
Business Name: ${businessName}
City: ${location || 'India'}
Industry: ${industry || 'general'}
Description: ${description || 'A trusted business'}
Phone: ${phone || ''}
WhatsApp: ${whatsapp || phone || ''}

RULES:
- NEVER use generic phrases like "Quality Service" or "Best in Class"
- ALWAYS mention ${location || 'the city'} at least 3 times naturally
- Make testimonial names sound authentically Indian
- Services must have REAL INR pricing (formatted with ₹)
- Return ONLY valid JSON with no markdown code blocks or explanations outside JSON.

RETURN EXACT JSON STRUCTURE:
{
  "brand": {
    "tagline": "5-7 word powerful tagline for ${businessName}",
    "subTagline": "20-25 word emotional hook that speaks to ${location || 'local'} customers",
    "promise": "One bold brand promise sentence",
    "founderStory": "3-4 line authentic brand story mentioning ${location || 'local'} roots",
    "uniqueAngle": "What makes THIS business different from competitors in ${location || 'the city'}"
  },
  "hero": {
    "headline": "POWERFUL 4-6 word headline (bold impact words)",
    "subHeadline": "Supporting line with ${location || 'local'} specificity",
    "ctaPrimary": "Book Now on WhatsApp",
    "ctaSecondary": "Call ${phone || 'Us'}",
    "heroStat1": { "number": "10k+", "label": "Happy Customers" },
    "heroStat2": { "number": "4.9★", "label": "Google Rating" },
    "heroStat3": { "number": "100%", "label": "Satisfaction" },
    "trustBadge": "Trusted by 500+ ${location || 'local'} families"
  },
  "services": [
    {
      "name": "Signature Service 1",
      "icon": "🔥",
      "tagline": "4-word punchy tagline",
      "description": "2-sentence benefit-focused description",
      "price": "₹299",
      "priceNote": "onwards",
      "badge": "Most Popular",
      "duration": "30 mins",
      "includes": ["Handcrafted care", "Instant booking", "100% satisfaction"]
    },
    {
      "name": "Signature Service 2",
      "icon": "⚡",
      "tagline": "4-word punchy tagline",
      "description": "2-sentence benefit-focused description",
      "price": "₹499",
      "priceNote": "onwards",
      "badge": "Best Value",
      "duration": "45 mins",
      "includes": ["Premium quality", "Certified experts", "Quick service"]
    },
    {
      "name": "Signature Service 3",
      "icon": "✨",
      "tagline": "4-word punchy tagline",
      "description": "2-sentence benefit-focused description",
      "price": "₹799",
      "priceNote": "onwards",
      "badge": "Exclusive",
      "duration": "60 mins",
      "includes": ["VIP treatment", "Full guarantee", "Free consultation"]
    }
  ],
  "whyUs": {
    "heading": "Why ${location || 'Our City'} Chooses Us",
    "points": [
      { "icon": "🏆", "title": "Verified Excellence", "desc": "Top-rated professionals with proven track record" },
      { "icon": "⚡", "title": "Express Service", "desc": "Fast turnaround with zero compromise on quality" },
      { "icon": "🛡️", "title": "100% Safe & Sterile", "desc": "Strict sanitization and safety protocols" },
      { "icon": "💰", "title": "Transparent Pricing", "desc": "Clear upfront pricing with zero hidden fees" }
    ]
  },
  "testimonials": [
    {
      "name": "Priya Sharma",
      "location": "${location || 'Local Area'}",
      "review": "Absolutely loved the experience at ${businessName}! Highly recommended for anyone in ${location || 'the city'}.",
      "rating": 5,
      "avatar": "P",
      "verified": true,
      "tag": "Google Review"
    },
    {
      "name": "Rahul Verma",
      "location": "${location || 'Local Area'}",
      "review": "Best service in town. Professional, hygienic, and very polite team.",
      "rating": 5,
      "avatar": "R",
      "verified": true,
      "tag": "WhatsApp Review"
    },
    {
      "name": "Sneha Gupta",
      "location": "${location || 'Local Area'}",
      "review": "Super smooth process and incredible quality. Will definitely visit again!",
      "rating": 5,
      "avatar": "S",
      "verified": true,
      "tag": "Verified Client"
    }
  ],
  "faq": [
    { "q": "What are your working hours?", "a": "We are open 7 days a week from 9:00 AM to 10:00 PM." },
    { "q": "How can I book or order?", "a": "Click the WhatsApp button on this page for instant confirmation within 2 minutes." },
    { "q": "What payment options do you accept?", "a": "We accept UPI (GPay/PhonePe/Paytm), cards, and cash." }
  ],
  "offer": {
    "headline": "🎉 SPECIAL LOCAL OFFER: GET 20% OFF",
    "description": "Claim 20% discount on your first visit or booking today!",
    "discount": "20%",
    "expiry": "Ends This Sunday",
    "ctaText": "Claim Offer on WhatsApp"
  }
}
`;

    // Try calling Gemini API models (Gemini 2.5 Flash is verified active for this key)
    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
    let geminiResult = null;

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2000
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            // Clean markdown blocks if returned
            const jsonStr = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            geminiResult = JSON.parse(jsonStr);
            break;
          }
        }
      } catch (err) {
        console.warn(`Failed with model ${model}, trying next fallback...`);
      }
    }

    if (geminiResult) {
      const finalData = {
        businessName,
        location: location || 'Your City',
        industry: industry || 'general',
        slogan: geminiResult.hero?.headline || geminiResult.brand?.tagline || `Top Rated in ${location}`,
        subSlogan: geminiResult.hero?.subHeadline || geminiResult.brand?.subTagline || `Experience the best quality in ${location}`,
        about: geminiResult.brand?.founderStory || `Welcome to ${businessName}, ${location}'s preferred choice for quality service.`,
        badgeText: geminiResult.hero?.trustBadge || '⭐ Rated #1 Local Spot',
        offerText: geminiResult.offer?.headline || '🎉 Special Offer: Get 20% Off!',
        offerSubtext: geminiResult.offer?.description || 'Claim your discount today via WhatsApp.',
        brand: geminiResult.brand,
        hero: geminiResult.hero,
        whyUs: geminiResult.whyUs,
        services: geminiResult.services?.map((s: any) => ({
          title: s.name || s.title,
          description: s.description,
          price: s.price,
          tagline: s.tagline,
          badge: s.badge,
          includes: s.includes,
          duration: s.duration,
          priceNote: s.priceNote
        })) || [],
        testimonials: geminiResult.testimonials || [],
        faqs: geminiResult.faq || geminiResult.faqs || [],
        gallerySearchQuery: industry || 'business',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'gemini'
      };

      return new Response(JSON.stringify(finalData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fallback to template if Gemini API fails
    const fallbackData = getFallbackTemplateData(
      businessName,
      location,
      industry,
      description,
      phone,
      whatsapp
    );

    return new Response(JSON.stringify(fallbackData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in generate-copy API:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
