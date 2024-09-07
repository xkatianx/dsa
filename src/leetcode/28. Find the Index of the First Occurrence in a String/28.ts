// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string

import { gusfield } from "../../util/list/zArray";

// 1D DP
// 🚀 linear time
// linear space
export default function strStr(haystack: string, needle: string): number {
  return gusfield(needle + haystack)
    .slice(needle.length)
    .findIndex((v) => v >= needle.length);
}
