// Post-build script: prerender each route using the built server, then create
// a clean Hostinger-ready dist/ containing static files only.
import { cp, rm, readdir, mkdir, writeFile, stat, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const outputDir = path.join(root, ".output");
const tempDir = path.join(root, ".hostinger-dist-temp");

const publicDirCandidates = [
  path.join(outputDir, "public"),
  path.join(distDir, "client"),
  path.join(distDir, "public"),
];
const serverEntryCandidates = [
  path.join(outputDir, "server", "index.mjs"),
  path.join(outputDir, "server", "index.js"),
  path.join(distDir, "server", "index.mjs"),
  path.join(distDir, "server", "index.js"),
];

const publicDir = publicDirCandidates.find((candidate) => existsSync(candidate));
const serverEntry = serverEntryCandidates.find((candidate) => existsSync(candidate));

// Edit this list to add more routes to prerender.
const staticRoutes = ["/", "/about", "/contact", "/products"];

// Derive product detail routes by parsing the source data file (avoids importing TS at build time).
async function loadProductRoutes() {
  try {
    const src = await readFile(path.join(root, "src/data/products.ts"), "utf8");
    const names = [...src.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
    const slugify = (s) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return names.map((n) => `/products/${slugify(n)}`);
  } catch (err) {
    console.warn("[hostinger] could not load product routes:", err?.message ?? err);
    return [];
  }
}

const routes = [...staticRoutes, ...(await loadProductRoutes())];

async function safeRemove(target) {
  await rm(target, { recursive: true, force: true });
}

async function copyContents(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) =>
      cp(path.join(from, entry.name), path.join(to, entry.name), {
        recursive: true,
        force: true,
      }),
    ),
  );
}

if (!publicDir || !(await stat(publicDir)).isDirectory()) {
  console.error(
    "[hostinger] No public build output found. Checked: " +
      publicDirCandidates.map((candidate) => path.relative(root, candidate)).join(", "),
  );
  process.exit(1);
}

if (!serverEntry) {
  console.error(
    "[hostinger] No server entry found. Checked: " +
      serverEntryCandidates.map((candidate) => path.relative(root, candidate)).join(", "),
  );
  process.exit(1);
}

console.log("[hostinger] Prerendering routes via built worker...");
const workerMod = await import(pathToFileURL(serverEntry).href);
const worker = workerMod.default ?? workerMod;
if (!worker || typeof worker.fetch !== "function") {
  console.error("[hostinger] Worker entry does not export fetch handler.");
  process.exit(1);
}

// Start with only the browser-safe public files. Server output is never copied.
await safeRemove(tempDir);
await mkdir(tempDir, { recursive: true });
await copyContents(publicDir, tempDir);

const ctx = { waitUntil() {}, passThroughOnException() {} };
for (const route of routes) {
  try {
    const res = await worker.fetch(new Request(`http://localhost${route}`), {}, ctx);
    if (!res.ok) {
      console.warn(`[hostinger] ${route} -> ${res.status} ${res.statusText} (skipped)`);
      continue;
    }
    const html = await res.text();
    const outPath =
      route === "/"
        ? path.join(tempDir, "index.html")
        : path.join(tempDir, route.replace(/^\//, ""), "index.html");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    console.log(`[hostinger] wrote ${path.relative(root, outPath)}`);
  } catch (err) {
    console.warn(`[hostinger] failed to prerender ${route}:`, err?.message ?? err);
  }
}

// Ensure 404.html exists (used by Hostinger and as SPA fallback)
const notFoundPath = path.join(tempDir, "404.html");
if (!existsSync(notFoundPath)) {
  const fallback = path.join(tempDir, "index.html");
  if (existsSync(fallback)) {
    await writeFile(notFoundPath, await readFile(fallback, "utf8"), "utf8");
  }
}

// Recreate dist from scratch so client/, server/, and build metadata cannot remain.
await safeRemove(distDir);
await mkdir(distDir, { recursive: true });
await copyContents(tempDir, distDir);
await safeRemove(tempDir);
await safeRemove(outputDir);

if (!existsSync(path.join(distDir, "index.html"))) {
  console.error("[hostinger] Static build failed: dist/index.html was not generated.");
  process.exit(1);
}

console.log(
  "[hostinger] Static dist ready: index.html and browser assets only. Upload the contents of dist/ into public_html/.",
);
