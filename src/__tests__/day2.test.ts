import { isThisSafe, isThisSafeAllowOneError } from '../day2';

describe("isThisSafe", () => {
    it("should return true for an increasing list within allowed differences", () => {
        expect(isThisSafe([22, 25, 28, 31])).toBe(true);
    });

    it("should return true for a decreasing list within allowed differences", () => {
        expect(isThisSafe([32, 29, 27, 24])).toBe(true);
    });

    it("should return false for a list that is not monotonic", () => {
        expect(isThisSafe([22, 25, 27, 28, 30, 31, 32, 29])).toBe(false);
    });

    it("should return false for a list with differences outside the allowed range", () => {
        expect(isThisSafe([22, 25, 27, 35])).toBe(false);
    });

    it("should return true for an empty list or a single element", () => {
        expect(isThisSafe([])).toBe(true);
        expect(isThisSafe([22])).toBe(true);
    });
});

describe("isThisSafeAllowOneError", () => {
    // it("should return true for a valid sequence by skipping one level", () => {
    //     expect(isThisSafeAllowOneError([1, 3, 2, 4, 5])).toBe(true);
    //     expect(isThisSafeAllowOneError([8, 6, 4, 4, 1])).toBe(true);
    // });

    it("should return false for a sequence with more than one violation", () => {
        expect(isThisSafeAllowOneError([1, 2, 7, 8, 9])).toBe(false);
        expect(isThisSafeAllowOneError([9, 7, 6, 2, 1])).toBe(false);
    });

    // it("should return true for a monotonic sequence within range without skipping", () => {
    //     expect(isThisSafeAllowOneError([7, 6, 4, 2, 1])).toBe(true);
    //     expect(isThisSafeAllowOneError([1, 3, 6, 7, 9])).toBe(true);
    // });

    // it("should return true for an empty list or a single element", () => {
    //     expect(isThisSafeAllowOneError([])).toBe(true);
    //     expect(isThisSafeAllowOneError([22])).toBe(true);
    // });
});