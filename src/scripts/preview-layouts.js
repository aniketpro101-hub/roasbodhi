export const THEMES = {
  saffron: {
    name: 'Saffron',
    primary: '#f97316',
    primaryDark: '#ea580c',
    secondary: '#fb923c',
    bg: '#ffffff',
    ghostBg: '#fff7ed',
    darkBg: '#111827',
    cardBorder: '#ffedd5',
    text: '#1f2937',
    badgeBg: '#fed7aa',
    badgeText: '#9a3412',
  },
  indigo: {
    name: 'Indigo',
    primary: '#4f46e5',
    primaryDark: '#4338ca',
    secondary: '#818cf8',
    bg: '#ffffff',
    ghostBg: '#e0e7ff',
    darkBg: '#0f172a',
    cardBorder: '#e0e7ff',
    text: '#1e293b',
    badgeBg: '#c7d2fe',
    badgeText: '#3730a3',
  },
  emerald: {
    name: 'Emerald',
    primary: '#10b981',
    primaryDark: '#059669',
    secondary: '#34d399',
    bg: '#ffffff',
    ghostBg: '#d1fae5',
    darkBg: '#064e3b',
    cardBorder: '#a7f3d0',
    text: '#065f46',
    badgeBg: '#6ee7b7',
    badgeText: '#065f46',
  },
  blue: {
    name: 'Blue',
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    secondary: '#60a5fa',
    bg: '#ffffff',
    ghostBg: '#dbeafe',
    darkBg: '#1e3a8a',
    cardBorder: '#bfdbfe',
    text: '#1e40af',
    badgeBg: '#93c5fd',
    badgeText: '#1e3a8a',
  },
  charcoal: {
    name: 'Charcoal',
    primary: '#374151',
    primaryDark: '#1f2937',
    secondary: '#9ca3af',
    bg: '#ffffff',
    ghostBg: '#f3f4f6',
    darkBg: '#111827',
    cardBorder: '#e5e7eb',
    text: '#111827',
    badgeBg: '#d1d5db',
    badgeText: '#111827',
  },
  rose: {
    name: 'Rose',
    primary: '#e11d48',
    primaryDark: '#be123c',
    secondary: '#fb7185',
    bg: '#ffffff',
    ghostBg: '#ffe4e6',
    darkBg: '#4c0519',
    cardBorder: '#fecdd3',
    text: '#881337',
    badgeBg: '#fda4af',
    badgeText: '#881337',
  },
};

const BASE_UNSPLASH = 'https://images.unsplash.com/';
const IMG_PARAMS = '?w=800&auto=format&fit=crop&q=80';
const HERO_PARAMS = '?w=1600&auto=format&fit=crop&q=80';

const LOCAL_AI_IMAGES = {
  cafe: '/images/demo/pizza.png',
  salon: '/images/demo/salon.png',
  clinic: '/images/demo/clinic.png',
  gym: '/images/demo/gym.png',
  realestate: '/images/demo/realestate.png'
};

const INDUSTRY_IMAGES = {
  cafe: [
    'photo-1513104890138-7c749659a591',
    'photo-1554118811-1e0d58224f24',
    'photo-1568901346375-23c9450c58cd',
    'photo-1517248135467-4c7edcad34c4',
    'photo-1476224203421-9ac39bcb3327',
    'photo-1509440159596-0249088772ff',
    'photo-1556910103-1c02745aae4d',
    'photo-1559925393-8be0ec4767c8'
  ],
  salon: [
    'photo-1560066984-138dadb4c035',
    'photo-1522337360788-8b13dee7a37e',
    'photo-1487412720507-e7ab37603c6f',
    'photo-1604654894610-df63bc536371',
    'photo-1562322140-8baeececf3df',
    'photo-1596462502278-27bfdc403348',
    'photo-1570172619644-dfd03ed5d881',
    'photo-1521590832167-7bcbfaa6381f'
  ],
  clinic: [
    'photo-1629909613654-28e377c37b09',
    'photo-1588776814546-1ffcf47267a5',
    'photo-1576091160399-112ba8d25d1d',
    'photo-1519494026892-80bbd2d6fd0d',
    'photo-1505751172876-fa1923c5c528',
    'photo-1579684385127-1ef15d508118',
    'photo-1631217868264-e5b90bb7e133',
    'photo-1587854692152-cbe660dbde88'
  ],
  gym: [
    'photo-1534438327276-14e5300c3a48',
    'photo-1517838277536-f5f99be501cd',
    'photo-1581009146145-b5ef050c2e1e',
    'photo-1544367567-0f2fcb009e0b',
    'photo-1571019614242-c5c5dee9f50b',
    'photo-1526506118085-60ce8714f8c5',
    'photo-1549719386-74dfcbf7dbed',
    'photo-1518611012118-696072aa579a'
  ],
  realestate: [
    'photo-1600585154340-be6161a56a0c',
    'photo-1600596542815-ffad4c1539a9',
    'photo-1512917774080-9991f1c4c750',
    'photo-1556909114-f6e7ad7d3136',
    'photo-1522771739844-6a9f6d5f14af',
    'photo-1600607687939-ce8a6c25118c',
    'photo-1545324418-cc1a3fa10c00',
    'photo-1502672260266-1c1ef2d93688'
  ],
  general: [
    'photo-1497366216548-37526070297c',
    'photo-1441986300917-64674bd600d8',
    'photo-1522071820081-009f0129c71c',
    'photo-1552664730-d307ca884978',
    'photo-1497215842964-222b430dc094',
    'photo-1604719312566-8912e9227c6a',
    'photo-1521791136064-7986c2920216',
    'photo-1556745757-8d76bdb6984b'
  ]
};

