// https://leetcode.com/problems/convert-1d-array-into-2d-array

export default function construct2DArray(
  original: number[],
  m: number,
  n: number
): number[][] {
  if (original.length !== m * n) return [];
  const ans: number[][] = [];
  while (original.length > 0) ans.push(original.splice(-n));
  return ans.reverse();
}
