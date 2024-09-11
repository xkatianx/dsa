// https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference

import { sum } from "../../util/misc/index";

// Meet in the Middle
// O(2^n) time,
// O(2^n) space
export default function minimumDifference(nums: number[]): number {
  const n = nums.length / 2;
  const target = sum(nums) / 2;

  const left = Array.from({ length: n + 1 }, () => [] as number[]);
  const right = Array.from({ length: n + 1 }, () => [] as number[]);
  subSum(nums.slice(0, n)).forEach(({ count, sum }) => {
    left[count].push(sum);
  });
  subSum(nums.slice(n)).forEach(({ count, sum }) => {
    right[count].push(sum);
  });

  let ans = Infinity;
  for (let i = 0; i <= n; i++) {
    const leftArr = left[i];
    const rightArr = right[n - i];

    let leftPtr = 0;
    let rightPtr = rightArr.length - 1;
    while (leftPtr < leftArr.length && rightPtr >= 0) {
      const sum = leftArr[leftPtr] + rightArr[rightPtr];
      const diff = Math.abs(sum - target);
      ans = Math.min(ans, diff * 2);
      if (sum < target) leftPtr++;
      else if (sum > target) rightPtr--;
      else return 0;
    }
  }
  return ans;
}

type Data = {
  count: number;
  sum: number;
};

// sum of subarray. every sum sorted
function subSum(arr: number[]) {
  let data: Data[] = [{ count: 0, sum: 0 }];

  function* gen(add?: number) {
    for (let i = 0; i < data.length; i++) {
      const { count, sum } = data[i];
      if (add == null) yield data[i];
      else yield { count: count + 1, sum: sum + add } as Data;
    }
  }

  arr.forEach((v) => {
    data = mergeSort(gen(), gen(v));
  });
  return data;
}

function mergeSort(arr1: Generator<Data, void>, arr2: Generator<Data, void>) {
  const out: Data[] = [];

  let v1 = arr1.next();
  let v2 = arr2.next();
  while (!v1.done || !v2.done) {
    const sum1 = v1.value?.sum ?? Infinity;
    const sum2 = v2.value?.sum ?? Infinity;
    if (sum1 <= sum2) {
      out.push(v1.value!);
      v1 = arr1.next();
    } else {
      out.push(v2.value!);
      v2 = arr2.next();
    }
  }
  return out;
}
