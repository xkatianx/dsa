import { EZDiGraph } from "./easyDiGraph";

describe("EZDiGraph", () => {
  let graph: EZDiGraph;

  beforeEach(() => {
    graph = new EZDiGraph();
  });

  test("addNode should add a node to the graph", () => {
    graph.addNode(1);
    expect(graph.getOutNeighbors(1)).toBeUndefined(); // No neighbors
  });

  test("addEdge should add directed edges between nodes", () => {
    graph.addEdge(1, 2).addEdge(2, 3);
    expect(graph.getOutNeighbors(1)).toContain(2);
    expect(graph.getOutNeighbors(2)).toContain(3);
  });

  test("removeEdge should remove a specific edge", () => {
    graph.addEdge(1, 2).addEdge(2, 3);
    graph.removeEdge(1, 2);
    expect(graph.getOutNeighbors(1)).not.toContain(2);
  });

  test("removeNode should remove a node and its associated edges", () => {
    graph.addEdge(1, 2).addEdge(2, 3);
    graph.removeNode(2);
    expect(graph.getOutNeighbors(1)).not.toContain(2);
    expect(graph.getOutNeighbors(2)).toBeUndefined();
  });

  test("toList should return a list of all edges", () => {
    graph.addEdge(1, 2).addEdge(2, 3);
    expect(graph.toList()).toEqual([
      [1, 2],
      [2, 3],
    ]);
  });

  test("fromList should initialize graph with edges", () => {
    const edges: [number, number][] = [
      [1, 2],
      [2, 3],
      [3, 4],
    ];
    const newGraph = EZDiGraph.fromList(edges);
    expect(newGraph.toList()).toEqual(edges);
  });

  test("clone should return a deep copy of the graph", () => {
    graph.addEdge(1, 2).addEdge(2, 3);
    const clonedGraph = graph.clone();
    expect(clonedGraph.toList()).toEqual(graph.toList());
    clonedGraph.addEdge(3, 4);
    expect(graph.toList()).not.toContain([3, 4]); // Original graph unchanged
  });

  test("bfs should return nodes in breadth-first order", () => {
    graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4).addEdge(3, 5);
    const bfsOrder = graph.bfs(1);
    expect(bfsOrder).toEqual([1, 2, 3, 4, 5]);
  });

  test("dfs should return nodes in depth-first order", () => {
    graph.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4).addEdge(3, 5);
    const dfsOrder = graph.dfs(1);
    expect(dfsOrder).toEqual([1, 3, 5, 2, 4]);
  });

  test("toUndirected should convert the graph to an undirected graph", () => {
    graph.addEdge(1, 2).addEdge(3, 4);
    graph.toUndirected();
    expect(graph.getOutNeighbors(2)).toContain(1);
    expect(graph.getOutNeighbors(4)).toContain(3);
  });
});
