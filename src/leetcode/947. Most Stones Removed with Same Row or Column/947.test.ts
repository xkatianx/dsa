import fn from "./947";

describe("LeetCode 947", () => {
  it("should pass test case #1", () => {
    const res = fn([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 2],
    ]);
    expect(res).toBe(5);
  });
  it("should pass test case #2", () => {
    const res = fn([
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ]);
    expect(res).toBe(3);
  });
  it("should pass test case #3", () => {
    const res = fn([[0, 0]]);
    expect(res).toBe(0);
  });
});

describe("LeetCode 947 more tests", () => {
  it("should pass test case #23", () => {
    const res = fn([
      [1, 2],
      [3, 2],
      [3, 0],
      [4, 4],
      [4, 2],
      [2, 4],
      [4, 0],
    ]);
    expect(res).toBe(6);
  });
});
