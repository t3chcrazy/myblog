---
title: PR/publish workflow specifics
label: wayfinder:grilling
status: closed
assignee: null
blocked_by: []
---

## Question

Nail down the mechanics of the draft-and-approve flow: branch naming convention for the weekly post (Routines already forces `claude/`-prefixed branches — decide the rest of the name), what the PR description should contain (post preview? research summary?), whether a Vercel preview deployment is wired to the PR so the post can be reviewed rendered (not just as raw MDX diff), and what merging actually triggers (direct prod deploy via Vercel's git integration, presumably — confirm no extra step is needed).

## Decision

- **Branch name**: `claude/post-<slug>` — ties branch directly to the post's slug, one post per branch.
- **PR description**: post preview (rendered dek/intro snippet) plus a short research summary (sources used, why the topic was picked) — enough to approve without opening every file.
- **Preview deploy**: required. Vercel's git integration auto-deploys a preview per PR once the repo is linked, so review happens on rendered output, not raw MDX diff.
- **Merge trigger**: merging to main triggers Vercel's git integration to deploy straight to prod — no extra step needed, standard Vercel+GitHub behavior.
