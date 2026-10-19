/**
 * PULSO CONTENT (PP3) — Conteúdo editorial da identidade ÚNICA de produção
 *
 * HISTÓRICO: durante o teste da arquitetura CEOS existiam 3 variantes de design
 * (GP0/PP1/PP2) com conteúdo próprio (variantContent.ts). Esse teste foi
 * encerrado. Em PP3 existe UMA única identidade de produção — "Pulso Preto" —
 * e portanto UM único conjunto de conteúdo, aqui.
 *
 * RECONCILIAÇÃO (D1 — "PP3 reconcilia somando"): o conteúdo abaixo é o
 * somatório do que existia em PP1 e PP2 — estrutura/nav/missão de PP1 + a seção
 * de "Últimas Notícias" (que só existia em PP2). Não há duplicação nem escolha
 * excludente: o que havia nas duas versões convive aqui.
 *
 * IMAGENS (D15): usa EXCLUSIVAMENTE o acervo já produzido para GP0/PP1/PP2 —
 * não gera novas imagens nem busca fotos. Removidas as menções a "placeholder"
 * do conteúdo exibido ao usuário (as legendas de crédito de banco de imagens
 * foram retiradas; o crédito/atribuição continua nos metadados internos, ver
 * docs/MAPEAMENTO_ARQUITETURA.md).
 *
 * IDIOMAS: cada campo existe em PT e ES (ContentByLocale). A troca de idioma é
 * feita em runtime por LocaleSwitcher (shared/components/LocaleSwitcher.tsx).
 */

import type { BrandImage } from './variants';
import type { LocaleId } from './locales';
import { BRAND_IMAGES } from './brandImages';

export type FeatureIconId = 'book' | 'location' | 'chart' | 'people' | 'heart' | 'document';

export interface FeatureCard {
  icon: FeatureIconId;
  title: string[];
  subtitle: string;
  /** Destino do atalho (D6/D9 — todo cartão leva a um serviço ou conteúdo real). */
  to: string;
}

/** Cartão de serviço / área pública na Home (linhas GENTE e SERVIÇOS — Parte 5.5-B). */
export interface LinkCard {
  id: string;
  title: string;
  description: string;
  to: string;
  ctaLabel: string;
  /** Ícone do acervo oficial de marca (static/brand/elementos) — D15. */
  icon: string;
}

export interface NavLinkItem {
  label: string;
  to: string;
}

export interface FooterColumn {
  heading: string;
  items: NavLinkItem[];
}

export interface ThemeCard {
  id: string;
  title: string[];
  subtitle?: string;
  image: BrandImage;
  to: string;
}

export interface StatCardContent {
  value: string;
  label: string[];
  source: string;
}

export interface SeminarDay {
  label: string;
  audience: string;
  description: string;
}

export interface SeminarContent {
  eyebrow: string;
  name: string;
  dates: string;
  location: string;
  intro: string;
  days: SeminarDay[];
  axesHeading: string;
  axes: string[];
  panelHeading: string;
  panelText: string;
  sourceNote: string;
}

export interface PulsoContent {
  header: {
    tagline: string;
    /** Menu superior = SÓ hard services (D6/D7). */
    navItems: NavLinkItem[];
    ctaLabel: string;
    ctaTo: string;
    searchLabel: string;
  };
  hero: {
    eyebrow: string[];
    headline: string[];
    paragraph: string;
    ctaLabel: string;
    cursive: string[];
  };
  features: FeatureCard[];
  themes: {
    eyebrow: string;
    heading: string;
    viewAllLabel: string;
    cards: ThemeCard[];
    /** D8 — Medicina Tradicional vive DENTRO de Saúde. */
    extraLink: NavLinkItem;
  };
  /** Linha 2 da Home — área pública "Gente" (D8). */
  gente: {
    eyebrow: string;
    heading: string;
    cards: LinkCard[];
  };
  /** Linha 4 da Home — serviços hard (espelha o menu superior). */
  services: {
    eyebrow: string;
    heading: string;
    cards: LinkCard[];
  };
  stats: {
    eyebrow: string;
    heading: string[];
    paragraph?: string;
    ctaLabel: string;
    cards: StatCardContent[];
  };
  mission: {
    eyebrow?: string;
    heading?: string[];
    paragraph: string;
    ctaLabel: string;
    ctaTo: string;
    wordList: string[];
    cursive: string[];
    photo: BrandImage;
  };
  /** Rótulos da seção de notícias. Os itens vêm de news.ts (fonte única — P19). */
  news: {
    eyebrow: string;
    viewAllLabel: string;
  };
  seminar: SeminarContent;
  footer: {
    slogan: string;
    /** Menu inferior = institucional mínimo em 3 colunas (Parte 5.5-C). */
    columns: FooterColumn[];
    socialHeading: string;
    newsletterHeading: string;
    newsletterPlaceholder: string;
    bottomText: string;
  };
}

