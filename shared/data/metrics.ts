/**
 * MÉTRICAS AUTO-DERIVADAS (R4 / P15 / P17 — Lote B)
 *
 * Todo número que é "medida" do acervo (condições, categorias, temas
 * prioritários, conteúdos aprofundados, idiomas, notícias) é CALCULADO aqui a
 * partir da fonte única (diseases.ts, deepContentRegistry.ts, news.ts,
 * locales.ts). Nenhum componente, texto ou dado deve digitar esses números à
 * mão — assim a contradição 45+ / 47 / 48+ deixa de ser possível.
 *
 * O export do banco (scripts/db/export-content.mjs) grava estes mesmos valores
 * em database/content.json → /api/content (campo `metrics`).
 */
import { diseaseCategories, priorityThemes, emergentThemes } from './diseases.ts';
import { deepContentIds } from './deepContentRegistry.ts';
import { newsItems } from './news.ts';
import { SUPPORTED_LOCALES } from './locales.ts';

export interface ContentMetrics {
  /** Total de condições na Biblioteca de Saúde. */
  conditions: number;
  /** Total de categorias temáticas. */
  categories: number;
  /** Condições marcadas como tema prioritário do App (isPriorityTheme). */
  priorityThemes: number;
  /** Condições de inclusão recente (isNew). */
  emergentThemes: number;
  /** Condições com conteúdo aprofundado por audiência. */
  deepContent: number;
  /** Condições enriquecidas com dado local do DF (análise de dados). */
  localStudy: number;
  /** Idiomas disponíveis. */
  locales: number;
  /** Notícias publicadas. */
  news: number;
}

export function computeMetrics(): ContentMetrics {
  const all = diseaseCategories.flatMap((c) => c.diseases);
  return {
    conditions: all.length,
    categories: diseaseCategories.length,
    priorityThemes: priorityThemes.length,
    emergentThemes: emergentThemes.length,
    deepContent: deepContentIds.length,
    localStudy: all.filter((d) => d.localStudy).length,
    locales: SUPPORTED_LOCALES.length,
    news: newsItems.length,
  };
}

export const metrics: ContentMetrics = computeMetrics();
