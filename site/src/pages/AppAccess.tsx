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
  yellow: 'bg-pulso-dourado-claro/30 border-pulso-dourado text-pulso-dourado',
};

const panelClasses: Record<string, string> = {
  '🟢 Concluído': 'border-pulso-verde-accent/40 bg-pulso-verde-medio/10',
  '🟡 Em andamento': 'border-pulso-dourado-claro bg-pulso-dourado-claro/10',
  '🔴 Pendente': 'border-pulso-marrom/40 bg-pulso-marrom/10',
};

export default function AppAccess() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-6">
        <span className="eyebrow text-pulso-verde-accent">{baixarHero.kicker}</span>
        <h1 className="text-3xl font-bold text-pulso-verde mt-1 mb-4">{baixarHero.title}</h1>
        <p className="text-pulso-marrom max-w-2xl mx-auto mb-6">{baixarHero.subtitle}</p>
        <div
          className={`inline-flex flex-col items-center gap-1 rounded-xl border px-5 py-3 mb-8 ${statusBadgeClasses[baixarHero.statusBadge.color]}`}
        >
          <span className="font-bold text-sm">
            {baixarHero.statusBadge.icon} {baixarHero.statusBadge.text}
          </span>
          <span className="text-xs max-w-md">{baixarHero.statusBadge.detail}</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#formulario" className="rounded-md bg-pulso-verde text-white px-5 py-3 font-semibold hover:bg-pulso-verde text-sm">
            📱 Quero acesso antecipado
          </a>
          <a href="#como-funciona" className="rounded-md border border-pulso-dourado/40 px-5 py-3 font-semibold text-pulso-verde hover:bg-pulso-creme text-sm">
            📖 Ver como funciona
          </a>
          <Link to="/transparencia" className="rounded-md border border-pulso-dourado/40 px-5 py-3 font-semibold text-pulso-verde hover:bg-pulso-creme text-sm">
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
            <div key={panel.status} className={`rounded-xl border p-4 ${panelClasses[panel.status] ?? 'border-pulso-dourado/25'}`}>
              <h3 className="font-bold text-pulso-verde text-sm mb-3">{panel.status}</h3>
              <ul className="space-y-1.5">
                {panel.items.map((item) => (
                  <li key={item} className="text-xs text-pulso-marrom">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-pulso-verde mb-3 text-sm">📅 Cronograma público</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {publicTimeline.map((t) => (
            <div key={t.period} className="rounded-xl border border-pulso-dourado/25 p-4 text-center">
              <p className="text-xs font-bold uppercase text-pulso-verde-accent mb-1">{t.period}</p>
              <p className="text-xs text-pulso-marrom">{t.milestone}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Como funciona */}
      <Section title="Como o app funciona" id="como-funciona">
        <div className="grid sm:grid-cols-2 gap-4">
          {howItWorksSteps.map((s) => (
            <div key={s.step} className="rounded-xl border border-pulso-dourado/25 p-4 flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-pulso-verde text-white text-xs font-bold flex items-center justify-center">
                {s.step}
              </span>
              <div>
                <h4 className="font-semibold text-pulso-verde text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-pulso-marrom">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Direitos */}
      <Section title="Seus direitos no app">
        <h3 className="font-bold text-pulso-verde mb-3 text-sm">Consentimento granular (4 níveis)</h3>
        <div className="space-y-3 mb-8">
          {consentLevels.map((l) => (
            <div key={l.level} className="rounded-xl border border-pulso-dourado/25 p-4 flex items-start gap-4">
              <span className="shrink-0 h-8 w-8 rounded-full bg-pulso-verde-accent/15 text-pulso-verde font-bold text-sm flex items-center justify-center">
                {l.level}
              </span>
              <div>
                <div className="font-semibold text-pulso-verde text-sm flex items-center gap-2">
                  {l.name}
                  {l.type === 'Obrigatório' ? (
                    <span className="text-[10px] uppercase font-bold text-white bg-pulso-marrom px-1.5 py-0.5 rounded">Obrigatório</span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-pulso-marrom/70 bg-pulso-dourado/15 px-1.5 py-0.5 rounded">Opcional</span>
                  )}
                </div>
                <p className="text-xs text-pulso-marrom/70 mt-1">{l.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-pulso-verde mb-3 text-sm">Seus direitos garantidos (Lei Geral de Proteção de Dados — LGPD, Art. 18)</h3>
        <div className="grid sm:grid-cols-2 gap-2 mb-8">
          {lgpdRights.map((r) => (
            <div key={r.name} className="text-sm text-pulso-marrom flex gap-2">
              <span>{r.icon}</span>
              <span><strong>{r.name}:</strong> {r.text}</span>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-pulso-verde mb-3 text-sm">Segurança técnica</h3>
        <ul className="space-y-1.5">
          {technicalSecurity.map((s) => (
            <li key={s} className="text-sm text-pulso-marrom list-disc ml-5">{s}</li>
          ))}
        </ul>
      </Section>

      {/* Formulário */}
      <Section title="Formulário de acesso antecipado" id="formulario">
        <div className="rounded-2xl border border-pulso-dourado/25 bg-pulso-creme p-6">
          <p className="text-sm text-pulso-marrom mb-6">{earlyAccessForm.header}</p>
          {submitted ? (
            <div className="rounded-xl border border-pulso-verde-accent/40 bg-pulso-verde-medio/10 p-6 text-center">
              <p className="font-bold text-pulso-verde-medio mb-1">Cadastro recebido! 🎉</p>
              <p className="text-sm text-pulso-marrom">
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
                    <label className="flex items-start gap-2 text-sm text-pulso-marrom">
                      <input type="checkbox" required={field.required} className="mt-1" />
                      <span>
                        {field.label}
                        {field.link && (
                          <>
                            {' '}
                            <Link to={field.link} className="text-pulso-verde-accent hover:underline">
                              (ver política)
                            </Link>
                          </>
                        )}
                      </span>
                    </label>
                  ) : field.type === 'select' ? (
                    <div>
                      <label className="block text-sm font-medium text-pulso-verde mb-1">
                        {field.label} {field.required && <span className="text-pulso-marrom">*</span>}
                      </label>
                      <select required={field.required} className="w-full rounded-md border border-pulso-dourado/40 px-3 py-2 text-sm bg-white">
                        <option value="">Selecione...</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-pulso-verde mb-1">
                        {field.label} {field.required && <span className="text-pulso-marrom">*</span>}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        className="w-full rounded-md border border-pulso-dourado/40 px-3 py-2 text-sm"
                      />
                      {field.help && <p className="text-xs text-pulso-marrom/60 mt-1">{field.help}</p>}
                    </div>
                  )}
                </div>
              ))}
              <p className="text-xs text-pulso-marrom/60">{earlyAccessForm.legalNotice}</p>
              <button
                type="submit"
                className="w-full rounded-md bg-pulso-verde text-white px-5 py-3 font-semibold hover:bg-pulso-verde text-sm"
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
            <details key={f.q} className="rounded-xl border border-pulso-dourado/25 p-4 group">
              <summary className="font-semibold text-pulso-verde text-sm cursor-pointer list-none flex justify-between items-center">
                {f.q}
                <span className="text-pulso-marrom/60 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="text-sm text-pulso-marrom mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Profissionais + Acadêmico */}
      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        <div className="rounded-xl border border-pulso-dourado/25 p-5">
          <h3 className="font-bold text-pulso-verde mb-2 text-sm">{professionalsSection.title}</h3>
          <p className="text-xs text-pulso-marrom mb-4">{professionalsSection.text}</p>
          <span className="text-xs font-semibold text-pulso-verde-accent">{professionalsSection.ctaLabel} →</span>
        </div>
        <div className="rounded-xl border border-pulso-dourado/25 p-5">
          <h3 className="font-bold text-pulso-verde mb-2 text-sm">{academicSection.title}</h3>
          <p className="text-xs text-pulso-marrom mb-4">{academicSection.text}</p>
          <span className="text-xs font-semibold text-pulso-verde-accent">{academicSection.ctaLabel} →</span>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="grid sm:grid-cols-3 gap-5">
        {baixarFooterCtas.map((cta) => (
          <div key={cta.title} className="rounded-xl border border-pulso-dourado/25 p-5">
            <h3 className="font-bold text-pulso-verde mb-2 text-sm">{cta.title}</h3>
            <p className="text-xs text-pulso-marrom mb-4">{cta.text}</p>
            {cta.href ? (
              <Link to={cta.href} className="text-xs font-semibold text-pulso-verde-accent hover:underline">
                {cta.ctaLabel} →
              </Link>
            ) : (
              <span className="text-xs font-semibold text-pulso-verde-accent">{cta.ctaLabel} →</span>
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
      <h2 className="text-xl font-bold text-pulso-verde mb-5">{title}</h2>
      {children}
    </section>
  );
}
