# AGENTS.md — N4C Portfolio

## Project Overview

Personal portfolio website for **Nguyen Hung Cuong**, a Software Engineer based in Ho Chi Minh City, Vietnam. The site targets recruiters, engineering managers, and technical collaborators.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4
- **Visual identity:** Neubrutalism — flat color, thick black borders, hard offset shadows, square corners, bold display typography, light canvas background
- **Single-page portfolio** with dynamic project detail routes at `/projects/[slug]`

## Project Identity

- **Product name:** N4C Portfolio
- **Owner:** Nguyen Hung Cuong
- **Primary role:** Software Engineer, with a part-time design practice
- **Positioning:** 90% software engineering and 10% design. The portfolio should demonstrate technical depth, clear product thinking, and visual care without presenting design as the primary role.
- **Audience:** Recruiters, engineering managers, potential teammates, and technical collaborators.
- **Voice:** Plain, factual, and confident. Write in English by default. Avoid inflated claims, generic marketing language, and AI-style filler.
- **Primary visual reference:** Neubrutalism. `DESIGN.md` is authoritative whenever a visual decision is unclear.

## Product Goals

1. Present Nguyen Hung Cuong as a credible early-career Software Engineer seeking Software Engineer opportunities.
2. Make the hero message immediately clear: **“Software Engineer”** and **“Building scalable backend systems and modern applications.”**
3. Give visitors a fast path to the most relevant evidence: selected projects, technical skills, internship experience, education, and contact details.
4. Let each project communicate its problem, role, technology stack, architecture, features, development decisions, challenges, images, status, and relevant links when available.
5. Maintain a strong Neubrutalist visual identity while preserving readability, responsive behavior, accessibility, and fast loading.
6. Keep all user-provided content accurate. Template fields remain visible placeholders until real information, links, screenshots, or certificates are supplied.

### Non-goals

- This is a frontend-only personal portfolio, not a product dashboard, CMS, authentication system, or backend service.
- Do not add fabricated social proof, client work, metrics, testimonials, project outcomes, or skill ratings.
- Do not sacrifice clarity or accessibility to make the UI more visually aggressive.

## Critical Files

| File | Purpose |
|---|---|
| `DESIGN.md` | **Visual source of truth.** Read this before making ANY visual or styling change. |
| `PORTFOLIO_CONTENT.md` | **Content source of truth.** All copy, bios, project descriptions, and metadata live here. |
| `data/site-config.ts` | Site metadata, social links, navigation items |
| `data/projects.ts` | Typed project entries for cards and detail pages |
| `data/skills.ts` | Skills grouped by engineering domain |
| `data/experience.ts` | Work experience entries |
| `app/globals.css` | Design tokens (colors, borders, shadows, typography) |

## Design System — Quick Rules

> Always read `DESIGN.md` for the complete specification. This section is a cheat sheet.

### Theme

- **Single light theme only.** Background: `#FFFDF5`. No dark mode. No toggle.
- **Palette:** `--nb-canvas`, `--nb-surface`, `--nb-ink`, `--nb-yellow`, `--nb-blue`, `--nb-pink`, `--nb-green`, `--nb-muted`
- Yellow (`--nb-yellow: #FFD23F`) is the only promotional accent. Blue is for focus rings. Pink and green are status-only.

### Geometry

- **Square corners everywhere.** `border-radius: 0px`. No pills except small semantic status tags.
- **Borders:** `3px solid var(--nb-ink)` standard. `4px` for hero/section dividers. `2px` for subtle elements.
- **Shadows:** Hard offset, never blurred. `5px 5px 0` standard, `8px 8px 0` on hover/menus, `12px 12px 0` for hero only.

### Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display | `Syne` | 700, 800 | Hero heading, section headings, project titles |
| Body / Interface | `Space Grotesk` | 400, 500, 600, 700 | Navigation, body text, buttons, labels, cards |
| Code / Metadata | `JetBrains Mono` | 400, 600 | Tech stack tags, dates, architecture labels |

Load all fonts via `next/font/google`. Do not use CDN `<link>` tags.

### Interactions

