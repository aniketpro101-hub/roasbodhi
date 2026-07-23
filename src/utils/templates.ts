export interface GeneratedWebsiteData {
  businessName: string;
  location: string;
  industry: string;
  slogan: string;
  subSlogan: string;
  about: string;
  badgeText: string;
  services: Array<{
    title: string;
    description: string;
    icon: string;
    price?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  gallerySearchQuery: string;
  contactPhone: string;
  contactWhatsapp: string;
  source: 'gemini' | 'template';
}

export function getFallbackTemplateData(
  businessName: string,
  location: string,
  industry: string,
  description: string,
  phone: string,
  whatsapp: string
): GeneratedWebsiteData {
  const loc = location || 'Your City';
  const name = businessName || 'Our Business';
  const desc = description.trim();

  switch (industry.toLowerCase()) {
    case 'clinic':
    case 'dental':
      return {
        businessName: name,
        location: loc,
        industry: 'clinic',
        slogan: `World-Class Healthcare & Patient Care in ${loc}`,
        subSlogan: `Your trusted medical destination. Professional treatment, pain-free procedures, and compassionate doctors near you.`,
        about: `${name} is a leading healthcare facility in ${loc}. We bring together experienced medical professionals, advanced diagnostic technology, and a warm, sterile environment. ${desc ? `Specialized in: "${desc}".` : 'Our goal is to deliver gentle, effective, and affordable care for patients of all ages.'}`,
        badgeText: '🏥 Certified Medical Facility',
        services: [
          {
            title: 'Comprehensive Diagnosis & Care',
            description: 'Advanced health checkups and personalized treatment plans using state-of-the-art equipment.',
            icon: 'Activity',
            price: 'Starts at ₹499'
          },
          {
            title: 'Painless Procedures & Surgery',
            description: 'Modern, minimally-invasive procedures performed with max precision for quick recovery.',
            icon: 'HeartPulse',
            price: 'Consultation ₹300'
          },
          {
            title: '24/7 Emergency Assistance',
            description: 'Immediate medical support and priority appointment booking for urgent health concerns.',
            icon: 'ShieldAlert',
            price: 'Priority Support'
          }
        ],
        faqs: [
          {
            question: `Where is ${name} located in ${loc}?`,
            answer: `We are conveniently situated in the heart of ${loc}. You can easily navigate to us using Google Maps or call us for exact directions.`
          },
          {
            question: 'How do I book an appointment?',
            answer: 'You can book directly via WhatsApp or phone call using the buttons on this page for instant confirmation.'
          },
          {
            question: 'What safety and hygiene standards do you follow?',
            answer: 'We follow strict WHO & IMA guidelines, ensuring complete sterilization of all equipment between patients.'
          }
        ],
        gallerySearchQuery: 'dental-clinic-doctor-medical',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'template'
      };

    case 'salon':
    case 'spa':
      return {
        businessName: name,
        location: loc,
        industry: 'salon',
        slogan: `Reinvent Your Style & Glow at ${name}`,
        subSlogan: `Premier hair styling, luxury skin therapies, and beauty makeover experiences in ${loc}.`,
        about: `Welcome to ${name}, ${loc}'s favorite luxury beauty & hair studio. We blend international styling techniques with premium organic products to give you a look that turns heads. ${desc ? `Our signature style: "${desc}".` : 'From bridal makeovers to everyday hair care, experience royal pampering.'}`,
        badgeText: '✨ Premium Beauty Studio',
        services: [
          {
            title: 'Designer Haircut & Styling',
            description: 'Precision cuts tailored to your face shape, coupled with deep nourishing hair spas.',
            icon: 'Scissors',
            price: 'Starts at ₹399'
          },
          {
            title: 'Glow Facials & Skin Therapy',
            description: 'Advanced organic facials and de-tan treatments to restore natural skin radiance.',
            icon: 'Sparkles',
            price: 'Starts at ₹799'
          },
          {
            title: 'Bridal & Party Makeover',
            description: 'HD Airbrush makeup and complete grooming packages for your special occasions.',
            icon: 'Crown',
            price: 'Custom Packages'
          }
        ],
        faqs: [
          {
            question: 'Do I need a prior appointment?',
            answer: 'Walk-ins are welcome, but we recommend booking via WhatsApp to ensure zero wait time.'
          },
          {
            question: 'Which beauty product brands do you use?',
            answer: 'We exclusively use top-tier dermatologist-tested products like L’Oréal Professional, Cheryl’s, and MAC.'
          },
          {
            question: `Are there unisex services at ${name}?`,
            answer: 'Yes! We offer professional grooming and styling services for both men and women.'
          }
        ],
        gallerySearchQuery: 'salon-beauty-hairdresser',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'template'
      };

    case 'cafe':
    case 'restaurant':
      return {
        businessName: name,
        location: loc,
        industry: 'cafe',
        slogan: `Fresh Flavors & Unforgettable Moments in ${loc}`,
        subSlogan: `Artisanal coffee, mouth-watering gourmet dishes, and cozy vibes at ${name}.`,
        about: `${name} is the premier hangout and dining spot in ${loc}. Crafted with passion, our kitchen uses locally sourced ingredients and authentic recipes. ${desc ? `What makes us special: "${desc}".` : 'Whether it is a quick coffee catchup or a family dinner, we serve warmth on every plate.'}`,
        badgeText: '☕ Rated #1 Local Food Spot',
        services: [
          {
            title: 'Artisanal Brews & Beverages',
            description: 'Handcrafted espresso shots, cold brews, and signature milkshakes brewed freshly.',
            icon: 'Coffee',
            price: 'From ₹120'
          },
          {
            title: 'Gourmet Snacks & Meals',
            description: 'Delicious wood-fired pizzas, artisan burgers, authentic pastas, and continental delights.',
            icon: 'Utensils',
            price: 'From ₹199'
          },
          {
            title: 'Party & Table Bookings',
            description: 'Reserve private seating for birthdays, team meetings, or intimate celebrations.',
            icon: 'GlassWater',
            price: 'Reserve Free'
          }
        ],
        faqs: [
          {
            question: `What are the opening hours for ${name}?`,
            answer: 'We are open 7 days a week from 10:00 AM to 11:00 PM.'
          },
          {
            question: 'Do you offer home delivery in ' + loc + '?',
            answer: 'Yes! You can order directly by sending us a message on WhatsApp for instant home delivery.'
          },
          {
            question: 'Do you have free Wi-Fi and power outlets?',
            answer: 'Yes, we provide high-speed complimentary Wi-Fi and laptop charging stations for remote workers.'
          }
        ],
        gallerySearchQuery: 'cafe-coffee-restaurant-food',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'template'
      };

    case 'gym':
    case 'fitness':
      return {
        businessName: name,
        location: loc,
        industry: 'gym',
        slogan: `Transform Your Body & Mind at ${name}`,
        subSlogan: `State-of-the-art workout equipment, certified personal trainers, and high-energy group classes in ${loc}.`,
        about: `${name} is the ultimate fitness hub in ${loc}. We empower members of all fitness levels to build strength, lose weight, and live healthier lives. ${desc ? `Our focus: "${desc}".` : 'Equipped with imported cardio & strength machines, AC floor, and nutrition guidance.'}`,
        badgeText: '💪 High Performance Fitness Center',
        services: [
          {
            title: 'Strength & Conditioning',
            description: 'Full range of free weights, power racks, and targeted cable machines for muscle growth.',
            icon: 'Dumbbell',
            price: 'Monthly ₹1,499'
          },
          {
            title: 'Personalized Coaching',
            description: '1-on-1 certified trainers designing customized workout routines and diet charts.',
            icon: 'Target',
            price: 'Custom Plan'
          },
          {
            title: 'Fat Loss & Cardio Zone',
            description: 'High-calorie burn treadmill zone, HIIT workouts, and spin cycling classes.',
            icon: 'Flame',
            price: 'Included'
          }
        ],
        faqs: [
          {
            question: 'Can I take a free trial workout session?',
            answer: 'Absolutely! Click the WhatsApp button to claim a 1-Day Free Trial Pass today.'
          },
          {
            question: 'What are the gym timings?',
            answer: 'We are open Morning 6:00 AM – 10:00 AM and Evening 5:00 PM – 10:00 PM (Monday to Saturday).'
          },
          {
            question: 'Is personal trainer guidance available for beginners?',
            answer: 'Yes, floor trainers are always available to teach proper exercise form and prevent injuries.'
          }
        ],
        gallerySearchQuery: 'gym-workout-fitness',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'template'
      };

    case 'realestate':
    case 'property':
      return {
        businessName: name,
        location: loc,
        industry: 'realestate',
        slogan: `Find Your Dream Property in ${loc}`,
        subSlogan: `RERA-approved residential flats, commercial shops, and investment plots with guaranteed high returns.`,
        about: `${name} is the most trusted real estate consultancy in ${loc}. With verified property listings, transparent legal paperwork, and 0% brokerage options, we make home buying seamless. ${desc ? `Highlights: "${desc}".` : 'Over 500+ happy families settled.'}`,
        badgeText: '🏢 Verified RERA Property Experts',
        services: [
          {
            title: 'Luxury 1/2/3 BHK Apartments',
            description: 'Spacious modern homes with clubhouses, swimming pools, and 24/7 security in prime locations.',
            icon: 'Building2',
            price: 'Starts @ ₹35L'
          },
          {
            title: 'Commercial Shops & Spaces',
            description: 'High-footfall retail units and office spaces ideal for businesses and rental income.',
            icon: 'Store',
            price: 'High ROI'
          },
          {
            title: 'Free Site Visits & Home Loans',
            description: 'Complimentary cab facility for site inspections and 100% home loan assistance from top banks.',
            icon: 'KeyRound',
            price: 'Zero Brokerage'
          }
        ],
        faqs: [
          {
            question: `Why buy property in ${loc}?`,
            answer: `${loc} is seeing rapid infrastructure development, making it a hot spot for rapid property appreciation.`
          },
          {
            question: 'Are home loans approved for these projects?',
            answer: 'Yes, all properties listed by us are pre-approved by major banks like SBI, HDFC, and ICICI.'
          },
          {
            question: 'How do I schedule a site visit?',
            answer: 'Just message us on WhatsApp with your preferred day, and we will arrange a pickup.'
          }
        ],
        gallerySearchQuery: 'real-estate-building-apartment',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'template'
      };

    default: // General Business / Coaching / Shop
      return {
        businessName: name,
        location: loc,
        industry: 'general',
        slogan: `Top-Rated Premium Services in ${loc}`,
        subSlogan: `Quality craftsmanship, reliable service, and 100% customer satisfaction guaranteed at ${name}.`,
        about: `${name} is a premier business serving clients across ${loc}. Built on trust, quality, and prompt support, we deliver excellence in every project. ${desc ? `Our focus: "${desc}".` : 'Contact us today to learn how we can assist you.'}`,
        badgeText: '⭐ Trusted Local Business',
        services: [
          {
            title: 'Premium Solutions',
            description: 'Customized services tailored specifically to meet your requirements with fast turnaround.',
            icon: 'CheckCircle2',
            price: 'Best Market Rates'
          },
          {
            title: 'Expert Consultation',
            description: 'Professional guidance and transparent pricing with no hidden charges.',
            icon: 'UserCheck',
            price: 'Free Guidance'
          },
          {
            title: 'Dedicated Customer Care',
            description: 'Priority support and quick resolution for all your service inquiries.',
            icon: 'Headphones',
            price: '24/7 Available'
          }
        ],
        faqs: [
          {
            question: `How can I get in touch with ${name}?`,
            answer: `Call us directly or send a WhatsApp message using the buttons below for immediate assistance in ${loc}.`
          },
          {
            question: 'What are your working hours?',
            answer: 'We operate Monday through Saturday from 9:00 AM to 8:00 PM.'
          },
          {
            question: 'Do you offer custom pricing quotes?',
            answer: 'Yes! Send us your requirement on WhatsApp, and we will provide an instant transparent quote.'
          }
        ],
        gallerySearchQuery: 'business-store-modern',
        contactPhone: phone || '+919999999999',
        contactWhatsapp: whatsapp || phone || '+919999999999',
        source: 'template'
      };
  }
}
