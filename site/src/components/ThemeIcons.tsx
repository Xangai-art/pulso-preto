import type React from 'react';

// Ícones autorais para os "Temas emergentes" (realidade brasileira contemporânea).
// Substituem os emojis herdados da categoria-mãe por grafismos geométricos e
// abstratos, na mesma linguagem visual dos ornamentos (Ornaments.tsx) — nunca
// figurativos, sempre construídos a partir da paleta folha/ouro/barro/palha.
interface ThemeIconProps {
  id: string;
  size?: number;
  className?: string;
}

const FOLHA = '#3d6e51';
const OURO = '#c9a04b';
const OURO_DEEP = '#957237';
const BARRO = '#94533a';
const PALHA = '#e5dcc9';

function OndasIcon({ size, className }: { size: number; className: string }) {
  // Ansiedade por uso irresponsável de redes sociais — sinal/onda que se
  // multiplica e satura, sem tela ou logotipo literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path d="M6 20 C 9 14, 12 22, 15 16 C 18 10, 21 18, 26 12" stroke={BARRO} strokeWidth="1.6" fill="none" opacity="0.85" />
      <path d="M6 24 C 9 20, 12 26, 15 22 C 18 18, 21 24, 26 20" stroke={OURO_DEEP} strokeWidth="1.6" fill="none" opacity="0.6" />
    </svg>
  );
}

function EspiralIcon({ size, className }: { size: number; className: string }) {
  // Vício em apostas — espiral descendente, ciclo que se aperta sobre si mesmo.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path
        d="M16 8 A 8 8 0 1 1 8 16 A 5.5 5.5 0 1 0 13.5 21.5 A 3 3 0 1 1 11 18.5"
        stroke={BARRO}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BalancaIcon({ size, className }: { size: number; className: string }) {
  // Disparidade de qualidade/pureza por classe e raça — duas colunas desiguais
  // sobre uma linha comum (mesma origem, tratamento desigual).
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <line x1="7" y1="23" x2="25" y2="23" stroke={OURO_DEEP} strokeWidth="1.4" />
      <rect x="9" y="12" width="4" height="11" fill={FOLHA} opacity="0.85" />
      <rect x="19" y="17" width="4" height="6" fill={BARRO} opacity="0.85" />
    </svg>
  );
}

function FraturaIcon({ size, className }: { size: number; className: string }) {
  // Violência como resposta reativa — forma fraturada, linha de ruptura, sem
  // representar violência de forma literal.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <path d="M11 8 L 17 16 L 11 17 L 20 24" stroke={BARRO} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 9 L 15 16" stroke={OURO_DEEP} strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

function ColunaIcon({ size, className }: { size: number; className: string }) {
  // Falta de educação financeira — colunas em queda, ciclo de vulnerabilidade.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={PALHA} opacity="0.5" />
      <rect x="8" y="10" width="3.4" height="14" fill={FOLHA} opacity="0.85" />
      <rect x="14.3" y="14" width="3.4" height="10" fill={OURO} opacity="0.9" />
      <rect x="20.6" y="18" width="3.4" height="6" fill={BARRO} opacity="0.85" />
    </svg>
  );
}

const ICONS: Record<string, React.FC<{ size: number; className: string }>> = {
  'ansiedade-redes-sociais': OndasIcon,
  'vicio-apostas': EspiralIcon,
  'abuso-substancias-disparidade': BalancaIcon,
  'violencia-reativa': FraturaIcon,
  'falta-educacao-financeira': ColunaIcon,
};

export default function ThemeIcon({ id, size = 28, className = '' }: ThemeIconProps) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
