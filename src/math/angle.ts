export function normalizeAngle(angle: number): number {
    angle %= 360;

    if (angle < 0) {
        angle += 360;
    }

    return angle;
}

export function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function radiansToDegrees(radians: number): number {
    return radians * 180 / Math.PI;
}