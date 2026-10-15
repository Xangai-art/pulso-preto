// Base Científica — Gente Preta
// 9 categorias temáticas · 45+ condições mapeadas · formato Estudo + Achado

export interface Disease {
  id: string;
  name: string;
  isPriorityTheme?: boolean; // faz parte dos 7 temas prioritários do App
  study?: string;
  finding?: string;
  isNew?: boolean; // condição de inclusão recente (realidade brasileira contemporânea)
  // Ver nota equivalente em site/src/data/diseases.ts — sinaliza conteúdo
  // aprofundado por audiência (shared/data/anemiaFalciforme.ts).
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
      },
      { id: 'doencas-pele', name: 'Doenças de Pele (acesso desigual a diagnóstico)' },
      { id: 'osteoporose', name: 'Osteoporose' },
      { id: 'dor-cronica', name: 'Dor Crônica (subtratada por viés racial na avaliação de dor)' },
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
  .flatMap((c) => c.diseases.filter((d) => d.isPriorityTheme).map((d) => ({ ...d, category: c.title, icon: c.icon })));

// Temas emergentes — condições/determinantes sociais de inclusão recente (realidade
// brasileira contemporânea). Categoria própria na Biblioteca de Saúde; não compõem os
// 7 temas prioritários do App.
export const emergentThemes = diseaseCategories
  .flatMap((c) => c.diseases.filter((d) => d.isNew).map((d) => ({ ...d, category: c.title, icon: c.icon })));

export const totalConditionsCount = diseaseCategories.reduce((acc, c) => acc + c.diseases.length, 0);
