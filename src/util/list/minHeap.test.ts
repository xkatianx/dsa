import { MinHeap } from "./minHeap";

describe("MinHeap", () => {
  let heap: MinHeap<number>;

  beforeEach(() => {
    // A min-heap where the smallest number has the highest priority
    heap = new MinHeap<number>((a, b) => a - b);
  });

  it("should initialize correctly", () => {
    expect(heap.length).toBe(0);
    expect(heap.first).toBeUndefined();
  });

  it("should push elements correctly", () => {
    heap.push(10);
    expect(heap.length).toBe(1);
    expect(heap.first).toBe(10);

    heap.push(5);
    expect(heap.length).toBe(2);
    expect(heap.first).toBe(5);

    heap.push(20);
    expect(heap.length).toBe(3);
    expect(heap.first).toBe(5);

    heap.push(1);
    expect(heap.length).toBe(4);
    expect(heap.first).toBe(1);
  });

  it("should pop elements correctly", () => {
    heap.push(10);
    heap.push(5);
    heap.push(20);
    heap.push(1);

    expect(heap.pop()).toBe(1);
    expect(heap.length).toBe(3);
    expect(heap.first).toBe(5);

    expect(heap.pop()).toBe(5);
    expect(heap.length).toBe(2);
    expect(heap.first).toBe(10);

    expect(heap.pop()).toBe(10);
    expect(heap.length).toBe(1);
    expect(heap.first).toBe(20);

    expect(heap.pop()).toBe(20);
    expect(heap.length).toBe(0);
    expect(heap.first).toBeUndefined();
  });

  it("should handle popping from an empty heap gracefully", () => {
    expect(heap.pop()).toBeUndefined();
    expect(heap.length).toBe(0);
  });

  it("should maintain heap property after multiple push and pop operations", () => {
    heap.push(10);
    heap.push(15);
    heap.push(5);
    heap.push(20);
    heap.push(3);

    expect(heap.pop()).toBe(3);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBe(10);
    expect(heap.pop()).toBe(15);
    expect(heap.pop()).toBe(20);
    expect(heap.pop()).toBeUndefined();
  });
});
