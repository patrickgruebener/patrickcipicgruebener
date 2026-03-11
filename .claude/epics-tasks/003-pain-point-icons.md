# Task 003: Pain Point Icons Update

## Status: Draft

## Background

Die aktuellen Icons in PainPointsSection (RouteIcon, ListXIcon, CompassIcon, ColumnsIcon, LayersIcon) sind Product/Backlog-Metaphern. Die neuen Pain Points drehen sich um AI, Geschwindigkeit, Orientierung und Kompetenz. Die Icons muessen dazu passen.

## Acceptance Criteria

- [ ] 5 neue SVG-Icons passend zu den neuen Pain Points
- [ ] Icons sind visuell konsistent (gleicher Stroke-Stil, gleiche Groesse)
- [ ] Farbschema bleibt (red-600 auf red-50/orange-50 Hintergrund)
- [ ] `npm run build` laeuft durch

## Non-Goals

- Layout oder Struktur der PainPointsSection aendern
- Andere Sections anfassen
- Animationen hinzufuegen

## Technical Notes

- Datei: `src/components/sections/PainPointsSection.tsx`
- 5 inline SVG Icon-Komponenten (RouteIcon, ListXIcon, CompassIcon, ColumnsIcon, LayersIcon)
- Array `painPoints` mappt Keys zu Icons
- Abhaengigkeit: Task 001 muss fertig sein (Icons muessen zu finalen Pain Points passen)

### Icon-Vorschlaege

| Pain Point | Moegliches Icon |
|---|---|
| AI zu schnell | Zap / Lightning |
| Nicht wissen wo anfangen | Compass / Map |
| Tools ohne System | Puzzle / Unlink |
| Keine AI-Kompetenz | Brain / GraduationCap |
| Wettbewerber schneller | TrendingUp / Rocket |

## Verification

- `npm run build` muss durchlaufen
- Visuell pruefen: Icons passen zu den Texten
- Mobile: Icons korrekt skaliert
