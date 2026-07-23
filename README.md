# 🔱 RoasBodhi™ - Performance Marketing & Web Design Agency

> **Philosophy:** Devotion to Data. Moksha to Metrics. 🔱

RoasBodhi (roasbodhi.in) is a world-class, programmatic-powered digital marketing and high-speed web design agency focused on local businesses and service industries across India.

---

## 🚀 Tech Stack

*   **Framework:** Astro.js v4 (Static Page generation)
*   **CSS Style styling:** Tailwind CSS (Strict class-only utility files)
*   **Vector Library:** Lucide Astro
*   **Third-party integration:** Partytown (Offloads GA4, GTM, and Microsoft Clarity tracking to web workers)
*   **Sitemaps:** Custom Python split index crawler (`src/scripts/generate_sitemap.py`)
*   **Deployment:** Cloudflare Pages (Headers and redirects configured natively)

---

## 📦 Directory Structure

```
RoasBodhi/
├── public/                 # Static assets, web manifests, and service workers
│   ├── _headers            # Cloudflare Pages security & caching headers
│   ├── _redirects          # URL trailing slash and old URL rules
│   └── sw.js               # Service worker for offline caching
├── src/
│   ├── components/         # Reusable UI widgets and section blocks
│   ├── content/            # Blog markdown collections and config schema
│   ├── data/               # JSON databases (505 cities, services, pricing)
│   ├── layouts/            # Page templates (Base, Page, Blog, Location)
│   ├── pages/              # Astro routing directories (static & programmatic)
│   ├── scripts/            # Python postbuild sitemap script
│   └── utils/              # TypeScript helpers (SEO, Schema, Content)
├── performance-budget.json  # Web vitals limit indicators
└── astro.config.mjs        # Master Astro integration configs
```

---

## 🛠️ Local Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run dev server:**
    ```bash
    npm run dev
    ```
3.  **Build production bundle:**
    ```bash
    npm run build
    ```
    *Note: The postbuild step automatically compiles all 3,573 static files and generates the split sitemap index files.*

---

## 📈 Programmatic SEO & Scale Math

Our platform generates **3,573 indexable static HTML pages** under a nested programmatic loop combining **505 distinct Indian cities** with **6 marketing services**:
*   **City hub pages:** `/locations/[city]/`
*   **Service-City dynamic pages:** `/[service]-agency-[city]/`
*   **State hub directories:** `/locations/[state]/`

To prevent duplicate content indexing penalties, every programmatic landing page references our **Content Template Generator** (`src/utils/content-generator.ts`) to inject unique local greetings, demographic stats, state commercial descriptions, and nearby town lists calculated dynamically using lat/long distance math.

---

## 🗺️ Split Sitemap Index System

Google Search Console limits single sitemaps to 50,000 URLs. To manage indexing efficiency, our Python sitemap compiler automatically divides paths into separate indexes:
*   `sitemap-pages.xml` (Static marketing pages)
*   `sitemap-blog.xml` (Blog posts and guide listings)
*   `sitemap-services.xml` (Service main detail pages)
*   `sitemap-locations.xml` (3,556 localized programmatic city links)
*   `sitemap-index.xml` (Master index submitted to Google)

---

## 🔒 Security & Caching Headers

Cloudflare Page caching rules are defined in `public/_headers`, implementing strict CSP policies, frame protection rules, and caching static assets (fonts, images) for up to 1 year (`immutable`).
