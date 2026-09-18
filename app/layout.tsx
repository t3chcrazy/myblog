import type { Metadata } from "next";
import { nanumMyeongjo, switzer } from "./fonts";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nanumMyeongjo.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Masthead />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
