import { healthUnits, regionalHospitals, emergencyUnits, cepavUnits } from './project';

export type HealthService = {
  id: string; nome: string; tipo: 'ubs' | 'upa' | 'hospital' | 'apoio_violencia';
  endereco: { logradouro: string; numero: null; bairro: string | null; cep: string | null; municipio: string | null; uf: 'DF' };
  geo: { lat: number | null; lng: number | null; precisao: 'nao_informada' };
  telefones: string[];
  horario: { descricao: string | null; is24h: boolean; escopo: 'servico' | 'setor'; fonte: string | null };
  servicos: string[]; condicoes_relacionadas: string[];
  fonte: { nome: string; url: string; data_coleta: string | null; responsavel: string | null };
  status_dado: 'validado' | 'pendente_validacao' | 'desatualizado'; atualizado_em: string | null;
};
// Explicit extension for violence support: do not label CEPAV as hospitals/UBS.
// Import date is NOT a collection/validation date. Absent facts remain null.
function service(id: string, nome: string, tipo: HealthService['tipo'], logradouro: string, url: string, region?: string): HealthService {
  return { id, nome, tipo, endereco: { logradouro, numero: null, bairro: region ?? null, cep: null, municipio: null, uf: 'DF' },
    geo: { lat: null, lng: null, precisao: 'nao_informada' }, telefones: [],
    horario: { descricao: null, is24h: false, escopo: 'servico', fonte: null }, servicos: [], condicoes_relacionadas: [],
    fonte: { nome: 'Secretaria de Saúde do Distrito Federal', url, data_coleta: null, responsavel: null },
    status_dado: 'pendente_validacao', atualizado_em: null };
}
export const healthServices: HealthService[] = [
  ...healthUnits.map(unit => service(unit.id, unit.name.replace(/^UBS\b/, 'Unidade Básica de Saúde'), 'ubs', unit.endereco, 'https://info.saude.df.gov.br/busca-saude-ubs/', unit.ra)),
  ...regionalHospitals.map(unit => {
    const record = service(unit.id, unit.nome, 'hospital', unit.endereco, unit.fonte);
    record.geo.lat = unit.lat; record.geo.lng = unit.lng;
    record.telefones = unit.telefone ? [unit.telefone] : [];
    record.servicos = unit.servicos;
    const emergency = unit.servicos.find(item => /24h/i.test(item));
    if (emergency) record.horario = { descricao: emergency, is24h: true, escopo: 'setor', fonte: unit.fonte };
    return record;
  }),
  ...emergencyUnits.map(unit => {
    const record = service(unit.id, unit.nome.replace(/^UPA\b/, 'Unidade de Pronto Atendimento'), 'upa', unit.endereco, unit.fonte, unit.ra);
    record.endereco.cep = 'cep' in unit ? unit.cep ?? null : null;
    // No hours inferred from the category name: confirm each unit first.
    return record;
  }),
  ...cepavUnits.map(unit => {
    const record = service(unit.id, unit.nome.replace(/^CEPAV\b/, 'Centro de atendimento a pessoas em situação de violência'), 'apoio_violencia', unit.endereco, 'https://www.saude.df.gov.br/carta-servicos-violencia');
    record.telefones = 'telefone' in unit && unit.telefone ? [unit.telefone] : [];
    return record;
  }),
];
export function dataStatus(service: HealthService, now = Date.now()) {
  if (service.fonte.data_coleta && now - Date.parse(service.fonte.data_coleta) > 180 * 86400000) return 'desatualizado';
  return service.status_dado;
}
// Dial only a complete, explicitly listed first number; do not join extensions
// or guess a missing area code from the address.
export function phoneHref(phone?: string) {
  const first = phone?.match(/\(?\d{2}\)?\s*\d{4,5}[-\s]?\d{4}/)?.[0].replace(/\D/g, '');
  return first && (first.length === 10 || first.length === 11) ? `tel:+55${first}` : undefined;
}
