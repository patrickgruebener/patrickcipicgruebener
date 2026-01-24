# Testing Plan für Kontaktformular (Codex)

## Übersicht
Dieser Plan beschreibt alle Tests, die für das Kontaktformular mit Spam-Schutz durchgeführt werden sollen.

---

## Voraussetzungen

### Lokales Testing
```bash
npm run dev
# Browser: http://localhost:3000/beratungstermin
```

### Staging Testing
- URL: https://test.patrickcipicgruebener.com/beratungstermin
- Sicherstellen, dass RESEND_API_KEY in Dokploy gesetzt ist

---

## Test-Kategorien

### 1. Happy Path Tests

#### Test 1.1: Erfolgreiche Formular-Submission
**Schritte:**
1. Öffne http://localhost:3000/beratungstermin
2. Fülle alle Felder korrekt aus:
   - Vorname: "Max"
   - Nachname: "Mustermann"
   - Telefon: "+49" und "123456789"
   - E-Mail: "max@example.com"
   - Datenschutz: Checkbox aktivieren
3. Klicke auf "Termin vereinbaren"

**Erwartetes Ergebnis:**
- Formular wird abgesendet
- Erfolgs-Bildschirm wird angezeigt mit grünem Banner
- E-Mail kommt bei patrickgruebener@gmail.com an
- E-Mail enthält alle eingegebenen Daten
- "Zurück zur Startseite" Button ist sichtbar

---

### 2. Validierungs-Tests

#### Test 2.1: Leeres Formular
**Schritte:**
1. Öffne Formular
2. Klicke direkt auf "Termin vereinbaren" (ohne Eingaben)

**Erwartetes Ergebnis:**
- Alle Felder zeigen Fehlermeldung "Dieses Feld ist erforderlich" (oder ähnlich)
- Formular wird NICHT abgesendet
- Kein API-Call wird gemacht

#### Test 2.2: Ungültige E-Mail-Adresse
**Schritte:**
1. Fülle alle Felder aus
2. E-Mail: "invalid-email" (ohne @ und Domain)
3. Submit

**Erwartetes Ergebnis:**
- E-Mail-Feld zeigt Fehler "Ungültige E-Mail-Adresse"
- Formular wird NICHT abgesendet

#### Test 2.3: Datenschutz nicht akzeptiert
**Schritte:**
1. Fülle alle Felder aus
2. Lasse Datenschutz-Checkbox leer
3. Submit

**Erwartetes Ergebnis:**
- Datenschutz-Feld zeigt Fehler
- Formular wird NICHT abgesendet

#### Test 2.4: Fehler verschwinden beim Tippen
**Schritte:**
1. Submit leeres Formular (Fehler werden angezeigt)
2. Beginne in Vorname-Feld zu tippen

**Erwartetes Ergebnis:**
- Vorname-Fehler verschwindet sofort
- Andere Fehler bleiben sichtbar

---

### 3. Spam-Schutz Tests

#### Test 3.1: Honeypot-Feld erkennt Bot
**Schritte:**
1. Öffne Formular
2. Öffne Browser DevTools (F12)
3. In der Console ausführen:
   ```javascript
   document.querySelector('input[name="website"]').value = 'bot-content';
   ```
4. Fülle restliches Formular korrekt aus
5. Submit

**Erwartetes Ergebnis:**
- Formular zeigt Erfolgs-Bildschirm (täuscht Erfolg vor)
- KEINE E-Mail wird gesendet
- Im Browser DevTools → Network → API-Call zeigt Status 200
- In Server-Logs (Dokploy): "Honeypot triggered" Warning sichtbar

#### Test 3.2: Rate Limiting (erste Submission)
**Schritte:**
1. Öffne Formular in neuem Inkognito-Tab (leerer localStorage)
2. Fülle Formular aus und submit
3. Warte auf Erfolgs-Bildschirm

**Erwartetes Ergebnis:**
- Formular wird erfolgreich abgesendet
- localStorage enthält jetzt 'lastContactSubmission' mit Timestamp

#### Test 3.3: Rate Limiting (zweite Submission blockiert)
**Schritte:**
1. Direkt nach Test 3.2: Gehe zurück zum Formular (Browser Back-Button)
2. Fülle Formular erneut aus
3. Submit

**Erwartetes Ergebnis:**
- Rote Fehler-Box wird angezeigt: "Bitte warten Sie noch XX Sekunden..."
- Formular wird NICHT abgesendet
- Sekunden-Countdown ändert sich bei erneutem Versuch

