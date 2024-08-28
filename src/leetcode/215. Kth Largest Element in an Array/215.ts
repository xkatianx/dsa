// https://leetcode.com/problems/kth-largest-element-in-an-array/

import { bfprt } from "../../util/misc/bfprt";

// BFPRT
// 🚀 linear time
// 🤏 linear space, constant space possible
export function findKthLargest(nums: number[], k: number): number {
  return bfprt(nums, nums.length - k);
}
