// Ícones autorais para a faixa de atalhos ("Conheça sua saúde", "Encontre
// cuidado/atendimento", "Dados e Indicadores", "Seus Direitos", "Participe")
// e para o pulso/heartbeat das variantes Pulso Preto (PP1/PP2). Geométricos,
// construídos em traço único (stroke), coerentes com a identidade "pulso" —
// uma linha de ECG estilizada atravessa o ícone de "Conheça sua saúde"/coração.
import type React from 'react';
import type { FeatureIconId } from '../../../shared/data/variantContent';

function BookIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 7 C 10 5, 14 5, 16 7 L 16 25 C 14 23, 10 23, 6 25 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M26 7 C 22 5, 18 5, 16 7 L 16 25 C 18 23, 22 23, 26 25 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 28 C 10 20, 7 15.5, 7 11.5 C 7 6.8, 11 3.5, 16 3.5 C 21 3.5, 25 6.8, 25 11.5 C 25 15.5, 22 20, 16 28 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M11 12 L 14 12 L 15.5 9 L 17.5 15 L 19 12 L 21 12" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5" y="22" width="4.5" height="6" fill={color} opacity="0.85" />
      <rect x="13.5" y="15" width="4.5" height="13" fill={color} opacity="0.9" />
      <rect x="22" y="9" width="4.5" height="19" fill={color} />
    </svg>
  );
}

function PeopleIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="12" cy="11" r="4" fill="none" stroke={color} strokeWidth="1.8" />
      <circle cx="21" cy="13" r="3.2" fill="none" stroke={color} strokeWidth="1.6" opacity="0.8" />
      <path d="M5 26 C 5 20.5, 8.2 18 12 18 C 15.8 18 19 20.5, 19 26" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 26 C 18 21.5, 20.3 19.5, 23.2 19.5 C 26 19.5, 27.5 22, 27.5 26" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function HeartPulseIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 27 C 7 20.5, 4 15.5, 4 11.5 C 4 7.8, 7 5, 10.3 5 C 12.6 5, 14.7 6.3, 16 8.2 C 17.3 6.3, 19.4 5, 21.7 5 C 25 5, 28 7.8, 28 11.5 C 28 15.5, 25 20.5, 16 27 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M6 15 L 11 15 L 13.5 10.5 L 16.5 19 L 19 15 L 26 15" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 4 L 20 4 L 25 9 L 25 28 L 8 28 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M20 4 L 20 9 L 25 9" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 15 L 21 15 M 12 19 L 21 19 M 12 23 L 18 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<FeatureIconId, React.FC<{ size: number; color: string }>> = {
  book: BookIcon,
  location: LocationIcon,
  chart: ChartIcon,
  people: PeopleIcon,
  heart: HeartPulseIcon,
  document: DocumentIcon,
};

export default function PulsoIcon({
  id,
  size = 28,
  color = '#C9934B',
}: {
  id: FeatureIconId;
  size?: number;
  color?: string;
}) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <Icon size={size} color={color} />;
}

// Linha de ECG/heartbeat decorativa — assinatura visual "Pulso Preto",
// usada no cabeçalho/rodapé junto ao nome da marca.
export function HeartbeatLine({ width = 40, height = 14, color = '#C9934B', className = '' }: { width?: number; height?: number; color?: string; className?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 20" className={className} aria-hidden="true">
      <path
        d="M0 10 L 14 10 L 18 2 L 23 18 L 27 10 L 33 10 L 36 14 L 40 6 L 44 10 L 60 10"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
