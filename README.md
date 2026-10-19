# Pulso Preto — Site Institucional + App Sentinela

> Plataforma de saúde para a população negra (piloto no Distrito Federal).
> **Identidade única de produção: Pulso Preto (PP3)**, com dois idiomas (PT/ES)
> e **fonte única de dados** compartilhada entre site, app e banco.
> A marca histórica "Gente Preta" (GP0) e os tratamentos PP1/PP2 ficam
> preservados como memória no Canon (`shared/data/brand-canon.ts`).

## Visão geral

| | |
|---|---|
| **Projeto** | Pulso Preto (ex-Gente Preta) — Sentinela de Saúde da População Negra |
| **Objetivo** | Reduzir inequidades em saúde da população negra no Sistema Único de Saúde (SUS) do Distrito Federal, via (1) site público com serviços, base científica e governança e (2) App Sentinela (escuta longitudinal, navegação no SUS, radar comunitário) |
| **Financiamento** | AECID (€ 235.152,41, 24 meses) |
| **Execução** | APRECIA + CASIO V2 Studio |
| **Parceiros** | GDF, SEJUS/DF, FEPECS, UnB, FIOCRUZ, CUFA/DF, ABRADFAL |
| **Evento-âncora** | Seminário Latino-Americano "Saúde, Tecnologia e Prevenção" — **18 e 19 de novembro de 2026**, Brasília/DF |
| **Registro de decisões** | `docs/MAPEAMENTO_ARQUITETURA.md` (decisões D1–D15 e Parte 8 — o que já foi implementado) |

---

## Arquitetura CEOS (PP3)

```
shared/                       ← FONTE ÚNICA (site + app + banco)
├── data/brand-canon.ts       X — Canon: marca ativa (pulso-preto-v1) + histórico (GP0)
├── data/locales.ts           Idiomas PT/ES (dicionário de interface)
├── data/pulsoContent.ts      Copy editorial da Home/Header/Footer (PT/ES)
├── data/diseases.ts          Catálogo único de condições (+ ordem por relevância)
├── data/metrics.ts           Contagens AUTO-DERIVADAS (nunca digitar números)
├── data/news.ts              Notícias (PT/ES) — Home mostra as 3 mais recentes
├── data/project.ts           Rede SUS, parceiros, governança, roadmap
├── data/brandImages.ts       Acervo de imagens de marca (D15)
├── data/deepContentRegistry.ts + 7 arquivos de conteúdo aprofundado por audiência
└── context/AppearanceContext.tsx  useAppearance(): marca + idioma em runtime
```

- **Sem variantes em produção** (D4): o antigo `VariantSwitcher` foi removido;
  resta apenas o `LocaleSwitcher` (PT/ES).
- **Números nunca são digitados** (R4): use `metrics.conditions`,
  `metrics.categories`, `metrics.priorityThemes` etc. O relatório
  `/arquitetura` usa marcadores `{{conditions}}` preenchidos em runtime.
- **Siglas** (D14-a): sempre por extenso na primeira menção; a sigla entre
  parênteses pode vir depois.

### Navegação (D6–D10)
- **Menu superior** = só serviços: Rede SUS · Encontre um profissional ·
  Ensaios Clínicos · Ouvidoria · [Baixar o App].
- **Home** = hub público: atalhos → Saúde → Gente (Comunidade, Memória) →
  Serviços → dados → missão → seminário → notícias.
- **Rodapé** = institucional mínimo: Quem somos · Transparência · Comunicação.

### Identidade visual oficial "Pulso Preto"

- **Cores** (`tailwind.config.js` → namespace `pulso.*`), verificadas pixel a
  pixel contra o PDF/PNG de paleta oficial: `verde` `#06201B`, `verde-medio`
  `#1A5C3A`, `verde-accent` `#2DA864`, `creme` `#F7F5F0`, `dourado` `#D4A84B`,
  `dourado-claro` `#E8C05A`, `marrom/terracota` `#8F4B21`.
