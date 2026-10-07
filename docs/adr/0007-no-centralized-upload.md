# ADR-0007: No centralized upload or payment middlemen

Status: **Accepted** (sejire_arweave_solcur)  
Date: 2026-10-07

## Context

Hackathon notes suggested Turbo (ArDrive payment + bundler) so a Solana wallet could fund Arweave uploads in one click. Turbo is a third-party service: credit balance, payment API, upload endpoint, and settlement lag that is not native Arweave consensus.

SEJIRE’s goal is a decentralized, durable fabric of family history. Critical path must not depend on a company API, sponsored cashier, or bundler account.

## Decision

1. **Vault publish = Arweave L1.** Client builds a native transaction, signs it, posts to public gateways. Existing `publishEnvelope` path stays canonical.
2. **Protocol logic = AO processes.** Tree / Factory Lua remain the on-chain normative surface.
3. **No Turbo / Irys / similar in the product path.** Do not add `@ardrive/turbo-sdk` or equivalent for user vault uploads.
4. **No required fiat cashier.** `apps/sponsor` may remain as optional research code; it is not required to save or restore a vault.
5. **Solana, if used, is not a upload proxy.** Allowed roles later: user-signed receipt / pointer (e.g. vault id + Arweave tx id) or pure payment between peers — never “pay SOL → black box uploads ciphertext.”
6. **Keys stay local.** 12 words encrypt and derive the Arweave signer; they never go to a sponsor, Turbo, or Solana memo.

## Consequences

- Users (or a relative who funds the derived AR address) pay Arweave endowment in AR. UX must stay honest about funding and confirmation.
- Bundled “instant” UX is sacrificed for verifiability and independence.
- Gateways are interchangeable; failure is retried across the public set already in `gateways.ts`.
- ADR-0006 (fiat + Turbo treasury) is **superseded for this fork’s default product path**; keep docs for historical Kaspi experiments only.
