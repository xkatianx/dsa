import { stoneGameII } from "./1140";

describe("LeetCode 1140", () => {
  it("should pass test case #1", () => {
    const res = stoneGameII([2, 7, 9, 4, 4]);
    expect(res).toBe(10);
  });
  it("should pass test case #2", () => {
    const res = stoneGameII([1, 2, 3, 4, 5, 100]);
    expect(res).toBe(104);
  });
});
