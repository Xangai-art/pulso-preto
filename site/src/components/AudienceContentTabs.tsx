import { useState } from 'react';
import { useAppearance } from '@shared/context/AppearanceContext';
import type { DiseaseDeepContent } from '@shared/data/anemiaFalciforme';

// Abas de conteúdo segmentado por audiência profissional (médicos/enfermeiros/
// usuários) — usado em DiseaseDetail.tsx quando a condição tem `hasDeepContent`.
// Rótulos/descrições das abas vêm do dicionário i18n (shared/data/locales.ts),
// já preparado para PT/ES; o conteúdo clínico em si (anemiaFalciforme.ts)
// permanece em português nesta primeira versão — tradução de conteúdo clínico
// extenso é um passo futuro, fora do escopo do teste mínimo de arquitetura.
type AudienceKey = 'medico' | 'enfermeiro' | 'usuario';

const AUDIENCE_ORDER: AudienceKey[] = ['usuario', 'enfermeiro', 'medico'];

const AUDIENCE_ICON: Record<AudienceKey, string> = {
  medico: '🩺',
  enfermeiro: '💉',
  usuario: '👤',
};

const AUDIENCE_TONE: Record<AudienceKey, string> = {
  medico: 'border-pulso-verde-medio bg-pulso-verde-accent/10 text-pulso-verde',
  enfermeiro: 'border-pulso-dourado bg-pulso-creme text-pulso-dourado',
  usuario: 'border-pulso-verde-accent bg-pulso-verde-medio/10 text-pulso-verde-medio',
};

export default function AudienceContentTabs({ content }: { content: DiseaseDeepContent }) {
  const { t } = useAppearance();
  const [active, setActive] = useState<AudienceKey>('usuario');
  const audience = content.audiences[active];

  return (
    <div className="mt-10">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-px flex-1 bg-pulso-dourado/25" />
        <span className="text-xs uppercase tracking-wide text-pulso-marrom/60 font-semibold px-2">
          Conteúdo por audiência
        </span>
        <span className="h-px flex-1 bg-pulso-dourado/25" />
      </div>

      <div
        role="tablist"
        aria-label="Selecionar audiência"
        className="grid grid-cols-3 gap-2 mb-5"
      >
        {AUDIENCE_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={`rounded-xl border-2 px-3 py-3 text-left transition-colors ${
              active === key ? AUDIENCE_TONE[key] : 'border-pulso-dourado/25 text-pulso-marrom/70 hover:bg-pulso-creme'
            }`}
          >
            <span className="block text-lg mb-1" aria-hidden="true">{AUDIENCE_ICON[key]}</span>
            <span className="block text-xs sm:text-sm font-bold leading-tight">{t(`disease.audience.${key}`)}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-pulso-marrom/60 mb-6 italic">{t(`disease.audience.description.${active}`)}</p>

      <div className="rounded-xl border border-pulso-dourado/25 bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-pulso-verde mb-5">{audience.summary}</p>
        <div className="space-y-6">
          {audience.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-bold text-pulso-verde uppercase tracking-wide mb-2">
                {section.heading}
              </h3>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm text-pulso-marrom leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-5">
        <h3 className="text-xs font-bold text-pulso-marrom uppercase tracking-wide mb-3">Fontes</h3>
        <ul className="space-y-2">
          {content.sources.map((s) => (
            <li key={s.label} className="text-xs text-pulso-marrom">
              <strong className="text-pulso-verde">{s.label}</strong> — {s.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
