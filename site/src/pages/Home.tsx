import { Link } from 'react-router-dom';
import { partners } from '../data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getPulsoContent } from '@shared/data/pulsoContent';
import type { PulsoContent } from '../../../shared/data/pulsoContent';
import PulsoIcon from '../components/PulsoIcons';
import { HERO_IMAGE } from '../../../shared/data/variants';

// Home "Pulso Preto" — identidade ÚNICA de produção (PP3).
//
// HISTÓRICO: durante o teste da arquitetura CEOS a Home ramificava por variante
// (GP0 → Home "Gente Preta"; PP1/PP2 → Home "Pulso Preto"). Esse teste foi
// encerrado. Em PP3 há apenas a Home "Pulso Preto", fiel aos mockups de
// referência da marca: hero, faixa de atalhos, temas em destaque, dados que
// revelam realidades, missão, seminário, últimas notícias e parceiros.
//
// Conteúdo em shared/data/pulsoContent.ts (PT/ES). Imagens: acervo já
// produzido (D15) — sem novas imagens nem menções a "placeholder".
export default function Home() {
  const { localeId } = useAppearance();
  const content = getPulsoContent(localeId);

  return (
    <div className="bg-pulso-creme font-pulso-body">
      <PulsoHero content={content} />
      <PulsoFeatures content={content} />
      <PulsoThemes content={content} />
      <PulsoStats content={content} />
      <PulsoMission content={content} />
      <PulsoSeminar content={content} />
      <PulsoNews content={content} />
      <PulsoPartners />
    </div>
  );
}

