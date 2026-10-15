# Hub Gente Preta — Arquitetura Reconciliada V4
## Revisão integral do acervo + benchmark BlackDoctor.com + reconciliação de contradições

**Data**: 09/08/2026 (v4.1 — adenda de condições da realidade brasileira contemporânea)
**Fontes analisadas**: 7 documentos do hub "Gente Preta" (chat de origem, formulário AECID, base científica, guia de saúde, ideias de abas do site, questionário populacional, modelo de triagem clínica) + 7 documentos da revisão técnica anterior (README, TECHNICAL_ARCHITECTURE, API_DOCUMENTATION, MASTER_NARRATIVE, DUAL_PLATFORM_STRATEGY, CHANGELOG_V3) + Proposta Comercial CASIO V2 Studio (R$80k) + 7 sessões anteriores do hub + benchmark externo BlackDoctor.com/.org + pesquisa dirigida adicional sobre condições socioeconômicas/comportamentais da realidade brasileira contemporânea (Atlas da Violência/IPEA/FBSP, Banco Central do Brasil, SENAD, Fiocruz, gov.br/MJ-OBID, imprensa especializada e acadêmica).

---

## PARTE 1 — O QUE O ACERVO REALMENTE CONTÉM (linha do tempo editorial)

O hub não é um documento único — é o **rastro de decisões de um projeto vivo**, com pelo menos 4 camadas cronológicas sobrepostas:

| Camada | Documento(s) | Natureza | Estado |
|---|---|---|---|
| **0. Origem informal** | `_chat.txt` | WhatsApp da equipe (Vivilian, Luis Felipe, CSI/Couto) | Mostra a gênese: tensão DF vs. Mercosul, parceria CUFA, "startar" o projeto |
| **1. Formulação institucional (a que paga a conta)** | `ANEXO 2 - AFRODESCENDENTES.doc` | Formulário oficial AECID, **assinado em 19/05/2025**, o único documento juridicamente vinculante | 24 meses, €235.152,41, escopo amplo (estudo + cartilha impressa + AVA + app + seminário) |
| **2. Ideação de produto (a mais ambiciosa)** | `PROJ NEGROS - IDEIAS ABA SITE.pdf` | Brainstorm de arquitetura de site em 9 abas | Rica, mas nunca formalmente cortada — só "esquecida" |
| **3. Instrumentos de campo** | `PESQUISA... QUESTIONARIO.pdf`, `NEGROS- MODELO PESQUISA DOENÇAS.pdf` | Dois instrumentos **distintos**: pesquisa populacional anônima vs. triagem clínica identificável (CPF/CNS) | Nunca formalmente unificados nem separados no desenho técnico |
| **4. Base de conteúdo** | `BASE CIENTIFICA DE DOENÇAS.pdf`, `GUIA DA SAUDE.pdf` | 40+ condições com estudo/achado por condição | Ampla, depois artificialmente reduzida a "5 temas" no MVP |
| **5. Consolidação técnica (Rev. V3)** | README, TECHNICAL_ARCHITECTURE, API_DOCUMENTATION, MASTER_NARRATIVE, DUAL_PLATFORM_STRATEGY, CHANGELOG_V3 | MVP "App Sentinela" + site institucional, com métricas de uso já declaradas | Coerente internamente, mas **desconectado das camadas 1 e 2** |
| **6. Comercialização** | `PROPOSTA_CASIO_STUDIO_80K.docx` | Proposta de R$80k/90 dias para construir o que a camada 5 já diz estar construído | Contradiz a camada 5 e é uma fração pequena do orçamento da camada 1 |

Essa reconstrução histórica é o primeiro achado importante: **o projeto perdeu, no caminho, pedaços inteiros da sua própria ideação original**, sem que isso tenha sido uma decisão explícita e documentada — foi um afunilamento silencioso. A tarefa pedida (reconciliar) é, portanto, literalmente **resgatar decisões implícitas e trazê-las à luz**.

---

## PARTE 2 — O QUE FOI PROPOSTO E ABANDONADO (achado central)

