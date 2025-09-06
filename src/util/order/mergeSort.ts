export function* mergeSort<T>(
  arr1: IterableIterator<T>,
  arr2: IterableIterator<T>,
  compare: (a: T, b: T) => number
) {
  let v1 = arr1.next();
  let v2 = arr2.next();
  while (!v1.done && !v2.done) {
    const res = compare(v1.value, v2.value);
    if (res <= 0) {
      yield v1.value;
      v1 = arr1.next();
    } else {
      yield v2.value;
      v2 = arr2.next();
    }
  }
  while (!v1.done) {
    yield v1.value;
    v1 = arr1.next();
  }
  while (!v2.done) {
    yield v2.value;
    v2 = arr2.next();
  }
}
