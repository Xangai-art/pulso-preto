import type { Disease, DiseaseCategory } from '@shared/data/diseases';
import { getCondition, healthContent } from './healthContent';
import { symptomMatches } from './healthSymptoms';

// Presentation only: the scientific catalogue and its identifiers stay unchanged.
export const MVP_IDS = ['anemia-falciforme', 'hipertensao', 'diabetes', 'miomas-uterinos', 'lupus', 'doenca-renal-cronica'] as const;
export const DISCLAIMER = healthContent.avisos_fixos.informativo;

const names: Record<string, [string, string]> = {
  hipertensao: ['Pressão alta', 'Hipertensão arterial'],
  diabetes: ['Diabetes tipo 2', 'Diabetes tipo 2'],
  'diabetes-juvenil': ['Diabetes tipo 1', 'Diabetes tipo 1'],
  'anemia-falciforme': ['Anemia falciforme', 'Doença falciforme'],
  'miomas-uterinos': ['Mioma uterino', 'Leiomioma uterino'],
  lupus: ['Lúpus', 'Lúpus eritematoso sistêmico'],
  'doenca-renal-cronica': ['Doença renal crônica', 'Rim que perde função aos poucos'],
  avc: ['Derrame', 'Acidente vascular cerebral'],
  infarto: ['Infarto', 'Infarto agudo do miocárdio'],
  'attr-cm': ['Coração engrossado', 'Amiloidose cardíaca por transtirretina'],
  nmosd: ['Doença que afeta a visão', 'Doença do espectro da neuromielite óptica'],
  'hiv': ['Infecção pelo vírus da imunodeficiência humana', 'Síndrome da imunodeficiência adquirida'],
  tept: ['Estresse após trauma', 'Transtorno de estresse pós-traumático'],
  nomofobia: ['Medo de ficar sem celular', 'Nomofobia'],
  ludopatia: ['Vício em apostas', 'Ludopatia'],
  'doencas-pele': ['Doenças de pele', 'Condições dermatológicas'],
  'dor-cronica': ['Dor que não passa', 'Dor crônica'],
};

// No abbreviations in names, buttons or accessible labels. Original text is retained in N3.
export function citizenText(text: string): string {
  const expansions: Record<string, string> = {
    HAS: 'hipertensão arterial sistêmica', DM2: 'diabetes tipo 2', DM1: 'diabetes tipo 1',
    DRC: 'doença renal crônica', LES: 'lúpus eritematoso sistêmico', AVC: 'acidente vascular cerebral',
    IAM: 'infarto agudo do miocárdio', IST: 'infecções sexualmente transmissíveis', ISTs: 'infecções sexualmente transmissíveis',
    APOL1: 'gene associado ao rim', NMOSD: 'doença do espectro da neuromielite óptica',
    'ATTR-CM': 'amiloidose cardíaca por transtirretina', HIV: 'vírus da imunodeficiência humana',
    AIDS: 'síndrome da imunodeficiência adquirida',
  };
  return text.replace(/\b(HAS|DM2|DM1|DRC|LES|AVC|IAM|ISTs?|APOL1|NMOSD|ATTR-CM|HIV|AIDS)\b/g, word => expansions[word]);
}
export function conditionNames(disease: Disease) {
  const pair = names[disease.id];
  const editorial = getCondition(disease.id);
  return { popular: editorial?.nome_leigo ?? pair?.[0] ?? citizenText(disease.name), technical: editorial?.nome_oficial ?? pair?.[1] ?? citizenText(disease.name) };
}
export function conditionPath(categoryId: string, diseaseId: string) {
  return `/saude/${categoryId}/${diseaseId}`;
}
export function normalize(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
export function editDistance(a: string, b: string): number {
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + Number(a[i - 1] !== b[j - 1]));
    row = next;
  }
  return row[b.length];
}
export function matchesCondition(disease: Disease, query: string) {
  const q = normalize(query);
  if (!q) return true;
  // Aliases are search metadata, never titles. Excluded aliases must not leak
  // through fuzzy matching (e.g. sickle trait is not sickle cell disease).
  const excluded: Record<string, string[]> = {
    'anemia-falciforme': ['traco falciforme', 'anemia'],
    hipertensao: ['pressao nervosa'], diabetes: ['diabetes tipo 1', 'diabetes infantil'],
    'miomas-uterinos': ['cancer do utero', 'tumor'], lupus: ['lupus da pele'],
    'doenca-renal-cronica': ['pedra nos rins', 'infeccao urinaria'],
  };
  if (excluded[disease.id]?.includes(q)) return false;
  const { popular, technical } = conditionNames(disease);
  const editorial = getCondition(disease.id);
  const aliases = editorial?.aliases ?? [];
  const haystack = normalize(`${popular} ${technical} ${editorial ? '' : disease.name} ${aliases.join(' ')}`);
  if (symptomMatches(disease.id, query)) return true;
  const words = haystack.split(' ');
  return q.split(' ').every(token => haystack.includes(token) ||
    (token.length >= 4 && words.some(word => editDistance(word, token) <= (token.length >= 5 ? 2 : 1))));
}

