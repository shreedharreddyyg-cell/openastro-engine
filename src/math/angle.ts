/**
 * Normalize an angle in degrees to 0–360°.
 */
export function normalizeAngle(angle: number): number {
    angle %= 360;

    if (angle < 0) {
        angle += 360;
    }

    return angle;
}

/**
 * Normalize an angle in radians to 0–2π.
 */
export function normalizeRadians(radians: number): number {

    const twoPi = Math.PI * 2;

    radians %= twoPi;

    if (radians < 0) {
        radians += twoPi;
    }

    return radians;
}

/**
 * Degrees → Radians
 */
export function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

/**
 * Radians → Degrees
 */
export function radiansToDegrees(radians: number): number {
    return radians * 180 / Math.PI;
}