import fn from "./1945";

describe("LeetCode 1945", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = ["iiii", 1];
    const ans = 36;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = ["leetcode", 2];
    const ans = 6;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = ["zbax", 2];
    const ans = 8;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
