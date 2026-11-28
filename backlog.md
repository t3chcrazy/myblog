# Topic backlog

The blog pipeline's source of topics. See [decision](.scratch/wayfinder/tickets/0005-backlog-format.md).

## Rules

- `- [ ]` = unstarted, `- [x]` = published (checked off after the post's PR merges).
- Agent picks the next unstarted entry by judgment — not top-to-bottom FIFO, not a priority field. It must skip anything already covered by a published post, even if still unchecked here (e.g. superseded by a broader entry).
- Seed or veto entries directly in this file, via PR — same draft-and-approve flow as posts.
- If every entry is checked off (backlog dry), the agent proposes new topics itself, appends them here, and proceeds with one in the same run.

## Topics

- [x] Tailwind v4's CSS-first config, and why this blog skips tailwind.config.js
- [x] React Server Components: what actually runs where
- [x] Structured outputs and tool calling in modern LLM APIs
- [x] Edge functions vs. serverless: picking a deploy target for a Next.js app
- [x] Mobile app state management in 2026: where Redux lost ground
- [x] Vector databases vs. plain Postgres + pgvector: when to reach for which
- [x] What "agentic" actually means in current AI tooling
- [x] Database connection pooling for serverless backends
- [x] Designing REST vs. GraphQL vs. tRPC APIs for a small team
- [x] Stateless MCP: where session state goes after the 2026-07-28 spec
- [x] React Native on Android 16: what `edgeToEdgeEnabled` still controls
- [x] Temporal in Node 26: what it fixes and where Date still leaks in
- [x] Node.js goes annual: what the Node 27 alpha does to `latest` in CI and `engines` checks
- [x] TypeScript 7 in practice: a split toolchain until the 7.1 API
- [x] UIScene on iOS 27: what React Native 0.88 and Expo carry over
- [x] PostgreSQL 19's WAIT FOR LSN: what read-your-writes on async replicas still needs from the app
- [x] PostgreSQL 19 `REPACK (CONCURRENTLY)` vs. pg_repack: what moving bloat cleanup into core changes
- [ ] Vite 8 and Rolldown 1.0: what the bundler swap breaks in plugin-heavy builds
- [ ] CSS `text-box-trim` in every engine: replacing line-height and padding hacks
- [x] Android 17 on large screens: what the end of the orientation-lock opt-out means for React Native apps
- [ ] Prompt caching across Claude, OpenAI and Gemini: what invalidates a cache, measured
- [x] Next.js Cache Components by default: what the migration changes about where cache lives
- [ ] React 19.3 View Transitions and Fragment Refs: what is stable and what still needs a framework
- [ ] Next.js 16.4 `next upgrade --agent` and Skills: how agent-driven framework upgrades work and where they fail
- [ ] Vercel Runtime Cache vs. Data Cache unification: what changes for `fetch` and `unstable_cache` billing
