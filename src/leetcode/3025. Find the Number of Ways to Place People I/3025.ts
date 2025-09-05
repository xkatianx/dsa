// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i

import { Stack } from "../../util/list/stack";
import { DisjointSet } from "../../util/tree/DisjointSet";

// Divide and Conquer, Merge Sort, Monotonic Stack, Disjoint Set
// O(n α(n) log n) time
// linear space
export default function numberOfPairs(points: number[][]): number {
  const arr = betterInput(points as [number, number][]);
  return solve1(arr);
}

function betterInput(points: [number, number][]): Point[] {
  const arr = points.map(([x, y]) => new Point(x, y));
  arr
    .sort((a, b) => a.x - b.x || b.y - a.y)
    .forEach((point, index) => {
      point.x = index;
    });
  arr
    .sort((a, b) => b.y - a.y || a.x - b.x)
    .forEach((point, index) => {
      point.y = -index;
    });
  return arr;
}

class Point extends DisjointSet {
  private _idx = 0;
  constructor(public x: number, public y: number) {
    super();
  }

  get idx() {
    return this.find()._idx;
  }

  set idx(value: number) {
    this.find()._idx = value;
  }

  find(): Point {
    return super.find() as Point;
  }

  union(other: Point) {
    const idx = Math.min(this.idx, other.idx);
    super.union(other);
    this.idx = idx;
  }
}

// points must be sorted by y (descending)
// after return, points must be sorted by x (ascending)
function solve1(points: Point[]): number {
  if (points.length < 2) return 0;
  const mid = points.length >> 1;
  const top = points.slice(0, mid);
  const bottom = points.slice(mid);
  const ans =
    solve1(top) + solve1(bottom) + solve2(top.slice(), bottom.slice());

  // mergeSort by TimSort
  [...top, ...bottom]
    .sort((a, b) => a.x - b.x)
    .forEach((point, index) => {
      points[index] = point;
    });

  return ans;
}

class MonoStack extends Stack<Point> {
  private consumeCondition: (newVal: number, oldVal: number) => boolean;

  constructor(ascending: boolean) {
    super();
    this.consumeCondition = ascending
      ? (newVal, oldVal) => newVal <= oldVal
      : (newVal, oldVal) => oldVal < newVal;
  }

  get lastIdx() {
    return this.top?.idx ?? -1;
  }

  push(point: Point) {
    point.reset();
    point.idx = this.lastIdx + 1;
    while (this.consumeCondition(point.y, this.top?.y ?? NaN)) {
      this.pop()!.union(point);
    }
    super.push(point);
  }

  count(leftPoint: Point | undefined) {
    let minus = leftPoint?.idx ?? -1;
    if (leftPoint != null && leftPoint !== this.at(leftPoint.idx)) minus -= 1;
    return this.lastIdx - minus;
  }
}

function solve2(topPoints: Point[], bottomPoints: Point[]) {
  topPoints.reverse();

  const topStack = new MonoStack(true);
  const bottomStack = new MonoStack(false);

  const bottomToTop = [];

  let ans = 0;
  for (const bottom of bottomPoints) {
    while ((topPoints.at(-1)?.x ?? NaN) <= bottom.x)
      topStack.push(topPoints.pop()!);
    bottomToTop[bottom.x] = topStack.top;
    bottomStack.push(bottom);
    const closestHigher = bottomStack.at(-2);
    const leftmostExclusiveTop = bottomToTop[closestHigher?.x ?? NaN];
    ans += topStack.count(leftmostExclusiveTop);
  }
  return ans;
}
