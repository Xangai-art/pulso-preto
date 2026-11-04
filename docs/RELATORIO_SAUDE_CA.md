# Aba Saúde — relatório verificável CA-01 a CA-16

**Data:** 04/11/2026. **Repositório:** Xangai-art/pulso-preto. **Base desta integração:** `370c0f868391d2b00eb95535c03b218526a7e7c3`.

## Parecer e escopo

**Integração técnica das seis fichas propostas concluída; homologação clínica e humana pendente.** Este relatório substitui as medições da versão com marcadores vazios. Não declara certificação WCAG, aprovação médica, instalação nativa ou publicação em produção.

Autoridades de conteúdo: `conteudo-saude.v1.json.txt` e `ESPECIFICACAO_CONTEUDO_SAUDE_v1.0.md`, fornecidos pelo usuário. O JSON foi copiado integralmente para `shared/data/condicoes.saude.v1.json`; todas as seis condições continuam propostas. A apresentação não reproduz a redação contraditória que chamava essas fichas de validadas. Aprovação requer status e assinatura clínica completos.

Arquitetura existente React/Vite/Worker, site institucional, rotas, onboarding, consentimentos e acervo científico preservados. Foram alterados componentes Saúde, navegação bilíngue, carregamento lazy das páginas, estilos e scripts de testes/build. Adicionados adaptadores editoriais, glossário, dicionários PT/ES e schema/snapshot da rede. `dist/app/` regenerado. Nenhum backend novo, anotações pessoais ou histórico de leitura foi criado.

## Critérios de aceite

“Atendido tecnicamente” vale apenas para o comportamento testado. Critérios dependentes de validação humana permanecem abertos. Prioridade P0: CA-01 a CA-13 e CA-16; P1: CA-14 e CA-15.

| Critério | Estado atual | Evidência e limite |
|---|---|---|
| CA-01 — Siglas explicadas em S0–S4 | Parcial | Glossário, expansão textual e `abbr` com nome acessível; auditoria automatizada nas seis fichas. Acervo completo e primeira ocorrência em rerenders independentes/StrictMode ainda requerem revisão. |
| CA-02 — Pressão alta / Hipertensão arterial | Atendido tecnicamente | Nomes popular/técnico vindos do pacote editorial; testes de nomenclatura e browser. |
| CA-03 — S0 e seis cards | Atendido tecnicamente para seis cards | Seis destaques, busca e intenções; anotações desabilitadas. Não reutilizar a antiga contagem de palavras da versão com marcadores. |
| CA-04 — S2 e limite de texto | Parcial | Definições de 2–3 frases e até 55 palavras, três sinais e três ações verificados. Artigo completo agora inclui alertas, fontes e avisos; limite global de 180 palavras não certificado. |
| CA-05 — Aprofundamento fechado | Atendido tecnicamente | Controle nativo fechado por padrão; seis snapshots. |
| CA-06 — Acesso à evidência | Atendido tecnicamente para links | Fontes oficiais diretas, `noopener noreferrer` e acervo preservado. Nove URLs únicas responderam 200; correspondência científica continua sujeita à revisão. |
| CA-07 — Seis condições no mesmo padrão | Atendido tecnicamente | Definição, três sinais, alerta antes das três ações, fontes e selo de revisão. Não equivale a aprovação clínica. |
| CA-08 — S1 e filtros | Atendido conforme nova especificação | Nove sistemas, eixo transversal e grupo sem classificação; primeira seção aberta, três filtros editoriais. Não usa subtítulo de categoria como risco individual. |
| CA-09 — Estados | Parcial | Estados de carregamento/erro/vazio/offline implementados; regressão atual verifica vazio e offline após abertura. Não cobre todos os estados em todas as telas nem cold start. |
| CA-10 — Contraste | Parcial | Pares principais 15,67:1 e 7,31:1; axe sem violações nos cenários medidos. Não há certificação integral de todos os estados/dispositivos. |
| CA-11 — Leitores de tela | Não verificado humanamente | Semântica, foco e árvore acessível testados. Faltam VoiceOver/TalkBack reais. |
| CA-12 — Busca tolerante | Atendido tecnicamente | Vinte consultas, aliases e exclusões clínicas. Vocabulário de 42 sintomas com associações conservadoras, não triagem assinada. |
| CA-13 — Aviso legal | Atendido tecnicamente | Layout compartilhado S0–S4, aviso de conteúdo informativo e filtros sem risco individual; tradução da interface. |
| CA-14 — Abertura <2s em 4G | Não verificado | Rotas lazy reduzem entrada JS; não foram executadas três medições Lighthouse/4G. Timeout de oito segundos não é métrica. |
| CA-15 — Rede por proximidade | Parcial | Algoritmo testado com UBS/UPA/hospital, geo conhecida ou ausente; browser verifica hospitais. Dados reais incompletos impedem ordenar toda a rede por distância. |
| CA-16 — Compreensão ≥90% | Não verificado | Cinco usuários e pelo menos 36/40 tarefas ainda pendentes. |

