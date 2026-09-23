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

  const [lead, ...rest] = posts;

  return (
    <section className="reveal">
      <div className="flex items-baseline justify-between">
        <h2 className="font-headline text-(length:--font-size-h2) font-medium text-ink tracking-[-0.01em]">
          {category}
        </h2>
        <Link
          href={`/categories/${category.toLowerCase()}`}
          className="group text-(length:--font-size-micro) uppercase tracking-[0.15em] text-charcoal hover:text-accent-ink transition-colors"
        >
          All {category} <span className="nudge" aria-hidden>&rarr;</span>
        </Link>
      </div>
      <div className="h-px bg-ink mt-ed-sm" />

      {/* Asymmetric split — 7:5-ish lead/secondary ratio, matching the
          broadsheet's column-based grid rather than an even card grid. */}
      <div className="grid gap-ed-xl tablet:grid-cols-[7fr_5fr] mt-ed-lg">
        <TeaserCard post={lead} variant="lead" />
        {rest.length > 0 && (
          <div className="tablet:border-l tablet:border-hairline tablet:pl-ed-lg">
            {rest.map((post) => (
              <TeaserCard key={post.slug} post={post} variant="row" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
