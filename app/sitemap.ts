import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/author`, changeFrequency: "monthly", priority: 0.3 },
    ...CATEGORIES.map((category) => ({
      url: `${SITE_URL}/categories/${category.toLowerCase()}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
