import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type Post } from "@/lib/posts";

// "Section Two": one column per desk, separated by vertical hairlines, each
// with its latest story and up to two more headlines. Empty desks print a
// "plate uncast" notice instead of disappearing, so the grid holds shape.
export function DeskGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="reveal">
      <div className="flex items-baseline justify-between gap-ed-md">
        <h2 className="label-caps text-ink">Section Two &bull; The Desks</h2>
        <Link
          href="/blog"
          className="group text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em] text-accent-ink hover:text-ink transition-colors"
        >
          Full archive <span className="nudge" aria-hidden>&rarr;</span>
        </Link>
      </div>
      <div className="double-rule mt-ed-xs" />

      <div className="grid tablet:grid-cols-2 desktop:grid-cols-4 mt-ed-md">
        {CATEGORIES.map((category, i) => {
          const [lead, ...more] = posts.filter((p) => p.Category === category);
          const n = String(i + 1).padStart(2, "0");
          return (
            <div
              key={category}
              className="py-ed-md tablet:px-ed-md border-b border-hairline desktop:border-b-0 desktop:border-l first:desktop:border-l-0 first:desktop:pl-0 last:desktop:pr-0"
            >
              <div className="flex items-baseline justify-between text-(length:--font-size-micro) font-semibold uppercase tracking-[0.08em]">
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="text-accent-ink hover:text-ink transition-colors"
                >
                  Desk {n} &bull; {category}
                </Link>
                <span className="text-silver">{lead ? `${more.length + 1} filed` : "Plate uncast"}</span>
              </div>

              {lead ? (
                <>
                  <Link href={`/blog/${lead.slug}`} className="group block mt-ed-sm">
                    {lead.banner && (
                      <ViewTransition name={`post-banner-${lead.slug}`}>
                        <div className="press-plate relative aspect-[4/3] w-full overflow-hidden bg-paper-raised">
                          <Image
                            src={lead.banner}
                            alt={lead.bannerAlt ?? ""}
                            fill
                            sizes="(min-width: 1200px) 290px, (min-width: 768px) 50vw, 100vw"
                            className="object-cover press-photo"
                          />
                        </div>
                      </ViewTransition>
                    )}
                    <h3 className="font-headline text-(length:--font-size-h3) leading-snug text-ink mt-ed-sm ink-link-target">
                      {lead.title}
                    </h3>
                    <p className="text-(length:--font-size-small) text-charcoal mt-ed-xs leading-relaxed line-clamp-4">
                      {lead.dek}
                    </p>
                  </Link>
                  {more.slice(0, 2).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block mt-ed-sm pt-ed-sm border-t border-hairline font-headline text-(length:--font-size-body) leading-snug text-ink"
                    >
                      <span className="ink-link-target">{post.title}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="mt-ed-sm bg-paper-raised tablet:aspect-[4/3] flex flex-col items-center justify-center text-center p-ed-md">
                  <span className="fleuron text-(length:--font-size-h2)" aria-hidden>
                    &para;
                  </span>
                  <p className="font-headline text-(length:--font-size-body) text-ink mt-ed-xs">
                    Type has not been cast for this week&rsquo;s {category} run
                  </p>
                  <p className="text-(length:--font-size-micro) uppercase tracking-[0.08em] text-silver mt-ed-sm">
                    Chase frame empty &bull; 0 columns set
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
