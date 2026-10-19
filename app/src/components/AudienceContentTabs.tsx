import { useState } from 'react';
import { useAppearance } from '@shared/context/AppearanceContext';
import type { DiseaseDeepContent } from '@shared/data/anemiaFalciforme';

// Versão mobile do seletor de audiência (médicos/enfermeiros/usuários) — ver
// site/src/components/AudienceContentTabs.tsx para a versão desktop/site.
// Layout em coluna única (abas lado a lado, mais compactas) adequado à
// largura fixa max-w-md do App Sentinela.
//
// Identidade única de produção (PP3): tons da paleta oficial Pulso Preto.
type AudienceKey = 'medico' | 'enfermeiro' | 'usuario';

const AUDIENCE_ORDER: AudienceKey[] = ['usuario', 'enfermeiro', 'medico'];

const AUDIENCE_ICON: Record<AudienceKey, string> = {
  medico: '🩺',
  enfermeiro: '💉',
  usuario: '👤',
};

const AUDIENCE_TONE_PULSO: Record<AudienceKey, string> = {
  medico: 'border-pulso-verde bg-pulso-verde/10 text-pulso-verde',
  enfermeiro: 'border-pulso-dourado bg-pulso-dourado/15 text-pulso-terracota',
  usuario: 'border-pulso-dourado-claro bg-pulso-dourado/10 text-pulso-marrom',
};

export default function AudienceContentTabs({ content }: { content: DiseaseDeepContent }) {
  const { t } = useAppearance();
  const [active, setActive] = useState<AudienceKey>('usuario');
  const audience = content.audiences[active];

  return (
    <div className="mt-6">
      <p className="text-[10px] uppercase tracking-wide font-semibold mb-2 text-pulso-marrom/60">
        Conteúdo por audiência
      </p>

      <div role="tablist" aria-label="Selecionar audiência" className="grid grid-cols-3 gap-1.5 mb-3">
        {AUDIENCE_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={`rounded-lg border-2 px-2 py-2 text-center transition-colors ${
              active === key
                ? AUDIENCE_TONE_PULSO[key]
                : 'border-pulso-dourado/25 text-pulso-marrom/60'
            }`}
          >
            <span className="block text-base" aria-hidden="true">{AUDIENCE_ICON[key]}</span>
            <span className="block text-[10px] font-bold leading-tight mt-0.5">{t(`disease.audience.${key}`)}</span>
          </button>
        ))}
      </div>

      <p className="text-[11px] mb-3 italic text-pulso-marrom/55">
        {t(`disease.audience.description.${active}`)}
      </p>

      <div className="rounded-xl border border-pulso-dourado/25 bg-white p-4">
        <p className="text-xs font-semibold mb-4 text-pulso-marrom/90">{audience.summary}</p>
        <div className="space-y-4">
          {audience.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-xs font-bold uppercase tracking-wide mb-1.5 text-pulso-verde font-pulso-display">
                {section.heading}
              </h3>
              <div className="space-y-2">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-xs leading-relaxed text-pulso-marrom/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-pulso-dourado/25 bg-pulso-dourado/5 p-4">
        <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-pulso-marrom/80">
          Fontes
        </h3>
        <ul className="space-y-1.5">
          {content.sources.map((s) => (
            <li key={s.label} className="text-[11px] text-pulso-marrom/70">
              <strong className="text-pulso-marrom/90">{s.label}</strong> — {s.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
