import fn from "./139";

describe("LeetCode 139", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = ["leetcode", ["leet", "code"]];
    const ans = true;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = ["applepenapple", ["apple", "pen"]];
    const ans = true;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
  it("should pass test case #3", () => {
    const args: Parameters<typeof fn> = [
      "catsandog",
      ["cats", "dog", "sand", "and", "cat"],
    ];
    const ans = false;
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
