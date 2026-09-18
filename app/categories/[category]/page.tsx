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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink mb-10">
        {resolved}
      </h1>
      {posts.length === 0 ? (
        <p className="text-[length:var(--font-size-body)] text-charcoal">
          No posts yet in this category.
        </p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 tablet:grid-cols-3">
          {posts.map((post) => (
            <TeaserCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