## Evidências atuais

- Build completo `npm run build`: aprovado, incluindo exportação/verificação SQLite, site, app e montagem de `dist/`.
- `npm --prefix app run lint`: **zero erros e zero avisos**.
- `node scripts/test-health.mjs`: **47 verificações aprovadas**; pré-build executa 46, antes de verificar o bundle final.
- `node scripts/test-health-browser.mjs`: **15 snapshots comparados sem `--update`**, todos aprovados; zero `pageerror` e nenhuma violação axe séria/crítica nos cenários verificados.
- Chromium 360×800, consentimento/onboarding sintéticos, localização simulada −15,78/−47,88. Nenhum dado de paciente utilizado.
- Cenários: S0, S1, urgência, vazio, seis S2, acervo, rede com geo, offline já aberto, espanhol e S0 com fonte a 200% sem overflow horizontal.
- Browser verifica migração do cache legado, ausência de IDs lidos, lista idêntica com/sem `condicao`, links/fontes, anotações desabilitadas e precedência do alerta.
- Snapshots versionados: `scripts/health-ui.snap.json`. Capturas e métricas atuais: `.qa-tools/artifacts/`, locais e ignoradas pelo Git. `docs/evidencias-saude/` contém evidência histórica, não prova atual das novas fichas. PNGs não são comparação visual pixel a pixel.

### Desempenho e dependências

Entrada app após divisão por rotas: aproximadamente **245,42 KB / 79,25 KB gzip**, contra 640,24 KB / 192,66 KB gzip antes da divisão nesta integração. Há chunks adicionais necessários à rota; esses números não são o total inicial, LCP ou TTI. Acervo científico separado: 219,39 KB / 62,09 KB gzip. Catálogo atende ao teste de orçamento de 120 KB gzip. Meta <2s em 4G não comprovada.

O site institucional ainda emite aviso de chunk >500 KB. Instalação existente reportou três vulnerabilidades (uma moderada, duas altas); correção de dependências não foi realizada neste escopo.

## Contratos e privacidade

- Fonte clínica versionada, proposta e em português; interface espanhola não se apresenta como tradução clínica aprovada.
- Arrays de FAQ fornecidos vazios: ausência informada, sem respostas inventadas. Suporte a futuros arrays preenchidos permanece como evolução.
- Rede normalizada em `healthServices.ts`, snapshot `servicos.v1.json` conferido pelo teste. Faltas de coleta, precisão, responsável e atualização ficam explícitas. Todos os registros permanecem pendentes de validação.
- `?condicao=` preservado apenas como contexto, nunca como filtro/encaminhamento.
- Cache `pulso-health-catalogue-v1.0`: somente catálogo público e versão; cache legado `pulso-health-editorial-v1` apagado. Localização transitória, sem persistência nova de notas, condição lida ou sessão.
- Sem Service Worker, instalador, promessa de abertura a frio ou novo armazenamento de dados de saúde.

## Reprodução

```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs  # se ainda não iniciado; usa wrangler dev, porta 3000
curl http://localhost:3000/app/saude
npm --prefix app run lint
npm run test:health
npm run test:health:browser
```

QA de navegador usa dependências locais, não manifests do produto:

```bash
npm install --prefix .qa-tools --no-package-lock --no-save playwright @axe-core/playwright
.qa-tools/node_modules/.bin/playwright install chromium
# Somente se faltarem bibliotecas do sistema:
sudo .qa-tools/node_modules/.bin/playwright install-deps chromium
```

URL padrão `http://localhost:3000`; pode ser substituída por `HEALTH_TEST_URL`. `PLAYWRIGHT_MODULE` permite outro caminho do módulo. Usar `--update` somente para alteração de baseline revisada, nunca para ocultar regressão.

## Gates restantes e publicação

Consultar `PENDENCIAS_CONTEUDO.md`: assinatura clínica, validação de equidade/fontes, rede real e geocodificação, revisão bilíngue, siglas do acervo, classificação/sintomas, acessibilidade humana, compreensão e desempenho 4G.

Nenhum push ou deploy realizado nesta entrega. `main` pode disparar Workers Builds quando enviado ao remoto; commit local não publica nem aprova conteúdo clínico. URL de produção desta revisão não foi verificada.
