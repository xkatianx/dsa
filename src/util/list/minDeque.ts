import { Deque } from "./deque";
import { MinStack } from "./minStack";

export class MinDeque<T> extends Deque<T> {
  protected left: MinStack<T>;
  protected right: MinStack<T>;

  constructor(private compare: (a: T, b: T) => number) {
    super();
    this.left = new MinStack<T>(compare);
    this.right = new MinStack<T>(compare);
  }

  get min() {
    if (this.left.min == null) return this.right.min;
    if (this.right.min == null) return this.left.min;
    return this.compare(this.left.min, this.right.min) <= 0
      ? this.left.min
      : this.right.min;
  }

  protected moveLeft() {
    const newLeft = new MinStack<T>(this.compare);
    const newRight = new MinStack<T>(this.compare);
    const mid = (this.length + 1) >> 1;
    for (let i = mid - 1; i >= 0; i--) {
      newLeft.push(this.right.at(i)!);
    }
    for (let i = mid; i < this.right.length; i++) {
      newRight.push(this.right.at(i)!);
    }
    this.left = newLeft;
    this.right = newRight;
  }
}
