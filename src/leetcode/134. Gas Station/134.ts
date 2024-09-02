// https://leetcode.com/problems/gas-station

// 🚀 linear time
// 🤏 constant space implementable
export default function canCompleteCircuit(
  gas: number[],
  cost: number[]
): number {
  const net = gas.map((v, i) => v - cost[i]);
  if (net.reduce((a, b) => a + b) < 0) return -1;

  let ans = 0;
  let tank = 0;
  for (let i = ans; i < net.length; i++) {
    if (tank < 0) ans = i;
    tank = Math.max(tank, 0) + net[i];
  }
  return ans;
}
