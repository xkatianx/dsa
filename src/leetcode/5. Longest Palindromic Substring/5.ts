// https://leetcode.com/problems/longest-palindromic-substring

import { manacher } from "../../util/list/zArray";

// 1D DP
// 🚀 linear time
// linear space
export default function longestPalindrome(s: string): string {
  s = Array.from(s).join(" ");
  const dp = manacher(s);
  const d = Math.max(...dp);
  const i = dp.indexOf(d);
  return s.slice(i - d + 1, i + d).replaceAll(" ", "");
}
