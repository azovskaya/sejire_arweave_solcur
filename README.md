# SEJIRE — sejire_arweave_solcur

**Неизменяемая ткань человеческой истории — без посредников на пути сейфа.**

Зашифрованное родовое древо → **нативная TX в Arweave L1**.  
UI хостится **только на GitHub Pages**.  
**12 слов** остаются на устройстве.

Протокол: `sejire/v0.3` · ProofPilot: [`docs/PROOFPILOT_READINESS.ru.md`](./docs/PROOFPILOT_READINESS.ru.md)

## Принципы

| Делаем | Не делаем |
|--------|-----------|
| Ciphertext → Arweave L1 | Turbo, Irys, bundler API |
| UI → GitHub Pages | ShipStatic, Netlify Drop и прочие CDN-хосты |
| Ключи только локально | Seed у кассира / в memo |
| Метрики и proof-лог | Заявки без TX и без измерений |

ADR: [`docs/adr/0007-no-centralized-upload.md`](./docs/adr/0007-no-centralized-upload.md) · измерения: [`docs/MVP_MEASUREMENT.ru.md`](./docs/MVP_MEASUREMENT.ru.md)

## Демо (после деплоя Pages)

`https://azovskaya.github.io/sejire_arweave_solcur/`

Пока репозиторий не опубликован на GitHub — соберите локально (ниже).

## Локально

```bash
cd apps/web && npm install && npm test && npm run dev -- --host 127.0.0.1 --port 43123
```

### Отправить древо в Arweave

1. Древо → **Сохранить** → 12 слов → **Отправить в Arweave**  
2. Пополните адрес из слов (~0.05–0.1 **AR**, сеть Arweave)  
3. После TX — restore на другом устройстве теми же словами  
4. Запишите TX id в [`docs/LIVE_PROOF.md`](./docs/LIVE_PROOF.md)

## Деплой UI (только GitHub)

```bash
# на GitHub: Settings → Pages → Deploy from branch `gh-pages` (/)
npm run deploy:pages
```

Или push в `main` — workflow [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) соберёт и опубликует `gh-pages`.

## Структура

| Путь | Содержание |
|------|------------|
| `apps/web` | Клиент (редактор, шифр, L1 publish) |
| `ao/processes` | Lua Tree / Factory |
| `packages/schema` | JSON Schema |
| `docs/` | Протокол, ADR, ProofPilot, измерения |
| `apps/sponsor` | Legacy-эксперимент; **не** дефолтный путь |
| `presentation/` | Deck (статикой на Pages) |
