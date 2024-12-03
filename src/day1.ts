import { readInput } from "./utils/inputsReader";

const input = readInput("1").split('\n');

export function decodeInput(inputs: string[]): { left: number[]; right: number[] } {
    const result = {
        left: [] as number[],
        right: [] as number[],
    };

    for (const line of inputs) {
        const parts = line.split("   ");
        if (parts.length === 2) {
            // Convert to numbers and add to the respective lists
            const leftNumber = parseInt(parts[0].trim(), 10);
            const rightNumber = parseInt(parts[1].trim(), 10);

            if (!isNaN(leftNumber) && !isNaN(rightNumber)) {
                result.left.push(leftNumber);
                result.right.push(rightNumber);
            }
        }
    }

    return result;
}

export function popSmallestOne(numbers: number[]): number | null {
    if (numbers.length === 0) {
        return null; // Handle empty array case
    }

    let smallestIndex = 0;

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < numbers[smallestIndex]) {
            smallestIndex = i;
        }
    }

    // Remove the smallest element from the array and return it
    const [smallest] = numbers.splice(smallestIndex, 1);
    return smallest;
}

export function reduceSmallestOne(left: number[], right: number[]): number {
    let accumulator = 0;

    while (left.length > 0 || right.length > 0) {
        // Pop the smallest from each list, if available
        const smallestLeft = left.length > 0 ? popSmallestOne(left)! : 0;
        const smallestRight = right.length > 0 ? popSmallestOne(right)! : 0;

        // Add the smallest values to the accumulator
        accumulator += Math.abs(smallestLeft - smallestRight);
    }

    return accumulator;
}

export function reduceOccurences(left: number[], right: number[]): number {
    return left.reduce((acc, leftNumber) => {
        return acc + leftNumber * (right.filter(rightNumber => leftNumber === rightNumber).length);
    }, 0);
}



const {left, right} = decodeInput(input);

const result = reduceSmallestOne(left, right);

console.log("first part: ", result);

const {left: left2, right: right2} = decodeInput(input);

const result2 = reduceOccurences(left2, right2);

console.log("second part: ", result2);