const INDUSTRY_TESTIMONIALS = {
  cafe: [
    {name: 'Priya Sharma', text: 'The pizza here is absolutely incredible! Fresh ingredients, perfect crust, and lightning fast delivery.', rating: 5},
    {name: 'Rahul Verma', text: 'Best artisanal coffee in town. The ambiance is perfect for evening hangouts and laptop work.', rating: 5},
    {name: 'Sneha Gupta', text: 'Amazing gourmet burgers and super polite service. My go-to food spot in the city!', rating: 5}
  ],
  salon: [
    {name: 'Anjali Desai', text: 'Absolutely loved the hair styling! The team is professional, hygienic, and extremely skilled.', rating: 5},
    {name: 'Kavita Singh', text: 'Best facial & spa experience I have ever had. My skin started glowing instantly!', rating: 5},
    {name: 'Neha Kapoor', text: 'Top-tier beauty studio! Highly recommended for bridal makeup and party makeovers.', rating: 5}
  ],
  clinic: [
    {name: 'Amit Patel', text: 'Very professional doctors, sterile painless treatment, and friendly staff. Highly trusted.', rating: 5},
    {name: 'Vikram Joshi', text: 'Accurate diagnosis and excellent patient care. Took care of my root canal effortlessly.', rating: 5},
    {name: 'Deepa Reddy', text: 'Clean facility, zero wait time with WhatsApp booking, and affordable consultation fees.', rating: 5}
  ],
  gym: [
    {name: 'Karan Malhotra', text: 'State-of-the-art gym equipment, high energy music, and certified personal trainers. Down 8kg!', rating: 5},
    {name: 'Rajesh Iyer', text: 'The CrossFit and Zumba sessions are insane. Best fitness investment I made.', rating: 5},
    {name: 'Rohan Das', text: 'Super clean, AC floor, and awesome community. Floor trainers are always ready to assist.', rating: 5}
  ],
  realestate: [
    {name: 'Suresh Kumar', text: 'Helped us buy our 3BHK flat at pre-launch prices with zero brokerage. Smooth documentation!', rating: 5},
    {name: 'Meena Choudhary', text: 'RERA verified projects and hassle-free home loan approval from SBI within 48 hours.', rating: 5},
    {name: 'Arun Bhatia', text: 'Very professional property consultants. Free cab pickup for site inspection was awesome.', rating: 5}
  ],
  general: [
    {name: 'Rakesh Mehta', text: 'Top-notch quality and super responsive team. Delivered exactly what was promised on time.', rating: 5},
    {name: 'Pooja Nair', text: 'Exceptional service! Their attention to detail and customer care is unmatched.', rating: 5},
    {name: 'Nitin Agarwal', text: 'Highly professional, transparent pricing, and 100% reliable local business.', rating: 5}
  ]
};

const INDUSTRY_FEATURES = {
  cafe: [
    {icon: '🔥', title: 'Fresh Preparation', desc: 'Handcrafted dough & fresh ingredients prepared daily'},
    {icon: '⭐', title: 'Top Rated Spot', desc: 'Loved by 10,000+ foodies in the city'},
    {icon: '🛵', title: '30-Min Delivery', desc: 'Hot & fresh delivery right to your door'},
    {icon: '🍃', title: 'Organic Options', desc: 'Fresh vegetarian & Jain options available'}
  ],
  salon: [
    {icon: '✨', title: 'Premium Products', desc: '100% dermatologist tested organic brands'},
    {icon: '👩‍🎨', title: 'Expert Stylists', desc: 'Trained in latest international styling trends'},
    {icon: '🌿', title: 'Sterile Hygiene', desc: 'Strict WHO sanitization between clients'},
    {icon: '💆‍♀️', title: 'Luxury Ambience', desc: 'Serene spa environment to help you unwind'}
  ],
  clinic: [
    {icon: '👨‍⚕️', title: 'Expert Doctors', desc: '15+ years experienced medical specialists'},
    {icon: '🏥', title: 'Modern Equipment', desc: 'Painless procedures with advanced tech'},
    {icon: '⏱️', title: 'Zero Wait Time', desc: 'Priority instant booking via WhatsApp'},
    {icon: '🛡️', title: 'Transparent Care', desc: 'Affordable consultation & honest diagnosis'}
  ],
  gym: [
    {icon: '🏋️', title: 'Imported Machines', desc: 'Heavy-duty strength & cardio equipment'},
    {icon: '💪', title: 'Certified Trainers', desc: '1-on-1 diet charts & workout routines'},
    {icon: '🚿', title: 'Luxury AC Floor', desc: 'Hygienic locker rooms & steam bath'},
    {icon: '🕒', title: 'Open 6 AM - 10 PM', desc: 'Flexible morning & evening workout slots'}
  ],
  realestate: [
    {icon: '🏡', title: 'RERA Verified', desc: '100% legal clearance & transparent papers'},
    {icon: '🤝', title: 'Zero Brokerage', desc: 'Direct developer pricing & legal guidance'},
    {icon: '💰', title: 'Bank Loan Approved', desc: 'Pre-approved 100% loan assistance'},
    {icon: '🚗', title: 'Free Site Pickup', desc: 'Complimentary weekend cab site visits'}
  ],
  general: [
    {icon: '🌟', title: 'Quality Assured', desc: 'Zero compromise on service standards'},
    {icon: '🤝', title: 'Customer First', desc: 'Prompt support and transparent pricing'},
    {icon: '⚡', title: 'Fast Execution', desc: 'Quick turnaround on all service commitments'},
    {icon: '💡', title: 'Modern Solutions', desc: 'Innovative approach tailored to your needs'}
  ]
};

