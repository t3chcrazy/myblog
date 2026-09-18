---
title: Baseline SEO approach for the Next.js/MDX blog
label: wayfinder:research
status: closed
assignee: null
blocked_by: []
---

## Question

What's the standard, low-effort way to get meta tags (title/description/OG/Twitter cards), sitemap.xml, and an RSS/Atom feed working for a Next.js (App Router) blog backed by MDX files with the front-matter schema already decided (title, slug, date, Category, dek, tags, body)? Recommend a concrete approach/library (e.g. `next-sitemap`, built-in `generateMetadata`, a hand-rolled RSS route) rather than a general survey.

## Resolution

Use Next.js's async `generateMetadata({ params })` export in `app/blog/[slug]/page.tsx` to build title/description(from dek)/openGraph/twitter fields from MDX front-matter. Use the built-in `app/sitemap.ts` (`MetadataRoute.Sitemap`) rather than the third-party `next-sitemap` package, enumerating MDX slugs. Hand-roll an RSS Route Handler (`app/feed.xml/route.ts`) returning XML — App Router has no built-in feed convention; the unaffiliated `feed` npm package can assemble it. Caveats: `params` is a Promise since Next.js 15; `feed` package and the `next-sitemap` comparison are non-official.

Full findings: [docs/research/0002-seo-conventions.md](../../../docs/research/0002-seo-conventions.md)
