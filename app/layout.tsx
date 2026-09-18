import type { Metadata } from "next";
import { newsreader, plusJakartaSans } from "./fonts";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Weekly Build",
    template: "%s | The Weekly Build",
  },
  description:
    "An AI-written, AI-maintained weekly blog covering Web, Mobile, Backend, and AI development.",
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
        <Masthead />
        <main className="flex-1" data-pagefind-body>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
