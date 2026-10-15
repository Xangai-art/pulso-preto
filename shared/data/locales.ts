/**
 * LOCALES — Camada de Idioma (i18n mínimo para o teste da arquitetura CEOS)
 *
 * Fase 3 testa a arquitetura combinando 3 variantes de marca/design (GP0/PP1/PP2)
 * com 2 idiomas (PT/ES), ambos trocáveis em runtime por um único seletor —
 * sem rebuild/redeploy. Esta camada é deliberadamente pequena (dicionário plano
 * de chave → texto) para validar o mecanismo; a estrutura comporta crescimento
 * futuro (EN e outros) sem mudança de formato.
 *
 * REGRA: Textos institucionais (nome, tagline) continuam vindo do Brand Canon,
 * não são duplicados aqui. Este dicionário cobre apenas strings de INTERFACE
 * (botões, rótulos, microcopy) que mudam por idioma.
 */

export type LocaleId = 'pt' | 'es';

export const DEFAULT_LOCALE: LocaleId = 'pt';

export const SUPPORTED_LOCALES: { id: LocaleId; label: string; flag: string }[] = [
  { id: 'pt', label: 'Português', flag: '🇧🇷' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
];

type Dictionary = Record<string, string>;

export const TRANSLATIONS: Record<LocaleId, Dictionary> = {
  pt: {
    // Seletor de aparência (variante + idioma)
    'switcher.variant.label': 'Versão',
    'switcher.locale.label': 'Idioma',
    'switcher.title': 'Aparência',
    'switcher.description': 'Teste de arquitetura CEOS — troque marca/design e idioma sem recarregar a página.',
    'switcher.close': 'Fechar',

    // CTAs por variante
    'home.cta.primary.original': 'Baixar o App Sentinela',
    'home.cta.secondary.original': 'Explorar Biblioteca de Saúde',
    'home.cta.primary.pp1': 'Cuide-se',
    'home.cta.secondary.pp1': 'Explorar Biblioteca de Saúde',
    'home.cta.primary.pp2': 'Acesse serviços SUS',
    'home.cta.secondary.pp2': 'Baixar o App Sentinela',

    // Home — textos gerais reaproveitados entre variantes
    'home.hero.eyebrow': 'Sentinela de saúde da população negra',
    'home.hero.headline.part1': 'Conhecimento que transforma',
    'home.hero.headline.highlight': 'políticas',
    'home.hero.headline.part2': 'Sua saúde, sua voz, sua comunidade.',
    'home.hero.caption': 'O que é o {brand}, o que ele oferece e por que isso importa para a sociedade.',
    'home.news.eyebrow': 'Atualizações',
    'home.news.title': 'Últimas notícias',
    'home.news.cta': 'Ver todas as notícias →',

    // Baixe o App — botão/QR Code reaproveitado em Header/Footer de TODAS as
    // variantes (GP0/PP1/PP2), sempre apontando para /baixar (ver AppAccess.tsx).
    'app.download.cta': 'Baixe o App',
    'app.download.caption': 'Escaneie o QR Code ou acesse pelo navegador do celular.',

    // Disease detail — rótulos de audiência
    'disease.audience.medico': 'Médicos e pesquisadores',
    'disease.audience.enfermeiro': 'Enfermeiros e técnicos',
    'disease.audience.usuario': 'Usuários',
    'disease.audience.description.medico': 'Conteúdo técnico-científico: fisiopatologia, diagnóstico diferencial, condutas e evidência.',
    'disease.audience.description.enfermeiro': 'Conteúdo clínico intermediário: triagem, manejo de crises, cuidado continuado e orientação ao paciente.',
    'disease.audience.description.usuario': 'Linguagem acessível: o que é, sinais de alerta, cuidados do dia a dia e onde buscar ajuda no SUS.',
  },

  es: {
    'switcher.variant.label': 'Versión',
    'switcher.locale.label': 'Idioma',
    'switcher.title': 'Apariencia',
    'switcher.description': 'Prueba de arquitectura CEOS — cambie marca/diseño e idioma sin recargar la página.',
    'switcher.close': 'Cerrar',

    'home.cta.primary.original': 'Descargar la App Centinela',
    'home.cta.secondary.original': 'Explorar Biblioteca de Salud',
    'home.cta.primary.pp1': 'Cuídate',
    'home.cta.secondary.pp1': 'Explorar Biblioteca de Salud',
    'home.cta.primary.pp2': 'Accede a servicios del SUS',
    'home.cta.secondary.pp2': 'Descargar la App Centinela',

    'home.hero.eyebrow': 'Centinela de salud de la población negra',
    'home.hero.headline.part1': 'Conocimiento que transforma',
    'home.hero.headline.highlight': 'políticas',
    'home.hero.headline.part2': 'Tu salud, tu voz, tu comunidad.',
    'home.hero.caption': 'Qué es {brand}, qué ofrece y por qué esto importa para la sociedad.',
    'home.news.eyebrow': 'Actualizaciones',
    'home.news.title': 'Últimas noticias',
    'home.news.cta': 'Ver todas las noticias →',

    'app.download.cta': 'Descarga la App',
    'app.download.caption': 'Escanea el código QR o accede desde el navegador del móvil.',

    'disease.audience.medico': 'Médicos e investigadores',
    'disease.audience.enfermeiro': 'Enfermeros y técnicos',
    'disease.audience.usuario': 'Usuarios',
    'disease.audience.description.medico': 'Contenido técnico-científico: fisiopatología, diagnóstico diferencial, conductas y evidencia.',
    'disease.audience.description.enfermeiro': 'Contenido clínico intermedio: triaje, manejo de crisis, cuidado continuo y orientación al paciente.',
    'disease.audience.description.usuario': 'Lenguaje accesible: qué es, señales de alerta, cuidados diarios y dónde buscar ayuda en el SUS.',
  },
};

export function translate(locale: LocaleId, key: string, vars?: Record<string, string>): string {
  const dict = TRANSLATIONS[locale] || TRANSLATIONS[DEFAULT_LOCALE];
  let text = dict[key] ?? TRANSLATIONS[DEFAULT_LOCALE][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
