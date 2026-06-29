import { normalizeAngle, degreesToRadians, radiansToDegrees } from "../math/angle";
import { solveKepler } from "../math/kepler";
import { OrbitalElements } from "../types/orbital-elements";

export interface PlanetPosition {

    meanLongitude: number;

    meanAnomaly: number;

    eccentricAnomaly: number;

    trueAnomaly: number;

    radiusVector: number;

}

/**
 * Generic Planet Solver
 *
 * Version 2
 */
export function calculatePlanet(

    elements: OrbitalElements,

    jd: number

): PlanetPosition {

    const T =
        (jd - 2451545.0) /
        36525;

    //------------------------------------
    // Mean Longitude
    //------------------------------------

    const meanLongitude = normalizeAngle(

        elements.meanLongitude +

        36000.76983 * T

    );

    //------------------------------------
    // Mean Anomaly
    //------------------------------------

    const meanAnomaly = normalizeAngle(

        meanLongitude -

        elements.argumentPerihelion

    );

    //------------------------------------
    // Eccentric Anomaly
    //------------------------------------

    const eccentricAnomaly =
        solveKepler(

            meanAnomaly,

            elements.eccentricity

        );

    //------------------------------------
    // True Anomaly
    //------------------------------------

    const E =
        degreesToRadians(
            eccentricAnomaly
        );

    const e =
        elements.eccentricity;

    const trueAnomaly =
        normalizeAngle(

            radiansToDegrees(

                2 *

                Math.atan2(

                    Math.sqrt(1 + e) *
                    Math.sin(E / 2),

                    Math.sqrt(1 - e) *
                    Math.cos(E / 2)

                )

            )

        );

    //------------------------------------
    // Radius Vector
    //------------------------------------

    const radiusVector =
        elements.semiMajorAxis *

        (

            1 -

            e *

            Math.cos(E)

        );

    return {

        meanLongitude,

        meanAnomaly,

        eccentricAnomaly,

        trueAnomaly,

        radiusVector

    };

}