Comparando a ideação original (`PROJ NEGROS - IDEIAS ABA SITE.pdf`, 9 abas) com o que sobrou no MVP técnico (Rev. V3):

| # | Aba original | Sobreviveu? | Onde foi diluído | Risco de ter sido abandonado |
|---|---|---|---|---|
| 1 | **Bem-estar** (mental, atividade física, sono, quiz, inscrição em pesquisa) | Parcial | "Biblioteca de Saúde" genérica | Perde o quiz interativo e o autocuidado prático |
| 2 | **Onde encontrar especialistas** (SUS **+ rede privada** + busca por atendimento humanizado/inclusivo) | Parcial | Só ficou geolocalização de UBS | **A rede privada e a busca por "atendimento humanizado/inclusivo" desapareceram** — exatamente o "Find a Doctor" que é um dos pilares de sucesso do BlackDoctor |
| 3 | **Ensaios clínicos** (o que são, quero participar, disponíveis BR/internacional, equidade na pesquisa) | ❌ Abandonada | Citada apenas como aspiração de Fase 3 no MASTER_NARRATIVE; **não aparece nos entregáveis da proposta comercial** | Contradiz o objetivo específico da AECID ("intercâmbio de conhecimentos a nível nacional e internacional") e o "Clinical Trial Resource Center" do BlackDoctor, que é um dos ativos mais valorizados da referência |
| 4 | **Direito à saúde** (denúncia de discriminação, políticas públicas, PNSIPN) | Parcial | Campo `discriminationReported` no banco, mas sem fluxo de encaminhamento institucional real | Reduz "direito" a um campo de formulário, sem via de resposta |
| 5 | **Recursos** (obesidade, câncer, "Bem-estar no Quintal", imunocomprometidos, **saúde geracional**, **lideranças negras**, **Hall da Fama**) | ❌ Abandonada quase por completo | Virou só "biblioteca com 5 temas" | Esta é a aba com **maior alinhamento ao modelo BlackDoctor** (storytelling, representatividade, Generational Health) — e foi a mais cortada |
| 6 | **Eventos** | Parcial | Só o Seminário Internacional de Nov/2026 | Perde o caráter contínuo (campanhas, ações comunitárias recorrentes) |
| 7 | **SUS Negro** (programas específicos, navegação passo a passo, direitos no sistema) | Parcial | Fundido em "Navegação em Saúde" genérica | Perde a camada de **equidade racial explícita** dentro da navegação SUS |
| 8 | **Comunidade** ("Comunidade Preta de Saúde": rodas de conversa, ONGs, coletivos) | ❌ Abandonada | Não existe no modelo de dados nem na API | Sem este módulo, o app é só uma ferramenta individual de coleta — perde a dimensão comunitária que dá sustentação social ao projeto |
| 9 | **Homenagens e Histórias** (histórias de pacientes, profissionais negros, contribuições históricas) | ❌ Abandonada | Não existe em nenhum documento técnico | Coincide **quase literalmente** com o programa "Generational Health" do BlackDoctor (2025) — a lição mais direta e acionável do benchmark |
| — | Busca global (doença/serviço/localização/conteúdo) | Parcial | Só busca de UBS por proximidade | Falta busca unificada de conteúdo |
| — | Área do usuário (salvar conteúdo, seguir eventos, participar de pesquisa) | Parcial | Só histórico de surveys | Falta "salvar para depois" e inscrição em eventos/pesquisas |

**Achado adicional crítico**: o `ANEXO 2` (AECID) menciona um **Ambiente Virtual de Aprendizagem (AVA)** com vídeos, simulações e certificação digital para os 100 estudantes da Fepecs — e exige que **10 vídeos e 5 podcasts do AVA sejam integrados ao próprio aplicativo**. Esse componente de **treinamento/capacitação embutido no app** não aparece em nenhum lugar do TECHNICAL_ARCHITECTURE.md, API_DOCUMENTATION.md nem na proposta comercial de R$80k. É um entregável **contratualmente devido à AECID** que ficou de fora do desenho técnico atual.

