# Task 014: Persönliches KI-System für 199 € mit eigener Landingpage

**Status:** Landingpage und Unternehmens-URL live; Direktkauf über Lemon Squeezy offen
**Erstellt:** 2026-09-28
**Priorität:** High
**Größe:** M
**Risk:** Low für die Seitenerstellung
**Modell-Empfehlung:** Claude Sonnet; GPT/Codex gpt-5.5 medium. Bestehendes Design und Seitenmuster wiederverwenden.

## Execution

Patrick hat die Klärung, Überarbeitung dieses Tasks und anschließende Umsetzung beauftragt. Die Modellübergabe wurde am 28.09.2026 signalisiert; die Umsetzung erfolgte nach Patricks anschließender Story-Präzisierung. Am 29.09.2026 hat Patrick Commit, Push und Live-Schaltung ausdrücklich beauftragt. Commit `e95a70b` ist auf `main`; beide Seiten und die dauerhafte Weiterleitung sind auf der Produktionsdomain geprüft.

## Background

Die Website unterscheidet bisher nicht klar zwischen dem persönlichen KI-System und dem System für Unternehmen. Patrick bietet das persönliche System fertig vorbereitet („out of the box“) für 199 € an. Es richtet sich vor allem an Selbstständige und vielbeschäftigte Macher und kann auch für kleine Unternehmen passen. Besucher können sich den praktischen Nutzen bisher schwer vorstellen, bevor sie es verwenden.

Entscheidung vom 28.09.2026: eigene Landingpage für dieses Angebot und eine verständliche Trennung vom individuell eingerichteten Unternehmensangebot. Öffentliche Bezeichnung: „KI-System“ bzw. „Dein persönliches KI-System“. „Blueprint“ nicht mehr verwenden.

## Approach

1. Bestehende Unternehmensseite (früher `/aios`, jetzt `/ki-system-fuer-unternehmen`) und aktuelle Angebotsdarstellung prüfen. Den vorbereiteten Einstieg für einzelne Nutzer vom individuell begleiteten Aufbau für Unternehmen und Teams unterscheiden. Nicht allein nach Privatperson versus Firma trennen, da Selbstständige und kleine Firmen ebenfalls Käufer des persönlichen Systems sein können.
2. Eigene Landingpage im bestehenden Website-Design erstellen. Nutzen über konkrete Alltagssituationen und belegbare Beispiele erklären: Was gibt der Nutzer hinein, was erledigt das System, was bleibt beim Nutzer?
3. Preis 199 € sichtbar nennen. Lieferumfang, Voraussetzungen und Grenzen verständlich darstellen. Keine unbestätigten Einsparungen, Leistungen oder Supportzusagen erfinden.
4. Relevante Einstiege auf Website und Unternehmensseite so anpassen, dass Besucher das passende Angebot finden. Persönliches System und Unternehmenslösung mit jeweils eigenem nächsten Schritt versehen.

## Scope

**Geändert:** Bestehende KI-System-Darstellung, relevante interne Verlinkungen und Übersetzungen.
**Neue Dateien:** Eigene Landingpage, genauer URL-Pfad in der Umsetzung festlegen; bei Bedarf wiederverwendbare Sektionen.
**Unverändert:** Andere Leistungsangebote, insbesondere Produktmanagement, Strategie und Workshops, soweit für die Abgrenzung nicht nötig.

Bestehende Arbeiten an `/angebote` (Task 006) berücksichtigen und nicht überschreiben. Aktuelle Aussagen von Patrick haben Vorrang vor dem älteren Angebotsportfolio.

## Acceptance Criteria

- [x] Eine separate Landingpage für das persönliche KI-System ist unter `/ki-system` lokal erreichbar.
- [x] Zielgruppe, konkreter Alltagsnutzen und Preis von 199 € sind klar sichtbar.
- [x] Die Seite erklärt den bestätigten Lieferumfang, Startprozess, technische Voraussetzungen, zusätzliche Toolkosten und Supportumfang.
- [x] Beispiele zeigen verständlich, was Nutzer mit dem System tatsächlich machen können.
- [x] Persönliches System und individuell eingerichtete Unternehmenslösung sind eindeutig unterscheidbar, auch für Selbstständige und kleine Firmen.
- [x] Startseite, Navigation und `/ki-system-fuer-unternehmen` verlinken auf das persönliche Angebot; die Produktseite verweist zurück auf die Unternehmenslösung. `/aios` leitet dauerhaft auf die neue Unternehmens-URL weiter.
- [x] Bis der verifizierte Lemon-Squeezy-Checkout vorliegt, führt „Kauf anfragen“ zum vorausgefüllten Kontaktformular; „Gespräch buchen“ bleibt verfügbar. Bei gültigem Checkout-Link wechselt der Kauf-CTA auf Direktkauf.
- [x] Bestehendes Design und Sprachmuster (Deutsch, Englisch, Kroatisch) werden verwendet; die geänderten Dateien bestehen den gezielten Stilcheck.
- [x] Mobile und Desktop sind im lokalen Browser geprüft, ohne horizontales Überlaufen; Anfrage-CTA und Formularinhalt funktionieren.
- [x] Website-Build und gezielter Stilcheck bestehen. Der globale Stilcheck scheitert an vorhandenen Fehlern außerhalb der Änderung.

