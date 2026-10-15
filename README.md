# Gente Preta / Pulso Preto — Site Institucional + App Sentinela

> Plataforma de saúde para a população negra (piloto Distrito Federal), com
> **arquitetura CEOS** (Canon · Variants · Locales · Presentation) que permite
> operar **3 identidades de marca × 2 idiomas** a partir de uma única base de
> código, com troca 100% em runtime — sem rebuild, sem redeploy.

## Visão geral

| | |
|---|---|
| **Nome do projeto** | Gente Preta — Sentinela de Saúde da População Negra |
| **Marca ativa (piloto)** | Pulso Preto (variantes PP1/PP2) sobre o Canon original Gente Preta (GP0) |
| **Objetivo** | Reduzir inequidades em saúde da população negra no SUS/DF via (1) site institucional com base científica, transparência e governança pública, e (2) App Sentinela (escuta longitudinal, navegação SUS, radar comunitário) |
| **Financiamento** | AECID (€ 235.152,41, 24 meses) |
| **Execução** | APRECIA + CASIO V2 Studio |
| **Parceiros** | GDF, SEJUS/DF, FEPECS, UnB, FIOCRUZ, CUFA/DF, ABRADFAL |
| **Evento-âncora** | Seminário Latino-Americano "Saúde, Tecnologia e Prevenção" — **18 e 19 de novembro de 2026**, Brasília/DF |

---

## Arquitetura CEOS — Canon / Variants / Locales / Presentation

Este projeto é, antes de tudo, um **teste de arquitetura de marca multi-tenant**:
a mesma base de código institucional (rotas, dados científicos, governança,
LGPD) precisa servir **identidades visuais e editoriais completamente
distintas** sem duplicar projeto, sem feature flags espalhados pelo código e
sem exigir novo deploy a cada troca de marca. A solução é uma pilha de 4
camadas, cada uma com responsabilidade única:

```
┌─────────────────────────────────────────────────────────────────┐
│  C — CANON          shared/data/brand-canon.ts                  │
│      Identidade de marca "crua": nome, tagline, cores-base por   │
│      BrandVersionId. Camada mais estável — raramente muda.       │
├─────────────────────────────────────────────────────────────────┤
│  E/O — VARIANTS      shared/data/variants.ts                     │
│      VariantId = 'gp0' | 'pp1' | 'pp2'. Cada variante referencia │
│      um BrandVersionId do Canon + metadados de apresentação      │
│      (tratamento de hero, tema de rodapé, exibição de seções).   │
│      shared/data/variantContent.ts — conteúdo editorial completo │
│      por variante (hero, features, temas, stats, missão,         │
│      notícias, seminário, rodapé) — cada campo em PT e ES.        │
├─────────────────────────────────────────────────────────────────┤
│  S — LOCALES         shared/data/locales.ts                      │
│      LocaleId = 'pt' | 'es'. Dicionário TRANSLATIONS +            │
│      translate(). Arquitetado para 'en' futuro sem mudar a API.  │
├─────────────────────────────────────────────────────────────────┤
│  PRESENTATION        shared/context/AppearanceContext.tsx         │
│                      shared/components/VariantSwitcher.tsx        │
│      useAppearance() expõe {variantId, variant, brand, localeId,  │
│      setVariantId, setLocaleId, t()} para toda a árvore React —   │
│      site/ e app/ consomem o MESMO hook. Persiste escolha em      │
│      localStorage (pulsopreto:variant / pulsopreto:locale).       │
│      VariantSwitcher é o único ponto de troca: um botão (🎛️),     │
│      fechável via "✕" ou Esc, nunca "prende" o usuário.           │
└─────────────────────────────────────────────────────────────────┘
```

**Por que 4 camadas e não uma única tabela de temas?** Porque GP0 e
PP1/PP2 não são apenas paletas diferentes sobre o mesmo layout — são
**estruturas de página distintas** (número de colunas no rodapé, presença ou
ausência de seção de notícias, layout de hero). Uma camada de "tema CSS"
não resolveria isso; por isso `Home.tsx`, `Header.tsx` e `Footer.tsx`
brancham 100% entre `Gente*` (GP0) e `Pulso*` (PP1/PP2) a partir de um único
`if (variantId === 'pp1' || variantId === 'pp2')`, delegando todo o resto do
app (rotas, dados científicos, LGPD, governança) à mesma base intocada.

### Variantes implementadas

| Variante | Identidade | Header/Footer | CTA principal |
|---|---|---|---|
| **GP0** | Gente Preta (original) | Layout histórico, paleta `folha/ouro/palha/barro` | "Baixe o App" |
| **PP1** | Pulso Preto "Família" | Verde-escuro + dourado + creme, rodapé 3 colunas | "CUIDE-SE" |
| **PP2** | Pulso Preto "Mulher" | CTA terracota, faixa de missão full-width, seção de notícias | "Acesse serviços SUS" |

`DEFAULT_VARIANT = 'pp1'` — a identidade Pulso Preto é a que carrega por
padrão neste piloto; GP0 permanece acessível via VariantSwitcher como a
"marca-mãe" original, preservada e nunca alterada por este trabalho.

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
  Tailwind escopados: só os componentes `Pulso*` (PP1/PP2) usam essas
  classes; GP0 mantém Inter/Newsreader, intocado.
