/**
 * APPEARANCE CONTEXT — Mecanismo de troca em runtime (Variante × Idioma)
 *
 * Implementa a camada "Z (Presentation)" da arquitetura CEOS: consome o Canon
 * (brand-canon.ts) + Variants (variants.ts) + Locales (locales.ts) e expõe um
 * único hook `useAppearance()` para toda a árvore React, tanto no site/ quanto
 * no app/.
 *
 * CARACTERÍSTICAS:
 * - Troca 100% em runtime (sem rebuild/redeploy) — como um seletor de idioma.
 * - Persiste a escolha do usuário em localStorage (chave compartilhada entre
 *   site e app quando no mesmo domínio: ver docs/DEPLOY — Opção A).
 * - Anticipates i18n futuro: `t(key)` já funciona para EN/ES/PT sem mudança de API.
 * - Independente do admin panel futuro: aqui é um botão de usuário final,
 *   análogo a um seletor de idioma — não um painel administrativo.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getBrandVersion, type BrandIdentity } from '../data/brand-canon';
import { VARIANTS, DEFAULT_VARIANT, type VariantId, type VariantIdentity } from '../data/variants';
import { DEFAULT_LOCALE, translate, type LocaleId } from '../data/locales';

const STORAGE_KEY_VARIANT = 'pulsopreto:variant';
const STORAGE_KEY_LOCALE = 'pulsopreto:locale';

interface AppearanceContextValue {
  variantId: VariantId;
  variant: VariantIdentity;
  brand: BrandIdentity;
  localeId: LocaleId;
  setVariantId: (id: VariantId) => void;
  setLocaleId: (id: LocaleId) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

function readStoredVariant(): VariantId {
  if (typeof window === 'undefined') return DEFAULT_VARIANT;
  const stored = window.localStorage.getItem(STORAGE_KEY_VARIANT);
  if (stored && stored in VARIANTS) return stored as VariantId;
  return DEFAULT_VARIANT;
}

function readStoredLocale(): LocaleId {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY_LOCALE);
  if (stored === 'pt' || stored === 'es') return stored;
  return DEFAULT_LOCALE;
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [variantId, setVariantIdState] = useState<VariantId>(readStoredVariant);
  const [localeId, setLocaleIdState] = useState<LocaleId>(readStoredLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_VARIANT, variantId);
  }, [variantId]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY_LOCALE, localeId);
  }, [localeId]);

  const setVariantId = (id: VariantId) => setVariantIdState(id);
  const setLocaleId = (id: LocaleId) => setLocaleIdState(id);

  const value = useMemo<AppearanceContextValue>(() => {
    const variant = VARIANTS[variantId];
    const brand = getBrandVersion(variant.brandVersionId);
    return {
      variantId,
      variant,
      brand,
      localeId,
      setVariantId,
      setLocaleId,
      t: (key: string, vars?: Record<string, string>) => translate(localeId, key, vars),
    };
  }, [variantId, localeId]);

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance(): AppearanceContextValue {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error('useAppearance() precisa ser usado dentro de <AppearanceProvider>');
  }
  return ctx;
}
