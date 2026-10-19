import { useAppStore } from '../store/useAppStore';
import TopBar from '../components/TopBar';

// Sinais ilustrativos — em produção, calculados via z-score (Statistical Process Control)
// sobre os check-ins agregados por Região Administrativa.
const signals = [
  {
    id: 'sig-1',
    ra: 'Ceilândia',
    type: 'Sintomas respiratórios',
    count: 34,
    zScore: 2.8,
    message: '34 pessoas na sua região relataram sintomas respiratórios nas últimas 48h — acima do padrão esperado.',
    action: 'Procure a UBS mais próxima se tiver tosse, febre ou falta de ar.',
  },
  {
    id: 'sig-2',
    ra: 'Samambaia',
    type: 'Barreiras de acesso',
    count: 21,
    zScore: 2.6,
    message: '21 pessoas relataram dificuldade de atendimento em Samambaia nas últimas 48h.',
    action: 'Se você também enfrentou isso, registre em "Direito à Saúde".',
  },
];

// Tema único de produção: Pulso Preto (PP3). Tokens `pulso-*` diretos.
export default function Radar() {
  const radarOptIn = useAppStore((s) => s.radarOptIn);
  const setRadarOptIn = useAppStore((s) => s.setRadarOptIn);

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body">
      <TopBar title="Radar Comunitário" />
      <div className="px-5 pt-3 pb-8">
        <div className="rounded-xl border border-pulso-dourado/25 bg-white p-4 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-sm mb-1 text-pulso-verde font-pulso-display">
                Participar do Radar
              </h2>
              <p className="text-xs text-pulso-marrom/70">
                Opt-in, transparente: seus check-ins ajudam a detectar padrões de saúde na sua região em 24-48h.
                Você pode desativar quando quiser.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={radarOptIn}
                onChange={(e) => setRadarOptIn(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-pulso-dourado/25 rounded-full peer-checked:bg-pulso-verde transition-colors" />
              <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        </div>

        {!radarOptIn ? (
          <div className="text-center py-16">
            <img
              src="/static/brand/elementos/icone-coracao-pulsa.png"
              alt=""
              className="w-14 h-14 object-contain mx-auto mb-3"
            />
            <p className="text-sm max-w-xs mx-auto text-pulso-marrom/60">
              Ative o Radar Comunitário acima para ver sinais transparentes da sua região.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {signals.map((s) => (
              <div key={s.id} className="rounded-xl border border-pulso-dourado/30 bg-pulso-dourado/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-pulso-terracota">
                    {s.ra}
                  </span>
                  <span className="text-[10px] text-pulso-marrom/60">z-score {s.zScore}</span>
                </div>
                <p className="text-sm font-medium mb-2 text-pulso-marrom/90">{s.message}</p>
                <p className="text-xs text-pulso-marrom/70">{s.action}</p>
              </div>
            ))}
            <div className="rounded-xl border border-pulso-dourado/25 p-4 text-xs text-pulso-marrom/70">
              <strong>Como funciona:</strong> comparamos a contagem atual de relatos com a média histórica da
              região (desvio padrão via z-score). Acima de 2,5 desvios, o sinal é devolvido à comunidade — nunca
              fica restrito a um painel administrativo silencioso. Taxa de falso positivo estimada: &lt;5%.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
