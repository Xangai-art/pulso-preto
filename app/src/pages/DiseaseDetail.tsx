import { useHealthText } from '../lib/healthI18n';
import PopulationNotice from '@shared/components/PopulationNotice';
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useSearchParams } from 'react-router-dom';
import { resolveDiseasePath } from '@shared/data/diseases';
import HealthDeepContent from '../components/HealthDeepContent';
import { ClinicalText, EmptyState, HealthLayout, HealthState, ReviewBadge } from '../components/HealthComponents';
import { conditionNames, conditionPath } from '../lib/healthPresentation';
import { getCondition, PREPARATION } from '../lib/healthContent';
import { useHealthCatalogue } from '../lib/useHealthCatalogue';

export default function DiseaseDetail() {
  const { categoryId, diseaseId } = useParams();
  const [params] = useSearchParams();
  const { localeId, t } = useHealthText();
  const { categories, status, retry } = useHealthCatalogue();
  const [expanded, setExpanded] = useState(false);
  const category = categories.find(item => item.id === categoryId);
  const disease = category?.diseases.find(item => item.id === diseaseId);
  const deep = params.get('aprofundar') === '1';
  useEffect(() => { setExpanded(false); }, [diseaseId, deep]);
  if (status === 'loading' || status === 'error') return <HealthLayout back="/saude"><HealthState status={status} retry={retry} /></HealthLayout>;
  if (!disease || !category) {
    const current = resolveDiseasePath(diseaseId);
    if (current && current !== `/saude/${categoryId}/${diseaseId}`) return <Navigate to={current} replace />;
    return <HealthLayout back="/saude"><HealthState status={status} retry={retry} /><EmptyState /></HealthLayout>;
  }
  const { popular, technical } = conditionNames(disease);
  const content = getCondition(disease.id);
  const path = conditionPath(category.id, disease.id);
  return <HealthLayout back={deep ? path : '/saude'}>
    <HealthState status={status} retry={retry} />
    {content && <ReviewBadge condition={content} />}
    {deep ? <>
      <h2><span lang="pt-BR">{popular}</span>: {t('Entenda melhor')}</h2>
      <HealthDeepContent key={`${disease.id}-${localeId}`} disease={disease} locale={localeId} />
    </> : <article className="health-stack" data-screen="S2">
      <header data-detail-block="identity">
        <h2 lang="pt-BR" className="health-condition-title">{popular}</h2>
        {technical !== popular && <p lang="pt-BR" className="health-technical">({technical})</p>}
        {localeId === 'es' && content && <p>{t('Conteúdo clínico disponível em português, em revisão clínica.')}</p>}
      </header>
      {!content ? <p>{t(PREPARATION)}</p> : <>
        {disease.id === 'diabetes' && <p>{t('Existem outros tipos de diabetes. Este conteúdo é sobre o tipo 2.')}</p>}
        <section data-detail-block="definition"><h3>{t('O que é')}</h3><p lang="pt-BR"><ClinicalText text={content.definicao} /></p></section>
        <section data-detail-block="signs"><h3>{t('Sinais que você pode perceber')}</h3><ol lang="pt-BR">{content.sinais.map(item => <li key={item}><ClinicalText text={item} /></li>)}</ol></section>
        <section data-detail-block="alert" className="health-urgent"><h3>{t('Quando procurar urgência')}</h3><p lang="pt-BR"><ClinicalText text={content.alerta} /></p><a href="tel:192">{t('Ligar')} 192</a></section>
        <section data-detail-block="actions"><h3>{t('O que fazer hoje')}</h3><ol lang="pt-BR">{content.acoes.map(item => <li key={item}><ClinicalText text={item} /></li>)}</ol></section>
        <Link className="health-action" to={`/mapa?condicao=${encodeURIComponent(disease.id)}`}>{t('Buscar serviços perto de mim')}</Link>
        <section className="health-system" data-detail-block="understand">
          <h3><button type="button" aria-expanded={expanded} aria-controls="condition-understand" onClick={() => setExpanded(value => !value)}>{t('Entenda melhor')}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button></h3>
          <div id="condition-understand" hidden={!expanded} className="p-3 health-stack">
            <section><h4>{t('Contexto de equidade racial')}</h4><PopulationNotice /><p lang="pt-BR" data-claim-status={content.equidade_claim_status}><ClinicalText text={content.equidade} /></p>
              {content.equidade_claim_status === 'narrativa_sem_dado' && <p>{t('Reflexão sobre barreiras de acesso; não é uma estatística.')}</p>}
            </section>
            <section><h4>{t('Perguntas frequentes')}</h4><p>{t('Não há respostas de perguntas frequentes nesta versão.')}</p></section>
          </div>
        </section>
        <section id="official-sources" className="health-panel"><h3>{t('Ver fonte')}</h3>
          {content.fontes.map(source => <article className="health-source" key={source.url}>
            <p lang="pt-BR"><ClinicalText text={`${source.orgao} — ${source.titulo}`} /></p>
            <p>{source.titulo.match(/\b20\d{2}\b/)?.[0] ?? t('Ano não informado')} · {t('Acesso')}: {source.acesso}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer">{t('Ver fonte')} ↗<span className="sr-only" lang="pt-BR"> — {source.titulo}</span></a>
            <details><summary>{t('Detalhes da referência')}</summary><p lang="pt-BR">{source.tipo} · {source.url}</p></details>
          </article>)}
        </section>
      </>}
      <Link className="health-action" to={`${path}?aprofundar=1`}>{t('Aprofundar no acervo')}</Link>
    </article>}
  </HealthLayout>;
}
