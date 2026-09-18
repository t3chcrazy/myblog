import { CATEGORIES, getAllPosts } from "@/lib/posts";
import { CategorySection } from "@/components/CategorySection";
import { TeaserCard } from "@/components/TeaserCard";
import { Divider } from "@/components/Divider";

export default function Home() {
  const posts = getAllPosts();
  const [frontPageLead, ...rest] = posts;
  const secondary = rest.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-10 pb-24">
      {frontPageLead ? (
        <section className="grid gap-10 tablet:grid-cols-[1.4fr_1fr]">
          <TeaserCard post={frontPageLead} variant="lead" />
          {secondary.length > 0 && (
            <div className="tablet:border-l tablet:border-hairline tablet:pl-8">
              <p className="text-[length:var(--font-size-micro)] uppercase tracking-[0.2em] text-silver mb-2">
                Also in this edition
              </p>
              {secondary.map((post) => (
                <TeaserCard key={post.slug} post={post} variant="row" />
              ))}
            </div>
          )}
        </section>
      ) : (
        <p className="text-[length:var(--font-size-lead)] text-charcoal max-w-xl">
          The first edition hasn&apos;t run yet — check back after the next
          weekly build.
        </p>
      )}

      {frontPageLead && <Divider />}

      {CATEGORIES.map((category, i) => {
        const categoryPosts = posts
          .filter((post) => post.Category === category)
          .slice(0, 4);

        return (
          <div key={category}>
            <CategorySection category={category} posts={categoryPosts} />
            {i < CATEGORIES.length - 1 && categoryPosts.length > 0 && (
              <Divider />
            )}
          </div>
        );
      })}
    </div>
  );
}