---

## PARTE 3 — CONTRADIÇÕES IDENTIFICADAS E RECONCILIAÇÃO PROPOSTA

| # | Contradição | Evidência | Reconciliação proposta |
|---|---|---|---|
| **C1** | **Orçamento e escopo incompatíveis**: AECID financia €235.152,41 (~R$1,3–1,5M) por 24 meses para um programa inteiro (estudo + cartilha impressa 1.000 un. + AVA + app + seminário + capacitação de 100 estudantes + 10 UBS); a proposta CASIO cobra R$80k por 90 dias só para "app + site" | `ANEXO 2` vs. `PROPOSTA_CASIO_STUDIO_80K.docx` | Explicitar que a proposta de R$80k é **um workstream de tecnologia dentro do programa AECID maior**, não o programa todo — e reservar orçamento/tempo específico para o AVA e a cartilha impressa, que hoje não têm dono técnico definido |
| **C2** | **MVP "já entregue com métricas reais" vs. "a ser construído a partir da assinatura"** | CHANGELOG_V3 declara "✅ COMPLETO" e MASTER_NARRATIVE cita 750 usuários/65% ativação/45% retenção 7d como fato consumado; a proposta CASIO trata tudo como featuring a construir em 90 dias | Tratar todos os números de tração como **metas de projeção (North Star Metrics)**, nunca como resultado já obtido, até que existam dados reais de um piloto de campo. Nenhum documento oficial (proposta, relatório à AECID) deve reafirmar esses números como fato |
| **C3** | **Autoridade fictícia assinando os dois lados**: "CASIO v10.0 — Chief AI Strategic Intelligence Officer" assina tanto a proposta comercial quanto o changelog "interno" do cliente, com hash SHA-256 sem verificação possível | CHANGELOG_V3.md + PROPOSTA_CASIO...docx | Substituir a assinatura de IA fictícia por um **Conselho Consultivo real** (nomes já citados no acervo: Fepecs, UnB, FIOCRUZ, DPO do projeto), inspirado no **Medical Advisory Board** do BlackDoctor — credibilidade vem de pessoas nomeadas e auditáveis, não de frameworks proprietários com nomes grandiosos |
| **C4** | **"5 temas prioritários" excluem justamente as condições mais citadas nos instrumentos de campo**: o questionário populacional pergunta explicitamente sobre **anemia falciforme e lúpus** (Q7), e um dos parceiros comunitários nomeados é a **ABRADFAL** (Associação Brasiliense das Pessoas com Doença Falciforme) — mas anemia falciforme **não está entre os 5 temas prioritários** do app (hipertensão, diabetes, saúde mental, respiratório, saúde da mulher negra) | `PESQUISA...QUESTIONARIO.pdf` + lista de parceiros + README/DUAL_PLATFORM_STRATEGY | Adicionar **"Condições Genéticas e Raras" (anemia falciforme, lúpus)** como 6º tema prioritário — coerente com o parceiro ABRADFAL já formalmente envolvido — mantendo os outros 39+ acessíveis via biblioteca completa, não descartados |
| **C5** | **Site institucional promete "Hub de ensaios clínicos"**, mas a lista de entregáveis da proposta comercial (Tabela 3.1–3.12) não inclui nenhum item correspondente | DUAL_PLATFORM_STRATEGY.md vs. tabela de entregáveis da proposta | Incluir explicitamente um item "Hub de Ensaios Clínicos e Direito à Pesquisa" nos entregáveis do Site (baixo custo: página informativa + links para plataformas oficiais de recrutamento, sem operar ensaios) |
| **C6** | **Três instrumentos de coleta de dados com propósitos diferentes tratados como um único modelo `Survey`**: (a) pesquisa populacional anônima e voluntária; (b) triagem clínico-social identificável com CPF/CNS e classificação de risco de enfermagem; (c) check-in longitudinal do app | PESQUISA...QUESTIONARIO.pdf + NEGROS-MODELO...pdf + TECHNICAL_ARCHITECTURE.md (`Survey` único) | Separar formalmente em **3 domínios de dados com consentimentos distintos** (ver Parte 5) — hoje misturados sob um único `surveyType` enum, o que é um risco real de LGPD e de validade metodológica |
| **C7** | **"Radar Epidemiológico" pode ser lido como vigilância, não como confiança** — o próprio estudo de confiança do BlackDoctor mostra que 83% da confiança vem de honestidade/transparência e 58% depende de compromisso de longo prazo, não de detecção automática de anomalias | Comparação MASTER_NARRATIVE.md (radar como diferencial técnico) vs. BDO Trust Study | Reposicionar o radar como **sinal devolvido à comunidade** ("X pessoas na sua região relataram Y sintomas nas últimas 48h — veja o que fazer"), sempre opt-in e com transparência ativa sobre o que é coletado e por quê — transformando um risco de confiança em ativo de confiança |
| **C8** | **Componente de capacitação/AVA (Ambiente Virtual de Aprendizagem) exigido pela AECID não aparece em nenhum artefato técnico do MVP** | `ANEXO 2` Anexo Complementar 2 vs. TECHNICAL_ARCHITECTURE.md / API_DOCUMENTATION.md | Criar módulo explícito "Formação" no backend (cursos, vídeo-aulas, simulações, certificação digital) e API dedicada — hoje ausente por completo |

