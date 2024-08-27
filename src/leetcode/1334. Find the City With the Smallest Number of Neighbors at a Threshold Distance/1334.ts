// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance

import { Graph } from "../../util/graph/graph";
import { fatal } from "../../util/misc/error";
import { dijkstra } from "../../util/path/dijkstra";
import { floydWarshall } from "../../util/path/floyd-warshall";

export function findTheCity(
  n: number,
  edges: [number, number, number][],
  distanceThreshold: number
): number {
  const graph = new Graph<null, null>();
  for (let index = 0; index < n; index++) {
    graph.addNode({ index, data: null });
  }
  edges.forEach(([a, b, weight]) => {
    const from = graph.getNode(a) ?? fatal("Invalid input.");
    const to = graph.getNode(b) ?? fatal("Invalid input.");
    graph.addEdge(from, to, null, weight);
    graph.addEdge(to, from, null, weight);
  });

  /** Floyd-Warshall O(n^3) time, O(n^2) space */
  const result = floydWarshall(graph);

  /** Johnson: O(mn + n^2 log n) time, O(n) space */
  /** Johnson here: O(mn log n) time, O(n^2) space */
  // const result: number[][] = [];
  // for (let i = 0; i < n; i++) result.push(dijkstra(graph, i));

  return (
    result
      .map((r) => r.filter((v) => v <= distanceThreshold).length)
      .map((v, i) => [v, i])
      .sort((a, b) => b[0] - a[0])
      .at(-1)
      ?.at(1) ?? n - 1
  );
}
