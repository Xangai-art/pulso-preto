import { Link } from 'react-router-dom';
import { priorityThemes, emergentThemes, totalConditionsCount } from '../data/diseases';
import { partners, hardServices, phytotherapy } from '../data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getVariantContent } from '@shared/data/variantContent';
import type { PulsoVariantContent } from '../../../shared/data/variantContent';
import { LeafMark, PalhaLine, ContasRing } from '../components/Ornaments';
import ThemeIcon from '../components/ThemeIcons';
import HeroSlideshow from '../components/HeroSlideshow';
import PulsoIcon from '../components/PulsoIcons';

const tickerStats = [
  '2,3x mais risco de hipertensão',
  `${totalConditionsCount}+ condições de saúde mapeadas`,
  '60% de subdiagnóstico por racismo institucional',
  '56% da população do DF é negra',
  '10 UBSs piloto no DF',
  '7 temas prioritários no App Sentinela',
];

const toneClasses: Record<string, string> = {
  barro: 'border-barro-300 bg-barro-100/60 hover:border-barro-500',
  folha: 'border-folha-300 bg-folha-50 hover:border-folha-500',
  ouro: 'border-ouro-300 bg-palha-50 hover:border-ouro-500',
};

const toneText: Record<string, string> = {
  barro: 'text-barro-700',
  folha: 'text-folha-700',
  ouro: 'text-ouro-700',
};

