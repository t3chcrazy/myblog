import { ViewTransition } from "react";
import { getAllPosts } from "@/lib/posts";
import { LeadStory } from "@/components/LeadStory";
import { DeskWire, EditionIndex } from "@/components/FrontRails";
import { DeskGrid } from "@/components/DeskGrid";
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

  const indexed = rest.slice(0, 5);

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-[1240px] px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-center label-caps text-accent-ink">
          Front Page Dispatch <span aria-hidden>&bull;</span> This Week&rsquo;s Edition
        </p>
        <div className="h-px bg-hairline mt-ed-sm mb-ed-lg" />

        {/* Broadsheet split: wire briefs | lead story | index + circulation,
            divided by vertical hairlines. Tablet puts the lead beside the
            index and drops the wire underneath. */}
        <div className="grid grid-cols-1 tablet:grid-cols-8 desktop:grid-cols-12 gap-y-ed-xl">
          <div className="tablet:col-span-5 desktop:col-span-6 desktop:order-2 tablet:pr-ed-lg desktop:px-ed-lg desktop:border-x desktop:border-hairline">
            <LeadStory post={lead} />
          </div>
          <aside className="tablet:col-span-3 desktop:order-3 tablet:pl-ed-lg tablet:border-l tablet:border-hairline desktop:border-l-0">
            <EditionIndex posts={indexed} />
          </aside>
          <aside className="tablet:col-span-8 desktop:col-span-3 desktop:order-1 desktop:pr-ed-lg">
            <DeskWire
              posts={posts}
              leadSlug={lead.slug}
              indexSlugs={indexed.map((p) => p.slug)}
            />
          </aside>
        </div>

        <div className="flex justify-center items-center gap-ed-sm mt-ed-xl label-caps text-silver" aria-hidden>
          <span className="fleuron">&para;</span>
          <span>Concluded on the front page</span>
          <span className="fleuron">&para;</span>
        </div>

        <div className="mt-ed-xl">
          <DeskGrid posts={rest} />
        </div>
      </div>
    </ViewTransition>
  );
}
