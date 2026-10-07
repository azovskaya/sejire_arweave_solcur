/**
 * Integration: seal tree → sign TX → post to Arweave (arlocal when ARLOCAL=1).
 */
import assert from "node:assert/strict";
import Arweave from "arweave";
import { createMnemonic } from "../crypto/bip39";
import { deriveKeysFromMnemonic } from "../crypto/keys";
import { emptyVault, putTree, sealVault } from "../crypto/vault";
import { createTree, upsertPersonFields } from "../treeEngine";
import { jwkFromSeed } from "./wallet";
const mem = new Map<string, string>();
(globalThis as typeof globalThis & { localStorage?: Storage }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => {
    mem.set(k, v);
  },
  removeItem: (k: string) => {
    mem.delete(k);
  },
  clear: () => mem.clear(),
  key: () => null,
  length: 0,
} as Storage;

const useLocal = process.env.ARLOCAL === "1";
const host = process.env.SEJIRE_ARWEAVE_HOST ?? "127.0.0.1";
const port = Number(process.env.SEJIRE_ARWEAVE_PORT ?? 1984);
const protocol = (process.env.SEJIRE_ARWEAVE_PROTOCOL ?? "http") as "http" | "https";

async function main() {
  if (useLocal) {
    process.env.SEJIRE_ARWEAVE_HOST = host;
    process.env.SEJIRE_ARWEAVE_PORT = String(port);
    process.env.SEJIRE_ARWEAVE_PROTOCOL = protocol;
  }

  const { publishEnvelope } = await import("./publish.js");

  const phrase = createMnemonic();
  const keys = deriveKeysFromMnemonic(phrase);
  let store = createTree("SEJIRE publish selftest");
  store = upsertPersonFields(store, { name: "Ayan", born: "1894-01-01", parents: [] });
  const vault = putTree(emptyVault(keys.vaultId), store);
  const envelope = await sealVault(keys, vault);
  assert.equal(envelope.schema, "sejire/envelope/v1");

  const jwk = await jwkFromSeed(keys.seed);
  const ar = Arweave.init({ host, port, protocol });
  const address = await ar.wallets.jwkToAddress(jwk);

  if (useLocal) {
    await ar.api.get(`mint/${address}/999999999999`);
  }

  const result = await publishEnvelope(jwk, envelope, {
    updatedAt: new Date().toISOString(),
  });

  if (useLocal) {
    assert.equal(result.ok, true, JSON.stringify(result));
    if (result.ok) {
      const status = await ar.transactions.getStatus(result.txId);
      assert.ok(
        status.status === 200 || status.status === 202,
        `unexpected status ${status.status}`
      );
      console.log("publish.selftest: OK arlocal", { txId: result.txId, address });
    }
  } else if (result.ok) {
    console.log("publish.selftest: OK mainnet post", result.txId);
  } else if (result.needsFunds) {
    console.log("publish.selftest: OK (needs AR on mainnet)", { address });
  } else {
    throw new Error(JSON.stringify(result));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
