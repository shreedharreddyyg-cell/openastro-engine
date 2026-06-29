import { evaluateSeries } from "./evaluator";


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

  return value / 100000000.0;
}

/**
 * Generic VSOP87 planet.
 */
export function calculatePlanet(

  planet: VSOPPlanet,

  jd: number

): VSOPPosition {

  const t = vsopTime(jd);

  return {

    longitude: evaluatePolynomial(
      planet.L,
      t
    ),

    latitude: evaluatePolynomial(
      planet.B,
      t
    ),

    radius: evaluatePolynomial(
      planet.R,
      t
    )

  };

}