/**
 * BODHI GURU CHATBOT
 * RoasBodhi.in — Custom WhatsApp Lead Chatbot
 * Version: 1.0.0
 * Zero dependencies. Zero external APIs.
 * All leads → WhatsApp +91 9082543992
 */

(function () {
  'use strict';

  // ============================================================
  // CONFIGURATION
  // ============================================================

  const CONFIG = {
    ownerWhatsApp: '919082543992',        // Owner's WhatsApp
    triggerDelay: 5000,                    // 5 seconds delay to pop preview bubble
    returnVisitorDelay: 5000,              // 5 seconds delay for returning visitors
    typingSpeedShort: 400,                 // Short message delay
    typingSpeedLong: 700,                  // Long message delay
    storageKey: 'bodhi_guru_v1',           // localStorage key
    sessionKey: 'bodhi_guru_session',      // Session key
  };

  // ============================================================
  // CONVERSATION FLOW DATA
  // ============================================================

  const FLOW = {
    greetings: {
      morning:   '🌅 Good morning! Namaste!',
      afternoon: '☀️ Good afternoon! Namaste!',
      evening:   '🌆 Good evening! Namaste!',
      night:     '🌙 Good night! Namaste!',
    },
    openingButtons: [
      { text: '🚀 Yes, help me grow!', action: 'start_qualify' },
      { text: '💰 Show me pricing',    action: 'show_pricing'   },
      { text: '📞 Talk to Aniket',     action: 'talk_human'     },
      { text: '💭 Just exploring',     action: 'explore'        },
    ],
    industryMessage: "What's your business type?",
    industries: [
      { emoji: '🏢', name: 'Real Estate',          id: 'real_estate'    },
      { emoji: '💎', name: 'Jewellery',             id: 'jewellery'      },
      { emoji: '🍽️', name: 'Restaurant / Food',    id: 'restaurant'     },
      { emoji: '🏥', name: 'Healthcare / Clinic',  id: 'healthcare'     },
      { emoji: '🎓', name: 'Education / Coaching', id: 'education'      },
      { emoji: '🛍️', name: 'E-commerce / Retail',  id: 'ecommerce'      },
      { emoji: '🏭', name: 'Manufacturing',         id: 'manufacturing'  },
      { emoji: '👗', name: 'Fashion / Boutique',   id: 'fashion'        },
      { emoji: '💼', name: 'Professional Services', id: 'professional'  },
      { emoji: '🏋️', name: 'Fitness / Gym',        id: 'fitness'        },
      { emoji: '🏨', name: 'Hotel / Hospitality',  id: 'hospitality'    },
      { emoji: '🚗', name: 'Automobile',            id: 'automobile'     },
      { emoji: '✨', name: 'Other',                 id: 'other'          },
    ],
    goalMessage: "What's your #1 goal right now?",
    goals: [
      { emoji: '📈', text: 'More Leads / Sales',    id: 'leads'    },
      { emoji: '🌐', text: 'Professional Website',  id: 'website'  },
      { emoji: '📍', text: 'Rank on Google Maps',   id: 'gmb'      },
      { emoji: '🎯', text: 'Better ROAS on Ads',    id: 'roas'     },
      { emoji: '💡', text: 'Complete Digital Setup', id: 'complete' },
      { emoji: '🤷', text: 'Not sure, need advice', id: 'advice'   },
    ],
    recommendations: {
      'real_estate_leads': {
        planName:  '🔥 Agni Meta Ads Plan',
        price:     '₹17,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹9,999/mo',
        benefits:  [
          'Facebook + Instagram lead campaigns',
          'Custom audience targeting for property buyers',
          'Retargeting for warm leads',
          '10+ ad creatives per month',
          'Weekly performance reports'
        ],
      },
      'real_estate_website': {
        planName:  '🌐 Vriddhi Website Plan',
        price:     '₹19,999 (one-time)',
        utsav:     '🎁 Bodhi Utsav Price: ₹12,999',
        benefits:  [
          'Premium real estate website design',
          'Property listings section',
          'Lead capture forms',
          'Google Maps integration',
          'Mobile-first & SEO optimized'
        ],
      },
      'real_estate_gmb': {
        planName:  '📍 Unnati GMB Plan',
        price:     '₹9,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹5,999/mo',
        benefits:  [
          'Google My Business optimization',
          'Local SEO for your city',
          'Review management strategy',
          'Google Maps ranking boost',
          'Monthly GMB posts'
        ],
      },
      'real_estate_roas': {
        planName:  '🎯 Google Ads — Prakash Plan',
        price:     '₹14,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹8,999/mo',
        benefits:  [
          'Google Search Ads for property keywords',
          'Display retargeting campaigns',
          'Conversion tracking setup',
          'Landing page optimization',
          'ROAS-focused bid strategy'
        ],
      },
      'real_estate_complete': {
        planName:  '🔱 Sampoorna Utsav Bundle',
        price:     '₹17,999/mo (Worth ₹59,996)',
        utsav:     '🎁 70% OFF — Limited time launch offer!',
        benefits:  [
          'Website + Meta Ads + Google Ads + GMB',
          'Everything in one package',
          'Complete digital presence',
          'Dedicated account manager',
          'Monthly strategy call with Aniket'
        ],
      },
      'restaurant_leads': {
        planName:  '📢 Jyoti Meta Ads + GMB Combo',
        price:     '₹15,998/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹9,999/mo',
        benefits:  [
          'Facebook + Instagram food ads',
          'Google My Business optimization',
          'Weekend special promotions',
          'Zomato/Swiggy review strategy',
          'Foot traffic + delivery orders'
        ],
      },
      'restaurant_website': {
        planName:  '🌐 Vriddhi Restaurant Website',
        price:     '₹19,999 (one-time)',
        utsav:     '🎁 Bodhi Utsav Price: ₹12,999',
        benefits:  [
          'Menu display with photos',
          'Online table reservation',
          'Delivery/takeaway info',
          'Instagram feed integration',
          'SEO optimized for local search'
        ],
      },
      'restaurant_gmb': {
        planName:  '📍 Unnati GMB Plan',
        price:     '₹9,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹5,999/mo',
        benefits:  [
          'Rank #1 on "restaurants near me"',
          'Review management & response',
          'Google Posts for daily specials',
          'Menu update on GMB',
          'Photo optimization'
        ],
      },
      'healthcare_leads': {
        planName:  '📢 Meta Ads — Jyoti Plan',
        price:     '₹7,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹4,999/mo',
        benefits:  [
          'Patient acquisition campaigns',
          'Targeted health condition ads',
          'Appointment booking setup',
          'WhatsApp inquiry integration',
          'HIPAA-compliant ad creatives'
        ],
      },
      'healthcare_gmb': {
        planName:  '📍 Local SEO + GMB Plan',
        price:     '₹9,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹5,999/mo',
        benefits:  [
          'Rank for "[specialty] near me"',
          'Google Maps top 3 position',
          'Patient review strategy',
          'Doctor profile optimization',
          'Local citation building'
        ],
      },
      'education_leads': {
        planName:  '📢 Meta Ads — Agni Plan',
        price:     '₹17,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹9,999/mo',
        benefits:  [
          'Student lead generation campaigns',
          'Course/batch promotion ads',
          'Retargeting for interested students',
          'WhatsApp lead integration',
          "Admission season strategy"
        ],
      },
      'education_website': {
        planName:  '🌐 Education Website Plan',
        price:     '₹19,999 (one-time)',
        utsav:     '🎁 Bodhi Utsav Price: ₹12,999',
        benefits:  [
          'Course listing pages',
          'Student testimonials section',
          'Online enrollment form',
          'Faculty profile pages',
          'Result showcase section'
        ],
      },
      'ecommerce_leads': {
        planName:  '🎯 Meta + Google Ads Combo',
        price:     '₹29,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹17,999/mo',
        benefits:  [
          'Product catalog ads on Facebook',
          'Google Shopping campaigns',
          'Dynamic retargeting',
          'Abandoned cart recovery ads',
          'ROAS optimization'
        ],
      },
      'ecommerce_roas': {
        planName:  '🎯 Google Shopping + Meta Catalog',
        price:     '₹29,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹17,999/mo',
        benefits:  [
          'Google Shopping campaigns',
          'Dynamic product ads on Meta',
          'Conversion tracking full setup',
          'Product feed optimization',
          'ROAS target: 4X minimum'
        ],
      },
      'fitness_leads': {
        planName:  '📢 Meta Ads — Jyoti Plan',
        price:     '₹7,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹4,999/mo',
        benefits:  [
          'Gym membership campaigns',
          'Before/after transformation ads',
          'Local area targeting',
          'Trial offer promotions',
          'Seasonal fitness campaigns'
        ],
      },
      'jewellery_leads': {
        planName:  '📢 Meta Ads — Agni Plan',
        price:     '₹17,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹9,999/mo',
        benefits:  [
          'High-quality jewellery ad creatives',
          'Festive season campaigns',
          'Bridal collection promotions',
          'Instagram Shopping setup',
          'Custom audience for buyers'
        ],
      },
      'fashion_leads': {
        planName:  '📢 Meta Ads — Jyoti Plan',
        price:     '₹7,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹4,999/mo',
        benefits:  [
          'Fashion catalog ads on Instagram',
          'Reels ad campaigns',
          'Collection launch promotions',
          'Influencer collaboration strategy',
          'Seasonal sale campaigns'
        ],
      },
      'hospitality_leads': {
        planName:  '📢 Meta + Google Ads Combo',
        price:     '₹22,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹13,999/mo',
        benefits:  [
          'Hotel booking campaigns',
          'Google Hotels integration',
          'Travel season targeting',
          'Package promotion ads',
          'Review management'
        ],
      },
      'automobile_leads': {
        planName:  '📢 Meta + Google Ads Combo',
        price:     '₹22,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹13,999/mo',
        benefits:  [
          'Car buyer lead campaigns',
          'Service appointment ads',
          'Local dealership targeting',
          'Test drive booking setup',
          'Finance offer promotions'
        ],
      },
      'professional_leads': {
        planName:  '📢 Meta Ads — Jyoti Plan',
        price:     '₹7,999/mo',
        utsav:     '🎁 Bodhi Utsav Price: ₹4,999/mo',
        benefits:  [
          'Professional service campaigns',
          'LinkedIn + Facebook targeting',
          'Lead form ads setup',
          'WhatsApp inquiry integration',
          'Trust-building ad strategy'
        ],
      },
      'manufacturing_leads': {
        planName:  '🌐 B2B Digital Presence Package',
        price:     '₹24,999 (one-time)',
        utsav:     '🎁 Bodhi Utsav Price: ₹14,999',
        benefits:  [
          'B2B focused website',
          'Product catalog with specs',
          'LinkedIn page optimization',
          'IndiaMart / TradeIndia setup',
          'Google Business Profile'
        ],
      },
      'default': {
        planName:  '🔱 Custom Growth Strategy',
        price:     'Custom Quote',
        utsav:     '🎁 Free consultation included',
        benefits:  [
          'Personalized strategy for your business',
          'Multi-channel approach',
          'Free 30-minute consultation call',
          'Custom pricing available',
          'Bodhi Utsav discount applicable'
        ],
      },
      'complete': {
        planName:  '🔱 Sampoorna Utsav Bundle',
        price:     '₹17,999/mo (Worth ₹59,996)',
        utsav:     '🎁 70% OFF — Limited time launch offer!',
        benefits:  [
          'Website + Meta Ads + Google Ads + GMB',
          'Everything you need in one package',
          'Complete digital transformation',
          'Dedicated account manager',
          'Monthly strategy call with Aniket'
        ],
      },
    },
    pricingData: {
      website: [
        { tier: '🥉', name: 'Beej',    price: '₹9,999',  note: 'Basic'        },
        { tier: '🥈', name: 'Vriddhi', price: '₹19,999', note: '⭐ Popular'   },
        { tier: '🥇', name: 'Samridhi',price: '₹34,999', note: 'Premium'      },
      ],
      meta: [
        { tier: '🥉', name: 'Jyoti',   price: '₹7,999/mo',  note: 'Starter'      },
        { tier: '🥈', name: 'Agni',    price: '₹17,999/mo', note: '⭐ Popular'   },
        { tier: '🥇', name: 'Shakti',  price: '₹29,999/mo', note: 'Advanced'     },
      ],
      google: [
        { tier: '🥉', name: 'Prakash', price: '₹9,999/mo',  note: 'Starter'      },
        { tier: '🥈', name: 'Tej',     price: '₹14,999/mo', note: '⭐ Popular'   },
        { tier: '🥇', name: 'Surya',   price: '₹24,999/mo', note: 'Advanced'     },
      ],
      gmb: [
        { tier: '🥉', name: 'Beej',    price: '₹4,999/mo',  note: 'Basic'        },
        { tier: '🥈', name: 'Unnati',  price: '₹9,999/mo',  note: '⭐ Popular'   },
        { tier: '🥇', name: 'Pragati', price: '₹14,999/mo', note: 'Advanced'     },
      ],
    },
  };

  // ============================================================
  // WHATSAPP MESSAGE TEMPLATES
  // ============================================================

  const WA_TEMPLATES = {
    qualified: (data) =>
      `🙏 Namaste! I'm ${data.name}.

I got a recommendation from Bodhi Guru on your website.

📊 *My Details:*
• Business: ${data.industryName}
• Goal: ${data.goalText}
• Recommended Plan: ${data.recommendation}

Can you please share the complete details and pricing?

(Sent via Bodhi Guru Chatbot)`,

    talkHuman: () =>
      `🙏 Namaste Aniket!

I'd like to discuss digital marketing for my business.

Can we have a quick call or chat?

(Sent via Bodhi Guru Chatbot)`,

    pricing: (service) =>
      `🙏 Namaste!

I saw your ${service} pricing on the website and want to know more.

Can you share detailed pricing and what's included?

(Sent via Bodhi Guru Chatbot)`,

    explore: () =>
      `🙏 Namaste!

I was exploring your website and want to know more about your digital marketing services.

(Sent via Bodhi Guru Chatbot)`,

    exitGuide: () =>
      `🙏 Namaste!

I'd like the FREE "7-Step Growth Guide for Indian Businesses" that Bodhi Guru mentioned.

Please send it to me. Thank you!

(Sent via Bodhi Guru Chatbot)`,
  };

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 6  && hour < 12) return FLOW.greetings.morning;
    if (hour >= 12 && hour < 17) return FLOW.greetings.afternoon;
    if (hour >= 17 && hour < 21) return FLOW.greetings.evening;
    return FLOW.greetings.night;
  }

  function getPageContext() {
    const path = window.location.pathname;
    if (path.includes('pricing'))     return "Need help choosing the right plan?";
    if (path.includes('meta-ads'))    return "Want to see how Meta Ads grows your business?";
    if (path.includes('google-ads'))  return "Curious about Google Ads ROI for your business?";
    if (path.includes('gmb'))         return "Want to rank #1 on Google Maps?";
    if (path.includes('web'))         return "Looking for a premium website?";
    if (path.includes('utsav'))       return "🎉 You found our exclusive Bodhi Utsav offer!";
    if (path.includes('blog'))        return "Enjoyed the article? Want personalized advice?";
    return "Looking to grow your business online?";
  }

  function getRecommendationKey(industry, goal) {
    if (goal === 'complete') return 'complete';
    if (goal === 'advice')   return 'default';
    if (industry === 'other') return 'default';
    const key = `${industry}_${goal}`;
    return FLOW.recommendations[key] ? key : `${industry}_leads`;
  }

  function buildWhatsAppURL(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.ownerWhatsApp}?text=${encoded}`;
  }

  function openWhatsApp(message) {
    const url = buildWhatsAppURL(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function trackEvent(name, params) {
    try {
      if (typeof gtag === 'function') {
        gtag('event', name, { event_category: 'chatbot', ...params });
      }
    } catch (e) {}
    try {
      if (typeof fbq === 'function' && name === 'chatbot_lead') {
        fbq('track', 'Lead', { content_name: 'Bodhi Guru Chatbot' });
      }
    } catch (e) {}
  }

  const Storage = {
    get: (key) => {
      try { return JSON.parse(localStorage.getItem(key)); }
      catch (e) { return null; }
    },
    set: (key, val) => {
      try { localStorage.setItem(key, JSON.stringify(val)); }
      catch (e) {}
    },
  };

  // ============================================================
  // MAIN CHATBOT CLASS
  // ============================================================

  class BodhiGuru {
    constructor() {
      this.widget        = document.getElementById('bodhi-guru-widget');
      this.triggerBtn    = document.getElementById('bg-trigger-btn');
      this.chatWindow    = document.getElementById('bg-chat-window');
      this.previewBubble = document.getElementById('bg-preview-bubble');
      this.previewClose  = document.getElementById('bg-preview-close');
      this.messagesEl    = document.getElementById('bg-messages');
      this.buttonsEl     = document.getElementById('bg-buttons');
      this.inputArea     = document.getElementById('bg-input-area');
      this.inputField    = document.getElementById('bg-input-field');
      this.sendBtn       = document.getElementById('bg-send-btn');
      this.minimizeBtn   = document.querySelector('.bg-minimize-btn');
      this.closeBtn      = document.querySelector('.bg-close-btn');
      this.notifDot      = document.querySelector('.bg-notification-dot');

      this.isOpen         = false;
      this.isTyping       = false;
      this.currentStage   = 'greeting';
      this.inputMode      = null; 
      this.messageQueue   = [];
      this.isProcessing   = false;

      this.userData = {
        name:           '',
        industry:       '',
        industryName:   '',
        goal:           '',
        goalText:       '',
        recommendation: '',
        planName:       '',
        timestamp:      new Date().toISOString(),
        pageUrl:        window.location.href,
        device:         /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      };

      this.visitorData = Storage.get(CONFIG.storageKey) || {
        visitCount:    0,
        lastVisit:     null,
        chatCompleted: false,
        dismissed:     false,
      };

      this.visitorData.visitCount++;
      this.visitorData.lastVisit = Date.now();
      Storage.set(CONFIG.storageKey, this.visitorData);

      const sessionVal = sessionStorage.getItem(CONFIG.sessionKey);
      this.sessionDismissed = sessionVal === 'true';
    }

    init() {
      if (!this.widget) return;
      this.attachEventListeners();
      this.scheduleTrigger();
      trackEvent('chatbot_loaded', { visit_count: this.visitorData.visitCount });
    }

    attachEventListeners() {
      this.triggerBtn.addEventListener('click', () => this.toggleChat());
      this.triggerBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleChat();
        }
      });

      if (this.previewBubble) {
        this.previewBubble.addEventListener('click', () => this.openChat());
      }
      if (this.previewClose) {
        this.previewClose.addEventListener('click', (e) => {
          e.stopPropagation();
          this.hidePreviewBubble(true);
        });
      }

      this.minimizeBtn.addEventListener('click', () => this.minimizeChat());
      this.closeBtn.addEventListener('click', () => this.closeChat());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.minimizeChat();
      });

      this.inputField.addEventListener('input', () => this.onInputChange());
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !this.sendBtn.disabled) this.handleInputSubmit();
      });

      this.sendBtn.addEventListener('click', () => this.handleInputSubmit());
    }

    toggleChat() {
      if (this.isOpen) {
        this.minimizeChat();
      } else {
        this.openChat();
      }
    }

    scheduleTrigger() {
      setTimeout(() => {
        if (!this.isOpen) {
          this.showPreviewBubble();
        }
      }, CONFIG.triggerDelay);
    }

    showPreviewBubble() {
      if (this.previewBubble && !this.isOpen) {
        this.previewBubble.style.display = 'block';
        this.triggerBtn.classList.add('bg-bounce');
        if (this.notifDot) this.notifDot.style.display = 'block';
        
        setTimeout(() => {
          this.triggerBtn.classList.remove('bg-bounce');
        }, 3000);
      }
    }

    hidePreviewBubble(dismissPermanently = false) {
      if (this.previewBubble) {
        this.previewBubble.style.display = 'none';
      }
      if (dismissPermanently) {
        sessionStorage.setItem('bodhi_guru_preview_dismissed', 'true');
        if (this.notifDot) this.notifDot.style.display = 'none';
      }
    }

    openChat(isExitIntent = false) {
      if (this.isOpen) return;
      this.isOpen = true;

      // Hide preview bubble immediately when chat window opens
      this.hidePreviewBubble();

      this.triggerBtn.setAttribute('aria-expanded', 'true');
      this.triggerBtn.classList.add('bg-chat-open');

      this.chatWindow.classList.add('bg-open');
      this.chatWindow.removeAttribute('hidden');
      this.chatWindow.classList.add('bg-slide-in');

      if (this.notifDot) this.notifDot.style.display = 'none';

      if (isExitIntent) {
        this.startExitFlow();
      } else {
        this.startConversation();
      }

      trackEvent('chatbot_opened', {
        visit_count:  this.visitorData.visitCount,
        exit_intent:  isExitIntent,
        page:         window.location.pathname,
      });
    }

    minimizeChat() {
      this.isOpen = false;
      this.chatWindow.classList.remove('bg-slide-in');
      this.chatWindow.classList.add('bg-slide-out');
      this.triggerBtn.setAttribute('aria-expanded', 'false');
      this.triggerBtn.classList.remove('bg-chat-open');

      setTimeout(() => {
        this.chatWindow.classList.remove('bg-open');
        this.chatWindow.setAttribute('hidden', '');
        this.chatWindow.classList.remove('bg-slide-out');
      }, 300);
    }

    closeChat() {
      this.minimizeChat();
      sessionStorage.setItem(CONFIG.sessionKey, 'true');
      this.sessionDismissed = true;
      this.hidePreviewBubble(true);
      this.triggerBtn.classList.remove('bg-bounce');
      trackEvent('chatbot_closed', { stage: this.currentStage });
    }

    // ----------------------------------------------------------
    // CONVERSATION FLOW ENGINE
    // ----------------------------------------------------------

    startConversation() {
      this.clearMessages();
      this.currentStage = 'greeting';

      const greeting = getGreeting();
      const context  = getPageContext();

      const messages = [
        greeting,
        "I'm Bodhi Guru, your growth consultant. 🙏",
        context,
      ];

      if (this.visitorData.visitCount > 2) {
        messages[2] = "Welcome back! 👋 Ready to scale your business?";
      }

      this.sendSequentialMessages(messages, () => {
        this.showButtons(FLOW.openingButtons, (action) => {
          this.handleOpeningAction(action);
        });
      });
    }

    startExitFlow() {
      this.clearMessages();
      this.currentStage = 'exit_intent';

      const messages = [
        "Wait! 🙏 Before you go...",
        "Get our FREE '7-Step Growth Guide for Indian Businesses'",
        "(Usually ₹499 value — yours completely free!)",
      ];

      this.sendSequentialMessages(messages, () => {
        this.showButtons([
          { text: '📖 Yes, send it to me!', action: 'exit_guide_yes' },
          { text: '❌ No thanks',            action: 'exit_guide_no'  },
        ], (action) => {
          this.handleExitAction(action);
        });
      });
    }

    handleOpeningAction(action) {
      switch (action) {
        case 'start_qualify': this.startQualification();    break;
        case 'show_pricing':  this.showPricingMenu();       break;
        case 'talk_human':    this.talkToHuman();           break;
        case 'explore':       this.exploreMode();           break;
      }
    }

    handleExitAction(action) {
      if (action === 'exit_guide_yes') {
        this.addUserMessage('📖 Yes, send it to me!');
        const msg = WA_TEMPLATES.exitGuide();
        openWhatsApp(msg);
        this.sendSequentialMessages([
          "Opening WhatsApp... 📱",
          "Aniket will send your free guide shortly! 🎁",
        ]);
        trackEvent('chatbot_exit_guide_requested');
      } else {
        this.addUserMessage('❌ No thanks');
        this.sendSequentialMessages([
          "No worries! 😊",
          "Enjoy your day. Namaste! 🙏",
        ]);
      }
    }

    // ----------------------------------------------------------
    // STAGES
    // ----------------------------------------------------------

    startQualification() {
      this.addUserMessage('🚀 Help me grow!');
      this.currentStage = 'qualify_ready';
      this.sendSequentialMessages([
        "Awesome! I'll ask 2 quick questions to find you the perfect solution.",
        "Takes just 15 seconds. Ready? ✅",
      ], () => {
        this.showIndustryButtons();
      });
    }

    showIndustryButtons() {
      this.currentStage = 'industry_select';
      this.sendSequentialMessages([FLOW.industryMessage], () => {
        this.showButtons(
          FLOW.industries.map(i => ({
            text: `${i.emoji} ${i.name}`,
            action: `industry_${i.id}`,
          })),
          (action) => {
            const industryId = action.replace('industry_', '');
            const industry   = FLOW.industries.find(i => i.id === industryId);
            this.userData.industry     = industryId;
            this.userData.industryName = industry ? industry.name : 'Other';
            this.addUserMessage(`${industry?.emoji || '✨'} ${this.userData.industryName}`);
            this.showGoalButtons();
          }
        );
      });
    }

    showGoalButtons() {
      this.currentStage = 'goal_select';

      const encouragements = {
        real_estate:   '🏢 Real estate is highly competitive. Let\'s get you high-quality buyer leads!',
        restaurant:    '🍽️ Food lovers search online daily. Let\'s drive footfalls to your tables!',
        healthcare:    '🏥 Patient trust is key. Let\'s optimize your local visibility!',
        education:     '🎓 Student enrollments scale fast with targeted local digital ads!',
        ecommerce:     '🛍️ E-commerce demands high-ROAS setups. Let\'s scale your sales!',
        jewellery:     '💎 Jewellery requires premium visual aesthetics in campaigns!',
        fitness:       '🏋️ Gym conversions scale with targeted local membership offers!',
        default:       '✅ Great! Let\'s target your primary objective.',
      };

      const msg = encouragements[this.userData.industry] || encouragements.default;

      this.sendSequentialMessages([msg, FLOW.goalMessage], () => {
        this.showButtons(
          FLOW.goals.map(g => ({
            text:   `${g.emoji} ${g.text}`,
            action: `goal_${g.id}`,
          })),
          (action) => {
            const goalId   = action.replace('goal_', '');
            const goal     = FLOW.goals.find(g => g.id === goalId);
            this.userData.goal     = goalId;
            this.userData.goalText = goal ? goal.text : '';
            this.addUserMessage(`${goal?.emoji || '💡'} ${this.userData.goalText}`);
            this.showRecommendation();
          }
        );
      });
    }

    showRecommendation() {
      this.currentStage = 'recommendation';
      const recKey = getRecommendationKey(this.userData.industry, this.userData.goal);
      const rec    = FLOW.recommendations[recKey] || FLOW.recommendations['default'];

      this.userData.recommendation = rec.planName;
      this.userData.planName       = rec.planName;

      const benefitsText = rec.benefits.map(b => `• ${b}`).join('\n');

      const messages = [
        `Perfect! Here is our recommendation:`,
        `⭐ *${rec.planName}*\n💵 Standard: ${rec.price}\n✨ ${rec.utsav}`,
        `*Deliverables included:*\n${benefitsText}`,
        `🛡️ Backed by our Pay-After-Seeing™ protection plan!`,
      ];

      this.sendSequentialMessages(messages, () => {
        this.showButtons([
          { text: '💬 Get Details on WhatsApp', action: 'get_details'    },
          { text: '📋 See Other Plans',          action: 'other_options'  },
          { text: '📞 Talk to Aniket',           action: 'talk_direct'    },
        ], (action) => {
          this.handleRecommendationAction(action);
        });
      });
    }

    handleRecommendationAction(action) {
      if (action === 'get_details') {
        this.captureNameThenWhatsApp();
      } else if (action === 'other_options') {
        this.showPricingMenu();
      } else if (action === 'talk_direct') {
        this.talkToHuman();
      }
    }

    captureNameThenWhatsApp() {
      this.currentStage = 'name_capture';
      this.sendSequentialMessages([
        "I'll connect you directly to Aniket's WhatsApp so we can share complete proposals.",
        "What is your name, please?",
      ], () => {
        this.showInputField('name', 'Enter your name...');
      });
    }

    onInputChange() {
      const val = this.inputField.value.trim();
      this.sendBtn.disabled = val.length < 2;
    }

    handleInputSubmit() {
      const val = this.inputField.value.trim();
      if (!val || val.length < 2) return;

      if (this.inputMode === 'name') {
        this.userData.name = this.sanitizeName(val);
        this.addUserMessage(this.userData.name);
        this.hideInputField();
        this.sendToWhatsApp();
      }
    }

    sanitizeName(name) {
      return name
        .replace(/[^a-zA-Z\u0900-\u097F\s]/g, '')
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase());
    }

    sendToWhatsApp() {
      this.currentStage = 'whatsapp_redirect';
      const message = WA_TEMPLATES.qualified(this.userData);

      this.sendSequentialMessages([
        `Nice meeting you, ${this.userData.name}! 🙏`,
        "Opening WhatsApp with your pre-filled inquiry details...",
        "Aniket will respond immediately.",
      ], () => {
        openWhatsApp(message);
        this.showConfirmation();

        this.visitorData.chatCompleted = true;
        Storage.set(CONFIG.storageKey, this.visitorData);

        trackEvent('chatbot_lead', {
          industry:   this.userData.industry,
          goal:       this.userData.goal,
          plan:       this.userData.planName,
        });
      });
    }

    showConfirmation() {
      this.sendSequentialMessages([
        "Inquiry initialized! WhatsApp redirection complete.",
        "While waiting, you can explore:",
      ], () => {
        this.showButtons([
          { text: '🏆 Success Stories',     action: 'goto_testimonials' },
          { text: '💰 Service Retainers',   action: 'goto_pricing'      },
          { text: '🔱 Bodhi Utsav Offer',   action: 'goto_utsav'        },
        ], (action) => {
          this.handlePostLeadAction(action);
        });
      });
    }

    handlePostLeadAction(action) {
      const routes = {
        goto_testimonials: '/testimonials/',
        goto_pricing:      '/pricing/',
        goto_utsav:        '/bodhi-utsav/',
      };
      if (routes[action]) {
        window.location.href = routes[action];
      }
    }

    showPricingMenu() {
      this.addUserMessage('💰 Show me pricing');
      this.currentStage = 'pricing';
      this.sendSequentialMessages(["Which pricing details would you like to see?"], () => {
        this.showButtons([
          { text: '🌐 Web Design',       action: 'price_website' },
          { text: '📢 Meta Ads',          action: 'price_meta'    },
          { text: '🔍 Google Ads',        action: 'price_google'  },
          { text: '📍 Google Map SEO',   action: 'price_gmb'     },
          { text: '🔱 Bodhi Utsav Bundle',action: 'price_utsav'  },
        ], (action) => {
          this.showPricingDetail(action);
        });
      });
    }

    showPricingDetail(action) {
      if (action === 'price_utsav') {
        this.sendSequentialMessages([
          "🔱 *Sampoorna Utsav Bundle* (Worth ₹59,996)\n🔥 Bodhi Utsav Promo: *₹17,999/mo*",
          "Includes:\n✅ 7-Page High-Speed Site\n✅ Meta Ads Management\n✅ Google Ads Setup\n✅ GMB Map Optimization\n✅ Full Conversion Tracking API",
        ], () => {
          this.showButtons([
            { text: '💬 Claim Utsav Deal',  action: 'claim_utsav' },
            { text: '📋 Back to Pricing',   action: 'show_pricing' },
          ], (a) => {
            if (a === 'claim_utsav') {
              this.userData.recommendation = 'Sampoorna Utsav Bundle';
              this.userData.planName       = 'Sampoorna Utsav Bundle';
              this.captureNameThenWhatsApp();
            } else {
              this.showPricingMenu();
            }
          });
        });
        return;
      }

      const map = {
        price_website: { key: 'website', label: 'Web Design' },
        price_meta:    { key: 'meta',    label: 'Meta Ads' },
        price_google:  { key: 'google',  label: 'Google Ads' },
        price_gmb:     { key: 'gmb',     label: 'GMB Optimization' },
      };

      const item = map[action];
      if (!item) return;

      const plans = FLOW.pricingData[item.key];
      const planText = plans.map(p => `${p.tier} *${p.name}*: ${p.price} ${p.note ? `(${p.note})` : ''}`).join('\n');

      this.sendSequentialMessages([
        `*${item.label} Plans:*`,
        planText,
        "Would you like to enquire about these services?",
      ], () => {
        this.showButtons([
          { text: '💬 Get Custom Quote', action: 'get_quote' },
          { text: '📄 View Retainers Page', action: 'goto_pricing' },
          { text: '← Back to Services',    action: 'show_pricing' },
        ], (a) => {
          if (a === 'get_quote') {
            this.userData.recommendation = `${item.label} Quote`;
            this.userData.planName       = `${item.label} Quote`;
            this.captureNameThenWhatsApp();
          } else if (a === 'goto_pricing') {
            window.location.href = '/pricing/';
          } else {
            this.showPricingMenu();
          }
        });
      });
    }

    talkToHuman() {
      this.addUserMessage('📞 Talk to Aniket');
      this.sendSequentialMessages([
        "Connecting you directly with Aniket... 🙏",
        "Opening WhatsApp window...",
      ], () => {
        openWhatsApp(WA_TEMPLATES.talkHuman());
        trackEvent('chatbot_talk_human');
      });
    }

    exploreMode() {
      this.addUserMessage('💭 Just exploring');
      this.sendSequentialMessages([
        "No problem! 😊 Take your time and explore RoasBodhi.",
        "If you want to discuss digital growth later, just select any option here:",
      ], () => {
        this.showButtons([
          { text: '🚀 Yes, help me grow!', action: 'start_qualify' },
          { text: '💰 Show me pricing',    action: 'show_pricing'   },
          { text: '📞 Talk to Aniket',     action: 'talk_human'     },
        ], (action) => {
          this.handleOpeningAction(action);
        });
      });
    }

    // ----------------------------------------------------------
    // MESSAGE RENDERING & UI HELPERS
    // ----------------------------------------------------------

    clearMessages() {
      this.messagesEl.innerHTML = '';
    }

    addBotMessage(text) {
      return new Promise((resolve) => {
        this.showTypingIndicator();
        
        const delay = text.length > 50 ? CONFIG.typingSpeedLong : CONFIG.typingSpeedShort;

        setTimeout(() => {
          this.hideTypingIndicator();

          const msg = document.createElement('div');
          msg.className = 'bg-message bg-msg-bot';
          
          const formatted = text.replace(/\n/g, '<br/>');
          msg.innerHTML = `<p>${formatted}</p>`;
          
          this.messagesEl.appendChild(msg);
          this.scrollToBottom();
          resolve(true);
        }, delay);
      });
    }

    addUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'bg-message bg-msg-user';
      msg.innerHTML = `<p>${text}</p>`;
      this.messagesEl.appendChild(msg);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      if (document.querySelector('.bg-typing')) return;
      const ind = document.createElement('div');
      ind.className = 'bg-message bg-msg-bot bg-typing';
      ind.innerHTML = `<div class="bg-typing-dots"><span class="bg-dot"></span><span class="bg-dot"></span><span class="bg-dot"></span></div>`;
      this.messagesEl.appendChild(ind);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const ind = document.querySelector('.bg-typing');
      if (ind) ind.remove();
    }

    sendSequentialMessages(messages, callback = null) {
      let index = 0;

      const next = () => {
        if (index < messages.length) {
          this.addBotMessage(messages[index]).then(() => {
            index++;
            next();
          });
        } else if (callback) {
          callback();
        }
      };

      next();
    }

    showButtons(buttons, callback) {
      this.hideButtons();
      buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'bg-opt-btn';
        button.innerText = btn.text;
        button.addEventListener('click', () => {
          this.hideButtons();
          callback(btn.action);
        });
        this.buttonsEl.appendChild(button);
      });
    }

    hideButtons() {
      this.buttonsEl.innerHTML = '';
    }

    scrollToBottom() {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }

    showInputField(mode, placeholder) {
      this.inputMode = mode;
      this.inputField.placeholder = placeholder;
      this.inputField.value       = '';
      this.sendBtn.disabled       = true;
      this.inputArea.removeAttribute('hidden');
      this.hideButtons();
      setTimeout(() => this.inputField.focus(), 50);
    }

    hideInputField() {
      this.inputArea.setAttribute('hidden', '');
      this.inputField.value = '';
      this.inputMode = null;
    }
  }

  function initGuru() {
    const guru = new BodhiGuru();
    guru.init();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initGuru();
  } else {
    window.addEventListener('load', initGuru);
  }

})();
