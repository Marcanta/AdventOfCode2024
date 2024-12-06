import { computeInstructions, extractInstructions } from '../day3';

describe("extractInstructions", () => {
    it("should extract all valid instructions including mul, do, and don't", () => {
        const input = [
            "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))do()don't()"
        ];
        const expected = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)", "do()", "don't()"];
        expect(extractInstructions(input)).toEqual(expected);
    });

    it("should return an empty array when there are no valid instructions", () => {
        const input = ["no valid instructions here"];
        const expected: string[] = [];
        expect(extractInstructions(input)).toEqual(expected);
    });

    it("should handle multiple valid instructions in a single string", () => {
        const input = ["mul(1,2) and mul(3,4) with do() and don't()"];
        const expected = ["mul(1,2)", "mul(3,4)", "do()", "don't()"];
        expect(extractInstructions(input)).toEqual(expected);
    });

    it("should handle an empty input array", () => {
        const input: string[] = [];
        const expected: string[] = [];
        expect(extractInstructions(input)).toEqual(expected);
    });

    it("should handle input strings with mixed content", () => {
        const input = ["mul(2,2)x", "foo mul(5,5) bar do()", "hello don't() world"];
        const expected = ["mul(2,2)", "mul(5,5)", "do()", "don't()"];
        expect(extractInstructions(input)).toEqual(expected);
    });
});

describe("computeInstructions", () => {
    it("should compute the correct total while respecting do() and don't() instructions", () => {
        const input = [
            "mul(2,4)",
            "don't()",
            "mul(5,5)",
            "do()",
            "mul(11,8)",
            "mul(8,5)"
        ];
        const expected = 136; // 2*4 + 11*8 + 8*5; skips mul(5,5)
        expect(computeInstructions(input)).toBe(expected);
    });

    it("should return 0 when all mul instructions are skipped by don't()", () => {
        const input = ["don't()", "mul(2,4)", "mul(5,5)", "don't()", "mul(11,8)"];
        const expected = 0; // All mul() instructions are skipped
        expect(computeInstructions(input)).toBe(expected);
    });

    it("should compute correctly when do() resumes computation", () => {
        const input = [
            "don't()",
            "mul(2,4)",
            "do()",
            "mul(5,5)",
            "do()",
            "mul(11,8)"
        ];
        const expected = 113; // 5*5 + 11*8
        expect(computeInstructions(input)).toBe(expected);
    });

    it("should compute correctly for continuous computation without don't()", () => {
        const input = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"];
        const expected = 161; // 2*4 + 5*5 + 11*8 + 8*5
        expect(computeInstructions(input)).toBe(expected);
    });

    it("should return 0 for an empty list", () => {
        const input: string[] = [];
        const expected = 0;
        expect(computeInstructions(input)).toBe(expected);
    });
});
