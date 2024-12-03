import { decodeInput, popSmallestOne, reduceOccurences, reduceSmallestOne } from '../day1'; // Adjust the path as necessary

describe("decodeInput", () => {
    it("should decode input correctly for valid input", () => {
        const input = ["63062   53509", "12345   67890"];
        const result = decodeInput(input);

        expect(result).toEqual({
            left: [63062, 12345],
            right: [53509, 67890],
        });
    });

    it("should handle empty input", () => {
        const input: string[] = [];
        const result = decodeInput(input);

        expect(result).toEqual({
            left: [],
            right: [],
        });
    });

    it("should ignore lines without proper structure or invalid numbers", () => {
        const input = ["63062   53509", "Invalid Line", "12345   abc"];
        const result = decodeInput(input);

        expect(result).toEqual({
            left: [63062],
            right: [53509],
        });
    });
});


describe("popSmallestOne", () => {
    it("should pop the smallest number from the list", () => {
        const numbers = [10, 3, 5, 7, 1, 9];
        const smallest = popSmallestOne(numbers);

        expect(smallest).toBe(1);
        expect(numbers).toEqual([10, 3, 5, 7, 9]);
    });

    it("should handle a list with one element", () => {
        const numbers = [42];
        const smallest = popSmallestOne(numbers);

        expect(smallest).toBe(42);
        expect(numbers).toEqual([]);
    });

    it("should handle a list with duplicate smallest numbers", () => {
        const numbers = [8, 2, 2, 6, 4];
        const smallest = popSmallestOne(numbers);

        expect(smallest).toBe(2);
        expect(numbers).toEqual([8, 2, 6, 4]); // Only the first occurrence is removed
    });

    it("should return null for an empty list", () => {
        const numbers: number[] = [];
        const smallest = popSmallestOne(numbers);

        expect(smallest).toBeNull();
        expect(numbers).toEqual([]);
    });
});

describe("reduceSmallestOne", () => {
    it("should compute the correct sum for two lists", () => {
        const left = [10, 30, 20];
        const right = [15, 25, 35];

        const result = reduceSmallestOne(left, right);
        expect(result).toBe(15); // abs(10-15) + abs(20-25) + abs(30-35)
    });

    it("should handle lists of unequal length", () => {
        const left = [10, 20];
        const right = [15, 25, 35];

        const result = reduceSmallestOne(left, right);
        expect(result).toBe(45); // (10-15) + (20-25) + (0-35)
    });

    it("should handle empty lists", () => {
        const left: number[] = [];
        const right: number[] = [15, 25, 35];

        const result = reduceSmallestOne(left, right);
        expect(result).toBe(75); // (0-15) + (0-25) + (0-35)
    });

    it("should return 0 for both lists empty", () => {
        const left: number[] = [];
        const right: number[] = [];

        const result = reduceSmallestOne(left, right);
        expect(result).toBe(0);
    });
});

describe("reduceOccurences", () => {
    it("should compute the correct sum of occurences for two lists", () => {
        const left = [2, 15, 20];
        const right = [15, 2, 2];

        const result = reduceOccurences(left, right);
        expect(result).toBe(19); // (2*2) + (15*1) + (20*0)
    });

    it("should handle lists of unequal length", () => {
        const left = [10, 20];
        const right = [15, 10, 35];

        const result = reduceOccurences(left, right);
        expect(result).toBe(10); // (10*1) + (20*0)
    });

    it("should handle empty lists", () => {
        const left: number[] = [];
        const right: number[] = [15, 25, 35];

        const result = reduceOccurences(left, right);
        expect(result).toBe(0);
    });

    it("should return 0 for both lists empty", () => {
        const left: number[] = [];
        const right: number[] = [];

        const result = reduceOccurences(left, right);
        expect(result).toBe(0);
    });
});