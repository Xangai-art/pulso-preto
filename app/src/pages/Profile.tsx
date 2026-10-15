import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { lgpdConsentLevels } from '../data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import TopBar from '../components/TopBar';

// Tema Pulso Preto (PP1/PP2): mesma lógica de isPulso das demais páginas do app.
export default function Profile() {
  const { brand: projectInfo, variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  const consent = useAppStore((s) => s.consent);
  const setConsent = useAppStore((s) => s.setConsent);
  const baseline = useAppStore((s) => s.baseline);
  const checkIns = useAppStore((s) => s.checkIns);
  const reports = useAppStore((s) => s.reports);
  const resetAll = useAppStore((s) => s.resetAll);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function exportData() {
    const data = { consent, baseline, checkIns, reports };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-dados-sentinela.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleLevel(level: number, value: boolean) {
    const key =
      level === 2 ? 'level2_research' : level === 3 ? 'level3_aggregation' : 'level4_geolocation';
    setConsent({ [key]: value } as any);
  }

  const cardClass = isPulso
    ? 'rounded-xl border border-pulso-dourado/25 bg-white p-4'
    : 'rounded-xl border border-earth-200 bg-white p-4';

  return (
    <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
      <TopBar title="Meu Perfil" />
      <div className="px-5 pt-3 pb-10 space-y-6">
        <div className={cardClass}>
          <h2 className={`font-bold text-sm mb-3 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Resumo
          </h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label="Check-ins" value={checkIns.length} isPulso={isPulso} />
            <Stat label="Relatos" value={reports.length} isPulso={isPulso} />
            <Stat label="Condições" value={baseline?.conditions.length ?? 0} isPulso={isPulso} />
          </div>
        </div>

        <div>
          <h2 className={`font-bold text-sm mb-3 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Consentimentos LGPD
          </h2>
          <div className="space-y-2">
            {lgpdConsentLevels.map((l) => {
              const checked =
                l.level === 1
                  ? consent.level1_appUsage
                  : l.level === 2
                  ? consent.level2_research
                  : l.level === 3
                  ? consent.level3_aggregation
                  : consent.level4_geolocation;
              return (
                <label
                  key={l.level}
                  className={
                    isPulso
                      ? 'flex items-center justify-between rounded-xl border border-pulso-dourado/25 bg-white p-3'
                      : 'flex items-center justify-between rounded-xl border border-earth-200 bg-white p-3'
                  }
                >
                  <span className={`text-sm ${isPulso ? 'text-pulso-marrom/90' : 'text-earth-800'}`}>{l.name}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={l.required}
                    onChange={(e) => toggleLevel(l.level, e.target.checked)}
                    className={isPulso ? 'h-4 w-4 accent-pulso-verde' : 'h-4 w-4 accent-brand-600'}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className={`font-bold text-sm mb-3 ${isPulso ? 'text-pulso-verde font-pulso-display' : 'text-earth-900'}`}>
            Meus dados
          </h2>
          <button
            onClick={exportData}
            className={
              isPulso
                ? 'w-full rounded-xl border border-pulso-dourado/40 text-pulso-marrom font-semibold py-3 mb-3'
                : 'w-full rounded-xl border border-earth-300 text-earth-700 font-semibold py-3 mb-3'
            }
          >
            Exportar meus dados (JSON)
          </button>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full rounded-xl border border-red-300 text-red-600 font-semibold py-3"
            >
              Apagar meus dados
            </button>
          ) : (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4">
              <p className="text-xs text-red-700 mb-3">
                Isso vai anonimizar e apagar todos os seus dados locais deste dispositivo. Deseja continuar?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className={
                    isPulso
                      ? 'flex-1 rounded-lg border border-pulso-dourado/40 text-pulso-marrom text-sm py-2'
                      : 'flex-1 rounded-lg border border-earth-300 text-earth-700 text-sm py-2'
                  }
                >
                  Cancelar
                </button>
                <button
                  onClick={resetAll}
                  className="flex-1 rounded-lg bg-red-600 text-white text-sm py-2 font-semibold"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>

        <p className={`text-[11px] text-center pt-4 ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>
          App Sentinela — {projectInfo.name}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, isPulso }: { label: string; value: number; isPulso: boolean }) {
  return (
    <div>
      <div className={`text-lg font-bold ${isPulso ? 'text-pulso-verde' : 'text-brand-600'}`}>{value}</div>
      <div className={`text-[10px] ${isPulso ? 'text-pulso-marrom/60' : 'text-earth-500'}`}>{label}</div>
    </div>
  );
}
