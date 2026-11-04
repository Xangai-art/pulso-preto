import { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom';
import { resolveDiseasePath } from '@shared/data/diseases';
import { useAppearance } from '@shared/context/AppearanceContext';
import HealthDeepContent from '../components/HealthDeepContent';
import { EmptyState, HealthLayout, HealthState, RiskBadge } from '../components/HealthComponents';
import { conditionNames, conditionPath, PENDING } from '../lib/healthPresentation';
import { saveOpenedCondition, useHealthCatalogue } from '../lib/useHealthCatalogue';

export default function DiseaseDetail() {
  const { categoryId, diseaseId } = useParams();
  const [params] = useSearchParams();
  const { localeId } = useAppearance();
  const { categories, status, retry } = useHealthCatalogue();
  const [expanded, setExpanded] = useState(false);
  const category = categories.find(item => item.id === categoryId);
  const disease = category?.diseases.find(item => item.id === diseaseId);
  const deep = params.get('aprofundar') === '1';
  useEffect(() => { setExpanded(false); }, [diseaseId, deep]);
  useEffect(() => {
    if (disease) void saveOpenedCondition(disease.id);
  }, [disease]);
  if (status === 'loading' || status === 'error') return <HealthLayout back="/saude"><HealthState status={status} retry={retry} /></HealthLayout>;
  if (!disease || !category) {
    const current = resolveDiseasePath(diseaseId);
    if (current && current !== `/saude/${categoryId}/${diseaseId}`) return <Navigate to={current} replace />;
    return <HealthLayout back="/saude"><HealthState status={status} retry={retry} /><EmptyState /></HealthLayout>;
  }
  const { popular, technical } = conditionNames(disease);
  const path = conditionPath(category.id, disease.id);
  return <HealthLayout back={deep ? path : '/saude'}>
    <HealthState status={status} retry={retry} />
    {deep ? <>
      <h2>{popular}: entenda melhor</h2>
      <HealthDeepContent key={`${disease.id}-${localeId}`} disease={disease} locale={localeId} />
    </> : <article className="health-stack" data-screen="S2">
      <header data-detail-block="identity">
        <h2 className="health-condition-title">{popular}</h2>
        <p className="health-technical">{technical}</p>
        <div className="health-badges">
          {disease.isPriorityTheme && <RiskBadge>Tema prioritário</RiskBadge>}
          {disease.localStudy && <RiskBadge>Dado do Distrito Federal</RiskBadge>}
        </div>
      </header>
      <section data-detail-block="definition"><h3>O que é</h3><p>{PENDING}</p></section>
      <section data-detail-block="signs"><h3>Sinais para ficar atento</h3><ul>{[1, 2, 3].map(item => <li key={item}>{PENDING}</li>)}</ul></section>
      <section data-detail-block="actions"><h3>O que fazer</h3><ol>{[1, 2, 3].map(item => <li key={item}>{PENDING}</li>)}</ol>
        <Link className="health-action" to={`/mapa?condicao=${encodeURIComponent(disease.id)}`}>Onde me atender perto de mim</Link>
      </section>
      <section data-detail-block="understand" className="health-system">
        <h3><button type="button" aria-expanded={expanded} aria-controls="condition-understand" onClick={() => setExpanded(value => !value)}><span>Entenda melhor</span><span aria-hidden="true">{expanded ? '−' : '+'}</span></button></h3>
        <div id="condition-understand" hidden={!expanded}>
          <nav aria-label="Aprofundar esta condição" className="health-stack p-3">
            <Link to={`${path}?aprofundar=1`}>Por que afeta mais a população negra?</Link>
            <Link to={`${path}?aprofundar=1`}>Como é feito o diagnóstico?</Link>
            <Link to={`${path}?aprofundar=1#science`}>O que diz a ciência? — Ver fonte</Link>
            <Link to={`${path}?aprofundar=1#source-record`}>Perguntas frequentes e acervo completo</Link>
          </nav>
        </div>
      </section>
    </article>}
  </HealthLayout>;
}
