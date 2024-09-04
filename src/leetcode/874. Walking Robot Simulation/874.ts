// https://leetcode.com/problems/walking-robot-simulation

// average linear time
// O(obstacles.length) space
export default function robotSim(
  commands: number[],
  obstacles: number[][]
): number {
  const objs: Partial<Record<string, boolean>> = {};
  obstacles.forEach(([x, y]) => {
    objs[`${x},${y}`] = true;
  });

  enum Dir {
    N,
    E,
    S,
    W,
  }

  let dir = Dir.N;
  let [x, y] = [0, 0];
  let ans = 0;

  function turn(command: number) {
    if (command === -1) dir = (dir + 1) % 4;
    else dir = (dir + 3) % 4;
  }

  function walk(dist: number) {
    while (dist-- > 0) {
      const newX = x + (dir === Dir.E ? 1 : dir === Dir.W ? -1 : 0);
      const newY = y + (dir === Dir.N ? 1 : dir === Dir.S ? -1 : 0);
      if (objs[`${newX},${newY}`] === true) return;
      [x, y] = [newX, newY];
      ans = Math.max(ans, x * x + y * y);
    }
  }

  commands.forEach((c) => {
    if (c < 0) turn(c);
    else walk(c);
  });

  return ans;
}
