export class MinHeap<T> {
  private heap: Array<T> = [null as unknown as T];

  constructor(private compare: (a: T, b: T) => number) {}

  get length() {
    return this.heap.length - 1;
  }

  get first() {
    return this.heap.at(1);
  }

  push(x: T) {
    let curr = this.heap.length;
    this.heap.push(x);
    while (curr > 1) {
      const parent = curr >> 1;
      if (this.compareByIndex(curr, parent) >= 0) break;
      this.swapByIndex(curr, parent);
      curr = parent;
    }
  }

  pop() {
    const out = this.first;
    if (out == null) return out;
    this.heap[1] = this.heap.at(-1)!;
    this.heap.pop();

    let curr = 1;
    for (;;) {
      const left = curr << 1;
      const right = left + 1;
      const small = this.compareByIndex(left, right) <= 0 ? left : right;
      if (this.compareByIndex(curr, small) <= 0) break;
      this.swapByIndex(curr, small);
      curr = small;
    }
    return out;
  }

  private swapByIndex(a: number, b: number) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  /** `undefined` is larger than valid values. */
  private compareByIndex(a: number, b: number) {
    const left = this.heap[a];
    const right = this.heap[b];
    if (left === right) return 0;
    if (left == null) return 1;
    if (right == null) return -1;
    return this.compare(left, right);
  }
}
