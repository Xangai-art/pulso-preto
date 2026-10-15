/**
 * APPEARANCE CONTEXT — Identidade única (Pulso Preto / PP3) × Idioma
 *
 * HISTÓRICO (arquitetura CEOS, Fase 3):
 * Durante o teste mínimo da arquitetura CEOS este contexto expunha também um
 * `variantId` (GP0/PP1/PP2) trocável em runtime. Esse teste foi ENCERRADO.
 *
 * A partir de PP3 (identidade única de produção, SSOT):
 * - Existe UMA única identidade visual de produção: "Pulso Preto". GP0/PP1/PP2
 *   somem da UI — não há mais `variantId` nem troca de marca em runtime.
 * - A marca vem exclusivamente do Canon (brand-canon.ts → CURRENT_BRAND_VERSION).
 * - Permanece apenas a camada de IDIOMA (PT/ES), trocável em runtime sem
 *   rebuild/redeploy, persistida em localStorage (chave compartilhada entre
 *   site e app no mesmo domínio).
 * - `t(key)` continua sendo o helper de i18n de interface.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getCurrentBrand, type BrandIdentity } from '../data/brand-canon';
import { DEFAULT_LOCALE, translate, type LocaleId } from '../data/locales';

const STORAGE_KEY_LOCALE = 'pulsopreto:locale';

interface AppearanceContextValue {
  brand: BrandIdentity;
  localeId: LocaleId;
  setLocaleId: (id: LocaleId) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

function readStoredLocale(): LocaleId {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY_LOCALE);
  if (stored === 'pt' || stored === 'es') return stored;
  return DEFAULT_LOCALE;
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [localeId, setLocaleIdState] = useState<LocaleId>(readStoredLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_LOCALE, localeId);
  }, [localeId]);

  const setLocaleId = (id: LocaleId) => setLocaleIdState(id);

  const value = useMemo<AppearanceContextValue>(() => {
    return {
      brand: getCurrentBrand(),
      localeId,
      setLocaleId,
      t: (key: string, vars?: Record<string, string>) => translate(localeId, key, vars),
    };
  }, [localeId]);

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance(): AppearanceContextValue {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error('useAppearance() precisa ser usado dentro de <AppearanceProvider>');
  }
  return ctx;
}
