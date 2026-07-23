import json
import os

# Ensure the output directory exists
data_dir = 'src/data'
os.makedirs(data_dir, exist_ok=True)


# ==========================================
# 2A: CITIES DATABASE LOADING (184 REAL CITIES)
# ==========================================

# Load the curated cities list from cities.json
with open(os.path.join(data_dir, 'cities.json'), 'r', encoding='utf-8') as f:
    cities_database = json.load(f)
# Enrich cities_database with pSEO unique metrics
import math

def get_distance(c1, c2):
    try:
        lat1, lng1 = float(c1["coordinates"]["lat"]), float(c1["coordinates"]["lng"])
        lat2, lng2 = float(c2["coordinates"]["lat"]), float(c2["coordinates"]["lng"])
        return math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2)
    except:
        return 999.0

# Greeting mapping
greeting_map = {
    "maharashtra": "नमस्कार! तुमच्या व्यवसायाच्या डिजिटल विकासासाठी आम्ही येथे आहोत.",
    "karnataka": "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ವ್ಯವಹಾರದ ಡಿಜಿಟಲ್ ಬೆಳವಣಿಗೆಗೆ ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.",
    "tamil-nadu": "வணக்கம்! உங்கள் வணிக டிஜிட்டல் வளர்ச்சிக்கு நாங்கள் இங்கே இருக்கிறோம்.",
    "gujarat": "નમસ્તે! તમારા વ્યવસાયના ડિજિટલ વિકાસ માટે અમે અહીં છીએ.",
    "andhra-pradesh": "నమస్తే! మీ వ్యాపార డిజిటల్ అభివృద్ధి కోసం మేము ఇక్కడ ఉన్నాము.",
    "telangana": "నమస్తే! మీ వ్యాపార డిజిటల్ అభివృద్ధి కోసం మేము ఇక్కడ ఉన్నాము.",
    "west-bengal": "নমস্কার! আপনার ব্যবসায়ের ডিজিটাল উন্নতির জন্য আমরা এখানে আছি।",
    "punjab": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੇ ਡਿਜੀਟਲ ਵਿਕਾਸ ਲਈ ਅਸੀਂ ਇੱਥੇ ਹਾਂ।",
    "kerala": "നമസ്കാരം! നിങ്ങളുടെ ബിസിനസ്സിന്റെ ഡിജിറ്റൽ വളർച്ചയ്ക്കായി ഞങ്ങൾ ഇവിടെയുണ്ട്.",
    "odisha": "ନମସ୍କାର! ଆପଣଙ୍କ ବ୍ୟବସାୟର ଡିଜିଟାଲ୍ ବିକାଶ ପାଇଁ ଆମେ ଏଠାରେ ଅଛୁ।",
    "assam": "নমস্কাৰ! আপোনাৰ ব্যৱসায়ৰ ডিজিটেল উন্নয়নৰ বাবে আমি ইয়াত আছোঁ।"
}

for city in cities_database:
    # 1. Local language greeting
    st_slug = city.get("state_slug", "")
    lang_greeting = greeting_map.get(st_slug, "नमस्ते! आपके व्यवसाय के डिजिटल विकास के लिए हम यहाँ हैं।")
    city["local_language_greeting"] = lang_greeting
    
    # 2. Local stats
    pop_val = int(city["population"].replace(",", ""))
    tier = city["tier"]
    
    bus_count = pop_val // 150 if tier == 1 else (pop_val // 220 if tier == 2 else pop_val // 300)
    adoption_rate = "78%" if tier == 1 else ("52%" if tier == 2 else "34%")
    cpl_rate = 320 if tier == 1 else (240 if tier == 2 else 180)
    
    city["local_stats"] = {
        "business_count": bus_count,
        "digital_adoption_rate": adoption_rate,
        "avg_cpl": cpl_rate
    }
    
    # 3. Local resources (real verified portals)
    city["local_resources"] = [
        { "name": "Ministry of MSME Portal", "url": "https://msme.gov.in/" },
        { "name": "Startup India Hub", "url": "https://www.startupindia.gov.in/" },
        { "name": "GST Common Portal India", "url": "https://www.gst.gov.in/" }
    ]

# 4. Nearby cities array
for city in cities_database:
    # Sort other cities by distance
    sorted_others = sorted(
        [other for other in cities_database if other["slug"] != city["slug"]],
        key=lambda x: get_distance(city, x)
    )
    # Store top 5 nearby cities
    city["nearby_cities"] = []
    for other in sorted_others[:5]:
        city["nearby_cities"].append({
            "name": other["name"],
            "slug": other["slug"],
            "population": other["population"],
            "top_industry": other["top_industries"][0] if other["top_industries"] else "Retail",
            # Simple distance approximation in KM (1 degree is approx 111 km)
            "distance_km": int(get_distance(city, other) * 111)
        })

# Write cities.json
with open(os.path.join(data_dir, 'cities.json'), 'w', encoding='utf-8') as f:
    json.dump(cities_database, f, indent=2, ensure_ascii=False)

print(f"Generated and enriched cities.json with {len(cities_database)} entries.")


# ==========================================
# 2B: SERVICES DATABASE GENERATION (6 SERVICES)
# ==========================================

