/**
 * Copy JSON result files from the local ingestion engine into the Next.js public data folder
 * for static serving at /data/<name>.json
 *
 * After analysis:
 *   cd C:\WavOps
 *   npm run sync:data
 *   git add .
 *   git commit -m "update dataset results"
 *   git push
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const destDir = path.join(projectRoot, "public", "data");
// Default: sibling folder "C:\WavOps Ingest\results" (override with WAVOPS_INGEST_RESULTS)
const sourceDir = process.env.WAVOPS_INGEST_RESULTS
  ? process.env.WAVOPS_INGEST_RESULTS
  : path.join(projectRoot, "..", "WavOps Ingest", "results");

function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`[sync:data] Source directory not found: ${sourceDir}`);
    process.exit(1);
  }
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const names = fs.readdirSync(sourceDir).filter((f) => f.toLowerCase().endsWith(".json"));
  if (names.length === 0) {
    console.log("[sync:data] No JSON files in", sourceDir);
    return;
  }
  for (const name of names) {
    const from = path.join(sourceDir, name);
    const to = path.join(destDir, name);
    fs.copyFileSync(from, to);
    console.log(`[sync:data] Copied ${name}`);
  }
  console.log(`[sync:data] Done (${names.length} file(s)).`);
}

main();
