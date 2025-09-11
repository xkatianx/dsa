// https://codeforces.com/contest/713/problem/C

import { MinHeap } from "../../util/list/minHeap.js";
import { sum } from "../../util/misc/index.js";

export default function solve(arr: number[]): number {
  return nonDecreasing(arr.map((v, i) => v - i));
}

export function nonDecreasing(arr: number[]): number {
  const heap = new MinHeap<number>((a, b) => b - a);

  arr.forEach((v) => {
    heap.push(v);
    heap.push(v);
    heap.pop();
  });

  return sum(arr) - sum(heap.snapshot);
}

function mergeSort(arr1: number[], arr2: number[]): number[] {
  const out: number[] = [];
  let [i, j] = [0, 0];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) out.push(arr1[i++]);
    else out.push(arr2[j++]);
  }

  return out.concat(arr1.slice(i)).concat(arr2.slice(j));
}

function median(arr: number[]) {
  return arr[(arr.length - 1) >>> 1];
}

export function nonDecreasing2(arr: number[]): number {
  const stacks: number[][] = [];
  arr.forEach((v) => {
    let arr = [v];
    while (stacks.length > 0 && median(stacks.at(-1)!) > median(arr)) {
      arr = mergeSort(stacks.pop()!, arr);
    }
    stacks.push(arr);
  });

  return sum(
    stacks.map((arr) => sum(arr.map((v) => Math.abs(v - median(arr)))))
  );
}
