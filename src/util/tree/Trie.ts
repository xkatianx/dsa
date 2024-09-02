type TrieObj = {
  count?: number;
} & {
  [c: string]: TrieObj | undefined;
};

export class Trie {
  dict: TrieObj = {};
  add(s: string) {
    let obj = this.dict;
    Array.from(s).forEach((c) => {
      obj[c] ??= {} as TrieObj;
      obj = obj[c] as TrieObj;
    });
    obj.count ??= 0;
    obj.count++;
  }
}
