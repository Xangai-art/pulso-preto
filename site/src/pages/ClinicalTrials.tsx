import type React from 'react';
import { Link } from 'react-router-dom';
import {
  ensaiosHero,
  trialPhases,
  guaranteedRights,
  whyItMattersHighlight,
  whyItMattersExamples,
  historicalCases,
  whatChanged,
  officialPlatforms,
  referenceHospitalsDF,
  preParticipationChecklist,
  goldenRule,
  researchInstruments,
  ensaiosFooterCtas,
} from '../data/ensaiosClinicosContent';

export default function ClinicalTrials() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <span className="eyebrow text-brand-600">{ensaiosHero.kicker}</span>
      <h1 className="text-3xl font-bold text-earth-900 mt-1 mb-4">{ensaiosHero.title}</h1>
      <p className="text-earth-600 mb-6 max-w-2xl">{ensaiosHero.subtitle}</p>
      <div className="rounded-xl border border-earth-300 bg-earth-50 p-4 flex gap-3 text-sm text-earth-700 mb-14">
        <span className="text-lg leading-none">{ensaiosHero.notice.icon}</span>
        <p>{ensaiosHero.notice.text}</p>
      </div>

      {/* O que é um ensaio clínico */}
      <Section title="O que é um ensaio clínico?">
        <p className="text-sm text-earth-600 mb-6">
          Ensaio clínico é uma pesquisa organizada para responder uma pergunta específica sobre saúde: Este remédio
          funciona melhor que o atual? Esta vacina protege contra esta doença? Este tratamento tem efeito colateral
          em quem tem hipertensão?
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {trialPhases.map((p) => (
            <div key={p.phase} className="rounded-xl border border-earth-200 p-4">
              <p className="text-xs font-bold uppercase text-brand-600 mb-1">{p.phase}</p>
              <p className="text-sm font-semibold text-earth-900 mb-1">{p.tests}</p>
              <p className="text-xs text-earth-500">{p.people}</p>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-earth-900 mb-3 text-sm">Direitos garantidos por lei (Resolução CNS 466/2012)</h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {guaranteedRights.map((r) => (
            <li key={r} className="text-sm text-earth-700 flex gap-2">
              <span className="text-brand-600">✓</span> {r}
            </li>
          ))}
        </ul>
      </Section>

      {/* Por que participação da população negra importa */}
      <Section title="Por que a participação da população negra importa?">
        <div className="rounded-xl bg-brand-600 text-white p-6 mb-6 text-center">
          <p className="text-3xl font-bold mb-1">{whyItMattersHighlight.statistic}</p>
          <p className="text-sm text-brand-50">{whyItMattersHighlight.text}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {whyItMattersExamples.map((ex) => (
            <div key={ex.title} className="rounded-xl border border-earth-200 p-4">
              <h4 className="font-semibold text-earth-900 text-sm mb-2">{ex.title}</h4>
              <p className="text-xs text-earth-600">{ex.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* História */}
      <Section title="O que historicamente foi feito errado (e por que hoje é diferente)">
        <p className="text-sm text-earth-600 mb-4">
          A desconfiança de pessoas negras em relação a pesquisa clínica tem base histórica legítima:
        </p>
        <div className="space-y-3 mb-8">
          {historicalCases.map((c) => (
            <div key={c.title} className="rounded-xl border border-barro-300 bg-barro-100/40 p-4">
              <h4 className="font-semibold text-barro-700 text-sm mb-1">{c.title}</h4>
              <p className="text-xs text-earth-700">{c.text}</p>
            </div>
          ))}
        </div>
        <h3 className="font-bold text-earth-900 mb-3 text-sm">O que mudou</h3>
        <ul className="space-y-2 mb-4">
          {whatChanged.map((w) => (
            <li key={w} className="text-sm text-earth-700 flex gap-2">
              <span className="text-folha-500">✓</span> {w}
            </li>
          ))}
        </ul>
        <p className="text-xs text-earth-500 italic">
          Reconhecer a história é parte de reconstruir confiança. Por isso o Gente Preta nunca intermedia
          recrutamento sem transparência total sobre quem financia, quem conduz e para que serve o estudo.
        </p>
      </Section>

      {/* Onde encontrar */}
      <Section title="Como encontrar ensaios abertos no Brasil">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {officialPlatforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-earth-200 p-4 hover:shadow-md hover:border-brand-300 transition-all block"
            >
              <div className="text-2xl mb-2">{p.flag}</div>
              <h4 className="font-semibold text-earth-900 text-sm mb-1">{p.name}</h4>
              <p className="text-xs text-earth-600 mb-2">{p.text}</p>
              <span className="text-xs font-semibold text-brand-600">Acessar →</span>
            </a>
          ))}
        </div>
        <h3 className="font-bold text-earth-900 mb-3 text-sm">Hospitais de referência com centros de pesquisa (DF)</h3>
        <ul className="space-y-1.5">
          {referenceHospitalsDF.map((h) => (
            <li key={h} className="text-sm text-earth-700">• {h}</li>
          ))}
        </ul>
      </Section>

      {/* Checklist */}
      <Section title="Checklist: Devo participar de um estudo?">
        <p className="text-sm text-earth-600 mb-4">Antes de aceitar, pergunte:</p>
        <ul className="space-y-2 mb-6">
          {preParticipationChecklist.map((q, i) => (
            <li key={q} className="text-sm text-earth-700 flex gap-3">
              <span className="shrink-0 h-5 w-5 rounded-full bg-brand-100 text-brand-700 text-[11px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-ouro-500 bg-ouro-300/20 p-4 flex gap-3">
          <span className="text-lg leading-none">{goldenRule.icon}</span>
          <p className="text-sm text-earth-800 font-medium">{goldenRule.text}</p>
        </div>
      </Section>

      {/* Posição do projeto */}
      <Section title="O Gente Preta e a pesquisa">
        <p className="text-sm text-earth-600 mb-6">
          O Gente Preta é, ele próprio, um projeto de pesquisa aplicada (aprovação CEP/FEPECS em andamento). Nossos
          instrumentos de coleta seguem três regimes distintos e transparentes:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {researchInstruments.map((inst) => (
            <div key={inst.title} className="rounded-xl border border-earth-200 p-4 bg-earth-50">
              <h4 className="font-semibold text-earth-900 text-sm mb-2">{inst.title}</h4>
              <ul className="space-y-1">
                {inst.attributes.map((a) => (
                  <li key={a} className="text-xs text-earth-600">• {a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-earth-500 italic">
          Nenhum destes é ensaio clínico. Se um dia o projeto conduzir ensaio clínico, será com registro público,
          aprovação CONEP e consentimento explícito — nunca embutido no fluxo do app.
        </p>
      </Section>

      {/* Footer CTAs */}
      <div className="grid sm:grid-cols-3 gap-5 mt-4">
        {ensaiosFooterCtas.map((cta) => (
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-xl font-bold text-earth-900 mb-5">{title}</h2>
      {children}
    </section>
  );
}
