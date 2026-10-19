# MAPEAMENTO_ARQUITETURA
## Módulos master × versões (GP0 · PP1 · PP2) — foco em conteúdo

**Projeto:** Pulso Preto (ex-Gente Preta)
**Finalidade:** inventariar todos os **módulos master** da plataforma e mostrar, de forma rastreável, **como cada um foi aproveitado em cada versão** — se de forma *original* (intacta) ou *com variante* (adaptada). O foco é **conteúdo**, não pixels.
**Método:** leitura direta do código-fonte em `site/`, `app/`, `shared/`, `worker/`, `database/` e `docs/`, cruzada com o acervo do Hub (`PROJ NEGROS - IDEIAS ABA SITE.pdf`, `ANEXO 2`, etc.). Nenhum número aqui é estimado: todos foram contados nos arquivos.
**Status:** documento de **diagnóstico + registro de decisões** da sessão de requisitos do PP3. Não implementa nada — serve de base para decidirmos, caso a caso, o que popula o site e o app.
**Atualização (19/10/2026):** registro de **implementação** na **Parte 8** (o que já saiu do papel, lote a lote) e decisão sobre siglas (D14-a).
**Atualização (15/10/2026):** decisões de direção na **Parte 5.2**, mitigações na **Parte 5.4**, decisões de navegação (menu superior/inferior) na **Parte 5.5**, decisões dos **Áudios 2/3/4** (formato interno, rótulos e ativos) na **Parte 5.6**; lista de pendências em aberto na **Parte 6**.

> **Convenção de leitura.** "Versão" tem, neste projeto, **três significados empilhados**. Antes de mapear módulos, é obrigatório separá-los (Parte 0) — senão a própria pergunta "o que mudou entre GP0/PP1/PP2" fica ambígua.

> **Rito de trabalho (acordado).** Trabalhamos **um áudio por vez**, devagar ("com o andor que o santo é de barro"). Para cada áudio: (1) **checar exatamente qual versão** está sendo avaliada (GP0/PP1/PP2 — e qual camada, ver Parte 0); (2) **pedir esclarecimento** sobre qualquer referência citada que **não exista no Hub**; (3) só então registrar a decisão. Nenhuma implementação sem validação crítica.

---

## PARTE 0 — As três camadas de "versão" (e por que confundem)

O repositório implementa a arquitetura **CEOS** (Content & Experience Operating System), em que a identidade é fatiada em camadas independentes. "Versão" pode significar qualquer uma destas três coisas:

| Camada | Arquivo (fonte única) | O que versiona | Valores existentes |
|---|---|---|---|
| **X — Canon (QUEM somos)** | `shared/data/brand-canon.ts` | Nome, subtítulo, tagline, paleta, URLs | `gente-preta-v1`, `pulso-preto-v1`, `vintage-future-01`, `vintage-future-02` |
| **VARIANTS — Apresentação (COMO aparecemos)** | `shared/data/variants.ts` | Hero, CTA, tema de faixa/rodapé, seção de notícias | `gp0`, `pp1`, `pp2` (`DEFAULT_VARIANT = 'pp1'`) |
| **LOCALES — Idioma (EM QUE LÍNGUA falamos)** | `shared/data/locales.ts` | Dicionário de interface (botões, rótulos, microcopy) | `pt`, `es` |
| **Conteúdo editorial** | `shared/data/variantContent.ts` + `site/src/data/*` | Copy completa, imagens, cartões | por variante × idioma |

**Ponto-chave:** as 3 "versões" que o usuário cita (GP0/PP1/PP2) são **VARIANTES** — uma camada de *apresentação*. O **Canon** por baixo tem apenas **2 identidades de produção**: `gente-preta-v1` (GP0) e `pulso-preto-v1` (PP1 e PP2). Ou seja:

```
gp0  → Canon gente-preta-v1   (identidade histórica, "Gente Preta")
pp1  → Canon pulso-preto-v1   (identidade "Pulso Preto", tratamento "Família")
pp2  → Canon pulso-preto-v1   (identidade "Pulso Preto", tratamento "Mulher")
```

`CURRENT_BRAND_VERSION = 'pulso-preto-v1'`. O Canon é **imutável por regra** (`shared/README.md`: "NUNCA editar versões antigas") — a memória histórica é preservada por design.

### 0.1 Ficha técnica das 3 variantes

| Atributo | **GP0** | **PP1** | **PP2** |
|---|---|---|---|
| Rótulo | "GP0" | "PP1" | "PP2" |
| Canon | `gente-preta-v1` | `pulso-preto-v1` | `pulso-preto-v1` |
| Tratamento de hero | `slideshow` (HeroSlideshow) | `family-photo` (família negra) | `woman-photo` (retrato de mulher negra) |
| CTA primário | `home.cta.primary.original` → "Baixar o App Sentinela" | `home.cta.primary.pp1` → "Cuide-se" | `home.cta.primary.pp2` → "Acesse serviços SUS" |
| CTA secundário | "Explorar Biblioteca de Saúde" | "Explorar Biblioteca de Saúde" | "Baixar o App Sentinela" |
| Tema da faixa de missão | `emerald-split` | `emerald-split` | `terracotta-band` |
| Tema do rodapé | `dark-green` | `dark-green` | `cream` |
| Seção "Últimas Notícias" na Home | `false` | `false` | **`true`** |
| Usa `variantContent.ts`? | **Não** | **Sim** | **Sim** |
| Home | Própria (seções originais) | `PulsoHome` | `PulsoHome` |
| Header/Footer | `GenteHeader`/`GenteFooter` | `PulsoHeader`/`Pp1Footer` | `PulsoHeader`/`Pp2Footer` |

**Observação crítica nº 1:** o *Canon* só distingue 2 identidades; as variantes distinguem 3 apresentações. Isso significa que **GP0 é a única variante com identidade de marca diferente** — PP1 e PP2 são a *mesma* marca (Pulso Preto) em dois tratamentos visuais. A pergunta "o que difere PP1 de PP2" é, portanto, majoritariamente **de apresentação**, e só secundariamente de conteúdo (ver Parte 3.4).

---

## PARTE 1 — Inventário dos módulos master

Um **módulo master** é um bloco funcional da plataforma, com uma responsabilidade clara e uma fonte de conteúdo própria. O monorepo tem **22 módulos master**, distribuídos em 5 superfícies:

```
/home/user/webapp
├── site/       → SITE INSTITUCIONAL (React 19 + Vite + TS + Tailwind) — 14 páginas + 4 redirects
├── app/        → APP SENTINELA (React + Zustand) — 11 telas
├── shared/     → CAMADA CANÔNICA CEOS (Canon + Variants + Locales + VariantContent + 7 deep-content)
├── worker/     → WORKER/API (Cloudflare Worker: assets estáticos + /api/*)
└── database/   → DADOS (schema.sql, content.json, seed.sql) — 5 tabelas D1
```

### 1.1 Módulos do SITE (`site/src/`)

