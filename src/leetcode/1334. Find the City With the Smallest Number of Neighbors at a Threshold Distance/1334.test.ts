import { findTheCity } from "./1334";

describe("LeetCode 1334", () => {
  it("should pass test case #1", () => {
    const res = findTheCity(
      4,
      [
        [0, 1, 3],
        [1, 2, 1],
        [1, 3, 4],
        [2, 3, 1],
      ],
      4
    );
    expect(res).toBe(3);
  });
  it("should pass test case #2", () => {
    const res = findTheCity(
      5,
      [
        [0, 1, 2],
        [0, 4, 8],
        [1, 2, 3],
        [1, 4, 2],
        [2, 3, 1],
        [3, 4, 1],
      ],
      2
    );
    expect(res).toBe(0);
  });
});
