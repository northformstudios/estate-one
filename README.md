# ESTATE ONE — Premium Luxury Real Estate

An Apple-inspired, editorial-grade luxury real estate web platform built for high-net-worth property acquisition across prime enclaves in Lagos and Abuja, Nigeria.

Conceived as a showcase portfolio demonstration for a premium digital agency, **Estate One** exemplifies minimalist aesthetics, restrained glassmorphism, responsive typography, and tactile UI performance.

---

## 1. Visual & Architectural Design Philosophy

- **Color Palette**:
  - Background Canvas: `#F5F5F7` (Apple Light Ceramic)
  - Surface White: `#FFFFFF`
  - Deep Obsidian (Text & Brand): `#111318`
  - Secondary / Editorial Muted: `#737780`
  - Soft Accent: `#8EA9FF` (Periwinkle Ice, used with restraint)
  - Glass Surfacing: Ultra-thin frosted glass with `backdrop-filter: blur(20px)` and soft 1px hairline borders (`rgba(17, 19, 24, 0.06)`).
- **Typography**:
  - Headings: **Manrope** (geometric, architectural presence)
  - Body & Numbers: **Inter** (precision legibility, tabular numerals)
- **Aesthetic Principles**:
  - Generous whitespace and airy editorial layouts reminiscent of high-end architecture journals (*Architectural Digest*, *The Plan*).
  - Rounded corners (`1.5rem` / `2rem`), subtle ambient drop shadows, and deliberate micro-interactions on hover.
  - Zero cluttered dashboard noise or generic templates; every pixel breathes intention and exclusivity.

---

## 2. Page Architecture

1. **Home (`/`)**:
   - Hero with architectural imagery, brand headline *"Find a place that feels like yours."*, supporting narrative, and dual CTAs.
   - Minimalist quick-search interface (Location, Typology, Acquisition status).
   - Curated Featured Residences grid.
   - Editorial brand manifesto and craftsmanship spotlight.
   - Property Typology categories (Waterfront Villas, Sky Penthouses, Architectural Residences, Diplomatic Mansions).
   - "Why Estate One" four pillars of the private office standard.
   - Full-width dark bronze/obsidian call-to-action.
2. **Properties Catalogue (`/properties`)**:
   - 10 believable luxury listings across Lagos (*Banana Island, Old Ikoyi, Victoria Island, Lekki Phase 1, Eko Atlantic*) and Abuja (*Maitama, Asokoro, Guzape*).
   - Real-time search by keyword, title, neighborhood, or feature.
   - Multi-faceted filters:
     - Prime Enclave / Location
     - Property Typology (Villa, Penthouse, Architectural Residence, Mansion, Contemporary Duplex)
     - Status (*For Sale* vs. *For Rent / Executive Lease*)
     - Bedroom count chips (*All, 4+, 5+, 6+*)
     - Price range slider up to ₦6,000,000,000
   - Sorting by Featured, Price (Ascending/Descending), Bedroom count, and Year Built.
   - Instant filter reset, active counter, and empty state with off-market inquiry fallback.
3. **Property Details (`/properties/:slug`)**:
   - High-resolution interactive image gallery with full-screen lightbox, keyboard shortcuts (`Left`, `Right`, `Escape`), and thumbnail navigation.
   - Demonstration valuation banner in Nigerian Naira (₦).
   - Narrative architectural breakdown, distinguishing amenities checklist, and technical specifications grid.
   - Sticky Senior Partner Advisory card with direct telephone, email, and private consultation triggers.
   - Pre-screened title assurance badge (*Governor's Consent / FCDA C of O*).
   - Similar properties recommendation carousel.
   - LocalStorage-backed "Save Property" toggle and 1-click clipboard link sharing.
4. **About the Advisory (`/about`)**:
   - Agency manifesto and heritage story.
   - Senior Advisory Partners spotlight (*Amara Nnamani, Tariq Bello, Zainab Danjuma*).
   - Geographic Enclave analysis of Lagos and Abuja prime territories.
   - Confidentiality charter and due diligence guarantees.
5. **Request a Viewing (`/request-viewing`)**:
   - Dedicated private inspection booking form with automatic pre-population from listings (`?property=slug`).
   - Time window selection (*Morning*, *Afternoon*, *Twilight VIP*).
   - Viewing protocol breakdown: complimentary chauffeur, private non-disclosure protocol, and partner accompaniment.
   - Interactive validation with rich confirmation screen and demonstration mode notice.
6. **Contact Private Office (`/contact`)**:
   - Direct confidential inquiry form with inquiry typology router.
   - Physical office details for Ikoyi (Lagos) and Maitama (Abuja).
   - Direct private client telephone and concierge email routing.

---

## 3. Demonstration Data Notice

> **IMPORTANT DISCLAIMER**: All property names, valuations in Nigerian Naira (₦), specifications, and architectural imagery depicted within Estate One are conceptual and presented strictly for portfolio demonstration and digital agency exhibition purposes.

---

## 4. Getting Started & Installation

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ or v24+ recommended)
- **npm**: v9+ or later

