// Worker do Pulso Preto — serve os assets estáticos combinados (Site Institucional
// na raiz + App Sentinela em /app/) e expõe a API de conteúdo (/api/content/*)
// que lê da base de dados (Cloudflare D1) quando disponível, com fallback
// automático para o conteúdo estático embutido (dist/api/content.json) — de modo
// que a aplicação nunca quebra, mesmo sem banco provisionado.
//
// Base de dados: ver database/schema.sql (esquema canônico) e
// .tables/schema.json (descritor que provisiona o D1 gerenciado no deploy
// hospedado). O conteúdo é gerado por scripts/db/export-content.mjs a partir das
// fontes canônicas em shared/data/*.ts.

const API_PREFIX = '/api/';
const CONTENT_JSON_PATH = '/api/content.json';

// Localiza o binding D1 no env, independentemente do nome (DB, D1, ...).
// O pipeline workers-for-platform nomeia o binding de forma própria; detectar
// pela forma (objeto com .prepare) evita acoplamento ao nome.
function findD1(env) {
  if (!env) return null;
  if (env.DB && typeof env.DB.prepare === 'function') return env.DB;
  for (const value of Object.values(env)) {
    if (value && typeof value === 'object' && typeof value.prepare === 'function') {
      return value;
    }
  }
  return null;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
      'access-control-allow-origin': '*',
    },
  });
}

// Carrega o conteúdo estático embutido (fallback universal).
async function loadStaticContent(env, requestUrl) {
  const url = new URL(CONTENT_JSON_PATH, requestUrl.origin);
  const res = await env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }));
  if (res.status !== 200) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// Reconstrói o DiseaseDeepContent de uma doença/idioma a partir do D1.
async function loadContentFromD1(db, diseaseId, localeId) {
  const rows = await db
    .prepare(
      'SELECT id, audience, summary, hero_image_url, hero_image_alt, hero_image_credit, hero_is_placeholder ' +
        'FROM disease_content WHERE disease_id = ? AND locale_id = ?'
    )
    .bind(diseaseId, localeId)
    .all();
  const list = rows?.results ?? [];
  if (list.length === 0) return null;

  const audiences = {};
  for (const audience of ['medico', 'enfermeiro', 'usuario']) {
    const row = list.find((r) => r.audience === audience);
    if (!row) continue;
    const secRows = await db
      .prepare('SELECT id, heading FROM disease_sections WHERE content_id = ? ORDER BY position')
      .bind(row.id)
      .all();
    const sections = [];
    for (const s of secRows?.results ?? []) {
      const pRows = await db
        .prepare('SELECT body FROM disease_paragraphs WHERE section_id = ? ORDER BY position')
        .bind(s.id)
        .all();
      sections.push({ heading: s.heading, body: (pRows?.results ?? []).map((p) => p.body) });
    }
    audiences[audience] = { summary: row.summary, sections };
  }

  const srcRows = await db
    .prepare('SELECT label, detail FROM disease_sources WHERE disease_id = ? AND locale_id = ? ORDER BY position')
    .bind(diseaseId, localeId)
    .all();

  const first = list[0];
  return {
    heroImage: {
      url: first.hero_image_url,
      alt: first.hero_image_alt,
      credit: first.hero_image_credit,
      isPlaceholder: !!first.hero_is_placeholder,
    },
    audiences,
    sources: (srcRows?.results ?? []).map((s) => ({ label: s.label, detail: s.detail })),
  };
}

async function handleApi(request, env, url) {
  const db = findD1(env);

  // GET /api/health — status do banco e do conteúdo.
  if (url.pathname === '/api/health') {
    let dbOk = false;
    if (db) {
      try {
        await db.prepare('SELECT 1').all();
        dbOk = true;
      } catch {
        dbOk = false;
      }
    }
    return jsonResponse({ status: 'ok', database: dbOk ? 'd1' : 'static-fallback' });
  }

  // GET /api/content — catálogo (doenças + marcadores).
  if (url.pathname === '/api/content') {
    if (db) {
      try {
        const rows = await db
          .prepare('SELECT id, name, category_id, category_title, is_priority_theme, has_deep_content FROM diseases ORDER BY category_title, name')
          .all();
        if (rows?.results?.length) {
          return jsonResponse({ source: 'd1', diseases: rows.results });
        }
      } catch {
        /* cai para o estático */
      }
    }
    const staticContent = await loadStaticContent(env, url);
    if (staticContent) {
      return jsonResponse({ source: 'static', diseases: staticContent.diseases ?? [] });
    }
    return jsonResponse({ error: 'conteúdo indisponível' }, 503);
  }

  // GET /api/content/:diseaseId?locale=pt — conteúdo aprofundado.
  if (url.pathname.startsWith('/api/content/')) {
    const diseaseId = decodeURIComponent(url.pathname.slice('/api/content/'.length));
    const localeId = url.searchParams.get('locale') === 'es' ? 'es' : 'pt';

    if (db) {
      try {
        const content = await loadContentFromD1(db, diseaseId, localeId);
        if (content) return jsonResponse({ source: 'd1', diseaseId, localeId, content });
      } catch {
        /* cai para o estático */
      }
    }

    const staticContent = await loadStaticContent(env, url);
    const content = staticContent?.deepContent?.[diseaseId]?.[localeId];
    if (content) {
      return jsonResponse({ source: 'static', diseaseId, localeId, content });
    }
    return jsonResponse({ error: 'conteúdo não encontrado', diseaseId, localeId }, 404);
  }

  return jsonResponse({ error: 'rota de API desconhecida' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 0) API de conteúdo — tratada antes do fallback de SPA (nunca devolve HTML).
    if (url.pathname === API_PREFIX.slice(0, -1) || url.pathname.startsWith(API_PREFIX)) {
      try {
        return await handleApi(request, env, url);
      } catch (err) {
        return jsonResponse({ error: 'erro interno', detail: String(err && err.message ? err.message : err) }, 500);
      }
    }

    // 1) Tenta servir o asset exatamente como pedido (JS, CSS, favicon, etc.)
    let response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }

    // 2) Fallback de SPA por prefixo de rota.
    const isAppRoute = url.pathname === '/app' || url.pathname.startsWith('/app/');
    const fallbackPath = isAppRoute ? '/app/index.html' : '/index.html';
    const fallbackUrl = new URL(fallbackPath, url.origin);

    response = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    return response;
  },
};
