import { THEMES, renderLayoutA, renderLayoutB, renderLayoutC } from './preview-layouts.js';

// Wizard Application State
const state = {
  currentStep: 1,
  businessName: '',
  location: '',
  industry: 'clinic',
  description: '',
  phone: '',
  whatsapp: '',
  selectedLayout: 'A',
  selectedTheme: 'saffron',
  generatedData: null,
  domainQuery: '',
  domainStatus: null, // 'checking' | 'available' | 'taken'
  checkoutStatus: null, // 'idle' | 'success' | 'fallback'
  simulatedErrorMode: false // set true to test WhatsApp Fallback page
};

// Key Keyword Mapping for Industry Auto-detection
const INDUSTRY_KEYWORDS = {
  clinic: ['dental', 'teeth', 'clinic', 'doctor', 'hospital', 'health', 'treatment', 'root canal', 'cleaning'],
  salon: ['salon', 'hair', 'cut', 'spa', 'beauty', 'makeup', 'facial', 'skin', 'bridal'],
  cafe: ['cafe', 'coffee', 'pizza', 'food', 'restaurant', 'burger', 'bakery', 'tea', 'dining'],
  gym: ['gym', 'fitness', 'workout', 'trainer', 'weight', 'cardio', 'muscle', 'fat loss'],
  realestate: ['real estate', 'property', 'flat', 'apartment', 'bhk', 'plot', 'shop', 'rera', 'rent'],
  general: ['shop', 'store', 'coaching', 'classes', 'service', 'repair']
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWizard);
} else {
  initWizard();
}

function initWizard() {
  bindStep1();
  bindStep2();
  bindStep3();
  bindStep5();
  bindGlobalEvents();
}

/* ==========================================================================
   STEP 1: GRAND ENTRY (Business Name Input)
   ========================================================================== */
function bindStep1() {
  const nameInput = document.getElementById('biz-name-input');
  const previewText = document.getElementById('biz-name-preview');
  const nextBtn = document.getElementById('step1-next-btn');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      state.businessName = e.target.value;
      if (previewText) {
        previewText.textContent = state.businessName || 'Your Business Name';
      }
      if (nextBtn) {
        nextBtn.disabled = !state.businessName.trim();
      }
    });

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && state.businessName.trim()) {
        goToStep(2);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.businessName.trim()) {
        goToStep(2);
      }
    });
  }
}

/* ==========================================================================
   STEP 2: DETAILS FORM & AUTO-DETECTION
   ========================================================================== */
function bindStep2() {
  const locInput = document.getElementById('biz-location-input');
  const descInput = document.getElementById('biz-desc-input');
  const phoneInput = document.getElementById('biz-phone-input');
  const waInput = document.getElementById('biz-wa-input');
  const nextBtn = document.getElementById('step2-next-btn');
  const industryCards = document.querySelectorAll('.industry-card');

  // Industry Card Click Listener
  industryCards.forEach(card => {
    card.addEventListener('click', () => {
      industryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.industry = card.dataset.industry;
    });
  });

  // Description input auto-detection
  if (descInput) {
    descInput.addEventListener('input', (e) => {
      state.description = e.target.value;
      detectIndustryFromText(state.description);
    });
  }

  if (locInput) locInput.addEventListener('input', (e) => state.location = e.target.value);
  if (phoneInput) phoneInput.addEventListener('input', (e) => state.phone = e.target.value);
  if (waInput) waInput.addEventListener('input', (e) => state.whatsapp = e.target.value);

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!state.location.trim()) {
        alert('Please enter your city / location.');
        return;
      }
      goToStep(3);
    });
  }
}

function detectIndustryFromText(text) {
  const lower = text.toLowerCase();
  for (const [ind, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      const targetCard = document.querySelector(`.industry-card[data-industry="${ind}"]`);
      if (targetCard && !targetCard.classList.contains('selected')) {
        document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('selected'));
        targetCard.classList.add('selected');
        state.industry = ind;
      }
      break;
    }
  }
}

