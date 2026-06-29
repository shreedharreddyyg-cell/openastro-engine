import { MERCURY } from "./mercury";
import { VENUS } from "./venus";
import { EARTH } from "./earth";
import { MARS } from "./mars";
import { JUPITER } from "./jupiter";
import { SATURN } from "./saturn";
import { URANUS } from "./uranus";
import { NEPTUNE } from "./neptune";

export const PLANETS = {
    MERCURY,
    VENUS,
    EARTH,
    MARS,
    JUPITER,
    SATURN,
    URANUS,
    NEPTUNE
} as const;

export type PlanetName = keyof typeof PLANETS;