const categorySystems: Record<string, string> = {
  cardiovasculares: 'coracao-circulacao-respiracao', respiratorias: 'coracao-circulacao-respiracao',
  metabolicas: 'hormonios-metabolismo', hematologicas: 'sangue-imunidade', autoimunes: 'sangue-imunidade',
  'mulher-negra': 'saude-da-mulher', 'saude-mental': 'saude-mental-nervoso', neurologicas: 'saude-mental-nervoso',
  dermatologicas: 'pele', osteomusculares: 'ossos-musculos-articulacoes',
};
export function groupSystems(categories: DiseaseCategory[]) {
  const overrides: Record<string, string> = {
    nmosd: 'saude-mental-nervoso', 'attr-cm': 'coracao-circulacao-respiracao',
    'doenca-renal-cronica': 'rins-vias-urinarias', 'progressao-doenca-renal': 'rins-vias-urinarias', 'insuficiencia-renal': 'rins-vias-urinarias', hepatites: 'digestao-abdome',
    'doencas-pele': 'pele', osteoporose: 'ossos-musculos-articulacoes', 'dor-cronica': 'ossos-musculos-articulacoes',
  };
  const entries = categories.flatMap(category => category.diseases.map(disease => {
    const system = getCondition(disease.id)?.sistema_id ?? overrides[disease.id] ?? categorySystems[category.id];
    const transversal = /violencia|acidente/.test(normalize(`${category.id} ${disease.id}`));
    return { category, disease, system: transversal ? 'violencias-acidentes' : system ?? 'sem-classificacao', classificationPending: !system && !transversal };
  }));
  return [...healthContent.sistemas, { id: 'violencias-acidentes', nome: 'Violências e acidentes' }, { id: 'sem-classificacao', nome: 'Classificação em revisão' }]
    .map(({ id, nome }) => ({ id, title: nome, entries: entries.filter(entry => entry.system === id) }));
}
export type RiskFilter = 'Todas' | 'Tema prioritário de equidade' | 'Dado local disponível (DF)';
export function matchesRisk(disease: Disease, filter: RiskFilter) {
  return filter === 'Todas' || (filter === 'Tema prioritário de equidade'
    ? !!disease.isPriorityTheme || !!getCondition(disease.id)?.selos.includes(filter) : !!disease.localStudy);
}
export function wordPages(paragraphs: string[], limit = 180): string[][] {
  const pages: string[][] = [[]];
  let count = 0;
  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    for (let start = 0; start < words.length; start += limit) {
      const chunk = words.slice(start, start + limit);
      if (count + chunk.length > limit) { pages.push([]); count = 0; }
      pages[pages.length - 1].push(chunk.join(' '));
      count += chunk.length;
    }
  }
  return pages;
}
export function orderUnits<T extends { name: string; lat?: number | null; lng?: number | null }>(list: T[], location?: { lat: number; lng: number }) {
  return list.map(unit => ({ ...unit, distance: location && Number.isFinite(unit.lat) && Number.isFinite(unit.lng) ? distanceKm(location, { lat: unit.lat!, lng: unit.lng! }) : undefined }))
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity) || a.name.localeCompare(b.name, 'pt-BR')).slice(0, 10);
}
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const h = Math.sin((b.lat - a.lat) * rad / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin((b.lng - a.lng) * rad / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}
