// Public files need an explicit prefix when the site lives under a Pages repository path.
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
