import { randomInt } from "crypto";
import fn from "./2126";
import ai from "./2126.ai";

describe("LeetCode 2126 - random", () => {
  it("random test cases x100", () => {
    for (let i = 0; i < 100; i++) {
      const mass = randomInt(1, 1e5);
      const length = randomInt(1, 1e5);
      const asteroids = Array.from({ length }, () => randomInt(1, 1e5));
      expect(fn(mass, asteroids)).toBe(ai(mass, asteroids));
    }
  });
});
