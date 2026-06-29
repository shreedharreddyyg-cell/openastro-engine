import { VSOPSeries } from "./types";

/**
 * Earth L0
 *
 * Bootstrap dataset.
 * This lets us verify the evaluator.
 * We'll replace it with the complete published
 * VSOP87D coefficient tables in the next milestone.
 */

export const L0: VSOPSeries = [

    {
        A: 175347046.0,
        B: 0,
        C: 0
    },

    {
        A: 3341656.0,
        B: 4.6692568,
        C: 6283.07585
    },

    {
        A: 34894.0,
        B: 4.62610,
        C: 12566.15170
    }

];