- **Tipografia oficial** (`00_Identidade/FONTES/Tipografia.docx`): **Hurme
  Geometric Sans 3** como fonte de títulos/display (`font-pulso-display`,
  pesos Light/Regular/SemiBold/Bold) e **Sans Serif Collection** como fonte
  de corpo/legenda (`font-pulso-body`) — ambas declaradas via `@font-face`
  em `site/src/index.css` e `app/src/index.css`, mapeadas como utilitários
  Tailwind (`font-pulso-display`/`font-pulso-body`), usados em todo o PP3.
- **Logo**: ícone oficial do pacote de identidade (`LOGO/`, recortado via
  `pdftocairo`) em `*/public/static/brand/pulso-preto-icon.png`.
- **Logos de parceiros** (`Logotipos.zip`, SVGs vetoriais em
  `*/public/static/brand/partners/`): AECID, GDF, FEPECS, APRECIA — mapeados
  em `shared/data/project.ts` → `partners.*.logo` e renderizados em
  `/sobre#parceiros`.
- **Favicon / `theme-color`**: auditoria de identidade identificou que
  `favicon.svg` e `<meta name="theme-color">` em `site/index.html` e
  `app/index.html` ainda eram o resquício genérico do template Hono/Vite
  (raio lilás `#863bff`). Corrigido: novo favicon composto (fundo verde-escuro
  `#06201B` + ícone oficial do pacote de identidade) em `favicon.svg` +
  `favicon.png` (256×256) + `apple-touch-icon.png` (180×180), `theme-color`
  agora `#06201B`.
- **Tagline oficial**: o logo oficial (`LOGO/Pulso_Preto_Logo_Quadrada.png`)
  traz o texto `"SAÚDE • CONHECIMENTO • EQUIDADE"` e o slogan de 3 linhas
  "Informação que pulsa / Conhecimento que cuida / Equidade que transforma".
  As taglines de cabeçalho PT/ES (`shared/data/pulsoContent.ts`)
  e a tagline do Canon (`shared/data/brand-canon.ts` →
  `pulso-preto-v1.tagline`, usada também na meta `description` do site) foram
  alinhadas a essa redação exata — `gente-preta-v1.tagline` (GP0, marca
  anterior) permanece intocada.
- **Elementos gráficos oficiais** (`ELEMENTOS/ICONES`, `ELEMENTOS/CIRCULO`,
  `ELEMENTOS/PULSO`, redimensionados para 300–500px em
  `*/public/static/brand/elementos/`): os 4 ícones customizados e o
  Elemento Pulso/Círculo Dourado, antes não utilizados, agora aparecem em:
  - **Site**: `PulsoHero` (Círculo Dourado como watermark decorativo) e
    `PulsoMission` (Elemento Pulso dourado/branco junto à citação, PP1/PP2).
  - **App Sentinela**: ícones dos QuickLinks da Home e do `BottomNav`
    (UBS/mapa, Radar, Biblioteca de Saúde, Direitos), estado vazio do Radar
    e estado de sucesso do formulário de denúncia (`ReportDiscrimination`) —
    substituindo os emojis por ilustração oficial.
  - Deliberadamente **não** alterados: o sistema de ícones SVG próprio do
    site (`PulsoIcons.tsx`, `Ornaments.tsx`, `HeartbeatLine` em
    Header/Footer) — para não misturar dois estilos de ícone visualmente
    incompatíveis — e páginas/abas sem equivalente oficial (`AppAccess.tsx`,
    ícones médico/enfermeiro em `AudienceContentTabs.tsx`).

### Limitações conhecidas desta fase
- Conteúdo clínico aprofundado das **7 doenças prioritárias** (Anemia
  Falciforme, Hipertensão, Diabetes, Miomas Uterinos, Lúpus, Depressão e Asma)
  traduzido PT/ES; as demais condições da Biblioteca de Saúde seguem só em
  português e em formato "Estudo + Achado".
- Painel administrativo de troca de marca: **fora de escopo**, por decisão
  do usuário — a troca aqui é um recurso de usuário final (como um seletor
  de idioma), não uma ferramenta de gestão de conteúdo.

---

## Evento-âncora — Seminário Latino-Americano

**"Saúde, Tecnologia e Prevenção: Desafios e Inovações para a População
Negra"** — **18 e 19 de novembro de 2026**, Brasília/DF.