const INDUSTRY_STATS = {
  cafe: [{value: '10,000+', label: 'Happy Customers'}, {value: '4.9★', label: 'Google Rating'}, {value: '50+', label: 'Menu Items'}, {value: '30 Min', label: 'Express Delivery'}],
  salon: [{value: '5,000+', label: 'Makeovers'}, {value: '4.8★', label: 'Google Rating'}, {value: '15+', label: 'Expert Stylists'}, {value: '100%', label: 'Organic Products'}],
  clinic: [{value: '20,000+', label: 'Patients Treated'}, {value: '4.9★', label: 'Google Rating'}, {value: '15+', label: 'Specialist Doctors'}, {value: '100%', label: 'Painless Care'}],
  gym: [{value: '2,000+', label: 'Active Members'}, {value: '4.8★', label: 'Google Rating'}, {value: '10+', label: 'Certified Trainers'}, {value: '100%', label: 'AC Gym Floor'}],
  realestate: [{value: '500+', label: 'Properties Sold'}, {value: '4.9★', label: 'Google Rating'}, {value: '100%', label: 'RERA Approved'}, {value: '₹0', label: 'Brokerage Fee'}],
  general: [{value: '1,000+', label: 'Projects Completed'}, {value: '4.9★', label: 'Google Rating'}, {value: '100%', label: 'Client Satisfaction'}, {value: '24/7', label: 'Support'}],
};

function formatPhone(phone) {
  return phone ? phone.replace(/[^0-9]/g, '') : '';
}

function getImages(industry) {
  const ind = industry && INDUSTRY_IMAGES[industry] ? industry : 'general';
  const list = INDUSTRY_IMAGES[ind].map(id => BASE_UNSPLASH + id + IMG_PARAMS);
  if (LOCAL_AI_IMAGES[ind]) {
    return [LOCAL_AI_IMAGES[ind], ...list];
  }
  return list;
}

function getStats(industry, dataStats) {
  if (dataStats && dataStats.length > 0) return dataStats;
  const ind = industry && INDUSTRY_STATS[industry] ? industry : 'general';
  return INDUSTRY_STATS[ind];
}

function getFeatures(industry, dataFeatures) {
  if (dataFeatures && dataFeatures.length > 0) return dataFeatures;
  const ind = industry && INDUSTRY_FEATURES[industry] ? industry : 'general';
  return INDUSTRY_FEATURES[ind];
}

function getTestimonials(industry, dataTestimonials) {
  if (dataTestimonials && dataTestimonials.length > 0) return dataTestimonials;
  const ind = industry && INDUSTRY_TESTIMONIALS[industry] ? industry : 'general';
  return INDUSTRY_TESTIMONIALS[ind];
}