services_database = [
  {
    "id": "meta-ads",
    "name": "Meta Ads Management",
    "sanskrit_name": "Agni (अग्नि)",
    "sanskrit_plan_name": "Agni",
    "sanskrit_meaning": "Sacred Fire / Pure Drive",
    "slug": "meta-ads",
    "icon": "flame",
    "color": "#FF6B2B",
    "gradient": "from-primary-saffron to-primary-gold",
    "description": "Unleash high-converting Facebook, Instagram, and WhatsApp marketing campaigns tailored for local consumer markets. We build lead capture systems, design custom graphics and vertical video Reels, and write conversion-optimized copies that drive direct WhatsApp chats, store visits, and retail sales.",
    "short_description": "Convert social traffic into paying customers with optimized FB, Instagram & WhatsApp ad funnels.",
    "benefits": [
      "Target high-intent local customer groups based on exact city behaviors.",
      "Receive 10+ designer graphics and vertical video reels monthly.",
      "Conversions API & Pixel integration setup included to track leads.",
      "Daily campaign budget monitoring and continuous bid optimizations."
    ],
    "process_steps": [
      {"step": 1, "title": "Audit & Pixel Setup", "desc": "Configure Meta Conversions API to bypass iOS ad blocks."},
      {"step": 2, "title": "Creative Design", "desc": "Write localized copies and compile visual product images/reels."},
      {"step": 3, "title": "Launch & Target", "desc": "Deploy custom target lookalike profiles in specified cities."},
      {"step": 4, "title": "Scaling & Optimization", "desc": "Scale budgets once campaigns hit a stable 3X+ ROAS target."}
    ],
    "platforms": ["Facebook", "Instagram", "WhatsApp Business"],
    "ideal_for": ["Real Estate", "Clinics", "Jewellery Shops", "Gyms", "Local Retailers"],
    "plans": ["jyoti", "agni", "pralaya"],
    "starting_price": "₹7,999",
    "faqs": [
      {
        "question": "What is the starting budget for Meta Ads in {city}?",
        "answer": "We recommend starting with a daily budget of ₹500 to ₹1,000 for your Meta campaigns in {city}. This allows the Meta algorithm to collect enough conversions data to optimize bidding."
      },
      {
        "question": "Do you design the ad graphics and videos?",
        "answer": "Yes, all our plans include full ad creative services: high-converting copies, professional graphic cards, and video edits for Instagram Reels."
      }
    ]
  },
  {
    "id": "google-ads",
    "name": "Google Ads Management",
    "sanskrit_name": "Chakra (चक्र)",
    "sanskrit_plan_name": "Chakra",
    "sanskrit_meaning": "Cycle / Wheel of Growth",
    "slug": "google-ads",
    "icon": "target",
    "color": "#0EA5E9",
    "gradient": "from-secondary-blue to-primary-indigo",
    "description": "Capture customers at the exact moment they search for your products or services. Our Google Search and Performance Max campaigns target high-intent local keywords in your city, filtering out useless clicks to save your ad budget.",
    "short_description": "Intercept high-intent buyers with search ads, local map keywords, and display campaigns.",
    "benefits": [
      "Rank #1 on Google for high-commercial local search terms.",
      "Continuous negative keyword scrubbing to eliminate waste clicks.",
      "Optimized Google Search and Performance Max setup.",
      "Dynamic conversion tracking for call button clicks and map directions."
    ],
    "process_steps": [
      {"step": 1, "title": "Keyword Extraction", "desc": "Extract localized search volume terms for your specific services."},
      {"step": 2, "title": "Landing Page Review", "desc": "Optimize the lead form landing page to improve Google Quality Score."},
      {"step": 3, "title": "Search Ad Copywriting", "desc": "Write clear headings, callouts, and location extensions."},
      {"step": 4, "title": "Daily Bidding Optimization", "desc": "Optimize target cost-per-acquisition (tCPA) values."}
    ],
    "platforms": ["Google Search", "YouTube", "Google Maps", "Google Display"],
    "ideal_for": ["Dental Clinics", "Chartered Accountants", "B2B Manufacturers", "Packers & Movers"],
    "plans": ["disha", "chakra", "vajra"],
    "starting_price": "₹9,999",
    "faqs": [
      {
        "question": "How do you prevent wasted ad budget in {city}?",
        "answer": "We maintain a robust negative keyword list and configure tight location targeting in {city}. This ensures your ads are only shown to users physically searching within your delivery radius."
      }
    ]
  },
  {
    "id": "web-development",
    "name": "High-Speed Website Development",
    "sanskrit_name": "Vriddhi (वृद्धि)",
    "sanskrit_plan_name": "Vriddhi",
    "sanskrit_meaning": "Growth / Prosperity",
    "slug": "web-development",
    "icon": "code",
    "color": "#7C3AED",
    "gradient": "from-secondary-purple to-primary-saffron",
    "description": "Get a world-class, lightning-fast business website built on Astro.js + Tailwind CSS. We guarantee a 100/100 Google PageSpeed score. Best of all: we use our Pay-After-Seeing model. You pay only after you approve the design.",
    "short_description": "Ultra-fast, mobile-responsive websites built using Astro.js with a Pay-After-Seeing guarantee.",
    "benefits": [
      "100/100 PageSpeed scores for instant mobile loads.",
      "Pay-After-Seeing model: Zero risk, review preview before paying.",
      "On-page local SEO structures for city rankings.",
      "Clean call-to-action buttons optimized for WhatsApp chat generation."
    ],
    "process_steps": [
      {"step": 1, "title": "Layout Blueprinting", "desc": "Discuss target objectives and draft structure."},
      {"step": 2, "title": "Preview Build", "desc": "Develop the complete preview website on a staging link."},
      {"step": 3, "title": "Client Approval", "desc": "Show preview to client. Approve and release payment."},
      {"step": 4, "title": "Live Deployment", "desc": "Register .in domain, activate SSL, and push site live."}
    ],
    "platforms": ["Cloudflare Pages", "GitHub", "Astro.js Static SSG"],
    "ideal_for": ["Local SMBs", "Service Providers", "E-commerce Brands", "Corporate Portals"],
    "plans": ["ankur", "vriddhi", "siddhi"],
    "starting_price": "₹7,999",
    "faqs": [
      {
        "question": "Do I have to pay anything upfront for web design in {city}?",
        "answer": "No. Under our Pay-After-Seeing guarantee, we build the complete website preview first. You only transfer the package price when you approve the design and we are ready to deploy it to your live domain in {city}."
      }
    ]
  },
  {
    "id": "google-my-business",
    "name": "Google My Business & Map SEO",
    "sanskrit_name": "Sthapna (स्थापना)",
    "sanskrit_plan_name": "Sthapna",
    "sanskrit_meaning": "Foundation / Establishment",
    "slug": "google-my-business",
    "icon": "map-pin",
    "color": "#059669",
    "gradient": "from-secondary-emerald to-secondary-blue",
    "description": "Dominating local search results on Google Maps is the fastest way to get local walk-ins and phone calls. We optimize your GMB profile with geotagged images, local keyword citations, directory listings, and review acquisition strategies.",
    "short_description": "Dominate local maps search to drive phone calls and physical store walk-ins.",
    "benefits": [
      "Rank in the Google Maps Local 3-Pack.",
      "Monthly uploads of 15+ geotagged store photos.",
      "Clean up consistent Name, Address, Phone (NAP) citations.",
      "Automated WhatsApp review generation template setups."
    ],
    "process_steps": [
      {"step": 1, "title": "Profile Verification", "desc": "Claim ownership and verify your local business listing."},
      {"step": 2, "title": "Keyword Insertion", "desc": "Add target service categories and optimized local descriptions."},
      {"step": 3, "title": "Local Citation Build", "desc": "Submit details to 40+ local business directories."},
      {"step": 4, "title": "Review Scaling", "desc": "Deploy review capture links for clients to rank higher."}
    ],
    "platforms": ["Google Maps", "Google Local Pack", "Local Directories"],
    "ideal_for": ["Clinics", "Showrooms", "Spa & Salons", "Professional Offices"],
    "plans": ["sthapna", "unnati", "samrajya"],
    "starting_price": "₹4,999",
    "faqs": [
      {
        "question": "How long does GMB optimization take to show results in {city}?",
        "answer": "Most local business profiles in {city} show an increase in phone calls and map direction queries within 30 to 45 days of starting GMB citation and geotagging updates."
      }
    ]
  },
  {
    "id": "performance-marketing",
    "name": "Performance Marketing Package",
    "sanskrit_name": "Shakti (शक्ति)",
    "sanskrit_plan_name": "Shakti",
    "sanskrit_meaning": "Power / Strength / Complete Force",
    "slug": "performance-marketing",
    "icon": "trending-up",
    "color": "#7C3AED",
    "gradient": "from-primary-indigo to-secondary-purple",
    "description": "Combine the strength of social media advertisements and search marketing. This all-in-one package includes high-converting landing pages, Meta ads, Google Search ads, and local maps management designed to maximize your monthly revenues.",
    "short_description": "Omnichannel performance scaling using high-speed landing pages, search, and social ads.",
    "benefits": [
      "Integrated ads management across Meta and Google.",
      "Includes a 1-page high-converting Astro landing page.",
      "Weekly live analytics dashboard to track marketing metrics.",
      "Dedicated account manager for strategy calls."
    ],
    "process_steps": [
      {"step": 1, "title": "Cross-Platform Planning", "desc": "Align branding and offer message across search and social channels."},
      {"step": 2, "title": "Landing Page Build", "desc": "Create a high-speed landing page with custom leads hooks."},
      {"step": 3, "title": "Ads Deployment", "desc": "Launch search capture and social retargeting setups simultaneously."},
      {"step": 4, "title": "ROAS Maximization", "desc": "Audit results weekly and reallocate budget to the highest converting channels."}
    ],
    "platforms": ["Meta Ads", "Google Ads", "Custom Landing Pages"],
    "ideal_for": ["E-commerce", "Hospitals", "Real Estate Builders", "Educational Institutions"],
    "plans": ["arambh", "shakti", "moksha"],
    "starting_price": "₹37,999",
    "faqs": [
      {
        "question": "What is the minimum contract period for performance ads in {city}?",
        "answer": "We work on a month-to-month basis with no lock-in. However, we recommend a 90-day window to fully test, optimize, and scale campaigns in {city} for maximum ROAS."
      }
    ]
  },
  {
    "id": "social-media-marketing",
    "name": "Social Media Marketing",
    "sanskrit_name": "Aseem (असीम)",
    "sanskrit_plan_name": "Aseem",
    "sanskrit_meaning": "Boundless / Limitless",
    "slug": "social-media-marketing",
    "icon": "instagram",
    "color": "#FF6B2B",
    "gradient": "from-primary-saffron to-secondary-purple",
    "description": "Build a stunning organic presence on Instagram and Facebook. We design grid layouts, edit viral Reels, write captions, and manage comments to build trust and authority for your brand locally.",
    "short_description": "Grow your local brand organically with premium grids, Reels, and interactive social posts.",
    "benefits": [
      "12+ premium graphic posts designed per month.",
      "4+ edited video Reels for Instagram organic algorithm.",
      "Custom highlights icons and bio optimization.",
      "Local community engagement and query responses."
    ],
    "process_steps": [
      {"step": 1, "title": "Theme Design", "desc": "Create a premium visual grid theme using your brand color palette."},
      {"step": 2, "title": "Content Calendar", "desc": "Prepare a 30-day posting plan with captions and local hashtags."},
      {"step": 3, "title": "Graphic & Video Build", "desc": "Design premium banners and edit vertical short videos."},
      {"step": 4, "title": "Publish & Interact", "desc": "Publish content and respond to comments/DMs to build trust."}
    ],
    "platforms": ["Instagram", "Facebook", "LinkedIn"],
    "ideal_for": ["Cafes & Hotels", "Architects", "Fashion Boutiques", "Personal Brands"],
    "plans": ["jyoti", "agni", "pralaya"],
    "starting_price": "₹7,999",
    "faqs": [
      {
        "question": "How often will you post on my social accounts in {city}?",
        "answer": "Our standard plans include 3-4 posts/Reels per week. This maintains a consistent organic brand presence in {city} without spamming your followers."
      }
    ]
  }
]

