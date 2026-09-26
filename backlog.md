# Topic backlog

Weekly pipeline's source of topics. See [decision](.scratch/wayfinder/tickets/0005-backlog-format.md).

## Rules

- `- [ ]` = unstarted, `- [x]` = published (checked off after the post's PR merges).
- Agent picks the next unstarted entry by judgment — not top-to-bottom FIFO, not a priority field. It must skip anything already covered by a published post, even if still unchecked here (e.g. superseded by a broader entry).
- Seed or veto entries directly in this file, via PR — same draft-and-approve flow as posts.
- If every entry is checked off (backlog dry), the agent proposes new topics itself, appends them here, and proceeds with one in the same run.

## Topics

- [x] Tailwind v4's CSS-first config, and why this blog skips tailwind.config.js
- [x] React Server Components: what actually runs where
- [ ] Structured outputs and tool calling in modern LLM APIs
- [x] Edge functions vs. serverless: picking a deploy target for a Next.js app
- [ ] Mobile app state management in 2026: where Redux lost ground
- [ ] Vector databases vs. plain Postgres + pgvector: when to reach for which
- [ ] What "agentic" actually means in current AI tooling
- [ ] Database connection pooling for serverless backends
- [ ] Designing REST vs. GraphQL vs. tRPC APIs for a small team
