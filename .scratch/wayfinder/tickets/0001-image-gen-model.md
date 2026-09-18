---
title: Pick an image-gen model for explanatory diagrams
label: wayfinder:research
status: closed
assignee: null
blocked_by: []
---

## Question

Which free-or-cheap image-generation model/API should the weekly pipeline call to produce explanatory diagrams and general-purpose header/illustration assets for a post? Compare candidates (e.g. Gemini's image model family, Stability AI free tier, others) on: cost at ~4 images/week, API accessibility from a Claude Code Routines cloud session, output quality for technical diagrams specifically (not just photorealistic images), and licensing for commercial/public blog use.

## Resolution

Use Google's Gemini API image model ("Nano Banana" / gemini-3.1-flash-image family) via a plain API-key REST call: best-documented legible text/label rendering (matters for diagrams), well under $1.10/month at 8-16 images/month, fully headless (API key, no OAuth/desktop app) — fits a Routines cloud session cleanly. Unresolved caveats to re-check before relying on it in production: free-tier rate limits weren't pinned down precisely (Google reportedly cut free-tier image quotas Dec 2025), and OpenAI/FLUX licensing claims in the comparison came from secondary sources (their ToS pages 403'd on fetch).

Full findings: [docs/research/0001-image-gen-model.md](../../../docs/research/0001-image-gen-model.md)
