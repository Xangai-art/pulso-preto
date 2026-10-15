import { newsItems } from '../data/news';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getVariantContent } from '@shared/data/variantContent';

// Página dedicada de Notícias — resolve o link "Notícias" do menu (antes
// apontava apenas para a âncora #noticias da própria Home, inexistente em
// GP0 e em PP1). Reaproveita `newsItems` (site/src/data/news.ts) e, quando a
// variante ativa é PP1/PP2, injeta o Seminário Latino-Americano (18-19 nov
// 2026) como item fixo em destaque no topo — mesma fonte de dados usada em
// Home.tsx (`content.seminar`) e Community.tsx, sem duplicar texto.
export default function News() {
  const { variantId, localeId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  const content = isPulso ? getVariantContent(variantId, localeId) : undefined;
  const seminar = content?.seminar;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-earth-900 mb-2">Notícias</h1>
      <p className="text-earth-600 mb-10 max-w-2xl">
        Atualizações institucionais, marcos do projeto e o calendário de eventos.
      </p>

      {seminar && (
        <article className="rounded-xl border border-brand-200 bg-brand-50 p-6 mb-8">
          <span className="text-xs font-bold uppercase tracking-wide text-brand-700">{seminar.eyebrow}</span>
          <h2 className="text-lg font-bold text-earth-900 mt-1 mb-1">{seminar.name}</h2>
          <p className="text-sm text-earth-600">
            <strong>{seminar.dates}</strong> — {seminar.location}
          </p>
        </article>
      )}

      <div className="space-y-6">
        {newsItems.map((n) => (
          <article key={n.id} className="rounded-xl border border-earth-200 p-5">
            <time className="text-xs text-earth-400 uppercase tracking-wide">
              {new Date(n.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </time>
            <h2 className="font-bold text-earth-900 mt-1 mb-2">{n.title}</h2>
            <p className="text-sm text-earth-600">{n.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
