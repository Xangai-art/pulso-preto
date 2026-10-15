// Notícias — seção "Últimas Notícias" (exclusiva da variante PP2, ver
// shared/data/variants.ts → showNewsSection). Conteúdo institucional mínimo,
// baseado nos marcos já documentados na Apresentação Institucional PPTX.
export interface NewsItem {
  id: string;
  date: string; // ISO 8601
  title: string;
  excerpt: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'lancamento-pulso-preto',
    date: '2026-10-07',
    title: 'Pulso Preto é lançado como nova identidade do projeto',
    excerpt:
      'O projeto piloto financiado pela AECID passa a se chamar Pulso Preto, reforçando a metáfora de monitoramento contínuo de sinais vitais em saúde da população negra.',
  },
  {
    id: 'parceria-abradfal',
    date: '2026-06-15',
    title: 'Parceria técnica com a ABRADFAL fortalece tema Anemia Falciforme',
    excerpt:
      'Associação Brasiliense das Pessoas com Doença Falciforme passa a colaborar diretamente no conteúdo científico e na triagem de condutas clínicas da plataforma.',
  },
  {
    id: 'ciclo-formacao-100',
    date: '2026-05-02',
    title: '100 estudantes concluem primeiro ciclo de formação comunitária',
    excerpt:
      'Quatro ciclos de seminários formaram agentes comunitários de saúde para atuar como multiplicadores do Guia da Saúde da População Negra no Distrito Federal.',
  },
  {
    id: 'app-sentinela-beta',
    date: '2026-03-20',
    title: 'App Sentinela entra em fase beta com testes comunitários',
    excerpt:
      'A versão beta do aplicativo é disponibilizada para testes com profissionais de saúde e lideranças comunitárias, com foco na experiência de uso e no acesso a conteúdos sobre as doenças mais prevalentes.',
  },
  {
    id: 'fepecs-pesquisa-inequidades',
    date: '2026-02-10',
    title: 'FEPECS aprova pesquisa sobre inequidades em saúde da população negra',
    excerpt:
      'A Fundação de Ensino e Pesquisa em Ciências da Saúde aprova o projeto de investigação que embasa os indicadores e as recomendações de cuidado apresentados na plataforma.',
  },
  {
    id: 'biblioteca-saude-33-condicoes',
    date: '2026-01-15',
    title: 'Biblioteca de Saúde amplia conteúdo para 33 condições',
    excerpt:
      'A biblioteca científica passa a cobrir 33 condições de saúde, com orientações por público (população geral, profissionais e gestores) e destaque para os temas prioritários da saúde da população negra.',
  },
  {
    id: 'seminario-latino-americano',
    date: '2025-12-01',
    title: 'Seminário Latino-Americano é confirmado para novembro de 2026',
    excerpt:
      'Evento-âncora do projeto é confirmado em Brasília/DF, reunindo especialistas da América Latina e do Caribe em torno de saúde, tecnologia e prevenção para a população negra.',
  },
  {
    id: 'aecid-financiamento-235mil',
    date: '2025-07-01',
    title: 'AECID aprova financiamento de €235 mil para o projeto',
    excerpt:
      'A Agência Espanhola de Cooperação Internacional para o Desenvolvimento aprova o financiamento que viabiliza o desenvolvimento da plataforma, do aplicativo e do seminário internacional.',
  },
];
