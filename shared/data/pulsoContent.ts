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
  image: BrandImage;
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
  image: BrandImage;
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
    navItems: { label: string; to: string }[];
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
    photo: BrandImage;
  };
  news: {
    eyebrow: string;
    viewAllLabel: string;
    cards: NewsCard[];
  };
  seminar: SeminarContent;
  footer: {
    slogan: string;
    linksHeading: string;
    linksItems: { label: string; to: string }[];
    socialHeading: string;
    newsletterHeading: string;
    newsletterPlaceholder: string;
    bottomText: string;
  };
}

// ---------------------------------------------------------------------------
// IMAGENS — acervo já produzido (D15). Sem menção a "placeholder" no conteúdo.
// ---------------------------------------------------------------------------
const img = (url: string, alt: string): BrandImage => ({ url, alt });

const IMG_MULHER = img(
  'https://sspark.genspark.ai/i/sPLVw1gqzX87GzaU?width=2560',
  'Mulher negra sorridente com turbante amarelo estampado, brincos e colar dourados'
);
const IMG_HOMEM = img(
  'https://sspark.genspark.ai/i/b6aTgm3D22sA19f1?width=2560',
  'Retrato em preto e branco de homem negro, mão no queixo, olhar contemplativo'
);
const IMG_INFANCIA = img(
  'https://sspark.genspark.ai/i/hD2yy6QnDCRI1LsB?width=2560',
  'Criança negra sorrindo, close em preto e branco, olhando para cima'
);
const IMG_IDOSA = img(
  'https://sspark.genspark.ai/i/oeW572bhZISbG0YS?width=2560',
  'Mulher negra idosa com lenço rosa na cabeça, brincos dourados, ao ar livre'
);
const IMG_MENTAL = img(
  'https://sspark.genspark.ai/i/3JqbXuliMdaCVlZ2?width=2560',
  'Mulher negra jovem, cabelo black power, expressão calma e contemplativa'
);
const IMG_MAOS = img(
  'https://sspark.genspark.ai/i/yTyxFiFCVMnY6Oae?width=2560',
  'Close de duas mãos entrelaçadas em gesto de apoio e cuidado'
);
const IMG_MULHER_RETRATO = img(
  'https://sspark.genspark.ai/i/Z1eyFhNDHigJwGf6?width=2560',
  'Retrato de mulher negra madura, cabelo em tranças, expressão serena e digna'
);
const IMG_PRESSAO = img(
  'https://sspark.genspark.ai/i/cNs5DXQ0ttPM970Y?width=2560',
  'Aferição de pressão arterial com estetoscópio e esfigmomanômetro'
);
const IMG_PROFISSIONAL = img(
  'https://sspark.genspark.ai/i/c1vXWjURnukvsxXF?width=2560',
  'Profissional de saúde negra, de máscara e luvas, examinando um frasco de vacina em ambiente clínico'
);

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
// Rotas reaproveitadas da IA existente (sem criar páginas novas)
// ---------------------------------------------------------------------------
const TO_SAUDE = '/saude';
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
    cards: [
      { date: '15 SET 2026', title: 'Saúde mental da população negra: o que dizem os dados?', image: IMG_MENTAL },
      { date: '12 SET 2026', title: 'Hipertensão na população negra: prevenção salva vidas.', image: IMG_PRESSAO },
      { date: '10 SET 2026', title: 'SUS e equidade racial: avanços e desafios no Brasil.', image: IMG_PROFISSIONAL },
    ],
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

const es: PulsoContent = {
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
    cards: [
      { date: '15 SEP 2026', title: 'Salud mental de la población negra: ¿qué dicen los datos?', image: IMG_MENTAL },
      { date: '12 SEP 2026', title: 'Hipertensión en la población negra: la prevención salva vidas.', image: IMG_PRESSAO },
      { date: '10 SEP 2026', title: 'SUS y equidad racial: avances y desafíos en Brasil.', image: IMG_PROFISSIONAL },
    ],
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

export const PULSO_CONTENT: ContentByLocale = { pt, es };

export function getPulsoContent(localeId: LocaleId): PulsoContent {
  return PULSO_CONTENT[localeId] ?? PULSO_CONTENT.pt;
}