/* ==========================================================================
   STEP 3: LAYOUT & THEME SELECTOR
   ========================================================================== */
function bindStep3() {
  const layoutCards = document.querySelectorAll('.layout-card');
  const themeSwatches = document.querySelectorAll('.theme-swatch');
  const generateBtn = document.getElementById('generate-site-btn');

  // Layout Card Selection
  layoutCards.forEach(card => {
    card.addEventListener('click', () => {
      layoutCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedLayout = card.dataset.layout;
      renderLivePreview();
    });
  });

  // Theme Swatch Selection
  themeSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      themeSwatches.forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
      state.selectedTheme = swatch.dataset.theme;
      updateLayoutCardColors(state.selectedTheme);
      renderLivePreview();
    });
  });

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      triggerSiteGeneration();
    });
  }
}

function updateLayoutCardColors(themeKey) {
  const theme = THEMES[themeKey] || THEMES.saffron;
  document.querySelectorAll('.mini-preview-accent').forEach(el => {
    el.style.backgroundColor = theme.primary;
  });
}

/* ==========================================================================
   STEP 4: AI GENERATION LOADING SEQUENCE
   ========================================================================== */
async function triggerSiteGeneration() {
  goToStep(4);

  const progressBar = document.getElementById('gen-progress-bar');
  const statusMsg = document.getElementById('gen-status-msg');

  const messages = [
    { p: 20, text: '✍️ Writing catchy headline & tagline...' },
    { p: 45, text: '📝 Crafting local trust about story...' },
    { p: 70, text: '🎨 Designing service cards & pricing...' },
    { p: 85, text: '❓ Structuring customer FAQs...' },
    { p: 100, text: '🚀 Assembling responsive website...' }
  ];

  let stepIdx = 0;
  const progressInterval = setInterval(() => {
    if (stepIdx < messages.length) {
      if (progressBar) progressBar.style.width = `${messages[stepIdx].p}%`;
      if (statusMsg) statusMsg.textContent = messages[stepIdx].text;
      stepIdx++;
    }
  }, 400);

  try {
    // API Call to `/api/generate-copy/`
    const res = await fetch('/api/generate-copy/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: state.businessName,
        location: state.location,
        description: state.description,
        industry: state.industry,
        phone: state.phone,
        whatsapp: state.whatsapp || state.phone
      })
    });

    const data = await res.json();
    state.generatedData = data;
  } catch (err) {
    console.error('Generation Error:', err);
  } finally {
    setTimeout(() => {
      clearInterval(progressInterval);
      renderLivePreview();
      goToStep(5);
    }, 2200);
  }
}

/* ==========================================================================
   STEP 5: LIVE PREVIEW & DOMAIN SEARCH / CHECKOUT
   ========================================================================== */