> ⚠️ **Nota de divergência de fonte**: o Relatório de Planejamento Técnico do
> Produto 2.2 (datado de 19/06/2026) registrava uma previsão anterior de
> "20 e 21 de novembro de 2026". As datas **18-19/11** usadas neste site
> foram confirmadas diretamente pelo usuário como a versão vigente — é
> recomendável validar com a coordenação do projeto se a documentação
> interna (contratos, propostas) deve ser atualizada para refletir o ajuste.

| Dia | Público | Atividades |
|---|---|---|
| **18/11** | ~150 profissionais de saúde, pesquisadores e estudantes | Apresentação técnica da plataforma + **painel técnico** de discussão sobre funcionalidades, contribuições e aperfeiçoamento do app |
| **19/11** | ~150 pessoas da comunidade/beneficiários | Estação interativa com tablets + sessão prática (hands-on) de experimentação do aplicativo |

Eixos temáticos: *doenças que mais afetam a população negra* · *soluções
tecnológicas para equidade em saúde* · *prevenção, cuidado e políticas
públicas*. Conteúdo implementado em `site/src/pages/Community.tsx` e
como seção dedicada (`PulsoSeminar`) em `site/src/pages/Home.tsx` via o novo
campo `seminar: SeminarContent` em `shared/data/pulsoContent.ts`
(PT/ES).

Fontes primárias: Anexo de Intervenção AECID (nome oficial do seminário,
estrutura de 2 dias, 300 participantes) e Relatório de Planejamento Técnico
— Produto 2.2 (estratégia de demonstração / painel técnico).

---

## Arquitetura de deploy (Cloudflare Workers — domínio único)

Monorepo com dois SPAs React/Vite compartilhando um único Worker:

- `site/` — Site institucional (React + Vite + Tailwind + React Router), raiz `/`.
- `app/` — App Sentinela (React + Vite + Tailwind + Zustand), em `/app/`.
- `shared/` — Camadas CEOS (Canon/Variants/Locales/Presentation), importadas
  por ambos os projetos via alias `@shared/*`.
- `worker/index.js` — Worker mínimo: serve `dist/` e aplica fallback de SPA
  por prefixo (`/app/*` → `dist/app/index.html`; demais rotas →
  `dist/index.html`).
- `npm run build` na raiz: instala dependências dos dois projetos, builda
  cada um e monta `dist/` combinado (`assemble`).

## Rotas do Site Institucional (`site/src/App.tsx`)

| Rota | Página | Observação |
|---|---|---|
| `/` | Home | Hub público (Saúde · Gente · Serviços · notícias) |
| `/saude` | HealthLibrary | Catálogo único, categorias em acordeão ordenadas por relevância |
| `/saude/:categoryId/:diseaseId` | DiseaseDetail | Abas por audiência (usuário/enfermeiro/médico) nas 7 doenças aprofundadas |
| `/medicina-tradicional-brasileira` | TraditionalMedicine | Dentro de Saúde (D8) |
| `/rede-sus` | SusNetwork | Unidades por Região de Saúde; âncora `#encontre-um-profissional` |
| `/ensaios-clinicos` | ClinicalTrials | |
| `/ouvidoria` | Ouvidoria | Relato via App, canais oficiais (136/162/100), direitos |
| `/baixar` | AppAccess | CTA "Baixar o App" |
| `/comunidade`, `/memoria` | Community, Memory | Linha "Gente" da Home |
| `/sobre` (+ `#parceiros`) | About | Quem somos + parceiros |
| `/transparencia` | Transparency | Governança, consentimento (Lei Geral de Proteção de Dados) |
| `/arquitetura` | Architecture | Sistema de design + relatório |
| `/noticias` | News | Todas as notícias (âncora por id) |
| `*` | NotFound | 404 |

Redirecionamentos: `/biblioteca`, `/biblioteca-saude` → `/saude`;
`/ensaios` → `/ensaios-clinicos`; `/medicina-tradicional` →
`/medicina-tradicional-brasileira`; `/baixe-o-app` → `/baixar`;
`/direito-a-saude` → `/ouvidoria`.

## Dados, conteúdo e base de dados
- **Fonte única**: site e app importam `@shared/data/*` — não há cópias em
  `site/src/data` ou `app/src/data` para catálogo, projeto ou notícias.
