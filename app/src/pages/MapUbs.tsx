import { useState } from 'react';
import {
  healthUnits,
  regionalHospitals,
  healthRegions,
  emergencyUnits,
  cepavUnits,
} from '@shared/data/project';
import { useAppStore } from '../store/useAppStore';
import TopBar from '../components/TopBar';

// Tema único de produção: Pulso Preto (PP3). Tokens `pulso-*` diretos.
export default function MapUbs() {
  const consent = useAppStore((s) => s.consent);
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
    { id: 'ubs', label: 'Unidades Básicas' },
    { id: 'upas', label: 'Pronto Atendimento' },
    { id: 'hospitais', label: 'Hospitais' },
    { id: 'cepav', label: 'Apoio à Violência' },
  ];

  const cardClass = 'rounded-xl border border-pulso-dourado/25 bg-white p-4';

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body">
      <TopBar title="Unidades de Saúde" />
      <div className="px-5 pt-3 pb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por RA, nome da unidade ou região..."
          className="w-full rounded-lg border border-pulso-dourado/30 p-3 text-sm mb-4"
        />

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 whitespace-nowrap rounded-lg py-2 px-3 text-sm font-medium border ${
                tab === t.id ? 'bg-pulso-verde text-pulso-creme border-pulso-verde' : 'border-pulso-dourado/30 text-pulso-marrom'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {!consent.level4_geolocation && (
          <div className="rounded-xl border border-pulso-dourado/30 bg-pulso-dourado/10 p-3 mb-4 text-xs text-pulso-marrom/85">
            Ative o <strong>Nível 4 (Geolocalização)</strong> no seu Perfil para ver a distância até cada unidade.
          </div>
        )}

        <p className="text-[11px] mb-3 text-pulso-marrom/55">
          Fonte: Secretaria de Saúde do Distrito Federal (SES-DF) —{' '}
          <a
            href="https://info.saude.df.gov.br/busca-saude-ubs/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Busca Saúde
          </a>{' '}
          — dados agrupados por Região de Saúde. Cobertura de Unidades Básicas de Saúde (UBS) completa para Oeste e Sul; representativa
          para as demais regiões.
        </p>

        {tab === 'ubs' && (
          <div className="space-y-3">
            {filteredUbs.map((u) => {
              const region = regionById[u.regionId];
              return (
                <div key={u.id} className={cardClass}>
                  <h3 className="font-semibold text-sm mb-1 text-pulso-verde">{u.name}</h3>
                  <p className="text-xs mb-1 text-pulso-marrom/70">
                    {u.ra} — {u.endereco}
                    {u.cep ? ` (CEP ${u.cep})` : ''}
                  </p>
                  {region && (
                    <p className="text-xs text-pulso-marrom/55">
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                </div>
              );
            })}
            {filteredUbs.length === 0 && (
              <p className="text-sm text-center py-8 text-pulso-marrom/50">Nenhuma Unidade Básica de Saúde encontrada.</p>
            )}
          </div>
        )}

        {tab === 'upas' && (
          <div className="space-y-3">
            {filteredUpas.map((u) => {
              const region = regionById[u.regionId];
              return (
                <div key={u.id} className={cardClass}>
                  <h3 className="font-semibold text-sm mb-1 text-pulso-verde">{u.nome}</h3>
                  <p className="text-xs mb-1 text-pulso-marrom/70">
                    {u.endereco}
                    {u.cep ? ` — CEP ${u.cep}` : ''}
                  </p>
                  {region && (
                    <p className="text-xs text-pulso-marrom/55">
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                </div>
              );
            })}
            {filteredUpas.length === 0 && (
              <p className="text-sm text-center py-8 text-pulso-marrom/50">Nenhuma Unidade de Pronto Atendimento encontrada.</p>
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
                    <h3 className="font-semibold text-sm text-pulso-verde">{h.nome}</h3>
                    <span className="text-xs font-mono text-pulso-marrom/50">{h.sigla}</span>
                  </div>
                  <p className="text-xs mb-1 text-pulso-marrom/70">
                    {h.endereco} — CEP {h.cep}
                  </p>
                  <p className="text-xs mb-1 text-pulso-marrom/70">Tel: {h.telefone}</p>
                  {region && (
                    <p className="text-xs mb-2 text-pulso-marrom/55">
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {h.servicos.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-pulso-dourado/15 text-pulso-terracota border border-pulso-dourado/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-pulso-verde"
                  >
                    Ver rota no mapa →
                  </a>
                </div>
              );
            })}
            {filteredHospitals.length === 0 && (
              <p className="text-sm text-center py-8 text-pulso-marrom/50">Nenhum hospital encontrado.</p>
            )}
          </div>
        )}

        {tab === 'cepav' && (
          <div className="space-y-3">
            {filteredCepav.map((c) => {
              const region = regionById[c.regionId];
              return (
                <div key={c.id} className={cardClass}>
                  <h3 className="font-semibold text-sm mb-1 text-pulso-verde">{c.nome}</h3>
                  <p className="text-xs mb-1 text-pulso-marrom/70">{c.endereco}</p>
                  {c.telefone && <p className="text-xs mb-1 text-pulso-marrom/70">Tel: {c.telefone}</p>}
                  {region && (
                    <p className="text-xs text-pulso-marrom/55">
                      Região de Saúde: {region.nome} ({region.sigla})
                    </p>
                  )}
                </div>
              );
            })}
            {filteredCepav.length === 0 && (
              <p className="text-sm text-center py-8 text-pulso-marrom/50">Nenhum centro de apoio encontrado.</p>
            )}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-pulso-dourado/25 p-4 text-xs text-pulso-marrom/70">
          Busca por rede privada e "atendimento humanizado" em construção — em breve disponível junto com a
          rede pública.
        </div>
      </div>
    </div>
  );
}
