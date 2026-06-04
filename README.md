# American Dream -- Interactive Sales Deck

A fully interactive, browser-based sales platform for **American Dream** (East Rutherford, NJ) -- one of North America's largest retail and entertainment destinations at 3.5 million square feet with 40M+ annual visitors, 450+ brands, and 6 world-class attractions.

This is not a website. It is a purpose-built interactive pitch tool designed to replace fragmented sales materials (PDFs, videos, spreadsheets, verbal narration) with a single cinematic experience that tells the property's story, communicates its commercial value, and drives prospects toward three specific business actions: **signing a lease**, **committing to a sponsorship**, or **booking an event venue**.

Built to work both on live sales calls (screen-shared) and as a standalone link a prospect can explore independently.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055)

---

## Live Demo

**[View Live](https://american-dream-deck.vercel.app)** <!-- Replace with actual URL -->

---

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd american-dream-deck

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000

# Production build
npm run build

# Start production server
npm start
```

**Requirements:** Node.js 18+, npm 9+

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router, Turbopack) | Framework -- static generation, optimized builds, file-based routing |
| **React 19** + **TypeScript 5** | UI layer with full type safety |
| **Tailwind CSS 4** | Utility-first styling with custom design token system |
| **GSAP 3.15** (ScrollTrigger, ScrollToPlugin) | Scroll-driven cinematic animations, parallax, smooth navigation |
| **Framer Motion 12** | Layout animations, presence transitions, gesture interactions |
| **Canvas API** | Generative particle system for the hero experience |
| **Lucide React** | Minimal, consistent icon system |
| **clsx + tailwind-merge** | Conditional class composition without conflicts |

Zero external UI component libraries. Every element is custom-built for the luxury aesthetic.

---

## Project Architecture

```
src/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Main deck -- all 16 sections composed here
│   ├── globals.css                 # Design tokens, custom utilities, keyframe animations
│   └── modules/events/page.tsx     # Phase 2: Dedicated events booking sub-module
│
├── components/
│   ├── layout/                     # Navigation, SideNav, LoadingScreen
│   ├── sections/                   # 16 full-page deck sections
│   └── ui/                         # Reusable primitives (counters, bars, charts, forms)
│
├── context/
│   └── PersonaContext.tsx           # Global persona state + form interest routing
│
├── data/                           # All content as typed TypeScript -- zero hardcoded strings
│   ├── personas.ts                 # 6 persona definitions + per-persona content overrides
│   ├── districts.ts                # 6 interactive map districts with stats + fit scores
│   ├── matchmaker.ts               # Business matchmaker scoring algorithm
│   ├── venues.ts                   # 5 event venue types with capacities + past events
│   ├── sponsorship-simulator.ts    # 6 brand archetypes with activation concepts
│   ├── dashboard-metrics.ts        # Executive metrics + competitive comparisons
│   ├── availability.ts             # Scarcity data: pricing, signings, calendar commitment
│   ├── roi-benchmarks.ts           # Revenue projections by category + store format
│   ├── tenants.ts                  # Retail, dining, sponsorship tiers, leasing paths
│   ├── attractions.ts              # 6 world-class entertainment attractions
│   ├── stats.ts                    # Hero, Why, and sponsorship statistics
│   └── sections.ts                 # Section registry with navigation configuration
│
├── hooks/                          # useActiveSection, useLazyVideo, useMediaQuery
├── lib/                            # GSAP plugin registration, cn() utility
└── styles/                         # Font configuration (Inter via next/font)
```

### Why This Structure

- **`/data` as single source of truth:** All content is typed TypeScript. The entire deck can be re-skinned for a different property by swapping data files -- zero component changes needed.
- **`/context` for global state:** PersonaContext manages persona selection and form routing across all 16 sections without prop drilling.
- **`/sections` as self-contained units:** Each section owns its layout, animations, and data consumption. Sections can be reordered, removed, or duplicated by editing one file (`page.tsx`).
- **No component library dependency:** Every UI element is built from scratch with Tailwind, ensuring the luxury aesthetic isn't constrained by a design system built for SaaS products.

---

## Deck Structure (16 Sections)

### Phase 1: Core Interactive Overview

| # | Section | Story Beat | Key Interactions |
|---|---------|-----------|------------------|
| 1 | **Hero** | Cinematic opening -- scale and ambition in seconds | Animated particle canvas, stat counters, CTA scroll |
| 2 | **Opportunity Finder** | "WHO ARE YOU?" -- personalizes the entire deck | 6 persona cards, selection animation, auto-scroll |
| 3 | **Why American Dream** | Location, access, scale, demographics | Animated concentric reach map, persona-highlighted stats, demographic ticker |
| 4 | **Destination Map** | Interactive property exploration | SVG map with hover tooltips, click-to-reveal detail panels, availability indicators, persona match scores |
| 5 | **Retail Ecosystem** | 450+ brands, growth trajectory | Category filters with layout animation, persona-recommended badges, recent signings ticker |
| 6 | **Luxury District** | Elevated positioning for premium brands | Parallax brand name reveal, editorial feature pillars |
| 7 | **Dining & Lifestyle** | 100+ culinary destinations as a lifestyle draw | 8 category filters, venue cards with layout animation |
| 8 | **Entertainment** | 6 world-class attractions (the differentiator) | Color-coded expandable accordion with stats and descriptions |
| 9 | **Business Matchmaker** | Personalized space recommendation engine | 3-step input (Industry/Format/Budget), scoring algorithm, district match with availability data |
| 10 | **Events & Activations** | Position the property as a platform | Event type grid, animated platform stats (500+ events/year) |
| 11 | **Venue Explorer** | Detailed event venue selection | 5 venue tabs, capacity/layout, past events, branding slots, availability dates |
| 12 | **Sponsorship** | Partnership tiers with activation concepts | 3-tier cards, persona-aware highlighting, calendar urgency indicator |
| 13 | **Sponsorship Simulator** | "Imagine Your Brand Here" -- activation visualization | 6 brand archetypes + custom input, reach projections, media exposure, suggested locations |
| 14 | **Executive Dashboard** | Investor-grade metrics + ROI calculator | 7 metric cards (radial + counter), competitive comparison bars, revenue projection tool |
| 15 | **Leasing Paths** | Category-segmented with pricing | 4 pathways (Luxury/Retail/F&B/Pop-Up) with pricing ranges and wired CTAs |
| 16 | **Grand Finale** | Cinematic close + conversion | Scroll-animated headline, 3 persona-aware conversion cards, validated form with confirmation |

### Phase 2: Expandable Sub-Modules

| Module | Status | Location |
|--------|--------|----------|
| **Events Module** | Built | `/modules/events` -- expandable event categories, booking form |
| **Sponsorship Module** | Built (inline) | Sections 12-13 -- tiers + simulator |
| **Leasing Paths** | Built (inline) | Section 15 -- segmented by category with pricing |
| **Venue Explorer** | Built (inline) | Section 11 -- 5 venue types with full detail |

**Persistent elements across all sections:** Floating CTA bar (lead capture from any depth), side navigation dots, top navigation bar.

---

## Key Design Decisions

### Persona-Driven Personalization

The Opportunity Finder (section 2) asks visitors to self-identify as one of 6 business types (Retail Brand, Luxury Retailer, Event Organizer, Corporate Sponsor, F&B Operator, Pop-Up Brand). This single selection adapts the entire experience:

- Statistics highlight differently per persona
- Map districts show persona-specific match scores (e.g., 98% for luxury retailer in Luxury Wing)
- Retail categories display "Recommended" badges
- Sponsorship tiers emphasize the persona-relevant tier
- Grand Finale conversion cards reorder and relabel CTAs
- Business Matchmaker pre-fills industry and format defaults
- Executive Dashboard shows persona-specific insight callouts

Visitors who skip personalization see the full default experience -- no content is hidden.

### Conversion Architecture

The deck is designed as a funnel, not a brochure:

- **Every section has a CTA** that scrolls to the Grand Finale with the correct interest pre-selected in the form
- A **persistent floating CTA bar** appears after section 2 and captures leads from any scroll depth (Schedule a Call / Download Deck)
- The Grand Finale **validates inputs**, shows a **gold loading animation**, then transitions to a **confirmation state** with a 24-hour follow-up promise
- **Scarcity indicators** are injected across 6 sections (availability counts, recent signings, calendar commitment %, pricing ranges)
- All submissions are logged to `localStorage` with console output for demo purposes

### Visual Direction

Inspired by Apple.com, Tesla.com, Hermes, Louis Vuitton, and modern Digideck experiences:

- **Pure black (#000)** background with minimal surface variation
- **Gold (#D4AF37)** accent -- used sparingly for premium positioning
- **Oversized typography** with tight tracking (`-0.04em`) for cinematic impact
- **Generous whitespace** -- luxury is defined by what you leave out
- **Minimal UI chrome** -- content is the interface
- **Glass morphism** for navigation (backdrop blur on scroll)

### Animation Strategy

Three distinct animation layers, each handling what it does best:

1. **GSAP** -- Scroll-linked parallax, scrub-driven headline reveals, timeline sequences, smooth scroll navigation
2. **Framer Motion** -- React state transitions (layout animations, AnimatePresence, tab indicators, hover effects)
3. **CSS keyframes** -- Simple infinite loops (pulse, scroll indicators, ticker) -- GPU-accelerated, zero JS cost

### Non-Linear Navigation

Dual navigation supports both linear storytelling and non-linear exploration:

- **Top nav bar** -- Key sections in desktop header, full section list in mobile overlay
- **Side dot nav** (desktop) -- Apple-style line indicators with hover labels, click-to-navigate any section
- **Section CTAs** -- Every section links to relevant deeper sections or directly to conversion
- **Floating CTA bar** -- Always accessible lead capture regardless of scroll position

---

## Performance Considerations

- **Static generation** -- All pages pre-rendered at build time (zero server-side rendering)
- **Lazy animations** -- GSAP ScrollTrigger and IntersectionObserver fire only when sections enter viewport
- **`once: true`** on all entrance animations -- elements don't re-animate
- **Code splitting** -- Next.js automatic per-route chunking
- **Tree-shaking** -- Only used Lucide icons are bundled
- **CSS purging** -- Tailwind automatically removes unused styles
- **No external API calls** -- All data is bundled at build time
- **next/font** with `display: "swap"` -- zero FOUT/FOIT

---

## AI Tools Used

| Tool | Usage |
|------|-------|
| **Claude Code (Anthropic)** | Architecture planning, component development, animation systems, data modeling, matchmaker algorithm, persona system, competitive benchmarking, copy generation, full codebase implementation |
| **ChatGPT (OpenAI)** | Content ideation, demographic research, activation concept writing, brand archetype descriptions |
| **Canvas API (generative)** | Programmatic particle system -- ambient gold gradients rendered at runtime, no external image assets |

### How AI Accelerated the Build

- **Architecture:** AI helped design the persona context system, section registry pattern, floating CTA routing, and modular data layer
- **Data modeling:** AI generated realistic business data (visitor stats, revenue benchmarks, availability, pricing) that mirrors real commercial property metrics
- **Algorithm design:** The Business Matchmaker scoring system (industry affinity x format multiplier x budget eligibility) was designed collaboratively with AI
- **Copy & content:** Section headlines, persona descriptions, activation concepts, competitive narratives, and metric descriptions were drafted and refined with AI
- **Component code:** AI wrote the majority of component implementations, with human review and iteration on design decisions, UX flow, and visual quality
- **Iteration:** AI was used for rapid prototyping -- the scarcity system, ROI calculator, and form validation were designed, built, and refined in a single session

All design decisions, UX flow, creative direction, and product strategy were human-led. AI was the engine; the product vision and design sensibility were mine.

---

## What I Would Improve With More Time

1. **Video as primary storytelling medium** -- Embed American Dream's official promotional videos as autoplay hero backgrounds, scroll-triggered section interludes, and venue walkthrough clips
2. **AI-generated property renderings** -- Use Midjourney/DALL-E to create photorealistic activation mockups for the Sponsorship Simulator and venue visualizations
3. **Real CRM integration** -- Connect form submissions and floating CTA leads to HubSpot or Salesforce
4. **Analytics pipeline** -- Vercel Analytics + custom funnel tracking to measure section engagement and drop-off
5. **3D venue walkthroughs** -- Three.js-based interactive tours for the Event Venue Explorer
6. **PDF export** -- "Download as proposal" that generates a persona-customized PDF from the deck content
7. **Lighthouse 90+ optimization** -- Image optimization, font subsetting, critical CSS inlining
8. **Tablet gesture refinement** -- Map pinch-to-zoom, swipe navigation for venue tabs
9. **Sound design** -- Subtle ambient audio for immersive presentation mode
10. **Multi-property templating** -- Abstract the data layer so the same deck framework serves any mega-mall

---

## Deployment

Deployed via **Vercel** with automatic builds from the `main` branch:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deploys on every push.

---

Built as an interview project for Mastery Coding. Designed to demonstrate technical execution, design sensibility, AI fluency, and product thinking.
