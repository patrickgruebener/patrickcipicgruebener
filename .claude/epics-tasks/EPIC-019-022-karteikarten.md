# Epic: Kroatisch-Karteikarten unter /karteikarten

**Epic:** EPIC-019-022
**Status:** Open
**Erstellt:** 2026-11-14
**Priorität:** High
**Größe:** L
**Branch:** `feature/karteikarten` (alle Tasks committen dorthin, Merge auf `main` erst in Task 022)

## Kontext / Ziel

Patrick übt Kroatisch mit einem Sprachagenten und bekommt am Ende jeder Session eine Liste im Format `kroatisch = deutsch` (teils mit Hinweis in Klammern, z. B. `(dalmatinisch)`). Ein Skill `/karteikarten` importiert diese Liste in eine private Karteikarten-Seite. Patrick lernt dort am iPhone per Spaced Repetition.

`/lernraum` (privater Lernchat, EPIC-015-018) wird nicht mehr gebraucht und wird zu `/karteikarten` umgebaut. Zugang, Header-Schutz und persistentes Volume werden wiederverwendet, Chat, OpenAI-Anbindung und Budget-Logik entfallen.

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Lernlogik | Vereinfachtes SM-2, drei Bewertungen: `nochmal`, `gut`, `leicht` |
| Richtungen | Jede Karte zweimal: `hr-de` und `de-hr`, getrennter Fortschritt |
| Speicher | Eine JSON-Datei auf dem bestehenden Dokploy-Volume, atomar geschrieben (tmp + rename), keine neue Dependency (Node 20, kein `node:sqlite`) |
| Dateipfad | `KARTEIKARTEN_FILE`; Fallback: `dirname(LEARNING_CHAT_BUDGET_FILE)/karteikarten.json`. So ist keine Dokploy-Änderung nötig |
| Zugang | Bestehender Mechanismus aus `src/lib/lernchat-security.ts`: Schlüssel `LEARNING_CHAT_ACCESS_KEY`, signiertes Cookie. Zusätzlich `Authorization: Bearer <Schlüssel>` für den Skill. Plus Eingabefeld für den Schlüssel |
| Import | Skill schickt Karten per API, Duplikate (normalisiertes Kroatisch: lowercase, trim, Satzzeichen am Ende entfernt) werden übersprungen |
| Extras v1 | Karten bearbeiten und löschen. Keine Audio-Ausgabe, keine Tags, kein Tageslimit |
| UI | Mobil zuerst (390 px), Werkstatt-Design der Website, als Home-Bildschirm-App nutzbar (Manifest) |
| Sichtbarkeit | Nicht verlinkt, nicht in Sitemap, `noindex`, `no-store`, kein Tracking |

## API-Vertrag (verbindlich für Tasks 019, 020, 021)

Alle Endpunkte unter `/api/karteikarten/`, Antwort JSON, 401 ohne gültiges Cookie oder Bearer-Schlüssel.

| Methode + Pfad | Body | Antwort |
|---|---|---|
| `POST zugang` | `{ key }` | setzt Cookie, `{ ok: true }` (kein Bearer nötig) |
| `GET runde` | – | `{ karten: Abfrage[], stats: { faellig, neu, gesamt } }`; zuerst fällige Wiederholungen (ältestes `faellig` zuerst), dann neue |
| `POST bewertung` | `{ kartenId, richtung, bewertung }` | `{ ok: true, faellig }` |
| `GET karten` | – | `{ karten: Karte[] }` |
| `POST import` | `{ karten: [{ hr, de, hinweis?, quelle? }] }` | `{ neu, doppelt, fehler: [{ index, grund }] }` |
| `PATCH karten/[id]` | `{ hr?, de?, hinweis? }` | `{ karte }` |
| `DELETE karten/[id]` | – | `{ ok: true }` |

Typen:

```ts
type Richtung = 'hr-de' | 'de-hr'
type Bewertung = 'nochmal' | 'gut' | 'leicht'
type Fortschritt = { faellig: string /* ISO */; intervallTage: number; leichtigkeit: number; wiederholungen: number; neu: boolean }
type Karte = { id: string; hr: string; de: string; hinweis?: string; quelle?: string; erstellt: string; fortschritt: Record<Richtung, Fortschritt> }
type Abfrage = { kartenId: string; richtung: Richtung; vorne: string; hinten: string; hinweis?: string; neu: boolean }
```

## Lernlogik (SM-2 vereinfacht)

- Start: `leichtigkeit` 2.5, `intervallTage` 0, `neu` true.
- `nochmal`: `intervallTage` 0, `faellig` = jetzt + 10 Min, `leichtigkeit` −0.2 (min 1.3), `wiederholungen` 0.
- `gut`: Intervall 1 → 3 → `round(intervall × leichtigkeit)`.
- `leicht`: Intervall 3 → 7 → `round(intervall × leichtigkeit × 1.3)`, `leichtigkeit` +0.15.
- Nach jeder Bewertung `neu` false. Im Client kommt eine `nochmal`-Karte am Ende der laufenden Runde erneut.

## Task-Übersicht

| Task | Name | Größe | Modell / Effort | Abhängig von |
|---|---|---|---|---|
| 019 | Backend: Lernraum-Rückbau, Speicher, SRS, API | M | Sonnet / medium | – |
| 020 | Oberfläche: Lernen, Kartenliste, Zugang, Manifest | M | Sonnet / high | 019 |
| 021 | Skill `/karteikarten` im Memory-Repo | S | Sonnet / low | API-Vertrag (parallel zu 019) |
| 022 | Gesamtprüfung, Merge, Deploy, Erstimport | S | Sonnet / medium | 019–021 |

## Abnahmekriterien Epic

- [ ] `/lernraum` leitet per 308 auf `/karteikarten`; Chat-Code, Budget-Code und deren Tests sind entfernt.
- [ ] Ohne Zugang keine Daten, mit Schlüssel-Link oder Eingabefeld dauerhaft eingeloggt.
- [ ] Lernrunde am iPhone mit Umdrehen und drei Knöpfen, Fortschritt bleibt über Geräte erhalten.
- [ ] Skill importiert eine eingefügte Liste, meldet neu/doppelt/fehlerhaft und sichert lokal.
- [ ] TypeScript, ESLint (kein neuer Fehler), Build und alle Tests grün; live auf patrickcipicgruebener.com.

## Non-Goals

Audio, Tags/Filter, Tageslimit, Mehrbenutzer, Statistik-Dashboard.
