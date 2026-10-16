import { useState } from 'react';
import { Link } from 'react-router-dom';
import { diseaseCategories, totalConditionsCount } from '../data/diseases';
import TopBar from '../components/TopBar';

// Tema único de produção: Pulso Preto (PP3). Tokens `pulso-*` diretos.
export default function HealthLibrary() {
  const [openCategory, setOpenCategory] = useState<string | null>(diseaseCategories[0]?.id ?? null);

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body">
      <TopBar title="Biblioteca de Saúde" />
      <div className="px-5 pt-3 pb-8">
        <p className="text-xs mb-4 text-pulso-marrom/70">
          {totalConditionsCount}+ condições com comprovação científica, organizadas por tema.
        </p>
        <div className="space-y-3">
          {diseaseCategories.map((cat) => {
            const isOpen = openCategory === cat.id;
            return (
              <div
                key={cat.id}
                className="rounded-xl border border-pulso-dourado/25 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-left">
                      <span className="block font-semibold text-sm text-pulso-verde font-pulso-display">
                        {cat.title}
                      </span>
                      <span className="block text-xs text-pulso-marrom/60">{cat.subtitle}</span>
                    </span>
                  </span>
                  <span className="text-pulso-dourado">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="border-t border-pulso-dourado/15 p-2 space-y-1">
                    {cat.diseases.map((d) => (
                      <Link
                        key={d.id}
                        to={`/saude/${cat.id}/${d.id}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-pulso-dourado/10"
                      >
                        <span className="text-sm text-pulso-marrom/90">{d.name}</span>
                        <div className="flex gap-1 shrink-0">
                          {d.isPriorityTheme && (
                            <span className="text-[9px] uppercase font-bold text-pulso-creme bg-pulso-verde px-1.5 py-0.5 rounded">
                              Prioritário
                            </span>
                          )}
                          {d.isNew && (
                            <span className="text-[9px] uppercase font-bold text-pulso-marrom bg-pulso-dourado/20 px-1.5 py-0.5 rounded">
                              Atual
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
