// https://jestjs.io/docs/expect

describe("Simple Jest test", () => {
  test("1 + 1 = 2", () => {
    expect(1 + 1).toBe(2);
  });
  test("Built-in sort", () => {
    const arr = [7, 4, 5, 3, 8, 1, 6, 9, 2];
    arr.sort((a, b) => a - b);
    expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
