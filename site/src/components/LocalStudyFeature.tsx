import { Link } from 'react-router-dom';
import { localStudyMeta, localStudyHighlights, localStudyAxes } from '../data/localStudy';
import { PalhaLine, LeafMark } from './Ornaments';
import { PULSO_PALETTE } from '@shared/data/pulsoPalette';

// Cores dos números sobre o fundo verde-escuro (#06201B). Revisadas em 20/10/2026
// para contraste legível (antes barro/40 e folha/40 quase sumiam):
// disparidade = dourado claro (o achado mais importante salta aos olhos),
// avanço = verde de destaque, meta/marco e contexto = creme.
const highlightTypeClasses: Record<string, string> = {
  critical: 'text-pulso-dourado-claro',
  progress: 'text-pulso-verde-accent',
  goal: 'text-pulso-creme',
  info: 'text-pulso-creme',
};

const axisStatusLabel: Record<string, string> = {
  pronto: 'Pronto',
  parcial: 'Parcial',
  pendente: 'Pendente',
};

const axisStatusClasses: Record<string, string> = {
  pronto: 'text-pulso-verde bg-pulso-verde-accent border-pulso-verde-accent font-semibold',
  parcial: 'text-pulso-verde bg-pulso-dourado-claro border-pulso-dourado-claro font-semibold',
  pendente: 'text-pulso-creme bg-transparent border-pulso-creme/60',
};

// Bloco de destaque para o estudo epidemiológico local (DF) contratado, exibido
// na página Dados e Indicadores (/dados-e-indicadores — desde 20/10/2026; antes
// ficava na Biblioteca de Saúde). Não substitui a curadoria internacional/nacional
// já usada em diseases.ts — complementa com evidência local estratificada por
// raça/cor, produzida por AECID/APRECIA em parceria científica com FIOCRUZ/UnB/FEPECS.
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
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LeafMark size={20} color={PULSO_PALETTE.dourado} />
              <span className="eyebrow text-pulso-dourado-claro">Estudo em destaque · Evidência local do Distrito Federal</span>
            </div>
            <h2 className="font-editorial italic text-2xl sm:text-3xl leading-snug mb-2">
              {localStudyMeta.title}
            </h2>
            <p className="text-sm text-pulso-creme max-w-2xl">
              Período {localStudyMeta.period} · {localStudyMeta.phaseLabel}. Primeiro estudo epidemiológico local
              que estratifica sistematicamente indicadores de saúde por raça/cor no Distrito Federal.
            </p>
          </div>
          <span className="shrink-0 text-[10px] uppercase font-bold text-pulso-verde bg-pulso-dourado-claro px-2.5 py-1 rounded">
            Fase 1 · dados preliminares
          </span>
        </div>

        {/* Metadados de proveniência — credibilidade via identificação pública */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-xs">
          <MetaItem label="Pesquisadora responsável" value={localStudyMeta.researcher} />
          <MetaItem label="Instituição executora" value={localStudyMeta.executingInstitution} />
          <MetaItem label="Financiador" value={localStudyMeta.funder} />
          <MetaItem label="Parceiros científicos" value={localStudyMeta.scientificPartners.join(' · ')} />
        </div>

        <div className="mb-2">
          <PalhaLine width={64} />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-pulso-dourado-claro mb-4">Principais achados</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {localStudyHighlights.map((h) => (
            <div key={h.label} className="border-t border-pulso-dourado/50 pt-3">
              <div className={`text-2xl font-bold ${highlightTypeClasses[h.type]}`}>{h.value}</div>
              <div className="text-sm text-pulso-creme mt-0.5 mb-1.5">{h.label}</div>
              <p className="text-[11px] text-pulso-creme/85 leading-relaxed">{h.detail}</p>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-bold uppercase tracking-wide text-pulso-dourado-claro mb-3">
          Status dos 8 eixos de análise
        </h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {localStudyAxes.map((a) => (
            <span
              key={a.id}
              className={`text-xs border rounded-full px-3 py-1 ${axisStatusClasses[a.status]}`}
            >
              {a.id}. {a.title} — {axisStatusLabel[a.status]}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={localStudyMeta.downloadDocx}
            className="rounded-md bg-pulso-dourado text-pulso-verde px-4 py-2.5 text-sm font-semibold hover:bg-pulso-dourado-claro"
          >
            Baixar estudo completo (.docx) →
          </a>
          <a
            href={localStudyMeta.downloadXlsx}
            className="rounded-md border border-pulso-dourado-claro text-pulso-dourado-claro px-4 py-2.5 text-sm font-semibold hover:bg-pulso-dourado/10"
          >
            Baixar planilha mestre (.xlsx) →
          </a>
        </div>
        <p className="text-xs text-pulso-creme/85 mt-4 max-w-2xl">
          Dados de Fase 1: estruturação metodológica completa, coleta secundária em andamento, cálculos
          epidemiológicos parciais. Consulte a nota de cautela editorial e a política de métricas em{' '}
          <Link to="/transparencia" className="underline hover:text-pulso-dourado-claro">Transparência</Link>.
        </p>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-pulso-dourado-claro font-semibold mb-0.5">{label}</div>
      <div className="text-pulso-creme/90">{value}</div>
    </div>
  );
}
