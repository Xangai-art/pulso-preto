/**
 * VARIANTS — Camada de Variantes de Design (Experiência/Apresentação)
 *
 * PRINCÍPIO ARQUITETURAL (CEOS):
 * - X (Canon)        → brand-canon.ts        (QUEM somos: nome, tagline, URLs)
 * - VARIANTS (este)  → variants.ts           (COMO aparecemos: hero, CTA, tema visual)
 * - LOCALES          → locales.ts            (EM QUE LÍNGUA falamos)
 * - Z (Presentation) → consome useAppearance() para renderizar Canon + Variant + Locale
 *
 * TESTE MÍNIMO DA ARQUITETURA CEOS (Fase 3):
 * 3 variantes de design × 2 idiomas, trocáveis em runtime (sem rebuild/redeploy),
 * por um único seletor no site e no app — análogo a um seletor de idioma.
 *
 *   GP0 — Gente Preta original (brand-canon: gente-preta-v1). Baseline histórica.
 *   PP1 — Pulso Preto, variante "família" (hero com família negra reunida).
 *   PP2 — Pulso Preto, variante "mulher" (hero com retrato de mulher negra).
 *
 * Cada variante referencia uma BrandVersionId do Canon (nome/tagline), e adiciona
 * SOMENTE metadados de apresentação (hero, CTA, tema de seção) — nunca duplica
 * texto institucional que já vive no Canon.
 */

import type { BrandVersionId } from './brand-canon';

export type VariantId = 'gp0' | 'pp1' | 'pp2';

export type HeroTreatment = 'slideshow' | 'family-photo' | 'woman-photo';
export type MissionBandTheme = 'emerald-split' | 'terracotta-band';
export type FooterTheme = 'dark-green' | 'cream';

export interface PlaceholderImage {
  url: string;
  alt: string;
  credit: string; // fonte + licença, obrigatório para imagens placeholder CC
  isPlaceholder: true; // sinaliza explicitamente: substituir por fotografia própria depois
}

export interface VariantIdentity {
  id: VariantId;
  label: string; // Nome curto exibido no seletor ("GP0", "PP1", "PP2")
  description: string; // Descrição longa (para tooltip/admin futuro)
  brandVersionId: BrandVersionId; // Referência ao Canon — nome/tagline vêm de lá

  hero: {
    treatment: HeroTreatment;
    image?: PlaceholderImage; // ausente quando treatment === 'slideshow' (usa HeroSlideshow)
    ctaPrimaryKey: string; // chave i18n do CTA principal
    ctaSecondaryKey: string; // chave i18n do CTA secundário
  };

  missionBandTheme: MissionBandTheme;
  footerTheme: FooterTheme;
  showNewsSection: boolean; // reservado para futura seção "Últimas Notícias" (ref. mockup PP2)
}

export const VARIANTS: Record<VariantId, VariantIdentity> = {
  gp0: {
    id: 'gp0',
    label: 'GP0',
    description: 'Gente Preta — identidade original do projeto piloto (Abr–Out 2026). Baseline histórica preservada pelo Brand Canon.',
    brandVersionId: 'gente-preta-v1',
    hero: {
      treatment: 'slideshow',
      ctaPrimaryKey: 'home.cta.primary.original',
      ctaSecondaryKey: 'home.cta.secondary.original',
    },
    missionBandTheme: 'emerald-split',
    footerTheme: 'dark-green',
    showNewsSection: false,
  },

  pp1: {
    id: 'pp1',
    label: 'PP1',
    description: 'Pulso Preto — variante "Família": hero com fotografia de família negra reunida, CTA "Cuide-se". Inspirada na referência de design nº1.',
    brandVersionId: 'pulso-preto-v1',
    hero: {
      treatment: 'family-photo',
      image: {
        url: 'https://sspark.genspark.ai/i/vNw4tCYwkHPw1Y3n?width=2560',
        alt: 'Família negra sorrindo e se abraçando, pai sentado ao centro recebendo beijos das duas filhas e da esposa — retrato de afeto e união familiar',
        credit: 'Flickr / The Pentecostals of OC — CC (placeholder, substituir por fotografia própria)',
        isPlaceholder: true,
      },
      ctaPrimaryKey: 'home.cta.primary.pp1',
      ctaSecondaryKey: 'home.cta.secondary.pp1',
    },
    missionBandTheme: 'emerald-split',
    footerTheme: 'dark-green',
    showNewsSection: false,
  },

  pp2: {
    id: 'pp2',
    label: 'PP2',
    description: 'Pulso Preto — variante "Mulher": hero com retrato de mulher negra, CTA "Acesse serviços SUS", faixa de missão em terracota. Inspirada na referência de design nº2.',
    brandVersionId: 'pulso-preto-v1',
    hero: {
      treatment: 'woman-photo',
      image: {
        url: 'https://sspark.genspark.ai/i/Z1eyFhNDHigJwGf6?width=2560',
        alt: 'Retrato de mulher negra madura, cabelo em tranças, expressão serena e digna, olhando diretamente para a câmera',
        credit: 'PickPik — CC0/domínio público (placeholder, substituir por fotografia própria)',
        isPlaceholder: true,
      },
      ctaPrimaryKey: 'home.cta.primary.pp2',
      ctaSecondaryKey: 'home.cta.secondary.pp2',
    },
    missionBandTheme: 'terracotta-band',
    footerTheme: 'cream',
    showNewsSection: true,
  },
};

export const DEFAULT_VARIANT: VariantId = 'pp1';

export function getVariant(id: VariantId): VariantIdentity {
  return VARIANTS[id];
}

export function getAllVariants(): VariantIdentity[] {
  return Object.values(VARIANTS);
}