# Write services.json
with open(os.path.join(data_dir, 'services.json'), 'w', encoding='utf-8') as f:
    json.dump(services_database, f, indent=2, ensure_ascii=False)

print("Generated services.json successfully.")


# ==========================================
# 2C: PRICING DATABASE GENERATION
# ==========================================

pricing_database = {
  "web_design": {
    "plans": [
      {
        "id": "ankur",
        "name": "Ankur",
        "hindi": "अंकुर",
        "meaning": "Seedling / Sprout",
        "price": 7999,
        "period": "one-time",
        "popular": False,
        "description": "Perfect for new startups and freelancers needing a fast, professional digital presence.",
        "features": [
          {"name": "Responsive Pages", "value": "Up to 3 Pages", "included": True},
          {"name": "Layout Structure", "value": "Professional Template", "included": True},
          {"name": "PageSpeed Score", "value": "90+ PageSpeed Guaranteed", "included": True},
          {"name": "Lead Captures", "value": "WhatsApp & Contact Forms", "included": True},
          {"name": "Revisions Policy", "value": "5 Rounds Revisions", "included": True},
          {"name": "Free .in Domain", "value": "1 Year", "included": False},
          {"name": "On-Page SEO setup", "value": "All pages", "included": False}
        ],
        "cta": "Start Ankur Web Plan",
        "guarantee": "100% Pre-launch Refund"
      },
      {
        "id": "vriddhi",
        "name": "Vriddhi",
        "hindi": "वृद्धि",
        "meaning": "Growth / Prosperity",
        "price": 19999,
        "period": "one-time",
        "popular": True,
        "description": "Our most popular plan. Semi-custom website designed to rank locally and convert leads.",
        "features": [
          {"name": "Responsive Pages", "value": "Up to 7 Pages", "included": True},
          {"name": "Layout Structure", "value": "Semi-Custom Brand Design", "included": True},
          {"name": "PageSpeed Score", "value": "95+ PageSpeed Guaranteed", "included": True},
          {"name": "Lead Captures", "value": "WhatsApp + Advanced Forms", "included": True},
          {"name": "Revisions Policy", "value": "8 Rounds Revisions", "included": True},
          {"name": "Free .in Domain", "value": "Included 1 Year", "included": True},
          {"name": "On-Page SEO setup", "value": "Fully Optimized", "included": True}
        ],
        "cta": "Build Vriddhi Web Preview",
        "guarantee": "Pay After Seeing Preview"
      },
      {
        "id": "siddhi",
        "name": "Siddhi",
        "hindi": "सिद्धि",
        "meaning": "Mastery / Perfection",
        "price": 39999,
        "period": "one-time",
        "popular": False,
        "description": "Custom built enterprise or e-commerce website with advanced tracking integrations.",
        "features": [
          {"name": "Responsive Pages", "value": "Up to 15 Pages / Ecom store", "included": True},
          {"name": "Layout Structure", "value": "100% Custom Layout", "included": True},
          {"name": "PageSpeed Score", "value": "100/100 PageSpeed Guaranteed", "included": True},
          {"name": "Lead Captures", "value": "E-commerce checkout / multi-forms", "included": True},
          {"name": "Revisions Policy", "value": "12 Rounds Revisions", "included": True},
          {"name": "Free .in Domain", "value": "Included 1 Year", "included": True},
          {"name": "On-Page SEO setup", "value": "Local + Schema Markup", "included": True}
        ],
        "cta": "Custom Build Siddhi Plan",
        "guarantee": "Pay After Seeing Preview"
      }
    ]
  },
  "meta_ads": {
    "plans": [
      {
        "id": "jyoti",
        "name": "Jyoti",
        "hindi": "ज्योति",
        "meaning": "Light / Base",
        "price": 7999,
        "period": "month",
        "popular": False,
        "description": "Test your offers and creatives. Setup basic pixel tracking and start lead flow.",
        "features": [
          {"name": "Monthly Spend Limit", "value": "Up to ₹15,000", "included": True},
          {"name": "Ad Platforms", "value": "Facebook OR Instagram", "included": True},
          {"name": "Active Campaigns", "value": "1 Campaign", "included": True},
          {"name": "Visual Creatives", "value": "4 Graphics / month", "included": True},
          {"name": "Pixel Integration", "value": "Basic Pixel Setup", "included": True},
          {"name": "Conversions API Setup", "value": "Bypass iOS block", "included": False},
          {"name": "Reporting Frequency", "value": "Monthly PDF", "included": True}
        ],
        "cta": "Launch Jyoti Ads Plan",
        "guarantee": "Waived Setup Fee Offer"
      },
      {
        "id": "agni",
        "name": "Agni",
        "hindi": "अग्नि",
        "meaning": "Sacred Fire / Scale",
        "price": 17999,
        "period": "month",
        "popular": True,
        "description": "Complete performance campaign scaling. Includes custom copies, graphic ads, and reels.",
        "features": [
          {"name": "Monthly Spend Limit", "value": "Up to ₹50,000", "included": True},
          {"name": "Ad Platforms", "value": "Facebook + Instagram + WA", "included": True},
          {"name": "Active Campaigns", "value": "2-3 Campaigns", "included": True},
          {"name": "Visual Creatives", "value": "10 Graphics + 2 Reels / mo", "included": True},
          {"name": "Pixel Integration", "value": "Advanced Pixel Integration", "included": True},
          {"name": "Conversions API Setup", "value": "Enabled CAPI Setup", "included": True},
          {"name": "Reporting Frequency", "value": "Bi-Weekly + Call", "included": True}
        ],
        "cta": "Scale with Agni Ads Plan",
        "guarantee": "15-Day Cancellation Notice"
      },
      {
        "id": "pralaya",
        "name": "Pralaya",
        "hindi": "प्रलय",
        "meaning": "Cosmic Storm / Domination",
        "price": 29999,
        "period": "month",
        "popular": False,
        "description": "High budget scaling. Multi-level retargeting and complete custom landing page setups.",
        "features": [
          {"name": "Monthly Spend Limit", "value": "Up to ₹1,50,000", "included": True},
          {"name": "Ad Platforms", "value": "Omnichannel Meta Target", "included": True},
          {"name": "Active Campaigns", "value": "5+ Campaigns", "included": True},
          {"name": "Visual Creatives", "value": "20 Graphics + 5 Reels / mo", "included": True},
          {"name": "Pixel Integration", "value": "Enterprise Setup", "included": True},
          {"name": "Conversions API Setup", "value": "Full custom integrations", "included": True},
          {"name": "Reporting Frequency", "value": "Weekly Dashboard + 2 Calls", "included": True}
        ],
        "cta": "Dominate with Pralaya Ads",
        "guarantee": "Includes 1 Landing Page"
      }
    ]
  },
  "google_ads": {
    "plans": [
      {
        "id": "disha",
        "name": "Disha",
        "hindi": "दिशा",
        "meaning": "Direction / Guide",
        "price": 9999,
        "period": "month",
        "popular": False,
        "description": "Ideal for targeting specific, high-intent local search keywords.",
        "features": [
          {"name": "Monthly Spend Limit", "value": "Up to ₹20,000", "included": True},
          {"name": "Ad Channels", "value": "Google Search Only", "included": True},
          {"name": "Target Keywords", "value": "Up to 30 Keywords", "included": True},
          {"name": "Ad Groups Configured", "value": "2 Ad Groups", "included": True},
          {"name": "Conversion Tracking", "value": "Basic Setup", "included": True},
          {"name": "Negative Keywords", "value": "Monthly Review", "included": True}
        ],
        "cta": "Start Disha Google Ads",
        "guarantee": "No Set-up Fee Offer"
      },
      {
        "id": "chakra",
        "name": "Chakra",
        "hindi": "चक्र",
        "meaning": "Wheel of Growth",
        "price": 22999,
        "period": "month",
        "popular": True,
        "description": "Target clients across Search, Maps, and YouTube, supported by negative list scrubbing.",
        "features": [
          {"name": "Monthly Spend Limit", "value": "Up to ₹75,000", "included": True},
          {"name": "Ad Channels", "value": "Search + Display + Maps", "included": True},
          {"name": "Target Keywords", "value": "Up to 80 Keywords", "included": True},
          {"name": "Ad Groups Configured", "value": "5 Ad Groups", "included": True},
          {"name": "Conversion Tracking", "value": "Advanced Track", "included": True},
          {"name": "Negative Keywords", "value": "Bi-Weekly Scrubbing", "included": True}
        ],
        "cta": "Scale with Chakra Google Ads",
        "guarantee": "Includes 1 Landing Page"
      },
      {
        "id": "vajra",
        "name": "Vajra",
        "hindi": "वज्र",
        "meaning": "Thunderbolt / Invincible",
        "price": 39999,
        "period": "month",
        "popular": False,
        "description": "Complete performance dominance across Performance Max, Search, and Video Ads.",
        "features": [
          {"name": "Monthly Spend Limit", "value": "Up to ₹2,00,000", "included": True},
          {"name": "Ad Channels", "value": "PMax + Search + Display + YT", "included": True},
          {"name": "Target Keywords", "value": "150+ Keywords", "included": True},
          {"name": "Ad Groups Configured", "value": "10+ Ad Groups", "included": True},
          {"name": "Conversion Tracking", "value": "Call Tracking + Analytics", "included": True},
          {"name": "Negative Keywords", "value": "Weekly Optimization", "included": True}
        ],
        "cta": "Dominate with Vajra Google Ads",
        "guarantee": "Includes 2 Landing Pages"
      }
    ]
  },
  "gmb": {
    "plans": [
      {
        "id": "sthapna",
        "name": "Sthapna",
        "hindi": "स्थापना",
        "meaning": "Foundation / Setup",
        "price": 4999,
        "period": "one-time",
        "popular": False,
        "description": "Get verified, set up local category listings, and establish maps visibility.",
        "features": [
          {"name": "Profile Setup", "value": "Claim & Verify GMB", "included": True},
          {"name": "Category Alignment", "value": "Optimized Descriptions", "included": True},
          {"name": "Geotagged Uploads", "value": "10 Photos Uploaded", "included": True},
          {"name": "Local Directory Submissions", "value": "5 Listings", "included": True},
          {"name": "Review Generation Link", "value": "WhatsApp Link Setup", "included": True}
        ],
        "cta": "Claim GMB Setup",
        "guarantee": "100% Verification Support"
      },
      {
        "id": "unnati",
        "name": "Unnati",
        "hindi": "उन्नति",
        "meaning": "Progress / Growth",
        "price": 7999,
        "period": "month",
        "popular": True,
        "description": "Continuous ranking optimization, geotagged photo posts, and directory citations builds.",
        "features": [
          {"name": "Profile Setup", "value": "Ongoing Optimizations", "included": True},
          {"name": "Category Alignment", "value": "Keyword Audited", "included": True},
          {"name": "Geotagged Uploads", "value": "15 Photos / month", "included": True},
          {"name": "Local Directory Submissions", "value": "15 Listings / month", "included": True},
          {"name": "Review Generation Link", "value": "Automatic link followups", "included": True}
        ],
        "cta": "Start Unnati Map SEO",
        "guarantee": "Cancel Anytime Retainer"
      },
      {
        "id": "samrajya",
        "name": "Samrajya",
        "hindi": "साम્રાજ્ય",
        "meaning": "Empire / Domination",
        "price": 14999,
        "period": "month",
        "popular": False,
        "description": "Multi-location management and competitor spam report audits for local market dominance.",
        "features": [
          {"name": "Profile Setup", "value": "Up to 3 Map locations", "included": True},
          {"name": "Category Alignment", "value": "Advanced Map SEO", "included": True},
          {"name": "Geotagged Uploads", "value": "30 Photos / month", "included": True},
          {"name": "Local Directory Submissions", "value": "40 Listings / month", "included": True},
          {"name": "Review Generation Link", "value": "GMB review strategy setup", "included": True}
        ],
        "cta": "Dominate with Samrajya GMB",
        "guarantee": "Includes Competitor Audits"
      }
    ]
  },
  "bundles": {
    "plans": [
      {
        "id": "arambh",
        "name": "Arambh Combo",
        "hindi": "आरम्भ",
        "meaning": "Starting Kit",
        "price": 9999,
        "period": "one-time",
        "popular": False,
        "description": "The perfect digital launcher pack for local SMBs. Includes website and GMB setup.",
        "features": [
          {"name": "Web Design", "value": "Ankur Plan (3 Pages)", "included": True},
          {"name": "GMB Map SEO", "value": "Sthapna Plan (GMB Setup)", "included": True},
          {"name": "Free .in Domain", "value": "Included 1 Year", "included": True},
          {"name": "PageSpeed Load Score", "value": "90+ PageSpeed Score", "included": True},
          {"name": "Review Link Setup", "value": "Included", "included": True}
        ],
        "cta": "Launch Arambh Pack",
        "guarantee": "Anniversary Launch Offer"
      },
      {
        "id": "shakti",
        "name": "Shakti Growth Bundle",
        "hindi": "शक्ति",
        "meaning": "Power / Complete Execution",
        "price": 37999,
        "period": "month",
        "popular": True,
        "description": "Our premier growth kit. Combines 7-page custom website with monthly Meta ads and GMB SEO.",
        "features": [
          {"name": "Web Design", "value": "Vriddhi Plan (7 Pages)", "included": True},
          {"name": "Meta Ads scaling", "value": "Agni Plan (Up to ₹50k spend)", "included": True},
          {"name": "GMB Maps SEO", "value": "Unnati Plan (Monthly optimization)", "included": True},
          {"name": "Free .in Domain", "value": "Included 1 Year", "included": True},
          {"name": "Live Performance Reports", "value": "Bi-Weekly + Strategy Call", "included": True}
        ],
        "cta": "Scale with Shakti Bundle",
        "guarantee": "Save ₹7,998 every month"
      },
      {
        "id": "moksha",
        "name": "Moksha Market Domination",
        "hindi": "मोक्ष",
        "meaning": "Total Liberation",
        "price": 89999,
        "period": "month",
        "popular": False,
        "description": "Complete omnichannel execution. Includes custom E-commerce website, Google Search, Meta Ads, and GMB SEO.",
        "features": [
          {"name": "Web Design", "value": "Siddhi Plan (Custom E-com)", "included": True},
          {"name": "Meta Ads scaling", "value": "Pralaya Plan (Up to ₹1.5L spend)", "included": True},
          {"name": "Google Ads scaling", "value": "Vajra Plan (Up to ₹2L spend)", "included": True},
          {"name": "GMB Maps SEO", "value": "Samrajya Plan (Multi-locations)", "included": True},
          {"name": "Live Performance Reports", "value": "Weekly Dashboard + 2 Calls", "included": True}
        ],
        "cta": "Claim Moksha Domination",
        "guarantee": "Save ₹34,997 every month"
      }
    ]
  }
}

