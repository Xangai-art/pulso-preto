import { getCondition, healthContent } from './healthContent';

const clean = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
// Controlled navigation terms; associations come only from the supplied signs.
// Broad terms matching >4 fichas are left unmapped, rather than inventing triage.
export const symptoms = [
  ['dor de cabeça', 'cefaleia'], ['tontura', 'vertigem'], ['visão embaçada', 'visão turva'], ['cansaço', 'fadiga'],
  ['falta de ar', 'dispneia'], ['dor no peito', 'dor torácica'], ['palpitação', 'coração acelerado'], ['tosse'],
  ['chiado no peito', 'chiado'], ['febre'], ['dor no corpo'], ['dor nas juntas', 'dor nas articulações'],
  ['inchaço nas pernas', 'inchaço nos pés'], ['inchaço no rosto', 'inchaço ao redor dos olhos'], ['coceira', 'prurido'],
  ['mancha na pele', 'mancha vermelha'], ['queda de cabelo'], ['ferida que não cicatriza', 'feridas que demoram a cicatrizar'],
  ['ferida na boca', 'feridas na boca'], ['dor na barriga', 'dor abdominal'], ['azia'], ['diarreia'], ['prisão de ventre', 'constipação'],
  ['náusea', 'enjoo'], ['vômito'], ['perda de apetite'], ['perda de peso'], ['sede excessiva'],
  ['urinar muito', 'urinar muitas vezes'], ['urinar à noite', 'à noite para urinar'], ['urina espumosa'], ['urina escura'],
  ['dor ao urinar'], ['sangramento menstrual intenso', 'menstruação muito intensa'], ['cólica forte'],
  ['sangramento fora do período'], ['dor na relação sexual'], ['corrimento'], ['dor lombar'],
  ['formigamento nos pés', 'formigamento ou queimação nos pés'], ['desmaio'], ['tristeza profunda'],
];
export function matchedSymptom(query: string) {
  const text = clean(query);
  return symptoms.find(terms => terms.some(term => text === clean(term)));
}
export function symptomConditionIds(terms: string[]) {
  const ids = healthContent.condicoes.filter(condition => terms.some(term => clean(condition.sinais.join(' ')).includes(clean(term)))).map(condition => condition.id);
  return ids.length <= 4 ? ids : [];
}
export function symptomMatches(id: string, query: string) {
  const terms = matchedSymptom(query);
  return !!getCondition(id) && !!terms && symptomConditionIds(terms).includes(id);
}
export function isUrgentSearch(query: string) {
  const text = clean(query);
  return ['dor no peito', 'dor torácica', 'desmaio', 'falta de ar', 'dispneia'].some(term => text.includes(clean(term)));
}
