/**
 * Optional override for Arweave gateway (mainnet default).
 * Local: VITE_ARWEAVE_HOST=127.0.0.1 VITE_ARWEAVE_PORT=1984 VITE_ARWEAVE_PROTOCOL=http
 * Node tests: SEJIRE_ARWEAVE_* mirrors the same names.
 */

export type ArweaveEndpoint = {
  host: string;
  port: number;
  protocol: "http" | "https";
};

function readEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env[key]) {
    return process.env[key];
  }
  try {
    const meta = import.meta as ImportMeta & { env?: Record<string, string | undefined> };
    return meta.env?.[key];
  } catch {
    return undefined;
  }
}

export function getArweaveEndpoint(): ArweaveEndpoint {
  const host =
    readEnv("SEJIRE_ARWEAVE_HOST") ??
    readEnv("VITE_ARWEAVE_HOST") ??
    "arweave.net";
  const portRaw =
    readEnv("SEJIRE_ARWEAVE_PORT") ?? readEnv("VITE_ARWEAVE_PORT");
  const protocolRaw =
    readEnv("SEJIRE_ARWEAVE_PROTOCOL") ?? readEnv("VITE_ARWEAVE_PROTOCOL");

  const isLocal = host === "127.0.0.1" || host === "localhost";
  const protocol =
    (protocolRaw as "http" | "https" | undefined) ??
    (isLocal ? "http" : "https");
  const port = portRaw ? Number(portRaw) : protocol === "http" ? 1984 : 443;

  return { host, port, protocol };
}

export function getArweaveHosts(): readonly string[] {
  const list = readEnv("SEJIRE_ARWEAVE_HOSTS") ?? readEnv("VITE_ARWEAVE_HOSTS");
  if (list) return list.split(",").map((h) => h.trim()).filter(Boolean);
  const { host } = getArweaveEndpoint();
  if (host !== "arweave.net") return [host];
  return ["arweave.net", "ar-io.net", "g8way.io"];
}

export function getDataGateways(): readonly string[] {
  const { host, port, protocol } = getArweaveEndpoint();
  if (host !== "arweave.net" && host !== "ar-io.net" && host !== "g8way.io") {
    const base = `${protocol}://${host}${port === 80 || port === 443 ? "" : `:${port}`}`;
    return [base];
  }
  return ["https://arweave.net", "https://ar-io.net", "https://g8way.io"];
}

export function getGraphqlEndpoints(): readonly string[] {
  const { host, port, protocol } = getArweaveEndpoint();
  if (host !== "arweave.net") {
    const base = `${protocol}://${host}${port === 80 || port === 443 ? "" : `:${port}`}`;
    return [`${base}/graphql`];
  }
  return [
    "https://arweave.net/graphql",
    "https://arweave-search.goldsky.com/graphql",
    "https://ar-io.dev/graphql",
  ];
}
