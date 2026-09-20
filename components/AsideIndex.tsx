import Link from "next/link";
import type { Post } from "@/lib/posts";

export function AsideIndex({ title, posts }: { title: string; posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="bg-paper-raised p-ed-md space-y-ed-sm">
      <div className="flex items-center justify-between border-b border-hairline pb-ed-xs">
        <h3 className="text-(length:--font-size-small) uppercase tracking-[0.15em] text-ink font-semibold">
          {title}
        </h3>
        <span className="text-(length:--font-size-micro) uppercase tracking-wide text-accent-ink">
          Index
        </span>
      </div>
      {posts.map((post, i) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block py-ed-xs first:pt-0"
        >
          <div className="flex items-baseline gap-ed-xs">
            <span className="font-headline text-(length:--font-size-h3) font-semibold text-accent-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-(length:--font-size-micro) uppercase tracking-wide text-silver">
              {post.Category}
            </span>
          </div>
          <h4 className="font-headline text-(length:--font-size-body) font-semibold text-ink mt-1 group-hover:underline decoration-1 underline-offset-4">
            {post.title}
          </h4>
        </Link>
      ))}
    </div>
  );
}
