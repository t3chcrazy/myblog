import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostListPage } from "@/components/PostListPage";

export const metadata: Metadata = {
  title: "All posts",
  description: "Every post from Auxesis, newest first.",
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
