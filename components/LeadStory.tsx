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
    <article>
      <div className="flex items-center gap-ed-xs text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-accent-ink font-semibold">
        <span>Feature</span>
        <span aria-hidden>&bull;</span>
        <span>{post.Category}</span>
      </div>
      <h2 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-normal text-ink mt-ed-xs leading-[1.1] tracking-[-0.015em]">
        <Link href={`/blog/${post.slug}`} className="hover:underline decoration-1 underline-offset-4">
          {post.title}
        </Link>
      </h2>
      <p className="font-[family-name:var(--font-headline)] italic text-[length:var(--font-size-lead)] text-charcoal mt-ed-sm">
        {post.dek}
      </p>
      <div className="flex items-center justify-between mt-ed-sm py-ed-xs px-ed-sm bg-paper-raised text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-silver">
        <span>By Auxesis &middot; {date}</span>
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
              className="object-cover saturate-[0.65] contrast-[1.08]"
              priority
            />
          </div>
        </ViewTransition>
      )}

      <p className="text-[length:var(--font-size-body)] text-ink leading-relaxed mt-ed-md">
        {excerpt}
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="inline-block mt-ed-md text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-accent-ink hover:text-ink"
      >
        Continue reading &rarr;
      </Link>
    </article>
  );
}
