#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const inputFile = process.argv[2];

if (!inputFile) {

    console.error("Usage:");

    console.error("");

    console.error("node scripts/generate-vsop87.js VSOP87D.ear");

    process.exit(1);

}

const INPUT = path.join(ROOT, inputFile);

if (!fs.existsSync(INPUT)) {
    console.error("VSOP87D.ear.txt not found.");
    process.exit(1);
}

const text = fs.readFileSync(INPUT, "utf8");

const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length);


const header = lines[0];

const match = header.match(/VSOP87 VERSION D4\s+([A-Z]+)/);

if (!match) {

    console.error("Planet name not found.");

    process.exit(1);

}

const PLANET = match[1];

console.log("Planet:", PLANET);


const sections = {
    L: [[], [], [], [], [], []],
    B: [[], [], [], [], [], []],
    R: [[], [], [], [], [], []]
};

let currentVariable = -1;
let currentOrder = -1;

for (const line of lines) {

    // Detect section headers
    if (line.startsWith("VSOP87")) {

        const variableMatch = line.match(/VARIABLE\s+(\d+)/);
        const orderMatch = line.match(/\*T\*\*(\d+)/);

        if (variableMatch && orderMatch) {

            currentVariable = Number(variableMatch[1]);
            currentOrder = Number(orderMatch[1]);

            console.log(
                `Variable ${currentVariable} Order ${currentOrder}`
            );
        }

        continue;
    }

   // Ignore headers; every data line begins with a 4-digit record number
if (!line.startsWith("VSOP87")) {

        const numbers = line.match(/-?\d+\.\d+/g);

        if (!numbers || numbers.length < 3)
            continue;

        const term = {
            A: Number(numbers[numbers.length - 3]),
            B: Number(numbers[numbers.length - 2]),
            C: Number(numbers[numbers.length - 1])
        };

        if (currentVariable === 1)
            sections.L[currentOrder].push(term);

        if (currentVariable === 2)
            sections.B[currentOrder].push(term);

        if (currentVariable === 3)
            sections.R[currentOrder].push(term);
    }
}

console.log("");
console.log("========== COUNTS ==========");
console.log("");

console.log("L0", sections.L[0].length);
console.log("L1", sections.L[1].length);
console.log("L2", sections.L[2].length);
console.log("L3", sections.L[3].length);
console.log("L4", sections.L[4].length);
console.log("L5", sections.L[5].length);

console.log("");

console.log("B0", sections.B[0].length);
console.log("B1", sections.B[1].length);
console.log("B2", sections.B[2].length);
console.log("B3", sections.B[3].length);
console.log("B4", sections.B[4].length);
console.log("B5", sections.B[5].length);

console.log("");

console.log("R0", sections.R[0].length);
console.log("R1", sections.R[1].length);
console.log("R2", sections.R[2].length);
console.log("R3", sections.R[3].length);
console.log("R4", sections.R[4].length);
console.log("R5", sections.R[5].length);


function writeSeries(series) {

    return "[\n" +

        series.map(level => {

            return "    [\n" +

                level.map(term => {

                    return `      { A: ${term.A}, B: ${term.B}, C: ${term.C} }`;

                }).join(",\n")

                + "\n    ]";

        }).join(",\n")

        + "\n  ]";

}

function generatePlanet(name, sections) {

    return `/**
 * AUTO-GENERATED FILE
 * DO NOT EDIT.
 */

import { VSOPPlanet } from "./types";

export const ${name} : VSOPPlanet = {

  L: ${writeSeries(sections.L)},

  B: ${writeSeries(sections.B)},

  R: ${writeSeries(sections.R)}

};
`;

}

const outputFile = path.join(
    ROOT,
    "src",
    "astronomy",
    "vsop87",
    `${PLANET.toLowerCase()}.ts`
);

fs.writeFileSync(
    outputFile,
    generatePlanet(
    PLANET,
    sections
)
);

console.log("");
console.log("✅ Generated:");
console.log(outputFile);