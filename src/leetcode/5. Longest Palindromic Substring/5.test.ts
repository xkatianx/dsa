import fn from "./5";

describe("LeetCode 5", () => {
  it("should pass test case #1", () => {
    const args: Parameters<typeof fn> = ["babad"];
    const res = fn.apply(null, args);
    expect(res).toMatch(/^bab$|^aba$/);
  });
  it("should pass test case #2", () => {
    const args: Parameters<typeof fn> = ["cbbd"];
    const ans = "bb";
    const res = fn.apply(null, args);
    expect(res).toBe(ans);
  });
});
