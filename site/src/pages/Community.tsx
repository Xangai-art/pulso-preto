import { partners } from '../data/project';

export default function Community() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-earth-900 mb-4">Comunidade Preta de Saúde</h1>
      <p className="text-earth-600 mb-10 max-w-2xl">
        A dimensão comunitária — rodas de conversa, coletivos e ONGs parceiras — é a base de sustentação
        social de Gente Preta, uma mídia de saúde com presença comunitária constante.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="rounded-xl border border-earth-200 p-5">
          <h3 className="font-bold text-earth-900 mb-2">Rodas de conversa</h3>
          <p className="text-sm text-earth-600">
            Encontros presenciais e virtuais para discutir saúde, racismo institucional e autocuidado, com
            mediação de profissionais e lideranças comunitárias.
          </p>
        </div>
        <div className="rounded-xl border border-earth-200 p-5">
          <h3 className="font-bold text-earth-900 mb-2">Coletivos e ONGs parceiras</h3>
          <p className="text-sm text-earth-600">
            Rede de organizações da sociedade civil que apoiam a mobilização territorial e a confiança
            comunitária necessária para a adesão ao projeto.
          </p>
        </div>
      </div>

      <h2 className="font-bold text-earth-900 mb-4">Parceiros comunitários</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {partners.comunitario.map((p) => (
          <div key={p.name} className="rounded-xl border border-earth-200 p-5 bg-earth-50">
            <div className="font-bold text-brand-700">{p.name}</div>
            <div className="text-xs text-earth-500 mb-1">{p.full}</div>
            <div className="text-xs text-earth-600">{p.role}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-earth-200 bg-white overflow-hidden">
        <div className="bg-earth-900 text-white p-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-300">Evento-âncora do projeto</span>
          <h2 className="font-editorial italic text-2xl sm:text-3xl mt-1 mb-2">
            Seminário Latino-Americano<br />
            <span className="text-brand-300">"Saúde, Tecnologia e Prevenção: Desafios e Inovações para a População Negra"</span>
          </h2>
          <p className="text-sm text-earth-200">
            <strong className="text-white">18 e 19 de novembro de 2026</strong> — Brasília/DF. Reunindo
            especialistas da América Latina e do Caribe para discutir as doenças que mais afetam a população
            negra e as inovações tecnológicas que podem transformar o cuidado em saúde.
          </p>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-earth-900 mb-3">Programação em 2 dias</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-earth-50 p-4 border border-earth-100">
                <div className="text-xs font-bold uppercase tracking-wide text-brasa-500 mb-1">Dia 1 — 18/11</div>
                <p className="text-sm text-earth-700 font-medium mb-1">Profissionais, pesquisadores e estudantes</p>
                <p className="text-xs text-earth-500">
                  ~150 participantes de Medicina, Enfermagem e áreas afins — apresentação técnica da
                  plataforma e painel técnico de discussão sobre funcionalidades, contribuições e
                  possibilidades de aperfeiçoamento do app.
                </p>
              </div>
              <div className="rounded-lg bg-earth-50 p-4 border border-earth-100">
                <div className="text-xs font-bold uppercase tracking-wide text-brasa-500 mb-1">Dia 2 — 19/11</div>
                <p className="text-sm text-earth-700 font-medium mb-1">Comunidade e beneficiários</p>
                <p className="text-xs text-earth-500">
                  ~150 pessoas representando a população local — estação interativa com tablets e sessão
                  prática (hands-on) de experimentação do aplicativo.
                </p>
              </div>
            </div>
            <p className="text-xs text-earth-400 mt-3">Total estimado: 300 participantes.</p>
          </div>

          <div>
            <h3 className="font-bold text-earth-900 mb-3">Eixos temáticos</h3>
            <ul className="space-y-2 text-sm text-earth-600 mb-5">
              <li className="flex gap-2"><span className="text-brasa-500">•</span> Doenças que mais afetam a população negra</li>
              <li className="flex gap-2"><span className="text-brasa-500">•</span> Soluções tecnológicas para equidade em saúde</li>
              <li className="flex gap-2"><span className="text-brasa-500">•</span> Prevenção, cuidado e políticas públicas</li>
            </ul>
            <h3 className="font-bold text-earth-900 mb-2">Painel técnico</h3>
            <p className="text-sm text-earth-600">
              Espaço de apresentação do aplicativo e da cartilha científica, com mesa de discussão sobre
              funcionalidades, contribuições e caminhos de aperfeiçoamento da plataforma — reunindo
              profissionais de saúde, pesquisadores, desenvolvedores de tecnologia, formuladores de
              políticas e membros da comunidade.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="text-[11px] text-earth-400 border-t border-earth-100 pt-4">
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