| # | Módulo master | Rota(s) | Fonte de conteúdo | Observação |
|---|---|---|---|---|
| M1 | **Home** | `/` | `pages/Home.tsx` + `variantContent.ts` (PP1/PP2) + `heroSlides.ts` + `project.ts` + `diseases.ts` | **Composição bifurcada**: GP0 tem seções próprias; PP1/PP2 renderizam `PulsoHome` |
| M2 | **Header / Navegação** | (global) | `components/Header.tsx` + `variantContent.ts` | `GenteHeader` (GP0) vs `PulsoHeader` (PP1/PP2) |
| M3 | **Footer** | (global) | `components/Footer.tsx` + `variantContent.ts` | `GenteFooter` vs `Pp1Footer` vs `Pp2Footer` |
| M4 | **Biblioteca de Saúde** | `/saude` | `data/diseases.ts` (10 categorias · 47 condições) | Catálogo "Estudo + Achado" |
| M5 | **Detalhe de Doença** | `/saude/:cat/:disease` | `diseases.ts` + `deepContentRegistry.ts` + `shared/data/*.ts` | Abas por audiência quando há deep content |
| M6 | **Rede SUS** | `/rede-sus` | `data/project.ts` (7 regiões, 11 hospitais, 13 UPAs, 18 CEPAV) | Navegação territorial do DF |
| M7 | **Ensaios Clínicos** | `/ensaios-clinicos` | `data/ensaiosClinicosContent.ts` (do pacote v4.2) | Módulo "ressuscitado" (era aba nº 3 original) |
| M8 | **Memória e Herança** | `/memoria` | `pages/Memory.tsx` (histórias inline) | Corresponde à aba original nº 9 |
| M9 | **Comunidade** | `/comunidade` | `pages/Community.tsx` + `project.ts` (partners) | Aba original nº 8 |
| M10 | **Notícias** | `/noticias` | `data/news.ts` (8 itens) | Página dedicada (resolve link do menu) |
| M11 | **Transparência e Governança** | `/transparencia` | `data/project.ts` (governance, LGPD, domínios) | Aba "Direito à saúde" reconciliada |
| M12 | **Arquitetura (relatório)** | `/arquitetura` | `content/arquitetura.md` (cópia do V4) | Relatório V4 renderizado no site |
| M13 | **Medicina Tradicional Brasileira** | `/medicina-tradicional-brasileira` | `data/traditionalMedicine.ts` (3 plantas) | Extensão da lição "Generational Health" |
| M14 | **Baixar App / Acesso** | `/baixar`, `/acessar-app` | `data/baixarAppContent.ts` (pacote v4.2) | Página de captação de acesso antecipado |
| M15 | **Sobre** | `/sobre` | `pages/About.tsx` + `project.ts` (roadmap, parceiros) | Institucional |
| M16 | **404** | `*` | `pages/NotFound.tsx` | Fallback |

### 1.2 Módulos do APP SENTINELA (`app/src/`)

| # | Módulo master | Rota | Fonte de conteúdo | Observação |
|---|---|---|---|---|
| M17 | **Onboarding** | `/bem-vindo`, `/consentimento`, `/linha-de-base` | `pages/Welcome|Consent|Baseline.tsx` + `project.ts` | Consentimento LGPD 4 níveis + baseline |
| M18 | **Home do App** | `/` | `pages/Home.tsx` + `variantContent.ts` (seminar) | Propaga tema PP1/PP2 |
| M19 | **Check-in longitudinal** | `/checkin` | `pages/CheckIn.tsx` | Sinais + perguntas rotativas |
| M20 | **Radar comunitário** | `/radar` | `pages/Radar.tsx` (sinais ilustrativos) | Reposicionado como opt-in/transparente |
| M21 | **Relato de discriminação** | `/relato-discriminacao` | `pages/ReportDiscrimination.tsx` | Aba "Direito à saúde" no app |
| M22 | **Perfil / Mapa UBS / Biblioteca** | `/perfil`, `/mapa`, `/saude` | `pages/Profile|MapUbs|HealthLibrary|DiseaseDetail.tsx` | Reaproveita `project.ts` e `diseases.ts` do site |

### 1.3 Módulos de PLATAFORMA (não-visuais)

| # | Módulo master | Fonte | Papel |
|---|---|---|---|
| P1 | **Canon de marca** | `shared/data/brand-canon.ts` | Fonte única de nome/tagline/URLs |
| P2 | **Variantes** | `shared/data/variants.ts` | Metadados de apresentação |
| P3 | **Locales (i18n)** | `shared/data/locales.ts` | PT/ES |
| P4 | **VariantContent** | `shared/data/variantContent.ts` | Copy editorial de PP1/PP2 (PT/ES) |
| P5 | **Deep content clínico** | `shared/data/{7 arquivos}.ts` | Conteúdo por audiência (PT/ES) |
| P6 | **AppearanceContext** | `shared/context/AppearanceContext.tsx` | Troca de variante/idioma em runtime (localStorage) |
| P7 | **Project adapter** | `shared/data/project-adapter.ts` | Ponte Canon ↔ código legado |
| P8 | **Worker / API** | `worker/index.js` | Assets + `/api/health`, `/api/content`, `/api/content/:id` |
| P9 | **Database (D1)** | `database/schema.sql`, `content.json`, `seed.sql` | 5 tabelas; export via `scripts/db/export-content.mjs` |

**Total:** 16 módulos de site + 6 de app + 9 de plataforma = **31 blocos** (22 visuais + 9 de plataforma).

---

## PARTE 2 — Matriz master: como cada módulo foi aproveitado em cada versão

Legenda da coluna "Aproveitamento":
- **`ORIGINAL`** — o módulo existe igual nas 3 versões (conteúdo único, sem ramificação).
- **`VARIANTE`** — o módulo ramifica por variante (conteúdo/apresentação diferente por GP0/PP1/PP2).
- **`EXCLUSIVO`** — o módulo só aparece em uma variante.
- **`DORMENTE`** — o módulo existe no código mas não é renderizado/linkado em nenhuma variante.

### 2.1 Módulos de SITE

| Módulo | GP0 | PP1 | PP2 | Aproveitamento | Evidência |
|---|---|---|---|---|---|
| **M1 Home** | Seções originais (hero slideshow, ticker, "Folhas com Ciência" fitoterapia, problema×solução, rodas, 7 temas, temas emergentes, parceiros) | `PulsoHome` (hero família, 6 features, 6 temas, stats, missão, seminário) | `PulsoHome` (hero mulher, idem + bloco de notícias) | **VARIANTE** | `Home.tsx:39` (`if variantId==='pp1'||'pp2'`) |
| **M2 Header** | `GenteHeader` — nav: Início, Biblioteca, Rede SUS, dropdown *Saberes* + dropdown *Instituição* | `PulsoHeader` — nav plano de 6 itens (Início, Sobre, Temas, Dados, Notícias, Fale Conosco) | `PulsoHeader` (mesmo de PP1) | **VARIANTE** | `Header.tsx:44` |
| **M3 Footer** | `GenteFooter` — 4 colunas | `Pp1Footer` — 3 colunas + newsletter (verde-escuro) | `Pp2Footer` — topo + barra inferior com citação (creme) | **VARIANTE** | `Footer.tsx:19` |
| **M4 Biblioteca** | 10 categorias · 47 condições | idem | idem | **ORIGINAL** | `diseases.ts` (compartilhado) |
| **M5 Detalhe de Doença** | Estudo+Achado + abas (7 deep) | idem | idem | **ORIGINAL** | `DiseaseDetail.tsx` |
| **M6 Rede SUS** | 7 regiões + 11 hospitais + 13 UPAs + 18 CEPAV | idem | idem | **ORIGINAL** | `project.ts` |
| **M7 Ensaios Clínicos** | Completa | idem | idem | **ORIGINAL** | `ensaiosClinicosContent.ts` |
| **M8 Memória** | Completa (histórias placeholder) | idem | idem | **ORIGINAL** | `Memory.tsx` |
| **M9 Comunidade** | Completa (rodas + parceiros + seminário) | idem | idem | **ORIGINAL** | `Community.tsx` |
| **M10 Notícias** | 8 itens (`news.ts`) | idem | + 3 cartões de notícia na Home (`variantContent.news`) | **VARIANTE (parcial)** | `news.ts` vs `variantContent.ts` |
| **M11 Transparência** | Completa (governança, LGPD, domínios) | idem | idem | **ORIGINAL** | `Transparency.tsx` |
| **M12 Arquitetura** | Relatório V4 | idem | idem | **ORIGINAL** | `content/arquitetura.md` |
| **M13 Medicina Tradicional** | 3 plantas + glossário + livro | idem | idem | **ORIGINAL** | `traditionalMedicine.ts` |
| **M14 Baixar/Acesso** | Pacote v4.2 | idem | idem | **ORIGINAL** | `baixarAppContent.ts` |
| **M15 Sobre** | Completa | idem | idem | **ORIGINAL** | `About.tsx` |
| **M16 404** | Fallback | idem | idem | **ORIGINAL** | `NotFound.tsx` |

### 2.2 Módulos de APP

O app **não bifurca a Home como o site**: ele mantém **uma única árvore de telas** e aplica o tema Pulso Preto (verde/dourado) condicionalmente via `isPulso = variantId==='pp1'||'pp2'`. Ou seja, o app é **menos "variante"** que o site — muda cor/casca, não estrutura de conteúdo.

