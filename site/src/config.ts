// URL pública do App Sentinela (webapp funcional).
//
// Estratégia de deploy (Opção A — um único domínio Cloudflare): o App Sentinela
// é publicado sob o subcaminho /app/ do MESMO Worker/domínio que serve este
// Site Institucional. Por isso a URL correta é sempre a própria origem atual
// + "/app" — nunca precisa ser reconfigurada ao mudar de domínio (preview,
// produção, domínio customizado futuro, etc.), e o QR Code nunca fica com
// URL desatualizada após um redeploy.
//
// VITE_APP_URL continua disponível como override manual (ex.: apontar para um
// domínio separado, se a estratégia de deploy mudar no futuro).
function resolveAppUrl(): string {
  const override = import.meta.env.VITE_APP_URL as string | undefined;
  if (override) return override;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/app`;
  }
  // Fallback para SSR/build-time sem window (não deve ocorrer em SPA Vite).
  return 'https://app-sentinela.pages.dev';
}

export const APP_URL: string = resolveAppUrl();
