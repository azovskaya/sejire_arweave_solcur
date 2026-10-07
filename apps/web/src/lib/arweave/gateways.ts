/**
 * Public Arweave gateways. Kazakhstan and some office networks block a single
 * host; restore/publish must walk the list instead of dying on arweave.net.
 */

import {
  getArweaveHosts,
  getDataGateways,
  getGraphqlEndpoints,
} from "./env";

/** Resolved at call time so tests can set SEJIRE_ARWEAVE_* before publish. */
export function listGraphqlEndpoints(): readonly string[] {
  return getGraphqlEndpoints();
}

export function listDataGateways(): readonly string[] {
  return getDataGateways();
}

/** Hosts for the official `arweave` JS client (create / sign / post / balance). */
export function listArweaveHosts(): readonly string[] {
  return getArweaveHosts();
}

export const GATEWAY_TIMEOUT_MS = 12_000;

export const GATEWAY_DOWN_RU =
  "Сеть Arweave недоступна (шлюзы не ответили). Проверьте интернет и попробуйте снова.";

export class GatewayUnavailableError extends Error {
  readonly lastStatus: number | null;
  constructor(message = GATEWAY_DOWN_RU, lastStatus: number | null = null) {
    super(message);
    this.name = "GatewayUnavailableError";
    this.lastStatus = lastStatus;
  }
}

export function isGatewayUnavailable(e: unknown): boolean {
  return e instanceof GatewayUnavailableError;
}

export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  ms = GATEWAY_TIMEOUT_MS
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

type GqlBody<T> = { data?: T; errors?: unknown };

/**
 * POST GraphQL to the first gateway that returns `data` without `errors`.
 * Empty `edges` is success (vault simply has no versions).
 */
export async function graphqlQuery<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  let lastStatus: number | null = null;
  for (const url of listGraphqlEndpoints()) {
    try {
      const res = await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ query, variables }),
      });
      lastStatus = res.status;
      if (!res.ok) continue;
      const body = (await res.json()) as GqlBody<T>;
      if (body.errors || body.data == null) continue;
      return body.data;
    } catch {
      /* timeout, DNS, CORS — try the next host */
    }
  }
  throw new GatewayUnavailableError(GATEWAY_DOWN_RU, lastStatus);
}

/**
 * Download TX JSON from the first data gateway that returns 200.
 * 404 on a live gateway means the TX is not there — returns null.
 * Only throws when every host failed at the network layer.
 */
export async function fetchTxJson(txId: string): Promise<unknown | null> {
  const id = encodeURIComponent(txId);
  let sawHttp = false;
  for (const base of listDataGateways()) {
    try {
      const res = await fetchWithTimeout(`${base}/${id}`);
      sawHttp = true;
      if (res.status === 404) continue;
      if (!res.ok) continue;
      return await res.json();
    } catch {
      /* next host */
    }
  }
  if (!sawHttp) throw new GatewayUnavailableError(GATEWAY_DOWN_RU);
  return null;
}
