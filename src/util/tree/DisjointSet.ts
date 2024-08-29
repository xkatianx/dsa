/** amortized O(α(n)) time, O(n) space */
export class DisjointSet {
  private parent: DisjointSet = this;
  private rank = 0;

  get isRoot() {
    return this.parent === this;
  }

  // Find the root representative of the set this element belongs to
  find(): DisjointSet {
    // Path compression: point directly to the root
    if (!this.isRoot) this.parent = this.parent.find();
    return this.parent;
  }

  // Union this set with another set
  union(other: DisjointSet): void {
    const rootThis = this.find();
    const rootOther = other.find();

    if (rootThis !== rootOther) {
      // Union by rank
      if (rootThis.rank > rootOther.rank) {
        rootOther.parent = rootThis;
      } else if (rootThis.rank < rootOther.rank) {
        rootThis.parent = rootOther;
      } else {
        rootOther.parent = rootThis;
        rootThis.rank++;
      }
    }
  }

  // Check if two sets are connected
  isConnecting(other: DisjointSet): boolean {
    return this.find() === other.find();
  }
}