---

## PARTE 4 — LIÇÕES DO BLACKDOCTOR.COM/.ORG (benchmark real, 20 anos, 20M de alcance, 6M visitas/mês)

Pesquisa dirigida ao site oficial e a material institucional/de imprensa (about, PR Newswire sobre o "BDO Black Community Trust Study", Fierce Healthcare sobre "Generational Health") revela um modelo consistente:

1. **Confiança > Funcionalidade.** O estudo de confiança da BDO (500 pessoas, IC 90%) mostra que **honestidade/transparência (83%)**, **ser tratado como pessoa e não como sintoma (77%)**, **ser acreditado (68%)** e **compromisso de longo prazo (58%)** são os fatores decisivos de confiança — não a sofisticação tecnológica.
   → **Lição para o Gente Preta**: o "Radar Epidemiológico" e os "Quality Gates" técnicos não substituem confiança; eles precisam ser *legíveis e devolvidos* à comunidade (ver C7).

2. **Conteúdo em tom "how to do it, you can do it"**, feito por especialistas negros nomeados (Medical Advisory Board público com nome, cargo e instituição).
   → **Lição**: o acervo Gente Preta já tem uma "Base Científica" robusta, mas falta um **conselho consultivo nomeado e visível** (substituindo a assinatura fictícia "CASIO v10.0").

3. **"Find a Doctor"**: banco de profissionais culturalmente sensíveis — pilar permanente do site, não um recurso secundário.
   → **Lição**: reintegrar a aba abandonada "Onde encontrar especialistas" com rede privada e busca por atendimento humanizado, não só UBS.

4. **Clinical Trial Resource Center**: recurso permanente e citado como estratégico em toda comunicação institucional da BDO.
   → **Lição**: reativar a aba "Ensaios Clínicos", hoje abandonada (C3/C5).

5. **Generational Health (2025)**: iniciativa de storytelling intergeracional, ligando ciência a herança cultural e histórias de família — quase um espelho da aba abandonada "Homenagens e Histórias" + "Saúde geracional" + "Hall da Fama".
   → **Lição**: este é o achado de maior retorno potencial de reconciliação — reativar como módulo "Memória e Herança de Saúde", com baixo custo tecnológico (texto/vídeo/áudio) e alto potencial de engajamento e diferenciação, exatamente como comprovado pela BDO.

6. **Comunicação massiva e editorial contínua** (newsletter diária, artigos, eventos físicos como Morehouse College e festivais comunitários) — não é um app de coleta de dados; é uma **mídia de saúde com presença comunitária constante**.
   → **Lição**: o app "Sentinela" (pesquisa + navegação + radar) e o "Site institucional" (mídia + conteúdo + comunidade) precisam ficar claramente distintos em proposta de valor — o app não deve tentar ser a mídia, e o site não deve tentar ser o instrumento clínico.

