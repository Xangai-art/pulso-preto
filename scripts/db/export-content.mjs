#!/usr/bin/env node
// ============================================================================
// export-content.mjs — Gera a "base de dados" de conteúdo do Pulso Preto
// ----------------------------------------------------------------------------
// Lê as fontes canônicas em TypeScript (o catálogo em site/src/data/diseases.ts
// e o conteúdo aprofundado em shared/data/*.ts) e materializa:
//
//   1. database/content.json   — representação canônica (JSON) do conteúdo
//   2. database/seed.sql        — schema + dados (SQL idempotente, SQLite/D1)
//   3. .tables/schema.json      — descritor de tabelas para o D1 gerenciado no
//                                 deploy hospedado do Genspark
//
// Depois, verifica o resultado abrindo um banco SQLite em memória (módulo
// nativo node:sqlite), aplicando schema + seed e reconstruindo cada doença —
// comparando o que foi lido do banco com o conteúdo de origem.
//
// Uso:
//   node --experimental-strip-types scripts/db/export-content.mjs
//   (ou: npm run db:export)
// ============================================================================

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DB_DIR = path.join(ROOT, 'database');
const TABLES_DIR = path.join(ROOT, '.tables');

const CATALOG_TS = path.join(ROOT, 'site', 'src', 'data', 'diseases.ts');
const CONTENT_DIR = path.join(ROOT, 'shared', 'data');
const SCHEMA_SQL = path.join(DB_DIR, 'schema.sql');

// Doenças com conteúdo aprofundado (Nível 3) — id → módulo em shared/data.
const DEEP_MODULES = {
  'anemia-falciforme': { file: 'anemiaFalciforme.ts', exportName: 'anemiaFalciformeContent' },
  hipertensao: { file: 'hipertensao.ts', exportName: 'hipertensaoContent' },
  diabetes: { file: 'diabetes.ts', exportName: 'diabetesContent' },
  'miomas-uterinos': { file: 'miomasUterinos.ts', exportName: 'miomasUterinosContent' },
  lupus: { file: 'lupus.ts', exportName: 'lupusContent' },
  depressao: { file: 'depressao.ts', exportName: 'depressaoContent' },
  asma: { file: 'asma.ts', exportName: 'asmaContent' },
};

