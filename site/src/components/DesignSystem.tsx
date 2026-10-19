// Documentação pública do sistema de design da identidade OFICIAL "Pulso Preto"
// (PP3 — identidade única de produção, SSOT). Publicado na página de Arquitetura
// para transparência de decisões de design, no mesmo espírito de "confiança >
// sofisticação técnica" da Parte 4 do relatório.
//
// A paleta abaixo espelha exatamente shared/data/pulsoPalette.ts (fonte única para
// código) e os tokens `pulso-*` do Tailwind — extraídos por amostragem de pixel da
// paleta oficial (00_Identidade.zip → CORES/PP_Paleta_Oficial_v1).
import { LeafMark, PalhaLine, ContasRing } from './Ornaments';
import Logo from './Logo';
import { useAppearance } from '@shared/context/AppearanceContext';
import ThemeIcon from './ThemeIcons';

const paleta = [
  {
    name: 'Verde Escuro',
    hex: '#06201B',
    swatch: 'bg-pulso-verde',
    text: 'text-pulso-creme',
    uso: 'Institucional. Header, rodapé, heros, tipografia primária sobre fundo escuro.',
  },
  {
    name: 'Verde Médio',
    hex: '#1A5C3A',
    swatch: 'bg-pulso-verde-medio',
    text: 'text-pulso-creme',
    uso: 'Destaques, ícones, subtítulos e estados de avanço.',
  },
  {
    name: 'Verde Accent',
    hex: '#2DA864',
    swatch: 'bg-pulso-verde-accent',
    text: 'text-white',
    uso: 'Acento principal — linha de pulso, links, CTA secundário, tags.',
  },
  {
    name: 'Dourado',
    hex: '#D4A84B',
    swatch: 'bg-pulso-dourado',
    text: 'text-pulso-verde',
    uso: 'Luz. Callout, métrica, marco. Botões de destaque, bordas. Nunca luxo — sempre cura.',
  },
  {
    name: 'Dourado Claro',
    hex: '#E8C05A',
    swatch: 'bg-pulso-dourado-claro',
    text: 'text-pulso-verde',
    uso: 'Gradientes, brilhos, ornamentos (palha, listras) e versões claras do dourado.',
  },
  {
    name: 'Marrom / Pele',
    hex: '#8F4B21',
    swatch: 'bg-pulso-marrom',
    text: 'text-white',
    uso: 'Ilustrações e elementos humanos. Uso restrito: risco, disparidade, alerta de denúncia.',
  },
  {
    name: 'Off-white / Creme',
    hex: '#F7F5F0',
    swatch: 'bg-pulso-creme',
    text: 'text-pulso-verde',
    uso: 'Base editorial. Fundos claros de posts e cartilhas.',
    outline: true,
  },
];

