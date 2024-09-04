import fn from "./874";

describe("LeetCode 874", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [[4, -1, 3], []];
    const ans = 25;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [[4, -1, 4, -2, 4], [[2, 4]]];
    const ans = 65;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = [[6, -1, -1, 6], []];
    const ans = 36;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
