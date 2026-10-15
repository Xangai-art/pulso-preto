// Ornamentos geométricos discretos — paleta ancestral-cultural (ref. Ìlera V2/V3).
// Todos abstratos e geométricos, nunca figurativos. Usados como divisores, marcadores
// de seção e assinatura visual. Ver documentação pública em /arquitetura ("Sistema de design").

interface LeafMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LeafMark({ size = 24, color = '#3d6e51', className = '' }: LeafMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2 C 6 6, 4 12, 4 18 C 10 18, 16 14, 20 6 C 16 6, 14 4, 12 2 Z"
        fill={color}
        opacity="0.9"
      />
      <path d="M12 3 L 8 17" stroke="#f4f0e6" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}

interface PalhaLineProps {
  width?: number;
  className?: string;
}

export function PalhaLine({ width = 60, className = '' }: PalhaLineProps) {
  const bars = [10, 7, 9, 5, 10, 8, 10, 6, 9, 7, 10, 5];
  return (
    <svg
      width={width}
      height={12}
      viewBox={`0 0 ${bars.length * 5} 12`}
      className={className}
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 5}
          y={(12 - h) / 2}
          width={2}
          height={h}
          fill={i % 2 === 0 ? '#957237' : '#3d6e51'}
          opacity="0.75"
        />
      ))}
    </svg>
  );
}

interface ContasRingProps {
  size?: number;
  className?: string;
}

export function ContasRing({ size = 40, className = '' }: ContasRingProps) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: Math.cos(a) * (size / 2 - 3) + size / 2,
      y: Math.sin(a) * (size / 2 - 3) + size / 2,
      i,
    };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      {dots.map((d) => (
        <circle key={d.i} cx={d.x} cy={d.y} r="1.8" fill={d.i % 2 ? '#3d6e51' : '#957237'} />
      ))}
    </svg>
  );
}
