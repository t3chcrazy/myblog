import type { Metadata } from "next";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES, getPostsByCategory } from "@/lib/posts";
import { TeaserCard } from "@/components/TeaserCard";
import { EmptyState } from "@/components/EmptyState";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.toLowerCase() }));
}

function resolveCategory(slug: string) {
  return CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase());
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[category]">): Promise<Metadata> {
  const { category } = await params;
  const resolved = resolveCategory(category);
  if (!resolved) return {};

  return {
    title: resolved,
    description: `All ${resolved} posts from The Weekly Build.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[category]">) {
  const { category } = await params;
  const resolved = resolveCategory(category);
  if (!resolved) notFound();

  const posts = getPostsByCategory(resolved);

  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      <div className="mx-auto max-w-3xl px-gutter pt-ed-lg pb-ed-xl">
        <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.2em] text-silver">
          Section
        </p>
        <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-normal text-ink tracking-[-0.015em] mt-ed-xs">
          {resolved}
        </h1>
        <div className="h-px bg-ink mt-ed-md mb-ed-sm" />
        {posts.length === 0 ? (
          <EmptyState
            title="Dispatches Pending Typesetting"
            body={`The ${resolved} desk hasn't filed a dispatch yet. Our compositors are gathering copy for the upcoming print cycle.`}
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
