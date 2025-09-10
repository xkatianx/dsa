export function* enumerate<T>(
  iter: IterableIterator<T>
): IterableIterator<[number, T]> {
  let i = 0;
  for (const value of iter) yield [i++, value];
}
