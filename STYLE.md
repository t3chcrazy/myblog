# Post style guide

Governs every weekly post the pipeline drafts. See [decision](.scratch/wayfinder/tickets/0006-research-methodology.md).

The bar: a senior engineer should finish a post having learned something specific they could not have got from the first page of the official docs, and should find nothing in it they could fault on accuracy or tone.

## Research

Research is the bulk of the work, not a preamble to drafting. A post is only as good as its notes.

### Source tiers

- **Tier 1 — primary:** official documentation, specifications/RFCs, release notes and changelogs, source code and its tests, the maintainers' own design docs or RFC discussions.
- **Tier 2 — expert secondary:** engineering blogs from the vendor or from companies running the technology in production, conference talks by maintainers, well-known practitioners writing under their own name.
- **Not citable on their own:** forum threads, Stack Overflow answers, social media, SEO/content-farm tutorials, AI-generated summaries. Use them only to find leads, then cite the Tier 1/2 source that confirms the point.

### Minimums

- At least **6 distinct sources across at least 4 distinct domains**, of which at least **3 are Tier 1**.
- At least one source that goes **beyond the getting-started page**: a changelog, a spec section, an RFC, a GitHub issue/PR by a maintainer, source code, or a production case study.
- For any comparison ("X vs Y"), Tier 1 sources for **every** side being compared.

### Method

- **Read the full page, not a summary.** When a fetch tool returns a model-generated summary, treat it as a lead: re-fetch with a prompt asking for verbatim quotes of the specific passages you intend to rely on.
- **Pin versions and dates.** Record the version each claim applies to and when the source was published/updated. Prefer the most recent authoritative source; flag anything older than ~18 months for a freshness check against the current docs or changelog.
- **Corroborate non-obvious claims.** Anything surprising, numeric (performance figures, limits, prices, quotas) or load-bearing for the post's argument needs two independent sources, or one Tier 1 source quoted verbatim.
- **Verify code.** Every code snippet must be run in the sandbox (or be a verbatim, cited excerpt from official docs). Note the runtime/library versions it was run against.
- **Look for the counter-argument.** Actively search for the known limitations, open issues, and criticisms of the thing being written about. A post that only repeats the vendor's framing is marketing, not journalism.
- **Find the angle.** Before drafting, write down in one sentence what this post says that the official docs don't. If you can't, research further or choose another topic.

## Voice and wording

Write like a senior engineer's column in a respected technical publication: authoritative, precise, and readable. Opinionated where the evidence supports it; never breezy, never salesy.

### Do

- State the claim plainly, then support it. Lead paragraphs with the point.
- Be specific: name the API, the flag, the version, the number. "Adds ~40 KB gzipped" beats "adds a lot of JavaScript".
- Qualify precisely instead of hedging vaguely: "as of Next.js 16.2" or "on the Node.js runtime" rather than "in some cases".
- Vary sentence length. Prefer the active voice and concrete subjects.
- Use "we"/"you" sparingly and consistently; the default voice is third person, addressing a reader who already codes.
- Define a term the first time it appears if a working engineer outside this niche might not know it.

### Don't

These are the patterns that make copy read as machine-written or amateurish. The review pass must remove them.

- **Filler intensifiers and throat-clearing:** "actually", "really", "simply", "just", "basically", "it's worth noting", "it's important to remember", "needless to say", "at the end of the day".
- **Hype vocabulary:** "game-changer", "revolutionary", "supercharge", "unlock", "seamless", "robust", "powerful", "cutting-edge", "delve", "landscape", "leverage" (as a verb), "in today's fast-paced world".
- **Formulaic contrasts** as a crutch: "X isn't just Y — it's Z", "not a switch, a boundary", "the real X is…". Allowed at most once per post, and only when the contrast is the point.
- **Em-dash overuse:** at most ~1 per 150 words. Prefer commas, colons, parentheses, or two sentences.
- **Rhetorical questions** as section openers, and "Let's dive in" / "Let's take a look" style transitions.
- **Generic closers:** "In conclusion", "In summary", "Happy coding", "The future is bright", or restating the intro.
- **Unsupported superlatives:** "the best", "the fastest", "everyone", "always", "never" without a citation or measurement.
- **Second-hand certainty:** don't present a vendor's marketing claim as fact; attribute it ("Vercel says…", "according to the React team…").

## Length

- Target 1,200–1,800 words of body prose, excluding frontmatter and code blocks. Shorter is fine if the topic is genuinely covered; padding is worse than brevity.

## Structure