function renderLivePreview() {
  const phoneScreen = document.getElementById('phone-preview-screen');
  if (!phoneScreen) return;

  // Fail-safe: If generatedData is missing or fetch failed, build client-side template data instantly
  if (!state.generatedData) {
    const bName = state.businessName || 'Our Business';
    const bLoc = state.location || 'Your City';
    const bInd = state.industry || 'cafe';
    const bDesc = state.description || '';

    // Industry-aware rich content generation
    const industryContent = {
      cafe: {
        slogan: `${bLoc}'s Favourite Handcrafted Food Destination`,
        subSlogan: `Fresh from our kitchen to your plate — artisan dishes crafted with imported ingredients and local love. Dine in or order delivery.`,
        about: `${bName} is the premier dining destination in ${bLoc}. We craft every dish with passion, using locally sourced ingredients and authentic recipes perfected over years. ${bDesc ? bDesc + '. ' : ''}Whether you're craving a quick coffee, a family dinner, or a late-night snack — we serve warmth and flavour on every plate. Our cozy ambiance and friendly staff make every visit memorable.`,
        badge: '⭐ Rated #1 Food Spot in ' + bLoc,
        services: [
          { title: 'Wood-Fired Pizzas', description: 'Hand-tossed dough, fresh mozzarella, and premium toppings baked in our signature wood-fired oven at 400°C.', price: 'From ₹249' },
          { title: 'Artisanal Coffee & Shakes', description: 'Single-origin espresso shots, cold brews, thick shakes, and refreshing coolers crafted by our baristas.', price: 'From ₹129' },
          { title: 'Gourmet Burgers', description: 'Juicy double-stacked patties with house-made sauces, crispy lettuce, and freshly baked brioche buns.', price: 'From ₹199' },
          { title: 'Continental Platters', description: 'Pasta, risotto, garlic bread, and chef-special appetizers for a complete fine-dining experience.', price: 'From ₹349' },
          { title: 'Party & Event Catering', description: 'Customized menus for birthdays, office parties, and private celebrations with table bookings.', price: 'Custom Quote' },
          { title: 'Express Home Delivery', description: 'Hot and fresh meals delivered to your doorstep within 30 minutes across ' + bLoc + '.', price: 'Free Delivery' }
        ],
        faqs: [
          { question: 'What are your opening hours?', answer: 'We are open 7 days a week from 10:00 AM to 11:00 PM.' },
          { question: 'Do you offer home delivery?', answer: 'Yes! Order directly via WhatsApp for instant home delivery within 30 minutes.' },
          { question: 'Can I book a table for a private event?', answer: 'Absolutely! We have private dining areas perfect for birthdays, anniversaries, and team meetups. Message us on WhatsApp to reserve.' },
          { question: 'Do you have vegetarian options?', answer: 'Yes! Over 60% of our menu is purely vegetarian with dedicated Jain options available.' },
          { question: 'What payment methods do you accept?', answer: 'We accept Cash, UPI (GPay/PhonePe), all major cards, and Paytm wallet.' }
        ],
        offerText: '🔥 Order Today & Get 20% Off Your First Order!',
        offerSubtext: 'Use code WELCOME20 or simply mention this website when you order',
        hours: 'Mon-Sun: 10:00 AM - 11:00 PM'
      },
      salon: {
        slogan: `Reinvent Your Style & Glow at ${bName}`,
        subSlogan: `Premium hair styling, luxury skin therapies, and bridal makeover experiences in ${bLoc}. Walk out looking your absolute best.`,
        about: `Welcome to ${bName}, ${bLoc}'s most loved luxury beauty & hair studio. ${bDesc ? bDesc + '. ' : ''}We blend international styling techniques with premium organic products to give you a look that turns heads. Our expert stylists are trained in the latest global trends and use only dermatologist-tested, cruelty-free products. From everyday grooming to grand wedding makeovers — experience royal pampering.`,
        badge: '✨ Premium Beauty Studio in ' + bLoc,
        services: [
          { title: 'Designer Haircut & Styling', description: 'Precision cuts tailored to your face shape by expert stylists, with deep conditioning hair spa.', price: 'From ₹399' },
          { title: 'Glow Facials & Skin Therapy', description: 'Advanced organic facials, de-tan, anti-aging, and chemical peels for radiant, youthful skin.', price: 'From ₹799' },
          { title: 'Bridal & Party Makeover', description: 'HD airbrush makeup, saree draping, and complete grooming packages for your special day.', price: 'From ₹4,999' },
          { title: 'Manicure & Pedicure', description: 'Luxury nail art, gel extensions, and relaxing hand & foot spa treatments.', price: 'From ₹499' },
          { title: 'Full Body Spa & Massage', description: 'Aromatherapy, deep tissue, Swedish massage — relax and rejuvenate at our spa lounge.', price: 'From ₹1,499' },
          { title: 'Men\'s Grooming Lounge', description: 'Beard styling, hair colour, dandruff treatment, and clean shave by professional barbers.', price: 'From ₹299' }
        ],
        faqs: [
          { question: 'Do I need a prior appointment?', answer: 'Walk-ins are welcome! But we recommend booking via WhatsApp for zero wait time.' },
          { question: 'Which brands do you use?', answer: 'We exclusively use L\'Oréal Professional, Schwarzkopf, MAC, and dermatologist-approved organic products.' },
          { question: 'Do you offer bridal packages?', answer: 'Yes! We have comprehensive bridal packages including trials, makeup, hair, draping, and touch-up kits.' },
          { question: 'Are services available for men?', answer: 'Absolutely! We have a dedicated men\'s grooming section with trained barbers and stylists.' },
          { question: 'What safety measures do you follow?', answer: 'All tools are sterilized after each client, and we use disposable capes and towels for hygiene.' }
        ],
        offerText: '💆 Book Today & Get a Free Hair Spa Worth ₹999!',
        offerSubtext: 'Limited time offer for new customers — mention this website when you visit',
        hours: 'Mon-Sun: 10:00 AM - 9:00 PM'
      },
      clinic: {
        slogan: `World-Class Healthcare & Patient Care in ${bLoc}`,
        subSlogan: `Your trusted medical destination. Professional treatment, pain-free procedures, and compassionate doctors available 7 days a week.`,
        about: `${bName} is ${bLoc}'s leading healthcare facility. ${bDesc ? bDesc + '. ' : ''}We bring together experienced medical professionals, advanced diagnostic technology, and a warm, sterile environment. Our goal is to deliver gentle, effective, and affordable care for patients of all ages. With thousands of satisfied patients and state-of-the-art equipment, we are the healthcare partner your family deserves.`,
        badge: '🏥 Certified Medical Facility in ' + bLoc,
        services: [
          { title: 'Comprehensive Diagnosis', description: 'Advanced health checkups and personalized treatment plans using state-of-the-art diagnostic equipment.', price: 'From ₹499' },
          { title: 'Painless Procedures', description: 'Modern minimally-invasive procedures performed with max precision for quick, comfortable recovery.', price: 'Consultation ₹300' },
          { title: 'Dental & Orthodontics', description: 'Teeth cleaning, root canal, braces, implants, and cosmetic dentistry by expert dentists.', price: 'From ₹500' },
          { title: 'Pediatric & Family Care', description: 'Specialized child healthcare, vaccinations, and routine wellness checkups for the whole family.', price: 'From ₹350' },
          { title: 'Cosmetic & Dermatology', description: 'Skin treatments, laser therapy, acne solutions, and hair fall treatment by certified dermatologists.', price: 'Custom Plans' },
          { title: '24/7 Emergency Support', description: 'Round-the-clock emergency assistance and priority appointments for urgent health concerns.', price: 'Priority Access' }
        ],
        faqs: [
          { question: 'How do I book an appointment?', answer: 'Click the WhatsApp button on this page for instant appointment confirmation within minutes.' },
          { question: 'What safety standards do you follow?', answer: 'We follow strict WHO & IMA guidelines with complete sterilization of all equipment between patients.' },
          { question: 'Is parking available?', answer: 'Yes, we have ample free parking space for patients and visitors.' },
          { question: 'Do you accept insurance?', answer: 'We accept major health insurance providers. Contact us for specific policy details.' },
          { question: 'What are the consultation timings?', answer: 'We are open 7 days a week. Morning: 9 AM - 1 PM, Evening: 5 PM - 9 PM.' }
        ],
        offerText: '🩺 Book Your First Consultation at Just ₹99!',
        offerSubtext: 'New patient special — comprehensive checkup + free follow-up included',
        hours: 'Mon-Sun: 9:00 AM - 9:00 PM'
      },
      gym: {
        slogan: `Transform Your Body & Mind at ${bName}`,
        subSlogan: `State-of-the-art equipment, certified personal trainers, and high-energy group classes in ${bLoc}. Your fitness journey starts here.`,
        about: `${bName} is ${bLoc}'s ultimate fitness hub. ${bDesc ? bDesc + '. ' : ''}We empower members of all fitness levels to build strength, lose weight, and live healthier lives. Equipped with imported cardio & strength machines, air-conditioned floors, and expert nutrition guidance — we deliver real results with a supportive community that keeps you motivated every single day.`,
        badge: '💪 #1 Fitness Center in ' + bLoc,
        services: [
          { title: 'Strength & Conditioning', description: 'Full range of free weights, power racks, and cable machines for muscle building and toning.', price: '₹1,499/mo' },
          { title: 'Personal Training', description: 'Certified 1-on-1 trainers designing customized workout routines and nutrition plans.', price: '₹3,999/mo' },
          { title: 'Fat Loss & Cardio Zone', description: 'High-calorie burn treadmills, HIIT workouts, spin cycling, and Zumba dance fitness.', price: 'Included' },
          { title: 'Yoga & Meditation', description: 'Morning and evening yoga sessions for flexibility, stress relief, and mental wellness.', price: '₹999/mo' },
          { title: 'CrossFit & Functional', description: 'High-intensity functional training with ropes, kettlebells, TRX, and obstacle courses.', price: '₹1,999/mo' },
          { title: 'Diet & Nutrition Plans', description: 'Personalized Indian diet charts for weight loss, muscle gain, or general wellness goals.', price: 'Free with PT' }
        ],
        faqs: [
          { question: 'Can I take a free trial?', answer: 'Yes! Message us on WhatsApp to claim your 1-Day Free Trial Pass today.' },
          { question: 'What are the gym timings?', answer: 'Morning: 5:30 AM – 10:00 AM, Evening: 4:00 PM – 10:00 PM (Monday to Saturday).' },
          { question: 'Is personal training extra?', answer: 'Personal training is a separate premium package. Floor trainers are available for free to all members.' },
          { question: 'Do you have separate areas for women?', answer: 'Yes, we have a dedicated women\'s training zone with female trainers available.' },
          { question: 'What should I bring on my first day?', answer: 'Just bring comfortable workout clothes, a water bottle, and a towel. We provide the rest!' }
        ],
        offerText: '🏋️ Join Today & Get 2 Months FREE!',
        offerSubtext: 'Annual membership special — limited slots available this month',
        hours: 'Mon-Sat: 5:30 AM - 10:00 PM | Sun: 7:00 AM - 12:00 PM'
      },
      realestate: {
        slogan: `Find Your Dream Property in ${bLoc}`,
        subSlogan: `RERA-approved residential flats, commercial shops, and investment plots with guaranteed high returns and zero brokerage.`,
        about: `${bName} is ${bLoc}'s most trusted real estate consultancy. ${bDesc ? bDesc + '. ' : ''}With 500+ verified property listings, transparent legal paperwork, and complete home loan assistance — we make property buying seamless and stress-free. Whether you're looking for your first home, an investment opportunity, or commercial space, our expert team guides you from site visit to registration.`,
        badge: '🏢 RERA Verified Property Experts',
        services: [
          { title: 'Luxury 1/2/3 BHK Flats', description: 'Spacious modern apartments with clubhouse, swimming pool, gym, and 24/7 security in prime locations.', price: 'Starts ₹35L' },
          { title: 'Commercial Shops & Offices', description: 'High-footfall retail units and office spaces ideal for businesses, clinics, and startups.', price: 'High ROI' },
          { title: 'NA Plots & Farmhouses', description: 'Verified non-agricultural plots and premium farmhouse lands for investment and weekend homes.', price: 'From ₹8L' },
          { title: 'Home Loan Assistance', description: '100% home loan tie-ups with SBI, HDFC, ICICI, and Axis Bank. Pre-approved in 48 hours.', price: 'Free Service' },
          { title: 'Free Site Visits', description: 'Complimentary cab pickup and guided site inspections every weekend — no commitment needed.', price: 'Free Pickup' },
          { title: 'Legal & Registration Help', description: 'End-to-end documentation, stamp duty guidance, and hassle-free property registration support.', price: 'Zero Brokerage' }
        ],
        faqs: [
          { question: 'Why invest in ' + bLoc + '?', answer: bLoc + ' is seeing rapid infrastructure growth — metro, highways, IT parks — making it a hotspot for 15-20% annual appreciation.' },
          { question: 'Are home loans available?', answer: 'Yes! All our listed properties are pre-approved by major banks. We help with 100% loan processing.' },
          { question: 'How do I schedule a site visit?', answer: 'Just message us on WhatsApp with your preferred date. We arrange free cab pickup from your location.' },
          { question: 'Is there any brokerage?', answer: 'We operate on a zero-brokerage model for buyers. Our commission comes from the developer.' },
          { question: 'Are properties RERA registered?', answer: 'Every single property we list is RERA-verified with complete documentation transparency.' }
        ],
        offerText: '🏠 Book This Weekend & Get Free Registration!',
        offerSubtext: 'Limited inventory — only 12 units remaining at pre-launch pricing',
        hours: 'Mon-Sun: 9:00 AM - 8:00 PM | Site Visits: Sat-Sun'
      },
      general: {
        slogan: `Top-Rated Premium Services in ${bLoc}`,
        subSlogan: `Quality craftsmanship, reliable service, and 100% customer satisfaction guaranteed at ${bName}. Trusted by thousands.`,
        about: `${bName} is ${bLoc}'s premier service provider. ${bDesc ? bDesc + '. ' : ''}Built on trust, quality, and prompt support, we deliver excellence in every project. With years of experience and thousands of happy clients, we have earned a reputation for reliability and attention to detail. Contact us today to experience the difference.`,
        badge: '⭐ Trusted Local Business in ' + bLoc,
        services: [
          { title: 'Premium Solutions', description: 'Customized services tailored specifically to meet your unique requirements with fast turnaround.', price: 'Best Rates' },
          { title: 'Expert Consultation', description: 'Professional guidance and transparent pricing with absolutely no hidden charges or surprises.', price: 'Free Guidance' },
          { title: 'Quality Assurance', description: 'Every project goes through our multi-step quality check process before final delivery.', price: 'Guaranteed' },
          { title: 'After-Sales Support', description: 'Dedicated customer care and quick resolution for all your post-service inquiries.', price: '24/7 Support' },
          { title: 'Bulk & Corporate Orders', description: 'Special pricing and priority processing for large orders and corporate partnerships.', price: 'Custom Quote' },
          { title: 'Home & On-Site Service', description: 'Convenient doorstep service available across ' + bLoc + ' at no extra charge.', price: 'Free Visit' }
        ],
        faqs: [
          { question: 'How do I get started?', answer: 'Simply click the WhatsApp button on this page and send us your requirement. We respond within minutes!' },
          { question: 'What are your working hours?', answer: 'We are available Monday through Saturday, 9:00 AM to 8:00 PM.' },
          { question: 'Do you offer custom pricing?', answer: 'Yes! Send us your requirements on WhatsApp and we\'ll provide a transparent, competitive quote.' },
          { question: 'What payment methods do you accept?', answer: 'We accept UPI (GPay/PhonePe), bank transfer, cash, and all major debit/credit cards.' },
          { question: 'Do you serve all areas in ' + bLoc + '?', answer: 'Yes, we serve all areas within ' + bLoc + ' and surrounding regions. Delivery/visit charges may apply for distant locations.' }
        ],
        offerText: '🎉 New Customer Special — 15% Off Your First Order!',
        offerSubtext: 'Mention this website when you contact us to claim your discount',
        hours: 'Mon-Sat: 9:00 AM - 8:00 PM'
      }
    };

    const content = industryContent[bInd] || industryContent.general;

    state.generatedData = {
      businessName: bName,
      location: bLoc,
      industry: bInd,
      slogan: content.slogan,
      subSlogan: content.subSlogan,
      about: content.about,
      badgeText: content.badge,
      services: content.services,
      faqs: content.faqs,
      offerText: content.offerText,
      offerSubtext: content.offerSubtext,
      businessHours: content.hours,
      contactPhone: state.phone || '+919999999999',
      contactWhatsapp: state.whatsapp || state.phone || '+919999999999'
    };
  }

  let html = '';
  if (state.selectedLayout === 'B') {
    html = renderLayoutB(state.generatedData, state.selectedTheme);
  } else if (state.selectedLayout === 'C') {
    html = renderLayoutC(state.generatedData, state.selectedTheme);
  } else {
    html = renderLayoutA(state.generatedData, state.selectedTheme);
  }

  phoneScreen.innerHTML = html;

  // Auto-fill default domain query based on business name
  const domainInput = document.getElementById('domain-search-input');
  if (domainInput) {
    const slug = (state.businessName || 'mybusiness').toLowerCase().replace(/[^a-z0-9]/g, '') + '.in';
    domainInput.value = slug;
    state.domainQuery = slug;
    checkDomainAvailability(slug);
  }
}

