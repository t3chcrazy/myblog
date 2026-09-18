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

// Vintage-press treatment: desaturated + slightly higher contrast, so a
// generated photo/illustration reads like a halftone newspaper plate
// rather than a modern full-color image.
const PRESS_PHOTO_FILTER = "saturate-[0.65] contrast-[1.08]";

export function TeaserCard({
  post,
  variant = "row",
}: {
  post: Post;
  variant?: "lead" | "row";
}) {
  if (variant === "lead") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        {post.banner && (
          <div className="relative aspect-video w-full overflow-hidden mb-5 bg-paper-raised">
            <Image
              src={post.banner}
              alt={post.bannerAlt ?? ""}
              fill
              sizes="(min-width: 810px) 60vw, 100vw"
              className={`object-cover ${PRESS_PHOTO_FILTER}`}
              priority
            />
          </div>
        )}
        <p className="text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-accent-ink font-semibold">
          {post.Category}
        </p>
        <h3 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink mt-2 leading-[1.05] tracking-[-0.01em] group-hover:underline decoration-1 underline-offset-4">
          {post.title}
        </h3>
        <p className="text-[length:var(--font-size-lead)] text-charcoal mt-4 max-w-xl">
          {post.dek}
        </p>
        <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-silver mt-4">
          {formatDate(post.date)}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-baseline gap-4 py-4 border-b border-hairline first:pt-0"
    >
      <span className="text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-accent-ink font-semibold w-16 shrink-0 self-start mt-1">
        {post.Category}
      </span>
      {post.banner && (
        <span className="relative aspect-video w-20 shrink-0 overflow-hidden self-start bg-paper-raised hidden sm:block">
          <Image
            src={post.banner}
            alt={post.bannerAlt ?? ""}
            fill
            sizes="80px"
            className={`object-cover ${PRESS_PHOTO_FILTER}`}
          />
        </span>
      )}
      <span className="min-w-0">
        <span className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h3)] font-bold text-ink group-hover:underline decoration-1 underline-offset-4">
          {post.title}
        </span>
        <span className="block text-[length:var(--font-size-body)] text-charcoal mt-1">
          {post.dek}
        </span>
      </span>
      <span className="text-[length:var(--font-size-micro)] uppercase tracking-wide text-silver shrink-0 ml-auto self-start">
        {formatDate(post.date)}
      </span>
    </Link>
  );
}
