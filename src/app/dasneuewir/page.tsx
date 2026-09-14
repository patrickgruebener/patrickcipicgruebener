import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

type IconProps = {
  className?: string;
};

type PotentialArea = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  Icon: ComponentType<IconProps>;
  iconClassName: string;
  iconContainerClassName: string;
};

const whatsappUrl = "https://wa.me/4917632104967?text=Hey%20Patrick%2C%20die%20Ideen%20f%C3%BCr%20Das%20Neue%20Wir%20haben%20bei%20uns%20was%20ausgel%C3%B6st.%20Lass%20uns%20sprechen.";
const emailUrl = "mailto:patrickgruebener@gmail.com?subject=Das%20Neue%20Wir%20%26%20KI&body=Hey%20Patrick%2C%0A%0Adie%20Ideen%20f%C3%BCr%20Das%20Neue%20Wir%20haben%20bei%20uns%20was%20ausgel%C3%B6st.%20Lass%20uns%20sprechen.";

function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function BrainIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z" />
    </svg>
  );
}

function ArchiveIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-4.586a1 1 0 0 0-.707.293l-1.414 1.414a1 1 0 0 1-.707.293h-1.172a1 1 0 0 1-.707-.293L9.414 13.293A1 1 0 0 0 8.707 13H4" />
    </svg>
  );
}

function PencilIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16.862 4.487 1.687-1.688a2.121 2.121 0 0 1 3 3L10.582 16.765l-4 1 1-4L16.862 4.487Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}

function ConnectionIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 7.5 3.75 12l4.5 4.5m7.5-9 4.5 4.5-4.5 4.5M14.25 4.5l-4.5 15" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8m-16 11h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.96 9.96 0 0 1-4.255-.949L3 20l1.425-3.8A7.77 7.77 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
    </svg>
  );
}

