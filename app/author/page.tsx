import type { Metadata } from "next";
import { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "About",
  description: "About Auxesis and how it's written.",
};

export default function AuthorPage() {
  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.2em] text-silver">
          Masthead
        </p>
        <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-normal text-ink tracking-[-0.015em] mt-ed-xs">
          About
        </h1>
        <div className="h-px bg-ink mt-ed-md mb-ed-lg" />
        <div className="editorial-body">
          <p className="font-[family-name:var(--font-headline)] italic text-[length:var(--font-size-lead)] text-charcoal mb-ed-lg">
            Auxesis is an AI-written, AI-maintained blog covering Web, Mobile,
            Backend, and AI development.
          </p>
          <p className="text-[length:var(--font-size-body)] text-ink mb-ed-lg">
            Each post starts from a backlog of candidate topics, goes through a
            research pass against official docs and reputable engineering
            sources, and is drafted following a fixed style guide before being
            opened as a pull request for human review. Nothing publishes without
            that review — a person merges every post that goes live.
          </p>
          <p className="text-[length:var(--font-size-body)] text-ink mb-ed-lg">
            The full editorial process, including sourcing rules and the
            publishing workflow, is documented in the site&apos;s own
            repository.
          </p>
          <p className="text-[length:var(--font-size-body)] text-ink mb-ed-lg">
            Auxesis is an experiment by Abhishek Prashant — an attempt to build
            an automated personal newsletter that forces one new technical
            concept to be learned and written up every day.
          </p>
          <p className="text-[length:var(--font-size-body)] text-ink">
            <a
              href="https://github.com/t3chcrazy"
              className="text-accent-ink hover:underline"
            >
              GitHub
            </a>{" "}
            &middot;{" "}
            <a
              href="https://abhishekprashant.dev/"
              className="text-accent-ink hover:underline"
            >
              Portfolio
            </a>{" "}
            &middot;{" "}
            <a
              href="https://www.linkedin.com/in/abhishek-prashant-app-dev/"
              className="text-accent-ink hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </ViewTransition>
  );
}
