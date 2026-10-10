import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import { estimateReadTime, getAllPosts, getHeadings, getPostBySlug, getRelatedPosts, getSources } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";
import { TeaserCard } from "@/components/TeaserCard";
import { JsonLd } from "@/components/JsonLd";
import { pageAlternates } from "@/lib/seo";
import { AI_WRITER, AUTHOR_ID, AUTHOR_NAME, AUTHOR_URL, BLOG_URL, SITE_NAME, withBasePath } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const images = post.banner
    ? [{ url: post.banner, alt: post.bannerAlt ?? post.title }]
    : undefined;

  return {
    title: post.title,
    description: post.dek,
    keywords: post.tags,
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    alternates: pageAlternates(`/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      url: `/${post.slug}`,
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.date,
      section: post.Category,
      authors: [AUTHOR_URL],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
      images,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const sources = getSources(post.content);
  const headings = getHeadings(post.content);

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const minutes = estimateReadTime(post.content);
  // Numbered in order of publication, oldest first.
  const dispatchNo =
    getAllPosts()
      .reverse()
      .findIndex((p) => p.slug === post.slug) + 1;

  const postUrl = `${BLOG_URL}/${post.slug}`;
  const author = { "@type": "Person", "@id": AUTHOR_ID, name: AUTHOR_NAME, url: AUTHOR_URL };
  const publisher = { "@type": "Organization", name: SITE_NAME, url: BLOG_URL };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.dek,
      image: post.banner ? [`${BLOG_URL}${post.banner}`] : undefined,
      datePublished: post.date,
      dateModified: post.date,
      author,
      publisher,
      mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
      url: postUrl,
      articleSection: post.Category,
      keywords: post.tags.join(", "),
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: BLOG_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: post.Category,
          item: `${BLOG_URL}/categories/${post.Category.toLowerCase()}`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    },
  ];

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div>
      <JsonLd data={jsonLd[0]} />
      <JsonLd data={jsonLd[1]} />
      <article className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl" data-pagefind-body>
        {/* Scroll-driven reading-progress rule; styled in globals.css. */}
        <div className="reading-progress" aria-hidden />
        {/* Folio line: where this dispatch sits in the run of the paper. */}
        <div data-pagefind-ignore className="flex items-center justify-between gap-ed-md text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
          <span>
            Dispatch No. {dispatchNo} <span aria-hidden>&bull;</span> {minutes} min read
          </span>
          <Link href="/" className="group inline-flex items-center gap-1 min-h-6 hover:text-accent-ink transition-colors">
            <span className="nudge-back" aria-hidden>&larr;</span> Front page
          </Link>
        </div>
        <div className="double-rule mt-ed-xs mb-ed-lg" />

        <p data-pagefind-ignore className="label-caps text-accent-ink">
          <Link
            href={`/categories/${post.Category.toLowerCase()}`}
            className="hover:text-ink transition-colors"
            data-pagefind-filter="category"
            data-pagefind-meta="category"
          >
            {post.Category}
          </Link>{" "}
          <span aria-hidden>&bull;</span> Desk Dispatch
        </p>
        <h1 className="font-headline text-(length:--font-size-h1) tablet:text-[3rem] font-normal text-ink mt-ed-sm leading-[1.05] tracking-[-0.02em]">
          {post.title}
        </h1>
        <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mt-ed-md">
          {post.dek}
        </p>
        <div className="flex flex-wrap items-center gap-x-ed-sm gap-y-1 mt-ed-md py-ed-xs border-y border-hairline text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
          <span>By {AI_WRITER}</span>
          <span aria-hidden>&middot;</span>
          <span>Edited by {AUTHOR_NAME}</span>
          <span aria-hidden>&middot;</span>
          <time dateTime={post.date} data-pagefind-meta="date">{date}</time>
          {post.appliesTo && (
            <span className="basis-full text-charcoal">Applies to {post.appliesTo}</span>
          )}
        </div>
        {/* Editor's note: how this dispatch was made, per the brand's
            disclosure commitment (PRODUCT.md). */}
        <p data-pagefind-ignore className="mt-ed-sm font-headline italic text-(length:--font-size-small) text-charcoal leading-snug">
          Researched and drafted by {AI_WRITER}, Anthropic&rsquo;s AI model,
          {sources.length > 0 && (
            <>
              {" "}from{" "}
              <a href="#sources" className="ink-link text-accent-ink">
                {sources.length} cited {sources.length === 1 ? "source" : "sources"}
              </a>
              ,
            </>
          )}{" "}
          then reviewed and published by {AUTHOR_NAME}.{" "}
          <Link href="/author" className="ink-link text-accent-ink">
            How each dispatch is made
          </Link>
          .
        </p>

        {post.banner && (
          <figure className="mt-ed-lg mb-ed-xl">
            <ViewTransition name={`post-banner-${post.slug}`}>
              <div className="relative aspect-video w-full bg-paper-raised border border-ink p-[3px]">
                <div className="press-plate relative h-full w-full overflow-hidden">
                  <Image
                    src={withBasePath(post.banner)}
                    alt={post.bannerAlt ?? ""}
                    fill
                    sizes="(min-width: 810px) 42rem, 100vw"
                    className="object-cover press-photo"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
          </figure>
        )}
        {!post.banner && <div className="mb-ed-xl" />}
        {headings.length >= 3 && (
          <nav aria-labelledby="contents-heading" data-pagefind-ignore className="mb-ed-xl">
            <h2 id="contents-heading" className="label-caps text-ink">
              In This Dispatch
            </h2>
            <div className="h-px bg-ink mt-ed-xs" />
            <ol className="mt-ed-sm space-y-ed-xs">
              {headings.map((heading, i) => (
                <li key={heading.id} className="flex gap-ed-sm font-headline text-(length:--font-size-body) text-charcoal">
                  <span aria-hidden className="label-caps text-accent-ink tabular-nums pt-[0.3em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a href={`#${heading.id}`} className="ink-link hover:text-accent-ink">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="editorial-body">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkSmartypants],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark" }],
                ],
              },
            }}
          />
        </div>
        {sources.length > 0 && (
          <section id="sources" aria-labelledby="sources-heading" data-pagefind-ignore className="mt-ed-xl scroll-mt-ed-lg">
            <h2 id="sources-heading" className="label-caps text-ink">
              Sources Cited
            </h2>
            <div className="h-px bg-ink mt-ed-xs" />
            <ol className="mt-ed-sm">
              {sources.map((source, i) => (
                <li
                  key={source.url}
                  className="flex gap-ed-sm py-ed-xs border-b border-hairline last:border-b-0 text-(length:--font-size-small) leading-snug"
                >
                  <span aria-hidden className="label-caps text-accent-ink tabular-nums pt-[0.15em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={source.url}
                    className="min-w-0 py-0.5 break-words ink-link hover:text-accent-ink"
                  >
                    <span className="font-semibold text-ink">{source.host}</span>
                    <span className="text-charcoal">{source.path}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}
        {/* End-of-story mark. */}
        <div data-pagefind-ignore className="flex flex-col items-center gap-ed-xs my-ed-xl" aria-hidden>
          <span className="fleuron text-(length:--font-size-h2) leading-none">&#10086;</span>
          <span className="label-caps text-silver">End of Dispatch No. {dispatchNo}</span>
        </div>
        <div className="double-rule" />
        <p className="text-(length:--font-size-micro) uppercase tracking-[0.15em] text-silver mt-ed-md">
          Filed under:{" "}
          {post.tags.map((tag, i) => (
            <span key={tag}>
              {i > 0 && ", "}
              <Link href={`/tags/${tag}`} className="inline-block py-1.5 ink-link hover:text-accent-ink">
                {tag}
              </Link>
            </span>
          ))}
        </p>

      </article>

      {/* Related posts sit in a wider band than the article measure so the
          cards can run as a grid instead of cramped rows. */}
      {relatedPosts.length > 0 && (
        <section
          className="mx-auto max-w-[1240px] px-gutter pb-ed-xl reveal"
          aria-labelledby="related-heading"
          data-pagefind-ignore
        >
          <h2 id="related-heading" className="label-caps text-ink">
            Related Dispatches &bull; Continued Reading
          </h2>
          <div className="h-px bg-ink mt-ed-xs" />
          <div className="mt-ed-lg grid gap-x-ed-lg gap-y-ed-xl tablet:grid-cols-2 desktop:grid-cols-3">
            {relatedPosts.map((related) => (
              <TeaserCard key={related.slug} post={related} variant="card" />
            ))}
          </div>
        </section>
      )}
      </div>
    </ViewTransition>
  );
}
