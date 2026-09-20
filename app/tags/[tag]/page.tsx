import type { Metadata } from "next";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { TeaserCard } from "@/components/TeaserCard";
import { EmptyState } from "@/components/EmptyState";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  if (!getAllTags().includes(tag.toLowerCase())) return {};

  return {
    title: `#${tag}`,
    description: `All Auxesis posts tagged "${tag}".`,
  };
}

export default async function TagPage({
  params,
}: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  if (!getAllTags().includes(tag.toLowerCase())) notFound();

  const posts = getPostsByTag(tag);

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-310 px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-(length:--font-size-micro) uppercase tracking-[0.2em] text-silver">
          Tag
        </p>
        <h1 className="font-headline text-(length:--font-size-h1) font-normal text-ink tracking-[-0.015em] mt-ed-xs">
          #{tag}
        </h1>
        <div className="h-px bg-ink mt-ed-md mb-ed-sm" />
        {posts.length === 0 ? (
          <EmptyState
            title="Nothing Filed Under This Tag"
            body={`No dispatches have been tagged "${tag}" yet.`}
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