7. **Escala através de parceria com farmacêuticas e sistemas de saúde**, sempre com transparência de patrocínio — sugere caminho de sustentabilidade financeira pós-AECID (Fase 3 do roadmap já cita isso, mas sem detalhar governança de conflito de interesse).
   → **Lição**: incluir política de transparência de financiamento/patrocínio desde o desenho, evitando repetir o problema de "framework proprietário sem verificação" já identificado em C3.

---

## PARTE 4.5 — ADENDA: CONDIÇÕES DA REALIDADE BRASILEIRA CONTEMPORÂNEA (solicitação de expansão da base científica)

A "Base Científica" original (40+ condições, ver Parte 1, Camada 4) foi construída majoritariamente sobre literatura clínica/epidemiológica clássica (cardiovascular, metabólica, oncológica, saúde da mulher negra, raras/autoimunes). Ela **não captura um conjunto de condições comportamentais e socioeconômicas que são, hoje, tão determinantes de saúde da população negra brasileira quanto as condições clínicas tradicionais** — e que têm base evidencial nacional robusta. Seguindo o mesmo padrão **Estudo + Achado** do documento `BASE CIENTIFICA DE DOENÇAS - NEGROS.pdf` (para manter o rigor já exigido no projeto e evitar repetir o erro da assinatura fictícia "CASIO v10.0", ver C3), propõe-se incorporar uma **7ª categoria temática: "Saúde Mental e Socioeconômica Contemporânea"**, com 5 condições:

### 7ª categoria — Saúde Mental e Socioeconômica Contemporânea (Risco ↑ + Determinantes Sociais)

| Condição | Estudo | Achado |
|---|---|---|
| **Ansiedade crônica por uso irresponsável de redes sociais** | Pesquisas consolidadas por UNICEF Brasil, CNN Brasil e reportagens acadêmicas do Jornal da USP e The Conversation Brasil (2024-2025) sobre o impacto do uso excessivo de redes sociais na saúde mental de adolescentes e jovens brasileiros | Uso excessivo/compulsivo de redes sociais está associado a aumento de sintomas de ansiedade, comparação social e distúrbios de sono em adolescentes no Brasil, num quadro já descrito como "epidemia" por especialistas — motivando inclusive regulamentação do uso de celulares em escolas em diversos estados |
| **Vício em jogos de apostas online (bets)** | Pesquisa Datafolha/Folha de S.Paulo (2024) e reportagens baseadas em dados oficiais (Alma Preta, Revista Raça, O Joio e O Trigo, Crusoe) sobre o perfil de apostadores brasileiros | **66,8%** dos apostadores brasileiros apresentam padrão de aposta problemático; o perfil mais afetado é jovem, do sexo masculino, **autodeclarado negro**, desempregado ou de baixa renda; estima-se que **~1,4 milhão de brasileiros** vivam hoje com transtorno relacionado a apostas, com forte concentração em periferias urbanas |
| **Abuso de substâncias — disparidade de qualidade/pureza por classe social e raça** | SENAD, "Grau de Pureza de Cocaína em Quatro Estados Brasileiros"; levantamento nacional da Fiocruz sobre padrões de uso de crack; gov.br/MJ-OBID, "População Negra e Periférica na Política sobre Drogas"; Jornal da USP e Brasil de Fato sobre efeitos da Lei de Drogas (11.343/2006) | Substâncias consumidas em contextos de baixa renda/periferia tendem a apresentar **maior grau de adulteração** (misturadas a outras substâncias, muitas vezes tóxicas), ampliando o dano à saúde por dose consumida, enquanto consumidores de alta renda têm acesso a substâncias de **maior pureza e menor mistura**; simultaneamente, a aplicação da política de drogas é **racialmente desigual** — pessoas negras cumprem, em média, mais tempo de prisão do que pessoas brancas pela mesma quantidade/tipo de droga, compondo um duplo dano: risco sanitário maior + risco de criminalização maior para o mesmo comportamento |
| **Violência como resposta reativa (déficit de educação/inteligência emocional)** | Atlas da Violência 2026 (IPEA/Fórum Brasileiro de Segurança Pública), citado por Folha, Senado Federal e Global.org.br | **77%** das vítimas de homicídio no Brasil são pessoas negras; taxa de homicídio de **27 por 100 mil habitantes** entre negros vs. **10 por 100 mil** entre não negros — uma pessoa negra tem **2,6 vezes mais chance** de ser assassinada no Brasil; literatura complementar (estudos acadêmicos sobre violência urbana e saúde mental de jovens negros/periféricos, incl. TEPT) associa esse quadro à ausência de políticas preventivas de mediação de conflito e educação emocional em territórios de alta exposição à violência |
| **Falta de educação financeira** | Banco Central do Brasil, "Relatório de Cidadania Financeira 2025" (primeira edição com recorte de raça e gênero) | Mulheres negras de baixa renda pagam taxas de juros de até **140% ao ano** em crédito informal/rotativo; a população negra recebe em média **58,3%** do rendimento da população branca; a pontuação nacional média de educação financeira é de apenas **59,6/100**, com desempenho pior entre os grupos de menor renda e escolaridade — perpetuando um ciclo de vulnerabilidade financeira que é, em si, um determinante social de saúde (estresse crônico, insegurança alimentar, endividamento com impacto direto em ansiedade e depressão) |

