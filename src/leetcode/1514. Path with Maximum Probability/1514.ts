// https://leetcode.com/problems/path-with-maximum-probability/

import { type Edge, type Node, Graph } from "../../util/graph/graph";
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

  type NodeData = { odd: number };
  type EdgeData = { prob: number };
  const graph = new Graph<NodeData, EdgeData>();
  for (let index = 0; index < n; index++) {
    const data = { odd: index === start_node ? 1 : 0 };
    graph.addNode({ index, data });
  }
  edges.forEach(([a, b], i) => {
    const from = graph.getNode(a) ?? fatal("Invalid input.");
    const to = graph.getNode(b) ?? fatal("Invalid input.");
    const data = { prob: succProb[i] };
    graph.addEdge(from, to, data);
    graph.addEdge(to, from, data);
  });

  function compareDistance(a: Node<NodeData>, b: Node<NodeData>) {
    return b.data.odd - a.data.odd;
  }

  function updateDistance(edge: Edge<NodeData, EdgeData>) {
    const before = edge.from.data.odd;
    const delta = edge.data.prob;
    const after = before * delta;
    if (after <= edge.to.data.odd) return false;
    edge.to.data.odd = after;
    return true;
  }

  /** Bellman-Ford: O(mn) time, linear space */
  // bellmanFord(graph, start_node, updateDistance);

  /** Dijkstra without Fibonacci Heap: O(m log n) time, O(n^2) space */
  dijkstra(graph, start_node, compareDistance, updateDistance);

  return graph.getNode(end_node)!.data.odd;
}
