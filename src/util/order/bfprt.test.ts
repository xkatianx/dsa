import { bfprt } from "./bfprt";

describe("BFPRT (Median of Medians) Algorithm", () => {
  test("Finds the k-th smallest element in an unsorted array", () => {
    const arr = [3, 1, 2, 2, 4, 3, 2];
    expect(bfprt(arr, 3)).toBe(2); // The 4th smallest element is 2
  });

  test("Works correctly with all unique elements", () => {
    const arr = [10, 4, 5, 8, 6, 11, 26];
    expect(bfprt(arr, 2)).toBe(6); // The 3rd smallest element is 6
  });

  test("Handles arrays with duplicate elements", () => {
    const arr = [7, 7, 3, 3, 3, 1, 9, 9];
    expect(bfprt(arr, 5)).toBe(7); // The 6th smallest element is 7
  });

  test("Handles arrays with all elements the same", () => {
    const arr = [5, 5, 5, 5, 5, 5, 5];
    expect(bfprt(arr, 3)).toBe(5); // Any k-th smallest element should be 5
  });

  test("Works with small arrays", () => {
    const arr = [42];
    expect(bfprt(arr, 0)).toBe(42); // The only element is the 1st smallest
  });

  test("Works with large arrays", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i + 1).reverse();
    expect(bfprt(arr, 999)).toBe(1000); // The 1000th smallest element is 1000
  });

  test("Works with negative numbers", () => {
    const arr = [-10, -1, -5, -3, 0, 2, -7];
    expect(bfprt(arr, 4)).toBe(-1); // The 5th smallest element is -1
  });

  test("Finds the k-th smallest element when k is 0 (smallest element)", () => {
    const arr = [50, 20, 10, 40, 30];
    expect(bfprt(arr, 0)).toBe(10); // The smallest element is 10
  });

  test("Finds the k-th smallest element when k is n-1 (largest element)", () => {
    const arr = [50, 20, 10, 40, 30];
    expect(bfprt(arr, 4)).toBe(50); // The largest element is 50
  });
});
