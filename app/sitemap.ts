import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";
const BLOG_URL = `${SITE_URL}/blog`;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BLOG_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BLOG_URL}/archive`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BLOG_URL}/author`, changeFrequency: "monthly", priority: 0.3 },
    ...CATEGORIES.map((category) => ({
      url: `${BLOG_URL}/categories/${category.toLowerCase()}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BLOG_URL}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
