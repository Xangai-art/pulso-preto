// Dados institucionais — Gente Preta

export const projectInfo = {
  name: 'Gente Preta',
  subtitle: 'Sentinela de Saúde da População Negra',
  tagline: 'Conhecimento que transforma políticas. Sua saúde, sua voz, sua comunidade.',
  scope: 'Distrito Federal (piloto) — expansão nacional planejada',
};

// "Serviço-duro" — diferenciais brasileiros concretos (não apenas conteúdo editorial),
// embutidos na Home sobre a base visual cultural-ancestral. Cada item aponta para uma
// rota/funcionalidade REAL já existente no site/app — nenhuma página nova fictícia.
export const hardServices = [
  {
    id: 'ouvidoria',
    titulo: 'Ouvidoria antirracista',
    descricao: 'Relate discriminação institucional em atendimento de saúde. Encaminhamento com consentimento.',
    to: '/rede-sus',
    ctaLabel: 'Relatar agora →',
    tone: 'barro',
  },
  {
    id: 'medica-preta',
    titulo: 'Encontre uma médica preta',
    descricao: 'Busca por atendimento humanizado e culturalmente competente na rede SUS e privada do DF.',
    to: '/rede-sus',
    ctaLabel: 'Buscar na Rede SUS →',
    tone: 'folha',
  },
  {
    id: 'guia-sus-preto',
    titulo: 'Guia do SUS Preto',
    descricao: 'Navegação passo a passo pela rede SUS-DF: UBS, UPAs, Hospitais Regionais e CEPAV por região.',
    to: '/rede-sus',
    ctaLabel: 'Ver guia completo →',
    tone: 'ouro',
  },
];

// "Folhas com Ciência" — coluna de fitoterapia popular com evidência científica
// (espelha site/src/data/project.ts — ver comentário lá para contexto completo).
export const phytotherapy = [
  {
    id: 'picao-preto',
    name: 'Picão-preto',
    scientificName: 'Bidens pilosa',
    study: 'Estudo em modelo com formulação de Bidens pilosa (PMC4381681); Monografia técnica gov.br/Anvisa (uso tradicional)',
    finding:
      'Uso tradicional para diabetes, hipertensão e doenças hepáticas. Formulações à base da planta melhoraram marcadores glicêmicos (glicemia de jejum e HbA1c) em estudos com animais/modelos in vitro.',
    caution:
      'Evidência em humanos ainda é preliminar (majoritariamente pré-clínica). Pode potencializar hipoglicemiantes — atenção redobrada para quem já usa insulina ou outros medicamentos para diabetes.',
  },
  {
    id: 'boldo-brasileiro',
    name: 'Boldo brasileiro',
    scientificName: 'Plectranthus barbatus',
    study: 'Monografia técnica de plantas medicinais (SES-DF); Revista Brasileira de Farmacognosia (SciELO) — relato de interação com warfarina',
    finding:
      'Uso tradicional hepatoprotetor e digestivo, com efeito cardiovascular (inotrópico) documentado. Amplamente citado na medicina popular para distúrbios hepáticos e gástricos.',
    caution:
      'Interage com anticoagulantes: caso publicado mostrou redução do efeito da warfarina durante o uso concomitante, normalizado após suspensão da planta. Não usar sem orientação profissional se estiver em anticoagulação.',
  },
  {
    id: 'folha-santa',
    name: 'Folha-santa',
    scientificName: 'Kalanchoe pinnata',
    study: 'PubMed PMID 30856538 (atividade anti-inflamatória tópica); relatos de uso oral em leishmaniose cutânea',
    finding:
      'Formulações tópicas com a planta demonstraram atividade anti-inflamatória local em estudo publicado. Uso popular é predominantemente externo (cataplasma, sumo tópico).',
    caution:
      'Uso oral só com orientação profissional: flavonoides da planta têm ação sobre a tireoide e o uso interno não deve substituir avaliação médica, especialmente em quadros de hipotireoidismo.',
  },
];

export const partners = {
  financiamento: [
    { name: 'AECID', full: 'Agência Espanhola de Cooperação Internacional para o Desenvolvimento', value: '€ 235.152,41', role: 'Financiador principal (24 meses)' },
  ],
  institucional: [
    { name: 'SEJUS/DF', full: 'Secretaria de Justiça e Cidadania do Distrito Federal', role: 'Parceiro institucional / contrapartida' },
  ],
  execucao: [
    { name: 'APRECIA', full: 'Associação Pró Educação, Cultura, Inclusão e Autonomia', role: 'Execução do projeto' },
    { name: 'CASIO V2 Studio', full: 'CASIO V2 Studio', role: 'Coordenação técnica e desenvolvimento' },
  ],
  academico: [
    { name: 'FEPECS', full: 'Fundação de Ensino e Pesquisa em Ciências da Saúde', role: 'Capacitação de 100 estudantes (AVA)' },
    { name: 'UnB', full: 'Universidade de Brasília', role: 'Apoio acadêmico e conselho consultivo' },
    { name: 'FIOCRUZ', full: 'Fundação Oswaldo Cruz', role: 'Base científica e vigilância epidemiológica' },
  ],
  comunitario: [
    { name: 'CUFA/DF', full: 'Central Única das Favelas', role: 'Mobilização comunitária e confiança territorial' },
    { name: 'ABRADFAL', full: 'Associação Brasiliense das Pessoas com Doença Falciforme', role: 'Parceria técnica — Condições Genéticas/Raras' },
  ],
  referencia: [
    { name: 'BlackDoctor', full: 'BlackDoctor.org/.com (EUA)', role: 'Benchmark internacional — 20 anos, 20M de alcance, 6M visitas/mês' },
  ],
};

export const governance = {
  comite: [
    { name: 'AECID', role: 'Financiamento' },
    { name: 'SEJUS/DF', role: 'Parceiro institucional' },
    { name: 'APRECIA', role: 'Execução' },
  ],
  coordenacao: [
    { name: 'Coordenação de Projeto' },
    { name: 'Coordenação Técnica' },
    { name: 'Coordenação de Campo' },
  ],
  etica: [
    { name: 'Aprovação CEP/CONEP', desc: 'Pesquisas com seres humanos' },
    { name: 'DPO (Data Protection Officer)', desc: 'Conformidade LGPD' },
  ],
  conselhoConsultivo: {
    note:
      'Formado por profissionais nomeados das instituições parceiras e pelo DPO do projeto — credibilidade vem de pessoas identificáveis e auditáveis publicamente, seguindo referências internacionais de conselhos consultivos de saúde comunitária.',
    members: [
      { name: 'A definir', institution: 'FEPECS', area: 'Ensino em Saúde' },
      { name: 'A definir', institution: 'UnB', area: 'Pesquisa Acadêmica' },
      { name: 'A definir', institution: 'FIOCRUZ', area: 'Epidemiologia' },
      { name: 'A definir', institution: 'DPO do Projeto', area: 'Privacidade e LGPD' },
    ],
  },
};

// Nota de referência internacional — usada como footnote sempre que o corpo do texto
// mencionar "referências internacionais" em vez de citar diretamente um benchmark específico.
export const internationalReferencesNote =
  'Referência internacional: BlackDoctor.com/.org (EUA) — mídia de saúde com 20 anos de atuação e 6M de visitas/mês, referência em confiança comunitária e storytelling em saúde.';

