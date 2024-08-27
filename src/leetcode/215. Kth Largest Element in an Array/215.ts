// https://leetcode.com/problems/kth-largest-element-in-an-array/

import { bfprt } from "../../util/misc/bfprt";

export function findKthLargest(nums: number[], k: number): number {
  /** BFPRT: O(n) time, O(n) space */
  return bfprt(nums, nums.length - k);
}
