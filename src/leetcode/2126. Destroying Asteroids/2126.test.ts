import fn from "./2126";

describe("LeetCode 2126", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [10, [3, 9, 19, 5, 21]];
    const ans = true;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [5, [4, 9, 23, 4]];
    const ans = false;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
