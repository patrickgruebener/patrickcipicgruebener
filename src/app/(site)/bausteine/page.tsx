import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClosingCta } from '@/components/sections/closing-cta';
import { Button, buttonStyles } from '@/components/ui/Button';
import { Card, CardContent, CardFlag, CardPrice } from '@/components/ui/Card';
import { FileTree, FileTreeNode } from '@/components/ui/file-tree';
import { Figure } from '@/components/ui/figure';
import { FlowSketch } from '@/components/ui/flow-sketch';
import { Input } from '@/components/ui/Input';
import { Leitlinie } from '@/components/ui/leitlinie';

// Internal component sheet for the Werkstatt redesign. Not linked anywhere, never indexed.
export const metadata: Metadata = {
  title: 'Bausteine | Patrick Cipic Grübener',
  robots: { index: false, follow: false },
};

// Cleaned example from the moodboard, within the approved list in .claude/memory.md
const TEAM_SYSTEM: FileTreeNode = {
  name: 'ki-system/',
  children: [
    { name: 'CLAUDE.md', note: 'Regeln für alle Agenten' },
    {
      name: 'memory/',
      children: [
        { name: 'kunden/', note: 'ein Ordner pro Kunde' },
        { name: 'entscheidungen/', note: 'was, wann, warum' },
        { name: 'wissen/' },
      ],
    },
    {
      name: 'skills/',
      children: [
        { name: 'angebot/', note: 'Angebot als Word und PDF' },
        { name: 'meeting-summary/' },
      ],
    },
    { name: 'sessions/', note: 'Protokoll jeder Sitzung' },
  ],
};

const COLLAB_STEPS = ['Verstehen', 'Planen', 'Umsetzen', 'Befähigen'];

const COLLAB_DIMENSIONS = [
  { from: 2, to: 2, label: 'ich baue' },
  { from: 3, to: 3, label: 'ich zeige' },
];

