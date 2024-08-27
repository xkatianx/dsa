import { Graph, type Edge, type Node } from "../graph/graph";
import { MinHeap } from "../list/minHeap";

export function dijkstra<NodeData, EdgeData>(
  graph: Graph<NodeData, EdgeData>,
  start: number,
  compareDistance: (a: Node<NodeData>, b: Node<NodeData>) => number,
  updateDistance: (edge: Edge<NodeData, EdgeData>) => boolean
) {
  const heap = new MinHeap<Node<NodeData>>(compareDistance);
  const seen: boolean[] = [];
  for (let node = graph.getNode(start); node != null; node = heap.pop()) {
    if (seen[node.index]) return;
    seen[node.index] = true;
    graph.edgesOf(node)?.forEach((edge) => {
      if (updateDistance(edge)) heap.push(edge.to);
    });
  }
  return graph;
}
