// NOTÍCIAS — FONTE ÚNICA (SSOT — D2 / P19, Lote B)
//
// Antes existiam duas fontes desconectadas: este arquivo (8 notícias
// institucionais, só PT, usadas em /noticias) e `pulsoContent.news` (3 cartões
// com imagem, PT/ES, só na Home). Agora há UMA lista: a Home mostra as
// `HOME_NEWS_COUNT` mais recentes (com imagem) e /noticias mostra todas.
//
// Para publicar uma notícia: adicione um item aqui (PT e ES). A ordem de
// exibição é sempre por data (mais recente primeiro) — não depende da ordem
// do array. Imagens: somente o acervo já produzido (D15).
import type { LocaleId } from './locales.ts';
import type { BrandImage } from './variants.ts';
import { BRAND_IMAGES } from './brandImages.ts';

export interface NewsItem {
  id: string;
  date: string; // ISO 8601
  title: Record<LocaleId, string>;
  excerpt: Record<LocaleId, string>;
  image?: BrandImage;
}

/** Quantas notícias aparecem na Home. */
export const HOME_NEWS_COUNT = 3;

const items: NewsItem[] = [
  {
    id: 'saude-mental-dados',
    date: '2026-09-15',
    title: {
      pt: 'Saúde mental da população negra: o que dizem os dados?',
      es: 'Salud mental de la población negra: ¿qué dicen los datos?',
    },
    excerpt: {
      pt: 'Racismo, violência e desigualdade afetam a saúde mental. Veja o que a Biblioteca de Saúde reúne sobre depressão, ansiedade e onde buscar apoio na rede pública.',
      es: 'El racismo, la violencia y la desigualdad afectan la salud mental. Mira lo que reúne la Biblioteca de Salud sobre depresión, ansiedad y dónde buscar apoyo en la red pública.',
    },
    image: BRAND_IMAGES.mental,
  },
  {
    id: 'hipertensao-prevencao',
    date: '2026-09-12',
    title: {
      pt: 'Hipertensão na população negra: prevenção salva vidas.',
      es: 'Hipertensión en la población negra: la prevención salva vidas.',
    },
    excerpt: {
      pt: 'A pressão alta é mais frequente e mais grave entre pessoas negras. Medir a pressão com regularidade e acompanhar o tratamento na Unidade Básica de Saúde faz diferença.',
      es: 'La presión alta es más frecuente y más grave entre personas negras. Medir la presión con regularidad y seguir el tratamiento en la Unidad Básica de Salud marca la diferencia.',
    },
    image: BRAND_IMAGES.pressao,
  },
  {
    id: 'sus-equidade-racial',
    date: '2026-09-10',
    title: {
      pt: 'SUS e equidade racial: avanços e desafios no Brasil.',
      es: 'SUS y equidad racial: avances y desafíos en Brasil.',
    },
    excerpt: {
      pt: 'A Política Nacional de Saúde Integral da População Negra orienta o Sistema Único de Saúde (SUS) a enfrentar o racismo. O que já mudou e o que ainda falta.',
      es: 'La Política Nacional de Salud Integral de la Población Negra orienta al Sistema Único de Salud (SUS) a enfrentar el racismo. Lo que ya cambió y lo que aún falta.',
    },
    image: BRAND_IMAGES.profissional,
  },
  {
    id: 'lancamento-pulso-preto',
    date: '2026-10-07',
    title: {
      pt: 'Pulso Preto é lançado como nova identidade do projeto',
      es: 'Pulso Preto se lanza como nueva identidad del proyecto',
    },
    excerpt: {
      pt: 'O projeto piloto financiado pela AECID passa a se chamar Pulso Preto, reforçando a metáfora de monitoramento contínuo de sinais vitais em saúde da população negra.',
      es: 'El proyecto piloto financiado por la AECID pasa a llamarse Pulso Preto, reforzando la metáfora del monitoreo continuo de signos vitales en la salud de la población negra.',
    },
  },
  {
    id: 'parceria-abradfal',
    date: '2026-06-15',
    title: {
      pt: 'Parceria técnica com a ABRADFAL fortalece tema Anemia Falciforme',
      es: 'Alianza técnica con ABRADFAL fortalece el tema Anemia Falciforme',
    },
    excerpt: {
      pt: 'Associação Brasiliense das Pessoas com Doença Falciforme passa a colaborar diretamente no conteúdo científico e na triagem de condutas clínicas da plataforma.',
      es: 'La Asociación Brasiliense de las Personas con Enfermedad Falciforme pasa a colaborar directamente en el contenido científico y en la revisión de conductas clínicas de la plataforma.',
    },
  },
  {
    id: 'ciclo-formacao-100',
    date: '2026-05-02',
    title: {
      pt: '100 estudantes concluem primeiro ciclo de formação comunitária',
      es: '100 estudiantes concluyen el primer ciclo de formación comunitaria',
    },
    excerpt: {
      pt: 'Quatro ciclos de seminários formaram agentes comunitários de saúde para atuar como multiplicadores do Guia da Saúde da População Negra no Distrito Federal.',
      es: 'Cuatro ciclos de seminarios formaron agentes comunitarios de salud para actuar como multiplicadores de la Guía de Salud de la Población Negra en el Distrito Federal.',
    },
  },
  {
    id: 'app-sentinela-beta',
    date: '2026-03-20',
    title: {
      pt: 'App Sentinela entra em fase beta com testes comunitários',
      es: 'La App Sentinela entra en fase beta con pruebas comunitarias',
    },
    excerpt: {
      pt: 'A versão beta do aplicativo é disponibilizada para testes com profissionais de saúde e lideranças comunitárias, com foco na experiência de uso e no acesso a conteúdos sobre as doenças mais prevalentes.',
      es: 'La versión beta de la aplicación se pone a disposición para pruebas con profesionales de salud y liderazgos comunitarios, con foco en la experiencia de uso y en el acceso a contenidos sobre las enfermedades más prevalentes.',
    },
  },
  {
    id: 'fepecs-pesquisa-inequidades',
    date: '2026-02-10',
    title: {
      pt: 'FEPECS aprova pesquisa sobre inequidades em saúde da população negra',
      es: 'FEPECS aprueba investigación sobre inequidades en salud de la población negra',
    },
    excerpt: {
      pt: 'A Fundação de Ensino e Pesquisa em Ciências da Saúde aprova o projeto de investigação que embasa os indicadores e as recomendações de cuidado apresentados na plataforma.',
      es: 'La Fundación de Enseñanza e Investigación en Ciencias de la Salud aprueba el proyecto de investigación que sustenta los indicadores y las recomendaciones de cuidado presentados en la plataforma.',
    },
  },
  {
    // Registro histórico: o número é o da época (jan/2026), não a contagem atual.
    id: 'biblioteca-saude-33-condicoes',
    date: '2026-01-15',
    title: {
      pt: 'Biblioteca de Saúde amplia conteúdo para 33 condições',
      es: 'La Biblioteca de Salud amplía su contenido a 33 condiciones',
    },
    excerpt: {
      pt: 'A biblioteca científica passa a cobrir 33 condições de saúde, com orientações por público (população geral, profissionais e gestores) e destaque para os temas prioritários da saúde da população negra.',
      es: 'La biblioteca científica pasa a cubrir 33 condiciones de salud, con orientaciones por público (población general, profesionales y gestores) y destaque para los temas prioritarios de la salud de la población negra.',
    },
  },
  {
    id: 'seminario-latino-americano',
    date: '2025-12-01',
    title: {
      pt: 'Seminário Latino-Americano é confirmado para novembro de 2026',
      es: 'El Seminario Latinoamericano se confirma para noviembre de 2026',
    },
    excerpt: {
      pt: 'Evento-âncora do projeto é confirmado em Brasília/DF, reunindo especialistas da América Latina e do Caribe em torno de saúde, tecnologia e prevenção para a população negra.',
      es: 'El evento ancla del proyecto se confirma en Brasilia/DF, reuniendo especialistas de América Latina y el Caribe en torno a salud, tecnología y prevención para la población negra.',
    },
  },
  {
    id: 'aecid-financiamento-235mil',
    date: '2025-07-01',
    title: {
      pt: 'AECID aprova financiamento de €235 mil para o projeto',
      es: 'La AECID aprueba financiamiento de €235 mil para el proyecto',
    },
    excerpt: {
      pt: 'A Agência Espanhola de Cooperação Internacional para o Desenvolvimento aprova o financiamento que viabiliza o desenvolvimento da plataforma, do aplicativo e do seminário internacional.',
      es: 'La Agencia Española de Cooperación Internacional para el Desarrollo aprueba el financiamiento que hace posible el desarrollo de la plataforma, la aplicación y el seminario internacional.',
    },
  },
];

/** Todas as notícias, da mais recente para a mais antiga. */
export const newsItems: NewsItem[] = [...items].sort((a, b) => b.date.localeCompare(a.date));

/** Notícias da Home: as mais recentes que têm imagem. */
export const homeNewsItems: NewsItem[] = newsItems.filter((n) => n.image).slice(0, HOME_NEWS_COUNT);

/** Data por extenso no idioma ativo (ex.: "15 set. 2026"). */
export function formatNewsDate(iso: string, localeId: LocaleId, style: 'short' | 'long' = 'short'): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString(localeId === 'es' ? 'es-ES' : 'pt-BR', {
    day: '2-digit',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  });
}
