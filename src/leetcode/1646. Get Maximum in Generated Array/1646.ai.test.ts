import fn from "./1646";
import ai from "./1646.ai";

describe("LeetCode 1646 - full", () => {
  const stop = 1000;
  it(`test n from 0 to ${stop}`, () => {
    let startTime = performance.now();
    const res = Array.from({ length: stop + 1 }, (_, i) => fn(i));
    let endTime = performance.now();
    const timeTakenMY = endTime - startTime;

    startTime = performance.now();
    const ans = Array.from({ length: stop + 1 }, (_, i) => ai(i));
    endTime = performance.now();
    const timeTakenAI = endTime - startTime;

    console.log(
      `[MY] Time taken: ${timeTakenMY.toFixed(3)} ms\n` +
        `[AI] Time taken: ${timeTakenAI.toFixed(3)} ms`
    );

    expect(res).toEqual(ans);
  });
});
