import { getPulsoContent } from '@shared/data/pulsoContent';
import { partners } from '@shared/data/project';
import { useAppearance } from '@shared/context/AppearanceContext';

export default function Community() {
  const { brand, localeId } = useAppearance();
  const { seminar } = getPulsoContent(localeId);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-pulso-verde mb-4">Comunidade Preta de Saúde</h1>
      <p className="text-pulso-marrom mb-10 max-w-2xl">
        A dimensão comunitária — rodas de conversa, coletivos e ONGs parceiras — é a base de sustentação
        social do {brand.name}, uma mídia de saúde com presença comunitária constante.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="rounded-xl border border-pulso-dourado/25 p-5">
          <h3 className="font-bold text-pulso-verde mb-2">Rodas de conversa</h3>
          <p className="text-sm text-pulso-marrom">
            Encontros presenciais e virtuais para discutir saúde, racismo institucional e autocuidado, com
            mediação de profissionais e lideranças comunitárias.
          </p>
        </div>
        <div className="rounded-xl border border-pulso-dourado/25 p-5">
          <h3 className="font-bold text-pulso-verde mb-2">Coletivos e ONGs parceiras</h3>
          <p className="text-sm text-pulso-marrom">
            Rede de organizações da sociedade civil que apoiam a mobilização territorial e a confiança
            comunitária necessária para a adesão ao projeto.
          </p>
        </div>
      </div>

      <h2 className="font-bold text-pulso-verde mb-4">Parceiros comunitários</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {partners.comunitario.map((p) => (
          <div key={p.name} className="rounded-xl border border-pulso-dourado/25 p-5 bg-pulso-creme">
            <div className="font-bold text-pulso-verde">{p.name}</div>
            <div className="text-xs text-pulso-marrom/70 mb-1">{p.full}</div>
            <div className="text-xs text-pulso-marrom">{p.role}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-pulso-dourado/25 bg-white overflow-hidden">
        <div className="bg-pulso-verde text-white p-6">
          <span className="text-xs font-bold uppercase tracking-wider text-pulso-verde-accent/40">Evento-âncora do projeto</span>
          <h2 className="font-editorial italic text-2xl sm:text-3xl mt-1 mb-2">
            {localeId === 'es' ? seminar.name : <>Seminário Latino-Americano<br />
            <span className="text-pulso-verde-accent/40">"Saúde, Tecnologia e Prevenção: Desafios e Inovações para a População Negra"</span></>}
          </h2>
          <p className="text-sm text-pulso-dourado/25">
            <strong className="text-white">{seminar.dates}</strong> — Brasília, Distrito Federal. Reunindo
            especialistas da América Latina e do Caribe para discutir as doenças que mais afetam a população
            negra e as inovações tecnológicas que podem transformar o cuidado em saúde.
          </p>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-pulso-verde mb-3">Programação em 2 dias</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-pulso-creme p-4 border border-pulso-dourado/15">
                <div className="text-xs font-bold uppercase tracking-wide text-pulso-marrom mb-1">{seminar.days[0].label}</div>
                <p className="text-sm text-pulso-marrom font-medium mb-1">{seminar.days[0].audience}</p>
                <p className="text-xs text-pulso-marrom/70">
                  {localeId === 'es' ? seminar.days[0].description : <>~150 participantes de Medicina, Enfermagem e áreas afins — apresentação técnica da
                  plataforma e painel técnico de discussão sobre funcionalidades, contribuições e
                  possibilidades de aperfeiçoamento do app.</>}
                </p>
              </div>
              <div className="rounded-lg bg-pulso-creme p-4 border border-pulso-dourado/15">
                <div className="text-xs font-bold uppercase tracking-wide text-pulso-marrom mb-1">{seminar.days[1].label}</div>
                <p className="text-sm text-pulso-marrom font-medium mb-1">{seminar.days[1].audience}</p>
                <p className="text-xs text-pulso-marrom/70">
                  {seminar.days[1].description}
                </p>
              </div>
            </div>
            <p className="text-xs text-pulso-marrom/60 mt-3">Total estimado: 300 participantes.</p>
          </div>

          <div>
            <h3 className="font-bold text-pulso-verde mb-3">{seminar.axesHeading}</h3>
            <ul className="space-y-2 text-sm text-pulso-marrom mb-5">
              <li className="flex gap-2"><span className="text-pulso-marrom">•</span> {seminar.axes[0]}</li>
              <li className="flex gap-2"><span className="text-pulso-marrom">•</span> {seminar.axes[1]}</li>
              <li className="flex gap-2"><span className="text-pulso-marrom">•</span> {seminar.axes[2]}</li>
            </ul>
            <h3 className="font-bold text-pulso-verde mb-2">{seminar.panelHeading}</h3>
            <p className="text-sm text-pulso-marrom">
              {localeId === 'es' ? seminar.panelText.replace(/\.$/, '') : <>Espaço de apresentação do aplicativo e da cartilha científica, com mesa de discussão sobre
              funcionalidades, contribuições e caminhos de aperfeiçoamento da plataforma</>} — reunindo
              profissionais de saúde, pesquisadores, desenvolvedores de tecnologia, formuladores de
              políticas e membros da comunidade.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="text-[11px] text-pulso-marrom/60 border-t border-pulso-dourado/15 pt-4">
            Fontes: Anexo de Intervenção AECID (participantes e objetivo do seminário) e Relatório de
            Planejamento Técnico do Produto 2.2 (estratégia de demonstração e painel técnico). Para além
            do Seminário, o objetivo é manter um calendário contínuo de campanhas e ações comunitárias —
            não apenas eventos pontuais. Agenda complementar em construção.
          </p>
        </div>
      </div>
    </div>
  );
}
