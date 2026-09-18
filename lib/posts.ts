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
  /** Path under /public, e.g. "/banners/my-post.png". Optional — not every post has one. */
  banner?: string;
  bannerAlt?: string;
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

/** Plain-text excerpt of MDX body content, stripped of markdown/JSX syntax,
 * truncated at a word boundary. Used for the front-page lead preview. */
export function getExcerpt(content: string, maxChars = 600): string {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks (no useful excerpt text)
    .replace(/`([^`]*)`/g, "$1") // inline code -> keep the text, drop backticks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> link text
    .replace(/<[^>]+>/g, " ") // JSX/HTML tags
    .replace(/^#+\s+(.+)$/gm, "$1.") // heading markers -> keep text, end with a period
    .replace(/[*_>]/g, "") // remaining markdown punctuation (not "-", used in real prose)
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxChars) return plain;
  const cut = plain.slice(0, maxChars);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
