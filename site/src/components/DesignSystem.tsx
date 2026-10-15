// Documentação pública do sistema de design "ancestral-cultural" (ref. Ìlera V2/V3).
// Publicado na página de Arquitetura para transparência de decisões de design,
// no mesmo espírito de "confiança > sofisticação técnica" da Parte 4 do relatório.
import { LeafMark, PalhaLine, ContasRing } from './Ornaments';
import Logo from './Logo';
import { useAppearance } from '@shared/context/AppearanceContext';
import ThemeIcon from './ThemeIcons';

const paleta = [
  {
    name: 'Folha profundo',
    oklch: 'oklch(.30 .06 155)',
    hex: '#213d34',
    swatch: 'bg-folha-900',
    text: 'text-palha-100',
    uso: 'Institucional. Header, hero de denúncia, tipografia primária dark.',
  },
  {
    name: 'Folha',
    oklch: 'oklch(.44 .09 150)',
    hex: '#3d6e51',
    swatch: 'bg-folha-500',
    text: 'text-white',
    uso: 'Acento principal — CTA secundário, tags, links.',
  },
  {
    name: 'Folha soft',
    oklch: 'oklch(.72 .05 150)',
    hex: '#a4c3af',
    swatch: 'bg-folha-300',
    text: 'text-earth-900',
    uso: 'Fundos de destaque, ilustração de dados.',
  },
  {
    name: 'Ouro',
    oklch: 'oklch(.74 .13 82)',
    hex: '#c9a04b',
    swatch: 'bg-ouro-500',
    text: 'text-earth-900',
    uso: 'Luz. Callout. Métrica. Nunca luxo — sempre cura.',
  },
  {
    name: 'Ouro envelhecido',
    oklch: 'oklch(.58 .13 68)',
    hex: '#957237',
    swatch: 'bg-ouro-700',
    text: 'text-white',
    uso: 'Ornamento — palha, listras, subtags.',
  },
  {
    name: 'Barro',
    oklch: 'oklch(.48 .13 40)',
    hex: '#94533a',
    swatch: 'bg-barro-500',
    text: 'text-white',
    uso: 'Uso restrito: alertas de denúncia, ouvidoria, dado crítico.',
  },
  {
    name: 'Palha',
    oklch: 'oklch(.96 .02 85)',
    hex: '#f4f0e6',
    swatch: 'bg-palha-100',
    text: 'text-earth-900',
    uso: 'Base editorial. Palha da costa — evocação a Obaluaê.',
    outline: true,
  },
];

