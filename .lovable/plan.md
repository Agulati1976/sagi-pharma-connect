## SAGI Pharmaceutical Website

A professional, SSR-ready multi-page marketing site built with TanStack Start. Medical blue & white palette (#0c2340 / #2e6b8a / #e8f0f8 / #ffffff), Space Grotesk headings + DM Sans body.

### Pages (separate routes, each with own SEO head)

1. **`/` Home (`src/routes/index.tsx`)**
   - Sticky header with logo + nav (Home, About, Products, Contact)
   - Hero: "Your Health, Our Commitment" tagline, primary CTA → Products, secondary → Contact
   - Trust strip: 24+ formulations, Delhi-based, pan-India reach
   - "Therapeutic Areas" grid (6 cards: Bone & Joint Care, Gastro Care, Pain Management, Anti-Infectives, Nutraceuticals, Neuro Care)
   - Featured products (6 cards: Sagical Strong, Sagpro-LB, Sagheal, Sagpro-DSR, Sagly Max, Sagitra-100)
   - "Why SAGI" section (Quality, Research-backed, Wide Portfolio, Trusted Partners)
   - CTA band → Contact
   - Footer with contact info

2. **`/about` About (`src/routes/about.tsx`)**
   - Company intro paragraph (Delhi-based pharmaceutical company committed to quality healthcare formulations)
   - Mission / Vision / Values cards
   - "What we do" — manufacturing & distribution across therapeutic categories
   - Stats (24+ products, 7+ categories, etc.)

3. **`/products` Products (`src/routes/products.tsx`)**
   - Page heading + intro
   - **Category filter chips**: All / Bone & Joint / Gastro / Pain & Inflammation / Neuro / Anti-Infective / Nutraceutical / Respiratory / Allergy
   - **Grid of all 24 products** as cards (name, composition, category badge, form: Tablet/Capsule/Syrup)
   - Client-side filter using `useState`
   - Products list seeded from `src/data/products.ts`:
     - Q-SAG-PLUS, SAGPRO-LB, SAGHEAL, Sagical Strong, Sagical-Forte, SAGLY-PLUS, Tromisag-Forte, ACESAG-CH, ACESAG-TH, ACESAG-SP, SAGPIN-100/400, SAGPIN-NT 200, SAGLY-MAX, Sagnor-PG, Sagi D3, SAGPRO-LSR, Sagpro-DSR, Sagvo-M, SAGTERB, Sagitrep, Sagitra-100

4. **`/contact` Contact (`src/routes/contact.tsx`)**
   - Contact card: Address (Shop No. 303, Plot No. 9-10, 3rd Floor, Vardhman Capital Mall, LSC, Shakti Nagar Extn., Shakti Nagar City, Delhi-110007), Phones (47476227, 9810190530, **9555864204**), Email (sagipharmaceutical@gmail.com)
   - Simple inquiry form (Name, Email, Phone, Message) — client-only, shows toast on submit (no backend in scope)
   - Embedded Google Maps iframe for the Delhi address
   - Business hours

### Shared components (`src/components/`)
- `SiteHeader.tsx` — sticky nav with mobile sheet menu, logo
- `SiteFooter.tsx` — contact summary, quick links, copyright
- `Logo.tsx` — text logo "SAGI" with droplet mark (CSS, no external image needed)
- `ProductCard.tsx`
- `SectionHeading.tsx`

### Design system (`src/styles.css`)
- Override tokens with medical palette in oklch:
  - `--background: oklch(1 0 0)` (white)
  - `--foreground: oklch(0.2 0.04 250)` (deep navy ~#0c2340)
  - `--primary: oklch(0.5 0.09 240)` (medical blue ~#2e6b8a)
  - `--secondary / --muted: oklch(0.96 0.02 240)` (~#e8f0f8)
  - `--accent: oklch(0.2 0.04 250)`
- Add Space Grotesk + DM Sans via Google Fonts `<link>` in `__root.tsx` head
- Add `font-display` and `font-body` utility classes; default body uses DM Sans, headings use Space Grotesk

### SEO per route
Each route defines its own `head()` with unique `title`, `description`, `og:title`, `og:description` (e.g. "SAGI Pharmaceutical — Trusted Healthcare Formulations" / "About SAGI Pharmaceutical" / "Our Products — SAGI Pharmaceutical" / "Contact SAGI Pharmaceutical").

### Out of scope
- Backend (no DB, no auth, no contact-form email delivery — toast only)
- Individual product detail pages (can be added later)
- E-commerce/checkout

### Technical notes
- No new dependencies; uses existing shadcn/ui (Button, Card, Badge, Input, Textarea, Sheet, Sonner toast)
- All product data in a single typed `products.ts` array
- Fully responsive; mobile-first
- Lucide icons for therapeutic-area cards
