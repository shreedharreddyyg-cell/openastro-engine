#!/usr/bin/env node

/**
 * OpenAstro VSOP87 Generator
 */

import fs from "node:fs";
import path from "node:path";

console.log("");
console.log("=======================================");
console.log(" OpenAstro VSOP87 Generator");
console.log("=======================================");
console.log("");

const ROOT = process.cwd();

const OUTPUT = path.join(
  ROOT,
  "src",
  "astronomy",
  "vsop87"
);

console.log("Project Root:");
console.log(ROOT);
console.log("");

console.log("Output Folder:");
console.log(OUTPUT);
console.log("");

if (!fs.existsSync(OUTPUT)) {
  console.error("❌ Output folder not found.");
  process.exit(1);
}

console.log("✅ Output folder exists.");
console.log("");
console.log("Generator initialized.");