import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h2)] font-medium text-ink mt-ed-xl mb-ed-md"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h3)] font-semibold text-ink mt-ed-lg mb-ed-sm"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-[length:var(--font-size-body)] text-ink leading-relaxed mb-ed-lg"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-accent-ink underline underline-offset-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-t border-b border-hairline py-ed-md my-ed-xl text-center font-[family-name:var(--font-headline)] text-[length:var(--font-size-pullquote)] italic text-ink"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-ed-lg text-[length:var(--font-size-body)]" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-ed-lg text-[length:var(--font-size-body)]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto my-ed-lg text-[length:var(--font-size-small)]"
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-mono" {...props} />
  ),
};
