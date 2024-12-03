import { readInput } from "./utils/inputsReader";

const input = readInput("2").split('\n');

const formattedInput = input.map(line => line.split(" ").map(nb => +nb));

export function isThisSafe(levels: number[]): boolean {
    if (levels.length < 2) return true; // A single element or empty array is trivially safe.

    // Determine the trend (increasing or decreasing)
    const isIncreasing = levels[1] > levels[0];
    const isDecreasing = levels[1] < levels[0];

    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];

        // Check if the difference is within the allowed range [1, 3]
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        // Check if the trend is consistent
        if ((isIncreasing && diff < 0) || (isDecreasing && diff > 0)) {
            return false;
        }
    }

    return true;
}

export function isThisSafeAllowOneError(levels: number[]): boolean {
    if (levels.length < 2) return true; // A single element or empty array is trivially safe.

    function isValidSequence(sequence: number[]): boolean {
        if (sequence.length < 2) return true;

        const isIncreasing = sequence[1] > sequence[0];
        const isDecreasing = sequence[1] < sequence[0];

        for (let i = 1; i < sequence.length; i++) {
            const diff = sequence[i] - sequence[i - 1];

            // Check difference range
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                return false;
            }

            // Check monotonicity
            if ((isIncreasing && diff < 0) || (isDecreasing && diff > 0)) {
                return false;
            }
        }

        return true;
    }

    // Check if the sequence is valid without removing any number
    if (isValidSequence(levels)) {
        return true;
    }

    // Try removing each number and check if the sequence becomes valid
    for (let i = 0; i < levels.length; i++) {
        const modifiedSequence = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isValidSequence(modifiedSequence)) {
            return true;
        }
    }

    return false; // No valid sequence found after removing one number
}

const result = formattedInput.reduce((acc, levels) => acc + (isThisSafe(levels) ? 1 : 0), 0);

console.log("first part: ", result);

const result2 = formattedInput.reduce((acc, levels) => acc + (isThisSafeAllowOneError(levels) ? 1 : 0), 0);

console.log("second part: ", result2);
