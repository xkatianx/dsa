import { randomInt } from "crypto";
import { RedBlackTree } from "./RedBlackTree";

describe("RedBlackTree", () => {
  let tree: RedBlackTree<number>;

  beforeEach(() => {
    tree = new RedBlackTree<number>((a, b) => a - b);
  });

  function toList<T>(tree: RedBlackTree<T>) {
    return Array.from(tree.LNR())
      .map((node): T[] => new Array(node.count).fill(node.data))
      .flat();
  }

  test("should insert elements and maintain the Red-Black Tree properties", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(15);
    tree.insert(25);

    // Check the in-order traversal result
    expect(toList(tree)).toEqual([10, 15, 20, 25, 30]);
  });

  test("should find the exact node if it exists", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(15);
    tree.insert(25);

    const [maxSmaller, minBigger] = tree.find(20);

    expect(maxSmaller?.data).toBe(20);
    expect(minBigger?.data).toBe(20);
  });

  test("should find nearest neighbors for non-existing value", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    tree.insert(15);
    tree.insert(25);

    const [maxSmaller, minBigger] = tree.find(22);

    expect(maxSmaller?.data).toBe(20);
    expect(minBigger?.data).toBe(25);
  });

  test("should return correct nodes when the value is outside the existing range", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);

    let [maxSmaller, minBigger] = tree.find(35);
    expect(maxSmaller?.data).toBe(30);
    expect(minBigger).toBeNull();

    [maxSmaller, minBigger] = tree.find(5);
    expect(maxSmaller).toBeNull();
    expect(minBigger?.data).toBe(10);
  });

  test("should correctly identify nodes in a larger tree", () => {
    const values = [15, 10, 20, 5, 12, 17, 25];
    values.forEach((val) => tree.insert(val));

    const [maxSmaller, minBigger] = tree.find(13);

    expect(maxSmaller?.data).toBe(12);
    expect(minBigger?.data).toBe(15);
  });

  test("should delete a leaf node", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(5);

    // Tree before deletion: [5, 10, 20]
    tree.delete(5);
    expect(toList(tree)).toEqual([10, 20]);

    // Check if the tree is still valid
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  test("should delete a node with one child", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(5);
    tree.insert(15);

    // Tree before deletion: [5, 10, 15, 20]
    tree.delete(20);
    expect(toList(tree)).toEqual([5, 10, 15]);

    // Check if the tree is still valid
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  test("should delete a node with two children", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(5);
    tree.insert(15);
    tree.insert(25);

    // Tree before deletion: [5, 10, 15, 20, 25]
    tree.delete(20);
    expect(toList(tree)).toEqual([5, 10, 15, 25]);

    // Check if the tree is still valid
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  test("should delete the root node", () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(5);

    // Tree before deletion: [5, 10, 20]
    tree.delete(10);
    expect(toList(tree)).toEqual([5, 20]);

    // Check if the new root is black
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  test("should handle complex deletion scenarios", () => {
    const values = [30, 20, 40, 10, 25, 35, 50];
    values.forEach((val) => tree.insert(val));

    // Tree before deletion: [10, 20, 25, 30, 35, 40, 50]
    tree.delete(30);
    expect(toList(tree)).toEqual([10, 20, 25, 35, 40, 50]);

    // Check if the tree is still valid
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  test("should delete a node that causes multiple fixes", () => {
    const values = [50, 25, 75, 12, 37, 62, 87, 6, 18, 31, 43, 56, 68, 81, 93];
    values.forEach((val) => tree.insert(val));

    // Tree before deletion
    tree.delete(25);
    expect(toList(tree)).toEqual([
      6, 12, 18, 31, 37, 43, 50, 56, 62, 68, 75, 81, 87, 93,
    ]);

    // Check if the tree is still valid
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  test("should delete nodes in succession and maintain Red-Black properties", () => {
    const values = [20, 10, 30, 5, 15, 25, 35];
    values.forEach((val) => tree.insert(val));

    tree.delete(5);
    tree.delete(35);
    tree.delete(20);
    expect(toList(tree)).toEqual([10, 15, 25, 30]);

    // Check if the tree is still valid
    expect(tree["root"]?.red).toBeFalsy(); // Root should be black
  });

  it("should pass random test", () => {
    const arr: number[] = [];
    let ops = 10000;
    while (ops-- > 0) {
      const op = Math.random();
      if (arr.length === 0 || op < 0.8) {
        const n = randomInt(500);
        arr.push(n);
        tree.insert(n);
      } else {
        const i = randomInt(arr.length);
        const n = arr[i];
        arr[i] = arr.at(-1)!;
        arr.pop();
        tree.delete(n);
      }
    }
    arr.push(0);
    tree.insert(0);

    for (const node of tree.LNR()) {
      expect(node.leftCount).toBe(node.left?.totalCount ?? 0);
      expect(node.rightCount).toBe(node.right?.totalCount ?? 0);
    }

    arr.sort((a, b) => a - b);
    expect(toList(tree)).toEqual(arr);

    const i = randomInt(arr.length);
    const count = {
      small: arr.filter((v) => v < arr[i]).length,
      same: arr.filter((v) => v === arr[i]).length,
      big: arr.filter((v) => v > arr[i]).length,
    };
    const node = tree.find(arr[i]);
    expect(node[0]).toBe(node[1]);
    expect(tree.rankNode(node[0]!)).toEqual(count);
  });
});
