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
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-24">
      <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.2em] text-silver">
        Archive
      </p>
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink tracking-[-0.01em] mt-1">
        All posts
      </h1>
      <div className="h-px bg-ink mt-4 mb-2" />
      <div>
        {posts.map((post) => (
          <TeaserCard key={post.slug} post={post} variant="row" />
        ))}
      </div>
    </div>
  );
}
