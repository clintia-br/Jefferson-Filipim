export {}

declare global {
  interface Window {
    dataLayer?: unknown[]
    /** gtag.js — carregado pela Google tag no layout (ver GADS_ID em @/lib/site). */
    gtag?: (...args: unknown[]) => void
  }
}
