// https://leetcode.com/problems/reorganize-string

// 🚀 linear time
// 🤏 linear space, constant space if different language
export default function reorganizeString(s: string): string {
  const str = Array.from(s);
  const i = foo(str);

  const str2 = str.splice(i);
  str2.push(...str);
  const i2 = foo(str2);

  return i2 === s.length ? str2.join("") : "";
}

function foo(arr: string[]) {
  let left = 1;
  let right = 2;
  while (left < arr.length) {
    if (arr[left] === arr[left - 1]) {
      while (arr[right] === arr[left]) right++;
      if (right >= arr.length) break;
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
    left++;
    if (right < left) right++;
  }
  return left;
}
