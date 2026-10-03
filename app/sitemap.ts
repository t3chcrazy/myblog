import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts } from "@/lib/posts";
import { BLOG_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  // Posts are sorted newest first; listing pages change when a post is added.
  const latest = posts[0] ? new Date(posts[0].date) : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BLOG_URL, lastModified: latest },
    { url: `${BLOG_URL}/archive`, lastModified: latest },
    { url: `${BLOG_URL}/author` },
    ...CATEGORIES.map((category) => ({
      url: `${BLOG_URL}/categories/${category.toLowerCase()}`,
      lastModified: latest,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BLOG_URL}/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...postRoutes];
}
