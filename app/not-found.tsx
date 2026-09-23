import type { Metadata } from "next";
import { EmptyState } from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-gutter pt-ed-lg pb-ed-xl">
      <p className="text-(length:--font-size-micro) uppercase tracking-[0.2em] text-silver">
        Erratum &middot; 404
      </p>
      <h1 className="font-headline text-(length:--font-size-h1) font-normal text-ink tracking-[-0.015em] mt-ed-xs">
        This page was never set in type
      </h1>
      <div className="h-px bg-ink mt-ed-md mb-ed-lg" />
      <EmptyState
        title="Missing From the Archive"
        body="The page you asked for isn't in any edition — it may have been moved, or the link was misprinted. Try the search bar above, or head back to the front page."
      />
    </div>
  );
}
