import { Graph, type Node } from "../graph/graph";
import { MinHeap } from "../list/minHeap";

export function dijkstra<NodeData, EdgeData>(
  graph: Graph<NodeData, EdgeData>,
  start: number
) {
  const distances: number[] = [];
  distances[start] = 0;
  const seen: boolean[] = [];
  const heap = new MinHeap<Node<NodeData>>(
    (a, b) => distances[a.index] - distances[b.index]
  );
  for (let node = graph.getNode(start); node != null; node = heap.pop()) {
    if (seen[node.index]) continue;
    seen[node.index] = true;
    graph.edgesOf(node)?.forEach((edge) => {
      const newDistance = distances[node.index] + edge.weight;
      if ((distances[edge.to.index] ?? Infinity) < newDistance) return;
      distances[edge.to.index] = newDistance;
      heap.push(edge.to);
    });
  }
  return distances;
}
