import type { ReactNode } from "react";
import { isValidElement } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { BASE_PATH } from "@/lib/site";
import { slugify } from "@/lib/slug";

// Plain <img> (unlike next/image and <Link>) doesn't get basePath added, so a
// root-relative src like "/diagrams/x.svg" would hit the portfolio instead.
function withBasePath(src: unknown) {
  return typeof src === "string" && src.startsWith("/") && !src.startsWith("//")
    ? `${BASE_PATH}${src}`
    : src;
}

// Flatten a heading's children (which may include inline <code>, links,
// etc.) to plain text, so it can be slugified into an anchor id.
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
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

// Background briefing for readers new to the topic, placed after a post's
// opening paragraph. Collapsed by default so readers who already know the
// ground can carry straight on into the body.
function Primer({ children }: { children: ReactNode }) {
  return (
    <details className="primer group my-ed-xl border border-ink bg-paper-raised">
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-ed-md px-ed-md py-ed-sm [&::-webkit-details-marker]:hidden">
        <span>
          <span className="label-caps block text-accent-ink">Background briefing</span>
          <span className="block font-headline italic text-(length:--font-size-small) text-charcoal">
            New to this topic? The terms and reading this post assumes.
          </span>
        </span>
        <span aria-hidden className="fleuron text-(length:--font-size-h3) leading-none group-open:hidden">+</span>
        <span aria-hidden className="fleuron text-(length:--font-size-h3) leading-none hidden group-open:inline">&minus;</span>
      </summary>
      <div className="border-t border-hairline px-ed-md pt-ed-md">{children}</div>
    </details>
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
  // Root-relative hrefs are links to other posts: route them through
  // <Link> so they get basePath (a plain <a> would hit the portfolio).
  a: ({ href, ...props }) => {
    const className =
      "text-accent-ink underline underline-offset-2 decoration-accent-ink/40 hover:decoration-accent-ink transition-[text-decoration-color]";
    return href?.startsWith("/") && !href.startsWith("//") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} {...props} />
    );
  },
  Primer,
  blockquote: (props) => <blockquote className="pull-quote" {...props} />,
  // Body images (diagrams) print as plates: hairline frame, with the alt
  // text doubling as an italic caption. Spans, not <figure>, because
  // markdown images render inside a <p>.
  img: ({ alt, src, ...props }) => (
    <span className="block my-ed-xl">
      <span className="block border border-ink p-[3px] bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element -- MDX images have no intrinsic size for next/image */}
        <img src={withBasePath(src) as string | undefined} alt={alt ?? ""} className="block w-full h-auto" loading="lazy" {...props} />
      </span>
      {alt && (
        <span aria-hidden className="block mt-ed-xs font-headline italic text-(length:--font-size-small) text-silver">
          {alt}
        </span>
      )}
    </span>
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-ed-lg text-(length:--font-size-body)" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-ed-lg text-(length:--font-size-body)" {...props} />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto my-ed-lg p-ed-md text-(length:--font-size-small) leading-relaxed"
      {...props}
    />
  ),
  code: (props) => (
    <code className="font-mono" {...props} />
  ),
};
