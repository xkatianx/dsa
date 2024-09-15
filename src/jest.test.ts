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

export function speedTest<T>(fn1: () => T, fn2: () => T) {
  const start1 = performance.now();
  const res1 = fn1();
  const end1 = performance.now();
  const time1 = end1 - start1;

  const start2 = performance.now();
  const res2 = fn2();
  const end2 = performance.now();
  const time2 = end2 - start2;

  console.log(
    `[FN1] Time taken: ${time1.toFixed(3)} ms\n` +
      `[FN2] Time taken: ${time2.toFixed(3)} ms`
  );
  return { res1, res2 };
}
