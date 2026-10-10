import Link from "next/link";
import { CATEGORIES, type Post } from "@/lib/posts";

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

function shortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

// Left rail: the wire, read by desk — where each desk stands this edition
// (how many dispatches it has filed, and when it last filed), each a way into
// that desk. A directory rather than headlines, so it never repeats a story
// already on the page.
export function DeskWire({ posts }: { posts: Post[] }) {
  return (
    <div>
      <RailHeading title="The Wire" aside="By Desk" />
      <ul>
        {CATEGORIES.map((category) => {
          const desk = posts.filter((p) => p.Category === category);
          const latest = desk[0];
          return (
            <li key={category} className="border-b border-hairline last:border-b-0">
              <Link
                href={`/categories/${category.toLowerCase()}`}
                className="group flex items-baseline justify-between gap-ed-sm py-ed-sm"
              >
                <span className="font-headline text-(length:--font-size-h3) leading-tight text-ink ink-link-target">
                  {category} Desk
                </span>
                <span className="shrink-0 text-right text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
                  {latest ? (
                    <>
                      {desk.length} {desk.length === 1 ? "dispatch" : "dispatches"}
                      <span className="block font-normal">
                        Last filed <time dateTime={latest.date}>{shortDate(latest.date)}</time>
                      </span>
                    </>
                  ) : (
                    "None filed yet"
                  )}
                </span>
              </Link>
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
                <Link href={`/${post.slug}`} className="group flex gap-ed-sm">
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
        <p className="label-caps text-accent dark:text-accent-ink">Circulation</p>
        <p className="font-headline text-(length:--font-size-h3) leading-tight mt-ed-xs">
          Delivered every Saturday
        </p>
        <p className="text-(length:--font-size-small) opacity-75 mt-ed-sm leading-relaxed">
          One long-form dispatch a week. Headlines and summaries in the feed, each linking to the full post.
        </p>
        <a
          href="/blog/feed.xml"
          className="block mt-ed-md border border-paper px-ed-md py-ed-sm text-center label-caps hover:bg-paper hover:text-ink transition-colors"
        >
          Subscribe via RSS
        </a>
      </div>

      <div className="border border-hairline p-ed-md">
        <p className="label-caps text-accent-ink">Colophon</p>
        <p className="text-(length:--font-size-small) text-charcoal mt-ed-xs leading-relaxed">
          Set in Newsreader and Plus Jakarta Sans. Researched and written each
          week by Claude, reviewed and published by Abhishek Prashant; every
          claim is cited to its source.
        </p>
      </div>
    </div>
  );
}
