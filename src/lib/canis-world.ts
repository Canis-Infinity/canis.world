import { fallbackCanisWorld } from "@/lib/canis-world-fallback"
import type { CanisWorldData } from "@/lib/canis-world-types"

const internalApiBaseUrl =
  process.env.INTERNAL_API_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:7344"
    : "http://host.docker.internal:7344")

export async function getCanisWorld(): Promise<CanisWorldData> {
  try {
    const response = await fetch(`${internalApiBaseUrl}/api/canis-world`, {
      cache: "no-store",
    })
    if (!response.ok) return fallbackCanisWorld

    const result = await response.json()
    const data = result.data || fallbackCanisWorld

    return {
      status: { ...fallbackCanisWorld.status, ...(data.status || {}) },
      profile: { ...fallbackCanisWorld.profile, ...(data.profile || {}) },
      content: { ...fallbackCanisWorld.content, ...(data.content || {}) },
      faqs: Array.isArray(data.faqs) ? data.faqs : fallbackCanisWorld.faqs,
      featureCards: Array.isArray(data.featureCards)
        ? data.featureCards
        : fallbackCanisWorld.featureCards,
      footer: { ...fallbackCanisWorld.footer, ...(data.footer || {}) },
      entries: data.entries?.length ? data.entries : fallbackCanisWorld.entries,
    }
  } catch {
    return fallbackCanisWorld
  }
}