export default function DesignSystem() {
  const { brand } = useAppearance();
  return (
    <div className="not-prose space-y-16 mb-16">
      {/* 1. Introdução */}
      <div>
        <span className="eyebrow text-pulso-verde-accent">Documentação pública</span>
        <h2 className="text-xl font-bold text-pulso-verde mt-1">Sistema de design</h2>
        <p className="text-pulso-marrom text-sm mt-2 max-w-2xl">
          A identidade visual de {brand.name} é única e oficial: paleta, tipografia, ornamentos e tom de voz
          derivam do pacote de identidade de marca (paleta oficial, tipografia Hurme Geometric Sans 3 + Sans
          Serif Collection). Documentamos aqui esses elementos para manter consistência e transparência de
          decisão — a mesma paleta usada em código em <code>shared/data/pulsoPalette.ts</code> (fonte única).
        </p>
      </div>

      {/* 2. Paleta */}
      <div>
        <h3 className="font-bold text-pulso-verde mb-4">Paleta</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {paleta.map((c) => (
            <div
              key={c.name}
              className={`rounded-xl p-4 ${c.swatch} ${c.text} ${c.outline ? 'border border-pulso-dourado/25' : ''}`}
            >
              <div className="font-semibold text-sm mb-1">{c.name}</div>
              <div className="text-[10px] font-mono opacity-80 mb-2">{c.hex}</div>
              <p className="text-xs opacity-90 leading-snug">{c.uso}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tipografia */}
      <div>
        <h3 className="font-bold text-pulso-verde mb-4">Tipografia</h3>
        <div className="rounded-xl border border-pulso-dourado/25 grid sm:grid-cols-2 gap-8 p-6 bg-white">
          <div>
            <span className="eyebrow text-pulso-marrom/70">Display oficial</span>
            <div className="font-pulso-display text-5xl text-pulso-verde mt-2 mb-3">Hurme 3</div>
            <p className="text-sm text-pulso-marrom mb-4">
              Hurme Geometric Sans 3 — geométrica humanista, usada em títulos, marca e destaques. É a
              tipografia display oficial da identidade.
            </p>
            <div className="space-y-2 text-pulso-verde font-pulso-display">
              <div className="text-sm">14 px — Corpo de apoio — parágrafo padrão.</div>
              <div className="text-lg">22 px — Lede e citações destacadas.</div>
              <div className="text-2xl">30 px — Título de bloco — canais, seções.</div>
              <div className="text-4xl leading-tight">56 px — Manchete.</div>
            </div>
          </div>
          <div>
            <span className="eyebrow text-pulso-marrom/70">Corpo oficial</span>
            <div className="font-pulso-body text-5xl font-semibold text-pulso-verde mt-2 mb-3">Sans Serif</div>
            <p className="text-sm text-pulso-marrom mb-4">
              Sans Serif Collection — fonte secundária para corpo, legendas e interface. Serve navegação,
              botões e dados. Nunca compete com o display — dá suporte.
            </p>
            <div className="space-y-2 text-pulso-verde font-pulso-body">
              <div className="eyebrow">11 px — Tag · categoria · metadata</div>
              <div className="text-[13px]">13 px — Metadata, autoria, botões secundários.</div>
              <div className="text-sm font-medium">15 px — Nav principal e labels de UI.</div>
              <div className="text-lg font-semibold">18 px — Botões primários e textos ativos.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ornamentos */}
      <div>
        <h3 className="font-bold text-pulso-verde mb-1">Ornamentos discretos</h3>
        <p className="text-sm text-pulso-marrom mb-4 max-w-2xl">
          Três grafismos, todos geométricos e abstratos, construídos com a paleta oficial. Funcionam como
          divisores, marcadores de seção e assinatura visual — nunca figurativos.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-pulso-dourado/25 p-6 bg-white flex flex-col items-center text-center">
            <LeafMark size={40} className="mb-4" />
            <div className="font-pulso-display text-lg mb-1">Folha</div>
            <span className="eyebrow text-pulso-marrom/60 mb-2">Fitoterapia</span>
            <p className="text-xs text-pulso-marrom">
              Marcador da coluna de fitoterapia com evidência ("Folhas com Ciência") e assinatura sutil no
              logo secundário.
            </p>
          </div>
          <div className="rounded-xl border border-pulso-dourado/25 p-6 bg-white flex flex-col items-center text-center">
            <PalhaLine width={90} className="mb-4" />
            <div className="font-pulso-display text-lg mb-1">Palha</div>
            <span className="eyebrow text-pulso-marrom/60 mb-2">Divisor · cura, cuidado</span>
            <p className="text-xs text-pulso-marrom">
              Divisor entre seções. Assinatura de blocos de conteúdo científico. Nunca decoração — sempre
              transição.
            </p>
          </div>
          <div className="rounded-xl border border-pulso-dourado/25 p-6 bg-white flex flex-col items-center text-center">
            <ContasRing size={44} className="mb-4" />
            <div className="font-pulso-display text-lg mb-1">Contas</div>
            <span className="eyebrow text-pulso-marrom/60 mb-2">Guias · comunidade</span>
            <p className="text-xs text-pulso-marrom">
              Marca de comunidade. Círculo fechado — evoca as redes de apoio que sustentam o cuidado
              coletivo.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Tom de voz */}
      <div>
        <h3 className="font-bold text-pulso-verde mb-1">Tom de voz — institucional com calor comunitário</h3>
        <p className="text-sm text-pulso-marrom mb-4 max-w-2xl">
          Híbrido: nomeia o racismo com todas as letras (não é "disparidade", é <em>racismo institucional</em>)
          e ao mesmo tempo trata a leitora como parte da comunidade. Nunca acadêmica fria. Nunca gíria forçada.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-pulso-dourado/25 p-5 bg-white">
            <span className="eyebrow text-pulso-marrom">— Antes · genérico</span>
            <p className="font-pulso-display text-lg mt-3 text-pulso-verde">
              "Existem disparidades raciais significativas na saúde materna no Brasil que precisam ser
              endereçadas por políticas públicas."
            </p>
          </div>
          <div className="rounded-xl border border-pulso-verde-accent/40 p-5 bg-pulso-verde-medio/10">
            <span className="eyebrow text-pulso-verde-medio">— Depois · {brand.name}</span>
            <p className="font-pulso-display text-lg mt-3 text-pulso-verde">
              "Mulheres negras têm de 2 a 3 vezes mais risco de morte materna do que mulheres brancas — mesmo
              com a mesma renda e escolaridade. É racismo institucional, não coincidência. E é reversível."
            </p>
          </div>
        </div>
        <p className="text-[11px] text-pulso-marrom/60 mt-3">
          Estatística verificada na Base Científica (ver Biblioteca de Saúde → Saúde Materna →
          Mortalidade Materna).
        </p>
      </div>

      {/* 6. Marca */}
      <div>
        <h3 className="font-bold text-pulso-verde mb-1">Marca</h3>
        <p className="text-sm text-pulso-marrom mb-4 max-w-2xl">
          O ícone oficial — perfil de mulher negra, arco dourado e linha de pulso — acompanha o wordmark
          "Pulso Preto" em Hurme Geometric Sans 3. As cores do ícone são próprias da marca e não são
          recolocadas em monocromático.
        </p>
        <div className="rounded-xl border border-pulso-dourado/25 bg-white p-6 flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Logo size={64} />
            <span className="text-[11px] text-pulso-marrom/70">Sobre fundo claro</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-pulso-verde rounded-xl px-6 py-4">
            <Logo size={64} />
            <span className="text-[11px] text-pulso-dourado/40">Sobre fundo escuro (rodapé)</span>
          </div>
        </div>
      </div>

      {/* 7. Ícones de temas emergentes */}
      <div>
        <h3 className="font-bold text-pulso-verde mb-1">Ícones — temas emergentes</h3>
        <p className="text-sm text-pulso-marrom mb-4 max-w-2xl">
          Substituem os emojis herdados da categoria-mãe: grafismos autorais, geométricos,
          construídos com a mesma paleta dos ornamentos — cada um representa o determinante
          social do tema sem ilustrá-lo de forma literal.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ['nomofobia', 'Nomofobia'],
            ['ludopatia', 'Ludopatia'],
            ['abuso-substancia', 'Abuso de substância'],
            ['violencia-reativa', 'Violência reativa'],
          ].map(([id, label]) => (
            <div key={id} className="rounded-xl border border-pulso-dourado/25 bg-white p-4 flex flex-col items-center text-center gap-2">
              <ThemeIcon id={id} size={32} />
              <span className="text-[11px] text-pulso-marrom/70 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
