import { findKthLargest } from "./215";

describe("LeetCode 215", () => {
  it("should pass test case #1", () => {
    const res = findKthLargest([3, 2, 1, 5, 6, 4], 2);
    expect(res).toBe(5);
  });
  it("should pass test case #2", () => {
    const res = findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4);
    expect(res).toBe(4);
  });
});
