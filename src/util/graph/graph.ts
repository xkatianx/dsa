import { fatal } from "../misc/error";

export type Node<NodeData> = {
  index: number;
  data: NodeData;
};

export type Edge<NodeData, EdgeData> = {
  from: Node<NodeData>;
  to: Node<NodeData>;
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

  addEdge(from: Node<NodeData>, to: Node<NodeData>, data: EdgeData) {
    this.addNode(from);
    this.addNode(to);
    this._size++;
    this.linkedList[from.index] ??= [];
    this.linkedList[from.index].push({ from, to, data });
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
}
