import { Graph, type Edge, type Node } from "../graph/graph";
import { Deque } from "../list/deque";
import { fatal } from "../misc/error";

export function bellmanFord<NodeData, EdgeData>(
  graph: Graph<NodeData, EdgeData>,
  start: number,
  updateDistance: (edge: Edge<NodeData, EdgeData>) => boolean
) {
  let count = (graph.order - 1) * graph.size;
  const queue = new Deque<Node<NodeData>>();
  for (let node = graph.getNode(start); node != null; node = queue.shift()) {
    graph.edgesOf(node)?.forEach((edge) => {
      if (updateDistance(edge)) queue.push(edge.to);
      if (count-- < 0) fatal("There is a negative cycle.");
    });
  }
  return graph;
}
