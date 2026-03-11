# Task 001: Deutsches Content Rewrite (de.ts)

## Status: Done

## Background

Alle Home-Page Translation Keys in `de.ts` muessen auf die neue Positionierung als AI-Produktstratege & Builder umgeschrieben werden. Das ist die kreative Hauptarbeit: Von Product-Team-Sprache zu KMU-Geschaeftsfuehrer-Sprache.

**IST:** "Your IT product team works hard. Without real results."
**SOLL:** AI-Chaos sortieren, Teams begeistern, Systeme bauen die bleiben.

## Acceptance Criteria

- [x] Hero: Neue Tagline + Headline + Description reflektieren AI-Produktstratege-Positionierung
- [x] Pain Points: 5 neue KMU-relevante Pain Points (nicht Product-Team-Probleme)
- [x] Mid CTA: Passend zur neuen Positionierung
- [x] Turning Point: 3 Narrative (Fokus, Begeisterung, Empathie) als Benefits
- [x] About: Neue Bio als AI-Produktstratege & Builder, W.A.F. als Proof Point
- [x] Process: 3 Schritte angepasst auf AI-Kontext
- [x] Final CTA + Post-Turning CTA: Aktualisiert
- [x] Footer role aktualisiert
- [x] "KMU" taucht NICHT im Kundentext auf
- [x] Writing Style Profile befolgt (warm, direkt, keine Gedankenstriche, keine Fuellwoerter)
- [x] Key-Namen bleiben identisch (nur Values aendern)
- [x] `npm run build` laeuft durch

## Non-Goals

- Testimonials aendern (bleiben wie sind)
- Packages/Preise darstellen
- Consultation Page oder Impressum aendern
- EN oder HR Uebersetzung (separate Tasks)
- Hero-Hintergrundbild aendern

## Technical Notes

- Datei: `src/lib/translations/de.ts`
- ~68 Keys betroffen (Hero, Pain Points, Mid CTA, Turning Point, Post-Turning CTA, About, Process, Final CTA, Footer)
- Kontext laden: `~/Documents/memory/business/positionierung.md`, `~/Documents/memory/business/angebote.md`
- TranslationKey Type wird aus de.ts abgeleitet. Keys muessen identisch bleiben.

### Neue Pain Points (Vorschlag)

1. AI bewegt sich zu schnell, wir verlieren den Anschluss
2. Wir wissen nicht, wo wir anfangen sollen
3. Tools ausprobiert, aber kein System dahinter
4. Keine interne AI-Kompetenz im Team
5. Wettbewerber sind schneller, wir reagieren nur

### Drei Narrative fuer Turning Point

1. **Fokus** - Trennt AI-Hype von echtem Business-Impact
2. **Begeisterung** - Nimmt die Angst, zeigt was moeglich ist
3. **Empathie** - Baut Systeme und befaehigt Teams

## Verification

- `npm run build` muss durchlaufen
- `npm run dev` und alle Sections visuell pruefen
- Texte laut lesen: Klingt es nach Patrick?
