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
  medico: 'border-brand-500 bg-brand-50 text-brand-800',
  enfermeiro: 'border-ouro-500 bg-palha-50 text-ouro-700',
  usuario: 'border-folha-500 bg-folha-50 text-folha-700',
};

export default function AudienceContentTabs({ content }: { content: DiseaseDeepContent }) {
  const { t } = useAppearance();
  const [active, setActive] = useState<AudienceKey>('usuario');
  const audience = content.audiences[active];

  return (
    <div className="mt-10">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-px flex-1 bg-earth-200" />
        <span className="text-xs uppercase tracking-wide text-earth-400 font-semibold px-2">
          Conteúdo por audiência
        </span>
        <span className="h-px flex-1 bg-earth-200" />
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
              active === key ? AUDIENCE_TONE[key] : 'border-earth-200 text-earth-500 hover:bg-earth-50'
            }`}
          >
            <span className="block text-lg mb-1" aria-hidden="true">{AUDIENCE_ICON[key]}</span>
            <span className="block text-xs sm:text-sm font-bold leading-tight">{t(`disease.audience.${key}`)}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-earth-400 mb-6 italic">{t(`disease.audience.description.${active}`)}</p>

      <div className="rounded-xl border border-earth-200 bg-white p-5 sm:p-6">
        <p className="text-sm font-semibold text-earth-800 mb-5">{audience.summary}</p>
        <div className="space-y-6">
          {audience.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="text-sm font-bold text-earth-900 uppercase tracking-wide mb-2">
                {section.heading}
              </h3>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm text-earth-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-earth-200 bg-earth-50 p-5">
        <h3 className="text-xs font-bold text-earth-700 uppercase tracking-wide mb-3">Fontes</h3>
        <ul className="space-y-2">
          {content.sources.map((s) => (
            <li key={s.label} className="text-xs text-earth-600">
              <strong className="text-earth-800">{s.label}</strong> — {s.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
