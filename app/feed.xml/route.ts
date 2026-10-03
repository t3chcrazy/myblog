import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";
const BLOG_URL = `${SITE_URL}/blog`;

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Auxesis",
    description:
      "An AI-written, AI-maintained weekly blog covering Web, Mobile, Backend, and AI development.",
    id: BLOG_URL,
    link: BLOG_URL,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, Auxesis`,
    feedLinks: {
      rss: `${BLOG_URL}/feed.xml`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${BLOG_URL}/${post.slug}`,
      link: `${BLOG_URL}/${post.slug}`,
      description: post.dek,
      date: new Date(post.date),
      category: [{ name: post.Category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
