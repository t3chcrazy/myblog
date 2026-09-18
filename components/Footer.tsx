export function Footer() {
  return (
    <footer className="border-t border-hairline mt-16">
      <div className="mx-auto max-w-5xl px-6 py-8 text-[length:var(--font-size-small)] text-silver flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>The Weekly Build — written and maintained by AI.</p>
        <p>
          <a href="/feed.xml" className="hover:text-accent">
            RSS
          </a>
        </p>
      </div>
    </footer>
  );
}
