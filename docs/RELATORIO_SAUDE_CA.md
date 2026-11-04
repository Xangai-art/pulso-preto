# Aba Saúde — relatório verificável CA-01 a CA-16

**Data:** 04/11/2026. **Repositório:** Xangai-art/pulso-preto. **Base:** `6383ac2f08f9682023512cf5f20f134bfa764ae4`.

## Parecer

**Estrutura web implementada e testada; aceite final bloqueado.** Há pendências P0 de conteúdo clínico, auditoria global de siglas, acessibilidade humana e compreensão. Não se declara certificação WCAG, validação clínica, build nativo instalável ou produção publicada. Commit/push não substitui homologação.

Foi mantida a arquitetura React do repositório real, sem reescrever o app em Hono. Tab bar, cadastro, consentimentos, backend, autenticação, modelo de dados, privacidade, build/CI e dependências do produto não foram editados. Artefatos de `dist/app/` foram regenerados pelo build existente. Arquivos clínicos e referências originais em `shared/data/` permaneceram intactos.

## Escopo por onda e arquivos

| Onda | Arquivos principais | Finalidade / resultado |
|---|---|---|
| 1 — estrutura | `app/src/components/HealthComponents.tsx`, `app/src/lib/healthPresentation.ts`, `app/src/lib/useHealthCatalogue.ts`, `app/src/pages/HealthLibrary.tsx`, `app/src/index.css` | Componentes reutilizáveis, S0/S1, nomes, busca, nove sistemas, filtros, cache, estados e estilos com tokens existentes. |
| 1 — linguagem | `app/src/pages/Home.tsx`, `app/src/pages/Faq.tsx` | Nomes populares/técnicos e expansão textual da tabela de siglas, sem editar dados compartilhados. |
| 2 — detalhe/acervo | `app/src/pages/DiseaseDetail.tsx`, `app/src/components/HealthDeepContent.tsx` | S2 padronizada com marcadores clínicos e acordeão; S3 com quatro blocos e acervo paginado preservado. |
| 2 — atendimento | `app/src/pages/MapUbs.tsx` | Até dez serviços, tipo, endereço, distância quando possível, telefone/rota e “Antes de ir”. Sem inventar encaminhamento clínico. |
| 3 — verificação | `scripts/test-health.mjs`, `scripts/test-health-browser.mjs`, `scripts/health-ui.snap.json` | Funções/dados, snapshots de árvore acessível e testes de navegador; não substituem usuários/leitores de tela. |
| 3 — documentação | `PENDENCIAS_CONTEUDO.md`, este relatório, README e `docs/evidencias-saude/` | Lacunas, critérios, reprodução e capturas. |

## Critérios de aceite

“Atendido” refere-se somente ao enunciado técnico descrito, na versão e ambiente testados. “Não atendido” inclui implementação parcial. “NÃO VERIFICADO” não significa aprovado. P0: CA-01 a CA-13 e CA-16; P1: CA-14 e CA-15.

