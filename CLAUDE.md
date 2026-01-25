# Patrick Cipic Grübener - Portfolio Website

## Projekt-Übersicht
Persönliche Portfolio-Website für Patrick Cipic Grübener (Strategic Product Manager & UX-Driven Certified Scrum Product Owner).

**Status**: Infrastruktur fertig, Website-Entwicklung als nächstes

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Dokploy (self-hosted PaaS)
- **Hosting**: Hostinger VPS

---

## Infrastruktur

### VPS (Hostinger)
- **IP**: `76.13.11.84`
- **OS**: Ubuntu 24.04 LTS
- **SSH**: `ssh root@76.13.11.84` (via SSH-Key, kein Passwort)

### Dokploy
- **Admin Panel**: http://76.13.11.84:3000
- **Account**: patrickgruebener@gmail.com

### Domains
| Domain | Zweck | Status |
|--------|-------|--------|
| `test.patrickcipicgruebener.com` | Test/Staging | ✅ Aktiv |
| `patrickcipicgruebener.com` | Produktion | Noch bei Figma Make |
| `www.patrickcipicgruebener.com` | Produktion | DNS noch nicht umgestellt |

### DNS (bei IONOS)
- Domain-Registrar: IONOS
- A-Record `test` → `76.13.11.84` (TTL: 300)
- Weitere Records für Produktion noch ausstehend

---

## Git & GitHub

### Repository
- **URL**: https://github.com/patrickgruebener/patrickcipicgruebener
- **Branch**: main
- **Autodeploy**: Aktiviert (Push → automatisches Deployment)

### Git Config (Global)
```
user.name: Patrick Cipic Grübener
user.email: patrickgruebener@users.noreply.github.com
```

### SSH-Key
- **Pfad**: `~/.ssh/id_ed25519`
- **Verwendet für**: GitHub + VPS

---

## Environment Variables (Dokploy)

### Konfiguration im Dokploy Admin Panel

Im Dokploy Admin Panel unter Settings → Environment:

| Variable | Wert | Beschreibung |
|----------|------|--------------|
| `RESEND_API_KEY` | `re_bpwem86j_...` | Resend API Key für Kontaktformular |

**Wichtige Hinweise:**
- ⚠️ NIEMALS API Keys in Git committen!
- `.env.local` ist für lokale Entwicklung (wird nicht committed)
- `.env.example` zeigt die benötigten Variablen (WIRD committed)
- Für Produktion: Separate API Keys verwenden (erstellen auf https://resend.com/api-keys)

### Deployment-Checkliste

Nach Code-Änderungen:
1. Lokal testen: `npm run dev`
2. Build testen: `npm run build`
3. Git Push: Code wird automatisch deployed
4. Environment-Variablen in Dokploy prüfen
5. Live-Test auf test.patrickcipicgruebener.com

---

## Workflow

```
1. Lokal entwickeln    → npm run dev (localhost:3000 oder 3001)
2. Änderungen testen   → Browser localhost
3. Commit & Push       → git add . && git commit -m "..." && git push
4. Auto-Deployment     → Dokploy baut und deployed automatisch
5. Live prüfen         → https://test.patrickcipicgruebener.com
```

---

## Nächste Schritte

1. **Website entwickeln** basierend auf Figma-Design
   - Hero Section
   - Über mich / Bio
   - Kontaktformular
   - Footer
   - Impressum

2. **Produktion umstellen**
   - DNS bei IONOS: `@` und `www` → `76.13.11.84`
   - Domain in Dokploy hinzufügen
   - HTTPS aktivieren

3. **Optional später**
   - n8n Setup auf `n8n.patrickcipicgruebener.com`
   - Domain-Transfer von IONOS zu Hostinger

---

## Wichtige Befehle

```bash
# Lokaler Dev-Server
npm run dev

# Build testen
npm run build

# Deployment (automatisch bei Push)
git add . && git commit -m "Beschreibung" && git push

# VPS Verbindung
ssh root@76.13.11.84

# DNS prüfen
dig +short test.patrickcipicgruebener.com A
```

---

## Shell Aliase

Für schnellen Zugriff auf das Projekt sind folgende Aliase in `~/.bash_profile` konfiguriert:

```bash
# Projekt-Shortcuts
devpatrick       # Wechselt ins Projekt und startet npm run dev
buildpatrick     # Wechselt ins Projekt und führt npm run build aus
cdpatrick        # Wechselt nur ins Projektverzeichnis

# Allgemeine Shortcuts
projects         # Wechselt ins Freelance-Hauptverzeichnis
```

**Verwendung:**
```bash
# Von überall im Terminal einfach eingeben:
devpatrick

# Oder zum Bauen:
buildpatrick
```

**Hinweis:** Nach Änderungen an `.bash_profile` mit `source ~/.bash_profile` neu laden oder neues Terminal öffnen.

---

## Design-Referenz
- Figma-Design vorhanden (noch zu teilen)
- Aktuelle Live-Seite: https://www.patrickcipicgruebener.com (Figma Make)
