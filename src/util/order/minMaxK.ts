/** Return first `k` min/max unique values in order and their amount in `arr`.
 *
 * - Time: O(`arr.length` * `k`)
 *
 * - Space: O(`k`)
 */
export function minMaxK(arr: number[], k: number) {
  const min = Array.from({ length: k }, () => ({ value: Infinity, amount: 0 }));
  const max = Array.from({ length: k }, () => ({
    value: -Infinity,
    amount: 0,
  }));

  arr.forEach((value) => {
    let [minDone, maxDone] = [false, false];
    for (let i = 0; i < k; i++) {
      if (!minDone) {
        if (value < min[i].value) {
          min.splice(i, 0, { value, amount: 1 });
          min.splice(-1);
          minDone = true;
        } else if (value === min[i].value) {
          min[i].amount++;
          minDone = true;
        }
      }
      if (!maxDone) {
        if (value > max[i].value) {
          max.splice(i, 0, { value, amount: 1 });
          max.splice(-1);
          maxDone = true;
        } else if (value === max[i].value) {
          max[i].amount++;
          maxDone = true;
        }
      }
      if (minDone && maxDone) break;
    }
  });
  return { min, max };
}