# Write pricing.json
with open(os.path.join(data_dir, 'pricing.json'), 'w', encoding='utf-8') as f:
    json.dump(pricing_database, f, indent=2, ensure_ascii=False)

print("Generated pricing.json successfully.")


# ==========================================
# 2D: INDUSTRIES DATABASE GENERATION (15 INDUSTRIES)
# ==========================================

industries_database = [
  {
    "id": "real-estate",
    "name": "Real Estate Developers",
    "slug": "real-estate",
    "icon": "building",
    "color": "#7C3AED",
    "description": "Acquire high-intent home buyers and commercial property leads using localized Meta target filters and high-converting builder project landing pages.",
    "pain_points": [
      "High Cost-Per-Lead (CPL) on third-party real estate portal platforms.",
      "Useless leads from brokers and fake customer profiles.",
      "Low lead-to-site-visit conversions."
    ],
    "our_approach": "We build dedicated single-project landing pages with fast load times and run targeted Meta lead generation campaigns, verifying customer phone numbers with instant WhatsApp triggers.",
    "results_achieved": "Delivered 800+ qualified local leads within 45 days, cutting average Cost-Per-Lead values by 65%.",
    "best_services": ["meta-ads", "web-development"],
    "avg_roas": "4.2X",
    "avg_cpl_reduction": "65%",
    "faqs": [
      {
        "q": "How do you filter out brokers from ad campaigns?",
        "a": "We use precise exclusions in Meta target criteria (excluding real estate brokers, agents, and industry job titles) and add mandatory qualifier questions inside lead forms."
      }
    ]
  },
  {
    "id": "dental-clinics",
    "name": "Dental Clinics & Doctors",
    "slug": "dental-clinics",
    "icon": "activity",
    "color": "#0EA5E9",
    "description": "Fills appointment calendars for dental implants, root canals, and cosmetic treatments using Google Maps SEO and high-speed local booking websites.",
    "pain_points": [
      "Low visibility on Google local maps search in nearby city sectors.",
      "High acquisition cost for premium implant treatments.",
      "No-shows for booked appointments."
    ],
    "our_approach": "We optimize your GMB profile with specific dental keywords and run Google Local Search ads that target users looking for dentists nearby.",
    "results_achieved": "Acquired 320 patient bookings in 30 days while tripling call volume through maps optimizations.",
    "best_services": ["google-my-business", "google-ads"],
    "avg_roas": "3.8X",
    "avg_cpl_reduction": "45%",
    "faqs": [
      {
        "q": "Is GMB optimization enough to get dental clients?",
        "a": "Yes, for local areas GMB is highly effective. Combining GMB updates with local Google search ads ensures maximum visibility above competitors."
      }
    ]
  },
  {
    "id": "jewellery",
    "name": "Jewellery Showrooms",
    "slug": "jewellery",
    "icon": "gem",
    "color": "#F5A623",
    "description": "Drive physical store walk-ins for bridal gold, diamond, and polki collections using localized visual Instagram campaigns.",
    "pain_points": [
      "Difficulty displaying heavy gold collections safely online.",
      "High ad budget leakages without getting local footfalls.",
      "Competitor price undercutting."
    ],
    "our_approach": "We deploy high-quality vertical videos showing store designs and jewellery collections, running custom local location radius ads on Instagram.",
    "results_achieved": "Delivered over 120 store walk-ins in 60 days, generating ₹22.4L in local gemstone and gold showroom sales.",
    "best_services": ["meta-ads", "google-my-business"],
    "avg_roas": "5.1X",
    "avg_cpl_reduction": "50%",
    "faqs": [
      {
        "q": "Do we need an e-commerce website to advertise jewellery?",
        "a": "No, for showrooms, a catalog showcase website or direct-to-WhatsApp booking flow is highly effective to drive local physical walk-ins."
      }
    ]
  }
]

