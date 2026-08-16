export function resolveAssetUrl(path: string) {
  if (!path) return path
  if (/^https?:\/\//.test(path)) return path
  return path.startsWith("/") ? path : `/${path}`
}

export function shouldBypassImageOptimization(path: string) {
  return path.startsWith("/uploads/") || /\/uploads\//.test(path)
}