// ---------------------------------------------------------------------------
// IMAGENS — acervo já produzido (D15), centralizado em ./brandImages.ts
// ---------------------------------------------------------------------------
const {
  mulher: IMG_MULHER,
  homem: IMG_HOMEM,
  infancia: IMG_INFANCIA,
  idosa: IMG_IDOSA,
  mental: IMG_MENTAL,
  maos: IMG_MAOS,
  mulherRetrato: IMG_MULHER_RETRATO,
} = BRAND_IMAGES;

// ---------------------------------------------------------------------------
// SEMINÁRIO LATINO-AMERICANO — evento-âncora (PT/ES)
// Fontes: Anexo de Intervenção AECID + Relatório de Planejamento Técnico
// (Produto 2.2). Datas 18-19/11/2026 conforme versão vigente confirmada.
// ---------------------------------------------------------------------------
const SEMINAR_PT: SeminarContent = {
  eyebrow: 'EVENTO-ÂNCORA —',
  name: 'Seminário Latino-Americano "Saúde, Tecnologia e Prevenção: Desafios e Inovações para a População Negra"',
  dates: '18 e 19 de novembro de 2026',
  location: 'Brasília/DF',
  intro:
    'Reúne especialistas da América Latina e do Caribe para discutir as doenças que mais afetam a população negra e as inovações tecnológicas que podem transformar o cuidado em saúde — com profissionais de saúde, pesquisadores, desenvolvedores de tecnologia, formuladores de políticas e membros da comunidade.',
  days: [
    {
      label: 'Dia 1 — 18/11',
      audience: 'Profissionais, pesquisadores e estudantes',
      description:
        '~150 participantes de Medicina, Enfermagem e áreas afins — apresentação técnica da plataforma e painel técnico sobre funcionalidades, contribuições e aperfeiçoamento do app.',
    },
    {
      label: 'Dia 2 — 19/11',
      audience: 'Comunidade e beneficiários',
      description:
        '~150 pessoas representando a população local — estação interativa com tablets e sessão prática (hands-on) de experimentação do aplicativo.',
    },
  ],
  axesHeading: 'Eixos temáticos',
  axes: [
    'Doenças que mais afetam a população negra',
    'Soluções tecnológicas para equidade em saúde',
    'Prevenção, cuidado e políticas públicas',
  ],
  panelHeading: 'Painel técnico',
  panelText:
    'Espaço de apresentação do aplicativo e da cartilha científica, com mesa de discussão sobre funcionalidades, contribuições e caminhos de aperfeiçoamento da plataforma.',
  sourceNote: 'Fontes: Anexo de Intervenção AECID · Relatório de Planejamento Técnico — Produto 2.2.',
};