| Critério | Prioridade | Status | Evidência e limite |
|---|---|---|---|
| CA-01 — Nenhuma sigla não explicada em S0–S4 | P0 | **Não atendido** | Tabela de expansão testada e aplicada na apresentação; não há auditoria integral do acervo, rótulos da rede nem do restante do app. |
| CA-02 — Pressão alta / Hipertensão arterial na camada 1 | P0 | **Atendido** | Mapeamento testado e snapshot `S0-ready` com os dois nomes. |
| CA-03 — S0 com sete blocos e seis cards | P0 | **Atendido** | Seis cards, três intenções, sete blocos na contagem documentada (header, contexto, busca, intenções, destaques, ver todas, rodapé). 43 palavras na dobra a 360×800. O atalho de anotações informa indisponibilidade. |
| CA-04 — S2 com cinco blocos e até 180 palavras | P0 | **Atendido (estrutura atual)** | Cinco blocos e 82–89 palavras nas seis condições. Contagem do artigo inteiro é conservadora em relação à dobra. Texto contém marcadores; repetir após aprovação clínica. |
| CA-05 — Acordeão fechado por padrão | P0 | **Atendido** | `aria-expanded=false` verificado em cada uma das seis condições. |
| CA-06 — Evidência a dois toques de S2 | P0 | **Atendido (acervo interno)** | Clique em “Entenda melhor” e no link de ciência abre S3/#science; teste alcança estudo/referência existente. “Ver fonte” segue para bibliografia interna. URLs originais/DOIs continuam pendentes. |
| CA-07 — Seis condições no mesmo padrão | P0 | **Atendido (estrutura atual)** | Seis renders/snapshots; cinco blocos, três slots de sinais, três slots de ações. Não equivale a seis textos clínicos aprovados. |
| CA-08 — S1 só primeira seção aberta e três chips | P0 | **Atendido** | Nove sistemas, uma seção aberta e três botões de seleção única. União de coração/circulação/pulmões resolve divergência da especificação. |
| CA-09 — Quatro estados em S0/S1/S2 | P0 | **Atendido (app já aberto)** | Capturas/snapshots de carregando, vazio, erro e offline nas três telas; retry testado. Cache corrompido/atrasado por fixture, rede realmente desativada no navegador. Não prova cold start offline. |
| CA-10 — Contraste de texto ≥4,5:1 | P0 | **NÃO VERIFICADO integralmente** | Dois pares principais calculados: 15,67:1 e 7,31:1. Não há auditoria de todas as combinações, estados e controles globais. |
| CA-11 — Leitor anuncia popular, técnico e selos | P0 | **NÃO VERIFICADO** | Texto presente na árvore acessível e semântica nativa; faltam VoiceOver/TalkBack reais, ordem de foco e avaliação humana. |
| CA-12 — Busca popular tolerante a erro | P0 | **Atendido** | Vinte consultas com nomes populares/técnicos, acentos e erros aprovadas, além de busca sem correspondência. Busca por sintomas validada não implementada. |
| CA-13 — Aviso legal em S1–S4 | P0 | **Atendido** | Todas usam `HealthLayout` com rodapé literal; capturas incluem o aviso (também em S0). CSS de 13px e cores principais contrastantes. |
| CA-14 — Abertura <2s em 4G | P1 | **NÃO VERIFICADO** | Build e HTTP 200 não medem 4G. Timeout do skeleton de 2s não é prova de desempenho. |
| CA-15 — S4 ordenada por proximidade | P1 | **Não atendido para toda a rede** | Hospitais com coordenadas ordenados corretamente com localização simulada; outras unidades têm dados incompletos e ordem alfabética explícita. Sem autorização, não solicita localização. |
| CA-16 — Cinco usuários; 90% compreendem o que é/o que fazer | P0 | **NÃO VERIFICADO** | Teste humano não executado e conteúdo cidadão ainda pendente. Bloqueia aceite. |

## Métricas e testes executados

- Build de produção do monorepo: `npm run build` — sucesso (TypeScript, site, app, exportação SQLite e assemble existentes).
- Lint: `npm run lint --prefix app` — zero erros e zero avisos.
- `node scripts/test-health.mjs` — **32 verificações** aprovadas, incluindo vinte consultas, 44 condições sem perdas/duplicações em nove sistemas, paginação preservando palavras do acervo, distância e contraste dos dois pares.
- `node scripts/test-health-browser.mjs` — **23 snapshots de árvore acessível** comparados com baseline; seis condições, estados, retry e hospitais. Zero `pageerror` no cenário.
- Viewport Chromium: **360×800**; localização sintética: latitude −15,78, longitude −47,88. Não foi usado dado de paciente.
- S0: **sete blocos**, **43 palavras na dobra**. O script registra a contagem da dobra; a conferência do limite de 60 está documentada aqui.
- Palavras do artigo S2: anemia 82; pressão alta 87; diabetes 89; mioma 82; lúpus 82; doença renal 84. **Incluem placeholders**, não o conteúdo final.
- Distâncias hospitalares exibidas (km em linha reta): 0,3; 11,5; 11,7; 15,1; 19,9; 24,6; 24,9; 29,1; 30,2; 30,9.
- S0 com fonte raiz a 200%: sem overflow horizontal no teste. Não cobre automaticamente S1–S4 nem toda configuração de zoom/dispositivo.
- Contraste calculado: `#06201B/#F7F5F0` **15,67:1**; `#1A5C3A/#F7F5F0` **7,31:1**.
- Build avisa chunk app >500kB (~601kB JS, ~182kB gzip) e imports dinâmicos que não geram chunk separado. A instalação reportou vulnerabilidades existentes (uma moderada e duas altas); nenhuma dependência de segurança foi atualizada neste escopo.

