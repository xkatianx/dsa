// https://leetcode.com/problems/number-of-good-leaf-nodes-pairs

import type { TreeNode } from "./1530.test";

// 🚀 linear time implementable,
// linear space
export default function countPairs(
  root: TreeNode | null,
  distance: number
): number {
  Data.distance = distance;
  let ans = 0;

  const stack: TreeNode[] = [];
  let curr: TreeNode | null | undefined = root;
  while (curr != null) {
    if (curr.left != null && curr.left.data == null) {
      stack.push(curr);
      curr = curr.left;
      continue;
    }
    if (curr.right != null && curr.right.data == null) {
      stack.push(curr);
      curr = curr.right;
      continue;
    }
    ans += Data.good(curr.left?.data, curr.right?.data); // O(minDepth)
    curr.data = Data.join(curr.left?.data, curr.right?.data); // O(minDepth)
    curr = stack.pop();
  }
  return ans;
}

declare module "./1530.test" {
  interface TreeNode {
    data?: Data;
  }
}

class Data {
  static distance = 0;
  arr = [0, 1];
  acc = [0, 1];
  pendingIndex = 1;
  pendingValue = 1;

  valueOf() {
    // O(1)
    return this.arr.length;
  }
  getAcc(d: number) {
    // O(1)
    let v = this.acc[d] ?? 0;
    if (d > this.pendingIndex) v += this.pendingValue;
    return v;
  }
  grow() {
    // O(1)
    this.arr.unshift(0); // you can use .push() and index accordingly
    this.acc.unshift(0); // so it's considered O(1)
    this.pendingIndex++;
    return this;
  }
  static join(a: Data | undefined, b: Data | undefined) {
    // O(minDepth)
    if (a == null && b == null) return new Data();
    if (a == null) return b!.grow();
    if (b == null) return a.grow();

    if (a > b) [a, b] = [b, a];
    a.arr.forEach((_, i) => {
      // O(a.arr.length)
      if (i > a.pendingIndex) a.acc[++a.pendingIndex] += a.pendingValue;
      if (i > b.pendingIndex) b.acc[++b.pendingIndex] += b.pendingValue;
      // [amortize] undo the above
      b.arr[i] += a.arr[i];
      b.acc[i] += a.acc[i];
    });
    while (b.pendingIndex >= a.arr.length) {
      // O(0), amortized
      b.acc[b.pendingIndex--] -= b.pendingValue;
    }
    b.pendingValue += a.acc.at(-1)!;
    b.grow();
    return b;
  }
  static good(a: Data | undefined, b: Data | undefined) {
    // O(minDepth)
    if (a == null || b == null) return 0;
    if (a > b) [a, b] = [b, a];
    let ans = 0;
    const stop = Math.min(a.arr.length, Data.distance);
    for (let i = 1; i < stop; i++) {
      // O(a.arr.length)
      ans += a.arr[i] * b.getAcc(Data.distance - i);
    }
    return ans;
  }
}
