export const CATEGORIES = ["Web", "Mobile", "Backend", "AI"] as const;
export type Category = (typeof CATEGORIES)[number];
