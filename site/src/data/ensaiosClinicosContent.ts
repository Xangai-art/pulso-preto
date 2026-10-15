// Ensaios Clínicos — dados estruturados para a rota /ensaios-clinicos.
// Fonte: pacote CASIO v10.0 "Gente Preta v4.2 — Conteúdo para 3 Páginas 404"
// (16/08/2026), alinhado à Arquitetura Reconciliada V4.1.

export const ensaiosMeta = {
  title: 'Ensaios Clínicos — Gente Preta',
  description:
    'Direito à pesquisa como direito à saúde. Entenda ensaios clínicos, por que a participação da população negra importa, e como encontrar estudos abertos no Brasil.',
};

export const ensaiosHero = {
  kicker: 'Equidade também na pesquisa',
  title: 'Ensaios Clínicos',
  subtitle:
    'Apenas 1,5% das pesquisas em saúde no Brasil incluem recorte racial. Isso significa que os medicamentos, doses e protocolos que chegam ao SUS foram testados majoritariamente em populações que não representam quem hoje é atendido nas UBS do Distrito Federal. Direito à pesquisa é direito à saúde. Esta página existe para explicar, informar e conectar — nunca para intermediar recrutamento sem consentimento.',
  notice: {
    icon: '⚖️',
    text:
      'O Gente Preta não conduz ensaios clínicos. Somos uma plataforma informativa que direciona a fontes oficiais e regulamentadas (ReBEC, ClinicalTrials.gov, Plataforma Brasil). Qualquer participação em pesquisa exige aprovação de Comitê de Ética (CEP/CONEP), Termo de Consentimento Livre e Informado (TCLE) e é sempre voluntária, com direito a desistir a qualquer tempo.',
  },
};

export const trialPhases = [
  { phase: 'Fase 1', tests: 'Segurança e dose', people: '20–80 voluntários saudáveis' },
  { phase: 'Fase 2', tests: 'Se funciona', people: '100–300 pacientes com a doença' },
  { phase: 'Fase 3', tests: 'Compara com tratamento atual', people: '1.000–3.000 pacientes' },
  { phase: 'Fase 4', tests: 'Pós-aprovação, uso real', people: 'Milhares de pessoas em uso rotineiro' },
];

export const guaranteedRights = [
  'Consentimento livre e informado (TCLE) por escrito',
  'Direito de desistir a qualquer momento, sem prejuízo ao atendimento',
  'Acesso ao tratamento comprovadamente eficaz após o fim do estudo',
  'Ressarcimento de custos (transporte, alimentação)',
  'Sigilo dos dados pessoais',
  'Assistência médica em caso de eventos adversos',
];

export const whyItMattersHighlight = {
  statistic: '56% ↔ 1,5%',
  text: '56% da população brasileira é negra. Apenas 1,5% das pesquisas em saúde no Brasil incluem recorte racial.',
};

export const whyItMattersExamples = [
  {
    title: 'Dose de anti-hipertensivo',
    text: "Estudos internacionais mostram que a resposta a certas classes de anti-hipertensivos (IECA, betabloqueadores) difere em populações afrodescendentes. Se a pesquisa não inclui pessoas negras, a dose 'padrão' pode ser inadequada.",
  },
  {
    title: 'Câncer de mama triplo negativo',
    text: 'O subtipo triplo negativo é mais frequente em mulheres negras (JAMA Oncology 2021). Novos medicamentos precisam ser testados nessa população, senão a eficácia real é desconhecida.',
  },
  {
    title: 'Doença renal e APOL1',
    text: 'O gene APOL1 (mais frequente em afrodescendentes) altera a progressão da doença renal. Novas terapias renais precisam considerar esse fator genético — o que só acontece se há participantes negros nos estudos.',
  },
];

export const historicalCases = [
  {
    title: 'Tuskegee (EUA, 1932–1972)',
    text: 'Estudo antiético que negou tratamento para sífilis a homens negros por 40 anos, mesmo após a penicilina estar disponível.',
  },
  {
    title: 'Henrietta Lacks (EUA, 1951)',
    text: 'Células cancerosas removidas sem consentimento — usadas por décadas em pesquisa sem que a família soubesse ou recebesse crédito.',
  },
  {
    title: 'Brasil, década de 1990',
    text: 'Casos documentados de esterilização em massa em regiões com alta concentração de mulheres negras.',
  },
];

