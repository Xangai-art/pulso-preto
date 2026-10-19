import { Link } from 'react-router-dom';
import { roadmap, partners } from '@shared/data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import VideoEmbed from '../components/VideoEmbed';

export default function About() {
  const { brand: projectInfo } = useAppearance();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 prose-project">
      <h1 className="text-3xl font-bold text-pulso-verde mb-2">Sobre o Projeto</h1>
      <p className="text-pulso-marrom/70 mb-10">{projectInfo.name} — {projectInfo.subtitle}</p>

      <div className="not-prose mb-10">
        <VideoEmbed
          youtubeId="o_na8-J8XU8"
          title={`${projectInfo.name} — histórias e o que está em jogo na saúde da população negra`}
        />
        <p className="text-xs text-pulso-marrom/70 mt-2">
          Histórias reais, ditas por quem vive — o retrato que motiva a existência do {projectInfo.name}.
        </p>
      </div>

      <h2 className="text-xl font-bold text-pulso-verde mt-10 mb-3">Visão estratégica</h2>
      <p className="text-pulso-marrom mb-4">
        No Brasil, a população negra enfrenta inequidades sistêmicas em saúde: maior risco de doenças crônicas,
        subdiagnóstico por racismo institucional, menor acesso a serviços de qualidade no Sistema Único de Saúde (SUS) e invisibilidade
        epidemiológica — 56% da população brasileira é negra, mas apenas 1,5% das pesquisas em saúde consideram
        a raça.
      </p>
      <p className="text-pulso-marrom mb-4">
        {projectInfo.name} é uma <strong>plataforma de inteligência comunitária</strong> construída sobre uma
        arquitetura dupla: um <strong>Site Institucional</strong> (este site — conteúdo, transparência e
        comunidade) e um <strong>App Sentinela</strong> (ferramenta funcional de escuta longitudinal e navegação
        em saúde), unidos por uma terceira camada de <strong>governança e confiança</strong>.
      </p>

      <h2 className="text-xl font-bold text-pulso-verde mt-10 mb-3">Como o projeto é organizado</h2>
      <p className="text-pulso-marrom mb-4">
        {projectInfo.name} é construído sobre uma arquitetura de governança e confiança, informada por
        referências internacionais de mídias e plataformas de saúde comunitária consolidadas. Para quem quer
        entender os bastidores técnicos e institucionais do projeto, publicamos um relatório de arquitetura
        completo e público.
      </p>
      <a href="/arquitetura" className="inline-block text-pulso-verde-accent font-medium hover:underline mb-8">
        Ler o relatório de arquitetura completo →
      </a>

      {/* Parceiros — migrou da Home para o menu inferior "Quem somos" (D9). */}
      <h2 id="parceiros" className="text-xl font-bold text-pulso-verde mt-10 mb-4 scroll-mt-24">Parceiros e governança</h2>
      <div className="not-prose grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm mb-4">
        {[
          ...partners.financiamento,
          ...partners.institucional,
          ...partners.execucao,
          ...partners.academico,
          ...partners.comunitario,
        ].map((p) => {
          const logo = (p as { logo?: string }).logo;
          return (
            <div key={p.name} className="rounded-lg bg-white border border-pulso-dourado/25 p-4">
              {logo && <img src={logo} alt={`Logotipo ${p.name}`} className="h-8 w-auto mb-3 object-contain" loading="lazy" />}
              <div className="font-bold text-pulso-verde">{p.name}</div>
              <div className="text-pulso-marrom/70 text-xs mb-1">{p.full}</div>
              <div className="text-pulso-marrom/50 text-xs">{p.role}</div>
            </div>
          );
        })}
      </div>
      <Link to="/transparencia" className="inline-block text-pulso-verde-accent font-medium hover:underline mb-8">
        Ver política completa de transparência e governança →
      </Link>

      <h2 className="text-xl font-bold text-pulso-verde mt-10 mb-4">Roadmap</h2>
      <div className="space-y-6">
        {roadmap.map((r) => (
          <div key={r.fase} className="border border-pulso-dourado/25 rounded-xl p-5">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
              <h3 className="font-bold text-pulso-verde">{r.fase}</h3>
              <span className="text-xs font-semibold text-pulso-verde-accent bg-pulso-verde-accent/10 px-2 py-1 rounded-full">{r.periodo}</span>
            </div>
            <p className="text-pulso-marrom text-sm mb-3">{r.objetivo}</p>
            <ul className="text-sm text-pulso-marrom space-y-1 list-disc pl-5">
              {r.entregas.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
