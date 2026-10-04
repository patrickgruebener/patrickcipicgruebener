# Epic: Privater Lern- und Übersetzungschat

**Epic:** EPIC-015-018
**Status:** Code und Dokploy-Variablen vorbereitet; Deploy-Prüfung ausstehend
**Erstellt:** 2026-10-04
**Priorität:** High
**Größe:** L
**Risk:** High

## Kontext / Ziel

Eine private, nicht öffentlich verlinkte Chatseite auf patrickcipicgruebener.com, die Patrick gemeinsam mit Zola bedient. Sie unterstützt altersgerechtes Lernen, Geschichten und insbesondere Übersetzungen kroatischer Schultexte aus Fotos.

Patrick gibt nur allgemeine oder erfundene Inhalte ohne personenbezogene Angaben zu Zola ein. Fotos werden vor dem Senden von einem Erwachsenen geprüft. Keine selbstständige Nutzung durch ein Kind, kein dauerhaft gespeicherter Chatverlauf.

## Entscheidungen

| Frage | Entscheidung | Grund |
|---|---|---|
| Zugang | Langer geheimer, widerrufbarer Zugangsschlüssel, ohne Konto | Private gemeinsame Nutzung ohne Login |
| Modell | OpenAI Responses API, gpt-5.4-mini, store=false | Text und Bild in einem Modell, begrenzte Kosten |
| Sprachen | Deutsch und Kroatisch, Deutsch als Standardsprache | Kroatische Schultexte auf Deutsch erschließen |
| Lernregeln | Erst Hinweise; vollständige Lösung nur nach ausdrücklicher Bitte | Unterstützt eigenes Denken |
| Verlauf | Im offenen Tab flüchtig, keine Chat- oder Bildablage | Datenminimierung |
| Budget | 5 EUR pro Kalendermonat, serverseitig gedeckelt | Laufende Kosten begrenzen |
| Veröffentlichung | Lokal und auf Staging prüfen; Produktion nur nach gesonderter Freigabe | Keine unangekündigte Veröffentlichung |

## Task-Übersicht

| Task | Name | Prio | Größe | Status | Abhängig von |
|---|---|---|---|---|---|
| 015 | Zugang und Lernchat-Oberfläche | High | M | In Progress | — |
| 016 | Chat- und Bild-API mit Moderation | High | M | Open | 015 |
| 017 | Persistentes Monatsbudget und Laufzeitkonfiguration | High | M | Open | 016 |
| 018 | Gesamtprüfung und Betriebsdokumentation | High | S | Open | 015–017 |

## Abnahmekriterien

- [ ] Geheimer Zugang wird serverseitig geprüft, kann widerrufen werden und wird nach Freischaltung aus der sichtbaren URL entfernt.
- [ ] Deutsche und kroatische Textunterhaltung und altersgerechte Geschichten funktionieren.
- [ ] Fotos kroatischer Schulttexte werden ins Deutsche übersetzt und erklärt; Aufgaben werden nicht gelöst, bevor ausdrücklich darum gebeten wurde.
- [ ] Inhalte werden vor Anzeige moderiert; Bilder sind größenbegrenzt, flüchtig und werden vor Upload in der Oberfläche prüfbar angezeigt.
- [ ] Keine Unterhaltung oder Bilddatei wird dauerhaft gespeichert oder protokolliert.
- [ ] API-Schlüssel bleibt serverseitig; Monatsbudget von 5 EUR wird über einen persistenten Speicher mit konservativer Reservierung und Sperre gegen parallele Überschreitung durchgesetzt.
- [ ] Die Seite ist mobil bedienbar, nicht in Navigation oder Sitemap verlinkt und mit `noindex` versehen.
- [ ] Typprüfung, Lint und Produktionsbuild bestehen; relevante Chat-, Zugangs-, Upload- und Budgetfehler sind getestet.
- [ ] Livebetrieb verweigert Anfragen, solange Schlüssel, persistenter Budgetpfad oder Budgetkonfiguration fehlen.

## Betriebsvoraussetzungen

- In Dokploy einen zufälligen Zugangsschlüssel mit mindestens 32 kryptografisch zufälligen Bytes setzen. Privater Link: `/lernraum#key=<derselbe-hex-kodierte-Schlüssel>`.
- `OPENAI_API_KEY`, `LEARNING_CHAT_USD_TO_EUR_RATE` und `LEARNING_CHAT_BUDGET_FILE` als Servervariablen setzen. Wechselkurs vor Aktivierung konservativ prüfen.
- Budgetpfad auf ein beschreibbares persistentes Volume außerhalb des Anwendungscodes mounten.
- Nach dem Setzen der Variablen erst auf Staging mit erfundenen Inhalten prüfen. Eingaben und Fotos können nach den OpenAI-API-Aufbewahrungsregeln verarbeitet werden; im Chat keine persönlichen Kinderdaten verwenden.
- Der Inhaber bestätigt, dass API-Schlüssel, Zugangsschlüssel, Wechselkurs, Budgetdateipfad und Volume in Dokploy hinterlegt sind. Die Werte wurden nicht ausgelesen oder in das Repository übernommen.

## Non-Goals

- Kein Login, keine selbstständige Nutzung durch Kinder.
- Keine personenbezogenen Kinderangaben, Gesprächsspeicherung, Websuche, Spracheingabe oder Bildgenerierung.
- Kein Deployment, Push oder Live-Schalten ohne ausdrücklichen Auftrag.
- Kein Versprechen, dass Bildvorschau personenbezogene Inhalte zuverlässig erkennt; ein Erwachsener prüft jedes Foto.

## Verification

Automatisiert: TypeScript, ESLint, Produktionsbuild sowie Tests für Zugang, Moderationssperre, Bildvalidierung, fehlende Konfiguration, parallele Anfragen und Monatsbudget.

Manuell: Lokale Nutzung am Handy und Desktop, deutsch-kroatische Übersetzung mit einem geeigneten Beispielbild, Ablauf bei unleserlichem Foto, Lösungsmodus und Widerruf des Zugangs.

## Rollback

Neue Route und zugehörige API entfernen, geheime Schlüssel rotieren und zusätzliche Umgebungsvariablen in Dokploy entfernen. Übrige Website-Routen bleiben unverändert.
