// https://leetcode.com/problems/count-unguarded-cells-in-the-grid

import { RedBlackTree } from "../../util/tree/RedBlackTree";

type Horizontal = {
  r: number;
  s: number;
  g: number;
};
type Vertical = {
  c: number;
  s: number;
  g: number;
};

// Shamos–Hoey algorithm, BST
// O(n log n) time
// linear space
export default function countUnguarded(
  height: number,
  width: number,
  guards: number[][],
  walls: number[][]
): number {
  type Data = {
    r: number;
    c: number;
    wall: boolean;
  };
  const objs: Data[] = [];
  guards.forEach(([r, c]) => void objs.push({ r, c, wall: false }));
  walls.forEach(([r, c]) => void objs.push({ r, c, wall: true }));

  objs.sort((a, b) => {
    if (a.r !== b.r) return a.r - b.r;
    return a.c - b.c;
  });
  const horizontal: Horizontal[] = [];
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    if (obj.wall) continue;
    const r = obj.r;
    const s = objs[i - 1]?.r === r ? objs[i - 1].c + 1 : 0;
    if (horizontal.at(-1)?.r !== r || horizontal.at(-1)?.s !== s) {
      if (s < obj.c) horizontal.push({ r, s, g: obj.c - 1 });
    }
    const g = objs[i + 1]?.r === r ? objs[i + 1].c - 1 : width - 1;
    if (obj.c < g) horizontal.push({ r, s: obj.c + 1, g });
  }

  objs.sort((a, b) => {
    if (a.c !== b.c) return a.c - b.c;
    return a.r - b.r;
  });
  const vertical: Vertical[] = [];
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    if (obj.wall) continue;
    const c = obj.c;
    const s = objs[i - 1]?.c === c ? objs[i - 1].r + 1 : 0;
    if (vertical.at(-1)?.c !== c || vertical.at(-1)?.s !== s) {
      if (s < obj.r) vertical.push({ c, s, g: obj.r - 1 });
    }
    const g = objs[i + 1]?.c === c ? objs[i + 1].r - 1 : height - 1;
    if (obj.r < g) vertical.push({ c, s: obj.r + 1, g });
  }

  let ans = height * width - objs.length;
  vertical.forEach((v) => {
    ans -= v.g - v.s + 1;
  });
  horizontal.forEach((h) => {
    ans -= h.g - h.s + 1;
  });

  /** brute force: O(n^2) time */
  // vertical.forEach((v) => {
  //   horizontal.forEach((h) => {
  //     if (h.s > v.c) return;
  //     if (h.g < v.c) return;
  //     if (v.s > h.r) return;
  //     if (v.g < h.r) return;
  //     ans += 1;
  //   });
  // });

  /** modification of Shamos–Hoey algorithm: O(n log n) time */
  ans += countIntersections(vertical, horizontal);

  return ans;
}

// Shamos–Hoey algorithm, BST
// O(n log n) time
// linear space
function countIntersections(vertical: Vertical[], horizontal: Horizontal[]) {
  enum EventType {
    START = 0,
    VERTICAL = 1,
    END = 2,
  }
  type Event = {
    c: number;
    idx: number;
    r1: number;
    r2?: number;
    type: EventType;
  };

  const events: Event[] = [];
  horizontal.forEach(({ r, s, g }, idx) => {
    events.push(
      { c: s, idx, r1: r, type: EventType.START },
      { c: g, idx, r1: r, type: EventType.END }
    );
  });
  vertical.forEach(({ c, s, g }) => {
    events.push({ c, idx: -1, r1: s, r2: g, type: EventType.VERTICAL });
  });

  type Data = {
    idx: number;
    r: number;
  };
  const tree = new RedBlackTree<Data>((a, b) => {
    return a.r - b.r || a.idx - b.idx;
  });
  let ans = 0;

  events
    .sort((a, b) => {
      return a.c - b.c || a.type - b.type;
    })
    .forEach((event) => {
      switch (event.type) {
        case EventType.START:
          tree.insert({ idx: event.idx, r: event.r1 });
          break;
        case EventType.END:
          tree.delete({ idx: event.idx, r: event.r1 });
          break;
        case EventType.VERTICAL:
          const left = tree.rank({ idx: -1, r: event.r1 }).small;
          const right = tree.rank({ idx: Infinity, r: event.r2! }).small;
          ans += right - left;
      }
    });
  return ans;
}
