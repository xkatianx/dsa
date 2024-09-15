import { randomInt } from "crypto";
import fn from "./1833";
import ai from "./1833.ai";
import { speedTest } from "../../jest.test";

describe("LeetCode 1833 - random test", () => {
  function randomInput(): Parameters<typeof fn> {
    const n = randomInt(1, 1e5);
    const costs = Array.from({ length: n }, () => randomInt(1, 1e5));
    const coins = randomInt(1, 1e8);
    return [costs, coins];
  }

  it("should pass 100 random test", () => {
    const inputs = Array.from({ length: 100 }, randomInput);
    console.log("FN1: MY, FN2: AI");
    const { res1, res2 } = speedTest(
      () => inputs.map((i) => fn.apply(null, i)),
      () => inputs.map((i) => ai.apply(null, i))
    );
    expect(res1).toEqual(res2);
  });
});
