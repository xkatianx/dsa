// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column

import { DisjointSet } from "../../util/tree/DisjointSet";

// DisjointSet, sort
// O(n log n) time, average O(n α(n)) time
// linear space
export default function removeStones(stones: number[][]): number {
  const dict: Record<string, DisjointSet> = {};

  stones.forEach(([r, c]) => {
    const keyR = `r${r}`;
    const keyC = `c${c}`;
    dict[keyR] ??= new DisjointSet();
    dict[keyC] ??= new DisjointSet();
    dict[keyR].union(dict[keyC]);
  });

  return stones.length - Object.values(dict).filter((n) => n.isRoot).length;
}
