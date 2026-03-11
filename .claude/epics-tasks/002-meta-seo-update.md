# Task 002: Meta/SEO und Layout Updates

## Status: Done

## Background

Meta-Tags, Open Graph Data und Impressum-Rolle stehen noch auf "Product Strategy Consultant". Muss auf die neue Positionierung aktualisiert werden, damit Google und Social Shares die richtige Message zeigen.

## Acceptance Criteria

- [x] Title: "Patrick Cipic Gruebener | AI-Produktstratege & Builder"
- [x] Description: Neue Tagline-basierte Beschreibung
- [x] Keywords: AI, Prozessautomation, Digitalisierung, AI-Strategie statt PM-Keywords
- [x] OpenGraph Title + Description aktualisiert
- [x] Twitter Card Title + Description aktualisiert
- [x] `impressum.tmg.role` in de.ts aktualisiert
- [x] `npm run build` laeuft durch

## Non-Goals

- Impressum-Inhalt komplett ueberarbeiten
- Neue Seiten oder Routen
- robots.txt oder Sitemap aendern

## Technical Notes

- `src/app/layout.tsx`: `generateMetadata()` Funktion (Zeile 16-52)
- `src/lib/translations/de.ts`: Key `impressum.tmg.role`
- Meta wird dynamisch generiert (indexable nur auf Produktions-Domain)

## Verification

- `npm run build` muss durchlaufen
- Browser DevTools: Meta-Tags im Inspector pruefen
- Social Share Preview Tool (z.B. opengraph.xyz) nach Staging Deploy
