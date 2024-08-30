// https://leetcode.com/problems/range-sum-query-mutable

import { BIT } from "../../util/list/BIT";

export default class cls {
  bit: BIT;

  constructor(nums: number[]) {
    this.bit = new BIT(nums.length);
    nums.forEach((v, i) => {
      this.bit.update(i + 1, v);
    });
  }

  update(index: number, val: number): void {
    const n = this.bit.queryRange(index + 1, index + 1);
    this.bit.update(index + 1, val - n);
  }

  sumRange(left: number, right: number): number {
    return this.bit.queryRange(left + 1, right + 1);
  }
}
