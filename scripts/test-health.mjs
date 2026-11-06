import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFileSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { createServer } from '../app/node_modules/vite/dist/node/index.js';

// Uses the project's existing TypeScript transformer; no product dependencies added.
const server = await createServer({ configFile: false, root: fileURLToPath(new URL('../app', import.meta.url)), resolve: { alias: { '@shared': fileURLToPath(new URL('../shared', import.meta.url)), react: fileURLToPath(new URL('../app/node_modules/react', import.meta.url)) } }, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
let checks = 0;
function check(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
try {
  const { MVP_IDS, conditionNames, matchesCondition, groupSystems, citizenText, distanceKm, wordPages, orderUnits, matchesRisk } = await server.ssrLoadModule('/src/lib/healthPresentation.ts');
  const { diseaseCategories } = await server.ssrLoadModule('../shared/data/diseases.ts');
  const { getDeepContent } = await server.ssrLoadModule('../shared/data/deepContentRegistry.ts');
  const { getPulsoContent, getPulsoLinkLabel } = await server.ssrLoadModule('../shared/data/pulsoContent.ts');
  const { faqItems } = await server.ssrLoadModule('../shared/data/faq.ts');
  check('rótulo canônico de transparência sem hibridismo PT/ES', () => {
    const fallback = 'Transparência e governança';
    assert.equal(getPulsoLinkLabel('pt', '/transparencia', fallback), fallback);
    assert.equal(getPulsoLinkLabel('es', '/transparencia', fallback), 'Transparencia y gobernanza');
    const footerLabel = getPulsoContent('es').footer.columns.flatMap(column => column.items).find(item => item.to === '/transparencia')?.label;
    assert.equal(footerLabel, 'Transparencia y gobernanza');
  });
  check('link genérico da FAQ usa a nomenclatura ES da navegação', () => {
    const item = faqItems.find(item => item.id === 'racismo-no-atendimento');
    assert.equal(item.to, '/ouvidoria');
    assert.equal(item.linkLabel.pt, 'Ir para a Ouvidoria');
    assert.equal(item.linkLabel.es, `Ir a la ${getPulsoLinkLabel('es', '/ouvidoria', 'Ouvidoria')}`);
    assert.equal(item.linkLabel.es, 'Ir a la Defensoría');
  });
  const { translateText } = await server.ssrLoadModule('../shared/data/locales.ts');
  const ptDictionary = JSON.parse(readFileSync(new URL('../shared/i18n/pt-BR.json', import.meta.url), 'utf8'));
  const esDictionary = JSON.parse(readFileSync(new URL('../shared/i18n/es.json', import.meta.url), 'utf8'));
  check('locales JSON mantêm paridade, PT original e nenhuma tradução vazia', () => {
    assert.deepEqual(Object.keys(ptDictionary).sort(), Object.keys(esDictionary).sort());
    for (const key of Object.keys(ptDictionary)) {
      assert.equal(ptDictionary[key], key);
      assert.equal(translateText('pt', key), key);
      assert.ok(esDictionary[key].trim(), key);
      assert.equal(translateText('es', key), esDictionary[key]);
    }
    assert.equal(esDictionary['Biblioteca de Saúde'], 'Biblioteca de Salud');
    assert.equal(esDictionary['Biblioteca de saúde'], 'Biblioteca de salud');
  });
  check('pacote de telas: seis rótulos Home, sete regiões e dez papéis de parceiros', () => {
    for (const [pt, es] of [
      ['Acesso rápido', 'Acceso rápido'],
      ['Encontrar Unidade de Saúde', 'Encontrar unidad de salud'],
      ['Radar comunitário', 'Radar comunitario'],
      ['Biblioteca de saúde', 'Biblioteca de salud'],
      ['Direito à saúde', 'Derecho a la salud'],
      ['Suas condições acompanhadas', 'Tus condiciones en seguimiento'],
    ]) assert.equal(translateText('es', pt), es);
    const regionNames = ['Región Central', 'Región Centro-Sur', 'Región Norte', 'Región Sur', 'Región Este', 'Región Oeste', 'Región Sudoeste'];
    const projectSource = readFileSync(new URL('../shared/data/project.ts', import.meta.url), 'utf8');
    const names = [...projectSource.matchAll(/nome: '(Região [^']+)'/g)].map(match => match[1]);
    assert.deepEqual(names.map(name => translateText('es', name)), regionNames);
    const roles = [...projectSource.slice(projectSource.indexOf('export const partners'), projectSource.indexOf('  referencia:')).matchAll(/role: '([^']+)'/g)].map(match => match[1]);
    assert.equal(roles.length, 10);
    for (const role of roles) assert.ok(Object.hasOwn(esDictionary, role), role);
  });
  check('pacote de telas: exceções autorizadas, marca dinâmica e aviso legal sem híbridos', () => {
    assert.equal(translateText('es', 'Busca Saúde (SES-DF)'), 'Busca Salud (SES-DF)');
    const aboutKey = Object.keys(ptDictionary).find(key => key.startsWith('O Conectando Saúde e Inclusão é um projeto'));
    assert.ok(translateText('es', aboutKey).startsWith('Conectando Salud e Inclusión es un proyecto'));
    const noticeKey = Object.keys(ptDictionary).find(key => key.startsWith('O {brand} não conduz ensaios clínicos.'));
    assert.ok(noticeKey.includes('Termo de Consentimento Livre e Informado (TCLE)'));
    const notice = translateText('es', noticeKey).replace('{brand}', 'Marca de teste');
    assert.ok(notice.startsWith('Marca de teste no conduce ensayos clínicos.'));
    assert.ok(notice.includes('fuentes oficiales y reguladas'));
    assert.ok(notice.includes('Termo de Consentimento Livre e Esclarecido (TCLE)'));
    assert.ok(!/regulamentadas|Transparência y gobernanza|Termo de Consentimiento|Odontológicas/.test(Object.values(esDictionary).join(' ')));
  });
  const entries = diseaseCategories.flatMap(category => category.diseases.map(disease => ({ category, disease })));
  check('catálogo preservado em nove sistemas, eixo e não classificados', () => {
    const systems = groupSystems(diseaseCategories);
    assert.equal(systems.length, 11);
    assert.equal(systems.find(s => s.id === 'sangue-imunidade').entries.some(e => e.disease.id === 'anemia-falciforme'), true);
    console.log('Classificação em revisão:', systems.find(s => s.id === 'sem-classificacao').entries.map(e => e.disease.id).join(', ') || 'nenhuma');
    const ids = systems.flatMap(system => system.entries.map(entry => entry.disease.id));
    assert.deepEqual([...ids].sort(), entries.map(entry => entry.disease.id).sort());
    assert.equal(new Set(ids).size, ids.length);
  });
  for (const id of MVP_IDS) check(`nomenclatura: ${id}`, () => {
    const { disease } = entries.find(entry => entry.disease.id === id);
    const { popular, technical } = conditionNames(disease);
    assert.ok(popular.length <= 24); assert.ok(technical);
    assert.ok(!/\b(HAS|DM2|DM1|DRC|LES|AVC|IAM|IST|APOL1|NMOSD|ATTR-CM)\b/.test(`${popular} ${technical}`));
  });
  const queries = [
    ['pressao alta', 'hipertensao'], ['preçao alta', 'hipertensao'], ['presao alta', 'hipertensao'], ['hipertensao arterial', 'hipertensao'], ['hipertenssao', 'hipertensao'],
    ['anemia falciforme', 'anemia-falciforme'], ['anemia falcifome', 'anemia-falciforme'], ['falciformi', 'anemia-falciforme'],
    ['diabetes tipo 2', 'diabetes'], ['diabtes', 'diabetes'], ['diabetis', 'diabetes'],
    ['mioma uterino', 'miomas-uterinos'], ['miomas', 'miomas-uterinos'], ['mioma uterin', 'miomas-uterinos'],
    ['lupus', 'lupus'], ['lúpus', 'lupus'], ['lupuz', 'lupus'],
    ['doenca renal cronica', 'doenca-renal-cronica'], ['renal cronca', 'doenca-renal-cronica'], ['rim fraco', 'doenca-renal-cronica'],
  ];
  for (const [query, id] of queries) check(`busca: ${query}`, () => assert.ok(matchesCondition(entries.find(entry => entry.disease.id === id).disease, query)));
  check('busca sem correspondência', () => assert.ok(!entries.some(({ disease }) => matchesCondition(disease, 'zzzzzzzzzzzz'))));
  check('expansão da tabela de siglas', () => assert.ok(!/\b(HAS|DM2|DM1|DRC|LES|AVC|IAM|IST|APOL1|NMOSD|ATTR-CM)\b/.test(citizenText('HAS DM2 DM1 DRC LES AVC IAM IST APOL1 NMOSD ATTR-CM'))));
  check('paginação preserva todas as palavras do acervo', () => {
    for (const id of MVP_IDS) {
      const content = getDeepContent(id, 'pt');
      const paragraphs = Object.values(content.audiences).flatMap(audience => [audience.summary, ...audience.sections.flatMap(section => [section.heading, ...section.body])]);
      const pages = wordPages(paragraphs);
      assert.ok(pages.every(page => page.join(' ').split(/\s+/).length <= 180));
      assert.equal(pages.flat().join(' '), paragraphs.join(' ').split(/\s+/).filter(Boolean).join(' '));
    }
  });
  check('distância e ordenação simuladas', () => {
    assert.equal(distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 0 }), 0);
    const units = [{ id: 'longe', name: 'Longe', lat: -16, lng: -48 }, { id: 'perto', name: 'Perto', lat: -15.78, lng: -47.88 }, { id: 'sem', name: 'Sem coordenadas' }];
    assert.deepEqual(orderUnits(units, { lat: -15.78, lng: -47.88 }).map(unit => unit.id), ['perto', 'longe', 'sem']);
    assert.equal(orderUnits(Array.from({ length: 20 }, (_, i) => ({ id: String(i), name: `Unidade ${i}` }))).length, 10);
  });
  check('contraste dos pares usados pela nova interface', () => {
    const luminance = hex => {
      const rgb = hex.match(/\w\w/g).map(part => parseInt(part, 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    for (const color of ['06201B', '1A5C3A']) {
      const ratio = (luminance('F7F5F0') + 0.05) / (luminance(color) + 0.05);
      console.log(`  #${color} / #F7F5F0: ${ratio.toFixed(2)}:1`); assert.ok(ratio >= 4.5);
    }
  });
  const pkg = JSON.parse(readFileSync(new URL('../shared/data/condicoes.saude.v1.json', import.meta.url), 'utf8'));
  const glossary = JSON.parse(readFileSync(new URL('../shared/data/glossario-siglas.json', import.meta.url), 'utf8'));
  const { hasClinicalApproval, healthTranslate } = await server.ssrLoadModule('/src/lib/healthContent.ts');
  for (const condition of pkg.condicoes) check(`contrato clínico: ${condition.id}`, () => {
    const words = condition.definicao.trim().split(/\s+/).length;
    const sentences = condition.definicao.split(/[.!?]+/).filter(s => s.trim()).length;
    assert.ok(words <= 55 && sentences >= 2 && sentences <= 3);
    assert.equal(condition.sinais.length, 3); assert.equal(condition.acoes.length, 3);
    assert.ok(condition.equidade.trim().split(/\s+/).length <= 60);
    assert.ok(condition.alerta && condition.fontes.length);
    assert.ok(condition.fontes.every(s => /^https:\/\//.test(s.url) && s.orgao && s.acesso));
    assert.ok(condition.selos.every(s => pkg.selos_permitidos.includes(s)));
    const text = [condition.definicao, ...condition.sinais, ...condition.acoes, condition.alerta, condition.equidade].join(' ');
    for (const word of pkg.rules.proibido_prescrever) assert.ok(!new RegExp(`\\b${word}\\b`, 'iu').test(text), word);
    for (const acronym of text.match(/\b[A-Z]{2,}[0-9]*\b/g) ?? []) assert.ok(glossary[acronym], acronym);
    if (/mais comum|mais frequente|vezes mais|prevalência/i.test(text)) assert.ok(condition.fontes.length);
    assert.equal(hasClinicalApproval(condition), false);
    assert.equal(hasClinicalApproval({ ...condition, status: 'aprovado' }), false);
    assert.equal(hasClinicalApproval({ ...condition, status: 'aprovado', revisor: 'Revisor de teste', revisor_conselho: 'Conselho de teste', data_revisao: '2026-11-04' }), true);
    for (const alias of condition.aliases) assert.ok(matchesCondition(entries.find(e => e.disease.id === condition.id).disease, alias), alias);
  });
  check('aliases clinicamente distintos não são sinônimos', () => {
    for (const [id, query] of [['anemia-falciforme', 'traço falciforme'], ['anemia-falciforme', 'anemia'], ['diabetes', 'diabetes tipo 1'], ['lupus', 'lúpus da pele'], ['doenca-renal-cronica', 'pedra nos rins']])
      assert.equal(matchesCondition(entries.find(e => e.disease.id === id).disease, query), false);
  });
  check('filtro editorial usa metadados por condição', () => {
    assert.ok(matchesRisk({ id: 'teste', name: 'Teste', isPriorityTheme: true }, 'Tema prioritário de equidade'));
    assert.equal(matchesRisk({ id: 'teste', name: 'Teste' }, 'Dado local disponível (DF)'), false);
  });
  const { symptoms, symptomConditionIds, isUrgentSearch } = await server.ssrLoadModule('/src/lib/healthSymptoms.ts');
  check('42 sintomas, sem associação a mais de quatro fichas', () => {
    assert.equal(symptoms.length, 42);
    for (const terms of symptoms) assert.ok(symptomConditionIds(terms).length <= 4);
    for (const term of ['dor no peito', 'desmaio', 'falta de ar', 'dor torácica', 'dispneia']) assert.ok(isUrgentSearch(term));
    assert.ok(!isUrgentSearch('mioma'));
  });
  check('proximidade cobre UBS, UPA e hospital com e sem geo', () => {
    for (const type of ['ubs', 'upa', 'hospital']) {
      const units = [{ id: `${type}-longe`, name: 'B', lat: -16, lng: -48 }, { id: `${type}-perto`, name: 'C', lat: -15.78, lng: -47.88 }, { id: `${type}-sem`, name: 'A', lat: null, lng: null }];
      assert.deepEqual(orderUnits(units, { lat: -15.78, lng: -47.88 }).map(u => u.name), ['C','B','A']);
      assert.deepEqual(orderUnits(units).map(u => u.name), ['A','B','C']);
      assert.ok(orderUnits(units).every(u => u.distance === undefined));
    }
  });
  const { healthServices, phoneHref, dataStatus } = await server.ssrLoadModule('../shared/data/healthServices.ts');
  check('schema de rede não fabrica coleta, validação, geo ou horário', () => {
    assert.ok(healthServices.length > 0);
    for (const unit of healthServices) {
      assert.equal(unit.status_dado, 'pendente_validacao'); assert.equal(unit.fonte.data_coleta, null);
      assert.ok(unit.fonte.url.startsWith('https://'));
      if (unit.tipo !== 'hospital') { assert.equal(unit.geo.lat, null); assert.equal(unit.horario.descricao, null); }
      if (unit.horario.is24h) assert.equal(unit.horario.escopo, 'setor');
      assert.deepEqual(unit.condicoes_relacionadas, []);
    }
    assert.equal(phoneHref('(61) 3449-4738'), 'tel:+556134494738');
    assert.equal(phoneHref('9999-0000'), undefined);
    assert.equal(dataStatus({ ...healthServices[0], fonte: { data_coleta: '2020-01-01' } }), 'desatualizado');
    assert.deepEqual(JSON.parse(readFileSync(new URL('../shared/data/servicos.v1.json', import.meta.url), 'utf8')), healthServices);
  });
  check('paridade dos dicionários PT/ES e traduções do Anexo D', () => {
    const pt = JSON.parse(readFileSync(new URL('../shared/i18n/pt-BR.json', import.meta.url), 'utf8'));
    const es = JSON.parse(readFileSync(new URL('../shared/i18n/es.json', import.meta.url), 'utf8'));
    assert.deepEqual(Object.keys(pt).sort(), Object.keys(es).sort());
    assert.equal(healthTranslate('es', 'Saúde'), 'Salud');
    assert.equal(healthTranslate('es', 'Filtros de conteúdo'), 'Filtros de contenido');
    assert.equal(healthTranslate('es', pkg.servicos.aviso).includes('Ela não'), false);
  });
  check('cache público não registra IDs e migra cache legado', () => {
    const code = readFileSync(new URL('../app/src/lib/useHealthCatalogue.ts', import.meta.url), 'utf8');
    assert.ok(code.includes("caches.delete('pulso-health-editorial-v1')"));
    assert.ok(!/openedKey|saveOpenedCondition|\/opened\//.test(code));
    assert.ok(!/localStorage|indexedDB/.test(code));
    assert.ok(!pkg.features.notes && !pkg.features.condition_read_history && !pkg.features.service_worker);
  });
  check('orçamento do catálogo ≤120 KB gzip', () => assert.ok(gzipSync(Buffer.from(JSON.stringify(pkg))).length <= 120 * 1024));
  if (!process.argv.includes('--content-only')) check('bundle não contém marcador clínico antigo', () => {
    for (const name of readdirSync(new URL('../app/dist/assets', import.meta.url))) {
      if (name.endsWith('.js')) assert.ok(!readFileSync(new URL(`../app/dist/assets/${name}`, import.meta.url), 'utf8').includes(pkg.rules.marcador_antigo_proibido));
    }
  });
  console.log(`\n${checks} verificações aprovadas. Não substituem validação clínica, VoiceOver/TalkBack ou teste com usuários.`);
} finally { await server.close(); }
