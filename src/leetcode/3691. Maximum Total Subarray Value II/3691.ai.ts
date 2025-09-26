/**
 * Naive approach: Generate all possible subarrays, calculate their values,
 * sort by value in descending order, and take the top k.
 *
 * Time Complexity: O(n^3) - for each subarray, we calculate max and min
 * Space Complexity: O(n^2) - storing all subarray values
 */
function maximumTotalSubarrayValue(nums: number[], k: number): number {
  const n = nums.length;
  const subarrayValues: number[] = [];

  // Generate all possible subarrays and calculate their values
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      // Calculate max and min for subarray nums[i..j]
      let max = nums[i];
      let min = nums[i];

      for (let k = i; k <= j; k++) {
        max = Math.max(max, nums[k]);
        min = Math.min(min, nums[k]);
      }

      const value = max - min;
      subarrayValues.push(value);
    }
  }

  // Sort in descending order
  subarrayValues.sort((a, b) => b - a);

  // Take the top k values and sum them
  let totalValue = 0;
  for (let i = 0; i < Math.min(k, subarrayValues.length); i++) {
    totalValue += subarrayValues[i];
  }

  return totalValue;
}

export default maximumTotalSubarrayValue;
