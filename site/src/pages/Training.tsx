import UnderConstruction from '../components/UnderConstruction';

// FORMAÇÃO — Linha 3 TREINAMENTO da Home (D9). Publicada "em construção"
// (20/10/2026) até a entrega do Ambiente Virtual de Aprendizagem (pendência P1 —
// entregável contratual: 10 vídeos, 5 podcasts e certificação digital).
export default function Training() {
  return (
    <UnderConstruction
      icon="/static/brand/elementos/icone-livro-ideias.png"
      title="Formação"
      intro="Um espaço de aprendizagem sobre a saúde da população negra, para profissionais de saúde, estudantes, lideranças comunitárias e toda pessoa interessada em cuidar melhor. O Ambiente Virtual de Aprendizagem está em produção."
      planned={[
        '10 videoaulas sobre as condições que mais afetam a população negra e sobre o combate ao racismo no atendimento de saúde.',
        '5 episódios de podcast com especialistas, profissionais da rede e a comunidade.',
        'Certificação digital para quem concluir as trilhas de formação.',
        'Materiais de apoio para rodas de conversa e ações no território.',
      ]}
      meanwhile={[
        { label: 'Biblioteca de Saúde', to: '/saude', description: 'Informação de saúde com comprovação científica, com versões para profissionais.' },
        { label: 'Comunidade', to: '/comunidade', description: 'Rodas de conversa, coletivos e parceiros no território.' },
        { label: 'Notícias', to: '/noticias', description: 'Acompanhe os ciclos de formação e as novidades do projeto.' },
      ]}
    />
  );
}