## Capturas e estados

As evidências estão em [`evidencias-saude/`](evidencias-saude/) e `scripts/health-ui.snap.json`. PNGs são capturas, **não testes de regressão visual pixel a pixel**. Os snapshots comparados são da árvore acessível.

- `S0-ready.png`: busca, três intenções e seis destaques; `S0-grayscale.png`: conferência visual sem cor; `S0-font-200.png`: escala de texto.
- `S1-ready.png`: primeiro sistema aberto e demais fechados.
- `S2-<id>.png`: cada uma das seis condições com marcador, três sinais e três ações, acordeão fechado.
- `S3-science.png`: estudo/achado/fontes no aprofundamento, quatro blocos paginados.
- `S4-location.png`: hospitais com distância crescente e lembrete “Antes de ir”.
- `S0/S1/S2-loading.png`: skeleton e “Buscando informações…”.
- `S0/S1/S2-empty.png`: mensagem de ausência, exemplo de nome popular e retorno à lista.
- `S0/S1/S2-error.png`: alerta legível e “Tentar de novo”; não tela branca.
- `S0/S1/S2-offline.png`: aviso de conteúdo salvo, condicionado a aberturas anteriores.
- `metrics.json`: números extraídos pelo teste; `build.txt`: saída do build registrado.

## Como reproduzir

Na raiz, com dependências do repositório instaladas:

```bash
npm run build
pm2 start ecosystem.config.cjs   # se o serviço ainda não estiver iniciado
npm run lint --prefix app
node scripts/test-health.mjs
node scripts/test-health-browser.mjs
```

O navegador de QA requer Playwright instalado **fora dos manifests do produto**. No sandbox usado:

```bash
npm install --prefix .qa-tools --no-package-lock --no-save playwright
.qa-tools/node_modules/.bin/playwright install chromium
# Se faltarem bibliotecas Linux:
sudo .qa-tools/node_modules/.bin/playwright install-deps chromium
```

Por padrão, o script importa `.qa-tools/node_modules/playwright/index.mjs` e testa `http://localhost:3000`. É possível definir `PLAYWRIGHT_MODULE` (caminho/URL de módulo) e `HEALTH_TEST_URL`. Usar `--update` somente após revisão intencional de baseline. `.qa-tools/` é ferramenta local, não dependência entregue; o teste injeta onboarding/consentimento somente no contexto sintético do navegador, sem editar os fluxos do produto.

## Riscos e próximos passos

1. Resolver `PENDENCIAS_CONTEUDO.md` com equipe da saúde, incluindo definição/sinais/ações das seis condições e referências originais.
2. Concluir mapeamento condição–serviço e cadastro da rede. O parâmetro é preservado, mas não é filtro clínico.
3. Avaliar governança dos marcadores locais de leitura (IDs de condições abertas), retenção e eventual opção de limpeza. O cache não guarda nova localização nem notas, mas histórico de leitura pode ser sensível.
4. Concluir auditoria de siglas, tradução dos novos controles e classificação editorial.
5. Executar acessibilidade humana em leitores reais, medir 4G e teste com cinco usuários.
6. Homologar antes de declarar aceite. O repositório é web React; não há build iOS/Android instalável nesta entrega.

**Deploy:** nenhum deploy manual foi realizado nesta atividade. O README registra automação Workers Builds em `main`; um push pode dispará-la. Isso não comprova que a versão foi publicada nem que está aprovada para uso clínico.
