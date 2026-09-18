import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getPostsByCategory } from "@/lib/posts";
import { TeaserCard } from "@/components/TeaserCard";

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
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-24">
      <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.2em] text-silver">
        Section
      </p>
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink tracking-[-0.01em] mt-1">
        {resolved}
      </h1>
      <div className="h-px bg-ink mt-4 mb-2" />
      {posts.length === 0 ? (
        <p className="text-[length:var(--font-size-body)] text-charcoal mt-6">
          No posts yet in this section — check back after the next weekly
          build.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <TeaserCard key={post.slug} post={post} variant="row" />
          ))}
        </div>
      )}
    </div>
  );
}