## Non-Goals

- Kein kompletter Website-Relaunch.
- Kein neuer Produktname und keine technische Weiterentwicklung des KI-Systems.
- Keine ungeklärte Zahlungsintegration. Die Veröffentlichung wurde später von Patrick ausdrücklich beauftragt und ist erfolgt.
- Keine Übernahme vertraulicher Kundendaten oder interner Screenshots als öffentliche Belege.

## Offene Abhängigkeiten vor dem Live-Verkauf

- Lemon-Squeezy-Konto, Produkt und verifizierten Checkout-Link einrichten. Das getestete ZIP und die `.sha256` liegen lokal in `/Users/patrick/Documents/ai-os-releases/`. Nach Produktfreigabe `LEMON_SQUEEZY_CHECKOUT_URL` auf den gehosteten Checkout setzen und Kauf- und Downloadfluss testen. Die Seite zeigt bis dahin ehrlich die Kaufanfrage.
- Preis- und Rechtstexte im Merchant-of-Record-Checkout prüfen. Produktlizenz und Verbraucherrechte bei Bedarf rechtlich prüfen lassen, bevor echte Kunden kaufen.
- Patricks ausführliche Installationsseite für Mac und Windows kann später ergänzt werden. Nicht öffentlich verlinkt oder `noindex` ist kein Zugriffsschutz; die ZIP selbst wird über Lemon Squeezy geliefert.
- Keine feste Updatefrequenz oder lebenslangen Updateanspruch versprechen. Die Dauer der Bereitstellung späterer Downloads ist noch nicht vereinbart.

## Bestätigte Entscheidungen vom 28.09.2026

- **Ziel:** Vorrangig Direktkauf; alternativ Anfrage oder Beratungsgespräch.
- **Produkt:** Vollständiges Installationspaket aus `/Users/patrick/Documents/ai-os`. Patrick bezeichnet die Version als verkaufsfertig und berichtet von Tests mit Timo und seinem Bruder, einschließlich eines Updates. Daraus keine veröffentlichten Testimonials oder Leistungszahlen ableiten.
- **Preis:** 199 € als Endpreis. Einmaliger Paketkauf ist die bisherige Arbeitsannahme, kein Abonnement. Verkauf über Evorise in Kroatien. Laut Patrick aktuell Kleinunternehmerbefreiung, voraussichtlich etwa Mitte 2027 PDV-pflichtig. Keine pauschale Aussage „nur kroatische Käufer sind steuerpflichtig“ übernehmen.
- **Support:** Persönliche Hilfe ist zusätzlich kostenpflichtig und wird separat abgerechnet. Keine inklusive Einrichtung, Supportzeit oder Reaktionsfrist versprechen. Kostenpflichtige Unterstützung und gegebenenfalls zwingende Rechte bei Mängeln nicht gleichsetzen.
- **Kauf und Lieferung:** Lemon Squeezy ist ausgewählt. Gehosteten Checkout und automatische ZIP-Auslieferung nutzen; keinen eigenen Shop bauen. Steuerinklusive Preisoption passend zum 199-€-Endpreis prüfen. Lemon Squeezy ist Wiederverkäufer/Merchant of Record; dessen Kundenumsatzsteuer richtet sich nicht einfach nach Evorises Kleinunternehmerstatus.
- **Spätere Versionen:** Ebenfalls als aktualisierte Produktdateien über Lemon Squeezy. Käufer laden selbst herunter und aktualisieren selbst. Kein GitHub-Kundenzugang. Die technische Bereitstellung allein entscheidet nicht über gesetzliche oder vertragliche Updatepflichten; frühere pauschale Aussagen hierzu nicht als Rechtsgrundlage verwenden.
- **Pilotbereinigung:** Die 50-€-Pilotabrede war ausschließlich eine individuelle Absprache mit Maxi und gehört nicht zum regulären Angebot. Die Pilotdateien bleiben intern als Historie, werden durch `export-ignore` vom Kunden-ZIP ausgeschlossen und vom Archivprüfer ausdrücklich abgewiesen. Das reguläre ZIP `v3.1.0` enthält stattdessen `docs/GETTING-STARTED.md`; es wurde aus einem lokalen Release-Tag gebaut und in einer isolierten Umgebung geprüft.
- **Positionierung:** Selbstständige und technisch orientierte Macher. Kundennutzen über Geschichten zu tatsächlicher Arbeit im eigenen System erklären: lesen, bearbeiten, ausführen, prüfen, wiederaufnehmen, wiederverwenden.
- **Leistungsabgrenzung:** Dateien bearbeiten und Programme ausführen sind Fähigkeiten des verwendeten Agenten. Das Paket steuert vorbereitete Kontextstruktur, Personalisierung, Arbeitsregeln, Skills, Task-System und Dokumentation bei. Patricks individuelle große Skill-Sammlung und sämtliche verbundenen Apps sind nicht automatisch im Kauf enthalten.
- **Vergleich:** Einen losgelösten Chat als Nutzungsweise beschreiben. Nicht behaupten, ChatGPT habe generell kein Gedächtnis, könne keine Dateien verändern oder keine Abläufe ausführen. Projekte, Apps und Work bieten bereits entsprechende Funktionen. Auch Claude Code hat eigenes Memory.

