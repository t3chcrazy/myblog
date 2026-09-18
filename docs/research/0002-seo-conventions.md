# Baseline SEO for the Next.js/MDX blog

**Ticket:** `.scratch/wayfinder/tickets/0002-seo-conventions.md` — "What's the standard, low-effort way to get meta tags, sitemap.xml, and an RSS/Atom feed working?"

**Summary of recommendations:** (1) use the built-in App Router `generateMetadata` async function in `app/blog/[slug]/page.tsx` to derive `title`, `description`, `openGraph`, and `twitter` metadata directly from each post's MDX front-matter — no extra package needed; (2) use Next.js's built-in `app/sitemap.ts` file convention (returning `MetadataRoute.Sitemap`) rather than the third-party `next-sitemap` package, since the framework now covers dynamic sitemap generation natively; (3) since the App Router has no built-in RSS/Atom convention, hand-roll a Route Handler (e.g. `app/feed.xml/route.ts`) that reads all MDX front-matter and returns an XML `Response`, optionally using the `feed` npm package purely for XML assembly (not a Next.js-endorsed choice — just a common unopinionated helper).

All three are "low-effort" in the sense that they need zero or one small dependency and lean entirely on framework-native file conventions, which is consistent with a project that already has a stable front-matter schema (`title, slug, date, Category, dek, tags, body`).

---

## 1. Meta tags (Open Graph + Twitter cards) via `generateMetadata`

### Recommended approach

Export an async `generateMetadata({ params })` function from `app/blog/[slug]/page.tsx` that:
- reads `params.slug` (a `Promise` in current Next.js versions — must be `await`ed),
- loads the corresponding MDX file's front-matter (title, dek, date, Category, tags),
- returns a `Metadata` object with `title`, `description` (from `dek`), `openGraph` (`type: 'article'`, `title`, `description`, `publishedTime`, `tags`, `images`), and `twitter` (`card: 'summary_large_image'`, `title`, `description`, `images`).

This is the documented, zero-dependency pattern for per-route dynamic metadata in the App Router. Static/file-based metadata (e.g. `opengraph-image.tsx`) is an alternative for the image itself, but the text/OG/Twitter fields should come from `generateMetadata`.

Two version-relevant details from the docs:
- `params` is a `Promise` in Route Handlers/pages/`generateMetadata` as of Next.js 15+ (breaking change from 14, where `params` was a plain object) — the current docs' async/await pattern reflects 15+/16.
- `metadataBase` should be set once in the root `app/layout.tsx` so that relative image paths in `openGraph.images`/`twitter.images` resolve to absolute URLs (Open Graph/Twitter require absolute image URLs).
- The `openGraph.tags` field (used for article keyword tags) is part of Next.js's `Article`-variant OpenGraph type, but is not shown in the primary `generateMetadata` reference page's worked example (that page only shows `publishedTime` and `authors` for the article type). Treat `tags` as documented-in-types-but-not-illustrated-in-prose; verify against `next` package's shipped TypeScript types (`node_modules/next/dist/lib/metadata/types/opengraph-types.d.ts`) if strict validation is needed. This is flagged as a caveat below.

### Code sketch

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/posts' // reads MDX front-matter

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug) // { title, date, Category, dek, tags, ... }
  if (!post) return {}

  const url = `https://example.com/blog/${slug}`
  const ogImage = `https://example.com/og/${slug}.png` // or a static/opengraph-image.tsx route

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.dek,
      url,
      publishedTime: post.date,
      tags: post.tags,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.dek,
      images: [ogImage],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  // render post.body ...
}
```

```tsx
// app/layout.tsx (root) — required so relative image URLs resolve
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
}
```

### Sources

- generateMetadata function signature, async/await `params`, dynamic-data pattern for `app/blog/[slug]/page.tsx`: https://nextjs.org/docs/app/getting-started/metadata-and-og-images (Next.js docs, version 16.3.5 snapshot, updated 2026-08-25)
- Full `generateMetadata` API reference, `openGraph` fields (`type: 'article'`, `publishedTime`, `authors`) and `twitter` fields (`card: 'summary_large_image'`, `title`, `description`, `images`), `metadataBase` behavior and requirement for absolute image URLs: https://nextjs.org/docs/app/api-reference/functions/generate-metadata (Next.js docs, version 16.3.5 snapshot, updated 2026-08-25)
- File-based metadata conventions (favicons, `opengraph-image`, `robots.txt`, `sitemap.xml`) as an alternative/complement to `generateMetadata`: https://nextjs.org/docs/app/api-reference/file-conventions/metadata (referenced from the metadata-and-og-images page)

---

## 2. `sitemap.xml`

### Recommended approach: built-in `app/sitemap.ts`, not `next-sitemap`

Next.js's App Router ships a native `sitemap.(js|ts)` file convention at `app/sitemap.ts` that exports a default function returning `MetadataRoute.Sitemap` — an array of `{ url, lastModified, changeFrequency, priority }` objects. This has been a stable, documented convention since Next.js 13.3.0 (with `changeFrequency`/`priority` added in 13.4.14), is cached by default, and requires no additional dependency. The official docs make no mention of `next-sitemap`, and the built-in convention fully covers this project's need (a flat list of MDX-backed blog post URLs plus static routes) — including localization and multi-file splitting for larger sites via `generateSitemaps`, which this blog is unlikely to need.

`next-sitemap` (a popular third-party package, historically used because the Pages Router had no native sitemap support) is not needed here: it adds a build-step dependency and a separate config file to solve a problem the App Router already solves natively. Recommend the built-in `sitemap.ts` unless the project later needs Pages-Router-only compatibility or i18n features beyond what `alternates.languages` provides.

### Code sketch

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts' // reads all MDX front-matter

const BASE_URL = 'https://example.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts() // [{ slug, date, ... }]

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...postEntries,
  ]
}
```

