import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Vintage-press treatment (globals.css): `press-photo` tones the image to
// sepia monochrome and lifts colour back on hover; `press-plate` on the
// wrapper lays a halftone dot screen over it.
const PRESS_PHOTO_FILTER = "press-photo";

export function TeaserCard({
  post,
  variant = "row",
}: {
  post: Post;
  variant?: "lead" | "row" | "card";
}) {
  // Vertical card for grids (e.g. related posts under an article): image
  // on top, text below, so neither side has to match the other's height.
  if (variant === "card") {
    return (
      <Link href={`/blog/${post.slug}`} className="group flex flex-col">
        {post.banner ? (
          <ViewTransition name={`post-banner-${post.slug}`}>
            <span className="press-plate relative block aspect-video w-full overflow-hidden bg-paper-raised mb-ed-md">
              <Image
                src={post.banner}
                alt={post.bannerAlt ?? ""}
                fill
                sizes="(min-width: 1200px) 360px, (min-width: 768px) 45vw, 100vw"
                className={`object-cover ${PRESS_PHOTO_FILTER}`}
              />
            </span>
          </ViewTransition>
        ) : (
          // Blank plate keeps titles aligned across the grid row.
          <span
            aria-hidden
            className="flex aspect-video w-full items-center justify-center bg-paper-raised mb-ed-md text-(length:--font-size-h2) text-silver"
          >
            &#10086;
          </span>
        )}
        <span className="flex items-baseline justify-between gap-ed-sm text-(length:--font-size-micro) uppercase tracking-[0.15em]">
          <span className="text-accent-ink font-semibold">{post.Category}</span>
          <time dateTime={post.date} className="text-silver">
            {formatDate(post.date)}
          </time>
        </span>
        <span className="block font-headline text-(length:--font-size-h3) font-semibold text-ink mt-ed-sm leading-[1.2] ink-link-target">
          {post.title}
        </span>
        <span className="block font-headline italic text-(length:--font-size-body) text-charcoal mt-ed-sm leading-[1.4] pb-1 line-clamp-3">
          {post.dek}
        </span>
      </Link>
    );
  }

  if (variant === "lead") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        {post.banner && (
          <ViewTransition name={`post-banner-${post.slug}`}>
            <div className="press-plate relative aspect-video w-full overflow-hidden mb-ed-lg bg-paper-raised">
              <Image
                src={post.banner}
                alt={post.bannerAlt ?? ""}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={`object-cover ${PRESS_PHOTO_FILTER}`}
                priority
              />
            </div>
          </ViewTransition>
        )}
        <p className="text-(length:--font-size-small) uppercase tracking-[0.15em] text-accent-ink font-semibold">
          {post.Category}
        </p>
        <h3 className="font-headline text-(length:--font-size-h1) font-normal text-ink mt-ed-sm leading-[1.1] tracking-[-0.015em] ink-link-target">
          {post.title}
        </h3>
        <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mt-ed-md max-w-xl">
          {post.dek}
        </p>
        <time
          dateTime={post.date}
          className="block text-(length:--font-size-micro) uppercase tracking-[0.15em] text-silver mt-ed-md"
        >
          {formatDate(post.date)}
        </time>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col lg:flex-row lg:items-baseline gap-ed-sm lg:gap-ed-md py-ed-md border-b border-hairline first:pt-0"
    >
      <span className="text-(length:--font-size-micro) uppercase tracking-[0.15em] text-accent-ink font-semibold w-16 shrink-0 self-start lg:mt-1">
        {post.Category}
      </span>
      {post.banner && (
        <ViewTransition name={`post-banner-${post.slug}`}>
          <span className="press-plate relative aspect-video w-full lg:w-70 lg:shrink-0 overflow-hidden self-start bg-paper-raised hidden sm:block">
            <Image
              src={post.banner}
              alt={post.bannerAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 280px, 100vw"
              className={`object-cover ${PRESS_PHOTO_FILTER}`}
            />
          </span>
        </ViewTransition>
      )}
      <span className="min-w-0">
        <span className="font-headline text-(length:--font-size-h3) font-semibold text-ink ink-link-target">
          {post.title}
        </span>
        <span className="block font-headline italic text-(length:--font-size-body) text-charcoal mt-1">
          {post.dek}
        </span>
      </span>
      <time
        dateTime={post.date}
        className="text-(length:--font-size-micro) uppercase tracking-wide text-silver shrink-0 lg:ml-auto self-start"
      >
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
