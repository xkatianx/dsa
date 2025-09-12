const fn = {
  min: (a?: number, b?: number) => Math.min(a ?? Infinity, b ?? Infinity),
  max: (a?: number, b?: number) => Math.max(a ?? -Infinity, b ?? -Infinity),
  sum: (a?: number, b?: number) => (a ?? 0) + (b ?? 0),
} as const;

export class SegmentTree {
  private size: number;
  private tree: number[];
  private fn: (a?: number, b?: number) => number;

  constructor(n: number, mode: keyof typeof fn) {
    this.size = 1;
    while (this.size < n) this.size <<= 1;
    this.tree = Array.from({ length: this.size * 2 });
    this.fn = fn[mode];
  }

  update(pos: number, value: number): void {
    pos += this.size;
    this.tree[pos] = value;
    while (pos > 1) {
      pos >>= 1;
      this.tree[pos] = this.fn(this.tree[pos * 2], this.tree[pos * 2 + 1]);
    }
  }

  queryRange(inclusiveLeft: number, exclusiveRight: number): number {
    let left = inclusiveLeft + this.size;
    let right = exclusiveRight + this.size;
    let res: number | undefined = undefined;
    for (; left < right; left >>= 1, right >>= 1) {
      if (left & 1) res = this.fn(res, this.tree[left++]);
      if (right & 1) res = this.fn(res, this.tree[--right]);
    }
    return this.fn(res, res);
  }
}
