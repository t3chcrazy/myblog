import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { TeaserCard } from "@/components/TeaserCard";

export const metadata: Metadata = {
  title: "All posts",
  description: "Every post from The Weekly Build, newest first.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink mb-10">
        All posts
      </h1>
      <div className="grid gap-10 sm:grid-cols-2 tablet:grid-cols-3">
        {posts.map((post) => (
          <TeaserCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
