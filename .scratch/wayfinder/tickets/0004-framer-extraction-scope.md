---
title: What to extract from the Framer design, and how to represent it in code
label: wayfinder:grilling
status: closed
assignee: abhishekprashant09@gmail.com
blocked_by: []
---

## Question

Using the `framer` skill against the linked Framer project (newspaper-style design), decide: which parts of the design get extracted (layout/grid, color palette, type scale, specific components like masthead/teaser-card/section-nav) versus rebuilt freehand; and how the extracted design system gets represented in the Next.js codebase (design tokens file, Tailwind config, CSS variables, or component-level constants). Requires the `framer` skill's mandatory precondition (`npx @framer/agent@latest setup`) to have been run first.

## Resolution

Extracted from the linked Framer project (a "Reado" newspaper-magazine template):

- **Rebuild scope**: only the blog (home, blog index, blog detail, categories, author). The template's Podcast and Video-blog sections/collections are dropped — out of scope for this destination (see map's Out of scope section).
- **Load-bearing, extract faithfully**: the type pairing (serif display "Nanum Myeongjo" for headings h1-h6, sans "Switzer" for body/nav text) and its full responsive size scale (breakpoints at 810px/1200px, already defined per heading level in Framer); the near-grayscale palette (black/white/silver/charcoal) plus the single accent color Warm Beige (`#F0BF75`); the repeating "category section (header + card grid) + divider" pattern that runs down the home page — this *is* the newspaper identity.
- **Incidental, simplify not omit**: the hero's decorative background vector shapes. Per Q4, approximate rather than pixel-match, but keep enough visual weight (shape, placement, rough scale) that the hero doesn't read as flat/empty next to the original.
- **Dropped for v1**: the footer's email-subscribe block — the design has one, but it has no backend (reader interactivity is already out of scope per the map), so it's cut from the layout entirely rather than shipped as a non-functional placeholder.
- **Representation**: per Next.js's own docs (Tailwind CSS is the recommended default styling approach for App Router) and Tailwind v4's current CSS-first config model, skip `tailwind.config.js` entirely. Define the token set as CSS custom properties in a single `@theme` block in `app/globals.css`: the grayscale + accent colors, the two font families, a named type scale (small/body/lead/h3/h2/h1), and `--breakpoint-*` vars for 810px/1200px. The type scale's responsive escalation layers on top via plain `@media` blocks reassigning the `--font-size-*` vars, since `@theme` itself can't nest media queries.

Full research backing the representation choice: [docs/research/0004-nextjs-design-system-approach.md](../../../docs/research/0004-nextjs-design-system-approach.md)
