/**
 * One VSOP87 periodic term.
 *
 * A * cos(B + C * t)
 */
export interface VSOPTerm {

    A: number;

    B: number;

    C: number;

}

/**
 * One complete series (L0, L1, R2, etc.)
 */
export type VSOPSeries = VSOPTerm[];