const SEMINAR_ES: SeminarContent = {
  eyebrow: 'EVENTO INSIGNIA —',
  name: 'Seminario Latinoamericano "Salud, Tecnología y Prevención: Desafíos e Innovaciones para la Población Negra"',
  dates: '18 y 19 de noviembre de 2026',
  location: 'Brasilia/DF',
  intro:
    'Reúne a especialistas de América Latina y el Caribe para debatir las enfermedades que más afectan a la población negra y las innovaciones tecnológicas que pueden transformar la atención en salud — con profesionales de la salud, investigadores, desarrolladores de tecnología, formuladores de políticas y miembros de la comunidad.',
  days: [
    {
      label: 'Día 1 — 18/11',
      audience: 'Profesionales, investigadores y estudiantes',
      description:
        '~150 participantes de Medicina, Enfermería y áreas afines — presentación técnica de la plataforma y panel técnico sobre funcionalidades, contribuciones y mejoras de la app.',
    },
    {
      label: 'Día 2 — 19/11',
      audience: 'Comunidad y beneficiarios',
      description:
        '~150 personas representando a la población local — estación interactiva con tablets y sesión práctica (hands-on) de experimentación de la aplicación.',
    },
  ],
  axesHeading: 'Ejes temáticos',
  axes: [
    'Enfermedades que más afectan a la población negra',
    'Soluciones tecnológicas para la equidad en salud',
    'Prevención, cuidado y políticas públicas',
  ],
  panelHeading: 'Panel técnico',
  panelText:
    'Espacio de presentación de la aplicación y de la cartilla científica, con mesa de discusión sobre funcionalidades, contribuciones y caminos de mejora de la plataforma.',
  sourceNote: 'Fuentes: Anexo de Intervención AECID · Informe de Planificación Técnica — Producto 2.2.',
};

// ---------------------------------------------------------------------------
// Rotas (Parte 5.5-D — reorganização completa, nada órfão)
// ---------------------------------------------------------------------------
const TO_SAUDE = '/saude';
const TO_MEDICINA_TRADICIONAL = '/medicina-tradicional-brasileira';
const TO_ENSAIOS = '/ensaios-clinicos';
const TO_OUVIDORIA = '/ouvidoria';
// "Encontre um profissional": a rota dedicada /profissionais depende da base de
// profissionais (pendência P3, decisão adiada). Até lá, aponta para a seção
// correspondente dentro da Rede SUS.
const TO_PROFISSIONAIS = '/rede-sus#encontre-um-profissional';
const TO_BAIXAR = '/baixar';
const TO_COMUNIDADE = '/comunidade';
const TO_MEMORIA = '/memoria';
const TO_PARCEIROS = '/sobre#parceiros';
const TO_ARQUITETURA = '/arquitetura';
const TO_MULHER = '/saude#mulher-negra';
const TO_MENTAL = '/saude#saude-mental';
const TO_REDE_SUS = '/rede-sus';
const TO_TRANSPARENCIA = '/transparencia';
const TO_SOBRE = '/sobre';
const TO_CONTATO = '/#fale-conosco';
const TO_NOTICIAS = '/noticias';

type ContentByLocale = Record<LocaleId, PulsoContent>;

