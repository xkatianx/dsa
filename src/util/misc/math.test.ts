import { sum, clampL, clampR } from "./math";
import { describe, it, expect } from "vitest";

describe("Math utilities", () => {
  describe("sum", () => {
    it("should return 0 for undefined input", () => {
      expect(sum()).toBe(0);
      expect(sum(undefined)).toBe(0);
    });

    it("should return 0 for empty array", () => {
      expect(sum([])).toBe(0);
    });

    it("should return the number for single element array", () => {
      expect(sum([5])).toBe(5);
      expect(sum([-3])).toBe(-3);
      expect(sum([0])).toBe(0);
    });

    it("should sum multiple positive numbers", () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([10, 20, 30])).toBe(60);
    });

    it("should sum multiple negative numbers", () => {
      expect(sum([-1, -2, -3])).toBe(-6);
      expect(sum([-10, -20, -30])).toBe(-60);
    });

    it("should sum mixed positive and negative numbers", () => {
      expect(sum([1, -2, 3, -4, 5])).toBe(3);
      expect(sum([-10, 20, -30, 40])).toBe(20);
    });

    it("should handle decimal numbers", () => {
      expect(sum([1.5, 2.5, 3.5])).toBe(7.5);
      expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
    });

    it("should handle zero values", () => {
      expect(sum([0, 0, 0])).toBe(0);
      expect(sum([1, 0, -1])).toBe(0);
    });
  });

  describe("clampL", () => {
    it("should clamp value within normal range", () => {
      expect(clampL(5, 0, 10)).toBe(5);
      expect(clampL(0, 0, 10)).toBe(0);
      expect(clampL(10, 0, 10)).toBe(10);
    });

    it("should clamp value below minimum", () => {
      expect(clampL(-5, 0, 10)).toBe(0);
      expect(clampL(2, 5, 10)).toBe(5);
    });

    it("should clamp value above maximum", () => {
      expect(clampL(15, 0, 10)).toBe(10);
      expect(clampL(8, 0, 5)).toBe(5);
    });

    it("should return min when min > max (inverted range)", () => {
      expect(clampL(5, 10, 0)).toBe(10);
      expect(clampL(15, 10, 0)).toBe(10);
      expect(clampL(-5, 10, 0)).toBe(10);
    });

    it("should handle decimal values", () => {
      expect(clampL(2.5, 1.0, 3.0)).toBe(2.5);
      expect(clampL(0.5, 1.0, 3.0)).toBe(1.0);
      expect(clampL(3.5, 1.0, 3.0)).toBe(3.0);
    });

    it("should handle negative ranges", () => {
      expect(clampL(-5, -10, -1)).toBe(-5);
      expect(clampL(-15, -10, -1)).toBe(-10);
      expect(clampL(0, -10, -1)).toBe(-1);
    });
  });

  describe("clampR", () => {
    it("should clamp value within normal range", () => {
      expect(clampR(5, 0, 10)).toBe(5);
      expect(clampR(0, 0, 10)).toBe(0);
      expect(clampR(10, 0, 10)).toBe(10);
    });

    it("should clamp value below minimum", () => {
      expect(clampR(-5, 0, 10)).toBe(0);
      expect(clampR(2, 5, 10)).toBe(5);
    });

    it("should clamp value above maximum", () => {
      expect(clampR(15, 0, 10)).toBe(10);
      expect(clampR(8, 0, 5)).toBe(5);
    });

    it("should return max when min > max (inverted range)", () => {
      expect(clampR(5, 10, 0)).toBe(0);
      expect(clampR(15, 10, 0)).toBe(0);
      expect(clampR(-5, 10, 0)).toBe(0);
    });

    it("should handle decimal values", () => {
      expect(clampR(2.5, 1.0, 3.0)).toBe(2.5);
      expect(clampR(0.5, 1.0, 3.0)).toBe(1.0);
      expect(clampR(3.5, 1.0, 3.0)).toBe(3.0);
    });

    it("should handle negative ranges", () => {
      expect(clampR(-5, -10, -1)).toBe(-5);
      expect(clampR(-15, -10, -1)).toBe(-10);
      expect(clampR(0, -10, -1)).toBe(-1);
    });
  });

  describe("clampL vs clampR comparison", () => {
    it("should behave identically for normal ranges", () => {
      const testCases = [
        { val: 5, min: 0, max: 10 },
        { val: -5, min: 0, max: 10 },
        { val: 15, min: 0, max: 10 },
        { val: 2.5, min: 1.0, max: 3.0 },
      ];

      testCases.forEach(({ val, min, max }) => {
        expect(clampL(val, min, max)).toBe(clampR(val, min, max));
      });
    });

    it("should differ only for inverted ranges", () => {
      expect(clampL(5, 10, 0)).toBe(10); // clampL returns min
      expect(clampR(5, 10, 0)).toBe(0); // clampR returns max

      expect(clampL(15, 10, 0)).toBe(10); // clampL returns min
      expect(clampR(15, 10, 0)).toBe(0); // clampR returns max

      expect(clampL(-5, 10, 0)).toBe(10); // clampL returns min
      expect(clampR(-5, 10, 0)).toBe(0); // clampR returns max
    });
  });
});
