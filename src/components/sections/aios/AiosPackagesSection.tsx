import Link from "next/link";
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

function FeatureValue({ value }: { value: string }) {
  const included = !["Nicht enthalten", "Not included", "Nije uključeno"].includes(value);
  return (
    <span className={included ? "inline-flex items-center gap-2 font-medium text-slate-800" : "text-slate-400"}>
      {included && <span aria-hidden="true" className="text-emerald-600 font-bold">✓</span>}
      {value}
    </span>
  );
}

export async function AiosPackagesSection() {
  const language = await getLanguage();
  const content = copy[language];

  return (
    <section id="pakete" className="bg-[#F6F8FC] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0426CB]">{content.eyebrow}</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">{content.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {content.packages.map((item, index) => {
            const featured = index === 1;
            return (
              <article key={item.name} className={`relative flex h-full flex-col rounded-3xl border p-7 shadow-sm md:p-8 ${featured ? "border-[#0426CB] bg-[#07154F] text-white shadow-xl" : "border-slate-200 bg-white text-slate-950"}`}>
                {featured && <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-[#65C87A] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#07154F]">{content.recommended}</span>}
                <p className={`text-sm font-medium ${featured ? "text-blue-200" : "text-[#0426CB]"}`}>{item.audience}</p>
                <h3 className="mt-3 text-2xl font-bold">{item.name}</h3>
                <div className="mt-5 flex items-baseline gap-2">
                  {index < 2 && <span className={`text-sm ${featured ? "text-blue-200" : "text-slate-500"}`}>{content.from}</span>}
                  <strong className="text-4xl tracking-tight">{item.price}</strong>
                </div>
                {index < 2 && <span className={`mt-1 text-sm ${featured ? "text-blue-200" : "text-slate-500"}`}>{content.once}</span>}
                <p className={`mt-6 min-h-20 leading-relaxed ${featured ? "text-blue-100" : "text-slate-600"}`}>{item.description}</p>
                <p className={`mb-3 mt-6 text-xs font-bold uppercase tracking-widest ${featured ? "text-blue-200" : "text-slate-500"}`}>{content.included}</p>
                <ul className="mb-8 space-y-3">
                  {item.items.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-6"><span aria-hidden="true" className={featured ? "text-[#65C87A]" : "text-emerald-600"}>✓</span><span>{feature}</span></li>)}
                </ul>
                <Link href="/beratungstermin" className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${featured ? "bg-[#65C87A] text-[#07154F] hover:bg-[#83d595]" : "bg-[#0426CB] text-white hover:bg-[#173dd8]"}`}>
                  {content.cta}
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0426CB]">{content.compareEyebrow}</p>
          <h3 className="text-3xl font-bold text-slate-950 md:text-4xl">{content.compareTitle}</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{content.compareIntro}</p>
          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#EAF0FC] text-sm text-slate-900"><tr><th scope="col" className="w-[43%] px-6 py-5 font-semibold">{content.compareEyebrow}</th>{content.packages.map((item) => <th scope="col" key={item.name} className="px-5 py-5 font-semibold">{item.name}</th>)}</tr></thead>
              <tbody>{content.features.map((feature) => <tr key={feature.useCase} className="border-t border-slate-100"><th scope="row" className="px-6 py-5 text-sm font-medium leading-relaxed text-slate-800">{feature.useCase}</th><td className="px-5 py-5 text-sm"><FeatureValue value={feature.basic} /></td><td className="px-5 py-5 text-sm"><FeatureValue value={feature.team} /></td><td className="px-5 py-5 text-sm"><FeatureValue value={feature.custom} /></td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-7 space-y-3 md:hidden">
            {content.features.map((feature) => <article key={feature.useCase} className="rounded-2xl border border-slate-200 bg-white p-5"><h4 className="font-semibold leading-snug text-slate-900">{feature.useCase}</h4><dl className="mt-4 grid grid-cols-3 gap-2 text-xs">{(["basic", "team", "custom"] as const).map((key, index) => <div key={key}><dt className="mb-2 font-bold text-slate-500">{content.packages[index].name}</dt><dd><FeatureValue value={feature[key]} /></dd></div>)}</dl></article>)}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-500">{content.prerequisites}</p>
        </div>
      </div>
    </section>
  );
}
