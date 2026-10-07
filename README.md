# SEJIRE (sejire_arweave_solcur)

**Неизменяемая ткань человеческой истории — без централизованных посредников.**

Протокол вечного версионного хранения родовых деревьев на **Arweave L1** и **AO**.  
Сначала собираете древо (я → мама/папа → бабушки/дедушки).  
**12 слов остаются на устройстве** и нужны только чтобы зашифровать сейф и подписать публикацию в сеть.

Форк от [sejire_arweave_solana](https://github.com/azovskaya/sejire_arweave_solana) / канона SEJIRE.  
Протокол: `sejire/v0.3`.

## Принципы этого репозитория

| Делаем | Не делаем |
|--------|-----------|
| Публикация ciphertext напрямую в Arweave | Turbo, Irys и прочие upload/payment API на критическом пути |
| Логика дерева в AO processes | Обязательный backend / кассир |
| Восстановление только по 12 словам | Seed или plaintext у третьих сторон |
| Публичные gateways с перебором | Привязка к одному коммерческому сервису |

Решение: [`docs/adr/0007-no-centralized-upload.md`](./docs/adr/0007-no-centralized-upload.md).

## Локально

```bash
cd apps/web && npm install && npm test && npm run dev -- --host 127.0.0.1 --port 43123
```

### Отправить древо в Arweave (v1)

1. Соберите древо в редакторе → **Сохранить**.
2. **Создать 12 слов** → запишите на бумаге → повторите фразу.
3. **Отправить в Arweave** — клиент шифрует древо и создаёт нативную транзакцию.
4. На адресе из ваших 12 слов нужен **AR** (обычно ~0.05–0.1 AR). Binance → вывод **AR**, сеть **Arweave** (не ERC-20).
5. После пополнения нажмите **Отправить** — в сеть уходит только **зашифрованный** сейф (ciphertext + теги протокола).

Режим по умолчанию: `VITE_PUBLISH_MODE=self` (см. `apps/web/.env.development`).  
Локальная цепь без mainnet: `npx arlocal` + переменные в `.env.example`, затем `npm run test:publish:local`.

## Структура

| Путь | Содержание |
|------|------------|
| `apps/web` | Клиент: редактор, PDF/JSON, шифр, публикация в Arweave |
| `ao/processes` | Lua Tree / Factory (`sejire/v0.3`) |
| `packages/schema` | JSON Schema |
| `docs/` | Протокол, ADR, чекпоинт |
| `apps/sponsor` | Опциональный эксперимент (Kaspi); **не** часть дефолтного пути |
| `presentation/` | Investor deck |

Чекпоинт: [`docs/CHECKPOINT.ru.md`](./docs/CHECKPOINT.ru.md) · протокол: [`docs/PROTOCOL.md`](./docs/PROTOCOL.md)
