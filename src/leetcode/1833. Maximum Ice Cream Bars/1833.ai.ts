export default function maxIceCream(costs: number[], coins: number): number {
  // Sort the array to buy cheaper ice creams first
  costs.sort((a, b) => a - b);

  let count = 0;
  let remainingCoins = coins;

  // Iterate through the sorted array and buy as many as possible
  for (let cost of costs) {
    if (remainingCoins >= cost) {
      remainingCoins -= cost;
      count++;
    } else {
      break; // Stop if we can't afford the next ice cream
    }
  }

  return count; // Return the number of ice creams bought
}
