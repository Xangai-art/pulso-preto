import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '../.qa-tools/node_modules/playwright/index.mjs');
const { default: AxeBuilder } = await import('../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs');
const base = process.env.HEALTH_TEST_URL || 'http://localhost:3000';
const output = new URL('../.qa-tools/artifacts/', import.meta.url);
mkdirSync(output, { recursive: true });
const catalogue = JSON.parse(readFileSync(new URL('../database/content.json', import.meta.url), 'utf8'));
const content = JSON.parse(readFileSync(new URL('../shared/data/condicoes.saude.v1.json', import.meta.url), 'utf8'));
const glossary = JSON.parse(readFileSync(new URL('../shared/data/glossario-siglas.json', import.meta.url), 'utf8'));
const pt = JSON.parse(readFileSync(new URL('../shared/i18n/pt-BR.json', import.meta.url), 'utf8'));
const es = JSON.parse(readFileSync(new URL('../shared/i18n/es.json', import.meta.url), 'utf8'));
const ids = content.condicoes.map(c => c.id);
const pathFor = id => `/app/saude/${catalogue.diseases.find(d => d.id === id).category_id}/${id}`;
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 360, height: 800 }, geolocation: { latitude: -15.78, longitude: -47.88 }, permissions: ['geolocation'] });
await context.addInitScript(() => {
  // Synthetic fixture only; real consent and onboarding flow is untouched.
  if (!localStorage.getItem('gente-preta-sentinela')) localStorage.setItem('gente-preta-sentinela', JSON.stringify({ state: { onboarded: true, consent: { level1_appUsage: true, level2_research: false, level3_aggregation: false, level4_geolocation: true }, baseline: null, checkIns: [], reports: [], radarOptIn: false }, version: 0 }));
});
const page = await context.newPage();
const errors = []; const snapshots = {}; const metrics = { axe: [] };
page.on('pageerror', error => errors.push(error.message));
async function capture(name) {
  snapshots[name] = await page.locator('#health-content').ariaSnapshot();
  await page.screenshot({ path: new URL(`${name}.png`, output).pathname, fullPage: true });
  console.log(`PASS ${name}`);
}
async function go(path, selector) {
  await page.goto(`${base}${path}`);
  await page.locator(selector).first().waitFor();
  await page.getByText('Buscando informações…', { exact: true }).waitFor({ state: 'hidden' });
}
async function axe(name) {
  const result = await new AxeBuilder({ page }).include('.health-screen').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  metrics.axe.push({ screen: name, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })) });
  assert.deepEqual(result.violations.filter(v => ['critical','serious'].includes(v.impact)).map(v => `${v.id}: ${v.nodes.map(n => n.target).join(';')}`), [], name);
}
async function assertSpanishChrome() {
  const leaks = await page.evaluate(({ pt, es }) => {
    const root = document.querySelector('.health-screen');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const found = []; let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement?.getClientRects().length || node.parentElement.closest('[hidden]')) continue;
      if (node.parentElement.closest('[lang]')?.getAttribute('lang')?.startsWith('pt')) continue;
      const text = node.textContent.trim();
      if (pt[text] && es[text] && pt[text] !== es[text] && text !== 'Português') found.push(text);
    }
    for (const el of root.querySelectorAll('[placeholder], [aria-label]')) {
      if (el.closest('[lang]')?.getAttribute('lang')?.startsWith('pt')) continue;
      const text = el.getAttribute('placeholder') || el.getAttribute('aria-label');
      if (pt[text] && es[text] && pt[text] !== es[text]) found.push(text);
    }
    return found;
  }, { pt, es });
  assert.deepEqual(leaks, []);
}
try {
  await go('/app/saude', '[data-screen="S0"] .health-card');
  assert.equal(await page.locator('.health-card').count(), 6);
  assert.equal(await page.getByRole('button', { name: 'Minhas anotações', exact: true }).isDisabled(), true);
  await axe('S0'); await capture('S0-ready');
  // Upgrade must actively erase legacy condition-reading history.
  await page.evaluate(async () => { const c = await caches.open('pulso-health-editorial-v1'); await c.put('/__health_editorial/opened/test', new Response('{}')); });
  await go('/app/saude?lista=1', '.health-system');
  assert.equal(await page.evaluate(async () => (await caches.keys()).includes('pulso-health-editorial-v1')), false);
  assert.equal(await page.locator('.health-system').count(), 11);
  await page.getByText(content.avisos_fixos.filtros, { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Tema prioritário de equidade', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Tema prioritário de equidade', exact: true }).getAttribute('aria-pressed'), 'true');
  await axe('S1'); await capture('S1-ready');
  await page.getByRole('button', { name: 'Limpar filtros', exact: true }).click();
  for (const [query, id] of [['HAS','hipertensao'], ['fibroma','miomas-uterinos'], ['rim fraco','doenca-renal-cronica'], ['sede excessiva','diabetes']]) {
    await page.getByRole('searchbox').fill(query);
    await page.locator(`.health-card[href$="/${id}"]`).waitFor();
  }
  await page.getByRole('searchbox').fill('dor no peito');
  await page.locator('[data-search-alert]').waitFor();
  assert.ok(await page.evaluate(() => !!(document.querySelector('[data-search-alert]').compareDocumentPosition(document.querySelector('[aria-label="Resultados da busca"]')) & Node.DOCUMENT_POSITION_FOLLOWING)));
  assert.ok(await page.locator('.health-card').count() <= 4);
  await capture('S1-urgent');
  await page.getByRole('searchbox').fill('zzzzzzzzzzzz');
  await page.getByText('Nenhum resultado', { exact: true }).waitFor();
  assert.ok((await page.getByRole('link', { name: 'Buscar serviços perto de mim' }).getAttribute('href')).includes('limite=3'));
  await capture('S1-empty');
  for (const id of ids) {
    await go(pathFor(id), '[data-screen="S2"]');
    assert.equal(await page.locator('[data-clinical-status="proposto"]').count(), 1);
    assert.equal(await page.locator('[data-detail-block="signs"] ol li').count(), 3);
    assert.equal(await page.locator('[data-detail-block="actions"] ol li').count(), 3);
    assert.equal(await page.getByText(content.condicoes.find(c => c.id === id).definicao, { exact: true }).count(), 1);
    assert.ok(!(await page.locator('.health-screen').innerText()).includes(content.rules.marcador_antigo_proibido));
    assert.ok(await page.evaluate(() => !!(document.querySelector('[data-detail-block="alert"]').compareDocumentPosition(document.querySelector('[data-detail-block="actions"]')) & Node.DOCUMENT_POSITION_FOLLOWING)));
    const links = page.locator('#official-sources a[target="_blank"]');
    assert.equal(await links.count(), content.condicoes.find(c => c.id === id).fontes.length);
    for (const link of await links.all()) assert.equal(await link.getAttribute('rel'), 'noopener noreferrer');
    const unknown = await page.evaluate(glossary => {
      const walker = document.createTreeWalker(document.querySelector('#health-content'), NodeFilter.SHOW_TEXT); const unknown = []; let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest('abbr') || !node.parentElement.getClientRects().length || node.parentElement.closest('details:not([open]),[hidden]')) continue;
        for (const word of node.textContent.match(/\b[A-Z]{2,}[0-9]*\b/g) ?? []) if (!glossary[word]) unknown.push(word);
      }
      return unknown;
    }, glossary);
    assert.deepEqual(unknown, [], id);
    await page.getByRole('button', { name: 'Entenda melhor', exact: true }).click();
    await page.getByText('Não há respostas de perguntas frequentes nesta versão.', { exact: true }).waitFor();
    await axe(`S2-${id}`); await capture(`S2-${id}`);
  }
  await page.getByRole('link', { name: 'Aprofundar no acervo', exact: true }).click();
  await page.locator('[data-screen="S3"] #source-record').waitFor();
  await axe('S3'); await capture('S3-archive');
  await go('/app/saude/cardiovasculares/infarto', '[data-screen="S2"]');
  assert.equal(await page.locator('[data-detail-block="actions"]').count(), 0);
  await page.getByText('Conteúdo desta condição em preparação — as seis fichas disponíveis estão em revisão clínica.').waitFor();
  await go('/app/mapa', '[data-screen="S4"]');
  const general = await page.locator('[data-service-id]').evaluateAll(nodes => nodes.map(n => n.dataset.serviceId));
  await go('/app/mapa?condicao=diabetes', '[data-screen="S4"]');
  assert.deepEqual(await page.locator('[data-service-id]').evaluateAll(nodes => nodes.map(n => n.dataset.serviceId)), general);
  await page.getByText(content.servicos.aviso, { exact: true }).waitFor();
  await page.getByText(content.servicos.fallbacks.distancia, { exact: true }).first().waitFor();
  for (const type of ['ubs','upa','hospital']) {
    await page.getByLabel('Tipo de unidade').selectOption(type);
    assert.ok(await page.locator('[data-service-id]').count() > 0);
    if (type !== 'hospital') await page.getByText(content.servicos.fallbacks.telefone, { exact: true }).first().waitFor();
  }
  await page.getByRole('button', { name: 'Usar minha localização' }).click();
  await page.getByText('Localização obtida. Distâncias em linha reta, quando disponíveis.', { exact: true }).waitFor();
  const distances = (await page.locator('.health-services > li').allTextContents()).map(text => Number(text.match(/([\d,]+) km em linha reta/)[1].replace(',', '.')));
  assert.deepEqual(distances, [...distances].sort((a,b) => a-b));
  await page.getByText(content.servicos.horario_24h, { exact: true }).first().waitFor();
  await axe('S4'); await capture('S4-location');
  // Real offline transition after loading; no reload/installation promise.
  await go(pathFor('diabetes'), '[data-screen="S2"]');
  await context.setOffline(true);
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));
  await page.getByText(/Você está sem internet/).waitFor();
  assert.equal(await page.locator('[data-detail-block="actions"] li').count(), 3);
  const keys = await page.evaluate(async () => { const c = await caches.open('pulso-health-catalogue-v1.0'); return (await c.keys()).map(r => new URL(r.url).pathname); });
  assert.deepEqual(keys, ['/__health_editorial/catalogue']);
  await capture('S2-offline');
  await context.setOffline(false);
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await page.getByText(/Você está sem internet/).waitFor({ state: 'hidden' });
  // Runtime locale switch, retaining clinical originals explicitly as pt-BR.
  await page.getByRole('button', { name: 'Aparência' }).count().then(async count => {
    const trigger = count ? page.getByRole('button', { name: 'Aparência' }) : page.locator('.health-screen > .sticky button').first();
    await trigger.click();
  });
  await page.getByRole('button', { name: /Español/ }).click();
  await page.getByText('Salud', { exact: true }).first().waitFor();
  for (const [path, selector] of [['/app/saude','.health-card'], ['/app/saude?lista=1','.health-system'], [pathFor('diabetes'),'[data-screen="S2"]'], ['/app/mapa','[data-screen="S4"]'], [`${pathFor('lupus')}?aprofundar=1`,'#source-record']]) {
    await go(path, selector); await assertSpanishChrome();
  }
  await capture('S3-es');
  await go('/app/saude', '.health-card');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await capture('S0-font-200');
  assert.deepEqual(errors, []);
  const snapshotPath = new URL('./health-ui.snap.json', import.meta.url);
  if (process.argv.includes('--update')) writeFileSync(snapshotPath, JSON.stringify(snapshots, null, 2) + '\n');
  else assert.deepEqual(snapshots, JSON.parse(readFileSync(snapshotPath, 'utf8')));
  writeFileSync(new URL('metrics.json', output), JSON.stringify(metrics, null, 2) + '\n');
  console.log('PASS seis fichas, fontes, sintomas, ES, privacidade do cache, rede geral, proximidade e axe. Homologação humana permanece pendente.');
} finally { await browser.close(); }
