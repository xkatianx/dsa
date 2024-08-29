export function fatal(message: string): never {
  throw new Error(message);
}

export function unreachable(): never {
  fatal("Unreachable!");
}
