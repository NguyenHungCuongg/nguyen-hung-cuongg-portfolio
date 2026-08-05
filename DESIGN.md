# Design System: Neubrutalist Developer Portfolio

## Purpose

This document is the visual source of truth for Nguyen Hung Cuong's personal portfolio. It defines a sharp, memorable neubrutalist interface for a Software Engineer with a part-time design practice.

The site should feel engineered, direct, and confident. It should not feel chaotic, decorative for its own sake, or like a generic SaaS template.

## Design Read

Personal developer portfolio for recruiters, engineering managers, and collaborators. The visual language is neubrutalism: strong structure, flat color, bold typography, square geometry, and tactile interactions.

### Design dials

| Dial | Value | Rationale |
| --- | ---: | --- |
| `DESIGN_VARIANCE` | 7/10 | Asymmetric editorial compositions create personality while project content remains easy to scan. |
| `MOTION_INTENSITY` | 4/10 | Small, responsive interaction feedback and restrained reveals. No scroll hijacking or decorative looping. |
| `VISUAL_DENSITY` | 4/10 | Spacious enough for recruiters to scan, with compact metadata where it helps comprehension. |

## Core Principles

1. **Explicit over subtle.** Borders, fills, and hierarchy must be immediately visible.
2. **Broken, not random.** Use an underlying grid, then introduce deliberate offsets or overlaps only where they improve energy.
3. **One visual language.** Every interactive component follows the same border, shadow, corner, and press behavior.
4. **Strong at the macro level, calm at the reading level.** Hero and project thumbnails can be expressive. Body text, forms, metadata, and navigation must remain conventional and readable.
5. **Content leads.** The interface frames real work. Do not invent metrics, fake terminal screenshots, fabricated testimonials, or decorative labels.
6. **Accessibility is part of the style.** High contrast, visible focus, meaningful labels, and real target sizes are mandatory.

## Visual DNA

- Flat fills only. No gradients, glass effects, blur, glow, or soft shadows.
- Square corners by default. Do not use pills except for a small, clearly semantic status tag when necessary.
- Heavy black outlines define containers and controls.
- Hard offset shadows create depth. Shadows never blur.
- Bold display type creates poster-like moments. Body copy stays restrained.
- Use a visible layout grid, with occasional intentional overlaps and staggered project imagery.
- The style must look deliberate and commercially usable, not like raw or broken HTML.

## Theme and Color Tokens

The primary experience is a light printed-canvas theme. Do not add a dark-mode toggle unless a future brief explicitly requests it. This preserves the portfolio's high-contrast, screen-printed identity.

### Palette

| Token | Value | Usage |
| --- | --- | --- |
| `--nb-canvas` | `#FFFDF5` | Global page background |
| `--nb-surface` | `#FFFFFF` | Cards, input surfaces, modal content |
| `--nb-ink` | `#111111` | Text, borders, shadows, icons |
| `--nb-yellow` | `#FFD23F` | Primary CTA and key emphasis |
| `--nb-blue` | `#74B9FF` | Keyboard focus ring and selected interactive state |
| `--nb-pink` | `#FF6B6B` | Error or unavailable status only |
| `--nb-green` | `#88D498` | Success or available status only |
| `--nb-muted` | `#E9E6DD` | Quiet structural backgrounds only |

### Color rules

- Use `--nb-yellow` as the only promotional accent. Primary buttons, selected navigation, and one key portfolio moment may use it.
- Blue is functional, not decorative. Reserve it for focus and selected states.
- Pink and green communicate state only. Never use color as the sole carrier of information.
- Body text must use `--nb-ink` on `--nb-canvas` or `--nb-surface`.
- Do not place yellow text on white or off-white. Use black text on yellow.
- No gradients, translucent overlays, neon, or color glow.

## Geometry, Borders, and Shadows

```css
:root {
  --nb-border-thin: 2px solid var(--nb-ink);
  --nb-border: 3px solid var(--nb-ink);
  --nb-border-thick: 4px solid var(--nb-ink);

  --nb-shadow-sm: 3px 3px 0 var(--nb-ink);
  --nb-shadow: 5px 5px 0 var(--nb-ink);
  --nb-shadow-lg: 8px 8px 0 var(--nb-ink);
  --nb-shadow-xl: 12px 12px 0 var(--nb-ink);

  --nb-radius: 0px;
  --nb-focus: 3px solid var(--nb-blue);
}
```

- Use `--nb-border` for cards, buttons, inputs, and project media frames.
- Use `--nb-border-thick` only for hero panels, primary section dividers, or a featured project.
- Use `--nb-shadow` for standard cards and buttons.
- Use `--nb-shadow-lg` only on hover, menus, dialogs, and hero artwork.
- Use `--nb-shadow-xl` only for a single dominant hero composition or modal.
- Do not add shadows to every element. Shadows indicate clickability, elevation, or emphasis.

## Typography

### Font roles

| Role | Font | Weights | Usage |
| --- | --- | --- | --- |
| Display | `Syne` | 700, 800 | Hero, major section headings, project titles |
| Interface and body | `Space Grotesk` | 400, 500, 600, 700 | Navigation, body text, buttons, labels, cards |
| Code and metadata | `JetBrains Mono` | 400, 600 | Tech stack, dates, architecture labels, code-like metadata |