function bindStep5() {
  const domainInput = document.getElementById('domain-search-input');
  const searchBtn = document.getElementById('domain-check-btn');
  const checkoutBtn = document.getElementById('pay-checkout-btn');
  const toggleFallbackBtn = document.getElementById('toggle-fallback-mode');
  const editBtn = document.getElementById('edit-wiz-btn');
  const downloadBtn = document.getElementById('download-html-btn');

  const tabViewBtn = document.getElementById('view-tab-btn');
  const mobileViewBtn = document.getElementById('view-mobile-btn');

  if (tabViewBtn) {
    tabViewBtn.addEventListener('click', () => {
      openFullScreenDemo();
    });
  }

  if (mobileViewBtn) {
    mobileViewBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.getElementById('phone-preview-screen')?.offsetTop || 0, behavior: 'smooth' });
    });
  }

  if (searchBtn && domainInput) {
    searchBtn.addEventListener('click', () => {
      checkDomainAvailability(domainInput.value.trim());
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      triggerMockCheckout();
    });
  }

  if (toggleFallbackBtn) {
    toggleFallbackBtn.addEventListener('click', () => {
      state.simulatedErrorMode = !state.simulatedErrorMode;
      toggleFallbackBtn.textContent = state.simulatedErrorMode 
        ? '⚠️ Mode: Simulated API Failure (Test Fallback)'
        : '✅ Mode: Normal Direct Success';
      toggleFallbackBtn.style.color = state.simulatedErrorMode ? '#F59E0B' : '#10B981';
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => goToStep(2));
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => downloadWebsiteHTML());
  }
}

