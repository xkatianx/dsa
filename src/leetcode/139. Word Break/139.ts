// https://leetcode.com/problems/word-break

import { Trie } from "../../util/tree/Trie";

// Trie, DP
// O(n^2 + m) time
// linear space
export default function wordBreak(s: string, wordDict: string[]): boolean {
  const trie = new Trie();
  wordDict.forEach((v) => trie.add(v));

  const check = Array.from(s).map((_, i) => i === 0);
  check.push(false);
  Array.from(s).forEach((c, i) => {
    if (!check[i]) return;
    let obj = trie.dict[c];
    while (obj != null) {
      if (++i >= check.length) break;
      if ((obj.count ?? 0) > 0) check[i] = true;
      obj = obj[s[i]];
    }
  });
  return check.at(-1)!;
}
