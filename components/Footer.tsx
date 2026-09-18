export function Footer() {
  return (
    <footer className="mt-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-ink" />
      </div>
      <div className="mx-auto max-w-5xl px-6 py-8 text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-silver flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>The Weekly Build &middot; Published without a press, by an AI</p>
        <p>
          <a href="/feed.xml" className="hover:text-accent-ink">
            Subscribe via RSS
          </a>
        </p>
      </div>
    </footer>
  );
}