export default function Home() {
  const { variant, variantId, localeId, brand, t } = useAppearance();

  // PP1/PP2 — reconstrução integral fiel aos mockups de referência (arquitetura
  // CEOS "full-fledged": texto, estrutura e cartões próprios, não apenas troca
  // de cor/imagem/CTA sobre a base GP0). Ver shared/data/variantContent.ts.
  if (variantId === 'pp1' || variantId === 'pp2') {
    const content = getVariantContent(variantId, localeId);
    if (content) return <PulsoHome content={content} />;
  }

  // GP0 — Home original "Gente Preta", intacta.
  const heroTreatment = variant.hero.treatment;
  const ctaPrimary = t(variant.hero.ctaPrimaryKey);
  const ctaSecondary = t(variant.hero.ctaSecondaryKey);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-folha-50 via-brand-50 to-white ornament-folha">
        <ContasRing size={160} className="hidden sm:block absolute top-8 right-8 opacity-[0.15] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 items-center relative">
          <div>
            <span className="eyebrow inline-block text-folha-700 mb-4">
              {t('home.hero.eyebrow')}
            </span>
            <h1 className="font-editorial italic text-4xl sm:text-5xl lg:text-[3.4rem] font-medium text-earth-900 leading-tight mb-6">
              {t('home.hero.headline.part1')} <span className="text-brand-600 not-italic font-bold">{t('home.hero.headline.highlight')}</span>.
              <br />
              {t('home.hero.headline.part2')}
            </h1>
            <p className="text-lg text-earth-600 mb-8">
              {brand.name} reúne evidência científica, navegação em saúde e vigilância comunitária para
              reduzir as inequidades que a população negra enfrenta no SUS — começando pelo Distrito Federal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/baixar" className="rounded-md bg-brand-600 text-white px-5 py-3 font-semibold hover:bg-brand-700">
                {ctaPrimary}
              </Link>
              <Link to="/saude" className="rounded-md border border-earth-300 px-5 py-3 font-semibold text-earth-800 hover:bg-earth-50">
                {ctaSecondary}
              </Link>
            </div>
          </div>
          <div>
            {heroTreatment === 'slideshow' && (
              <>
                <HeroSlideshow />
                <p className="text-xs text-earth-500 mt-2 text-center">
                  {t('home.hero.caption', { brand: brand.name })}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="bg-earth-900 text-earth-100 overflow-hidden py-2 text-xs sm:text-sm border-y border-earth-800">
        <div className="ticker-track gap-12 px-6">
          {[...tickerStats, ...tickerStats].map((stat, i) => (
            <span key={i} className="whitespace-nowrap font-medium tracking-wide">
              <span className="text-ouro-300 mr-2">●</span>{stat}
            </span>
          ))}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <Stat value="2,3x" label="mais risco de hipertensão" type="critical" />
        <Stat value={`${totalConditionsCount}+`} label="condições de saúde mapeadas" type="progress" />
        <Stat value="7" label="temas prioritários no App" type="goal" />
        <Stat value="10" label="UBSs piloto no DF" type="info" />
      </section>

      <section className="bg-white ornament-palha">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
            <div>
              <span className="eyebrow text-folha-700">Serviço, não só conteúdo</span>
              <h2 className="font-editorial italic text-2xl sm:text-3xl text-earth-900 mt-1">Folhas de {brand.name}</h2>
              <p className="text-sm text-earth-500 mt-1">Serviços concretos, não apenas conteúdo — direito à saúde na prática.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {hardServices.map((s) => (
              <Link
                key={s.id}
                to={s.to}
                className={`rounded-xl border-2 p-5 transition-colors ${toneClasses[s.tone]}`}
              >
                <h3 className={`font-bold mb-2 ${toneText[s.tone]}`}>{s.titulo}</h3>
                <p className="text-sm text-earth-700 mb-4">{s.descricao}</p>
                <span className={`text-sm font-semibold ${toneText[s.tone]}`}>{s.ctaLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-folha-900 text-palha-100 relative">
        <div
          className="h-[3px] w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #c9a04b 0 12px, transparent 12px 20px)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <LeafMark size={22} color="#c9a04b" />
              <span className="eyebrow text-ouro-300">Folhas com ciência</span>
            </div>
            <h2 className="font-editorial italic text-2xl sm:text-3xl mb-3">Fitoterapia com ciência.</h2>
            <p className="text-sm text-folha-100/90">
              O que a farmacologia moderna vem redescobrindo no que nossas avós já sabiam. Sem misticismo — com
              estudo, achado e contraindicação.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {phytotherapy.map((p) => (
              <div key={p.id} className="border-t border-ouro-500 pt-4">
                <h3 className="font-editorial text-lg mb-0.5">{p.name}</h3>
                <p className="text-xs italic text-ouro-300 mb-3">{p.scientificName}</p>
                <p className="text-sm text-folha-100/95 mb-3">{p.finding}</p>
                <p className="text-xs text-folha-100/70 mb-3">
                  <span className="eyebrow text-ouro-300/90">Fonte</span>
                  <br />
                  {p.study}
                </p>
                <p className="text-xs text-palha-100 bg-barro-500/25 border border-barro-500/40 rounded px-2 py-1.5">
                  <strong>Atenção:</strong> {p.caution}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-folha-100/60 mt-8 max-w-2xl">
            Conteúdo educativo, não substitui avaliação médica. Sempre informe seu médico ou farmacêutico sobre
            o uso de plantas medicinais, especialmente se estiver em tratamento com outros medicamentos.
          </p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="bg-folha-900 text-white px-4 sm:px-6 py-16">
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-10">
            <span className="eyebrow text-barro-300">Diagnóstico</span>
            <h2 className="text-2xl font-bold mt-1 mb-4">O problema</h2>
            <ul className="space-y-3 text-folha-100/90">
              <li>• <strong className="text-white">2,3x maior risco</strong> de hipertensão em relação à população branca</li>
              <li>• <strong className="text-white">60% de subdiagnóstico</strong> devido a racismo institucional</li>
              <li>• <strong className="text-white">Menor acesso</strong> a serviços de qualidade no SUS</li>
              <li>• <strong className="text-white">Invisibilidade epidemiológica</strong>: 56% da população é negra, mas apenas 1,5% das pesquisas em saúde incluem recorte racial</li>
            </ul>
          </div>
        </div>
        <div className="bg-folha-700 text-white px-4 sm:px-6 py-16">
          <div className="max-w-xl mx-auto lg:mr-auto lg:ml-10">
            <span className="eyebrow text-ouro-300">Resposta</span>
            <h2 className="text-2xl font-bold mt-1 mb-4">A solução</h2>
            <ul className="space-y-3 text-folha-100/90">
              <li>• <strong className="text-white">Escuta longitudinal</strong> — check-ins de 1-3 minutos</li>
              <li>• <strong className="text-white">Navegação em saúde</strong> — UBS + rede privada + atendimento humanizado</li>
              <li>• <strong className="text-white">Radar comunitário</strong> — sinais devolvidos com transparência, nunca vigilância silenciosa</li>
              <li>• <strong className="text-white">Produção de evidência</strong> — dados para políticas públicas</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-folha-900 text-white ornament-palha">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="eyebrow text-ouro-300">Agenda da comunidade</span>
              <PalhaLine width={56} />
            </div>
            <h2 className="font-editorial italic text-xl sm:text-2xl mb-2">Rodas de conversa acontecem toda semana</h2>
            <p className="text-sm text-folha-100 max-w-xl">
              Encontros presenciais e virtuais para discutir saúde, racismo institucional e autocuidado — com
              mediação de profissionais e lideranças comunitárias.
            </p>
          </div>
          <Link
            to="/comunidade"
            className="shrink-0 rounded-md bg-ouro-500 text-earth-900 px-5 py-3 font-semibold hover:bg-ouro-300"
          >
            Ver agenda da comunidade →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
          <div>
            <span className="eyebrow text-brand-600">Base científica</span>
            <h2 className="text-2xl font-bold text-earth-900 mt-1">7 temas prioritários</h2>
          </div>
          <Link to="/saude" className="text-brand-600 font-medium hover:underline">Ver biblioteca completa →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {priorityThemes.map((theme) => (
            <Link
              key={theme.id}
              to={`/saude/${theme.categoryId}/${theme.id}`}
              className="rounded-xl border border-earth-200 bg-white p-5 hover:shadow-md hover:border-brand-300 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{theme.icon}</span>
              </div>
              <h3 className="font-semibold text-earth-900 mb-1">{theme.name}</h3>
              <p className="text-xs text-earth-500">{theme.category}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-earth-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
            <div>
              <span className="eyebrow text-ouro-700">Realidade brasileira contemporânea</span>
              <h2 className="text-2xl font-bold text-earth-900 mt-1">Temas emergentes</h2>
              <p className="text-sm text-earth-500 mt-1">Determinantes sociais em evidência.</p>
            </div>
            <Link to="/saude#socioeconomica-contemporanea" className="text-brand-600 font-medium hover:underline">Ver biblioteca completa →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergentThemes.map((theme) => (
              <Link
                key={theme.id}
                to={`/saude/${theme.categoryId}/${theme.id}`}
                className="rounded-xl border border-earth-200 bg-white p-5 hover:shadow-md hover:border-ouro-300 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ThemeIcon id={theme.id} size={28} />
                </div>
                <h3 className="font-semibold text-earth-900 mb-1">{theme.name}</h3>
                <p className="text-xs text-earth-500">{theme.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-earth-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Parceiros e Governança</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {[...partners.financiamento, ...partners.institucional, ...partners.execucao, ...partners.academico, ...partners.comunitario].map((p) => {
              const logo = (p as { logo?: string }).logo;
              return (
                <div key={p.name} className="rounded-lg bg-earth-800 p-4">
                  {logo && (
                    <img src={logo} alt={`Logotipo ${p.name}`} className="h-8 w-auto mb-3 bg-white rounded p-1 object-contain" loading="lazy" />
                  )}
                  <div className="font-bold text-brand-300">{p.name}</div>
                  <div className="text-earth-300 text-xs mb-1">{p.full}</div>
                  <div className="text-earth-400 text-xs">{p.role}</div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/transparencia" className="text-brand-300 hover:underline font-medium">
              Ver política completa de transparência e governança →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Semântica de cor por tipo de estatística: critical (barro — risco/alerta),
// progress (folha — indicador de avanço/mapeamento), goal (ouro — meta/entrega
// do App), info (folha-soft — dado de contexto/infraestrutura).
const statTypeClasses: Record<string, string> = {
  critical: 'text-barro-500',
  progress: 'text-folha-700',
  goal: 'text-ouro-700',
  info: 'text-folha-300',
};

function Stat({
  value,
  label,
  type = 'progress',
}: {
  value: string;
  label: string;
  type?: 'critical' | 'progress' | 'goal' | 'info';
}) {
  return (
    <div>
      <div className={`text-3xl font-bold ${statTypeClasses[type]}`}>{value}</div>
      <div className="text-sm text-earth-500 mt-1">{label}</div>
    </div>
  );
}

// ============================================================================
// PP1 / PP2 — Home "Pulso Preto", reconstrução integral fiel aos mockups de
// referência (texto, estrutura, cartões, imagens) — ver shared/data/
// variantContent.ts para o conteúdo completo. Seções institucionais da Home
// GP0 (serviços-duro, fitoterapia, rodas de conversa, grids de temas,
// parceiros) não aparecem aqui porque não existem nos mockups de referência;
// permanecem acessíveis via nav/rodapé (Sobre, Dados e Indicadores, Temas de
// Saúde) para não perder conteúdo institucional.
// ============================================================================

function PulsoHome({ content }: { content: PulsoVariantContent }) {
  // Tipografia oficial "Pulso Preto": Sans Serif Collection como fonte-base de
  // corpo (herdada por toda a subárvore), com Hurme Geometric Sans 3 aplicada
  // pontualmente em títulos/display via font-pulso-display (ver notas acima).
  return (
    <div className="bg-pulso-creme font-pulso-body">
      <PulsoHero content={content} />
      <PulsoFeatures content={content} />
      <PulsoThemes content={content} />
      <PulsoStats content={content} />
      <PulsoMission content={content} />
      {content.seminar && <PulsoSeminar content={content} />}
      {content.news && <PulsoNews content={content} />}
    </div>
  );
}

function PulsoHero({ content }: { content: PulsoVariantContent }) {
  const { variantId, variant } = useAppearance();
  const image = variant.hero.image;
  const h = content.hero;
  return (
    <section className="relative overflow-hidden bg-pulso-verde text-pulso-creme">
      {/* Elemento Círculo Dourado oficial (ELEMENTOS/CIRCULO) — marca d'água decorativa,
          mesma função do ContasRing na Home GP0. */}
      <img
        src="/static/brand/elementos/circulo-dourado.png"
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
              <span key={i} className="block">
                {h.headlineHighlight && line.includes(h.headlineHighlight.replace('.', ''))
                  ? (
                    <>
                      {line.replace(h.headlineHighlight, '')}
                      <span className="text-pulso-dourado">{h.headlineHighlight}</span>
                    </>
                  )
                  : line}
              </span>
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
          {image && (
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
              <img src={image.url} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
              <span className="absolute bottom-2 left-2 rounded bg-black/55 text-white text-[10px] px-2 py-1">
                Imagem placeholder (CC) — foto própria em breve
              </span>
            </div>
          )}
          {h.wordList && (
            <ul className="flex flex-wrap justify-end gap-1.5 mt-3">
              {h.wordList.map((w) => (
                <li key={w} className="text-[10px] font-bold uppercase tracking-wider text-pulso-creme bg-pulso-marrom/70 px-2 py-1 rounded">
                  {w}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Marca d'água decorativa — evita área totalmente vazia em telas largas */}
      <span className="sr-only">Variante ativa: {variantId}</span>
    </section>
  );
}

function PulsoFeatures({ content }: { content: PulsoVariantContent }) {
  const cols = content.features.length === 5 ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4';
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

function PulsoThemes({ content }: { content: PulsoVariantContent }) {
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

function PulsoStats({ content }: { content: PulsoVariantContent }) {
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

function PulsoMission({ content }: { content: PulsoVariantContent }) {
  const { variantId } = useAppearance();
  const m = content.mission;

  if (variantId === 'pp1') {
    // PP1 — layout dividido: foto (mulher) à esquerda, cartão creme à direita
    // com eyebrow/heading/paragraph/CTA + lista vertical de palavras + cursiva.
    return (
      <section className="bg-pulso-verde">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img src={m.photo.url} alt={m.photo.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <span className="absolute bottom-2 right-2 rounded bg-black/55 text-white text-[10px] px-2 py-1">
              Imagem placeholder (CC) — foto própria em breve
            </span>
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
            {/* Elemento Pulso oficial (ELEMENTOS/PULSO) — linha de batimento, assinatura
                visual "Pulso Preto" aplicada junto à citação cursiva. */}
            <img
              src="/static/brand/elementos/pulso-dourado.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-auto opacity-80"
            />
          </div>
        </div>
      </section>
    );
  }

  // PP2 — faixa única terracota, foto recortada (mãe+filho) sobreposta,
  // cursiva à esquerda + paragraph/CTA ao centro + lista vertical à direita.
  return (
    <section className="relative bg-pulso-terracota text-pulso-creme overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-[1fr_1.2fr_auto] gap-8 items-center relative">
        <div>
          <p className="font-pulso-display italic text-2xl sm:text-3xl leading-snug mb-3">
            {m.cursive.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
          <img
            src="/static/brand/elementos/pulso-branco.png"
            alt=""
            aria-hidden="true"
            className="h-5 w-auto opacity-80"
          />
        </div>
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-[4/3] order-first lg:order-none">
          <img src={m.photo.url} alt={m.photo.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <span className="absolute bottom-2 right-2 rounded bg-black/55 text-white text-[10px] px-2 py-1">
            Imagem placeholder (CC) — foto própria em breve
          </span>
        </div>
        <div className="lg:text-right">
          <p className="text-sm text-pulso-creme/90 mb-4 max-w-xs lg:ml-auto">{m.paragraph}</p>
          <Link
            to={m.ctaTo}
            className="inline-block rounded-md bg-pulso-creme text-pulso-terracota px-5 py-3 font-bold text-sm uppercase tracking-wide hover:bg-pulso-verde hover:text-pulso-creme transition-colors mb-6"
          >
            {m.ctaLabel}
          </Link>
          <ul className="space-y-1 lg:text-right">
            {m.wordList.map((w) => (
              <li key={w} className="text-xs font-bold uppercase tracking-wider text-pulso-creme/80">{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PulsoSeminar({ content }: { content: PulsoVariantContent }) {
  const s = content.seminar!;
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

function PulsoNews({ content }: { content: PulsoVariantContent }) {
  const n = content.news!;
  return (
    <section id="noticias" className="bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota">{n.eyebrow}</span>
          <Link to="/sobre" className="text-pulso-verde text-sm font-bold hover:underline">{n.viewAllLabel}</Link>
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