function checkDomainAvailability(query) {
  const statusEl = document.getElementById('domain-status-box');
  if (!statusEl) return;

  statusEl.innerHTML = `<span style="color: #9CA3AF;">Checking availability for <b>${query}</b>...</span>`;

  setTimeout(() => {
    statusEl.innerHTML = `
      <div style="display: flex; items-center; justify-content: space-between; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 8px 12px; border-radius: 8px; font-size: 11px;">
        <span style="color: #10B981; font-weight: 700;">✅ ${query} is AVAILABLE!</span>
        <span style="color: #6B7280; text-decoration: line-through;">₹350</span>
        <span style="color: #F5A623; font-weight: 800;">FREE (1st Year)</span>
      </div>
    `;
  }, 600);
}

/* ==========================================================================
   RAZORPAY MOCK CHECKOUT & SMART ERROR FALLBACK
   ========================================================================== */
function triggerMockCheckout() {
  const domain = document.getElementById('domain-search-input')?.value || 'mybusiness.in';

  // Simulating Razorpay modal popup delay
  alert(`💳 Mock Razorpay Payment Modal\n\nPackage: Tier 1 Hook (₹1,999)\nDomain: ${domain} (Free)\nHosting: Free Lifetime\n\nClick OK to simulate successful payment.`);

  // If simulated mode has low wallet error enabled:
  if (state.simulatedErrorMode) {
    renderSmartErrorFallback(domain);
  } else {
    renderSuccessLaunch(domain);
  }
}

