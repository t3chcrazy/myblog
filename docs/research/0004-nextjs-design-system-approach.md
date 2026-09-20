# Design System / Design Tokens Approach for the Next.js Blog Rebuild

**Ticket context:** feeds a scope decision on extracting a Framer "newspaper" design
(grayscale palette + one accent color, serif headings, sans body, a responsive type
scale with custom breakpoints) into Tailwind CSS tokens for a Next.js App Router blog
rebuild.

**Date researched:** 2026-09-18

## Summary / Recommendation

Next.js's own docs do not prescribe a single mandatory styling technology, but they
explicitly steer new projects toward **Tailwind CSS** as the primary/first path, with
CSS Modules positioned as the fallback for anything Tailwind utilities can't cover.
Tailwind CSS's current stable major version (v4) has replaced the old
`tailwind.config.js` JS theme object with a **CSS-first `@theme` directive** living in
the project's global CSS file as the default/recommended configuration model.
JS config files still work via an explicit `@config` directive for back-compat only,
not as the default. For this project: define the newspaper palette, two font families,
and a named type scale as CSS custom properties inside `@theme` in `app/globals.css`,
and declare the two custom breakpoints (`810px`, `1200px`) either as `@theme`
`--breakpoint-*` variables (for Tailwind-utility-driven overrides) or as `@media`
blocks that redefine the `--font-size-*` custom properties directly (for a token-driven
approach that also works outside Tailwind's utility classes). A concrete example is in
[Question 3](#3-concrete-design-token-example-newspaper-blog).

---

## 1. Does Next.js's official documentation endorse a particular styling approach?

Checked pages: `nextjs.org/docs/app/getting-started/css` (the current canonical
"Styling" doc — as of 2026, `nextjs.org/docs/app/building-your-application/styling` and
`nextjs.org/docs/app/guides/tailwind-css` both resolve to this same page/content,
confirming Next.js has consolidated its styling guidance here rather than keeping
Tailwind as a separate "guide"). Page metadata shows `version: 16.3.5`,
`lastUpdated: 2026-08-25`.

The page opens neutrally, listing all supported mechanisms with no ranking:

> "Next.js provides several ways to style your application using CSS, including:
> Tailwind CSS, CSS Modules, Global CSS, External Stylesheets, Sass, CSS-in-JS"

However, two things in the same page establish Tailwind as first-class/default in
practice, not just "one of several equally weighted options":

1. **Ordering and prominence.** Tailwind CSS is listed first, is the only option with a
   full first-party install walkthrough directly in the main flow (PostCSS plugin setup,
   `@tailwindcss/postcss`, `@import 'tailwindcss'` in `app/globals.css`, wiring into
   `app/layout.tsx`), and is the only option whose install snippet is what every
   `create-next-app` default project ships with (App Router + TypeScript + Tailwind is
   the standard scaffold, confirmed by the exact same `app/globals.css` /
   `app/layout.tsx` shape shown in the docs).
2. **Explicit "Recommendations" language for combining approaches**, at the bottom of
   the page:

   > "**Use Tailwind CSS** for most styling needs as it covers common design patterns
   > with utility classes. Use CSS Modules for component-specific styles when Tailwind
   > utilities aren't sufficient."

   And earlier in the Global CSS section:

   > "We recommend using global styles for *truly* global CSS (like Tailwind's base
   > styles), Tailwind CSS for component styling, and CSS Modules for custom scoped CSS
   > when needed."

So the official, current (2026) Next.js docs do not say "Tailwind is mandatory" or use
words like "default" verbatim, but they use the word **"recommend"** twice, both times
naming Tailwind CSS as the primary mechanism for "most styling needs" / "component
styling," with CSS Modules explicitly scoped down to an overflow case ("when Tailwind
utilities aren't sufficient"). CSS-in-JS and Sass are relegated to separate "guide"
pages linked only under "Next Steps," i.e., treated as secondary/legacy-compatibility
paths, not the primary recommendation.

**Primary source:** [Next.js Docs — "CSS"](https://nextjs.org/docs/app/getting-started/css)
(also reachable via the older URLs `nextjs.org/docs/app/building-your-application/styling`
and `nextjs.org/docs/app/guides/tailwind-css`, which now serve the same consolidated
content).

---

## 2. Tailwind CSS v4's current configuration model: `tailwind.config.js` vs. `@theme`

Checked pages: `tailwindcss.com/docs/theme` ("Theme variables") and
`tailwindcss.com/docs/upgrade-guide`.

### `@theme` is the current, CSS-first default

Per the Theme variables docs:

> "Theme variables are special CSS variables defined using the `@theme` directive that
> influence which utility classes exist in your project... Theme variables aren't
> *just* CSS variables — they also instruct Tailwind to create new utility classes that
> you can use in your HTML."

And on why a special directive is needed instead of plain `:root` variables:

> "Since they do more than regular CSS variables, Tailwind uses special syntax so that
> defining theme variables is always explicit. Theme variables are also required to be
> defined top-level and not nested under other selectors or media queries, and using a
> special syntax makes it possible to enforce that."

Canonical example from the docs (custom color, generates a `bg-mint-500` utility):

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

Custom font family (generates `font-script`):

```css
@import "tailwindcss";

@theme {
  --font-script: "Great Vibes", cursive;
}
```

Custom breakpoint (generates a `3xl:` variant):

```css
@import "tailwindcss";

@theme {
  --breakpoint-3xl: 120rem;
}
```

### `tailwind.config.js` status: legacy compatibility path, not removed, not default

Per the v4 upgrade guide:

> "JavaScript config files are still supported for backward compatibility, but they are
> no longer detected automatically in v4."

To use one, it must be loaded explicitly:

```css
@config "../../tailwind.config.js";
```

With a documented limitation: **`corePlugins`, `safelist`, and `separator` options from
JS configs are not supported in v4.0.**

So: `tailwind.config.js` is not deprecated/removed outright, but it (a) is no longer
auto-detected, (b) requires an explicit opt-in directive to load, (c) has reduced
feature support, and (d) is positioned purely as a migration/back-compat mechanism for
existing v3 projects — not the tool Tailwind's own docs demonstrate first for new
projects. `@theme` in CSS is the CSS-first configuration model and the one shown by
default throughout the current docs (including in the Next.js CSS guide's own Tailwind
setup, which imports Tailwind via `@import 'tailwindcss'` in `app/globals.css` with no
`tailwind.config.js` step at all).

**Primary sources:**
- [Tailwind CSS Docs — "Theme variables"](https://tailwindcss.com/docs/theme)
- [Tailwind CSS Docs — "Upgrade guide"](https://tailwindcss.com/docs/upgrade-guide)

---

## 3. Concrete design token example (newspaper blog)

Given #1 and #2, the recommended mechanism for this project is: CSS custom properties
declared inside `@theme` in `app/globals.css`, imported once in the root layout — no
`tailwind.config.js` needed. Custom breakpoints are declared as `@theme`
`--breakpoint-*` variables (so Tailwind generates matching responsive variants like
`tablet:text-h1`), and the type-scale's own responsive escalation is layered on top
with `@media` blocks that reassign the `--font-size-*` custom properties directly —
this keeps the token *values* single-sourced while still letting the same
`text-h1`-style utility pick up a bigger size past each breakpoint, matching a
newspaper's larger-on-bigger-screens headline behavior.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* --- Custom breakpoints (Tailwind v4 CSS-first) ---
     Overrides the default breakpoint scale with the two breakpoints
     this newspaper layout actually designs around. */
  --breakpoint-tablet: 810px;
  --breakpoint-desktop: 1200px;

  /* --- Grayscale palette + one accent --- */
  --color-ink: oklch(0.18 0.01 285);      /* near-black body/headline text */
  --color-charcoal: oklch(0.32 0.01 285); /* secondary text, captions */
  --color-gray: oklch(0.58 0.01 285);     /* muted text, metadata, rules */
  --color-hairline: oklch(0.82 0.01 285); /* borders, dividers */
  --color-paper: oklch(0.98 0.005 90);    /* page background, "newsprint" */
  --color-accent: oklch(0.55 0.18 25);    /* single accent — e.g. masthead red */

  /* --- Font families --- */
  --font-headline: "Tiempos Headline", "Georgia", serif;
  --font-body: "Inter", "Helvetica Neue", sans-serif;

  /* --- Named type scale (mobile-first base values) --- */
  --font-size-small: 0.8125rem;   /* 13px — captions, metadata */
  --font-size-body: 1.0625rem;    /* 17px — article body copy */
  --font-size-lead: 1.25rem;      /* 20px — lede paragraph */
  --font-size-h3: 1.5rem;         /* 24px — sub-headings */
  --font-size-h2: 2rem;           /* 32px — section headings */
  --font-size-h1: 2.75rem;        /* 44px — headline */
}

/* --- Responsive type-scale overrides ---
   Tailwind v4 keeps @theme values top-level (no nesting under @media
   is allowed inside @theme itself), so the newspaper-style "type gets
   bigger at wider breakpoints" behavior is layered on with plain
   @media blocks that reassign the same custom properties. Any
   Tailwind utility built from these vars (e.g. text-h1, via
   `text-(length:--font-size-h1)` or a mapped utility) — and any
   plain CSS using var(--font-size-h1) — picks up the new value
   automatically past each breakpoint. */
@media (min-width: 810px) {
  :root {
    --font-size-body: 1.125rem;   /* 18px */
    --font-size-lead: 1.375rem;   /* 22px */
    --font-size-h3: 1.75rem;      /* 28px */
    --font-size-h2: 2.5rem;       /* 40px */
    --font-size-h1: 3.5rem;       /* 56px */
  }
}

@media (min-width: 1200px) {
  :root {
    --font-size-body: 1.1875rem;  /* 19px */
    --font-size-lead: 1.5rem;     /* 24px */
    --font-size-h3: 2rem;         /* 32px */
    --font-size-h2: 3rem;         /* 48px */
    --font-size-h1: 4.5rem;       /* 72px */
  }
}
```

Usage in components, mixing generated Tailwind utilities (from the `@theme` color/font
vars) with the responsive type-scale vars applied directly:

```tsx
// app/blog/[slug]/page.tsx
export default function ArticlePage() {
  return (
    <article className="bg-paper text-ink">
      <p className="text-accent font-body text-(length:--font-size-small) uppercase tracking-wide">
        Politics
      </p>
      <h1
        className="font-headline text-ink"
        style={{ fontSize: "var(--font-size-h1)" }}
      >
        Headline Goes Here
      </h1>
      <p
        className="font-body text-charcoal"
        style={{ fontSize: "var(--font-size-lead)" }}
      >
        Lede paragraph text, larger than body copy...
      </p>
      <div
        className="font-body text-ink"
        style={{ fontSize: "var(--font-size-body)" }}
      >
        {/* article body */}
      </div>
      <hr className="border-hairline" />
      <p className="tablet:hidden text-gray text-(length:--font-size-small)">
        Mobile-only byline
      </p>
    </article>
  )
}
```

Notes on the two breakpoint mechanisms shown above (both are documented, current
Tailwind v4 patterns, not invented):
- `--breakpoint-tablet` / `--breakpoint-desktop` in `@theme` — the
  [Theme variables docs](https://tailwindcss.com/docs/theme) show the identical pattern
  for a custom `3xl` breakpoint (`--breakpoint-3xl: 120rem`) generating a `3xl:` variant
  — used here for any Tailwind utility class that needs to change at `810px`/`1200px`
  (e.g. `tablet:hidden`, `tablet:grid-cols-2`).
- Plain `@media (min-width: 810px)` / `@media (min-width: 1200px)` blocks reassigning
  `--font-size-*` — used for the type-scale itself, since `@theme` values must stay
  top-level per Tailwind's own documented constraint ("Theme variables are also
  required to be defined top-level and not nested under other selectors or media
  queries" — [Theme variables](https://tailwindcss.com/docs/theme)). This keeps a
  single custom-property name per token (`--font-size-h1`) whose *value* changes with
  viewport width, which both plain CSS and Tailwind's arbitrary-value utilities
  (`text-(length:--font-size-h1)`) can consume.

---

## Sources

- [Next.js Docs — "CSS"](https://nextjs.org/docs/app/getting-started/css) — current
  canonical Next.js styling doc (also served at the legacy
  `app/building-your-application/styling` and `app/guides/tailwind-css` URLs).
- [Tailwind CSS Docs — "Theme variables"](https://tailwindcss.com/docs/theme) — `@theme`
  directive, custom colors/fonts/breakpoints, top-level-only constraint.
- [Tailwind CSS Docs — "Upgrade guide"](https://tailwindcss.com/docs/upgrade-guide) —
  `tailwind.config.js` backward-compatibility status, `@config` directive, v4.0
  JS-config limitations (`corePlugins`, `safelist`, `separator` unsupported).

---

## Recommendation

For this project — a Next.js App Router blog rebuilding a Framer "newspaper" design
with a grayscale palette + one accent color, serif headlines, sans body copy, and a
type scale that steps up at ~810px and ~1200px — follow Next.js's own steer toward
Tailwind CSS and Tailwind v4's current CSS-first configuration model:

1. Do **not** create a `tailwind.config.js`. Define all design tokens (colors, font
   families, named font sizes, custom breakpoints) as CSS custom properties inside a
   single `@theme` block in `app/globals.css`, imported once via `@import "tailwindcss"`
   in the root layout, per the Next.js CSS doc's own Tailwind setup instructions.
2. Keep the token set small and explicit, as scoped in the ticket: 4-6 grayscale steps
   (`ink`, `charcoal`, `gray`, `hairline`, `paper`) + one `accent`; two font families
   (`--font-headline` serif, `--font-body` sans); a named scale (`small`, `body`,
   `lead`, `h3`, `h2`, `h1`).
3. Declare the two custom breakpoints as `--breakpoint-tablet: 810px` and
   `--breakpoint-desktop: 1200px` inside `@theme` for any Tailwind utility classes that
   need to respond to them, and layer the type scale's own size escalation on top via
   plain `@media (min-width: 810px)` / `@media (min-width: 1200px)` blocks that
   reassign the `--font-size-*` values (required because `@theme` itself cannot contain
   nested `@media` blocks).
4. Reach for CSS Modules only for the rare component-specific style Tailwind utilities
   can't express — consistent with the Next.js docs' explicit recommendation to "use
   Tailwind CSS for most styling needs" and CSS Modules "when Tailwind utilities aren't
   sufficient."

This keeps the design system in one file, avoids a legacy/back-compat-only
configuration path, and matches both projects' own current, primary-source guidance.
