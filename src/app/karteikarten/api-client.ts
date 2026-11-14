export class UnauthorizedError extends Error {}

/** Fetches JSON from the karteikarten API; throws UnauthorizedError on 401, Error with API message otherwise. */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/karteikarten/${path}`, {
    ...init,
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
    cache: 'no-store',
  })
  if (response.status === 401) throw new UnauthorizedError()
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error((body as { error?: string }).error ?? 'Das hat nicht geklappt.')
  return body as T
}
