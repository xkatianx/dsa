// https://www.codewars.com/kata/67170de6312f3d3c582918ed

import { SPACE, TECHNIQUE, TIME, tags } from "../../tag";
import { SegmentTree } from "../../util/tree/SegmentTree";

// prettier-ignore
tags(
  TECHNIQUE.segmentTree, TECHNIQUE.dynamicProgramming,
  TIME.linearithmic,
  SPACE.linear
);

export default function minEarnings(arr: number[]): number {
  if ((arr.length & 1) === 0) arr.push(0);
  const n = arr.length;
  for (let i = 2; i < n; i += 2) {
    if (arr[i - 1] > arr[i]) [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
  }

  let ans = 0;
  const flat = new Helper(arr);
  const slope = new Helper(arr);

  flat.add(0, 0);
  slope.add(0, arr[0]!);

  for (let i = 2; i < n; i += 2) {
    ans += arr[i]!;

    const f = flat.minLeq(i);
    const s = slope.minGeq(i) - arr[i]!;
    const v = Math.min(f, s);
    const f2 = flat.minLeq(i - 1) + arr[i - 1]! - arr[i]!;
    const s2 = slope.minGeq(i - 1) - arr[i]!;
    const v2 = Math.min(f2, s2);

    flat.add(i, v2);
    slope.add(i, v2 + arr[i]!);
    flat.add(i - 1, v);
    slope.add(i - 1, v + arr[i - 1]!);
  }
  return ans + slope.getMin();
}

class Helper {
  private tree: SegmentTree;
  private n: number;
  private idxRank: number[];

  constructor(arr: number[]) {
    this.n = arr.length;
    const rankIdx = arr.map((_, i) => i).sort((a, b) => arr[a] - arr[b]);
    this.idxRank = arr.map((_, i) => i).sort((a, b) => rankIdx[a] - rankIdx[b]);
    this.tree = new SegmentTree(arr.length, "min");
  }
  add(i: number, s: number): void {
    this.tree.update(this.idxRank[i]!, s);
  }
  minGeq(i: number): number {
    return this.tree.queryRange(this.idxRank[i]!, this.n);
  }
  minLeq(i: number): number {
    return this.tree.queryRange(0, this.idxRank[i]! + 1);
  }
  getMin(): number {
    return this.tree.queryRange(0, this.n);
  }
}
