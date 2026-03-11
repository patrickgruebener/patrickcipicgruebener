# Epic: Website Messaging Relaunch (Task 013)

**Epic:** 013 (Ref: AI OS Task 013, EPIC-006-015)
**Status:** In Progress
**Erstellt:** 2026-03-11
**Prioritaet:** Medium

## Kontext

Die Website spricht aktuell Product Teams in Tech Companies an ("Your IT product team works hard. Without real results."). Die neue Positionierung als **AI-Produktstratege & Builder** richtet sich an **Geschaeftsfuehrer in Unternehmen mit 10-100 MA (DACH)**. Das komplette Messaging muss umgeschrieben werden.

Alle Texte leben in Translation-Files (`de.ts`, `en.ts`, `hr.ts` mit je 164 Keys). Komponenten referenzieren nur Keys via `t('key.name')`. Solange Key-Namen gleich bleiben, gibt es keine TypeScript-Probleme.

**Packages/Preise:** Kommen spaeter in einem separaten Task. Nicht Teil dieses Epics.

## Entscheidungen

| Entscheidung | Ergebnis |
|---|---|
| Testimonials | Alle 4 bleiben (inkl. blackned). Keine Aenderung an Testimonials-Section |
| Packages | Nicht im Scope. Spaeter separat |
| HR Uebersetzung | Niedrige Prio, optional |
| Hero-Bild | Nicht im Scope. Kann spaeter kommen |
| Seitenstruktur | Bleibt wie ist. Keine neuen Seiten |

## Task-Uebersicht

| Task | Name | Prioritaet | Status | Abhaengigkeiten |
|---|---|---|---|---|
| [001](done/001-content-rewrite-de.md) | Deutsches Content Rewrite (de.ts) | Critical | Done | - |
| [002](002-meta-seo-update.md) | Meta/SEO und Layout Updates | High | Draft | - |
| [003](003-pain-point-icons.md) | Pain Point Icons Update | Medium | Draft | 001 |
| [004](004-content-translation-en.md) | English Translation (en.ts) | High | Draft | 001, 002 |
| [005](005-staging-qa.md) | Staging Deploy und QA | High | Draft | 001-004 |

### Dependency Graph

```
001 DE Content ──┬──> 003 Icons (nach Content, damit Icons passen)
                 │
002 Meta/SEO  ───┼──> 004 EN Translation ──> 005 Staging QA
                 │
                 └──> 005 Staging QA
```

001 und 002 sind unabhaengig voneinander. 003 braucht 001 (Icons muessen zu den neuen Pain Points passen). 004 braucht 001 + 002. 005 ist der Abschluss.

## Kontext-Dateien

| Datei | Inhalt |
|---|---|
| `src/lib/translations/de.ts` | Hauptarbeit: Alle deutschen Texte |
| `src/lib/translations/en.ts` | Englische Uebersetzung |
| `src/components/sections/PainPointsSection.tsx` | Icons anpassen |
| `src/app/layout.tsx` | Meta-Tags |
| `~/Documents/memory/business/positionierung.md` | Neue Positionierung |
| `~/Documents/memory/business/angebote.md` | Angebote (Kontext) |

## Abnahmekriterien

- [ ] Hero spiegelt neue Positionierung als AI-Produktstratege & Builder
- [ ] Pain Points sind KMU-relevant (nicht Tech-Team-relevant)
- [ ] About-Text auf Writing Style Profile
- [ ] DE + EN Uebersetzungen aktuell
- [ ] Meta-Tags und OG-Data aktualisiert
- [ ] Staging deployed und getestet
- [ ] 10-Sekunden-Test: Nicht-Techie versteht sofort was Patrick anbietet
