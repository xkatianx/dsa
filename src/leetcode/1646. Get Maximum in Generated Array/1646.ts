// https://leetcode.com/problems/get-maximum-in-generated-array

// Math
// 🚀 linear time
// 🤏 constant space
export default function getMaximumGenerated(n: number): number {
  // possible n: 0 ~ 2^31 - 1
  const inputSize = 31;

  let [fibSmall, fibBig] = [0, 1];
  for (let i = 0; i < inputSize; i++) {
    [fibSmall, fibBig] = [fibBig, fibSmall + fibBig];
  }

  let ans = 0;
  let [zero, one] = [1, 0];

  for (let shift = inputSize; shift > 0; shift--) {
    n <<= 1;
    if (n >= 0) zero += one;
    else {
      ans = Math.max(ans, zero * fibSmall + one * fibBig);
      one += zero;
    }
    [fibSmall, fibBig] = [fibBig - fibSmall, fibSmall];
  }

  return ans;
}
