import fn from "./462";
import { it, expect, describe } from "vitest";

describe("LeetCode 462", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [[1, 2, 3]];
    const ans = 2;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [[1, 10, 2, 9]];
    const ans = 16;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