# Generate more mock industries to reach 15 complete listings
industry_slugs = [
    ("hospitals", "Hospitals & Clinics", "heart", "#059669"),
    ("manufacturing", "B2B Manufacturers", "cpu", "#6B7280"),
    ("coaching-institutes", "Coaching Institutes", "graduation-cap", "#7C3AED"),
    ("restaurants-cafes", "Restaurants & Cafes", "coffee", "#FF6B2B"),
    ("gyms-fitness", "Gyms & Fitness Centres", "dumbbell", "#0F0E1A"),
    ("accounting-legal", "Chartered Accountants & Legal", "briefcase", "#1E1B4B"),
    ("packers-movers", "Packers & Movers", "truck", "#0EA5E9"),
    ("salons-spas", "Salons & Spas", "sparkles", "#FF6B2B"),
    ("solar-wind", "Solar & Green Energy", "sun", "#F5A623"),
    ("interior-design", "Interior Designers", "home", "#7C3AED"),
    ("ecom-brands", "D2C E-commerce Brands", "shopping-bag", "#059669"),
    ("boutiques-fashion", "Boutiques & Fashion Showrooms", "scissors", "#7C3AED")
]

for i, (slug, name, icon, color) in enumerate(industry_slugs):
    industries_database.append({
        "id": slug,
        "name": name,
        "slug": slug,
        "icon": icon,
        "color": color,
        "description": f"Custom digital ads and lead capture structures built specifically for {name.lower()} in India.",
        "pain_points": [
            f"Lack of local business visibility online.",
            "High advertising costs with zero conversion tracking.",
            "Attracting low-budget inquiries instead of premium clients."
        ],
        "our_approach": f"We build high-speed responsive web layouts and target local search coordinates using customized copy variations.",
        "results_achieved": f"Scaled weekly digital lead flow by {40 + i * 5}% while cutting cost-per-lead values by half.",
        "best_services": ["meta-ads", "google-ads"] if i % 2 == 0 else ["web-development", "google-my-business"],
        "avg_roas": f"{(3.2 + i * 0.15):.1f}X",
        "avg_cpl_reduction": f"{40 + i * 2}%",
        "faqs": [
            {
                "q": f"How fast can we see results for {name}?",
                "a": "Typically, localized search setups show increase in calls and map direction queries within 3-4 weeks of launch."
            }
        ]
    })

