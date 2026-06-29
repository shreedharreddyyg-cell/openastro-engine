/**
 * OpenAstro Engine
 * Kepler Equation Solver
 *
 * Solves:
 *
 * M = E - e sin(E)
 *
 * using Newton-Raphson iteration.
 */

import { degreesToRadians, radiansToDegrees } from "./angle";

export function solveKepler(
    meanAnomaly: number,
    eccentricity: number,
    tolerance = 1e-8
): number {

    // Convert Mean Anomaly to radians
    const M = degreesToRadians(meanAnomaly);

    // Initial Guess
    let E = M;

    while (true) {

        const delta =
            (E - eccentricity * Math.sin(E) - M)
            /
            (1 - eccentricity * Math.cos(E));

        E -= delta;

        if (Math.abs(delta) < tolerance) {
            break;
        }

    }

    return radiansToDegrees(E);

}