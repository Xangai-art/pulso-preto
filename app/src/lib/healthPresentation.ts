import type { Disease, DiseaseCategory } from '@shared/data/diseases';

// Presentation only: the scientific catalogue and its identifiers stay unchanged.
export const MVP_IDS = ['anemia-falciforme', 'hipertensao', 'diabetes', 'miomas-uterinos', 'lupus', 'doenca-renal-cronica'] as const;
export const PENDING = '[CONTEÚDO PENDENTE DE VALIDAÇÃO PELA EQUIPE DA SAÚDE]';
export const DISCLAIMER = 'O app informa e orienta. Não substitui consulta com profissional de saúde.';

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
  return { popular: pair?.[0] ?? citizenText(disease.name), technical: pair?.[1] ?? citizenText(disease.name) };
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
  const { popular, technical } = conditionNames(disease);
  const haystack = normalize(`${popular} ${technical} ${disease.name}`);
  const words = haystack.split(' ');
  return normalize(query).split(' ').filter(Boolean).every(token =>
    haystack.includes(token) || (token.length >= 4 && words.some(word => editDistance(word, token) <= (token.length >= 5 ? 2 : 1))));
}

// Nine sections: the ten requested systems are preserved by grouping lungs with circulation.
const systems = [
  ['circulacao-pulmoes', 'Coração, circulação e pulmões', ['cardiovasculares', 'respiratorias']],
  ['hormonios-sangue', 'Hormônios e sangue', ['metabolicas', 'hematologicas']],
  ['mulher', 'Saúde da mulher', ['mulher-negra']],
  ['rins', 'Rins e genética', ['renais-geneticas', 'raras']],
  ['imunidade', 'Imunidade', ['autoimunes', 'infecciosas']],
  ['mente', 'Mente e sistema nervoso', ['saude-mental', 'neurologicas']],
  ['pele', 'Pele, cabelo e unhas', ['dermatologicas']],
  ['cancer', 'Câncer', ['oncologicas']],
  ['ossos', 'Ossos e articulações', ['osteomusculares']],
] as const;
export function groupSystems(categories: DiseaseCategory[]) {
  const overrides: Record<string, string> = {
    'anemia-falciforme': 'hormonios-sangue', lupus: 'imunidade', nmosd: 'mente',
    'attr-cm': 'circulacao-pulmoes', hepatites: 'imunidade', hiv: 'imunidade',
    'doencas-pele': 'pele', osteoporose: 'ossos', 'dor-cronica': 'ossos',
  };
  const entries = categories.flatMap(category => category.diseases.map(disease => {
    const system = overrides[disease.id] ?? systems.find(([, , ids]) => (ids as readonly string[]).includes(category.id))?.[0];
    // Never lose an entry when the scientific catalogue adds a category. Unclassified
    // items remain visible, explicitly marked, rather than silently reclassified.
    return { category, disease, system: system ?? 'mente', classificationPending: !system };
  }));
  return systems.map(([id, title]) => ({ id, title, entries: entries.filter(entry => entry.system === id) }));
}
export type RiskFilter = 'Todas' | 'Risco aumentado' | 'Acesso desigual';
export function matchesRisk(category: DiseaseCategory, filter: RiskFilter) {
  // Existing thematic metadata, not a new individual clinical risk classification.
  return filter === 'Todas' || (filter === 'Risco aumentado' ? /risco/i.test(category.subtitle) : /acesso/i.test(category.subtitle));
}
export function wordPages(paragraphs: string[], limit = 180): string[][] {
  const pages: string[][] = [[]];
  let count = 0;
  for (const paragraph of paragraphs) {
    const words = citizenText(paragraph).split(/\s+/).filter(Boolean);
    for (let start = 0; start < words.length; start += limit) {
      const chunk = words.slice(start, start + limit);
      if (count + chunk.length > limit) { pages.push([]); count = 0; }
      pages[pages.length - 1].push(chunk.join(' '));
      count += chunk.length;
    }
  }
  return pages;
}
export function orderUnits<T extends { name: string; lat?: number; lng?: number }>(list: T[], location?: { lat: number; lng: number }) {
  return list.map(unit => ({ ...unit, distance: location && unit.lat != null && unit.lng != null ? distanceKm(location, { lat: unit.lat, lng: unit.lng }) : undefined }))
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity) || a.name.localeCompare(b.name, 'pt-BR')).slice(0, 10);
}
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const h = Math.sin((b.lat - a.lat) * rad / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin((b.lng - a.lng) * rad / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}
