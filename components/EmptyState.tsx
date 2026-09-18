import Link from "next/link";

export function EmptyState({
  title,
  body,
  actionHref = "/",
  actionLabel = "Consult today's front page",
}: {
  title: string;
  body: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center py-ed-xl px-gutter bg-paper-raised">
      <span className="fleuron text-[length:var(--font-size-h1)] leading-none" aria-hidden>
        &#10086;
      </span>
      <p className="text-[length:var(--font-size-small)] uppercase tracking-[0.15em] text-accent-ink font-semibold mt-ed-md">
        Composing Room Notice
      </p>
      <h3 className="font-[family-name:var(--font-headline)] text-[length:var(--font-size-h2)] font-medium text-ink mt-ed-xs">
        {title}
      </h3>
      <div className="w-16 h-[2px] bg-accent-ink opacity-40 my-ed-sm" />
      <p className="text-[length:var(--font-size-body)] text-charcoal max-w-sm">
        {body}
      </p>
      <Link
        href={actionHref}
        className="text-[length:var(--font-size-micro)] uppercase tracking-[0.15em] text-accent-ink hover:text-ink mt-ed-lg"
      >
        &larr; {actionLabel}
      </Link>
    </div>
  );
}
