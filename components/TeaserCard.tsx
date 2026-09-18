import Link from "next/link";
import type { Post } from "@/lib/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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
      <span className="text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-accent-ink font-semibold w-16 shrink-0">
        {post.Category}
      </span>
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
