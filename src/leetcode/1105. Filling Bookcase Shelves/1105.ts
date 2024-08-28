// https://leetcode.com/problems/filling-bookcase-shelves

import { MinDeque } from "../../util/list/minDeque";

// 1D DP
// 🚀 linear time,
// linear space
export default function minHeightShelves(
  books: number[][],
  shelfWidth: number
): number {
  const dp = [0];

  // sliding window
  let wLeft = 0;
  let wSum = 0;

  interface Data {
    height: number;
    index: number;
    value: number;
  }
  const queue = new MinDeque<Data>((a, b) => a.value - b.value);

  books.forEach(([width, height], index) => {
    for (wSum += width; wSum > shelfWidth; wLeft++) {
      wSum -= books[wLeft][0];
    }
    while ((queue.last?.height ?? Infinity) <= height) {
      queue.pop();
    }
    const prevIndex = queue.last?.index ?? wLeft - 1;
    queue.push({ height, index, value: height + dp[prevIndex + 1] });
    while (queue.first!.index < wLeft) {
      queue.shift();
    }
    const first = queue.shift()!;
    first.value = dp[wLeft] + first.height;
    queue.unshift(first);
    dp[index + 1] = queue.min!.value;
  });
  return dp.at(-1)!;
}
