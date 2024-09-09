// https://leetcode.com/problems/destroying-asteroids

import { sum } from "../../util/misc/index";

// 🚀 linear time
// linear space
export default function asteroidsDestroyed(
  mass: number,
  asteroids: number[]
): boolean {
  const n = asteroids.length;

  const bucket = asteroids.map(() => [] as number[]);
  for (const v of asteroids) {
    const power = Math.log2(v / mass);
    const i = power < 0 ? 0 : Math.ceil(power);
    if (i >= n) return false;
    bucket[i].push(v);
  }

  return bucket.every((arr) => {
    if (arr.length === 0) return true;
    if (mass < Math.min(...arr)) return false;
    mass += sum(arr);
    return true;
  });
}
