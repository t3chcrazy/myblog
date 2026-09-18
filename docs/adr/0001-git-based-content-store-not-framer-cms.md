# Content stored as git-based markdown, not Framer CMS

The Framer design was the visual starting point for this site, so Framer CMS was the obvious first guess for a content store. Research confirmed it has no headless/external API — only in-editor plugin access and a manual CSV export — so it can't back a site that isn't hosted and rendered by Framer itself. We instead store Posts as markdown/MDX files in the site's own git repo: zero extra infrastructure or subscription cost, real API access (git itself), and it plugs directly into the pull-request-based draft/publish flow.

**Considered options**: Framer CMS (rejected — no headless access, see above); a hosted headless CMS like Sanity or Contentful (rejected — adds an external service and cost for no benefit over git when the maintainer count is one).