### Exact Commands to Run

```bash
# 1. Navigate to the project directory
cd estate-one

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev

# The app will be available at http://localhost:5173/
```

### Production Build & Preview

```bash
# Build production bundle with TypeScript verification
npm run build

# Preview production build locally
npm run preview -- --port 4173

# Open http://localhost:4173/ in your browser
```

---

## 5. Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom glassmorphism utilities
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Manrope* + *Inter*)
- **Imagery**: Hand-curated, commercially usable high-resolution architectural photography via Unsplash

---

## 6. Project File Structure

```
estate-one/
├── public/
│   └── favicon.svg              # Minimalist architectural E1 monogram
├── src/
│   ├── components/
│   │   ├── DemoDisclaimerBanner.tsx # Top dismissible portfolio notice
│   │   ├── Footer.tsx               # Global footer with locations & legal
│   │   ├── Header.tsx               # Glass navigation header with mobile drawer
│   │   ├── ImageGalleryModal.tsx    # Working lightbox viewer with thumbnails
│   │   ├── PropertyCard.tsx         # Reusable luxury card with save/view actions
│   │   └── ScrollToTop.tsx          # Smooth route change scroll reset
│   ├── data/
│   │   └── properties.ts            # 10 rich sample properties & categories
│   ├── pages/
│   │   ├── About.tsx                # Heritage, leadership, & enclave analysis
│   │   ├── Contact.tsx              # Private office contact & inquiry dispatch
│   │   ├── Home.tsx                 # Hero, search, featured, narrative, CTA
│   │   ├── Properties.tsx           # Multi-faceted filter & sorting catalogue
│   │   ├── PropertyDetails.tsx      # Comprehensive listing page & lightbox
│   │   └── RequestViewing.tsx       # Viewing booking with chauffeur & protocol
│   ├── types/
│   │   └── index.ts                 # Clean TypeScript models and interfaces
│   ├── App.tsx                      # Route declarations and layout shell
│   ├── index.css                    # Tailwind v4, glassmorphism, scrollbars
│   └── main.tsx                     # React application entry
├── index.html                       # SEO title, OpenGraph tags, Google Fonts
├── package.json                     # Scripts and dependencies
├── tsconfig.json                    # TypeScript compiler configuration
└── vite.config.ts                   # Vite + Tailwind v4 + React plugin setup
```

---

## 7. Connecting a Real Backend Email Service

In this demonstration edition, form submissions run in simulated client mode with instant UI feedback and booking summary generation.

To connect a live production email service, use one of the following approaches:

### Option A: Resend (Recommended)
1. Install Resend:
   ```bash
   npm install resend
   ```
2. Create an API route (e.g., using Next.js, Cloudflare Workers, or Express):
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function sendViewingNotification(bookingData) {
     await resend.emails.send({
       from: 'Estate One Concierge <concierge@estateone.luxury>',
       to: ['privateoffice@estateone.luxury', bookingData.email],
       subject: `Private Viewing Request: ${bookingData.propertyTitle}`,
       html: `
         <h1>Viewing Itinerary Confirmation</h1>
         <p><strong>Client:</strong> ${bookingData.name}</p>
         <p><strong>Property:</strong> ${bookingData.propertyTitle}</p>
         <p><strong>Date:</strong> ${bookingData.preferredDate}</p>
         <p><strong>Window:</strong> ${bookingData.preferredTime}</p>
         <p><strong>Phone:</strong> ${bookingData.phone}</p>
       `,
     });
   }
   ```

### Option B: EmailJS (Client-Side Direct)
1. Install `@emailjs/browser`:
   ```bash
   npm install @emailjs/browser
   ```
2. Initialize with your Public Key and trigger in `handleSubmit` in `RequestViewing.tsx` and `Contact.tsx`.

---

## 8. Deployment Guide

### Vercel
```bash
npm install -g vercel
vercel
```
Set Build Command: `npm run build` and Output Directory: `dist`. Add a `vercel.json` rewrite rule for single-page routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify
Set Publish directory: `dist`. Create a `public/_redirects` file:
```
/*    /index.html   200
```

---

## 9. Features Requiring External Services in Production

| Feature | Current Demo State | Production External Service Required |
| :--- | :--- | :--- |
| **Viewing Dispatch** | Simulated modal confirmation with booking summary | **Resend** or **SendGrid** API for transactional email delivery |
| **CRM Integration** | Local state capture | **HubSpot** or **Salesforce** Private Client pipeline webhook |
| **Dynamic Title Search** | Hardcoded verified title tags | National Land Registry API / FCDA e-land registry check |
| **Live Currency Conversion** | Naira (₦) display valuations | **Open Exchange Rates** API for live USD / GBP / EUR conversion |
| **SMS Notifications** | Front-end phone validation | **Twilio** or **Termii** SMS gateway for VIP chauffeur updates |

---

*Engineered with precision for Estate One Private Office.*
