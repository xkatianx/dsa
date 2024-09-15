import { speedTest } from "../../jest.test";
import fn from "./1646";
import ai from "./1646.ai";

describe("LeetCode 1646 - full", () => {
  const stop = 1000;
  it(`test n from 0 to ${stop}`, () => {
    console.log("FN1: MY, FN2: AI");
    const { res1, res2 } = speedTest(
      () => Array.from({ length: stop + 1 }, (_, i) => fn(i)),
      () => Array.from({ length: stop + 1 }, (_, i) => ai(i))
    );
    expect(res1).toEqual(res2);
  });
});
