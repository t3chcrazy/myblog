# blog-router

Cloudflare Worker that serves this blog at `abhishekprashant.dev/blog/*`.
The portfolio (GitHub Pages, proxied by Cloudflare) keeps every other path.

Deploy (needs `wrangler login` once):

    npx wrangler deploy --config worker/wrangler.jsonc

- `ORIGIN` in `wrangler.jsonc` is the Vercel production URL.
- The Next.js app uses `basePath: "/blog"`, so the path is forwarded unchanged.
- Vercel needs `SITE_URL=https://abhishekprashant.dev` set for the sitemap and RSS feed.
- Vercel Deployment Protection must not cover the production URL.
