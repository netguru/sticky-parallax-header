export function isNotEmpty<T>(item: T | null): item is T {
  return item !== null;
}
