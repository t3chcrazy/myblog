import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATEGORIES, type Category } from "@/lib/categories";
import { slugify } from "@/lib/slug";

export { CATEGORIES };
export type { Category };

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
  /** Slugs of earlier posts this one builds on. Listed first under
   * "Related Dispatches", ahead of tag matches. */
  related?: string[];
  /** Versions the post was verified against, e.g. "Next.js 16.3.5". Shown
   * under the byline so readers can judge whether it has gone stale. */
  appliesTo?: string;
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

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag.toLowerCase());
  }
  return [...tags].sort();
}

export function getPostsByTag(tag: string): Post[] {
  const normalized = tag.toLowerCase();
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === normalized)
  );
}

/** The post's explicit `related` slugs first, then other posts sharing
 * tags/category with `post`, ranked by tag-overlap count (ties broken by
 * same category, then recency). Used for the "Related posts" section at
 * the bottom of each post. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const postTags = new Set(post.tags.map((t) => t.toLowerCase()));
  const all = getAllPosts();
  const explicit = (post.related ?? [])
    .map((slug) => all.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Post => candidate !== undefined);
  const exclude = new Set([post.slug, ...explicit.map((p) => p.slug)]);

  const byTags = all
    .filter((candidate) => !exclude.has(candidate.slug))
    .map((candidate) => {
      const overlap = candidate.tags.filter((t) =>
        postTags.has(t.toLowerCase())
      ).length;
      const sameCategory = candidate.Category === post.Category ? 1 : 0;
      return { candidate, overlap, sameCategory };
    })
    .filter(({ overlap, sameCategory }) => overlap > 0 || sameCategory > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      if (b.sameCategory !== a.sameCategory) return b.sameCategory - a.sameCategory;
      return new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime();
    })
    .map(({ candidate }) => candidate);

  return [...explicit, ...byTags].slice(0, limit);
}

/** The post's `##` headings with their anchor ids, for the contents index.
 * Inline markdown is stripped first so ids match what the rendered heading
 * components produce. */
export function getHeadings(content: string): { id: string; text: string }[] {
  return content
    .replace(/```[\s\S]*?```/g, "") // "## " inside code blocks isn't a heading
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line
        .slice(3)
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> link text
        .replace(/[`*_]/g, "")
        .trim();
      return { id: slugify(text), text };
    });
}

/** Plain-text excerpt of MDX body content, stripped of markdown/JSX syntax,
 * truncated at a word boundary. Used for the front-page lead preview. */
export function getExcerpt(content: string, maxChars = 600): string {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks (no useful excerpt text)
    .replace(/<Primer>[\s\S]*?<\/Primer>/g, " ") // background briefing isn't the story
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
