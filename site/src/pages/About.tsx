import { roadmap } from '../data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import VideoEmbed from '../components/VideoEmbed';

export default function About() {
  const { brand: projectInfo } = useAppearance();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 prose-project">
      <h1 className="text-3xl font-bold text-earth-900 mb-2">Sobre o Projeto</h1>
      <p className="text-earth-500 mb-10">{projectInfo.name} — {projectInfo.subtitle}</p>

      <div className="not-prose mb-10">
        <VideoEmbed
          youtubeId="o_na8-J8XU8"
          title={`${projectInfo.name} — histórias e o que está em jogo na saúde da população negra`}
        />
        <p className="text-xs text-earth-500 mt-2">
          Histórias reais, ditas por quem vive — o retrato que motiva a existência do {projectInfo.name}.
        </p>
      </div>

      <h2 className="text-xl font-bold text-earth-900 mt-10 mb-3">Visão estratégica</h2>
      <p className="text-earth-700 mb-4">
        No Brasil, a população negra enfrenta inequidades sistêmicas em saúde: maior risco de doenças crônicas,
        subdiagnóstico por racismo institucional, menor acesso a serviços de qualidade no SUS e invisibilidade
        epidemiológica — 56% da população brasileira é negra, mas apenas 1,5% das pesquisas em saúde incluem
        recorte racial.
      </p>
      <p className="text-earth-700 mb-4">
        {projectInfo.name} é uma <strong>plataforma de inteligência comunitária</strong> construída sobre uma
        arquitetura dupla: um <strong>Site Institucional</strong> (este site — conteúdo, transparência e
        comunidade) e um <strong>App Sentinela</strong> (ferramenta funcional de escuta longitudinal e navegação
        em saúde), unidos por uma terceira camada de <strong>governança e confiança</strong>.
      </p>

      <h2 className="text-xl font-bold text-earth-900 mt-10 mb-3">Como o projeto é organizado</h2>
      <p className="text-earth-700 mb-4">
        {projectInfo.name} é construído sobre uma arquitetura de governança e confiança, informada por
        referências internacionais de mídias e plataformas de saúde comunitária consolidadas. Para quem quer
        entender os bastidores técnicos e institucionais do projeto, publicamos um relatório de arquitetura
        completo e público.
      </p>
      <a href="/arquitetura" className="inline-block text-brand-600 font-medium hover:underline mb-8">
        Ler o relatório de arquitetura completo →
      </a>

      <h2 className="text-xl font-bold text-earth-900 mt-10 mb-4">Roadmap</h2>
      <div className="space-y-6">
        {roadmap.map((r) => (
          <div key={r.fase} className="border border-earth-200 rounded-xl p-5">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
              <h3 className="font-bold text-earth-900">{r.fase}</h3>
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">{r.periodo}</span>
            </div>
            <p className="text-earth-600 text-sm mb-3">{r.objetivo}</p>
            <ul className="text-sm text-earth-700 space-y-1 list-disc pl-5">
              {r.entregas.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