| Módulo | GP0 | PP1 | PP2 | Aproveitamento | Evidência |
|---|---|---|---|---|---|
| **M17 Onboarding** | Padrão | tema Pulso | tema Pulso | **VARIANTE (tema)** | `Baseline/Consent/Welcome.tsx` |
| **M18 Home app** | Padrão | card check-in verde + banner seminário | idem | **VARIANTE (tema)** | `Home.tsx` (usa `variantContent.seminar`) |
| **M19 Check-in** | Padrão | tema Pulso | tema Pulso | **VARIANTE (tema)** | `CheckIn.tsx` |
| **M20 Radar** | Sinais ilustrativos (opt-in) | idem | idem | **ORIGINAL** | `Radar.tsx` |
| **M21 Relato discriminação** | Padrão | tema Pulso | tema Pulso | **VARIANTE (tema)** | `ReportDiscrimination.tsx` |
| **M22 Perfil/Mapa/Biblioteca** | Padrão | tema Pulso | tema Pulso | **VARIANTE (tema)** | `Profile/MapUbs/HealthLibrary/DiseaseDetail.tsx` |

**Observação crítica nº 2:** o site tem **2 Homes** (GP0 e PulsoHome) e o app tem **1 Home com tema condicional**. Isso cria uma assimetria: a riqueza editorial de PP1/PP2 (features, temas, stats, missão) **existe no site mas não no app**. O app, na prática, é hoje "um app GP0 com pele Pulso".

### 2.3 Módulos de PLATAFORMA

| Módulo | Aproveitamento | Observação |
|---|---|---|
| P1 Canon | **ORIGINAL** | 2 identidades de produção; 2 slots vintage reservados |
| P2 Variantes | **ORIGINAL** | 3 variantes; `DEFAULT_VARIANT='pp1'` |
| P3 Locales | **ORIGINAL** | PT/ES (dicionário de interface) |
| P4 VariantContent | **EXCLUSIVO (PP1/PP2)** | GP0 **não usa** — tem Home própria |
| P5 Deep content | **ORIGINAL** | 7 doenças × 2 idiomas × 3 audiências |
| P6 AppearanceContext | **ORIGINAL** | Troca em runtime, sem rebuild |
| P7 Project adapter | **ORIGINAL** | Ponte Canon ↔ legado |
| P8 Worker/API | **ORIGINAL** | 3 endpoints + SPA fallback |
| P9 Database | **ORIGINAL** | 47 doenças, 42 content rows, 224 seções, 694 parágrafos, 56 fontes |

---

## PARTE 3 — O que mudou de GP0 → PP1 → PP2 (foco em conteúdo)

### 3.1 GP0 — "Gente Preta" (baseline histórica, Abr–Out 2026)

GP0 é a **primeira identidade** e a **mais "densa" em serviços-duros**. A Home original tem seções que **não existem em PP1/PP2**:

1. **Ticker de estatísticas** (`tickerStats`): 6 frases rolantes.
2. **"Folhas de Gente Preta" — Serviço, não só conteúdo**: 3 `hardServices` (Ouvidoria antirracista, Encontre uma médica preta, Guia do SUS Preto).
3. **"Folhas com Ciência" — Fitoterapia com ciência**: 3 plantas (Picão-preto, Boldo brasileiro, Folha-santa) com estudo/achado/contraindicação.
4. **Bloco "O problema × A solução"** (grid 2 colunas).
5. **Agenda da comunidade** (rodas de conversa semanais).
6. **7 temas prioritários** + **temas emergentes**.
7. **Parceiros e Governança** (grid com logos).
8. **Hero = slideshow** (`HeroSlideshow`, 6 slides: plataforma, biblioteca, app, radar, comunidade…).

**Conteúdo institucional do GP0** vem de `project.ts` (name "Gente Preta", tagline antiga "Conhecimento que transforma políticas…") — **ainda hardcoded** nesse arquivo (o `project-adapter` é a ponte, mas a migração de componentes ficou em 0% segundo `MIGRATION_CHECKLIST.md`).

### 3.2 PP1 — "Pulso Preto / Família" (Out 2026+)

PP1 é uma **reconstrução integral fiel ao mockup nº 1**, via `variantContent.ts` (não é só troca de cor). Estrutura de `PulsoHome`:
- `PulsoHero` (eyebrow duplo "SAÚDE COM RAÍZES. FUTURO COM IGUALDADE."; headline "Conhecimento também salva vidas.")
- `PulsoFeatures` — **6 cartões**: book/CONHEÇA SUA SAÚDE · heart/ENTENDA SEU CORPO · location/ENCONTRE CUIDADO · document/SEUS DIREITOS · chart/DADOS E INDICADORES · people/PARTICIPE
- `PulsoThemes` — **6 temas** (Mulher Negra, Homem Negro, Infância, Pessoa Idosa, Saúde Mental, Doenças Prevalentes)
- `PulsoStats` — 4 indicadores (56,1% DF negra; +60% hipertensão; 2x diabetes; menor acesso)
- `PulsoMission` — layout **dividido** (foto mulher à esquerda, cartão creme à direita) + wordList + cursiva + elemento "pulso dourado"
- `PulsoSeminar` — Seminário Latino-Americano 18–19/11/2026
- **Sem** bloco de notícias

### 3.3 PP2 — "Pulso Preto / Mulher"

PP2 compartilha **quase todo** o conteúdo de PP1, com diferenças cirúrgicas:
- Hero: eyebrow triplo "CONHECIMENTO É PODER. SAÚDE É DIREITO."; headline "Saúde para vidas reais."
- `PulsoMission` — layout **faixa única terracota** (foto mãe+filho sobreposta)
- wordList de missão diferente: PP1 = INFORMAÇÃO/REPRESENTATIVIDADE/CIÊNCIA/CUIDADO/OPORTUNIDADES; PP2 = SAÚDE/EDUCAÇÃO/TERRITÓRIO/SUSTENTABILIDADE/OPORTUNIDADES
- **Tem** `news` (3 cartões) → `PulsoNews`

### 3.4 Diferença real PP1 × PP2 (o que é conteúdo vs. casca)

| Elemento | PP1 | PP2 | É conteúdo? |
|---|---|---|---|
| Features (6) | **idênticas** | **idênticas** | Não — cópia literal |
| Themes (6) | **idênticas** | **idênticas** | Não — cópia literal |
| Stats (4) | idênticos | idênticos | Não — cópia literal |
| Hero (eyebrow/headline) | Próprio | Próprio | **Sim** |
| Missão (layout + wordList + cursiva) | Próprio | Próprio | **Sim** |
| Notícias na Home | Ausente | 3 cartões | **Sim** |
| Tema visual (verde vs. terracota) | verde-escuro | terracota | Apresentação |

**Conclusão crítica nº 3:** **PP1 e PP2 diferem em ~90% de apresentação e ~10% de conteúdo** (hero, missão, notícias). As seções Features/Themes/Stats foram **duplicadas literalmente** em 4 blocos (`pp1_pt`, `pp1_es`, `pp2_pt`, `pp2_es`) — 6 features × 4 = 24 objetos `icon:` no arquivo. Isso é dívida técnica: qualquer correção de texto precisa ser feita em 4 lugares.

---

## PARTE 4 — O que foi INCLUÍDO e o que foi ABANDONADO (crítica do acervo)

Esta parte cruza a **ideação original** (`PROJ NEGROS - IDEIAS ABA SITE.pdf` — 9 abas) com o que **realmente existe no código hoje**, e com as **8 contradições (C1–C8)** do `ARQUITETURA_RECONCILIADA_V4.md`.

### 4.1 As 9 abas originais × status atual

