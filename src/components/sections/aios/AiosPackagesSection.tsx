import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Card, CardFlag, CardPrice } from "@/components/ui/Card";
import { Section, SectionHead } from "@/components/sections/section-shell";
import { getLanguage } from "@/lib/i18n.server";
import type { Language } from "@/lib/i18n";

type PackageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  from: string;
  once: string;
  included: string;
  cta: string;
  recommended: string;
  packages: {
    name: string;
    audience: string;
    price: string;
    description: string;
    items: string[];
  }[];
  compareEyebrow: string;
  compareTitle: string;
  compareIntro: string;
  features: {
    useCase: string;
    basic: string;
    team: string;
    custom: string;
  }[];
  prerequisites: string;
};

const copy: Record<Language, PackageCopy> = {
  de: {
    eyebrow: "Dein Einstieg",
    title: "Ein System, das mit deinem Team wachsen kann.",
    intro: "Du startest mit einem gemeinsamen Arbeitskontext. Wenn dein Team ihn nutzt, kommen Projektwissen, eigene Abläufe oder Anbindungen gezielt dazu.",
    from: "ab",
    once: "einmalig",
    included: "Im Paket",
    cta: "Paket besprechen",
    recommended: "Für Teams",
    packages: [
      {
        name: "Basis",
        audience: "Für den ersten gemeinsamen KI-Arbeitsplatz",
        price: "1.990 €",
        description: "Unternehmenskontext und Arbeitsregeln stehen deinem Team am freigegebenen Arbeitsort zur Verfügung.",
        items: ["Ein gemeinsamer Arbeitsbereich", "Bis zu zwei Pilotnutzer", "Firmenkontext und Arbeitsregeln", "Ein Praxistest und kurze Übergabe"],
      },
      {
        name: "Team",
        audience: "Für mehrere Personen und wiederkehrende Arbeit",
        price: "3.990 €",
        description: "Dein Team nutzt denselben Kontext in mehreren Arbeitsbereichen und erhält einen ersten eigenen Ablauf.",
        items: ["Mehrere vereinbarte Arbeitsbereiche", "Bis zu fünf Pilotnutzer", "Strukturiertes Projekt- und Entscheidungswissen", "Ein individuell eingerichteter Ablauf", "Zwei Praxistests und Übergabe"],
      },
      {
        name: "Individuell",
        audience: "Für Anbindungen und weitere Entwicklung",
        price: "Auf Anfrage",
        description: "Wir planen die Funktionen, die für eure Prozesse tatsächlich gebraucht werden.",
        items: ["Weitere Teams und Berechtigungsgruppen", "E-Mail, Kalender oder Fachsoftware nach Prüfung", "Zusätzliche Abläufe und Automationen", "Laufende Pflege nach Vereinbarung"],
      },
    ],
    compareEyebrow: "Funktionen im Alltag",
    compareTitle: "Was kann dein Team mit welcher Version tun?",
    compareIntro: "Die Tabelle zeigt den vereinbarten Ausbau. Neue Informationen werden gezielt gepflegt; das System übernimmt nicht automatisch jeden Chat als geprüftes Firmenwissen.",
    features: [
      { useCase: "Firmenregeln in neuen KI-Sitzungen nutzen", basic: "Enthalten", team: "Enthalten", custom: "Nach Bedarf" },
      { useCase: "In freigegebenen Arbeitsordnern mit Dateien arbeiten", basic: "Ein Bereich", team: "Mehrere Bereiche", custom: "Nach Bedarf" },
      { useCase: "Projektwissen und Entscheidungen dauerhaft wiederfinden", basic: "Nicht enthalten", team: "Strukturiert", custom: "Nach Bedarf" },
      { useCase: "Eine wiederkehrende Aufgabe mit einem eigenen Ablauf erledigen", basic: "Nicht enthalten", team: "Ein Ablauf", custom: "Nach Bedarf" },
      { useCase: "E-Mail, Kalender oder Fachsoftware anbinden", basic: "Nicht enthalten", team: "Nicht enthalten", custom: "Nach Prüfung" },
      { useCase: "Wiederkehrende Arbeit automatisch ausführen lassen", basic: "Nicht enthalten", team: "Nicht enthalten", custom: "Nach Prüfung" },
    ],
    prerequisites: "Festpreise ab angegebenem Betrag nach Prüfung von Arbeitsplätzen, Rechten und vorhandener IT. Lizenzen und IT-Leistungen trägt das Unternehmen selbst. Ein individueller Workshop kann separat gebucht werden.",
  },
  en: {
    eyebrow: "Your starting point",
    title: "A system that can grow with your team.",
    intro: "Start with a shared working context. Once your team uses it, add project knowledge, custom workflows, or integrations where they create value.",
    from: "from",
    once: "one-time",
    included: "Included",
    cta: "Discuss this package",
    recommended: "For teams",
    packages: [
      { name: "Basic", audience: "Your first shared AI workspace", price: "€1,990", description: "Company context and working rules are available to your team in one approved workspace.", items: ["One shared workspace", "Up to two pilot users", "Company context and working rules", "One practical test and short handover"] },
      { name: "Team", audience: "For more people and recurring work", price: "€3,990", description: "Your team uses the same context across several workspaces and gets its first custom workflow.", items: ["Several agreed workspaces", "Up to five pilot users", "Structured project and decision knowledge", "One custom workflow", "Two practical tests and handover"] },
      { name: "Custom", audience: "For integrations and further development", price: "By quote", description: "We plan the features your processes actually need.", items: ["More teams and permission groups", "Email, calendar, or business software after review", "Additional workflows and automations", "Ongoing maintenance by agreement"] },
    ],
    compareEyebrow: "Everyday capabilities",
    compareTitle: "What can your team do with each version?",
    compareIntro: "The table shows the agreed scope. New information is maintained deliberately; the system does not turn every chat into verified company knowledge automatically.",
    features: [
      { useCase: "Use company rules in new AI sessions", basic: "Included", team: "Included", custom: "As needed" },
      { useCase: "Work with files in approved folders", basic: "One area", team: "Several areas", custom: "As needed" },
      { useCase: "Find project knowledge and decisions later", basic: "Not included", team: "Structured", custom: "As needed" },
      { useCase: "Complete a recurring task with a custom workflow", basic: "Not included", team: "One workflow", custom: "As needed" },
      { useCase: "Connect email, calendar, or business software", basic: "Not included", team: "Not included", custom: "After review" },
      { useCase: "Run recurring tasks automatically", basic: "Not included", team: "Not included", custom: "After review" },
    ],
    prerequisites: "Starting prices are confirmed after reviewing devices, access rights, and existing IT. The business covers licenses and IT services separately. A tailored workshop can be booked separately.",
  },
  hr: {
    eyebrow: "Tvoj početak",
    title: "Sustav koji može rasti s tvojim timom.",
    intro: "Počni sa zajedničkim radnim kontekstom. Kad ga tim koristi, ciljano dodaj projektno znanje, vlastite tijekove rada ili povezivanja.",
    from: "od",
    once: "jednokratno",
    included: "U paketu",
    cta: "Razgovarajmo o paketu",
    recommended: "Za timove",
    packages: [
      { name: "Osnovni", audience: "Prvi zajednički AI radni prostor", price: "1.990 €", description: "Kontekst tvrtke i pravila rada dostupni su timu u jednom odobrenom radnom prostoru.", items: ["Jedan zajednički radni prostor", "Do dva probna korisnika", "Kontekst tvrtke i pravila rada", "Jedan praktični test i kratka primopredaja"] },
      { name: "Tim", audience: "Za više ljudi i zadatke koji se ponavljaju", price: "3.990 €", description: "Tim koristi isti kontekst na više radnih mjesta i dobiva prvi prilagođeni radni postupak.", items: ["Više dogovorenih radnih područja", "Do pet probnih korisnika", "Strukturirano znanje o projektima i odlukama", "Jedan prilagođeni radni postupak", "Dva praktična testa i primopredaja"] },
      { name: "Po mjeri", audience: "Za povezivanja i daljnji razvoj", price: "Na upit", description: "Planiramo funkcije koje su vašim procesima zaista potrebne.", items: ["Više timova i skupina prava pristupa", "E-pošta, kalendar ili poslovni softver nakon provjere", "Dodatni postupci i automatizacije", "Kontinuirano održavanje prema dogovoru"] },
    ],
    compareEyebrow: "Funkcije u svakodnevnom radu",
    compareTitle: "Što tim može raditi u svakoj verziji?",
    compareIntro: "Tablica prikazuje dogovoreni opseg. Novo znanje se ciljano održava; sustav ne pretvara automatski svaki razgovor u provjereno znanje tvrtke.",
    features: [
      { useCase: "Koristiti pravila tvrtke u novim AI razgovorima", basic: "Uključeno", team: "Uključeno", custom: "Prema potrebi" },
      { useCase: "Raditi s datotekama u odobrenim mapama", basic: "Jedno područje", team: "Više područja", custom: "Prema potrebi" },
      { useCase: "Kasnije pronaći projektne odluke i znanje", basic: "Nije uključeno", team: "Strukturirano", custom: "Prema potrebi" },
      { useCase: "Ponavljajući zadatak riješiti vlastitim postupkom", basic: "Nije uključeno", team: "Jedan postupak", custom: "Prema potrebi" },
      { useCase: "Povezati e-poštu, kalendar ili poslovni softver", basic: "Nije uključeno", team: "Nije uključeno", custom: "Nakon provjere" },
      { useCase: "Automatski izvršavati ponavljajuće zadatke", basic: "Nije uključeno", team: "Nije uključeno", custom: "Nakon provjere" },
    ],
    prerequisites: "Početne cijene potvrđuju se nakon provjere računala, prava pristupa i postojeće IT infrastrukture. Tvrtka zasebno plaća licence i IT usluge. Prilagođena radionica može se zasebno ugovoriti.",
  },
};

