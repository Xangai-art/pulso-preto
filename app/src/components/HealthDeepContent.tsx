import { useEffect, useState } from 'react';
import type { Disease } from '@shared/data/diseases';
import type { DiseaseDeepContent } from '@shared/data/anemiaFalciforme';
import { PENDING, wordPages } from '../lib/healthPresentation';

function PagedBlock({ title, paragraphs, id, children }: { title: string; paragraphs: string[]; id?: string; children?: React.ReactNode }) {
  const pages = wordPages(paragraphs.length ? paragraphs : [PENDING]);
  const [page, setPage] = useState(0);
  const current = Math.min(page, pages.length - 1);
  return <section id={id} className="health-panel" data-deep-block>
    <h2>{title}</h2>
    <div aria-live="polite">{pages[current].map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
    {pages.length > 1 && <nav aria-label={`Páginas: ${title}`} className="health-filters">
      <button type="button" disabled={current === 0} onClick={() => setPage(current - 1)}>Anterior</button>
      <span>Página {current + 1} de {pages.length}</span>
      <button type="button" disabled={current === pages.length - 1} onClick={() => setPage(current + 1)}>Próxima</button>
    </nav>}
    {children}
  </section>;
}
export default function HealthDeepContent({ disease, locale }: { disease: Disease; locale: 'pt' | 'es' }) {
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
  const userSections = content?.audiences.usuario.sections ?? [];
  const explanation = userSections.filter(section => /o que [ée]|qu[ée] es/i.test(section.heading)).flatMap(section => section.body);
  const equity = userSections.filter(section => /importa|racial|racismo|negra|importancia/i.test(section.heading)).flatMap(section => section.body);
  const scientific = [disease.study, disease.finding, disease.localStudy?.value, disease.localStudy?.finding, disease.localStudy?.source,
    ...(content?.sources.flatMap(source => [source.label, source.detail]) ?? [])].filter((text): text is string => !!text);
  // All original audience summaries, paragraphs and source credits remain reachable.
  const archive = content ? [disease.name, content.heroImage.alt, content.heroImage.credit,
    ...(['usuario', 'enfermeiro', 'medico'] as const).flatMap(key => [
      key === 'usuario' ? 'Acervo para a população' : key === 'enfermeiro' ? 'Acervo para enfermagem' : 'Acervo para profissionais de medicina',
      content.audiences[key].summary,
      ...content.audiences[key].sections.flatMap(section => [section.heading, ...section.body]),
    ])] : [];
  return <div className="health-stack" data-screen="S3">
    {failed && <p role="alert">Não foi possível carregar agora. <button type="button" onClick={() => setAttempt(value => value + 1)}>Tentar de novo</button></p>}
    <PagedBlock title="Explicação ampliada" paragraphs={explanation} />
    <PagedBlock title="Contexto de equidade racial" paragraphs={equity} />
    <PagedBlock id="science" title="O que diz a ciência?" paragraphs={scientific}>
      <a className="health-action" href="#source-record">Ver fonte</a>
    </PagedBlock>
    <PagedBlock id="source-record" title="Acervo completo e fontes" paragraphs={[
      'Conteúdo científico original, preservado para consulta. A revisão clínica formal e os endereços específicos das publicações aguardam confirmação pela equipe da saúde.',
      ...scientific, ...archive,
    ]}>
      <p>As referências bibliográficas estão preservadas acima. Não há endereço eletrônico validado para todas as fontes.</p>
    </PagedBlock>
  </div>;
}
