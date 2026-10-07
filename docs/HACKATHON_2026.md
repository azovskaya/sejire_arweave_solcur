# SEJIRE — hackathon notes (aligned with product)

Updated: **2026-10-07** (sejire_arweave_solcur).  
Supersedes the earlier Turbo/SOL payment spike draft.

## Provenance (disclose in any application)

This repository continues an existing SEJIRE product; it was not built from scratch for one contest.

- Canon / history: https://github.com/azovskaya/Sejire_arweave  
- Prior import: https://github.com/azovskaya/sejire_arweave_solana  
- Protocol: `sejire/v0.3`  
- Importing files is not new product development; track post-baseline work separately.

## Product truth (what we demo)

**Outcome:** encrypt a family tree with 12 local words → publish **ciphertext** as a **native Arweave L1 transaction** → restore on another device with the same words.

| In scope | Out of scope for this MVP |
|----------|---------------------------|
| Arweave L1 publish (`publishEnvelope`) | Turbo / Irys / bundler accounts |
| AO Tree/Factory protocol code | Required fiat cashier (Kaspi) |
| GitHub Pages for the UI | Solana as upload/payment proxy |
| Honest fund-AR UX | Claiming Solana-track payment integration |

Binding decision: [`adr/0007-no-centralized-upload.md`](./adr/0007-no-centralized-upload.md).

Optional later (not required for L1 MVP): a **user-signed Solana receipt** that points at an Arweave TX id — never “pay SOL → third party uploads vault.”

## Hosting

- **UI:** GitHub Pages only (this repo’s `gh-pages` / Actions workflow).  
- **Vault data:** Arweave L1.  
- No ShipStatic, Netlify Drop, or other anonymous CDNs as the product host.

## Measurement

See [`MVP_MEASUREMENT.ru.md`](./MVP_MEASUREMENT.ru.md) and [`LIVE_PROOF.md`](./LIVE_PROOF.md).

## Contest posture

If applying to a Solana ecosystem track: either (a) ship a Solana receipt feature and disclose prior work, or (b) apply only where Arweave/AO storage is an honest fit. Do not pitch Turbo/SOL upload that this fork rejected.

Eligibility, residence, and English materials remain founder-owned checklists — not established by this repository alone.
