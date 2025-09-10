// https://cses.fi/problemset/task/2430/
// https://abc864197532.github.io/2021/09/15/cses-additional-sol/#2430-binary-subsequences

// O(n log n) time
// 🤏 constant space, output excluded
export default function solve(n: number) {
  let best = [Infinity, 0, 0];
  for (let b = 1; b <= n + 2 - b; b++) {
    const a = n + 2 - b;
    const len = retro(a, b);
    if (len < best[0]) best = [len, a, b];
  }
  return genStr(best[1], best[2]);
}

function div(numerator: number, denominator: number) {
  const r = numerator % denominator;
  const q = (numerator - r) / denominator;
  return [q, r];
}

function retro(a: number, b: number) {
  let len = 0;
  while (b > 1) {
    const [q, r] = div(a, b);
    len += q;
    [a, b] = [b, r];
  }
  if (b === 0) return Infinity;
  return len + a - 1;
}

function genStr(a: number, b: number) {
  const arr: string[] = [];
  let char = 0;
  while (b > 0) {
    const [q, r] = div(a, b);
    arr.push(String(char).repeat(q));
    char = 1 - char;
    [a, b] = [b, r];
  }
  return arr.join("").slice(0, -1);
}
