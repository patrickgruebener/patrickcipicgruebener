# Task 004: English Translation (en.ts)

## Status: Draft

## Background

Alle in Task 001 und 002 geaenderten deutschen Texte muessen ins Englische uebersetzt werden. Kein kreatives Schreiben, sondern natuerliche Uebersetzung. DE ist Source of Truth.

## Acceptance Criteria

- [ ] Alle geaenderten Home-Page Keys in en.ts spiegeln den neuen DE-Content
- [ ] Footer role auf Englisch aktualisiert
- [ ] Impressum role auf Englisch aktualisiert
- [ ] Natuerliches Englisch, keine woertliche Uebersetzung
- [ ] `npm run build` laeuft durch
- [ ] Language Switcher zeigt korrekte EN-Version

## Non-Goals

- HR Uebersetzung (niedrige Prio, optional, separater Task)
- Consultation Page Texte uebersetzen (nur wenn in 001 geaendert)
- Kreatives Umschreiben (DE ist die Vorlage)

## Technical Notes

- Datei: `src/lib/translations/en.ts`
- Abhaengigkeit: Task 001 (DE Content) + Task 002 (Meta/Impressum) muessen fertig sein
- Alle 164 Keys existieren bereits in en.ts. Nur geaenderte Keys updaten.
- Language Switcher speichert in Cookie, Page reload fuer Server-Components

## Verification

- `npm run build` muss durchlaufen
- `npm run dev`, Language Switcher auf EN, alle Sections durchklicken
- Keine fehlenden oder leeren Keys
