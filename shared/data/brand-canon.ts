/**
 * BRAND CANON — Sistema de Versionamento de Identidade Visual
 * 
 * PRINCÍPIO ARQUITETURAL:
 * "Nomes, visuais e narrativas mudam. A missão permanece."
 * 
 * Este arquivo implementa versionamento canônico de identidade de marca,
 * permitindo rebrandings, experimentos vintage-futuristas e A/B testing
 * SEM perder a memória histórica das escolhas.
 * 
 * CASO DE USO:
 * - "Gente Preta" (2026-04 a 2026-10) → "Pulso Preto" (2026-10+)
 * - Futuro: visuais inspirados em versões anteriores (vintage futurista)
 * - Futuro: testes A/B de narrativa sem reescrever código
 * 
 * INTEGRAÇÃO COM ARQUITETURA CEOS:
 * - X (Canon): brand-canon.ts — fonte única de verdade
 * - Z (Presentation): consome `getBrandVersion(versionId)` ou `getCurrentBrand()`
 * - C (Asset Fabric): assets versionados por brand_version_id
 * - M (Manifest): injeta brand_context no contrato de renderização
 */

export type BrandVersionId = 
  | 'gente-preta-v1'    // Versão original (Abril–Outubro 2026)
  | 'pulso-preto-v1'    // Versão atual (Outubro 2026+)
  | 'vintage-future-01' // Reservado para experimentos futuros
  | 'vintage-future-02';

export interface BrandIdentity {
  // Identificação canônica
  id: BrandVersionId;
  name: string;                    // Nome público ("Gente Preta", "Pulso Preto")
  slug: string;                    // URL-safe identifier
  subtitle: string;
  tagline: string;
  
  // Período de vigência
  effectiveDate: string;           // ISO 8601: "2026-04-27"
  supersededBy?: BrandVersionId;   // null se versão atual
  
  // Contexto histórico (para memória e docs internos)
  rationale?: string;              // Por que esta versão foi criada?
  visualConcept?: string;          // Conceito visual dominante
  
  // Metadados de design
  designSystem: {
    palette: 'cultural-ancestral-v1' | 'cultural-ancestral-v2' | 'brasa-v1' | 'custom';
    primaryTone: 'folha' | 'ouro' | 'palha' | 'barro' | 'terra';
    logoVariant: string;           // Referência ao asset (ex: "ossaim-abstract-v1")
  };
  
  // URLs e domínios (versionados)
  urls: {
    main: string;
    app: string;
    api: string;
  };
}

/**
 * REGISTRO HISTÓRICO DE VERSÕES DE MARCA
 * 
 * REGRA: Novas versões são ADICIONADAS, nunca substituem registros anteriores.
 * Cada versão preserva seu contexto histórico completo.
 */
