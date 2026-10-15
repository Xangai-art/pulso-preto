/**
 * VARIANT CONTENT — Conteúdo completo (copy + imagens) das variantes Pulso Preto
 *
 * Este arquivo é a continuação de variants.ts: enquanto variants.ts carrega
 * METADADOS de apresentação (tema visual, tratamento de hero), este arquivo
 * carrega o CONTEÚDO EDITORIAL completo exigido para que PP1 e PP2 sejam
 * versões "full-fledged" — fiéis em texto e estrutura às referências de
 * design fornecidas (mockups nº1 = PP1/família, nº2 = PP2/mulher) — e não
 * apenas variações de cor/imagem/CTA sobre uma base única.
 *
 * GP0 (Gente Preta original) NÃO usa este arquivo: continua renderizando a
 * Home/Header/Footer históricos, intactos, em site/src/pages/Home.tsx e
 * componentes correspondentes.
 *
 * Idiomas: cada campo de texto existe em PT e ES (TRANSLATED[localeId]).
 * Fonte da transcrição: understand_images sobre os 2 mockups de referência,
 * registrada verbatim. A grafia do mockup original ("PULSS DA SAÚDE NEGRA",
 * PP1) foi corrigida para "PULSO DA SAÚDE NEGRA", por ser um erro de
 * digitação evidente no material de referência.
 */

import type { VariantId } from './variants';
import type { LocaleId } from './locales';

export interface PlaceholderImage {
  url: string;
  alt: string;
  credit: string;
  isPlaceholder: true;
}

export type FeatureIconId = 'book' | 'location' | 'chart' | 'people' | 'heart' | 'document';

export interface FeatureCard {
  icon: FeatureIconId;
  title: string[];
  subtitle: string;
}

export interface ThemeCard {
  id: string;
  title: string[];
  subtitle?: string;
  image: PlaceholderImage;
  to: string;
}

export interface StatCardContent {
  value: string;
  label: string[];
  source: string;
}

