export const SITE_NAME = "Auxesis";
export const SITE_DESCRIPTION =
  "A weekly, AI-powered blog by Abhishek Prashant on Web, Mobile, Backend, and AI development.";

export const AUTHOR_NAME = "Abhishek Prashant";
// The AI that researches and drafts each post. Credited by name on every
// byline; AUTHOR_NAME reviews, edits and publishes.
export const AI_WRITER = "Claude";
// The portfolio's homepage; its Person JSON-LD carries this same @id, so the
// blog's author ties back to that entity.
export const AUTHOR_URL = "https://abhishekprashant.dev";
export const AUTHOR_ID = `${AUTHOR_URL}/#person`;

// Public origin, e.g. https://abhishekprashant.dev. Falls back to production so
// canonical URLs never point at localhost or a vercel.app preview.
export const SITE_URL = process.env.SITE_URL ?? "https://abhishekprashant.dev";

// Must match basePath in next.config.ts.
export const BASE_PATH = "/blog";

// The app is served under BASE_PATH, so every public URL is composed from this.
export const BLOG_URL = `${SITE_URL}${BASE_PATH}`;

// next/image and plain <img> don't add basePath to a root-relative src, so a
// public asset like "/banners/x.png" must be prefixed or it resolves outside
// the blog (a 400 from the dev image optimizer).
export function withBasePath<T>(src: T): T | string {
  return typeof src === "string" && src.startsWith("/") && !src.startsWith("//")
    ? `${BASE_PATH}${src}`
    : src;
}
