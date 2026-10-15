import type React from 'react';

// Ícones autorais para as 9 categorias-mãe da Biblioteca de Saúde / DiseaseDetail.
// Mesma linguagem visual de ThemeIcons.tsx (disco de fundo + 1-3 traços/formas
// geométricas na paleta folha/ouro/barro/palha) — nunca figurativos: nenhum órgão,
// símbolo médico literal (coração, DNA, fita, pulmão) ou representação direta de
// orixá. Substituem os emojis herdados em HealthLibrary.tsx e DiseaseDetail.tsx.
interface CategoryIconProps {
  id: string;
  size?: number;
  className?: string;
}

const FOLHA = '#3d6e51';
const FOLHA_SOFT = '#a4c3af';
const OURO = '#c9a04b';
const OURO_DEEP = '#957237';
const BARRO = '#94533a';
const PALHA = '#e5dcc9';

type IconProps = { size: number; className: string };

function CardiovascularesIcon({ size, className }: IconProps) {
  // Cardiovasculares — traço de pulso/ritmo, abstrato (nunca um coração literal).
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path
        d="M5 17 L11 17 L13.5 10 L17 23 L19.5 17 L27 17"
        stroke={BARRO}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetabolicasIcon({ size, className }: IconProps) {
  // Metabólicas — três círculos em equilíbrio instável, sem gota/sangue literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <circle cx="11" cy="19" r="3.4" fill={FOLHA} opacity="0.85" />
      <circle cx="19" cy="12.5" r="4.4" fill={OURO} opacity="0.9" />
      <circle cx="22.5" cy="21" r="2.2" fill={BARRO} opacity="0.85" />
    </svg>
  );
}

function SaudeMentalIcon({ size, className }: IconProps) {
  // Saúde Mental — arcos concêntricos irradiando de um ponto, sem cérebro literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <circle cx="16" cy="16" r="2.2" fill={OURO_DEEP} />
      <path d="M16 9 A 7 7 0 0 1 23 16" stroke={FOLHA} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M9 16 A 7 7 0 0 1 16 9" stroke={FOLHA} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M16 23 A 10.5 10.5 0 0 0 26 15.3" stroke={BARRO} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function RespiratoriasIcon({ size, className }: IconProps) {
  // Respiratórias — duas ondas de fluxo (inspiração/expiração), sem pulmão literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path d="M6 13 C 10 8, 14 18, 18 13 C 22 8, 26 18, 28 15" stroke={FOLHA} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M6 20 C 10 15, 14 25, 18 20 C 22 15, 26 25, 28 22" stroke={OURO_DEEP} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function MulherNegraIcon({ size, className }: IconProps) {
  // Saúde da Mulher Negra — arco de proteção/acolhimento envolvendo um ponto central,
  // abstrato (sem corpo, útero ou símbolo de gênero literal).
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path d="M8 20 A 9 9 0 0 1 24 20" stroke={OURO} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M11 21.5 A 6 6 0 0 1 21 21.5" stroke={BARRO} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="16" cy="12" r="2.4" fill={FOLHA} />
    </svg>
  );
}

function RarasAutoimunesIcon({ size, className }: IconProps) {
  // Raras e Autoimunes — dois anéis entrelaçados (herança/condição rara), sem
  // dupla-hélice de DNA literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <circle cx="13" cy="16" r="6" stroke={FOLHA} strokeWidth="1.7" fill="none" opacity="0.85" />
      <circle cx="20" cy="16" r="6" stroke={OURO_DEEP} strokeWidth="1.7" fill="none" opacity="0.85" />
    </svg>
  );
}

function OncologicasIcon({ size, className }: IconProps) {
  // Oncológicas — arcos incompletos em camadas (vigilância/cuidado contínuo), sem
  // fita/laço literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path d="M16 6 A 10 10 0 1 1 6.6 12.8" stroke={BARRO} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M16 11 A 5 5 0 1 0 20.5 13.8" stroke={OURO} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function OutrasIcon({ size, className }: IconProps) {
  // Outras — três marcas geométricas soltas (diversidade de condições sem
  // categoria única), abstrato.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <rect x="8" y="8" width="6" height="6" rx="1.5" fill={FOLHA} opacity="0.85" transform="rotate(10 11 11)" />
      <circle cx="21" cy="12" r="3.2" fill={OURO} opacity="0.9" />
      <rect x="14" y="19" width="7" height="5" rx="1.5" fill={BARRO} opacity="0.8" transform="rotate(-8 17.5 21.5)" />
    </svg>
  );
}

function RenalIcon({ size, className }: IconProps) {
  // Renais e Genéticas — duas gotas/filtros aninhados, abstrato (sem rim/DNA literal).
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path d="M16 7 C 21 13, 23 17, 23 20.5 A 7 7 0 0 1 9 20.5 C 9 17, 11 13, 16 7 Z" stroke={FOLHA} strokeWidth="1.7" fill="none" opacity="0.85" />
      <path d="M16 13 C 19 16.5, 20 18.5, 20 20.5 A 4 4 0 0 1 12 20.5 C 12 18.5, 13 16.5, 16 13 Z" fill={OURO} opacity="0.75" />
    </svg>
  );
}

function SocioeconomicaContemporaneaIcon({ size, className }: IconProps) {
  // Saúde Mental e Socioeconômica Contemporânea — nós conectados (determinantes
  // sociais interligados), sem tela/celular literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <line x1="10" y1="21" x2="16" y2="10" stroke={OURO_DEEP} strokeWidth="1.4" opacity="0.8" />
      <line x1="16" y1="10" x2="22" y2="21" stroke={OURO_DEEP} strokeWidth="1.4" opacity="0.8" />
      <line x1="10" y1="21" x2="22" y2="21" stroke={OURO_DEEP} strokeWidth="1.4" opacity="0.8" />
      <circle cx="16" cy="10" r="2.6" fill={FOLHA} />
      <circle cx="10" cy="21" r="2.6" fill={BARRO} />
      <circle cx="22" cy="21" r="2.6" fill={FOLHA_SOFT} />
    </svg>
  );
}

const ICONS: Record<string, React.FC<IconProps>> = {
  cardiovasculares: CardiovascularesIcon,
  metabolicas: MetabolicasIcon,
  'saude-mental': SaudeMentalIcon,
  respiratorias: RespiratoriasIcon,
  'mulher-negra': MulherNegraIcon,
  'raras-autoimunes': RarasAutoimunesIcon,
  oncologicas: OncologicasIcon,
  outras: OutrasIcon,
  'socioeconomica-contemporanea': SocioeconomicaContemporaneaIcon,
  'renais-geneticas': RenalIcon,
};

export default function CategoryIcon({ id, size = 32, className = '' }: CategoryIconProps) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
