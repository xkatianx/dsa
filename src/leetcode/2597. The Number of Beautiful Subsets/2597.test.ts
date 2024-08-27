import { beautifulSubsets } from "./2597";

describe("LeetCode 2597", () => {
  it("should pass test case #1", () => {
    const res = beautifulSubsets([2, 4, 6], 2);
    expect(res).toBe(4);
  });
  it("should pass test case #2", () => {
    const res = beautifulSubsets([1], 1);
    expect(res).toBe(1);
  });
});
