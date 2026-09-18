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
    <article className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl">
      <p
        className="text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-accent-ink font-semibold"
        data-pagefind-filter="category"
        data-pagefind-meta="category"
      >
        {post.Category}
      </p>
      <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-normal text-ink mt-ed-sm leading-[1.1] tracking-[-0.015em]">
        {post.title}
      </h1>
      <p className="font-[family-name:var(--font-headline)] italic text-[length:var(--font-size-lead)] text-charcoal mt-ed-md">
        {post.dek}
      </p>
      <div className="flex items-center gap-ed-md mt-ed-md text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-silver">
        <span>By The Weekly Build</span>
        <span aria-hidden>&middot;</span>
        <span data-pagefind-meta="date">{date}</span>
      </div>
      <div className="h-[2px] bg-ink mt-ed-lg" />
      <div className="h-px bg-ink mt-[3px] mb-ed-xl" />
      <div className="editorial-body">
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
      <div className="flex justify-center my-ed-lg" aria-hidden>
        <span className="fleuron text-[length:var(--font-size-h3)]">&#10086;</span>
      </div>
      <div className="h-px bg-hairline" />
      <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-silver mt-ed-md">
        Filed under: {post.tags.join(", ")}
      </p>
    </article>
  );
}
