/**
 * PROJECT ADAPTER — Ponte entre Brand Canon e ProjectInfo Legacy
 * 
 * PROPÓSITO:
 * Permite migração INCREMENTAL da arquitetura legada (project.ts duplicado)
 * para a arquitetura CEOS (Canon único + versionamento).
 * 
 * ESTRATÉGIA DE MIGRAÇÃO:
 * 1. Fase 1 (ATUAL): Criar /shared/data/brand-canon.ts
 * 2. Fase 2 (ESTA): Criar adaptador que "injeta" brand-canon em projectInfo
 * 3. Fase 3 (PRÓXIMA): Substituir imports diretos de project.ts por este adaptador
 * 4. Fase 4 (FUTURA): Deprecar project.ts, migrar dados não-brand para Canon
 * 
 * USO:
 * ```typescript
 * // Em vez de:
 * import { projectInfo } from '@/data/project';
 * 
 * // Use:
 * import { getProjectInfo } from '@shared/data/project-adapter';
 * const projectInfo = getProjectInfo();
 * ```
 */

import {
  getCurrentBrand,
  getBrandVersion,
  getBrandMetadata,
  getBrandHistory,
  type BrandIdentity,
  type BrandVersionId,
} from './brand-canon';

/**
 * INTERFACE LEGADA (compatível com project.ts atual)
 */
export interface ProjectInfo {
  name: string;
  subtitle: string;
  tagline: string;
  scope: string;
}

/**
 * GERADOR DE projectInfo a partir do Brand Canon
 * 
 * @param versionId - Versão específica (opcional, default = versão atual)
 * @param scope - Escopo geográfico (opcional, override do padrão)
 */
export function getProjectInfo(
  versionId?: BrandVersionId,
  scope?: string
): ProjectInfo {
  const brand = versionId ? getBrandVersion(versionId) : getCurrentBrand();
  
  return {
    name: brand.name,
    subtitle: brand.subtitle,
    tagline: brand.tagline,
    scope: scope || 'Distrito Federal (piloto) — expansão nacional planejada',
  };
}

/**
 * EXPORT: Versão "default" compatível com imports legados
 * 
 * Permite fazer:
 * ```typescript
 * import { projectInfo } from '@shared/data/project-adapter';
 * ```
 * 
 * Em vez de:
 * ```typescript
 * const projectInfo = getProjectInfo();
 * ```
 */
export const projectInfo = getProjectInfo();

/**
 * HELPERS ADICIONAIS
 */

/**
 * Gera URLs versionadas (útil para links canônicos, sitemaps, etc.)
 */
export function getProjectUrls(versionId?: BrandVersionId) {
  const brand = versionId ? getBrandVersion(versionId) : getCurrentBrand();
  return brand.urls;
}

/**
 * Gera metadata completa para <head> (SEO, Open Graph, etc.)
 */
export function getProjectMetadata(versionId?: BrandVersionId) {
  return getBrandMetadata(versionId);
}

/**
 * Helper: Detecta se estamos em versão "vintage" (experimental)
 */
export function isVintageBrand(versionId?: BrandVersionId): boolean {
  const brand = versionId ? getBrandVersion(versionId) : getCurrentBrand();
  return brand.id.startsWith('vintage-future-');
}

/**
 * Helper: Retorna conceito visual da versão atual
 * (útil para documentação interna, design system, etc.)
 */
export function getVisualConcept(versionId?: BrandVersionId): string {
  const brand = versionId ? getBrandVersion(versionId) : getCurrentBrand();
  return brand.visualConcept || 'Conceito visual não documentado';
}

/**
 * Helper: Retorna histórico de rebrandings (para página "Nossa História")
 */
export interface BrandHistoryEntry {
  name: string;
  period: string;
  rationale: string;
  visualConcept: string;
}

export function getBrandHistoryForDisplay(): BrandHistoryEntry[] {
  const history = getBrandHistory();

  return history.map((brand: BrandIdentity, index: number) => {
    const nextBrand = history[index + 1];
    const endDate = nextBrand ? nextBrand.effectiveDate : 'presente';

    return {
      name: brand.name,
      period: `${brand.effectiveDate} — ${endDate}`,
      rationale: brand.rationale || 'Não documentado',
      visualConcept: brand.visualConcept || 'Não documentado',
    };
  });
}

/**
 * TIPO EXPORT
 */
export type { BrandIdentity, BrandVersionId };
export { getCurrentBrand, getBrandVersion };
