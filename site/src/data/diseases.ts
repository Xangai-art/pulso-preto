// Base Científica — Gente Preta
// 9 categorias temáticas · 45+ condições mapeadas · formato Estudo + Achado

export interface LocalStudyFinding {
  value: string;
  finding: string;
  source: string; // seção/indicador do estudo, para rastreabilidade
}

export interface Disease {
  id: string;
  name: string;
  isPriorityTheme?: boolean; // faz parte dos 7 temas prioritários do App
  study?: string;
  finding?: string;
  isNew?: boolean; // condição de inclusão recente (realidade brasileira contemporânea)
  // Dado local do Distrito Federal, extraído do Estudo Técnico-Científico
  // "Condições de Vida e Saúde da População Negra do DF (2015–2024)"
  // (AECID/APRECIA/FIOCRUZ/UnB/FEPECS) — complementa (não substitui) a
  // literatura internacional/nacional citada em study/finding.
  localStudy?: LocalStudyFinding;
  // Sinaliza que esta condição tem conteúdo aprofundado e segmentado por
  // audiência (médicos/enfermeiros/usuários) em um arquivo dedicado — ver
  // site/src/data/anemiaFalciforme.ts e o registro em deepContentRegistry.ts.
  // Quando true, DiseaseDetail.tsx renderiza as abas de audiência além do
  // bloco padrão Estudo + Achado.
  hasDeepContent?: boolean;
}

export interface DiseaseCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  diseases: Disease[];
}

