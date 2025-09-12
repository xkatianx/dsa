export function* enumerate<T>(
  iter: IterableIterator<T>
): IterableIterator<[number, T]> {
  let i = 0;
  for (const value of iter) yield [i++, value];
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
