import { J2000, JULIAN_CENTURY } from "../constants/astronomy";
import { degreesToRadians, normalizeAngle } from "../math/angle";
import { SunPosition } from "../types/sun";

export function calculateSunPosition(jd: number): SunPosition {

    const T = (jd - J2000) / JULIAN_CENTURY;

    //---------------------------------------
    // Mean Longitude
    //---------------------------------------

    let L0 =
        280.46646 +
        36000.76983 * T +
        0.0003032 * T * T;

    L0 = normalizeAngle(L0);

    //---------------------------------------
    // Mean Anomaly
    //---------------------------------------

    let M =
        357.52911 +
        35999.05029 * T -
        0.0001537 * T * T;

    M = normalizeAngle(M);

    const Mrad = degreesToRadians(M);

    //---------------------------------------
    // Equation of Center
    //---------------------------------------

    const C =
        (1.914602 -
            0.004817 * T -
            0.000014 * T * T)
            * Math.sin(Mrad)

        +

        (0.019993 -
            0.000101 * T)
            * Math.sin(2 * Mrad)

        +

        0.000289 *
        Math.sin(3 * Mrad);

    //---------------------------------------
    // True Longitude
    //---------------------------------------

    const trueLongitude =
        normalizeAngle(L0 + C);

    //---------------------------------------
    // Apparent Longitude
    //---------------------------------------

    const omega =
        125.04 -
        1934.136 * T;

    const apparentLongitude =
        normalizeAngle(
            trueLongitude -
            0.00569 -
            0.00478 *
            Math.sin(
                degreesToRadians(omega)
            )
        );

    //---------------------------------------
    // Radius Vector
    //---------------------------------------

    const eccentricity =
        0.016708634 -
        0.000042037 * T -
        0.0000001267 * T * T;

    const radiusVector =
        (1.000001018 *
            (1 - eccentricity * eccentricity))
        /
        (
            1 +
            eccentricity *
            Math.cos(
                degreesToRadians(
                    M + C
                )
            )
        );

    return {

        longitude: apparentLongitude,

        latitude: 0,

        radiusVector,

        meanLongitude: L0,

        meanAnomaly: M,

        equationOfCenter: C,

        trueLongitude,

        apparentLongitude

    };

}