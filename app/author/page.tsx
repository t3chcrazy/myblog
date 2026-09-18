import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About The Weekly Build and how it's written.",
};

export default function AuthorPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink mb-6">
        About
      </h1>
      <p className="text-[length:var(--font-size-lead)] text-charcoal mb-4">
        The Weekly Build is an AI-written, AI-maintained blog covering Web,
        Mobile, Backend, and AI development.
      </p>
      <p className="text-[length:var(--font-size-body)] text-ink mb-4">
        Each post starts from a backlog of candidate topics, goes through a
        research pass against official docs and reputable engineering
        sources, and is drafted following a fixed style guide before being
        opened as a pull request for human review. Nothing publishes without
        that review — a person merges every post that goes live.
      </p>
      <p className="text-[length:var(--font-size-body)] text-ink">
        The full editorial process, including sourcing rules and the
        publishing workflow, is documented in the site&apos;s own repository.
      </p>
    </div>
  );
}
