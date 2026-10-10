# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: working software engineers across web, mobile, backend, and AI who visit weekly to learn one well-sourced technical concept they can apply.

Secondary: hiring managers and prospective clients arriving from Abhishek Prashant's portfolio (abhishekprashant.dev), who read the blog as evidence of depth and judgment.

Engineers come first; when the two audiences pull in different directions, the engineer reading the post wins.

## Product Purpose

Auxesis is a weekly, AI-powered technical publication by Abhishek Prashant, live at abhishekprashant.dev/blog. It tests whether AI can research a subject rigorously, present it clearly, and sustain that standard week after week, with a person accountable for everything that publishes.

Success means:

- **Trusted accuracy:** readers can rely on each post because claims are sourced to official docs and reputable engineering sources, and a human reviews every post before it goes live.
- **Steady weekly cadence:** one post per week, reliably, via the pipeline.
- **Career signal:** the publication strengthens Abhishek's profile for freelance and full-time work.

## Positioning

An openly AI-researched publication with a human editor of record. Each post is researched against tiered sources, drafted to a fixed style guide (`STYLE.md`), opened as a pull request, and published only when a person merges it. The process is public in the repository rather than hidden.

## Operating Context

- A weekly pipeline picks a topic from `backlog.md`, researches it, drafts a Post, and opens a pull request (a Draft). Merging that PR is the act of Publish.
- Readers arrive via the portfolio's Blog link, RSS (`/blog/feed.xml`), search engines, and direct links to individual posts.
- Content is git-tracked MDX in `content/posts/`; terminology (Post, Dek, Category, Tag, Backlog, Draft, Publish) is defined in `CONTEXT.md`.

## Capabilities and Constraints

- Next.js App Router site served under the `/blog` base path on abhishekprashant.dev; deployed on Vercel.
- Static full-text search via Pagefind; RSS feed; per-post Open Graph images; sitemap.
- Each Post has exactly one Category (Web, Mobile, Backend, AI) plus orthogonal Tags.
- Posts carry a banner image and may include diagrams, per `STYLE.md`.
- Architecture decisions live in `docs/adr/`; research notes in `docs/research/`.

## Brand Commitments

Binding unless the user changes them:

- The name **Auxesis**.
- The newspaper/broadsheet framing of the site (masthead, sections, deks, edition metadata).
- Plain disclosure that posts are AI-researched and human-reviewed before publishing.
- The four Categories: Web, Mobile, Backend, AI.
- The teal-gradient SVG icon (`app/icon.svg`), shared with the portfolio site as a cross-site identity mark.

## Evidence on Hand

- Published posts in `content/posts/` (5 as of 2026-10-10).
- The editorial style guide, `STYLE.md`, and the public repository documenting the process.
- Author links: GitHub (github.com/t3chcrazy), portfolio (abhishekprashant.dev), LinkedIn.
- No subscriber counts, testimonials, press, or traffic figures exist. Future work must not invent them.

## Product Principles

1. **Accuracy over volume.** A sourced, reviewed post beats a faster or longer one.
2. **Show the process.** The AI-plus-human workflow is part of the product, not a footnote.
3. **Engineers first.** Optimize for someone reading to understand and apply a concept; the portfolio audience is served by that same quality.
4. **One concept, done well.** Each week covers a single topic in depth rather than a roundup.
