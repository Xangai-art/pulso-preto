// Registro de conteúdo aprofundado por doença (segmentado por audiência
// profissional + idioma). O formato permite adicionar outras condições sem
// alterar DiseaseDetail.tsx — basta criar um novo arquivo de conteúdo (como
// anemiaFalciforme.ts) e registrá-lo aqui com a chave = Disease.id
// correspondente em diseases.ts.
//
// FASE 3.2 — conteúdo agora é bilíngue (PT/ES): cada entrada do registro é um
// Record<LocaleId, DiseaseDeepContent>, e getDeepContent recebe o localeId
// ativo (via useAppearance().localeId no componente que chama) para retornar
// a versão no idioma certo.
//
// FASE 3.3 — expansão para as 7 doenças prioritárias: Anemia Falciforme
// (referência canônica) + Hipertensão, Diabetes, Miomas Uterinos, Lúpus,
// Depressão e Asma. Todas seguem o contrato DiseaseDeepContent e a estrutura
// editorial de 10 seções canônicas (ver shared/data/*.ts).
import { anemiaFalciformeContent, type DiseaseDeepContent } from './anemiaFalciforme.ts';
import { hipertensaoContent } from './hipertensao.ts';
import { diabetesContent } from './diabetes.ts';
import { miomasUterinosContent } from './miomasUterinos.ts';
import { lupusContent } from './lupus.ts';
import { depressaoContent } from './depressao.ts';
import { asmaContent } from './asma.ts';
import type { LocaleId } from './locales.ts';

const deepContentRegistry: Record<string, Record<LocaleId, DiseaseDeepContent>> = {
  'anemia-falciforme': anemiaFalciformeContent,
  hipertensao: hipertensaoContent,
  diabetes: diabetesContent,
  'miomas-uterinos': miomasUterinosContent,
  lupus: lupusContent,
  depressao: depressaoContent,
  asma: asmaContent,
};

/** Ids das condições com conteúdo aprofundado (usado por metrics.ts). */
export const deepContentIds: string[] = Object.keys(deepContentRegistry);

export function getDeepContent(diseaseId: string, localeId: LocaleId): DiseaseDeepContent | undefined {
  return deepContentRegistry[diseaseId]?.[localeId];
}
