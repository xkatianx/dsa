// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i

import { SPACE, tags, TECHNIQUE, TIME } from "../../tag";
import { enumerate } from "../../util/misc";
import { MonotonicStack } from "../../util/list/monotonicStack";
import { mergeSort } from "../../util/order/mergeSort";

// prettier-ignore
tags(
  TECHNIQUE.divideAndConquer, TECHNIQUE.mergeSort, TECHNIQUE.monotonicStack,
  TIME.logarithmic,
  SPACE.linear
);

export default function numberOfPairs(points: number[][]): number {
  return solve1(betterInput(points as [number, number][]));
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

class Point {
  idx = Infinity;
  _linked: WeakRef<Point> | null = null;

  constructor(public x: number, public y: number) {}

  get linked() {
    return this._linked?.deref() ?? null;
  }

  set linked(value: Point | null) {
    this._linked = value ? new WeakRef(value) : null;
  }

  hasLink() {
    return this.linked != null;
  }

  link(point: Point) {
    if (this.hasLink()) return;
    point.linked?.unlink();
    this.linked = point;
    point.linked = this;
  }

  unlink() {
    this.linked = null;
    return this;
  }

  reset() {
    this.idx = Infinity;
    return this.unlink();
  }
}

// points must be sorted by y (descending)
// after return, points must be sorted by x (ascending)
function solve1(points: Point[]): number {
  if (points.length < 2) return 0;
  const mid = points.length >> 1;
  const top = points.slice(0, mid);
  const bottom = points.slice(mid);
  const ans = solve1(top) + solve1(bottom);

  const sorted = mergeSort(
    top[Symbol.iterator](),
    bottom[Symbol.iterator](),
    (a, b) => a.x - b.x
  );
  for (const [idx, point] of enumerate(sorted)) points[idx] = point.reset();

  return ans + solve2(top, bottom);
}

class DescendingStack extends MonotonicStack<Point> {
  onPop = (pushed: Point, popped: Point) => {
    popped.linked?.unlink();
  };

  constructor() {
    super((newVal, oldVal) => !oldVal.hasLink() || newVal.y > oldVal.y);
  }
}
class AscendingStack extends MonotonicStack<Point> {
  onPop = (pushed: Point, popped: Point) => {
    popped.linked?.unlink().link(pushed);
  };

  constructor() {
    super((newVal, oldVal) => newVal.y < oldVal.y);
  }

  push(point: Point) {
    super.push(point);
    point.idx = this.length - 1;
  }
}

function solve2(topPoints: Point[], bottomPoints: Point[]) {
  topPoints.push(new Point(Infinity, 0));
  topPoints.reverse();

  const [topStack, bottomStack] = [new AscendingStack(), new DescendingStack()];

  let ans = 0;
  for (const bottom of bottomPoints) {
    while (topPoints.at(-1)!.x < bottom.x) {
      topStack.push(topPoints.pop()!);
    }
    bottomStack.push(bottom);

    const leftTop = bottomStack.at(-2)?.linked;
    ans += Math.max(0, topStack.length - (leftTop?.idx ?? 0));

    topPoints.at(-1)!.link(bottom);
  }
  return ans;
}
