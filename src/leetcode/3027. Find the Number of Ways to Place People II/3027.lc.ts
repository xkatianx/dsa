export default function lc(points: number[][]): number {
  const col = new Map<number, number>();
  const row = new Map<number, number>();
  const coordinatesMap = new Map<[number, number], [number, number]>();

  for (const [x, y] of points) {
    col.set(x, 0);
    row.set(y, 0);
  }

  function mapKeysToOrder(m: Map<number, number>) {
    const sortedKeys = Array.from(m.keys()).sort((a, b) => a - b);
    sortedKeys.forEach((key, index) => {
      m.set(key, index + 1);
    });
  }

  mapKeysToOrder(col);
  mapKeysToOrder(row);

  const nc = col.size + 1;
  const nr = row.size + 1;

  const m: number[][] = Array.from({ length: nc }, () => new Array(nr).fill(0));

  for (const point of points) {
    const [c, r] = [col.get(point[0])!, row.get(point[1])!];
    coordinatesMap.set(point as [number, number], [c, r]);
    m[c][r] = 1;
  }

  const prefixSum = Array.from({ length: nc }, () => new Array(nr).fill(0));

  for (let i = 1; i < nc; i++) {
    for (let j = 1; j < nr; j++) {
      prefixSum[i][j] =
        prefixSum[i - 1][j] +
        prefixSum[i][j - 1] -
        prefixSum[i - 1][j - 1] +
        m[i][j];
    }
  }

  let ans = 0;

  points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i][1] >= points[j][1]) {
        const [c1, r1] = coordinatesMap.get(points[i] as [number, number])!;
        const [c2, r2] = coordinatesMap.get(points[j] as [number, number])!;

        const cnt =
          prefixSum[c2][r1] -
          prefixSum[c1 - 1][r1] -
          prefixSum[c2][r2 - 1] +
          prefixSum[c1 - 1][r2 - 1];

        if (cnt === 2) ans++;
      }
    }
  }

  return ans;
}
