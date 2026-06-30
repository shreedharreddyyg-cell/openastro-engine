import { Vector3 } from "./vector";

import { normalizeAngle } from "../../math/angle";
import { radiansToDegrees } from "../../math/angle";
import { degreesToRadians } from "../../math/angle";
import { normalizeRadians } from "../../math/angle";
import { SphericalCoordinates } from "../../coordinates/spherical";

export function sphericalToCartesian(
    longitude: number,
    latitude: number,
    radius: number
): Vector3 {

    const cosLat = Math.cos(latitude);

    return {

        x: radius * cosLat * Math.cos(longitude),

        y: radius * cosLat * Math.sin(longitude),

        z: radius * Math.sin(latitude)

    };

}

export function cartesianToSpherical(
    vector: Vector3
): SphericalCoordinates {

    const radius = Math.sqrt(

        vector.x * vector.x +
        vector.y * vector.y +
        vector.z * vector.z

    );

    let longitude = Math.atan2(
    vector.y,
    vector.x
);

longitude = normalizeRadians(longitude);

    const latitude = Math.asin(

        vector.z / radius

    );

    return {

        longitude,
        latitude,
        radius

    };

}

export function subtractVectors(
    a: Vector3,
    b: Vector3
): Vector3 {

    return {

        x: a.x - b.x,

        y: a.y - b.y,

        z: a.z - b.z

    };

}