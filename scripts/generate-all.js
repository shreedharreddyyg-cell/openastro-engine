#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const planets = [
    "mer",
    "ven",
    "ear",
    "mar",
    "jup",
    "sat",
    "ura",
    "nep"
];

for (const planet of planets) {

    console.log("");
    console.log("====================================");
    console.log(`Generating ${planet.toUpperCase()}`);
    console.log("====================================");

    const result = spawnSync(
        "node",
        [
            "scripts/generate-vsop87.js",
            `VSOP87D.${planet}.txt`
        ],
        {
            stdio: "inherit"
        }
    );

    if (result.status !== 0) {

        console.error("Generation failed.");

        process.exit(result.status);

    }

}

console.log("");
console.log("✅ All planets generated.");