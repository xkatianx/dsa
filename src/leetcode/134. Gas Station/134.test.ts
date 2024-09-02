import fn from "./134";

describe("LeetCode 134", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [
      [1, 2, 3, 4, 5],
      [3, 4, 5, 1, 2],
    ];
    const ans = 3;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [
      [2, 3, 4],
      [3, 4, 3],
    ];
    const ans = -1;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
