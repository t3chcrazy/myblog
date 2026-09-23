import Link from "next/link";
import { CATEGORIES, type Post } from "@/lib/posts";

function shortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function RailHeading({ title, aside }: { title: string; aside?: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-ink pb-ed-xs mb-ed-sm">
      <h3 className="label-caps text-ink">{title}</h3>
      {aside && (
        <span className="text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-accent-ink">
          {aside}
        </span>
      )}
    </div>
  );
}

// Left rail: one wire brief per desk — the newest story from that desk
// that isn't already on the page. If every story from a desk is already
// shown (lead or index), point to it instead of repeating the headline.
// Keeps the front page three-columned even with only a handful of posts.
export function DeskWire({
  posts,
  leadSlug,
  indexSlugs,
}: {
  posts: Post[];
  leadSlug: string;
  indexSlugs: string[];
}) {
  const onPage = new Set([leadSlug, ...indexSlugs]);
  return (
    <div>
      <RailHeading title="The Wire" aside="By Desk" />
      <ul>
        {CATEGORIES.map((category) => {
          const desk = posts.filter((p) => p.Category === category);
          const latest = desk.find((p) => !onPage.has(p.slug));
          const newest = desk[0];
          const pointer = !latest && newest
            ? newest.slug === leadSlug
              ? "Leads this edition, centre column."
              : `See index No. ${String(indexSlugs.indexOf(newest.slug) + 1).padStart(2, "0")}.`
            : null;
          return (
            <li key={category} className="py-ed-sm border-b border-hairline last:border-b-0">
              <div className="flex items-baseline justify-between text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em]">
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="text-accent-ink hover:text-ink transition-colors"
                >
                  {category}
                </Link>
                <span className="text-silver">
                  {newest ? shortDate(newest.date) : "Awaiting copy"}
                </span>
              </div>
              {latest ? (
                <Link href={`/blog/${latest.slug}`} className="group block mt-1">
                  <span className="font-headline text-(length:--font-size-body) leading-snug text-ink ink-link-target">
                    {latest.title}
                  </span>
                  <span className="block text-(length:--font-size-small) text-charcoal mt-1 line-clamp-3">
                    {latest.dek}
                  </span>
                </Link>
              ) : (
                <p className="font-headline italic text-(length:--font-size-small) text-silver mt-1">
                  {pointer ?? "Type has not yet been cast for this desk."}
                </p>
              )}
              <p className="text-(length:--font-size-micro) uppercase tracking-[0.08em] text-silver mt-1">
                {desk.length} {desk.length === 1 ? "dispatch" : "dispatches"} on file
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Right rail: numbered index of everything else in the edition, then the
// reversed-out subscription box and a colophon note.
export function EditionIndex({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-ed-lg">
      {posts.length > 0 && (
        <div>
          <RailHeading title="In This Edition" aside="Index" />
          <ol>
            {posts.map((post, i) => (
              <li key={post.slug} className="py-ed-sm border-b border-hairline last:border-b-0">
                <Link href={`/blog/${post.slug}`} className="group flex gap-ed-sm">
                  <span className="font-headline text-(length:--font-size-h3) font-semibold leading-none text-accent-ink tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
                      {post.Category}
                    </span>
                    <span className="font-headline text-(length:--font-size-body) leading-snug text-ink ink-link-target">
                      {post.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="bg-ink text-paper p-ed-md">
        <p className="label-caps text-accent dark:text-[#96632a]">Circulation</p>
        <p className="font-headline text-(length:--font-size-h3) leading-tight mt-ed-xs">
          Delivered every Saturday
        </p>
        <p className="text-(length:--font-size-small) opacity-75 mt-ed-sm leading-relaxed">
          One long-form dispatch a week. No trackers, full text in the feed.
        </p>
        <a
          href="/feed.xml"
          className="block mt-ed-md border border-paper px-ed-md py-ed-sm text-center label-caps hover:bg-paper hover:text-ink transition-colors"
        >
          Subscribe via RSS
        </a>
      </div>

      <div className="border border-hairline p-ed-md">
        <p className="label-caps text-accent-ink">Colophon</p>
        <p className="text-(length:--font-size-small) text-charcoal mt-ed-xs leading-relaxed">
          Set in Newsreader and Plus Jakarta Sans. Researched, written and
          typeset each week by an AI; every claim is cited to its source.
        </p>
      </div>
    </div>
  );
}
