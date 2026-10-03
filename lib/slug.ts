// Anchor ids for post headings. Shared by the MDX heading components (which
// render the ids) and the contents index (which links to them), so the two
// always agree.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
