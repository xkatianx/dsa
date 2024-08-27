// https://leetcode.com/problems/stone-game-ii

import { MinDeque } from "../../util/list/minDeque";

// O(n^2) time, O(n^2) space
export function stoneGameII(piles: number[]): number {
  const suffixSum: number[] = [];
  piles.reduceRight((s, v, i) => {
    suffixSum[i] = s + v;
    return s + v;
  }, 0);

  const diagonal = Array.from(
    { length: piles.length * 2 },
    (_) => new MinDeque<number>((a, b) => a - b)
  );
  const horizontal = Array.from(
    { length: piles.length + 1 },
    (_) => new MinDeque<number>((a, b) => a - b)
  );

  function dp(i: number, m: number) {
    const kr = piles.length + i;
    const kl = kr - m;

    while (horizontal[m].length > m) horizontal[m].pop();
    while (diagonal[kr].length > m + 1) diagonal[kr].pop();

    const value =
      suffixSum[i] -
      Math.min(
        horizontal[m].min ?? Infinity,
        diagonal[kr].min ?? Infinity,
        suffixSum[i + 2 * m] ?? 0
      );
    horizontal[m].unshift(value);
    diagonal[kl].unshift(value);
    return value;
  }

  let ans = 0;
  for (let m = piles.length; m >= 1; m--) {
    for (let i = piles.length - 1; i >= 0; i--) {
      ans = dp(i, m);
    }
  }
  return ans;
}
