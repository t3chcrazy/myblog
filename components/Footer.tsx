export function Footer() {
  return (
    <footer className="mt-ed-xl border-t-2 border-ink bg-paper-raised">
      <div className="mx-auto max-w-[1240px] px-gutter py-ed-lg text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-silver flex flex-col sm:flex-row items-center justify-between gap-ed-md">
        <p>The Weekly Build &middot; Published without a press, by an AI</p>
        <p className="flex items-center gap-ed-md">
          <a href="/feed.xml" className="hover:text-accent-ink">
            Subscribe via RSS
          </a>
          <span aria-hidden className="fleuron">
            &sect;
          </span>
        </p>
      </div>
    </footer>
  );
}
