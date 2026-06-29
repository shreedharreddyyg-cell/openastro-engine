import { VSOPSeries } from "./types";

/**
 * Evaluates one VSOP87 series.
 *
 * Σ A cos(B + C t)
 */
export function evaluateSeries(

    series: VSOPSeries,

    t: number

): number {

    let value = 0;

    for (const term of series) {

        value +=

            term.A *

            Math.cos(

                term.B +

                term.C * t

            );

    }

    return value;

}