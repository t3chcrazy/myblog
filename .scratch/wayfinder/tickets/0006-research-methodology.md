---
title: Deep-research methodology and quality bar for each post
label: wayfinder:grilling
status: closed
assignee: null
blocked_by: []
---

## Question

Decide what "deep research" means operationally for the weekly pipeline's research step: what sources count (official docs/specs only, or also blog posts/community discussion), how many sources minimum, whether claims need inline citations in the published post, target post length, and the "fun, engaging" tone requirement — should this be enforced via a style guide/prompt template checked into the repo, or left to the agent's judgment each run?

## Decision

- **Valid sources**: official docs/specs plus reputable engineering blogs (vendor blogs, known practitioners) — excludes unverified forum/social takes unless corroborated elsewhere.
- **Minimum sources**: 3+, cited inline as markdown links at the claims they support (matches newspaper-style framing, lets readers verify).
- **Tone/length/style**: enforced via a `STYLE.md` (or equivalent prompt template) checked into the repo — defines target length, "fun, engaging" tone rules, and structure, versioned and PR-editable rather than left to per-run agent judgment. `STYLE.md` itself is a follow-up artifact to draft, not written by this ticket.
