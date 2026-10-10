import { ViewTransition, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Post } from "@/lib/posts";
import { withBasePath } from "@/lib/site";

// "Section Two": one column per desk, separated by vertical hairlines, each
// with its latest story and up to two more headlines. Empty desks print a
// "space reserved" plate instead of disappearing, so the grid holds shape.
// The front-page lead is skipped here (it's already above), so a desk shows
// its next story, or a note pointing back up when the lead is its only one.
export function DeskGrid({ posts, frontPageSlug }: { posts: Post[]; frontPageSlug: string }) {
  return (
    <section className="reveal">
      <div className="flex items-baseline justify-between gap-ed-md">
        <h2 className="label-caps text-ink">Section Two &bull; The Desks</h2>
        <Link
          href="/archive"
          className="group inline-flex items-center min-h-6 text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-accent-ink hover:text-ink transition-colors"
        >
          Full archive <span className="nudge" aria-hidden>&rarr;</span>
        </Link>
      </div>
      <div className="double-rule mt-ed-xs" />

      <div className="grid tablet:grid-cols-2 desktop:grid-cols-4 mt-ed-md">
        {CATEGORIES.map((category, i) => {
          const desk = posts.filter((p) => p.Category === category);
          // The front-page lead is already above; the desk shows its next story.
          const leadsFront = desk.some((p) => p.slug === frontPageSlug);
          const [lead, ...more] = desk.filter((p) => p.slug !== frontPageSlug);
          const n = String(i + 1).padStart(2, "0");
          return (
            <div
              key={category}
              className="py-ed-md tablet:px-ed-md border-b border-hairline desktop:border-b-0 desktop:border-l first:desktop:border-l-0 first:desktop:pl-0 last:desktop:pr-0"
            >
              <div className="flex items-baseline justify-between text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em]">
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="inline-flex items-center min-h-6 text-accent-ink hover:text-ink transition-colors"
                >
                  Desk {n} &bull; {category}
                </Link>
                <span className="text-silver">
                  {desk.length > 0 ? `${desk.length} ${desk.length === 1 ? "post" : "posts"}` : "None yet"}
                </span>
              </div>

              {lead ? (
                <>
                  <Link href={`/${lead.slug}`} className="group block mt-ed-sm">
                    {lead.banner ? (
                      <ViewTransition name={`post-banner-${lead.slug}`}>
                        <div className="press-plate relative aspect-4/3 w-full overflow-hidden bg-paper-raised">
                          <Image
                            src={withBasePath(lead.banner)}
                            alt={lead.bannerAlt ?? ""}
                            fill
                            sizes="(min-width: 1200px) 290px, (min-width: 768px) 50vw, 100vw"
                            className="object-cover press-photo"
                          />
                        </div>
                      </ViewTransition>
                    ) : (
                      <TextPlate dek={lead.dek} />
                    )}
                    <h3 className="font-headline text-(length:--font-size-h3) leading-snug text-ink mt-ed-sm ink-link-target">
                      {lead.title}
                    </h3>
                    {lead.banner && (
                      <p className="text-(length:--font-size-small) text-charcoal mt-ed-xs leading-relaxed line-clamp-4">
                        {lead.dek}
                      </p>
                    )}
                  </Link>
                  {more.slice(0, 2).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${post.slug}`}
                      className="group block mt-ed-sm pt-ed-sm border-t border-hairline font-headline text-(length:--font-size-body) leading-snug text-ink"
                    >
                      <span className="ink-link-target">{post.title}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <ReservedSpace>
                  {leadsFront ? (
                    <>
                      <p className="font-headline text-(length:--font-size-body) text-ink">
                        This desk&rsquo;s one dispatch leads the front page
                      </p>
                      <a
                        href="#lead-story"
                        className="inline-flex items-center min-h-6 mt-ed-xs text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-accent-ink hover:text-ink transition-colors"
                      >
                        Back to the lead <span className="ml-1" aria-hidden>&uarr;</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="font-headline text-(length:--font-size-body) text-ink">
                        Space reserved for the {category} desk
                      </p>
                      <p className="text-(length:--font-size-micro) uppercase tracking-[0.08em] text-silver mt-ed-xs">
                        No dispatch filed yet
                      </p>
                    </>
                  )}
                </ReservedSpace>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// A plate held open on the forme: dashed hairline frame, no fill, so an
// empty slot reads as space set aside rather than a missing image.
function ReservedSpace({ children }: { children: ReactNode }) {
  return (
    <div className="reserved-space mt-ed-sm tablet:aspect-4/3 flex flex-col items-center justify-center text-center p-ed-lg">
      <span className="fleuron text-(length:--font-size-h3) leading-none mb-ed-sm" aria-hidden>
        &#10086;
      </span>
      {children}
    </div>
  );
}

// Stand-in for a missing banner: the dek set large in italic, so the slot
// keeps the plate's height and carries the story instead of a blank box.
function TextPlate({ dek }: { dek: string }) {
  return (
    <div className="reserved-space aspect-4/3 w-full flex items-center p-ed-lg">
      <p className="font-headline italic text-(length:--font-size-lead) leading-snug text-charcoal line-clamp-6">
        {dek}
      </p>
    </div>
  );
}
