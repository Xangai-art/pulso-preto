import { newsItems, formatNewsDate } from '@shared/data/news';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getPulsoContent } from '@shared/data/pulsoContent';

// Página dedicada de Notícias — identidade ÚNICA de produção (PP3).
// Lê a fonte única de notícias (shared/data/news.ts — P19) e injeta o Seminário
// Latino-Americano (18-19 nov 2026) como item fixo em destaque no topo —
// mesma fonte de dados usada em Home.tsx (`content.seminar`) e Community.tsx.
export default function News() {
  const { localeId } = useAppearance();
  const content = getPulsoContent(localeId);
  const seminar = content.seminar;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 font-pulso-body">
      <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota">Atualizações —</span>
      <h1 className="font-pulso-display text-3xl font-bold text-pulso-verde mt-1 mb-2">Notícias</h1>
      <p className="text-pulso-marrom/75 mb-10 max-w-2xl">
        Atualizações institucionais, marcos do projeto e o calendário de eventos.
      </p>

      {seminar && (
        <article className="rounded-xl border border-pulso-dourado/30 bg-pulso-dourado/10 p-6 mb-8">
          <span className="text-xs font-bold uppercase tracking-wide text-pulso-terracota">{seminar.eyebrow}</span>
          <h2 className="text-lg font-bold text-pulso-verde mt-1 mb-1">{seminar.name}</h2>
          <p className="text-sm text-pulso-marrom/80">
            <strong>{seminar.dates}</strong> — {seminar.location}
          </p>
        </article>
      )}

      <div className="space-y-6">
        {newsItems.map((n) => (
          <article key={n.id} id={n.id} className="rounded-xl border border-pulso-dourado/20 overflow-hidden scroll-mt-24 sm:flex">
            {n.image && (
              <img src={n.image.url} alt={n.image.alt} className="w-full sm:w-48 h-40 sm:h-auto object-cover shrink-0" loading="lazy" />
            )}
            <div className="p-5">
              <time dateTime={n.date} className="text-xs text-pulso-terracota uppercase tracking-wide">
                {formatNewsDate(n.date, localeId, 'long')}
              </time>
              <h2 className="font-bold text-pulso-verde mt-1 mb-2">{n.title[localeId]}</h2>
              <p className="text-sm text-pulso-marrom/80">{n.excerpt[localeId]}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
