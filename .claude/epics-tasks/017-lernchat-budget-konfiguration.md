# Task 017: Persistentes Monatsbudget und Laufzeitkonfiguration

**Task:** 017
**Epic:** EPIC-015-018
**Status:** Implementiert und in Dokploy konfiguriert
**Erstellt:** 2026-10-04
**Priorität:** High
**Größe:** M
**Risk:** High

## Background

Ein Browser-seitiges oder bloßes OpenAI-Dashboardlimit schützt die Anwendung nicht vor Anfragen über den geheimen Link. Das 5-EUR-Monatsbudget muss vor dem API-Aufruf serverseitig reserviert werden und Neustarts überstehen.

## Approach

Persistente Budgetdatei auf einem dedizierten Volume außerhalb des Website-Quellcodes. Monatszähler nach Europe/Zagreb, serialisierte Updates, konservative Reservierung vor dem Aufruf, Abgleich nach Verbrauch. Dokumentierte Umgebungsvariablen für Zugangsschlüssel, OpenAI-Schlüssel und Budgetpfad. Fehlende Konfiguration sperrt Chats.

## Scope

**Geändert:** Chat-API und serverseitige Budgetverwaltung.
**Neue Dateien:** Konfigurationsbeispiel und persistente Budgetlogik.

## Implementierungsstand

Budgetreservierung, paralleler Zugriff, Settlement und fail-closed Verhalten sind implementiert. Budgettests bestehen. Der Inhaber bestätigt, dass Wechselkurs, Budgetpfad und persistentes Volume in Dokploy eingerichtet sind.

## Acceptance Criteria

### Funktional
- [ ] Fehlende Konfiguration verweigert jede Anfrage.
- [ ] Budgetstatus und Verbrauch überstehen Prozessneustart.
- [ ] Parallele Aufrufe können die Budgetgrenze nicht überschreiten.
- [ ] Bei 5 EUR Monatslimit werden neue Anfragen abgelehnt, bevor ein weiterer Modellaufruf beginnt.
- [ ] Reservierungen bei Timeouts bleiben sicherheitshalber gebucht.

### Code-Qualität
- [ ] Tests decken Neustart, Monatswechsel, Parallelzugriff und Grenzfall ab.
- [ ] Keine Schlüssel oder Eingaben erscheinen in Logs.

### Non-Goals
- Kein unbegrenztes Guthaben, keine öffentliche Kostenanzeige und kein automatischer Modellwechsel.

## Verification

Automatisiert: `npm run test:lernchat`; Budgetgrenze, Settlement, fehlende Konfiguration und Schlüsselprüfung.
Manuell: Staging-Konfiguration dokumentieren, ohne Live-Secrets oder Deploymentänderungen.

## Rollback

Chat deaktivieren und neue Umgebungsvariablen entfernen. Bestehende Website-Funktionen bleiben verfügbar.

## Ask Before Proceeding

- Keine.
