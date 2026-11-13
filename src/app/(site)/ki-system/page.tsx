import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLanguage, getTranslations } from "@/lib/i18n.server";
import { kiSystemContent } from "@/lib/ki-system-content";
import type { Language } from "@/lib/i18n";
import { buttonStyles } from "@/components/ui/Button";
import { Card, CardFlag, CardPrice } from "@/components/ui/Card";
import { Figure } from "@/components/ui/figure";
import { Leitlinie } from "@/components/ui/leitlinie";
import { Section, SectionHead } from "@/components/sections/section-shell";
import { ClosingCta } from "@/components/sections/closing-cta";

const checkoutUrl = (() => {
  const value = process.env.LEMON_SQUEEZY_CHECKOUT_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "lemonsqueezy.com" || url.hostname.endsWith(".lemonsqueezy.com"))
      ? url.toString()
      : null;
  } catch {
    return null;
  }
})();

export async function generateMetadata(): Promise<Metadata> {
  const copy = kiSystemContent[await getLanguage()];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: "https://patrickcipicgruebener.com/ki-system" },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: "website",
      locale: "de_DE",
      url: "https://patrickcipicgruebener.com/ki-system",
    },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.metaDescription },
  };
}

type Copy = (typeof kiSystemContent)[Language];

const BUY_FALLBACK = "/beratungstermin?anliegen=ki-system-kauf";

/** Intro column: blue lead-in line, then the running text. */
function Intro({ lead, text }: { lead?: string; text?: string }) {
  return (
    <>
      {lead && <p className="font-bold text-brand-blue">{lead}</p>}
      {text && <p>{text}</p>}
    </>
  );
}

function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-x-14 gap-y-8 px-4 pt-9 pb-8 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[900px]:pt-[72px] min-[900px]:pb-16">
        <div>
          <p className="mb-3.5 text-[15px] text-ink-2 sm:mb-[22px] sm:text-[17px]">{copy.eyebrow}</p>
          <h1 className="mb-5 font-display text-[48px] leading-[0.9] font-[820] tracking-[-0.005em] text-balance text-ink sm:mb-[30px] sm:text-[64px] lg:text-[80px]">
            {copy.heroTitle}
          </h1>
          <p className="mb-6 max-w-[34em] text-[17px] leading-[1.5] text-ink sm:text-xl">{copy.heroText}</p>
          <p className="mb-8 max-w-[34em] border-l-4 border-brand-green pl-4 text-[17px] leading-[1.55] font-semibold text-ink">
            {copy.heroPoint}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link href={checkoutUrl || BUY_FALLBACK} className={buttonStyles({ className: "w-full sm:w-auto" })}>
              {checkoutUrl ? copy.buy : copy.enquire}
            </Link>
            <Link href="/beratungstermin" className={buttonStyles({ variant: "secondary" })}>
              {copy.talk}
            </Link>
          </div>
          {!checkoutUrl && <p className="mt-4 max-w-[34em] text-sm text-ink-2">{copy.checkoutPending}</p>}
        </div>
        <div className="grid gap-6 min-[900px]:mt-1.5">
          <Card highlighted className="grid gap-2 p-6">
            <CardFlag>{copy.eyebrow}</CardFlag>
            <CardPrice unit={copy.priceLabel}>199 €</CardPrice>
          </Card>
          <Figure number={1} caption={copy.heroPoint}>
            <Image
              src="/images/werkstatt/karteikasten-reiter.webp"
              alt={copy.heroImageAlt}
              width={1500}
              height={1000}
              priority
              className="block h-auto w-full"
              sizes="(min-width: 900px) 460px, 100vw"
            />
          </Figure>
        </div>
      </div>
      <Leitlinie />
    </section>
  );
}

