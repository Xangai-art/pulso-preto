import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { diseaseCategories, totalConditionsCount } from '../data/diseases';
import CategoryIcon from '../components/CategoryIcons';
import LocalStudyFeature from '../components/LocalStudyFeature';

export default function HealthLibrary() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return diseaseCategories
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <span className="eyebrow text-brand-600">Base científica com recorte racial</span>
        <h1 className="text-3xl font-bold text-earth-900 mt-1 mb-2">Biblioteca de Saúde</h1>
        <p className="text-earth-600">
          {totalConditionsCount}+ condições organizadas em {diseaseCategories.length} categorias temáticas, com
          evidência científica no formato <strong>Estudo + Achado</strong>. Os dados descrevem{' '}
          <strong>tendências populacionais</strong>, não diagnósticos individuais.
        </p>
      </div>

      <LocalStudyFeature />

      {/* Busca + filtro por categoria */}
      <div id="buscar" className="rounded-2xl border border-earth-200 bg-white p-5 sm:p-6 mb-4 scroll-mt-24">
        <label htmlFor="busca-condicao" className="block text-sm font-semibold text-earth-900 mb-2">
          Buscar por condição, achado ou implicação
        </label>
        <input
          id="busca-condicao"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex.: hipertensão, APOL1, mortalidade materna..."
          className="w-full rounded-md border border-earth-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-earth-500 mb-2">Filtrar por categoria</p>
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
        <p className="text-sm text-earth-500 mb-6">
          {totalConditionsCount}+ condições mapeadas · mostrando {shownCount} resultado(s).
        </p>
      )}

      {noResults && (
        <div className="rounded-xl border border-earth-200 bg-earth-50 p-8 text-center text-earth-600 mb-12">
          Nenhuma condição encontrada com esses filtros. Tente outro termo de busca ou limpe os filtros.
        </div>
      )}

      <div className="space-y-12">
        {filteredCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <CategoryIcon id={cat.id} size={36} />
              <div>
                <h2 className="text-xl font-bold text-earth-900">{cat.title}</h2>
                <p className="text-xs text-earth-500">{cat.subtitle}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.diseases.map((d) => (
                    <Link
                      key={d.id}
                      to={`/saude/${cat.id}/${d.id}`}
                      className="rounded-xl border border-earth-200 bg-white p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-semibold text-earth-900 text-sm">{d.name}</h3>
                        <div className="flex gap-1 shrink-0">
                          {d.isPriorityTheme && (
                            <span className="text-[10px] uppercase font-bold text-white bg-brand-600 px-1.5 py-0.5 rounded">
                              Prioritário
                            </span>
                          )}
                          {d.isNew && (
                            <span className="text-[10px] uppercase font-bold text-ouro-700 bg-palha-100 px-1.5 py-0.5 rounded">
                              Atual
                            </span>
                          )}
                          {d.localStudy && (
                            <span className="text-[10px] uppercase font-bold text-folha-700 bg-folha-50 border border-folha-300 px-1.5 py-0.5 rounded">
                              Estudo local · DF
                            </span>
                          )}
                        </div>
                      </div>
                      {d.study && <p className="text-xs text-earth-500 mt-2 line-clamp-2">{d.study}</p>}
                    </Link>
              ))}
            </div>
          </section>
        ))}
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
        active ? 'bg-brand-600 text-white border-brand-600' : 'border-earth-200 text-earth-600 hover:bg-earth-50'
      }`}
    >
      {label}
    </button>
  );
}
