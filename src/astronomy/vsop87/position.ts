import { evaluateSeries } from "./evaluator";

import { normalizeRadians } from "../../math/angle";


import {
  VSOPPlanet,
  VSOPPosition,
  VSOPSeries
} from "./types";

/**
 * VSOP87 time
 */
function vsopTime(jd: number): number {
  return (jd - 2451545.0) / 365250.0;
}

/**
 * Evaluate one polynomial.
 *
 * Σ(series × tⁿ)
 */
function evaluatePolynomial(
  series: VSOPSeries[],
  t: number
): number {

  let value = 0;

  let power = 1;

  for (const terms of series) {

    value += evaluateSeries(terms, t) * power;

    power *= t;

  }

  return value;
}

/**
 * Generic VSOP87 planet.
 */
export function calculatePlanet(

  planet: VSOPPlanet,

  jd: number

): VSOPPosition {

  const t = vsopTime(jd);

  const longitude = normalizeRadians(
    evaluatePolynomial(
        planet.L,
        t
    )
);

const latitude = evaluatePolynomial(
    planet.B,
    t
);

const radius = evaluatePolynomial(
    planet.R,
    t
);

return {
    longitude,
    latitude,
    radius
};
}