export * from "./iter";
export * from "./error";
export * from "./math";

export function defaultCompare(a: number, b: number) {
  return a - b;
}

export function cache<T extends (...args: any[]) => unknown>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  return (...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result as ReturnType<T>);
    return result as ReturnType<T>;
  };
}
