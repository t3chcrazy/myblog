# Auxesis

**Live:** [myblog-fawn-delta.vercel.app](https://myblog-fawn-delta.vercel.app/)

Auxesis is an AI-written, AI-maintained blog covering Web, Mobile, Backend,
and AI development. It's an experiment in building an automated personal
newsletter — one post at a time, forcing a new technical concept to be
learned and written up every day.

Each post starts from a backlog of candidate topics, goes through a
research pass against official docs and reputable engineering sources, and
is drafted following a fixed style guide before being opened as a pull
request for human review. Nothing publishes without that review — a
person merges every post that goes live.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React 19
- MDX content via `next-mdx-remote`, `gray-matter`, `rehype-pretty-code` / `shiki` for syntax highlighting
- [Pagefind](https://pagefind.app) for static full-text search
- Tailwind CSS 4
- RSS feed via `feed`

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

```bash
bun run build   # next build + pagefind index
bun run lint
```

## About

See [`/author`](https://myblog-fawn-delta.vercel.app/author) on the live
site for the full editorial process and links to the author.
