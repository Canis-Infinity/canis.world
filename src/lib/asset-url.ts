export function resolveAssetUrl(path: string) {
  if (!path) return path
  if (/^https?:\/\//.test(path)) return path
  return path.startsWith("/") ? path : `/${path}`
}
