/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  gtagFormConversion?: () => void
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}