| # | Aba original | Onde está hoje | Status real |
|---|---|---|---|
| 1 | **Bem-estar** (mental, atividade física, sono, **QUIZ**, inscrição em pesquisa) | M4 Biblioteca (saúde mental) + M19 Check-in (app) | **PARCIAL** — o **quiz interativo** e o autocuidado prático **não existem** |
| 2 | **Onde encontrar especialistas** (SUS + **rede privada** + busca "atendimento humanizado") | M6 Rede SUS (só SUS/DF) + `hardServices.medica-preta` | **PARCIAL** — a **rede privada** e o **Find-a-Doctor real** continuam ausentes; só a *intenção* está no texto |
| 3 | **Ensaios clínicos** | M7 Ensaios Clínicos (página completa) | **RECUPERADA** ✅ |
| 4 | **Direito à saúde** (denúncia, políticas, PNSIPN) | M11 Transparência + M21 Relato de discriminação (app) | **PARCIAL** — o campo existe, mas **sem fluxo de encaminhamento institucional real** |
| 5 | **Recursos** (obesidade, câncer, Bem-estar no Quintal, imunocomprometidos, **saúde geracional**, **lideranças negras**, **Hall da Fama**) | M4 (obesidade, câncer) + M13 Medicina Tradicional (Bem-estar no Quintal) | **PARCIAL** — **saúde geracional, lideranças negras e Hall da Fama continuam ausentes** |
| 6 | **Eventos** (contínuos: congressos, ações, campanhas) | M9 Comunidade (Seminário + "calendário em construção") | **PARCIAL** — só o seminário é concreto; o **calendário contínuo** é promessa |
| 7 | **SUS Negro** (programas, navegação passo a passo, direitos) | M6 Rede SUS (navegação por região) | **PARCIAL** — a camada de **equidade racial explícita** dentro do SUS ficou genérica |
| 8 | **Comunidade Preta de Saúde** (rodas, ONGs, coletivos) | M9 Comunidade | **RECUPERADA** ✅ (parcialmente: rodas descritas, sem agenda real) |
| 9 | **Homenagens e Histórias** (pacientes, profissionais negros, contribuições) | M8 Memória (histórias **placeholder**) | **PARCIAL** — estrutura criada, **conteúdo real ainda não existe** |
| — | **Busca global** (doença/serviço/localização/conteúdo) | — | **AUSENTE** — só há busca de UBS |
| — | **Área do usuário** (salvar conteúdo, seguir eventos, participar de pesquisa) | M22 Perfil (histórico de check-ins) | **PARCIAL** — falta "salvar para depois" e inscrição em eventos |
| — | **AVA / Formação** (10 vídeos, 5 podcasts, certificação) | — (só roadmap) | **AUSENTE** — entregável contratual da AECID (C8) |
| — | **Cartilha impressa** (1.000 un.) | — | **AUSENTE do produto digital** (C1) |

### 4.2 Conteúdo que CRESCEU além da ideação original

Nem tudo foi corte — houve **expansão deliberada**, documentada em `arquitetura.md` (status 18/09/2026):

- **Biblioteca:** de "5 temas" do MVP → **10 categorias · 47 condições**.
- **Categoria nova "Renais e Genéticas"** (gene APOL1) — não estava na ideação.
- **7ª categoria "Saúde Mental e Socioeconômica Contemporânea"** (5 condições: ansiedade por redes, bets, substâncias, violência reativa, educação financeira) — adenda v4.1.
- **Estudo local DF 2015–2024** (`localStudy.ts`): 1º estudo epidemiológico do DF com recorte racial; 8 condições enriquecidas com dado local.
- **Medicina Tradicional Brasileira** (`/medicina-tradicional-brasileira`) — extensão da lição "Generational Health".
- **7 deep-content clínicos** (anemia falciforme, hipertensão, diabetes, miomas, lúpus, depressão, asma) — 3 audiências × PT/ES.

### 4.3 Contradições C1–C8: status no código

| # | Contradição (V4) | Status no código atual |
|---|---|---|
| C1 | Orçamento/escopo (R$80k ⊂ €235k) | ⚪ Fora do produto digital |
| C2 | Métricas de tração como fato | ✅ Tratadas como meta (política em `/transparencia`) |
| C3 | Assinatura fictícia "CASIO v10.0" | ✅ **Removida** (Lote C, 19/10/2026) de `docs/v4.2-conteudo-404/README.md`, `EXECUTIVE_SUMMARY_BRAND_VERSIONING.md` e dos cabeçalhos de dados do site. Permanece só onde a própria contradição é **descrita** (relatório V4). |
| C4 | 5 temas excluíam anemia falciforme | ✅ Corrigido (ABRADFAL + categoria Raras) |
| C5 | Hub de ensaios clínicos prometido e inexistente | ✅ Página criada (M7) |
| C6 | 3 instrumentos de coleta sob 1 modelo | ✅ Documentado (3 domínios em `/transparencia`) |
| C7 | Radar como vigilância | ✅ Reposicionado (opt-in) |
| C8 | AVA/Formação ausente | 🟡 **Ainda ausente** (só roadmap) |

### 4.4 Inconsistências de conteúdo detectadas (dívida editorial)

| Item | Onde | Problema |
|---|---|---|
| Contagem de condições | `diseases.ts:2` diz "45+"; `heroSlides.ts` diz "48+"; `arquitetura.md` diz "48+"; real = **47** | **3 números diferentes** para o mesmo dado |
| Categorias | `diseases.ts:2` diz "9 categorias"; real = **10** | Comentário desatualizado |
| Temas prioritários | `diseases.ts:420` diz "7 temas"; flags `isPriorityTheme:true` = **8** | Contagem diverge |
| Paridade site↔app | `diseases.ts` site = 47; app = **40** | App **não tem todas** as condições do site |
| Canon do nome | `project.ts` (site e app) ainda diz `name:'Gente Preta'` | Legado hardcoded convive com o Canon |
| Notícias duplicadas | `news.ts` (8, institucional) vs `variantContent.news` (3, só PP2) | **Duas fontes** de notícia desconectadas |

---

## PARTE 5 — Reflexão crítica: o que as 3 versões revelam

### 5.1 A pergunta central do PP3

O PP3 é, na prática, o pedido de **parar de manter 3 apresentações** e **consolidar 1 identidade de produção** — mas **sem jogar fora** a riqueza acumulada. O mapeamento acima mostra que a riqueza **não está distribuída uniformemente**:

```
                 GP0        PP1        PP2
Serviços-duros   ███████    ██         ██       (ouvidoria, médica preta, guia SUS, fitoterapia)
Copy editorial   ███        ███████    ███████  (features, temas, missão, seminário)
Notícias         ███████    ███████    ███████  (news.ts)
Marca "Pulso"    —          ███████    ███████  (identidade de produção atual)
```

**Diagnóstico nº 4:** as três versões **não são três tentativas do mesmo produto** — são **três recortes complementares** que nunca foram fundidos:
- **GP0** é o mais **rico em serviço real** (fitoterapia, serviços-duros, fitoterapia com ciência, parceiros).
- **PP1/PP2** são os mais **ricos em copy institucional e marca** (a identidade "Pulso Preto" oficial).
- Nenhum dos dois lados sozinho representa "o melhor do projeto".

### 5.2 Decisões registradas (sessão de requisitos PP3 — 15/10/2026)

> Registro das decisões de direção. Cada item partiu de uma proposta deste mapeamento e foi **confirmado ou ajustado** pelo responsável do projeto. **Nada abaixo foi implementado ainda** — é o **registro de direção**, para orientar a colagem do PP3.

| # | Proposta do mapeamento | Decisão registrada |
|---|---|---|
| **D1** | Fusão de conteúdo, não escolha de variante | ✅ **Confirmada.** *"PP3 deve reconciliar e consolidar, **somando**"* — a colagem é literalmente **soma do único + subtração do repetido**. |
| **D2** | Uma só fonte de verdade para a Home | ✅ **Reforçada para SSOT.** *"exatamente **uma única SSOT**"* — não só para a Home: **uma única fonte de verdade para o sistema todo**. |
| **D3** | Corrigir a dívida editorial | ✅ **Com mecanismo.** *"tudo que for **variável à medida** deve beber o dado **diretamente da base de dados**"* — nenhum número/título fixo no código. |
| **D4** | Destino de GP0 e do Canon | ✅ **Decidido.** GP0 preservado como **memória histórica dentro do CANON**; **PP1 e PP2 terão o mesmo destino** (também viram memória no Canon); **foco total em produzir o PP3**. |
| **D5** | Resolver o que ainda falta | ✅ **Encaminhada.** Será produzida uma **lista de tudo que está pendente/faltando**, item a item, para decisão (ver **Parte 6**). |

**Consequências diretas das decisões:**

