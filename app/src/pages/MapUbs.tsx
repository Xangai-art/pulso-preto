import { useState } from 'react';
import {
  healthUnits,
  regionalHospitals,
  healthRegions,
  emergencyUnits,
  cepavUnits,
} from '../data/project';
import { useAppStore } from '../store/useAppStore';
import { useAppearance } from '@shared/context/AppearanceContext';
import TopBar from '../components/TopBar';

// Tema Pulso Preto (PP1/PP2): mesma lógica de isPulso das demais páginas do app.
export default function MapUbs() {
  const consent = useAppStore((s) => s.consent);
  const { variantId } = useAppearance();
  const isPulso = variantId === 'pp1' || variantId === 'pp2';
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'ubs' | 'hospitais' | 'upas' | 'cepav'>('ubs');

  const regionById = Object.fromEntries(healthRegions.map((r) => [r.id, r]));

  const filteredUbs = healthUnits.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.ra.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHospitals = regionalHospitals.filter(
    (h) =>
      h.nome.toLowerCase().includes(search.toLowerCase()) ||
      h.sigla.toLowerCase().includes(search.toLowerCase()) ||
      (regionById[h.regionId]?.ras.join(' ').toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  const filteredUpas = emergencyUnits.filter(
    (u) =>
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.ra.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCepav = cepavUnits.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.endereco.toLowerCase().includes(search.toLowerCase())
  );

  const tabs: { id: typeof tab; label: string }[] = [
    { id: 'ubs', label: 'UBS' },
    { id: 'upas', label: 'UPAs' },
    { id: 'hospitais', label: 'Hospitais' },
    { id: 'cepav', label: 'CEPAV' },
  ];

  const cardClass = isPulso
    ? 'rounded-xl border border-pulso-dourado/25 bg-white p-4'
    : 'rounded-xl border border-earth-200 bg-white p-4';

  return (
    <div className={isPulso ? 'min-h-screen bg-pulso-creme font-pulso-body' : undefined}>
      <TopBar title="Rede SUS — Unidades de Saúde" />
      <div className="px-5 pt-3 pb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por RA, nome da unidade ou região..."
          className={
            isPulso
              ? 'w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm mb-4'
              : 'w-full rounded-lg border border-earth-200 p-3 text-sm mb-4'
          }
        />

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                isPulso
                  ? `flex-1 whitespace-nowrap rounded-lg py-2 px-3 text-sm font-medium border ${
                      tab === t.id ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'border-pulso-dourado/30 text-pulso-marrom'
                    }`
                  : `flex-1 whitespace-nowrap rounded-lg py-2 px-3 text-sm font-medium border ${
                      tab === t.id ? 'bg-brand-600 text-white border-brand-600' : 'border-earth-200 text-earth-600'
                    }`
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {!consent.level4_geolocation && (
          <div
            className={
              isPulso
                ? 'rounded-xl border border-pulso-dourado/30 bg-pulso-dourado/10 p-3 mb-4 text-xs text-pulso-marrom/85'
                : 'rounded-xl border border-brand-200 bg-brand-50 p-3 mb-4 text-xs text-earth-700'
            }
          >
            Ative o <strong>Nível 4 (Geolocalização)</strong> no seu Perfil para ver a distância até cada unidade.
          </div>
        )}

        <p className={`text-[11px] mb-3 ${isPulso ? 'text-pulso-marrom/55' : 'text-earth-400'}`}>
          Fonte: SES-DF —{' '}
          <a
            href="https://info.saude.df.gov.br/busca-saude-ubs/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Busca Saúde
          </a>{' '}
          — dados agrupados por Região de Saúde. Cobertura de UBS completa para Oeste e Sul; representativa
          para as demais regiões.
        </p>

        {tab === 'ubs' && (
          <div className="space-y-3">
            {filteredUbs.map((u) => {
              const region = regionById[u.regionId];
              return (
                <div key={u.id} className={cardClass}>
                  <h3 className={`font-semibold text-sm mb-1 ${isPulso ? 'text-pulso-verde' : 'text-earth-900'}`}>{u.name}</h3>
                  <p className={`text-xs mb-1 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>
                    {u.ra} — {u.endereco}
                    {u.cep ? ` (CEP ${u.cep})` : ''}
                  </p>
                  {region && (
                    <p className={`text-xs ${isPulso ? 'text-pulso-marrom/55' : 'text-earth-400'}`}>
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                </div>
              );
            })}
            {filteredUbs.length === 0 && (
              <p className={`text-sm text-center py-8 ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>Nenhuma UBS encontrada.</p>
            )}
          </div>
        )}

        {tab === 'upas' && (
          <div className="space-y-3">
            {filteredUpas.map((u) => {
              const region = regionById[u.regionId];
              return (
                <div key={u.id} className={cardClass}>
                  <h3 className={`font-semibold text-sm mb-1 ${isPulso ? 'text-pulso-verde' : 'text-earth-900'}`}>{u.nome}</h3>
                  <p className={`text-xs mb-1 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>
                    {u.endereco}
                    {u.cep ? ` — CEP ${u.cep}` : ''}
                  </p>
                  {region && (
                    <p className={`text-xs ${isPulso ? 'text-pulso-marrom/55' : 'text-earth-400'}`}>
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                </div>
              );
            })}
            {filteredUpas.length === 0 && (
              <p className={`text-sm text-center py-8 ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>Nenhuma UPA encontrada.</p>
            )}
          </div>
        )}

        {tab === 'hospitais' && (
          <div className="space-y-3">
            {filteredHospitals.map((h) => {
              const region = regionById[h.regionId];
              return (
                <div key={h.id} className={cardClass}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className={`font-semibold text-sm ${isPulso ? 'text-pulso-verde' : 'text-earth-900'}`}>{h.nome}</h3>
                    <span className={`text-xs font-mono ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>{h.sigla}</span>
                  </div>
                  <p className={`text-xs mb-1 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>
                    {h.endereco} — CEP {h.cep}
                  </p>
                  <p className={`text-xs mb-1 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>Tel: {h.telefone}</p>
                  {region && (
                    <p className={`text-xs mb-2 ${isPulso ? 'text-pulso-marrom/55' : 'text-earth-400'}`}>
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {h.servicos.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className={
                          isPulso
                            ? 'text-[10px] px-2 py-0.5 rounded-full bg-pulso-dourado/15 text-pulso-terracota border border-pulso-dourado/30'
                            : 'text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100'
                        }
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-medium ${isPulso ? 'text-pulso-verde' : 'text-brand-600'}`}
                  >
                    Ver rota no mapa →
                  </a>
                </div>
              );
            })}
            {filteredHospitals.length === 0 && (
              <p className={`text-sm text-center py-8 ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>Nenhum hospital encontrado.</p>
            )}
          </div>
        )}

        {tab === 'cepav' && (
          <div className="space-y-3">
            {filteredCepav.map((c) => {
              const region = regionById[c.regionId];
              return (
                <div key={c.id} className={cardClass}>
                  <h3 className={`font-semibold text-sm mb-1 ${isPulso ? 'text-pulso-verde' : 'text-earth-900'}`}>{c.nome}</h3>
                  <p className={`text-xs mb-1 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>{c.endereco}</p>
                  {c.telefone && <p className={`text-xs mb-1 ${isPulso ? 'text-pulso-marrom/70' : 'text-earth-500'}`}>Tel: {c.telefone}</p>}
                  {region && (
                    <p className={`text-xs ${isPulso ? 'text-pulso-marrom/55' : 'text-earth-400'}`}>
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                </div>
              );
            })}
            {filteredCepav.length === 0 && (
              <p className={`text-sm text-center py-8 ${isPulso ? 'text-pulso-marrom/50' : 'text-earth-400'}`}>Nenhum CEPAV encontrado.</p>
            )}
          </div>
        )}

        <div
          className={
            isPulso
              ? 'mt-6 rounded-xl border border-pulso-dourado/25 p-4 text-xs text-pulso-marrom/70'
              : 'mt-6 rounded-xl border border-earth-200 p-4 text-xs text-earth-500'
          }
        >
          Busca por rede privada e "atendimento humanizado" em construção — em breve disponível junto com a
          rede pública.
        </div>
      </div>
    </div>
  );
}