const potentialAreas: PotentialArea[] = [
  {
    eyebrow: "Denken und Konzeption",
    title: "Ein KI-Arbeitsraum, der euch wirklich kennt",
    paragraphs: [
      "Stellt euch einen gemeinsamen Arbeitsraum vor, der eure Methode, Angebote, Prioritäten und Begriffe kennt. Ihr sprecht einen Gedanken einfach rein. Das System sortiert ihn, stellt gute Gegenfragen und hilft, daraus ein Konzept oder eine Entscheidung zu bauen.",
      "Wie ein ziemlich wacher Sparringspartner, der nicht jede Woche wieder bei null anfängt.",
    ],
    bullets: [
      "Sprachgedanken erfassen und sinnvoll sortieren",
      "Angebote, Workshops oder Retreats im Dialog durchdenken",
      "Entscheidungen und nächste Schritte festhalten",
    ],
    Icon: BrainIcon,
    iconClassName: "text-blue-700",
    iconContainerClassName: "from-blue-100 to-cyan-100",
  },
  {
    eyebrow: "Wissen und Methode",
    title: "Euer verdammt großer Wissensschatz sollte für euch arbeiten",
    paragraphs: [
      "Über 100 Podcastfolgen, ein Buch, Kurse, Meditationen, Übungsblätter und Newsletter. Ihr habt so viel Substanz, dass niemand mehr alles gleichzeitig im Kopf haben kann.",
      "Daraus könnte eine durchsuchbare Wissensbasis entstehen. Ihr fragt nach einem Thema und seht, was ihr dazu schon gesagt oder entwickelt habt. So müsst ihr weniger neu erfinden und erkennt leichter, wo Gedanken zusammenpassen oder eine neue Idee wartet.",
    ],
    bullets: [
      "Podcast, Buch, Kurse und Übungen thematisch erschließen",
      "Methoden, Geschichten und Modelle schnell wiederfinden",
      "Vorhandenes Wissen für neue Formate und Produkte verbinden",
    ],
    Icon: ArchiveIcon,
    iconClassName: "text-amber-700",
    iconContainerClassName: "from-amber-100 to-orange-100",
  },
  {
    eyebrow: "Marketing und Sichtbarkeit",
    title: "Aus dem, was sowieso entsteht, kann viel mehr Wirkung werden",
    paragraphs: [
      "Bei euch entstehen laufend starke Gedanken. Im Podcast, in der Konzeption oder mal eben zwischendurch. Der größte Hebel liegt vermutlich darin, das Gute, was längst da ist, schneller in die richtige Form zu bringen.",
      "Aus einer Podcastfolge oder einem Sprachgedanken könnten Newsletter, Posts, Websiteabschnitte oder Kampagnenentwürfe entstehen. Ohne diesen glatten KI-Einheitsbrei, bei dem keiner mehr weiß, wer eigentlich spricht.",
      "Chris bleibt Chris. Tanja bleibt Tanja. Und „Das Neue Wir“ bekommt eine gemeinsame Stimme, ohne dass eure beiden eigenen darin verschwinden.",
    ],
    bullets: [
      "Eigene Schreibprofile für Chris, Tanja und die gemeinsame Marke",
      "Podcast und Sprachgedanken gezielt weiterverwenden",
      "Newsletter, Social Media und Website schneller vorbereiten",
    ],
    Icon: PencilIcon,
    iconClassName: "text-emerald-700",
    iconContainerClassName: "from-emerald-100 to-teal-100",
  },
  {
    eyebrow: "Begleitung und Abläufe",
    title: "Mehr Kontinuität zwischen den richtig wichtigen Momenten",
    paragraphs: [
      "Eure Wirkung entsteht auf einer Reise: Vorbereitung, Session, ehrliche Reflexion, Übung, Austausch und dann der nächste Schritt. Je persönlicher sie wird, desto mehr kleine Fäden müssen zusammenlaufen.",
      "Materialien könnten verlässlich bereitstehen, nächste Schritte sichtbar bleiben und ihr hättet vor einem Termin genau den Kontext, den ihr braucht. Später wären auch Transkription und Nachbereitung denkbar.",
      "Bei sensiblen Coachingdaten aber nur mit klarer Einwilligung, sauberer Trennung und einem wirklich geeigneten System. Das wäre die Voraussetzung.",
    ],
    bullets: [
      "Vorbereitung, Materialien und Erinnerungen verlässlich verbinden",
      "Wiederkehrende Übergaben vereinfachen",
      "Offene Fäden und nächste Schritte leichter im Blick behalten",
    ],
    Icon: ConnectionIcon,
    iconClassName: "text-rose-700",
    iconContainerClassName: "from-rose-100 to-orange-100",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Eine persönliche Idee für Chris und Tanja | Patrick Cipic Grübener",
    description: "Ein paar konkrete Gedanken dazu, wie KI Das Neue Wir im Hintergrund leichter machen könnte.",
    alternates: {
      canonical: "https://patrickcipicgruebener.com/dasneuewir",
    },
    openGraph: {
      title: "Eine persönliche Idee für Chris und Tanja",
      description: "Ein paar konkrete Gedanken dazu, wie KI Das Neue Wir im Hintergrund leichter machen könnte.",
      type: "website",
      locale: "de_DE",
      url: "https://patrickcipicgruebener.com/dasneuewir",
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

function PotentialCard({ area, index }: { area: PotentialArea; index: number }) {
  const { Icon } = area;

  return (
    <article className="relative rounded-3xl border border-gray-100 bg-white p-7 shadow-lg shadow-gray-900/5 transition-shadow duration-300 hover:shadow-xl md:p-9">
      <span className="absolute right-7 top-7 font-mono text-sm font-medium text-gray-300 md:right-9 md:top-9">
        0{index + 1}
      </span>
      <div className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${area.iconContainerClassName}`}>
        <Icon className={`h-7 w-7 ${area.iconClassName}`} />
      </div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
        {area.eyebrow}
      </p>
      <h3 className="mb-5 max-w-lg text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
        {area.title}
      </h3>
      <div className="space-y-4 text-base leading-relaxed text-gray-700">
        {area.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ul className="mt-7 space-y-3 border-t border-gray-100 pt-6">
        {area.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-gray-700">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <CheckIcon className="h-3 w-3" />
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

function PrimaryContactLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#0426CB] to-[#65C87A] px-7 py-4 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:from-[#0320A3] hover:to-[#52A663] hover:shadow-xl ${className}`}
    >
      <ChatIcon className="h-5 w-5" />
      Schreib mir auf WhatsApp
      <ArrowIcon className="h-5 w-5" />
    </a>
  );
}

export default function DasNeueWirPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffdf9] text-gray-900">
      <header className="relative z-20 border-b border-amber-950/5 bg-white/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-75">
            <Image
              src="/images/logo.svg"
              alt="Patrick Cipic Grübener"
              width={200}
              height={23}
              priority
            />
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
            Zu meiner Startseite
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(253,230,190,0.8),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(190,240,221,0.65),transparent_35%),linear-gradient(145deg,#fffdf9_0%,#f8fbff_52%,#f5fbf3_100%)]" />
          <div className="absolute right-[-9rem] top-16 h-72 w-72 rounded-full border border-amber-300/30 bg-amber-100/25 md:h-96 md:w-96" />
          <div className="absolute bottom-[-6rem] left-[42%] h-48 w-48 rounded-full border border-teal-200/40 bg-teal-100/25" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="max-w-3xl">
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">
                Für Chris und Tanja
              </p>
              <h1 className="mb-7 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-gray-900 md:text-6xl">
                Ihr löst bei anderen verdammt schnell die richtigen Knoten. <span className="bg-gradient-to-r from-[#0426CB] to-[#159b8a] bg-clip-text text-transparent">Ich glaube, KI könnte euch dabei ziemlich gut den Rücken freihalten.</span>
              </h1>
              <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-gray-700 md:text-xl">
                <p>
                  Ich durfte eure Arbeit im Paarcoaching, im Einzelcoaching und jetzt im Mastermind selbst erleben. Was ihr da macht, ist schon eine ziemlich starke Mischung: unglaubliche Empathie, brutale Methodenkompetenz und die Bereitschaft, schonungslos ehrlich genau dahin zu gehen, wo echte Veränderung entsteht.
                </p>
                <p>
                  Das kann wehtun. Aber genau dadurch entsteht schnell Freiheit und der Mensch kommt wieder selbst ans Steuer.
                </p>
                <p>
                  Nach unserem Gespräch hab ich mir euren ganzen Kosmos mal genauer angeschaut. Dabei sind mir vier Bereiche aufgefallen, in denen richtig was drinstecken könnte.
                </p>
              </div>
              <a href="#ideen" className="mt-9 inline-flex items-center gap-3 text-base font-semibold text-[#0426CB] transition-colors hover:text-[#0320A3]">
                Zeig mir die Ideen
                <ArrowIcon className="h-5 w-5" />
              </a>
              <p className="mt-3 text-sm text-gray-500">
                Kein fertiges Angebot. Erstmal nur mein ehrlicher Blick von außen und als Teilnehmer.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="rounded-3xl border border-white/90 bg-white/85 p-5 shadow-2xl shadow-amber-950/10 backdrop-blur-sm md:p-7">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">Worum es mir geht</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#0426CB] to-[#159b8a] p-6 text-white shadow-lg">
                  <p className="text-sm font-medium text-white/75">Mehr Zeit für</p>
                  <p className="mt-2 text-3xl font-bold leading-tight">die Arbeit, die nur ihr könnt.</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-medium text-gray-700">
                  <div className="rounded-xl bg-amber-50 p-4">Gedanken festhalten</div>
                  <div className="rounded-xl bg-emerald-50 p-4">Wissen aktivieren</div>
                  <div className="rounded-xl bg-blue-50 p-4">Inhalte weiterdenken</div>
                  <div className="rounded-xl bg-rose-50 p-4">Abläufe erleichtern</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-amber-100 bg-[#fffaf0] px-5 py-4 shadow-lg md:block">
                <p className="text-sm font-semibold text-amber-950">Eure Arbeit bleibt persönlich.</p>
                <p className="mt-1 text-sm text-amber-900/75">Der Rest darf leichter werden.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-amber-950/5 bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-amber-800">Meine Haltung dazu</p>
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-gray-900 md:text-5xl">
              Der Mensch bleibt der Mensch. <span className="text-gray-400">Der Rest darf leichter werden.</span>
            </h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Eure Wirkung entsteht im echten Kontakt. Wenn ihr zuhört, nachhakt, konfrontiert und auch zwischen zwei Gesprächen noch über einen Menschen nachdenkt. Genau das sollte keine KI übernehmen.
              </p>
              <p>
                Spannend wird der ganze Kram drumherum: Wissen suchen, Gedanken festhalten, Inhalte aufbereiten, Abläufe nachhalten und Sessions vorbereiten. Da könnte ein gutes System verdammt viel Last rausnehmen, ohne eure Arbeit glattzubügeln.
              </p>
            </div>
          </div>
        </section>

        <section id="ideen" className="scroll-mt-8 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-3xl md:mb-16">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-amber-800">Vier Ansatzpunkte</p>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-gray-900 md:text-5xl">
                Hier sehe ich gerade <span className="bg-gradient-to-r from-[#0426CB] to-[#159b8a] bg-clip-text text-transparent">richtig viel Potenzial.</span>
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {potentialAreas.map((area, index) => (
                <PotentialCard key={area.title} area={area} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#f0fdfa] to-[#f0fdf4] px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">Was dabei im besten Fall passiert</p>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-gray-900 md:text-5xl">
                Eure Arbeit wird nicht technischer. <span className="text-teal-700">Sie kann noch persönlicher werden.</span>
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-gray-700">
                <p>
                  Ihr verbringt weniger Zeit mit Suchen, Sortieren und immer wieder neu Anfangen. Ein Gedanke geht nicht verloren, nur weil er beim Spaziergang kam. Eine starke Podcastfolge verschwindet nicht im Archiv. Und vor einem wichtigen Gespräch liegt der passende Kontext da, ohne dass ihr ihn aus fünf Ecken zusammensuchen müsst.
                </p>
                <p>
                  Dadurch bleibt mehr Aufmerksamkeit für die Stellen, an denen nur ihr den Unterschied machen könnt.
                </p>
              </div>
            </div>
            <div className="relative rounded-3xl border border-white bg-white/85 p-7 shadow-xl backdrop-blur-sm md:p-9">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-200/45 blur-3xl" />
              <p className="relative mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">Vom Gedanken zur Wirkung</p>
              <div className="relative space-y-4">
                {[
                  "Gedanke beim Spaziergang",
                  "Sortiert und mit guten Gegenfragen weitergedacht",
                  "Als Inhalt, Ablauf oder nächster Schritt nutzbar",
                  "Mehr Zeit für echte Gespräche und kreative Entscheidungen",
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0426CB] to-[#65C87A] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-base font-medium leading-snug text-gray-800">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-20">
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/patrickcipicgruebener_portrait.webp"
                  alt="Patrick Cipic Grübener"
                  width={600}
                  height={600}
                  sizes="(max-width: 1024px) 320px, 420px"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-amber-800">Warum ich glaube, dass ich euch helfen könnte</p>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-gray-900 md:text-5xl">
                Ich kann die Idee mit euch finden. <span className="bg-gradient-to-r from-[#0426CB] to-[#159b8a] bg-clip-text text-transparent">Und sie danach auch bauen.</span>
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-700">
                <p>
                  Ich komme aus der Mediengestaltung, hab viele Jahre Websites gebaut und betreut und fünf Jahre intensiv im digitalen Marketing gearbeitet. Danach kamen Softwareproduktmanagement, die Führung eines 15-köpfigen Teams und mein eigenes Startup dazu.
                </p>
                <p>
                  Heute verbinde ich diese Welten mit KI: euer Geschäft verstehen, den richtigen Hebel finden und danach auch wirklich was bauen. KI-Arbeitsräume, Wissenssysteme, Automatisierungen oder kleine interne Tools.
                </p>
                <p>
                  Ich bin weder der Typ für drei schlaue Folien noch jemand, der blind irgendein Tool anschließt. Ich will erst kapieren, wo der Schuh wirklich drückt. Dann bauen wir was, das zu euch passt und im Alltag tatsächlich hilft.
                </p>
              </div>
              <p className="mt-8 text-sm font-semibold leading-relaxed text-gray-600">
                KI und Produktstrategie · Automatisierung · digitales Marketing · Websites · individuelle Tools · Wissenstransfer
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#0426CB] to-[#65C87A] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/60 bg-white p-8 text-center shadow-2xl md:p-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">Der nächste Schritt</p>
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.025em] text-gray-900 md:text-5xl">
              Bevor wir irgendwas bauen, würde ich erstmal gern euren Laden verstehen.
            </h2>
            <div className="mx-auto mt-7 max-w-2xl space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Meine Ideen basieren auf dem, was ich als Teilnehmer erlebt und von außen sehen konnte. Ob eure echten Zeitfresser woanders liegen, könnt nur ihr sagen.
              </p>
              <p>
                Deshalb würde ich gern 60 bis 90 Minuten mit Chris oder mit euch beiden durch eure Ziele, Abläufe und die Stellen gehen, die gerade nerven. Danach schlage ich euch genau einen kleinen Quick Win vor. Überschaubar, praktisch und so gewählt, dass ihr schnell merkt, ob er euch hilft und ob unsere Zusammenarbeit Bock macht.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryContactLink />
              <a href={emailUrl} className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
                <MailIcon className="h-5 w-5" />
                Oder schick mir eine Mail
              </a>
            </div>
            <p className="mt-7 text-lg font-medium text-gray-900">Patrick</p>
          </div>
        </section>
      </main>
    </div>
  );
}
