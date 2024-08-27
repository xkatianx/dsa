import { Graph, type Node } from "../graph/graph";
import { Deque } from "../list/deque";
import { fatal } from "../misc/error";

export function bellmanFord<NodeData, EdgeData>(
  graph: Graph<NodeData, EdgeData>,
  start: number
) {
  let count = (graph.order - 1) * graph.size;
  const distances: number[] = [];
  distances[start] = 0;
  const queue = new Deque<Node<NodeData>>();
  for (let node = graph.getNode(start); node != null; node = queue.shift()) {
    graph.edgesOf(node)?.forEach((edge) => {
      const newDistance = distances[node.index] + edge.weight;
      if ((distances[edge.to.index] ?? Infinity) < newDistance) return;
      distances[edge.to.index] = newDistance;
      queue.push(edge.to);
      if (count-- < 0) fatal("There is a negative cycle.");
    });
  }
  return distances;
}
