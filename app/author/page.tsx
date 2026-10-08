import type { Metadata } from "next";
import { ViewTransition } from "react";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Auxesis, an AI-driven blog experiment by Abhishek Prashant, and how each post is made.",
  alternates: pageAlternates("/author"),
};

export default function AuthorPage() {
  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-(length:--font-size-micro) uppercase tracking-[0.2em] text-silver">
          Masthead
        </p>
        <h1 className="font-headline text-(length:--font-size-h1) font-normal text-ink tracking-[-0.015em] mt-ed-xs">
          About
        </h1>
        <div className="h-px bg-ink mt-ed-md mb-ed-lg" />
        <div className="editorial-body">
          <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mb-ed-lg">
            Auxesis is an experiment in AI-driven publishing by Abhishek
            Prashant: a weekly publication covering Web, Mobile, Backend, and
            AI development.
          </p>
          <p className="text-(length:--font-size-body) text-ink mb-ed-lg">
            The project began as an inquiry into the practical capabilities of
            AI beyond demonstrations: whether it can research a subject
            rigorously, present it clearly, and sustain that standard week
            after week. Auxesis is where Abhishek pursues that question in
            depth.
          </p>
          <p className="text-(length:--font-size-body) text-ink mb-ed-lg">
            Each post is researched by AI against official documentation and
            reputable engineering sources, then drafted in accordance with a
            fixed style guide.
          </p>
          <p className="text-(length:--font-size-body) text-ink mb-ed-lg">
            The full editorial process, including sourcing rules and the
            publishing workflow, is documented in the site&apos;s own
            repository.
          </p>
          <p className="text-(length:--font-size-body) text-ink mb-ed-lg">
            The premise is straightforward: AI makes it practical to examine
            one new technical concept each week and publish a carefully
            curated post on it.
          </p>
          <p className="text-(length:--font-size-body) text-ink">
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