function renderSuccessLaunch(domain) {
  const resultBox = document.getElementById('launch-result-box');
  if (!resultBox) return;

  resultBox.innerHTML = `
    <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10B981; border-radius: 16px; padding: 20px; text-align: center;">
      <h3 style="font-size: 18px; font-weight: 800; color: #10B981; margin: 0 0 6px 0;">🎉 Congratulations! Your Site is Live</h3>
      <p style="font-size: 12px; color: #D1D5DB; margin: 0 0 14px 0;">Domain <b>${domain}</b> assigned & Cloudflare SSL activated.</p>
      
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
        <button id="view-fullscreen-demo-btn" style="background: #10B981; color: #FFF; padding: 12px 20px; border-radius: 99px; font-weight: 800; font-size: 12px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          👁️ Open Full-Screen Demo Site in New Tab
        </button>
        <span style="font-size: 10px; color: #9CA3AF;">Production Live URL: <b>https://${domain}</b></span>
      </div>
    </div>
  `;

  const btn = document.getElementById('view-fullscreen-demo-btn');
  if (btn) {
    btn.addEventListener('click', openFullScreenDemo);
  }
}

function openFullScreenDemo() {
  const phoneScreen = document.getElementById('phone-preview-screen');
  if (!phoneScreen) return;

  // The premium layout renderers already include <style> with Google Fonts @import,
  // responsive CSS, and a <script> for scroll animations.
  // We just wrap the content in a clean HTML document shell.
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.businessName || 'My Website'} — ${state.location || ''}</title>
  <meta name="description" content="${(state.generatedData?.subSlogan || state.businessName + ' in ' + state.location).replace(/"/g, '&quot;')}">
