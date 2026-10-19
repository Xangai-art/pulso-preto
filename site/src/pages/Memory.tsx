import { Link } from 'react-router-dom';
import VideoEmbed from '../components/VideoEmbed';
import { useAppearance } from '@shared/context/AppearanceContext';

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
      'Um depoimento que expõe uma barreira que se repete: burocracia, longas esperas e falta de acolhimento no acesso à saúde de quem migra. É a mesma lógica de exclusão que o Pulso Preto enfrenta no Sistema Único de Saúde (SUS) — e o motivo pelo qual pensamos o piloto do DF como o primeiro passo de um plano de voo maior, não como destino final.',
    video: { youtubeId: 'NefFu175V0A', orientation: 'portrait' },
    hidden: true,
  },
];

export default function Memory() {
  const { brand } = useAppearance();
  const visibleStories = stories.filter((s) => !s.hidden);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-pulso-verde mb-4">Memória e Herança de Saúde</h1>
      <p className="text-pulso-marrom mb-6 max-w-2xl">
        Um espaço de storytelling que liga ciência a herança cultural e histórias de família — homenagens,
        saúde geracional e trajetórias de superação da comunidade negra em saúde.
      </p>

      <div className="rounded-xl border border-pulso-dourado-claro bg-pulso-creme p-5 mb-10 max-w-3xl">
        <span className="eyebrow text-pulso-dourado">Visão de expansão</span>
        <p className="font-editorial italic text-lg text-pulso-verde mt-2 mb-2">
          "De um projeto piloto para um plano ousado de voo."
        </p>
        <p className="text-sm text-pulso-marrom">
          O {brand.name} nasce como piloto no Distrito Federal, mas a tecnologia social por trás dele foi
          desenhada para viajar. A APRECIA atua em outros países além do Brasil — e a experiência de
          escuta longitudinal, navegação em saúde e vigilância comunitária construída aqui pode ser
          adaptada para outros grupos marginalizados nesses territórios, guardadas as especificidades de
          cada contexto e sempre com validação local antes de qualquer replicação.
        </p>
      </div>

      {/* R3/P5: sem cartões "A definir" — histórias entram só quando reais. */}
      {visibleStories.length > 0 && (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {visibleStories.map((s) => (
          <div key={s.name} className="rounded-xl border border-pulso-dourado/25 p-5 bg-white">
            {s.video ? (
              <VideoEmbed
                youtubeId={s.video.youtubeId}
                orientation={s.video.orientation}
                title={s.name}
                className="mb-4"
              />
            ) : (
              <div className="h-32 rounded-lg bg-gradient-to-br from-pulso-verde-accent/15 to-pulso-dourado/15 mb-4 flex items-center justify-center text-pulso-marrom/60 text-sm">
                Foto/vídeo em breve
              </div>
            )}
            <h3 className="font-bold text-pulso-verde text-sm mb-1">{s.name}</h3>
            <p className="text-xs text-pulso-marrom/70 mb-2">{s.role}</p>
            <p className="text-sm text-pulso-marrom">{s.excerpt}</p>
          </div>
        ))}
      </div>
      )}

      <div className="rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-6 text-center">
        <h2 className="font-bold text-pulso-verde mb-2">Quer contar sua história?</h2>
        <p className="text-sm text-pulso-marrom mb-4">
          Este espaço é construído com e para a comunidade: histórias de pacientes, de profissionais de saúde
          negros e de lideranças que cuidam do território. Fale com a gente para compartilhar a sua.
        </p>
        <Link
          to="/#fale-conosco"
          className="inline-block rounded-md bg-pulso-verde text-pulso-creme px-5 py-2.5 text-sm font-bold hover:bg-pulso-marrom transition-colors"
        >
          Fale Conosco →
        </Link>
      </div>
    </div>
  );
}
