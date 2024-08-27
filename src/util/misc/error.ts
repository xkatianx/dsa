export function fatal(message: string): never {
  throw new Error(message);
}
