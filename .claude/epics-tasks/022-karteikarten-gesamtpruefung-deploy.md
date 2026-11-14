# Task 022: Gesamtprüfung, Merge, Deploy, Erstimport

**Epic:** EPIC-019-022 (zuerst lesen)
**Status:** Open
**Größe:** S
**Voraussetzung:** 019 und 020 auf `feature/karteikarten`, 021 im Memory-Repo committet

Patrick hat Merge und Deploy auf `main` für dieses Epic freigegeben (Chat 2026-11-14), sofern alle Prüfungen grün sind.

## Vorgehen

1. Auf `feature/karteikarten`: `npx tsc --noEmit`, `npm run lint`, alle `test:*`-Scripts, `npm run build`. Fehler beheben (kleine Fixes direkt, Commit).
2. Kurzer End-to-End-Test lokal im Produktionsbuild: Skill-Skript mit `KARTEIKARTEN_URL=http://localhost:3000` und lokalem Testschlüssel gegen die lokale Instanz (Testschlüssel nur per Env an Server und Skript übergeben, nicht im Keychain ablegen). Danach Lernrunde im Browser-Pane bei 390 px.
3. Offener Punkt aus `.claude/memory.md`: `--color-line` in `globals.css` auf `#D6DCEA` korrigieren, falls noch falsch.
4. `main` aktualisieren, `feature/karteikarten` mergen (fast-forward oder Merge-Commit), auf `origin/main` pushen. Fremde, nicht committete Änderungen in `.claude/epics-tasks/` nicht anfassen. Dokploy deployt automatisch.
5. Nach ca. 3–5 Min live prüfen: `https://patrickcipicgruebener.com/lernraum` → 308 auf `/karteikarten`; `/api/karteikarten/runde` ohne Schlüssel → 401 (nicht 503; 503 heißt Speicherpfad fehlt → in Abschlussmeldung als Handgriff für Patrick nennen: `KARTEIKARTEN_FILE` in Dokploy auf das Volume setzen).
6. Erstimport: `python3 ~/Documents/memory/skills/karteikarten/scripts/import.py < ~/Documents/memory/skills/karteikarten/erstimport-2026-11-14.txt`. Fehlt der Keychain-Eintrag, nicht abbrechen, sondern in der Abschlussmeldung nennen.
7. Epic- und Task-Status aktualisieren, Dateien nach `done/`, Projekt-Entity `~/Documents/memory/entities/projects/patrickcipicgruebener-website.md` um Abschnitt Karteikarten ergänzen, Zeile in `.claude/memory.md`. Commit + Push.

## Done wenn

Live erreichbar, Erstimport mit 34 neuen Karten (oder klar benannter offener Handgriff), alle Prüfungen grün, Doku aktualisiert.
