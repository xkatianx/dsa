import { Stack } from "./stack";

export class MinStack<T> extends Stack<T> {
  protected mins: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {
    super();
  }

  get min() {
    return this.mins.at(-1);
  }

  push(val: T) {
    super.push(val);
    if (this.min == null) return void this.mins.push(val);
    this.compare(this.min, val) <= 0
      ? this.mins.push(this.min)
      : this.mins.push(val);
  }

  pop() {
    this.mins.pop();
    return super.pop();
  }
}
