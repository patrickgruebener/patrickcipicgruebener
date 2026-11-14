# Task 019: Backend – Lernraum-Rückbau, Speicher, SRS, API

**Epic:** EPIC-019-022 (zuerst `EPIC-019-022-karteikarten.md` lesen, dort stehen API-Vertrag und Lernlogik)
**Status:** Done (2026-11-14)
**Größe:** M

## Vorgehen

1. Branch `feature/karteikarten` von `main` anlegen. Die bestehenden, nicht committeten Änderungen in `.claude/epics-tasks/` (gelöschte `EPIC-013…`, untracked `006-angebote-seite.md`) nicht anfassen und nicht committen.
2. Rückbau Lernchat:
   - Löschen: `src/app/api/lernraum/chat/`, `src/lib/lernchat-budget.ts`, `src/lib/lernchat-budget.test.mjs`, Script `test:lernchat` in `package.json`, Lernchat-UI `src/app/lernraum/lernchat.tsx` und `page.tsx`.
   - `/lernraum` → 308 auf `/karteikarten` (`next.config.ts` redirects).
   - `src/app/api/lernraum/access/route.ts` nach `src/app/api/karteikarten/zugang/route.ts` verschieben.
   - `lernchat-security.ts` in `karteikarten-security.ts` umbenennen; Env-Name `LEARNING_CHAT_ACCESS_KEY` und Cookie bleiben. Neue Funktion `isAuthorized(request)`: Cookie ODER `Authorization: Bearer <key>` (timing-safe).
   - Middleware: `noindex`/`no-store`-Header für `/karteikarten` statt `/lernraum`.
   - Lernchat-Specs 015–018 und EPIC-015-018 nach `.claude/epics-tasks/done/` verschieben, Status-Zeile „Abgelöst durch EPIC-019-022“.
3. `src/lib/karteikarten-store.ts`: Pfad aus `KARTEIKARTEN_FILE`, sonst `dirname(LEARNING_CHAT_BUDGET_FILE)/karteikarten.json`, sonst Fehler „nicht konfiguriert“ (API antwortet 503). Lesen, atomar schreiben (tmp + rename), einfache In-Process-Schreibsperre (Promise-Kette). Lokal: `KARTEIKARTEN_FILE=./.data/karteikarten.json`, `.data/` in `.gitignore`.
4. `src/lib/karteikarten-srs.ts`: reine Funktionen `bewerte(fortschritt, bewertung, jetzt)`, `baueRunde(karten, jetzt)`, `normalisiere(hr)`, `validiereImport(payload)`.
5. API-Routen gemäß Vertrag unter `src/app/api/karteikarten/`. Eingaben validieren (Strings getrimmt, max. 500 Zeichen, max. 500 Karten pro Import).
6. Tests (`node --test`, Muster wie bestehende `*.test.mjs`): `src/lib/karteikarten-srs.test.mjs` (alle drei Bewertungen, Mindestleichtigkeit, Rundenreihenfolge, Normalisierung, Duplikat-Erkennung, Import-Validierung) und `src/lib/karteikarten-store.test.mjs` (Fallback-Pfad, atomares Schreiben in Temp-Ordner). Script `test:karteikarten` ergänzen.
7. `.env.example` aktualisieren (Lernchat-OpenAI-Variablen raus, `KARTEIKARTEN_FILE` optional rein).

## Done wenn

- `npx tsc --noEmit`, `npm run lint` (kein neuer Fehler ggü. Ausgangsstand), `npm run test:karteikarten`, `npm run build` grün.
- Lokaler Smoke-Test per `curl` mit Bearer: Import, Runde, Bewertung, Patch, Delete funktionieren; ohne Schlüssel 401.
- Commit(s) auf `feature/karteikarten`, kein Push.
- Eine Zeile in `.claude/memory.md` (append-only).
