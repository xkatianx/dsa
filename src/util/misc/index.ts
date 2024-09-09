export function defaultCompare(a: number, b: number) {
  return a - b;
}

/** Like `Object.entries` but filter out nulls. */
export function entries<T extends string | number | symbol, U>(
  obj: Record<T, U>
) {
  return Object.entries(obj).filter(
    (kv): kv is [string, NonNullable<U>] => kv[1] != null
  );
}

/** Iter from 0 to `n`-1 */
export function* iter(n: number) {
  for (let i = 0; i < n; i++) yield i;
}

/** An array from 0 to `n`-1 */
export function range(n: number) {
  return Array.from(iter(n));
}

export function sum(arr?: number[]) {
  return arr?.reduce((a, b) => a + b) ?? 0;
}
