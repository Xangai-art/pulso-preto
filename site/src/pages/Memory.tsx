import VideoEmbed from '../components/VideoEmbed';

interface Story {
  name: string;
  role: string;
  excerpt: string;
  video?: { youtubeId: string; orientation?: 'landscape' | 'portrait' };
  hidden?: boolean; // oculto a pedido — dado mantido para eventual reativação futura
}

const stories: Story[] = [
  {
    name: 'Barreiras de acesso à saúde na diáspora',
    role: 'Visão de expansão internacional · comunidade migrante',
    excerpt:
      'Um depoimento que expõe uma barreira que se repete: burocracia, longas esperas e falta de acolhimento no acesso à saúde de quem migra. É a mesma lógica de exclusão que o Gente Preta enfrenta no SUS — e o motivo pelo qual pensamos o piloto do DF como o primeiro passo de um plano de voo maior, não como destino final.',
    video: { youtubeId: 'NefFu175V0A', orientation: 'portrait' },
    hidden: true,
  },
  {
    name: 'A definir — primeira história da comunidade',
    role: 'Paciente / Usuário do Sentinela',
    excerpt: 'Espaço reservado para a primeira história real de superação e cuidado em saúde, coletada em campo.',
  },
  {
    name: 'A definir — profissional de saúde',
    role: 'Profissional negro do SUS-DF',
    excerpt: 'Espaço reservado para depoimento de profissional de saúde negro atuando na rede SUS do Distrito Federal.',
  },
  {
    name: 'A definir — liderança comunitária',
    role: 'CUFA/DF',
    excerpt: 'Espaço reservado para história de liderança comunitária ligada à mobilização em saúde.',
  },
];

export default function Memory() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-earth-900 mb-4">Memória e Herança de Saúde</h1>
      <p className="text-earth-600 mb-6 max-w-2xl">
        Um espaço de storytelling que liga ciência a herança cultural e histórias de família — homenagens,
        saúde geracional e trajetórias de superação da comunidade negra em saúde.
      </p>

      <div className="rounded-xl border border-ouro-300 bg-palha-100 p-5 mb-10 max-w-3xl">
        <span className="eyebrow text-ouro-700">Visão de expansão</span>
        <p className="font-editorial italic text-lg text-earth-900 mt-2 mb-2">
          "De um projeto piloto para um plano ousado de voo."
        </p>
        <p className="text-sm text-earth-700">
          O Gente Preta nasce como piloto no Distrito Federal, mas a tecnologia social por trás dele foi
          desenhada para viajar. A APRECIA atua em outros países além do Brasil — e a experiência de
          escuta longitudinal, navegação em saúde e vigilância comunitária construída aqui pode ser
          adaptada para outros grupos marginalizados nesses territórios, guardadas as especificidades de
          cada contexto e sempre com validação local antes de qualquer replicação.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stories.filter((s) => !s.hidden).map((s) => (
          <div key={s.name} className="rounded-xl border border-earth-200 p-5 bg-white">
            {s.video ? (
              <VideoEmbed
                youtubeId={s.video.youtubeId}
                orientation={s.video.orientation}
                title={s.name}
                className="mb-4"
              />
            ) : (
              <div className="h-32 rounded-lg bg-gradient-to-br from-brand-100 to-earth-100 mb-4 flex items-center justify-center text-earth-400 text-sm">
                Foto/vídeo em breve
              </div>
            )}
            <h3 className="font-bold text-earth-900 text-sm mb-1">{s.name}</h3>
            <p className="text-xs text-earth-500 mb-2">{s.role}</p>
            <p className="text-sm text-earth-600">{s.excerpt}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-earth-200 bg-earth-50 p-6 text-center">
        <h2 className="font-bold text-earth-900 mb-2">Quer contar sua história?</h2>
        <p className="text-sm text-earth-600 mb-4">
          Este espaço é construído com e para a comunidade. Em breve, um formulário de submissão estará
          disponível aqui e no App Sentinela.
        </p>
        <span className="inline-block text-xs text-earth-400">Formulário de submissão — em desenvolvimento</span>
      </div>
    </div>
  );
}
