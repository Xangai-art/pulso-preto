import { Link } from 'react-router-dom';
import { localStudyMeta, localStudyHighlights, localStudyThemes } from '../data/localStudy';
import { PalhaLine, LeafMark } from './Ornaments';
import { PULSO_PALETTE } from '@shared/data/pulsoPalette';

// Cores dos números sobre o fundo verde-escuro (#06201B), com contraste legível:
// desigualdade = dourado claro, avanço = verde de destaque, contexto = creme.
const highlightTypeClasses: Record<string, string> = {
  critical: 'text-pulso-dourado-claro',
  progress: 'text-pulso-verde-accent',
  goal: 'text-pulso-creme',
  info: 'text-pulso-creme',
};

// Análise de dados do Distrito Federal — exibida em /dados-e-indicadores.
// Texto para leitura leiga (áudios de 10/10/2026): é uma ANÁLISE DE DADOS JÁ
// EXISTENTES, não pesquisa nem estudo novo. Sem downloads (retirados em 20/10/2026).
export default function LocalStudyFeature() {
  return (
    <section
      id="estudo-df"
      className="rounded-2xl border-2 border-pulso-dourado-claro bg-pulso-verde text-pulso-creme overflow-hidden relative scroll-mt-24"
    >
      <div
        className="h-[3px] w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${PULSO_PALETTE.dourado} 0 12px, transparent 12px 20px)`,
        }}
      />
      <div className="p-6 sm:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <LeafMark size={20} color={PULSO_PALETTE.dourado} />
            <span className="eyebrow text-pulso-dourado-claro">Análise de dados · Distrito Federal</span>
          </div>
          <h2 className="font-editorial italic text-2xl sm:text-3xl leading-snug mb-3">{localStudyMeta.question}</h2>
          <p className="text-sm sm:text-base text-pulso-creme max-w-3xl">{localStudyMeta.intro}</p>
        </div>

        <div className="mb-2">
          <PalhaLine width={64} />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-pulso-dourado-claro mb-4">O que os dados mostram</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {localStudyHighlights.map((h) => (
            <div key={h.label} className="border-t border-pulso-dourado/50 pt-3">
              <div className={`text-3xl font-bold ${highlightTypeClasses[h.type]}`}>{h.value}</div>
              <div className="text-base text-pulso-creme font-semibold mt-1 mb-1.5">{h.label}</div>
              <p className="text-sm text-pulso-creme/90 leading-relaxed mb-1.5">{h.detail}</p>
              <p className="text-[11px] text-pulso-creme/70">Fonte: {h.source}</p>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-bold uppercase tracking-wide text-pulso-dourado-claro mb-3">O que analisamos</h3>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-10">
          {localStudyThemes.map((t) => (
            <li key={t} className="flex gap-2 text-sm text-pulso-creme">
              <span className="text-pulso-dourado-claro" aria-hidden="true">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        {/* Quem faz — sem "pesquisadora responsável" (não é pesquisa em curso). */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-xs">
          <MetaItem label="Coordenação técnica" value={localStudyMeta.technicalCoordination} />
          <MetaItem label="Realização" value={localStudyMeta.executingInstitution} />
          <MetaItem label="Apoio" value={localStudyMeta.funder} />
          <MetaItem label="Parceiros científicos" value={localStudyMeta.scientificPartners.join(' · ')} />
        </div>

        <p className="text-sm text-pulso-creme/90 max-w-3xl border-t border-pulso-creme/15 pt-5">
          Esta é uma análise de dados públicos que já existem. A pesquisa de campo, com escuta direta da
          comunidade, é uma etapa futura do projeto. Saiba como usamos os dados em{' '}
          <Link to="/transparencia" className="underline hover:text-pulso-dourado-claro">Transparência</Link>.
        </p>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-pulso-dourado-claro font-semibold mb-0.5">{label}</div>
      <div className="text-pulso-creme">{value}</div>
    </div>
  );
}
