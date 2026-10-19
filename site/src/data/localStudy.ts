// Análise de dados — Condições de Vida e Saúde da População Negra do Distrito
// Federal (2015–2024). Instituto APRECIA, com apoio da AECID.
//
// LINGUAGEM (áudios de 10/10/2026, revisados em 20/10/2026): o projeto NÃO está
// fazendo pesquisa nem "estudo epidemiológico" — reuniu e analisou dados públicos
// que JÁ EXISTEM (Secretaria de Saúde do DF, Ministério da Saúde, IPEDF). Pesquisa
// só quando o projeto for a campo. Por isso: sem "Fase 1", "dados preliminares",
// "estudo", "pesquisadora responsável"; texto para leitura leiga ("revista").
// Os arquivos do documento e da planilha foram retirados do download.

export const localStudyMeta = {
  question: 'Você sabe como vive e como está a saúde da população negra aqui no Distrito Federal?',
  intro:
    'Reunimos e analisamos dados públicos que já existem — da Secretaria de Saúde do Distrito Federal, do Ministério da Saúde e do Instituto de Pesquisa e Estatística do Distrito Federal (IPEDF) — de 2015 a 2024, separados por raça/cor. O objetivo é entender a realidade e começar a agir.',
};

export interface StudyHighlight {
  value: string;
  label: string;
  /** Frase em linguagem simples. */
  detail: string;
  /** De onde vem o dado (exibido em letra menor). */
  source: string;
  type: 'critical' | 'progress' | 'goal' | 'info';
}

// Principais números da análise — mesma semântica de cor do bloco
// (critical = desigualdade, progress = avanço, info = contexto).
export const localStudyHighlights: StudyHighlight[] = [
  {
    value: '57,8%',
    label: 'da população do Distrito Federal é negra',
    detail: 'Mais da metade das pessoas que vivem no Distrito Federal se declaram pretas ou pardas.',
    source: 'Pesquisa Distrital por Amostra de Domicílios (PDAD) 2024 — IPEDF',
    type: 'info',
  },
  {
    value: '−41,9%',
    label: 'de renda nas casas de famílias negras',
    detail: 'Em média, uma casa de família negra vive com R$ 3.816 por mês; uma casa de família não negra, com R$ 6.568.',
    source: 'PDAD 2024 — IPEDF',
    type: 'critical',
  },
  {
    value: '1,39×',
    label: 'mais mortes maternas entre mulheres pretas',
    detail: 'A cada 100 mil bebês nascidos de mães pretas, cerca de 93 mães morreram; entre mães brancas, cerca de 67 (2010 a 2019).',
    source: 'Secretaria de Saúde do Distrito Federal',
    type: 'critical',
  },
  {
    value: '1,50×',
    label: 'mais mortes por doenças do coração entre pessoas negras',
    detail: 'Para cada 100 mil pessoas, morrem por doenças do coração cerca de 180 pessoas negras e 120 pessoas brancas.',
    source: 'Ministério da Saúde (estimativa)',
    type: 'critical',
  },
  {
    value: '70,3%',
    label: 'dos casos de HIV/AIDS são de pessoas negras',
    detail: 'Pessoas negras são 57,8% da população, mas foram 70,3% dos casos de HIV/AIDS registrados em 2024.',
    source: 'Secretaria de Saúde do Distrito Federal — Boletim HIV/AIDS 2024',
    type: 'critical',
  },
  {
    value: '77,4%',
    label: 'das mortes violentas são de pessoas negras',
    detail: 'De cada 10 mortes violentas no Distrito Federal entre 2015 e 2022, quase 8 foram de pessoas negras.',
    source: 'Sistema de Informações sobre Mortalidade (SIM) — Ministério da Saúde',
    type: 'critical',
  },
  {
    value: '1–2%',
    label: 'dos registros de óbito sem raça/cor informada',
    detail: 'Quase todos os registros de óbito informam a raça/cor, o que dá segurança à análise. Nos registros de nascimento, 14,9% ainda não informam.',
    source: 'Sistema de Informações sobre Mortalidade (SIM) e Sistema de Informações sobre Nascidos Vivos (SINASC)',
    type: 'progress',
  },
];

// Os 8 temas analisados — em linguagem simples, sem status de andamento.
export const localStudyThemes: string[] = [
  'Quem é a população negra do Distrito Federal',
  'Renda, trabalho e condições de vida',
  'Saúde da mãe e do bebê',
  'Doenças crônicas, como hipertensão e diabetes',
  'Doenças infecciosas, como HIV, sífilis e tuberculose',
  'Violência e acidentes',
  'Acesso aos serviços de saúde',
  'Qualidade da informação sobre raça/cor nos registros',
];
