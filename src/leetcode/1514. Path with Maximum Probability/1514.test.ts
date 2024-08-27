import { maxProbability } from "./1514";

describe("MinStack", () => {
  it("should pass test case #1", () => {
    const res = maxProbability(
      3,
      [
        [0, 1],
        [1, 2],
        [0, 2],
      ],
      [0.5, 0.5, 0.2],
      0,
      2
    );
    expect(res).toBeCloseTo(0.25, 5);
  });
  it("should pass test case #2", () => {
    const res = maxProbability(
      3,
      [
        [0, 1],
        [1, 2],
        [0, 2],
      ],
      [0.5, 0.5, 0.3],
      0,
      2
    );
    expect(res).toBeCloseTo(0.3, 5);
  });
  it("should pass test case #3", () => {
    const res = maxProbability(3, [[0, 1]], [0.5], 0, 2);
    expect(res).toBeCloseTo(0, 5);
  });
});
