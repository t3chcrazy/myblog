# Post style guide

Governs every weekly post the pipeline drafts. See [decision](.scratch/wayfinder/tickets/0006-research-methodology.md).

## Sources

- Valid: official docs/specs, and reputable engineering blogs (vendor blogs, known practitioners).
- Not valid on their own: forum threads, social media takes, unverified community posts — usable only if corroborated by a valid source above.
- Minimum 3 sources per post.
- Cite inline as markdown links at the exact claim they support — not a bibliography dump at the end.

## Tone

- Fun, engaging, opinionated where the evidence supports it — not a dry docs rehash.
- Write for a reader who already codes but hasn't necessarily used this specific tool/pattern yet.
- Prefer concrete examples and code snippets over abstract description.
- Short paragraphs. Avoid hedging ("it depends", "in some cases") unless the nuance itself is the point.

## Length

- Target 800–1,400 words body, excluding frontmatter and code blocks.

## Structure

- Frontmatter: `title`, `slug`, `date`, `Category` (Web/Mobile/Backend/AI), `dek`, `tags`, `banner`, `bannerAlt`.
- Open with the dek's angle stated plainly in the first paragraph — no throat-clearing intro.
- Section headings for distinct sub-topics; avoid a single unbroken wall of text.
- Close with a concrete takeaway, not a generic summary restatement.

## Banner image

Every post gets one banner/thumbnail image, shown on the front page and in category/archive listings:

- Generate via Cloudflare Workers AI's `@cf/black-forest-labs/flux-1-schnell` model (`steps: 8`, the model's max, for best quality), superseding the Gemini approach in [ticket 0001](.scratch/wayfinder/tickets/0001-image-gen-model.md) — Google cut free-tier image quota in Dec 2025. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment. At ~100 neurons per image against a 10,000-neuron/day free allocation (no billing plan required), this is free at one post/week.
- One conceptual editorial illustration per post (not a literal screenshot, not stock-photo-style) — 16:9 aspect ratio.
- Save as `public/banners/<slug>.png`.
- Reference it in frontmatter: `banner: "/banners/<slug>.png"` and a one-sentence `bannerAlt` describing the image for accessibility.
- If image generation fails or is unavailable, omit `banner`/`bannerAlt` entirely rather than blocking the post — the site renders text-only listings gracefully without a banner.

## Diagrams

Only when the topic genuinely benefits from one explanatory diagram (architecture, flow, comparison) — do not force a diagram into every post:

- Generate hand-drawn-style SVGs headlessly with `@excalidraw/utils`'s `exportToSvg`, run from a small Node script in the pipeline's sandbox — not the Excalidraw MCP connector (it only renders a live view for the chat UI, with no way to export a static file; see [ticket 0009](.scratch/wayfinder/tickets/0009-diagram-export.md)).
- Write the diagram as an Excalidraw scene (a plain JSON `elements` array — rectangles, arrows, text, matching the element schema/color palette used previously), then call `exportToSvg({ elements, appState: { exportBackground: true, ... } })` and write the returned SVG's markup to disk. Install the package on the fly (`npm install --no-save @excalidraw/utils`) since the pipeline's sandbox isn't pre-provisioned with it.
- Save to `public/diagrams/<slug>-<n>.svg`, embedded in the post body at the point it's explained (`![alt text](/diagrams/<slug>-<n>.svg)`), not bundled into the banner.
- If the export fails for any reason (missing canvas/DOM support in the sandbox, package install failure, etc.), skip this step entirely and omit the diagram rather than blocking the post — same fallback as the banner image.
