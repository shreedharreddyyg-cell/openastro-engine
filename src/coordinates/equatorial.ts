import {
    degreesToRadians,
    radiansToDegrees,
    normalizeAngle
} from "../math/angle";

import { EquatorialCoordinate } from "../types/equatorial";

/**
 * Converts Ecliptic Coordinates
 * to Equatorial Coordinates.
 */
export function eclipticToEquatorial(

    longitude: number,

    latitude: number,

    obliquity: number

): EquatorialCoordinate {

    const λ =
        degreesToRadians(longitude);

    const β =
        degreesToRadians(latitude);

    const ε =
        degreesToRadians(obliquity);

    const sinRA =
        Math.sin(λ) *
        Math.cos(ε)
        -
        Math.tan(β) *
        Math.sin(ε);

    const cosRA =
        Math.cos(λ);

    const rightAscension =
    normalizeAngle(

        radiansToDegrees(

            Math.atan2(

                sinRA,

                cosRA

            )

        )

    );

    const declination =
        radiansToDegrees(

            Math.asin(

                Math.sin(β) *
                Math.cos(ε)

                +

                Math.cos(β) *
                Math.sin(ε) *
                Math.sin(λ)

            )

        );

    return {

        rightAscension,

        declination

    };

}