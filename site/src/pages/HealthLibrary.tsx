import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { diseaseCategories, totalConditionsCount, type DiseaseCategory } from '../data/diseases';
import CategoryIcon from '../components/CategoryIcons';
import LocalStudyFeature from '../components/LocalStudyFeature';

// D13 — ordena as categorias por RELEVÂNCIA (em vez da ordem de declaração no
// array): categorias que contêm temas prioritários do App vêm primeiro; empate
// resolvido pelo número de condições. A curadoria interna de cada categoria é
// preservada.
function orderByRelevance(cats: DiseaseCategory[]): DiseaseCategory[] {
  return [...cats].sort((a, b) => {
    const aPriority = a.diseases.some((d) => d.isPriorityTheme) ? 0 : 1;
    const bPriority = b.diseases.some((d) => d.isPriorityTheme) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return b.diseases.length - a.diseases.length;
  });
}

export default function HealthLibrary() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<string[]>(() => {
    const first = orderByRelevance(diseaseCategories)[0];
    return first ? [first.id] : [];
  });

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return orderByRelevance(diseaseCategories)
      .filter((cat) => !activeCategory || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        diseases: cat.diseases.filter((d) => {
          if (!normalizedQuery) return true;
          return (
            d.name.toLowerCase().includes(normalizedQuery) ||
            (d.study ?? '').toLowerCase().includes(normalizedQuery) ||
            (d.finding ?? '').toLowerCase().includes(normalizedQuery) ||
            (d.localStudy?.finding ?? '').toLowerCase().includes(normalizedQuery)
          );
        }),
      }))
      .filter((cat) => cat.diseases.length > 0);
  }, [normalizedQuery, activeCategory]);

  const noResults = filteredCategories.length === 0;
  const shownCount = filteredCategories.reduce((acc, c) => acc + c.diseases.length, 0);
  const isFiltering = normalizedQuery.length > 0 || activeCategory !== null;

  function toggleCategory(id: string) {
    setOpenIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-pulso-verde mb-2">Biblioteca de Saúde</h1>
        <p className="text-pulso-marrom">
          Informação de saúde com comprovação científica, organizada por tema.
        </p>
      </div>

      <LocalStudyFeature />

      {/* Busca + filtro por categoria */}
      <div id="buscar" className="rounded-2xl border border-pulso-dourado/25 bg-white p-5 sm:p-6 mb-4 scroll-mt-24">
        <label htmlFor="busca-condicao" className="block text-sm font-semibold text-pulso-verde mb-2">
          Buscar por condição
        </label>
        <input
          id="busca-condicao"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex.: hipertensão, anemia falciforme, mortalidade materna..."
          className="w-full rounded-md border border-pulso-dourado/40 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pulso-verde-accent/60"
        />
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-pulso-marrom/70 mb-2">Filtrar por categoria</p>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
            label="Todas"
          />
          {diseaseCategories.map((cat) => (
            <FilterPill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory((cur) => (cur === cat.id ? null : cat.id))}
              label={cat.title}
            />
          ))}
        </div>
      </div>

      {isFiltering && (
        <p className="text-sm text-pulso-marrom/70 mb-6">
          Mostrando {shownCount} de {totalConditionsCount} condições.
        </p>
      )}

      {noResults && (
        <div className="rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-8 text-center text-pulso-marrom mb-12">
          Nenhuma condição encontrada com esses filtros. Tente outro termo de busca ou limpe os filtros.
        </div>
      )}

      <div className="space-y-3">
        {filteredCategories.map((cat) => {
          const isOpen = isFiltering || openIds.includes(cat.id);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24 rounded-xl border border-pulso-dourado/25 bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-pulso-creme/60 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <CategoryIcon id={cat.id} size={32} />
                  <span>
                    <span className="block text-lg font-bold text-pulso-verde">{cat.title}</span>
                    <span className="block text-xs text-pulso-marrom/70">
                      {cat.subtitle} · {cat.diseases.length} condições
                    </span>
                  </span>
                </span>
                <span className="text-pulso-dourado text-xl leading-none shrink-0" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-pulso-dourado/15 p-3">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.diseases.map((d) => (
                      <Link
                        key={d.id}
                        to={`/saude/${cat.id}/${d.id}`}
                        className="rounded-xl border border-pulso-dourado/25 bg-white p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <h3 className="font-semibold text-pulso-verde text-sm">{d.name}</h3>
                          <div className="flex gap-1 shrink-0">
                            {d.isPriorityTheme && (
                              <span className="text-[10px] uppercase font-bold text-white bg-pulso-verde px-1.5 py-0.5 rounded">
                                Prioritário
                              </span>
                            )}
                            {d.isNew && (
                              <span className="text-[10px] uppercase font-bold text-pulso-dourado bg-pulso-creme px-1.5 py-0.5 rounded">
                                Atual
                              </span>
                            )}
                            {d.localStudy && (
                              <span className="text-[10px] uppercase font-bold text-pulso-verde-medio bg-pulso-verde-medio/10 border border-pulso-verde-accent/40 px-1.5 py-0.5 rounded">
                                Estudo local · DF
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs font-medium rounded-full border px-3 py-1.5 transition-colors ${
        active ? 'bg-pulso-verde text-white border-pulso-verde' : 'border-pulso-dourado/25 text-pulso-marrom hover:bg-pulso-creme'
      }`}
    >
      {label}
    </button>
  );
}
