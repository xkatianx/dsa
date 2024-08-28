import fn from "./1530";

// Definition for a binary tree node.
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function toTree(arr: (number | null)[]) {
  const root = new TreeNode(arr.shift()!);
  const list = [root];
  while (list.length > 0) {
    const curr = list.shift()!;
    const left = arr.shift();
    if (left != null) {
      curr.left = new TreeNode(left);
      list.push(curr.left);
    }
    const right = arr.shift();
    if (right != null) {
      curr.right = new TreeNode(right);
      list.push(curr.right);
    }
  }
  return root;
}

function fn2(arr: (number | null)[], distance: number) {
  return fn(toTree(arr), distance);
}

describe("LeetCode 1530", () => {
  it("should pass test case #1", () => {
    const res = fn2([1, 2, 3, null, 4], 3);
    expect(res).toBe(1);
  });
  it("should pass test case #2", () => {
    const res = fn2([1, 2, 3, 4, 5, 6, 7], 3);
    expect(res).toBe(2);
  });
  it("should pass test case #3", () => {
    const res = fn2(
      [7, 1, 4, 6, null, 5, 3, null, null, null, null, null, 2],
      3
    );
    expect(res).toBe(1);
  });
});
