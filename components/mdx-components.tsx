import type { ReactNode } from "react";
import { isValidElement } from "react";
import type { MDXComponents } from "mdx/types";

// Flatten a heading's children (which may include inline <code>, links,
// etc.) to plain text, so it can be slugified into an anchor id.
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Section mark that appears beside a heading on hover, linking to it —
// so readers can share a deep link to one section of a post.
function Anchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label="Link to this section"
      className="fleuron ml-ed-sm text-[0.7em] no-underline opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
    >
      &sect;
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => {
    const id = slugify(textOf(children));
    return (
      <h2
        id={id}
        className="group font-headline text-(length:--font-size-h2) font-medium text-ink mt-ed-xl mb-ed-md"
        {...props}
      >
        {children}
        <Anchor id={id} />
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = slugify(textOf(children));
    return (
      <h3
        id={id}
        className="group font-headline text-(length:--font-size-h3) font-semibold text-ink mt-ed-lg mb-ed-sm"
        {...props}
      >
        {children}
        <Anchor id={id} />
      </h3>
    );
  },
  p: (props) => (
    <p
      className="text-(length:--font-size-body) text-ink leading-relaxed mb-ed-lg"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent-ink underline underline-offset-2 decoration-accent-ink/40 hover:decoration-accent-ink transition-[text-decoration-color]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-t border-b border-hairline py-ed-md my-ed-xl text-center font-headline text-(length:--font-size-pullquote) italic text-ink"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-ed-lg text-(length:--font-size-body)" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-ed-lg text-(length:--font-size-body)" {...props} />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto my-ed-lg text-(length:--font-size-small)"
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-mono" {...props} />
  ),
};
