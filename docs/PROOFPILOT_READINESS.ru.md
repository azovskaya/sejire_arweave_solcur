# ProofPilot readiness review — SEJIRE

Дата инспекции: **2026-10-07**  
Скилл: `proofpilot-readiness-review` (установлен в agent skills из https://github.com/Marakaya/proofpilot)  
Режим: **coach** · контекст: **general** · Colosseum: **не подключён** (limited/offline)  
Рубрика: `mvp_readiness` (ProofPilot rubrics v0.3.0)  
Quality run: self-review → `needs_review` (independent reviewer недоступен в этой сессии)

Публичное демо на момент проверки: https://harmonic-loop-9dn82uw.shipstatic.com

## Вердикт

| Цель | Решение | Почему |
|------|---------|--------|
| Thin MVP «шифр → Arweave L1» | **revise** (почти готов, добить proof) | Код/тесты/UI есть; нет зафиксированного funded mainnet TX |
| Подача на Solana-track хакатон | **pause** | Нет Solana в коде; eligibility/материалы неизвестны; HACKATHON_2026 vs ADR-0007 |
| Пользовательский тест семей | **proceed** (после funded publish) | Нужны 12 слов + AR + сценарий restore на втором устройстве |

## Оценки `mvp_readiness` (0–4)

| Измерение | Балл | Комментарий |
|-----------|-----:|-------------|
| outcome_clarity | 3 | Технический outcome ясен; рыночный — гипотеза |
| scope_discipline | 4 | Тонкий путь; Turbo/кассир вне критического пути (ADR-0007) |
| delivery_feasibility | 3 | Сборка и тесты ок; AR funding / git write — риски |
| measurement | 1 | Нет порогов успеха/стопа по adoption |
| demo_readiness | 3 | Публичный SPA; e2e mainnet не зафиксирован |

**Взвешенный балл: 2.95 / 4** · покрытие рубрики: 100% измерений · результат **provisional** для market claims.

## Блокеры

1. Нет inspected funded mainnet vault TX  
2. Не проверена eligibility / материалы Colosseum  
3. Конфликт документов: Turbo в HACKATHON_2026 vs ADR-0007  

## Быстрые победы

1. Опубликовать одно синтетическое древо на mainnet → сохранить TX id → restore во втором браузере  
2. Синхронизировать pitch/hackathon docs с L1-путём  
3. Закрепить стабильный хост (claim shipstatic / Pages)  
4. 3–5 интервью семей с заранее заданным stop/go  

## Установка скилла (для агента)

```bash
git clone https://github.com/Marakaya/proofpilot.git
cd proofpilot && npm install
node scripts/cli.js install --target agents \
  --dir /home/ubuntu/.cursor/skills-cursor/proofpilot \
  --profiles --core-only
```

Профили: `proofpilot`, `proofpilot-readiness-review`, `proofpilot-mvp-planner`, и др.  
Полный support bundle (36 skills + Colosseum) — без `--core-only` и с `setup.js --connect-colosseum` по запросу пользователя.
