/** find the max value in the array. `NaN` if the array is empty */
export function max(nums: number[]) {
  if (nums.length === 0) return NaN;
  return nums.reduce((a, b) => Math.max(a, b));
}

/** find the min value in the array. `NaN` if the array is empty */
export function min(nums: number[]) {
  if (nums.length === 0) return NaN;
  return nums.reduce((a, b) => Math.min(a, b));
}

export function sum(arr?: number[]) {
  return arr?.reduce((a, b) => a + b, 0) ?? 0;
}

/** clamp but return min if min > max */
export function clampL(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}
/** clamp but return max if min > max */
export function clampR(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
