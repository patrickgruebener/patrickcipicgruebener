import Link from "next/link";
import { getLanguage } from "@/lib/i18n.server";
import { kiSystemContent } from "@/lib/ki-system-content";

export async function PersonalSystemTeaser() {
  const copy = kiSystemContent[await getLanguage()];
  return (
    <section className="bg-white px-6 py-14" aria-label={copy.eyebrow}>
      <div className="mx-auto flex max-w-6xl flex-col gap-7 rounded-3xl border border-blue-100 bg-gradient-to-r from-[#eef2ff] to-[#e9f8ed] p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-[#0426CB]">{copy.eyebrow} · {copy.priceLabel}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">{copy.teaserTitle}</h2>
          <p className="mt-3 leading-relaxed text-gray-700">{copy.teaserText}</p>
        </div>
        <Link href="/ki-system" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#0426CB] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#031da4]">{copy.teaserLink} →</Link>
      </div>
    </section>
  );
}
