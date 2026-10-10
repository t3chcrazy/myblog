import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { estimateReadTime, getExcerpt, type Post } from "@/lib/posts";
import { AI_WRITER, AUTHOR_NAME, withBasePath } from "@/lib/site";

// Split an excerpt into two roughly equal paragraphs at a sentence
// boundary, so the two newspaper columns each open with a full sentence.
function toParagraphs(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+["”’)]*\s*|.+$/g) ?? [text];
  if (sentences.length < 4) return [text];
  const mid = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, mid).join("").trim(), sentences.slice(mid).join("").trim()];
}

export function LeadStory({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const excerpt = getExcerpt(post.content, 900);
  const minutes = estimateReadTime(post.content);

  return (
    <article id="lead-story" className="group/lead">
      <p className="label-caps text-accent-ink">
        Feature <span aria-hidden>&bull;</span> {post.Category} Desk
      </p>
      <h2 className="font-headline text-(length:--font-size-h1) desktop:text-[3.25rem] font-normal text-ink mt-ed-xs leading-[1.05] tracking-[-0.02em]">
        <Link href={`/${post.slug}`} className="ink-link">
          {post.title}
        </Link>
      </h2>
      <p className="font-headline italic text-(length:--font-size-lead) text-charcoal mt-ed-sm">
        {post.dek}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-x-ed-md gap-y-1 mt-ed-md py-ed-xs border-y border-hairline text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-silver">
        <span>
          By {AI_WRITER} &middot; Edited by {AUTHOR_NAME} &middot;{" "}
          <time dateTime={post.date} className="whitespace-nowrap">{date}</time>
        </span>
        <span className="whitespace-nowrap">{minutes} min read</span>
      </div>

      {post.banner && (
        <figure className="mt-ed-md">
          <ViewTransition name={`post-banner-${post.slug}`}>
            <div className="relative aspect-video w-full bg-paper-raised border border-ink p-[3px]">
              <div className="press-plate relative h-full w-full overflow-hidden">
                <Image
                  src={withBasePath(post.banner)}
                  alt={post.bannerAlt ?? ""}
                  fill
                  sizes="(min-width: 1200px) 50vw, 100vw"
                  className="object-cover press-photo"
                  priority
                />
              </div>
            </div>
          </ViewTransition>
        </figure>
      )}

      <div className="news-columns mt-ed-md text-base text-ink leading-[1.6]">
        {/* One column on phones: print only the first half there, so
            "Continued inside" isn't a long scroll below the fold. */}
        {toParagraphs(excerpt).map((para, i) => (
          <p key={i} className={i > 0 ? "hidden tablet:block" : undefined}>
            {para}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-ed-md mt-ed-md">
        <div className="h-px bg-hairline flex-1" />
        <Link
          href={`/${post.slug}`}
          className="group inline-flex items-center min-h-8 label-caps text-accent-ink hover:text-ink transition-colors"
        >
          Continued inside <span className="nudge" aria-hidden>&rarr;</span>
        </Link>
        <div className="h-px bg-hairline flex-1" />
      </div>
    </article>
  );
}