- **Frontmatter:** `title`, `slug`, `date`, `Category` (Web/Mobile/Backend/AI), `dek`, `tags`, `banner`, `bannerAlt`.
- **Title:** specific and informative, ≤ 70 characters, sentence case. Promise what the post delivers; no clickbait, no puns that hide the subject.
- **Dek:** one or two sentences, ≤ 160 characters (it doubles as the meta description), stating the post's angle.
- **Tags:** 3–5, lowercase, kebab-case, reusing existing tags from `content/posts/` where they fit.
- **Opening:** the first paragraph states the angle and why it matters now. No scene-setting, no definitions of the obvious.
- **Body:** 4–6 `##` sections whose headings are informative on their own (a reader skimming only the headings should get the argument). Use `###` only for genuine sub-parts.
- **Evidence in the body:** at least one concrete artefact — a verified code snippet, a measured number, a configuration example, or a before/after — per major section where the topic allows it.
- **Trade-offs:** a dedicated section or clearly marked passage on limitations, caveats, or when *not* to use the thing.
- **Close:** a concrete takeaway the reader can act on (a decision rule, a checklist, a migration step), not a summary.

## Citations

- Cite inline as markdown links at the exact claim they support, using descriptive link text ("the [React 19 release notes](…)"), never "here" or a bare URL.
- Link to the most specific anchor available (the section, not the docs home page).
- Quote sparingly and exactly; paraphrase otherwise.
- Every factual claim a reader might want to verify should be one click from its source.

## Code

- Use the language tag on every fenced block (`ts`, `tsx`, `bash`, …).
- Keep snippets minimal but complete enough to run or paste; elide with a comment (`// …`) rather than silently.
- State the versions the code targets if behaviour differs across versions.
- No placeholder code that couldn't work (`doSomething()`), unless clearly marked as pseudocode.

## Banner image

Every post gets one banner/thumbnail image, shown on the front page and in category/archive listings:

- Generate via Cloudflare Workers AI's `@cf/black-forest-labs/flux-1-schnell` model (`steps: 8`, the model's max, for best quality), superseding the Gemini approach in [ticket 0001](.scratch/wayfinder/tickets/0001-image-gen-model.md) — Google cut free-tier image quota in Dec 2025. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment. At ~100 neurons per image against a 10,000-neuron/day free allocation (no billing plan required), this is free at one post/week.
- The model returns a 1024×1024 JPEG (it rejects `width`/`height` parameters). Compose the prompt so the subject sits in the middle horizontal band, then centre-crop to 16:9 (1024×576) and convert to PNG (e.g. with Pillow).
- One conceptual editorial illustration per post (not a literal screenshot, not stock-photo-style, no text or lettering in the image). Aim for a restrained, print-editorial look consistent with the site's muted paper-and-ink palette.
- View the result before committing; regenerate (up to 3 attempts) if it contains garbled text, distorted objects, or doesn't relate to the post.
- Save as `public/banners/<slug>.png`.
- Reference it in frontmatter: `banner: "/banners/<slug>.png"` and a one-sentence `bannerAlt` describing the image for accessibility.
- If image generation fails or is unavailable, omit `banner`/`bannerAlt` entirely rather than blocking the post — the site renders text-only listings gracefully without a banner.

## Diagrams

Only when the topic genuinely benefits from one explanatory diagram (architecture, flow, comparison) — do not force a diagram into every post:

- Generate hand-drawn-style SVGs headlessly with `@excalidraw/utils`'s `exportToSvg`, run from a small Node script in the pipeline's sandbox — not the Excalidraw MCP connector (it only renders a live view for the chat UI, with no way to export a static file; see [ticket 0009](.scratch/wayfinder/tickets/0009-diagram-export.md)).
- Write the diagram as an Excalidraw scene (a plain JSON `elements` array — rectangles, arrows, text, matching the element schema/color palette used previously), then call `exportToSvg({ elements, appState: { exportBackground: true, ... } })` and write the returned SVG's markup to disk. Install the package on the fly (`npm install --no-save @excalidraw/utils`) since the pipeline's sandbox isn't pre-provisioned with it.
- Save to `public/diagrams/<slug>-<n>.svg`, embedded in the post body at the point it's explained (`![alt text](/diagrams/<slug>-<n>.svg)`), not bundled into the banner.
- If the export fails for any reason (missing canvas/DOM support in the sandbox, package install failure, etc.), skip this step entirely and omit the diagram rather than blocking the post — same fallback as the banner image.

## Pre-publish checklist

The pipeline runs this against the draft and fixes every failure before opening the PR.

- [ ] The one-sentence angle is stated in the first paragraph and is something the official docs don't already say.
- [ ] ≥ 6 sources, ≥ 4 domains, ≥ 3 Tier 1, at least one beyond the getting-started page.
- [ ] Every factual claim traced to a note with a source; every number/limit/version corroborated or quoted.
- [ ] Every code snippet run (or cited verbatim) and tagged with its language.
- [ ] Limitations/trade-offs covered.
- [ ] No phrases from the "Don't" list; em-dashes within budget; no rhetorical-question openers.
- [ ] Title ≤ 70 chars, dek ≤ 160 chars, 3–5 tags reusing existing ones.
- [ ] Headings read as a coherent outline on their own.
- [ ] Close gives an actionable takeaway.
- [ ] `bun run build` succeeds with the post included.
