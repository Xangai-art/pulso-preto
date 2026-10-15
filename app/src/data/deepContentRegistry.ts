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
import { anemiaFalciformeContent, type DiseaseDeepContent } from '@shared/data/anemiaFalciforme';
import { hipertensaoContent } from '@shared/data/hipertensao';
import { diabetesContent } from '@shared/data/diabetes';
import { miomasUterinosContent } from '@shared/data/miomasUterinos';
import { lupusContent } from '@shared/data/lupus';
import { depressaoContent } from '@shared/data/depressao';
import { asmaContent } from '@shared/data/asma';
import type { LocaleId } from '@shared/data/locales';

const deepContentRegistry: Record<string, Record<LocaleId, DiseaseDeepContent>> = {
  'anemia-falciforme': anemiaFalciformeContent,
  hipertensao: hipertensaoContent,
  diabetes: diabetesContent,
  'miomas-uterinos': miomasUterinosContent,
  lupus: lupusContent,
  depressao: depressaoContent,
  asma: asmaContent,
};

export function getDeepContent(diseaseId: string, localeId: LocaleId): DiseaseDeepContent | undefined {
  return deepContentRegistry[diseaseId]?.[localeId];
}
