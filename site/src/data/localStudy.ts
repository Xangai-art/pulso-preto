// Estudo Técnico-Científico — Condições de Vida e Saúde da População Negra do
// Distrito Federal (2015–2024). Fase 1, entregue por AECID/APRECIA em parceria
// científica com FIOCRUZ, UnB e FEPECS. Fonte primária dos dados abaixo:
// ESTUDO_POPULACAO_NEGRA_DF_2015_2024.docx + Planilha_Mestre_Estudo_Populacao_Negra_DF.xlsx
// (documentos entregues pela equipe de pesquisa, anexados como downloads públicos).
//
// Estes dados são o primeiro estudo epidemiológico local (DF) que estratifica
// indicadores de saúde por raça/cor de forma sistemática — complementam (não
// substituem) a literatura internacional/nacional já usada em diseases.ts.

export const localStudyMeta = {
  title: 'Condições de Vida e Saúde da População Negra do Distrito Federal',
  period: '2015–2024',
  phaseLabel: 'Fase 1 — dados preliminares',
  phaseStatus:
    'Estruturação metodológica completa; coleta de dados secundários em andamento; cálculos epidemiológicos parciais (6 de 20 indicadores prontos); produtos finais (Atlas, Dashboard, Relatório Final) previstos para a Fase 2.',
  project:
    'Conectando Saúde e Inclusão: Tecnologia e Educação para a Equidade e o Combate ao Racismo no Distrito Federal',
  researcher: 'Dra. Vivilian Muller — Coordenadora Técnica da Área da Saúde',
  reviewers: ['Zenaide (SEJUS/DF)', 'Luiz', 'Wilma Valéria de Andrade'],
  executingInstitution: 'Instituto APRECIA',
  funder: 'AECID — Agência Espanhola de Cooperação Internacional para o Desenvolvimento',
  scientificPartners: ['FIOCRUZ', 'UnB', 'FEPECS'],
  issueDate: '01 de setembro de 2026',
  location: 'Brasília/DF',
  downloadDocx: '/downloads/estudo-populacao-negra-df-2015-2024.docx',
  downloadXlsx: '/downloads/planilha-mestre-estudo-populacao-negra-df.xlsx',
};

export interface StudyHighlight {
  value: string;
  label: string;
  detail: string;
  type: 'critical' | 'progress' | 'goal' | 'info';
}

// Principais achados do Sumário Executivo — mesma semântica de cor usada nos
// Stats da Home (barro=disparidade/risco, folha=indicador de composição/avanço,
// ouro=meta/marco, folha-soft=contexto).
export const localStudyHighlights: StudyHighlight[] = [
  {
    value: '57,8%',
    label: 'da população do DF é negra',
    detail: 'PDAD-A 2024 (IPEDF) — 46,17% parda + 11,65% preta, maioria da população do Distrito Federal.',
    type: 'info',
  },
  {
    value: '−41,9%',
    label: 'de renda domiciliar média',
    detail: 'R$ 3.816 (negros) vs. R$ 6.568 (não negros) — diferença de R$ 2.752 por domicílio.',
    type: 'critical',
  },
  {
    value: '1,39×',
    label: 'mais mortalidade materna em mulheres pretas',
    detail: 'RMM 92,7/100.000 (pretas) vs. 66,7/100.000 (brancas), 2010–2019 — SES-DF.',
    type: 'critical',
  },
  {
    value: '1,50×',
    label: 'mais mortalidade cardiovascular em negros',
    detail: 'Taxa padronizada 180/100.000 (negros) vs. 120/100.000 (brancos) — estimativa Ministério da Saúde.',
    type: 'critical',
  },
  {
    value: '70,3%',
    label: 'das notificações de HIV/AIDS são de negros',
    detail: 'Sobre-representação: negros são 57,8% da população, mas 70,3% das notificações (2024).',
    type: 'critical',
  },
  {
    value: '77,4%',
    label: 'das mortes violentas ocorrem em negros',
    detail: '2015–2022, SIM/DATASUS — sobre-representação de 1,34× em relação à proporção populacional.',
    type: 'critical',
  },
  {
    value: '6 de 20',
    label: 'indicadores epidemiológicos já consolidados',
    detail: 'Fase 1 (Ago 2026): estruturação metodológica completa, 10 indicadores parciais, 4 pendentes.',
    type: 'goal',
  },
  {
    value: '1–2%',
    label: 'incompletude racial no SIM (mortalidade)',
    detail: 'Qualidade excelente — mas SINASC (nascimentos) ainda tem 14,9% de incompletude (regular).',
    type: 'progress',
  },
];

export const localStudyAxes = [
  { id: 1, title: 'Perfil Demográfico', status: 'pronto' as const },
  { id: 2, title: 'Condições Socioeconômicas', status: 'pronto' as const },
  { id: 3, title: 'Saúde Materno-Infantil', status: 'parcial' as const },
  { id: 4, title: 'Doenças Crônicas Não Transmissíveis', status: 'parcial' as const },
  { id: 5, title: 'Doenças Transmissíveis', status: 'parcial' as const },
  { id: 6, title: 'Violências e Causas Externas', status: 'parcial' as const },
  { id: 7, title: 'Acesso e Utilização de Serviços de Saúde', status: 'pronto' as const },
  { id: 8, title: 'Qualidade da Informação Racial', status: 'parcial' as const },
];
