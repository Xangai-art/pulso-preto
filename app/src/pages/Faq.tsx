import { useState } from 'react';
import TopBar from '../components/TopBar';
import { useAppearance } from '@shared/context/AppearanceContext';
import { faqCategories, faqItems } from '@shared/data/faq';

// PERGUNTAS FREQUENTES no App (MVP do Produto 2.2, item 4.1) — mesma fonte do
// site (shared/data/faq.ts). Links do site não são exibidos aqui.
export default function Faq() {
  const { localeId } = useAppearance();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <TopBar title={localeId === 'es' ? 'Preguntas frecuentes' : 'Perguntas frequentes'} showBack />
      <div className="p-4 space-y-6">
        {faqCategories.map((c) => (
          <section key={c.id}>
            <h2 className="font-bold text-sm text-pulso-verde font-pulso-display mb-2">{c.title[localeId]}</h2>
            <div className="space-y-2">
              {faqItems
                .filter((f) => f.category === c.id)
                .map((f) => (
                  <div key={f.id} className="rounded-xl border border-pulso-dourado/25 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpen(open === f.id ? null : f.id)}
                      aria-expanded={open === f.id}
                      className="w-full flex items-start justify-between gap-3 p-3 text-left"
                    >
                      <span className="text-sm font-semibold text-pulso-verde">{f.q[localeId]}</span>
                      <span className="text-pulso-dourado leading-none" aria-hidden="true">{open === f.id ? '−' : '+'}</span>
                    </button>
                    {open === f.id && <p className="px-3 pb-3 text-sm text-pulso-marrom leading-relaxed">{f.a[localeId]}</p>}
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
