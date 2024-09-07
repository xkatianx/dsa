/** Gusfield's algorithm / Z algorithm
 *
 * `return[i]` is the maximum `k` such that `str[0..k] == str[i..i+k]`,
 * except that `return[0] == 0`
 *
 * 🚀 linear time
 *
 * 🤏 linear space
 */
export function gusfield(str: string) {
  const dp = Array.from(str).map(() => 0);
  // left: which scans to the rightmost
  // right: the rightmost - 1
  let [left, right] = [0, 0];
  for (let i = 1; i < str.length; i++) {
    // `dp[i - left]` has the result but at most `right - i + 1`
    if (i <= right) dp[i] = Math.min(right - i + 1, dp[i - left]);
    // either stop immediately or scanning new chars
    while (str[dp[i]] === (str[i + dp[i]] ?? "xx")) dp[i]++;
    // update rightmost
    if (i + dp[i] - 1 > right) [left, right] = [i, i + dp[i] - 1];
  }
  return dp;
}

/** Manacher's algorithm
 *
 * `return[i]` is the maximum `k` such that `str[i..i-k] == str[i..i+k]`
 *
 * 🚀 linear time
 *
 * 🤏 linear space
 */
export function manacher(str: string) {
  const dp = Array.from(str).map(() => 1);
  // left: which scans to the rightmost
  // right: the rightmost - 1
  let [left, right] = [0, 0];
  for (let i = 1; i < str.length; i++) {
    // `dp[left * 2 - i]` has the result but at most `right - i + 1`
    if (i <= right) dp[i] = Math.min(right - i + 1, dp[left * 2 - i]);
    // either stop immediately or scanning new chars
    while (str[i - dp[i]] === (str[i + dp[i]] ?? "xx")) dp[i]++;
    // update rightmost
    if (i + dp[i] - 1 > right) [left, right] = [i, i + dp[i] - 1];
  }
  return dp;
}