const pt: PulsoContent = {
  header: {
    tagline: 'SAÚDE • CONHECIMENTO • EQUIDADE',
    navItems: [
      { label: 'Rede SUS', to: TO_REDE_SUS },
      { label: 'Encontre um profissional', to: TO_PROFISSIONAIS },
      { label: 'Ensaios Clínicos', to: TO_ENSAIOS },
      { label: 'Ouvidoria', to: TO_OUVIDORIA },
    ],
    ctaLabel: 'Baixar o App',
    ctaTo: TO_BAIXAR,
    searchLabel: 'Buscar na Biblioteca de Saúde',
  },
  hero: {
    eyebrow: ['SAÚDE COM RAÍZES.', 'FUTURO COM IGUALDADE.'],
    headline: ['Conhecimento', 'também salva vidas.'],
    paragraph:
      'O Pulso Preto é uma plataforma de informação, saúde e bem-estar para a população negra, com dados, orientações e caminhos para um cuidado mais justo e acessível.',
    ctaLabel: 'EXPLORAR CONTEÚDOS →',
    cursive: ['Nossa saúde também importa.'],
  },
  features: [
    { icon: 'book', title: ['CONHEÇA', 'SUA SAÚDE'], subtitle: 'Informações confiáveis para todas as fases da vida.', to: TO_SAUDE },
    { icon: 'heart', title: ['ENTENDA', 'SEU CORPO'], subtitle: 'Conhecimento sobre as doenças mais prevalentes.', to: TO_SAUDE },
    { icon: 'location', title: ['ENCONTRE', 'CUIDADO'], subtitle: 'Saiba onde buscar atendimento no SUS.', to: TO_REDE_SUS },
    { icon: 'document', title: ['SEUS DIREITOS'], subtitle: 'Conheça as leis e políticas para a população negra.', to: TO_OUVIDORIA },
    { icon: 'chart', title: ['DADOS E', 'INDICADORES'], subtitle: 'Números que revelam realidades e geram mudanças.', to: TO_TRANSPARENCIA },
    { icon: 'people', title: ['PARTICIPE'], subtitle: 'Compartilhe experiências e faça parte dessa rede.', to: TO_COMUNIDADE },
  ],
  themes: {
    eyebrow: 'SAÚDE —',
    heading: 'Conheça sua saúde',
    viewAllLabel: 'VER TODOS OS TEMAS →',
    extraLink: { label: 'Medicina Tradicional Brasileira — plantas com comprovação científica →', to: TO_MEDICINA_TRADICIONAL },
    cards: [
      { id: 'mulher', title: ['Saúde da', 'Mulher Negra'], subtitle: 'Cuidado em todas as fases da vida.', image: IMG_MULHER, to: TO_MULHER },
      { id: 'homem', title: ['Saúde do', 'Homem Negro'], subtitle: 'Prevenção também é força.', image: IMG_HOMEM, to: TO_SAUDE },
      { id: 'infancia', title: ['Saúde na', 'Infância'], subtitle: 'Mais oportunidades para futuros saudáveis.', image: IMG_INFANCIA, to: TO_SAUDE },
      { id: 'idosa', title: ['Saúde da', 'Pessoa Idosa'], subtitle: 'Longevidade com qualidade de vida.', image: IMG_IDOSA, to: TO_SAUDE },
      { id: 'mental', title: ['Saúde Mental'], subtitle: 'Cuidar da mente também é saúde.', image: IMG_MENTAL, to: TO_MENTAL },
      { id: 'prevalentes', title: ['Doenças mais', 'Prevalentes'], subtitle: 'Informação que salva vidas.', image: IMG_MAOS, to: TO_SAUDE },
    ],
  },
  gente: {
    eyebrow: 'GENTE —',
    heading: 'Nossa comunidade, nossa história',
    cards: [
      { id: 'comunidade', title: 'Comunidade', description: 'Rodas de conversa, coletivos e parceiros que constroem confiança no território.', to: TO_COMUNIDADE, ctaLabel: 'Participar →', icon: '/static/brand/elementos/icone-coracao-pulsa.png' },
      { id: 'memoria', title: 'Memória e Herança', description: 'Histórias de quem cuida e de quem é cuidado — a saúde da população negra contada por ela mesma.', to: TO_MEMORIA, ctaLabel: 'Conhecer histórias →', icon: '/static/brand/elementos/icone-livro-ideias.png' },
    ],
  },
  services: {
    eyebrow: 'SERVIÇOS —',
    heading: 'Para usar agora',
    cards: [
      { id: 'rede-sus', title: 'Rede SUS', description: 'Unidades de saúde do Distrito Federal por região: Unidades Básicas, Unidades de Pronto Atendimento, Hospitais Regionais e Centros de Apoio às Vítimas de Violência.', to: TO_REDE_SUS, ctaLabel: 'Encontrar atendimento →', icon: '/static/brand/elementos/icone-hospital-comunidade.png' },
      { id: 'profissionais', title: 'Encontre um profissional', description: 'Atendimento humanizado e culturalmente competente na rede pública e privada do Distrito Federal.', to: TO_PROFISSIONAIS, ctaLabel: 'Buscar profissional →', icon: '/static/brand/elementos/icone-coracao-pulsa.png' },
      { id: 'ensaios', title: 'Ensaios Clínicos', description: 'Entenda o que são pesquisas clínicas, seus direitos e onde encontrar estudos com aprovação ética.', to: TO_ENSAIOS, ctaLabel: 'Saber mais →', icon: '/static/brand/elementos/icone-livro-ideias.png' },
      { id: 'ouvidoria', title: 'Ouvidoria', description: 'Sofreu discriminação em um atendimento de saúde? Relate e conheça seus direitos.', to: TO_OUVIDORIA, ctaLabel: 'Relatar agora →', icon: '/static/brand/elementos/icone-mao-balanca.png' },
    ],
  },
  stats: {
    eyebrow: 'PULSO DA SAÚDE NEGRA —',
    heading: ['Dados que', 'revelam realidades.', 'Informação que', 'transforma.'],
    paragraph:
      'A realidade da população negra em números. Informação para transformar políticas, serviços e vidas.',
    ctaLabel: 'VER INDICADORES →',
    cards: [
      { value: '56,1%', label: ['da população do DF', 'é negra (preta e parda)'], source: 'Fonte: IBGE 2022' },
      { value: '+60%', label: ['maior risco de hipertensão', 'em comparação com', 'a população branca'], source: 'Fonte: Ministério da Saúde' },
      { value: '2x', label: ['maior mortalidade', 'por diabetes entre', 'pessoas negras'], source: 'Fonte: Atlas da Saúde' },
      { value: 'Menor', label: ['acesso a serviços', 'especializados de saúde'], source: 'Fonte: IPEA' },
    ],
  },
  mission: {
    eyebrow: 'NOSSA MISSÃO —',
    heading: ['Equidade em saúde', 'para um futuro melhor.'],
    paragraph:
      'O Pulso Preto existe para fortalecer o conhecimento, ampliar o acesso e promover a saúde integral da população negra, no Brasil e no mundo.',
    ctaLabel: 'CONHEÇA O PROJETO →',
    ctaTo: TO_SOBRE,
    wordList: ['INFORMAÇÃO', 'REPRESENTATIVIDADE', 'CIÊNCIA', 'CUIDADO', 'OPORTUNIDADES'],
    cursive: ['Juntos', 'por mais', 'vidas.'],
    photo: IMG_MULHER_RETRATO,
  },
  news: {
    eyebrow: 'ÚLTIMAS NOTÍCIAS —',
    viewAllLabel: 'VER TODAS →',
  },
  seminar: SEMINAR_PT,
  footer: {
    slogan: 'Saúde hoje. Mais futuro amanhã.',
    columns: [
      { heading: 'Quem somos', items: [
        { label: 'Sobre / Quem somos', to: TO_SOBRE },
        { label: 'Parceiros', to: TO_PARCEIROS },
      ] },
      { heading: 'Transparência', items: [
        { label: 'Transparência e governança', to: TO_TRANSPARENCIA },
        { label: 'Relatório de Arquitetura', to: TO_ARQUITETURA },
      ] },
      { heading: 'Comunicação', items: [
        { label: 'Notícias', to: TO_NOTICIAS },
        { label: 'Fale Conosco', to: TO_CONTATO },
      ] },
    ],
    socialHeading: 'Redes Sociais',
    newsletterHeading: 'Receba novidades',
    newsletterPlaceholder: 'Seu e-mail',
    bottomText: 'Pulso Preto — Saúde, informação e oportunidades para a população negra.',
  },
};

