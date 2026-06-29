/**
 * OpenAstro Engine
 * VSOP87 Types
 */

export interface VSOPTerm {
  A: number;
  B: number;
  C: number;
}

export type VSOPSeries = VSOPTerm[];

/**
 * One planet contains
 * Longitude (L)
 * Latitude (B)
 * Radius (R)
 *
 * Each has 6 polynomial orders:
 * 0..5
 */
export interface VSOPPlanet {
  L: VSOPSeries[];
  B: VSOPSeries[];
  R: VSOPSeries[];
}

/**
 * Final heliocentric position.
 */
export interface VSOPPosition {
  longitude: number;
  latitude: number;
  radius: number;
}