- **Logo**: ícone oficial do pacote de identidade (`LOGO/`, recortado via
  `pdftocairo`) em `*/public/static/brand/pulso-preto-icon.png`.
- **Logos de parceiros** (`Logotipos.zip`, SVGs vetoriais em
  `*/public/static/brand/partners/`): AECID, GDF, FEPECS, APRECIA — mapeados
  em `site/src/data/project.ts` → `partners.*.logo` e renderizados na seção
  "Parceiros e Governança" da Home (GP0).
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
  As taglines de cabeçalho PP1/PP2 × PT/ES (`shared/data/variantContent.ts`)
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
    substituindo os emojis por ilustração oficial quando `isPulso`.
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
públicas*. Conteúdo implementado em `site/src/pages/Community.tsx` (GP0) e
como seção dedicada (`PulsoSeminar`) em `site/src/pages/Home.tsx` via o novo
campo `seminar?: SeminarContent` em `shared/data/variantContent.ts`
(PP1/PP2, PT/ES).

Fontes primárias: Anexo de Intervenção AECID (nome oficial do seminário,
estrutura de 2 dias, 300 participantes) e Relatório de Planejamento Técnico
— Produto 2.2 (estratégia de demonstração / painel técnico).

---

## Arquitetura de deploy (Cloudflare Pages — domínio único)

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
| `/` | Home | Hero, features, temas, stats, missão, **seminário** (PP1/PP2), notícias (PP2), parceiros (GP0) |
| `/sobre` | About | |
| `/saude` | HealthLibrary | 9 categorias (`data/diseases.ts`) |
| `/saude/:categoryId/:diseaseId` | DiseaseDetail | Conteúdo estratificado por audiência — 7 doenças prioritárias |
| `/biblioteca-saude` | BibliotecaSaude | 10 categorias, 33 condições, busca + filtros |
| `/ensaios-clinicos` | ClinicalTrials | Fases, direitos, histórico, checklist |
| `/memoria` | Memory | |
| `/comunidade` | Community | Parceiros comunitários + **card do Seminário Latino-Americano** |
| `/rede-sus` | SusNetwork | UBS/UPA/CEPAV/CAPS por Região de Saúde do DF |
| `/transparencia` | Transparency | LGPD, consentimento, governança |
| `/arquitetura` | Architecture | Sistema de design + relatório de arquitetura |
| `/baixar` | AppAccess | Status, cronograma, LGPD, waitlist, FAQ |
| `*` | NotFound | 404 |

## Dados, conteúdo e base de dados
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
- **API de conteúdo** (`worker/index.js`): `GET /api/content`,
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
- **Plataforma**: Cloudflare Pages (projeto `gente-preta`), `_worker.js`
  customizado para fallback de SPA duplo (site + app).
- **URL de produção**: https://gente-preta.pages.dev
- **Conta Cloudflare**: BYOK (token do próprio usuário via Deploy panel).
- **Comando de deploy**: `npm run build && npx wrangler pages deploy dist --project-name gente-preta --branch main`
- **Repositório**: `github.com/fratozsistemas-art/gente-preta`, branch `genspark_ai_developer` (Git-integration auto-deploy).

## Não implementado / próximos passos
- Layout `Pulso*` dedicado para o App Sentinela (hoje só Logo/paleta).
- Tradução ES do conteúdo clínico das condições restantes (fora das 7
  prioritárias, já bilíngues).
- Provisionar/validar o D1 gerenciado no deploy hospedado (hoje a API roda com
  fallback estático até o `.tables/schema.json` ser publicado no deploy) e
  substituir as hero images placeholder por material próprio (licenciado).
- Auditoria de links/navegação ("Notícias" ainda aponta para âncora `#noticias`
  na Home em vez de uma página `/noticias` dedicada — pendente de decisão de
  escopo com o usuário).
- Decisão final entre as variantes PP1/PP2 como identidade única de produção
  (hoje ambas coexistem via VariantSwitcher para fins de teste A/B visual).
- QA de acessibilidade (Lighthouse, leitor de tela); revisão clínica formal
  pelo Conselho Consultivo; nomes reais no Conselho (`/transparencia`).
- Conectar formulário de `/baixar` a serviço de e-mail transacional
  (SendGrid/Postmark) respeitando LGPD — hoje é client-side apenas.

## Última atualização
08/10/2026 — Seminário Latino-Americano (18-19 nov 2026, nome oficial e
programação de 2 dias/painel técnico) adicionado a Community.tsx (GP0) e
Home.tsx (PP1/PP2 via novo campo `seminar` em `variantContent.ts`); logos
vetoriais oficiais de 4 parceiros (AECID/GDF/FEPECS/APRECIA) integrados;
tipografia oficial Pulso Preto (Hurme Geometric Sans 3 + Sans Serif
Collection) wireada via `@font-face` + Tailwind `font-pulso-display`/
`font-pulso-body`; README reescrito com foco na arquitetura CEOS.
