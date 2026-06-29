import { calculateJulianDay } from "./time/julianDay";

import { calculateSunPosition } from "./astronomy/sun";

import { calculatePlanet } from "./astronomy/planet";

import { calculateMeanObliquity } from "./astronomy/obliquity";

import { EARTH } from "./data/earth";

import { eclipticToEquatorial } from "./coordinates/equatorial";

import { solveKepler } from "./math/kepler";

import { evaluateSeries } from "./astronomy/vsop87/evaluator";
import { L0 } from "./astronomy/vsop87/earth";

const jd = calculateJulianDay({

    year:1991,

    month:10,

    day:26,

    hour:2,

    minute:55,

    second:0

});

const sun = calculateSunPosition(jd);

const earth = calculatePlanet(

    EARTH,

    jd

);


const eccentricAnomaly =
    solveKepler(
        earth.meanAnomaly,
        EARTH.eccentricity
    );

const obliquity =
    calculateMeanObliquity(jd);


const equatorial =
eclipticToEquatorial(

    sun.longitude,

    sun.latitude,

    obliquity

);    

const t =

    (jd - 2451545.0) /

    365250.0;

const l0 =

    evaluateSeries(

        L0,

        t

    );

console.log("");

console.log("VSOP87 L0");

console.log(l0);

console.log("");

console.log("========== OpenAstro ==========");

console.log("");

console.log("Julian Day");

console.log(jd);

console.log("");

console.log("Sun");

console.log(sun);

console.log("");

console.log("Earth");

console.log(earth);

console.log("");

console.log("Mean Obliquity");

console.log(obliquity);

console.log("");

console.log("Equatorial Coordinates");

console.log(equatorial);

console.log("");

console.log("Kepler Solver");

console.log(eccentricAnomaly);