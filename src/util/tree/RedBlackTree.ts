import { Dir, TreeNode } from "./node";

export class RedBlackTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compare: (a: T, b: T) => number) {}

  insert(data: T) {
    let newNode: TreeNode<T>;
    if (this.root === null) {
      newNode = new TreeNode(data);
      this.root = newNode;
    } else newNode = this.insertData(this.root, data);
    this.modifyCount(newNode, 1);
    if (newNode.count === 1) this.fixInsert(newNode);
    return newNode;
  }

  private modifyCount(node: TreeNode<T>, amount: number) {
    while (node.parent != null) {
      node.parent.modifyCount(node.dir!, amount);
      node = node.parent;
    }
  }

  private modifyToCount(node: TreeNode<T>, count: number) {
    const amount = count - node.count;
    node.count = count;
    this.modifyCount(node, amount);
  }

  // Helper method to insert a new node in the tree
  private insertData(root: TreeNode<T>, data: T): TreeNode<T> {
    const res = this.compare(data, root.data);
    if (res === 0) {
      root.count++;
      return root;
    }
    const dir = res < 0 ? Dir.LEFT : Dir.RIGHT;
    if (root.child(dir) == null) {
      return root.addChild(dir, data);
    } else {
      return this.insertData(root.child(dir)!, data);
    }
  }

  // Fix the Red-Black Tree after insertion
  private fixInsert(node: TreeNode<T>): void {
    while (node !== this.root && node.parent!.red) {
      const parent = node.parent!;
      const grandParent = parent.parent!;
      const uncle = parent.sibling;
      if (uncle?.red) {
        // Case 1: Uncle is red
        parent.red = false;
        uncle.red = false;
        grandParent.red = true;
        node = grandParent;
      } else {
        // Case 2: Uncle is black and node.dir != parent.dir
        if (node.dir !== parent.dir) {
          node = parent;
          this.rotate(parent.dir!, node);
        }
        // Case 3: Uncle is black and node.dir == parent.dir
        node.parent!.red = false;
        grandParent.red = true;
        this.rotate(parent.dir!.rev, grandParent);
      }
    }
    this.root!.red = false;
  }

  private rotate(dir: Dir, node: TreeNode<T>) {
    if (dir === Dir.LEFT) this.leftRotate(node);
    else this.rightRotate(node);
  }

  // Left rotate around a given node
  private leftRotate(x: TreeNode<T>): void {
    const y = x.right!;
    x.rightCount = y.leftCount;
    y.leftCount += x.leftCount + x.count;
    x.right = y.left;
    if (y.left !== null) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  // Right rotate around a given node
  private rightRotate(x: TreeNode<T>): void {
    const y = x.left!;
    x.leftCount = y.rightCount;
    y.rightCount += x.rightCount + x.count;
    x.left = y.right;
    if (y.right !== null) {
      y.right.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }
    y.right = x;
    x.parent = y;
  }

  /** Find the closest 2 nodes `[m, M]` such that `m <= data <= M` */
  find(data: T): [TreeNode<T> | null, TreeNode<T> | null] {
    let current = this.root;
    let maxSmaller: TreeNode<T> | null = null;
    let minBigger: TreeNode<T> | null = null;

    while (current !== null) {
      const res = this.compare(data, current.data);
      if (res < 0) {
        minBigger = current;
        current = current.left;
      } else if (res > 0) {
        maxSmaller = current;
        current = current.right;
      } else {
        // If the node with the exact data is found, return it twice
        return [current, current];
      }
    }
    return [maxSmaller, minBigger];
  }

  /** Return how many nodes in the tree are smaller/same/bigger than `node`. */
  rank(node: TreeNode<T>) {
    let count = {
      small: node.leftCount,
      same: node.count,
      big: node.rightCount,
    };
    while (node.parent != null) {
      if (node.dir === Dir.LEFT)
        count.big += node.parent.rightCount + node.parent.count;
      else count.small += node.parent.leftCount + node.parent.count;
      node = node.parent;
    }
    return count;
  }

  delete(data: T, amount = 1) {
    const [n, m] = this.find(data);
    if (n !== m || n == null) return false;
    if (n.count > amount) {
      n.count -= amount;
      this.modifyCount(n, -amount);
      return true;
    }
    this.modifyToCount(n, 0);
    this.deleteNode(n);
    return true;
  }

  private deleteNode(node: TreeNode<T>): void {
    if (node.left != null) {
      const scapegoat = node.left.farthestChild(Dir.RIGHT);
      node.data = scapegoat.data;
      this.modifyToCount(node, scapegoat.count);
      this.modifyToCount(scapegoat, 0);
      node = scapegoat;
    } else if (node.right != null) {
      const scapegoat = node.right.farthestChild(Dir.LEFT);
      node.data = scapegoat.data;
      this.modifyToCount(node, scapegoat.count);
      this.modifyToCount(scapegoat, 0);
      node = scapegoat;
    }
    if (node === this.root) {
      this.root = null;
    } else if (node.left === node.right) {
      this.fixDelete(node);
      node.delete();
    } else {
      const child = node.left ?? node.right!;
      child.red = false;
      const parent = node.parent!;
      child.parent = parent;
      if (node.dir === Dir.LEFT) parent.left = child;
      else parent.right = child;
      node.parent = null;
      node.delete();
    }
  }

  // resolve the problem that `x` is doubly black
  private fixDelete(x: TreeNode<T>): void {
    // Loop until x is the root or x is red (i.e., x is not doubly black)
    while (x !== this.root && x?.red !== true) {
      const dir = x.dir!;
      // x is the left child of its parent
      let w = x.sibling; // w is x's sibling

      if (w?.red === true) {
        // Case 1: x's sibling w is red
        w.red = false; // Recolor w to black
        x.parent!.red = true; // Recolor x's parent to red
        this.rotate(dir, x.parent!); // Left rotate around x's parent
        w = x.sibling; // Update w to x's new sibling
      }

      if (w?.left?.red !== true && w?.right?.red !== true) {
        // Case 2: w's children are both black
        w!.red = true; // Recolor w to red to "absorb" the extra blackness
        x = x.parent!; // Move x up the tree, continue fixing
      } else {
        // Case 3: w's right child is black and left child is red
        if (w.child(dir)?.red === true) {
          // w.child(dir)!.red = false; // Recolor w's left child to black
          // w.red = true; // Recolor w to red
          this.rotate(dir.rev, w); // Right rotate around w
          w = x.sibling; // Update w to x's new sibling
        }

        // Case 4: w's right child is red
        w!.red = x.parent!.red; // Recolor w to x's parent's color
        x.parent!.red = false; // Recolor x's parent to black
        w!.child(dir.rev)!.red = false; // Recolor w's right child to black
        this.rotate(dir, x.parent!); // Left rotate around x's parent
        x = this.root!; // Move x to root, terminate loop
      }
    }
    if (x != null) x.red = false; // Ensure x is black
  }

  *LNR(
    node: TreeNode<T> | null = this.root
  ): Generator<TreeNode<T>, void, unknown> {
    if (node == null) return;
    yield* this.LNR(node.left);
    yield node;
    yield* this.LNR(node.right);
  }
}