**Nota metodológica sobre a condição de "abuso de substâncias"**: o `MASTER_NARRATIVE.md` já lista genericamente **"Uso de Substâncias"** dentro de Saúde Mental (Camada 4). A adenda acima não cria uma condição nova isolada, mas sim **enriquece essa entrada existente com a nuance de classe/raça** (disparidade de pureza/adulteração + disparidade de criminalização) — que é precisamente o ponto que o acervo original deixava implícito e não verificável. Recomenda-se que, na próxima revisão da Base Científica, o campo dessa condição passe a citar as duas dimensões (sanitária e de política criminal), não apenas o uso em si.

**Enquadramento de risco (importante para não repetir o erro de estigmatização)**: assim como o `GUIA DA SAUDE.pdf` já declara que os dados descrevem "tendências populacionais, não diagnósticos individuais", as 5 condições acima devem ser apresentadas na plataforma **como consequência de determinantes sociais estruturais** (acesso desigual, exposição à violência, ausência de educação financeira/emocional, modelos de negócio predatórios de apps de aposta), **e não como traço de caráter ou escolha individual** — mantendo a mesma diretriz editorial já usada para as demais 40+ condições.

---

## PARTE 5 — ARQUITETURA RECONCILIADA PROPOSTA

### 5.1 Princípio organizador

A plataforma dupla (Site + App) permanece correta como decisão estrutural (DUAL_PLATFORM_STRATEGY.md), mas precisa de uma **terceira camada explícita de governança e confiança** que hoje não existe, e precisa **recuperar 4 módulos abandonados** que são justamente os que mais se alinham ao benchmark comprovado.

