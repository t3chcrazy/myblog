import { ViewTransition } from "react";
import { CATEGORIES, getAllPosts } from "@/lib/posts";
import { CategorySection } from "@/components/CategorySection";
import { LeadStory } from "@/components/LeadStory";
import { AsideIndex } from "@/components/AsideIndex";
import { TeaserCard } from "@/components/TeaserCard";
import { Divider } from "@/components/Divider";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;

  if (!lead) {
    return (
      <ViewTransition enter="page-enter" exit="page-exit">
        <div className="mx-auto max-w-[1240px] px-gutter pt-ed-lg pb-ed-xl">
          <EmptyState
            title="Dispatches Pending Typesetting"
            body="This edition hasn't gone to print yet. Our compositors are gathering dispatches for the upcoming cycle — check back after the next weekly build."
          />
        </div>
      </ViewTransition>
    );
  }

  // Other-domain posts, most recent first, split across the two asides.
  const otherDomainPosts = rest.filter((post) => post.Category !== lead.Category);
  const leftAside = otherDomainPosts.filter((_, i) => i % 2 === 0).slice(0, 3);
  const rightAside = otherDomainPosts.filter((_, i) => i % 2 === 1).slice(0, 3);

  // Older posts in the lead's own category, shown directly beneath it.
  const sameDomainOlder = rest.filter((post) => post.Category === lead.Category);

  // Remaining categories (excluding the lead's), for the sections further down.
  const otherCategories = CATEGORIES.filter((c) => c !== lead.Category);

  const hasLeft = leftAside.length > 0;
  const hasRight = rightAside.length > 0;
  // Don't reserve empty grid tracks for asides with nothing to show yet —
  // the lead story expands to fill the space instead.
  // Literal class strings (not interpolated) so Tailwind's static scanner
  // can find and generate them.
  const leadColSpanClass =
    hasLeft && hasRight
      ? "tablet:col-span-6"
      : hasLeft || hasRight
        ? "tablet:col-span-9"
        : "tablet:col-span-12";

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
    <div className="mx-auto max-w-[1240px] px-gutter pt-ed-lg pb-ed-xl">
      <div className="grid grid-cols-1 tablet:grid-cols-12 gap-gutter">
        {hasLeft && (
          <aside className="tablet:col-span-3 order-2 tablet:order-1">
            <AsideIndex title="Also in this edition" posts={leftAside} />
          </aside>
        )}

        <div className={`order-1 tablet:order-2 ${leadColSpanClass}`}>
          <LeadStory post={lead} />
        </div>

        {hasRight && (
          <aside className="tablet:col-span-3 order-3">
            <AsideIndex title="Elsewhere this week" posts={rightAside} />
          </aside>
        )}
      </div>

      {sameDomainOlder.length > 0 && (
        <>
          <Divider />
          <section>
            <h2 className="font-headline text-(length:--font-size-h2) font-medium text-ink tracking-[-0.01em]">
              More from {lead.Category}
            </h2>
            <div className="h-px bg-ink mt-ed-sm" />
            <div className="mt-ed-md">
              {sameDomainOlder.slice(0, 4).map((post) => (
                <TeaserCard key={post.slug} post={post} variant="row" />
              ))}
            </div>
          </section>
        </>
      )}

      {otherCategories.map((category, i) => {
        const categoryPosts = rest
          .filter((post) => post.Category === category)
          .slice(0, 4);
        if (categoryPosts.length === 0) return null;

        return (
          <div key={category}>
            <Divider fleuron={i === 0} />
            <CategorySection category={category} posts={categoryPosts} />
          </div>
        );
      })}
    </div>
    </ViewTransition>
  );
}
