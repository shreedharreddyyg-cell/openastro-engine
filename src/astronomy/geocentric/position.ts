import { VSOPPlanet } from "../vsop87/types";
import { PLANETS } from "../vsop87/planets";
import { calculatePlanet } from "../vsop87/position";

import {
    sphericalToCartesian,
    cartesianToSpherical,
    subtractVectors
} from "./transform";

export function calculateGeocentricPlanet(
    planet: VSOPPlanet,
    jd: number
) {

    const earth = calculatePlanet(
        PLANETS.EARTH,
        jd
    );

    const target = calculatePlanet(
        planet,
        jd
    );

    const earthXYZ = sphericalToCartesian(
        earth.longitude,
        earth.latitude,
        earth.radius
    );

    const targetXYZ = sphericalToCartesian(
        target.longitude,
        target.latitude,
        target.radius
    );

    const geoXYZ = subtractVectors(
        targetXYZ,
        earthXYZ
    );

    return cartesianToSpherical(
        geoXYZ
    );

}