import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostListPage } from "@/components/PostListPage";

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
    <PostListPage
      eyebrow="Tag"
      title={`#${tag}`}
      posts={posts}
      emptyTitle="Nothing Filed Under This Tag"
      emptyBody={`No dispatches have been tagged "${tag}" yet.`}
    />
  );
}
