import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

// Private page outside (site): brand fonts, but no cookie banner and no tracking.
const sofiaDisplay = localFont({
  src: '../fonts/SofiaSansExtraCondensed-VF.woff2',
  variable: '--font-sofia-display',
  weight: '1 1000',
  display: 'swap',
})

const sofiaText = localFont({
  src: '../fonts/SofiaSans-VF.woff2',
  variable: '--font-sofia-text',
  weight: '1 1000',
  display: 'swap',
})

const chivoMono = localFont({
  src: '../fonts/ChivoMono-VF.woff2',
  variable: '--font-chivo-mono',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Karteikarten',
  description: 'Privat.',
  manifest: '/karteikarten.webmanifest',
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  icons: { icon: '/karteikarten/icon-192.png', apple: '/karteikarten/apple-touch-icon.png' },
  appleWebApp: { capable: true, title: 'Karteikarten', statusBarStyle: 'default' },
  other: { 'apple-mobile-web-app-capable': 'yes' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f4f6fb',
}

export default function KarteikartenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${sofiaDisplay.variable} ${sofiaText.variable} ${chivoMono.variable} font-text min-h-dvh bg-sheet text-ink`}
    >
      {children}
    </div>
  )
}