function PulsoHero({ content }: { content: PulsoContent }) {
  const h = content.hero;
  return (
    <section className="relative overflow-hidden bg-pulso-verde text-pulso-creme">
      <img
        src="/static/brand/elementos/circulo-dourado-oficial.png"
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute -top-10 -right-10 w-64 h-64 opacity-[0.12] pointer-events-none select-none"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center relative">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-pulso-dourado mb-4 leading-relaxed">
            {h.eyebrow.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
          <h1 className="font-pulso-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
            {h.headline.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-base text-pulso-creme/85 mb-8 max-w-md">{h.paragraph}</p>
          <Link
            to="/saude"
            className="inline-block rounded-md bg-pulso-dourado text-pulso-verde px-6 py-3 font-bold uppercase text-sm tracking-wide hover:bg-pulso-creme transition-colors"
          >
            {h.ctaLabel}
          </Link>
        </div>

        <div>
          <p className="font-pulso-display italic text-pulso-dourado text-xl sm:text-2xl leading-snug text-right mb-3">
            {h.cursive.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
            <img src={HERO_IMAGE.url} alt={HERO_IMAGE.alt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PulsoFeatures({ content }: { content: PulsoContent }) {
  const cols = content.features.length >= 5 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4';
  return (
    <section className="bg-pulso-creme border-b border-pulso-dourado/20">
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-12 grid ${cols} gap-6`}>
        {content.features.map((f, i) => (
          <div key={i} className="flex flex-col items-start gap-3">
            <div className="rounded-full bg-pulso-verde/10 p-3">
              <PulsoIcon id={f.icon} size={26} color="#06201B" />
            </div>
            <h3 className="font-bold text-pulso-verde text-sm uppercase tracking-wide leading-tight">
              {f.title.map((line, j) => (
                <span key={j} className="block">{line}</span>
              ))}
            </h3>
            <p className="text-xs text-pulso-marrom/75 leading-snug">{f.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PulsoThemes({ content }: { content: PulsoContent }) {
  const th = content.themes;
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota">{th.eyebrow}</span>
          <Link to="/saude" className="text-pulso-verde text-sm font-bold hover:underline">{th.viewAllLabel}</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {th.cards.map((card) => (
            <Link
              key={card.id}
              to={card.to}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
            >
              <img
                src={card.image.url}
                alt={card.image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {card.title.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>
                  {card.subtitle && <p className="text-white/80 text-xs mt-1">{card.subtitle}</p>}
                </div>
                <span className="shrink-0 rounded-full bg-pulso-dourado text-pulso-verde w-8 h-8 flex items-center justify-center font-bold">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PulsoStats({ content }: { content: PulsoContent }) {
  const s = content.stats;
  return (
    <section className="bg-pulso-marrom/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota block mb-2">{s.eyebrow}</span>
            <h2 className="font-pulso-display text-2xl sm:text-3xl font-bold text-pulso-verde leading-tight">
              {s.heading.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            {s.paragraph && <p className="text-sm text-pulso-marrom/75 mt-3">{s.paragraph}</p>}
          </div>
          <Link
            to="/transparencia"
            className="rounded-md bg-pulso-verde text-pulso-creme px-5 py-3 font-bold text-sm uppercase tracking-wide hover:bg-pulso-marrom transition-colors shrink-0"
          >
            {s.ctaLabel}
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {s.cards.map((c, i) => (
            <div key={i} className="rounded-xl bg-white border border-pulso-dourado/20 p-5">
              <div className="text-3xl font-bold text-pulso-terracota mb-2">{c.value}</div>
              <p className="text-xs text-pulso-marrom/80 leading-snug mb-2">
                {c.label.map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </p>
              <p className="text-[10px] text-pulso-marrom/50 uppercase tracking-wide">{c.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PulsoMission({ content }: { content: PulsoContent }) {
  const m = content.mission;
  return (
    <section className="bg-pulso-verde">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <img src={m.photo.url} alt={m.photo.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="bg-pulso-creme px-6 sm:px-10 py-14 relative">
          {m.eyebrow && <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota block mb-2">{m.eyebrow}</span>}
          {m.heading && (
            <h2 className="font-pulso-display text-2xl sm:text-3xl font-bold text-pulso-verde leading-tight mb-4">
              {m.heading.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
          )}
          <p className="text-sm text-pulso-marrom/80 mb-6 max-w-sm">{m.paragraph}</p>
          <Link
            to={m.ctaTo}
            className="inline-block rounded-md bg-pulso-verde text-pulso-creme px-5 py-3 font-bold text-sm uppercase tracking-wide hover:bg-pulso-marrom transition-colors mb-8"
          >
            {m.ctaLabel}
          </Link>
          <ul className="space-y-1.5 mb-6">
            {m.wordList.map((w) => (
              <li key={w} className="text-xs font-bold uppercase tracking-wider text-pulso-marrom/70">{w}</li>
            ))}
          </ul>
          <p className="font-pulso-display italic text-pulso-terracota text-xl leading-snug mb-3">
            {m.cursive.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
          <img
            src="/static/brand/elementos/pulso-dourado-oficial.png"
            alt=""
            aria-hidden="true"
            className="h-5 w-auto opacity-80"
          />
        </div>
      </div>
    </section>
  );
}

function PulsoSeminar({ content }: { content: PulsoContent }) {
  const s = content.seminar;
  return (
    <section id="seminario" className="bg-pulso-verde text-pulso-creme scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-xs font-bold uppercase tracking-wider text-pulso-dourado block mb-2">{s.eyebrow}</span>
        <h2 className="font-pulso-display text-2xl sm:text-3xl font-bold leading-tight mb-3 max-w-3xl">{s.name}</h2>
        <p className="text-sm text-pulso-creme/85 max-w-2xl mb-2">
          <strong className="text-pulso-dourado">{s.dates}</strong> — {s.location}
        </p>
        <p className="text-sm text-pulso-creme/80 max-w-2xl mb-10">{s.intro}</p>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {s.days.map((d, i) => (
            <div key={i} className="rounded-xl bg-pulso-creme/10 border border-pulso-dourado/25 p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-pulso-dourado mb-1">{d.label}</div>
              <p className="font-bold text-pulso-creme mb-1">{d.audience}</p>
              <p className="text-xs text-pulso-creme/75 leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-pulso-dourado mb-3">{s.axesHeading}</h3>
            <ul className="space-y-2 text-sm text-pulso-creme/85">
              {s.axes.map((a, i) => (
                <li key={i} className="flex gap-2"><span className="text-pulso-dourado">•</span>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-pulso-dourado mb-3">{s.panelHeading}</h3>
            <p className="text-sm text-pulso-creme/80 leading-relaxed">{s.panelText}</p>
          </div>
        </div>

        <p className="text-[11px] text-pulso-creme/50 border-t border-pulso-creme/15 mt-10 pt-4">{s.sourceNote}</p>
      </div>
    </section>
  );
}

function PulsoNews({ content }: { content: PulsoContent }) {
  const n = content.news;
  return (
    <section id="noticias" className="bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota">{n.eyebrow}</span>
          <Link to="/noticias" className="text-pulso-verde text-sm font-bold hover:underline">{n.viewAllLabel}</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {n.cards.map((card, i) => (
            <article key={i} className="rounded-xl border border-pulso-dourado/20 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/9]">
                <img src={card.image.url} alt={card.image.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <time className="text-xs text-pulso-terracota font-bold uppercase tracking-wide">{card.date}</time>
                <h3 className="font-bold text-pulso-verde mt-2 leading-snug">{card.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Parceiros e Governança — reaproveita o acervo de logos oficiais de parceiros
// (site/public/static/brand/partners/) fornecido no pacote de identidade de
// marca (Logotipos.zip). Re-tematizado para a identidade Pulso Preto.
function PulsoPartners() {
  const all = [
    ...partners.financiamento,
    ...partners.institucional,
    ...partners.execucao,
    ...partners.academico,
    ...partners.comunitario,
  ];
  return (
    <section className="bg-pulso-verde-medio/10 border-t border-pulso-dourado/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota block mb-2">PARCEIROS E GOVERNANÇA —</span>
        <h2 className="font-pulso-display text-2xl sm:text-3xl font-bold text-pulso-verde mb-8">Quem constrói o Pulso Preto</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {all.map((p) => {
            const logo = (p as { logo?: string }).logo;
            return (
              <div key={p.name} className="rounded-lg bg-white border border-pulso-dourado/25 p-4">
                {logo && (
                  <img src={logo} alt={`Logotipo ${p.name}`} className="h-8 w-auto mb-3 object-contain" loading="lazy" />
                )}
                <div className="font-bold text-pulso-verde">{p.name}</div>
                <div className="text-pulso-marrom/70 text-xs mb-1">{p.full}</div>
                <div className="text-pulso-marrom/50 text-xs">{p.role}</div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link to="/transparencia" className="text-pulso-verde hover:underline font-medium">
            Ver política completa de transparência e governança →
          </Link>
        </div>
      </div>
    </section>
  );
}
