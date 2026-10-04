# Task 018: Gesamtprüfung und Betriebsdokumentation

**Task:** 018
**Epic:** EPIC-015-018
**Status:** Implementiert; Deploy- und Laufzeitprüfung ausstehend
**Erstellt:** 2026-10-04
**Priorität:** High
**Größe:** S
**Risk:** Medium

## Background

Der Chat kombiniert privaten Zugang, Bildübertragung, KI-Ausgaben und Kostenlimit. Vor der Bereitstellung muss die integrierte Funktion geprüft und ihr sicherer Betrieb verständlich dokumentiert werden.

## Approach

Gezielte automatisierte Tests und Produktionsbuild ausführen, mobile Nutzung lokal prüfen, dann Task und Betriebsvariablen aktualisieren. Produktion und Deployment bleiben aus.

## Scope

**Geändert:** Projektdokumentation und Epic-Abnahmezustände.
**Neue Dateien:** Keine.

## Implementierungsstand

Produktionsbuild, gezielter ESLint-Lauf und `npm run test:lernchat` bestehen. Der vollständige ESLint-Lauf scheitert an vorhandenen Fehlern in anderen Dateien. Lokaler HTTP-/Browsercheck war durch Sandbox-Netzwerkregeln blockiert. Dokploy-Konfiguration und reale Modellantwort stehen offen.

## Acceptance Criteria

### Funktional
- [ ] Zugangs-, Text-, Foto-, Moderations- und Budgetverhalten wurde integriert geprüft.
- [ ] Task beschreibt alle benötigten Umgebungsvariablen und den persistenten Speicherpfad.
- [ ] Epic-Abnahmekriterien werden anhand bestandener Checks aktualisiert.

### Code-Qualität
- [ ] TypeScript, ESLint, Produktionsbuild und relevante Tests bestehen.

### Non-Goals
- Kein Push, Dokploy-Update oder Live-Schalten.

## Verification

Automatisiert: Projektchecks und relevante Tests.
Manuell: lokale Desktop-/Mobilprüfung mit erfundenen, datensparsamen Beispielen.

## Rollback

Nur Task-/Betriebsdokumentation aktualisieren; technische Änderung bleibt über separate Commits revertierbar.

## Ask Before Proceeding

- Keine.
