const internalApiBaseUrl =
  process.env.INTERNAL_API_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:7344"
    : "http://host.docker.internal:7344")

export async function GET(
  request: Request,
  context: RouteContext<"/uploads/[...path]">
) {
  const { path } = await context.params
  const upstreamUrl = new URL(
    `/uploads/${path.map(encodeURIComponent).join("/")}`,
    internalApiBaseUrl
  )

  const response = await fetch(upstreamUrl, {
    headers: {
      accept: request.headers.get("accept") || "*/*",
    },
  })

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  })
}
