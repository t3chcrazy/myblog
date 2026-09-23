import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { estimateReadTime, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";
import { TeaserCard } from "@/components/TeaserCard";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);

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

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <article className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl" data-pagefind-body>
        {/* Scroll-driven reading-progress rule; styled in globals.css. */}
        <div className="reading-progress" aria-hidden />
        {/* Folio line: where this dispatch sits in the run of the paper. */}
        <div data-pagefind-ignore className="flex items-center justify-between gap-ed-md text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
          <span>
            Dispatch No. {dispatchNo} <span aria-hidden>&bull;</span> {minutes} min read
          </span>
          <Link href="/" className="group hover:text-accent-ink transition-colors">
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
          <span>By Auxesis</span>
          <span aria-hidden>&middot;</span>
          <time dateTime={post.date} data-pagefind-meta="date">{date}</time>
        </div>

        {post.banner && (
          <figure className="mt-ed-lg mb-ed-xl">
            <ViewTransition name={`post-banner-${post.slug}`}>
              <div className="relative aspect-video w-full bg-paper-raised border border-ink p-[3px]">
                <div className="press-plate relative h-full w-full overflow-hidden">
                  <Image
                    src={post.banner}
                    alt={post.bannerAlt ?? ""}
                    fill
                    sizes="(min-width: 810px) 42rem, 100vw"
                    className="object-cover press-photo"
                    priority
                  />
                </div>
              </div>
            </ViewTransition>
            {post.bannerAlt && (
              <figcaption aria-hidden className="flex justify-between gap-ed-md mt-ed-xs">
                <span className="font-headline italic text-(length:--font-size-small) text-silver">
                  Plate I &mdash; {post.bannerAlt}
                </span>
                <span className="label-caps shrink-0 text-accent-ink">Fig. 1</span>
              </figcaption>
            )}
          </figure>
        )}
        {!post.banner && <div className="mb-ed-xl" />}
        <div className="editorial-body">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: "github-dark" }],
                ],
              },
            }}
          />
        </div>
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
              <Link href={`/tags/${tag}`} className="ink-link hover:text-accent-ink">
                {tag}
              </Link>
            </span>
          ))}
        </p>

        {relatedPosts.length > 0 && (
          <div className="mt-ed-xl reveal" data-pagefind-ignore>
            <h2 className="label-caps text-ink">Related Dispatches &bull; Continued Reading</h2>
            <div className="h-px bg-ink mt-ed-xs" />
            <div className="mt-ed-sm">
              {relatedPosts.map((related) => (
                <TeaserCard key={related.slug} post={related} variant="row" />
              ))}
            </div>
          </div>
        )}
      </article>
    </ViewTransition>
  );
}
