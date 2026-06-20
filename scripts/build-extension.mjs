import { cp, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "extension");
const outputRoot = path.join(projectRoot, "dist");
const outputDir = path.join(outputRoot, "extension");
const zipPath = path.join(outputRoot, "screentime-recorder-extension.zip");
const publicZipPath = path.join(projectRoot, "client", "public", "extension.zip");

await mkdir(outputRoot, { recursive: true });
await rm(outputDir, { recursive: true, force: true });
await rm(zipPath, { force: true });
await cp(sourceDir, outputDir, { recursive: true });

const zip = spawnSync("zip", ["-qr", zipPath, "extension"], {
  cwd: outputRoot,
  encoding: "utf8"
});

if (zip.status !== 0) {
  process.stderr.write(zip.stderr || "Failed to create extension ZIP.\n");
  process.exit(zip.status || 1);
}

await cp(zipPath, publicZipPath);
console.log(`Extension built at ${zipPath}`);
