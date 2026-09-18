import Link from "next/link";
import type { Post } from "@/lib/posts";
import { TeaserCard } from "@/components/TeaserCard";

export function CategorySection({
  category,
  posts,
}: {
  category: string;
  posts: Post[];
}) {
  if (posts.length === 0) return null;

  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-hairline pb-2">
        <h2 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h2)] font-bold text-ink">
          {category}
        </h2>
        <Link
          href={`/categories/${category.toLowerCase()}`}
          className="text-[length:var(--font-size-small)] uppercase tracking-wide text-charcoal hover:text-accent"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-8 mt-6 sm:grid-cols-2 tablet:grid-cols-3">
        {posts.map((post) => (
          <TeaserCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
