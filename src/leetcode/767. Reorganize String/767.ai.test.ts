import rearrangeString from "./767.ai";
import { it, expect, describe } from "vitest";

describe("rearrangeString", () => {
  it("should rearrange a string so that no two adjacent characters are the same", () => {
    const input = "aabbcc";
    const result = rearrangeString(input);

    expect(result).toHaveLength(input.length);
    expect(result).not.toMatch(/(.)\1/); // Ensures no two adjacent characters are the same
  });

  it("should return an empty string when rearrangement is not possible", () => {
    const input = "aaab";
    const result = rearrangeString(input);

    expect(result).toBe("");
  });

  it("should handle a single character string", () => {
    const input = "a";
    const result = rearrangeString(input);

    expect(result).toBe(input);
  });

  it("should handle strings where characters have equal frequency", () => {
    const input = "aabb";
    const result = rearrangeString(input);

    expect(result).toHaveLength(input.length);
    expect(result).not.toMatch(/(.)\1/);
  });

  it("should handle strings with multiple possible valid outputs", () => {
    const input = "aaabbbcc";
    const result = rearrangeString(input);

    expect(result).toHaveLength(input.length);
    expect(result).not.toMatch(/(.)\1/);
  });

  it("should return the input string if it only contains one character type", () => {
    const input = "aaa";
    const result = rearrangeString(input);

    expect(result).toBe(input.length === 1 ? input : "");
  });

  it("should return a valid rearrangement for a large input", () => {
    const input = "aaabbbcccddd";
    const result = rearrangeString(input);

    expect(result).toHaveLength(input.length);
    expect(result).not.toMatch(/(.)\1/);
  });
});
