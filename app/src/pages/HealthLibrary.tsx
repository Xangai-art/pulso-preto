import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ConditionCard, EmptyState, HealthLayout, HealthState, SearchField, SystemAccordion } from '../components/HealthComponents';
import { groupSystems, matchesCondition, matchesRisk, MVP_IDS, normalize } from '../lib/healthPresentation';
import type { RiskFilter } from '../lib/healthPresentation';
import { useHealthCatalogue } from '../lib/useHealthCatalogue';

export default function HealthLibrary() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RiskFilter>('Todas');
  const [openSystem, setOpenSystem] = useState<string | null>('circulacao-pulmoes');
  const [notesNotice, setNotesNotice] = useState(false);
  const { categories, status, retry } = useHealthCatalogue();
  const listing = params.get('lista') === '1';
  const searching = !!normalize(query);
  const entries = categories.flatMap(category => category.diseases.map(disease => ({ category, disease })));
  const results = entries.filter(({ disease, category }) => matchesCondition(disease, query) && matchesRisk(category, filter));
  const featured = MVP_IDS.flatMap(id => entries.filter(entry => entry.disease.id === id));
  const systems = groupSystems(categories);
  const ready = status === 'ready' || status === 'offline';
  const serviceSearch = /servico|atendimento|unidade|hospital|posto|ubs|pronto/.test(normalize(query));
  function reset() {
    setQuery(''); setFilter('Todas'); setOpenSystem('circulacao-pulmoes'); setParams({ lista: '1' });
  }

  return <HealthLayout back={listing ? '/saude' : undefined}>
    <div className="health-stack" data-screen={listing ? 'S1' : 'S0'}>
      <p data-block="context">Entenda sua saúde e encontre apoio.</p>
      <SearchField value={query} onChange={setQuery} />
      {!listing && !searching && <nav aria-label="Por onde começar" className="health-intents" data-block="intentions">
        <Link to="/saude?lista=1">Entender uma condição</Link>
        <Link to="/mapa">Onde me atender</Link>
        <button type="button" aria-expanded={notesNotice} onClick={() => setNotesNotice(value => !value)}>Minhas anotações</button>
        {notesNotice && <p role="status" className="col-span-full">Minhas anotações ainda não está disponível. Nenhuma informação pessoal é salva nesta aba.</p>}
      </nav>}
      <HealthState status={status} retry={retry} />
      {serviceSearch && ready && <Link className="health-action" to="/mapa">Buscar serviços de saúde</Link>}
      {listing && <>
        <h2>Todas as condições</h2>
        <div role="group" aria-label="Filtrar por tipo de risco" className="health-filters">
          {(['Todas', 'Risco aumentado', 'Acesso desigual'] as const).map(label => <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}
        </div>
        {filter !== 'Todas' && <p>Filtro baseado na classificação do tema no acervo, não em avaliação de risco individual.</p>}
      </>}
      {(status === 'empty' || (ready && ((searching || listing) ? results.length === 0 : featured.length === 0))) && <EmptyState onReset={reset} />}
      {ready && searching && <section aria-label="Resultados da busca" className="health-stack">
        <p role="status">{results.length} condições encontradas.</p>
        {results.map(({ disease, category }) => <ConditionCard key={disease.id} disease={disease} categoryId={category.id} />)}
      </section>}
      {ready && !searching && !listing && featured.length > 0 && <section aria-labelledby="featured-heading" data-block="featured">
        <h2 id="featured-heading">Condições em destaque</h2>
        <div className="health-grid">{featured.map(({ disease, category }) => <ConditionCard key={disease.id} disease={disease} categoryId={category.id} compact />)}</div>
      </section>}
      {ready && listing && !searching && systems.map(system => <SystemAccordion key={system.id} id={system.id} title={system.title} open={openSystem === system.id} onToggle={() => setOpenSystem(openSystem === system.id ? null : system.id)}>
        {system.entries.some(entry => entry.classificationPending) && <p>Temas adicionais do acervo abaixo: classificação por sistema pendente de validação.</p>}
        {system.entries.filter(({ category }) => matchesRisk(category, filter)).map(({ disease, category }) => <ConditionCard key={disease.id} disease={disease} categoryId={category.id} />)}
        {!system.entries.some(({ category }) => matchesRisk(category, filter)) && <p>Nenhuma condição disponível neste tema com o filtro atual.</p>}
      </SystemAccordion>)}
      {!listing && <Link className="health-action" data-block="all" to="/saude?lista=1">Ver todas as condições ›</Link>}
    </div>
  </HealthLayout>;
}