export const lgpdConsentLevels = [
  { level: 1, name: 'Uso do app', required: true, desc: 'Obrigatório para utilizar as funcionalidades básicas.' },
  { level: 2, name: 'Participação em pesquisas', required: false, desc: 'Opcional — dados pseudonimizados para estudos.' },
  { level: 3, name: 'Dados agregados para políticas públicas', required: false, desc: 'Opcional — agregação sem identificação individual.' },
  { level: 4, name: 'Geolocalização precisa', required: false, desc: 'Opcional — apenas para navegação em saúde (UBS mais próxima).' },
];

export const dataDomains = [
  {
    id: 'publico',
    name: 'Conteúdo público (sem PII)',
    desc: 'Biblioteca de saúde, relatórios anuais, mapa de UBS — acessível sem cadastro, sem dados pessoais.',
  },
  {
    id: 'pesquisa',
    name: 'Pesquisa populacional anônima',
    desc: 'Questionário voluntário, pseudonimizado, consentimento nível 2 — usado para estudos e políticas públicas.',
  },
  {
    id: 'clinico',
    name: 'Triagem clínico-social identificável',
    desc: 'CPF/CNS, classificação de risco de enfermagem — acesso restrito a profissionais, retenção conforme LGPD.',
  },
];

// Regiões de Saúde do DF (Superintendências) — Fonte oficial: saude.df.gov.br/regioes-de-saude
export const healthRegions = [
  {
    id: 'srsce',
    sigla: 'SRSCE',
    nome: 'Região Central',
    ras: ['Plano Piloto (Asa Norte, Asa Sul, Vila Planalto, Noroeste)', 'Cruzeiro', 'Sudoeste', 'Lago Norte', 'Lago Sul', 'Varjão'],
    superintendente: 'Paulo Roberto da Silva Júnior',
    telefone: '(61) 3449-4593/4594',
    email: 'srsce.ses@saude.df.gov.br',
    hospitalSedeId: 'hran',
  },
  {
    id: 'srscs',
    sigla: 'SRSCS',
    nome: 'Região Centro-Sul',
    ras: ['Candangolândia', 'Estrutural', 'Guará', 'Park Way', 'Núcleo Bandeirante', 'Riacho Fundo I', 'Riacho Fundo II', 'SIA', 'SCIA'],
    superintendente: 'Ronan Araújo Garcia',
    telefone: '(61) 3449-4877/4878',
    email: 'regiaocentrosul.sesdf@saude.df.gov.br',
    hospitalSedeId: 'hrgu',
  },
  {
    id: 'srsno',
    sigla: 'SRSNO',
    nome: 'Região Norte',
    ras: ['Planaltina', 'Arapoanga', 'Sobradinho I', 'Sobradinho II', 'Fercal'],
    superintendente: 'Debora Cristina da Silva Fernandes Gonçalves',
    telefone: '(61) 3449-5475/5476',
    email: 'srsno.ses@saude.df.gov.br',
    hospitalSedeId: 'hrs',
  },
  {
    id: 'srssu',
    sigla: 'SRSSU',
    nome: 'Região Sul',
    ras: ['Gama', 'Santa Maria'],
    superintendente: 'Gabriel Pimentel da Silva',
    telefone: '(61) 3449-7037/7038',
    email: 'ses.srssu@saude.df.gov.br',
    hospitalSedeId: 'hrg',
  },
  {
    id: 'srsle',
    sigla: 'SRSLE',
    nome: 'Região Leste',
    ras: ['Paranoá', 'Itapoã', 'São Sebastião', 'Jardim Botânico'],
    superintendente: 'Maria de Lourdes Castelo Branco',
    telefone: '(61) 3449-5146/5147',
    email: 'srsle.ses@saude.df.gov.br',
    hospitalSedeId: 'hrpa',
  },
  {
    id: 'srsoe',
    sigla: 'SRSOE',
    nome: 'Região Oeste',
    ras: ['Brazlândia', 'Ceilândia', 'Sol Nascente/Pôr do Sol'],
    superintendente: 'Lucilene Maria Florêncio de Queiroz',
    telefone: '(61) 3449-5944/5945',
    email: 'srsoe@saude.df.gov.br',
    hospitalSedeId: 'hrc',
  },
  {
    id: 'srsso',
    sigla: 'SRSSO',
    nome: 'Região Sudoeste',
    ras: ['Águas Claras', 'Recanto das Emas', 'Samambaia', 'Taguatinga', 'Vicente Pires', 'Água Quente'],
    superintendente: 'José Henrique Barbosa de Alencar',
    telefone: '(61) 3449-6458/6459',
    email: 'super.sudoeste@saude.df.gov.br',
    hospitalSedeId: 'hrt',
  },
];

// As 35 Regiões Administrativas (RAs) oficiais do Distrito Federal — Fonte: Lei 4.545/1964 e leis de
// criação posteriores (últimas: Lei 7.190/2022 — Arapoanga; Lei 7.191/2022 — Água Quente).
// Uso: dropdowns de localização no App Sentinela (Questionário de linha de base, Relato de discriminação).
export const dfAdministrativeRegions = [
  'Plano Piloto', 'Gama', 'Taguatinga', 'Brazlândia', 'Sobradinho', 'Planaltina', 'Paranoá',
  'Núcleo Bandeirante', 'Ceilândia', 'Guará', 'Cruzeiro', 'Samambaia', 'Santa Maria', 'São Sebastião',
  'Recanto das Emas', 'Lago Sul', 'Riacho Fundo', 'Lago Norte', 'Candangolândia', 'Águas Claras',
  'Riacho Fundo II', 'Sudoeste/Octogonal', 'Varjão', 'Park Way', 'SCIA/Estrutural', 'Sobradinho II',
  'Jardim Botânico', 'Itapoã', 'SIA', 'Vicente Pires', 'Fercal', 'Sol Nascente/Pôr do Sol', 'Arniqueira',
  'Arapoanga', 'Água Quente',
];

// Municípios da RIDE-DF (Região Integrada de Desenvolvimento do Distrito Federal e Entorno) — 33 municípios
// além do DF, conforme Lei Complementar 94/1998 e Lei Complementar 163/2018. Fonte: Palácio do Planalto /
// pt.wikipedia.org/wiki/Região_Integrada_de_Desenvolvimento_do_Distrito_Federal_e_Entorno (consultado 2026).
export const rideEntornoMunicipalities = [
  { nome: 'Abadiânia', uf: 'GO' },
  { nome: 'Água Fria de Goiás', uf: 'GO' },
  { nome: 'Águas Lindas de Goiás', uf: 'GO' },
  { nome: 'Alexânia', uf: 'GO' },
  { nome: 'Alto Paraíso de Goiás', uf: 'GO' },
  { nome: 'Alvorada do Norte', uf: 'GO' },
  { nome: 'Barro Alto', uf: 'GO' },
  { nome: 'Cabeceiras', uf: 'GO' },
  { nome: 'Cavalcante', uf: 'GO' },
  { nome: 'Cidade Ocidental', uf: 'GO' },
  { nome: 'Cocalzinho de Goiás', uf: 'GO' },
  { nome: 'Corumbá de Goiás', uf: 'GO' },
  { nome: 'Cristalina', uf: 'GO' },
  { nome: 'Flores de Goiás', uf: 'GO' },
  { nome: 'Formosa', uf: 'GO' },
  { nome: 'Goianésia', uf: 'GO' },
  { nome: 'Luziânia', uf: 'GO' },
  { nome: 'Mimoso de Goiás', uf: 'GO' },
  { nome: 'Niquelândia', uf: 'GO' },
  { nome: 'Novo Gama', uf: 'GO' },
  { nome: 'Padre Bernardo', uf: 'GO' },
  { nome: 'Pirenópolis', uf: 'GO' },
  { nome: 'Planaltina (GO)', uf: 'GO' },
  { nome: 'Santo Antônio do Descoberto', uf: 'GO' },
  { nome: 'São João d’Aliança', uf: 'GO' },
  { nome: 'Simolândia', uf: 'GO' },
  { nome: 'Valparaíso de Goiás', uf: 'GO' },
  { nome: 'Vila Boa', uf: 'GO' },
  { nome: 'Vila Propício', uf: 'GO' },
  { nome: 'Arinos', uf: 'MG' },
  { nome: 'Buritis', uf: 'MG' },
  { nome: 'Cabeceira Grande', uf: 'MG' },
  { nome: 'Unaí', uf: 'MG' },
];

