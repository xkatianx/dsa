export class EZDiGraph {
  private nodes: Set<number> = new Set();
  private linkedList: Map<number, Set<number>> = new Map();

  static fromList(edges: [number, number][]) {
    const graph = new EZDiGraph();
    edges.forEach(([from, to]) => {
      graph.addEdge(from, to);
    });
    return graph;
  }

  toList(): [number, number][] {
    const edges: [number, number][] = [];
    this.linkedList.forEach((neighbors, from) => {
      neighbors.forEach((to) => {
        edges.push([from, to]);
      });
    });
    return edges;
  }

  addNode(node: number) {
    this.nodes.add(node);
    return this;
  }

  addEdge(from: number, to: number) {
    this.addNode(from);
    this.addNode(to);
    if (!this.linkedList.has(from)) this.linkedList.set(from, new Set());
    this.getOutNeighbors(from)!.add(to);
    return this;
  }

  removeEdge(from: number, to: number) {
    if (this.linkedList.has(from)) {
      this.linkedList.get(from)!.delete(to);
    }
    return this;
  }

  removeNode(node: number) {
    this.nodes.delete(node);
    this.linkedList.delete(node);
    this.linkedList.forEach((neighbors) => {
      neighbors.delete(node);
    });
    return this;
  }

  getOutNeighbors(from: number) {
    return this.linkedList.get(from);
  }

  toUndirected() {
    this.toList().forEach(([from, to]) => {
      this.addEdge(to, from);
    });
    return this;
  }

  clone() {
    const graph = EZDiGraph.fromList(this.toList());
    this.nodes.forEach((n) => graph.addNode(n));
    return graph;
  }

  bfs(root: number): number[] {
    const seenSet = new Set([root]);
    const seen = [root];
    for (let i = 0; i < seen.length; i++) {
      const node = seen[i];
      this.getOutNeighbors(node)?.forEach((neighbor) => {
        if (!seenSet.has(neighbor)) {
          seenSet.add(neighbor);
          seen.push(neighbor);
        }
      });
    }
    return seen;
  }

  dfs(root: number): number[] {
    const seenSet = new Set<number>();
    const seen: number[] = [];
    const stack: number[][] = [[root]];

    while (stack.length > 0) {
      const nodes = stack.pop()!;
      const node = nodes.pop()!;
      if (nodes.length > 0) stack.push(nodes);
      if (seenSet.has(node)) continue;
      seenSet.add(node);
      seen.push(node);
      const neighbors = this.getOutNeighbors(node);
      if (neighbors != null) stack.push(Array.from(neighbors));
    }

    return seen;
  }
}
