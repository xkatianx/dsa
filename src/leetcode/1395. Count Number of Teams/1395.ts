// https://leetcode.com/problems/count-number-of-teams

import { BIT } from "../../util/list/BIT";
import { RedBlackTree } from "../../util/tree/RedBlackTree";

// BST
// O(n log n) time
// linear space
export default function numTeams(rating: number[]): number {
  const left = RedBlackTree.new();
  const right = RedBlackTree.new();
  rating.forEach((v) => right.insert(v));

  let ans = 0;
  rating.forEach((v) => {
    right.delete(v);
    const { small: leftSmall, big: leftBig } = left.rank(v);
    const { small: rightSmall, big: rightBig } = right.rank(v);
    ans += leftSmall * rightBig + leftBig * rightSmall;
    left.insert(v);
  });
  return ans;
}

// BIT
// O(n log m) time
// O(n + m) space
function numTeams2(rating: number[]): number {
  const m = Math.max(...rating);
  const left = new BIT(m);
  const right = new BIT(m);
  rating.forEach((v) => right.update(v, 1));

  let ans = 0;
  rating.forEach((v) => {
    right.update(v, -1);
    const leftBig = left.queryRange(v + 1, m);
    const rightBig = right.queryRange(v + 1, m);
    const leftSmall = left.queryRange(0, v - 1);
    const rightSmall = right.queryRange(0, v - 1);
    ans += leftSmall * rightBig + leftBig * rightSmall;
    left.update(v, 1);
  });
  return ans;
}

// O(n^2) time
// linear space
function numTeams3(rating: number[]): number {
  const leftBigs = rating.map((_) => 0);
  const rightBigs = rating.map((_) => 0);
  rating.forEach((v, i) => {
    rating.forEach((u, j) => {
      if (u <= v) return;
      if (j < i) leftBigs[i]++;
      else rightBigs[i]++;
    });
  });

  let ans = 0;
  leftBigs.forEach((leftBig, i) => {
    const rightBig = rightBigs[i];
    const leftSmall = i - leftBig;
    const rightSmall = rating.length - 1 - i - rightBig;
    ans += leftSmall * rightBig + leftBig * rightSmall;
  });
  return ans;
}