#### Test 3.4: Rate Limiting (nach Wartezeit)
**Schritte:**
1. Nach Test 3.3: Warte 60 Sekunden
2. Submit erneut

**Erwartetes Ergebnis:**
- Formular wird erfolgreich abgesendet
- Kein Rate-Limit-Fehler

---

### 4. XSS-Schutz Tests

#### Test 4.1: Script-Tag im Namen
**Schritte:**
1. Fülle Formular aus
2. Vorname: `<script>alert('XSS')</script>`
3. Nachname: "Mustermann"
4. Submit

**Erwartetes Ergebnis:**
- Formular wird abgesendet
- E-Mail kommt an
- In E-Mail: Vorname ist `alert('XSS')` (ohne `<script>` Tags)
- Kein JavaScript wird ausgeführt

#### Test 4.2: HTML-Injection im E-Mail-Feld
**Schritte:**
1. E-Mail: `test<b>bold</b>@example.com`
2. Submit

**Erwartetes Ergebnis:**
- Client-Validierung schlägt fehl (ungültige E-Mail)
- ODER: Formular wird abgesendet, aber `<b>` Tags werden entfernt

---

### 5. Error Handling Tests

#### Test 5.1: API-Error (ungültiger API-Key)
**Vorbereitung:** Temporär RESEND_API_KEY aus .env.local entfernen oder ungültig machen

**Schritte:**
1. Fülle Formular korrekt aus
2. Submit

**Erwartetes Ergebnis:**
- Rote Fehler-Box erscheint: "Es gab einen Fehler beim Senden..."
- Formular bleibt sichtbar (nicht ersetzt durch Erfolgs-Bildschirm)
- User kann erneut versuchen
- In Server-Logs: Console.log mit Demo-Modus-Meldung

**Aufräumen:** RESEND_API_KEY wieder hinzufügen

#### Test 5.2: Netzwerk-Fehler (offline)
**Schritte:**
1. Öffne Formular
2. Browser DevTools → Network → "Offline" aktivieren
3. Submit Formular

**Erwartetes Ergebnis:**
- Rote Fehler-Box: "Es gab einen Fehler..."
- Formular bleibt sichtbar

---

### 6. UI/UX Tests

#### Test 6.1: Ländercode-Auswahl
**Schritte:**
1. Klicke auf Ländercode-Dropdown
2. Wähle "+43" (Österreich)
3. Gib Telefonnummer ein
4. Submit

**Erwartetes Ergebnis:**
- Dropdown zeigt "+43" an
- E-Mail enthält "+43 123456789"

#### Test 6.2: Loading-State
**Schritte:**
1. Fülle Formular aus
2. Klicke Submit
3. Beobachte Button während API-Call

**Erwartetes Ergebnis:**
- Button zeigt "..." statt "Termin vereinbaren"
- Button ist disabled (kann nicht erneut geklickt werden)
- Nach Antwort: Button wird wieder normal oder Erfolgs-Screen erscheint

#### Test 6.3: Erfolgs-Screen "Zurück zur Startseite"
**Schritte:**
1. Erfolgreiche Submission
2. Klicke "Zurück zur Startseite" Button

**Erwartetes Ergebnis:**
- Browser navigiert zu "/"
- Startseite wird geladen

---

### 7. Mobile Tests

#### Test 7.1: Responsive Design
**Schritte:**
1. Öffne Formular auf Mobile (oder Browser DevTools → Mobile View)
2. Prüfe Layout

**Erwartetes Ergebnis:**
- Formular ist lesbar und nutzbar
- Inputs sind groß genug zum Tippen
- Buttons sind groß genug zum Klicken
- Kein horizontales Scrollen

#### Test 7.2: Mobile Keyboard
**Schritte (nur auf echtem Mobile-Gerät):**
1. Klicke E-Mail-Feld
2. Prüfe Keyboard-Typ

**Erwartetes Ergebnis:**
- E-Mail-Keyboard erscheint (mit @ Taste)

---

### 8. Cross-Browser Tests

Tests in folgenden Browsern durchführen:
- [ ] Chrome/Chromium (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop, falls Mac)
- [ ] Chrome (Mobile Android/iOS)
- [ ] Safari (Mobile iOS)

**Für jeden Browser:**
1. Happy Path Test (Test 1.1)
2. Validierungs-Test (Test 2.1)
3. Rate Limiting Test (Test 3.2)

---

### 9. Production/Staging Tests

**Nach Deployment auf test.patrickcipicgruebener.com:**

#### Test 9.1: Environment Variable gesetzt
**Schritte:**
1. Öffne https://test.patrickcipicgruebener.com/beratungstermin
2. Submit korrektes Formular