- Buttons: lift on hover (`translate(-2px, -2px)`, expand shadow), press down on active (`translate(3px, 3px)`, remove shadow)
- Cards: lift 2px on hover, expand shadow. No rotation.
- Transitions: 120–180ms on `transform` and `opacity` only
- Focus: `3px solid var(--nb-blue)` with `outline-offset: 4px`

## Content Rules

- All portfolio text comes from `PORTFOLIO_CONTENT.md`. Do not invent content.
- Items marked `[TEMPLATE]` are user placeholders — preserve them until the user provides real data.
- **Never fabricate:** fake projects, statistics, testimonials, client logos, proficiency percentages, or inflated metrics.
- Project images must be real screenshots or clearly labelled placeholders (`TODO: ...`). Never draw fake UI with `div` elements.

## Project Structure

```
app/
├── layout.tsx              # Root layout: fonts, metadata, global providers
├── page.tsx                # Home page (all sections)
├── globals.css             # Design tokens + Tailwind base
├── sitemap.ts              # Dynamic sitemap generation
├── robots.ts               # Crawler directives
└── projects/
    └── [slug]/
        └── page.tsx        # Project detail page

components/
├── layout/
│   ├── Navbar.tsx          # Top navigation bar
│   └── Footer.tsx          # Site footer
├── sections/
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About me section
│   ├── Projects.tsx        # Project cards grid
│   ├── Experience.tsx      # Work experience
│   ├── Skills.tsx          # Skills grouped by domain
│   ├── Education.tsx       # Education + certifications
│   └── Contact.tsx         # Contact form + social links
└── ui/
    ├── Button.tsx           # Primary / Secondary / Text button
    ├── ProjectCard.tsx      # Project card component
    ├── SectionHeading.tsx   # Consistent section title treatment
    └── ScrollReveal.tsx     # Client-side scroll animation wrapper

data/
├── projects.ts             # Project[] with typed fields
├── skills.ts               # Skill groups by domain
├── experience.ts           # Work experience entries
└── site-config.ts          # Site metadata, nav links, social URLs

lib/
└── utils.ts                # Utility functions (cn, etc.)

hooks/
└── useScrollDirection.ts   # Navbar show/hide behavior

types/
└── index.ts                # Shared TypeScript interfaces

public/
├── images/
│   ├── projects/           # Project screenshots
│   ├── hero/               # Hero section visuals
│   └── about/              # About section images
├── resume.pdf
└── og-image.png            # Open Graph image
```

## Coding Standards

- Use TypeScript with strict typing. Never introduce `any`, unsafe casts, or untyped data structures.
- Prefer small, focused, composable components. A component should have one clear responsibility.
- Keep page sections in `components/sections/`, reusable primitives in `components/ui/`, shared helpers in `lib/`, typed content in `data/`, and cross-feature types in `types/`.
- Use named exports unless a Next.js convention requires a default export.
- Use descriptive names for components, props, variables, functions, and data fields. Avoid abbreviations that obscure intent.
- Keep data separate from presentation. Do not hardcode portfolio copy, project metadata, or social links inside UI components when a typed data module can own them.
- Use semantic HTML first. Use a `button` for actions, an `a` or `Link` for navigation, and native form controls for form fields.
- Use `next/link` for internal navigation and `next/image` for raster images. Provide explicit image dimensions or an aspect-ratio container to avoid layout shift.
- Prefer Tailwind utilities for component styling. Add custom CSS only for global tokens, complex selectors, or behavior Tailwind cannot express cleanly.
- Do not add a dependency until `package.json` has been checked and the dependency is justified by a concrete need.
- Before declaring a change complete, run the relevant checks. At minimum run `npm run lint`; run `npm run build` for routing, metadata, configuration, or production-impacting changes.
- Preserve existing user changes. Do not reformat, rename, or rewrite unrelated files.

### Server vs Client Components

- **Default to Server Components.** Only add `"use client"` when the component needs:
  - Browser APIs (`useState`, `useEffect`, `useRef`)
  - Event handlers (`onClick`, `onSubmit`)
  - Framer Motion animations
  - Third-party client-only libraries
- Keep interactive/animated elements as small, isolated Client Components. Wrap them; don't make entire sections client-side.

### Styling

