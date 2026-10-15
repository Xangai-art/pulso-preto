import { Link } from 'react-router-dom';
import { LeafMark, PalhaLine } from '../components/Ornaments';
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
      <section className="bg-folha-900 text-palha-100 relative">
        <div
          className="h-[3px] w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #c9a04b 0 12px, transparent 12px 20px)',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-3">
            <LeafMark size={22} color="#c9a04b" />
            <span className="eyebrow text-ouro-300">{page.eyebrow}</span>
          </div>
          <h1 className="font-editorial italic text-3xl sm:text-4xl mb-4">{page.title}</h1>
          <p className="text-folha-100/90 text-lg max-w-2xl mb-6">{page.subtitle}</p>
          <Link
            to="/#folhas-com-ciencia"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ouro-300 hover:text-ouro-100"
          >
            ← Voltar para "Folhas com Ciência" na Home
          </Link>
        </div>
      </section>

      {/* Introdução editorial */}
      <section className="bg-palha-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 prose-project">
          {page.intro.map((paragraph, i) => (
            <p
              key={i}
              className={`text-earth-700 mb-4 ${i === 0 ? 'text-lg font-editorial italic text-earth-900' : ''}`}
            >
              {paragraph}
            </p>
          ))}
          <div className="flex items-center gap-3 mt-6 mb-2">
            <PalhaLine width={48} />
            <span className="text-xs text-earth-500">
              Conteúdo baseado em <strong>Saberes, Ciências e Plantas Medicinais</strong> (Fiocruz/Farmanguinhos) —
              livro completo disponível para download na seção{' '}
              <a href="#livros" className="text-brand-600 hover:underline">
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
          <h2 className="text-2xl font-bold text-earth-900 mb-2">As plantas de "Folhas com Ciência"</h2>
          <p className="text-earth-500 mb-10 max-w-2xl">
            Três plantas populares brasileiras, com história, uso tradicional e o que a ciência já confirma — ou
            ainda precisa confirmar.
          </p>
          <div className="space-y-16">
            {medicinalPlants.map((plant) => (
              <article key={plant.id} id={plant.id} className="scroll-mt-24 border-t-2 border-brasa-300 pt-8">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <h3 className="font-editorial italic text-2xl text-earth-900">{plant.name}</h3>
                  <span className="text-sm italic text-earth-500">{plant.scientificName}</span>
                  <span className="text-xs font-mono text-earth-400 uppercase tracking-wide">{plant.family}</span>
                </div>
                <p className="text-xs text-earth-500 mb-4">
                  Também conhecida como: {plant.popularNames.join(' · ')}
                </p>
                <p className="font-editorial italic text-lg text-brasa-700 mb-6">{plant.heroNote}</p>
                <div className="space-y-6 mb-8">
                  {plant.sections.map((sec) => (
                    <div key={sec.heading}>
                      <h4 className="font-bold text-earth-900 mb-2">{sec.heading}</h4>
                      {sec.body.map((p, i) => (
                        <p key={i} className="text-earth-700 text-sm leading-relaxed mb-3">
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl border border-earth-200 bg-earth-50 p-4">
                    <span className="eyebrow text-folha-700 block mb-1">Achado científico</span>
                    <p className="text-sm text-earth-700">{plant.finding}</p>
                  </div>
                  <div className="rounded-xl border border-barro-300 bg-barro-100/60 p-4">
                    <span className="eyebrow text-barro-700 block mb-1">Atenção</span>
                    <p className="text-sm text-earth-800">{plant.caution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {plant.preparationMethods.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2.5 py-1 rounded-full bg-folha-50 text-folha-700 border border-folha-300"
                    >
                      {preparationMethodsGlossary[m]?.nome ?? m}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-earth-500">
                  <span className="eyebrow text-earth-400">Fontes</span>
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
      <section className="bg-palha-50 ornament-palha">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-earth-900 mb-10">Da floresta ao SUS: o que o livro nos ensina</h2>
          <div className="space-y-12">
            {page.sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="scroll-mt-24">
                <span className="eyebrow text-ouro-700">{sec.eyebrow}</span>
                <h3 className="text-xl font-bold text-earth-900 mt-1 mb-3">{sec.title}</h3>
                {sec.body.map((p, i) => (
                  <p key={i} className="text-earth-700 text-sm leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {sec.glossaryRef && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-5">
                    {Object.entries(preparationMethodsGlossary).map(([key, method]) => (
                      <div key={key} className="rounded-lg border border-earth-200 bg-white p-4">
                        <h4 className="font-semibold text-earth-900 text-sm mb-1">{method.nome}</h4>
                        <p className="text-xs text-earth-600">{method.definicao}</p>
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
      <section id="livros" className="bg-earth-900 text-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <span className="eyebrow text-ouro-300">Biblioteca de referência</span>
          <h2 className="font-editorial italic text-2xl sm:text-3xl mt-1 mb-8">Livros</h2>
          <div className="rounded-2xl border border-earth-700 bg-earth-800 p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 w-24 h-32 rounded-lg bg-gradient-to-br from-ouro-500 to-brasa-700 flex items-center justify-center text-earth-900 font-editorial italic text-xs text-center p-2 leading-tight">
              Saberes, Ciências e Plantas Medicinais
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{referenceBook.titulo}</h3>
              <p className="text-earth-300 text-sm mb-1">
                {referenceBook.autoria} · {referenceBook.tamanho}
              </p>
              <p className="text-earth-300 text-sm mb-4">{referenceBook.descricao}</p>
              <details className="mb-4 text-sm">
                <summary className="cursor-pointer text-ouro-300 font-medium">Ver os 16 capítulos</summary>
                <ol className="list-decimal pl-5 mt-2 space-y-0.5 text-earth-300 text-xs">
                  {referenceBook.capitulos.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              </details>
              <a
                href={referenceBook.arquivo}
                download
                className="inline-flex items-center gap-2 rounded-md bg-ouro-500 text-earth-900 px-5 py-3 font-semibold hover:bg-ouro-300 transition-colors"
              >
                Baixar PDF completo <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <p className="text-xs text-earth-400 mt-6 max-w-2xl">
            Publicação técnico-científica de acesso livre, usada como principal referência editorial desta página.
            O conteúdo é educativo — não substitui avaliação médica, farmacêutica ou nutricional individualizada.
          </p>
        </div>
      </section>

      {/* Rodapé de segurança + CTA */}
      <section className="bg-palha-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-sm text-earth-600 mb-6">
            Conteúdo educativo, não substitui avaliação médica. Sempre informe seu médico ou farmacêutico sobre o
            uso de plantas medicinais, especialmente se estiver em tratamento com outros medicamentos.
          </p>
          <Link
            to="/saude"
            className="inline-block rounded-md border border-earth-300 px-5 py-3 font-semibold text-earth-800 hover:bg-white transition-colors"
          >
            Explorar Biblioteca de Saúde completa →
          </Link>
        </div>
      </section>
    </div>
  );
}