// Lista combinada e ordenada para uso direto em dropdowns: 35 RAs do DF + 33 municípios da RIDE/Entorno.
export const dfAndRideLocationOptions = [
  ...dfAdministrativeRegions.map((ra) => ({ label: ra, group: 'Distrito Federal (Regiões Administrativas)' })),
  ...rideEntornoMunicipalities.map((m) => ({
    label: `${m.nome} (${m.uf})`,
    group: 'Entorno / RIDE-DF',
  })),
];

// Hospitais Regionais do DF — Fonte oficial: saude.df.gov.br (páginas individuais de cada unidade)
export const regionalHospitals = [
  {
    id: 'hran',
    sigla: 'HRAN',
    nome: 'Hospital Regional da Asa Norte',
    regionId: 'srsce',
    endereco: 'SMHN Quadra 101 Bloco A, Área Especial',
    cep: '70.710-905',
    telefone: '(61) 3449-4650/4651',
    servicos: ['Emergência 24h', 'Cirurgia Geral', 'Clínica Médica', 'Ginecologia e Obstetrícia', 'Queimados', 'Cirurgia Plástica', 'Odontologia'],
    lat: -15.7797,
    lng: -47.8827,
    fonte: 'https://www.saude.df.gov.br/carta-servicos-hran',
  },
  {
    id: 'hrbraz',
    sigla: 'HRBz',
    nome: 'Hospital Regional de Brazlândia',
    regionId: 'srsoe',
    endereco: 'Área Especial 06, Setor Tradicional',
    cep: '73.740-793',
    telefone: '(61) 3449-6318/6319',
    servicos: ['Emergência 24h', 'Clínica Médica', 'Cirurgia Geral', 'Ginecologia e Obstetrícia'],
    lat: -15.6683,
    lng: -48.1439,
    fonte: 'https://www.saude.df.gov.br/brazlandia-urgencia-e-emergencia',
  },
  {
    id: 'hrc',
    sigla: 'HRC',
    nome: 'Hospital Regional de Ceilândia',
    regionId: 'srsoe',
    endereco: 'QNM 27 Área Especial 1, QNM 28',
    cep: '72.215-270',
    telefone: '(61) 3449-6027/6028/6029',
    servicos: ['Emergência 24h', 'Ambulatorial', 'Banco de Leite', 'Internação Domiciliar (NRAD)', 'Ouvidoria', 'Serviço Social', 'Voluntariado'],
    lat: -15.8153,
    lng: -48.1074,
    fonte: 'https://www.saude.df.gov.br/hospital-regional-de-ceilandia',
  },
  {
    id: 'hrg',
    sigla: 'HRG',
    nome: 'Hospital Regional do Gama',
    regionId: 'srssu',
    endereco: 'Área Especial nº 1, Setor Central',
    cep: '72.405-901',
    telefone: '(61) 3449-7044/7039',
    servicos: ['Emergência 24h', 'Maternidade', 'UTI', 'Banco de Leite', 'Ortopedia', 'Cardiologia', 'Núcleo de Atenção Domiciliar (NRAD)'],
    lat: -16.0181,
    lng: -48.0656,
    fonte: 'https://www.saude.df.gov.br/hospital-regional-do-gama',
  },
  {
    id: 'hrgu',
    sigla: 'HRGu',
    nome: 'Hospital Regional do Guará',
    regionId: 'srscs',
    endereco: 'QI 06 Área Especial C, Guará I',
    cep: '71.010-006',
    telefone: '(61) 3449-4943/4944',
    servicos: ['Emergência 24h', 'Clínica Médica', 'Pediatria'],
    lat: -15.8244,
    lng: -47.9772,
    fonte: 'https://www.saude.df.gov.br/hospital-do-guar%C3%A1',
  },
  {
    id: 'hrpa',
    sigla: 'HRL',
    nome: 'Hospital da Região Leste (Paranoá)',
    regionId: 'srsle',
    endereco: 'Área Especial Hospitalar, Quadra 2, Conjunto K, Lote 1',
    cep: '71.570-050',
    telefone: '(61) 3449-5225/5224',
    servicos: ['Emergência 24h', 'Trauma (Ortopedia e Cirurgia Geral)', 'Pediatria', 'Ginecologia e Obstetrícia', 'Maternidade'],
    lat: -15.7642,
    lng: -47.7719,
    fonte: 'https://www.saude.df.gov.br/hospital-regiao-leste',
  },
  {
    id: 'hrpl',
    sigla: 'HRPl',
    nome: 'Hospital Regional de Planaltina',
    regionId: 'srsno',
    endereco: 'Av. WL4, Área Especial, Setor Hospitalar',
    cep: '73.310-000',
    telefone: '(61) 3449-5753',
    servicos: ['Emergência 24h', 'Ambulatorial', 'Banco de Leite', 'Banco de Sangue', 'Ecografia', 'Hospital Amigo da Criança (IHAC)'],
    lat: -15.6169,
    lng: -47.6547,
    fonte: 'https://www.saude.df.gov.br/hospital-regional-de-planaltina',
  },
  {
    id: 'hrsm',
    sigla: 'HRSM',
    nome: 'Hospital Regional de Santa Maria',
    regionId: 'srssu',
    endereco: 'Quadra AC 102, Conjuntos A a D',
    cep: '72.502-100',
    telefone: '(61) 4042-7770',
    servicos: ['Emergência 24h', 'Clínica Médica e Cirúrgica', 'Ginecologia e Obstetrícia', 'Pediatria', 'Ortopedia', 'UTI Adulto/Pediátrica/Neonatal'],
    lat: -16.0206,
    lng: -47.9878,
    fonte: 'https://www.saude.df.gov.br/ceo-hospital-regional-de-santa-maria-hrsm',
  },
  {
    id: 'hrsam',
    sigla: 'HRSam',
    nome: 'Hospital Regional de Samambaia',
    regionId: 'srsso',
    endereco: 'QS 614 Conjunto C, Lotes 1/2',
    cep: '72.322-583',
    telefone: '(61) 3449-6810/6811/6812',
    servicos: ['Emergência 24h', 'Clínica Médica', 'Ginecologia e Obstetrícia'],
    lat: -15.8752,
    lng: -48.0904,
    fonte: 'https://www.saude.df.gov.br/w/hospital-regional-de-samambaia',
  },
  {
    id: 'hrs',
    sigla: 'HRS',
    nome: 'Hospital Regional de Sobradinho',
    regionId: 'srsno',
    endereco: 'Q 12 Conjunto B, Lote 38',
    cep: '73.010-120',
    telefone: '(61) 3449-5542/5543',
    servicos: ['Emergência 24h', 'Banco de Leite', 'Banco de Sangue', 'CAPSI', 'CAPS AD', 'Nefrologia', 'Núcleo de Atenção Domiciliar (NRAD)'],
    lat: -15.6529,
    lng: -47.8291,
    fonte: 'https://www.saude.df.gov.br/hospital-de-sobradinho',
  },
  {
    id: 'hrt',
    sigla: 'HRT',
    nome: 'Hospital Regional de Taguatinga',
    regionId: 'srsso',
    endereco: 'QNC Área Especial 24, Taguatinga Norte',
    cep: '72.120-970',
    telefone: '(61) 3449-6534/6535/6536/6537',
    servicos: ['Emergência 24h', 'Clínica Médica e Cirúrgica', 'Trauma', 'Ginecologia e Obstetrícia', 'Oftalmologia', 'Ortopedia', 'Pediatria', 'UTI Adulto/Pediátrica/Neonatal'],
    lat: -15.8342,
    lng: -48.0575,
    fonte: 'https://www.saude.df.gov.br/hospital-de-taguatinga',
  },
];