export const whatChanged = [
  'Resolução CNS 466/2012 e CNS 510/2016 (Brasil) exigem consentimento livre, informado e revogável',
  'Comitês de Ética em Pesquisa (CEP) e CONEP fiscalizam TODOS os estudos com seres humanos',
  'Plataforma Brasil torna público o registro de todo estudo aprovado',
  'Direito internacional (Declaração de Helsinque) protege participantes',
];

export const officialPlatforms = [
  {
    flag: '🇧🇷',
    name: 'ReBEC — Registro Brasileiro de Ensaios Clínicos',
    text: 'Base oficial vinculada à Fiocruz e OMS. Todo ensaio conduzido no Brasil deve estar registrado aqui.',
    url: 'https://ensaiosclinicos.gov.br',
  },
  {
    flag: '🌍',
    name: 'ClinicalTrials.gov',
    text: "Base internacional dos EUA (NIH). Filtre por 'Country: Brazil' para estudos abertos aqui.",
    url: 'https://clinicaltrials.gov',
  },
  {
    flag: '📋',
    name: 'Plataforma Brasil',
    text: 'Sistema oficial do CONEP/MS. Registro de aprovação ética. Consulta pública gratuita.',
    url: 'https://plataformabrasil.saude.gov.br',
  },
];

export const referenceHospitalsDF = [
  'Hospital de Base do Distrito Federal (HBDF) — HRAN',
  'Hospital Universitário de Brasília (HUB/UnB)',
  'Instituto de Cardiologia do DF (ICDF)',
  'HRAN / HRC / HRT (centros com pesquisa institucional)',
];

export const preParticipationChecklist = [
  'Quem financia este estudo? (indústria, governo, universidade)',
  'Qual é a pergunta que ele quer responder?',
  'O estudo foi aprovado por CEP/CONEP? (peça o número CAAE)',
  'O que exatamente vou fazer? (consultas, exames, medicamentos, tempo)',
  'Quais os riscos e efeitos colaterais possíveis?',
  'Posso desistir a qualquer momento sem prejuízo?',
  'O que acontece após o fim do estudo? Tenho acesso ao tratamento se funcionar?',
  'Meus dados serão anônimos ou identificados?',
  'Posso levar o TCLE para casa e discutir com família/médico de confiança antes de assinar?',
];

export const goldenRule = {
  icon: '⚠️',
  text: 'Nenhum estudo ético pressiona por resposta imediata. Se sentir pressão, é sinal de alerta. Direito de tempo para decidir é seu.',
};

export interface ResearchInstrument {
  title: string;
  attributes: string[];
}

export const researchInstruments: ResearchInstrument[] = [
  {
    title: 'Pesquisa Populacional Anônima',
    attributes: [
      'Voluntária, pseudonimizada',
      'Consentimento nível 2 (opcional no app)',
      'Objetivo: produção de evidência para políticas públicas',
      'Aprovação: CEP/FEPECS',
    ],
  },
  {
    title: 'Triagem Clínico-Social Identificável',
    attributes: [
      'Requer CPF/CNS, acesso restrito a profissionais de saúde',
      'Consentimento específico + TCLE presencial',
      'Objetivo: classificação de risco pela enfermagem',
      'Retenção conforme LGPD',
    ],
  },
  {
    title: 'Check-in Longitudinal do App',
    attributes: [
      'Contínuo, opcional, revogável a qualquer momento',
      'Consentimento granular (4 níveis)',
      'Objetivo: escuta longitudinal (não é ensaio clínico)',
    ],
  },
];

export const ensaiosFooterCtas = [
  {
    title: 'Foi convidado para um estudo e tem dúvidas?',
    text: 'Fale com o Conselho Consultivo antes de decidir. Podemos ajudar a interpretar o TCLE.',
    ctaLabel: 'Contatar Conselho Consultivo',
  },
  {
    title: 'É pesquisador e quer publicar chamada no Gente Preta?',
    text: 'Estudos com registro CEP/CONEP e recorte racial podem ser listados aqui, sob curadoria.',
    ctaLabel: 'Submeter estudo',
  },
  {
    title: 'Ler nosso Relatório de Arquitetura',
    text: 'Entenda como o projeto separa pesquisa de assistência.',
    ctaLabel: 'Ver /arquitetura',
    href: '/arquitetura',
  },
];
