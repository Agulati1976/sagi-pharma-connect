import { cp, rm, readdir, rename, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");
const buildsDir = path.join(distDir, ".builds");
const tempDir = path.join(root, ".hostinger-dist-temp");

async function safeRemove(target) {
  await rm(target, { recursive: true, force: true });
}

async function copyContents(from, to) {
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const source = path.join(from, entry.name);
      const destination = path.join(to, entry.name);
      await cp(source, destination, { recursive: true, force: true });
    }),
  );
}

if (!existsSync(clientDir) || !(await stat(clientDir)).isDirectory()) {
  console.log("Hostinger dist step skipped: dist/client was not created.");
  process.exit(0);
}

await safeRemove(tempDir);
await mkdir(tempDir, { recursive: true });
await copyContents(clientDir, tempDir);

await safeRemove(serverDir);
await safeRemove(buildsDir);
await safeRemove(clientDir);
await copyContents(tempDir, distDir);
await safeRemove(tempDir);

console.log("Hostinger-ready build created: upload the contents of dist/ to public_html/.");