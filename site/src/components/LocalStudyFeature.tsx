import { Link } from 'react-router-dom';
import PopulationNotice from '@shared/components/PopulationNotice';
import { localStudyMeta, localStudyHighlights } from '../data/localStudy';
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
          <PopulationNotice className="text-sm text-pulso-creme mt-3" />
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

        {/* Oito eixos despublicados até consolidação da análise e formalização do canal de dados.
            Restauração: branch backup/analise-nao-consolidada-b9a14a2,
            site/src/components/LocalStudyFeature.tsx; dados mantidos em site/src/data/localStudy.ts.
            Downloads, status e nota de Fase 1 anteriores: branch backup/analise-downloads-status-882ab0a,
            nos mesmos arquivos; DOCX/XLSX preservados em site/public/downloads/ nessa branch. */}

        <p className="text-sm text-pulso-creme/90 max-w-3xl border-t border-pulso-creme/15 pt-5">
          Análise de dados oficiais já publicados (Secretaria de Saúde do DF, DATASUS e bases públicas). A pesquisa de campo, com escuta direta da
          comunidade, é uma etapa futura do projeto. Saiba como usamos os dados em{' '}
          <Link to="/transparencia" className="underline hover:text-pulso-dourado-claro">Transparência</Link>.
        </p>
      </div>
    </section>
  );
}
