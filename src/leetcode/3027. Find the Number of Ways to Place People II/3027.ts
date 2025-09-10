// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii

// Divide and Conquer, Merge Sort, Monotonic Stack
// O(n log n) time
// linear space

// same as 3025 but less oop
export default function numberOfPairs(points: number[][]): number {
  points.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  return solve1(points as XY[], 0, points.length);
}

type XY = [number, number];

function solve1(points: XY[], start: number, end: number): number {
  if (end - start < 2) return 0;
  const mid = ((end - start) >> 1) + start;
  return (
    solve1(points, start, mid) +
    solve1(points, mid, end) +
    solve2(points, start, mid, end)
  );
}

function solve2(points: XY[], start: number, mid: number, end: number): number {
  const topY = [];
  const bottomY = [];
  const counts = [0];
  let ans = 0;

  for (let l = start, r = mid; r < end; r++) {
    const bottom = points[r];
    for (; l < mid; l++) {
      const top = points[l];
      if (top[0] > bottom[0]) break;
      while (top[1] <= (topY.at(-1) ?? NaN)) {
        topY.pop();
        const count = counts.pop()!;
        if (count <= topY.length) counts.push(count);
        else if (count - 1 === counts.at(-1)) bottomY.pop();
        else counts.push(count - 1);
      }
      topY.push(top[1]);
    }

    while (bottom[1] > (bottomY.at(-1) ?? NaN)) {
      bottomY.pop();
      counts.pop();
    }

    const count = topY.length;
    const diff = count - counts.at(-1)!;
    ans += diff;
    if (diff > 0) {
      bottomY.push(bottom[1]);
      counts.push(count);
    }
  }

  const top = points.slice(start, mid);
  for (let l = 0, r = mid, i = start; i < end && l < top.length; i++) {
    points[i] = r === end || top[l][0] <= points[r][0] ? top[l++] : points[r++];
  }

  return ans;
}
