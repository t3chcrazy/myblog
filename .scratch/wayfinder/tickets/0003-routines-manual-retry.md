---
title: How to manually re-run a failed Routine
label: wayfinder:research
status: closed
assignee: null
blocked_by: []
---

## Question

Given the weekly pipeline runs as a Claude Code `schedule` skill Routine and fails loudly with no auto-retry, what's the actual mechanism to manually trigger an out-of-cycle re-run of that same routine (CLI command, web UI action, or `RemoteTrigger`-style tool)? Confirm whether a manual re-run reuses the routine's existing config (repo, branch rules, network access) unchanged, or needs any extra setup.

## Resolution

A failed run can be re-triggered immediately via the "Run now" button on the routine's page at claude.ai/code/routines, or the CLI command `/schedule run <routine_name>` (v2.1.225+). Both invoke the exact same cloud-agent execution path as the scheduled cron run and reuse the routine's stored config (repo, branch, network/permissions) unchanged. Run history/logs are retained, and `/schedule why did my <routine_name> fail?` (v2.1.227+) gives a diagnostic on the prior failure. No documented rate limits/cooldowns on manual triggers beyond normal usage caps.

Full findings: [docs/research/0003-routines-manual-retry.md](../../../docs/research/0003-routines-manual-retry.md)
