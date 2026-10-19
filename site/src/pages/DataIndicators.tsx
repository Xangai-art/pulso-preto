import { Link } from 'react-router-dom';
import { useAppearance } from '@shared/context/AppearanceContext';
import { getPulsoContent } from '@shared/data/pulsoContent';
import { diseaseCategories } from '@shared/data/diseases';
import LocalStudyFeature from '../components/LocalStudyFeature';

// DADOS E INDICADORES (20/10/2026) — página dedicada, destino do atalho
// "Dados e Indicadores" e do botão "Ver indicadores" da Home.
// Fontes (nada escrito à mão aqui):
//   1. Números da Home → pulsoContent.stats.cards (mesma fonte da Home)
//   2. Análise de dados do Distrito Federal → LocalStudyFeature (veio da Biblioteca)
//   3. Achados locais por condição → diseases.ts (campo localStudy)
export default function DataIndicators() {
  const { localeId } = useAppearance();
  const stats = getPulsoContent(localeId).stats;

  const localFindings = diseaseCategories.flatMap((c) =>
    c.diseases.filter((d) => d.localStudy).map((d) => ({ ...d, categoryId: c.id, categoryTitle: c.title })),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-pulso-terracota block mb-2">{stats.eyebrow}</span>
        <h1 className="text-3xl font-bold text-pulso-verde mb-3">Dados e Indicadores</h1>
        <p className="text-pulso-marrom">{stats.paragraph}</p>
      </div>

      {/* 1. Panorama — os mesmos números da Home */}
      <section aria-labelledby="panorama" className="mb-14">
        <h2 id="panorama" className="text-xl font-bold text-pulso-verde mb-4">Panorama</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.cards.map((c, i) => (
            <div key={i} className="rounded-xl bg-white border border-pulso-dourado/20 p-5">
              <div className="text-3xl font-bold text-pulso-terracota mb-2">{c.value}</div>
              <p className="text-sm text-pulso-marrom leading-snug mb-2">{c.label.join(' ')}</p>
              <p className="text-[11px] text-pulso-marrom/80 uppercase tracking-wide">{c.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Análise de dados · Distrito Federal (texto leigo — áudios de 10/10/2026) */}
      <div className="mb-14">
        <LocalStudyFeature />
      </div>

      {/* 3. Achados locais por condição */}
      {localFindings.length > 0 && (
        <section aria-labelledby="por-condicao" className="mb-14">
          <h2 id="por-condicao" className="text-xl font-bold text-pulso-verde mb-1">Achados do Distrito Federal por condição de saúde</h2>
          <p className="text-sm text-pulso-marrom/80 mb-5">
            Condições da Biblioteca de Saúde que já têm dado do Distrito Federal. Clique para ver a condição completa.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {localFindings.map((d) => (
              <Link
                key={d.id}
                to={`/saude/${d.categoryId}/${d.id}`}
                className="group rounded-xl border border-pulso-dourado/25 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-pulso-marrom/80">{d.categoryTitle}</span>
                    <h3 className="font-semibold text-pulso-verde">{d.name}</h3>
                  </div>
                  <span className="text-2xl font-bold text-pulso-terracota shrink-0">{d.localStudy!.value}</span>
                </div>
                <p className="text-sm text-pulso-marrom leading-relaxed mb-2">{d.localStudy!.finding}</p>
                <p className="text-xs text-pulso-marrom/80">Fonte: {d.localStudy!.source}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. Como usamos os dados */}
      <section className="rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-6">
        <h2 className="font-bold text-pulso-verde mb-2">Como usamos os dados</h2>
        <p className="text-sm text-pulso-marrom mb-3">
          Os indicadores mostram como a saúde da população negra se comporta no conjunto — servem para orientar
          políticas e serviços, não para avaliar uma pessoa em particular. A política de métricas, a proteção de
          dados e a governança do projeto estão descritas em Transparência.
        </p>
        <Link to="/transparencia" className="text-pulso-verde-accent hover:underline font-medium text-sm">
          Ir para Transparência e governança →
        </Link>
      </section>
    </div>
  );
}
