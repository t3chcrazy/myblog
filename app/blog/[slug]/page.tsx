import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-[length:var(--font-size-small)] uppercase tracking-wide text-accent font-semibold">
        {post.Category}
      </p>
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink mt-2">
        {post.title}
      </h1>
      <p className="text-[length:var(--font-size-lead)] text-charcoal mt-4">
        {post.dek}
      </p>
      <p className="text-[length:var(--font-size-small)] text-silver mt-4">
        {date}
      </p>
      <hr className="border-hairline my-8" />
      <div>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [rehypePrettyCode, { theme: "github-dark" }],
              ],
            },
          }}
        />
      </div>
      <hr className="border-hairline my-8" />
      <p className="text-[length:var(--font-size-small)] text-silver">
        Tags: {post.tags.join(", ")}
      </p>
    </article>
  );
}
