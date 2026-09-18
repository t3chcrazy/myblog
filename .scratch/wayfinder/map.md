---
label: wayfinder:map
status: open
---

# AI Blog — spec map

## Destination

A full technical spec — site rebuild (design + Next.js) + content pipeline + weekly automation — ready to hand off as implementation tickets. Not the implementation itself: this map produces decisions, not code.

## Notes

- Domain: AI-generated/AI-maintained weekly blog (web/mobile/backend/AI topics), newspaper-style UI.
- No tracker was configured for this effort, and this directory is not yet a git repo — using the **local-markdown tracker**: this map and its tickets live under `.scratch/wayfinder/`, blocking is a `blocked_by` frontmatter list (no native dependency graph available).
- Skills to consult per ticket: `framer` (design extraction), `research` (AFK research tickets), `grilling` + `domain-modeling` (HITL decision tickets).
- Standing decisions already locked during destination-naming (see `CONTEXT.md` and `docs/adr/0001…`, `0002…`), not re-litigated as tickets:
  - Framer project = visual reference only, extracted via `framer` skill; site rebuilt as custom code (Next.js, Vercel), not hosted on Framer.
  - Content store = git-based markdown/MDX in-repo (Framer CMS ruled out, no headless API).
  - Publish flow = draft-and-approve via GitHub PR; merge = publish.
  - Cadence = Claude Code `schedule` skill (Routines); confirmed viable (clones repo fresh, pushes `claude/`-prefixed branches, opens PRs under your GitHub identity).
  - Pipeline shape = backlog check → deep research → draft write → generate diagrams/assets → open PR.
  - Post schema = title, slug, date, Category (Web/Mobile/Backend/AI), dek, tags, body.
  - Failure handling = fail loudly, no auto-retry, but a manual re-run path must exist.
  - Repo/domain/hosting: created from scratch, after this spec is locked.

## Decisions so far

- [Baseline SEO approach for the Next.js/MDX blog](../wayfinder/tickets/0002-seo-conventions.md): `generateMetadata` for meta/OG tags, built-in `app/sitemap.ts` (not `next-sitemap`), hand-rolled `app/feed.xml/route.ts` for RSS.
- [How to manually re-run a failed Routine](../wayfinder/tickets/0003-routines-manual-retry.md): "Run now" on the routine's page, or `/schedule run <name>` — reuses stored config unchanged; `/schedule why did my <name> fail?` for diagnostics.
- [Pick an image-gen model for explanatory diagrams](../wayfinder/tickets/0001-image-gen-model.md): Gemini image model ("Nano Banana") via API key — cheap, headless, best text/label rendering.
- [What to extract from the Framer design, and how to represent it in code](../wayfinder/tickets/0004-framer-extraction-scope.md): keep type pairing (serif/sans), grayscale+accent palette, and the category-section+divider pattern; simplify hero vectors; drop the subscribe block; represent tokens as a Tailwind v4 `@theme` block in `globals.css`, not `tailwind.config.js`.
- [Backlog file format and topic-selection rule](../wayfinder/tickets/0005-backlog-format.md): single `backlog.md` markdown checklist, agent picks next unstarted/uncovered topic by judgment (not FIFO/priority), user seeds/vetoes via PR edits, agent proposes new topics itself when backlog runs dry.
- [Deep-research methodology and quality bar for each post](../wayfinder/tickets/0006-research-methodology.md): official docs/specs + reputable eng blogs only, 3+ sources cited inline, tone/length/structure enforced via an in-repo `STYLE.md` rather than per-run judgment.
- [PR/publish workflow specifics](../wayfinder/tickets/0007-pr-publish-workflow.md): branch `claude/post-<slug>`, PR body = post preview + research summary, Vercel preview deploy required on the PR, merge auto-deploys prod via Vercel's git integration.
- [Set up Claude Code Routines prerequisites](../wayfinder/tickets/0008-routines-setup.md): repo `t3chcrazy/myblog` created + pushed, Pro subscription confirmed, GitHub App granted repo access, "Blog network env" cloud environment created with Network Access = Full.

## Not yet specified

- Confirm Gemini's actual free-tier image-generation rate limit live in AI Studio before the pipeline depends on it (docs alone didn't pin this down; reported cut Dec 2025).
- The source Framer template also has `/author`, `/categories`, `/legal-pages`, `/subscribe` page types beyond the core blog index/detail pages — in scope as site chrome, but not yet sharp enough to ticket (which of these does v1 actually need vs. defer).
- Analytics: whether/how to track readership (not discussed; in scope for the site, not yet sharp enough to ticket).
- Deployment specifics once a repo exists: Vercel project config, env vars, preview-vs-prod behavior for PR branches.
- Testing/QA approach for the pipeline itself (how you'd know a generated post is good before merging, beyond reading the PR diff).
- Custom domain/DNS (mentioned as "create after plan is solid," no shape yet).

## Out of scope

- Reader interactivity (comments, reactions, newsletter signup): v1 is read-only publishing. Reactions are wanted in a *future* effort, not this one — out of scope here, would return as a fresh map if revisited.
- Podcast and Video-blog sections/collections (present in the source Framer template, [ticket 0004](../wayfinder/tickets/0004-framer-extraction-scope.md)): this destination is a written blog, not a podcast/video platform — dropped from the rebuild scope entirely.
