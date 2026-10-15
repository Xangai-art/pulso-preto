/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Recalibrado para espelhar site/tailwind.config.js — era um roxo/lilás do MVP
        // original, inconsistente com a paleta Ìlera. Nova rampa derivada do matiz de
        // folha-500, mesmas 10 chaves numéricas.
        brand: {
          50: '#f1f6f3',
          100: '#dfece4',
          200: '#bddbc9',
          300: '#96c5a9',
          400: '#62a87e',
          500: '#3d6e51',
          600: '#325a43',
          700: '#254332',
          800: '#192c21',
          900: '#0e1912',
        },
        earth: {
          50: '#fbf7f2',
          100: '#f2e6d8',
          200: '#e2c6a3',
          300: '#cd9f6f',
          400: '#b8794a',
          500: '#96562f',
          600: '#7a4326',
          700: '#5f351f',
          800: '#452718',
          900: '#2b170e',
        },
        // Paleta ancestral-cultural (adição não-disruptiva, espelhando site/) —
        // usada para o tratamento sóbrio dos temas emergentes ("Atual").
        // Recalibrada a partir da referência de design "Ìlera" (V2/V3) — ver site/tailwind.config.js.
        folha: {
          50: '#eef4ec',
          100: '#d7e6d1',
          300: '#a4c3af',
          500: '#3d6e51',
          700: '#2c4f3c',
          900: '#213d34',
          deep: '#213d34',
          soft: '#a4c3af',
        },
        ouro: {
          300: '#e0c589',
          500: '#c9a04b',
          700: '#957237',
          deep: '#957237',
        },
        palha: {
          50: '#f7f4ec',
          100: '#f4f0e6',
          300: '#e5dcc9',
          500: '#c2a877',
          deep: '#e5dcc9',
        },
        barro: {
          100: '#f1ded3',
          300: '#c98a63',
          500: '#94533a',
          700: '#6b3620',
        },
        tinta: {
          DEFAULT: '#2a2d2b',
          dim: '#5c605c',
        },
        linha: '#dcd6c9',
        // Paleta OFICIAL "Pulso Preto" — CORRIGIDA (Fase 3.2), espelha
        // site/tailwind.config.js (ver comentário lá para contexto completo
        // sobre a fonte oficial e a fusão terracota/marrom em um único hex).
        pulso: {
          verde: '#06201B',
          'verde-medio': '#1A5C3A',
          'verde-accent': '#2DA864',
          creme: '#F7F5F0',
          dourado: '#D4A84B',
          'dourado-claro': '#E8C05A',
          marrom: '#8F4B21',
          terracota: '#8F4B21',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // Tipografia oficial "Pulso Preto" — ver site/tailwind.config.js.
        'pulso-display': ['"Hurme Geometric Sans 3"', 'system-ui', 'sans-serif'],
        'pulso-body': ['"Sans Serif Collection"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
