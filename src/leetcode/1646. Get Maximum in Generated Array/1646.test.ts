import fn from "./1646";

describe("LeetCode 1646", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [7];
    const ans = 3;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [2];
    const ans = 1;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = [3];
    const ans = 2;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
