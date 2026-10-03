import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import { AUTHOR_NAME, AUTHOR_URL, BLOG_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";


export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: BLOG_URL,
    link: BLOG_URL,
    language: "en",
    author: { name: AUTHOR_NAME, link: AUTHOR_URL },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE_NAME}`,
    updated: posts[0] ? new Date(posts[0].date) : undefined,
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
      author: [{ name: AUTHOR_NAME, link: AUTHOR_URL }],
      image: post.banner ? `${BLOG_URL}${post.banner}` : undefined,
      date: new Date(post.date),
      category: [{ name: post.Category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
