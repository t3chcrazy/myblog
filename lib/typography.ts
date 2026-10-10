// Printer's quotes for plain strings that don't pass through the MDX
// pipeline (front-matter titles and deks, the contents index, excerpts).
// Post bodies get the same treatment from remark-smartypants.

// A quote opens after start-of-text, whitespace, an opening bracket or a dash;
// anywhere else (after a letter or closing punctuation) it closes, which also
// turns apostrophes in "it's" or "Runtime's" into ’.
const OPENS_AFTER = /(^|[\s([{—–-])/;

export function smartQuotes(text: string): string {
  return text
    .replace(new RegExp(`${OPENS_AFTER.source}"`, "g"), "$1“")
    .replace(/"/g, "”")
    .replace(new RegExp(`${OPENS_AFTER.source}'`, "g"), "$1‘")
    .replace(/'/g, "’");
}

/** smartQuotes for markdown, leaving `inline code` straight, as it is in the
 * rendered body. */
export function smartQuotesOutsideCode(markdown: string): string {
  return markdown.replace(/(`[^`]*`)|[^`]+/g, (segment, code) =>
    code ? segment : smartQuotes(segment)
  );
}
