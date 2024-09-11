import fn from "./2035";

describe("LeetCode 2035", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [[3, 9, 7, 3]];
    const ans = 2;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [[-36, 36]];
    const ans = 72;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = [[2, -1, 0, 4, -2, -9]];
    const ans = 0;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
