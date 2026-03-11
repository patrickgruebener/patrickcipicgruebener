import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const indexableHosts = new Set([
    "patrickcipicgruebener.com",
    "www.patrickcipicgruebener.com",
  ]);
  const forwardedHost = headersList.get("x-forwarded-host") || "";
  const host = forwardedHost || headersList.get("host") || "";
  const domain = host.split(",")[0]?.trim().split(":")[0]?.toLowerCase() || "";
  const isIndexable = indexableHosts.has(domain);

  return {
    title: "Patrick Cipic Grübener | AI-Produktstratege & Builder",
    description: "Ich helfe Unternehmen, AI sinnvoll einzusetzen: für schlanke Prozesse, bessere Produkte und echte Wettbewerbsvorteile. Pragmatisch, messbar, sofort umsetzbar.",
    keywords: ["AI", "Prozessautomation", "Digitalisierung", "AI-Strategie", "KMU", "DACH", "AI-Produktstratege", "Builder"],
    authors: [{ name: "Patrick Cipic Grübener" }],
    icons: {
      icon: "/images/favicon.png",
    },
    openGraph: {
      title: "Patrick Cipic Grübener | AI-Produktstratege & Builder",
      description: "Ich helfe Unternehmen, AI sinnvoll einzusetzen: für schlanke Prozesse, bessere Produkte und echte Wettbewerbsvorteile. Pragmatisch, messbar, sofort umsetzbar.",
      type: "website",
      locale: "de_DE",
      siteName: "Patrick Cipic Grübener",
    },
    twitter: {
      card: "summary_large_image",
      title: "Patrick Cipic Grübener | AI-Produktstratege & Builder",
      description: "Ich helfe Unternehmen, AI sinnvoll einzusetzen: für schlanke Prozesse, bessere Produkte und echte Wettbewerbsvorteile. Pragmatisch, messbar, sofort umsetzbar.",
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
