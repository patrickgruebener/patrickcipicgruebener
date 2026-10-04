import type { Metadata } from 'next'
import Lernchat from './lernchat'

export const metadata: Metadata = {
  title: 'Lernraum',
  robots: { index: false, follow: false, noarchive: true },
}

export const dynamic = 'force-dynamic'

export default function LernraumPage() {
  return <Lernchat />
}
