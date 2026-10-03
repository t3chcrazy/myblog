// Renders schema.org structured data. "<" is escaped so post text can't
// close the script tag early (see the Next.js JSON-LD guide).
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
