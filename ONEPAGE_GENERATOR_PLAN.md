# Sthapna Instant Website Generator Plan (DIY SaaS Concept)

This document contains the complete business model, product specifications, and technical architecture discussed for the new **One-Page Site Generator** prototype. It serves as the primary instructions file for the AI agent in the next chat session to build a working localhost demo in this directory.

---

## 1. Product & Business Model Specs

We are building an **Instant Website Builder** aimed at Indian local businesses (stores, salons, real estate, clinics).

### Tiers & Profit Margins

#### Tier 1: The Hook (₹1,999)
- **What they get**: 1-page highly optimized site + free `.in` domain (1st year) + free hosting.
- **Goal**: Impulse buy.
- **Unit Economics**:
  - Domain cost: ~₹350
  - AI tokens (Gemini 1.5 Flash): ~₹5
  - Marketing CAC (target ad spend per client): ~₹500
  - Razorpay Transaction fee: ~₹60
  - **Net Profit per client**: **~₹1,084 (54% profit margin)**

#### Tier 2: The GMB Upsell (₹4,999)
- **What they get**: Tier 1 package + Google My Business (GMB) / Google Maps profile verification and SEO optimization.
- **Upsell strategy**: Offered right before checkout on the website builder.
- **Unit Economics**:
  - Domain cost: ~₹350
  - AI tokens: ~₹5
  - GMB verification/VA labor cost: ~₹500
  - Marketing CAC: ~₹1,000 (slightly higher due to price)
  - Razorpay Transaction fee: ~₹150
  - **Net Profit per client**: **~₹2,994 (60% profit margin)**

---

## 2. Silent AI Integration (The Magic)

We do **not** market this as "AI-generated" to clients (this makes it feel cheap). Instead, we market it as **"Instant Professional Copywriting & Design."**

### How it works:
1. The user inputs minimal details:
   - **Business Name** (e.g. `Anant Dental Care`)
   - **Location** (e.g. `Kharghar, Navi Mumbai`)
   - **Main Description** (e.g. `We do teeth cleaning, root canal and whitening. Open everyday.`)
   - **Phone & WhatsApp Number**
2. In the background, a server/client-side script calls the AI API (Gemini 1.5 Flash) with a structured prompt.
3. The AI instantly generates:
   - A catchy, professional **Slogan** (e.g. *"Your Path to a Brighter, Healthier Smile in Kharghar"*)
   - Polished **About Copy** emphasizing safety, technology, and local reliability.
   - 3 structured **Services** with short descriptions.
   - 3 automated **FAQs** tailored to dental clinics.
4. The website preview updates instantly, displaying this professionally written content. The client is wowed because they didn't have to write anything.

---

## 3. Tech Architecture (Localhost Demo Goal)

To build the localhost demo, you should create a dedicated page (e.g., at `/instant-site/` or `/generator/`) containing:

### A. The Split-Screen Wizard UI
- **Left Column (The Input Form)**:
  - Step-by-step form asking for Business Name, Location, Description, Phone, WhatsApp, and Color Theme choice (e.g. Saffron Gold, Royal Indigo, Emerald Green, Charcoal Minimal).
- **Right Column (The Live Preview)**:
  - An iframe or inline DOM container styled to look like a mobile phone viewport.
  - It dynamically renders a clean, single-page Tailwind layout that updates immediately as the user types.

### B. Mock AI Copywriter
- Write a simple frontend JavaScript utility that uses mock JSON patterns (or a real API key call if available) to show how the raw inputs turn into professionally formatted headlines and sections.

---

## 4. Instructions for the Next Coding Session
1. **Initialize the Project**:
   - Run `npm install` inside this `OnePage` folder to install dependencies.
   - Run `npm run dev` to start the local development server at `http://localhost:4321`.
2. **Create the Generator Interface**:
   - Create a page `src/pages/instant-site.astro`.
   - Build the interactive split-screen form with real-time DOM bindings.
3. **Design the Single-Page Template**:
   - Create a customizable theme template that has sections for: Hero with CTAs, About, Services, Google Map placeholder, and WhatsApp quick-chat.
