# Arun Prasath P — Portfolio Website

> **Industrial Business Consultant | Strategic Growth Advisor | Material Handling Expert**
> Premium personal portfolio — built to the standard of a management consulting firm's digital presence.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [CSS Architecture](#css-architecture)
- [JavaScript Modules](#javascript-modules)
- [Sections Reference](#sections-reference)
- [Content Source](#content-source)
- [Animations Guide](#animations-guide)
- [Responsive Breakpoints](#responsive-breakpoints)
- [SEO Checklist](#seo-checklist)
- [Performance Checklist](#performance-checklist)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing & Handoff Notes](#contributing--handoff-notes)
- [Known Gaps / Future Work](#known-gaps--future-work)
- [Contact](#contact)

---

## Project Overview

This is a **single-page portfolio website** for P. Arun Prasath — an industrial business leader
with 24+ years of experience in Material Handling, Crane Engineering, and Business Development
across India and GCC markets.

### What This Site Is
- A premium executive presence — comparable to McKinsey.com / BCG.com in feel
- A consulting & advisory brand platform
- A lead generation tool targeting CEOs, MDs, Plant Heads, and Industrial Investors

### What This Site Is NOT
- A resume site or job board profile
- A freelancer portfolio
- A product catalogue

### Brand Positioning (Non-Negotiable)
| ✅ Position Arun As | ❌ Never Position As |
|---|---|
| Industrial Business Consultant | Sales Manager |
| Strategic Growth Advisor | BDM / Employee |
| Material Handling Expert | Job Seeker |
| Entrepreneur & Industry Mentor | Generic Freelancer |

---

## Live Demo

```
https://arunprasath.in          ← production (to be configured)
https://arun-portfolio.netlify.app  ← staging / preview
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Markup | HTML5 (Semantic) | Structure |
| Styling | CSS3 + Custom Properties | Design system |
| Logic | Vanilla JavaScript (ES6+) | Interactions |
| Animations | GSAP 3 + AOS | Scroll reveals, ticker |
| Icons | Lucide Icons (CDN) | UI icons |
| Fonts | Google Fonts CDN | Playfair Display, Inter, Space Grotesk |
| Form | Formspree | Contact form backend |
| Hosting | Netlify | CI/CD + CDN |
| Version Control | GitHub (private repo) | Source code |

> **No build tools required.** Pure HTML/CSS/JS — open `index.html` directly in browser during development.

---

## Prerequisites

Before you begin, ensure you have:

- A modern browser (Chrome 90+ / Firefox 88+ / Safari 14+)
- A code editor (VS Code recommended)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension (for local dev)
- Git installed
- A [Formspree](https://formspree.io) account (free tier works — for contact form)
- A [Netlify](https://netlify.com) account (free tier — for deployment)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/arun-prasath-portfolio.git
cd arun-prasath-portfolio
```

### 2. Open in VS Code

```bash
code .
```

### 3. Start Local Dev Server

Using VS Code Live Server:
- Right-click `index.html` → **Open with Live Server**
- Site opens at `http://127.0.0.1:5500`

Or using Python (no install needed):
```bash
# Python 3
python -m http.server 5500

# Then open: http://localhost:5500
```

### 4. Configure Contact Form

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form — copy your form endpoint ID
3. Open `assets/js/form.js`
4. Replace the placeholder:
```javascript
// form.js — line ~12
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

### 5. Add Profile Photo

Place Arun's professional headshot at:
```
assets/images/profile/arun-prasath.jpg
```
Recommended: Square, minimum 800×800px, professionally shot, dark or neutral background.

---

## Folder Structure

```
arun-prasath-portfolio/
│
├── index.html                      # Main entry point — all 16 sections here
│
├── assets/
│   │
│   ├── css/
│   │   ├── main.css                # CSS variables, reset, base styles, body
│   │   ├── typography.css          # Font imports, type scale, heading styles
│   │   ├── components.css          # Buttons, cards, badges, tags, pills
│   │   ├── sections.css            # Per-section styles (hero, about, stats...)
│   │   ├── animations.css          # AOS config overrides, GSAP keyframes
│   │   └── responsive.css          # All media queries (mobile-first)
│   │
│   ├── js/
│   │   ├── main.js                 # Entry point — initialises all modules
│   │   ├── nav.js                  # Sticky nav, hamburger menu, scroll-spy
│   │   ├── ticker.js               # GSAP marquee (credential strip)
│   │   ├── counter.js              # Stats number count-up on scroll
│   │   ├── tabs.js                 # Competencies tab + accordion logic
│   │   ├── casestudy.js            # Case study modal open / close / trap focus
│   │   └── form.js                 # Contact form validation + Formspree POST
│   │
│   └── images/
│       ├── logo/                   # Client logos & brand assets
│       ├── AP1.png                 # Profile images & assets
│       ├── AP4.png
│       ├── AP5.png
│       └── bg remove.png           # Hero transparent background profile
│
├── .gitignore
└── README.md                       # This file
```

---

## CSS Architecture

All CSS custom properties are defined in `main.css` under `:root`. Every other file consumes these variables — **never hardcode hex values outside `main.css`.**

```css
/* main.css — :root */
:root {

  /* ── COLORS ─────────────────────────────── */
  --color-crimson:       #8B0000;   /* Primary accent — CTAs, highlights */
  --color-crimson-dark:  #6B0000;   /* Hover state for crimson elements */
  --color-dark:          #1A1A2E;   /* Hero bg, dark sections, body text */
  --color-slate:         #4A4A6A;   /* Secondary text, mid-tone elements */
  --color-gold:          #C9A96E;   /* Premium accent — use sparingly */
  --color-light-bg:      #F5F5F5;   /* Light section backgrounds */
  --color-border:        #E0E0E8;   /* Subtle borders, dividers */
  --color-white:         #FFFFFF;
  --color-text-dark:     #1A1A2E;
  --color-text-muted:    #6B6B8A;

  /* ── TYPOGRAPHY ──────────────────────────── */
  --font-display:   'Playfair Display', Georgia, serif;
  --font-body:      'Inter', system-ui, -apple-system, sans-serif;
  --font-label:     'Space Grotesk', 'DM Mono', monospace;

  /* ── TYPE SCALE ──────────────────────────── */
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.125rem;   /* 18px */
  --text-xl:    1.25rem;    /* 20px */
  --text-2xl:   1.5rem;     /* 24px */
  --text-3xl:   1.875rem;   /* 30px */
  --text-4xl:   2.25rem;    /* 36px */
  --text-5xl:   3rem;       /* 48px */
  --text-hero:  clamp(2.75rem, 5.5vw, 4.5rem);  /* Fluid hero headline */

  /* ── SPACING ─────────────────────────────── */
  --section-py:        6rem;
  --section-py-mobile: 3.5rem;
  --container-max:     1200px;
  --container-px:      2rem;
  --container-px-sm:   1.25rem;

  /* ── BORDER RADIUS ───────────────────────── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* ── SHADOWS ─────────────────────────────── */
  --shadow-card:  0 4px 24px rgba(26, 26, 46, 0.08);
  --shadow-hover: 0 12px 40px rgba(139, 0, 0, 0.16);
  --shadow-nav:   0 2px 20px rgba(26, 26, 46, 0.12);

  /* ── TRANSITIONS ─────────────────────────── */
  --ease-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --ease-base:   300ms cubic-bezier(0.4, 0, 0.2, 1);
  --ease-slow:   600ms cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── Z-INDEX SCALE ───────────────────────── */
  --z-below:   -1;
  --z-base:     0;
  --z-raised:   10;
  --z-sticky:   100;
  --z-modal:    200;
  --z-toast:    300;
}
```

---

## JavaScript Modules

| File | Responsibility | Key Functions |
|---|---|---|
| `main.js` | Boot — imports and inits all modules | `init()` |
| `nav.js` | Sticky header on scroll, hamburger toggle, active section highlighting | `initNav()`, `initScrollSpy()` |
| `ticker.js` | GSAP infinite horizontal marquee for credential strip | `initTicker()` |
| `counter.js` | Animates stat numbers from 0 → value when section enters viewport | `initCounters()` |
| `tabs.js` | Tab switcher for competencies + mobile accordion fallback | `initTabs()` |
| `casestudy.js` | Opens case study modal, traps focus, closes on ESC / backdrop | `initCaseStudies()` |
| `form.js` | Validates contact form fields, POSTs to Formspree, shows success/error state | `initForm()` |

### Module Init Pattern (`main.js`)

```javascript
// main.js
import { initNav } from './nav.js';
import { initTabs } from './tabs.js';
import { initTicker } from './ticker.js';
import { initCounter } from './counter.js';
import { initCaseStudyModal } from './casestudy.js';
import { initForm } from './form.js';

AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-quart',
  offset: 60,
  delay: 0,
});

initNav();
initTabs();
initTicker();
initCounter();
initCaseStudyModal();
initForm();
```

---

## Sections Reference

| # | Section ID | Description | Key Interaction |
|---|---|---|---|
| 1 | `#nav` | Sticky navigation | Scroll-spy, hamburger |
| 2 | `#hero` | Diagonal split hero | GSAP entrance |
| 3 | `#ticker` | Credential marquee strip | GSAP infinite loop |
| 4 | `#about` | Executive intro + photo | AOS fade-in |
| 5 | `#impact` | Stats counter cards | Count-up on scroll |
| 6 | `#expertise` | Industry grid (9 cards) | Hover flip / expand |
| 7 | `#competencies` | Tab / accordion | Tab switch |
| 8 | `#clients` | Client name grid | AOS stagger |
| 9 | `#services` | 8 service cards | Hover lift + border |
| 10 | `#case-studies` | 3 CAR cards | Modal open |
| 11 | `#journey` | Vertical timeline | Scroll reveal |
| 12 | `#insights` | Blog preview cards | Static / CMS-ready |
| 13 | `#market-map` | South India sectors | Infographic (static) |
| 14 | `#testimonials` | Quote cards | AOS fade |
| 15 | `#languages` | Language pills | Static highlight |
| 16 | `#connect` | CTA + contact form | Form submit |

---

## Content Source

All copy, case studies, client lists, service descriptions, and bio text are located directly inside:

```
index.html              ← Production ready copy embedded directly.
```

**Rule:** Ensure all edits are made directly to the `index.html` file using real content.

---

## Animations Guide

### AOS (Animate On Scroll) — for section reveals

```html
<!-- Fade up (default for most sections) -->
<div data-aos="fade-up" data-aos-delay="100">...</div>

<!-- Staggered cards (use delay increments of 100ms) -->
<div class="card" data-aos="fade-up" data-aos-delay="0">...</div>
<div class="card" data-aos="fade-up" data-aos-delay="100">...</div>
<div class="card" data-aos="fade-up" data-aos-delay="200">...</div>

<!-- Fade in from left (for timeline left nodes) -->
<div data-aos="fade-right">...</div>

<!-- Fade in from right (for timeline right nodes) -->
<div data-aos="fade-left">...</div>
```

### GSAP — for hero entrance + ticker

```javascript
// Hero entrance — text reveal (ticker.js / hero section)
gsap.from('.hero-headline', {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power3.out',
  delay: 0.3
});

// Credential ticker — infinite marquee
gsap.to('.ticker-track', {
  xPercent: -50,
  repeat: -1,
  duration: 30,
  ease: 'none'
});
```

### CSS Hover Transitions — for cards

```css
/* Service card hover lift */
.service-card {
  transition: transform var(--ease-base), box-shadow var(--ease-base);
}
.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

/* Industry card top border reveal */
.industry-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--color-crimson);
  transform: scaleX(0);
  transition: transform var(--ease-base);
}
.industry-card:hover::before {
  transform: scaleX(1);
}
```

### Reduced Motion — always respect user preference

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

Mobile-first approach. All base styles are for mobile. Add complexity upward.

```css
/* ── Mobile (default) : < 640px ─────────── */

/* ── Tablet ──────────────────────────────── */
@media (min-width: 640px)  { }

/* ── Laptop ──────────────────────────────── */
@media (min-width: 1024px) { }

/* ── Desktop ─────────────────────────────── */
@media (min-width: 1280px) { }

/* ── Wide ────────────────────────────────── */
@media (min-width: 1536px) { }
```

### Layout shifts at breakpoints

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Hero | Stacked (text top, visual bottom) | Stacked | Diagonal split (50/50) |
| About | Stacked (photo top) | Stacked | Side by side (40/60) |
| Stats | 2×3 grid | 3×2 grid | 6 in a row |
| Industry | 1 col | 2 col | 3×3 grid |
| Services | 1 col | 2 col | 4×2 grid |
| Timeline | Single column | Single column | Alternating left/right |
| Clients | 2 col | 3 col | 5 col |
| Blog | 1 col | 2 col | 3 col |
| Nav | Hamburger menu | Hamburger | Full horizontal nav |

---

## SEO Checklist

Copy these into `<head>` of `index.html`:

```html
<!-- Primary Meta -->
<title>Arun Prasath P | Industrial Business Consultant & Strategic Advisor</title>
<meta name="description" content="24+ years of Material Handling expertise. Trusted by CEOs, Plant Heads & Manufacturing Leaders across India and GCC. Industrial Business Consultant & Strategic Growth Advisor.">
<meta name="keywords" content="Industrial Business Consultant, Material Handling Expert, Crane Industry Specialist, Strategic Growth Advisor, Manufacturing Consultant India">
<meta name="author" content="Arun Prasath P">
<link rel="canonical" href="https://arunprasath.in">

<!-- Open Graph (LinkedIn / Facebook share) -->
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://arunprasath.in">
<meta property="og:title"       content="Arun Prasath P | Industrial Business Consultant">
<meta property="og:description" content="Helping Industrial Businesses Grow Smarter, Operate Safer, and Scale Faster. 24+ years of Material Handling & Crane Industry expertise.">
<meta property="og:image"       content="https://arunprasath.in/assets/images/og/og-image.jpg">

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="Arun Prasath P | Industrial Business Consultant">
<meta name="twitter:description" content="24+ years of Material Handling expertise across India & GCC.">
<meta name="twitter:image"       content="https://arunprasath.in/assets/images/og/og-image.jpg">

<!-- Schema.org — Person -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Arun Prasath P",
  "jobTitle": "Industrial Business Consultant & Strategic Growth Advisor",
  "description": "24+ years of Material Handling and Industrial Crane expertise. Trusted advisor to CEOs, Plant Heads and Manufacturing Leaders across India and GCC.",
  "url": "https://arunprasath.in",
  "email": "arun.pswamy@gmail.com",
  "telephone": "+919894400663",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/in/arun-prasath-p-pap-3214b1165/"
  ]
}
</script>
```

---

## Performance Checklist

Before going live, verify:

- [ ] All images compressed (use [Squoosh](https://squoosh.app) — WebP format preferred)
- [ ] Profile photo: max 200KB
- [ ] OG image: exactly 1200×630px
- [ ] Lazy loading on all `<img>` tags: `loading="lazy"`
- [ ] Google Fonts loaded with `display=swap`: `?display=swap`
- [ ] AOS JS loaded at bottom of `<body>` (not in `<head>`)
- [ ] GSAP loaded from CDN with `defer` attribute
- [ ] No unused CSS (check with Chrome DevTools Coverage tab)
- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Test on real mobile device (not just DevTools emulation)
- [ ] Page load < 3 seconds on 4G (test at [WebPageTest](https://webpagetest.org))

---

## Deployment

### Deploy to Netlify (Recommended)

**Option A — Drag & Drop (quickest):**
1. Go to [netlify.com](https://netlify.com) → Log in
2. Drag the entire project folder onto the Netlify dashboard
3. Done. Netlify gives you a `*.netlify.app` URL instantly.

**Option B — GitHub CI/CD (recommended for ongoing updates):**

1. Push project to GitHub:
```bash
git init
git add .
git commit -m "feat: initial portfolio build"
git remote add origin https://github.com/YOUR_USERNAME/arun-prasath-portfolio.git
git push -u origin main
```

2. In Netlify dashboard → **Add new site** → **Import from Git**
3. Select your GitHub repo
4. Build settings:
   - Build command: *(leave blank — no build step needed)*
   - Publish directory: `/` (root)
5. Click **Deploy site**

Every `git push` to `main` will auto-deploy.

**`netlify.toml` (already in repo root):**

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to   = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Custom Domain Setup

1. Buy domain (recommended: `arunprasath.in`) from GoDaddy / Namecheap / Google Domains
2. In Netlify → Site settings → Domain management → Add custom domain
3. Point domain's DNS to Netlify nameservers (Netlify provides these)
4. SSL auto-configured via Let's Encrypt (free HTTPS)

---

## Environment Variables

This project has **one** environment variable — the Formspree form endpoint.

**In `assets/js/form.js`:**
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

No `.env` file needed — this is a static site with no server-side code.

---

## Contributing & Handoff Notes

### Git Workflow

```bash
# Always branch from main
git checkout -b feature/section-name

# Example branches
git checkout -b feature/hero-section
git checkout -b fix/mobile-nav
git checkout -b content/blog-posts

# After work is done
git add .
git commit -m "feat: hero diagonal split layout complete"
git push origin feature/hero-section
# → Open Pull Request on GitHub → merge to main
```

### Commit Message Convention

```
feat:     new feature or section
fix:      bug fix
style:    CSS / design changes (no logic change)
content:  copy / text updates
perf:     performance improvements
chore:    tooling, config, README changes
```

### Code Standards

- Use semantic HTML5 elements (`<section>`, `<article>`, `<nav>`, `<main>`, `<aside>`)
- Every `<img>` must have a descriptive `alt` attribute
- All interactive elements must be keyboard accessible (`tabindex`, `:focus-visible`)
- No inline styles — all styling via CSS classes
- No hardcoded hex colors — always use CSS custom properties from `main.css`
- JS: ES6+ modules, no jQuery, no global variables
- Comment every JS function with its purpose

---

## Known Gaps / Future Work

| Item | Status | Notes |
|---|---|---|
| Profile photo | ⏳ Pending | Client to provide professional headshot |
| Real testimonials | ⏳ Pending | 3 quotes needed from clients / colleagues |
| Blog CMS | 🔮 Future | Static HTML now — upgrade to Netlify CMS or Sanity later |
| OG image | ⏳ Pending | Design branded 1200×630px social preview image |
| Custom domain | ⏳ Pending | `arunprasath.in` to be purchased and configured |
| South India map | 🔮 Future | Interactive SVG map (static infographic for now) |
| Video testimonials | 🔮 Future | Embed YouTube / Vimeo when available |
| Analytics | 🔮 Future | Add Google Analytics 4 or Plausible |
| WhatsApp CTA | 🔮 Future | Floating WhatsApp button (`wa.me/919894400663`) |

---

## Contact

**Client:**
Arun Prasath P
📧 arun.pswamy@gmail.com
📞 +91-98944-00663 / +91-97913-03910
🔗 [LinkedIn](https://www.linkedin.com/in/arun-prasath-p-pap-3214b1165/)
📍 Chennai, Tamil Nadu, India

---

*README last updated: June 26, 2026*
*Brief version: v1.1*
*Project status: Final Polish*