# Write industries.json
with open(os.path.join(data_dir, 'industries.json'), 'w', encoding='utf-8') as f:
    json.dump(industries_database, f, indent=2, ensure_ascii=False)

print(f"Generated industries.json with {len(industries_database)} entries.")


# ==========================================
# 2E: TESTIMONIALS DATABASE GENERATION (12 TESTIMONIALS)
# ==========================================

testimonials_database = [
  {
    "id": 1,
    "name": "Aniket Sawant",
    "business": "Sawant Builders & Developers",
    "industry": "real-estate",
    "city": "Pune",
    "state": "Maharashtra",
    "avatar": "/images/testimonials/avatar-1.jpg",
    "rating": 5,
    "text": "RoasBodhi set up our project landing pages and Meta ads from scratch. We were getting tired of broker portals charging exorbitant fees. Within 45 days, we got over 800 leads and closed multiple bookings. The transparency is outstanding.",
    "result": "847 Leads & 4 Bookings in 45 Days",
    "service": "meta-ads",
    "video": False
  },
  {
    "id": 2,
    "name": "Dr. Sameer Pathak",
    "business": "Pathak Dental Care",
    "industry": "dental-clinics",
    "city": "Jaipur",
    "state": "Rajasthan",
    "avatar": "/images/testimonials/avatar-2.jpg",
    "rating": 5,
    "text": "Our clinic map rankings were non-existent. RoasBodhi cleaned up our GMB profile, added geotagged images, and set up Google Local Search ads. Our phone calls from Google Maps have tripled, and our calendars are booked for root canals.",
    "result": "3x Increase in Patient Calls",
    "service": "google-my-business",
    "video": False
  },
  {
    "id": 3,
    "name": "Rajesh Bansal",
    "business": "Bansal Jewellers",
    "industry": "jewellery",
    "city": "Jaipur",
    "state": "Rajasthan",
    "avatar": "/images/testimonials/avatar-3.jpg",
    "rating": 5,
    "text": "I was highly skeptical of digital agencies since our last team wasted ₹50,000 on clicks with zero walk-ins. RoasBodhi used their Instagram localization strategy. We had actual walk-ins showing us the ad reels on their phones. Real sales!",
    "result": "₹22.4L Sales & 5.1X ROAS Delivered",
    "service": "meta-ads",
    "video": False
  }
]

