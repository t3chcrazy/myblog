---
title: Get a working static-diagram export path for posts
label: wayfinder:research
status: closed
assignee: null
blocked_by: []
---

## Question

The pipeline needs to produce one hand-drawn-style explanatory diagram per post (when useful), as a static file it can commit alongside the post — same pattern as the banner image. What actually works, headlessly, from a Claude Code Routines cloud session?

## Resolution

The Excalidraw MCP connector (`claude.ai` connector, `mcp.excalidraw.com`) does **not** work for this: its `create_view` tool only renders a live/animated view inside the chat UI and returns a `checkpointId` — there is no export or static-image-download capability. Confirmed by a live run (PR #2, `react-server-components-what-runs-where`) that tried it, got a checkpoint with no exportable output, and correctly fell back to skipping the diagram per STYLE.md's failure-mode instructions.

Switched to `@excalidraw/utils`'s `exportToSvg`, called from a small Node script the pipeline writes and runs in its own sandbox: the pipeline authors the diagram directly as an Excalidraw scene (a JSON `elements` array), exports it to SVG headlessly, and writes the file straight into `public/diagrams/`. No MCP connector, no external service, no Chromium/Puppeteer needed. Caveat: not yet verified end-to-end in a Routines cloud sandbox (canvas/DOM support for `exportToSvg` may need polyfilling there) — STYLE.md's diagram step treats any failure here as non-blocking, same as the banner image fallback, so a bad sandbox environment degrades gracefully rather than breaking the run.