function Sheet({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-[72px]">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="mb-10 grid grid-cols-1 gap-x-12 gap-y-6 min-[821px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="font-display text-[clamp(40px,9.4vw,57px)] leading-[0.9] font-[820] tracking-[-0.005em] text-balance">
            {title}
          </h2>
          <p className="max-w-[64ch] text-ink-2">{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm text-ink-2">{children}</p>;
}

export default function BausteinePage() {
  return (
    <div className="min-h-screen bg-paper text-[17px] leading-[1.55] text-ink antialiased">
      <Header currentPage="bausteine" />

      <main>
        <section className="pt-14 pb-[72px]">
          <div className="mx-auto max-w-[1180px] px-4">
            <h1 className="mb-7 font-display text-[clamp(56px,11vw,128px)] leading-[0.9] tracking-[-0.005em] text-balance">
              <span className="font-light">Bausteine der</span>{' '}
              <span className="block font-[820] text-brand-blue">Werkstatt.</span>
            </h1>
            <p className="max-w-[64ch] text-xl">
              Interne Übersicht aller Bausteine für das Redesign. Die Seite ist nicht verlinkt und
              nicht indexiert. Texte stammen von der heutigen Website.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-[1180px] px-4">
          <Leitlinie />
        </div>

        <Sheet
          title="Bedienelemente"
          text="Primärbutton vollblau mit weißer Schrift, der Verlauf nur als 3 px Unterkante. Sekundär ist ein Textlink mit grüner Unterstreichung."
        >
          <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 min-[901px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div className="grid gap-10">
              <div>
                <Label>Buttons und Links</Label>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link href="/beratungstermin" className={buttonStyles()}>
                    Beratungstermin reservieren
                  </Link>
                  <Link href="/ki-system" className={buttonStyles({ variant: 'secondary' })}>
                    Persönliches KI-System entdecken
                  </Link>
                </div>
              </div>
              <div>
                <Label>Größe sm (Header) und Button-Element</Label>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link href="/beratungstermin" className={buttonStyles({ size: 'sm' })}>
                    Beratungstermin
                  </Link>
                  <Button type="button">Nachricht senden</Button>
                  <Button type="button" variant="ghost">
                    Abbrechen
                  </Button>
                </div>
              </div>
              <div className="max-w-[360px]">
                <Label>Eingabefeld</Label>
                <div className="grid gap-6">
                  <Input id="bausteine-mail" type="email" label="E-Mail" placeholder="name@firma.de" />
                  <Input
                    id="bausteine-mail-error"
                    type="email"
                    label="E-Mail mit Fehler"
                    defaultValue="name@firma"
                    error="Bitte gib eine gültige E-Mail-Adresse ein."
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <Card highlighted>
                <CardContent>
                  <CardFlag>Für deine eigene Arbeit</CardFlag>
                  <h3 className="text-[22px] font-bold">Persönliches KI-System</h3>
                  <CardPrice unit="einmalig">199 €</CardPrice>
                  <p className="max-w-[64ch]">
                    Ein vorbereiteter Arbeitsplatz für KI. Deine Arbeit gehört nicht in einen Chatverlauf.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                    <Link href="/ki-system" className={buttonStyles()}>
                      Kauf anfragen
                    </Link>
                    <Link href="/beratungstermin" className={buttonStyles({ variant: 'secondary' })}>
                      Gespräch buchen
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="text-[22px] font-bold">Karte ohne Hervorhebung</h3>
                  <p className="max-w-[64ch] text-ink-2">Haarlinie, Radius 4 px, kein Schatten.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Sheet>

        <Sheet
          title="Technische Zeichnung"
          text="Dateibäume und Ablaufskizzen, gerahmt wie Blätter in einer Planmappe, mit Schnittmarken und nummerierter Abbildung. Dateibäume zeigen nur Ordner aus der freigegebenen Positivliste."
        >
          <div className="grid grid-cols-1 items-start gap-8 min-[901px]:grid-cols-2">
            <Figure number={1} caption="Aufbau eines KI-Systems für ein Team, bereinigtes Beispiel">
              <FileTree root={TEAM_SYSTEM} label="Dateibaum eines KI-Systems mit CLAUDE.md, memory, skills und sessions" />
            </Figure>
            <Figure number={2} caption="Ablauf einer Zusammenarbeit, mit Maßlinien statt Nummernkreisen">
              <FlowSketch
                steps={COLLAB_STEPS}
                tail="ihr macht weiter"
                dimensions={COLLAB_DIMENSIONS}
                label="Ablauf: Verstehen, Planen, Umsetzen, Befähigen, danach macht das Team weiter"
              />
            </Figure>
          </div>
        </Sheet>

        <Sheet
          title="Leitlinie"
          text="Eine Linie pro Seite oder Grafik, 4 px. Unter dem ersten Bildschirm, an der Oberkante des Abschluss-CTA oder am Fuß einer Grafik."
        >
          <div className="grid max-w-[360px] gap-2.5">
            <span className="font-display text-[31px] leading-none font-[820]">Überschrift</span>
            <Leitlinie />
          </div>
        </Sheet>

        <Sheet
          title="Abschluss-CTA"
          text="Ein Baustein für alle Seiten. Planfläche, Leitlinie oben, Headline leicht gegen schwer, Porträt. Inhalt kommt per Props."
        >
          <ClosingCta
            headlineLight="Was fehlt, ist nicht bessere KI."
            headlineHeavy="Was fehlt, ist ein System, das lernt."
            text="20 Minuten, kostenfrei und unverbindlich."
            buttonLabel="Beratungstermin reservieren"
            href="/beratungstermin"
            portrait={{
              src: '/images/profile.webp',
              alt: 'Porträt Patrick Čipić Grübener',
              name: 'Patrick Čipić Grübener',
              role: 'AI-Produktstratege und Builder',
            }}
          />
        </Sheet>
      </main>

      <Footer />
    </div>
  );
}
