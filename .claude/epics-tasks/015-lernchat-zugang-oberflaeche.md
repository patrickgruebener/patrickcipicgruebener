# Task 015: Zugang und Lernchat-Oberfläche

**Task:** 015
**Epic:** EPIC-015-018
**Status:** Implementiert; Deploy- und Browserprüfung ausstehend
**Erstellt:** 2026-10-04
**Priorität:** High
**Größe:** M
**Risk:** Medium

## Background

Der private Lernchat braucht einen widerrufbaren geheimen Zugang und eine einfache, kindgerechte Darstellung, die der Elternteil bedient. Die Portfolioseite verwendet Next.js 16, TypeScript und Tailwind CSS.

## Approach

Separate Route ohne Navigationseintrag. Ein zufälliger Zugangsschlüssel wird serverseitig geprüft, nur in einem httpOnly Sitzungscookie weiterverwendet und aus der sichtbaren URL entfernt. Oberfläche bietet Lernen, Übersetzen, Geschichten, Deutsch/Kroatisch, Foto-Vorschau und flüchtigen Verlauf.

## Scope

**Geändert:** Neue `/lernraum`-Route und Chat-Oberfläche; keine bestehenden Landingpages oder Übersetzungen.
**Neue Dateien:** Route und erforderliche UI-Komponenten.

## Acceptance Criteria

### Funktional
- [ ] Falsche und fehlende Schlüssel erhalten keinen API-Zugriff.
- [ ] Erfolgreicher Zugang entfernt den Schlüssel aus der Adresszeile und setzt ein geschütztes Sitzungscookie.
- [ ] Gespräch bleibt nur im Tab und kann gelöscht werden.
- [ ] Handy- und Desktopansicht unterstützen Text, Modi, Sprachwahl und Foto-Vorschau.
- [ ] Keine Links aus Navigation oder Sitemap; Route liefert `noindex` und `no-store`.

## Implementierungsstand

Route und Oberfläche sind umgesetzt. Cookie-Signatur und widerrufbarer Zugangsschlüssel haben Unit-Tests. Ein lokaler HTTP-Check war in dieser Sandbox nicht möglich, da das Starten eines lokalen Servers mit `listen EPERM` abgelehnt wurde.

### Code-Qualität
- [ ] TypeScript kompiliert ohne Fehler.
- [ ] ESLint besteht für geänderte Dateien.

### Non-Goals
- Kein Kinderlogin, keine dauerhafte Speicherung, keine Änderung bestehender Marketingseiten.

## Verification

Automatisiert: Lint, TypeScript, Zugriff ohne/falschen/richtigen Schlüssel.
Manuell: Desktop- und Mobilbrowser, Schlüsselbereinigung, Tab-Neuladen und „Neues Gespräch“.

## Rollback

Neue Route und UI-Dateien entfernen; andere Seiten bleiben unverändert.

## Ask Before Proceeding

- Keine. Umsetzung und Datenschutzgrenzen sind vom Auftraggeber bestätigt.
