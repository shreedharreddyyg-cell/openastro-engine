import { calculateJulianDay } from "./time/julianDay";
import { calculateSunPosition } from "./astronomy/sun";
import { calculateMeanObliquity } from "./astronomy/obliquity";
import { eclipticToEquatorial } from "./coordinates/equatorial";

import { PLANETS } from "./astronomy/vsop87";
import { calculatePlanet } from "./astronomy/vsop87/position";

import { radiansToDegrees } from "./math/angle";

console.log("");
console.log("========== OpenAstro ==========");
console.log("");

/**
 * Test Date
 * 26 October 1991
 * 02:55:00
 */
const jd = calculateJulianDay({
    year: 1991,
    month: 10,
    day: 26,
    hour: 2,
    minute: 55,
    second: 0
});

console.log("Julian Day");
console.log(jd);
console.log("");

/**
 * Sun (Current Implementation)
 */
const sun = calculateSunPosition(jd);

console.log("Sun");
console.log(sun);
console.log("");

/**
 * Mean Obliquity
 */
const obliquity = calculateMeanObliquity(jd);

console.log("Mean Obliquity");
console.log(obliquity);
console.log("");

/**
 * Equatorial Coordinates
 */
const equatorial = eclipticToEquatorial(
    sun.longitude,
    sun.latitude,
    obliquity
);

console.log("Equatorial Coordinates");
console.log(equatorial);
console.log("");

/**
 * VSOP87 Earth
 */
const earth = calculatePlanet(
    PLANETS.EARTH,
    jd
);

const mercury = calculatePlanet(
    PLANETS.MERCURY,
    jd
);

for (const [name, planet] of Object.entries(PLANETS)) {
    const position = calculatePlanet(planet, jd);

    console.log(name);

    console.log({
        longitudeDegrees: radiansToDegrees(position.longitude),
        latitudeDegrees: radiansToDegrees(position.latitude),
        radiusAU: position.radius
    });

    console.log("");
}