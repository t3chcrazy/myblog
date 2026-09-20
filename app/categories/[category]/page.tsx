import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getPostsByCategory } from "@/lib/posts";
import { PostListPage } from "@/components/PostListPage";

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
    description: `All ${resolved} posts from Auxesis.`,
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
    <PostListPage
      eyebrow="Section"
      title={resolved}
      posts={posts}
      emptyTitle="Dispatches Pending Typesetting"
      emptyBody={`The ${resolved} desk hasn't filed a dispatch yet. Our compositors are gathering copy for the upcoming print cycle.`}
    />
  );
}
