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

- Generate via Gemini's image model ("Nano Banana"), per [ticket 0001](.scratch/wayfinder/tickets/0001-image-gen-model.md). Requires `GEMINI_API_KEY` in the environment.
- One conceptual editorial illustration per post (not a literal screenshot, not stock-photo-style) — 16:9 aspect ratio.
- Save as `public/banners/<slug>.png`.
- Reference it in frontmatter: `banner: "/banners/<slug>.png"` and a one-sentence `bannerAlt` describing the image for accessibility.
- If image generation fails or is unavailable, omit `banner`/`bannerAlt` entirely rather than blocking the post — the site renders text-only listings gracefully without a banner.
