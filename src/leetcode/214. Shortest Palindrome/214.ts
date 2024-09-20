// https://leetcode.com/problems/shortest-palindrome

import { gusfield, manacher } from "../../util/list/zArray";

// Z algo
// 🚀 linear time
// linear space
export default function shortestPalindrome(str: string): string {
  const rts = str.split("").reverse().join("");
  const z = gusfield(str + " " + rts);
  const i = Math.max(...z.filter((v, i) => v + i >= z.length));
  return str.slice(i).split("").reverse().join("") + str;
}

// manacher
// 🚀 linear time
// linear space
function shortestPalindrome2(str: string): string {
  const s_t_r = str.split("").join(" ");
  const z = manacher(s_t_r);
  const i = Math.max(...z.filter((v, i) => v > i));
  return str.slice(i).split("").reverse().join("") + str;
}
