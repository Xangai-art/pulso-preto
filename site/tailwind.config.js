/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Recalibrado (era um roxo/lilás herdado do MVP original, sem relação com a
        // paleta Ìlera — sinalizado como inconsistente). Nova rampa derivada do matiz
        // de folha-500 (#3d6e51), mantendo as mesmas 10 chaves numéricas para não
        // quebrar nenhuma classe já usada no código (brand-50..brand-900 continuam
        // válidas em todo o site/app, agora coerentes com o sistema ancestral-cultural).
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
        // Paleta ancestral-cultural (adição não-disruptiva — não substitui brand/earth,
        // usada em elementos editoriais/ancestrais e no serviço-duro embutido na home).
        // Recalibrada a partir da referência de design "Ìlera" (V2/V3, cores em oklch()
        // com equivalência hex documentada) para maior precisão cromática, mantendo a
        // estrutura numérica de shades já usada no código (sem quebrar classes existentes).
        folha: {
          50: '#eef4ec',
          100: '#d7e6d1',
          300: '#a4c3af', // folha-soft (ref. Ìlera)
          500: '#3d6e51', // folha (ref. Ìlera)
          700: '#2c4f3c',
          900: '#213d34', // folha-deep (ref. Ìlera)
          deep: '#213d34',
          soft: '#a4c3af',
        },
        ouro: {
          300: '#e0c589',
          500: '#c9a04b', // ouro (ref. Ìlera)
          700: '#957237', // ouro-deep (ref. Ìlera)
          deep: '#957237',
        },
        palha: {
          50: '#f7f4ec',
          100: '#f4f0e6', // palha (ref. Ìlera) — background editorial padrão
          300: '#e5dcc9', // palha-deep (ref. Ìlera)
          500: '#c2a877',
          deep: '#e5dcc9',
        },
        barro: {
          100: '#f1ded3',
          300: '#c98a63',
          500: '#94533a', // barro (ref. Ìlera) — USO RESTRITO: ouvidoria/denúncia/alerta
          700: '#6b3620',
        },
        // Terracota/brasa — tom terroso adicional (pacote v4.3), usado em separadores
        // editoriais da página "Medicina Tradicional Brasileira" e no mapa de Regiões
        // de Saúde (regionColors.ts). Não substitui barro (que é USO RESTRITO para
        // ouvidoria/denúncia) — brasa é de uso livre decorativo/editorial.
        brasa: {
          50: '#fbece6',
          300: '#e0876a',
          500: '#b8482e',
          700: '#7a2a1a',
        },
        // Novos tokens da referência Ìlera (adição pura, sem uso prévio no código —
        // disponíveis para tratamento editorial: texto primário/secundário e divisores).
        tinta: {
          DEFAULT: '#2a2d2b',
          dim: '#5c605c',
        },
        linha: '#dcd6c9',
        // Paleta OFICIAL "Pulso Preto" — CORRIGIDA (Fase 3.2) a partir do arquivo
        // oficial do pacote de identidade de marca (00_Identidade.zip →
        // CORES/PP_Paleta_Oficial_v1.png/.pdf, "Paleta Oficial - Pulso Preto",
        // rodapé "Projeto Conectando Saúde e Inclusão · APRECIA · AECID").
        // Valores extraídos por amostragem de pixel direta da imagem oficial
        // (confirmados byte-a-byte, não estimados) — substituem os tons da
        // Fase 3.1 que tinham sido aproximados visualmente a partir de
        // screenshots de mockup, sem acesso ao arquivo de paleta oficial.
        //
        //   Verde Escuro  #06201B — fundo principal, headers, textos fortes
        //   Verde Médio   #1A5C3A — destaques, ícones, subtítulos
        //   Verde Accent  #2DA864 — linha de pulso, links, CTAs verdes
        //   Dourado       #D4A84B — logo "Preto", botões, destaques, bordas
        //   Dourado Claro #E8C05A — gradientes, brilhos, versões claras
        //   Marrom/Pele   #8F4B21 — ilustrações, elementos humanos (opcional)
        //   Off-white/Creme #F7F5F0 — fundos claros de posts e cartilhas
        //
        // Nota sobre `terracota`: a paleta oficial NÃO tem um tom terracota
        // separado — o papel visual que `terracota` cumpria nos componentes
        // PP1/PP2 (faixa de missão PP2, eyebrows, valores de estatística) é
        // coberto pelo tom "Marrom/Pele" oficial (#8F4B21), que é descritivamente
        // "um tom terroso avermelhado/terracota" (confirmado via análise visual
        // da paleta). `terracota` e `marrom` ficam, portanto, alias do MESMO
        // hex oficial — não há mais 2 tons terrosos distintos, apenas 1.
        //
        // Não substitui folha/ouro/palha/barro (paleta "Gente Preta" original,
        // preservada para a variante GP0) — convivem como namespaces distintos,
        // trocados em runtime pelo VariantSwitcher conforme a variante ativa.
        pulso: {
          verde: '#06201B',        // Verde Escuro (oficial) — fundo principal
          'verde-medio': '#1A5C3A', // Verde Médio (oficial) — destaques/ícones
          'verde-accent': '#2DA864', // Verde Accent (oficial) — linha de pulso/CTA
          creme: '#F7F5F0',        // Off-white/Creme (oficial, corrigido)
          dourado: '#D4A84B',      // Dourado (oficial, corrigido)
          'dourado-claro': '#E8C05A', // Dourado Claro (oficial)
          marrom: '#8F4B21',       // Marrom/Pele (oficial, corrigido)
          terracota: '#8F4B21',    // Alias de Marrom/Pele — ver nota acima
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // Tipografia oficial "Pulso Preto" (00_Identidade/FONTES/Tipografia.docx) —
        // usada apenas em componentes Pulso* (PP1/PP2), nunca na variante GP0.
        'pulso-display': ['"Hurme Geometric Sans 3"', 'system-ui', 'sans-serif'],
        'pulso-body': ['"Sans Serif Collection"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