export default function DesignSystem() {
  const { brand } = useAppearance();
  return (
    <div className="not-prose space-y-16 mb-16">
      {/* 1. Introdução */}
      <div>
        <span className="eyebrow text-brand-600">Documentação pública</span>
        <h2 className="text-xl font-bold text-earth-900 mt-1">Sistema de design</h2>
        <p className="text-earth-600 text-sm mt-2 max-w-2xl">
          A linguagem visual "cultural-ancestral" (V2/V3) adotada por {brand.name} foi calibrada a partir da
          referência de design <strong>Ìlera</strong> — proposta de adaptação brasileira do BlackDoctor.org.
          Documentamos aqui a paleta, tipografia, ornamentos e tom de voz para manter consistência e
          transparência de decisão, sem adotar o nome ou referências religiosas explícitas da proposta
          original (ver nota de cautela abaixo).
        </p>
      </div>

      {/* 2. Paleta */}
      <div>
        <h3 className="font-bold text-earth-900 mb-4">Paleta</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {paleta.map((c) => (
            <div
              key={c.name}
              className={`rounded-xl p-4 ${c.swatch} ${c.text} ${c.outline ? 'border border-earth-200' : ''}`}
            >
              <div className="font-semibold text-sm mb-1">{c.name}</div>
              <div className="text-[10px] font-mono opacity-80 mb-2">
                {c.oklch}
                <br />
                {c.hex}
              </div>
              <p className="text-xs opacity-90 leading-snug">{c.uso}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tipografia */}
      <div>
        <h3 className="font-bold text-earth-900 mb-4">Tipografia</h3>
        <div className="rounded-xl border border-earth-200 grid sm:grid-cols-2 gap-8 p-6 bg-white">
          <div>
            <span className="eyebrow text-earth-500">Serifa editorial</span>
            <div className="font-editorial text-5xl text-folha-900 mt-2 mb-3">Newsreader</div>
            <p className="text-sm text-earth-600 mb-4">
              Serifa editorial contemporânea com peso e alma. Feita para leitura longa. Aceita itálico
              expressivo em manchetes.
            </p>
            <div className="space-y-2 text-earth-800">
              <div className="font-editorial text-sm">14 px — Corpo de matéria — parágrafo padrão.</div>
              <div className="font-editorial italic text-lg">22 px — Lede editorial e citações destacadas.</div>
              <div className="font-editorial text-2xl">30 px — Título de bloco — canais, seções.</div>
              <div className="font-editorial text-4xl leading-tight">56 px — Manchete de reportagem.</div>
            </div>
          </div>
          <div>
            <span className="eyebrow text-earth-500">Sans humanista</span>
            <div className="font-sans text-5xl font-semibold text-earth-900 mt-2 mb-3">Inter</div>
            <p className="text-sm text-earth-600 mb-4">
              Sans neutra, altamente legível em tela. Serve interface, navegação, botões, dados. Nunca
              compete com a serifa — dá suporte.
            </p>
            <div className="space-y-2 text-earth-800">
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
        <h3 className="font-bold text-earth-900 mb-1">Ornamentos discretos</h3>
        <p className="text-sm text-earth-600 mb-4 max-w-2xl">
          Três grafismos, todos geométricos e abstratos. Funcionam como divisores, marcadores de seção e
          assinatura visual — nunca figurativos.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-earth-200 p-6 bg-white flex flex-col items-center text-center">
            <LeafMark size={40} className="mb-4" />
            <div className="font-editorial text-lg mb-1">Folha</div>
            <span className="eyebrow text-earth-400 mb-2">Fitoterapia</span>
            <p className="text-xs text-earth-600">
              Marcador da coluna de fitoterapia com evidência ("Folhas com Ciência") e assinatura sutil no
              logo secundário.
            </p>
          </div>
          <div className="rounded-xl border border-earth-200 p-6 bg-white flex flex-col items-center text-center">
            <PalhaLine width={90} className="mb-4" />
            <div className="font-editorial text-lg mb-1">Palha</div>
            <span className="eyebrow text-earth-400 mb-2">Divisor · cura, cuidado</span>
            <p className="text-xs text-earth-600">
              Divisor entre seções. Assinatura de blocos de conteúdo científico. Nunca decoração — sempre
              transição.
            </p>
          </div>
          <div className="rounded-xl border border-earth-200 p-6 bg-white flex flex-col items-center text-center">
            <ContasRing size={44} className="mb-4" />
            <div className="font-editorial text-lg mb-1">Contas</div>
            <span className="eyebrow text-earth-400 mb-2">Guias · comunidade</span>
            <p className="text-xs text-earth-600">
              Marca de comunidade. Círculo fechado — evoca as redes de apoio que sustentam o cuidado
              coletivo.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Tom de voz */}
      <div>
        <h3 className="font-bold text-earth-900 mb-1">Tom de voz — institucional com calor comunitário</h3>
        <p className="text-sm text-earth-600 mb-4 max-w-2xl">
          Híbrido: nomeia o racismo com todas as letras (não é "disparidade", é <em>racismo institucional</em>)
          e ao mesmo tempo trata a leitora como parte da comunidade. Nunca acadêmica fria. Nunca gíria forçada.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-earth-200 p-5 bg-white">
            <span className="eyebrow text-barro-500">— Antes · genérico</span>
            <p className="font-editorial text-lg mt-3 text-earth-800">
              "Existem disparidades raciais significativas na saúde materna no Brasil que precisam ser
              endereçadas por políticas públicas."
            </p>
          </div>
          <div className="rounded-xl border border-folha-300 p-5 bg-folha-50">
            <span className="eyebrow text-folha-700">— Depois · {brand.name}</span>
            <p className="font-editorial text-lg mt-3 text-folha-900">
              "Mulheres negras têm de 2 a 3 vezes mais risco de morte materna do que mulheres brancas — mesmo
              com a mesma renda e escolaridade. É racismo institucional, não coincidência. E é reversível."
            </p>
          </div>
        </div>
        <p className="text-[11px] text-earth-400 mt-3">
          Estatística verificada na Base Científica (ver Biblioteca de Saúde → Saúde da Mulher Negra →
          Mortalidade Materna).
        </p>
      </div>

      {/* 6. Marca */}
      <div>
        <h3 className="font-bold text-earth-900 mb-1">Marca</h3>
        <p className="text-sm text-earth-600 mb-4 max-w-2xl">
          Composição de dois grafismos apenas (regra Ìlera: nunca os 3 juntos) — folha central
          (Ossaim, cura) sobre anel de contas (Obaluaê, proteção comunitária). Abstrata, sem
          figuração de orixá e sem texto religioso explícito.
        </p>
        <div className="rounded-xl border border-earth-200 bg-white p-6 flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Logo size={64} />
            <span className="text-[11px] text-earth-500">Sobre fundo claro</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-earth-900 rounded-xl px-6 py-4">
            <Logo size={64} monochrome />
            <span className="text-[11px] text-earth-300">Sobre fundo escuro (rodapé)</span>
          </div>
        </div>
      </div>

      {/* 7. Ícones de temas emergentes */}
      <div>
        <h3 className="font-bold text-earth-900 mb-1">Ícones — temas emergentes</h3>
        <p className="text-sm text-earth-600 mb-4 max-w-2xl">
          Substituem os emojis herdados da categoria-mãe: grafismos autorais, geométricos,
          construídos com a mesma paleta dos ornamentos — cada um representa o determinante
          social do tema sem ilustrá-lo de forma literal.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {[
            ['ansiedade-redes-sociais', 'Redes sociais'],
            ['vicio-apostas', 'Apostas'],
            ['abuso-substancias-disparidade', 'Disparidade'],
            ['violencia-reativa', 'Violência reativa'],
            ['falta-educacao-financeira', 'Educação financeira'],
          ].map(([id, label]) => (
            <div key={id} className="rounded-xl border border-earth-200 bg-white p-4 flex flex-col items-center text-center gap-2">
              <ThemeIcon id={id} size={32} />
              <span className="text-[11px] text-earth-500 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nota de cautela */}
      <div className="rounded-xl border border-ouro-300 bg-palha-100 p-5 text-sm text-earth-700">
        <strong className="text-earth-900">Nota de cautela editorial:</strong> a referência Ìlera evoca,
        estruturalmente, Obaluaê (palha) e Ossaim (folha) — nunca de forma figurativa e sempre restrita à
        paleta e ao ornamento. Por decisão deste piloto, o site não adota o nome "Ìlera" nem menciona
        orixás ou terreiros específicos, seguindo a própria recomendação da proposta de design de validar
        esses pontos com sacerdotes de matriz africana e coletivos parceiros antes de qualquer uso explícito.
      </div>
    </div>
  );
}
