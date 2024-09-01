// https://leetcode.com/problems/maximum-ice-cream-bars

import { median, partition } from "../../util/order/bfprt";

// BFPRT
// 🚀 linear time,
// 🤏 constant space possible
export function maxIceCream(costs: number[], coins: number): number {
  if (costs.length === 0) return 0;

  const pivot = median(costs);
  const { small, same, big } = partition(costs, pivot);

  const sumLt = sum(small);
  const sumLte = sumLt + sum(same);

  if (coins < sumLt) return maxIceCream(small, coins);
  else if (coins < sumLte)
    return small.length + Math.floor((coins - sumLt) / pivot);
  else return small.length + same.length + maxIceCream(big, coins - sumLte);
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}
