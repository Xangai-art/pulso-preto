# MAPEAMENTO_ARQUITETURA
## Módulos master × versões (GP0 · PP1 · PP2) — foco em conteúdo

**Projeto:** Pulso Preto (ex-Gente Preta)
**Finalidade:** inventariar todos os **módulos master** da plataforma e mostrar, de forma rastreável, **como cada um foi aproveitado em cada versão** — se de forma *original* (intacta) ou *com variante* (adaptada). O foco é **conteúdo**, não pixels.
**Método:** leitura direta do código-fonte em `site/`, `app/`, `shared/`, `worker/`, `database/` e `docs/`, cruzada com o acervo do Hub (`PROJ NEGROS - IDEIAS ABA SITE.pdf`, `ANEXO 2`, etc.). Nenhum número aqui é estimado: todos foram contados nos arquivos.
**Status:** documento de **diagnóstico para a sessão de requisitos do PP3**. Não implementa nada — serve de base para decidirmos, caso a caso, o que popula o site e o app.

> **Convenção de leitura.** "Versão" tem, neste projeto, **três significados empilhados**. Antes de mapear módulos, é obrigatório separá-los (Parte 0) — senão a própria pergunta "o que mudou entre GP0/PP1/PP2" fica ambígua.

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
| C3 | Assinatura fictícia "CASIO v10.0" | ⚠️ **Ainda presente** em `docs/v4.2-conteudo-404/README.md` e `EXECUTIVE_SUMMARY_BRAND_VERSIONING.md` |
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

### 5.2 As 5 decisões que o PP3 precisa tomar (propostas para validação — NÃO implementadas)

> Estas são **propostas de discussão**, para a sessão de requisitos. Nada será implementado sem o "ok" do usuário.

1. **Fusão de conteúdo, não escolha de variante.** O PP3 deve **somar** o melhor de cada recorte: os *serviços-duros* + *fitoterapia* + *problema×solução* do GP0 **e** a *copy/marca Pulso Preto* do PP1/PP2. A "colagem" pedida é literalmente isso.
2. **Uma só fonte de verdade para a Home.** Hoje há `Home.tsx` (GP0) + `PulsoHome` + `variantContent.ts`. O PP3 deve **colapsar** isso numa Home única, sem `if (variantId===...)`.
3. **Corrigir a dívida editorial** antes de popular: unificar a contagem (47), alinhar categorias (10), temas (7 ou 8 — decidir), e sincronizar app↔site (40 vs 47).
4. **Decidir o destino de GP0 e do Canon.** GP0 vira *memória histórica* (preservada no Canon) ou é **removido** do código? O Canon já preserva `gente-preta-v1` — a variante `gp0` pode sair da produção sem perder história.
5. **Resolver o que ainda falta** (não é "abandono", é "pendência"): AVA/Formação (C8), Find-a-Doctor real (aba nº 2), histórias reais em Memória (aba nº 9), calendário de eventos contínuo (aba nº 6).

### 5.3 Mapa de aproveitamento sugerido para a "colagem" do PP3

| Fonte | O que aproveitar para o PP3 | Destino |
|---|---|---|
| GP0 Home | Serviços-duros, Folhas com Ciência (fitoterapia), problema×solução, parceiros | Seções da Home PP3 |
| GP0 Header | Dropdowns *Saberes*/*Instituição* (navegação mais rica) | Nav do PP3 (ou híbrido) |
| PP1/PP2 | Marca "Pulso Preto", features 6, temas 6, stats 4, missão, seminário | Seções da Home PP3 |
| PP2 | Bloco de notícias na Home | Seção de notícias PP3 |
| Ambos | `news.ts` (8) unificado com notícias da Home | Fonte única de notícias |
| Compartilhado | 10 categorias · 47 condições · 7 deep · rede SUS · transparência | Mantém intacto |
| App | Temas + estrutura; **elevar** para paridade com o site | Paridade de conteúdo |

### 5.4 Riscos de "colagem sem retrabalho"

- **Risco 1 — Duplicação oculta.** Se o PP3 somar GP0+PP1/PP2 sem remover os ramos antigos, teremos **4 Homes** em vez de 2. A colagem precisa de **subtração**, não só soma.
- **Risco 2 — App desatualizado.** Popular o site e esquecer o app recria a assimetria atual (app = "GP0 com pele Pulso").
- **Risco 3 — Conteúdo placeholder virar produção.** Memória (histórias "A definir"), imagens CC (`isPlaceholder:true`), Conselho Consultivo ("A definir") — popular com isso **agrava** o problema de credibilidade (C3).
- **Risco 4 — Contradição de números.** Publicar "45+", "47" e "48+" simultaneamente é um erro factual visível ao público.

---

## PARTE 6 — Ficha resumida (para consulta rápida)

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

*Documento de diagnóstico gerado por leitura direta do repositório (site/, app/, shared/, worker/, database/, docs/) e do acervo do Hub. Todos os números foram contados nos arquivos-fonte. Destina-se à sessão de requisitos do PP3 — nenhuma alteração de código foi feita.*