- **SSOT única (D2 + D3):** toda a plataforma (site **e** app) lê de **uma só fonte canônica** (o Canon + um banco master — ver R1). Não há mais conteúdo "vivo" duplicado em `variantContent.ts`, `project.ts`, `news.ts`, `heroSlides.ts`.
- **Número auto-derivado (D3):** a contagem de condições, de categorias, de temas — tudo que é "medida" — passa a ser **calculado a partir da base**, nunca digitado. Isso **elimina na raiz** a contradição `45+/47/48+` (ver R4).
- **Memória histórica (D4):** `gente-preta-v1` (GP0) já está no Canon; `pulso-preto-v1` cobre PP1/PP2. As variantes de apresentação saem da **produção**, mas **permanecem registradas** como memória — sem perda de histórico.

### 5.3 Mapa de aproveitamento sugerido para a "colagem" do PP3

| Fonte | O que aproveitar para o PP3 | Destino |
|---|---|---|
| GP0 Home | Serviços-duros, Folhas com Ciência (fitoterapia), problema×solução, parceiros | Seções da Home PP3 |
| GP0 Header | Dropdowns *Saberes*/*Instituição* (navegação mais rica) | Nav do PP3 (ou híbrido) |
| PP1/PP2 | Marca "Pulso Preto", features 6, temas 6, stats 4, missão, seminário | Seções da Home PP3 |
| PP2 | Bloco de notícias na Home | Seção de notícias PP3 |
| Ambos | `news.ts` (8) unificado com notícias da Home | Fonte única de notícias |
| Compartilhado | 10 categorias · 47 condições · 7 deep · rede SUS · transparência | Mantém intacto |
| App | Temas + estrutura; **elevar** para paridade com o site (R2: refatorar em conjunto) | Paridade de conteúdo |

### 5.4 Riscos da "colagem" e mitigações acordadas

| # | Risco | Mitigação acordada |
|---|---|---|
| **R1** | **Duplicação oculta** — somar GP0+PP1/PP2 sem remover ramos antigos criaria 4 Homes | **Subtrações + "banco de dados" master.** Consolidar **todo o conteúdo similar e seus versionamentos** em um **banco de dados master** — a colagem **soma o único, subtrai o repetido**. |
| **R2** | **App desatualizado** — popular o site e esquecer o app recria a assimetria atual | **Testar a arquitetura CEOS e refatorar o app simultaneamente.** Site e app evoluem **juntos**, sob o mesmo Canon/SSOT. |
| **R3** | **Placeholder virar produção** — histórias "A definir", imagens CC (`isPlaceholder:true`), Conselho "A definir" | **Substituição categoria a categoria nesta fase.** Nenhum placeholder entra no PP3. **Atualização (Áudio 4):** usar **exclusivamente os ativos já produzidos para GP0/PP1/PP2** (logos, ícones, `hero.png`) e **remover toda menção a "placeholder"** na interface e nos créditos; **não gerar novas imagens nem buscar fotos** (ver **D15**, Parte 5.6). |
| **R4** | **Contradição de números** — publicar `45+` / `47` / `48+` simultaneamente | **Número auto-derivado.** O valor publicado deve **beber da base de dados CEOS** via **função/variável que atualiza automaticamente** — zero número hardcoded. |

### 5.5 Decisões de navegação — menu superior / inferior (Áudio 1_PP3)

> **Versão avaliada:** **PP3** (fonte única de verdade; nova "máscara" de apresentação sobre o conteúdo existente).
> **Princípio do Áudio 1:** o site **deixa de ser "institucional-primeiro"** e passa a ser **público-primeiro**. Fica dividido em **duas camadas**: **superior = serviços hard (uso)** e **inferior = institucional (quem somos / governança)**.
> **Termo em aberto:** "máscara" não existe como arquivo no Hub (confirmado pelo usuário) — tratado como a **camada de apresentação** (o "Z" da CEOS).

#### Decisões registradas (D6–D10)

| # | Decisão |
|---|---|
| **D6** | **Menu superior = SÓ hard services.** "Saúde" **sai do menu** e vira **os primeiros cards da Home**. |
| **D7** | **Ouvidoria** e **Encontre um profissional** (ex-"Encontre uma médica preta") **promovidos a rota/âncora**. |
| **D8** | **Comunidade e Memória → área pública ("gente")**; **Medicina Tradicional → dentro de "Saúde"**. |
| **D9** | **Site = hard services + saúde + treinamento.** Quase **nada de institucional** (o institucional mínimo fica no menu inferior). |
| **D10** | **"Revista virtual" fica FORA do menu** — é **formato de apresentação** do conteúdo (evolução visual futura de cada tema), não item de navegação. |

#### A) MENU SUPERIOR — hard services (clean, foco no usuário)

```
[ Logo ]   Rede SUS    Encontre um profissional    Ensaios Clínicos    Ouvidoria      [ Baixar o App ]
```

- **4 itens + 1 CTA.** Sem "Saúde" (virou cards da Home), sem institucional.
- **Rede SUS** absorve o "Guia do SUS Preto" (mesma navegação territorial).
- **Ouvidoria** absorve a aba "Direito à saúde" (denúncia + direitos + PNSIPN).
- **Encontre um profissional** = Find-a-Doctor (rede SUS + privada, atendimento humanizado).

#### B) HOME — hub público (onde vive a descoberta)

```
Linha 1 — SAÚDE          Saúde da Mulher Preta · Saúde do Homem Preto · Saúde Materna ·
                         Saúde Mental · Doenças Prevalentes · [ Ver todos → /saude ]
Linha 2 — GENTE          Comunidade · Memória e Herança
Linha 3 — TREINAMENTO    Formação / AVA  (pendente — ver P1)
Linha 4 — SERVIÇOS HARD  Rede SUS · Encontre um profissional · Ensaios · Ouvidoria
```

#### C) MENU INFERIOR — institucional mínimo (rodapé)

```
QUEM SOMOS                 TRANSPARÊNCIA                 COMUNICAÇÃO
• Sobre / Quem somos       • Transparência e governança  • Notícias
• Parceiros                • Relatório de Arquitetura     • Fale Conosco
```

#### D) Reorganização completa das páginas (nada órfão)

| Página atual | Rota | Destino no PP3 | Camada |
|---|---|---|---|
| Home | `/` | Home (hub de cards) | Home |
| Biblioteca de Saúde | `/saude` | Cards de saúde → lista completa | Home |
| Detalhe de Doença | `/saude/:cat/:id` | Sub-página | Home |
| Medicina Tradicional | `/medicina-tradicional-brasileira` | **Dentro de Saúde** | Home |
| Rede SUS | `/rede-sus` | **Rede SUS** (+ Guia do SUS Preto) | Superior |
| Ensaios Clínicos | `/ensaios-clinicos` | **Ensaios Clínicos** | Superior |
| *(novo)* | `/profissionais` | **Encontre um profissional** | Superior |
| *(novo)* | `/ouvidoria` | **Ouvidoria** (absorve Direito à saúde) | Superior |
| Baixar / Acessar App | `/baixar` | **CTA Baixar o App** | Superior |
| Comunidade | `/comunidade` | Card "Gente" na Home | Home |
| Memória e Herança | `/memoria` | Card "Gente" na Home | Home |
| *(novo)* | `/formacao` | Card "Treinamento" (pendente) | Home |
| Sobre | `/sobre` | **Quem somos** | Inferior |
| Parceiros | `/sobre#parceiros` | **Parceiros** | Inferior |
| Transparência | `/transparencia` | **Transparência e governança** | Inferior |
| Arquitetura | `/arquitetura` | **Relatório de Arquitetura** | Inferior |
| Notícias | `/noticias` | **Notícias** | Inferior |
| Fale Conosco | `/#fale-conosco` | **Fale Conosco** | Inferior |
| 404 | `*` | fallback | — |

#### E) Promoção de Ouvidoria e Encontre um profissional — recomendação

Ambos viram **rota dedicada** (são hard services clicáveis — a pessoa clica para *fazer*, não para ler):
- **`/ouvidoria`** — rota própria (fluxo de relato de discriminação; espelha `/relato-discriminacao` do app) + conteúdos de direitos.
- **`/profissionais`** — rota própria (busca/filtro). **Conteúdo pendente:** hoje só existe a intenção; a base de profissionais é a pendência **P3**.

#### F) Ponto a confirmar (registrado como aberto)

D8 manda **Comunidade e Memória "para o topo"**, mas D6 diz **"menu superior só hard services"**. Resolvido na proposta como **cards "Gente" na Home** (área pública), mantendo o menu superior enxuto. **Confirmação pendente** do usuário: cards na Home (proposto) **ou** itens do próprio menu superior.

### 5.6 Decisões dos Áudios 2, 3 e 4 (formato interno, rótulos e ativos)

> **Versão avaliada:** **PP3** (consolidação). Os três áudios comentam os **legados GP0/PP1/PP2** com referência a **mockups antigos** (ver nota de esclarecimento em **D**).

| # | Decisão |
|---|---|
| **D11** | **Remover o jargão técnico da apresentação** (página "Saúde"/Biblioteca) e falar a língua do público: usar **"comprovação científica" / "estudos com literatura, com base científica"**. Saem da camada do público os rótulos *"Estudo + Achado"*, *"recorte racial"* e *"tendências populacionais, não diagnósticos individuais"*. |
| **D12** | **"Estudo + Achado" é PRESERVADO — mas como camada profissional.** A segmentação por audiência **já existe** no código (`AudienceContentTabs` + `DiseaseDeepContent.audiences` = **médico / enfermeiro / usuário**). O público vê a versão **leiga** (aba `usuario`); profissionais veem o **formato técnico** (abas `medico`/`enfermeiro`). Nada é descartado: o rigor **migra de camada**. |
| **D13** | **Página "Saúde" reorganizada** — o "organograma" (hoje 10 categorias × 47 condições despejadas de uma vez no site) deve ficar **"mais tranquilo aos olhos"**: agrupar/colapsar por categoria (o app já usa acordeão) e **ordenar por relevância** em vez da ordem de declaração no array. |
| **D14** | **Zero abreviaturas.** "Hipertensão" sempre **por extenso**. O "abreviado" percebido no áudio **não existe no código atual** (`name: 'Hipertensão'`, site e app) — veio de **legado/mockup**; na consolidação, **revisar todo o legado para que não haja nenhuma abreviatura**. |
| **D15** | **Ativos visuais:** usar **exclusivamente o que já foi produzido para GP0/PP1/PP2** (ex.: `static/brand/*`, `hero.png`); **remover toda menção a "placeholder"** na interface e nos créditos; **não gerar novas imagens nem buscar fotos**. |

> **D14-a (19/10/2026):** siglas **entre parênteses são permitidas depois da primeira menção por extenso** — ex.: "Acidente Vascular Cerebral (AVC)", "Sistema Único de Saúde (SUS)".

#### A) Áudio 2 — validação (sem mudança)

Card de atalho **"Conheça sua saúde" / "Encontre cuidado"** (Home PP1/PP2) **aprovado**: *"ficou pequeno, não gritou mais do que o que é mais importante, que são as fotos, as imagens"*. **Nenhuma alteração** — registrado como **padrão a herdar no PP3**.

#### B) Áudio 3 — remover jargão: mapa exato (implementar só após validação)

| # | Trecho | Arquivo | Ação (D11) |
|---|---|---|---|
| 1 | *"47+ condições organizadas em 10 categorias temáticas, com evidência científica no formato **Estudo + Achado**. Os dados descrevem **tendências populacionais**, não diagnósticos individuais."* | site `HealthLibrary.tsx` (L41–43) | **remover** o parágrafo do topo |
| 2 | *"Base científica com **recorte racial**"* (eyebrow) | site `HealthLibrary.tsx` (L38) | **remover** |
| 3 | *"{n}+ condições mapeadas · mostrando {n} resultado(s)"* | site `HealthLibrary.tsx` (L85) | **revisar** (ligado a R4/P15 — contagem auto-derivada) |
| 4 | *"{n}+ condições mapeadas. **Tendências populacionais, não diagnósticos individuais**."* | app `HealthLibrary.tsx` (L18) | **remover** o disclaimer |
| 5 | *"os dados descrevem **tendências populacionais**, não diagnósticos individuais"* | site `DiseaseDetail.tsx` (L106) | **revisar** (mesmo jargão) |
| 6 | selo *"Placeholder (CC) — {credit}"* sobre a hero image | site/app `DiseaseDetail.tsx` | **remover** (D15) |

> **Substituição sugerida (leiga):** *"Informação de saúde com comprovação científica, organizada por tema."* — **a validar**.

#### C) Áudio 4 — organograma e abreviaturas (implementar só após validação)

- **D13:** agrupar/colapsar categorias + reordenar por relevância (hoje a ordem é a de declaração: `cardiovasculares → metabolicas → …`).
- **D14:** garantir **"Hipertensão"** (e todas as condições) por extenso; **caça a abreviaturas em todo o legado**.

#### D) Nota obrigatória — "mockups antigos"

Os **"mockups antigos"** citados **não existem como arquivo nomeado no Hub** (os 22 arquivos são propostas, contratos, NF, PDFs científicos e questionários). No código há referência a **"mockup nº1 = PP1/família"** e **"nº2 = PP2/mulher"** (comentários em `variantContent.ts`, `Header.tsx`, `Footer.tsx`, `Home.tsx`). **Ponto em aberto:** confirmar se são esses e **reenviá-los** para comparação 1:1 (necessário para localizar itens como o "Hipertensão abreviado").

> **Posição do usuário:** *"o importante é que o PP3 tenha o espírito"* — os mockups servem de **referência de espírito**, não de pixel-alvo.

---

## PARTE 6 — Pendências em aberto (lista para decisão)

> Conforme **D5**: lista de **tudo que está pendente/faltando** no projeto, extraída do cruzamento das 9 abas originais (Parte 4.1) + contradições C1–C8 + dívida editorial (Parte 4.4). Cada item precisa de uma **decisão** (fazer agora / adiar / descartar) na sessão do PP3. **Nada aqui está decidido** — é a pauta.

### 6.1 Conteúdo faltante (diluído/abandonado do acervo original)

| # | Pendência | Origem | Tipo |
|---|---|---|---|
| P1 | **AVA / Formação** — 10 vídeos + 5 podcasts + certificação digital | AECID, Anexo 2 (C8) | Entregável **contratual** |
| P2 | **Cartilha impressa** (1.000 un.) | AECID, Anexo 2 (C1) | Entregável **contratual** |
| P3 | **Find-a-Doctor real** — rede privada + filtro "atendimento humanizado" | Aba nº 2 (só texto hoje) | Produto |
| P4 | **Quiz de bem-estar** (autocuidado interativo) | Aba nº 1 | Produto |
| P5 | **Histórias reais** em Memória (hoje só "A definir") | Aba nº 9 | Conteúdo (R3) |
| P6 | **Saúde geracional + Lideranças negras + Hall da Fama** | Aba nº 5 | Conteúdo |
| P7 | **Calendário de eventos contínuo** (além do Seminário) | Aba nº 6 | Conteúdo/Operação |
| P8 | **Busca global** (doença/serviço/localização/conteúdo) | Estrutura complementar | Produto |
| P9 | **Área do usuário** (salvar conteúdo, seguir eventos, inscrever em pesquisa) | Estrutura complementar | Produto |

### 6.2 Pendências de marca/governança

| # | Pendência | Origem | Tipo |
|---|---|---|---|
| P10 | **Conselho Consultivo nomeado** (hoje "A definir") | C3 | Governança |
| P11 | **Remover assinatura fictícia "CASIO v10.0"** de docs institucionais | C3 | Governança |
| P12 | **Ativos visuais finais** — usar só o que foi produzido p/ GP0/PP1/PP2; remover menções a "placeholder" (`isPlaceholder:true`, créditos CC) | R3 / **D15** | Conteúdo/Design |
| P13 | **Vídeo `NefFu175V0A`** em `/memoria` (recomendação de substituir) | Docs v4.2 | Conteúdo |
| P14 | **Canal oficial no YouTube** | Docs v4.2 | Operação |

### 6.3 Pendências técnicas (dívida a sanear na colagem)

| # | Pendência | Evidência |
|---|---|---|
| P15 | **Unificar contagem de condições** (auto-derivada — R4) | `45+` / `47` / `48+` |
| P16 | **Paridade app↔site** (40 vs 47 condições) | `diseases.ts` (app) vs (site) |
| P17 | **Definir "7 ou 8 temas prioritários"** | `diseases.ts:420` (7) vs flags (8) |
| P18 | **`project.ts` hardcoda `name:'Gente Preta'`** → usar Canon/SSOT | site **e** app |
| P19 | **Unificar as 2 fontes de notícia** (`news.ts` 8 × `variantContent.news` 3) | SSOT (D2) |
| P20 | **Colapsar as Homes** (GP0 + PulsoHome) numa Home única | R1 |
| P21 | **Destino do app "profissional"** (triagem CPF/CNS) × app usuário | C6 |
| P22 | **Banco de dados master** (conteúdo + versionamentos consolidados) | R1 |
| P23 | **Avaliar "Violência como resposta reativa" e "Falta de educação financeira"** (hoje em "Outras", visíveis, só para reter o conteúdo) | Reclassificação 19/10/2026 |

> **Observação de método (D5):** esta lista é o **ponto de partida**. Na sessão, cada pendência recebe uma decisão e, quando aplicável, é vinculada a uma **versão específica** que está sendo avaliada (ver rito na abertura do documento).

---

## PARTE 7 — Ficha resumida (para consulta rápida)

| Pergunta | Resposta |
|---|---|
| Quantas variantes existem? | 3 (`gp0`, `pp1`, `pp2`); default `pp1` |
| Quantas identidades de marca? | 2 de produção (`gente-preta-v1`, `pulso-preto-v1`) + 2 slots vintage |
| Quantos idiomas? | 2 (`pt`, `es`) |
| Quantas páginas de site? | 14 + 4 redirects |
| Quantas telas de app? | 11 |
| Quantas condições na biblioteca? | **47** (site) / 40 (app) — divergência |
| Quantas categorias? | **10** (comentário do código diz 9) |
| Quantos deep-content? | 7 (PT/ES × 3 audiências) |
| Quantos temas prioritários? | Flag em **8** condições (comentário diz 7) |
| Quantas notícias? | 8 em `news.ts` + 3 em `variantContent` (PP2) |
| GP0 usa `variantContent.ts`? | **Não** |
| App bifurca como o site? | **Não** — só tema condicional |
| Módulos dormentes? | AVA/Formação (roadmap), Find-a-Doctor (só texto), Hall da Fama (ausente) |

---

*Documento de diagnóstico + registro de decisões, gerado por leitura direta do repositório (site/, app/, shared/, worker/, database/, docs/) e do acervo do Hub. Todos os números foram contados nos arquivos-fonte. As Partes 5.2, 5.4 e 7 registram **direção e pauta**; a **Parte 8** registra o que já foi **implementado**.*

---

## PARTE 8 — Registro de implementação (o que já saiu do papel)

> Esta parte registra o que **foi efetivamente implementado** a partir das decisões acima. O restante do documento continua sendo diagnóstico + direção.

### 8.1 Já implementado antes de 19/10/2026 (commits 1688301, 82b62c3, 1d9f8f1)

| Decisão | Status |
|---|---|
| D4 / P20 — identidade única Pulso Preto; VariantSwitcher removido; Home/Header/Footer únicos | ✅ |
| D11 — jargão removido da camada pública (site e app) | ✅ |
| D12 — "Estudo + Achado" preservado nas abas profissionais (`AudienceContentTabs`) | ✅ |
| D13 — Biblioteca do site em acordeão, ordenada por relevância | ✅ (app: acordeão, **sem** ordenação por relevância) |
| D15 / P12 — "placeholder" removido de interface, dados, banco e API | ✅ |

### 8.2 Lote A — Navegação (D6–D10) — 19/10/2026

| Item | Implementação |
|---|---|
| **D6/D7 — Menu superior só hard services** | `Rede SUS · Encontre um profissional · Ensaios Clínicos · Ouvidoria · [Baixar o App]` (PT/ES) em `shared/data/pulsoContent.ts` → `header.navItems`. CTA único "Baixar o App" (removido o botão duplicado). |
| **D7 — `/ouvidoria`** | Nova rota `site/src/pages/Ouvidoria.tsx`: relato pelo App Sentinela (`/app/denunciar`), canais oficiais (136, 162, 100) e direitos (Política Nacional de Saúde Integral da População Negra, Estatuto da Igualdade Racial, Lei 7.716/1989 + Lei 14.532/2023). `/direito-a-saude` redireciona. A Rede SUS passou a apontar para a Ouvidoria. |
| **D7 — Encontre um profissional** | Aponta para a âncora `/rede-sus#encontre-um-profissional`. A rota dedicada `/profissionais` **fica para depois** (depende de P3). |
| **Parte 5.5-B — Home hub público** | Ordem: atalhos (agora clicáveis) → **Linha 1 SAÚDE** ("Conheça sua saúde", 6 cards + link Medicina Tradicional) → **Linha 2 GENTE** (Comunidade, Memória) → **Linha 4 SERVIÇOS** (4 cards, espelham o menu) → dados → missão → seminário → notícias. **Linha 3 TREINAMENTO** fica para depois (P1). |
| **D8 — Medicina Tradicional dentro de Saúde** | Link na Linha SAÚDE da Home e cartão de destaque na `/saude`. O link "voltar" da página aponta para `/saude` (antes apontava para uma âncora inexistente). |
| **D9 — Institucional mínimo** | Parceiros saíram da Home e foram para `/sobre#parceiros`. |
| **Parte 5.5-C — Menu inferior em 3 colunas** | Quem somos (Sobre, Parceiros) · Transparência (Transparência e governança, Relatório de Arquitetura) · Comunicação (Notícias, Fale Conosco) — `footer.columns`. |
| **Nada órfão (5.5-D)** | Todas as rotas agora têm ponto de entrada: Comunidade, Memória, Ensaios Clínicos, Medicina Tradicional, Arquitetura, Ouvidoria. Novo `ScrollToHash` faz as âncoras funcionarem entre páginas. |

### 8.2-B Lote B — Fonte única de dados (D2/D3, R1/R4, P15–P17, P19) — 19/10/2026

| Item | Implementação |
|---|---|
| **P16 — Paridade app↔site** | `diseases.ts`, `deepContentRegistry.ts` e `project.ts` foram **movidos para `shared/data/`** e as cópias do app foram **apagadas**. O app passou de 40 para **47 condições** (ganhou Renais e Genéticas, Tuberculose, Sífilis Congênita, Prevenção do HIV, Acidentes de Transporte) e os **dados do estudo local do DF**, agora exibidos também no detalhe do app. |
| **R4/P15 — Número auto-derivado** | Novo `shared/data/metrics.ts`: condições, categorias, temas prioritários, emergentes, aprofundados, estudo local, idiomas e notícias são **calculados** da fonte. Removidos todos os números digitados: `48+` (heroSlides), `40+` (Baixar o App), `45+`/`48+`/`10`/`8` (relatório de Arquitetura — agora com marcadores `{{conditions}}` etc. preenchidos em tempo real), `7 temas` (roadmap), `{n}+` no app. |
| **P17 — "7 ou 8 temas prioritários"** | Resolvido pela regra: vale a **flag** `isPriorityTheme` → **8** (Hipertensão, Diabetes, Depressão, Asma, Miomas Uterinos, Mortalidade Materna, Anemia Falciforme, Lúpus). Comentários "7 temas" removidos. |
| **P19 — Notícias unificadas** | `shared/data/news.ts` é a única fonte (11 notícias, **PT e ES**, ordenadas por data). A Home mostra as 3 mais recentes com imagem e cada cartão leva à notícia em `/noticias#id`. `pulsoContent.news` ficou só com os rótulos da seção. |
| **D15 — Acervo de imagens** | `shared/data/brandImages.ts` centraliza as imagens de marca usadas pela Home e pelas notícias. |
| **Banco / API (R1/P22)** | O export (`scripts/db/export-content.mjs`) lê de `shared/data/`, grava `metrics` e `news` em `database/content.json`, e **falha o build** se a fonte única quebrar (ids duplicados, conteúdo aprofundado sem condição, métricas divergentes, notícia sem tradução). `/api/content` agora devolve `metrics`, `diseases` e `news`. |

### 8.2-C Lote C — Limpeza (P18, P11, D14-a, R3, D13) — 19/10/2026

| Item | Implementação |
|---|---|
| **P18 — "Gente Preta" em textos públicos** | `projectInfo` agora vem do **Canon** (`getProjectInfo()`); páginas Ensaios Clínicos, Comunidade, Memória, títulos de Baixar o App/Ensaios e o relatório de Arquitetura usam a marca ativa. "Gente Preta" fica só no Canon (memória histórica — D4) e em comentários de histórico. |
| **P11/C3 — Assinatura "CASIO v10.0"** | Removida de `EXECUTIVE_SUMMARY_BRAND_VERSIONING.md`, `docs/v4.2-conteudo-404/README.md` e dos cabeçalhos de `baixarAppContent.ts` / `ensaiosClinicosContent.ts`. Autoria passa a "equipe técnica CASIO V2 Studio". |
| **D14-a — Siglas** | Primeira menção por extenso em todas as páginas do site e do app (SUS, UBS, UPA, CEPAV, CAPS, SES-DF, LGPD, CEP, CONEP, DF). No app, abas/rótulos curtos trocados por palavras ("Unidades Básicas", "Pronto Atendimento", "Apoio à Violência", menu inferior "Unidades"). Abas profissionais (médico/enfermeiro) mantêm o registro técnico (D12). |
| **R3/P5 — "A definir" em Memória** | Cartões "A definir" removidos; o convite "Quer contar sua história?" leva ao Fale Conosco. Histórias entram só quando reais. |
| **R3/P10 — Conselho Consultivo** | Sem "A definir": cada vaga mostra instituição + área + "nomeação em andamento" até o nome ser publicado (campo `name` em `shared/data/project.ts`). |
| **Texto "em padronização"** | Substituído (site e app) por orientação ao usuário: "Em caso de dúvida, converse com a equipe da sua Unidade Básica de Saúde." |
| **D13 (app)** | `orderByRelevance` e `categoriesByRelevance` movidos para `shared/data/diseases.ts`; site e app usam a **mesma ordem**. |
| **Lote D (parcial)** | README reescrito para o PP3 (sem VariantSwitcher/variantes, fonte única, navegação, rotas atuais). |

### 8.2-D Biblioteca de Saúde — nova ordem das seções (19/10/2026)

Decisão do responsável: `/saude` exibe, nesta ordem, **1.** Buscar por condição · **2.** Filtrar por categoria · **3.** Cards das categorias (acordeão, ordem por relevância — D13) · **4.** Estudo em destaque (estudo local do Distrito Federal, âncora `#estudo-df` preservada) · **5.** Medicina Tradicional Brasileira (D8).

### 8.2-E Biblioteca de Saúde — reclassificação de condições (19/10/2026)

| Antes | Depois |
|---|---|
| Categoria **"Saúde Mental e Socioeconômica Contemporânea"** | **Desfeita** (sai do catálogo e do filtro) |
| "Ansiedade crônica por uso irresponsável de redes sociais" | **Nomofobia** → categoria **Saúde Mental** |
| "Vício em jogos de apostas online (bets)" | **Ludopatia** → **Saúde Mental**; foco em bets mantido, exemplos ampliados (cassinos online/"tigrinho", caça-níqueis, raspadinhas, loterias, jogo do bicho, *loot boxes*) |
| "Abuso de substâncias — disparidade de qualidade/pureza por classe e raça" + "Uso de Substâncias" (Saúde Mental) | **fundidos** em **Abuso de Substância** (Saúde Mental), unindo acesso desigual a tratamento + dupla disparidade (pureza e aplicação da política de drogas) |
| "Violência como resposta reativa" e "Falta de educação financeira" | Movidos para **Outras**, **visíveis**, em avaliação (**P23**) |
| "Prevenção do HIV (Profilaxia Pré-Exposição)" | **fundido** no card **HIV/AIDS** (Outras) |

Totais (auto-derivados): **9 categorias · 45 condições**. Links antigos continuam funcionando: `LEGACY_DISEASE_IDS` em `shared/data/diseases.ts` redireciona os ids antigos para o endereço atual (site e app).

### 8.2-F Tags das condições (19/10/2026)

Decisão do responsável: as condições exibem **apenas duas tags** — **"Prioritário"** (`isPriorityTheme`) e **"Estudo local · Distrito Federal"** (`localStudy`). A tag **"Atual"** (e "Realidade brasileira contemporânea" no detalhe) foi **removida** do site e do app; o campo `isNew` permanece nos dados (métrica `emergentThemes`), sem exibição. O app passou a exibir também a tag de estudo local (paridade com o site).

### 8.2-G Saúde Materna, cards filtrados e páginas "em construção" (20/10/2026)

- **Saúde Materna:** o card da Home "Saúde da Mulher Negra" passou a **"Saúde Materna"**, e a categoria correspondente da Biblioteca também (`id: saude-materna`). Endereços antigos (`/saude/mulher-negra/...`, `#mulher-negra`, `?categoria=mulher-negra`) redirecionam (`LEGACY_CATEGORY_IDS`).
- **Cards da Home abrem a Biblioteca já filtrada:** Materna e Mental → `?categoria=`; Homem, Infância, Pessoa Idosa e Doenças mais Prevalentes → `?recorte=` (`healthRecortes` em `shared/data/diseases.ts`; "prevalentes" é derivado dos temas prioritários). O export do banco falha se um recorte citar condição inexistente. **As listas de Homem, Infância e Pessoa Idosa são curadoria editorial a validar com a coordenação.**
- **`/profissionais` e `/formacao`** criadas com aviso **"Em construção"**, descrição do que vão oferecer e caminhos que já funcionam. O menu "Encontre um profissional" aponta para `/profissionais`; a Home ganhou a **Linha 3 — Treinamento** (card Formação).
- **Imagens:** segundo o responsável, Pessoa Idosa, Asma, Depressão e Miomas Uterinos carregam. Verificação em 20/10/2026: Pessoa Idosa, Asma e Depressão carregam; **Miomas Uterinos ainda retorna HTTP 403** fora de uma sessão logada (a confirmar em janela anônima).

### 8.2-H Dados e Indicadores + Instagram (20/10/2026)

- **Nova página `/dados-e-indicadores`** (atalhos `/indicadores`, `/dados`). Destino do atalho "Dados e Indicadores" e do botão "Ver indicadores" da Home (antes iam para `/transparencia`); também no rodapé (coluna Transparência). Conteúdo, sem números escritos à mão: **Panorama** (mesmos cards da Home — `pulsoContent.stats`), **Estudo em destaque · Evidência local do Distrito Federal** (`LocalStudyFeature`), **achados locais por condição** (derivados de `diseases.ts → localStudy`) e nota "Como usamos os dados" → Transparência.
- **"Estudo em destaque" saiu da Biblioteca de Saúde.** Nova ordem de `/saude`: 1. Busca · 2. Filtro · 3. Categorias · 4. Medicina Tradicional. Links antigos `/saude#estudo-df` redirecionam para `/dados-e-indicadores#estudo-df`; o detalhe da condição aponta para a página nova.
- **Instagram `@pulsovivooficial`** no rodapé (Redes Sociais), a partir de `shared/data/social.ts`. Os ícones de Facebook, YouTube e LinkedIn **saíram**: não tinham destino (`href="#"`). Voltam quando os perfis forem confirmados.

### 8.3 Decisões adiadas (lembrar)

- **Ponto F (5.5-F):** Comunidade e Memória — cards "Gente" na Home (implementado provisoriamente) **ou** itens do menu superior. *Aguardando posição.*
- **P23 — Destino de "Violência como resposta reativa" e "Falta de educação financeira":** hoje ficam visíveis na categoria "Outras" apenas para **reter o conteúdo**; decidir se permanecem, se migram para outra categoria/página (ex.: determinantes sociais) ou se saem do catálogo. *Aguardando posição.*
- **"Mulher/Homem Preto" × "Mulher/Homem Negro":** terminologia dos cards e textos. *Aguardando posição.*
- **Imagem de Miomas Uterinos:** confirmar se carrega para visitantes sem login.

### 8.4 Próximos passos

- **Produção:** merge dos PRs dos Lotes A, B e C na `main` → Workers Builds publica automaticamente.
- Pendências da Parte 6 ainda abertas: P1 (AVA), P2 (cartilha), P3 (Find-a-Doctor), P4 (quiz), P5 (histórias reais), P6, P7, P8 (busca global), P9 (área do usuário), P10 (nomes do Conselho), P13/P14 (vídeo/canal), P21 (app profissional).