function generateCSS(themeKey) {
  const t = THEMES[themeKey] || THEMES.saffron;
  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap');

      .sp-site {
        --primary: ${t.primary};
        --primary-dark: ${t.primaryDark};
        --secondary: ${t.secondary};
        --bg: ${t.bg};
        --ghost-bg: ${t.ghostBg};
        --dark-bg: ${t.darkBg};
        --card-border: ${t.cardBorder};
        --text: ${t.text};
        --badge-bg: ${t.badgeBg};
        --badge-text: ${t.badgeText};
        
        font-family: 'Inter', sans-serif;
        color: var(--text);
        background: var(--bg);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      
      .sp-site * {
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
      }

      .sp-h1, .sp-h2, .sp-h3 {
        font-family: 'Playfair Display', serif;
        margin-top: 0;
      }

      .sp-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        background: transparent;
      }
      .sp-nav.sp-scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        padding: 14px 40px;
      }
      .sp-nav.sp-scrolled .sp-logo {
        color: var(--text);
      }
      .sp-logo {
        font-size: 24px;
        font-weight: 800;
        color: #fff;
        text-decoration: none;
        transition: color 0.3s;
      }

      .sp-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 28px;
        font-weight: 700;
        font-size: 15px;
        border-radius: 9999px;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
        border: none;
      }
      .sp-btn-primary {
        background: var(--primary);
        color: #fff;
      }
      .sp-btn-primary:hover {
        background: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      }
      .sp-btn-whatsapp {
        background: #25D366;
        color: #fff;
      }
      .sp-btn-whatsapp:hover {
        background: #128C7E;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(37,211,102,0.4);
      }

      @keyframes sp-float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }
      .sp-floating-badge {
        animation: sp-float 4s ease-in-out infinite;
      }

      .sp-glow-btn {
        box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
        transition: all 0.3s ease;
      }
      .sp-glow-btn:hover {
        box-shadow: 0 0 30px rgba(249, 115, 22, 0.7);
        transform: translateY(-3px) scale(1.02);
      }

      .sp-hero {
        min-height: 100vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 100px 20px 60px;
        color: #fff;
        background-size: cover;
        background-position: center;
      }
      .sp-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%);
      }
      .sp-hero-content {
        position: relative;
        z-index: 10;
        max-width: 850px;
      }
      .sp-badge {
        display: inline-block;
        padding: 8px 20px;
        border-radius: 9999px;
        background: var(--primary);
        color: #fff;
        font-size: 13px;
        font-weight: 800;
        margin-bottom: 24px;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      }
      .sp-hero h1 {
        font-size: 56px;
        line-height: 1.15;
        margin-bottom: 20px;
        font-weight: 900;
      }
      .sp-hero p {
        font-size: 20px;
        margin-bottom: 36px;
        opacity: 0.95;
        line-height: 1.5;
      }
      .sp-hero-btns {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .sp-section {
        padding: 80px 40px;
      }
      .sp-section-dark {
        background: var(--dark-bg);
        color: #fff;
      }
      .sp-section-ghost {
        background: var(--ghost-bg);
      }
      
      .sp-stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        text-align: center;
      }
      .sp-stat-value {
        font-size: 42px;
        font-weight: 900;
        color: var(--primary);
        margin-bottom: 8px;
        font-family: 'Playfair Display', serif;
      }
      .sp-stat-label {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.9;
      }

      .sp-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        align-items: center;
      }
      .sp-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
      }

      .sp-about-img {
        width: 100%;
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        object-fit: cover;
      }
      
      .sp-features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-top: 32px;
      }
      .sp-feature {
        display: flex;
        align-items: flex-start;
        gap: 14px;
      }
      .sp-feature-icon {
        font-size: 28px;
      }
      .sp-feature-title {
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 4px;
      }
      .sp-feature-desc {
        font-size: 14px;
        opacity: 0.8;
        line-height: 1.5;
      }

      .sp-section-title {
        text-align: center;
        margin-bottom: 56px;
      }
      .sp-section-title h2 {
        font-size: 42px;
        margin-bottom: 16px;
        font-weight: 900;
      }
      .sp-section-title p {
        font-size: 18px;
        opacity: 0.8;
        max-width: 650px;
        margin: 0 auto;
      }

      .sp-tab-btn {
        padding: 10px 24px;
        border-radius: 9999px;
        background: #f3f4f6;
        color: #4b5563;
        font-weight: 700;
        font-size: 13px;
        border: 1px solid #e5e7eb;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .sp-tab-btn.sp-tab-active, .sp-tab-btn:hover {
        background: var(--primary);
        color: #fff;
        border-color: var(--primary);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .sp-card {
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid var(--card-border);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .sp-card:hover {
        transform: translateY(-8px) scale(1.01);
        box-shadow: 0 20px 35px rgba(0,0,0,0.12);
      }
      .sp-card-img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        transition: transform 0.6s ease;
      }
      .sp-card:hover .sp-card-img {
        transform: scale(1.08);
      }
      .sp-card-body {
        padding: 24px;
      }
      .sp-card-title {
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 8px;
      }
      .sp-card-desc {
        font-size: 14px;
        opacity: 0.8;
        line-height: 1.6;
        margin-bottom: 18px;
      }
      .sp-card-price {
        font-weight: 800;
        color: var(--primary);
        font-size: 18px;
      }

      .sp-gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .sp-gallery-img-wrapper {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        aspect-ratio: 4/3;
        box-shadow: 0 10px 20px rgba(0,0,0,0.08);
      }
      .sp-gallery-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
      }
      .sp-gallery-img-wrapper:hover .sp-gallery-img {
        transform: scale(1.1);
      }

      .sp-testimonial {
        background: #fff;
        padding: 32px;
        border-radius: 20px;
        border: 1px solid var(--card-border);
        box-shadow: 0 10px 25px rgba(0,0,0,0.04);
        transition: transform 0.3s ease;
      }
      .sp-testimonial:hover {
        transform: translateY(-4px);
      }
      .sp-stars {
        color: #fbbf24;
        font-size: 22px;
        margin-bottom: 16px;
      }
      .sp-testimonial-text {
        font-style: italic;
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 24px;
        color: #374151;
      }
      .sp-testimonial-name {
        font-weight: 800;
        color: var(--primary);
        font-size: 14px;
      }

      .sp-banner {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        padding: 64px 40px;
        text-align: center;
        color: #fff;
        border-radius: 28px;
        margin: 40px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      }
      .sp-banner h2 {
        font-size: 38px;
        margin-bottom: 16px;
        font-weight: 900;
      }
      .sp-banner p {
        font-size: 20px;
        margin-bottom: 32px;
        opacity: 0.95;
      }

      .sp-map-placeholder {
        background: var(--ghost-bg);
        border-radius: 20px;
        height: 100%;
        min-height: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--card-border);
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
      }
      .sp-map-placeholder a {
        color: var(--primary);
        font-weight: 800;
        text-decoration: none;
        margin-top: 14px;
        font-size: 16px;
      }

      .sp-footer {
        background: #000;
        color: #fff;
        padding: 48px 40px;
        text-align: center;
      }
      .sp-footer p {
        opacity: 0.7;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .sp-floating-wa {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 64px;
        height: 64px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 25px rgba(37,211,102,0.5);
        z-index: 999;
        animation: sp-pulse 2s infinite;
        transition: transform 0.3s;
      }
      .sp-floating-wa:hover {
        transform: scale(1.15);
      }
      .sp-floating-wa svg {
        width: 36px;
        height: 36px;
        fill: #fff;
      }
      
      @keyframes sp-pulse {
        0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
        70% { box-shadow: 0 0 0 18px rgba(37,211,102,0); }
        100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
      }

      .sp-site[data-animated] .sp-animate {
        opacity: 0;
        transform: translateY(35px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      .sp-site[data-animated] .sp-animate.sp-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .sp-mobile-nav-toggle {
        display: none;
        background: none;
        border: none;
        color: #fff;
        font-size: 26px;
        cursor: pointer;
      }
      .sp-mobile-menu {
        display: none;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: rgba(17, 24, 39, 0.98);
        backdrop-filter: blur(16px);
        padding: 24px;
        flex-direction: column;
        gap: 14px;
        z-index: 99;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      .sp-mobile-menu.sp-menu-active {
        display: flex;
      }

      /* Responsive Breakpoints (Mobile & Tablet Optimization) */
      @media (max-width: 1024px) {
        .sp-grid-3 {
          grid-template-columns: 1fr 1fr;
        }
        .sp-hero h1 {
          font-size: 44px;
        }
      }

      @media (max-width: 768px) {
        .sp-nav {
          padding: 16px 20px;
        }
        .sp-nav.sp-scrolled {
          padding: 12px 20px;
        }
        .sp-mobile-nav-toggle {
          display: block;
        }
        .sp-nav-desktop-btn {
          display: none;
        }
        .sp-hero h1 {
          font-size: 32px;
        }
        .sp-hero p {
          font-size: 16px;
        }
        .sp-section {
          padding: 48px 20px;
        }
        .sp-section-title h2 {
          font-size: 30px;
        }
        .sp-stats-row {
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .sp-grid-2 {
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .sp-grid-3 {
          grid-template-columns: 1fr;
        }
        .sp-gallery {
          grid-template-columns: 1fr 1fr;
        }
        .sp-banner {
          margin: 16px;
          padding: 40px 20px;
        }
        .sp-banner h2 {
          font-size: 28px;
        }
        .sp-features-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}

function sectionNav(data, t) {
  const phoneFormatted = formatPhone(data.contactPhone);
  const whatsappFormatted = formatPhone(data.contactWhatsapp);
  return `
    <nav class="sp-nav">
      <a href="#" class="sp-logo">${data.businessName || 'Business Name'}</a>
      <button class="sp-mobile-nav-toggle" aria-label="Toggle Menu">☰</button>
      <a href="tel:${phoneFormatted}" class="sp-btn sp-btn-primary sp-nav-desktop-btn">Book Now</a>
    </nav>
    <div class="sp-mobile-menu">
      <a href="tel:${phoneFormatted}" class="sp-btn sp-btn-primary" style="width:100%;">Call ${data.contactPhone || 'Now'}</a>
      <a href="https://wa.me/${whatsappFormatted}" class="sp-btn sp-btn-whatsapp" style="width:100%;" target="_blank">WhatsApp Us</a>
    </div>
  `;
}

function sectionHeroFullscreen(data, t, imgs) {
  const bgImg = imgs[0].startsWith('/images/') ? imgs[0] : imgs[0].replace(IMG_PARAMS, HERO_PARAMS);
  const whatsappFormatted = formatPhone(data.contactWhatsapp);
  const phoneFormatted = formatPhone(data.contactPhone);
  const encodedName = encodeURIComponent(data.businessName || 'Business');
  const waLink = `https://wa.me/${whatsappFormatted}?text=Hi%20${encodedName},%20I%20want%20to%20know%20more`;
  
  return `
    <header class="sp-hero" style="background-image: url('${bgImg}')">
      <div class="sp-hero-content sp-animate">
        ${data.badgeText ? `<div class="sp-badge sp-floating-badge">${data.badgeText}</div>` : ''}
        <h1 class="sp-h1" style="text-shadow:0 4px 20px rgba(0,0,0,0.6);">${data.slogan || 'Premium Services for You'}</h1>
        <p style="text-shadow:0 2px 10px rgba(0,0,0,0.8);">${data.subSlogan || 'Experience the best quality and service in town.'}</p>
        <div class="sp-hero-btns">
          <a href="${waLink}" class="sp-btn sp-btn-whatsapp sp-glow-btn" target="_blank">
            <svg style="width:20px;height:20px;margin-right:8px;fill:currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            WhatsApp Us
          </a>
          <a href="tel:${phoneFormatted}" class="sp-btn sp-btn-primary sp-glow-btn">Call ${data.contactPhone || ''}</a>
        </div>
        <p style="margin-top: 24px; font-size: 16px; opacity:0.9;">📍 ${data.location || 'Your Location'}</p>
      </div>
    </header>
  `;
}

function sectionStats(data, t) {
  const stats = getStats(data.industry, data.stats);
  return `
    <section class="sp-section sp-section-dark">
      <div class="sp-stats-row sp-animate">
        ${stats.map(s => `
          <div>
            <div class="sp-stat-value">${s.value}</div>
            <div class="sp-stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function sectionAbout(data, t, imgs) {
  const features = getFeatures(data.industry, data.features);
  return `
    <section class="sp-section sp-section-ghost">
      <div class="sp-grid-2">
        <div class="sp-animate">
          <img src="${imgs[1]}" alt="About Us" class="sp-about-img" />
        </div>
        <div class="sp-animate">
          <div style="color:var(--primary); font-weight:700; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">About Us</div>
          <h2 class="sp-h2" style="font-size:36px; margin-bottom:24px;">Why Choose ${data.businessName || 'Us'}?</h2>
          <p style="font-size:18px; line-height:1.6; opacity:0.8; margin-bottom:24px;">
            ${data.about || 'We are dedicated to providing the highest quality of service to our customers. Our team of professionals works tirelessly to ensure your complete satisfaction.'}
          </p>
          <div class="sp-features-grid">
            ${features.slice(0, 4).map(f => `
              <div class="sp-feature">
                <div class="sp-feature-icon">${f.icon}</div>
                <div>
                  <div class="sp-feature-title">${f.title}</div>
                  <div class="sp-feature-desc">${f.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function sectionServices(data, t, imgs) {
  const services = (data.services && data.services.length > 0) 
    ? data.services 
    : [
        {title: 'Premium Service 1', description: 'Experience the best quality with our signature offering.', price: '₹999'},
        {title: 'Premium Service 2', description: 'Experience the best quality with our signature offering.', price: '₹1499'},
        {title: 'Premium Service 3', description: 'Experience the best quality with our signature offering.', price: '₹1999'}
      ];

  return `
    <section class="sp-section" id="services">
      <div class="sp-section-title sp-animate">
        <div style="color:var(--primary); font-weight:700; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Our Offerings</div>
        <h2 class="sp-h2">Signature Services & Menu</h2>
        <div style="display:flex; justify-content:center; gap:8px; margin-top:20px; flex-wrap:wrap;">
          <button class="sp-tab-btn sp-tab-active" data-filter="all">All Specials</button>
          <button class="sp-tab-btn" data-filter="popular">Popular Choice</button>
          <button class="sp-tab-btn" data-filter="exclusive">Exclusive Deals</button>
        </div>
      </div>
      <div class="sp-grid-3">
        ${services.slice(0, 6).map((s, i) => `
          <div class="sp-card sp-animate" data-category="${i % 2 === 0 ? 'popular' : 'exclusive'}">
            <div style="overflow:hidden; position:relative;">
              <img src="${imgs[(i + 1) % imgs.length]}" alt="${s.title}" class="sp-card-img" />
              ${i === 0 ? `<span style="position:absolute; top:12px; right:12px; background:var(--primary); color:#fff; font-size:11px; font-weight:800; padding:4px 10px; border-radius:99px; text-transform:uppercase;">🔥 Best Seller</span>` : ''}
            </div>
            <div class="sp-card-body">
              <h3 class="sp-card-title sp-h3">${s.title}</h3>
              ${s.tagline ? `<div style="font-size:12px; font-weight:700; color:var(--primary); text-transform:uppercase; margin-bottom:6px;">${s.tagline}</div>` : ''}
              <p class="sp-card-desc">${s.description || ''}</p>
              ${s.includes && s.includes.length > 0 ? `
                <ul style="list-style:none; padding:0; margin:12px 0 16px 0; font-size:13px; opacity:0.85; border-top:1px solid rgba(0,0,0,0.06); padding-top:10px;">
                  ${s.includes.map(inc => `<li style="display:flex; align-items:center; gap:6px; margin-bottom:4px;"><span style="color:#22C55E; font-weight:bold;">✓</span> ${inc}</li>`).join('')}
                </ul>
              ` : ''}
              ${s.price ? `<div class="sp-card-price" style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;"><span>${s.price} ${s.priceNote ? '<span style="font-size:12px; opacity:0.6; font-weight:normal;">' + s.priceNote + '</span>' : ''}</span><span style="font-size:12px; color:var(--primary); font-weight:700;">Order Now →</span></div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function sectionGallery(data, t, imgs) {
  return `
    <section class="sp-section sp-section-ghost">
      <div class="sp-section-title sp-animate">
        <div style="color:var(--primary); font-weight:700; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Our Gallery</div>
        <h2 class="sp-h2">A Glimpse Inside</h2>
      </div>
      <div class="sp-gallery">
        ${imgs.slice(2, 8).map(img => `
          <div class="sp-gallery-img-wrapper sp-animate">
            <img src="${img}" alt="Gallery Image" class="sp-gallery-img" loading="lazy" />
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function sectionTestimonials(data, t) {
  const testimonials = getTestimonials(data.industry, data.testimonials);
  return `
    <section class="sp-section">
      <div class="sp-section-title sp-animate">
        <div style="color:var(--primary); font-weight:700; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Testimonials</div>
        <h2 class="sp-h2">What Our Customers Say</h2>
      </div>
      <div class="sp-grid-3">
        ${testimonials.map(t => `
          <div class="sp-testimonial sp-animate">
            <div class="sp-stars">★★★★★</div>
            <p class="sp-testimonial-text">"${t.text}"</p>
            <div class="sp-testimonial-name">- ${t.name}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function sectionFAQ(data, t) {
  const faqs = (data.faqs && data.faqs.length > 0) ? data.faqs : [
    { question: 'What are your working hours?', answer: 'We are open 7 days a week from 9:00 AM to 10:00 PM.' },
    { question: 'How can I place an order or book an appointment?', answer: 'Click the WhatsApp or Call button directly on this page for instant confirmation.' },
    { question: 'What payment methods do you accept?', answer: 'We accept UPI (GPay/PhonePe/Paytm), credit/debit cards, and cash.' }
  ];

  return `
    <section class="sp-section sp-section-ghost">
      <div class="sp-section-title sp-animate">
        <div style="color:var(--primary); font-weight:700; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Got Questions?</div>
        <h2 class="sp-h2">Frequently Asked Questions</h2>
      </div>
      <div style="max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:12px;">
        ${faqs.map((faq, i) => `
          <div class="sp-faq-item sp-animate" style="background:#fff; border-radius:16px; border:1px solid var(--card-border); overflow:hidden; transition:all 0.3s ease;">
            <button class="sp-faq-btn" style="width:100%; text-align:left; padding:20px 24px; background:none; border:none; font-size:18px; font-weight:700; color:var(--text); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>${faq.question}</span>
              <span class="sp-faq-icon" style="font-size:22px; transition:transform 0.3s; color:var(--primary);">+</span>
            </button>
            <div class="sp-faq-answer" style="max-height:0; overflow:hidden; transition:max-height 0.4s ease, padding 0.3s ease; padding:0 24px;">
              <p style="margin:0 0 20px 0; font-size:16px; opacity:0.8; line-height:1.6;">${faq.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function sectionOfferBanner(data, t) {
  const whatsappFormatted = formatPhone(data.contactWhatsapp);
  const encodedName = encodeURIComponent(data.businessName || 'Business');
  const waLink = `https://wa.me/${whatsappFormatted}?text=Hi%20${encodedName},%20I%20am%20interested%20in%20the%20offer`;
  
  return `
    <section class="sp-animate">
      <div class="sp-banner">
        <h2 class="sp-h2">${data.offerText || 'Special Offer: Get 20% Off Your First Visit!'}</h2>
        <p>${data.offerSubtext || 'Limited time offer. Book your appointment today and claim your discount.'}</p>
        <a href="${waLink}" class="sp-btn sp-btn-whatsapp sp-glow-btn" target="_blank" style="background:#fff; color:var(--primary); font-size:18px; padding:16px 32px;">Claim Offer Now</a>
      </div>
    </section>
  `;
}

function sectionContact(data, t) {
  const phoneFormatted = formatPhone(data.contactPhone);
  const whatsappFormatted = formatPhone(data.contactWhatsapp);
  const encodedName = encodeURIComponent(data.businessName || 'Business');
  const waLink = `https://wa.me/${whatsappFormatted}?text=Hi%20${encodedName},%20I%20want%20to%20know%20more`;
  const mapLink = `https://maps.google.com/?q=${encodeURIComponent((data.businessName || '') + ' ' + (data.location || ''))}`;
  
  return `
    <section class="sp-section sp-section-ghost">
      <div class="sp-grid-2">
        <div class="sp-animate">
          <h2 class="sp-h2" style="font-size:36px; margin-bottom:24px;">Get In Touch</h2>
          <p style="font-size:18px; opacity:0.8; margin-bottom:32px;">We'd love to hear from you. Visit us or reach out via phone or WhatsApp.</p>
          
          <div style="margin-bottom:24px;">
            <div style="font-weight:700; margin-bottom:8px;">📍 Location</div>
            <div>${data.location || 'Our Location'}</div>
          </div>
          
          <div style="margin-bottom:24px;">
            <div style="font-weight:700; margin-bottom:8px;">📞 Phone</div>
            <a href="tel:${phoneFormatted}" style="color:var(--primary); text-decoration:none; font-size:18px; font-weight:600;">${data.contactPhone || '+91 9876543210'}</a>
          </div>

          <div style="margin-bottom:24px;">
            <div style="font-weight:700; margin-bottom:8px;">🕒 Business Hours</div>
            <div>${data.businessHours || 'Mon-Sun: 9:00 AM - 10:00 PM'}</div>
          </div>
          
          <div style="margin-top:40px;">
            <a href="${waLink}" class="sp-btn sp-btn-whatsapp sp-glow-btn" target="_blank">Chat on WhatsApp</a>
          </div>
        </div>
        <div class="sp-animate">
          <div class="sp-map-placeholder">
            <div style="font-size:48px; margin-bottom:16px;">📍</div>
            <a href="${mapLink}" target="_blank">View on Google Maps</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function sectionFooter(data, t) {
  return `
    <footer class="sp-footer">
      <h3 class="sp-h3" style="font-size:24px; margin-bottom:16px;">${data.businessName || 'Business Name'}</h3>
      <p>${data.location || 'Location'}</p>
      <p>${data.contactPhone || 'Phone Number'}</p>
      <p style="margin-top:32px; font-size:12px; opacity:0.5;">&copy; ${new Date().getFullYear()} ${data.businessName || 'Business'}. All rights reserved.</p>
      <p style="font-size:12px; opacity:0.5;">Made with ❤️ by Sthapna Website Builder</p>
    </footer>
  `;
}

function floatingWhatsApp(data) {
  const whatsappFormatted = formatPhone(data.contactWhatsapp);
  const encodedName = encodeURIComponent(data.businessName || 'Business');
  const waLink = `https://wa.me/${whatsappFormatted}?text=Hi%20${encodedName},%20I%20want%20to%20know%20more`;
  
  return `
    <a href="${waLink}" class="sp-floating-wa" target="_blank" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
    </a>
  `;
}

function scrollScript() {
  return `
    <script>
      (function() {
        var site = document.querySelector('.sp-site');
        if(site) site.setAttribute('data-animated', 'true');

        var nav = document.querySelector('.sp-nav');
        window.addEventListener('scroll', function() {
          if (window.scrollY > 50) {
            nav.classList.add('sp-scrolled');
          } else {
            nav.classList.remove('sp-scrolled');
          }
        });

        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('sp-visible');
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll('.sp-animate').forEach(function(el) {
          observer.observe(el);
        });

        // FAQ Accordion Toggle JS
        document.querySelectorAll('.sp-faq-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            var item = btn.parentElement;
            var answer = item.querySelector('.sp-faq-answer');
            var icon = item.querySelector('.sp-faq-icon');
            var isOpen = item.classList.contains('sp-faq-open');
            document.querySelectorAll('.sp-faq-item').forEach(function(other) {
              other.classList.remove('sp-faq-open');
              other.querySelector('.sp-faq-answer').style.maxHeight = '0';
              var otherIcon = other.querySelector('.sp-faq-icon');
              if (otherIcon) {
                otherIcon.textContent = '+';
                otherIcon.style.transform = 'rotate(0deg)';
              }
            });
            if (!isOpen) {
              item.classList.add('sp-faq-open');
              answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
              icon.textContent = '−';
              icon.style.transform = 'rotate(180deg)';
            }
          });
        });

        // Mobile Nav Drawer Toggle JS
        var navToggle = document.querySelector('.sp-mobile-nav-toggle');
        var mobileMenu = document.querySelector('.sp-mobile-menu');
        if (navToggle && mobileMenu) {
          navToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('sp-menu-active');
          });
        }

        // Category Tab Filter JS
        document.querySelectorAll('.sp-tab-btn').forEach(function(tab) {
          tab.addEventListener('click', function() {
            document.querySelectorAll('.sp-tab-btn').forEach(function(t) { t.classList.remove('sp-tab-active'); });
            tab.classList.add('sp-tab-active');
            var filter = tab.getAttribute('data-filter');
            document.querySelectorAll('.sp-card').forEach(function(card) {
              if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
      })();
    </script>
  `;
}

export function renderLayoutA(data, themeKey = 'saffron') {
  const t = THEMES[themeKey] || THEMES.saffron;
  const imgs = getImages(data.industry);
  
  return `
    ${generateCSS(themeKey)}
    <div class="sp-site">
      ${sectionNav(data, t)}
      ${sectionHeroFullscreen(data, t, imgs)}
      ${sectionStats(data, t)}
      ${sectionAbout(data, t, imgs)}
      ${sectionServices(data, t, imgs)}
      ${sectionGallery(data, t, imgs)}
      ${sectionTestimonials(data, t)}
      ${sectionFAQ(data, t)}
      ${sectionOfferBanner(data, t)}
      ${sectionContact(data, t)}
      ${sectionFooter(data, t)}
      ${floatingWhatsApp(data)}
      ${scrollScript()}
    </div>
  `;
}

export function renderLayoutB(data, themeKey = 'rose') {
  const t = THEMES[themeKey] || THEMES.rose;
  const imgs = getImages(data.industry);
  
  return `
    ${generateCSS(themeKey)}
    <div class="sp-site">
      ${sectionNav(data, t)}
      ${sectionHeroFullscreen(data, t, imgs)}
      ${sectionGallery(data, t, imgs)}
      ${sectionAbout(data, t, imgs)}
      ${sectionServices(data, t, imgs)}
      ${sectionStats(data, t)}
      ${sectionTestimonials(data, t)}
      ${sectionFAQ(data, t)}
      ${sectionOfferBanner(data, t)}
      ${sectionContact(data, t)}
      ${sectionFooter(data, t)}
      ${floatingWhatsApp(data)}
      ${scrollScript()}
    </div>
  `;
}

export function renderLayoutC(data, themeKey = 'indigo') {
  const t = THEMES[themeKey] || THEMES.indigo;
  const imgs = getImages(data.industry);
  
  return `
    ${generateCSS(themeKey)}
    <div class="sp-site">
      ${sectionNav(data, t)}
      ${sectionHeroFullscreen(data, t, imgs)}
      ${sectionOfferBanner(data, t)}
      ${sectionStats(data, t)}
      ${sectionServices(data, t, imgs)}
      ${sectionAbout(data, t, imgs)}
      ${sectionTestimonials(data, t)}
      ${sectionFAQ(data, t)}
      ${sectionContact(data, t)}
      ${sectionFooter(data, t)}
      ${floatingWhatsApp(data)}
      ${scrollScript()}
    </div>
  `;
}
