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
