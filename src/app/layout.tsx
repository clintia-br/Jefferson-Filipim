import type { Metadata, Viewport } from 'next'
import { Poppins, Cinzel } from 'next/font/google'
import Script from 'next/script'
import MotionProvider from '@/components/MotionProvider'
import { SITE, GTM_ID, GADS_ID } from '@/lib/site'
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
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {GADS_ID && (
        <>
          {/* Google tag (gtag.js) — Google Ads */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GADS_ID}');`}
          </Script>
        </>
      )}
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <MotionProvider />
        {children}
      </body>
    </html>
  )
}
