import fn from "./28";
import { it, expect, describe } from "vitest";

describe("LeetCode 28", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = ["sadbutsad", "sad"];
    const ans = 0;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = ["leetcode", "leeto"];
    const ans = -1;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
