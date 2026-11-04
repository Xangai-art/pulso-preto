import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || '../.qa-tools/node_modules/playwright/index.mjs');
const base = process.env.HEALTH_TEST_URL || 'http://localhost:3000';
const output = new URL('../.qa-tools/artifacts/', import.meta.url);
mkdirSync(output, { recursive: true });
const catalogue = JSON.parse(readFileSync(new URL('../database/content.json', import.meta.url), 'utf8'));
const ids = ['anemia-falciforme', 'hipertensao', 'diabetes', 'miomas-uterinos', 'lupus', 'doenca-renal-cronica'];
const pathFor = id => `/app/saude/${catalogue.diseases.find(d => d.id === id).category_id}/${id}`;
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 360, height: 800 }, geolocation: { latitude: -15.78, longitude: -47.88 }, permissions: ['geolocation'] });
await context.addInitScript(() => {
  // Synthetic test fixture only; production consent and onboarding code is unchanged.
  localStorage.setItem('gente-preta-sentinela', JSON.stringify({ state: { onboarded: true, consent: { level1_appUsage: true, level2_research: false, level3_aggregation: false, level4_geolocation: true }, baseline: null, checkIns: [], reports: [], radarOptIn: false }, version: 0 }));
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const snapshots = {};
const metrics = {};
async function capture(name, selector = '#health-content') {
  snapshots[name] = await page.locator(selector).ariaSnapshot();
  await page.screenshot({ path: new URL(`${name}.png`, output).pathname, fullPage: true });
  console.log(`PASS ${name}`);
}
async function go(path, selector) {
  await page.goto(`${base}${path}`);
  await page.locator(selector).first().waitFor();
  await page.getByText('Buscando informações…', { exact: true }).waitFor({ state: 'hidden' });
}
async function setOffline(value) {
  // Real network emulation; the extra event keeps the fixture deterministic.
  await context.setOffline(value);
  await page.evaluate(value => window.dispatchEvent(new Event(value ? 'offline' : 'online')), value);
}
try {
  await go('/app/saude', '[data-screen="S0"] .health-card');
  assert.equal(await page.locator('.health-card').count(), 6);
  assert.equal(await page.locator('.health-intents > *').count(), 3);
  metrics.s0Blocks = await page.locator('[data-block]').count() + 3; // header + search + footer
  assert.ok(metrics.s0Blocks <= 7);
  metrics.s0WordsInFold = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.querySelector('.health-screen'), NodeFilter.SHOW_TEXT);
    let words = 0; let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(node);
      const bounds = range.getBoundingClientRect();
      if (bounds.height && bounds.top >= 0 && bounds.bottom <= innerHeight - 80) words += node.textContent.trim().split(/\s+/).length;
    }
    return words;
  });
  await capture('S0-ready');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.addStyleTag({ content: 'html { filter: grayscale(1); }' });
  await page.screenshot({ path: new URL('S0-grayscale.png', output).pathname, fullPage: true });
  await go('/app/saude?lista=1', '.health-system');
  assert.equal(await page.locator('.health-system').count(), 9);
  assert.equal(await page.locator('.health-system button[aria-expanded="true"]').count(), 1);
  assert.equal(await page.locator('.health-filters button').count(), 3);
  await capture('S1-ready');
  for (const root of ['/app/saude', '/app/saude?lista=1']) {
    await go(root, '.health-card');
    await page.getByRole('searchbox').fill('zzzzzzzzzzzz');
    await page.getByText("Não encontramos essa condição. Tente outro nome, como 'pressão alta'.").waitFor();
    await capture(root.includes('?') ? 'S1-empty' : 'S0-empty');
  }
  for (const id of ids) {
    await go(pathFor(id), '[data-screen="S2"]');
    assert.equal(await page.locator('[data-detail-block]').count(), 5);
    assert.equal(await page.locator('[data-detail-block="signs"] li').count(), 3);
    assert.equal(await page.locator('[data-detail-block="actions"] li').count(), 3);
    assert.equal(await page.getByRole('button', { name: 'Entenda melhor' }).getAttribute('aria-expanded'), 'false');
    const words = (await page.locator('[data-screen="S2"]').innerText()).trim().split(/\s+/).length;
    metrics[`S2-${id}-words`] = words; assert.ok(words <= 180);
    await capture(`S2-${id}`);
  }
  await page.getByRole('button', { name: 'Entenda melhor' }).click();
  await page.getByRole('link', { name: 'O que diz a ciência? — Ver fonte' }).click();
  await page.locator('[data-screen="S3"]').waitFor();
  assert.equal(await page.locator('[data-deep-block]').count(), 4);
  await page.waitForFunction(() => document.querySelector('#science')?.innerText.includes('Science'));
  await capture('S3-science');
  await page.getByRole('link', { name: 'Ver fonte', exact: true }).click();
  assert.ok(await page.locator('#source-record').isVisible());
  await go('/app/saude/inexistente/inexistente', '.health-state');
  await capture('S2-empty');
  // Each screen's states are triggered using Cache API fixtures, not public debug routes.
  for (const [name, path] of [['S0', '/app/saude'], ['S1', '/app/saude?lista=1'], ['S2', pathFor('hipertensao')]]) {
    await go(path, '.health-card, [data-screen="S2"]');
    await page.evaluate(() => {
      window.qaOpenCache = caches.open.bind(caches);
      caches.open = async (...args) => { await new Promise(resolve => setTimeout(resolve, 900)); return window.qaOpenCache(...args); };
    });
    await setOffline(true);
    await page.getByText('Buscando informações…', { exact: true }).waitFor();
    await capture(`${name}-loading`);
    await page.getByText('Você está sem internet. Mostrando o conteúdo salvo.').waitFor();
    await capture(`${name}-offline`);
    await page.evaluate(async () => {
      caches.open = window.qaOpenCache;
      const cache = await caches.open('pulso-health-editorial-v1');
      const current = await cache.match('/__health_editorial/catalogue');
      window.qaCatalogue = await current.text();
      await cache.put('/__health_editorial/catalogue', new Response('invalid-json'));
      window.dispatchEvent(new Event('offline'));
    });
    await page.getByRole('button', { name: 'Tentar de novo', exact: true }).waitFor();
    await capture(`${name}-error`);
    await page.evaluate(async () => {
      const cache = await caches.open('pulso-health-editorial-v1');
      await cache.put('/__health_editorial/catalogue', new Response(window.qaCatalogue));
    });
    await page.getByRole('button', { name: 'Tentar de novo', exact: true }).click();
    await page.getByText('Você está sem internet. Mostrando o conteúdo salvo.').waitFor();
    await setOffline(false);
    await page.getByText('Buscando informações…', { exact: true }).waitFor({ state: 'hidden' });
  }
  await go('/app/mapa?condicao=hipertensao', '[data-screen="S4"]');
  await page.getByLabel('Tipo de unidade').selectOption('Hospital');
  await page.getByRole('button', { name: 'Usar minha localização' }).click();
  await page.getByText(/Localização obtida/).waitFor();
  assert.ok(await page.locator('.health-services > li').count() <= 10);
  const distances = await page.locator('.health-services > li').allTextContents();
  metrics.hospitalDistances = distances.map(text => Number(text.match(/([\d,]+) km em linha reta/)[1].replace(',', '.')));
  assert.deepEqual(metrics.hospitalDistances, [...metrics.hospitalDistances].sort((a, b) => a - b));
  await capture('S4-location');
  await go('/app/saude', '.health-card');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  metrics.noHorizontalOverflowAt200 = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  await capture('S0-font-200');
  assert.ok(metrics.noHorizontalOverflowAt200);
  assert.deepEqual(errors, []);
  const snapshotPath = new URL('./health-ui.snap.json', import.meta.url);
  if (process.argv.includes('--update')) writeFileSync(snapshotPath, JSON.stringify(snapshots, null, 2) + '\n');
  else assert.deepEqual(snapshots, JSON.parse(readFileSync(snapshotPath, 'utf8')));
  writeFileSync(new URL('metrics.json', output), JSON.stringify(metrics, null, 2) + '\n');
  console.log(JSON.stringify(metrics, null, 2));
  console.log('PASS snapshots, seis condições, quatro estados por tela e localização simulada.');
} finally { await browser.close(); }
