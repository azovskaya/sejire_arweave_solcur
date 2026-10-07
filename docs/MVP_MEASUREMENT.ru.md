# MVP measurement (ProofPilot)

Цель MVP v1: **семья шифрует древо 12 словами и публикует ciphertext нативной TX в Arweave L1; восстанавливает на другом устройстве по тем же словам.**

Хостинг UI: **только GitHub Pages** (этот репозиторий).  
Хранение сейфа: **Arweave L1** (не хостинг UI).  
Не входит в MVP: Turbo, Irys, Kaspi-кассир, Solana payment proxy.

## Success (go)

Зафиксировать всё ниже до заявки «демо готово»:

1. Публичный UI открывается с GitHub Pages (`https://<user>.github.io/<repo>/`).
2. Сценарий на синтетических данных: создать древо → 12 слов → «Отправить в Arweave» → получить **TX id**.
3. На втором браузере/устройстве: те же 12 слов → открыть сейф → древо совпадает.
4. TX проверяется в публичном explorer (например Viewblock) по сохранённому id.
5. В `docs/LIVE_PROOF.md` записаны дата, TX id, Pages URL (без seed).

## Inconclusive

- Publish UI работает, но mainnet TX ещё не сделан (нет AR) — демо кода есть, settlement не доказан.
- Restore из локального архива браузера успешен, сеть недоступна — не считать proof of Arweave.

## Stop / pivot

- Нельзя пройти encrypt→publish→restore без стороннего upload API → нарушен ADR-0007; чинить L1-путь.
- Пользователи отказываются хранить 12 слов и нет альтернативы без утечки ключа → пересмотреть UX, не подключать кассиру seed.
- Для выбранного хакатона обязателен Solana payment, а продукт остаётся Arweave-only → либо честный Arweave-скоуп + disclosure, либо отдельный Solana-receipt (не upload proxy).

## User validation (после technical proof)

Набор: 5 consenting families (синтетические или свои данные).

| Метрика | Success | Stop |
|---------|---------|------|
| Дошли до «сейф сохранён» (с TX или честным fund-wait) | ≥ 3/5 | < 2/5 |
| Успешный restore на втором устройстве | ≥ 2/5 | 0/5 |
| Готовы снова сохранить новую версию | ≥ 2/5 | 0/5 |

Willingness to pay AR — отдельный вопрос; отсутствие оплаты ≠ провал technical MVP.
