-- ============================================================================
-- Pulso Preto — Base de Conteúdo (Canon de Conteúdo Aprofundado)
-- ----------------------------------------------------------------------------
-- Schema canônico (SQLite / Cloudflare D1) que materializa o "Nível 3 —
-- Aprofundado" da Estratégia de Conteúdo (EXECUTIVE_SUMMARY_CONTENT_STRATEGY.md):
-- as doenças prioritárias com conteúdo segmentado por audiência (médico /
-- enfermeiro / usuário), bilíngue PT/ES, com fontes e imagem de destaque.
--
-- Este arquivo é a fonte da verdade do esquema. Ele é:
--   1. aplicado localmente (verificado com sqlite3 real) pelo script
--      scripts/db/export-content.mjs;
--   2. espelhado em .tables/schema.json, que provisiona o banco D1 gerenciado
--      no deploy hospedado do Genspark (um único D1 por worker);
--   3. distribuído junto do conteúdo gerado (database/seed.sql).
--
-- Modelo relacional normalizado: uma linha por (doença, idioma, audiência,
-- seção) / parágrafo — de modo que a busca e a filtragem por audiência/idioma
-- sejam consultas triviais, sem JSON opaco no caminho crítico.
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------------
-- diseases — catálogo das condições (Nível 1/2/3)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS diseases (
  id               TEXT PRIMARY KEY,          -- = Disease.id em diseases.ts (ex.: 'hipertensao')
  name             TEXT NOT NULL,             -- nome PT (canônico)
  category_id      TEXT NOT NULL,             -- = DiseaseCategory.id (ex.: 'cardiovasculares')
  category_title   TEXT NOT NULL,
  is_priority_theme INTEGER NOT NULL DEFAULT 0 CHECK (is_priority_theme IN (0,1)),
  has_deep_content INTEGER NOT NULL DEFAULT 0 CHECK (has_deep_content IN (0,1)),
  study            TEXT,
  finding          TEXT,
  local_value      TEXT,                       -- localStudy.value (DF)
  local_finding    TEXT,                       -- localStudy.finding (DF)
  local_source     TEXT,                       -- localStudy.source (DF)
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ---------------------------------------------------------------------------
-- disease_content — conteúdo aprofundado por (doença, idioma, audiência)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS disease_content (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  disease_id     TEXT NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  locale_id      TEXT NOT NULL CHECK (locale_id IN ('pt','es')),
  audience       TEXT NOT NULL CHECK (audience IN ('medico','enfermeiro','usuario')),
  summary        TEXT NOT NULL,
  hero_image_url TEXT,
  hero_image_alt TEXT,
  hero_image_credit TEXT,
  hero_is_placeholder INTEGER NOT NULL DEFAULT 1 CHECK (hero_is_placeholder IN (0,1)),
  UNIQUE (disease_id, locale_id, audience)
);

-- ---------------------------------------------------------------------------
-- disease_sections — seções (com ordem) de cada audiência/idioma
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS disease_sections (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id        INTEGER NOT NULL REFERENCES disease_content(id) ON DELETE CASCADE,
  position          INTEGER NOT NULL,
  heading           TEXT NOT NULL,
  UNIQUE (content_id, position)
);

-- ---------------------------------------------------------------------------
-- disease_paragraphs — parágrafos (com ordem) de cada seção
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS disease_paragraphs (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id   INTEGER NOT NULL REFERENCES disease_sections(id) ON DELETE CASCADE,
  position     INTEGER NOT NULL,
  body         TEXT NOT NULL,
  UNIQUE (section_id, position)
);

-- ---------------------------------------------------------------------------
-- disease_sources — fontes científicas por (doença, idioma)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS disease_sources (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  disease_id TEXT NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  locale_id  TEXT NOT NULL CHECK (locale_id IN ('pt','es')),
  position   INTEGER NOT NULL,
  label      TEXT NOT NULL,
  detail     TEXT NOT NULL,
  UNIQUE (disease_id, locale_id, position)
);

-- ---------------------------------------------------------------------------
-- Índices para os acessos do worker /api/content
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_content_disease_locale   ON disease_content (disease_id, locale_id);
CREATE INDEX IF NOT EXISTS idx_sections_content         ON disease_sections (content_id, position);
CREATE INDEX IF NOT EXISTS idx_paragraphs_section       ON disease_paragraphs (section_id, position);
CREATE INDEX IF NOT EXISTS idx_sources_disease_locale   ON disease_sources (disease_id, locale_id, position);
CREATE INDEX IF NOT EXISTS idx_diseases_priority        ON diseases (is_priority_theme, has_deep_content);
