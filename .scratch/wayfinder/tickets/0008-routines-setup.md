---
title: Set up Claude Code Routines prerequisites
label: wayfinder:task
status: closed
assignee: null
blocked_by: []
---

## Question

Manual setup task (HITL), once the GitHub repo exists: confirm/activate a claude.ai subscription tier that supports Routines (Pro/Max/Team/Enterprise — pure API-key auth won't work), grant the routine access to the new repo (GitHub App install or equivalent), and configure the routine's cloud environment Network Access to Full or a Custom allowlist covering the research sources this pipeline needs (default "Trusted" will 403 arbitrary research fetches). Record here once done: which subscription tier, which repo access method, and the final network-access configuration — later tickets (the actual weekly schedule config) depend on these facts.

## Status — done

- Repo: `https://github.com/t3chcrazy/myblog` — created, initialized, pushed to `main`.
- Subscription tier: **Pro** — confirmed, supports Routines.
- Repo access: granted via github.com/settings/installations → Claude app → Configure → added `t3chcrazy/myblog`.
- Cloud environment: created, named **"Blog network env"**, Network Access = **Full**.
- Not yet done (separate follow-up, not this ticket): actually configuring the routine itself (name, instructions/prompt, trigger schedule) — blocked on `backlog.md` ([0005](0005-backlog-format.md)) and `STYLE.md` ([0006](0006-research-methodology.md)) not existing in-repo yet.

## Walkthrough — GitHub App install (repo access)

1. claude.ai Settings → Connectors → "GitHub Integration" only shows connect/disconnect at account level — no per-repo picker there.
2. Per-repo access is managed on GitHub's side instead: go to https://github.com/settings/installations (or github.com → your avatar → Settings → Applications → Installed GitHub Apps).
3. Find the **Claude** app entry, click **Configure**.
4. Under "Repository access", either select **All repositories**, or switch to **Only select repositories** and add `t3chcrazy/myblog`.
5. Save. Confirm `t3chcrazy/myblog` shows as an accessible repo when creating/editing a Routine (Settings → Routines → New Routine → repo picker) on claude.ai.

## Walkthrough — Network Access config

1. In the Routine's setup (Settings → Routines → New/Edit Routine), find **Environment** → **Network Access**.
2. Default is **Trusted** — too narrow, will 403 fetches to arbitrary research sources (docs sites, eng blogs) this pipeline needs.
3. Choose one:
   - **Full** — simplest, no allowlist maintenance, but broadest egress.
   - **Custom** — add domains as needed (e.g. specific vendor docs domains, github.com, common eng-blog domains). Tighter, but you'll hit 403s on unlisted domains and need to come back and add them.
4. Recommended for this pipeline given research sources vary post-to-post (per [0006](0006-research-methodology.md), sources aren't a fixed small list): start with **Full**, revisit to a **Custom** allowlist later only if you want tighter control once actual source domains stabilize.
5. Save. Record final choice back in this ticket.