Load fonts through `next/font/google`. Do not use a font CDN `<link>` tag.

### Typography rules

- Use `Syne` only for high-impact display text. It should not appear in long paragraphs.
- Use `Space Grotesk` for all readable UI and body copy.
- Use `JetBrains Mono` sparingly for factual metadata, not for complete sections of prose.
- Hero heading: 56px to 88px on desktop, 42px to 56px on mobile, 1 or 2 lines maximum.
- Section heading: 36px to 56px on desktop, 30px to 40px on mobile.
- Body: 16px to 18px with line height 1.55 to 1.7 and a readable maximum line length of 65 characters.
- Button text: `Space Grotesk`, 700 weight, 14px to 16px. Keep every desktop button label on one line.
- Avoid excessive uppercase. Use it only for short metadata labels and navigation when needed.

## Layout System

### Container and grid

- Maximum content width: 1400px.
- Desktop outer padding: 32px to 48px.
- Mobile outer padding: 16px to 20px.
- Use a 12-column desktop grid and a single-column mobile grid below 768px.
- Standard section spacing: 96px to 144px desktop, 64px to 80px mobile.
- Use CSS Grid for page composition. Do not use complex percentage calculations in Flexbox.

### Composition rules

- The hero uses an asymmetric split: copy occupies approximately 7 columns and a personal portrait, illustration, or graphic composition occupies 5 columns.
- Navigation and reading order remain stable even when visual elements overlap.
- Use at least four different layout families throughout the full page. Suggested sequence: asymmetric hero, editorial about block, offset project grid, structured skill groups, timeline experience, compact contact block.
- Do not repeat identical 3-card rows. Project cards should use an asymmetric 2+1 or 1+2 grid.
- Never use an empty grid cell as decoration.
- On mobile, remove overlaps, return to source order, and use a strict single-column layout.

## Page Structure

The home page should follow this order:

1. **Navigation**: name or monogram, anchor links, contact action.
2. **Hero**: `Software Engineer`, supporting line, primary and secondary action, portrait or graphic asset.
3. **About**: concise personal introduction with a small visual or handwritten-style asset placeholder.
4. **Selected Projects**: asymmetric project card grid. Each card opens a project detail view.
5. **Experience**: one clearly structured internship entry with responsibilities and technologies.
6. **Skills**: grouped by engineering domain, not a wall of logos.
7. **Education and Certifications**: compact factual sections.
8. **Contact**: direct contact action and social links.
9. **Footer**: name, current year, and essential links only.

Do not add fake client-logo walls, testimonials, availability counters, weather strips, scrolling prompts, or decorative version labels.

## Component Specifications

### Navigation

- Height: 64px to 72px on desktop.
- Single line on desktop. Collapse to a clear menu button on mobile.
- Use a canvas background and a bottom border only when the page scroll position requires separation.
- The contact action uses the primary button treatment. Do not duplicate the same contact intent with multiple labels.

### Buttons and links

```css
.nb-button {
  border: var(--nb-border);
  border-radius: var(--nb-radius);
  background: var(--nb-yellow);
  color: var(--nb-ink);
  box-shadow: var(--nb-shadow);
  font-weight: 700;
  min-height: 48px;
  padding: 12px 20px;
  transition: transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
}

.nb-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--nb-shadow-lg);
}

.nb-button:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}

.nb-button:focus-visible {
  outline: var(--nb-focus);
  outline-offset: 4px;
}
```

- Primary button: yellow fill, black label.
- Secondary button: white fill, black label, standard border and shadow.
- Text links: underlined on hover and focus. Never rely on color alone.
- Icons must come from one icon library only. Use `@phosphor-icons/react` if it is installed, otherwise install it before use.

### Project cards

- Project cards are the visual center of the site.
- Use a real project screenshot, a supplied image, or an explicitly labelled image placeholder. Do not draw fake UI screenshots with `div` elements.
- Card structure: image frame, project title, one-sentence description, role, and a compact tech stack.
- The whole card is a link with a 48px minimum target area.
- Standard card: `--nb-surface`, `--nb-border`, `--nb-shadow`.
- Featured card: may use `--nb-yellow` or a large image, but not both at once.
- Hover: lift card by 2px and expand the hard shadow. Do not rotate the card.
- No tags, captions, or status badges overlaid on project images. Put facts below the image.

### Project detail view

- Begin with title, one-sentence summary, role, status, tech stack, demo link, and repository link.
- Show architecture with a real diagram image, or a clearly labelled placeholder until one is available.
- Group features as concise cards or a visual list.
- Show challenges as problem and solution pairs.
- Place development details and images in a predictable reading order.
- Use the same tokens as the home page. The detail page must feel like part of the same system.

### Skill groups

- Group skills by domain: Languages, Frontend, Backend and Architecture, Data, DevOps and Cloud, Observability.
- Prefer 2 to 3 structured groups per row on desktop, then stack on mobile.
- Use simple bordered blocks or grouped lists. Do not use proficiency bars or fabricated percentages.
- Use technology logos only when the logo improves recognition and is accurate. Otherwise use text labels.

