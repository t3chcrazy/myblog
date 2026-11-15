// Runs Pagefind over the prerendered HTML.
//
// Locally, `next build` writes HTML to .next/server/app. Under Vercel's Next
// adapter that directory is empty and the HTML lives in
// .next/server/route-cache/APP_PAGE/<hash>/$/<route>.html instead. Pagefind
// derives page URLs from file paths, so stage the files into a clean tree
// (<route>.html) before indexing.
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const APP_DIR = ".next/server/app";
const ROUTE_CACHE_DIR = ".next/server/route-cache/APP_PAGE";
const STAGING_DIR = ".next/pagefind-src";
const OUTPUT_DIR = "public/pagefind";

function walkHtml(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith(".html"))
    .map((e) => join(e.parentPath, e.name));
}

let source = APP_DIR;

if (walkHtml(APP_DIR).length === 0) {
  const files = walkHtml(ROUTE_CACHE_DIR);
  if (files.length === 0) {
    console.error(`No HTML found in ${APP_DIR} or ${ROUTE_CACHE_DIR}`);
    process.exit(1);
  }
  rmSync(STAGING_DIR, { recursive: true, force: true });
  for (const file of files) {
    // <hash>/$/<route>.html -> <route>.html ; <hash>/$.html -> index.html
    const rel = relative(ROUTE_CACHE_DIR, file).split("\\").join("/");
    const [, ...rest] = rel.split("/"); // drop <hash>
    let route = rest.join("/");
    if (route === "$.html") route = "index.html";
    else if (route.startsWith("$/")) route = route.slice(2);
    const dest = join(STAGING_DIR, route);
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(file, dest);
  }
  console.log(`Staged ${files.length} HTML files from ${ROUTE_CACHE_DIR}`);
  source = STAGING_DIR;
}

const result = spawnSync(
  "pagefind",
  ["--site", source, "--output-path", OUTPUT_DIR],
  { stdio: "inherit", shell: process.platform === "win32" },
);
process.exit(result.status ?? 1);
