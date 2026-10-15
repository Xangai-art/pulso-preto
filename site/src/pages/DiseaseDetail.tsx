import { Link, useParams } from 'react-router-dom';
import { diseaseCategories } from '../data/diseases';
import { getDeepContent } from '../data/deepContentRegistry';
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
        <h1 className="text-2xl font-bold text-earth-900 mb-4">Condição não encontrada</h1>
        <Link to="/saude" className="text-brand-600 hover:underline">← Voltar para a Biblioteca de Saúde</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link to="/saude" className="text-brand-600 hover:underline text-sm mb-6 inline-block">
        ← Voltar para {category.title}
      </Link>

      {deepContent && (
        <div className="relative w-full overflow-hidden rounded-2xl border border-earth-200 mb-6 aspect-[16/7]">
          <img
            src={deepContent.heroImage.url}
            alt={deepContent.heroImage.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <span className="absolute bottom-2 right-2 rounded bg-black/55 text-white text-[10px] px-2 py-1">
            Imagem placeholder (CC) — {deepContent.heroImage.credit}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <CategoryIcon id={category.id} size={44} />
        <div>
          <p className="text-xs uppercase tracking-wide text-earth-500 font-semibold">{category.title} · {category.subtitle}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-earth-900">{disease.name}</h1>
        </div>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {disease.isPriorityTheme && (
          <span className="text-xs uppercase font-bold text-white bg-brand-600 px-2 py-1 rounded">Tema prioritário do App</span>
        )}
        {disease.isNew && (
          <span className="text-xs uppercase font-bold text-ouro-700 bg-palha-100 px-2 py-1 rounded">
            Realidade brasileira contemporânea
          </span>
        )}
        {disease.localStudy && (
          <span className="text-xs uppercase font-bold text-folha-700 bg-folha-50 border border-folha-300 px-2 py-1 rounded">
            Estudo local · DF 2015–2024
          </span>
        )}
      </div>

      {disease.study ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-earth-200 p-5">
            <h2 className="text-sm font-bold text-earth-900 uppercase tracking-wide mb-2">Estudo</h2>
            <p className="text-earth-700 text-sm">{disease.study}</p>
          </div>
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
            <h2 className="text-sm font-bold text-brand-800 uppercase tracking-wide mb-2">Achado</h2>
            <p className="text-earth-800 text-sm leading-relaxed">{disease.finding}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-earth-200 p-5 bg-earth-50">
          <p className="text-earth-600 text-sm">
            Condição incluída na base científica geral (Guia da Saúde da População Negra). Evidência detalhada
            "Estudo + Achado" em processo de padronização para esta condição.
          </p>
        </div>
      )}

      {disease.localStudy && (
        <div className="mt-6 rounded-xl border-2 border-ouro-300 bg-folha-900 text-palha-100 p-5">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <h2 className="text-sm font-bold text-ouro-300 uppercase tracking-wide">Estudo local — Distrito Federal</h2>
            <span className="text-2xl font-bold text-ouro-300">{disease.localStudy.value}</span>
          </div>
          <p className="text-sm leading-relaxed text-palha-100/95 mb-3">{disease.localStudy.finding}</p>
          <p className="text-[11px] text-folha-100/70">
            Fonte: {disease.localStudy.source}. Estudo Técnico-Científico "Condições de Vida e Saúde da
            População Negra do DF (2015–2024)" — AECID/APRECIA, com FIOCRUZ/UnB/FEPECS. Ver{' '}
            <Link to="/saude#estudo-df" className="underline hover:text-ouro-300">estudo completo na Biblioteca de Saúde</Link>.
          </p>
        </div>
      )}

      {deepContent && <AudienceContentTabs content={deepContent} />}

      <div className="mt-10 rounded-xl border border-earth-200 p-5 bg-white text-sm text-earth-500">
        <strong>Nota:</strong> os dados descrevem tendências populacionais, não diagnósticos individuais. Em
        caso de sintomas, procure uma Unidade Básica de Saúde (UBS) — consulte a{' '}
        <Link to="/rede-sus" className="text-brand-600 hover:underline">Rede SUS</Link>.
      </div>
    </div>
  );
}
