import localFont from "next/font/local";

// Brand fonts apply to public pages only. /dasneuewir and /lernraum stay on the root layout (Geist).
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

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${sofiaDisplay.variable} ${sofiaText.variable} ${chivoMono.variable} font-text`}
    >
      {children}
    </div>
  );
}