function Story({ copy }: { copy: Copy }) {
  return (
    <Section label={copy.storyTitle}>
      <SectionHead heavy={copy.storyTitle} intro={<Intro lead={copy.storyEyebrow} text={copy.storyIntro} />} />
      <ol className="m-0 grid list-none grid-cols-1 gap-x-12 gap-y-8 p-0 md:grid-cols-3">
        {copy.storySteps.map((step) => (
          <li key={step.number} className="border-t-2 border-ink pt-4">
            <span className="font-display text-[26px] leading-none font-[820] text-brand-blue tabular-nums">{step.number}</span>
            <h3 className="mt-3 text-[20px] leading-tight font-bold text-ink">{step.title}</h3>
            <p className="mt-2 leading-[1.55] text-ink-2">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 max-w-[64ch] border-l-4 border-brand-green pl-4">
        <h3 className="text-[20px] leading-tight font-bold text-ink">{copy.fileTitle}</h3>
        <p className="mt-2 leading-[1.55] text-ink-2">{copy.fileText}</p>
      </div>
    </Section>
  );
}

function Principles({ copy }: { copy: Copy }) {
  return (
    <Section label={copy.rulesTitle}>
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 min-[821px]:grid-cols-2">
        <div className="border-t-2 border-ink pt-4">
          <p className="font-bold text-brand-blue">{copy.rulesEyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(32px,7vw,44px)] leading-[0.95] font-[820] text-balance text-ink">{copy.rulesTitle}</h2>
          <p className="mt-4 max-w-[64ch] leading-[1.55] text-ink">{copy.rulesText}</p>
          <p className="mt-4 max-w-[64ch] text-sm leading-[1.55] text-ink-2">{copy.rulesNote}</p>
        </div>
        <div className="border-t-2 border-ink pt-4">
          <h2 className="font-display text-[clamp(32px,7vw,44px)] leading-[0.95] font-[820] text-balance text-ink">{copy.ownTitle}</h2>
          <p className="mt-4 max-w-[64ch] leading-[1.55] text-ink">{copy.ownText}</p>
          <p className="mt-4 max-w-[64ch] text-sm leading-[1.55] text-ink-2">{copy.ownNote}</p>
        </div>
      </div>
    </Section>
  );
}

function Package({ copy }: { copy: Copy }) {
  return (
    <Section id="paket" label={copy.packageTitle}>
      <SectionHead heavy={copy.packageTitle} intro={<Intro lead={copy.packageEyebrow} text={copy.packageText} />} />
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 min-[821px]:grid-cols-2">
        <ul className="m-0 list-none border-t-2 border-ink p-0">
          {copy.packageItems.map((item) => (
            <li key={item} className="border-b border-line py-3.5 text-ink">{item}</li>
          ))}
        </ul>
        <div className="grid gap-8">
          <div>
            <h3 className="border-b-2 border-ink pb-2.5 text-[15px] font-bold text-ink">{copy.setupTitle}</h3>
            <ol className="m-0 list-none p-0">
              {copy.setupSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-line py-3.5">
                  <span className="font-display text-[26px] leading-none font-[820] text-brand-blue tabular-nums">{index + 1}</span>
                  <span className="text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="border-b-2 border-ink pb-2.5 text-[15px] font-bold text-ink">{copy.requirementsTitle}</h3>
            <ul className="m-0 list-none p-0">
              {copy.requirements.map((item) => (
                <li key={item} className="border-b border-line py-3.5 text-[15px] leading-[1.55] text-ink-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Fit({ copy }: { copy: Copy }) {
  return (
    <Section label={copy.fitTitle}>
      <Card className="grid grid-cols-1 items-end gap-x-10 gap-y-6 p-6 min-[821px]:grid-cols-[minmax(0,1fr)_auto] min-[821px]:p-8">
        <div className="grid max-w-[64ch] gap-3">
          <h2 className="font-display text-[clamp(32px,7vw,44px)] leading-[0.95] font-[820] text-balance text-ink">{copy.fitTitle}</h2>
          <p className="text-ink-2">{copy.fitText}</p>
        </div>
        <Link href="/ki-system-fuer-unternehmen" className={buttonStyles({ variant: "secondary", className: "justify-start" })}>
          {copy.businessLink}
        </Link>
      </Card>
    </Section>
  );
}

// One guide line per page: it sits below the hero, so the closing CTA goes without.
export default async function KiSystemPage() {
  const language = await getLanguage();
  const copy = kiSystemContent[language];
  const { t } = await getTranslations();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header currentPage="ki-system" />
      <main>
        <Hero copy={copy} />
        <Story copy={copy} />
        <Principles copy={copy} />
        <Package copy={copy} />
        <Fit copy={copy} />
        <section className="bg-paper pb-[72px]">
          <div className="mx-auto max-w-[1180px] px-4">
            <ClosingCta
              headlineHeavy={copy.finalTitle}
              text={copy.finalText}
              buttonLabel={checkoutUrl ? copy.buy : copy.enquire}
              href={checkoutUrl || BUY_FALLBACK}
              note={checkoutUrl ? copy.contactNote : copy.checkoutPending}
              guideLine={false}
              portrait={{
                src: "/images/werkstatt/patrick-profil-800.webp",
                alt: t("home.finalCta.portraitAlt"),
                name: "Patrick Čipić Grübener",
                role: t("home.finalCta.portraitRole"),
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