const LOCALES = ['pt', 'es'];
const AUDIENCES = ['medico', 'enfermeiro', 'usuario'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const sqlStr = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`);
const sqlInt = (v) => (v === true || v === 1 ? '1' : v === false || v === 0 || v === null || v === undefined ? '0' : String(v));

function loadTsModule(absPath) {
  return import(pathToFileURL(absPath).href);
}

// ---------------------------------------------------------------------------
// 1. Carregar fontes
// ---------------------------------------------------------------------------
const catalogMod = await loadTsModule(CATALOG_TS);
const { diseaseCategories } = catalogMod;

// Achata o catálogo em linhas de "diseases".
const diseaseRows = [];
const categoryOf = new Map();
for (const cat of diseaseCategories) {
  for (const d of cat.diseases) {
    categoryOf.set(d.id, cat);
    diseaseRows.push({
      id: d.id,
      name: d.name,
      category_id: cat.id,
      category_title: cat.title,
      is_priority_theme: d.isPriorityTheme ? 1 : 0,
      has_deep_content: d.hasDeepContent ? 1 : 0,
      study: d.study ?? null,
      finding: d.finding ?? null,
      local_value: d.localStudy?.value ?? null,
      local_finding: d.localStudy?.finding ?? null,
      local_source: d.localStudy?.source ?? null,
    });
  }
}

// Carrega o conteúdo aprofundado de cada doença prioritária.
const deep = {}; // id → Record<LocaleId, DiseaseDeepContent>
for (const [id, mod] of Object.entries(DEEP_MODULES)) {
  const m = await loadTsModule(path.join(CONTENT_DIR, mod.file));
  const content = m[mod.exportName];
  if (!content) throw new Error(`Export '${mod.exportName}' não encontrado em ${mod.file}`);
  deep[id] = content;
}

// ---------------------------------------------------------------------------
// 2. Construir statements de INSERT (determinísticos, idempotentes)
// ---------------------------------------------------------------------------
const statements = [];

// 2a. diseases
for (const r of diseaseRows) {
  statements.push(
    `INSERT OR REPLACE INTO diseases (id, name, category_id, category_title, is_priority_theme, has_deep_content, study, finding, local_value, local_finding, local_source) VALUES (` +
      `${sqlStr(r.id)}, ${sqlStr(r.name)}, ${sqlStr(r.category_id)}, ${sqlStr(r.category_title)}, ` +
      `${sqlInt(r.is_priority_theme)}, ${sqlInt(r.has_deep_content)}, ${sqlStr(r.study)}, ${sqlStr(r.finding)}, ` +
      `${sqlStr(r.local_value)}, ${sqlStr(r.local_finding)}, ${sqlStr(r.local_source)});`
  );
}

// 2b. conteúdo aprofundado — ids determinísticos por (disease, locale, audience)
let contentSeq = 0;
let sectionSeq = 0;
let paragraphSeq = 0;
let sourceSeq = 0;

for (const id of Object.keys(DEEP_MODULES)) {
  const byLocale = deep[id];
  for (const localeId of LOCALES) {
    const content = byLocale[localeId];
    if (!content) throw new Error(`Locale '${localeId}' ausente em ${id}`);
    const hero = content.heroImage;

    for (const audience of AUDIENCES) {
      const aud = content.audiences[audience];
      if (!aud) throw new Error(`Audiência '${audience}' ausente em ${id}/${localeId}`);
      const contentId = ++contentSeq;
      statements.push(
        `INSERT OR REPLACE INTO disease_content (id, disease_id, locale_id, audience, summary, hero_image_url, hero_image_alt, hero_image_credit, hero_is_placeholder) VALUES (` +
          `${contentId}, ${sqlStr(id)}, ${sqlStr(localeId)}, ${sqlStr(audience)}, ${sqlStr(aud.summary)}, ` +
          `${sqlStr(hero?.url)}, ${sqlStr(hero?.alt)}, ${sqlStr(hero?.credit)}, ${sqlInt(hero?.isPlaceholder)});`
      );

      aud.sections.forEach((section, sIdx) => {
        const sectionId = ++sectionSeq;
        statements.push(
          `INSERT OR REPLACE INTO disease_sections (id, content_id, position, heading) VALUES (` +
            `${sectionId}, ${contentId}, ${sIdx}, ${sqlStr(section.heading)});`
        );
        section.body.forEach((paragraph, pIdx) => {
          const paragraphId = ++paragraphSeq;
          statements.push(
            `INSERT OR REPLACE INTO disease_paragraphs (id, section_id, position, body) VALUES (` +
              `${paragraphId}, ${sectionId}, ${pIdx}, ${sqlStr(paragraph)});`
          );
        });
      });
    }

    (content.sources || []).forEach((source, idx) => {
      const sourceId = ++sourceSeq;
      statements.push(
        `INSERT OR REPLACE INTO disease_sources (id, disease_id, locale_id, position, label, detail) VALUES (` +
          `${sourceId}, ${sqlStr(id)}, ${sqlStr(localeId)}, ${idx}, ${sqlStr(source.label)}, ${sqlStr(source.detail)});`
      );
    });
  }
}

// ---------------------------------------------------------------------------
// 3. Escrever artefatos
// ---------------------------------------------------------------------------
mkdirSync(DB_DIR, { recursive: true });
mkdirSync(TABLES_DIR, { recursive: true });

const schemaSql = readFileSync(SCHEMA_SQL, 'utf8');

// 3a. content.json — representação canônica
const canonical = {
  generated_by: 'scripts/db/export-content.mjs',
  source: 'shared/data/*.ts + site/src/data/diseases.ts',
  locales: LOCALES,
  audiences: AUDIENCES,
  priority_diseases: Object.keys(DEEP_MODULES),
  diseases: diseaseRows,
  deepContent: deep,
};
writeFileSync(path.join(DB_DIR, 'content.json'), JSON.stringify(canonical, null, 2) + '\n');

// 3b. seed.sql — schema + dados (idempotente)
const seedHeader =
  `-- Pulso Preto — seed de conteúdo (GERADO AUTOMATICAMENTE — não editar à mão)\n` +
  `-- Gerado por scripts/db/export-content.mjs\n` +
  `-- Idempotente: CREATE ... IF NOT EXISTS + INSERT OR REPLACE.\n\n`;
writeFileSync(
  path.join(DB_DIR, 'seed.sql'),
  seedHeader + schemaSql.trimEnd() + '\n\n-- ===== DADOS =====\n\n' + statements.join('\n') + '\n'
);

// 3c. .tables/schema.json — descritor de tabelas para o D1 gerenciado (hospedado)
const schemaJson = {
  version: 1,
  engine: 'sqlite',
  name: 'pulso-preto-content',
  comment:
    'Provisiona o único banco D1 gerenciado do worker no deploy hospedado do Genspark. ' +
    'Derivado de database/schema.sql (fonte da verdade).',
  tables: [
    {
      name: 'diseases',
      primary_key: 'id',
      columns: [
        { name: 'id', type: 'TEXT', primary_key: true, not_null: true },
        { name: 'name', type: 'TEXT', not_null: true },
        { name: 'category_id', type: 'TEXT', not_null: true },
        { name: 'category_title', type: 'TEXT', not_null: true },
        { name: 'is_priority_theme', type: 'INTEGER', not_null: true, default: 0 },
        { name: 'has_deep_content', type: 'INTEGER', not_null: true, default: 0 },
        { name: 'study', type: 'TEXT' },
        { name: 'finding', type: 'TEXT' },
        { name: 'local_value', type: 'TEXT' },
        { name: 'local_finding', type: 'TEXT' },
        { name: 'local_source', type: 'TEXT' },
        { name: 'updated_at', type: 'TEXT', not_null: true, default: "datetime('now')" },
      ],
      indexes: [{ name: 'idx_diseases_priority', columns: ['is_priority_theme', 'has_deep_content'] }],
    },
    {
      name: 'disease_content',
      primary_key: 'id',
      columns: [
        { name: 'id', type: 'INTEGER', primary_key: true },
        { name: 'disease_id', type: 'TEXT', not_null: true, references: 'diseases(id)' },
        { name: 'locale_id', type: 'TEXT', not_null: true, check: "locale_id IN ('pt','es')" },
        { name: 'audience', type: 'TEXT', not_null: true, check: "audience IN ('medico','enfermeiro','usuario')" },
        { name: 'summary', type: 'TEXT', not_null: true },
        { name: 'hero_image_url', type: 'TEXT' },
        { name: 'hero_image_alt', type: 'TEXT' },
        { name: 'hero_image_credit', type: 'TEXT' },
        { name: 'hero_is_placeholder', type: 'INTEGER', not_null: true, default: 1 },
      ],
      unique: [['disease_id', 'locale_id', 'audience']],
      indexes: [{ name: 'idx_content_disease_locale', columns: ['disease_id', 'locale_id'] }],
    },
    {
      name: 'disease_sections',
      primary_key: 'id',
      columns: [
        { name: 'id', type: 'INTEGER', primary_key: true },
        { name: 'content_id', type: 'INTEGER', not_null: true, references: 'disease_content(id)' },
        { name: 'position', type: 'INTEGER', not_null: true },
        { name: 'heading', type: 'TEXT', not_null: true },
      ],
      unique: [['content_id', 'position']],
      indexes: [{ name: 'idx_sections_content', columns: ['content_id', 'position'] }],
    },
    {
      name: 'disease_paragraphs',
      primary_key: 'id',
      columns: [
        { name: 'id', type: 'INTEGER', primary_key: true },
        { name: 'section_id', type: 'INTEGER', not_null: true, references: 'disease_sections(id)' },
        { name: 'position', type: 'INTEGER', not_null: true },
        { name: 'body', type: 'TEXT', not_null: true },
      ],
      unique: [['section_id', 'position']],
      indexes: [{ name: 'idx_paragraphs_section', columns: ['section_id', 'position'] }],
    },
    {
      name: 'disease_sources',
      primary_key: 'id',
      columns: [
        { name: 'id', type: 'INTEGER', primary_key: true },
        { name: 'disease_id', type: 'TEXT', not_null: true, references: 'diseases(id)' },
        { name: 'locale_id', type: 'TEXT', not_null: true, check: "locale_id IN ('pt','es')" },
        { name: 'position', type: 'INTEGER', not_null: true },
        { name: 'label', type: 'TEXT', not_null: true },
        { name: 'detail', type: 'TEXT', not_null: true },
      ],
      unique: [['disease_id', 'locale_id', 'position']],
      indexes: [{ name: 'idx_sources_disease_locale', columns: ['disease_id', 'locale_id', 'position'] }],
    },
  ],
};
writeFileSync(path.join(TABLES_DIR, 'schema.json'), JSON.stringify(schemaJson, null, 2) + '\n');

// ---------------------------------------------------------------------------
// 4. Verificação com SQLite real (node:sqlite, em memória)
// ---------------------------------------------------------------------------
const db = new DatabaseSync(':memory:');
db.exec('PRAGMA foreign_keys = ON;');
db.exec(schemaSql);
for (const stmt of statements) db.exec(stmt);

function reconstruct(diseaseId, localeId) {
  const rows = db
    .prepare('SELECT id, audience, summary, hero_image_url, hero_image_alt, hero_image_credit, hero_is_placeholder FROM disease_content WHERE disease_id = ? AND locale_id = ?')
    .all(diseaseId, localeId);
  if (rows.length === 0) return null;
  const audiences = {};
  for (const aud of AUDIENCES) {
    const row = rows.find((r) => r.audience === aud);
    const sections = db
      .prepare('SELECT id, heading FROM disease_sections WHERE content_id = ? ORDER BY position')
      .all(row.id)
      .map((s) => ({
        heading: s.heading,
        body: db
          .prepare('SELECT body FROM disease_paragraphs WHERE section_id = ? ORDER BY position')
          .all(s.id)
          .map((p) => p.body),
      }));
    audiences[aud] = { summary: row.summary, sections };
  }
  const first = rows[0];
  const sources = db
    .prepare('SELECT label, detail FROM disease_sources WHERE disease_id = ? AND locale_id = ? ORDER BY position')
    .all(diseaseId, localeId);
  return {
    heroImage: {
      url: first.hero_image_url,
      alt: first.hero_image_alt,
      credit: first.hero_image_credit,
      isPlaceholder: !!first.hero_is_placeholder,
    },
    audiences,
    sources,
  };
}

let failures = 0;
for (const id of Object.keys(DEEP_MODULES)) {
  for (const localeId of LOCALES) {
    const expected = deep[id][localeId];
    const got = reconstruct(id, localeId);
    const ok = JSON.stringify(got) === JSON.stringify(expected);
    if (!ok) {
      failures++;
      console.error(`  ✗ divergência em ${id}/${localeId}`);
    }
  }
}

const counts = {
  diseases: db.prepare('SELECT COUNT(*) c FROM diseases').get().c,
  disease_content: db.prepare('SELECT COUNT(*) c FROM disease_content').get().c,
  disease_sections: db.prepare('SELECT COUNT(*) c FROM disease_sections').get().c,
  disease_paragraphs: db.prepare('SELECT COUNT(*) c FROM disease_paragraphs').get().c,
  disease_sources: db.prepare('SELECT COUNT(*) c FROM disease_sources').get().c,
};

console.log('Pulso Preto — export de conteúdo');
console.log('  artefatos:');
console.log('    database/content.json');
console.log('    database/seed.sql');
console.log('    .tables/schema.json');
console.log('  tabelas (SQLite verificado):');
for (const [k, v] of Object.entries(counts)) console.log(`    ${k}: ${v}`);
console.log(`  doenças aprofundadas: ${Object.keys(DEEP_MODULES).length} × ${LOCALES.length} idiomas × ${AUDIENCES.length} audiências`);
console.log(failures === 0 ? '  verificação: OK (banco == fonte)' : `  verificação: ${failures} FALHA(S)`);

if (failures > 0) process.exit(1);
