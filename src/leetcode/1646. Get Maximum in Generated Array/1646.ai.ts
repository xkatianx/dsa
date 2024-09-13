// https://leetcode.com/problems/get-maximum-in-generated-array

export default function getMaximumGenerated(n: number): number {
  if (n === 0) return 0; // Edge case when n is 0

  const nums: number[] = new Array(n + 1);
  nums[0] = 0;
  nums[1] = 1;

  // Fill the array based on the rules
  for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
      nums[i] = nums[i / 2]; // For even indices
    } else {
      nums[i] = nums[Math.floor(i / 2)] + nums[Math.floor(i / 2) + 1]; // For odd indices
    }
  }

  // Return the maximum value in the array
  return Math.max(...nums);
}
