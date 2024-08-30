import { fatal } from "../misc/error";

export type Node<NodeData> = {
  index: number;
  data: NodeData;
};

export type Edge<NodeData, EdgeData> = {
  from: Node<NodeData>;
  to: Node<NodeData>;
  weight: number;
  data: EdgeData;
};

export class Graph<NodeData, EdgeData> {
  private _order = 0;
  private _size = 0;
  private nodes: Node<NodeData>[] = [];
  private linkedList: Edge<NodeData, EdgeData>[][] = [];

  get order() {
    return this._order;
  }

  get size() {
    return this._size;
  }

  static fromList(edges: [number, number, number?][]) {
    const nodes: Partial<Record<number, Node<null>>> = {};
    const graph = new Graph<null, null>();
    edges.forEach(([from, to, weight]) => {
      nodes[from] ??= { index: from, data: null };
      nodes[to] ??= { index: to, data: null };
      graph.addEdge(nodes[from], nodes[to], null, weight);
      graph.addEdge(nodes[to], nodes[from], null, weight);
    });
    return graph;
  }

  addNode(node: Node<NodeData>) {
    switch (this.getNode(node.index)) {
      case undefined:
        this._order++;
        this.nodes[node.index] = node;
        break;
      case node:
        // Do nothing if it's the same node
        break;
      default:
        throw new Error("Cannot overwrite existing node.");
    }
  }

  addEdge(
    from: Node<NodeData>,
    to: Node<NodeData>,
    data: EdgeData,
    weight = 1
  ) {
    this.addNode(from);
    this.addNode(to);
    this._size++;
    this.linkedList[from.index] ??= [];
    this.linkedList[from.index].push({ from, to, data, weight });
  }

  getNode(index: number) {
    if (index < 0) {
      fatal("Index cannot be negative when getting a node of a graph.");
    }
    return this.nodes.at(index);
  }

  edgesOf(node: Node<NodeData>) {
    return this.linkedList.at(node.index);
  }

  *iterNodes() {
    for (const node of this.nodes) {
      if (node == null) continue;
      yield node;
    }
  }
}
