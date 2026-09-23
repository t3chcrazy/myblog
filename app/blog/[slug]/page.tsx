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

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <article className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl">
        {/* Scroll-driven reading-progress rule; styled in globals.css. */}
        <div className="reading-progress" aria-hidden />
        <Link
          href={`/categories/${post.Category.toLowerCase()}`}
          className="text-(length:--font-size-small) uppercase tracking-[0.15em] text-accent-ink font-semibold hover:text-ink transition-colors"
          data-pagefind-filter="category"
          data-pagefind-meta="category"
        >
          {post.Category}
        </Link>
        <h1 className="font-headline text-(length:--font-size-h1) font-normal text-ink mt-ed-sm leading-[1.1] tracking-[-0.015em]">
          {post.title}
        </h1>
        <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mt-ed-md">
          {post.dek}
        </p>
        <div className="flex items-center gap-ed-md mt-ed-md text-(length:--font-size-micro) uppercase tracking-[0.15em] text-silver">
          <span>By Auxesis</span>
          <span aria-hidden>&middot;</span>
          <time dateTime={post.date} data-pagefind-meta="date">{date}</time>
          <span aria-hidden>&middot;</span>
          <span>{minutes} min read</span>
        </div>
        <div className="h-[2px] bg-ink mt-ed-lg" />
        <div className="h-px bg-ink mt-[3px] mb-ed-xl" />
        {post.banner && (
          <ViewTransition name={`post-banner-${post.slug}`}>
            <div className="relative aspect-video w-full overflow-hidden mb-ed-xl bg-paper-raised">
              <Image
                src={post.banner}
                alt={post.bannerAlt ?? ""}
                fill
                sizes="(min-width: 810px) 42rem, 100vw"
                className="object-cover saturate-[0.65] contrast-[1.08]"
                priority
              />
            </div>
          </ViewTransition>
        )}
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
        <div className="flex justify-center my-ed-lg" aria-hidden>
          <span className="fleuron text-(length:--font-size-h3)">&#10086;</span>
        </div>
        <div className="h-px bg-hairline" />
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
          <div className="mt-ed-xl reveal">
            <h2 className="font-headline text-(length:--font-size-h2) font-medium text-ink tracking-[-0.01em]">
              Related dispatches
            </h2>
            <div className="h-px bg-ink mt-ed-sm" />
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
