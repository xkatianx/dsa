import fn from "./2022";

describe("LeetCode 2022", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [[1, 2, 3, 4], 2, 2];
    const ans = [
      [1, 2],
      [3, 4],
    ];
    const res = fn.apply(null, args);
    expect(res).toEqual(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [[1, 2, 3], 1, 3];
    const ans = [[1, 2, 3]];
    const res = fn.apply(null, args);
    expect(res).toEqual(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = [[1, 2], 1, 1];
    const res = fn.apply(null, args);
    expect(res).toEqual([]);
  });
});
