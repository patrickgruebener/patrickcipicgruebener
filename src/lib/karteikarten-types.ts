export type Richtung = 'hr-de' | 'de-hr'
export type Bewertung = 'nochmal' | 'gut' | 'leicht'

export type Fortschritt = {
  faellig: string // ISO timestamp
  intervallTage: number
  leichtigkeit: number
  wiederholungen: number
  neu: boolean
}

export type Karte = {
  id: string
  hr: string
  de: string
  hinweis?: string
  quelle?: string
  erstellt: string
  fortschritt: Record<Richtung, Fortschritt>
}

export type Abfrage = {
  kartenId: string
  richtung: Richtung
  vorne: string
  hinten: string
  hinweis?: string
  neu: boolean
}

export type ImportKarte = { hr: string; de: string; hinweis?: string; quelle?: string }
export type ImportFehler = { index: number; grund: string }

export const RICHTUNGEN: Richtung[] = ['hr-de', 'de-hr']
export const BEWERTUNGEN: Bewertung[] = ['nochmal', 'gut', 'leicht']
