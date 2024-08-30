import cls from "./307";

describe("LeetCode 307", () => {
  it("should pass test case #1", () => {
    const res = new cls([1, 3, 5]);
    expect(res.sumRange(0, 2)).toBe(9);
    res.update(1, 2);
    expect(res.sumRange(0, 2)).toBe(8);
  });
});
