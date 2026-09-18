# Research: How to Manually Trigger an Out-of-Cycle Re-run of a Claude Code Schedule Routine

**Date:** 2026-09-18  
**Status:** Complete research based on official primary sources

## Summary

Claude Code Routines (cron-based cloud agents) support manual triggers via both web UI and CLI. When manually triggered, a routine re-runs with its exact stored configuration (repositories, environment, connectors, permissions) in the same cloud agent execution path as a scheduled run. Failed runs can be diagnosed through run history and logs accessible from the CLI.

---

## Question 1: What is the exact CLI command or web UI action to manually trigger an existing Routine's run?

### Web UI
Click **"Run now"** on the routine's detail page at https://claude.ai/code/routines.

**Citation:** [Routines documentation - "Edit and control routines" section](https://code.claude.com/docs/en/routines.md)
> "Click **Run now** to start a run immediately without waiting for the next scheduled time. You can optionally supply run-specific text, which reaches the routine the same way as the API trigger's `text` field."

### CLI
Use `/schedule run` (or the alias `/routines run`).

**Citation:** [Routines documentation - "Manage routines from the CLI" section](https://code.claude.com/docs/en/routines.md)
> "Run `/schedule list` to see all routines, `/schedule update` to change one, or `/schedule run` to trigger it immediately."

**Version requirement:** Claude Code v2.1.225 or later is required for the `/schedule run` command to be available in the CLI.

**Citation:** [Routines documentation - "Add a GitHub trigger" section](https://code.claude.com/docs/en/routines.md)
> "From the CLI, install the app from the [GitHub App page](https://github.com/apps/claude) first, then ask Claude to attach a GitHub trigger to an existing routine, for example `/schedule add a GitHub trigger to my nightly review for pull requests opened in acme/webapp`. The CLI path requires Claude Code v2.1.225 or later."

---

## Question 2: Is there a distinction between triggering locally vs the cloud-agent execution path?

**Finding:** No distinction. Manual triggers use the same cloud-agent execution path as scheduled cron runs.

When a routine is triggered (whether manually or on schedule), "the session receives the routine's saved prompt as its assigned task and carries it out" and runs autonomously on Anthropic-managed cloud infrastructure.

**Citation:** [Routines documentation - "Create a routine" section](https://code.claude.com/docs/en/routines.md)
> "Routines run autonomously as full Claude Code cloud sessions: there is no permission-mode picker and no approval prompts during a run. The session can run shell commands, use [skills](/docs/en/skills) committed to the cloned repository, and call any connectors you include."

Each run creates a new independent session:

**Citation:** [Routines documentation - "View and interact with runs" section](https://code.claude.com/docs/en/routines.md)
> "Click any run to open it as a full session. From there you can see what Claude did, review changes, create a pull request, or continue the conversation. Each run session works like any other session."

The prompt handling is identical for all trigger types. The documentation notes:
> "When a trigger fires, the session receives the routine's saved prompt as its assigned task and carries it out, rather than treating it as untrusted content that arrived mid-conversation."

**Implication:** A manually triggered re-run reproduces the same environment and execution path as a failed scheduled run.

---

## Question 3: When manually triggered, does the re-run reuse stored configuration unchanged?

**Finding:** Yes. A manually triggered run reuses the routine's exact stored configuration without requiring re-specification.

The routine's stored configuration includes:
- Prompt
- Repositories and branches
- Environment (network access, environment variables, setup scripts)
- Connectors (MCP servers)
- All permissions and push rules

**Citation:** [Routines documentation - "Create from the web" section](https://code.claude.com/docs/en/routines.md)
> "The routine belongs to your individual claude.ai account... The creation form sets up the routine's prompt, repositories, environment, connectors, and triggers."

When running a routine (including manual "Run now" triggers), the stored configuration is used:

**Citation:** [Routines documentation - "View and interact with runs" section](https://code.claude.com/docs/en/routines.md)
> "Each routine can have one or more triggers attached to it... A single routine can combine triggers."

You can optionally provide text-only supplemental context when triggering:
> "You can optionally supply run-specific text, which reaches the routine the same way as the API trigger's `text` field."

This text is the only optional per-trigger customization; all other configuration is preserved from the routine's saved definition.

---

## Question 4: Failed-run retry semantics: retention, diagnostics, and rate limits

### Run History & Logging
Claude Code retains run history with status and logs for each routine execution.

**Citation:** [Routines documentation - "View and interact with runs" section](https://code.claude.com/docs/en/routines.md)
> "Click a routine in the list to open its detail page. The detail page shows the routine's repositories, connectors, prompt, schedule, API tokens, GitHub triggers, and a list of past runs."

Each run is a full session you can open and review:
> "Click any run to open it as a full session. From there you can see what Claude did, review changes, create a pull request, or continue the conversation."

### Diagnosing Failed Runs
You can ask Claude to explain a failed routine run using the CLI. This requires Claude Code v2.1.227 or later.

**Citation:** [Routines documentation - "Manage routines from the CLI" section](https://code.claude.com/docs/en/routines.md)
> "You can also ask about a routine's run history, for example `/schedule why did my nightly review do nothing this morning?`. Claude lists the routine's recent runs with their status and a link to [open each run on the web](#view-and-interact-with-runs), and reads a run's log to explain what happened, including tool errors, permission denials, and the final result. Requires Claude Code v2.1.227 or later."

### Status Indicators
Note that a "green status" in the run list does NOT indicate task success—only that the infrastructure executed without error:

**Citation:** [Routines documentation - "View and interact with runs" section](https://code.claude.com/docs/en/routines.md)
> "A green status in the run list means the session started and exited without an infrastructure error. It does not mean the task in your prompt succeeded. Open the run to read the transcript and confirm what Claude actually did. Blocked network requests, missing connector tools, and task-level failures all surface there rather than in the status indicator."

### Rate Limits & Cooldowns
**Finding:** No specific rate limits or cooldowns mentioned for manual "Run now" triggers in the official documentation.

Routines are subject to subscription usage limits and a daily run cap per account:

**Citation:** [Routines documentation - "Usage and limits" section](https://code.claude.com/docs/en/routines.md)
> "Routines draw down subscription usage the same way interactive sessions do. In addition to the standard subscription limits, routines have a daily cap on how many runs can start per account."

However, this cap applies to all routine runs (scheduled + API-triggered + manual), not specifically to manual triggers. There is no separate cooldown or rate-limit throttling for manual "Run now" invocations.

One-off scheduled runs do NOT count against the daily cap:
> "One-off runs do not count against the daily routine cap. They draw down your regular subscription usage like any other session."

---

## Sources

1. **Primary:** [Claude Code Routines Documentation](https://code.claude.com/docs/en/routines.md) — Official documentation covering creation, triggering, management, and diagnostics of Routines.

2. **Primary:** [Claude Code What's New - Week 16 (April 13–17, 2026)](https://code.claude.com/docs/en/whats-new/2026-w16) — Release notes for Routines feature announcement and integration with Claude Code on the web.

3. **Primary:** [Claude Code Changelog - Entry v2.1.274](https://code.claude.com/docs/en/changelog.md) — Recent updates to "Run now" feature, including improvements to artifact handling in manually triggered runs.

4. **Primary:** [Claude Code Scheduled Tasks Documentation](https://code.claude.com/docs/en/scheduled-tasks.md) — Comparison of scheduling options (Routines vs. Desktop tasks vs. `/loop`), included for context on out-of-cycle execution semantics.

---

## Open Questions / Gaps

1. **Latency:** What is the typical latency between a "Run now" click/CLI invocation and actual session start? (Not covered in documentation.)

2. **Concurrency:** Can multiple manual "Run now" triggers be queued simultaneously, or are they serialized? (Not specified in documentation.)

3. **Notification:** Is there a way to be notified when a manually triggered run completes, similar to the "mobile push notifications" available for long tasks? (Not mentioned in Routines docs; push notifications are mentioned for general sessions in Week 16 digest, but not specifically for Routine completion.)

4. **Re-trigger same run ID:** If a routine run fails and you manually re-trigger it, does the re-run receive a new session ID, or can it inherit/reuse the failed run's session for artifact continuity? (Unclear from documentation; each run "creates a new session" per the docs, but no explicit statement on whether manual re-runs of the same logical task share session state.)

---

## Recommendations for Retry Workflow

Based on the primary sources, here is a recommended workflow for retrying a failed routine:

1. **Locate the failed run** at https://claude.ai/code/routines → routine detail page → past runs list.
2. **Review the run** by clicking on it to see the full session transcript, tool errors, and any network/permission denials.
3. **Diagnose** (CLI v2.1.227+) with `/schedule why did my routine_name fail?` to get Claude's summary of the failure.
4. **Address root cause** (e.g., update network access rules, fix a missing connector, update the prompt) by editing the routine from the routine detail page menu → **Edit**.
5. **Trigger a fresh run** with "Run now" (web) or `/schedule run routine_name` (CLI).
6. **Monitor** the new run by opening its session as in step 2.

---

**EOF**
cat /Users/abhishekprashant/Desktop/projects/myblog/docs/research/0003-routines-manual-retry.md