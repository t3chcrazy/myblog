---
title: Backlog file format and topic-selection rule
label: wayfinder:grilling
status: closed
assignee: null
blocked_by: []
---

## Question

Decide the concrete shape of the in-repo topic backlog (e.g. a single `backlog.md` with a checklist, or structured YAML/JSON with status per topic) and the exact rule the weekly pipeline uses to pick the next topic from it: strict FIFO, priority field, random-among-unstarted, or agent judgment constrained to "not already covered." Also decide how the user seeds/vetoes entries (edit the file directly via PR, or some other path) and what happens when the backlog runs dry (agent proposes new topics itself, or the run fails loudly).

## Decision

- **Format**: single `backlog.md` at repo root, plain markdown checklist (one topic per line, `- [ ]` unstarted / `- [x]` done).
- **Selection rule**: agent judgment, constrained to picking an unstarted (`- [ ]`) entry not already covered by a published post — not strict FIFO, no priority field.
- **Seeding/veto**: user edits `backlog.md` directly, via normal PR flow (same draft-and-approve path as posts).
- **Dry backlog**: agent proposes new topics itself — generates candidates, appends to `backlog.md`, and proceeds with one of them in the same run (does not fail loudly here; overrides the general "fail loudly" default for this specific case).