export const BRAND_VERSIONS: Record<BrandVersionId, BrandIdentity> = {
  'gente-preta-v1': {
    id: 'gente-preta-v1',
    name: 'Gente Preta',
    slug: 'gente-preta',
    subtitle: 'Sentinela de Saúde da População Negra',
    tagline: 'Conhecimento que transforma políticas. Sua saúde, sua voz, sua comunidade.',
    
    effectiveDate: '2026-04-27',
    supersededBy: 'pulso-preto-v1',
    
    rationale: 'Versão original do projeto piloto financiado pela AECID. Nome escolhido pela equipe fundadora (APRECIA, SEJUS/DF, CASIO V2 Studio) para enfatizar identidade racial e pertencimento comunitário.',
    visualConcept: 'Cultural-ancestral com referências abstratas a Ossaim (orixá das plantas medicinais), paleta terra (folha/ouro/palha/barro).',
    
    designSystem: {
      palette: 'cultural-ancestral-v1',
      primaryTone: 'folha',
      logoVariant: 'ossaim-abstract-v1',
    },
    
    urls: {
      main: 'https://gente-preta.pages.dev',
      app: 'https://gente-preta.pages.dev/app',
      api: 'https://api.gente-preta.pages.dev',
    },
  },
  
  'pulso-preto-v1': {
    id: 'pulso-preto-v1',
    name: 'Pulso Preto',
    slug: 'pulso-preto',
    subtitle: 'Sentinela de Saúde da População Negra',
    // Alinhado ao slogan oficial de 3 linhas gravado no logo (LOGO/Pulso_Preto_Logo_Quadrada.png):
    // "Informação que pulsa / Conhecimento que cuida / Equidade que transforma"
    tagline: 'Informação que pulsa, conhecimento que cuida, equidade que transforma.',
    
    effectiveDate: '2026-10-07',
    supersededBy: undefined, // Versão atual
    
    rationale: 'Rebranding para enfatizar monitoramento contínuo ("pulso" = vital sign tracking) e movimento ("pulso" = ritmo, batida). Mantém identidade racial e amplia metáfora de vigilância em saúde.',
    visualConcept: 'Mantém paleta cultural-ancestral v1, com possível evolução futura para variant v2 (tons mais vibrantes). Logo continua referência abstrata a Ossaim.',
    
    designSystem: {
      palette: 'cultural-ancestral-v1',
      primaryTone: 'folha',
      logoVariant: 'ossaim-abstract-v1', // Mesmo logo, novo nome
    },
    
    urls: {
      main: 'https://pulsopreto.org',          // Novo domínio (futuro)
      app: 'https://app.pulsopreto.org',        // Novo domínio (futuro)
      api: 'https://api.pulsopreto.org',        // Novo domínio (futuro)
    },
  },
  
  // SLOTS RESERVADOS PARA EXPERIMENTOS FUTUROS
  // (Ex: "Pulso Preto — Edição Vintage 2027" com paleta sépia + tipografia retrô)
  'vintage-future-01': {
    id: 'vintage-future-01',
    name: 'Pulso Preto — Vintage Futurista',
    slug: 'pulso-preto-vintage-01',
    subtitle: 'Sentinela de Saúde da População Negra',
    tagline: 'A memória ancestral encontra a inteligência do amanhã.',
    
    effectiveDate: '2027-01-01', // Data placeholder
    supersededBy: undefined,
    
    rationale: 'Experimento visual que resgata elementos de "Gente Preta v1" com estética retrofuturista (anos 70 + sci-fi). Para campanhas especiais ou testes A/B.',
    visualConcept: 'Paleta sépia + ouro + verde-oliva. Tipografia com serifas vintage. Iconografia geométrica afrofuturista.',
    
    designSystem: {
      palette: 'custom',
      primaryTone: 'ouro',
      logoVariant: 'ossaim-abstract-vintage-v1',
    },
    
    urls: {
      main: 'https://vintage.pulsopreto.org',
      app: 'https://vintage.pulsopreto.org/app',
      api: 'https://api.pulsopreto.org',
    },
  },
  
  'vintage-future-02': {
    id: 'vintage-future-02',
    name: 'Gente Preta — Edição Retrô 2028',
    slug: 'gente-preta-retro-2028',
    subtitle: 'Sentinela de Saúde da População Negra',
    tagline: 'De volta às raízes. Rumo ao futuro.',
    
    effectiveDate: '2028-01-01', // Data placeholder
    supersededBy: undefined,
    
    rationale: 'Resgate completo da identidade "Gente Preta" original para evento comemorativo ou campanha de aniversário. Demonstra como o sistema permite retornos sem perda de evolução.',
    visualConcept: 'Recria paleta cultural-ancestral v1 exata, mas com componentes UI modernizados (2028).',
    
    designSystem: {
      palette: 'cultural-ancestral-v1',
      primaryTone: 'folha',
      logoVariant: 'ossaim-abstract-v1',
    },
    
    urls: {
      main: 'https://retro2028.pulsopreto.org',
      app: 'https://retro2028.pulsopreto.org/app',
      api: 'https://api.pulsopreto.org',
    },
  },
};

/**
 * VERSÃO ATIVA ATUAL
 * 
 * REGRA: Este é o ÚNICO lugar onde se declara qual versão está em produção.
 * Mudar de "Gente Preta" para "Pulso Preto" = alterar 1 linha aqui.
 */
export const CURRENT_BRAND_VERSION: BrandVersionId = 'pulso-preto-v1';

/**
 * FUNÇÕES DE ACESSO
 */

export function getCurrentBrand(): BrandIdentity {
  return BRAND_VERSIONS[CURRENT_BRAND_VERSION];
}

export function getBrandVersion(versionId: BrandVersionId): BrandIdentity {
  return BRAND_VERSIONS[versionId];
}

export function getAllBrandVersions(): BrandIdentity[] {
  return Object.values(BRAND_VERSIONS);
}

export function getBrandHistory(): BrandIdentity[] {
  // Retorna versões em ordem cronológica (effectiveDate)
  return getAllBrandVersions()
    .filter(v => v.effectiveDate) // Exclui placeholders sem data
    .sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate));
}

export function getPreviousBrand(versionId: BrandVersionId): BrandIdentity | null {
  const history = getBrandHistory();
  const currentIndex = history.findIndex(v => v.id === versionId);
  return currentIndex > 0 ? history[currentIndex - 1] : null;
}

/**
 * HELPER: Gera metadata HTML <head> baseado na versão ativa
 */
export function getBrandMetadata(versionId?: BrandVersionId) {
  const brand = versionId ? getBrandVersion(versionId) : getCurrentBrand();
  
  return {
    title: `${brand.name} — ${brand.subtitle}`,
    description: brand.tagline,
    keywords: `saúde da população negra, ${brand.slug}, SUS, equidade racial, DF`,
    ogTitle: brand.name,
    ogDescription: brand.tagline,
    ogUrl: brand.urls.main,
    canonicalUrl: brand.urls.main,
  };
}

// Nota: BrandIdentity já é exportada acima via `export interface BrandIdentity`
// (export duplicado via `export type { BrandIdentity }` causava TS2484).
