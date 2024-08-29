import fn from "./1395";

describe("LeetCode 1395", () => {
  it("should pass test case #1", () => {
    const res = fn([2, 5, 3, 4, 1]);
    expect(res).toBe(3);
  });
  it("should pass test case #2", () => {
    const res = fn([2, 1, 3]);
    expect(res).toBe(0);
  });
  it("should pass test case #3", () => {
    const res = fn([1, 2, 3, 4]);
    expect(res).toBe(4);
  });
});