## Bestätigte Story-Richtung vom 29.09.2026

- **Hauptgeschichte 1, weniger Hin- und Herkopieren:** Patrick sieht das ständige Übertragen von Informationen und Daten aus isolierten Chats als besonders spürbaren Schmerzpunkt.
- **Beispiel A, Text nach Monaten ändern:** Ein Homepage- oder Angebotstext wird erstellt. Zwei Monate später muss ein Nutzer den alten Chat suchen, um dort weiterzuarbeiten. Liegt der Text als ordentlich benannte und auffindbare Markdown-Datei im eigenen System, kann ein unterstützter Agent mit Zugriff dieselbe Datei finden und direkt überarbeiten. Nicht „jede KI findet alles sofort“ versprechen; Zugriff, Indizierung und Ablage sind Voraussetzungen.
- **Beispiel B, Dateiversionen:** Bei Word-, Excel- und PDF-Arbeit entstehen im isolierten Chat Download-, Speicher- und erneute Upload-Schleifen. Lokale Änderungen machen eine frühere Chat-Kopie veraltet. Die Geschichte soll die Arbeit an einer freigegebenen aktuellen Datei zeigen. Formatbearbeitung hängt von Werkzeugen und Dateityp ab; keine Allformat-Garantie.
- **Geschichte 7, Regeln einmal pflegen:** Gemeinsames Writing Style Profile und Arbeitsregeln, etwa „Newsletter-Kunden siezen“, an einem Ort ändern. Unterstützte Agenten lesen denselben Stand; bei getrennten Master-Prompts und Anbieterprofilen müsste die Änderung mehrfach nachgetragen werden. Die native Speicher- oder Regeltechnik anderer Anbieter nicht pauschal kleinreden. Prüfen, ob die konkrete `AGENTS.md`- und Skill-Anbindung für Claude und Codex diese Aussage trägt; Gemini bleibt Vorschau.
- **Geschichte 9, Portabilität und Kontrolle:** Das Wissen liegt in eigenen lesbaren Dateien; Anbieterwechsel soll möglich sein. Keine Aussage „die Daten liegen nicht bei OpenAI oder Anthropic“: Quelldateien werden lokal gespeichert, aber verarbeitete Inhalte können an den gewählten Modellanbieter gesendet und dort nach dessen Bedingungen gespeichert werden. Portabilität und Datenhoheit nicht mit rein lokaler KI-Verarbeitung verwechseln.
- **Geschichte 10, vorbereiteter Arbeitsplatz:** Die Grundstruktur aus Kontext, Regeln und Abläufen wird geliefert; Käufer richten sie anhand ihrer eigenen Angaben selbst ein. Diese Geschichte erklärt, wofür die 199 € gezahlt werden.
- **Dramaturgie:** Hauptbeispiel mit derselben Datei vom Erstellen über Ablage und Wiederfinden bis zur späteren Überarbeitung. Danach gemeinsamer Regelstand über Anbieter, portables Wissen und konkreter Lieferumfang. Vorher/nachher ohne unbewiesene Minutenersparnis.

## Storytelling und Beleggrundlage

[Research mit zehn Story-Vorschlägen](/Users/patrick/Documents/memory/research/2026-09-28-ki-system-kundennutzen-stories.md).

Die Story-Richtung ist von Patrick gewählt und oben dokumentiert. Konkrete Szenarien zeigen dieselbe Datei über ihren Lebenslauf und was als überprüfte Änderung entsteht. Erweiterte Workflows als einzurichtende Beispiele kennzeichnen. Keine erfundenen Kundenberichte, Zeiteinsparungen, autonomen Rund-um-die-Uhr-Leistungen oder „vergisst nie“-Versprechen.

## Verification

Build und vorhandene relevante Prüfungen ausführen. Landingpage und Angebotsübergänge auf Mobile/Desktop ansehen; Preis, Leistungsabgrenzung, CTA, Metadaten und Übersetzungen prüfen. Keine garantierten Ergebnisse aus bloßen Beispielen ableiten.

## Rollback

Seitenänderungen und neue Verlinkungen gezielt zurücknehmen, ohne andere laufende Website-Arbeiten zu verändern.

## Quelle

Patricks Angaben im Content-Gespräch vom 28.09.2026. Anlass: LinkedIn-Serie über das Gesamtangebot. Die separate Landingpage wird außerhalb der Content-Produktion umgesetzt.
