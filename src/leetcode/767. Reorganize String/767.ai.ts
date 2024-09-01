export default function rearrangeString(s: string): string {
  const charCount: { [key: string]: number } = {};

  // Step 1: Count the frequency of each character
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Step 2: Create a max-heap based on character frequency
  const maxHeap: [string, number][] = Object.entries(charCount).sort(
    (a, b) => b[1] - a[1]
  );

  let result = "";
  let prev: [string, number] | null = null;

  // Step 3: Build the result string
  while (maxHeap.length > 0) {
    const [char, count] = maxHeap.shift()!;

    result += char;

    // If there was a previous character with remaining count, push it back to the heap
    if (prev && prev[1] > 0) {
      maxHeap.push(prev);
      maxHeap.sort((a, b) => b[1] - a[1]); // Re-sort the heap after adding the previous character
    }

    // Update the previous character
    prev = [char, count - 1];
  }

  // Step 4: Check if the result is valid
  if (result.length !== s.length) {
    return "";
  }

  return result;
}
