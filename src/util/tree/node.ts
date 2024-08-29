import { unreachable } from "../misc/error";

export class Dir {
  static readonly LEFT = new Dir(false);
  static readonly RIGHT = new Dir(true);

  constructor(private right: boolean) {}

  get rev() {
    return this.reverse();
  }

  reverse() {
    if (this.right) return Dir.LEFT;
    else return Dir.RIGHT;
  }
}

export class TreeNode<T> {
  parent: TreeNode<T> | null = null;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  red = true;
  count = 1;
  leftCount = 0;
  rightCount = 0;

  constructor(public data: T) {}

  get dir() {
    if (this.parent == null) return null;
    if (this === this.parent.left) return Dir.LEFT;
    if (this === this.parent.right) return Dir.RIGHT;
    unreachable();
  }

  get sibling(): TreeNode<T> | null {
    if (this.dir == null) return null;
    return this.parent!.child(this.dir.rev);
  }

  get totalCount() {
    return this.leftCount + this.count + this.rightCount;
  }

  child(dir: Dir) {
    if (dir === Dir.LEFT) return this.left;
    if (dir === Dir.RIGHT) return this.right;
    return null;
  }

  addChild(dir: Dir, child: T) {
    const c = new TreeNode(child);
    c.parent = this;
    if (dir === Dir.LEFT) this.left = c;
    if (dir === Dir.RIGHT) this.right = c;
    return c;
  }

  farthestChild(dir: Dir) {
    let curr: TreeNode<T> = this;
    let tmp: TreeNode<T> | null;
    while ((tmp = curr.child(dir)) != null) curr = tmp;
    return curr;
  }

  farthestParent(dir: Dir) {
    let curr: TreeNode<T> = this;
    let tmp: TreeNode<T> | null;
    while ((tmp = curr.parent) != null && tmp.child(dir.rev) === curr)
      curr = tmp;
    return curr;
  }

  delete() {
    this.left = null;
    this.right = null;
    if (this.dir === Dir.LEFT) this.parent!.left = null;
    else if (this.dir === Dir.RIGHT) this.parent!.right = null;
    this.parent = null;
  }

  modifyCount(dir: Dir, amount: number) {
    if (dir === Dir.LEFT) this.leftCount += amount;
    else if (dir === Dir.RIGHT) this.rightCount += amount;
    else unreachable();
  }
}
