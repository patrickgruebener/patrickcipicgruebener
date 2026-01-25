import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Patrick Cipic Grübener | Product Strategy Consultant",
  description: "Ich bringe Struktur in Chaos, klare Prioritäten in überfüllte Backlogs und Fokus in euer Produktmanagement. Damit Ideen endlich Wirkung zeigen.",
  keywords: ["Product Management", "Product Strategy", "UX", "Scrum", "Product Owner", "Beratung", "Consultant"],
  authors: [{ name: "Patrick Cipic Grübener" }],
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Patrick Cipic Grübener | Product Strategy Consultant",
    description: "Ich bringe Struktur in Chaos, klare Prioritäten in überfüllte Backlogs und Fokus in euer Produktmanagement.",
    type: "website",
    locale: "de_DE",
    siteName: "Patrick Cipic Grübener",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Cipic Grübener | Product Strategy Consultant",
    description: "Ich bringe Struktur in Chaos, klare Prioritäten in überfüllte Backlogs und Fokus in euer Produktmanagement.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
