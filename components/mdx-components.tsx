import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h2)] font-bold text-ink mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h3)] font-bold text-ink mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-[length:var(--font-size-body)] text-ink leading-relaxed mb-5"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-accent-ink underline underline-offset-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent pl-5 my-8 font-[family-name:var(--font-headline)] text-[length:var(--font-size-lead)] italic text-charcoal"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-5 text-[length:var(--font-size-body)]" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-5 text-[length:var(--font-size-body)]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="rounded-md overflow-x-auto my-6 text-[length:var(--font-size-small)]"
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-mono" {...props} />
  ),
};
