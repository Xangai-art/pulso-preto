import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppearance } from '@shared/context/AppearanceContext';
import { faqCategories, faqItems, type FaqCategoryId } from '@shared/data/faq';

// PERGUNTAS FREQUENTES — saúde, direitos e acesso ao SUS (MVP do Produto 2.2,
// item 4.1). Conteúdo em shared/data/faq.ts (fonte única, PT/ES).
const UI = {
  pt: {
    title: 'Perguntas frequentes',
    intro: 'Respostas simples para as dúvidas mais comuns sobre saúde da população negra, seus direitos e como usar o Sistema Único de Saúde (SUS).',
    all: 'Todas',
    search: 'Buscar uma dúvida',
    placeholder: 'Ex.: pressão alta, racismo, acompanhante, UPA...',
    none: 'Nenhuma pergunta encontrada. Tente outra palavra ou fale com a Ouvidoria.',
    footer: 'Não encontrou sua dúvida? Procure a sua Unidade Básica de Saúde ou a Ouvidoria.',
    ouvidoria: 'Ir para a Ouvidoria →',
  },
  es: {
    title: 'Preguntas frecuentes',
    intro: 'Respuestas simples a las dudas más comunes sobre la salud de la población negra, sus derechos y cómo usar el Sistema Único de Salud (SUS).',
    all: 'Todas',
    search: 'Buscar una duda',
    placeholder: 'Ej.: presión alta, racismo, acompañante, UPA...',
    none: 'No se encontraron preguntas. Pruebe otra palabra o hable con la Ouvidoria.',
    footer: '¿No encontró su duda? Busque su Unidad Básica de Salud o la Ouvidoria.',
    ouvidoria: 'Ir a la Ouvidoria →',
  },
} as const;

export default function Faq() {
  const { localeId } = useAppearance();
  const t = UI[localeId] ?? UI.pt;
  const [cat, setCat] = useState<FaqCategoryId | null>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      faqCategories
        .filter((c) => !cat || c.id === cat)
        .map((c) => ({
          ...c,
          items: faqItems.filter(
            (f) => f.category === c.id && (!q || `${f.q[localeId]} ${f.a[localeId]}`.toLowerCase().includes(q)),
          ),
        }))
        .filter((g) => g.items.length > 0),
    [cat, q, localeId],
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-pulso-verde mb-3">{t.title}</h1>
      <p className="text-pulso-marrom mb-8">{t.intro}</p>

      <label htmlFor="busca-faq" className="block text-sm font-semibold text-pulso-verde mb-2">{t.search}</label>
      <input
        id="busca-faq"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.placeholder}
        className="w-full rounded-md border border-pulso-dourado/40 px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-pulso-verde-accent/60"
      />
      <div className="flex flex-wrap gap-2 mb-10">
        {[{ id: null, label: t.all }, ...faqCategories.map((c) => ({ id: c.id, label: c.title[localeId] }))].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setCat(p.id as FaqCategoryId | null)}
            className={`text-xs font-medium rounded-full border px-3 py-1.5 transition-colors ${
              cat === p.id ? 'bg-pulso-verde text-white border-pulso-verde' : 'border-pulso-dourado/25 text-pulso-marrom hover:bg-pulso-creme'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-6 text-center text-pulso-marrom">{t.none}</p>
      )}

      <div className="space-y-10">
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-pulso-verde mb-4">{g.title[localeId]}</h2>
            <div className="space-y-3">
              {g.items.map((f) => {
                const isOpen = open === f.id || q.length > 0;
                return (
                  <div key={f.id} id={f.id} className="rounded-xl border border-pulso-dourado/25 bg-white scroll-mt-24">
                    <button
                      type="button"
                      onClick={() => setOpen(open === f.id ? null : f.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-3 p-4 text-left"
                    >
                      <span className="font-semibold text-pulso-verde">{f.q[localeId]}</span>
                      <span className="text-pulso-dourado text-xl leading-none shrink-0" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 -mt-1">
                        <p className="text-sm text-pulso-marrom leading-relaxed">{f.a[localeId]}</p>
                        {f.to && f.linkLabel && (
                          <Link to={f.to} className="inline-block mt-3 text-sm font-semibold text-pulso-verde-accent hover:underline">
                            {f.linkLabel[localeId]} →
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-6">
        <p className="text-sm text-pulso-marrom mb-2">{t.footer}</p>
        <Link to="/ouvidoria" className="text-sm font-semibold text-pulso-verde-accent hover:underline">{t.ouvidoria}</Link>
      </div>
    </div>
  );
}