</head>
<body style="margin:0;padding:0;">
  ${phoneScreen.innerHTML}
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

function renderSmartErrorFallback(domain) {
  const resultBox = document.getElementById('launch-result-box');
  if (!resultBox) return;

  const waMsg = encodeURIComponent(`Hi Aniket! I just completed the ₹1,999 payment for ${state.businessName}. Please activate my domain: ${domain}.`);

  resultBox.innerHTML = `
    <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #F59E0B; border-radius: 16px; padding: 20px; text-align: center;">
      <div style="font-size: 24px; margin-bottom: 6px;">🚀</div>
      <h3 style="font-size: 16px; font-weight: 800; color: #F59E0B; margin: 0 0 6px 0;">Payment Received! Setting Up Your Brand...</h3>
      <p style="font-size: 11px; color: #D1D5DB; line-height: 1.5; margin: 0 0 16px 0;">
        We are registering domain <b>${domain}</b> and deploying edge Cloudflare servers. This setup typically takes 5–15 minutes.
      </p>
      
      <a href="https://wa.me/919999999999?text=${waMsg}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: #25D366; color: #FFF; padding: 12px 20px; border-radius: 99px; font-weight: 800; font-size: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(37,211,102,0.4);">
        💬 Connect on WhatsApp for Instant Launch
      </a>
    </div>
  `;
}

function downloadWebsiteHTML() {
  const phoneScreen = document.getElementById('phone-preview-screen');
  if (!phoneScreen) return;

  const blob = new Blob([phoneScreen.innerHTML], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${state.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-website.html`;
  a.click();
}

/* ==========================================================================
   GLOBAL STEP NAVIGATOR
   ========================================================================== */
function goToStep(stepNumber) {
  state.currentStep = stepNumber;
  document.querySelectorAll('.wizard-step').forEach(step => {
    step.classList.remove('active');
  });

  const targetStep = document.getElementById(`wizard-step-${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add('active');
  }

  if (stepNumber === 5) {
    renderLivePreview();
  }

  // Smooth scroll to top of wizard container
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindGlobalEvents() {
  document.querySelectorAll('[data-goto-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(parseInt(btn.dataset.gotoStep, 10));
    });
  });
}
