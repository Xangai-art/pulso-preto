import { useParams, Link, Navigate } from 'react-router-dom';
import { diseaseCategories, resolveDiseasePath } from '@shared/data/diseases';
import TopBar from '../components/TopBar';
import { getDeepContent } from '@shared/data/deepContentRegistry';
import AudienceContentTabs from '../components/AudienceContentTabs';
import { useAppearance } from '@shared/context/AppearanceContext';

// Tema único de produção: Pulso Preto (PP3). Tokens `pulso-*` diretos.
export default function DiseaseDetail() {
  const { categoryId, diseaseId } = useParams();
  const { localeId } = useAppearance();
  const category = diseaseCategories.find((c) => c.id === categoryId);
  const disease = category?.diseases.find((d) => d.id === diseaseId);
  const deepContent = disease?.hasDeepContent ? getDeepContent(disease.id, localeId) : undefined;

  if (!category || !disease) {
    // Endereço antigo (categoria/condição reclassificada) → redireciona para o atual.
    const current = resolveDiseasePath(diseaseId);
    if (current) return <Navigate to={current} replace />;
    return (
      <div className="min-h-screen bg-pulso-creme font-pulso-body">
        <TopBar title="Não encontrado" showBack />
        <div className="px-5 pt-10 text-center text-sm text-pulso-marrom/60">
          Condição não encontrada.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pulso-creme font-pulso-body">
      <TopBar title={disease.name} showBack />
      <div className="px-5 pt-4 pb-8">
        {deepContent && (
          <div className="relative w-full overflow-hidden rounded-xl border border-pulso-dourado/25 mb-4 aspect-[16/9]">
            <img
              src={deepContent.heroImage.url}
              alt={deepContent.heroImage.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="flex gap-2 mb-4">
          {disease.isPriorityTheme && (
            <span className="text-[10px] uppercase font-bold text-pulso-creme bg-pulso-verde px-2 py-1 rounded">
              Tema prioritário
            </span>
          )}
          {disease.isNew && (
            <span className="text-[10px] uppercase font-bold text-pulso-marrom bg-pulso-dourado/20 px-2 py-1 rounded">
              Atual
            </span>
          )}
        </div>

        {disease.study ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-pulso-dourado/25 p-4">
              <h2 className="text-xs font-bold uppercase mb-1.5 text-pulso-verde font-pulso-display">
                O que a ciência mostra
              </h2>
              <p className="text-sm text-pulso-marrom/85">{disease.study}</p>
            </div>
            <div className="rounded-xl border border-pulso-dourado/30 bg-pulso-dourado/10 p-4">
              <h2 className="text-xs font-bold uppercase mb-1.5 text-pulso-terracota font-pulso-display">
                Por que isso importa
              </h2>
              <p className="text-sm leading-relaxed text-pulso-marrom/90">{disease.finding}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-pulso-dourado/25 p-4 bg-white text-sm text-pulso-marrom/70">
            Condição incluída na base científica do Guia da Saúde da População Negra. Em caso de dúvida, converse com a equipe da sua Unidade Básica de Saúde.
          </div>
        )}

        {/* Dado local do DF — agora disponível no app pelo catálogo único (P16). */}
        {disease.localStudy && (
          <div className="mt-4 rounded-xl bg-pulso-verde text-pulso-creme p-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wide text-pulso-dourado-claro mb-1">
              Estudo local — Distrito Federal
            </h2>
            <div className="text-2xl font-bold text-pulso-dourado mb-1">{disease.localStudy.value}</div>
            <p className="text-sm leading-relaxed text-pulso-creme/95 mb-2">{disease.localStudy.finding}</p>
            <p className="text-[10px] text-pulso-creme/70">Fonte: {disease.localStudy.source}.</p>
          </div>
        )}

        {deepContent && <AudienceContentTabs content={deepContent} />}

        <div className="mt-6 rounded-xl border border-pulso-dourado/25 p-4 text-xs text-pulso-marrom/70">
          Em caso de sintomas, procure uma UBS.{' '}
          <Link to="/mapa" className="text-pulso-verde font-medium">
            Encontrar UBS mais próxima →
          </Link>
        </div>
      </div>
    </div>
  );
}
