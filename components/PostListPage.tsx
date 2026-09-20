import { ViewTransition } from "react";
import { TeaserCard } from "@/components/TeaserCard";
import { EmptyState } from "@/components/EmptyState";
import type { Post } from "@/lib/posts";

// Shared shell for any "list of posts" page (all posts, one category, one
// tag) — same container width, eyebrow/title/rule header, and row-teaser
// list, so those pages can't drift out of sync with each other.
export function PostListPage({
  eyebrow,
  title,
  posts,
  emptyTitle,
  emptyBody,
}: {
  eyebrow: string;
  title: string;
  posts: Post[];
  emptyTitle: string;
  emptyBody: string;
}) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-310 px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-(length:--font-size-micro) uppercase tracking-[0.2em] text-silver">
          {eyebrow}
        </p>
        <h1 className="font-headline text-(length:--font-size-h1) font-normal text-ink tracking-[-0.015em] mt-ed-xs">
          {title}
        </h1>
        <div className="h-px bg-ink mt-ed-md mb-ed-sm" />
        {posts.length === 0 ? (
          <EmptyState title={emptyTitle} body={emptyBody} />
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