**Erwartetes Ergebnis:**
- E-Mail kommt bei patrickgruebener@gmail.com an
- NICHT "Demo-Modus" in Logs

#### Test 9.2: HTTPS funktioniert
**Schritte:**
1. Prüfe Browser-Adresszeile

**Erwartetes Ergebnis:**
- Schloss-Symbol sichtbar
- Keine Mixed-Content-Warnungen

#### Test 9.3: Performance
**Schritte:**
1. Browser DevTools → Network → Disable Cache
2. Lade Formular-Seite
3. Submit Formular

**Erwartetes Ergebnis:**
- Seite lädt in < 3 Sekunden
- API-Call antwortet in < 2 Sekunden
- Keine 404 oder 500 Fehler in Network Tab

---

## Automatisierungs-Optionen (Optional)

Falls automatisierte Tests gewünscht:

### Playwright Test Suite (Beispiel)
```typescript
// tests/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test('should submit contact form successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/beratungstermin');

  await page.fill('input[name="firstName"]', 'Max');
  await page.fill('input[name="lastName"]', 'Mustermann');
  await page.fill('input[type="tel"]', '123456789');
  await page.fill('input[type="email"]', 'max@example.com');
  await page.check('input[type="checkbox"]');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Vielen Dank')).toBeVisible();
});
```

---

## Test-Protokoll

### Vorlage für Test-Durchführung

| Test-ID | Titel | Status | Bemerkungen | Datum |
|---------|-------|--------|-------------|-------|
| 1.1 | Erfolgreiche Submission | ⏳ | | |
| 2.1 | Leeres Formular | ⏳ | | |
| 2.2 | Ungültige E-Mail | ⏳ | | |
| 2.3 | Datenschutz fehlt | ⏳ | | |
| 2.4 | Fehler verschwinden | ⏳ | | |
| 3.1 | Honeypot erkennt Bot | ⏳ | | |
| 3.2 | Rate Limiting Start | ⏳ | | |
| 3.3 | Rate Limiting Block | ⏳ | | |
| 3.4 | Rate Limiting Reset | ⏳ | | |
| 4.1 | XSS Script-Tag | ⏳ | | |
| 4.2 | HTML Injection | ⏳ | | |
| 5.1 | API Error Handling | ⏳ | | |
| 5.2 | Netzwerk-Fehler | ⏳ | | |
| 6.1 | Ländercode | ⏳ | | |
| 6.2 | Loading State | ⏳ | | |
| 6.3 | Zurück Button | ⏳ | | |
| 7.1 | Mobile Design | ⏳ | | |
| 7.2 | Mobile Keyboard | ⏳ | | |
| 9.1 | Production Env | ⏳ | | |
| 9.2 | HTTPS | ⏳ | | |
| 9.3 | Performance | ⏳ | | |

**Legende:**
- ⏳ = Ausstehend
- ✅ = Bestanden
- ❌ = Fehlgeschlagen
- ⚠️ = Teilweise bestanden (siehe Bemerkungen)

---

## Bekannte Einschränkungen

1. **localStorage Rate Limiting**: Kann durch Löschen von localStorage oder Inkognito-Modus umgangen werden. Dies ist bewusst akzeptiert (Lean-Ansatz).

2. **Honeypot**: Schützt nur vor einfachen Bots. Sophisticated Bots, die JavaScript analysieren, könnten es umgehen. Monitoring nach Launch empfohlen.

3. **E-Mail Delivery**: Resend Free Tier = 100 E-Mails/Tag. Bei mehr Spam → Server-side Rate Limiting hinzufügen.

---

## Post-Launch Monitoring

**In der ersten Woche nach Launch:**

1. Täglich E-Mail-Postfach prüfen auf Spam-Submissions
2. Dokploy Logs checken auf "Honeypot triggered" Warnungen
3. Bei >10 Spam/Tag → Server-side Rate Limiting implementieren
4. Bei Problemen → GitHub Issues erstellen mit Details

**Monitoring-Checkliste:**
- [ ] Tag 1: Logs checken
- [ ] Tag 3: Logs checken
- [ ] Tag 7: Logs checken + Spam-Rate bewerten
- [ ] Woche 2: Entscheidung über zusätzliche Maßnahmen

---

## Kontakt bei Test-Problemen

Bugs oder Fragen zu Tests:
- GitHub Issues: https://github.com/patrickgruebener/patrickcipicgruebener/issues
- Oder direkt an Patrick

---

**Viel Erfolg beim Testing! 🧪**
