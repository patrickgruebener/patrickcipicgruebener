import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLanguage } from "@/lib/i18n.server";
import { kiSystemContent } from "@/lib/ki-system-content";

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

const primaryClass = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#0426CB] px-7 py-3 text-center font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#031da4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0426CB]";
const secondaryClass = "inline-flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3 text-center font-semibold text-gray-900 transition hover:border-[#0426CB] hover:text-[#0426CB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0426CB]";

export default async function KiSystemPage() {
  const copy = kiSystemContent[await getLanguage()];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header currentPage="ki-system" />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-white to-[#e9f8ed] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 inline-flex rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0426CB]">{copy.eyebrow}</p>
            <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.08]">{copy.heroTitle}</h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">{copy.heroText}</p>
                <p className="mt-6 border-l-4 border-[#65C87A] pl-4 font-semibold text-gray-900">{copy.heroPoint}</p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link href={checkoutUrl || "/beratungstermin?anliegen=ki-system-kauf"} className={primaryClass}>{checkoutUrl ? copy.buy : copy.enquire}</Link>
                  <Link href="/beratungstermin" className={secondaryClass}>{copy.talk}</Link>
                </div>
                {!checkoutUrl && <p className="mt-4 text-sm text-gray-600">{copy.checkoutPending}</p>}
              </div>
              <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-900/5 md:p-9">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">{copy.eyebrow}</p>
                <p className="mt-4 text-5xl font-bold tracking-tight text-[#0426CB]">199 €</p>
                <p className="mt-2 text-gray-600">{copy.priceLabel}</p>
                <div className="mt-7 rounded-2xl bg-gray-50 p-5 font-mono text-sm text-gray-700">
                  <span className="text-gray-400">~/projekte/</span><br />
                  <span className="font-semibold text-gray-900">angebot-kunde.md</span><br />
                  <span className="text-[#338b48]">↳ aktuelle Fassung</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28" aria-labelledby="datei-geschichte">
          <div className="mx-auto max-w-6xl">
            <p className="font-semibold text-[#0426CB]">{copy.storyEyebrow}</p>
            <h2 id="datei-geschichte" className="mt-3 max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">{copy.storyTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg text-gray-600">{copy.storyIntro}</p>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {copy.storySteps.map((step) => (
                <div key={step.number} className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
                  <span className="text-sm font-bold text-[#0426CB]">{step.number}</span>
                  <h3 className="mt-6 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-gray-950 p-8 text-white md:p-10">
              <h3 className="text-2xl font-bold">{copy.fileTitle}</h3>
              <p className="mt-4 max-w-4xl leading-relaxed text-gray-300">{copy.fileText}</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <p className="font-semibold text-[#0426CB]">{copy.rulesEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{copy.rulesTitle}</h2>
              <p className="mt-5 leading-relaxed text-gray-700">{copy.rulesText}</p>
              <p className="mt-5 text-sm leading-relaxed text-gray-500">{copy.rulesNote}</p>
            </div>
            <div className="rounded-3xl bg-[#eaf5ed] p-8 md:p-10">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{copy.ownTitle}</h2>
              <p className="mt-5 leading-relaxed text-gray-700">{copy.ownText}</p>
              <p className="mt-5 text-sm leading-relaxed text-gray-600">{copy.ownNote}</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28" aria-labelledby="paket">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <p className="font-semibold text-[#0426CB]">{copy.packageEyebrow}</p>
              <h2 id="paket" className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{copy.packageTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700">{copy.packageText}</p>
              <ul className="mt-8 space-y-4">
                {copy.packageItems.map((item) => <li key={item} className="flex gap-3 text-gray-700"><span className="font-bold text-[#338b48]" aria-hidden="true">✓</span>{item}</li>)}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 p-7">
                <h3 className="text-2xl font-bold">{copy.setupTitle}</h3>
                <ol className="mt-5 space-y-4">
                  {copy.setupSteps.map((step, index) => <li key={step} className="flex gap-4 text-gray-700"><span className="font-bold text-[#0426CB]">{index + 1}.</span>{step}</li>)}
                </ol>
              </div>
              <div className="rounded-3xl border border-gray-200 p-7">
                <h3 className="text-2xl font-bold">{copy.requirementsTitle}</h3>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700">
                  {copy.requirements.map((item) => <li key={item} className="border-l-2 border-gray-200 pl-4">{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 md:p-10">
            <h2 className="text-3xl font-bold">{copy.fitTitle}</h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-gray-700">{copy.fitText}</p>
            <Link href="/ki-system-fuer-unternehmen" className="mt-6 inline-flex font-semibold text-[#0426CB] underline decoration-transparent underline-offset-4 hover:decoration-current">{copy.businessLink} →</Link>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#0426CB] to-[#65C87A] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-9 text-center shadow-xl md:p-14">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{copy.finalTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">{copy.finalText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={checkoutUrl || "/beratungstermin?anliegen=ki-system-kauf"} className={primaryClass}>{checkoutUrl ? copy.buy : copy.enquire}</Link>
              <Link href="/beratungstermin" className={secondaryClass}>{copy.talk}</Link>
            </div>
            <p className="mt-5 text-sm text-gray-500">{checkoutUrl ? copy.contactNote : copy.checkoutPending}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
