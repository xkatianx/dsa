// https://leetcode.com/problems/the-number-of-beautiful-subsets

// O(n log n) time, O(n) space
// O(k) space possible
export function beautifulSubsets(nums: number[], k: number): number {
  type Data = {
    num: number;
    yes: number;
    no: number;
  };
  const arr: Data[] = [];
  nums
    .sort((a, b) => a - b)
    .forEach((v) => {
      if (arr.at(-1)?.num === v) arr.at(-1)!.yes = arr.at(-1)!.yes * 2 + 1;
      else arr.push({ num: v, yes: 1, no: 1 });
    });

  let prev: Data;
  return (
    arr.reduceRight((ans, curr) => {
      const ban = curr.num + k;
      while (prev == null || prev.num > ban) prev = arr.pop()!;
      if (prev!.num === ban)
        [curr.no, curr.yes] = [prev.no + prev.yes, prev.no * curr.yes];
      return ans + (ans / curr.no) * curr.yes;
    }, 1) - 1
  );
}
