import type { Metadata } from "next";

// Relative to metadataBase (BLOG_URL), so "/foo" resolves to ".../blog/foo".
// Next replaces the whole `alternates` object per route, so the RSS
// autodiscovery link has to be repeated alongside each canonical.
export function pageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    types: { "application/rss+xml": "/feed.xml" },
  };
}
