# Task 016: Chat- und Bild-API mit Moderation

**Task:** 016
**Epic:** EPIC-015-018
**Status:** Implementiert; Deploy- und API-Prüfung ausstehend
**Erstellt:** 2026-10-04
**Priorität:** High
**Größe:** M
**Risk:** High

## Background

Die Oberfläche benötigt einen serverseitigen OpenAI-Zugriff, der Text und Fotos für Übersetzung und Lernen verarbeitet, ohne API-Schlüssel an den Browser zu geben oder Gesprächsdaten dauerhaft zu speichern.

## Approach

Responses API mit `store:false`, festem Server-Prompt und limitierten Eingaben und Ausgaben. Bilder werden validiert und komprimiert, direkt zur Anfrage übermittelt und nicht abgelegt. Moderation vor und nach dem Modell; bei Moderations- oder API-Fehlern keine unmoderierte Antwort anzeigen.

## Scope

**Geändert:** Neue Chat-API-Route und OpenAI-SDK-Abhängigkeit falls notwendig.
**Neue Dateien:** Serverseitige API- und begrenzte Eingabevalidierung.

## Implementierungsstand

Die API ist implementiert und besteht TypeScript/Produktionsbuild. Der Inhaber hat bestätigt, dass die benötigten Dokploy-Variablen gesetzt sind. Modellaufruf und Moderationspfad müssen nach dem Deploy mit datensparsamen Beispielinhalten geprüft werden.

## Acceptance Criteria

### Funktional
- [ ] Antworten unterstützen Deutsch und Kroatisch sowie altersgerechte Geschichten.
- [ ] Ein Foto eines kroatischen Schultexts wird ins Deutsche übersetzt; Wörter und Aufgabenstellung werden erklärt.
- [ ] Vollständige Aufgabenlösung nur nach expliziter Bitte; vorher Hinweise und Rückfragen.
- [ ] Dateityp, Dateigröße, Eingabelänge und Ausgabelänge sind serverseitig begrenzt.
- [ ] Moderationsblock oder Moderationsausfall führt zu einer altersgerechten sicheren Meldung, nicht zur ungeprüften Antwort.
- [ ] OpenAI-Schlüssel ist ausschließlich serverseitig; API-Anfragen sind zustandslos und Chat/Bilder werden nicht gespeichert oder geloggt.

### Code-Qualität
- [ ] TypeScript kompiliert und Lint besteht.
- [ ] Tests decken die Kriterien und Fehlerpfade ab.

### Non-Goals
- Keine Speicherung, Suche, Audioverarbeitung oder Bildgenerierung.

## Verification

Automatisiert: gefälschter API-Client testet Moderation, Größenlimits, Modusregeln, Fehler und fehlende Konfiguration.
Manuell: Beispiel ohne persönliche Daten für kroatischen Text, Lernhinweis, explizite Lösung und unleserliches Foto.

## Rollback

Chat-API und zugehörige Abhängigkeit entfernen; bestehende API-Routen bleiben unverändert.

## Ask Before Proceeding

- Keine.
