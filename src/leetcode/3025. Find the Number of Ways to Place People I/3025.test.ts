import fn from "./3025";

describe("LeetCode 3025", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = [
      [
        [1, 1],
        [2, 2],
        [3, 3],
      ],
    ];
    const ans = 0;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = [
      [
        [6, 2],
        [4, 4],
        [2, 6],
      ],
    ];
    const ans = 2;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = [
      [
        [3, 1],
        [1, 3],
        [1, 1],
      ],
    ];
    const ans = 2;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #290", () => {
    const args: Parameters<typeof fn> = [
      [
        [1, 6],
        [0, 6],
      ],
    ];
    const ans = 1;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