- **Conteúdo aprofundado (Nível 3)** das 7 doenças prioritárias vive nas
  fontes canônicas em TypeScript (`shared/data/*.ts`, contrato
  `DiseaseDeepContent`), segmentado por audiência (médico/enfermeiro/usuário),
  bilíngue PT/ES, com hero image e fontes científicas.
- **Base de dados de conteúdo**: `database/schema.sql` é o esquema canônico
  (SQLite/D1); `database/content.json` e `database/seed.sql` são gerados a
  partir das fontes por `scripts/db/export-content.mjs` (que também **verifica**
  o resultado abrindo um SQLite real via `node:sqlite`). O descritor
  `.tables/schema.json` provisiona o **único banco D1 gerenciado** no deploy
  hospedado do Genspark.
- **Integridade**: `db:export` **falha o build** se houver ids duplicados,
  conteúdo aprofundado sem condição, métricas divergentes ou notícia sem
  tradução. `content.json` inclui `metrics` e `news`.
- **API de conteúdo** (`worker/index.js`): `GET /api/content` (metrics +
  diseases + news),
  `GET /api/content/:diseaseId?locale=pt|es` e `GET /api/health`. Lê do D1
  quando o binding está disponível e faz **fallback automático** para o JSON
  estático embutido (`dist/api/content.json`) — a aplicação nunca quebra sem
  banco.
- Comandos: `npm run db:export` (regenera + verifica a base) e
  `npm run build` (já inclui o `db:export` e copia o JSON para `dist/api/`).
- Sem Cloudflare KV/R2 nesta fase; o formulário de `/baixar` permanece
  client-side (sem persistência real) e o App Sentinela usa Zustand para
  estado local.

## Como rodar localmente (sandbox)
```bash
cd /home/user/webapp
npm run build                 # instala deps, builda site + app, monta dist/
pm2 start ecosystem.config.cjs
curl http://localhost:3000/
curl http://localhost:3000/comunidade
```

## Deploy
- **Plataforma**: Cloudflare Workers (`pulso-preto`), com Cloudflare **Workers
  Builds** conectado ao repositório (build + `npx wrangler deploy` a cada push
  na branch de produção `main`).
- **Worker**: `worker/index.js` (declarado em `wrangler.jsonc` como `main`),
  responsável pelo fallback de SPA duplo (site + app) e pela API `/api/content`.
- **Assets**: `dist/` é publicado como assets estáticos do Worker (binding
  `ASSETS`). O build (`npm run assemble`) gera também `dist/.assetsignore` com
  `_worker.js`, para que o artefato legado de Pages (`dist/_worker.js`, mantido
  para o preview local via `wrangler pages dev`) **não** seja publicado como
  asset — o que o wrangler bloqueia por padrão (evita expor código server-side).
- **Conta Cloudflare**: do próprio usuário (BYOK), via Workers Builds.
- **Comando de build/deploy**: `npm run build` + `npx wrangler deploy`.
- **Repositório**: `github.com/Xangai-art/pulso-preto`, branch `main`
  (Workers Builds — auto-deploy a cada push).

## Não implementado / próximos passos
Ver `docs/MAPEAMENTO_ARQUITETURA.md` → Parte 6 (pendências) e Parte 8.3
(decisões adiadas). Principais:
- Decisões adiadas: Comunidade/Memória no menu superior; páginas
  `/profissionais` e `/formacao`; substituição de 4 imagens quebradas.
- Find-a-Doctor real (P3), AVA/Formação (P1), histórias reais em Memória (P5),
  nomes do Conselho Consultivo (P10).
- Tradução ES do conteúdo clínico das condições fora das 7 prioritárias.
- Formulário de `/baixar` conectado a e-mail transacional (hoje client-side).
- QA de acessibilidade e revisão clínica formal pelo Conselho Consultivo.

## Última atualização
19/10/2026 — PP3 Lotes A (navegação público-primeiro, `/ouvidoria`), B (fonte
única de dados, métricas auto-derivadas, notícias unificadas, paridade
site↔app 47/47) e C (marca via Canon, assinatura fictícia removida, siglas
por extenso, sem "A definir", ordem por relevância no app).
