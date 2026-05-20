// Post-build script: prerender each route to static HTML using the built worker,
// then flatten dist/ so it contains a Hostinger-ready static site.
import { cp, rm, readdir, mkdir, writeFile, stat, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");
const buildsDir = path.join(distDir, ".builds");
const serverEntry = path.join(serverDir, "index.js");
const tempDir = path.join(root, ".hostinger-dist-temp");

// Edit this list to add more routes to prerender.
const routes = ["/", "/about", "/contact", "/products"];

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

if (!existsSync(clientDir) || !(await stat(clientDir)).isDirectory()) {
  console.log("Hostinger dist step skipped: dist/client was not created.");
  process.exit(0);
}

if (!existsSync(serverEntry)) {
  console.log("Hostinger dist step skipped: dist/server/index.js missing.");
  process.exit(0);
}

console.log("[hostinger] Prerendering routes via built worker...");
const workerMod = await import(pathToFileURL(serverEntry).href);
const worker = workerMod.default;
if (!worker || typeof worker.fetch !== "function") {
  console.error("[hostinger] Worker entry does not export fetch handler.");
  process.exit(1);
}

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
        ? path.join(clientDir, "index.html")
        : path.join(clientDir, route.replace(/^\//, ""), "index.html");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    console.log(`[hostinger] wrote ${path.relative(root, outPath)}`);
  } catch (err) {
    console.warn(`[hostinger] failed to prerender ${route}:`, err?.message ?? err);
  }
}

// Ensure 404.html exists (used by Hostinger and as SPA fallback)
const notFoundPath = path.join(clientDir, "404.html");
if (!existsSync(notFoundPath)) {
  const fallback = path.join(clientDir, "index.html");
  if (existsSync(fallback)) {
    await writeFile(notFoundPath, await readFile(fallback, "utf8"), "utf8");
  }
}

// Flatten dist: keep only the static client output at dist/ root.
await safeRemove(tempDir);
await mkdir(tempDir, { recursive: true });
await copyContents(clientDir, tempDir);

await safeRemove(serverDir);
await safeRemove(buildsDir);
await safeRemove(clientDir);
await copyContents(tempDir, distDir);
await safeRemove(tempDir);

console.log(
  "[hostinger] Build ready. Upload the contents of dist/ into public_html/.",
);
