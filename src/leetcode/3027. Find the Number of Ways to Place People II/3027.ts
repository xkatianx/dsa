// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii

import solve from "../3025. Find the Number of Ways to Place People I/3025";

// Divide and Conquer, Merge Sort, Monotonic Stack, Disjoint Set
// O(n α(n) log n) time
// linear space
export default function numberOfPairs(points: number[][]): number {
  return solve(points);
}
