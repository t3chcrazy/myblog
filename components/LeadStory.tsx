import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { estimateReadTime, getExcerpt, type Post } from "@/lib/posts";

export function LeadStory({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const excerpt = getExcerpt(post.content, 600);
  const minutes = estimateReadTime(post.content);

  return (
    <article className="group/lead">
      <div className="flex items-center gap-ed-xs text-(length:--font-size-small) uppercase tracking-[0.15em] text-accent-ink font-semibold">
        <span>Feature</span>
        <span aria-hidden>&bull;</span>
        <span>{post.Category}</span>
      </div>
      <h2 className="font-headline text-(length:--font-size-h1) font-normal text-ink mt-ed-xs leading-[1.1] tracking-[-0.015em]">
        <Link href={`/blog/${post.slug}`} className="ink-link">
          {post.title}
        </Link>
      </h2>
      <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mt-ed-sm">
        {post.dek}
      </p>
      <div className="flex items-center justify-between mt-ed-sm py-ed-xs px-ed-sm bg-paper-raised text-(length:--font-size-micro) uppercase tracking-[0.15em] text-silver">
        <span>
          By Auxesis &middot; <time dateTime={post.date}>{date}</time>
        </span>
        <span>{minutes} min read</span>
      </div>

      {post.banner && (
        <ViewTransition name={`post-banner-${post.slug}`}>
          <div className="relative aspect-video w-full overflow-hidden mt-ed-md bg-paper-raised">
            <Image
              src={post.banner}
              alt={post.bannerAlt ?? ""}
              fill
              sizes="(min-width: 1200px) 50vw, 100vw"
              className="object-cover saturate-[0.65] contrast-[1.08] press-photo"
              priority
            />
          </div>
        </ViewTransition>
      )}

      <p className="text-(length:--font-size-body) text-ink leading-relaxed mt-ed-md">
        {excerpt}
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="group inline-block mt-ed-md text-(length:--font-size-small) uppercase tracking-[0.15em] text-accent-ink hover:text-ink transition-colors"
      >
        Continue reading <span className="nudge" aria-hidden>&rarr;</span>
      </Link>
    </article>
  );
}