# Generate more mock testimonials to reach 12
cities_list = [("Lucknow", "Uttar Pradesh"), ("Coimbatore", "Tamil Nadu"), ("Kolhapur", "Maharashtra"), ("Nagpur", "Maharashtra"), ("Mangalore", "Karnataka"), ("Noida", "Uttar Pradesh"), ("Surat", "Gujarat"), ("Morbi", "Gujarat"), ("Mysore", "Karnataka")]
industries_list = ["manufacturing", "restaurants-cafes", "salons-spas", "boutiques-fashion", "ecom-brands", "coaching-institutes", "packers-movers", "interior-design", "accounting-legal"]
service_slugs_list = ["google-ads", "web-development", "google-my-business", "meta-ads", "performance-marketing"]

for i in range(9):
    city_name, state_name = cities_list[i]
    ind = industries_list[i]
    serv = service_slugs_list[i % len(service_slugs_list)]
    
    testimonials_database.append({
        "id": 4 + i,
        "name": f"Business Owner {4 + i}",
        "business": f"Local {ind.replace('-', ' ').title()} Brand",
        "industry": ind,
        "city": city_name,
        "state": state_name,
        "avatar": f"/images/testimonials/avatar-{4 + i}.jpg",
        "rating": 5,
        "text": f"Excellent work by the RoasBodhi team. They set up our campaigns and optimized our local maps visibility. We have seen a steady flow of local client inquiries directly on WhatsApp.",
        "result": f"Direct WhatsApp leads scaled by {50 + i * 10}%",
        "service": serv,
        "video": False
    })

# Write testimonials.json
with open(os.path.join(data_dir, 'testimonials.json'), 'w', encoding='utf-8') as f:
    json.dump(testimonials_database, f, indent=2, ensure_ascii=False)

print(f"Generated testimonials.json with {len(testimonials_database)} entries.")


# ==========================================
# 2F: CASE STUDIES DATABASE GENERATION (6 CASE STUDIES)
# ==========================================

case_studies_database = [
  {
    "id": 1,
    "title": "Real Estate Builder Scales Qualified Leads In Pune",
    "slug": "real-estate-builder-pune",
    "client_type": "Property Developer",
    "industry": "real-estate",
    "city": "Pune",
    "state": "Maharashtra",
    "challenge": "The client was paying high commission fees on third-party builder portals and getting low-quality broker leads instead of actual buyers.",
    "solution": "We designed a high-speed single-page project showcase website using Astro.js and ran highly-targeted Meta Lead forms with pre-qualifying question filters.",
    "services_used": ["meta-ads", "web-development"],
    "duration": "45 days",
    "results": {
      "roas": "4.2X",
      "leads_per_month": 847,
      "cpl_before": 850,
      "cpl_after": 210,
      "revenue_increase": "180%",
      "ad_spend": 50000
    },
    "image": "/images/case-studies/cs-1.jpg",
    "featured": True
  },
  {
    "id": 2,
    "title": "Jeweller Store Hijacks Local Search Rankings In Jaipur",
    "slug": "jewellery-store-jaipur",
    "client_type": "Bridal Jewellery Showroom",
    "industry": "jewellery",
    "city": "Jaipur",
    "state": "Rajasthan",
    "challenge": "Low organic footfalls and poor visibility on local maps search for high-intent bridal gold jewellery keywords in Jaipur.",
    "solution": "We optimized the GMB profile with specific local search terms and ran localized Instagram ad campaigns showcasing store collections.",
    "services_used": ["meta-ads", "google-my-business"],
    "duration": "60 days",
    "results": {
      "roas": "5.1X",
      "leads_per_month": 120,
      "cpl_before": 1200,
      "cpl_after": 450,
      "revenue_increase": "218%",
      "ad_spend": 430000
    },
    "image": "/images/case-studies/cs-2.jpg",
    "featured": True
  },
  {
    "id": 3,
    "title": "Multi-Specialty Dental Clinic Fills Treatment Calendar",
    "slug": "dental-clinic-lucknow",
    "client_type": "Dental Clinic Chain",
    "industry": "dental-clinics",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "challenge": "Struggling to book premium root canal and implant appointments locally, losing bids to older clinics.",
    "solution": "We set up target Google Search Ads maps campaigns and optimized GMB profiles with local localized treatment FAQs.",
    "services_used": ["google-ads", "google-my-business"],
    "duration": "30 days",
    "results": {
      "roas": "3.8X",
      "leads_per_month": 320,
      "cpl_before": 650,
      "cpl_after": 320,
      "revenue_increase": "145%",
      "ad_spend": 180000
    },
    "image": "/images/case-studies/cs-3.jpg",
    "featured": True
  }
]

# Generate more mock case studies to reach 6
cities_mock = [("Coimbatore", "Tamil Nadu", "Textile Manufacturer", "manufacturing", "textile-manufacturing"), ("Morbi", "Gujarat", "Ceramic Tiles Exporter", "manufacturing", "ceramic-export"), ("Noida", "Uttar Pradesh", "Packers & Movers Agency", "packers-movers", "packers-movers-noida")]
for i, (city_name, state_name, client_t, ind, slug) in enumerate(cities_mock):
    case_studies_database.append({
        "id": 4 + i,
        "title": f"{client_t} Scales Digital Lead Generation in {city_name}",
        "slug": slug,
        "client_type": client_t,
        "industry": ind,
        "city": city_name,
        "state": state_name,
        "challenge": f"Low digital inquiry flow and poor local search presence.",
        "solution": f"We deployed custom landing pages and optimized Google Search ads targeting commercial intent keywords.",
        "services_used": ["google-ads", "web-development"],
        "duration": "60 days",
        "results": {
            "roas": f"{(3.0 + i * 0.4):.1f}X",
            "leads_per_month": 150 + i * 40,
            "cpl_before": 500,
            "cpl_after": 250,
            "revenue_increase": f"{120 + i * 25}%",
            "ad_spend": 60000
        },
        "image": f"/images/case-studies/cs-{4 + i}.jpg",
        "featured": False
    })

# Write case-studies.json
with open(os.path.join(data_dir, 'case-studies.json'), 'w', encoding='utf-8') as f:
    json.dump(case_studies_database, f, indent=2, ensure_ascii=False)

print(f"Generated case-studies.json with {len(case_studies_database)} entries.")


# ==========================================
# 2G: FAQS DATABASE GENERATION (20 FAQS)
# ==========================================

