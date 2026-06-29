import { J2000, JULIAN_CENTURY } from "../constants/astronomy";

/**
 * Mean Obliquity of the Ecliptic
 *
 * Returns degrees.
 *
 * Reference:
 * Jean Meeus - Astronomical Algorithms
 */
export function calculateMeanObliquity(
    jd: number
): number {

    const T =
        (jd - J2000) /
        JULIAN_CENTURY;

    return (
        23.43929111111111
        -
        0.0130041666667 * T
        -
        0.0000001639 * T * T
        +
        0.0000005036 * T * T * T
    );

}