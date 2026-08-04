const internalApiBaseUrl =
  process.env.INTERNAL_API_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:7344"
    : "http://host.docker.internal:7344")

async function proxy(
  request: Request,
  context: RouteContext<"/api/[...path]">
) {
  const { path } = await context.params
  const url = new URL(request.url)
  const upstreamUrl = new URL(
    `/api/${path.map(encodeURIComponent).join("/")}${url.search}`,
    internalApiBaseUrl
  )

  const response = await fetch(upstreamUrl, {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    duplex: "half",
  } as RequestInit & { duplex: "half" })

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  })
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const DELETE = proxy
