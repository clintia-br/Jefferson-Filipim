export {}

declare global {
  interface Window {
    /** Populado pelo container do GTM carregado no layout (ver GTM_ID em @/lib/site). */
    dataLayer?: unknown[]
  }
}
