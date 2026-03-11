# Task 005: Staging Deploy und QA

## Status: Done

## Background

Nach Abschluss aller Content-Tasks wird auf Staging deployed und komplett durchgetestet. Dies ist der Abnahme-Gate bevor die Aenderungen live gehen.

## Acceptance Criteria

- [x] `npm run build` lokal clean
- [x] Push to main, Auto-Deploy auf test.patrickcipicgruebener.com
- [x] DE-Version: Alle Sections rendern korrekt
- [x] EN-Version: Language Switcher funktioniert, alle Keys uebersetzt
- [x] Mobile Responsive Check (Hero, Pain Points, About, Process)
- [x] 10-Sekunden-Test: Nicht-Techie versteht sofort was Patrick anbietet (manuell durch Patrick)
- [x] Alle CTA-Buttons verlinken korrekt auf /beratungstermin
- [x] Kontaktformular funktioniert
- [x] Keine Console-Errors
- [x] Meta-Tags korrekt (Browser DevTools)
- [x] Testimonials rendern korrekt (alle 4)

## Zusaetzliche Fixes (im Rahmen QA)

- og:image und canonical hinzugefuegt (layout.tsx)
- Testimonial Anna-Theresa Volkmann: Jobtitel in EN + HR uebersetzt
- Kontaktformular: Nachrichtenfeld hinzugefuegt, Telefon optional gemacht

## Non-Goals

- Performance-Optimierung
- Lighthouse-Score verbessern
- Produktions-Domain umstellen

## Technical Notes

- Staging: test.patrickcipicgruebener.com
- Auto-Deploy via Dokploy bei Push auf main
- Abhaengigkeit: Tasks 001-004 muessen alle fertig sein

## Verification

- Playwright MCP QA-Run: alle Criteria automatisch geprueft
- Manueller Walkthrough: Patrick hat Kontaktformular getestet
- Mobile Check: Playwright 390px Viewport (iPhone 14 Pro)
