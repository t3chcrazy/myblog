import type { Metadata } from "next";
import { ViewTransition } from "react";
import { getAllPosts } from "@/lib/posts";
import { TeaserCard } from "@/components/TeaserCard";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "All posts",
  description: "Every post from Auxesis, newest first.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-3xl px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-(length:--font-size-micro) uppercase tracking-[0.2em] text-silver">
          Archive
        </p>
        <h1 className="font-headline text-(length:--font-size-h1) font-normal text-ink tracking-[-0.015em] mt-ed-xs">
          All posts
        </h1>
        <div className="h-px bg-ink mt-ed-md mb-ed-sm" />
        {posts.length === 0 ? (
          <EmptyState
            title="The Archive Is Not Yet Set"
            body="No dispatches have been typeset for this publication yet. The first edition arrives after the next weekly build."
          />
        ) : (
          <div>
            {posts.map((post) => (
              <TeaserCard key={post.slug} post={post} variant="row" />
            ))}
          </div>
        )}
      </div>
    </ViewTransition>
  );
}
