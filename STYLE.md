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
- **Check recent posts in the same Category.** Look at only the 3–4 most recent posts in `content/posts/` whose `Category` matches the new post's, and read only their frontmatter (`title`, `dek`, `tags`), not their bodies. Note any the new post builds on; they feed the background briefing and internal links (see [Linking earlier posts](#linking-earlier-posts)). Don't scan the whole archive or other categories.
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
- Define a term the first time it appears if a working engineer outside this niche might not know it. If the term is already defined in the post's background briefing, don't define it again in the body.

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

- **Frontmatter:** `title`, `slug`, `date`, `Category` (Web/Mobile/Backend/AI), `dek`, `tags`, `banner`, `bannerAlt`, plus `appliesTo` and `related` where they apply (see below).
- **`appliesTo`:** when the post's claims or code depend on specific versions, name them in one short string, e.g. `appliesTo: "Next.js 16.3.5, Vercel Fluid compute"`. It's shown under the byline next to the date, so a reader can tell whether the post has gone stale. Omit it for posts that aren't version-bound.
- **Title:** specific and informative, ≤ 70 characters, sentence case. Promise what the post delivers; no clickbait, no puns that hide the subject.
- **Dek:** one or two sentences, ≤ 160 characters (it doubles as the meta description), stating the post's angle.
- **Tags:** 3–5, lowercase, kebab-case, reusing existing tags from `content/posts/` where they fit.
- **Opening:** the first paragraph states the angle and why it matters now. No scene-setting, no definitions of the obvious. Background for newcomers goes in the briefing that follows, not here.
- **Background briefing:** directly after the opening paragraph, a `<Primer>` block (see [Background briefing](#background-briefing)).
- **Body:** 4–6 `##` sections whose headings are informative on their own (a reader skimming only the headings should get the argument). Use `###` only for genuine sub-parts.
- **Evidence in the body:** at least one concrete artefact — a verified code snippet, a measured number, a configuration example, or a before/after — per major section where the topic allows it.
- **Trade-offs:** a dedicated section or clearly marked passage on limitations, caveats, or when *not* to use the thing.
- **Close:** a concrete takeaway the reader can act on (a decision rule, a checklist, a migration step), not a summary.

## Background briefing

Readers arrive at different levels. The opening paragraph serves the reader who already knows the ground; the briefing serves the one who doesn't, without slowing the first reader down. It renders as a collapsed box ("Background briefing"), so experts skip it with no effort.

- Place it immediately after the opening paragraph, wrapped in `<Primer>` … `</Primer>` with a blank line after the opening tag and before the closing tag (MDX needs them to parse the markdown inside).
- 150–300 words, excluded from the body word count. It's a reference box: terse, no argument, no citations needed beyond the links below.
- Contents, in this order, each as a bold lead-in:
  - **Assumes you know:** one line naming the prerequisites the post won't explain (e.g. "the Next.js App Router and what a serverless function is").
  - **Key terms:** a list of the 3–6 terms the post depends on that a working engineer outside this niche may not know, one or two sentences each. Define them as the post uses them.
  - **The story so far** (only for posts about a change): one or two sentences on how things worked before.
  - **Read first:** earlier posts on this blog that set up this one (see below), plus at most one Tier 1 introduction (official docs page) for the underlying technology. Omit the line if there's nothing worth reading first.
- Don't restate the post's argument or findings in the briefing; it sets up the post, it doesn't summarise it.

Example:

```mdx
<Primer>

**Assumes you know:** the Next.js App Router and what a serverless function is.

**Key terms**

- **Edge Runtime:** a V8-isolate environment with a restricted set of Web APIs and no Node.js built-ins, run in many regions close to users.
- **Cold start:** the delay when a platform has to boot a new instance before it can serve a request.

**Read first:** [React Server Components: What Actually Runs Where](/react-server-components-what-runs-where), for the server/client split this post assumes.

</Primer>
```

## Linking earlier posts

The blog should read as a body of work, not a pile of standalone posts. Link earlier posts wherever they help the reader, and only then.

- Link from the briefing's **Read first** line when an earlier post is real background, and inline in the body where an earlier post covers a point in more depth than this one will.
- Link with a root-relative path to the slug (`/react-server-components-what-runs-where`), never the full `https://…` URL. Use descriptive link text, as with citations.
- Candidates are only the 3–4 recent same-Category posts checked during research. Finding nothing worth linking is a normal outcome; skip the links rather than searching further.
- Only link posts already merged to `main` (present in `content/posts/` on the branch you started from), never another open draft.
- At most ~3 internal links per post. Never add one just to have one.
- List the slugs of posts this one builds on in frontmatter as `related: ["slug-a", "slug-b"]`. They're shown first under "Related Dispatches" at the end of the post. Omit the field if there are none.

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
- One conceptual editorial illustration per post (not a literal screenshot, not stock-photo-style, no text or lettering in the image), drawn as a vintage newspaper engraving. The site tones every banner to sepia and lays a halftone screen over it, so bright colours, neon glows and dark backgrounds turn into muddy grey; the image has to work in monochrome.
- Build the prompt from this template, putting the post's concept in `<subject>`:

  > Vintage 19th-century newspaper engraving of `<subject>`, fine cross-hatched line work, dark sepia ink on cream paper, woodcut and etching style, strong silhouette, plenty of empty cream background, subject centred in the middle horizontal band, no text, no letters, no labels, no border.

- Avoid prompt words that pull the model back to digital art: "3D", "render", "glowing", "neon", "futuristic", "gradient", "photorealistic", "isometric".
- View the result before committing; regenerate (up to 3 attempts) if it contains garbled text, distorted objects, a mostly dark or saturated-colour image instead of ink on cream, or doesn't relate to the post.
- Save as `public/banners/<slug>.png`.
- Reference it in frontmatter: `banner: "/banners/<slug>.png"` and a one-sentence `bannerAlt` describing the image for accessibility.
- If image generation fails or is unavailable, omit `banner`/`bannerAlt` entirely rather than blocking the post — the site renders text-only listings gracefully without a banner.

## Diagrams

Include one explanatory diagram whenever the post describes where things run, how a request or data flows, how components fit together, or how two options compare structurally. That covers most posts on this blog. Skip it only when the topic has no spatial or sequential shape (e.g. a post about API naming conventions), rather than forcing one in:

- Draw the reader's mental model, not decoration: the one picture that makes the post's central point obvious. A good test is whether the diagram alone, with its caption, conveys the main point.
- Place it where the concept is first explained, usually in the first or second `##` section.
- The image's alt text doubles as its visible caption, so write it as a full sentence describing what the diagram shows.
- Keep the cream background (`#fffdf7`) and dark ink strokes used previously; the site frames diagrams as printed plates in both light and dark themes.

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
- [ ] Background briefing present after the opening paragraph: prerequisites, 3–6 key terms, read-first links where they exist, 150–300 words.
- [ ] 3–4 most recent same-Category posts checked (frontmatter only); any relevant ones linked (root-relative, merged only, ≤ ~3) and listed in `related`.
- [ ] `appliesTo` set if the post is version-bound.
- [ ] Diagram included if the topic has a spatial or flow shape.
- [ ] No phrases from the "Don't" list; em-dashes within budget; no rhetorical-question openers.
- [ ] Title ≤ 70 chars, dek ≤ 160 chars, 3–5 tags reusing existing ones.
- [ ] Headings read as a coherent outline on their own.
- [ ] Close gives an actionable takeaway.
- [ ] `bun run build` succeeds with the post included.
