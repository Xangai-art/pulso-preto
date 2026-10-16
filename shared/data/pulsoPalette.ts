/**
 * PALETA OFICIAL "PULSO PRETO" — FONTE ÚNICA DE VERDADE (SSOT) PARA CÓDIGO
 *
 * A partir de PP3, esta é a única definição de cores da identidade oficial no
 * código. Componentes que precisam de um valor de cor em contextos que o Tailwind
 * NÃO alcança — atributos SVG (`fill`/`stroke`), props `color`, `backgroundImage`
 * inline e CSS puro — devem IMPORTAR daqui, nunca repetir o hex.
 *
 * Os valores espelham exatamente os tokens `pulso-*` do Tailwind
 * (site/tailwind.config.js e app/tailwind.config.js), extraídos por amostragem de
 * pixel direta da paleta oficial (00_Identidade.zip → CORES/PP_Paleta_Oficial_v1).
 *
 * REGRA: ao usar uma cor em className do Tailwind, prefira o token
 * (`text-pulso-verde`, `bg-pulso-dourado`…). Este módulo existe apenas para os
 * casos em que uma classe Tailwind não é possível. Se a paleta mudar, muda aqui
 * (e nos dois tailwind.config.js) — em um único lugar por camada.
 */

export const PULSO_PALETTE = {
  /** Verde Escuro #06201B — fundo principal, headers, textos fortes. */
  verdeEscuro: '#06201B',
  /** Verde Médio #1A5C3A — destaques, ícones, subtítulos. */
  verdeMedio: '#1A5C3A',
  /** Verde Accent #2DA864 — linha de pulso, links, CTAs verdes, acento/avanço. */
  verdeAccent: '#2DA864',
  /** Branco #FFFFFF. */
  branco: '#FFFFFF',
  /** Dourado #D4A84B — logo, botões, destaques, bordas, métrica/marco. */
  dourado: '#D4A84B',
  /** Dourado Claro #E8C05A — gradientes, brilhos, versões claras, ornamento. */
  douradoClaro: '#E8C05A',
  /** Marrom/Pele #8F4B21 — ilustrações, elementos humanos, risco/denúncia. */
  marrom: '#8F4B21',
  /** Off-white/Creme #F7F5F0 — fundos claros de posts e cartilhas, base editorial. */
  creme: '#F7F5F0',
} as const;

export type PulsoPaletteKey = keyof typeof PULSO_PALETTE;

/**
 * Aliases semânticos (papel visual) — preservam a intenção de design herdada
 * das variantes anteriores (GP0/PP1/PP2) mapeada para a paleta oficial:
 *   - folha (avanço/cura)          → verdeAccent
 *   - barro (risco/disparidade)    → marrom
 *   - ouro  (meta/marco)           → dourado
 *   - palha (base editorial)       → creme
 *   - folha-deep (fundo escuro)    → verdeEscuro
 */
export const PULSO_SEMANTIC = {
  avanco: PULSO_PALETTE.verdeAccent,
  risco: PULSO_PALETTE.marrom,
  meta: PULSO_PALETTE.dourado,
  base: PULSO_PALETTE.creme,
  fundoEscuro: PULSO_PALETTE.verdeEscuro,
} as const;

export default PULSO_PALETTE;
