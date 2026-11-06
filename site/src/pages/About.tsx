import { Link } from 'react-router-dom';
import { translateText } from '@shared/data/locales';
import { roadmap, partners } from '@shared/data/project';
import { useAppearance } from '@shared/context/AppearanceContext';
import VideoEmbed from '../components/VideoEmbed';

export default function About() {
  const { brand: projectInfo, localeId } = useAppearance();
  const t = (text: string) => translateText(localeId, text);
  const textLang = localeId === 'es' ? 'es-419' : 'pt-BR';
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 prose-project">
      <h1 className="text-3xl font-bold text-pulso-verde mb-2">Sobre o projeto</h1>
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

      {/* Substituição provisória apenas no site. Original preservado na branch
          backup/sobre-visao-estrategica-a77a0fb:site/src/pages/About.tsx (a77a0fb). */}
      <p lang={textLang} className="text-pulso-marrom mb-4">
        {t("O Conectando Saúde e Inclusão é um projeto de tecnologia e educação para a equidade em saúde da população negra do Distrito Federal. Aqui você encontra informações de saúde com base científica, dados sobre as condições de vida e saúde da população negra no DF e espaços de participação.")}
      </p>
      <h2 className="text-xl font-bold text-pulso-verde mt-10 mb-3">Quem faz</h2>
      <ul className="text-sm text-pulso-marrom space-y-1 list-disc pl-5">
        <li><strong>Instituto APRECIA</strong> — executor do projeto</li>
        <li><strong>AECID</strong> — financiador</li>
        <li><strong>Sejus/DF</strong> — parceiro institucional</li>
        <li><strong>CASIO STUDIO V2</strong> — desenvolvimento técnico</li>
      </ul>

      <h2 className="text-xl font-bold text-pulso-verde mt-10 mb-3">Como o projeto é organizado</h2>
      <p lang={textLang} className="text-pulso-marrom mb-4">
        {t("{brand} é construído sobre uma arquitetura de governança e confiança, informada por referências internacionais de mídias e plataformas de saúde comunitária consolidadas. As informações públicas sobre governança e uso dos dados estão na página de transparência.").replace('{brand}', projectInfo.name)}
      </p>
      <a href="/transparencia" className="inline-block text-pulso-verde-accent font-medium hover:underline mb-8">
        Ver transparência e governança →
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
              <div lang={textLang} className="text-pulso-marrom/50 text-xs">{t(p.role)}</div>
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