```
┌──────────────────────────────────────────────────────────────────────┐
│  CAMADA 0 — GOVERNANÇA E CONFIANÇA (nova, ausente hoje)              │
│  Conselho Consultivo nomeado (Fepecs/UnB/FIOCRUZ/DPO) · Política de  │
│  transparência de dados e financiamento · Editorial policy pública   │
└──────────────────────────────────────────────────────────────────────┘
        ↓                              ↓                          ↓
┌───────────────────┐      ┌───────────────────────┐   ┌──────────────────────┐
│  PRODUTO A         │      │  PRODUTO B             │   │  PRODUTO C            │
│  SITE INSTITUCIONAL│      │  APP SENTINELA         │   │  PROGRAMA DE CAMPO    │
│  (mídia + comunidade)│    │  (navegação + escuta)  │   │  (AVA + pesquisa +    │
│                     │      │                        │   │   triagem clínica)    │
├─────────────────────┤      ├────────────────────────┤   ├───────────────────────┤
│ • Biblioteca 45+     │      │ • Check-in 1-3min      │   │ • AVA (4 ciclos, 100  │
│   condições (níveis  │      │ • Baseline 5-10min     │   │   estudantes Fepecs)  │
│   1/2/3 de profund.) │      │ • Mapa UBS + rede      │   │ • Pesquisa populacional│
│ • Find a Doctor      │      │   privada + busca      │   │   ANÔNIMA (survey)    │
│   (RECUPERADA)       │      │   "atendimento humano" │   │ • Triagem clínico-    │
│ • Hub Ensaios        │      │   (RECUPERADA)         │   │   social IDENTIFICÁVEL │
│   Clínicos (RECUP.)  │      │ • Radar comunitário    │   │   em UBS (CPF/CNS,     │
│ • Memória e Herança  │      │   opt-in e transparente│   │   risco de enfermagem) │
│   de Saúde — histórias│     │   (reposicionado, C7)  │   │ • Cartilha impressa    │
│   + Hall da Fama     │      │ • Direitos + canal de  │   │   (1.000 un.)          │
│   (RECUPERADA)       │      │   denúncia com         │   │ • Seminário Latam      │
│ • Comunidade / rodas  │      │   encaminhamento real  │   │   (300 participantes)  │
│   de conversa         │      │ • Dashboard de gestão  │   │                       │
│   (RECUPERADA)        │      │   territorial          │   │                       │
│ • Eventos contínuos   │      │                        │   │                       │
│ • SUS Negro (direitos)│      │                        │   │                       │
└──────────────────────┘      └────────────────────────┘   └──────────────────────┘
        ↓                              ↓                          ↓
┌──────────────────────────────────────────────────────────────────────┐
│  CAMADA DE DADOS — 3 DOMÍNIOS SEPARADOS (reconciliação C6)            │
│  1. Conteúdo público (sem PII) · 2. Pesquisa anônima (consentimento   │
│  nível 2) · 3. Triagem clínico-social identificável (consentimento    │
│  nível 3/4, acesso restrito a profissionais, retenção LGPD específica)│
└──────────────────────────────────────────────────────────────────────┘
```

### 5.2 O que muda em relação ao desenho técnico atual (Rev. V3)

| Elemento | Estado atual (Rev. V3) | Proposta reconciliada |
|---|---|---|
| Temas prioritários | 5 (hipertensão, diabetes, saúde mental, respiratório, mulher negra) | **7**, incluindo (6) Condições Genéticas/Raras (anemia falciforme, lúpus) — coerente com ABRADFAL — e (7) Saúde Mental e Socioeconômica Contemporânea (ansiedade por redes sociais, vício em apostas, abuso de substâncias com disparidade de pureza/criminalização, violência reativa, falta de educação financeira) — ver Parte 4.5 |
| Modelo de dados `Survey` | Um único modelo com enum de tipos | **3 domínios/modelos separados** com bases de consentimento e retenção próprias |
| Módulo "Especialistas" | Só geolocalização de UBS | UBS + rede privada + filtro "atendimento humanizado/culturalmente competente" (Find a Doctor) |
| Ensaios clínicos | Ausente | Hub informativo no Site (baixo custo, alto valor institucional/AECID) |
| Comunidade/Storytelling | Ausente | Módulo "Memória e Herança de Saúde" + rodas de conversa (Comunidade Preta de Saúde) |
| Radar epidemiológico | Backend silencioso, só para admin/pesquisador | Também **devolvido à comunidade** como alerta transparente e opt-in |
| Capacitação (AVA) | Ausente do desenho técnico | Módulo formal "Formação" com API própria (cursos, vídeo-aulas, certificação) |
| Credibilidade/assinatura | "CASIO v10.0" fictício | Conselho Consultivo nomeado e público |
| Métricas de tração | Declaradas como fato (750 usuários etc.) | Tratadas como metas/projeções até validação de campo real |

### 5.3 Reconciliação do cronograma e orçamento

