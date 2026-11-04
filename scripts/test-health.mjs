import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createServer } from '../app/node_modules/vite/dist/node/index.js';

// Uses the project's existing TypeScript transformer; no product dependencies added.
const server = await createServer({ configFile: false, root: fileURLToPath(new URL('../app', import.meta.url)), resolve: { alias: { '@shared': fileURLToPath(new URL('../shared', import.meta.url)) } }, server: { middlewareMode: true, hmr: false }, appType: 'custom' });
let checks = 0;
function check(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
try {
  const { MVP_IDS, conditionNames, matchesCondition, groupSystems, citizenText, distanceKm, wordPages, orderUnits } = await server.ssrLoadModule('/src/lib/healthPresentation.ts');
  const { diseaseCategories } = await server.ssrLoadModule('../shared/data/diseases.ts');
  const { getDeepContent } = await server.ssrLoadModule('../shared/data/deepContentRegistry.ts');
  const entries = diseaseCategories.flatMap(category => category.diseases.map(disease => ({ category, disease })));
  check('catálogo inteiro permanece acessível em nove sistemas', () => {
    const systems = groupSystems(diseaseCategories);
    assert.equal(systems.length, 9);
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
    ['doenca renal cronica', 'doenca-renal-cronica'], ['renal cronca', 'doenca-renal-cronica'], ['rim perde funcao', 'doenca-renal-cronica'],
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
      assert.equal(pages.flat().join(' '), paragraphs.map(citizenText).join(' ').split(/\s+/).filter(Boolean).join(' '));
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
  console.log(`\n${checks} verificações aprovadas. Não substituem validação clínica, VoiceOver/TalkBack ou teste com usuários.`);
} finally { await server.close(); }