// ============================================================================
// UPAs — Unidades de Pronto Atendimento 24h
// Fonte oficial: saude.df.gov.br/upa-24h + Relatórios Anuais de Gestão Regional (SES-DF, 2022/2023)
// As 13 UPAs listadas oficialmente pela SES-DF, com endereço e região de saúde.
// ============================================================================
export const emergencyUnits = [
  {
    id: 'upa-brazlandia',
    sigla: 'UPA',
    nome: 'UPA Brazlândia',
    regionId: 'srsoe',
    ra: 'Brazlândia',
    endereco: 'Quadra 37, Área Especial 1, Vila São José',
    cep: '72.737-000',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-ceilandia-1',
    sigla: 'UPA',
    nome: 'UPA Ceilândia I',
    regionId: 'srsoe',
    ra: 'Ceilândia',
    endereco: 'QNN 27, Área Especial D',
    cep: '72.225-270',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-ceilandia-2',
    sigla: 'UPA',
    nome: 'UPA Ceilândia II',
    regionId: 'srsoe',
    ra: 'Ceilândia',
    endereco: 'Expansão do Setor O, QNO 23, Área Especial',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-gama',
    sigla: 'UPA',
    nome: 'UPA Gama',
    regionId: 'srssu',
    ra: 'Gama',
    endereco: 'Quadra 105, Conjunto J, Área Especial 2, Setor Central',
    cep: '72.445-070',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-nucleo-bandeirante',
    sigla: 'UPA',
    nome: 'UPA Núcleo Bandeirante',
    regionId: 'srscs',
    ra: 'Núcleo Bandeirante',
    endereco: 'DF-075, Km 180, Área Especial, EPNB (Placa das Mercedes)',
    cep: '71.732-010',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-paranoa',
    sigla: 'UPA',
    nome: 'UPA Paranoá',
    regionId: 'srsle',
    ra: 'Paranoá',
    endereco: 'Área Especial Hospitalar, Quadra 2, Conjunto K, Lote 1',
    cep: '71.570-050',
    fonte: 'https://www.saude.df.gov.br/paranoa-urgencia-e-emergencia',
  },
  {
    id: 'upa-planaltina',
    sigla: 'UPA',
    nome: 'UPA Planaltina',
    regionId: 'srsno',
    ra: 'Planaltina',
    endereco: "Quadra 22, MD 1, Lote AE1, Setor Habitacional Mestre D'Armas",
    cep: '73.403-330',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-recanto-das-emas',
    sigla: 'UPA',
    nome: 'UPA Recanto das Emas',
    regionId: 'srsso',
    ra: 'Recanto das Emas',
    endereco: 'Quadra 400/600, Área Especial',
    cep: '72.625-000',
    fonte: 'https://www.saude.df.gov.br/rec-urgencia-e-emergencia',
  },
  {
    id: 'upa-riacho-fundo-2',
    sigla: 'UPA',
    nome: 'UPA Riacho Fundo II',
    regionId: 'srscs',
    ra: 'Riacho Fundo II',
    endereco: 'QN 31, Conjunto 3, Lote 1',
    cep: '71.880-140',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
  {
    id: 'upa-samambaia',
    sigla: 'UPA',
    nome: 'UPA Samambaia',
    regionId: 'srsso',
    ra: 'Samambaia',
    endereco: 'QS 107, Conjunto 04, Área Especial 01',
    cep: '72.301-524',
    fonte: 'https://www.saude.df.gov.br/upa-samambaia',
  },
  {
    id: 'upa-sao-sebastiao',
    sigla: 'UPA',
    nome: 'UPA São Sebastião',
    regionId: 'srsle',
    ra: 'São Sebastião',
    endereco: 'Quadra 102, Conjunto 1, Lote 1, Residencial Oeste',
    cep: '71.692-101',
    fonte: 'https://www.saude.df.gov.br/upa-sao-sebastiao',
  },
  {
    id: 'upa-sobradinho',
    sigla: 'UPA',
    nome: 'UPA Sobradinho',
    regionId: 'srsno',
    ra: 'Sobradinho II',
    endereco: 'DF 420, Km 03, em frente à AR 13, próximo ao COER',
    cep: '73.080-050',
    fonte: 'https://www.saude.df.gov.br/upa-sobradinho',
  },
  {
    id: 'upa-vicente-pires',
    sigla: 'UPA',
    nome: 'UPA Vicente Pires',
    regionId: 'srsso',
    ra: 'Vicente Pires',
    endereco: 'Rua 10, Quadra 4D, Chácara 135',
    cep: '72.007-240',
    fonte: 'https://www.saude.df.gov.br/upa-24h',
  },
];

// ============================================================================
// CEPAV — Centros de Especialidades para Atenção a Pessoas em Situação de
// Violência Sexual, Familiar e Doméstica ("Flores em Rede")
// Fonte oficial: saude.df.gov.br/carta-servicos-violencia
// ============================================================================
export const cepavUnits = [
  {
    id: 'cepav-margarida',
    nome: 'CEPAV Margarida',
    regionId: 'srsce',
    endereco: 'Ambulatório do HRAN, 1º Andar, Sala 04 — SMHN Q2, Asa Norte',
    telefone: '(61) 3449-4740 / 99237-0336',
    email: 'cepav.margarida@saude.df.gov.br',
    publicoAlvo: 'Mulheres (a partir de 18 anos) em violência doméstica, intrafamiliar e sexual; homens em situação de violência sexual',
  },
  {
    id: 'cepav-jardim',
    nome: 'CEPAV Jardim',
    regionId: 'srsce',
    endereco: 'Ambulatório do HRAN, 1º Andar, Sala 04 — SMHN Q2, Asa Norte',
    email: 'cepav.jardim@saude.df.gov.br',
    publicoAlvo: 'Pessoas em acompanhamento pelos demais CEPAV da rede',
  },
  {
    id: 'cepav-jasmim',
    nome: 'CEPAV Jasmim',
    regionId: 'srsce',
    endereco: 'Ambulatório do HRAN, 1º Andar, Sala 04 — SMHN Q2, Asa Norte',
    telefone: '(61) 3449-4739 / 99451-2967',
    email: 'cepav.jasmim@saude.df.gov.br',
    publicoAlvo: 'Crianças e familiares em violência sexual, física, negligência e maus-tratos; adolescentes ofensores sexuais',
  },
  {
    id: 'cepav-caliandra',
    nome: 'CEPAV Caliandra',
    regionId: 'srsce',
    endereco: 'Adolescentro — SGAS Quadra 605, Lote 32/33, Asa Sul',
    email: 'cepav.caliandra@saude.df.gov.br',
    publicoAlvo: 'Adolescentes de 12 a 17 anos em situação de violência sexual',
  },
  {
    id: 'cepav-alecrim',
    nome: 'CEPAV Alecrim',
    regionId: 'srsce',
    endereco: 'Ambulatório do HRAN, Térreo, Corredor Vermelho, Sala 03 — SMHN Q2, Asa Norte',
    telefone: '(61) 3449-4738',
    email: 'cepav.alecrim@saude.df.gov.br',
    publicoAlvo: 'Pessoa adulta autora de violência sexual intrafamiliar de crianças e adolescentes',
  },
  {
    id: 'cepav-primavera',
    nome: 'CEPAV Primavera',
    regionId: 'srscs',
    endereco: 'Policlínica da Região Centro-Sul — HRGu, Área Especial QI 06, Lote C, Guará I',
    telefone: '(61) 3449-5127 / WhatsApp (61) 99451-0035',
    email: 'srscs.pavprimavera@saude.df.gov.br',
    publicoAlvo: 'Pessoas em situação de violência em qualquer ciclo de vida, e suas famílias',
  },
  {
    id: 'cepav-alfazema',
    nome: 'CEPAV Alfazema',
    regionId: 'srscs',
    endereco: 'Policlínica da Região Centro-Sul — Núcleo Bandeirante, 3ª Avenida, Área Especial nº 03',
    telefone: '(61) 2017-1145 ramal 8170 / WhatsApp (61) 9451-2245',
    email: 'srscs.pavalfazema@saude.df.gov.br',
    publicoAlvo: 'Pessoas em situação de violência em qualquer ciclo de vida, e suas famílias',
  },
  {
    id: 'cepav-flor-de-lotus',
    nome: 'CEPAV Flor de Lótus',
    regionId: 'srsoe',
    endereco: 'Hospital Regional de Ceilândia (HRC) — QNM 27, Área Especial 1',
    telefone: '(61) 2017-2000 ramal 3155',
    email: 'srsoe.nupav@saude.df.gov.br',
    publicoAlvo: 'Crianças, adolescentes, mulheres e homens em situação de violência sexual, familiar e doméstica',
  },
  {
    id: 'cepav-flor-do-cerrado',
    nome: 'CEPAV Flor do Cerrado',
    regionId: 'srssu',
    endereco: 'Hospital Regional de Santa Maria (HRSM) — Quadra AC 102, Conjuntos A, B, C e D',
    telefone: '(61) 3449-7356 / 4042-7770 ramal 5525',
    email: 'cepavflordocerrado@gmail.com',
    publicoAlvo: 'Pessoas em situação de violência em qualquer ciclo de vida, e suas famílias',
  },
  {
    id: 'cepav-gardenia',
    nome: 'CEPAV Gardênia',
    regionId: 'srssu',
    endereco: 'Hospital Regional do Gama (HRG) — Área Especial nº 1, Setor Central',
    telefone: '(61) 3449-7357/7354/7355 / (61) 99201-7372',
    email: 'nupav.srssu@saude.df.gov.br',
    publicoAlvo: 'Pessoas em todo ciclo de vida em situação de violência interpessoal, familiar e doméstica',
  },
  {
    id: 'cepav-girassol',
    nome: 'CEPAV Girassol',
    regionId: 'srsle',
    endereco: 'Hospital da Região Leste (HRL) — Área Especial, Quadra 2, Conjunto K, Lote 1, Paranoá',
    telefone: '(61) 2017-1550 ramal 1711 / (61) 99264-2694',
    email: 'cepav.girassol@saude.df.gov.br',
    publicoAlvo: 'Crianças (a partir de 4 anos), adolescentes, jovens, adultos e idosos',
  },
  {
    id: 'cepav-tulipa',
    nome: 'CEPAV Tulipa',
    regionId: 'srsle',
    endereco: 'Centro de Múltiplas Atividades 10 — UBS nº 1, São Sebastião',
    telefone: '(61) 99175-2409',
    email: 'cepav.tulipa@saude.df.gov.br',
    publicoAlvo: 'Crianças (a partir de 4 anos), adolescentes, jovens, adultos e idosos',
  },
  {
    id: 'cepav-flor-de-lis',
    nome: 'CEPAV Flor de Lis',
    regionId: 'srsno',
    endereco: 'Hospital Regional de Planaltina — Via W/L 4, Área Especial',
    telefone: '(61) 3449-5749 / 99262-0729',
    email: 'cepav.flordelis@saude.df.gov.br',
    publicoAlvo: 'Crianças (a partir de 7 anos), adolescentes, mulheres, adultos, idosos',
  },
  {
    id: 'cepav-sempre-viva',
    nome: 'CEPAV Sempre Viva',
    regionId: 'srsno',
    endereco: 'Hospital Regional de Sobradinho — Quadra Central, Área Administrativa, Bloco B (antiga CEB), Sobradinho I',
    telefone: '(61) 3449-5541 / WhatsApp (61) 99253-2414',
    email: 'cepav.sempreviva@saude.df.gov.br',
    publicoAlvo: 'Crianças, adolescentes, mulheres, adultos e idosos',
  },
  {
    id: 'cepav-orquidea',
    nome: 'CEPAV Orquídea',
    regionId: 'srsso',
    endereco: 'Hospital Regional de Samambaia (HRSam) — QS 614, Conjunto C, Lotes 01 e 02',
    telefone: '(61) 3449-7009 / 99155-2702',
    email: 'cepav.orquidea@saude.df.gov.br',
    publicoAlvo: 'Crianças, adolescentes, adultos (mulheres, homens e idosos)',
  },
  {
    id: 'cepav-azaleia',
    nome: 'CEPAV Azaleia',
    regionId: 'srsso',
    endereco: 'Hospital Regional de Taguatinga (HRT) — QNC, Área Especial nº 24 (ambulatório ao lado da matrícula)',
    telefone: '(61) 3449-6678 / 99357-5529',
    email: 'cepav.azaleia@saude.df.gov.br',
    publicoAlvo: 'Crianças, adolescentes e adultos em situação de violência sexual, familiar e doméstica',
  },
  {
    id: 'cepav-amarilis',
    nome: 'CEPAV Amarilis',
    regionId: 'srsso',
    endereco: 'UBS 03 Recanto das Emas — Quadra 104/105, Área Especial, Lote 25, Área Hospitalar',
    telefone: '(61) 99171-4300',
    email: 'cepav.amarilis@saude.df.gov.br',
    publicoAlvo: 'Crianças, adolescentes e adultos em situação de violência sexual, familiar e doméstica',
  },
  {
    id: 'cepav-violeta',
    nome: 'CEPAV Violeta',
    regionId: 'srsce',
    ra: 'Asa Sul (atendimento a todo o DF)',
    endereco: 'Hospital Materno Infantil de Brasília (HMIB) — SGAS Quadra 608/609, Módulo A, Asa Sul',
    telefone: '(61) 3449-7759 (WhatsApp e ligação)',
    email: 'pavvioleta.hmib@saude.df.gov.br',
    publicoAlvo: 'Crianças até 11 anos com todos os tipos de violência, pacientes internados no CO/pediatria e seus familiares; mulheres a partir de 18 anos',
  },
  {
    id: 'pigl-hmib',
    nome: 'PIGL — Programa de Interrupção Gestacional Prevista em Lei',
    regionId: 'srsce',
    ra: 'Asa Sul (atendimento a todo o DF)',
    endereco: 'Hospital Materno Infantil de Brasília (HMIB) — SGAS Quadra 608/609, Módulo A, Asa Sul',
    telefone: '(61) 3449-7667',
    email: 'pigl.hmib@gmail.com',
    publicoAlvo: 'Vítimas de violência sexual com gestação decorrente de estupro (avaliação e interrupção gestacional prevista em lei)',
  },
];

// ============================================================================
// UBS — Unidades Básicas de Saúde
// Fonte oficial: Relatórios Anuais de Gestão Regional (SES-DF, 2022/2023) e
// ANEXO VI — Relação de Unidades de Saúde do Distrito Federal (SEPE-DF).
// Cobertura: lista completa/quase completa para as Regiões Oeste e Sul;
// amostragem representativa (unidades confirmadas com endereço oficial) para
// as demais Regiões — a rede da SES-DF conta com mais de 170 UBS no total,
// e novas unidades vêm sendo abertas continuamente.
// ============================================================================
export const healthUnits = [
  // ---- Região Central (SRSCE) ----
  { id: 'ubs-central-01', name: 'UBS 1 Asa Sul', regionId: 'srsce', ra: 'Asa Sul', endereco: 'SGAS Quadra 612/613, Lotes 38/39' },
  { id: 'ubs-central-02', name: 'UBS 1 Asa Norte', regionId: 'srsce', ra: 'Asa Norte', endereco: 'SGAN Quadra 905, Módulo D' },
  { id: 'ubs-central-03', name: 'UBS 2 Asa Norte', regionId: 'srsce', ra: 'Asa Norte', endereco: 'EQN 114/115, Área Especial' },
  { id: 'ubs-central-04', name: 'UBS 3 Asa Norte (Vila Planalto)', regionId: 'srsce', ra: 'Vila Planalto', endereco: 'Rua Piauí, Área Especial, S/N' },
  { id: 'ubs-central-05', name: 'UBS 5 Asa Norte (Granja do Torto)', regionId: 'srsce', ra: 'Asa Norte', endereco: 'Quadra 1, Granja do Torto' },
  { id: 'ubs-central-06', name: 'UBS 3 Lago Sul', regionId: 'srsce', ra: 'Lago Sul', endereco: 'SHIS QI 21, Área Especial' },
  { id: 'ubs-central-07', name: 'UBS 1 Lago Norte', regionId: 'srsce', ra: 'Lago Norte', endereco: 'SHIN QI 03, Área Especial' },
  { id: 'ubs-central-08', name: 'UBS 1 Cruzeiro', regionId: 'srsce', ra: 'Cruzeiro', endereco: 'SHCES Quadra 601, Lote 01, Cruzeiro Novo' },
  { id: 'ubs-central-09', name: 'UBS 2 Cruzeiro', regionId: 'srsce', ra: 'Cruzeiro', endereco: 'Setor Escolar, Lote 04, Cruzeiro Velho' },
  { id: 'ubs-central-10', name: 'UBS 1 Varjão', regionId: 'srsce', ra: 'Varjão', endereco: 'Quadra 05, Conjunto A, Lote 17, Vila Varjão' },

  // ---- Região Centro-Sul (SRSCS) ----
  { id: 'ubs-centrosul-01', name: 'UBS 1 Guará', regionId: 'srscs', ra: 'Guará', endereco: 'SRIA QI 06, Lote C, Guará I' },
  { id: 'ubs-centrosul-02', name: 'UBS 2 Guará', regionId: 'srscs', ra: 'Guará', endereco: 'QE 23, Área Especial, Lote C, Guará II' },
  { id: 'ubs-centrosul-03', name: 'UBS 3 Guará', regionId: 'srscs', ra: 'Guará', endereco: 'QE 38, Guará II, Área Especial' },
  { id: 'ubs-centrosul-04', name: 'UBS 4 Guará', regionId: 'srscs', ra: 'Guará', endereco: 'QELC EQ 2/3, Conjunto Lúcio Costa' },
  { id: 'ubs-centrosul-05', name: 'UBS 5 Guará', regionId: 'srscs', ra: 'Guará', endereco: 'QE 38, Conjunto O, Área Especial' },
  { id: 'ubs-centrosul-06', name: 'UBS 1 Núcleo Bandeirante', regionId: 'srscs', ra: 'Núcleo Bandeirante', endereco: '3ª Avenida, Área Especial nº 03' },
  { id: 'ubs-centrosul-07', name: 'UBS 2 Núcleo Bandeirante', regionId: 'srscs', ra: 'Núcleo Bandeirante', endereco: 'Rua 1, Setor dos Engenheiros, Área Especial nº 02' },
  { id: 'ubs-centrosul-08', name: 'UBS 1 Park Way', regionId: 'srscs', ra: 'Park Way', endereco: 'Área Especial nº 01, Vargem Bonita' },
  { id: 'ubs-centrosul-09', name: 'UBS 1 Candangolândia', regionId: 'srscs', ra: 'Candangolândia', endereco: 'EQR 05/07, Área Especial nº 01' },
  { id: 'ubs-centrosul-10', name: 'UBS 1 Riacho Fundo I', regionId: 'srscs', ra: 'Riacho Fundo I', endereco: 'QN 09, Área Especial nº 11' },
  { id: 'ubs-centrosul-11', name: 'UBS 2 Riacho Fundo I', regionId: 'srscs', ra: 'Riacho Fundo I', endereco: 'QN 01, Conjunto 32, Área Especial' },
  { id: 'ubs-centrosul-12', name: 'UBS 1 Riacho Fundo II', regionId: 'srscs', ra: 'Riacho Fundo II', endereco: 'QC 06, Conjunto 16, Lote 01' },
  { id: 'ubs-centrosul-13', name: 'UBS 1 Estrutural', regionId: 'srscs', ra: 'Estrutural', endereco: 'Área Especial 01, Setor Central' },

  // ---- Região Norte (SRSNO) ----
  { id: 'ubs-norte-01', name: 'UBS 1 Planaltina', regionId: 'srsno', ra: 'Planaltina', endereco: 'Quadra 18, Conjunto H, Área Especial 01, Buritis IV' },
  { id: 'ubs-norte-02', name: 'UBS 5 Planaltina', regionId: 'srsno', ra: 'Planaltina', endereco: 'Quadra 12, Conjunto I, Arapoanga' },
  { id: 'ubs-norte-03', name: 'UBS 9 Planaltina', regionId: 'srsno', ra: 'Planaltina', endereco: 'DF 130, Km 25, Núcleo Rural Santos Dumont' },
  { id: 'ubs-norte-04', name: 'UBS 1 Sobradinho', regionId: 'srsno', ra: 'Sobradinho', endereco: 'QD 14, Área Especial nº 22/23' },
  { id: 'ubs-norte-05', name: 'UBS 1 Sobradinho II', regionId: 'srsno', ra: 'Sobradinho II', endereco: 'AR 13, Conjunto 07, Lote 01', cep: '73.062-712' },
  { id: 'ubs-norte-06', name: 'UBS 1 Fercal', regionId: 'srsno', ra: 'Fercal', endereco: 'DF 150, Km 12, Quadra 10, Lote 14' },

  // ---- Região Sul (SRSSU) — Gama e Santa Maria ----
  { id: 'ubs-sul-gama-01', name: 'UBS 1 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Entrequadra 06/12, Setor Sul' },
  { id: 'ubs-sul-gama-02', name: 'UBS 2 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Quadra 11, Área Especial, Lotes A, B, C, D' },
  { id: 'ubs-sul-gama-03', name: 'UBS 3 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'EQ 3/5, Área Especial, Setor Leste' },
  { id: 'ubs-sul-gama-04', name: 'UBS 4 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Praça 3, Área Especial, Setor Leste' },
  { id: 'ubs-sul-gama-05', name: 'UBS 5 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Área Especial, Lote 38, Setor Central' },
  { id: 'ubs-sul-gama-06', name: 'UBS 6 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Entrequadra 12/16, Área Especial, Setor Oeste' },
  { id: 'ubs-sul-gama-07', name: 'UBS 7 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Área Especial nº 1, Estádio Bezerrão, Setor Central' },
  { id: 'ubs-sul-gama-08', name: 'UBS 8 Gama (DVO)', regionId: 'srssu', ra: 'Gama', endereco: 'Travessa Eucaliptos nº 4, Área Especial DVO' },
  { id: 'ubs-sul-gama-09', name: 'UBS 9 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Engenho das Lages, Rua Libânio, Casa nº 13' },
  { id: 'ubs-sul-gama-11', name: 'UBS 11 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'DF 475, Km 05, Núcleo Rural Ponte Alta Norte' },
  { id: 'ubs-sul-gama-12', name: 'UBS 12 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Ponte Alta, DF 290 (antigo Posto Fiscal)' },
  { id: 'ubs-sul-gama-13', name: 'UBS 13 Gama', regionId: 'srssu', ra: 'Gama', endereco: 'Quadra 26, Casa 39, Setor Leste' },
  { id: 'ubs-sul-sm-01', name: 'UBS 1 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'Quadra 207/307, Conjunto T, Área Especial' },
  { id: 'ubs-sul-sm-02', name: 'UBS 2 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'EQ 217/317, Lote E' },
  { id: 'ubs-sul-sm-03', name: 'UBS 3 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'Quadra 100, Conjunto I, Lote 01, Área Especial' },
  { id: 'ubs-sul-sm-05', name: 'UBS 5 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'Entre Quadra 212/213, Área Especial' },
  { id: 'ubs-sul-sm-06', name: 'UBS 6 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'Entre Quadra 202/203, Área Especial' },
  { id: 'ubs-sul-sm-07', name: 'UBS 7 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'Av. Brigadeiro Pinto de Moura, S/N, Área Especial' },
  { id: 'ubs-sul-sm-08', name: 'UBS 8 Santa Maria', regionId: 'srssu', ra: 'Santa Maria', endereco: 'EQ 418/518' },
  { id: 'ubs-sul-sm-10', name: 'UBS 10 Santa Maria (DVO)', regionId: 'srssu', ra: 'Santa Maria', endereco: 'Área Especial do DVO, Rua do Eucalipto nº 04' },

  // ---- Região Leste (SRSLE) ----
  { id: 'ubs-leste-01', name: 'UBS 1 Itapoã', regionId: 'srsle', ra: 'Itapoã', endereco: 'QD 378, Conjunto L, Área Especial, Del Lago' },
  { id: 'ubs-leste-02', name: 'UBS 19 São Sebastião', regionId: 'srsle', ra: 'São Sebastião', endereco: 'Rua 07, Casa 400, Bairro Vila do Boa' },

  // ---- Região Oeste (SRSOE) — Ceilândia e Brazlândia (lista quase completa) ----
  { id: 'ubs-oeste-cei-01', name: 'UBS 1 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'EQNP 7/11, Área Especial' },
  { id: 'ubs-oeste-cei-02', name: 'UBS 2 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNN 15, Lote F, Área Especial' },
  { id: 'ubs-oeste-cei-03', name: 'UBS 3 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNM 15, Lote D, Área Especial' },
  { id: 'ubs-oeste-cei-05', name: 'UBS 5 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNM 16, Módulo F, Área Especial' },
  { id: 'ubs-oeste-cei-06', name: 'UBS 6 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'EQNP 10/14, Módulos E, F, G, H, Área Especial' },
  { id: 'ubs-oeste-cei-07', name: 'UBS 7 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNO 10, Área Especial D/E' },
  { id: 'ubs-oeste-cei-08', name: 'UBS 8 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'EQNP 13/17, Módulos A, B, C, D, Área Especial' },
  { id: 'ubs-oeste-cei-09', name: 'UBS 9 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'EQNP 28/32, Setor P Sul' },
  { id: 'ubs-oeste-cei-10', name: 'UBS 10 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNN 12, Área Especial 01' },
  { id: 'ubs-oeste-cei-11', name: 'UBS 11 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNO 10, Módulos D, E, Área Especial' },
  { id: 'ubs-oeste-cei-12', name: 'UBS 12 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNQ 03/04, Área Especial' },
  { id: 'ubs-oeste-cei-13', name: 'UBS 13 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'Núcleo Rural Boa Esperança' },
  { id: 'ubs-oeste-cei-14', name: 'UBS 14 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'Condomínio Privê Lucena Roriz, Rua 01, Área Especial 03, Módulo 12, Lote 01' },
  { id: 'ubs-oeste-cei-15', name: 'UBS 15 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNP 21, Área Especial' },
  { id: 'ubs-oeste-cei-16', name: 'UBS 16 Ceilândia (Sol Nascente)', regionId: 'srsoe', ra: 'Sol Nascente/Pôr do Sol', endereco: 'Quadra 501, Área Especial 02, Trecho 01, Setor Habitacional Sol Nascente, Conjunto B' },
  { id: 'ubs-oeste-cei-17', name: 'UBS 17 Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'EQNP 16/20' },
  { id: 'ubs-oeste-braz-01', name: 'UBS 1 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'EQ 6/8, Setor Norte, Área Especial 3' },
  { id: 'ubs-oeste-braz-02', name: 'UBS 2 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'QD 45, Área Especial 01, Vila São José' },
  { id: 'ubs-oeste-braz-03', name: 'UBS 3 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'Quadra 3, Lote 6, Área Especial nº 2, Setor Veredas' },
  { id: 'ubs-oeste-braz-04', name: 'UBS 4 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'Quadra 01, Área Especial 1, Setor Veredas II' },
  { id: 'ubs-oeste-braz-05', name: 'UBS 5 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'Reserva A, DF 240/DF 008, Km 445, Vicinal, Área Especial 1' },
  { id: 'ubs-oeste-braz-06', name: 'UBS 6 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'Fazenda Almécegas, BR 180/205, Km 05' },
  { id: 'ubs-oeste-braz-07', name: 'UBS 7 Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'Quadra 15, Lote 02, Loja 01, Área Especial 02, Incra 08' },

  // ---- Região Sudoeste (SRSSO) ----
  { id: 'ubs-sudoeste-01', name: 'UBS 1 Águas Claras', regionId: 'srsso', ra: 'Águas Claras', endereco: 'QS 05, Avenida Areal, Lote 24' },
  { id: 'ubs-sudoeste-02', name: 'UBS 1 Vicente Pires', regionId: 'srsso', ra: 'Vicente Pires', endereco: 'Rua 4C, Chácara 12, Colônia Agrícola Samambaia' },
  { id: 'ubs-sudoeste-03', name: 'UBS 1 Recanto das Emas', regionId: 'srsso', ra: 'Recanto das Emas', endereco: 'Quadra 307, Área Especial 01' },
  { id: 'ubs-sudoeste-04', name: 'UBS 1 Taguatinga', regionId: 'srsso', ra: 'Taguatinga', endereco: 'QNG, Área Especial 19' },
];

// ============================================================================
// CAPS — Centros de Atenção Psicossocial (lista não exaustiva)
// Fonte oficial: saude.df.gov.br/carta-de-servicos-caps — a rede completa de
// CAPS do DF é maior; endereços detalhados de todas as unidades devem ser
// confirmados na carta de serviços oficial antes de qualquer atendimento.
// ============================================================================
export const mentalHealthUnits = [
  { id: 'caps-asa-norte', nome: 'CAPS Asa Norte (CAPSi / CAPS II Brasília / CAPS III)', regionId: 'srsce', ra: 'Asa Norte', endereco: 'SGAN 905, Módulo D' },
  { id: 'caps-brazlandia', nome: 'CAPS I Brazlândia', regionId: 'srsoe', ra: 'Brazlândia', endereco: 'Quadra 01, Área Especial 2, Setor Veredas' },
  { id: 'caps-ad-ceilandia', nome: 'CAPS AD Ceilândia', regionId: 'srsoe', ra: 'Ceilândia', endereco: 'QNM 17, Área Especial (antigo Posto de Saúde, ao lado do HRC)' },
  { id: 'caps-riacho-fundo', nome: 'CAPS II Riacho Fundo', regionId: 'srscs', ra: 'Riacho Fundo', endereco: 'EPNB, Km 04, Área Especial, Av. Sucupira, Granja do Riacho Fundo' },
  { id: 'caps-ad-guara', nome: 'CAPS AD Guará', regionId: 'srscs', ra: 'Guará' },
  { id: 'caps-gama', nome: 'CAPS AD Gama', regionId: 'srssu', ra: 'Gama' },
  { id: 'caps-santa-maria', nome: 'CAPS AD Santa Maria', regionId: 'srssu', ra: 'Santa Maria' },
  { id: 'caps-itapoa', nome: 'CAPS AD II Itapoã', regionId: 'srsle', ra: 'Itapoã' },
  { id: 'caps-paranoa', nome: 'CAPS II Paranoá', regionId: 'srsle', ra: 'Paranoá' },
  { id: 'caps-planaltina', nome: 'CAPS II Planaltina', regionId: 'srsno', ra: 'Planaltina' },
  { id: 'caps-sobradinho-i', nome: 'CAPSi Sobradinho', regionId: 'srsno', ra: 'Sobradinho' },
  { id: 'caps-sobradinho-ad', nome: 'CAPS AD Sobradinho II', regionId: 'srsno', ra: 'Sobradinho II' },
  { id: 'caps-samambaia-iii', nome: 'CAPS III Samambaia', regionId: 'srsso', ra: 'Samambaia' },
  { id: 'caps-samambaia-ad', nome: 'CAPS AD III Samambaia', regionId: 'srsso', ra: 'Samambaia' },
  { id: 'caps-recanto-emas', nome: 'CAPSi Recanto das Emas', regionId: 'srsso', ra: 'Recanto das Emas' },
  { id: 'caps-taguatinga-i', nome: 'CAPSi Taguatinga', regionId: 'srsso', ra: 'Taguatinga' },
  { id: 'caps-taguatinga-ii', nome: 'CAPS II Taguatinga', regionId: 'srsso', ra: 'Taguatinga' },
];

// ============================================================================
// Outros serviços da rede SES-DF citados na busca oficial ("Busca Saúde")
// que não correspondem a um tipo de unidade com endereço próprio, mas a um
// programa/serviço distribuído pela rede já listada acima.
// ============================================================================
export const otherHealthServices = [
  {
    id: 'cta',
    titulo: 'CTA — Centro de Testagem e Aconselhamento',
    descricao:
      'Oferece testagem e aconselhamento para HIV, hepatites virais e outras IST, com sigilo garantido. O serviço também está disponível em UBS de referência da rede SES-DF.',
    fonte: 'https://www.saude.df.gov.br/hiv-aids',
  },
  {
    id: 'rede-materno-infantil',
    titulo: 'Rede Materno Infantil (Rede Alyne)',
    descricao:
      'Não é uma unidade própria: é a política de cuidado integral à gestante, puérpera e criança, implementada por meio do pré-natal nas UBS e do parto/maternidade nos Hospitais Regionais (HRG, HRSM, HRT, HRL, HMIB), conforme o Planejamento Regional Integrado 2024-2027.',
    fonte: 'https://saude.df.gov.br/rede-materna-infantil',
  },
  {
    id: 'pis',
    titulo: 'Práticas Integrativas em Saúde (PIS)',
    descricao:
      'Acupuntura, auriculoterapia, fitoterapia, meditação e outras práticas ofertadas como serviço adicional em UBS de referência de todas as Regiões de Saúde — não constituem unidade própria.',
    fonte: 'https://www.saude.df.gov.br/unidades-basicas',
  },
];

export const roadmap = [
  {
    fase: 'Fase 1 — MVP',
    periodo: '0-90 dias',
    objetivo: 'Validar conceito com piloto no DF',
    entregas: [
      'Autenticação e onboarding com consentimento LGPD (4 níveis)',
      'Questionário linha de base (5-10min)',
      'Check-ins recorrentes (1-3min)',
      'Mapa de 10 UBSs piloto',
      'Biblioteca de saúde com 7 temas prioritários',
      'Radar epidemiológico comunitário, opt-in e transparente',
    ],
  },
  {
    fase: 'Fase 2 — Piloto Territorial',
    periodo: '3-6 meses',
    objetivo: 'Transição de pesquisa para navegação em saúde',
    entregas: [
      'Push notifications inteligentes',
      'Integração com e-SUS',
      'Expansão para 50 UBSs',
      'Módulo de Formação/AVA (100 estudantes FEPECS)',
    ],
  },
  {
    fase: 'Fase 3 — Plataforma Nacional',
    periodo: '6-24 meses',
    objetivo: 'Vigilância sentinela nacional para população negra',
    entregas: [
      'Hub de Ensaios Clínicos',
      'Expansão para outras UFs (SP, RJ, BA, MG)',
      'Prontuário compartilhado (FHIR)',
      'APIs públicas para pesquisadores',
    ],
  },
];