- Use Tailwind CSS v4 utilities mapped to CSS custom properties from `DESIGN.md`.
- Define all design tokens as CSS variables in `globals.css` `:root`.
- Use `@theme inline` block in `globals.css` to expose tokens to Tailwind.
- Use CSS Grid for page composition. Do not use complex Flexbox percentage layouts.

### Imports and Paths

- Use `@/` path alias for all imports: `@/components/ui/Button`, `@/data/projects`, `@/lib/utils`
- Check `package.json` before adding any new dependency.

### TypeScript

- Strict mode enabled. No `any` types.
- Define shared interfaces in `types/index.ts`.
- Data files in `data/` must export typed arrays/objects.

### Images

- Use `next/image` for all raster images (local and remote).
- Always reserve aspect-ratio space to prevent layout shift.
- Write useful `alt` text that describes information, not visual style.
- Organize images in `public/images/` by section: `projects/`, `hero/`, `about/`.

### Icons

- Use `@phosphor-icons/react` exclusively. Do not mix icon libraries.
- Import specific icons: `import { ArrowRight } from "@phosphor-icons/react/dist/ssr"` for Server Components.
- For Client Components: `import { ArrowRight } from "@phosphor-icons/react"`.

### Animations (Framer Motion)

- Isolate in small Client Components (e.g., `ScrollReveal.tsx`).
- Animate only `transform` and `opacity`.
- Always check `prefers-reduced-motion`:
  ```tsx
  const prefersReducedMotion = usePrefersReducedMotion();
  // Show content immediately if reduced motion is preferred
  ```
- **Not allowed:** scroll hijacking, parallax, auto-rotating carousels, mouse-trailing effects, cursor replacement, decorative loading loops.

## Accessibility Requirements (WCAG 2.2 AA)

- Contrast: 4.5:1 for regular text, 3:1 for large text and UI components
- Every interactive element has a visible `:focus-visible` state with outline offset outside the border
- Minimum touch/click target: 44×44px (prefer 48px for buttons and inputs)
- Color is never the only signal for state, errors, or selection
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy: single `<h1>` per page, sequential nesting
- All form inputs have visible `<label>` elements (not placeholder-only)
- All hover interactions must have an equivalent focus treatment

## Page Structure (Home)

Sections appear in this order:

1. **Navigation** — name/monogram, anchor links, contact CTA button
2. **Hero** — "Software Engineer", supporting text, primary + secondary CTA, portrait/graphic
3. **About** — personal introduction, small visual asset
4. **Selected Projects** — asymmetric card grid (2+1 or 1+2, not uniform 3-card rows)
5. **Experience** — structured internship entry with responsibilities + technologies
6. **Skills** — grouped by domain (Languages, Frontend, Backend, Data, DevOps, Observability)
7. **Education & Certifications** — compact factual sections
8. **Contact** — direct contact action + social links
9. **Footer** — name, year, essential links

## Responsive Breakpoints

| Viewport | Behavior |
|---|---|
| `320px` | Minimum supported width. Single column. |
| `< 768px` | Mobile layout. Remove overlaps, source order, single column. Hamburger nav. |
| `768px` | Tablet. May introduce 2-column grids. |
| `1024px` | Desktop. Full grid layouts, asymmetric compositions. |
| `1440px` | Large desktop. Max content width 1400px with 32–48px padding. |
| `1920px` | Extra-large. Content remains centered at max-width. |

## Do NOT

- Add dark mode or theme toggle
- Use gradients, blur, glassmorphism, soft/blurred shadows, or glow effects
- Use rounded/pill-shaped cards, buttons, or containers
- Generate fake project data, statistics, testimonials, or client logos
- Use proficiency bars or fabricated percentage metrics for skills
- Install component libraries that conflict with the neubrutalist system (e.g., shadcn, Material UI)
- Use `h-screen` for hero (use `min-h-dvh` instead)
- Use unlabelled icon buttons, invisible focus styles, or tiny click targets
- Place decorative pills or labels on project images
- Make the page dark in one section and light in another
- Use stock photos, abstract blobs, or AI dashboard mockups as project evidence
- Add scrolling prompts, weather strips, availability counters, or version labels
