import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { newsreader, plusJakartaSans } from "./fonts";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { BLOG_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BLOG_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Per-route alternates replace this object, so each page repeats the RSS link.
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Runs before hydration so the correct theme applies with no flash: an
// explicit saved choice wins, otherwise fall back to system preference.
const THEME_INIT_SCRIPT = `
(function () {
  var stored = localStorage.getItem("theme");
  var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-ed-sm focus:left-ed-sm focus:z-50 focus:bg-ink focus:text-paper focus:px-ed-md focus:py-ed-xs text-(length:--font-size-small) uppercase tracking-[0.15em]"
        >
          Skip to content
        </a>
        <Masthead />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
