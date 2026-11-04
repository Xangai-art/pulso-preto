import { useId } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Disease } from '@shared/data/diseases';
import TopBar from './TopBar';
import { conditionNames, conditionPath, DISCLAIMER } from '../lib/healthPresentation';
import type { HealthStatus } from '../lib/useHealthCatalogue';

export function HealthLayout({ children, back }: { children: ReactNode; back?: string }) {
  return <div className="health-screen min-h-screen bg-pulso-creme text-pulso-verde font-pulso-body">
    <TopBar title="Saúde" />
    <main id="health-content" className="px-4 pt-3 pb-6">
      {back && <Link className="health-back" to={back}>‹ Voltar</Link>}
      {children}
    </main>
    <footer className="health-disclaimer px-4 pb-6">{DISCLAIMER}</footer>
  </div>;
}
export function ConditionIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></svg>;
}
export function RiskBadge({ children }: { children: ReactNode }) {
  return <span className="health-badge"><span aria-hidden="true">•</span> {children}</span>;
}
export function ConditionCard({ disease, categoryId, compact = false }: { disease: Disease; categoryId: string; compact?: boolean }) {
  const { popular, technical } = conditionNames(disease);
  return <Link to={conditionPath(categoryId, disease.id)} className={`health-card ${compact ? 'health-card-compact' : ''}`}>
    <ConditionIcon />
    <span className="health-card-name">{popular}</span>
    <span className="health-technical">{technical}</span>
    {!compact && <span className="health-badges">
      {disease.isPriorityTheme && <RiskBadge>Tema prioritário</RiskBadge>}
      {disease.localStudy && <RiskBadge>Dado do Distrito Federal</RiskBadge>}
    </span>}
  </Link>;
}
export function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const id = useId();
  return <div className="health-search">
    <label htmlFor={id} className="sr-only">Buscar condição, sintoma ou serviço</label>
    <input id={id} type="search" value={value} onChange={event => onChange(event.target.value)} placeholder="condição, sintoma ou serviço" autoComplete="off" />
  </div>;
}
export function SystemAccordion({ id, title, open, onToggle, children }: { id: string; title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const panel = `system-${id}`;
  return <section className="health-system">
    <h2><button type="button" id={`${panel}-trigger`} aria-expanded={open} aria-controls={panel} onClick={onToggle}>
      {title}<span aria-hidden="true">{open ? '−' : '+'}</span>
    </button></h2>
    <div id={panel} hidden={!open} aria-labelledby={`${panel}-trigger`}>
      {open && <div className="health-stack p-3">{children}</div>}
    </div>
  </section>;
}
export function EmptyState({ onReset }: { onReset?: () => void }) {
  return <section className="health-state" role="status">
    <p>Não encontramos essa condição. Tente outro nome, como 'pressão alta'.</p>
    {onReset ? <button type="button" onClick={onReset}>Ver todas as condições</button> : <Link to="/saude?lista=1">Ver todas as condições</Link>}
  </section>;
}
export function SkeletonCard() {
  return <span className="health-skeleton" aria-hidden="true"><span /><span /><span /></span>;
}
export function HealthState({ status, retry }: { status: HealthStatus; retry: () => void }) {
  if (status === 'loading') return <section role="status" aria-live="polite" aria-busy="true">
    <p>Buscando informações…</p><div className="health-grid">{Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}</div>
  </section>;
  if (status === 'error') return <section role="alert" className="health-state">
    <p>Não foi possível carregar agora. Tentar de novo.</p><button type="button" onClick={retry}>Tentar de novo</button>
  </section>;
  if (status === 'offline') return <p role="status" className="health-offline"><span aria-hidden="true">◌ </span>Você está sem internet. Mostrando o conteúdo salvo.</p>;
  return null;
}
