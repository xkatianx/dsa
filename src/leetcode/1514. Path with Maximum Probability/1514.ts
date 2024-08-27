// https://leetcode.com/problems/path-with-maximum-probability/

import { Graph } from "../../util/graph/graph";
import { fatal } from "../../util/misc/error";
import { bellmanFord } from "../../util/path/bellman-ford";
import { dijkstra } from "../../util/path/dijkstra";

export function maxProbability(
  n: number,
  edges: [number, number][],
  succProb: number[],
  start_node: number,
  end_node: number
): number {
  if (0 > start_node || start_node > n) fatal("Invalid input.");
  if (0 > end_node || end_node > n) fatal("Invalid input.");
  if (edges.length !== succProb.length) fatal("Invalid input.");

  const graph = new Graph<null, null>();
  for (let index = 0; index < n; index++) {
    graph.addNode({ index, data: null });
  }
  edges.forEach(([a, b], i) => {
    const from = graph.getNode(a) ?? fatal("Invalid input.");
    const to = graph.getNode(b) ?? fatal("Invalid input.");
    graph.addEdge(from, to, null, -Math.log2(succProb[i]));
    graph.addEdge(to, from, null, -Math.log2(succProb[i]));
  });

  /** Bellman-Ford: O(mn) time, linear space */
  // const distances = bellmanFord(graph, start_node);

  /** Dijkstra + Fibonacci Heap: O(m + n log n) time, O(n) space */
  /** Dijkstra here: O(m log n) time, O(n^2) space */
  const distances = dijkstra(graph, start_node);

  const distance = distances[end_node] ?? Infinity;
  return Math.pow(2, -distance);
}
