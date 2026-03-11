# Task 005: Staging Deploy und QA

## Status: Draft

## Background

Nach Abschluss aller Content-Tasks wird auf Staging deployed und komplett durchgetestet. Dies ist der Abnahme-Gate bevor die Aenderungen live gehen.

## Acceptance Criteria

- [ ] `npm run build` lokal clean
- [ ] Push to main, Auto-Deploy auf test.patrickcipicgruebener.com
- [ ] DE-Version: Alle Sections rendern korrekt
- [ ] EN-Version: Language Switcher funktioniert, alle Keys uebersetzt
- [ ] Mobile Responsive Check (Hero, Pain Points, About, Process)
- [ ] 10-Sekunden-Test: Nicht-Techie versteht sofort was Patrick anbietet
- [ ] Alle CTA-Buttons verlinken korrekt auf /beratungstermin
- [ ] Kontaktformular funktioniert
- [ ] Keine Console-Errors
- [ ] Meta-Tags korrekt (Browser DevTools)
- [ ] Testimonials rendern korrekt (alle 4)

## Non-Goals

- Performance-Optimierung
- Lighthouse-Score verbessern
- Produktions-Domain umstellen

## Technical Notes

- Staging: test.patrickcipicgruebener.com
- Auto-Deploy via Dokploy bei Push auf main
- Abhaengigkeit: Tasks 001-004 muessen alle fertig sein

## Verification

- Manueller Walkthrough DE + EN
- Mobile Check (Chrome DevTools oder echtes Geraet)
- Patrick zeigt die Seite einer nicht-technischen Person
