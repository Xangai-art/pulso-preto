import { Link } from 'react-router-dom';
import { LeafMark, PalhaLine } from '../components/Ornaments';
import { PULSO_PALETTE } from '@shared/data/pulsoPalette';
import {
  medicinalPlants,
  preparationMethodsGlossary,
  traditionalMedicinePage as page,
  referenceBook,
} from '../data/traditionalMedicine';

export default function TraditionalMedicine() {
  return (
    <div>
      {/* Hero — mesmo padrão visual da seção "Folhas com Ciência" na Home */}
      <section className="bg-pulso-verde text-pulso-creme relative">
        <div
          className="h-[3px] w-full"
          style={{
            backgroundImage:
              `repeating-linear-gradient(90deg, ${PULSO_PALETTE.dourado} 0 12px, transparent 12px 20px)`,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <LeafMark size={22} color={PULSO_PALETTE.dourado} />
            <span className="eyebrow text-pulso-dourado-claro">{page.eyebrow}</span>
          </div>
          <h1 className="font-editorial italic text-3xl sm:text-4xl mb-4">{page.title}</h1>
          <p className="text-pulso-creme/90 text-lg max-w-2xl mb-6">{page.subtitle}</p>
          <Link
            to="/#folhas-com-ciencia"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pulso-dourado-claro hover:text-pulso-dourado/15"
          >
            ← Voltar para "Folhas com Ciência" na Home
          </Link>
        </div>
      </section>

      {/* Introdução editorial */}
      <section className="bg-pulso-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 prose-project">
          {page.intro.map((paragraph, i) => (
            <p
              key={i}
              className={`text-pulso-marrom mb-4 ${i === 0 ? 'text-lg font-editorial italic text-pulso-verde' : ''}`}
            >
              {paragraph}
            </p>
          ))}
          <div className="flex items-center gap-3 mt-6 mb-2">
            <PalhaLine width={48} />
            <span className="text-xs text-pulso-marrom/70">
              Conteúdo baseado em <strong>Saberes, Ciências e Plantas Medicinais</strong> (Fiocruz/Farmanguinhos) —
              livro completo disponível para download na seção{' '}
              <a href="#livros" className="text-pulso-verde-accent hover:underline">
                Livros
              </a>
              , mais abaixo.
            </span>
          </div>
        </div>
      </section>

      {/* As plantas */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-pulso-verde mb-2">As plantas de "Folhas com Ciência"</h2>
          <p className="text-pulso-marrom/70 mb-10 max-w-2xl">
            Três plantas populares brasileiras, com história, uso tradicional e o que a ciência já confirma — ou
            ainda precisa confirmar.
          </p>
          <div className="space-y-16">
            {medicinalPlants.map((plant) => (
              <article key={plant.id} id={plant.id} className="scroll-mt-24 border-t-2 border-pulso-marrom/40 pt-8">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="font-editorial italic text-2xl text-pulso-verde">{plant.name}</h3>
                  <span className="text-sm italic text-pulso-marrom/70">{plant.scientificName}</span>
                  <span className="text-xs font-mono text-pulso-marrom/60 uppercase tracking-wide">{plant.family}</span>
                </div>
                <p className="text-xs text-pulso-marrom/70 mb-4">
                  Também conhecida como: {plant.popularNames.join(' · ')}
                </p>
                <p className="font-editorial italic text-lg text-pulso-marrom mb-6">{plant.heroNote}</p>
                <div className="space-y-6 mb-8">
                  {plant.sections.map((sec) => (
                    <div key={sec.heading}>
                      <h4 className="font-bold text-pulso-verde mb-2">{sec.heading}</h4>
                      {sec.body.map((p, i) => (
                        <p key={i} className="text-pulso-marrom text-sm leading-relaxed mb-3">
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-4">
                    <span className="eyebrow text-pulso-verde-medio block mb-1">Achado científico</span>
                    <p className="text-sm text-pulso-marrom">{plant.finding}</p>
                  </div>
                  <div className="rounded-xl border border-pulso-marrom/40 bg-pulso-marrom/10 p-4">
                    <span className="eyebrow text-pulso-marrom block mb-1">Atenção</span>
                    <p className="text-sm text-pulso-verde">{plant.caution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {plant.preparationMethods.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2.5 py-1 rounded-full bg-pulso-verde-medio/10 text-pulso-verde-medio border border-pulso-verde-accent/40"
                    >
                      {preparationMethodsGlossary[m]?.nome ?? m}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-pulso-marrom/70">
                  <span className="eyebrow text-pulso-marrom/60">Fontes</span>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    {plant.sources.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Da floresta ao SUS — seções editoriais + glossário de métodos de preparo */}
      <section className="bg-pulso-creme ornament-palha">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-pulso-verde mb-10">Da floresta ao SUS: o que o livro nos ensina</h2>
          <div className="space-y-12">
            {page.sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="scroll-mt-24">
                <span className="eyebrow text-pulso-dourado">{sec.eyebrow}</span>
                <h3 className="text-xl font-bold text-pulso-verde mt-1 mb-3">{sec.title}</h3>
                {sec.body.map((p, i) => (
                  <p key={i} className="text-pulso-marrom text-sm leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {sec.glossaryRef && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-5">
                    {Object.entries(preparationMethodsGlossary).map(([key, method]) => (
                      <div key={key} className="rounded-lg border border-pulso-dourado/25 bg-white p-4">
                        <h4 className="font-semibold text-pulso-verde text-sm mb-1">{method.nome}</h4>
                        <p className="text-xs text-pulso-marrom">{method.definicao}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Livros */}
      <section id="livros" className="bg-pulso-verde text-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <span className="eyebrow text-pulso-dourado-claro">Biblioteca de referência</span>
          <h2 className="font-editorial italic text-2xl sm:text-3xl mt-1 mb-8">Livros</h2>
          <div className="rounded-2xl border border-pulso-marrom bg-pulso-verde p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 w-24 h-32 rounded-lg bg-gradient-to-br from-pulso-dourado to-pulso-marrom flex items-center justify-center text-pulso-verde font-editorial italic text-xs text-center p-2 leading-tight">
              Saberes, Ciências e Plantas Medicinais
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{referenceBook.titulo}</h3>
              <p className="text-pulso-dourado/40 text-sm mb-1">
                {referenceBook.autoria} · {referenceBook.tamanho}
              </p>
              <p className="text-pulso-dourado/40 text-sm mb-4">{referenceBook.descricao}</p>
              <details className="mb-4 text-sm">
                <summary className="cursor-pointer text-pulso-dourado-claro font-medium">Ver os 16 capítulos</summary>
                <ol className="list-decimal pl-5 mt-2 space-y-0.5 text-pulso-dourado/40 text-xs">
                  {referenceBook.capitulos.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              </details>
              <a
                href={referenceBook.arquivo}
                download
                className="inline-flex items-center gap-2 rounded-md bg-pulso-dourado text-pulso-verde px-5 py-3 font-semibold hover:bg-pulso-dourado-claro transition-colors"
              >
                Baixar PDF completo <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <p className="text-xs text-pulso-marrom/60 mt-6 max-w-2xl">
            Publicação técnico-científica de acesso livre, usada como principal referência editorial desta página.
            O conteúdo é educativo — não substitui avaliação médica, farmacêutica ou nutricional individualizada.
          </p>
        </div>
      </section>

      {/* Rodapé de segurança + CTA */}
      <section className="bg-pulso-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-sm text-pulso-marrom mb-6">
            Conteúdo educativo, não substitui avaliação médica. Sempre informe seu médico ou farmacêutico sobre o
            uso de plantas medicinais, especialmente se estiver em tratamento com outros medicamentos.
          </p>
          <Link
            to="/saude"
            className="inline-block rounded-md border border-pulso-dourado/40 px-5 py-3 font-semibold text-pulso-verde hover:bg-white transition-colors"
          >
            Explorar Biblioteca de Saúde completa →
          </Link>
        </div>
      </section>
    </div>
  );
}
