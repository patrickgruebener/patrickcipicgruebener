import localFont from "next/font/local";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { getTranslations } from "@/lib/i18n.server";

// Brand fonts, cookie banner and analytics apply to public pages only.
// /dasneuewir and /lernraum stay on the root layout (Geist) without tracking.
const sofiaDisplay = localFont({
  src: "../fonts/SofiaSansExtraCondensed-VF.woff2",
  variable: "--font-sofia-display",
  weight: "1 1000",
  display: "swap",
});

const sofiaText = localFont({
  src: "../fonts/SofiaSans-VF.woff2",
  variable: "--font-sofia-text",
  weight: "1 1000",
  display: "swap",
});

const chivoMono = localFont({
  src: "../fonts/ChivoMono-VF.woff2",
  variable: "--font-chivo-mono",
  weight: "100 900",
  display: "swap",
});

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = await getTranslations();
  const consentTexts = {
    title: t("consent.title"),
    text: t("consent.text"),
    accept: t("consent.accept"),
    decline: t("consent.decline"),
    privacyLink: t("consent.privacyLink"),
  };

  return (
    <div
      className={`${sofiaDisplay.variable} ${sofiaText.variable} ${chivoMono.variable} font-text`}
    >
      {children}
      <CookieConsent texts={consentTexts} />
    </div>
  );
}