export const diseaseCategories: DiseaseCategory[] = [
  {
    id: 'cardiovasculares',
    title: 'Cardiovasculares',
    subtitle: 'Risco ↑ + Acesso Desigual',
    icon: '❤️',
    diseases: [
      {
        id: 'hipertensao',
        name: 'Hipertensão',
        isPriorityTheme: true,
        study: 'NEJM / Parsa et al. 2013',
        finding:
          'Pessoas negras têm risco até 2,3x maior de desenvolver hipertensão em comparação à população branca, com pior controle pressórico mesmo em tratamento equivalente.',
        localStudy: {
          value: '1,50×',
          finding:
            'No DF, a mortalidade cardiovascular padronizada por idade é 50% maior em negros (180/100.000) do que em brancos (120/100.000) — a hipertensão é o principal fator de risco modificável dessa disparidade.',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicador 13 (estimativa, estratificação racial em consolidação)',
        },
        hasDeepContent: true,
      },
      {
        id: 'infarto',
        name: 'Infarto',
      },
      {
        id: 'avc',
        name: 'AVC (Acidente Vascular Cerebral)',
        study: 'Stroke Journal / AHA — Howard et al. 2018',
        finding:
          'Incidência de AVC entre adultos negros é quase o dobro da população branca, com eventos ocorrendo em idades mais jovens.',
      },
      { id: 'insuficiencia-cardiaca', name: 'Insuficiência Cardíaca' },
      {
        id: 'doenca-arterial-coronariana',
        name: 'Doença Arterial Coronariana',
        study: 'ATVB (Arteriosclerosis, Thrombosis, and Vascular Biology) 2015',
        finding:
          'Fatores de risco cardiovascular se acumulam de forma desproporcional em populações negras devido a estresse crônico (weathering) e acesso desigual à prevenção.',
      },
    ],
  },
  {
    id: 'metabolicas',
    title: 'Metabólicas',
    subtitle: 'Risco ↑ + Acesso Desigual',
    icon: '🩸',
    diseases: [
      {
        id: 'diabetes',
        name: 'Diabetes Tipo 1 e 2',
        isPriorityTheme: true,
        study: 'CDC 2021',
        finding:
          'Adultos negros têm probabilidade ~60% maior de serem diagnosticados com diabetes tipo 2 em comparação a adultos brancos não hispânicos.',
        localStudy: {
          value: '8º lugar',
          finding:
            'No DF, diabetes caiu do 3º lugar (2014) para o 8º lugar (2024) nas causas de morte — pode indicar melhora no controle (acesso a insulina/antidiabéticos pelo SUS) ou subnotificação como causa associada. Dados ainda não estratificados por raça/cor no boletim agregado.',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicador 14 (estratificação racial pendente)',
        },
        hasDeepContent: true,
      },
      { id: 'pre-diabetes', name: 'Pré-Diabetes' },
      {
        id: 'diabetes-juvenil',
        name: 'Diabetes Tipo 1 (Juvenil)',
        study: 'SEARCH for Diabetes in Youth Study 2021',
        finding:
          'Crianças e adolescentes negros com diabetes tipo 1 apresentam piores desfechos glicêmicos, associados a barreiras de acesso a insulina e tecnologia de monitoramento.',
      },
      { id: 'obesidade', name: 'Obesidade' },
      { id: 'sindrome-metabolica', name: 'Síndrome Metabólica' },
    ],
  },
  {
    // Unificado a partir da antiga página /biblioteca-saude (schema "biblioteca.ts",
    // retirada de circulação): narrativa do gene APOL1, mais frequente em
    // afrodescendentes, e seu impacto na progressão da doença renal.
    id: 'renais-geneticas',
    title: 'Renais e Genéticas',
    subtitle: 'Fator Genético',
    icon: '🧬',
    diseases: [
      {
        id: 'doenca-renal-cronica',
        name: 'Doença Renal Crônica',
        study: 'Science / Genovese et al. 2010',
        finding:
          'Identificação do gene APOL1 (variantes G1/G2), mais frequente em afrodescendentes, como fator de risco para doença renal crônica.',
      },
      {
        id: 'progressao-doenca-renal',
        name: 'Progressão da Doença Renal',
        study: 'JCI / Friedman & Pollak 2011',
        finding:
          'Variantes do gene APOL1 associadas a maior risco de progressão para diálise — encaminhamento precoce a nefrologista muda o desfecho.',
      },
      {
        id: 'insuficiencia-renal',
        name: 'Insuficiência Renal',
        study: 'NEJM / Parsa et al. 2013',
        finding:
          'Confirmação da associação entre APOL1 e doença renal terminal. Combinado a hipertensão mal controlada e menor acesso a nefrologia, resulta em maior taxa de diálise precoce na população negra. A fila para transplante renal também carrega viés racial documentado.',
      },
    ],
  },
  {
    id: 'saude-mental',
    title: 'Saúde Mental',
    subtitle: 'Acesso Desigual',
    icon: '🧠',
    diseases: [
      {
        id: 'depressao',
        name: 'Depressão',
        isPriorityTheme: true,
        study: 'JAMA Psychiatry / Williams et al. 2022',
        finding:
          'Pessoas negras com depressão têm menor probabilidade de receber tratamento adequado e maior probabilidade de terem o quadro subdiagnosticado por racismo institucional em saúde.',
        hasDeepContent: true,
      },
      { id: 'ansiedade', name: 'Ansiedade' },
      { id: 'tept', name: 'TEPT (Transtorno de Estresse Pós-Traumático)' },
      {
        id: 'uso-substancias',
        name: 'Uso de Substâncias',
        study:
          'SAMHSA 2021 + SENAD (Grau de Pureza de Cocaína em 4 Estados) + gov.br/MJ-OBID + Fiocruz + Jornal da USP/Brasil de Fato sobre a Lei 11.343/2006',
        finding:
          'Além do acesso desigual a tratamento (SAMHSA 2021), a adenda v4.1 documenta uma dupla disparidade no Brasil: (1) substâncias consumidas em contextos de baixa renda tendem a ter maior grau de adulteração/mistura do que as consumidas por quem tem alta renda, ampliando o dano por dose; (2) a aplicação da política de drogas é racialmente desigual — pessoas negras cumprem, em média, mais tempo de prisão pela mesma infração.',
        isNew: true,
      },
    ],
  },
  {
    id: 'respiratorias',
    title: 'Respiratórias',
    subtitle: 'Risco ↑',
    icon: '🫁',
    diseases: [
      {
        id: 'asma',
        name: 'Asma',
        isPriorityTheme: true,
        study: 'CDC 2020',
        finding:
          'Crianças negras têm taxa de mortalidade por asma ~7x maior que crianças brancas, associada a maior exposição ambiental e menor acesso a tratamento contínuo.',
        hasDeepContent: true,
      },
      {
        id: 'covid-19',
        name: 'COVID-19',
        study: 'NEJM Review 2023',
        finding:
          'Populações negras tiveram taxas de hospitalização e mortalidade por COVID-19 desproporcionalmente mais altas, refletindo comorbidades prévias e desigualdade de acesso a cuidados críticos.',
      },
      { id: 'apneia-sono', name: 'Apneia do Sono' },
      {
        id: 'tuberculose',
        name: 'Tuberculose',
        study: 'Literatura epidemiológica nacional — associação com pobreza e acesso desigual',
        finding:
          'Tuberculose está associada a aglomeração domiciliar, desnutrição e menor acesso a diagnóstico/tratamento oportuno — condições mais prevalentes em contextos de vulnerabilidade social.',
        localStudy: {
          value: '58,3%',
          finding:
            'No DF, 58,3% dos casos novos de tuberculose em 2025 ocorreram em pessoas pardas, com tendência de aumento na incidência entre 2021 e 2025.',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicador 15 (Boletim de Tuberculose 2026, SES-DF)',
        },
      },
    ],
  },
  {
    id: 'mulher-negra',
    title: 'Saúde da Mulher Negra',
    subtitle: 'Risco ↑ + Acesso Desigual',
    icon: '🤱',
    diseases: [
      {
        id: 'miomas-uterinos',
        name: 'Miomas Uterinos',
        isPriorityTheme: true,
        study: 'FEBRASGO / ACOG — leiomiomas uterinos',
        finding:
          'Mulheres negras têm prevalência de miomas 2 a 3 vezes maior, com início mais precoce, tumores maiores e mais numerosos, sintomas mais graves e maior taxa de histerectomia em comparação a mulheres brancas.',
        hasDeepContent: true,
      },
      { id: 'parto-prematuro', name: 'Parto Prematuro' },
      {
        id: 'mortalidade-materna',
        name: 'Mortalidade Materna',
        isPriorityTheme: true,
        study: 'Estudos nacionais e internacionais de saúde materna',
        finding:
          'Mulheres negras têm risco de 2 a 3 vezes maior de morte materna em comparação a mulheres brancas, mesmo controlando por renda e escolaridade — indicando peso do racismo institucional no cuidado obstétrico.',
        localStudy: {
          value: '1,39×',
          finding:
            'No DF (2010–2019), a Razão de Mortalidade Materna (RMM) em mulheres pretas foi 92,7 por 100.000 nascidos vivos, contra 66,7 em brancas — 39% maior. Mulheres pardas isoladamente (45,1) aparecem abaixo de brancas, um paradoxo que o estudo atribui a incompletude/subnotificação racial nos registros de óbito.',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicador 8 (SIM+SINASC, Relatório de Mortalidade Materna 2018–2019)',
        },
      },
      {
        id: 'sifilis-congenita',
        name: 'Sífilis Congênita',
        study: 'Doença evitável com pré-natal adequado (testagem + tratamento oportuno)',
        finding:
          'A sífilis congênita é totalmente evitável com testagem e tratamento no pré-natal — sua persistência reflete falhas de acesso e continuidade do cuidado obstétrico.',
        localStudy: {
          value: '78,2%',
          finding:
            'No DF (2024), 78,2% dos casos de sífilis congênita ocorreram em filhos de mães negras (pretas+pardas) — sobre-representação em relação aos 57,8% da população, refletindo menor cobertura/qualidade de pré-natal e barreiras de acesso a testagem.',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicador 10 (Boletim de Sífilis Congênita 2025, SES-DF)',
        },
      },
    ],
  },
  {
    id: 'raras-autoimunes',
    title: 'Raras e Autoimunes',
    subtitle: 'Fator Genético',
    icon: '🧬',
    diseases: [
      {
        id: 'anemia-falciforme',
        name: 'Anemia Falciforme',
        isPriorityTheme: true,
        study: 'Parceria técnica ABRADFAL (Associação Brasiliense das Pessoas com Doença Falciforme)',
        finding:
          'Doença genética com alta prevalência na população negra brasileira; tema prioritário do App em parceria formal com a ABRADFAL.',
        hasDeepContent: true,
      },
      {
        id: 'lupus',
        name: 'Lúpus',
        isPriorityTheme: true,
        study: 'Literatura clínica consolidada',
        finding:
          'Mulheres negras têm incidência de lúpus 2 a 3 vezes maior e desenvolvem a doença de forma mais grave e mais precoce do que mulheres brancas.',
        hasDeepContent: true,
      },
      { id: 'nmosd', name: 'NMOSD (Doença do Espectro da Neuromielite Óptica)' },
      { id: 'attr-cm', name: 'ATTR-CM (Amiloidose Cardíaca)' },
    ],
  },
  {
    id: 'oncologicas',
    title: 'Oncológicas',
    subtitle: 'Risco ↑ + Acesso Desigual',
    icon: '🎗️',
    diseases: [
      {
        id: 'cancer-mama',
        name: 'Câncer de Mama',
        study: 'Literatura oncológica — subtipo triplo-negativo',
        finding:
          'Mulheres negras têm maior incidência do subtipo triplo-negativo (mais agressivo) e maior mortalidade por câncer de mama, mesmo com incidência geral similar ou menor.',
      },
      {
        id: 'cancer-prostata',
        name: 'Câncer de Próstata',
        study: 'Literatura oncológica nacional/internacional',
        finding:
          'Homens negros têm risco ~1,7x maior de desenvolver câncer de próstata e cerca de 2x mais chance de morrer da doença em comparação a homens brancos.',
      },
      {
        id: 'cancer-colorretal',
        name: 'Câncer Colorretal',
        study: 'Literatura oncológica nacional/internacional',
        finding:
          'População negra apresenta maior incidência e mortalidade por câncer colorretal, associadas a diagnóstico tardio e menor acesso a exames de rastreamento.',
      },
      { id: 'cancer-figado', name: 'Câncer de Fígado' },
      { id: 'cancer-rim', name: 'Câncer de Rim' },
      { id: 'melanoma', name: 'Melanoma' },
    ],
  },
  {
    id: 'outras',
    title: 'Outras',
    subtitle: 'Acesso Desigual',
    icon: '🩹',
    diseases: [
      { id: 'hepatites', name: 'Hepatites B/C' },
      {
        id: 'hiv',
        name: 'HIV/AIDS',
        study: 'Literatura epidemiológica nacional',
        finding:
          'População negra apresenta maior incidência de novos diagnósticos de HIV e menor acesso contínuo a tratamento antirretroviral, refletindo barreiras estruturais de acesso à saúde.',
        localStudy: {
          value: '70,3%',
          finding:
            'No DF (2024), 70,3% das notificações de HIV/AIDS foram de pessoas pretas ou pardas — sobre-representação em relação aos 57,8% da população, associada a menor acesso a testagem, PrEP e TARV, além de estigma (racismo + homofobia + serofobia).',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicador 16 (SINAN+SIM, Boletim HIV/AIDS 2024)',
        },
      },
      {
        id: 'prevencao-hiv-prep',
        name: 'Prevenção do HIV (PrEP)',
        study: 'Lancet HIV 2022',
        finding:
          'Redução de desigualdades na incidência de HIV quando o acesso à Profilaxia Pré-Exposição (PrEP) é ampliado. PrEP é direito garantido pelo SUS — disponível gratuitamente na rede pública.',
      },
      { id: 'doencas-pele', name: 'Doenças de Pele (acesso desigual a diagnóstico)' },
      { id: 'osteoporose', name: 'Osteoporose' },
      { id: 'dor-cronica', name: 'Dor Crônica (subtratada por viés racial na avaliação de dor)' },
      {
        id: 'acidentes-transporte',
        name: 'Acidentes de Transporte',
        study: 'Associado a exposição ocupacional (entregadores) e infraestrutura viária desigual',
        finding:
          'Maior exposição ao trânsito por uso de transporte público e motocicletas de trabalho, combinada a infraestrutura viária mais precária em periferias, eleva o risco de óbito por acidentes de transporte em populações negras.',
        localStudy: {
          value: '72,2%',
          finding:
            'No DF (2012–2021), 72,2% dos óbitos por acidentes de transporte ocorreram em pessoas negras — sobre-representação de 1,25× em relação à proporção populacional (57,8%).',
          source: 'Estudo Pop. Negra DF 2015–2024 · SIM/DATASUS 2012–2021',
        },
      },
    ],
  },
  {
    id: 'socioeconomica-contemporanea',
    title: 'Saúde Mental e Socioeconômica Contemporânea',
    subtitle: 'Risco ↑ + Determinantes Sociais',
    icon: '📱',
    diseases: [
      {
        id: 'ansiedade-redes-sociais',
        name: 'Ansiedade crônica por uso irresponsável de redes sociais',
        isNew: true,
        study:
          'UNICEF Brasil · CNN Brasil · Jornal da USP · The Conversation Brasil (2024–2025)',
        finding:
          'Uso excessivo/compulsivo de redes sociais está associado a aumento de sintomas de ansiedade, comparação social e distúrbios de sono em adolescentes brasileiros — quadro já descrito como "epidemia" por especialistas, motivando regulamentação do uso de celulares em escolas em diversos estados.',
      },
      {
        id: 'vicio-apostas',
        name: 'Vício em jogos de apostas online (bets)',
        isNew: true,
        study: 'Datafolha/Folha de S.Paulo (2024) · Alma Preta · Revista Raça · O Joio e O Trigo',
        finding:
          '66,8% dos apostadores brasileiros apresentam padrão de aposta problemático; o perfil mais afetado é jovem, do sexo masculino, autodeclarado negro, desempregado ou de baixa renda. Estima-se que ~1,4 milhão de brasileiros vivam hoje com transtorno relacionado a apostas, com forte concentração em periferias urbanas.',
      },
      {
        id: 'abuso-substancias-disparidade',
        name: 'Abuso de substâncias — disparidade de qualidade/pureza por classe e raça',
        isNew: true,
        study:
          'SENAD ("Grau de Pureza de Cocaína em Quatro Estados") · Fiocruz (levantamento nacional sobre uso de crack) · gov.br/MJ-OBID · Jornal da USP · Brasil de Fato',
        finding:
          'Substâncias consumidas em contextos de baixa renda/periferia tendem a apresentar maior grau de adulteração (misturadas a outras substâncias, muitas vezes tóxicas), ampliando o dano à saúde por dose consumida, enquanto consumidores de alta renda têm acesso a substâncias de maior pureza. Simultaneamente, a política de drogas é aplicada de forma racialmente desigual — pessoas negras cumprem, em média, mais tempo de prisão pela mesma infração.',
      },
      {
        id: 'violencia-reativa',
        name: 'Violência como resposta reativa (déficit de educação/inteligência emocional)',
        isNew: true,
        study: 'Atlas da Violência 2026 (IPEA / Fórum Brasileiro de Segurança Pública)',
        finding:
          '77% das vítimas de homicídio no Brasil são pessoas negras; taxa de 27 homicídios por 100 mil habitantes entre negros vs. 10 por 100 mil entre não negros — uma pessoa negra tem 2,6x mais chance de ser assassinada no Brasil, quadro associado à ausência de políticas preventivas de mediação de conflito e educação emocional em territórios de alta exposição à violência.',
        localStudy: {
          value: '77,4%',
          finding:
            'No DF (2015–2022), 77,4% das mortes violentas ocorreram em pessoas negras (predominantemente pardas, 70,2%) — sobre-representação de 1,34× em relação à proporção populacional. 89,9% das vítimas fatais são homens; já nas notificações de violência não fatal (SINAN), 83,1% das vítimas são mulheres.',
          source: 'Estudo Pop. Negra DF 2015–2024 · Indicadores 17–18 (SIM/DATASUS, SINAN Q3 2025)',
        },
      },
      {
        id: 'falta-educacao-financeira',
        name: 'Falta de educação financeira',
        isNew: true,
        study: 'Banco Central do Brasil — Relatório de Cidadania Financeira 2025',
        finding:
          'Mulheres negras de baixa renda pagam taxas de juros de até 140% ao ano em crédito informal/rotativo; a população negra recebe em média 58,3% do rendimento da população branca; a pontuação nacional média de educação financeira é de apenas 59,6/100 — um ciclo de vulnerabilidade financeira que é, em si, determinante social de saúde (estresse crônico, insegurança alimentar, ansiedade).',
      },
    ],
  },
];

// Os 7 temas prioritários do App — condições clássicas com parceria/evidência consolidada.
// Mantido separado dos temas emergentes (isNew) para não inflar essa contagem curada.
export const priorityThemes = diseaseCategories
  .flatMap((c) => c.diseases.filter((d) => d.isPriorityTheme).map((d) => ({ ...d, category: c.title, icon: c.icon, categoryId: c.id })));

// Temas emergentes — condições/determinantes sociais de inclusão recente (realidade
// brasileira contemporânea). Categoria própria na Biblioteca de Saúde; não compõem os
// 7 temas prioritários do App.
export const emergentThemes = diseaseCategories
  .flatMap((c) => c.diseases.filter((d) => d.isNew).map((d) => ({ ...d, category: c.title, icon: c.icon, categoryId: c.id })));

export const totalConditionsCount = diseaseCategories.reduce((acc, c) => acc + c.diseases.length, 0);
