// https://leetcode.com/problems/maximum-total-subarray-value-ii/

import { SPACE, TECHNIQUE, TIME, tags } from "../../tag";
import { MonotonicStack } from "../../util/list/monotonicStack";
import { max, min } from "../../util/misc";

// prettier-ignore
tags(
  TECHNIQUE.monotonicStack, TECHNIQUE.binarySearch,
  TIME.linearithmic, // O(n log (max - min))
  SPACE.linear,
)

export default function maxTotalValue(nums: number[], k: number): number {
  let [l, r] = [1, max(nums) - min(nums) + 1];
  for (;;) {
    const mid = (l + r) >> 1;
    const { sum, count } = solve(nums, mid);
    if (r === l) return sum + (l - 1) * (k - count);
    if (count === k) return sum;
    if (count > k) l = mid + 1;
    else r = mid;
  }
}

type Node = {
  value: number;
  index: number;
  contribute: number;
};

class Mono extends MonotonicStack<Node> {
  private _sum = 0;
  private _head = 0;
  rightIndex = 0;

  constructor(initValue: number) {
    super((newVal, oldVal) =>
      oldVal.index < 0
        ? oldVal.value < newVal.value
        : oldVal.value <= newVal.value
    );
    super.push({ value: initValue, index: -1, contribute: 0 });
  }

  get sum() {
    return this._sum;
  }

  get count() {
    return this.rightIndex;
  }

  get head() {
    return this.at(this._head)!;
  }

  get headNext() {
    return this.at(this._head + 1);
  }

  update1(atLeast: number) {
    if (this.head.value < atLeast) return NaN;
    for (;;) {
      this.update2(this.head.index + 1);
      if (this.headNext != null && this.headNext.value >= atLeast) this._head++;
      else return this.rightIndex;
    }
  }

  update2(newRight: number) {
    if (isNaN(newRight)) return;
    if (newRight - 1 > this.head.index) this._head++;
    const d = newRight - this.rightIndex;
    const v = d * this.head.value;
    this.head.contribute += v;
    this._sum += v;
    this.rightIndex = newRight;
  }

  onPop = (pushing: Node, popped: Node) => {
    this._sum -= popped.contribute;
  };

  push(node: Node) {
    super.push(node);
    const leftIndex = (this.at(-2)?.index ?? -1) + 1;
    const d = Math.max(0, this.rightIndex - leftIndex);
    node.contribute = d * node.value;
    this._sum += node.contribute;
    this._head = Math.min(this.length - 1, this._head);
  }
}

function solve(nums: number[] | ReadonlyArray<number>, dist: number) {
  const [upper, lower] = [new Mono(nums[0]!), new Mono(-nums[0]!)];

  let [sum, count] = [0, 0];
  nums.forEach((value, index) => {
    upper.push({ value, index, contribute: 0 });
    lower.push({ value: -value, index, contribute: 0 });

    const last = nums[index - 1];
    if (last != null && last !== value) {
      const [a, b] = last < value ? [lower, upper] : [upper, lower];
      const r = a.update1(dist + a.top!.value);
      b.update2(r);
    }

    sum += upper.sum + lower.sum;
    count += upper.count;
  });
  return { sum, count };
}