### Sources

- `sitemap.(xml|js|ts)` file convention, `MetadataRoute.Sitemap` return type/shape, dynamic generation example, caching note, version history (introduced v13.3.0, `changeFrequency`/`priority` added v13.4.14, localization added v14.2.0): https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap (Next.js docs, version 16.3.5 snapshot, updated 2026-08-25)
- File-based metadata conventions listing `sitemap.xml` as a first-class special file alongside `robots.txt`, favicons, and OG images (no third-party package referenced): https://nextjs.org/docs/app/getting-started/metadata-and-og-images

---

## 3. RSS / Atom feed

### Recommended approach

The App Router has **no built-in RSS/Atom convention** (unlike `sitemap.ts` and `robots.ts`). The documented, official mechanism for producing arbitrary non-HTML output (XML, JSON, plain text, etc.) is a **Route Handler** — a `route.ts` file exporting an HTTP method function (`GET`) that returns a `Response`/`NextResponse` with a custom `Content-Type` header. Next.js's own Route Handler reference page shows exactly this pattern for RSS, using `app/rss.xml/route.ts` as the example filename and setting `'Content-Type': 'text/xml'`.

For this project, place the handler at `app/feed.xml/route.ts` (or `app/rss.xml/route.ts`), read all MDX post front-matter (title, slug, date, dek, Category), and build the XML string. Hand-writing the XML is viable for a small blog, but using a small library to assemble valid RSS 2.0/Atom/JSON Feed output (e.g. the `feed` npm package) reduces boilerplate and edge-case bugs (escaping, `<link>`/`<guid>` construction, `RFC 822` vs ISO date formats). This library choice is **not** a Next.js-documented pattern — it is an ordinary npm dependency with no special integration; only the Route Handler mechanism itself is Next.js's documented convention.

### Code sketch

```ts
// app/feed.xml/route.ts
import { Feed } from 'feed' // npm package — NOT an official Next.js API, see caveats
import { getAllPosts } from '@/lib/posts'

const BASE_URL = 'https://example.com'

export async function GET() {
  const posts = await getAllPosts() // [{ slug, title, date, dek, Category, tags }]

  const feed = new Feed({
    title: 'My Blog',
    description: 'Latest posts',
    id: BASE_URL,
    link: BASE_URL,
    language: 'en',
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
    feedLinks: { rss2: `${BASE_URL}/feed.xml` },
  })

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${BASE_URL}/blog/${post.slug}`,
      link: `${BASE_URL}/blog/${post.slug}`,
      description: post.dek,
      category: [{ name: post.Category }],
      date: new Date(post.date),
    })
  }

  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}
```

### Sources

- Route Handler mechanism, HTTP method exports (`GET`), returning a `Response` with custom headers, and the explicit "Non-UI Responses" section whose worked example is an RSS feed at `app/rss.xml/route.ts` with `Content-Type: text/xml`: https://nextjs.org/docs/app/api-reference/file-conventions/route (Next.js docs, version 16.3.5 snapshot, updated 2026-04-30; Route Handlers introduced v13.2.0)
- Confirmation that sitemap/robots/icons/OG images have "built-in support" but RSS is not in that list (implying no native RSS convention), from the same Route Handlers reference page's "Non-UI Responses" section.

---

## Open questions / caveats

- **`openGraph.tags` for article type**: confirmed to exist in Next.js's shipped Metadata TypeScript types for the `article` OpenGraph variant, but the official `generateMetadata` reference page's worked "article" example only demonstrates `publishedTime` and `authors`, not `tags`. Verify against the installed `next` version's type definitions before relying on it, since sub-fields of `openGraph` for the `article` type have not been observed to change across recent versions but are documented more thinly than top-level fields.
- **Next.js version drift**: all citations above reflect a Next.js docs snapshot dated 2026-08-25 (framework version ~16.3.5 per the docs site's own version banner). Key version-sensitive facts baked into the code sketches: `params` is a `Promise` (breaking change introduced in v15.0.0-RC, carried into 16), Route Handler `context.params` is likewise a `Promise` since v15.0.0-RC, and `sitemap.ts`'s `id` param (only relevant if using `generateSitemaps`, not needed here) became a `Promise` in v16.0.0. If this project pins an older Next.js major (13 or 14), remove the `await params` steps and confirm against that version's docs.
- **`feed` npm package**: this is a normal, unaffiliated npm package for XML feed generation — not an Next.js-documented or Next.js-endorsed tool. It was chosen here only as a convenience for correctly-escaped, spec-compliant RSS/Atom/JSON Feed XML; a hand-rolled XML string (as in Next.js's own doc example) is equally valid and adds zero dependencies if preferred.
- **`next-sitemap` was not deep-audited feature-by-feature**: the recommendation to skip it rests on (a) the official docs never mentioning it as a recommended pairing, and (b) the built-in `sitemap.ts` convention covering this project's actual requirements (flat MDX-backed URL list, no need for automatic `next.config` route-scraping, robots.txt merging, or Pages-Router support). If a future requirement needs it (e.g. auto-discovering routes across a large mixed Pages+App Router codebase), that would justify revisiting this call.
