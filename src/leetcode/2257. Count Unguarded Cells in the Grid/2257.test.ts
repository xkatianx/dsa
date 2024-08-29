import { randomInt } from "crypto";
import fn from "./2257";

describe("LeetCode 2257", () => {
  it("should pass test case #1", () => {
    const res = fn(
      4,
      6,
      [
        [0, 0],
        [1, 1],
        [2, 3],
      ],
      [
        [0, 1],
        [2, 2],
        [1, 4],
      ]
    );
    expect(res).toBe(7);
  });
  it("should pass test case #2", () => {
    const res = fn(
      3,
      3,
      [[1, 1]],
      [
        [0, 1],
        [1, 0],
        [2, 1],
        [1, 2],
      ]
    );
    expect(res).toBe(4);
  });
});

// describe("LeetCode 2257 - random test case", () => {
//   const m = randomInt(100000);
//   const n = randomInt(100000);
//   const guards = new Set<string>();
//   const walls = new Set<string>();
//   const guardAmount = randomInt(Math.min(m * n, 50000));
//   const wallAmount = randomInt(Math.min(m * n - guardAmount, 50000));
//   for (let fail = 0; fail < 20000; fail++) {
//     const k = `${randomInt(m)},${randomInt(n)}`;
//     if (guards.has(k)) continue;
//     guards.add(k);
//     if (guards.size >= guardAmount) break;
//     fail--;
//   }
//   for (let fail = 0; fail < 50000; fail++) {
//     const k = `${randomInt(m)},${randomInt(n)}`;
//     if (guards.has(k) || walls.has(k)) continue;
//     walls.add(k);
//     if (walls.size >= wallAmount) break;
//     fail--;
//   }
//   const guardArr = Array.from(guards).map((v) => v.split(",").map(Number));
//   const wallArr = Array.from(walls).map((v) => v.split(",").map(Number));

//   it(`should pass random test case: ${m}×${n}, guards=${guards.size}, walls=${walls.size}`, () => {
//     const res = fn(m, n, guardArr, wallArr);
//     expect(res).toBe(ans);
//   });
// });
