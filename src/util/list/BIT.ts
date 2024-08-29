export class BIT {
  private tree: number[] = [];

  constructor(size: number) {
    this.tree = new Array(size + 1).fill(0);
  }

  update(index: number, value: number): void {
    for (; index < this.tree.length; index += index & -index) {
      this.tree[index] += value;
    }
  }

  query(index: number): number {
    let sum = 0;
    for (; index > 0; index -= index & -index) {
      sum += this.tree[index];
    }
    return sum;
  }

  queryRange(left: number, right: number): number {
    return this.query(right) - this.query(left - 1);
  }
}
