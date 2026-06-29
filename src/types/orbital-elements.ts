/**
 * Orbital Elements
 *
 * Units:
 * Angles -> Degrees
 * Distance -> Astronomical Units (AU)
 */

export interface OrbitalElements {

    name: string;

    semiMajorAxis: number;

    eccentricity: number;

    inclination: number;

    longitudeAscendingNode: number;

    argumentPerihelion: number;

    meanLongitude: number;

}