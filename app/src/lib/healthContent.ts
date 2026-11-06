// Named JSON exports ensure editorial rules (including obsolete marker metadata)
// are not shipped to the interface. The submitted package stays byte-identical.
import { condicoes, sistemas, eixos, features, servicos, avisos_fixos, content_version, updated_at } from '@shared/data/condicoes.saude.v1.json';
import { translateText } from '@shared/data/locales';

export type HealthCondition = (typeof condicoes)[number];
export const healthContent = { condicoes, sistemas, eixos, features, servicos, avisos_fixos, content_version, updated_at };
export function getCondition(id: string) { return condicoes.find(condition => condition.id === id); }
export function healthTranslate(locale: string, text: string): string {
  return translateText(locale, text);
}
// Approval is a data transition, not a UI flag. Fail closed on incomplete signature.
export function hasClinicalApproval(condition: HealthCondition) {
  return condition.status === 'aprovado' && Boolean(condition.revisor && condition.revisor_conselho && condition.data_revisao);
}
export const PREPARATION = 'Conteúdo desta condição em preparação — as seis fichas disponíveis estão em revisão clínica.';
