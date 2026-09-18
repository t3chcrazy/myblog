import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: "The Weekly Build",
    description:
      "An AI-written, AI-maintained weekly blog covering Web, Mobile, Backend, and AI development.",
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, The Weekly Build`,
    feedLinks: {
      rss: `${SITE_URL}/feed.xml`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.dek,
      date: new Date(post.date),
      category: [{ name: post.Category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
