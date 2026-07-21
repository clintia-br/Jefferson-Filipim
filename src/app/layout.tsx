import type { Metadata, Viewport } from 'next'
import { Poppins, Cinzel } from 'next/font/google'
import MotionProvider from '@/components/MotionProvider'
import { SITE } from '@/lib/site'
import './globals.css'

/* Display/marketing type. Self-hosted by next/font — no request leaves the origin. */
const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

/* Identity type — the Trajan-style wordmark voice. */
const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jefferson Filipim — Fisioterapia Domiciliar com Propósito',
  description: SITE.hero.subtitle,
  keywords: [
    'fisioterapia domiciliar',
    'fisioterapia geriátrica',
    'fisioterapeuta São Paulo',
    'reabilitação idosos',
    'prevenção de quedas',
  ],
  authors: [{ name: SITE.brand }],
  openGraph: {
    title: 'Jefferson Filipim — Fisioterapia Domiciliar com Propósito',
    description: SITE.hero.subtitle,
    locale: 'pt_BR',
    type: 'website',
    siteName: SITE.brand,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#00736f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${cinzel.variable}`}>
      <body>
        <MotionProvider />
        {children}
      </body>
    </html>
  )
}
