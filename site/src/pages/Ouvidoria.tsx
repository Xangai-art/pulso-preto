import { Link } from 'react-router-dom';
import { APP_URL } from '../config';

// OUVIDORIA — hard service promovido a rota própria (D7, Parte 5.5-E do
// MAPEAMENTO_ARQUITETURA). Absorve a antiga aba "Direito à saúde": relato de
// discriminação (espelha /denunciar do App Sentinela) + direitos + política
// nacional. D14: siglas só entre parênteses, depois da primeira menção por extenso.

const CANAIS = [
  {
    nome: 'Disque Saúde',
    contato: '136',
    descricao: 'Ouvidoria do Sistema Único de Saúde (SUS), do Ministério da Saúde. Ligação gratuita.',
    href: 'https://www.gov.br/saude/pt-br/canais-de-atendimento/ouvidoria-do-sus',
  },
  {
    nome: 'Ouvidoria-Geral do Distrito Federal',
    contato: '162',
    descricao: 'Reclamações e denúncias sobre serviços públicos do Distrito Federal, incluindo a Secretaria de Saúde.',
    href: 'https://www.ouvidoria.df.gov.br/',
  },
  {
    nome: 'Disque Direitos Humanos',
    contato: '100',
    descricao: 'Denúncias de violações de direitos humanos, incluindo discriminação racial. Funciona 24 horas.',
    href: 'https://www.gov.br/mdh/pt-br/disque100',
  },
];

const DIREITOS = [
  {
    titulo: 'Atendimento sem discriminação',
    texto:
      'Todo atendimento de saúde deve ser feito com respeito, sem distinção por raça, cor ou origem. Discriminação no atendimento pode ser relatada e investigada.',
  },
  {
    titulo: 'Política Nacional de Saúde Integral da População Negra',
    texto:
      'Instituída pela Portaria do Ministério da Saúde nº 992, de 2009, reconhece o racismo como fator que afeta a saúde e orienta o Sistema Único de Saúde (SUS) a promover equidade para a população negra.',
  },
  {
    titulo: 'Estatuto da Igualdade Racial',
    texto:
      'A Lei nº 12.288, de 2010, garante à população negra o acesso universal e igualitário ao Sistema Único de Saúde, com ações para reduzir as desigualdades.',
  },
  {
    titulo: 'Racismo é crime',
    texto:
      'A Lei nº 7.716, de 1989, define os crimes de racismo. Desde a Lei nº 14.532, de 2023, a injúria racial também é tratada como racismo: é inafiançável e não prescreve.',
  },
];

export default function Ouvidoria() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-4">
        <img src="/static/brand/elementos/icone-mao-balanca.png" alt="" aria-hidden="true" className="w-12 h-12 object-contain" />
        <h1 className="text-3xl font-bold text-pulso-verde">Ouvidoria</h1>
      </div>
      <p className="text-pulso-marrom mb-10 max-w-2xl">
        Sofreu discriminação em um atendimento de saúde? Você não está sozinha nem sozinho. Aqui você pode relatar o
        que aconteceu, conhecer seus direitos e encontrar os canais oficiais de denúncia.
      </p>

      {/* 1. Relatar */}
      <section id="relatar" className="rounded-2xl bg-pulso-verde text-pulso-creme p-6 sm:p-8 mb-12 scroll-mt-24">
        <span className="text-xs font-bold uppercase tracking-wider text-pulso-dourado">Relatar discriminação</span>
        <h2 className="font-pulso-display text-2xl font-bold mt-1 mb-3">Seu relato ajuda a mudar o atendimento</h2>
        <p className="text-sm text-pulso-creme/90 mb-5 max-w-2xl">
          Pelo App Sentinela você informa onde aconteceu e descreve o ocorrido com suas palavras. Você escolhe se quer
          ser contatada ou contatado para acompanhamento, ou se prefere que o relato fique anônimo e entre apenas nos
          dados agregados que mostram onde a discriminação se repete.
        </p>
        <a
          href={`${APP_URL}/denunciar`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-pulso-dourado text-pulso-verde px-6 py-3 font-bold uppercase text-sm tracking-wide hover:bg-pulso-creme transition-colors"
        >
          Relatar no App Sentinela →
        </a>
        <p className="text-xs text-pulso-creme/70 mt-4">
          O relato só é encaminhado com o seu consentimento, conforme a Lei Geral de Proteção de Dados (LGPD). Saiba
          mais em <Link to="/transparencia" className="underline hover:text-pulso-dourado-claro">Transparência e governança</Link>.
        </p>
      </section>

      {/* 2. Canais oficiais */}
      <section id="canais" className="mb-12 scroll-mt-24">
        <h2 className="text-xl font-bold text-pulso-verde mb-4">Canais oficiais de denúncia</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {CANAIS.map((c) => (
            <a
              key={c.nome}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-pulso-dourado/30 bg-white p-5 hover:border-pulso-verde-accent hover:shadow-md transition"
            >
              <div className="text-3xl font-bold text-pulso-verde-medio mb-1">{c.contato}</div>
              <div className="font-bold text-pulso-verde mb-1.5">{c.nome}</div>
              <p className="text-sm text-pulso-marrom/80">{c.descricao}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Direitos */}
      <section id="direitos" className="scroll-mt-24">
        <h2 className="text-xl font-bold text-pulso-verde mb-4">Seus direitos</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {DIREITOS.map((d) => (
            <div key={d.titulo} className="rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-5">
              <h3 className="font-bold text-pulso-verde mb-2">{d.titulo}</h3>
              <p className="text-sm text-pulso-marrom">{d.texto}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-pulso-marrom/80 mt-8">
          Precisa de atendimento? Encontre a unidade de saúde mais próxima na{' '}
          <Link to="/rede-sus" className="text-pulso-verde-accent font-medium hover:underline">Rede SUS</Link>.
        </p>
      </section>
      <div className="mt-10 rounded-xl border border-pulso-dourado/25 bg-pulso-creme p-6">
        <h2 className="font-bold text-pulso-verde mb-2">Ainda com dúvidas sobre seus direitos?</h2>
        <p className="text-sm text-pulso-marrom mb-3">
          Acompanhante no parto, raça/cor no cadastro, pesquisa clínica, proteção de dados e mais — em linguagem simples.
        </p>
        <Link to="/perguntas-frequentes#direitos" className="text-sm font-semibold text-pulso-verde-accent hover:underline">
          Ver perguntas frequentes sobre direitos →
        </Link>
      </div>
    </div>
  );
}