export interface NewsCard {
  date: string;
  title: string;
  image: PlaceholderImage;
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

export interface PulsoVariantContent {
  header: {
    tagline: string;
    navItems: { label: string; to: string }[];
    ctaLabel: string;
    ctaTo: string;
    searchLabel: string;
  };
  hero: {
    eyebrow: string[];
    headline: string[];
    headlineHighlight?: string;
    paragraph: string;
    ctaLabel: string;
    cursive: string[];
    wordList?: string[];
  };
  features: FeatureCard[];
  themes: {
    eyebrow: string;
    viewAllLabel: string;
    cards: ThemeCard[];
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
    photo: PlaceholderImage;
  };
  news?: {
    eyebrow: string;
    viewAllLabel: string;
    cards: NewsCard[];
  };
  seminar?: SeminarContent;
  footer: {
    slogan: string;
    linksHeading?: string;
    linksItems?: { label: string; to: string }[];
    socialHeading?: string;
    newsletterHeading?: string;
    newsletterPlaceholder?: string;
    bottomLinks?: { label: string; to: string }[];
    bottomQuote?: string;
    bottomText?: string;
  };
}

// ---------------------------------------------------------------------------
// IMAGENS — todas placeholder CC/PD, validadas via understand_images antes de
// serem gravadas aqui. Substituir por fotografia própria é item do roadmap.
// ---------------------------------------------------------------------------

const img = (url: string, alt: string, credit: string): PlaceholderImage => ({
  url,
  alt,
  credit,
  isPlaceholder: true,
});

const IMG_MULHER = img(
  'https://sspark.genspark.ai/i/sPLVw1gqzX87GzaU?width=2560',
  'Mulher negra sorridente com turbante amarelo estampado, brincos e colar dourados',
  'Pexels — CC0 (placeholder, substituir por fotografia própria)'
);
const IMG_HOMEM = img(
  'https://sspark.genspark.ai/i/b6aTgm3D22sA19f1?width=2560',
  'Retrato em preto e branco de homem negro, mão no queixo, olhar contemplativo',
  'PickPik — CC0/domínio público (placeholder, substituir por fotografia própria)'
);
const IMG_INFANCIA = img(
  'https://sspark.genspark.ai/i/hD2yy6QnDCRI1LsB?width=2560',
  'Criança negra sorrindo, close em preto e branco, olhando para cima',
  'PickPik — CC0/domínio público (placeholder, substituir por fotografia própria)'
);
const IMG_IDOSA = img(
  'https://sspark.genspark.ai/i/oeW572bhZISbG0YS?width=2560',
  'Mulher negra idosa com lenço rosa na cabeça, brincos dourados, ao ar livre',
  'Pixnio — CC0/domínio público (placeholder, substituir por fotografia própria)'
);
const IMG_MENTAL = img(
  'https://sspark.genspark.ai/i/3JqbXuliMdaCVlZ2?width=2560',
  'Mulher negra jovem, cabelo black power, expressão calma e contemplativa',
  'Public Domain Pictures — CC0 (placeholder, substituir por fotografia própria)'
);
const IMG_MAOS = img(
  'https://sspark.genspark.ai/i/yTyxFiFCVMnY6Oae?width=2560',
  'Close de duas mãos entrelaçadas em gesto de apoio e cuidado',
  'PxHere — CC0 (placeholder, substituir por fotografia própria)'
);
const IMG_MAE_FILHO = img(
  'https://sspark.genspark.ai/i/eL5FXv2eenbXXe11?width=2560',
  'Mãe negra sorridente abraçando o filho, criança olhando por sobre o ombro dela, ao ar livre',
  'Public Domain Pictures — CC0 (placeholder, substituir por fotografia própria)'
);
const IMG_MULHER_RETRATO = img(
  'https://sspark.genspark.ai/i/Z1eyFhNDHigJwGf6?width=2560',
  'Retrato de mulher negra madura, cabelo em tranças, expressão serena e digna',
  'PickPik — CC0/domínio público (placeholder, substituir por fotografia própria)'
);
const IMG_PRESSAO = img(
  'https://sspark.genspark.ai/i/cNs5DXQ0ttPM970Y?width=2560',
  'Aferição de pressão arterial com estetoscópio e esfigmomanômetro',
  'Stethoscope.com — CC (placeholder, substituir por fotografia própria)'
);
const IMG_PROFISSIONAL = img(
  'https://sspark.genspark.ai/i/c1vXWjURnukvsxXF?width=2560',
  'Profissional de saúde negra, de máscara e luvas, examinando um frasco de vacina em ambiente clínico',
  'Rawpixel — CC0/domínio público (placeholder, substituir por fotografia própria)'
);

// ---------------------------------------------------------------------------
// SEMINÁRIO LATINO-AMERICANO — conteúdo compartilhado PP1/PP2 (PT/ES)
// Fontes primárias: Anexo de Intervenção AECID ("Saúde, Tecnologia e Prevenção:
// Desafios e Inovações para a População Negra" — objetivo, 300 participantes,
// estrutura de 2 dias) + Relatório de Planejamento Técnico do Produto 2.2
// (estratégia de demonstração: estação interativa, apresentação técnica,
// sessão hands-on, painel técnico). Datas 18-19/11/2026 confirmadas pelo
// usuário como a versão vigente — nota: o Relatório Técnico (19/06/2026)
// registrava uma previsão anterior de "20 e 21 de novembro", provavelmente
// ajustada depois; mantemos 18-19/11 por ser a informação mais recente.
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
// Rotas reaproveitadas da IA existente (sem criar páginas novas neste teste):
// - Temas sem categoria exata mapeiam para /saude (biblioteca completa)
// - Mulher Negra e Saúde Mental têm categoria exata → ancoram na seção
// - "Fale Conosco" ancora no rodapé (onde vive o formulário de newsletter)
// - "Dados e Indicadores" mapeia para /transparencia (dado público existente)
// - "Notícias" aponta para a página dedicada /noticias (ver site/src/pages/News.tsx)
// ---------------------------------------------------------------------------
const TO_SAUDE = '/saude';
const TO_MULHER = '/saude#mulher-negra';
const TO_MENTAL = '/saude#saude-mental';
const TO_REDE_SUS = '/rede-sus';
const TO_TRANSPARENCIA = '/transparencia';
const TO_SOBRE = '/sobre';
const TO_CONTATO = '/#fale-conosco';
const TO_NOTICIAS = '/noticias';

type ContentByLocale = Record<LocaleId, PulsoVariantContent>;

// ============================================================================
// PP1 — "Família" — fundo verde-escuro/dourado/creme
// ============================================================================

const pp1_pt: PulsoVariantContent = {
  header: {
    tagline: 'SAÚDE • CONHECIMENTO • EQUIDADE',
    navItems: [
      { label: 'Início', to: '/' },
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Temas de Saúde', to: TO_SAUDE },
      { label: 'Dados e Indicadores', to: TO_TRANSPARENCIA },
      { label: 'Notícias', to: TO_NOTICIAS },
      { label: 'Fale Conosco', to: TO_CONTATO },
    ],
    ctaLabel: 'CUIDE-SE',
    ctaTo: TO_REDE_SUS,
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
    { icon: 'book', title: ['CONHEÇA', 'SUA SAÚDE'], subtitle: 'Informações confiáveis para todas as fases da vida.' },
    { icon: 'heart', title: ['ENTENDA', 'SEU CORPO'], subtitle: 'Conhecimento sobre as doenças mais prevalentes.' },
    { icon: 'location', title: ['ENCONTRE', 'CUIDADO'], subtitle: 'Saiba onde buscar atendimento no SUS.' },
    { icon: 'document', title: ['SEUS DIREITOS'], subtitle: 'Conheça as leis e políticas para a população negra.' },
    { icon: 'chart', title: ['DADOS E', 'INDICADORES'], subtitle: 'Números que revelam realidades e geram mudanças.' },
    { icon: 'people', title: ['PARTICIPE'], subtitle: 'Compartilhe experiências e faça parte dessa rede.' },
  ],
  themes: {
    eyebrow: 'TEMAS EM DESTAQUE —',
    viewAllLabel: 'VER TODOS OS TEMAS →',
    cards: [
      { id: 'mulher', title: ['Saúde da', 'Mulher Negra'], subtitle: 'Cuidado em todas as fases da vida.', image: IMG_MULHER, to: TO_MULHER },
      { id: 'homem', title: ['Saúde do', 'Homem Negro'], subtitle: 'Prevenção também é força.', image: IMG_HOMEM, to: TO_SAUDE },
      { id: 'infancia', title: ['Saúde na', 'Infância'], subtitle: 'Mais oportunidades para futuros saudáveis.', image: IMG_INFANCIA, to: TO_SAUDE },
      { id: 'idosa', title: ['Saúde da', 'Pessoa Idosa'], subtitle: 'Longevidade com qualidade de vida.', image: IMG_IDOSA, to: TO_SAUDE },
      { id: 'mental', title: ['Saúde Mental'], subtitle: 'Cuidar da mente também é saúde.', image: IMG_MENTAL, to: TO_MENTAL },
      { id: 'prevalentes', title: ['Doenças mais', 'Prevalentes'], subtitle: 'Informação que salva vidas.', image: IMG_MAOS, to: TO_SAUDE },
    ],
  },
  stats: {
    eyebrow: 'PULSO DA SAÚDE NEGRA —',
    heading: ['Dados que', 'revelam realidades.', 'Informação que', 'transforma.'],
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
  seminar: SEMINAR_PT,
  footer: {
    slogan: 'Saúde hoje. Mais futuro amanhã.',
    linksHeading: 'Links',
    linksItems: [
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Temas de Saúde', to: TO_SAUDE },
      { label: 'Dados e Indicadores', to: TO_TRANSPARENCIA },
      { label: 'Notícias', to: TO_NOTICIAS },
      { label: 'Fale Conosco', to: TO_CONTATO },
    ],
    socialHeading: 'Redes Sociais',
    newsletterHeading: 'Receba novidades',
    newsletterPlaceholder: 'Seu e-mail',
    bottomText: 'Pulso Preto — Saúde, informação e oportunidades para a população negra.',
  },
};

const pp1_es: PulsoVariantContent = {
  header: {
    tagline: 'SALUD • CONOCIMIENTO • EQUIDAD',
    navItems: [
      { label: 'Inicio', to: '/' },
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Temas de Salud', to: TO_SAUDE },
      { label: 'Datos e Indicadores', to: TO_TRANSPARENCIA },
      { label: 'Noticias', to: TO_NOTICIAS },
      { label: 'Contáctanos', to: TO_CONTATO },
    ],
    ctaLabel: 'CUÍDATE',
    ctaTo: TO_REDE_SUS,
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
    { icon: 'book', title: ['CONOCE', 'TU SALUD'], subtitle: 'Información confiable para todas las etapas de la vida.' },
    { icon: 'heart', title: ['ENTIENDE', 'TU CUERPO'], subtitle: 'Conocimiento sobre las enfermedades más prevalentes.' },
    { icon: 'location', title: ['ENCUENTRA', 'ATENCIÓN'], subtitle: 'Sepa dónde buscar atención en el SUS.' },
    { icon: 'document', title: ['TUS DERECHOS'], subtitle: 'Conoce las leyes y políticas para la población negra.' },
    { icon: 'chart', title: ['DATOS E', 'INDICADORES'], subtitle: 'Números que revelan realidades y generan cambios.' },
    { icon: 'people', title: ['PARTICIPA'], subtitle: 'Comparte experiencias y forma parte de esta red.' },
  ],
  themes: {
    eyebrow: 'TEMAS DESTACADOS —',
    viewAllLabel: 'VER TODOS LOS TEMAS →',
    cards: [
      { id: 'mulher', title: ['Salud de la', 'Mujer Negra'], subtitle: 'Cuidado en todas las etapas de la vida.', image: IMG_MULHER, to: TO_MULHER },
      { id: 'homem', title: ['Salud del', 'Hombre Negro'], subtitle: 'La prevención también es fuerza.', image: IMG_HOMEM, to: TO_SAUDE },
      { id: 'infancia', title: ['Salud en la', 'Infancia'], subtitle: 'Más oportunidades para futuros saludables.', image: IMG_INFANCIA, to: TO_SAUDE },
      { id: 'idosa', title: ['Salud de la', 'Persona Mayor'], subtitle: 'Longevidad con calidad de vida.', image: IMG_IDOSA, to: TO_SAUDE },
      { id: 'mental', title: ['Salud Mental'], subtitle: 'Cuidar la mente también es salud.', image: IMG_MENTAL, to: TO_MENTAL },
      { id: 'prevalentes', title: ['Enfermedades más', 'Prevalentes'], subtitle: 'Información que salva vidas.', image: IMG_MAOS, to: TO_SAUDE },
    ],
  },
  stats: {
    eyebrow: 'PULSO DE LA SALUD NEGRA —',
    heading: ['Datos que', 'revelan realidades.', 'Información que', 'transforma.'],
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
  seminar: SEMINAR_ES,
  footer: {
    slogan: 'Salud hoy. Más futuro mañana.',
    linksHeading: 'Enlaces',
    linksItems: [
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Temas de Salud', to: TO_SAUDE },
      { label: 'Datos e Indicadores', to: TO_TRANSPARENCIA },
      { label: 'Noticias', to: TO_NOTICIAS },
      { label: 'Contáctanos', to: TO_CONTATO },
    ],
    socialHeading: 'Redes Sociales',
    newsletterHeading: 'Recibe novedades',
    newsletterPlaceholder: 'Tu correo',
    bottomText: 'Pulso Preto — Salud, información y oportunidades para la población negra.',
  },
};

// ============================================================================
// PP2 — "Mulher" — fundo terracota/dourado/creme claro
// ============================================================================

const pp2_pt: PulsoVariantContent = {
  header: {
    tagline: 'SAÚDE • CONHECIMENTO • EQUIDADE',
    navItems: [
      { label: 'Início', to: '/' },
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Temas de Saúde', to: TO_SAUDE },
      { label: 'Dados e Indicadores', to: TO_TRANSPARENCIA },
      { label: 'Notícias', to: TO_NOTICIAS },
      { label: 'Fale Conosco', to: TO_CONTATO },
    ],
    ctaLabel: 'Acesse serviços SUS',
    ctaTo: TO_REDE_SUS,
    searchLabel: 'Buscar na Biblioteca de Saúde',
  },
  hero: {
    eyebrow: ['CONHECIMENTO', 'É PODER.', 'SAÚDE É DIREITO.'],
    headline: ['Saúde para', 'vidas reais.'],
    headlineHighlight: 'reais.',
    paragraph: 'Informação, prevenção e cuidado para a população negra no Brasil.',
    ctaLabel: 'EXPLORAR O CONTEÚDO →',
    cursive: ['Nossas', 'histórias', 'também', 'são saúde.'],
    wordList: ['REPRESENTATIVIDADE', 'CIÊNCIA', 'ACESSO', 'OPORTUNIDADES'],
  },
  features: [
    { icon: 'book', title: ['CONHEÇA', 'SUA SAÚDE'], subtitle: 'Informações confiáveis para todas as fases da vida.' },
    { icon: 'heart', title: ['ENTENDA', 'SEU CORPO'], subtitle: 'Conhecimento sobre as doenças mais prevalentes.' },
    { icon: 'location', title: ['ENCONTRE', 'CUIDADO'], subtitle: 'Saiba onde buscar atendimento no SUS.' },
    { icon: 'document', title: ['SEUS DIREITOS'], subtitle: 'Conheça as leis e políticas para a população negra.' },
    { icon: 'chart', title: ['DADOS E', 'INDICADORES'], subtitle: 'Números que revelam realidades e geram mudanças.' },
    { icon: 'people', title: ['PARTICIPE'], subtitle: 'Compartilhe experiências e faça parte dessa rede.' },
  ],
  themes: {
    eyebrow: 'TEMAS EM DESTAQUE —',
    viewAllLabel: 'VER TODOS OS TEMAS →',
    cards: [
      { id: 'mulher', title: ['Saúde da', 'Mulher Negra'], subtitle: 'Cuidado em todas as fases da vida.', image: IMG_MULHER, to: TO_MULHER },
      { id: 'homem', title: ['Saúde do', 'Homem Negro'], subtitle: 'Prevenção também é força.', image: IMG_HOMEM, to: TO_SAUDE },
      { id: 'infancia', title: ['Saúde na', 'Infância'], subtitle: 'Mais oportunidades para futuros saudáveis.', image: IMG_INFANCIA, to: TO_SAUDE },
      { id: 'idosa', title: ['Saúde da', 'Pessoa Idosa'], subtitle: 'Longevidade com qualidade de vida.', image: IMG_IDOSA, to: TO_SAUDE },
      { id: 'mental', title: ['Saúde Mental'], subtitle: 'Cuidar da mente também é saúde.', image: IMG_MENTAL, to: TO_MENTAL },
      { id: 'prevalentes', title: ['Doenças mais', 'Prevalentes'], subtitle: 'Informação que salva vidas.', image: IMG_MAOS, to: TO_SAUDE },
    ],
  },
  stats: {
    eyebrow: 'PULSO DA SAÚDE NEGRA —',
    heading: ['Dados que', 'impulsionam', 'equidade.'],
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
    paragraph:
      'O Pulso Preto existe para fortalecer o conhecimento, ampliar o acesso e promover a saúde integral da população negra, no Brasil e no mundo.',
    ctaLabel: 'CONHEÇA O PROJETO →',
    ctaTo: TO_SOBRE,
    wordList: ['SAÚDE', 'EDUCAÇÃO', 'TERRITÓRIO', 'SUSTENTABILIDADE', 'OPORTUNIDADES'],
    cursive: ['Equidade', 'é um futuro', 'melhor.'],
    photo: IMG_MAE_FILHO,
  },
  news: {
    eyebrow: 'ÚLTIMAS NOTÍCIAS —',
    viewAllLabel: 'VER TODAS →',
    cards: [
      { date: '15 SET 2026', title: 'Saúde mental da população negra: o que dizem os dados?', image: IMG_MENTAL },
      { date: '12 SET 2026', title: 'Hipertensão na população negra: prevenção salva vidas.', image: IMG_PRESSAO },
      { date: '10 SET 2026', title: 'SUS e equidade racial: avanços e desafios no Brasil.', image: IMG_PROFISSIONAL },
    ],
  },
  seminar: SEMINAR_PT,
  footer: {
    slogan: 'Saúde hoje. Mais futuro amanhã.',
    bottomLinks: [
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Termos de Uso', to: TO_TRANSPARENCIA },
      { label: 'Política de Privacidade', to: TO_TRANSPARENCIA },
      { label: 'Fale Conosco', to: TO_CONTATO },
    ],
    bottomQuote: 'Saúde é ancestral, é presente e é futuro.',
  },
};

const pp2_es: PulsoVariantContent = {
  header: {
    tagline: 'SALUD • CONOCIMIENTO • EQUIDAD',
    navItems: [
      { label: 'Inicio', to: '/' },
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Temas de Salud', to: TO_SAUDE },
      { label: 'Datos e Indicadores', to: TO_TRANSPARENCIA },
      { label: 'Noticias', to: TO_NOTICIAS },
      { label: 'Contáctanos', to: TO_CONTATO },
    ],
    ctaLabel: 'Accede a servicios del SUS',
    ctaTo: TO_REDE_SUS,
    searchLabel: 'Buscar en la Biblioteca de Salud',
  },
  hero: {
    eyebrow: ['EL CONOCIMIENTO', 'ES PODER.', 'LA SALUD ES UN DERECHO.'],
    headline: ['Salud para', 'vidas reales.'],
    headlineHighlight: 'reales.',
    paragraph: 'Información, prevención y cuidado para la población negra en Brasil.',
    ctaLabel: 'EXPLORAR EL CONTENIDO →',
    cursive: ['Nuestras', 'historias', 'también', 'son salud.'],
    wordList: ['REPRESENTATIVIDAD', 'CIENCIA', 'ACCESO', 'OPORTUNIDADES'],
  },
  features: [
    { icon: 'book', title: ['CONOCE', 'TU SALUD'], subtitle: 'Información confiable para todas las etapas de la vida.' },
    { icon: 'heart', title: ['ENTIENDE', 'TU CUERPO'], subtitle: 'Conocimiento sobre las enfermedades más prevalentes.' },
    { icon: 'location', title: ['ENCUENTRA', 'ATENCIÓN'], subtitle: 'Sepa dónde buscar atención en el SUS.' },
    { icon: 'document', title: ['TUS DERECHOS'], subtitle: 'Conoce las leyes y políticas para la población negra.' },
    { icon: 'chart', title: ['DATOS E', 'INDICADORES'], subtitle: 'Números que revelan realidades y generan cambios.' },
    { icon: 'people', title: ['PARTICIPA'], subtitle: 'Comparte experiencias y forma parte de esta red.' },
  ],
  themes: {
    eyebrow: 'TEMAS DESTACADOS —',
    viewAllLabel: 'VER TODOS LOS TEMAS →',
    cards: [
      { id: 'mulher', title: ['Salud de la', 'Mujer Negra'], subtitle: 'Cuidado en todas las etapas de la vida.', image: IMG_MULHER, to: TO_MULHER },
      { id: 'homem', title: ['Salud del', 'Hombre Negro'], subtitle: 'La prevención también es fuerza.', image: IMG_HOMEM, to: TO_SAUDE },
      { id: 'infancia', title: ['Salud en la', 'Infancia'], subtitle: 'Más oportunidades para futuros saludables.', image: IMG_INFANCIA, to: TO_SAUDE },
      { id: 'idosa', title: ['Salud de la', 'Persona Mayor'], subtitle: 'Longevidad con calidad de vida.', image: IMG_IDOSA, to: TO_SAUDE },
      { id: 'mental', title: ['Salud Mental'], subtitle: 'Cuidar la mente también es salud.', image: IMG_MENTAL, to: TO_MENTAL },
      { id: 'prevalentes', title: ['Enfermedades más', 'Prevalentes'], subtitle: 'Información que salva vidas.', image: IMG_MAOS, to: TO_SAUDE },
    ],
  },
  stats: {
    eyebrow: 'PULSO DE LA SALUD NEGRA —',
    heading: ['Datos que', 'impulsan', 'la equidad.'],
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
    paragraph:
      'Pulso Preto existe para fortalecer el conocimiento, ampliar el acceso y promover la salud integral de la población negra, en Brasil y en el mundo.',
    ctaLabel: 'CONOCE EL PROYECTO →',
    ctaTo: TO_SOBRE,
    wordList: ['SALUD', 'EDUCACIÓN', 'TERRITORIO', 'SOSTENIBILIDAD', 'OPORTUNIDADES'],
    cursive: ['Equidad', 'es un futuro', 'mejor.'],
    photo: IMG_MAE_FILHO,
  },
  news: {
    eyebrow: 'ÚLTIMAS NOTICIAS —',
    viewAllLabel: 'VER TODAS →',
    cards: [
      { date: '15 SEP 2026', title: 'Salud mental de la población negra: ¿qué dicen los datos?', image: IMG_MENTAL },
      { date: '12 SEP 2026', title: 'Hipertensión en la población negra: la prevención salva vidas.', image: IMG_PRESSAO },
      { date: '10 SEP 2026', title: 'SUS y equidad racial: avances y desafíos en Brasil.', image: IMG_PROFISSIONAL },
    ],
  },
  seminar: SEMINAR_ES,
  footer: {
    slogan: 'Salud hoy. Más futuro mañana.',
    bottomLinks: [
      { label: 'Sobre', to: TO_SOBRE },
      { label: 'Términos de Uso', to: TO_TRANSPARENCIA },
      { label: 'Política de Privacidad', to: TO_TRANSPARENCIA },
      { label: 'Contáctanos', to: TO_CONTATO },
    ],
    bottomQuote: 'La salud es ancestral, es presente y es futuro.',
  },
};

export const VARIANT_CONTENT: Partial<Record<VariantId, ContentByLocale>> = {
  pp1: { pt: pp1_pt, es: pp1_es },
  pp2: { pt: pp2_pt, es: pp2_es },
};

export function getVariantContent(variantId: VariantId, localeId: LocaleId): PulsoVariantContent | undefined {
  return VARIANT_CONTENT[variantId]?.[localeId];
}
