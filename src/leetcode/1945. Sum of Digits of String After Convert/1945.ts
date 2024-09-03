// https://leetcode.com/problems/sum-of-digits-of-string-after-convert

// 🚀 linear time,
// linear space
export default function getLucky(s: string, k: number): number {
  s = Array.from(s)
    .map((v) => v.charCodeAt(0) - 96)
    .join("");
  while (k-- > 0) s = String(Array.from(s).reduce((a, b) => a + Number(b), 0));
  return Number(s);
}