const NOT_INCLUDED = ["Nicht enthalten", "Not included", "Nije uključeno"];

function FeatureValue({ value }: { value: string }) {
  const included = !NOT_INCLUDED.includes(value);
  return <span className={included ? "font-semibold text-ink" : "text-ink-2"}>{value}</span>;
}

/** Three package cards (recommended one framed in blue with a text flag), then a real comparison table. */
export async function AiosPackagesSection() {
  const language = await getLanguage();
  const content = copy[language];

  return (
    <Section id="pakete">
      <SectionHead
        heavy={content.title}
        intro={
          <>
            <p className="font-bold text-brand-blue">{content.eyebrow}</p>
            <p>{content.intro}</p>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch">
        {content.packages.map((item, index) => {
          const featured = index === 1;
          return (
            <Card key={item.name} highlighted={featured} className="flex h-full flex-col p-6 md:p-7">
              <CardFlag>{featured ? `${content.recommended}. ${item.audience}` : item.audience}</CardFlag>
              <h3 className="mt-2 text-[22px] leading-tight font-bold text-ink">{item.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                {index < 2 && <span className="text-sm text-ink-2">{content.from}</span>}
                <CardPrice unit={index < 2 ? content.once : undefined} className="text-[48px]">
                  {item.price}
                </CardPrice>
              </div>
              <p className="mt-5 min-h-20 leading-[1.55] text-ink-2">{item.description}</p>
              <h4 className="mt-6 border-b-2 border-ink pb-2 text-[14px] font-bold text-ink">{content.included}</h4>
              <ul className="m-0 mb-8 list-none p-0">
                {item.items.map((feature) => (
                  <li key={feature} className="border-b border-line py-2.5 text-[15px] leading-[1.5] text-ink">
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/beratungstermin"
                className={buttonStyles({ variant: "secondary", className: "mt-auto justify-start" })}
              >
                {content.cta}
              </Link>
            </Card>
          );
        })}
      </div>

      <div className="mt-[72px]">
        <h3 className="font-display text-[clamp(32px,7vw,44px)] leading-[0.95] font-[820] text-balance text-ink">
          {content.compareTitle}
        </h3>
        <p className="mt-4 max-w-[64ch] leading-[1.55] text-ink-2">{content.compareIntro}</p>
        <table className="mt-8 hidden w-full border-collapse text-left md:table">
          <caption className="sr-only">{content.compareTitle}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[43%] border-b-2 border-ink py-3 pr-6 text-[14px] font-bold text-ink">
                {content.compareEyebrow}
              </th>
              {content.packages.map((item) => (
                <th key={item.name} scope="col" className="border-b-2 border-ink py-3 pr-6 text-[14px] font-bold text-ink">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.features.map((feature) => (
              <tr key={feature.useCase} className="border-b border-line">
                <th scope="row" className="py-3.5 pr-6 text-[15px] leading-[1.5] font-medium text-ink">{feature.useCase}</th>
                <td className="py-3.5 pr-6 text-[15px]"><FeatureValue value={feature.basic} /></td>
                <td className="py-3.5 pr-6 text-[15px]"><FeatureValue value={feature.team} /></td>
                <td className="py-3.5 pr-6 text-[15px]"><FeatureValue value={feature.custom} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-7 border-t-2 border-ink md:hidden">
          {content.features.map((feature) => (
            <div key={feature.useCase} className="border-b border-line py-4">
              <h4 className="font-semibold leading-snug text-ink">{feature.useCase}</h4>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-[13px]">
                {(["basic", "team", "custom"] as const).map((key, index) => (
                  <div key={key}>
                    <dt className="mb-1 font-bold text-ink-2">{content.packages[index].name}</dt>
                    <dd className="m-0"><FeatureValue value={feature[key]} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[64ch] text-sm leading-[1.55] text-ink-2">{content.prerequisites}</p>
      </div>
    </Section>
  );
}
