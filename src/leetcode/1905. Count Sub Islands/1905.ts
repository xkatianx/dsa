// https://leetcode.com/problems/count-sub-islands

// BFS
// 🚀 linear time,
// 🤏 constant space
export function countSubIslands(grid1: number[][], grid2: number[][]): number {
  let m = grid1[0].length;
  let ans = 0;

  const id = (r: number, c: number) => -(r * m + c + 1);
  const rc = (id: number) => [Math.floor((-id - 1) / m), (-id - 1) % m];

  function bfs(r: number, c: number) {
    let res = grid1[r][c] === 1;
    let head = [r, c];
    let tail = [r, c];

    function append(r2: number, c2: number) {
      grid2[tail[0]][tail[1]] = id(r2, c2);
      tail = [r2, c2];
    }

    function check(y: number, x: number) {
      const [r2, c2] = [head[0] + y, head[1] + x];
      if (grid2[r2]?.[c2] === 1) {
        if (grid1[r2][c2] === 0) res = false;
        append(r2, c2);
      }
    }

    for (;;) {
      check(1, 0);
      check(-1, 0);
      check(0, 1);
      check(0, -1);

      if (head[0] === tail[0] && head[1] === tail[1]) {
        append(tail[0], tail[1]);
        return res;
      }
      head = rc(grid2[head[0]][head[1]]);
    }
  }

  grid2.forEach((row, r) => {
    row.forEach((v, c) => {
      if (v > 0) ans += Number(bfs(r, c));
    });
  });

  grid2.forEach((row, r) => {
    row.forEach((v, c) => {
      if (v < 0) grid2[r][c] = 1;
    });
  });

  return ans;
}
