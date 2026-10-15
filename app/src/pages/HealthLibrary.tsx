import { useState } from 'react';
import { Link } from 'react-router-dom';
import { diseaseCategories, totalConditionsCount } from '../data/diseases';
import { useAppearance } from '@shared/context/AppearanceContext';
import TopBar from '../components/TopBar';

// Tema Pulso Preto (PP1/PP2): mesma lógica de isPulso das demais páginas do app.
export default function HealthLibrary() {
  const [openCategory, setOpenCategory] = useState<string | null>(diseaseCategories[0]?.id ?? null);
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';

  return (
    <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
      <TopBar title="Biblioteca de Saúde" />
      <div className="px-5 pt-3 pb-8">
        <p className={`text-xs mb-4 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>
          {totalConditionsCount}+ condições mapeadas. Tendências populacionais, não diagnósticos individuais.
        </p>
        <div className="space-y-3">
          {diseaseCategories.map((cat) => {
            const isOpen = openCategory === cat.id;
            return (
              <div
                key={cat.id}
                className={
                  isPulso
                    ? 'rounded-xl border border-pulso-dourado/25 bg-white overflow-hidden'
                    : 'rounded-xl border border-earth-200 bg-white overflow-hidden'
                }
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-left">
                      <span className={`block font-semibold text-sm ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
                        {cat.title}
                      </span>
                      <span className={`block text-xs ${isPulso ? 'text-pulso-marrom/60' : 'text-earth-500'}`}>{cat.subtitle}</span>
                    </span>
                  </span>
                  <span className={isPulso ? 'text-pulso-dourado' : 'text-earth-400'}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className={isPulso ? 'border-t border-pulso-dourado/15 p-2 space-y-1' : 'border-t border-earth-100 p-2 space-y-1'}>
                    {cat.diseases.map((d) => (
                      <Link
                        key={d.id}
                        to={`/saude/${cat.id}/${d.id}`}
                        className={
                          isPulso
                            ? 'flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-pulso-dourado/10'
                            : 'flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-earth-50'
                        }
                      >
                        <span className={`text-sm ${isPulso ? 'text-pulso-marrom/90' : 'text-earth-800'}`}>{d.name}</span>
                        <div className="flex gap-1 shrink-0">
                          {d.isPriorityTheme && (
                            <span
                              className={
                                isPulso
                                  ? 'text-[9px] uppercase font-bold text-pulso-creme bg-pulso-verde px-1.5 py-0.5 rounded'
                                  : 'text-[9px] uppercase font-bold text-white bg-brand-600 px-1.5 py-0.5 rounded'
                              }
                            >
                              Prioritário
                            </span>
                          )}
                          {d.isNew && (
                            <span
                              className={
                                isPulso
                                  ? 'text-[9px] uppercase font-bold text-pulso-marrom bg-pulso-dourado/20 px-1.5 py-0.5 rounded'
                                  : 'text-[9px] uppercase font-bold text-ouro-700 bg-palha-100 px-1.5 py-0.5 rounded'
                              }
                            >
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
