import { useHealthText } from '../lib/healthI18n';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ConditionCard, EmptyState, HealthLayout, HealthState, SearchField, SystemAccordion } from '../components/HealthComponents';
import { groupSystems, matchesCondition, matchesRisk, MVP_IDS, normalize } from '../lib/healthPresentation';
import type { RiskFilter } from '../lib/healthPresentation';
import { healthContent } from '../lib/healthContent';
import { isUrgentSearch } from '../lib/healthSymptoms';
import { useHealthCatalogue } from '../lib/useHealthCatalogue';

export default function HealthLibrary() {
  const [params, setParams] = useSearchParams();
  const { t } = useHealthText();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RiskFilter>('Todas');
  const [openSystem, setOpenSystem] = useState<string | null>('coracao-circulacao-respiracao');
  const { categories, status, retry } = useHealthCatalogue();
  const listing = params.get('lista') === '1';
  const searching = !!normalize(query);
  const entries = categories.flatMap(category => category.diseases.map(disease => ({ category, disease })));
  const results = entries.filter(({ disease }) => matchesCondition(disease, query) && matchesRisk(disease, filter));
  const featured = MVP_IDS.flatMap(id => entries.filter(entry => entry.disease.id === id));
  const systems = groupSystems(categories);
  const ready = status === 'ready' || status === 'offline';
  function reset() {
    setQuery(''); setFilter('Todas'); setOpenSystem('coracao-circulacao-respiracao'); setParams({ lista: '1' });
  }
  return <HealthLayout back={listing ? '/saude' : undefined}>
    <div className="health-stack" data-screen={listing ? 'S1' : 'S0'}>
      <p data-block="context">{t('Entenda sua saúde e encontre apoio.')}</p>
      <SearchField value={query} onChange={setQuery} />
      <p>{t('Busca por sintomas organiza conteúdo; não faz triagem.')}</p>
      {!listing && !searching && <nav aria-label={t('Por onde começar')} className="health-intents" data-block="intentions">
        <Link to="/saude?lista=1">{t('Entender uma condição')}</Link>
        <Link to="/mapa">{t('Onde me atender')}</Link>
        <button type="button" disabled={!healthContent.features.notes} aria-describedby="notes-notice">{t('Minhas anotações')}</button>
        <p id="notes-notice" className="col-span-full">{t(healthContent.avisos_fixos.notes_off)}</p>
      </nav>}
      <HealthState status={status} retry={retry} />
      {listing && <>
        <h2>{t('Todas as condições')}</h2><h3>{t('Filtros de conteúdo')}</h3>
        <p>{t(healthContent.avisos_fixos.filtros)}</p>
        <div role="group" aria-label={t('Filtros de conteúdo')} className="health-filters">
          {(['Todas', 'Tema prioritário de equidade', 'Dado local disponível (DF)'] as const).map(label => <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{t(label)}</button>)}
          <button type="button" onClick={reset}>{t('Limpar filtros')}</button>
        </div>
      </>}
      {searching && isUrgentSearch(query) && <section className="health-urgent" data-search-alert><h2>{t('Quando procurar urgência')}</h2><p>{t('Se houver dor no peito, desmaio ou falta de ar, procure atendimento de urgência. Em emergência, ligue 192.')}</p><a href="tel:192">{t('Ligar')} 192</a></section>}
      {searching && <p>{t('Estes conteúdos são informativos. Eles não substituem avaliação de saúde e não indicam diagnóstico.')}</p>}
      {(status === 'empty' || (ready && ((searching || listing) ? results.length === 0 : featured.length === 0))) && <EmptyState onReset={reset} />}
      {ready && searching && <section aria-label={t('Resultados da busca')} className="health-stack">
        <p role="status" aria-live="polite">{results.length} {t('condições encontradas.')}</p>
        {results.map(({ disease, category }) => <ConditionCard key={disease.id} disease={disease} categoryId={category.id} />)}
      </section>}
      {ready && !searching && !listing && featured.length > 0 && <section aria-labelledby="featured-heading" data-block="featured">
        <h2 id="featured-heading">{t('Condições em destaque')}</h2>
        <div className="health-grid">{featured.map(({ disease, category }) => <ConditionCard key={disease.id} disease={disease} categoryId={category.id} compact />)}</div>
      </section>}
      {ready && listing && !searching && <p role="status" aria-live="polite">{results.length} {t('condições encontradas.')}</p>}
      {ready && listing && !searching && systems.map(system => <SystemAccordion key={system.id} id={system.id} title={system.title} open={openSystem === system.id} onToggle={() => setOpenSystem(openSystem === system.id ? null : system.id)}>
        {system.id === 'violencias-acidentes' && <p>{t('Tema transversal')}</p>}
        {system.entries.some(entry => entry.classificationPending) && <p>{t('Classificação em revisão')}</p>}
        {system.entries.filter(({ disease }) => matchesRisk(disease, filter)).map(({ disease, category }) => <ConditionCard key={disease.id} disease={disease} categoryId={category.id} />)}
        {!system.entries.some(({ disease }) => matchesRisk(disease, filter)) && <p>{t('Nenhuma condição disponível neste tema com o filtro atual.')}</p>}
      </SystemAccordion>)}
      {!listing && <Link className="health-action" data-block="all" to="/saude?lista=1">{t('Ver todas as condições')} ›</Link>}
    </div>
  </HealthLayout>;
}