- O programa AECID (24 meses, €235k) é o **guarda-chuva contratual** — nele cabem: estudo diagnóstico, cartilha impressa, AVA/capacitação, seminário, e a tecnologia (app+site).
- A proposta de R$80k/90 dias deve ser reposicionada explicitamente como **o workstream de tecnologia digital** dentro desse guarda-chuva — não como o projeto inteiro — e o SOW deve **adicionar linha de orçamento e prazo para o módulo de Formação/AVA**, hoje ausente.
- Cronograma dual mantido (Track Institucional 12–24 meses / Track Acelerado 90 dias para o MVP técnico), mas com um terceiro trilho explícito: **Track de Conteúdo/Comunidade** (Memória e Herança, Comunidade, Find a Doctor, Ensaios Clínicos) que pode evoluir em paralelo por ser majoritariamente editorial/conteúdo, não engenharia pesada.

---

## PARTE 6 — RESUMO EXECUTIVO DAS RECOMENDAÇÕES

1. **Reconhecer formalmente** que a proposta de R$80k é uma fração do programa AECID de €235k, não o projeto inteiro — e resolver o que é dono do estudo diagnóstico, cartilha impressa, AVA e seminário.
2. **Reintroduzir 4 módulos abandonados** com alto retorno comprovado pelo benchmark BlackDoctor: Find a Doctor (rede privada + atendimento humanizado), Hub de Ensaios Clínicos, Memória e Herança de Saúde (storytelling/Hall da Fama), Comunidade/rodas de conversa.
3. **Separar formalmente 3 domínios de dados** (conteúdo público, pesquisa anônima, triagem clínica identificável) hoje indevidamente unificados sob um único modelo `Survey`.
4. **Adicionar "Condições Genéticas/Raras" como 6º tema prioritário**, corrigindo a incoerência entre o questionário de campo, o parceiro ABRADFAL e os "5 temas" do MVP.
4.1. **Adicionar "Saúde Mental e Socioeconômica Contemporânea" como 7º tema prioritário** (ansiedade crônica por uso irresponsável de redes sociais, vício em jogos de apostas/bets, abuso de substâncias com disparidade de pureza e de criminalização por classe/raça, violência como resposta reativa por déficit de educação emocional, falta de educação financeira) — condições com forte base evidencial nacional (Atlas da Violência/IPEA, Banco Central, SENAD/Fiocruz, gov.br/MJ-OBID) e alta relevância para a realidade brasileira atual, hoje ausentes ou apenas implícitas na Base Científica original (ver Parte 4.5).
5. **Substituir a assinatura fictícia "CASIO v10.0"** por um Conselho Consultivo real e nomeado, inspirado no Medical Advisory Board da BDO — credibilidade não se terceiriza para uma marca de IA.
6. **Reposicionar o Radar Epidemiológico** de vigilância silenciosa para sinal transparente e opt-in devolvido à comunidade, aplicando diretamente o BDO Trust Study (transparência > sofisticação técnica).
7. **Criar o módulo de Formação/AVA** ausente, que é um entregável contratual explícito da AECID.
8. **Parar de declarar métricas de tração como fato** (750 usuários, 65% ativação etc.) até haver piloto de campo real — tratá-las como metas.

---

*Documento gerado a partir de revisão integral do hub "Gente Preta" (7 arquivos), da consolidação técnica anterior (7 arquivos, incl. proposta CASIO), de 7 sessões anteriores do hub, de pesquisa dirigida ao BlackDoctor.com/.org (about, estudo de confiança BDO, iniciativa Generational Health), e de pesquisa adicional sobre condições socioeconômicas/comportamentais da realidade brasileira contemporânea (Atlas da Violência 2026/IPEA/FBSP, Banco Central do Brasil — Relatório de Cidadania Financeira 2025, SENAD, Fiocruz, gov.br/MJ-OBID, Datafolha/Folha de S.Paulo, Jornal da USP, Alma Preta, Revista Raça, Brasil de Fato, UNICEF Brasil, CNN Brasil, The Conversation Brasil).*
