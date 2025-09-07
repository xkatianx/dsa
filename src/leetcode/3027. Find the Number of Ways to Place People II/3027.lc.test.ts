import { randomInt } from "crypto";
import fn from "./3027";
import lc from "./3027.lc";
import { it, expect, describe } from "vitest";
import { speedTest } from "../../jest.test";

function randomPoints(n: number): number[][] {
  const set = new Set<string>();
  const points: number[][] = [];
  while (set.size < n) {
    const x = randomInt(-1e9, 1e9);
    const y = randomInt(-1e9, 1e9);
    if (set.has(`${x},${y}`)) continue;
    set.add(`${x},${y}`);
    points.push([x, y]);
  }
  return points;
}

describe("LeetCode 3027 - random", () => {
  it("random test case (n = 1000)", () => {
    for (let i = 0; i < 10; i++) {
      const points = randomPoints(1000);
      const points2 = structuredClone(points);
      expect(fn(points)).toBe(lc(points2));
    }
  });
  it("random test case (n = 2000)", () => {
    for (let i = 0; i < 10; i++) {
      const points = randomPoints(2000);
      const points2 = structuredClone(points);
      expect(fn(points)).toBe(lc(points2));
    }
  });
});

// describe("LeetCode 3027 - speed test", () => {
//   it("speed test", () => {
//     for (const n of [1, 5, 10, 100, 1000, 2000, 5000, 8000]) {
//       const points = randomPoints(n);
//       const points2 = structuredClone(points);
//       console.log(`FN1: me, FN2: lc. (n = ${n})`);
//       const { res1, res2 } = speedTest(
//         () => fn(points),
//         () => lc(points2)
//       );
//       expect(res1).toBe(res2);
//     }
//   });
// });
