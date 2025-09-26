import { describe, test, expect } from "vitest";
import minEarnings from "./1";
import { cache } from "../../util/misc";

function solve(arr: number[]): number {
  if ((arr.length & 1) === 0) arr.push(0);
  const n = arr.length;

  const foo = cache((lastIndexEven: number, noPick: number) => {
    if (lastIndexEven === 0) return 0;
    if (lastIndexEven - 1 > noPick)
      return (
        foo(lastIndexEven - 2, noPick) +
        Math.max(arr[lastIndexEven]!, arr[lastIndexEven - 1]!)
      );

    const pick = (noPick & 1) === 0 ? noPick - 1 : noPick + 1;
    let min = Infinity;
    for (let i = 0; i < Math.min(noPick, pick); i++) {
      min = Math.min(
        min,
        foo(lastIndexEven - 2, i) + Math.max(arr[pick]!, arr[i]!)
      );
    }
    return min;
  });

  let ans = Infinity;
  for (let i = 0; i < n; i++) {
    for (let j = i + (i & 1); j < n; j += 2) {
      const res = foo(j, i);
      if (j === n - 1) ans = Math.min(ans, res + arr[i]!);
    }
  }
  return ans;
}

describe("Buy One Get One Free", () => {
  // Basic test cases
  test("Example from problem description", () => {
    expect(minEarnings([9, 5, 7, 8, 6])).toBe(22);
  });

  test("Single element array", () => {
    expect(minEarnings([5])).toBe(5);
  });

  test("Two elements array", () => {
    expect(minEarnings([3, 7])).toBe(7);
  });

  test("Three elements array", () => {
    expect(minEarnings([1, 2, 3])).toBe(4);
  });

  // Edge cases
  test("Empty array", () => {
    expect(minEarnings([])).toBe(0);
  });

  test("All same elements", () => {
    expect(minEarnings([5, 5, 5, 5])).toBe(10);
  });

  test("Ascending order", () => {
    expect(minEarnings([1, 2, 3, 4, 5])).toBe(9);
  });

  test("Descending order", () => {
    expect(minEarnings([5, 4, 3, 2, 1])).toBe(9);
  });

  // Complex test cases
  test("Large array with mixed values", () => {
    expect(minEarnings([10, 1, 8, 2, 7, 3, 6, 4, 5])).toBe(27);
  });

  test("Array with duplicates", () => {
    expect(minEarnings([3, 1, 3, 2, 3])).toBe(7);
  });

  test("Array with very large numbers", () => {
    expect(minEarnings([1000000, 1, 999999])).toBe(1000001);
  });

  test("Array with small numbers", () => {
    expect(minEarnings([1, 1, 1, 1, 1])).toBe(3);
  });

  // Test cases that might reveal edge cases in the algorithm
  test("Even length array", () => {
    expect(minEarnings([2, 4, 6, 8])).toBe(12);
  });

  test("Odd length array", () => {
    expect(minEarnings([1, 3, 5, 7, 9])).toBe(15);
  });

  test("Array with one very large element", () => {
    expect(minEarnings([1, 2, 100])).toBe(101);
  });

  test("Array with alternating pattern", () => {
    expect(minEarnings([1, 10, 1, 10, 1])).toBe(12);
  });

  // Additional edge cases
  test("Minimum constraints", () => {
    expect(minEarnings([1])).toBe(1);
  });

  test("Two identical elements", () => {
    expect(minEarnings([5, 5])).toBe(5);
  });

  test("Three identical elements", () => {
    expect(minEarnings([3, 3, 3])).toBe(6);
  });

  test("Array with zeros (edge case)", () => {
    expect(minEarnings([0, 1, 2])).toBe(2);
  });

  test("Large array test", () => {
    const input = Array.from({ length: 20 }, (_, i) => i + 1);
    expect(minEarnings([...input])).toBe(solve([...input]));
  });

  // Additional comprehensive test cases
  test("Fixed test case 1", () => {
    expect(minEarnings([7, 3, 9, 1, 5, 8, 2, 6, 4])).toBe(28);
  });

  test("Fixed test case 2", () => {
    expect(minEarnings([12, 5, 8, 3, 15, 7, 2, 9, 11, 4])).toBe(44);
  });

  test("Array with very small positive numbers", () => {
    expect(minEarnings([1, 2, 1, 2, 1, 2])).toBe(5);
  });

  test("Array with large gaps", () => {
    expect(minEarnings([1, 1000, 2, 2000, 3])).toBe(2005);
  });

  // Random test cases
  describe("Random test cases", () => {
    const generateRandomArray = (
      length: number,
      min: number = 1,
      max: number = 1000
    ): number[] => {
      return Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    };

    const runRandomTest = (testName: string, input: number[]) => {
      test(testName, () => {
        expect(minEarnings([...input])).toBe(solve([...input]));
      });
    };

    // Generate 10 random test cases with different characteristics
    for (let i = 0; i < 10; i++) {
      const length = Math.floor(Math.random() * 15) + 1; // 1-15 elements
      const input = generateRandomArray(length);
      runRandomTest(`Random test ${i + 1} (length: ${length})`, input);
    }

    // Test cases with specific patterns
    test("Random small numbers (1-10)", () => {
      const input = generateRandomArray(1000, 1, 10);
      expect(minEarnings([...input])).toBe(solve([...input]));
    });

    test("Random large numbers (1000-10000)", () => {
      const input = generateRandomArray(1000, 1000, 10000);
      expect(minEarnings([...input])).toBe(solve([...input]));
    });

    test("Random mixed range (1-10000)", () => {
      const input = generateRandomArray(1000, 1, 10000);
      expect(minEarnings([...input])).toBe(solve([...input]));
    });

    test("Random array with alternating high-low values", () => {
      const input: number[] = [];
      for (let i = 0; i < 100; i++) {
        if (i % 2 === 0) {
          input.push(Math.floor(Math.random() * 10) + 1); // 1-10
        } else {
          input.push(Math.floor(Math.random() * 1000) + 100); // 100-1099
        }
      }
      expect(minEarnings([...input])).toBe(solve([...input]));
    });

    test("Random array with all same values", () => {
      const value = Math.floor(Math.random() * 100) + 1;
      const input = Array(100).fill(value);
      expect(minEarnings([...input])).toBe(solve([...input]));
    });
  });
});

function* rng(seed: number) {
  let state = BigInt(seed);
  const a = 1103515245n;
  const c = 12345n;
  const m = 2n ** 32n;

  while (true) {
    state = (a * state + c) % m;
    yield Number(state);
  }
}

function rng2(seed: number, length: number, min: number, max: number) {
  const gen = rng(seed);
  return Array.from(
    { length },
    () => Math.floor(gen.next().value! % (max - min + 1)) + min
  );
}

test("fixed rng test #1", () => {
  const arr = rng2(9999, 99999, 1, 2147483646);
  expect(minEarnings([...arr])).toBe(59279096403998);
});