const es: PulsoContent = {
  header: {
    tagline: 'SALUD • CONOCIMIENTO • EQUIDAD',
    navItems: [
      { label: 'Red SUS', to: TO_REDE_SUS },
      { label: 'Encuentra un profesional', to: TO_PROFISSIONAIS },
      { label: 'Ensayos Clínicos', to: TO_ENSAIOS },
      { label: 'Defensoría', to: TO_OUVIDORIA },
    ],
    ctaLabel: 'Descargar la App',
    ctaTo: TO_BAIXAR,
    searchLabel: 'Buscar en la Biblioteca de Salud',
  },
  hero: {
    eyebrow: ['SALUD CON RAÍCES.', 'FUTURO CON IGUALDAD.'],
    headline: ['El conocimiento', 'también salva vidas.'],
    paragraph:
      'Pulso Preto es una plataforma de información, salud y bienestar para la población negra, con datos, orientaciones y caminos para un cuidado más justo y accesible.',
    ctaLabel: 'EXPLORAR CONTENIDOS →',
    cursive: ['Nuestra salud también importa.'],
  },
  features: [
    { icon: 'book', title: ['CONOCE', 'TU SALUD'], subtitle: 'Información confiable para todas las etapas de la vida.', to: TO_SAUDE },
    { icon: 'heart', title: ['ENTIENDE', 'TU CUERPO'], subtitle: 'Conocimiento sobre las enfermedades más prevalentes.', to: TO_SAUDE },
    { icon: 'location', title: ['ENCUENTRA', 'ATENCIÓN'], subtitle: 'Sepa dónde buscar atención en el SUS.', to: TO_REDE_SUS },
    { icon: 'document', title: ['TUS DERECHOS'], subtitle: 'Conoce las leyes y políticas para la población negra.', to: TO_OUVIDORIA },
    { icon: 'chart', title: ['DATOS E', 'INDICADORES'], subtitle: 'Números que revelan realidades y generan cambios.', to: TO_TRANSPARENCIA },
    { icon: 'people', title: ['PARTICIPA'], subtitle: 'Comparte experiencias y forma parte de esta red.', to: TO_COMUNIDADE },
  ],
  themes: {
    eyebrow: 'SALUD —',
    heading: 'Conoce tu salud',
    viewAllLabel: 'VER TODOS LOS TEMAS →',
    extraLink: { label: 'Medicina Tradicional Brasileña — plantas con comprobación científica →', to: TO_MEDICINA_TRADICIONAL },
    cards: [
      { id: 'mulher', title: ['Salud de la', 'Mujer Negra'], subtitle: 'Cuidado en todas las etapas de la vida.', image: IMG_MULHER, to: TO_MULHER },
      { id: 'homem', title: ['Salud del', 'Hombre Negro'], subtitle: 'La prevención también es fuerza.', image: IMG_HOMEM, to: TO_SAUDE },
      { id: 'infancia', title: ['Salud en la', 'Infancia'], subtitle: 'Más oportunidades para futuros saludables.', image: IMG_INFANCIA, to: TO_SAUDE },
      { id: 'idosa', title: ['Salud de la', 'Persona Mayor'], subtitle: 'Longevidad con calidad de vida.', image: IMG_IDOSA, to: TO_SAUDE },
      { id: 'mental', title: ['Salud Mental'], subtitle: 'Cuidar la mente también es salud.', image: IMG_MENTAL, to: TO_MENTAL },
      { id: 'prevalentes', title: ['Enfermedades más', 'Prevalentes'], subtitle: 'Información que salva vidas.', image: IMG_MAOS, to: TO_SAUDE },
    ],
  },
  gente: {
    eyebrow: 'GENTE —',
    heading: 'Nuestra comunidad, nuestra historia',
    cards: [
      { id: 'comunidade', title: 'Comunidad', description: 'Círculos de conversación, colectivos y socios que construyen confianza en el territorio.', to: TO_COMUNIDADE, ctaLabel: 'Participar →', icon: '/static/brand/elementos/icone-coracao-pulsa.png' },
      { id: 'memoria', title: 'Memoria y Herencia', description: 'Historias de quien cuida y de quien es cuidado — la salud de la población negra contada por ella misma.', to: TO_MEMORIA, ctaLabel: 'Conocer historias →', icon: '/static/brand/elementos/icone-livro-ideias.png' },
    ],
  },
  services: {
    eyebrow: 'SERVICIOS —',
    heading: 'Para usar ahora',
    cards: [
      { id: 'rede-sus', title: 'Red SUS', description: 'Unidades de salud del Distrito Federal por región: Unidades Básicas, Unidades de Atención de Urgencia, Hospitales Regionales y Centros de Apoyo a Víctimas de Violencia.', to: TO_REDE_SUS, ctaLabel: 'Encontrar atención →', icon: '/static/brand/elementos/icone-hospital-comunidade.png' },
      { id: 'profissionais', title: 'Encuentra un profesional', description: 'Atención humanizada y culturalmente competente en la red pública y privada del Distrito Federal.', to: TO_PROFISSIONAIS, ctaLabel: 'Buscar profesional →', icon: '/static/brand/elementos/icone-coracao-pulsa.png' },
      { id: 'ensaios', title: 'Ensayos Clínicos', description: 'Entiende qué son las investigaciones clínicas, tus derechos y dónde encontrar estudios con aprobación ética.', to: TO_ENSAIOS, ctaLabel: 'Saber más →', icon: '/static/brand/elementos/icone-livro-ideias.png' },
      { id: 'ouvidoria', title: 'Defensoría', description: '¿Sufriste discriminación en una atención de salud? Denuncia y conoce tus derechos.', to: TO_OUVIDORIA, ctaLabel: 'Denunciar ahora →', icon: '/static/brand/elementos/icone-mao-balanca.png' },
    ],
  },
  stats: {
    eyebrow: 'PULSO DE LA SALUD NEGRA —',
    heading: ['Datos que', 'revelan realidades.', 'Información que', 'transforma.'],
    paragraph:
      'La realidad de la población negra en números. Información para transformar políticas, servicios y vidas.',
    ctaLabel: 'VER INDICADORES →',
    cards: [
      { value: '56,1%', label: ['de la población del DF', 'es negra (preta y parda)'], source: 'Fuente: IBGE 2022' },
      { value: '+60%', label: ['mayor riesgo de hipertensión', 'en comparación con', 'la población blanca'], source: 'Fuente: Ministerio de Salud' },
      { value: '2x', label: ['mayor mortalidad', 'por diabetes entre', 'personas negras'], source: 'Fuente: Atlas de la Salud' },
      { value: 'Menor', label: ['acceso a servicios', 'especializados de salud'], source: 'Fuente: IPEA' },
    ],
  },
  mission: {
    eyebrow: 'NUESTRA MISIÓN —',
    heading: ['Equidad en salud', 'para un futuro mejor.'],
    paragraph:
      'Pulso Preto existe para fortalecer el conocimiento, ampliar el acceso y promover la salud integral de la población negra, en Brasil y en el mundo.',
    ctaLabel: 'CONOCE EL PROYECTO →',
    ctaTo: TO_SOBRE,
    wordList: ['INFORMACIÓN', 'REPRESENTATIVIDAD', 'CIENCIA', 'CUIDADO', 'OPORTUNIDADES'],
    cursive: ['Juntos', 'por más', 'vidas.'],
    photo: IMG_MULHER_RETRATO,
  },
  news: {
    eyebrow: 'ÚLTIMAS NOTICIAS —',
    viewAllLabel: 'VER TODAS →',
  },
  seminar: SEMINAR_ES,
  footer: {
    slogan: 'Salud hoy. Más futuro mañana.',
    columns: [
      { heading: 'Quiénes somos', items: [
        { label: 'Sobre / Quiénes somos', to: TO_SOBRE },
        { label: 'Socios', to: TO_PARCEIROS },
      ] },
      { heading: 'Transparencia', items: [
        { label: 'Transparencia y gobernanza', to: TO_TRANSPARENCIA },
        { label: 'Informe de Arquitectura', to: TO_ARQUITETURA },
      ] },
      { heading: 'Comunicación', items: [
        { label: 'Noticias', to: TO_NOTICIAS },
        { label: 'Contáctanos', to: TO_CONTATO },
      ] },
    ],
    socialHeading: 'Redes Sociales',
    newsletterHeading: 'Recibe novedades',
    newsletterPlaceholder: 'Tu correo',
    bottomText: 'Pulso Preto — Salud, información y oportunidades para la población negra.',
  },
};

export const PULSO_CONTENT: ContentByLocale = { pt, es };

export function getPulsoContent(localeId: LocaleId): PulsoContent {
  return PULSO_CONTENT[localeId] ?? PULSO_CONTENT.pt;
}
