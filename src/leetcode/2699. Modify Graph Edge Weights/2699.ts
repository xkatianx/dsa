// https://leetcode.com/problems/modify-graph-edge-weights

import { fatal } from "../../util/misc/error";

type Edge = {
  from: number;
  to: number;
  weight: number;
  free: boolean;
};

// first try very messy

// let `t` denote maximum assignable weight
// step 1. assign all edges infinity and find minimum path
// WLOG, there is a solution
// step 2. assign all edges `t` and find minimum path
// WLOG, `target = O(mt)`
// step 3. assign all edges 1 and find minimum path
// step 4. uniformly assign the path to `target` and assign others `t`
// step 5. find minimum path
// WLOG, there is a shorter path
// step 6. repeat O(n) times step 4~6 but not assign `t`-edges
export default function modifiedGraphEdges(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
  target: number
): number[][] {
  const minWeight = 1;
  const maxWeight = 2e9;

  const myEdges = Array.from({ length: n }, (_) => [] as Edge[]);
  edges.forEach(([from, to, weight]) => {
    if (weight === -1) return;
    myEdges[from].push({ from, to, weight, free: false });
    myEdges[to].push({ from: to, to: from, weight, free: false });
  });
  const getShortest = () => shortestPath(myEdges, source, destination);
  if (getShortest().dist < target) return [];

  let freeEdges: [Edge, Edge][] = [];
  edges.forEach(([from, to, weight]) => {
    if (weight !== -1) return;
    const a = { from, to, weight: maxWeight, free: true };
    myEdges[from].push(a);
    const b = { from: to, to: from, weight: maxWeight, free: true };
    myEdges[to].push(b);
    freeEdges.push([a, b]);
  });
  if (getShortest().dist < target) return [];

  freeEdges.forEach(([a, b]) => {
    a.weight = minWeight;
    b.weight = minWeight;
  });
  for (;;) {
    const res = getShortest();
    let delta = target - res.dist;
    if (delta === 0) break;
    if (delta < 0) return [];
    const toAssign = res.path.filter((edge) => edge.free);
    if (toAssign.length === 0) break;
    freeEdges.forEach(([a, b]) => {
      a.free = false;
      b.free = false;
    });
    const basis = toAssign[0].weight;
    toAssign.forEach((edge) => {
      edge.free = true;
      delta += edge.weight - basis;
      edge.weight = basis;
    });
    const residual = delta % toAssign.length;
    const add = (delta - residual) / toAssign.length;
    toAssign.forEach((edge, i) => {
      edge.weight += add;
      if (residual > i && residual > 0) edge.weight++;
      if (-residual > i && residual < 0) edge.weight--;
    });
    freeEdges.forEach(([a, b]) => {
      if (a.free) {
        b.free = true;
        b.weight = a.weight;
      } else if (b.free) {
        a.free = true;
        a.weight = b.weight;
      } else {
        a.weight = maxWeight;
        b.weight = maxWeight;
      }
    });
    freeEdges = freeEdges.filter(([a]) => a.free);
  }

  return myEdges
    .flat()
    .filter((edge) => edge.from < edge.to)
    .map((edge) => [edge.from, edge.to, edge.weight]);
}

function shortestPath(edges: Edge[][], s: number, g: number) {
  const n = edges.length;
  if (0 > s || s >= n) fatal("invalid input");
  if (0 > g || g >= n) fatal("invalid input");

  const dist = edges.map((_, i) => (i === s ? 0 : Infinity));
  const fixed = dist.map((_) => false);

  for (;;) {
    const min = Math.min(...dist.filter((_, i) => !fixed[i]));
    if (min === Infinity) break;
    const minIdx = dist.findIndex((v, i) => v === min && !fixed[i]);
    fixed[minIdx] = true;
    edges[minIdx].forEach((edge) => {
      dist[edge.to] = Math.min(dist[edge.to], min + edge.weight);
    });
  }

  const path: Edge[] = [];
  if (dist[g] !== Infinity) {
    for (let node = g; node !== s; ) {
      const edge = edges[node].find(
        (edge) => edge.weight + dist[edge.to] === dist[node]
      )!;
      path.push(edge);
      node = edge.to;
    }
  }
  return { dist: dist[g], path };
}
