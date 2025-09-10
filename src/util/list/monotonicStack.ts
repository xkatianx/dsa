import { Stack } from "./stack";

export class MonotonicStack<T> extends Stack<T> {
  onPop?: (pushed: T, popped: T) => void;

  constructor(private popCondition: (newVal: T, oldVal: T) => boolean) {
    super();
  }

  push(val: T) {
    while (this.top != null && this.popCondition(val, this.top)) {
      const popped = this.pop()!;
      this.onPop?.(val, popped);
    }
    super.push(val);
  }
}
