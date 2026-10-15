import { governance, lgpdConsentLevels, dataDomains, internationalReferencesNote } from '../data/project';

export default function Transparency() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-earth-900 mb-4">Transparência e Governança</h1>
      <p className="text-earth-600 mb-2 max-w-2xl">
        Seguindo referências internacionais de mídias de saúde comunitária<sup className="text-brand-600">[1]</sup> —{' '}
        <strong>confiança acima de sofisticação técnica</strong> — esta página documenta de forma pública quem
        decide, como os dados são tratados e quais consentimentos regem o uso do App Sentinela.
      </p>
      <p className="text-xs text-earth-400 mb-12 max-w-2xl">[1] {internationalReferencesNote}</p>

      <h2 className="text-xl font-bold text-earth-900 mb-4">Conselho Consultivo</h2>
      <p className="text-sm text-earth-600 mb-4">{governance.conselhoConsultivo.note}</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {governance.conselhoConsultivo.members.map((m, i) => (
          <div key={i} className="rounded-xl border border-earth-200 p-4">
            <div className="font-semibold text-earth-900 text-sm">{m.name}</div>
            <div className="text-xs text-earth-500">{m.institution} · {m.area}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-earth-900 mb-4">Estrutura de decisão</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <GovCard title="Comitê de Gestão" items={governance.comite.map((c) => `${c.name} (${c.role})`)} />
        <GovCard title="Coordenação Geral" items={governance.coordenacao.map((c) => c.name)} />
        <GovCard title="Comitê de Ética" items={governance.etica.map((e) => `${e.name} — ${e.desc}`)} />
      </div>

      <h2 className="text-xl font-bold text-earth-900 mb-4">Consentimento granular (LGPD)</h2>
      <div className="space-y-3 mb-12">
        {lgpdConsentLevels.map((l) => (
          <div key={l.level} className="rounded-xl border border-earth-200 p-4 flex items-start gap-4">
            <span className="shrink-0 h-8 w-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">
              {l.level}
            </span>
            <div>
              <div className="font-semibold text-earth-900 text-sm flex items-center gap-2">
                {l.name}
                {l.required ? (
                  <span className="text-[10px] uppercase font-bold text-white bg-earth-700 px-1.5 py-0.5 rounded">Obrigatório</span>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-earth-500 bg-earth-100 px-1.5 py-0.5 rounded">Opcional</span>
                )}
              </div>
              <p className="text-xs text-earth-500 mt-1">{l.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-earth-900 mb-4">Três domínios de dados separados</h2>
      <p className="text-sm text-earth-600 mb-4">
        Pesquisa anônima, conteúdo público e triagem clínica identificável são tratados como domínios de dados
        distintos, cada um com sua própria base de consentimento e regras de retenção.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {dataDomains.map((d) => (
          <div key={d.id} className="rounded-xl border border-earth-200 p-4 bg-earth-50">
            <h3 className="font-semibold text-earth-900 text-sm mb-2">{d.name}</h3>
            <p className="text-xs text-earth-600">{d.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-earth-900 mb-4">Segurança técnica</h2>
      <ul className="text-sm text-earth-700 space-y-2 list-disc pl-5 mb-12">
        <li>TLS 1.3 em trânsito · AES-256 em repouso para campos sensíveis</li>
        <li>Raça/cor e dados de saúde criptografados (Art. 5º, II, LGPD)</li>
        <li>Pseudonimização (SHA-256) para identificadores de pesquisa</li>
        <li>Logs de auditoria imutáveis</li>
        <li>Direitos garantidos: acesso, correção, eliminação (anonimização) e portabilidade</li>
      </ul>

      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6">
        <h2 className="font-bold text-earth-900 mb-2">Política de métricas</h2>
        <p className="text-sm text-earth-700">
          Números de tração (usuários, ativação, retenção) são tratados como <strong>metas de projeção</strong>,
          nunca como resultado já obtido, até que existam dados reais de piloto de campo validados pelo Comitê
          de Ética.
        </p>
      </div>
    </div>
  );
}

function GovCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-earth-200 p-4">
      <h3 className="font-semibold text-earth-900 text-sm mb-2">{title}</h3>
      <ul className="text-xs text-earth-600 space-y-1">
        {items.map((i) => <li key={i}>• {i}</li>)}
      </ul>
    </div>
  );
}
