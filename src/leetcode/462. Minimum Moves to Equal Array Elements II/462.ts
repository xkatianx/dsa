// https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii

import { SPACE, TECHNIQUE, TIME, tags } from "../../tag";
import { sum } from "../../util/misc";
import { median } from "../../util/order/bfprt";

// prettier-ignore
tags(
  TECHNIQUE.bfprt,
  TIME.optimal, TIME.linear,
  SPACE.optimal, SPACE.linear,
  SPACE.linear // possible
)

export default function minMoves2(nums: number[]): number {
  const m = median(nums);
  return sum(nums.map((v) => Math.abs(v - m)));
}