### Experience and education

- Use factual chronology with a clear period, role, organization, and concise responsibility list.
- Use one strong container for each entry. Avoid dense tables and timeline decoration.
- Keep internship content direct. Do not inflate scope or claim unsupported impact.

### Contact form

- Use native labels above every input.
- Inputs: square corners, 3px border, small hard shadow, 48px minimum height.
- Focus state: blue outline with visible outline offset. It must remain visible outside the black border and shadow.
- Error state: pink border plus clear error text and icon. Do not signal errors by color alone.
- Success state: green treatment plus clear confirmation copy.

## Images and Personal Assets

Use real assets whenever possible. Required placeholders until assets are supplied:

| Placement | Preferred asset | Placeholder requirement |
| --- | --- | --- |
| Hero | Portrait, illustration, or custom studio photo | `TODO: hero visual, 4:5, minimum 1200x1500` |
| About | Casual workspace, drawing, table tennis, or piano image | `TODO: about visual, 4:3, minimum 1200x900` |
| Project cards | Real product screenshot or screenshot collage | `TODO: project cover, 4:3, minimum 1600x1200` |
| Project details | Screens, architecture diagram, or short demo GIF | `TODO: project detail media, 16:9, minimum 1600x900` |

- Use `next/image` for local and remote raster assets.
- Reserve aspect-ratio space to prevent layout shift.
- Write useful alt text. Describe the information in the image, not the visual style.
- Do not use stock photos, abstract blobs, AI dashboard mockups, or decorative SVG illustrations as substitutes for project evidence.

## Motion and Interaction

Motion should make the interface feel physical, not cinematic.

- Use 120ms to 180ms transitions for buttons, cards, and navigation states.
- Animate only `transform` and `opacity`.
- Allowed: button press, card lift, simple content reveal when it enters the viewport, menu open and close.
- Not allowed: scroll hijacking, parallax, infinite marquees, auto-rotating carousels, mouse-trailing effects, cursor replacement, or decorative loading loops.
- If using Motion, isolate it in a small client component and respect `prefers-reduced-motion`.
- Reduced-motion mode must show all content immediately and retain hover and focus clarity without movement.

## Accessibility and Responsiveness

- Meet WCAG 2.2 AA contrast requirements: 4.5:1 for regular text and 3:1 for large text and component boundaries.
- Every interactive element has a visible keyboard focus state with an outline offset outside its border.
- Minimum touch target: 44px by 44px. Prefer 48px buttons and inputs.
- Do not use color as the only signal for state, errors, or selected items.
- Use semantic landmarks, heading hierarchy, native buttons, and descriptive link text.
- Ensure all hover interactions have an equivalent focus treatment.
- Test at 320px, 768px, 1024px, 1440px, and 1920px wide viewports.
- Do not use `h-screen` for the hero. Use `min-h-[100dvh]` when viewport-height behavior is needed.

## Implementation Constraints

- Stack: Next.js, React, Tailwind CSS.
- Use CSS variables for the tokens above and map them to Tailwind utilities where useful.
- Use `next/font/google` for font loading.
- Keep static sections as Server Components. Put interactive elements and animation in isolated Client Components.
- Check `package.json` before importing any new dependency.
- Do not introduce a component library that fights the square, hard-shadow system.

## Do and Do Not

### Do

- Use sharp 3px borders, hard shadows, flat fills, bold type, and square corners.
- Give the hero and project grid the strongest visual moments.
- Use asymmetric layout at desktop and clear single-column order on mobile.
- Keep technical information structured and easy to scan.
- Treat the border as a meaningful signal: container, interaction, selection, focus, or error.

### Do not

- Use rounded SaaS cards, soft shadows, gradients, glassmorphism, blur, or muted low-contrast UI.
- Make every element yellow, shadowed, or oversized.
- Overlay pills or decorative labels on images.
- Use generic marketing language, fake achievements, or fabricated data.
- Use unlabelled icon buttons, invisible focus styles, placeholder-only form labels, or tiny click targets.
- Make the page dark in one section and light in another.

## Pre-Implementation Checklist

- [ ] One light theme, one consistent palette, and one border and shadow system
- [ ] Flat colors only, no gradients or blurred shadows
- [ ] Square corners across cards, buttons, forms, menus, and dialogs
- [ ] Hero fits in the initial viewport with title, supporting text, and actions visible
- [ ] Project images are real or clearly marked placeholders, never fake `div` screenshots
- [ ] Buttons press down on active state and have visible focus rings
- [ ] All primary text and controls pass WCAG AA contrast checks
- [ ] Mobile layout removes overlap and preserves reading order
- [ ] All motion respects `prefers-reduced-motion`
- [ ] No fabricated project data, statistics, testimonials, or client logos

## Reference

This system is informed by [Neubrutalism.com](https://neubrutalism.com/), especially its guidance on flat color, thick borders, square corners, hard shadows, typography, tokenized implementation, and accessibility.
