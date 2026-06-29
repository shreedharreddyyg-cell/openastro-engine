/**
 * OpenAstro
 * VSOP87 Import Tool
 *
 * Version 1
 */

import fs from "fs";
import path from "path";

console.log("");

console.log("======================================");
console.log(" OpenAstro VSOP87 Import Tool");
console.log("======================================");
console.log("");

const INPUT_FOLDER =
    path.join(process.cwd(), "vsop87");

const OUTPUT_FOLDER =
    path.join(
        process.cwd(),
        "src",
        "astronomy",
        "vsop87"
    );

console.log("Input Folder :");
console.log(INPUT_FOLDER);

console.log("");

console.log("Output Folder :");
console.log(OUTPUT_FOLDER);

console.log("");

if (!fs.existsSync(INPUT_FOLDER)) {

    console.log("❌ VSOP87 folder not found.");

    process.exit(1);

}

if (!fs.existsSync(OUTPUT_FOLDER)) {

    fs.mkdirSync(
        OUTPUT_FOLDER,
        {
            recursive: true
        }
    );

}

console.log("✅ Folder check passed.");

console.log("");

console.log(
    "Importer foundation ready."
);