import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { lgpdConsentLevels } from '@shared/data/project';
import TopBar from '../components/TopBar';

// Consent — identidade ÚNICA de produção (PP3): fundo creme, cartões com borda
// dourada, CTA verde-escuro/dourado. HISTÓRICO: ramificava por variante durante
// o teste da arquitetura CEOS (encerrado).
export default function Consent() {
  const navigate = useNavigate();
  const setConsent = useAppStore((s) => s.setConsent);
  const [levels, setLevels] = useState({
    level1_appUsage: true,
    level2_research: false,
    level3_aggregation: false,
    level4_geolocation: false,
  });

  function toggle(key: keyof typeof levels) {
    if (key === 'level1_appUsage') return; // obrigatório, não pode desmarcar
    setLevels((s) => ({ ...s, [key]: !s[key] }));
  }

  function handleContinue() {
    setConsent(levels);
    navigate('/linha-de-base');
  }

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body">
      <TopBar title="Consentimento LGPD" showBack />
      <div className="px-5 pt-4 pb-8">
        <p className="text-sm mb-6 text-pulso-marrom/80">
          Você decide o que compartilhar. O uso básico do app exige apenas o Nível 1 — os demais são opcionais e
          podem ser alterados a qualquer momento no seu Perfil.
        </p>

        <div className="space-y-3">
          {lgpdConsentLevels.map((l) => {
            const key = `level${l.level}_${
              l.level === 1 ? 'appUsage' : l.level === 2 ? 'research' : l.level === 3 ? 'aggregation' : 'geolocation'
            }` as keyof typeof levels;
            const checked = levels[key];
            return (
              <label
                key={l.level}
                className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${
                  checked ? 'border-pulso-dourado bg-pulso-dourado/10' : 'border-pulso-dourado/25 bg-white'
                } ${l.required ? 'opacity-90' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={l.required}
                  onChange={() => toggle(key)}
                  className="mt-1 h-4 w-4 accent-pulso-verde"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-pulso-verde font-pulso-display">
                      {l.name}
                    </span>
                    {l.required ? (
                      <span className="text-[10px] uppercase font-bold text-pulso-creme bg-pulso-verde px-1.5 py-0.5 rounded">
                        Obrigatório
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-pulso-marrom bg-pulso-dourado/20 px-1.5 py-0.5 rounded">
                        Opcional
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1 text-pulso-marrom/70">{l.desc}</p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-pulso-dourado/25 bg-white p-4 text-xs text-pulso-marrom/70">
          Seus dados de raça/cor e saúde são criptografados (AES-256) e pseudonimizados para pesquisa. Você pode
          exportar ou apagar seus dados a qualquer momento em Perfil → Meus Dados.
        </div>

        <button
          onClick={handleContinue}
          className="mt-8 w-full rounded-xl bg-pulso-dourado text-pulso-verde font-bold py-3.5"
        >
          Confirmar e continuar
        </button>
      </div>
    </div>
  );
}
