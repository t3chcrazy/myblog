import Link from "next/link";
import type { Post } from "@/lib/posts";

export function TeaserCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <p className="text-[length:var(--font-size-small)] uppercase tracking-wide text-accent font-semibold">
        {post.Category}
      </p>
      <h3 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h3)] font-bold text-ink mt-1 group-hover:text-charcoal">
        {post.title}
      </h3>
      <p className="text-[length:var(--font-size-body)] text-charcoal mt-2">
        {post.dek}
      </p>
      <p className="text-[length:var(--font-size-small)] text-silver mt-2">
        {date}
      </p>
    </Link>
  );
}
