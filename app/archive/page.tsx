import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostListPage } from "@/components/PostListPage";
import { pageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All posts",
  description: "Every post from Auxesis, newest first.",
  alternates: pageAlternates("/archive"),
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <PostListPage
      eyebrow="Archive"
      title="All posts"
      posts={posts}
      emptyTitle="The Archive Is Not Yet Set"
      emptyBody="No dispatches have been typeset for this publication yet. The first edition arrives after the next weekly build."
    />
  );
}
