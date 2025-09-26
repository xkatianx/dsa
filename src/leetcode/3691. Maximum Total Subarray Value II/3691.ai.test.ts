import { describe, it, expect } from "vitest";
import optimizedSolution from "./3691";
import naiveSolution from "./3691.ai";

describe("3691 - Compare Optimized vs Naive Solutions", () => {
  // Fixed test cases from the original problem
  const fixedTestCases = [
    {
      name: "Test case 1: [1, 3, 2], k=2",
      nums: [1, 3, 2],
      k: 2,
      expected: 4,
    },
    {
      name: "Test case 2: [4, 2, 5, 1], k=3",
      nums: [4, 2, 5, 1],
      k: 3,
      expected: 12,
    },
    {
      name: "Test case 3: [4, 2, 5, 1], k=2",
      nums: [4, 2, 5, 1],
      k: 2,
      expected: 8,
    },
    {
      name: "Test case 4: [4, 4, 4, 4, 8, 8], k=2",
      nums: [4, 4, 4, 4, 8, 8],
      k: 2,
      expected: 8,
    },
    {
      name: "Test case 5: [4, 4, 4, 4, 3, 3], k=21",
      nums: [4, 4, 4, 4, 3, 3],
      k: 21,
      expected: 8,
    },
    // Additional edge cases
    {
      name: "Single element array",
      nums: [5],
      k: 1,
      expected: 0,
    },
    {
      name: "All same elements",
      nums: [3, 3, 3, 3],
      k: 2,
      expected: 0,
    },
    {
      name: "Ascending array",
      nums: [1, 2, 3, 4, 5],
      k: 3,
    },
    {
      name: "Descending array",
      nums: [5, 4, 3, 2, 1],
      k: 3,
    },
    {
      name: "Two elements",
      nums: [10, 1],
      k: 1,
      expected: 9,
    },
    {
      name: "Two elements, k=2",
      nums: [10, 1],
      k: 2,
    },
  ];

  // Test all fixed cases
  fixedTestCases.forEach(({ name, nums, k, expected }) => {
    it(`Fixed: ${name}`, () => {
      const optimizedResult = optimizedSolution([...nums], k);
      const naiveResult = naiveSolution([...nums], k);

      if (expected !== undefined) {
        expect(optimizedResult).toBe(expected);
        expect(naiveResult).toBe(expected);
      }
      expect(optimizedResult).toBe(naiveResult);
    });
  });

  // Random test cases
  const generateRandomTestCase = (
    size: number,
    maxValue: number,
    maxK: number
  ) => {
    const nums: number[] = [];
    for (let i = 0; i < size; i++) {
      nums.push(Math.floor(Math.random() * (maxValue + 1)));
    }
    const k =
      Math.floor(Math.random() * Math.min(maxK, (size * (size + 1)) / 2)) + 1;
    return { nums, k };
  };

  // Small random test cases (fast execution)
  for (let i = 0; i < 10; i++) {
    const { nums, k } = generateRandomTestCase(5, 10, 5);
    it(`Random small case ${i + 1}: nums=${JSON.stringify(
      nums
    )}, k=${k}`, () => {
      const optimizedResult = optimizedSolution([...nums], k);
      const naiveResult = naiveSolution([...nums], k);

      expect(optimizedResult).toBe(naiveResult);
    });
  }

  // Medium random test cases
  for (let i = 0; i < 5; i++) {
    const { nums, k } = generateRandomTestCase(8, 20, 10);
    it(`Random medium case ${i + 1}: nums=${JSON.stringify(
      nums
    )}, k=${k}`, () => {
      const optimizedResult = optimizedSolution([...nums], k);
      const naiveResult = naiveSolution([...nums], k);

      expect(optimizedResult).toBe(naiveResult);
    });
  }

  // Large random test cases
  for (let i = 0; i < 10; i++) {
    const { nums, k } = generateRandomTestCase(1000, 10000, 10000);
    it(`Random large case ${i + 1}: k=${k}`, () => {
      const optimizedResult = optimizedSolution([...nums], k);
      const naiveResult = naiveSolution([...nums], k);

      expect(optimizedResult).toBe(naiveResult);
    });
  }

  // Edge case: k equals total number of subarrays
  it("Edge case: k equals total number of subarrays", () => {
    const nums = [1, 2, 3];
    const totalSubarrays = (nums.length * (nums.length + 1)) / 2; // 6
    const k = totalSubarrays;

    const optimizedResult = optimizedSolution([...nums], k);
    const naiveResult = naiveSolution([...nums], k);

    expect(optimizedResult).toBe(naiveResult);
  });

  // Edge case: k = 1
  it("Edge case: k = 1", () => {
    const nums = [5, 1, 8, 2, 9];
    const k = 1;

    const optimizedResult = optimizedSolution([...nums], k);
    const naiveResult = naiveSolution([...nums], k);

    expect(optimizedResult).toBe(naiveResult);
  });

  // Performance comparison (just to ensure both work, not timing)
  it("Performance test: larger array", () => {
    const nums = Array.from({ length: 20 }, (_, i) => i + 1);
    const k = 10;

    const optimizedResult = optimizedSolution([...nums], k);
    const naiveResult = naiveSolution([...nums], k);

    expect(optimizedResult).toBe(naiveResult);
  });
});
