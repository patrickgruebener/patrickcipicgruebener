# Task 020: Oberfläche – Lernen, Kartenliste, Zugang, Manifest

**Epic:** EPIC-019-022 (zuerst lesen)
**Status:** Done (2026-11-14)
**Größe:** M
**Voraussetzung:** Task 019 auf `feature/karteikarten` committet

## Vorgehen

1. Auf `feature/karteikarten` arbeiten. Fremde, nicht committete Änderungen in `.claude/epics-tasks/` nicht anfassen.
2. Design: Werkstatt-Bausteine der Website wiederverwenden (`src/components/`, `sections/section-shell.tsx`, Tokens in `globals.css`). Stilquelle `~/Documents/memory/skills/brand-patrick/` (nur lesen). Achtung `.claude/memory.md`: Button-Hintergründe brauchen `!`-Utilities. Eigene, schlanke Kopfzeile, kein Site-Header, kein Tracking, kein Cookie-Banner (Route außerhalb `(site)`).
3. `src/app/karteikarten/page.tsx` (Server): ohne gültige Session → Zugangsansicht; mit Session → Lern-App. `metadata.robots` noindex.
4. Zugang: liest `#key=…` aus dem Hash (wie bisher bei Lernraum), postet an `/api/karteikarten/zugang`, entfernt den Hash aus der URL. Zusätzlich Eingabefeld + Button für manuelle Eingabe.
5. Lernansicht (Client): Zähler „fällig / neu“, große Karte (Vorderseite + kleine Richtungsangabe HR→DE bzw. DE→HR), Tippen dreht um und zeigt Rückseite + Hinweis, dann drei Daumen-Knöpfe Nochmal / Gut / Leicht (min. 48 px hoch, unten fixiert). `nochmal` hängt die Abfrage ans Rundenende. Leere Runde: freundlicher Fertig-Zustand mit nächstem Fälligkeitszeitpunkt.
6. Kartenliste (Tab oder Unterseite `/karteikarten/karten`): Suche, Inline-Bearbeiten von hr/de/hinweis, Löschen mit Bestätigung.
7. Web-App: `manifest` (Name „Karteikarten“, `display: standalone`, Theme-Farbe aus Tokens), `apple-mobile-web-app-capable`, Icon aus vorhandenen Assets oder schlichtes SVG/PNG nach Brand.
8. UI-Texte Deutsch, direkt im Component (Seite ist privat, keine i18n-Keys nötig).

## Done wenn

- `npx tsc --noEmit`, `npm run lint` (kein neuer Fehler), `npm run build` grün.
- Lokal im Produktionsbuild mit `.data`-Datei und ein paar Testkarten: Zugang per Hash und Feld, komplette Lernrunde, Bearbeiten, Löschen funktionieren. Geprüft bei 390 px und Desktop im Browser-Pane (Hinweise aus `.claude/memory.md` zu 390-px-Prüfung beachten), Screenshots als Nachweis.
- Commit(s) auf `feature/karteikarten`, kein Push. Eine Zeile in `.claude/memory.md`.
