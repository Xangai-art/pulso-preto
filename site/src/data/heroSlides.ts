// Slides da apresentação dinâmica da hero da Home — substitui o vídeo por um
// carrossel informativo focado no que o site + App Sentinela oferecem e no
// benefício concreto para a sociedade (não é depoimento, é vitrine de produto).
export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  tone: 'folha' | 'ouro' | 'barro' | 'brand';
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'plataforma',
    eyebrow: 'O que é',
    title: 'Uma plataforma dupla, feita para servir — não só informar',
    description:
      'Site institucional com evidência científica e transparência + App Sentinela com escuta longitudinal e navegação em saúde. Uma inteligência comunitária a serviço da equidade racial no SUS.',
    stat: '2',
    statLabel: 'produtos integrados: Site + App',
    tone: 'folha',
  },
  {
    id: 'biblioteca',
    eyebrow: 'Biblioteca de Saúde',
    title: 'Evidência científica com recorte racial, sem misticismo',
    description:
      'Cada condição traz Estudo + Achado + Implicação prática, incluindo dados locais do primeiro estudo epidemiológico do DF que estratifica saúde por raça/cor.',
    stat: '48+',
    statLabel: 'condições mapeadas com estudo científico',
    tone: 'brand',
  },
  {
    id: 'app-sentinela',
    eyebrow: 'App Sentinela',
    title: 'Escuta longitudinal em minutos, não em formulários intermináveis',
    description:
      'Check-ins rápidos, navegação pela rede SUS + privada e busca por atendimento humanizado — a saúde acompanhando a rotina real de quem usa, não o contrário.',
    stat: '1–3 min',
    statLabel: 'por check-in de acompanhamento',
    tone: 'ouro',
  },
  {
    id: 'radar',
    eyebrow: 'Radar comunitário',
    title: 'Sinal devolvido à comunidade, nunca vigilância silenciosa',
    description:
      'Transparência ativa sobre o que é coletado e por quê. Alertas territoriais opt-in que ajudam a comunidade a agir — não dados que desaparecem em um relatório fechado.',
    stat: '100%',
    statLabel: 'opt-in e transparente por padrão',
    tone: 'barro',
  },
  {
    id: 'comunidade',
    eyebrow: 'Comunidade e memória',
    title: 'Rodas de conversa, histórias reais e saberes tradicionais',
    description:
      'Memória e Herança de Saúde, Medicina Tradicional Brasileira e encontros semanais — porque equidade em saúde também se constrói com cultura, escuta e pertencimento.',
    stat: '48+',
    statLabel: 'condições · 1 Biblioteca viva, sempre crescendo',
    tone: 'folha',
  },
  {
    id: 'impacto',
    eyebrow: 'Impacto para a sociedade',
    title: 'Dados que se transformam em política pública',
    description:
      'Cada check-in e cada busca geram evidência agregada e anônima para fortalecer o SUS e pressionar por políticas de equidade racial em saúde — começando pelo Distrito Federal.',
    stat: '7',
    statLabel: 'temas prioritários guiando o piloto no DF',
    tone: 'brand',
  },
];
