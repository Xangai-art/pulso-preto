import { Link, useParams } from 'react-router-dom';
import { diseaseCategories } from '@shared/data/diseases';
import { getDeepContent } from '@shared/data/deepContentRegistry';
import CategoryIcon from '../components/CategoryIcons';
import AudienceContentTabs from '../components/AudienceContentTabs';
import { useAppearance } from '@shared/context/AppearanceContext';

export default function DiseaseDetail() {
  const { categoryId, diseaseId } = useParams();
  const { localeId } = useAppearance();
  const category = diseaseCategories.find((c) => c.id === categoryId);
  const disease = category?.diseases.find((d) => d.id === diseaseId);
  const deepContent = disease?.hasDeepContent ? getDeepContent(disease.id, localeId) : undefined;

  if (!category || !disease) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-pulso-verde mb-4">Condição não encontrada</h1>
        <Link to="/saude" className="text-pulso-verde-accent hover:underline">← Voltar para a Biblioteca de Saúde</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/saude" className="text-pulso-verde-accent hover:underline text-sm mb-6 inline-block">
        ← Voltar para {category.title}
      </Link>

      {deepContent && (
        <div className="relative w-full overflow-hidden rounded-2xl border border-pulso-dourado/25 mb-6 aspect-[16/7]">
          <img
            src={deepContent.heroImage.url}
            alt={deepContent.heroImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <CategoryIcon id={category.id} size={44} />
        <div>
          <p className="text-xs uppercase tracking-wide text-pulso-marrom/70 font-semibold">{category.title} · {category.subtitle}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-pulso-verde">{disease.name}</h1>
        </div>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {disease.isPriorityTheme && (
          <span className="text-xs uppercase font-bold text-white bg-pulso-verde px-2 py-1 rounded">Tema prioritário do App</span>
        )}
        {disease.isNew && (
          <span className="text-xs uppercase font-bold text-pulso-dourado bg-pulso-creme px-2 py-1 rounded">
            Realidade brasileira contemporânea
          </span>
        )}
        {disease.localStudy && (
          <span className="text-xs uppercase font-bold text-pulso-verde-medio bg-pulso-verde-medio/10 border border-pulso-verde-accent/40 px-2 py-1 rounded">
            Estudo local · Distrito Federal 2015–2024
          </span>
        )}
      </div>

      {disease.study ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-pulso-dourado/25 p-5">
            <h2 className="text-sm font-bold text-pulso-verde uppercase tracking-wide mb-2">O que a ciência mostra</h2>
            <p className="text-pulso-marrom text-sm">{disease.study}</p>
          </div>
          <div className="rounded-xl border border-pulso-verde-accent/25 bg-pulso-verde-accent/10 p-5">
            <h2 className="text-sm font-bold text-pulso-verde uppercase tracking-wide mb-2">Por que isso importa</h2>
            <p className="text-pulso-verde text-sm leading-relaxed">{disease.finding}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-pulso-dourado/25 p-5 bg-pulso-creme">
          <p className="text-pulso-marrom text-sm">
            Condição incluída na base científica do Guia da Saúde da População Negra. Em caso de dúvida,
            converse com a equipe da sua Unidade Básica de Saúde.
          </p>
        </div>
      )}

      {disease.localStudy && (
        <div className="mt-6 rounded-xl border-2 border-pulso-dourado-claro bg-pulso-verde text-pulso-creme p-5">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <h2 className="text-sm font-bold text-pulso-dourado-claro uppercase tracking-wide">Estudo local — Distrito Federal</h2>
            <span className="text-2xl font-bold text-pulso-dourado-claro">{disease.localStudy.value}</span>
          </div>
          <p className="text-sm leading-relaxed text-pulso-creme/95 mb-3">{disease.localStudy.finding}</p>
          <p className="text-[11px] text-pulso-creme/70">
            Fonte: {disease.localStudy.source}. Estudo Técnico-Científico "Condições de Vida e Saúde da
            População Negra do DF (2015–2024)" — AECID/APRECIA, com FIOCRUZ/UnB/FEPECS. Ver{' '}
            <Link to="/saude#estudo-df" className="underline hover:text-pulso-dourado-claro">estudo completo na Biblioteca de Saúde</Link>.
          </p>
        </div>
      )}

      {deepContent && <AudienceContentTabs content={deepContent} />}

      <div className="mt-10 rounded-xl border border-pulso-dourado/25 p-5 bg-white text-sm text-pulso-marrom/70">
        <strong>Nota:</strong> em caso de sintomas, procure uma Unidade Básica de Saúde (UBS) — consulte a{' '}
        <Link to="/rede-sus" className="text-pulso-verde-accent hover:underline">Rede do Sistema Único de Saúde (Rede SUS)</Link>.
      </div>
    </div>
  );
}
