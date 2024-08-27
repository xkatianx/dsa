import { maxIceCream } from "./1833";

describe("LeetCode 1833", () => {
  it("should pass test case #1", () => {
    const res = maxIceCream([1, 3, 2, 4, 1], 7);
    expect(res).toBe(4);
  });
  it("should pass test case #2", () => {
    const res = maxIceCream([10, 6, 8, 7, 7, 8], 5);
    expect(res).toBe(0);
  });
  it("should pass test case #3", () => {
    const res = maxIceCream([1, 6, 3, 1, 2, 5], 20);
    expect(res).toBe(6);
  });
});
