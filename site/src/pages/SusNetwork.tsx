import {
  healthUnits,
  healthRegions,
  regionalHospitals,
  emergencyUnits,
  cepavUnits,
  mentalHealthUnits,
  otherHealthServices,
} from '../data/project';
import { APP_URL } from '../config';

export default function SusNetwork() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-earth-900 mb-4">Rede SUS — Onde encontrar especialistas</h1>
      <p className="text-earth-600 mb-8 max-w-2xl">
        Encontre unidades de saúde do DF por região, com plano de expansão para rede privada e busca por
        atendimento humanizado/culturalmente competente. A navegação completa, com mapa interativo e
        georreferenciamento em tempo real, está disponível no{' '}
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-medium">
          App Sentinela
        </a>.
      </p>

      <p className="text-xs text-earth-500 mb-10 max-w-2xl bg-earth-50 border border-earth-200 rounded-lg p-3">
        Dados oficiais da{' '}
        <a href="https://www.saude.df.gov.br/regioes-de-saude" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
          Secretaria de Saúde do DF (SES-DF)
        </a>, organizados pelas 7 Regiões de Saúde. A cobertura de UBS é completa para as Regiões Oeste e Sul e
        representativa para as demais — a rede SES-DF soma mais de 170 UBS, com novas unidades sendo abertas
        continuamente. Em caso de divergência, consulte sempre{' '}
        <a href="https://info.saude.df.gov.br/busca-saude-ubs/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
          Busca Saúde (SES-DF)
        </a>.
      </p>

      {healthRegions.map((region) => {
        const hospitals = regionalHospitals.filter((h) => h.regionId === region.id);
        const upas = emergencyUnits.filter((u) => u.regionId === region.id);
        const cepavs = cepavUnits.filter((c) => c.regionId === region.id);
        const caps = mentalHealthUnits.filter((c) => c.regionId === region.id);
        const ubs = healthUnits.filter((u) => u.regionId === region.id);

        return (
          <div key={region.id} className="rounded-xl border border-earth-200 p-5 bg-white mb-8">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h2 className="text-lg font-bold text-earth-900">{region.nome}</h2>
              <span className="text-xs font-mono text-earth-400">{region.sigla}</span>
            </div>
            <p className="text-xs text-earth-500 mb-4">
              Abrange: {region.ras.join(', ')} · Superintendente: {region.superintendente} · Tel: {region.telefone}
            </p>

            {hospitals.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-earth-700 mb-2">Hospitais Regionais</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {hospitals.map((h) => (
                    <div key={h.id} className="rounded-lg border border-earth-100 bg-earth-50 p-4">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h4 className="font-semibold text-earth-900 text-sm">{h.nome}</h4>
                        <span className="text-xs font-mono text-earth-400">{h.sigla}</span>
                      </div>
                      <p className="text-xs text-earth-600 mb-1">{h.endereco} — CEP {h.cep}</p>
                      <p className="text-xs text-earth-600 mb-2">Tel: {h.telefone}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-brand-600 hover:underline"
                      >
                        Ver rota no mapa →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {upas.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-earth-700 mb-2">UPAs — Unidades de Pronto Atendimento 24h</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {upas.map((u) => (
                    <div key={u.id} className="rounded-lg border border-earth-100 bg-white p-4">
                      <h4 className="font-semibold text-earth-900 text-sm mb-1">{u.nome}</h4>
                      <p className="text-xs text-earth-600">
                        {u.endereco}
                        {u.cep ? ` — CEP ${u.cep}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ubs.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-earth-700 mb-2">UBS — Unidades Básicas de Saúde</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {ubs.map((u) => (
                    <div key={u.id} className="rounded-lg border border-earth-100 bg-white p-3">
                      <h4 className="font-semibold text-earth-900 text-xs mb-0.5">{u.name}</h4>
                      <p className="text-[11px] text-earth-500">
                        {u.ra} — {u.endereco}
                        {u.cep ? ` (CEP ${u.cep})` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {caps.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-earth-700 mb-2">CAPS — Centros de Atenção Psicossocial</h3>
                <div className="flex flex-wrap gap-2">
                  {caps.map((c) => (
                    <span key={c.id} className="text-[11px] px-2 py-1 rounded-full bg-earth-50 text-earth-700 border border-earth-200">
                      {c.nome}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cepavs.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-earth-700 mb-2">
                  CEPAV — Atenção a Pessoas em Situação de Violência ("Flores em Rede")
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cepavs.map((c) => (
                    <div key={c.id} className="rounded-lg border border-earth-100 bg-white p-4">
                      <h4 className="font-semibold text-earth-900 text-sm mb-1">{c.nome}</h4>
                      <p className="text-xs text-earth-600 mb-1">{c.endereco}</p>
                      {c.telefone && <p className="text-xs text-earth-500">Tel: {c.telefone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <h2 className="text-xl font-bold text-earth-900 mb-4">Outros serviços da rede SES-DF</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {otherHealthServices.map((s) => (
          <div key={s.id} className="rounded-xl border border-earth-200 p-4 bg-white">
            <h3 className="font-semibold text-earth-900 text-sm mb-1">{s.titulo}</h3>
            <p className="text-xs text-earth-600 mb-2">{s.descricao}</p>
            <a href={s.fonte} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-brand-600 hover:underline">
              Fonte oficial →
            </a>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-earth-200 bg-earth-50 p-6">
        <h2 className="font-bold text-earth-900 mb-2">Rede privada e atendimento humanizado (em construção)</h2>
        <p className="text-sm text-earth-600">
          Recuperando a aba original "Onde encontrar especialistas", o objetivo é permitir busca também por
          profissionais da rede privada com filtro de "atendimento humanizado/culturalmente competente" —
          já priorizado no roteiro de expansão da plataforma.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-earth-200 p-6">
        <h2 className="font-bold text-earth-900 mb-2">Direito à saúde</h2>
        <p className="text-sm text-earth-600 mb-3">
          Se você sofreu discriminação em um atendimento de saúde, você pode relatar pelo App Sentinela. O
          relato é encaminhado, com consentimento, para acompanhamento institucional.
        </p>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-medium text-sm">
          Relatar no App Sentinela →
        </a>
      </div>
    </div>
  );
}
