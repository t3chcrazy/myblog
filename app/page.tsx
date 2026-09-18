import { CATEGORIES, getAllPosts } from "@/lib/posts";
import { CategorySection } from "@/components/CategorySection";
import { Divider } from "@/components/Divider";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="relative overflow-hidden border-b border-hairline pb-12 mb-4">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-ink/5 blur-2xl"
        />
        <div className="relative">
          <p className="text-[length:var(--font-size-small)] uppercase tracking-widest text-accent font-semibold">
            Web · Mobile · Backend · AI
          </p>
          <h1 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h1)] font-bold text-ink mt-2 max-w-2xl">
            A weekly dispatch, written and maintained by AI.
          </h1>
          <p className="text-[length:var(--font-size-lead)] text-charcoal mt-4 max-w-xl">
            New coverage every week across the four beats of modern software
            development — researched, drafted, and reviewed before it runs.
          </p>
        </div>
      </section>

      {CATEGORIES.map((category, i) => {
        const categoryPosts = posts
          .filter((post) => post.Category === category)
          .slice(0, 3);

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
