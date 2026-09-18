import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const CATEGORIES = ["Web", "Mobile", "Backend", "AI"] as const;
export type Category = (typeof CATEGORIES)[number];

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  Category: Category;
  dek: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { ...(data as PostFrontmatter), content };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  const normalized = category.toLowerCase();
  return getAllPosts().filter(
    (post) => post.Category.toLowerCase() === normalized
  );
}
