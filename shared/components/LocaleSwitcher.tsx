/**
 * LOCALE SWITCHER — Seletor de IDIOMA (PT/ES) em runtime, sem rebuild/redeploy
 *
 * Componente compartilhado entre site/ e app/ (consumido via @shared). É análogo
 * a um seletor de idioma: dropdown compacto com as opções de idioma suportadas.
 *
 * NOTA (PP3): o antigo "VariantSwitcher" trocava também a VARIANTE de marca
 * (GP0/PP1/PP2). Esse teste de arquitetura foi encerrado — em PP3 existe UMA
 * única identidade de produção (Pulso Preto) e GP0/PP1/PP2 somem da UI. Por
 * isso o seletor agora oferece APENAS idioma.
 */

import { useEffect, useRef, useState } from 'react';
import { useAppearance } from '../context/AppearanceContext';
import { SUPPORTED_LOCALES } from '../data/locales';

export default function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const { localeId, setLocaleId, t } = useAppearance();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Fecha com a tecla Esc e devolve o foco ao botão disparador, para que o
  // usuário sempre consiga voltar à navegação normal sem usar o mouse.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const current = SUPPORTED_LOCALES.find((l) => l.id === localeId);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t('switcher.title')}
        className={`flex items-center gap-1.5 rounded-md border border-current/20 px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-black/5 ${
          compact ? '' : ''
        }`}
      >
        <span aria-hidden="true">🌐</span>
        <span className="uppercase tracking-wide">{current?.id ?? localeId}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="false"
            aria-label={t('switcher.title')}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-black/10 bg-white shadow-xl p-3 z-50 text-pulso-verde"
          >
            <p className="text-[11px] font-bold uppercase tracking-wide text-pulso-marrom/60 mb-2">
              {t('switcher.locale.label')}
            </p>
            <div className="flex flex-col gap-1.5">
              {SUPPORTED_LOCALES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setLocaleId(l.id);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                    localeId === l.id
                      ? 'border-pulso-verde bg-pulso-verde/10 text-pulso-verde'
                      : 'border-pulso-dourado/25 hover:bg-pulso-dourado/10 text-pulso-marrom'
                  }`}
                >
                  <span aria-hidden="true">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
