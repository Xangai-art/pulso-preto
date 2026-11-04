import { useHealthText } from '../lib/healthI18n';
import { createContext, useContext, useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Disease } from '@shared/data/diseases';
import glossary from '@shared/data/glossario-siglas.json';
import TopBar from './TopBar';
import { conditionNames, conditionPath, DISCLAIMER } from '../lib/healthPresentation';
import { getCondition, hasClinicalApproval, healthContent } from '../lib/healthContent';
import type { HealthCondition } from '../lib/healthContent';
import type { HealthStatus } from '../lib/useHealthCatalogue';

const SiglaContext = createContext<Set<string> | null>(null);
export function ClinicalText({ text }: { text: string }) {
  const seen = useContext(SiglaContext);
  const dictionary: Record<string, string> = glossary;
  const pattern = new RegExp(`\\b(${Object.keys(dictionary).sort((a,b) => b.length-a.length).join('|')})\\b`, 'g');
  return <>{text.split(pattern).map((part, index) => {
    const expansion = dictionary[part];
    if (!expansion) return part;
    const first = !seen?.has(part);
    seen?.add(part);
    return <abbr lang="pt-BR" key={index} title={expansion} aria-label={expansion}>{first ? `${expansion} (${part})` : part}</abbr>;
  })}</>;
}
export function ReviewBadge({ condition }: { condition: HealthCondition }) {
  const { t } = useHealthText();
  return <p className="health-review" role="status" data-clinical-status={hasClinicalApproval(condition) ? 'aprovado' : 'proposto'}>
    {hasClinicalApproval(condition)
      ? `${t('Revisado por')} ${condition.revisor} (${condition.revisor_conselho}) — ${condition.data_revisao}`
      : `${t('Versão')} ${condition.versao} · ${t('em revisão clínica')}`}
  </p>;
}
export function HealthLayout({ children, back }: { children: ReactNode; back?: string }) {
  const { t, localeId } = useHealthText();
  const location = useLocation();
  const seen = new Set<string>();
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus({ preventScroll: true }); window.scrollTo(0, 0); }, [location.pathname]);
  // Tracks acronym expansion within this layout render only; never persists
  // reading history. Independent child rerenders still require manual review.
  return <SiglaContext.Provider value={seen}><div lang={localeId === 'es' ? 'es-419' : 'pt-BR'} className="health-screen min-h-screen bg-pulso-creme text-pulso-verde font-pulso-body">
    <TopBar title={t('Saúde')} />
    <main ref={mainRef} key={location.pathname} id="health-content" tabIndex={-1} className="px-4 pt-3 pb-6">
      {back && <Link className="health-back" to={back}>‹ {t('Voltar')}</Link>}
      {children}
    </main>
    <footer className="health-disclaimer px-4 pb-6"><p>{t(DISCLAIMER)}</p>
      <details><summary>{t('Sobre o app')}</summary><p>{t('O app precisa de internet para abrir. Com o app já aberto, o conteúdo visitado continua disponível.')}</p><p>{t('Sem instalação ou abertura a frio offline nesta versão.')}</p></details>
    </footer>
  </div></SiglaContext.Provider>;
}
export function ConditionIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></svg>;
}
export function RiskBadge({ children }: { children: ReactNode }) {
  return <span className="health-badge"><span aria-hidden="true">•</span> {children}</span>;
}
export function ConditionCard({ disease, categoryId, compact = false }: { disease: Disease; categoryId: string; compact?: boolean }) {
  const { popular, technical } = conditionNames(disease);
  const { t } = useHealthText();
  const editorial = getCondition(disease.id);
  const badges = new Set([...(editorial?.selos ?? []), ...(disease.isPriorityTheme ? ['Tema prioritário de equidade'] : []), ...(disease.localStudy ? ['Dado local disponível (DF)'] : [])]);
  return <Link to={conditionPath(categoryId, disease.id)} className={`health-card ${compact ? 'health-card-compact' : ''}`}>
    <ConditionIcon />
    <span lang="pt-BR" className="health-card-name">{popular}</span>
    {technical !== popular && <span lang="pt-BR" className="health-technical">({technical})</span>}
    {!compact && <span className="health-badges">{[...badges].map(badge => <RiskBadge key={badge}>{t(badge)}</RiskBadge>)}</span>}
  </Link>;
}
export function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const id = useId(); const { t } = useHealthText();
  return <div className="health-search">
    <label htmlFor={id} className="sr-only">{t('Buscar condição ou sintoma')}</label>
    <input id={id} type="search" value={value} onChange={event => onChange(event.target.value)} placeholder={t('Buscar condição ou sintoma')} autoComplete="off" />
  </div>;
}
export function SystemAccordion({ id, title, open, onToggle, children }: { id: string; title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const panel = `system-${id}`; const { t } = useHealthText();
  return <section className="health-system">
    <h2><button type="button" id={`${panel}-trigger`} aria-expanded={open} aria-controls={panel} onClick={onToggle}>
      {t(title)}<span aria-hidden="true">{open ? '−' : '+'}</span>
    </button></h2>
    <div id={panel} hidden={!open} aria-labelledby={`${panel}-trigger`}>{open && <div className="health-stack p-3">{children}</div>}</div>
  </section>;
}
export function EmptyState({ onReset }: { onReset?: () => void }) {
  const { t } = useHealthText();
  return <section className="health-state" role="status"><p>{t('Nenhum resultado')}</p>
    {onReset ? <button type="button" onClick={onReset}>{t('Ver todas as condições')}</button> : <Link to="/saude?lista=1">{t('Ver todas as condições')}</Link>}
    <Link className="health-action" to="/mapa?limite=3">{t('Buscar serviços perto de mim')}</Link>
  </section>;
}
export function SkeletonCard() {
  return <span className="health-skeleton" aria-hidden="true"><span /><span /><span /></span>;
}
export function HealthState({ status, retry }: { status: HealthStatus; retry: () => void }) {
  const { t } = useHealthText();
  if (status === 'loading') return <section role="status" aria-live="polite" aria-busy="true">
    <p>{t('Buscando informações…')}</p><div className="health-grid">{Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}</div>
  </section>;
  if (status === 'error') return <section role="alert" className="health-state">
    <p>{t('Não foi possível carregar agora.')}</p><button type="button" onClick={retry}>{t('Tentar de novo')}</button>
  </section>;
  if (status === 'offline') return <p role="status" className="health-offline">{t('Você está sem internet.')} {t('Conteúdo pode estar desatualizado.')} {t('Última atualização')}: {healthContent.updated_at}.</p>;
  return null;
}
