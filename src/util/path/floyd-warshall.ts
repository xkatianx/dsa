import type { Graph } from "../graph/graph";

/** `output[node_from][node_to] = minimum distance` */
export function floydWarshall<NodeData, EdgeData>(
  graph: Graph<NodeData, EdgeData>
) {
  const length = graph.order;
  const arr: number[][] = Array.from({ length }).map((_) =>
    Array.from({ length }, (_) => Infinity)
  );

  for (const node of graph.iterNodes()) {
    arr[node.index][node.index] = 0;
    graph.edgesOf(node)?.forEach((edge) => {
      arr[edge.from.index][edge.to.index] = edge.weight;
    });
  }

  for (let middle = 0; middle < length; middle++) {
    for (let start = 0; start < length; start++) {
      for (let goal = 0; goal < length; goal++) {
        arr[start][goal] = Math.min(
          arr[start][goal],
          arr[start][middle] + arr[middle][goal]
        );
      }
    }
  }
  return arr;
}
