import { useHealthText } from '../lib/healthI18n';
import PopulationNotice from '@shared/components/PopulationNotice';
import { useEffect, useState } from 'react';
import type { Disease } from '@shared/data/diseases';
import type { DiseaseDeepContent } from '@shared/data/anemiaFalciforme';
import { wordPages } from '../lib/healthPresentation';
import { ClinicalText } from './HealthComponents';

function PagedBlock({ title, paragraphs, id, lang }: { title: string; paragraphs: string[]; id?: string; lang: string }) {
  const { t } = useHealthText();
  const pages = wordPages(paragraphs.length ? paragraphs : [t('Conteúdo em preparação.')]);
  const [page, setPage] = useState(0);
  const current = Math.min(page, pages.length - 1);
  return <section id={id} className="health-panel" data-deep-block>
    <h3>{t(title)}</h3>
    <PopulationNotice />
    <div aria-live="polite" lang={lang}>{pages[current].map((paragraph, i) => <p key={i}><ClinicalText text={paragraph} /></p>)}</div>
    {pages.length > 1 && <nav aria-label={`${t('Páginas')}: ${t(title)}`} className="health-filters">
      <button type="button" disabled={current === 0} onClick={() => setPage(current - 1)}>{t('Anterior')}</button>
      <span>{t('Página')} {current + 1} {t('de')} {pages.length}</span>
      <button type="button" disabled={current === pages.length - 1} onClick={() => setPage(current + 1)}>{t('Próxima')}</button>
    </nav>}
  </section>;
}
export default function HealthDeepContent({ disease, locale }: { disease: Disease; locale: 'pt' | 'es' }) {
  const { t } = useHealthText();
  const [content, setContent] = useState<DiseaseDeepContent>();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setContent(undefined); setFailed(false);
    import('@shared/data/deepContentRegistry').then(module => {
      if (active) setContent(module.getDeepContent(disease.id, locale));
    }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [disease.id, locale, attempt]);
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); target.scrollIntoView({ behavior: 'instant' }); }
  }, [content]);
  // Canonical archive stays intact and bilingual. Scientific claims are shown as
  // archive records, never relabelled as approved clinical answers or referrals.
  const scientific = [disease.study, disease.finding, disease.localStudy?.value, disease.localStudy?.finding, disease.localStudy?.source,
    ...(content?.sources.flatMap(source => [source.label, source.detail]) ?? [])].filter((text): text is string => !!text);
  return <div className="health-stack" data-screen="S3">
    <p>{t('Conteúdo científico original, preservado para consulta. Não representa aprovação clínica desta versão.')}</p>
    {failed && <p role="alert">{t('Não foi possível carregar agora.')} <button type="button" onClick={() => setAttempt(value => value + 1)}>{t('Tentar de novo')}</button></p>}
    <PagedBlock id="science" title="O que diz a ciência?" paragraphs={scientific} lang="pt-BR" />
    {content && (['usuario', 'enfermeiro', 'medico'] as const).map(key => <PagedBlock key={key}
      title={key === 'usuario' ? 'Acervo para a população' : key === 'enfermeiro' ? 'Acervo para enfermagem' : 'Acervo para profissionais de medicina'}
      paragraphs={[content.audiences[key].summary, ...content.audiences[key].sections.flatMap(section => [section.heading, ...section.body])]} lang={locale === 'es' ? 'es-419' : 'pt-BR'} />)}
    {content && <PagedBlock id="source-record" title="Acervo completo e fontes" paragraphs={[disease.name, content.heroImage.alt, content.heroImage.credit, ...content.sources.flatMap(source => [source.label, source.detail])]} lang="pt-BR" />}
  </div>;
}