faqs_database = {
  "general": [
    {
      "q": "What does the name RoasBodhi mean?",
      "a": "ROAS stands for Return on Ad Spend (your financial return). Bodhi is a Sanskrit word meaning awakening or enlightenment. RoasBodhi literally means 'Awakening Your Ad Returns' — bringing strategy, clarity, and growth to your marketing investments."
    },
    {
      "q": "Which locations or cities do you serve in India?",
      "a": "We serve business owners across all states in India. Our programmatic database maps 500+ commercial cities from metros like Mumbai and Delhi to growing hubs in Gujarat, Maharashtra, Rajasthan, and Tamil Nadu."
    },
    {
      "q": "What is your primary communication channel?",
      "a": "We use WhatsApp Business as our primary communication and lead routing channel. It allows for instant query responses and direct communication between our optimization experts and your business team."
    }
  ],
  "pricing": [
    {
      "q": "How does the Pay-After-Seeing website design model work?",
      "a": "For our website development plans, we charge zero upfront fees. We discuss your needs, build the staging preview website, and present it to you. If you love it, you pay the package price and we register your domain and push it live. If you don't approve it, you pay nothing."
    },
    {
      "q": "Are ad spends included in your monthly fees?",
      "a": "No, the ad budget paid directly to Meta or Google is separate. Our monthly fees strictly cover creative graphic designs, reels video edits, campaign setup, copywriting, and daily target optimizations."
    },
    {
      "q": "What is your refund policy?",
      "a": "We offer a 100% refund at any point before your domain is registered and the website is pushed live. Once your custom domain is registered and the website is live, we cannot issue a refund. Monthly ads support retainers can be cancelled with a 15-day notice."
    }
  ],
  "meta_ads": [
    {
      "q": "How long does it take for Meta ads to start generating leads?",
      "a": "Most lead generation campaigns start generating WhatsApp chats and form inquiries within 48 hours of launch. However, the first 14 days are the learning phase where the algorithm optimizes target bids."
    },
    {
      "q": "Do you edit video Reels for Instagram ads?",
      "a": "Yes, our monthly Agni and Pralaya plans include vertical video editing for Reels. You share raw footage of your products or showroom, and our editors turn them into high-converting ad Reels."
    }
  ],
  "google_ads": [
    {
      "q": "What is the difference between Meta Ads and Google Ads?",
      "a": "Meta Ads are push marketing (showing product graphics to users based on interests on Instagram/Facebook). Google Ads are pull marketing (intercepting users actively searching for services like 'dentists near me' on Google Search/Maps)."
    },
    {
      "q": "What is negative keyword scrubbing?",
      "a": "It is the process of adding search terms that you do not want your ads to show for (e.g. if you are a premium dental clinic, we add 'free treatment' or 'jobs' as negative keywords to save your budget)."
    }
  ],
  "web_design": [
    {
      "q": "Why do you build websites using Astro.js?",
      "a": "Astro.js delivers zero javascript by default, which ensures that pages load instantly (under 1 second). Faster load speeds improve your conversion rates and help you rank higher on Google search results."
    },
    {
      "q": "Is a domain and SSL certificate included?",
      "a": "Yes, our Vriddhi and Siddhi website design packages include a free .in domain for 1 year and a lifetime free SSL certificate from Cloudflare Pages."
    }
  ],
  "gmb": [
    {
      "q": "How do you optimize Google My Business map listings?",
      "a": "We clean up Name, Address, Phone (NAP) citations, upload geotagged high-resolution photographs of your business location monthly, and build local directory citations to improve your map rank."
    },
    {
      "q": "What is the Google Maps Local 3-Pack?",
      "a": "It is the top three local business listings that appear on Google Search when a user searches for local services (e.g. 'builders near me'). Raking in the Local 3-pack accounts for 70% of local search clicks."
    }
  ]
}

# Fill the rest of categories to reach 20 complete questions
extra_faqs = [
    ("general", "How do we get started?", "You can click any of our WhatsApp CTA buttons to begin. We will schedule a quick 10-minute discovery call to align on your business requirements."),
    ("pricing", "Do you charge setup fees?", "Our standard advertising packages have a setup fee starting at ₹2,999. However, during our Anniversary Utsav offer, all setup fees are waived."),
    ("meta_ads", "What is Meta Conversions API?", "It is a server-to-server connection that sends conversion events directly from our server to Meta, bypassing browser cookie blockers (like Safari/iOS 14 blocks) to ensure correct tracking."),
    ("google_ads", "Do you write search ad copy?", "Yes, we write all ad extensions, headings, descriptions, and site link copies optimized for high Quality Score values."),
    ("web_design", "Can I update the website content myself?", "Yes, we set up simple JSON data files. You can update pricing or text directly without writing code, or request our team to do it for free under our support terms."),
    ("gmb", "Do you help with getting reviews?", "Yes, we set up customized WhatsApp feedback templates and review links that make it easy for your clients to leave five-star ratings on Google.")
]

for category, q, a in extra_faqs:
    if category in faqs_database:
        faqs_database[category].append({"q": q, "a": a})

# Write faqs.json
with open(os.path.join(data_dir, 'faqs.json'), 'w', encoding='utf-8') as f:
    json.dump(faqs_database, f, indent=2, ensure_ascii=False)

print("Generated faqs.json successfully.")


# ==========================================
# 2H: NAV DATABASE GENERATION
# ==========================================

nav_database = {
  "main_menu": [
    {"label": "Home", "link": "/"},
    {
      "label": "Services",
      "link": "#",
      "dropdown": True,
      "items": [
        {"label": "Meta Ads (Agni)", "link": "/services/meta-ads/", "desc": "Convert social traffic on Facebook & Instagram."},
        {"label": "Google Ads (Chakra)", "link": "/services/google-ads/", "desc": "Rank #1 for commercial intent searches."},
        {"label": "Web Design (Vriddhi)", "link": "/services/web-development/", "desc": "Ultra-fast websites built on Astro & Tailwind."},
        {"label": "Maps SEO (Sthapna)", "link": "/services/google-my-business/", "desc": "Dominate local maps pack ranking."},
        {"label": "Omnichannel (Shakti)", "link": "/services/performance-marketing/", "desc": "Integrated ads + landing page scale."},
        {"label": "Social Organic (Aseem)", "link": "/services/social-media-marketing/", "desc": "Organic Instagram grid & Reels management."}
      ]
    },
    {"label": "Pricing", "link": "/pricing/"},
    {"label": "Results", "link": "/#results"},
    {"label": "About Us", "link": "/about/"},
    {"label": "Contact", "link": "/contact/"}
  ],
  "cta_button": {
    "label": "Free ROAS Audit",
    "link": "/contact/"
  },
  "whatsapp_direct": {
    "phone": "+919999999999",
    "text": "Namaste RoasBodhi™! I'd like to consult on web design and ads for my business."
  }
}

# Write nav.json
with open(os.path.join(data_dir, 'nav.json'), 'w', encoding='utf-8') as f:
    json.dump(nav_database, f, indent=2, ensure_ascii=False)

print("Generated nav.json successfully.")
