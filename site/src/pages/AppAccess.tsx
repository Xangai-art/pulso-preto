import { useState } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';
import QRLink from '../components/QRLink';
import {
  baixarHero,
  statusPanels,
  publicTimeline,
  howItWorksSteps,
  consentLevels,
  lgpdRights,
  technicalSecurity,
  earlyAccessForm,
  baixarFaq,
  professionalsSection,
  academicSection,
  baixarFooterCtas,
} from '../data/baixarAppContent';

const statusBadgeClasses: Record<string, string> = {
  yellow: 'bg-ouro-300/30 border-ouro-500 text-ouro-700',
};

const panelClasses: Record<string, string> = {
  '🟢 Concluído': 'border-folha-300 bg-folha-50',
  '🟡 Em andamento': 'border-ouro-300 bg-ouro-300/10',
  '🔴 Pendente': 'border-barro-300 bg-barro-100/30',
};

export default function AppAccess() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-6">
        <span className="eyebrow text-brand-600">{baixarHero.kicker}</span>
        <h1 className="text-3xl font-bold text-earth-900 mt-1 mb-4">{baixarHero.title}</h1>
        <p className="text-earth-600 max-w-2xl mx-auto mb-6">{baixarHero.subtitle}</p>
        <div
          className={`inline-flex flex-col items-center gap-1 rounded-xl border px-5 py-3 mb-8 ${statusBadgeClasses[baixarHero.statusBadge.color]}`}
        >
          <span className="font-bold text-sm">
            {baixarHero.statusBadge.icon} {baixarHero.statusBadge.text}
          </span>
          <span className="text-xs max-w-md">{baixarHero.statusBadge.detail}</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#formulario" className="rounded-md bg-brand-600 text-white px-5 py-3 font-semibold hover:bg-brand-700 text-sm">
            📱 Quero acesso antecipado
          </a>
          <a href="#como-funciona" className="rounded-md border border-earth-300 px-5 py-3 font-semibold text-earth-800 hover:bg-earth-50 text-sm">
            📖 Ver como funciona
          </a>
          <Link to="/transparencia" className="rounded-md border border-earth-300 px-5 py-3 font-semibold text-earth-800 hover:bg-earth-50 text-sm">
            ⚖️ Ler Política de Privacidade
          </Link>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <QRLink size={220} />
      </div>

      {/* Status */}
      <Section title="Status atual (transparência radical)">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {statusPanels.map((panel) => (
            <div key={panel.status} className={`rounded-xl border p-4 ${panelClasses[panel.status] ?? 'border-earth-200'}`}>
              <h3 className="font-bold text-earth-900 text-sm mb-3">{panel.status}</h3>
              <ul className="space-y-1.5">
                {panel.items.map((item) => (
                  <li key={item} className="text-xs text-earth-700">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-earth-900 mb-3 text-sm">📅 Cronograma público</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {publicTimeline.map((t) => (
            <div key={t.period} className="rounded-xl border border-earth-200 p-4 text-center">
              <p className="text-xs font-bold uppercase text-brand-600 mb-1">{t.period}</p>
              <p className="text-xs text-earth-700">{t.milestone}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Como funciona */}
      <Section title="Como o app funciona" id="como-funciona">
        <div className="grid sm:grid-cols-2 gap-4">
          {howItWorksSteps.map((s) => (
            <div key={s.step} className="rounded-xl border border-earth-200 p-4 flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                {s.step}
              </span>
              <div>
                <h4 className="font-semibold text-earth-900 text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-earth-600">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Direitos */}
      <Section title="Seus direitos no app">
        <h3 className="font-bold text-earth-900 mb-3 text-sm">Consentimento granular (4 níveis)</h3>
        <div className="space-y-3 mb-8">
          {consentLevels.map((l) => (
            <div key={l.level} className="rounded-xl border border-earth-200 p-4 flex items-start gap-4">
              <span className="shrink-0 h-8 w-8 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">
                {l.level}
              </span>
              <div>
                <div className="font-semibold text-earth-900 text-sm flex items-center gap-2">
                  {l.name}
                  {l.type === 'Obrigatório' ? (
                    <span className="text-[10px] uppercase font-bold text-white bg-earth-700 px-1.5 py-0.5 rounded">Obrigatório</span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-earth-500 bg-earth-100 px-1.5 py-0.5 rounded">Opcional</span>
                  )}
                </div>
                <p className="text-xs text-earth-500 mt-1">{l.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-earth-900 mb-3 text-sm">Seus direitos garantidos (LGPD Art. 18)</h3>
        <div className="grid sm:grid-cols-2 gap-2 mb-8">
          {lgpdRights.map((r) => (
            <div key={r.name} className="text-sm text-earth-700 flex gap-2">
              <span>{r.icon}</span>
              <span><strong>{r.name}:</strong> {r.text}</span>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-earth-900 mb-3 text-sm">Segurança técnica</h3>
        <ul className="space-y-1.5">
          {technicalSecurity.map((s) => (
            <li key={s} className="text-sm text-earth-700 list-disc ml-5">{s}</li>
          ))}
        </ul>
      </Section>

      {/* Formulário */}
      <Section title="Formulário de acesso antecipado" id="formulario">
        <div className="rounded-2xl border border-earth-200 bg-earth-50 p-6">
          <p className="text-sm text-earth-600 mb-6">{earlyAccessForm.header}</p>
          {submitted ? (
            <div className="rounded-xl border border-folha-300 bg-folha-50 p-6 text-center">
              <p className="font-bold text-folha-700 mb-1">Cadastro recebido! 🎉</p>
              <p className="text-sm text-earth-600">
                Você entrou na lista de espera do Beta. Fique de olho no seu e-mail a partir de Q4 2026.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              {earlyAccessForm.fields.map((field) => (
                <div key={field.name}>
                  {field.type === 'checkbox' ? (
                    <label className="flex items-start gap-2 text-sm text-earth-700">
                      <input type="checkbox" required={field.required} className="mt-1" />
                      <span>
                        {field.label}
                        {field.link && (
                          <>
                            {' '}
                            <Link to={field.link} className="text-brand-600 hover:underline">
                              (ver política)
                            </Link>
                          </>
                        )}
                      </span>
                    </label>
                  ) : field.type === 'select' ? (
                    <div>
                      <label className="block text-sm font-medium text-earth-800 mb-1">
                        {field.label} {field.required && <span className="text-barro-500">*</span>}
                      </label>
                      <select required={field.required} className="w-full rounded-md border border-earth-300 px-3 py-2 text-sm bg-white">
                        <option value="">Selecione...</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-earth-800 mb-1">
                        {field.label} {field.required && <span className="text-barro-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        className="w-full rounded-md border border-earth-300 px-3 py-2 text-sm"
                      />
                      {field.help && <p className="text-xs text-earth-400 mt-1">{field.help}</p>}
                    </div>
                  )}
                </div>
              ))}
              <p className="text-xs text-earth-400">{earlyAccessForm.legalNotice}</p>
              <button
                type="submit"
                className="w-full rounded-md bg-brand-600 text-white px-5 py-3 font-semibold hover:bg-brand-700 text-sm"
              >
                {earlyAccessForm.submitLabel}
              </button>
            </form>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Perguntas frequentes">
        <div className="space-y-3">
          {baixarFaq.map((f) => (
            <details key={f.q} className="rounded-xl border border-earth-200 p-4 group">
              <summary className="font-semibold text-earth-900 text-sm cursor-pointer list-none flex justify-between items-center">
                {f.q}
                <span className="text-earth-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-sm text-earth-600 mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Profissionais + Acadêmico */}
      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        <div className="rounded-xl border border-earth-200 p-5">
          <h3 className="font-bold text-earth-900 mb-2 text-sm">{professionalsSection.title}</h3>
          <p className="text-xs text-earth-600 mb-4">{professionalsSection.text}</p>
          <span className="text-xs font-semibold text-brand-600">{professionalsSection.ctaLabel} →</span>
        </div>
        <div className="rounded-xl border border-earth-200 p-5">
          <h3 className="font-bold text-earth-900 mb-2 text-sm">{academicSection.title}</h3>
          <p className="text-xs text-earth-600 mb-4">{academicSection.text}</p>
          <span className="text-xs font-semibold text-brand-600">{academicSection.ctaLabel} →</span>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="grid sm:grid-cols-3 gap-5">
        {baixarFooterCtas.map((cta) => (
          <div key={cta.title} className="rounded-xl border border-earth-200 p-5">
            <h3 className="font-bold text-earth-900 mb-2 text-sm">{cta.title}</h3>
            <p className="text-xs text-earth-600 mb-4">{cta.text}</p>
            {cta.href ? (
              <Link to={cta.href} className="text-xs font-semibold text-brand-600 hover:underline">
                {cta.ctaLabel} →
              </Link>
            ) : (
              <span className="text-xs font-semibold text-brand-600">{cta.ctaLabel} →</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <h2 className="text-xl font-bold text-earth-900 mb-5">{title}</h2>
      {children}
    </section>
  );
}
