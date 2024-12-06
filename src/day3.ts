import { readInput } from "./utils/inputsReader";

const input = readInput("3").split('\n');

export function extractInstructions(input: string[]): string[] {
    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g; // Match "mul(X,Y)", "do()", and "don't()"
    const results: string[] = [];

    for (const str of input) {
        const matches = str.match(regex);
        if (matches) {
            results.push(...matches); // Add all matches from the current string
        }
    }

    return results;
}

export function computeInstructions(instructions: string[]): number {
    let total = 0;
    let isComputing = true; // Flag to track whether to compute mul() instructions

    for (const instruction of instructions) {
        if (instruction === "don't()") {
            isComputing = false; // Stop computing
        } else if (instruction === "do()") {
            isComputing = true; // Resume computing
        } else {
            const regex = /mul\((\d+),(\d+)\)/;
            const match = instruction.match(regex);

            if (match && isComputing) {
                const x = parseInt(match[1], 10); // Extract X
                const y = parseInt(match[2], 10); // Extract Y
                total += x * y; // Compute the product and add to the total
            }
        }
    }

    return total;
}




console.log(computeInstructions(extractInstructions(input)));