export * from "./iter";
export * from "./error";

export function defaultCompare(a: number, b: number) {
  return a - b;
}

export function sum(arr?: number[]) {
  return arr?.reduce((a, b) => a + b) ?? 0;
}
