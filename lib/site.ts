export const SITE_NAME = "Auxesis";
export const SITE_DESCRIPTION =
  "A weekly, AI-powered blog by Abhishek Prashant on Web, Mobile, Backend, and AI development.";

export const AUTHOR_NAME = "Abhishek Prashant";
// The portfolio's homepage; its Person JSON-LD carries this same @id, so the
// blog's author ties back to that entity.
export const AUTHOR_URL = "https://abhishekprashant.dev";
export const AUTHOR_ID = `${AUTHOR_URL}/#person`;

// Public origin, e.g. https://abhishekprashant.dev. Falls back to production so
// canonical URLs never point at localhost or a vercel.app preview.
export const SITE_URL = process.env.SITE_URL ?? "https://abhishekprashant.dev";

// The app is served under /blog (next.config basePath), so every public URL
// is composed from this.
export const BLOG_URL = `${SITE_URL}/blog`;
