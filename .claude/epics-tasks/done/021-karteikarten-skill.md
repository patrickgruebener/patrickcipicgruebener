# Task 021: Skill `/karteikarten` im Memory-Repo

**Epic:** EPIC-019-022 (API-Vertrag lesen)
**Status:** Done (2026-11-14)
**Größe:** S
**Repo:** `~/Documents/memory` (Skills liegen in `skills/`, Index `skills/INDEX.md`). Website-Repo nicht anfassen.

## Vorgehen

1. Bestehende Skills als Muster ansehen (Frontmatter, Aufbau, z. B. `skills/monti/SKILL.md`). Schreibstil-Regeln aus `~/CLAUDE.md` (Deutsch, Umlaute, keine Gedankenstriche).
2. `skills/karteikarten/SKILL.md`: Trigger `/karteikarten`, „Karteikarten importieren“, oder eine eingefügte Liste aus Zeilen `kroatisch = deutsch`. Ablauf ohne Rückfragen:
   - Skript aufrufen, Ergebnis kurz melden („X neu, Y doppelt, Z fehlerhaft“ plus fehlerhafte Zeilen).
3. `skills/karteikarten/scripts/import.py` (nur Python-Standardbibliothek):
   - Liest Text von stdin. Pro Zeile am ersten ` = ` trennen; leere Zeilen ignorieren; Zeilen ohne ` = ` als Fehler melden.
   - Hinweis: endet die deutsche Seite auf `(…)`, Klammerinhalt nach `hinweis`, aus `de` entfernen. Mehrere Bedeutungen mit ` / ` bleiben unverändert in `de`.
   - `quelle` = heutiges Datum `YYYY-MM-DD`.
   - Schlüssel: `security find-generic-password -s patrickcipicgruebener-karteikarten -w`. Fehlt er, klare Meldung mit dem Einrichtungsbefehl `security add-generic-password -a karteikarten -s patrickcipicgruebener-karteikarten -w` und Abbruch (Exit 2), aber Sicherung trotzdem schreiben.
   - `POST https://patrickcipicgruebener.com/api/karteikarten/import` mit Bearer; Basis-URL per Env `KARTEIKARTEN_URL` überschreibbar (für lokale Tests).
   - Sicherung: jede geparste Karte als JSON-Zeile an `~/Documents/memory/wissen/kroatisch/karten.jsonl` anhängen (Ordner anlegen).
   - Option `--dry-run`: nur parsen und ausgeben.
4. Tests `skills/karteikarten/scripts/test_import.py` (`unittest`): Parser mit der Beispielliste unten (34 Karten, `(dalmatinisch)` wird Hinweis, `Šta da kažen?` bleibt korrekt), fehlerhafte Zeile, Dry-Run ohne Netzwerk.
5. `skills/INDEX.md` verlinken. `wissen/kroatisch/` ggf. im passenden `INDEX.md` verlinken. `bash ~/Documents/memory/scripts/validate.sh` grün.
6. Commit im Memory-Repo (nur die eigenen Dateien), kein Push nötig falls das Repo das nicht üblich macht; sonst pushen wie gewohnt.

## Beispielliste (Testdaten)

```
Svaka čast! = Respekt! / Alle Achtung!
Šta da kažen? = Was soll ich sagen? (dalmatinisch)
Ajme! = Oh Mann! / Ach du meine Güte!
Bome! = Allerdings! / Aber hallo!
Pusti ga, molin te! = Ach, hör auf mit dem!
Aj bar... = Na ja, wenigstens...
Sto posto! = Hundertprozentig!
E, to se zove uspješan dan! = Das nenne ich einen erfolgreichen Tag!
Tko ne riskira, ne profitira! = Wer nichts wagt, der nichts gewinnt!
Igrati na sigurno = Auf Nummer sicher gehen
Volim izaći iz svoje zone komfora. = Ich verlasse gerne meine Komfortzone.
Doćete vi u moje godine! = Ihr kommt auch noch in mein Alter!
Da sam na tvom mistu... = Wenn ich an deiner Stelle wäre... (dalmatinisch)
Da nije tebe... = Wenn du nicht wärst...
Popričati ka ljudi = Sich mal richtig unterhalten
Ljubav na prvu = Liebe auf den ersten Blick
žugati = meckern, jammern (dalmatinisch)
kukati = jammern
mučiti se = sich quälen
uganuti nogu = sich den Fuß verstauchen
upoznati nekoga = jemanden kennenlernen
pozvati na kavu = auf einen Kaffee einladen
uživati u nečemu = etwas genießen
isprobavati nove stvari = neue Dinge ausprobieren
bojati se neizvjesnosti = Angst vor Ungewissheit haben
upustiti se u nešto = sich auf etwas einlassen
dogodine = nächstes Jahr
valjda = wohl, vermutlich
pare = Geld, Kohle
ženska = Frau, Mädel (umgangssprachlich)
postolje = Siegerpodest
feta kruva = Scheibe Brot (dalmatinisch)
crni rižot = schwarzes Risotto
bežični = kabellos
```

Diese Liste zusätzlich als `skills/karteikarten/erstimport-2026-11-14.txt` ablegen (wird in Task 022 importiert).

## Done wenn

Tests grün, `--dry-run` mit der Beispielliste liefert 34 Karten, Skill im Index, validate.sh grün, Commit im Memory-Repo.
