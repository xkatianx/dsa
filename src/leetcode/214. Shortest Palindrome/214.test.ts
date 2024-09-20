import fn from "./214";

describe("LeetCode 214", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = ["aacecaaa"];
    const ans = "aaacecaaa";
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = ["abcd"];
    const ans = "dcbabcd";
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
